# services/diabetes_service.py

def calculate_diarem_score(age: int, hba1c: float, insulin_use: bool, other_meds_count: int) -> dict:
    """
    Calculates the DiaRem Score (0-22). Lower score = higher probability of T2DM remission.
    """
    score = 0
    
    # 1. Age criteria
    if 40 <= age <= 49:
        score += 1
    elif 50 <= age <= 59:
        score += 2
    elif age >= 60:
        score += 3

    # 2. HbA1c criteria
    if 6.5 <= hba1c < 7.0:
        score += 2
    elif 7.0 <= hba1c < 8.9:
        score += 4
    elif hba1c >= 9.0:
        score += 6

    # 3. Medication criteria
    if other_meds_count > 0:
        score += 3
    if insulin_use:
        score += 10

    # Stratify Probability based on standard DiaRem cutoffs
    probability = "<10% probability of remission"
    if score <= 2:
        probability = "80–99% probability of remission"
    elif score <= 7:
        probability = "60–70% probability of remission"
    elif score <= 12:
        probability = "40–50% probability of remission"
    elif score <= 17:
        probability = "10–20% probability of remission"

    return {
        "score": score,
        "remission_probability": probability
    }

def calculate_abcd_score(age: int, bmi: float, c_peptide: float, duration_years: float) -> dict:
    """
    Calculates the ABCD Score (0-10). Higher score = higher probability of T2DM remission.
    Particularly useful for lower-BMI/Asian cohorts.
    """
    score = 0
    
    # 1. Age
    if age < 40: score += 1
    
    # 2. BMI
    if 27 <= bmi < 35: score += 1
    elif 35 <= bmi < 40: score += 2
    elif bmi >= 40: score += 3
        
    # 3. C-Peptide (ng/mL)
    if 2 <= c_peptide < 3: score += 1
    elif c_peptide >= 3: score += 2
        
    # 4. Duration of T2DM (Years)
    if 4 <= duration_years < 8: score += 1
    elif 1 <= duration_years < 4: score += 2
    elif duration_years < 1: score += 3

    # Stratify Probability
    prolonged_remission = "Standard probability"
    if score > 8:
        prolonged_remission = "≥83% prolonged remission probability"

    return {
        "score": score,
        "remission_note": prolonged_remission
    }
