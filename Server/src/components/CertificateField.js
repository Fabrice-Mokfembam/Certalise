export const CertificateField = ({ labelFr, labelEn, value, className = '' }) => {
    return React.createElement('div', { className: `w-full flex items-start gap-1 ${className}` },
      React.createElement('div', null,
        React.createElement('p', { className: 'font-semibold text-[10px]' }, labelFr),
        labelEn && React.createElement('p', { className: 'text-[8px]' }, labelEn)
      ),
      React.createElement('div', { className: 'flex-1' },
        React.createElement('p', { className: 'w-full border-b border-dotted border-black min-h-[18px] text-[10px]' }, value || '')
      )
    );
  };