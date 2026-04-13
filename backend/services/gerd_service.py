def calculate_gerd_outcomes(gerd_profile, procedure):
    # Extract baseline variables
    baseline_symptoms = gerd_profile.get("baseline_symptoms", "None")
    ppi_use = gerd_profile.get("ppi_use", False)
    esophagitis_la = gerd_profile.get("esophagitis_la", "None")
    hiatal_hernia = gerd_profile.get("hiatal_hernia", False)

    # Determine if patient has clinical baseline GERD
    has_preop_gerd = (baseline_symptoms != "None" or ppi_use or esophagitis_la in ["B", "C", "D"])
    
    # Severity mapping
    severity_map = {"None": 0, "Mild": 1, "Moderate": 2, "Severe": 3}
    baseline_severity = severity_map.get(baseline_symptoms, 0)

    # Step 1: Base probabilities (SM-BOSS 10-year data)
    if procedure == "RYGB":
        if has_preop_gerd:
            remission_1y_base = 0.604
            remission_5y_base = 0.719
            risk_val = 0.055 
            risk_type = "Persistent/Worsening Risk"
        else:
            remission_1y_base = 0.90
            remission_5y_base = 0.85
            risk_val = 0.079
            risk_type = "De Novo GERD Risk"
    else: # Sleeve Gastrectomy (SG)
        if has_preop_gerd:
            remission_1y_base = 0.25
            remission_5y_base = 0.68
            risk_val = 0.40 # High risk of worsening
            risk_type = "Persistent/Worsening Risk"
        else:
            remission_1y_base = 0.70
            remission_5y_base = 0.65
            risk_val = 0.323 # 32.3% De Novo GERD from SM-BOSS
            risk_type = "De Novo GERD Risk"

    # Step 2: Apply modifiers (Multiplicative ORs)
    if hiatal_hernia:
        if procedure == "SG":
            risk_val *= 1.8
            remission_5y_base *= 0.65
        else:
            remission_5y_base *= 1.15 # RYGB handles hernias well

    if baseline_severity >= 2 or ppi_use:
        remission_5y_base *= 0.75
        if procedure == "SG":
            risk_val *= 1.6

    # Expected TWL protective modifier based on procedure
    expected_twl = 32 if procedure == "RYGB" else 26
    if expected_twl >= 25:
        remission_5y_base *= 1.25
        risk_val *= 0.75

    # Clamp bounds to [0.05, 0.95]
    remission_1y = max(0.05, min(0.95, remission_1y_base))
    remission_5y = max(0.05, min(0.95, remission_5y_base))
    final_risk = max(0.05, min(0.95, risk_val))

    # Generate clinical warnings
    if procedure == "SG" and (has_preop_gerd or hiatal_hernia):
        recommendation = "HIGH CLINICAL RISK: SG is highly refluxogenic. Strongly consider RYGB pathway due to baseline GERD/Hernia."
        flag = "High Risk"
    else:
        recommendation = "Anatomy suitable for selected pathway. Standard GERD surveillance."
        flag = "Standard"

    return {
        "remission_probability": {
            "year_1": round(remission_1y * 100, 1),
            "year_5": round(remission_5y * 100, 1)
        },
        "adverse_risk": {
            "type": risk_type,
            "percentage": round(final_risk * 100, 1)
        },
        "clinical_warning": recommendation,
        "risk_flag": flag,
        "evidence_base": "SM-BOSS RCT (2025), ASMBS Position Statement"
    }