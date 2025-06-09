import React from 'react';

const ReferenceDocumentNote:React.FC = () => {
  return (
    <div className='w-full flex items-start gap-1 mb-1'>
      <div className='flex-1 text-[8px] italic'>
        <p className='w-full border-b border-dotted border-transparent min-h-[12px]'>
          (Numéro de la Carte Nationale d'identité, ou références de
          l'acte de naissance, ou références du document prouvant la
          nationalité )
        </p>
        <p>
          ( National identity Card Number, or references of the Birth
          Certificate, or References of the Document attesting the
          Nationality)
        </p>
      </div>
    </div>
  );
};

export default ReferenceDocumentNote;