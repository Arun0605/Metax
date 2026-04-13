def calculate_htn_remission(age, htn_profile, procedure):
    # If the patient doesn't have HTN, skip the math
    if not htn_profile.get("has_htn", False):
        return None

    htn_duration_years = htn_profile.get("duration_years", 0)
    num_ADs = htn_profile.get("meds_count", 0)
    preop_VFA = htn_profile.get("vfa", None) # Optional Visceral Fat Area

    # Step 1: Base Remission Probability (1-year)
    base_remission_prob = 0.68
    
    if num_ADs <= 1:
        base_remission_prob += 0.25
    elif num_ADs >= 3:
        base_remission_prob -= 0.30
        
    if htn_duration_years <= 5:
        base_remission_prob += 0.15
    elif htn_duration_years >= 10:
        base_remission_prob -= 0.20
        
    if age < 45:
        base_remission_prob += 0.10
        
    if preop_VFA is not None and preop_VFA <= 243:
        base_remission_prob += 0.12
        
    # Clamp probability between 10% and 95%
    base_remission_prob = max(0.10, min(0.95, base_remission_prob))

    # Step 2: Procedure modifier (Shirmohamadi 2025 RYGB long-term advantage)
    long_term_modifier = 1.39 if procedure == "RYGB" else 1.0

    # Step 3: 1, 5, and 10-year projections
    remission_1y = base_remission_prob
    remission_5y = max(0.05, min(0.95, base_remission_prob * long_term_modifier * 0.75))
    remission_10y = max(0.05, min(0.95, remission_5y * 0.65))

    # Step 4: Recurrence risk
    # We estimate expected TWL based on the procedure chosen
    expected_TWL_1y = 32 if procedure == "RYGB" else 26
    
    recurrence_risk = 0.22
    if num_ADs > 1 or (preop_VFA is not None and preop_VFA > 243):
        recurrence_risk += 0.40
    if expected_TWL_1y < 20:
        recurrence_risk += 0.25
        
    recurrence_risk = min(0.80, recurrence_risk)

    # Determine stratification bucket
    if num_ADs <= 1 and (preop_VFA is None or preop_VFA <= 243):
        stratification = "High Likelihood"
    else:
        stratification = "Moderate/Low Likelihood"

    return {
        "remission_probability": {
            "year_1": round(remission_1y * 100, 1),
            "year_5": round(remission_5y * 100, 1),
            "year_10": round(remission_10y * 100, 1)
        },
        "recurrence_risk": round(recurrence_risk * 100, 1),
        "stratification": stratification,
        "evidence_base": "Benaiges (2016), Kumagai (2024), Shirmohamadi (2025)"
    }