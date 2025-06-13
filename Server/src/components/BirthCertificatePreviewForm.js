import React from "react";
import { CertificateField } from "./CertificateField.js";
import { CertificateFooter } from "./CertificateFooter.js";
import { CertificateHeader } from "./CertificateHeader.js";
import { CertificateTitle } from "./CertificateTitle.js";
import { ReferenceDocumentNote } from "./ReferenceDocumentNote.js";

const BirthCertificatePreviewForm = ({ formData }) => {
  return React.createElement('div', {
    className: 'flex justify-center items-center  w-full font-serif box-border',
    style: { fontSize: '12px', lineHeight: '1.4' }
  },
    React.createElement('div', { className: 'w-[595px] h-full  flex flex-col text-black' },
      React.createElement(CertificateHeader, null),
      React.createElement('div', { className: 'w-full text-center text-[13px] mb-2' },
        React.createElement('p', null, 'CENTRE D’ÉTAT CIVIL / CIVIL STATUS REGISTRATION CENTRE'),
        React.createElement('div', null,
          React.createElement('p', { className: 'inline-block text-[12px]' },
            'de - of : ',
            React.createElement('span', null, '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _')
          )
        )
      ),
      React.createElement('div', { className: 'text-center text-[11px] mb-2' },
        React.createElement('p', null,
          React.createElement('span', { className: 'font-bold' }, 'Centre d’état civil secondaire de rattachement'),
          ' (pour les centres secondaires)'
        ),
        React.createElement('p', null, 'Main Civil Status Registry of Attachment (for secondary civil status registry)')
      ),
      React.createElement('p', { className: 'text-center text-[11px] mb-2' }, '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _'),
      React.createElement(CertificateTitle, { certificateNumber: formData.certificateNumber }),
      React.createElement('div', { className: 'w-full text-[12px] leading-[1.4]' },
        React.createElement(CertificateField, { labelFr: 'Nom de L’enfant :', labelEn: 'Surname of child', value: formData.surName, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Prenoms de L’enfant :', labelEn: 'Given name of the child', value: formData.givenName, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Né le – Born on the:', value: formData.dob, className: 'my-2 justify-center' }),
        React.createElement(CertificateField, { labelFr: 'A – at', value: formData.placeOfBirth, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'De sexe / Sex:', value: formData.sex, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'De – of:', value: formData.fatherName, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Née à – Born at:', value: formData.fatherPlaceOfBirth, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Le – On the:', value: formData.fatherDob, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Domiciliée à – Resident at:', value: formData.fatherResidence, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Profession – Occupation:', value: formData.fatherOccupation, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Nationalité – Nationality:', value: formData.fatherNationality, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Document de référence – Reference document:', value: formData.fatherReferenceDocument, className: 'my-2' }),
        React.createElement(ReferenceDocumentNote, null),
        React.createElement(CertificateField, { labelFr: 'Et de – And of:', value: formData.motherName, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Née à – Born at:', value: formData.motherPlaceOfBirth, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Le – On the:', value: formData.motherDob, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Domiciliée à – Resident at:', value: formData.motherResidence, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Profession – Occupation:', value: formData.motherOccupation, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Nationalité – Nationality:', value: formData.motherNationality, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Document de référence – Reference document:', value: formData.motherReferenceDocument, className: 'my-2' }),
        React.createElement(ReferenceDocumentNote, null),
        React.createElement(CertificateField, { labelFr: 'Dressé le – Drawn up on:', value: formData.dateDrawn, className: 'my-2' }),
        React.createElement(CertificateField, { labelFr: 'Sur la déclaration de – In accordance with the declaration of:', value: formData.declarant, className: 'my-2' }),
        React.createElement('div', { className: 'w-full my-2 flex items-start gap-2' },
          React.createElement('div', null,
            React.createElement('p', { className: 'font-bold text-[12px]' }, 'Lesquels ont certifié la sincérité de la présente déclaration'),
            React.createElement('p', { className: 'text-[12px]' }, 'Who attested to the truth of this declaration:')
          )
        ),
        React.createElement(CertificateFooter, {
          officer: formData.officer,
          secretary: formData.secretary,
          dateDrawn: formData.dateDrawn
        })
      )
    )
  );
};

export { BirthCertificatePreviewForm };