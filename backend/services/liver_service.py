# services/liver_service.py

def calculate_nafld_fibrosis_score(age: int, current_bmi: float, labs: dict) -> dict:
    """
    Calculates the NAFLD Fibrosis Score based on clinical lab values.
    Formula: NFS = –1.675 + 0.037×age + 0.094×BMI + 1.13×IFG/diabetes + 0.99×AST/ALT ratio – 0.013×platelets – 0.66×albumin
    """
    
    # Extract labs safely, providing defaults if missing
    has_diabetes = labs.get('has_diabetes', False)
    ast_alt_ratio = labs.get('ast_alt_ratio', 1.0)
    platelets = labs.get('platelets', 250)
    albumin = labs.get('albumin', 4.0)
    
    diabetes_multiplier = 1 if has_diabetes else 0

    # The clinical math
    nfs = (
        -1.675 
        + (0.037 * age) 
        + (0.094 * current_bmi) 
        + (1.13 * diabetes_multiplier) 
        + (0.99 * ast_alt_ratio) 
        - (0.013 * platelets) 
        - (0.66 * albumin)
    )

    # Stratify Risk based on standard clinical cutoffs
    risk_level = "Low Risk"
    if nfs >= 0.676:
        risk_level = "High Risk (Advanced Fibrosis)"
    elif -1.455 < nfs < 0.676:
        risk_level = "Indeterminate Risk"
        
    return {
        "score": round(nfs, 3),
        "risk_category": risk_level
    }
