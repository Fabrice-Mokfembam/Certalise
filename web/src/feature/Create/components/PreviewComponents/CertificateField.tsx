import React from 'react';

interface CertificateFieldProps {
  labelFr: string;
  labelEn?: string;
  value?: string;
  className?: string;
}

const CertificateField: React.FC<CertificateFieldProps> = ({ 
  labelFr, 
  labelEn, 
  value, 
  className = '' 
}) => {
  return (
    <div className={`w-full flex items-start gap-1 ${className}`}>
      <div>
        <p className='font-semibold text-[10px]'>{labelFr}</p>
        {labelEn && <p className='text-[8px]'>{labelEn}</p>}
      </div>
      <div className='flex-1'>
        <p className='w-full border-b border-dotted border-black min-h-[18px]  text-[10px]'>
          {value || ""}
        </p>
      </div>
    </div>
  );
};

export default CertificateField;