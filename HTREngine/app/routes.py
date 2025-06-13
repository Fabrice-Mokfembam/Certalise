from flask import Blueprint, request, jsonify
from .ocr_engine import process_image_data
import os

ocr_bp = Blueprint("ocr", __name__)


@ocr_bp.route("/process-image", methods=["POST"])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']
    file_path = os.path.join("uploads", image_file.filename)
    os.makedirs("uploads", exist_ok=True)
    image_file.save(file_path)

    try:
        result = process_image_data(file_path)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)  # Clean up
