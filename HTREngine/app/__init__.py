from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for React frontend

    from .routes import ocr_bp
    app.register_blueprint(ocr_bp)

    return app
