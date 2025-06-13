import easyocr
import cv2
import numpy as np
from PIL import Image
from dateutil.parser import parse
import re

reader = easyocr.Reader(['en'])


def preprocess_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Invalid image")
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (3, 3), 0)  # Softer blur
    thresh = cv2.adaptiveThreshold(
        # Larger blockSize, higher C
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 21, 5)
    return thresh


def is_near(key_box, val_box, y_thresh=200, x_thresh=600):
    key_x1, key_y1 = key_box[0]
    key_x2, key_y2 = key_box[2]
    val_x1, val_y1 = val_box[0]
    val_x2, val_y2 = val_box[2]
    vert_close = abs(val_y1 - key_y1) < y_thresh or val_y1 > key_y2
    horiz_close = val_x1 > key_x2 and (val_x1 - key_x2) < x_thresh
    return vert_close and horiz_close


def validate_name(value):
    return bool(re.match(r'^[A-Za-z\s\-\']+$', value))


def normalize_date(date_str):
    try:
        dt = parse(date_str, dayfirst=True)
        return dt.strftime('%Y-%m-%d')
    except:
        return date_str


def process_image_data(image_path):
    img = preprocess_image(image_path)
    results = reader.readtext(img)
    if not results:
        raise ValueError("No text detected")

    # Define fields with empty strings as default
    data = {
        "Number": "",
        "Surname of the child": "",
        "First name(s) of the child": "",
        "Born on the": "",
        "At": "",
        "Sex": "",
        "Of": "",
        "Born at": "",
        "On the": "",
        "Resident at": "",
        "Occupation": "",
        "Nationality": "",
        "Reference document": "",
        # Father's info
        "And of": "",
        "Born at (Father)": "",
        "On the (Father)": "",
        "Resident at (Father)": "",
        "Occupation (Father)": "",
        "Nationality (Father)": "",
        "Reference document (Father)": "",
        # Mother's info
        "Born at (Mother)": "",
        "On the (Mother)": "",
        "Resident at (Mother)": "",
        "Occupation (Mother)": "",
        "Nationality (Mother)": "",
        "Reference document (Mother)": "",
        "Drawn up on the": "",
        "Sworn on the": "",
        "Who attested to the truth of this declaration": "",
        "By Us": "",
        "Civil Status Registrar": "",
        "Assisted by": "",
        "Signature of Civil Status Registrar": ""
    }

    used_indexes = set()
    for i, (key_box, key_text, key_conf) in enumerate(results):
        key_text_lower = key_text.lower().strip()
        matched_field = None
        # Map OCR text to fields
        field_mapping = {
            "n°": "Number",
            "nom de l'enfant": "Surname of the child",
            "prénom(s) du child": "First name(s) of the child",
            "né(e) - born on the": "Born on the",
            "à - at": "At",
            "de sexe - sex": "Sex",
            "de - of": "Of",
            "né à - born at": "Born at",
            "le - on the": "On the",
            "domicilié à - resident at": "Resident at",
            "profession - occupation": "Occupation",
            "nationalité - nationality": "Nationality",
            "document de référence - reference document": "Reference document",
            "et de - and of": "And of",
            # First occurrence for father
            "né(e) à - born at": "Born at (Father)",
            # First occurrence for father
            "le - on the": "On the (Father)",
            "domicilié à - resident at": "Resident at (Father)",
            "profession - occupation": "Occupation (Father)",
            "nationalité - nationality": "Nationality (Father)",
            "document de référence - reference document": "Reference document (Father)",
            # Second occurrence for mother
            "né(e) à - born at": "Born at (Mother)",
            # Second occurrence for mother
            "le - on the": "On the (Mother)",
            "domicilié à - resident at": "Resident at (Mother)",
            "profession - occupation": "Occupation (Mother)",
            "nationalité - nationality": "Nationality (Mother)",
            "document de référence - reference document": "Reference document (Mother)",
            "dressée le - drawn up on the": "Drawn up on the",
            "juré le - sworn on the": "Sworn on the",
            "lesquels ont certifié à la sincérité de la présente déclaration, who attested to the truth of this declaration": "Who attested to the truth of this declaration",
            "par nous, - by us,": "By Us",
            "d’état civil / civil status registrar": "Civil Status Registrar",
            "assisté de - assisted by": "Assisted by",
            "signature de l’officier d’état civil / signature of civil status registrar": "Signature of Civil Status Registrar"
        }

        for key_pattern, field_name in field_mapping.items():
            if key_pattern in key_text_lower:
                matched_field = field_name
                break

        if matched_field:
            best_value = ""
            best_score = float('inf')
            best_index = None
            for j, (val_box, val_text, val_conf) in enumerate(results):
                if j != i and j not in used_indexes and is_near(key_box, val_box):
                    dist_x = val_box[0][0] - key_box[2][0]
                    dist_y = abs(val_box[0][1] - key_box[0][1])
                    score = dist_x + dist_y * 0.5
                    val_text_clean = val_text.strip()
                    if matched_field in ["First name(s) of the child", "Resident at (Father)", "Resident at (Mother)"] and not validate_name(val_text_clean):
                        continue
                    if matched_field in ["Born on the", "On the (Father)", "On the (Mother)"]:
                        val_text_clean = normalize_date(val_text_clean)
                    if score < best_score:
                        best_score = score
                        best_value = val_text_clean
                        best_index = j
            if best_value:
                data[matched_field] = best_value
                used_indexes.add(best_index)

    return data
