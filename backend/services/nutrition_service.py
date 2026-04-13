def calculate_nutrition_outcomes(nutrition_profile, gender, procedure):
    # Extract baseline variables
    menstruating = nutrition_profile.get("menstruating", False) and gender.lower() == 'female'
    baseline_anemia = nutrition_profile.get("baseline_anemia", False)
    baseline_b12_low = nutrition_profile.get("baseline_b12_low", False)

    # Step 1: Base 5-year deficiency probabilities (ASMBS + 10-year cohorts)
    if procedure == "RYGB":
        base_iron_risk = 0.40  # 40%
        base_b12_risk = 0.25   # 25%
        iron_dose = "45-60mg"
    else:  # Sleeve Gastrectomy
        base_iron_risk = 0.15  # 15%
        base_b12_risk = 0.08   # 8%
        iron_dose = "18-45mg"

    # Step 2: Apply multiplicative risk modifiers
    iron_modifier = 1.0
    b12_modifier = 1.0

    if menstruating:
        iron_modifier *= 2.0
        iron_dose = "45-60mg" # Bump iron requirement for menstruating females regardless of procedure
    if baseline_anemia:
        iron_modifier *= 1.8
    if baseline_b12_low:
        b12_modifier *= 2.5

    # Final 5-year risks (clamp 5–95%)
    iron_risk_5y = max(0.05, min(0.95, base_iron_risk * iron_modifier))
    b12_risk_5y = max(0.05, min(0.95, base_b12_risk * b12_modifier))

    # Step 3: Recommended daily supplementation (ASMBS 2016/2019 Guidelines)
    supplements = [
        {"name": "Multivitamin", "dosage": "2 Adult Bariatric MVs", "timing": "Daily (Chewable initially)"},
        {"name": "Elemental Iron", "dosage": iron_dose, "timing": "Daily (Separate from Calcium)"},
        {"name": "Vitamin B12", "dosage": "350-500mcg", "timing": "Daily (Oral/Sublingual)"},
        {"name": "Calcium Citrate", "dosage": "1200-1500mg", "timing": "Divided doses (e.g., 500mg x3)"},
        {"name": "Vitamin D3", "dosage": "3000 IU", "timing": "Daily (Titrate to >30 ng/mL)"}
    ]

    return {
        "deficiency_risks_5y": {
            "iron_anemia_percent": round(iron_risk_5y * 100, 1),
            "vitamin_b12_percent": round(b12_risk_5y * 100, 1)
        },
        "asmbs_supplements": supplements,
        "clinical_warning": "RYGB requires lifelong vigilance for Iron/B12. Annual labs mandatory." if procedure == "RYGB" else "SG patients require lifelong vitamins despite preserved digestive continuity.",
        "evidence_base": "ASMBS 2019 Nutritional Guidelines, SLEEVEPASS RCT"
    }