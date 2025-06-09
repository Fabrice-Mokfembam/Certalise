import React from "react";
import CertificateHeader from "../components/PreviewComponents/CertificateHeader";
import CertificateField from "../components/PreviewComponents/CertificateField";
import CertificateTitle from "../components/PreviewComponents/CertificateTitle";
import ReferenceDocumentNote from "../components/PreviewComponents/ReferenceDocNote";
import CertificateFooter from "../components/PreviewComponents/CertificateFooter";


interface FormData {
  certificateNumber?: string;
  surName?: string;
  givenName?: string;
  sex?: string;
  placeOfBirth?: string;
  dob?: string;
  fatherName?: string;
  fatherPlaceOfBirth?: string;
  fatherDob?: string;
  fatherResidence?: string;
  fatherOccupation?: string;
  fatherNationality?: string;
  fatherReferenceDocument?: string;
  motherName?: string;
  motherPlaceOfBirth?: string;
  motherDob?: string;
  motherResidence?: string;
  motherOccupation?: string;
  motherNationality?: string;
  motherReferenceDocument?: string;
  dateDrawn?: string;
  declarant?: string;
  officer?: string;
  secretary?: string;
}

interface CreateProps {
  formData?: FormData;
  pdfRef?: React.RefObject<HTMLDivElement | null>;
}

const DEFAULT_FORM_DATA: FormData = {
  certificateNumber: "",
  surName: "[Child Name]",
  givenName: "[Given Names]",
  sex: "[Sex]",
  placeOfBirth: "[Place of Birth]",
  dob: "[YYYY-MM-DD]",
  fatherName: "[Father Name]",
  fatherPlaceOfBirth: "[Father Place of Birth]",
  fatherDob: "[YYYY-MM-DD]",
  fatherResidence: "[Father Residence]",
  fatherOccupation: "[Father Occupation]",
  fatherNationality: "[Father Nationality]",
  fatherReferenceDocument: "[Father Reference Document]",
  motherName: "[Mother Name]",
  motherPlaceOfBirth: "[Mother Place of Birth]",
  motherDob: "[YYYY-MM-DD]",
  motherResidence: "[Mother Residence]",
  motherOccupation: "[Mother Occupation]",
  motherNationality: "[Mother Nationality]",
  motherReferenceDocument: "[Mother Reference Document]",
  dateDrawn: "[YYYY-MM-DD]",
  declarant: "[Declarant]",
  officer: "officer",
  secretary: "sec",
};

const BirthCertificatePreviewForm: React.FC<CreateProps> = ({
  formData = DEFAULT_FORM_DATA,
  pdfRef,
}) => {
  return (
    <div
      className="certificate-container bg-white w-[595px] h-[890px] shadow-sm font-serif box-border"
      style={{ fontSize: "10px", lineHeight: "1.2" }}
    >
    
      <div
        ref={pdfRef}
        id="certificate-preview"
        className="w-full h-full px-4 pt-2 flex flex-col text-black"
      >
        <CertificateHeader />

        <div className="w-full text-center text-[11px] mb-1">
          <p>CENTRE D'ÉTAT CIVIL / CIVIL STATUS REGISTRATION CENTRE</p>
          <div>
            <p className="inline-block text-[10px]">
              de - of :{" "}
              <span>
                _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
              </span>
            </p>
          </div>
        </div>

        <div className="text-center text-[9px] mb-1">
          <p>
            <span className="font-bold">
              Centre d'état civil secondaire de rattachement
            </span>{" "}
            (pour les centres secondaires)
          </p>
          <p>
            Main Civil Status Registry of Attachment (for secondary civil status
            registry)
          </p>
        </div>

        <p className="text-center text-[9px] mb-1">
          _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
        </p>

        <CertificateTitle certificateNumber={formData.certificateNumber} />

        <div className="w-full text-[10px] leading-[1.2]">
          <CertificateField
            labelFr="Nom de L'enfant :"
            labelEn="surname of child"
            value={formData.surName}
            className="my-1"
          />

          <CertificateField
            labelFr="Prenoms de L'enfant :"
            labelEn="Given name of the child"
            value={formData.givenName}
            className="my-1"
          />

          <CertificateField
            labelFr="Né le – Born on the:"
            value={formData.dob}
            className="my-1 justify-center"
          />

          <CertificateField
            labelFr="A – at"
            value={formData.placeOfBirth}
            className="my-1"
          />

          <CertificateField
            labelFr="De sexe / Sex:"
            value={formData.sex}
            className="my-1"
          />

          <CertificateField
            labelFr="De – of:"
            value={formData.fatherName}
            className="my-1"
          />

          <CertificateField
            labelFr="Née à – Born at:"
            value={formData.fatherPlaceOfBirth}
            className="my-1"
          />

          <CertificateField
            labelFr="Le – On the:"
            value={formData.fatherDob}
            className="my-1"
          />

          <CertificateField
            labelFr="Domiciliée à – Resident at:"
            value={formData.fatherResidence}
            className="my-1"
          />

          <CertificateField
            labelFr="Profession – Occupation:"
            value={formData.fatherOccupation}
            className="my-1"
          />

          <CertificateField
            labelFr="Nationalité – Nationality:"
            value={formData.fatherNationality}
            className="my-1"
          />

          <CertificateField
            labelFr="Document de référence – Reference document:"
            value={formData.fatherReferenceDocument}
            className="my-1"
          />
          <ReferenceDocumentNote />

          <CertificateField
            labelFr="Et de – And of:"
            value={formData.motherName}
            className="my-1"
          />

          <CertificateField
            labelFr="Née à – Born at:"
            value={formData.motherPlaceOfBirth}
            className="my-1"
          />

          <CertificateField
            labelFr="Le – On the:"
            value={formData.motherDob}
            className="my-1"
          />

          <CertificateField
            labelFr="Domiciliée à – Resident at:"
            value={formData.motherResidence}
            className="my-1"
          />

          <CertificateField
            labelFr="Profession – Occupation:"
            value={formData.motherOccupation}
            className="my-1"
          />

          <CertificateField
            labelFr="Nationalité – Nationality:"
            value={formData.motherNationality}
            className="my-1"
          />

          <CertificateField
            labelFr="Document de référence – Reference document:"
            value={formData.motherReferenceDocument}
            className="my-1"
          />
          <ReferenceDocumentNote />

          <CertificateField
            labelFr="Dressé le – Drawn up on:"
            value={formData.dateDrawn}
            className="my-1"
          />

          <CertificateField
            labelFr="Sur la déclaration de – In accordance with the declaration of:"
            value={formData.declarant}
            className="my-1"
          />

          <div className="w-full my-1 flex items-start gap-2">
            <div>
              <p className="font-bold text-[10px]">
                Lesquels ont certifié la sincérité de la présente déclaration
              </p>
              <p className="text-[10px]">
                Who attested to the truth of this declaration:
              </p>
            </div>
          </div>

          <CertificateFooter
            officer={formData.officer}
            secretary={formData.secretary}
            dateDrawn={formData.dateDrawn}
          />
        </div>
      </div>
    </div>
  );
};

export default BirthCertificatePreviewForm;