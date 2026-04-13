def calculate_stop_bang(osa_data, age, bmi, gender, has_htn):
    """
    Screens for undiagnosed OSA using the gold-standard STOP-Bang criteria.
    Only runs if the patient has NOT been formally diagnosed with OSA.
    """
    if osa_data.get('has_osa', False):
        return None
        
    score = 0
    # STOP criteria
    if osa_data.get('snoring', False): score += 1
    if osa_data.get('tired', False): score += 1
    if osa_data.get('observed_apnea', False): score += 1
    if has_htn: score += 1
    
    # BANG criteria
    if bmi > 35: score += 1
    if age > 50: score += 1
    if osa_data.get('neck_cm', 0) > 40: score += 1
    if gender.lower() == 'male': score += 1
    
    # Stratification
    if score >= 5:
        risk = "High Risk"
        recommendation = "High probability of moderate/severe OSA. Refer for polysomnography (PSG) prior to surgery."
    elif score >= 3:
        risk = "Intermediate Risk"
        recommendation = "Moderate probability of OSA. Clinical evaluation recommended."
    else:
        risk = "Low Risk"
        recommendation = "Low probability of OSA. Standard preoperative clearance."
        
    return {
        "stop_bang_score": score,
        "risk_category": risk,
        "clinical_recommendation": recommendation,
        "evidence_base": "STOP-Bang Questionnaire (Chung et al.)"
    }


def calculate_osa_remission(osa_data, age, bmi, gender, has_htn, procedure):
    """
    Predicts 10-year OSA remission probabilities using logistic ORs.
    Only runs if the patient IS already diagnosed with OSA.
    """
    if not osa_data.get('has_osa', False):
        return None
        
    # Baseline probability of remission at 1 year (approx 60% based on NBSR cohorts)
    # We convert probability to odds to apply the Odds Ratios (OR)
    base_odds = 0.60 / (1 - 0.60) # 1.5
    
    # 1. Age factor: OR 0.73 per 10 years over 40 (Nagendran et al.)
    age_diff = max(0, (age - 40) / 10.0)
    odds_multiplier = (0.73 ** age_diff)
    
    # 2. BMI factor: OR 0.57 per 10 units over 40
    bmi_diff = max(0, (bmi - 40) / 10.0)
    odds_multiplier *= (0.57 ** bmi_diff)
    
    # 3. Gender factor: Male OR 0.58
    if gender.lower() == 'male':
        odds_multiplier *= 0.58
        
    # 4. Comorbidities factor: Hypertension OR 0.83
    if has_htn:
        odds_multiplier *= 0.83
        
    # 5. Procedure & Weight Loss (TWL) Modifier
    # RYGB typically reaches higher TWL quintiles (OR 2.47) vs SG (OR 2.03)
    if procedure == 'RYGB':
        odds_multiplier *= 2.47 
        rygb_long_term = 1.15 # Slight long-term durability advantage (Currie et al.)
    else: 
        odds_multiplier *= 2.03 
        rygb_long_term = 1.0
        
    # 6. Baseline AHI Severity modifier
    ahi = osa_data.get('ahi_severity', 'moderate').lower()
    if ahi == 'severe':
        odds_multiplier *= 0.65
    elif ahi == 'mild':
        odds_multiplier *= 1.30
        
    # Calculate final 1-year odds and convert back to probability
    final_odds_1y = base_odds * odds_multiplier
    remission_1y = final_odds_1y / (1 + final_odds_1y)
    
    # Clamp bounds to clinical reality
    remission_1y = max(0.10, min(0.95, remission_1y))
    
    # 5- and 10-year durability (OSA remission decays slightly over time, SOS 20-year study)
    remission_5y = max(0.05, min(0.95, remission_1y * 0.85 * rygb_long_term))
    remission_10y = max(0.05, min(0.95, remission_5y * 0.80))
    
    return {
        "remission_probability": {
            "year_1": round(remission_1y * 100, 1),
            "year_5": round(remission_5y * 100, 1),
            "year_10": round(remission_10y * 100, 1)
        },
        "evidence_base": "Nagendran (2015) SOARD, Currie (2021) NBSR, SOS 20-Year Outcomes (2026)"
    }