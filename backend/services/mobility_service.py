def calculate_mobility_outcomes(mobility_profile, baseline_weight, procedure):
    pain_severity_text = mobility_profile.get("pain_severity", "None")
    daily_nsaid = mobility_profile.get("daily_nsaid", False)
    
    # Map severity to a numeric factor
    severity_map = {"None": 0, "Mild": 1, "Moderate": 2, "Severe": 3}
    baseline_severity = severity_map.get(pain_severity_text, 0)
    
    # If they have no pain and no NSAIDs, we just calculate the mechanical unloading
    has_clinical_oa = baseline_severity > 0 or daily_nsaid

    # Step 1: Expected Total Weight Loss (%TWL) based on procedure
    expected_twl_percent = 32.0 if procedure == "RYGB" else 26.0
    
    # Step 2: Mechanical Load Reduction (The 4:1 Biomechanical Rule)
    weight_lost_kg = baseline_weight * (expected_twl_percent / 100.0)
    knee_load_reduction_kg_per_step = weight_lost_kg * 4.0
    
    # Step 3: Probabilities for Pain/NSAID Remission
    base_nsaid_prob = 0.50
    base_tjr_prob = 0.65  # TJR = Total Joint Replacement avoidance
    
    # TWL Multiplier (Higher weight loss = exponentially better joint relief)
    if expected_twl_percent >= 30: twl_mult = 1.8
    elif expected_twl_percent >= 20: twl_mult = 1.5
    elif expected_twl_percent >= 10: twl_mult = 1.2
    elif expected_twl_percent >= 7.5: twl_mult = 1.1
    else: twl_mult = 0.8
        
    # Severity Penalty (Severe baseline arthritis is harder to completely cure)
    severity_factor = max(0.4, 1.0 - (baseline_severity * 0.15))
    
    # Calculate Final 1-Year Probabilities
    nsaid_cessation_1y = max(0.10, min(0.95, base_nsaid_prob * twl_mult * severity_factor))
    avoid_tjr_1y = max(0.20, min(0.95, base_tjr_prob * twl_mult * severity_factor))
    
    # 5-Year Durability (Slight mechanical wear over time)
    nsaid_cessation_5y = max(0.10, min(0.95, nsaid_cessation_1y * 0.85))
    avoid_tjr_5y = max(0.20, min(0.95, avoid_tjr_1y * 0.80))

    return {
        "biomechanical_unloading": {
            "weight_lost_kg": round(weight_lost_kg, 1),
            "knee_load_reduction_kg": round(knee_load_reduction_kg_per_step, 1),
            "knee_load_reduction_lbs": round(knee_load_reduction_kg_per_step * 2.20462, 1)
        },
        "clinical_outcomes": {
            "has_clinical_oa": has_clinical_oa,
            "nsaid_cessation_prob_1y": round(nsaid_cessation_1y * 100, 1),
            "nsaid_cessation_prob_5y": round(nsaid_cessation_5y * 100, 1),
            "avoid_joint_replacement_5y": round(avoid_tjr_5y * 100, 1)
        },
        "evidence_base": "Messier et al. (2005) 1:4 Ratio, LABS Consortium Pain Outcomes"
    }