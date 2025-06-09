import React from 'react';

interface CertificateTitleProps {
  certificateNumber?: string;
}

const CertificateTitle: React.FC<CertificateTitleProps> = ({ certificateNumber }) => {
  return (
    <div className='text-center my-1 flex flex-col justify-center items-center'>
      <h1 className='text-[12px] font-bold uppercase'>
        ACTE DE NAISSANCE / BIRTH CERTIFICATE
      </h1>
      <div className='w-[50%] mt-1 flex items-start justify-center gap-1'>
        <div>
          <p className='font-semibold text-[10px]'> N°:</p>
        </div>
        <div className='flex-1'>
          <p className='w-full border-b border-dotted border-black min-h-[16px] text-[10px]'>
            {certificateNumber || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateTitle;