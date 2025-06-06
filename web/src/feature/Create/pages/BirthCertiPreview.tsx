import React from "react";

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

const BirthCertificatePreviewForm: React.FC<CreateProps> = ({ formData = DEFAULT_FORM_DATA }) => {
  return (
    <div className='certificate-container bg-white w-[55vw] p-8 shadow-sm font-serif'>
      <div id='certificate-preview' className='w-full h-full flex flex-col items-center text-black'>
        <div>
                 {/* Header Section */}
        <div className='flex justify-between text-sm  mb-2'>
          <div className='text-center'>
            <p className='text-xl'>RÉPUBLIQUE DU CAMEROUN</p>
            <p>Paix – Travail – Patrie</p>
            <div className='mt-8'>
              <div className='my-2 '>
                <p>REGION</p>
                <p>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p>
              </div>
              <div className='my-2'>
                <p>DEPARTEMENT</p>
                <p>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p>
              </div>
              <div className='my-2'>
                <p>ARRONDISSEMENT</p>
                <p>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p>
              </div>
            </div>
          </div>
          <div className='text-center'>
            <p className='text-xl'>REPUBLIC OF CAMEROON</p>
            <p>Peace – Work – Fatherland</p>
            <div className='mt-8'>
              <div className='my-2'>
                <p>REGION</p>
                <p>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p>
              </div>
              <div className='my-2'>
                <p>DIVISION</p>
                <p>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p>
              </div>
              <div className='my-2'>
                <p>SUBDIVISION</p>
                <p>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full text-center text-xl  mb-4'>
          <p>CENTRE D’ÉTAT CIVIL / CIVIL STATUS REGISTRATION CENTRE</p>
          <div>
            <p className='inline-block text-[16px]'>
              de - of :{" "}
              <span>
                _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                _ _ _ _ _ _ _ _ _ _ _ _{" "}
              </span>
            </p>
          </div>
        </div>
        <div className='text-center text-md mb-4'>
          <p>
            <span className='font-bold'>
              Centre d’état civil secondaire de rattachement{" "}
            </span>
            (pour les centres secondaires)
          </p>
          <p>
            Main Civil Status Registry of Attachment (for secondary civil status
            registry)
          </p>
        </div>
        <p className='text-center'>
          _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
          _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _{" "}
        </p>
        <div className='text-center my-8 flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold uppercase'>
            ACTE DE NAISSANCE / BIRTH CERTIFICATE
          </h1>

          <div className='w-[50%] mt-3 flex items-start justify-center gap-2'>
            <div>
              <p className='font-semibold text-2xl'> N°:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.certificateNumber || ""}
              </p>
            </div>
          </div>
        </div>


        </div>
 

        {/* Body Section */}
        <div className="w-[95%]">
        <div className='text-base leading-7'>
          {/* Child's Details */}
          <div className='w-full flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Nom de L'enfant :</p>
              <p className='-mt-2'>surname of child</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.surName || "[Child Name]"}{" "}
              </p>
            </div>
          </div>
          <div className='w-full my-1 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Prenoms de L'enfant :</p>
              <p className='-mt-2'>Given name of the child</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.givenName || "[Child Name]"}{" "}
              </p>
            </div>
          </div>

          <div className='w-full my-3 flex items-start justify-center gap-2'>
            <div>
              <p className='font-semibold'>Né le – Born on the:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.dob || "[YYYY-MM-DD]"}
              </p>
            </div>
          </div>

          <div className='w-full my-3 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>A – at</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.placeOfBirth || ""}
              </p>
            </div>
          </div>

          <div className='w-full my-3 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>De sexe / Sex:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.sex || "[Sex]"}
              </p>
            </div>
          </div>

          {/* Father's Details */}
          <div className='w-full my-3 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>De – of:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.fatherName || "[Father Name]"}
              </p>
            </div>
          </div>

          <div className='w-full my-3 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Née à – Born at:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.fatherPlaceOfBirth || "[Father Place of Birth]"}
              </p>
            </div>
          </div>

          <div className='w-full my-3 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Le – On the:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.fatherDob || "[YYYY-MM-DD]"}
              </p>
            </div>
          </div>

          <div className='w-full mt-3 mb-1 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Domiciliée à – Resident at:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.fatherResidence || "[Father Residence]"}
              </p>
            </div>
          </div>

          <div className='w-full my-1 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Profession – Occupation:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.fatherOccupation || "[Father Occupation]"}
              </p>
            </div>
          </div>

          <div className='w-full mt-1 mb-4 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Nationalité – Nationality:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.fatherNationality || "[Father Nationality]"}
              </p>
            </div>
          </div>

          <div className='w-full flex items-start gap-2'>
            <div>
              <p className='font-semibold'>
                Document de référence – Reference document:
              </p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.fatherReferenceDocument ||
                  "[Father Reference Document]"}
              </p>
            </div>
          </div>

          <div className='w-full flex items-start gap-2 mb-4'>
            <div className='flex-1 text-sm italic'>
              <p className='w-full border-b border-dotted border-transparent min-h-[24px]'>
                (Numéro de la Carte Nationale d'identité, ou références de
                l'acte de naissance, ou références du document prouvant la
                nationalité )
              </p>{" "}
              <p>
                ( National identity Card Number, or references of the Birth
                Certificate, or References of the Document attesting the
                Nationality)
              </p>
            </div>
          </div>

          {/* Mother's Details */}
          <div className='w-full mt-2 mb-3 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Et de – And of:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.motherName || "[Mother Name]"}
              </p>
            </div>
          </div>

          <div className='w-full my-3 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Née à – Born at:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.motherPlaceOfBirth || "[Mother Place of Birth]"}
              </p>
            </div>
          </div>

          <div className='w-full mt-3 mb-2 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Le – On the:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.motherDob || "[YYYY-MM-DD]"}
              </p>
            </div>
          </div>

          <div className='w-full my-1 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Domiciliée à – Resident at:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.motherResidence || "[Mother Residence]"}
              </p>
            </div>
          </div>

          <div className='w-full my-1 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Profession – Occupation:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.motherOccupation || "[Mother Occupation]"}
              </p>
            </div>
          </div>

          <div className='w-full mt-1 mb-4 flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Nationalité – Nationality:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.motherNationality || "[Mother Nationality]"}
              </p>
            </div>
          </div>

          <div className='w-full flex items-start gap-2'>
            <div>
              <p className='font-semibold'>
                Document de référence – Reference document:
              </p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.motherReferenceDocument ||
                  "[Mother Reference Document]"}
              </p>
            </div>
          </div>

          <div className='w-full flex items-start gap-2 mb-4'>
            <div className='flex-1 text-sm italic'>
              <p className='w-full border-b border-dotted border-transparent min-h-[24px]'>
                (Numéro de la Carte Nationale d'identité, ou références de
                l'acte de naissance, ou références du document prouvant la
                nationalité )
              </p>{" "}
              <p>
                ( National identity Card Number, or references of the Birth
                Certificate, or References of the Document attesting the
                Nationality)
              </p>
            </div>
          </div>

          {/* Issue Details */}
          <div className='w-full flex items-start gap-2'>
            <div>
              <p className='font-semibold'>Dressé le – Drawn up on:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.dateDrawn || "[YYYY-MM-DD]"}
              </p>
            </div>
          </div>

          <div className='w-full flex items-start gap-2'>
            <div>
              <p className='font-semibold'>
                Sur la déclaration de – In accordance with the declaration of:
              </p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'></p>
            </div>
          </div>
          <p className='w-full border-b mb-2 border-dotted border-black min-h-[24px]'>
            {formData.declarant || ""}
          </p>

          <div className='w-full my-6 flex items-start gap-2'>
            <div>
              <p className='font-bold'>
                Lesquels ont certifié la sincérité de la présente déclaration{" "}
              </p>
              <p>Who attested to the truth of this declaration:</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="my-2">
          <div className='w-full my-2 flex items-start gap-2'>
            <div>
              <p className='font-semibold'> Par Nous,By Us</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.officer}
              </p>
            </div>
            <div>
              <p>Officier</p>
            </div>
          </div>
          <p className='-mt-1'>d’état civil – Civil Status Registrar</p>
        </div>
        <div>
          <div className='w-full my-2 flex items-start gap-2'>
            <div>
              <p className='font-semibold'> Assistée de - In the presence of:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.secretary}
              </p>
            </div>
            <div>
              <p>Secretaire</p>
            </div>
          </div>
          <p className='-mt-1'>d’état civil – The Civil
          Status Secretary</p>
        </div>

        <div>
        <div className='w-full my-3 flex justify-center gap-2'>
          <div className="w-[50%] flex gap-2">
          <div>
              <p className='font-semibold'>Le – on the:</p>
            </div>
            <div className='flex-1'>
              <p className='w-full border-b border-dotted border-black min-h-[24px]'>
                {formData.dateDrawn}
              </p>
            </div>
          </div>
            
          </div>
        </div>

        <div className="my-12 flex justify-between items-center" >
         <div>
          <p> Le Secretaire D’état Civil Registry</p>
          <p>Secretary</p>
         </div>
         <div>
          <p> Signature de Officier D’état Civil</p>
          <p>Signature of Civil Status Registrar</p>
         </div>
        </div>
        </div>
        
       
       
      </div>
    </div>
  );
};

export default BirthCertificatePreviewForm;
