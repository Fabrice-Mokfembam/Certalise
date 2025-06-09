import React from 'react';
import CertificateField from './CertificateField';

interface CertificateFooterProps {
  officer?: string;
  secretary?: string;
  dateDrawn?: string;
}

const CertificateFooter: React.FC<CertificateFooterProps> = ({ 
  officer, 
  secretary, 
  dateDrawn 
}) => {
  return (
    <>      
      <div>
        <div className='w-full my-0.5 flex items-start gap-1'>
          <div>
            <p className='font-semibold text-[8px]'>Par Nous,By Us</p>
          </div>
          <div className='flex-1'>
            <p className='w-full border-b border-dotted border-black min-h-[16px] text-[8px]'>
            {officer}
            </p>
          </div>
          <div>
            <p className='text-[8px]'>Officier</p>
          </div>
        </div>
        <p className='-mt-1 text-[8px]'>d'état civil – Civil Status Registrar</p>
      </div>
      <div>
        <div className='w-full my-0.5 flex items-start gap-1'>
          <div>
            <p className='font-semibold text-[8px]'>Assistée de - In the presence of:</p>
          </div>
          <div className='flex-1'>
            <p className='w-full border-b border-dotted border-black min-h-[16px] text-[8px]'>
              {secretary}
            </p>
          </div>
          <div>
            <p className='text-[8px]'>Secretaire</p>
          </div>
        </div>
        <p className='-mt-1 text-[8px]'>d’état civil – The Civil Status Secretary</p>
      </div>

      <div className='w-full my-0.5 flex justify-center gap-1'>
        <div className="w-[50%] flex gap-1">
          <CertificateField
            labelFr="Le – on the:"
            value={dateDrawn}
            className="my-0.5"
          />
        </div>
      </div>

      <div className="my-1 flex justify-between items-center text-[8px]">
        <div>
          <p>Le Secretaire D'état Civil Registry</p>
          <p>Secretary</p>
        </div>
        <div>
          <p>Signature de Officier D'état Civil</p>
          <p>Signature of Civil Status Registrar</p>
        </div>
      </div>
    </>
  );
};

export default CertificateFooter;