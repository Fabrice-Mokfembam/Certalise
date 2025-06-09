import { CertificateField } from "./CertificateField.js";
import { CertificateFooter } from "./CertificateFooter.js";
import { CertificateHeader } from "./CertificateHeader.js";
import { CertificateTitle } from "./CertificateTitle.js";
import { ReferenceDocumentNote } from "./ReferenceDocumentNote.js";

const BirthCertificatePreviewForm = ({ formData }) => {
    return React.createElement('div', {
      className: 'certificate-container bg-white w-[595px] h-[842px] shadow-sm font-serif box-border',
      style: { fontSize: '10px', lineHeight: '1.2' }
    },
      React.createElement('div', { id: 'certificate-preview', className: 'w-full h-full px-4 pt-2 flex flex-col text-black' },
        React.createElement(CertificateHeader, null),
        React.createElement('div', { className: 'w-full text-center text-[11px] mb-1' },
          React.createElement('p', null, 'CENTRE D’ÉTAT CIVIL / CIVIL STATUS REGISTRATION CENTRE'),
          React.createElement('div', null,
            React.createElement('p', { className: 'inline-block text-[10px]' },
              'de - of : ',
              React.createElement('span', null, '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _')
            )
          )
        ),
        React.createElement('div', { className: 'text-center text-[9px] mb-1' },
          React.createElement('p', null,
            React.createElement('span', { className: 'font-bold' }, 'Centre d’état civil secondaire de rattachement'),
            ' (pour les centres secondaires)'
          ),
          React.createElement('p', null, 'Main Civil Status Registry of Attachment (for secondary civil status registry)')
        ),
        React.createElement('p', { className: 'text-center text-[9px] mb- justly' }, '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _'),
        React.createElement(CertificateTitle, { certificateNumber: formData.certificateNumber }),
        React.createElement('div', { className: 'w-full text-[10px] leading-[1.2]' },
          React.createElement(CertificateField, { labelFr: 'Nom de L’enfant :', labelEn: 'Surname of child', value: formData.surName, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Prenoms de L’enfant :', labelEn: 'Given name of the child', value: formData.givenName, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Né le – Born on the:', value: formData.dob, className: 'my-1 justify-center' }),
          React.createElement(CertificateField, { labelFr: 'A – at', value: formData.placeOfBirth, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'De sexe / Sex:', value: formData.sex, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'De – of:', value: formData.fatherName, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Née à – Born at:', value: formData.fatherPlaceOfBirth, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Le – On the:', value: formData.fatherDob, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Domiciliée à – Resident at:', value: formData.fatherResidence, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Profession – Occupation:', value: formData.fatherOccupation, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Nationalité – Nationality:', value: formData.fatherNationality, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Document de référence – Reference document:', value: formData.fatherReferenceDocument, className: 'my-1' }),
          React.createElement(ReferenceDocumentNote, null),
          React.createElement(CertificateField, { labelFr: 'Et de – And of:', value: formData.motherName, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Née à – Born at:', value: formData.motherPlaceOfBirth, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Le – On the:', value: formData.motherDob, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Domiciliée à – Resident at:', value: formData.motherResidence, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Profession – Occupation:', value: formData.motherOccupation, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Nationalité – Nationality:', value: formData.motherNationality, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Document de référence – Reference document:', value: formData.motherReferenceDocument, className: 'my-1' }),
          React.createElement(ReferenceDocumentNote, null),
          React.createElement(CertificateField, { labelFr: 'Dressé le – Drawn up on:', value: formData.dateDrawn, className: 'my-1' }),
          React.createElement(CertificateField, { labelFr: 'Sur la déclaration de – In accordance with the declaration of:', value: formData.declarant, className: 'my-1' }),
          React.createElement('div', { className: 'w-full my-1 flex items-start gap-2' },
            React.createElement('div', null,
              React.createElement('p', { className: 'font-bold text-[10px]' }, 'Lesquels ont certifié la sincérité de la présente déclaration'),
              React.createElement('p', { className: 'text-[10px]' }, 'Who attested to the truth of this declaration:')
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

  export {BirthCertificatePreviewForm}