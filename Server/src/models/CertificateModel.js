import mongoose from "mongoose";
const Schema = mongoose.Schema;

const certificateSchema = new Schema(
  {
    certificateNumber: { type: String, required: true, unique: true },
    surName: { type: String },
    givenName: { type: String },
    sex: { type: String },
    placeOfBirth: { type: String },
    dob: { type: String },
    fatherName: { type: String },
    fatherPlaceOfBirth: { type: String },
    fatherDob: { type: String },
    fatherResidence: { type: String },
    fatherOccupation: { type: String },
    fatherNationality: { type: String },
    fatherReferenceDocument: { type: String },
    motherName: { type: String },
    motherPlaceOfBirth: { type: String },
    motherDob: { type: String },
    motherResidence: { type: String },
    motherOccupation: { type: String },
    motherNationality: { type: String },
    motherReferenceDocument: { type: String },
    dateDrawn: { type: String },
    declarant: { type: String },
    officer: { type: String },
    secretary: { type: String },
    imageUrl: { type: String },
    pdfUrl: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model('Certificate', certificateSchema);