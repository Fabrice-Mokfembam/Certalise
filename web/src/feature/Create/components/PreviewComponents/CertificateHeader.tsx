import React from 'react';

const CertificateHeader:React.FC = () => {
  return (
    <div className='flex w-full justify-between text-[10px] mb-1'>
      <div className='text-center'>
        <p className='text-[11px]'>RÉPUBLIQUE DU CAMEROUN</p>
        <p>Paix – Travail – Patrie</p>
        <div className='mt-2'>
          {['REGION', 'DEPARTEMENT', 'ARRONDISSEMENT'].map((item) => (
            <div key={item} className='my-1 text-center'>
              <p className='w-[10vw] pb-2 border-b border-dashed text-[9px]'>{item}</p>
              {/* <p className="text-[8px]">_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p> */}
            </div>
          ))}
        </div>
      </div>
      <div className='text-center'>
        <p className='text-[11px]'>REPUBLIC OF CAMEROON</p>
        <p>Peace – Work – Fatherland</p>
        <div className='mt-2'>
          {['REGION', 'DIVISION', 'SUBDIVISION'].map((item) => (
            <div key={item} className='my-1 text-center'>
              <p className='w-[10vw] pb-2 border-b border-dashed text-[9px]'>{item}</p>
              {/* <p className="text-[8px]">_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateHeader;