export const CertificateHeader = () => {
    return React.createElement('div', { className: 'flex w-full justify-between text-[10px] mb-1' },
      React.createElement('div', { className: 'text-center' },
        React.createElement('p', { className: 'text-[11px]' }, 'RÉPUBLIQUE DU CAMEROUN'),
        React.createElement('p', null, 'Paix – Travail – Patrie'),
        React.createElement('div', { className: 'mt-2' },
          ['REGION', 'DEPARTEMENT', 'ARRONDISSEMENT'].map(item =>
            React.createElement('div', { key: item, className: 'my-1 text-center' },
              React.createElement('p', { className: 'w-[10vw] pb-2 border-b border-dashed text-[9px]' }, item)
            )
          )
        )
      ),
      React.createElement('div', { className: 'text-center' },
        React.createElement('p', { className: 'text-[11px]' }, 'REPUBLIC OF CAMEROON'),
        React.createElement('p', null, 'Peace – Work – Fatherland'),
        React.createElement('div', { className: 'mt-2' },
          ['REGION', 'DIVISION', 'SUBDIVISION'].map(item =>
            React.createElement('div', { key: item, className: 'my-1 text-center' },
              React.createElement('p', { className: 'w-[10vw] pb-2 border-b border-dashed text-[9px]' }, item)
            )
          )
        )
      )
    );
  };