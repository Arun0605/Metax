def calculate_surgical_risk(risk_profile, age, bmi, smoker, procedure):
    # Extract MBSAQIP clinical variables
    asa_class = int(risk_profile.get("asa_class", 2))
    functional_dependent = risk_profile.get("functional_dependent", False)
    history_vte = risk_profile.get("history_vte", False)
    steroid_use = risk_profile.get("steroid_use", False)
    bleeding_disorder = risk_profile.get("bleeding_disorder", False)

    # Step 1: Procedure-specific BASELINE 30-day probabilities
    if procedure == "RYGB":
        base_leak = 0.0032          # 0.32%
        base_bleed = 0.014          # 1.4%
        base_vte = 0.0045           # 0.45%
        base_readmit = 0.058        # 5.8%
    else:  # Sleeve Gastrectomy (SG)
        base_leak = 0.0017          # 0.17%
        base_bleed = 0.007          # 0.7%
        base_vte = 0.0035           # 0.35%
        base_readmit = 0.039        # 3.9%

    # Step 2: Multiplicative OR modifiers
    modifier = 1.0
    
    if functional_dependent: modifier *= 2.2
    if history_vte: modifier *= 3.8
    if steroid_use: modifier *= 1.7
    if bleeding_disorder: modifier *= 2.1
    if smoker: modifier *= 1.4
    if asa_class >= 4: modifier *= 1.8
    if age > 60: modifier *= 1.3
    if bmi > 50: modifier *= 1.25

    # Procedure-specific extra penalties
    if procedure == "RYGB":
        if bleeding_disorder: modifier *= 1.4
        if history_vte: modifier *= 1.2

    # Step 3: Calculate patient-specific risks
    risk_leak = base_leak * modifier
    risk_bleed = base_bleed * modifier
    risk_vte = base_vte * modifier
    risk_readmit = base_readmit * modifier

    # Clamp each to realistic extremes [0.05%, 25%]
    risk_leak = max(0.0005, min(0.25, risk_leak))
    risk_bleed = max(0.0005, min(0.25, risk_bleed))
    risk_vte = max(0.0005, min(0.25, risk_vte))
    risk_readmit = max(0.0005, min(0.25, risk_readmit))

    # Composite serious complication risk
    serious_comp = 1 - (1 - risk_leak) * (1 - risk_bleed) * (1 - risk_vte) * (1 - 0.01)

    # Generate Clinical Warning
    if procedure == "RYGB" and (risk_leak + risk_bleed > 0.025):
        recommendation = "Elevated perioperative risk profile. SG may be preferred for short-term safety unless contraindicated."
        flag = "Elevated"
    else:
        recommendation = "Standard perioperative risk profile for selected pathway."
        flag = "Standard"

    return {
        "leak_risk_percent": round(risk_leak * 100, 2),
        "bleed_risk_percent": round(risk_bleed * 100, 2),
        "vte_risk_percent": round(risk_vte * 100, 2),
        "readmission_risk_percent": round(risk_readmit * 100, 2),
        "composite_serious_comp_percent": round(serious_comp * 100, 2),
        "clinical_warning": recommendation,
        "risk_flag": flag,
        "evidence_base": "MBSAQIP PUF Database (2015-2023)"
    }