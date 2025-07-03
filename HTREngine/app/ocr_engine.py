import easyocr
import cv2
import numpy as np
from PIL import Image
from dateutil.parser import parse
import re
from fuzzywuzzy import fuzz

reader = easyocr.Reader(['en'])


def preprocess_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Invalid image")
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Softer blur and no aggressive thresholding for handwritten text
    blurred = cv2.GaussianBlur(gray, (3, 3), 0)
    _, thresh = cv2.threshold(
        blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)  # Otsu thresholding
    return thresh


def is_near(key_box, val_box, y_thresh=300, x_thresh=800):  # Looser thresholds
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


# ... (keep existing imports and functions)

def process_image_data(image_path):
    img = preprocess_image(image_path)
    results = reader.readtext(img)
    if not results:
        raise ValueError("No text detected")

    print("\n--- Raw OCR Results ---")
    for box, text, conf in results:
        print(f"Text: '{text}', Conf: {conf:.2f}, Box: {box}")
    print("-----------------------\n")

    data = {
        # ... (your existing data dictionary)
    }

    used_indexes = set()
    for i, (key_box, key_text, key_conf) in enumerate(results):
        key_text_lower = key_text.lower().strip()
        matched_field = None

        field_mapping = {
            # ... (your existing field_mapping)
        }

        # Debug: Check key matching
        for key_pattern, field_name in field_mapping.items():
            ratio = fuzz.partial_ratio(key_pattern, key_text_lower)
            if ratio > 70:  # Your current threshold
                matched_field = field_name
                print(
                    f"Matched Key: '{key_text}' (Original: '{key_pattern}') to Field: '{matched_field}' with Ratio: {ratio}")
                break

        if matched_field:
            best_value = ""
            best_score = float('inf')
            best_index = None

            print(
                f"  --> Searching for value for field: '{matched_field}' (Key Text: '{key_text}')")
            print(f"      Key Box: {key_box}")

            for j, (val_box, val_text, val_conf) in enumerate(results):
                if j != i and j not in used_indexes:
                    # Debug: Print potential value candidates and proximity check
                    # You might need to adjust y_thresh and x_thresh in is_near based on observations
                    # Your current thresholds
                    is_candidate_near = is_near(
                        key_box, val_box, y_thresh=300, x_thresh=800)

                    if is_candidate_near:
                        dist_x = val_box[0][0] - key_box[2][0]
                        dist_y = abs(val_box[0][1] - key_box[0][1])
                        score = dist_x + dist_y * 0.5
                        val_text_clean = val_text.strip()

                        print(
                            f"    Potential Value Candidate: '{val_text_clean}', Box: {val_box}, Dist_X: {dist_x}, Dist_Y: {dist_y}, Score: {score}")

                        # Existing validation and normalization
                        if matched_field in ["First name(s) of the child", "Resident at (Father)", "Resident at (Mother)"] and not validate_name(val_text_clean):
                            print(f"      - Rejected by name validation.")
                            continue
                        if matched_field in ["Born on the", "On the (Father)", "On the (Mother)"]:
                            normalized_val = normalize_date(val_text_clean)
                            if normalized_val == val_text_clean and not re.match(r'\d{4}-\d{2}-\d{2}', normalized_val):
                                print(f"      - Rejected by date normalization.")
                                continue  # If normalization fails to change it to the expected format
                            val_text_clean = normalized_val

                        if score < best_score:
                            best_score = score
                            best_value = val_text_clean
                            best_index = j
                            print(
                                f"      - New Best Value Candidate: '{best_value}' (Score: {best_score})")

            if best_value:
                data[matched_field] = best_value
                used_indexes.add(best_index)
                print(
                    f"  +++ Assigned Value: '{best_value}' to Field: '{matched_field}' (Used Index: {best_index})\n")
            else:
                print(
                    f"  --- No suitable value found for field: '{matched_field}'\n")

    return data
