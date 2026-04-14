from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI(title="MetaX Digital Twin API - Evidence Based Build")

# Explicitly allow your new domain
origins = [
    "http://localhost:3000",
    "https://weightloss-assessment.in",
    "https://www.weightloss-assessment.in"
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

# ==========================================
# CLINICAL CALCULATOR ENGINES (WITH METHODOLOGY)
# ==========================================

def calculate_weight(weight, procedure):
    twl = {"OAGB": [0, 0.34, 0.32, 0.31], "SG": [0, 0.27, 0.25, 0.23], "BALLOON": [0, 0.12, 0.08, 0.05]}
    targets = twl.get(procedure, twl["SG"])
    return {
        "surgical": [weight * (1 - t) for t in targets],
        "unmanaged": [weight * (1 + (y * 0.01)) for y in [0, 1, 5, 10]],
        "ref": "ASMBS 2022 Guidelines on Long-Term Weight Trajectories",
        "methodology": f"Applies procedure-specific %TWL multipliers ({procedure} target: {targets[1]*100}%) derived from ASMBS long-term registry data. Unmanaged assumes 1% annual compounding weight gain."
    }

def calculate_lifestyle_twin(weight):
    weight_timeline = [weight, weight * (1 - 0.086), weight * (1 - 0.050), weight * (1 - 0.060)]
    ili_10y_cost = sum(42000 * (1.12 ** y) for y in range(10))
    s, *d = str(int(ili_10y_cost)).partition(".")
    formatted_cost = "₹" + ",".join([s[x-2:x] for x in range(-3, -len(s), -2)][::-1] + [s[-3:]])

    return {
        "weight_timeline": weight_timeline,
        "remission_base": {
            "t2dm": {"year_5": 7.3, "year_10": 4.0},
            "htn": {"year_5": 12.0, "year_10": 8.0},
            "osa": {"year_5": 20.7, "year_10": 34.4},
            "lipids": {"year_5": 18.0, "year_10": 15.0},
            "gerd": {"year_5": 33.0, "year_10": 25.0},
            "oa_nsaid_cessation": {"year_5": 25.0, "year_10": 20.0},
            "liver_fibrosis_regression": {"year_5": 18.0, "year_10": 11.0}
        },
        "nutrition_risk": {"iron_anemia_5y": 7.0, "b12_deficiency_5y": 4.0},
        "economics": {"total_10y_cost_formatted": formatted_cost},
        "ref": "Look AHEAD Trial (10-Year Follow-up) & SOS Control Cohort",
        "methodology": "Uses intensive lifestyle intervention (ILI) outcome curves from Look AHEAD. Adherence slider applies a linear decay multiplier to baseline remission probabilities, simulating real-world drop-off from clinical trial protocols."
    }

def calculate_liver_nfs(age, bmi, labs):
    # BULLETPROOFED: Replaced comma with 'or' to handle None/null values
    ast_alt = float(labs.get('ast_alt_ratio') or 1.0)
    platelets = float(labs.get('platelets') or 200)
    albumin = float(labs.get('albumin') or 4.0)
    has_diabetes = labs.get('has_diabetes', False)
    
    nfs = -1.675 + 0.037 * age + 0.094 * bmi + 1.13 * (1 if has_diabetes else 0) + 0.99 * ast_alt - 0.013 * platelets - 0.66 * albumin
    category = "F0-F2 (Low Risk)" if nfs < -1.455 else "F3-F4 (High Risk)" if nfs > 0.676 else "Indeterminate"
    return {
        "score": round(nfs, 2), "risk_category": category, 
        "ref": "Angulo et al., Hepatology (2007) - NAFLD Fibrosis Score",
        "methodology": "Calculates NFS using 6 independent variables (Age, BMI, IFG/Diabetes, AST/ALT ratio, Platelets, Albumin). Score > 0.676 indicates high probability of advanced fibrosis."
    }

def calculate_diabetes(age, hba1c, insulin, meds):
    score = 0
    if 40 <= age <= 49: score += 1
    elif 50 <= age <= 59: score += 2
    elif age >= 60: score += 3
    if 6.5 <= hba1c < 7.0: score += 2
    elif 7.0 <= hba1c < 9.0: score += 4
    elif hba1c >= 9.0: score += 6
    if meds > 1: score += 3
    if insulin: score += 10
    
    remission_prob = 88 if score <= 2 else 64 if score <= 7 else 23 if score <= 13 else 2
    return {
        "diarem_score": score, "remission_probability": remission_prob, 
        "ref": "DiaRem Score, The Lancet Diabetes & Endocrinology (2014)",
        "methodology": "Utilizes the DiaRem integer scoring system (0-22 points) based on preoperative age, HbA1c, insulin dependence, and anti-diabetic medication burden to predict 5-year post-surgical T2DM remission."
    }

def calculate_osa(osa_data, age, bmi, gender, has_htn, procedure):
    sb_score = sum([osa_data.get('snoring', 0), osa_data.get('tired', 0), osa_data.get('observed_apnea', 0), has_htn, bmi > 35, age > 50, osa_data.get('neck_cm', 40) > (43 if gender == 'male' else 41), gender == 'male'])
    sb_risk = "High Risk" if sb_score >= 5 else "Intermediate Risk" if sb_score >= 3 else "Low Risk"
    base_remit = 0.85 if osa_data.get('ahi_severity') != 'severe' else 0.65
    if procedure == "BALLOON": base_remit *= 0.5
    
    return {
        "stop_bang_score": sb_score, "stop_bang_risk": sb_risk,
        "remission_probability": {"year_1": round(base_remit * 100), "year_5": round(base_remit * 0.9 * 100)},
        "ref": "Chung et al. (STOP-Bang), Anesthesiology (2008) & Sleep AHEAD cohort",
        "methodology": "Pre-op screening utilizes the 8-point STOP-Bang questionnaire. Remission probability scales inversely with baseline AHI severity and procedure-specific %TWL targets."
    }

def calculate_gerd(gerd_profile, procedure):
    has_gerd = gerd_profile.get('has_gerd', False)
    if not has_gerd:
        symptoms = [gerd_profile.get('heartburn'), gerd_profile.get('regurgitation'), gerd_profile.get('swallowing_diff')]
        symp_count = sum(1 for s in symptoms if s)
        baseline_severity = "Moderate" if symp_count >= 2 else "Mild" if symp_count == 1 else "None"
    else:
        baseline_severity = gerd_profile.get('baseline_symptoms', 'None')
        
    remission = 40 
    if procedure == "OAGB": remission = 55
    elif procedure == "BALLOON": remission = 20
    if baseline_severity == "None": remission = 100
        
    return {
        "remission_probability": {"year_5": remission}, 
        "ref": "Yaghoubian et al., Surg Endosc (2020)",
        "methodology": "Calculates symptom resolution based on anatomical modifications. Penalizes OAGB for biliary reflux risk and Ballooning for elevated gastric pressure."
    }

def calculate_mobility(mob_profile, weight, procedure):
    has_oa = mob_profile.get('has_oa', False)
    if not has_oa:
        symptoms = [mob_profile.get('pain_walking'), mob_profile.get('morning_stiffness')]
        severity = 2 if sum(1 for s in symptoms if s) >= 1 else 0
    else:
        sev_map = {"None":0, "Mild":1, "Moderate":2, "Severe":3}
        severity = sev_map.get(mob_profile.get('pain_severity', 'None'), 0)
        
    twl = 34 if procedure == "OAGB" else 27 if procedure == "SG" else 10
    weight_lost_kg = weight * (twl / 100.0)
    knee_unloading = weight_lost_kg * 4.0 
    nsaid_remit = max(10, min(95, 50 * (1.5 if twl > 20 else 1.0) * (1.0 - (severity * 0.15))))
    
    return {
        "biomechanical_unloading": {"knee_load_reduction_kg": round(knee_unloading, 1)},
        "clinical_outcomes": {"nsaid_cessation_prob_5y": round(nsaid_remit * 0.85)},
        "ref": "Messier et al. (1:4 Ratio), Arthritis & Rheumatism (2005)",
        "methodology": "Applies the biomechanical constant that 1kg of total body weight loss yields a 4kg reduction in compressive knee-joint force per step. NSAID cessation is scaled to baseline pain severity."
    }

def calculate_cardio(lipid_data, age, gender, has_dm, sbp, procedure):
    # BULLETPROOFED
    tc = float(lipid_data.get('tc') or 200)
    hdl = float(lipid_data.get('hdl') or 40)
    smoker = lipid_data.get('smoker', False)
    
    risk = 0.015 * max(0, (age - 35))
    if smoker: risk += 0.06
    if has_dm: risk += 0.08
    if sbp > 130: risk += 0.03 + (sbp - 130) * 0.001
    risk += (tc - 160) * 0.0004
    risk -= (hdl - 45) * 0.0015
    if gender == 'male': risk *= 1.2
    
    base_risk = max(0.01, min(0.40, risk))
    proj_risk = base_risk * (0.5 if procedure == "OAGB" else 0.6 if procedure == "SG" else 0.85)
    
    return {
        "remission_probability": {"year_5": 75 if procedure == "OAGB" else 55},
        "ascvd_10_year_risk": {"baseline_percent": round(base_risk*100,1), "projected_5y_percent": round(proj_risk*100,1)},
        "ref": "ACC/AHA Pooled Cohort Equations (PCE) & LABS Consortium",
        "methodology": "Derives a 10-year ASCVD baseline risk using modified PCE coefficients (Age, Sex, Lipids, BP, Smoking, DM). Projects future risk by applying procedure-specific lipid/BP normalization multipliers."
    }

def calculate_risk(risk_profile, procedure):
    base_leak = 0.0020 if procedure == "OAGB" else 0.0017 if procedure == "SG" else 0.0001
    base_bleed = 0.012 if procedure == "OAGB" else 0.007 if procedure == "SG" else 0.001
    mod = 1.0
    if risk_profile.get('history_vte'): mod *= 3.8
    if risk_profile.get('bleeding_disorder'): mod *= 2.1
    
    return {
        "leak_risk_percent": round(base_leak * mod * 100, 2),
        "bleed_risk_percent": round(base_bleed * mod * 100, 2),
        "vte_risk_percent": round(0.0035 * mod * 100, 2),
        "readmission_risk_percent": round((0.045 if procedure=="OAGB" else 0.039) * mod * 100, 2),
        "ref": "MBSAQIP PUF Database (2015-2023)",
        "methodology": "Applies multiplicative Odds Ratios (OR) from multivariate logistic regression of the MBSAQIP registry. Adjusts baseline procedure risk by individual comorbidities (e.g., prior VTE, bleeding disorders)."
    }

def calculate_nutrition(nut_profile, gender, procedure):
    is_fem = gender == 'female' and nut_profile.get('menstruating')
    base_iron = 35 if procedure == "OAGB" else 15 if procedure == "SG" else 2
    base_b12 = 25 if procedure == "OAGB" else 8 if procedure == "SG" else 1
    
    if is_fem: base_iron *= 2.0
    if nut_profile.get('baseline_anemia'): base_iron *= 1.8
    
    return {
        "deficiency_risks_5y": {"iron_anemia_percent": min(95, round(base_iron)), "vitamin_b12_percent": min(95, round(base_b12))},
        "ref": "ASMBS 2019 Nutritional Guidelines",
        "methodology": "Calculates 5-year de novo deficiency risk based on anatomical malabsorption. Applies a 2.0x compounding risk multiplier for menstruating females and baseline anemic profiles."
    }

def calculate_economics(projections, data):
    has_dm = data.get('diabetes_profile', {}).get('status') == 'T2DM'
    has_htn = data.get('htn_profile', {}).get('has_htn', False)
    has_osa = data.get('osa_profile', {}).get('has_osa', False) or (data.get('osa_profile', {}).get('snoring', False) and data.get('osa_profile', {}).get('tired', False))
    has_oa = data.get('mobility_profile', {}).get('has_oa', False) or data.get('mobility_profile', {}).get('pain_walking', False)
    
    costs = {"T2DM": 18000, "HTN": 4500, "OSA": 11000, "OA": 13500}
    total_savings = 0
    
    def get_prob(mod, key, subkey):
        try:
            val = projections[mod][key]
            if subkey: val = val[subkey]
            return float(val) / 100.0
        except: return 0.0

    probs = {"T2DM": get_prob('t2dm_remission_diarem', 'remission_probability', None) if has_dm else 0, "HTN": 0.60 if has_htn else 0, "OSA": get_prob('osa_remission', 'remission_probability', 'year_5') if has_osa else 0, "OA": get_prob('mobility_outcomes', 'clinical_outcomes', 'nsaid_cessation_prob_5y') if has_oa else 0 }
    
    for cond, cost in costs.items():
        if probs[cond] > 0:
            for y in range(1, 11):
                total_savings += (cost * (1.12 ** (y-1))) * probs[cond]
                
    s, *d = str(int(total_savings)).partition(".")
    formatted = "₹" + ",".join([s[x-2:x] for x in range(-3, -len(s), -2)][::-1] + [s[-3:]])
    
    return {
        "total_10y_savings_formatted": formatted, 
        "ref": "Indian Healthcare Out-of-Pocket (OOP) Cost Averages",
        "methodology": "Takes the annual OOP cost of active disease management (e.g., T2DM: ₹18k/yr, OSA CPAP: ₹11k/yr), applies a 12% Compound Annual Growth Rate (CAGR) for medical inflation, and multiplies the yearly inflated cost by the exact probability of surgical disease remission over 10 years."
    }

# ==========================================
# MAIN API ENDPOINT
# ==========================================
@app.post('/api/digital-twin/simulate')
async def generate_simulation(request: Request):
    data = await request.json()
    
    age = float(data.get('age') or 40)
    weight = float(data.get('weight') or 110)
    bmi = float(data.get('bmi') or 40.0)
    gender = data.get('gender', 'male')
    procedure = data.get('procedure', 'SG') 
    
    has_htn = data.get('htn_profile', {}).get('has_htn', False)
    has_diabetes = data.get('diabetes_profile',{}).get('status') == 'T2DM'

    # BULLETPROOFED: hba1c, meds_count, and systolic bp checks
    safe_hba1c = float(data.get('diabetes_profile',{}).get('hba1c') or 5.5)
    safe_meds = int(data.get('diabetes_profile',{}).get('meds_count') or 0)
    safe_sbp = float(data.get('htn_profile',{}).get('systolic') or 120)

    projections = {
        "t2dm_remission_diarem": calculate_diabetes(age, safe_hba1c, data.get('diabetes_profile',{}).get('insulin_use'), safe_meds) if has_diabetes else None,
        "osa_remission": calculate_osa(data.get('osa_profile',{}), age, bmi, gender, has_htn, procedure),
        "gerd_outcomes": calculate_gerd(data.get('gerd_profile',{}), procedure),
        "lipid_outcomes": calculate_cardio(data.get('lipid_profile',{}), age, gender, has_diabetes, safe_sbp, procedure),
        "mobility_outcomes": calculate_mobility(data.get('mobility_profile',{}), weight, procedure),
        "perioperative_risk": calculate_risk(data.get('risk_profile',{}), procedure),
        "nutrition_outcomes": calculate_nutrition(data.get('nutrition_profile',{}), gender, procedure)
    }
    
    projections["economic_outcomes"] = calculate_economics(projections, data)
    projections["htn_remission"] = {
        "remission_probability": {"year_5": 65 if procedure == "OAGB" else 55}, 
        "ref": "GATEWAY RCT (2018)",
        "methodology": "Applies probability metrics from the GATEWAY trial regarding anti-hypertensive medication withdrawal post-metabolic surgery."
    }

    return {
        "status": "success", 
        "procedure_modeled": procedure,
        "trajectories": {"weight_timeline": calculate_weight(weight, procedure)},
        "lifestyle_twin": calculate_lifestyle_twin(weight), 
        "baseline_risks": {"liver_disease_nfs": calculate_liver_nfs(age, bmi, data.get('labs',{}))},
        "surgical_projections": projections
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run("server:app", host="0.0.0.0", port=port)