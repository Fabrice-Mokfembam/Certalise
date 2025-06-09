export const CertificateTitle = ({ certificateNumber }) => {
    return React.createElement('div', { className: 'text-center my-1 flex flex-col justify-center items-center' },
      React.createElement('h1', { className: 'text-[12px] font-bold uppercase' }, 'ACTE DE NAISSANCE / BIRTH CERTIFICATE'),
      React.createElement('div', { className: 'w-[50%] mt-1 flex items-start justify-center gap-1' },
        React.createElement('div', null,
          React.createElement('p', { className: 'font-semibold text-[10px]' }, 'N°:')
        ),
        React.createElement('div', { className: 'flex-1' },
          React.createElement('p', { className: 'w-full border-b border-dotted border-black min-h-[16px] text-[10px]' }, certificateNumber || '')
        )
      )
    );
  };
  