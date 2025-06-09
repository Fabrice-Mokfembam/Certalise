export const CertificateFooter = ({ officer, secretary, dateDrawn }) => {
    return React.createElement(React.Fragment, null,
      React.createElement('div', null,
        React.createElement('div', { className: 'w-full my-0.5 flex items-start gap-1' },
          React.createElement('div', null,
            React.createElement('p', { className: 'font-semibold text-[8px]' }, 'Par Nous, By Us')
          ),
          React.createElement('div', { className: 'flex-1' },
            React.createElement('p', { className: 'w-full border-b border-dotted border-black min-h-[16px] text-[8px]' }, officer)
          ),
          React.createElement('div', null,
            React.createElement('p', { className: 'text-[8px]' }, 'Officier')
          )
        ),
        React.createElement('p', { className: '-mt-1 text-[8px]' }, 'd’état civil – Civil Status Registrar')
      ),
      React.createElement('div', null,
        React.createElement('div', { className: 'w-full my-0.5 flex items-start gap-1' },
          React.createElement('div', null,
            React.createElement('p', { className: 'font-semibold text-[8px]' }, 'Assistée de - In the presence of:')
          ),
          React.createElement('div', { className: 'flex-1' },
            React.createElement('p', { className: 'w-full border-b border-dotted border-black min-h-[16px] text-[8px]' }, secretary)
          ),
          React.createElement('div', null,
            React.createElement('p', { className: 'text-[8px]' }, 'Secretaire')
          )
        ),
        React.createElement('p', { className: '-mt-1 text-[8px]' }, 'd’état civil – The Civil Status Secretary')
      ),
      React.createElement('div', { className: 'w-full my-0.5 flex justify-center gap-1' },
        React.createElement('div', { className: 'w-[50%] flex gap-1' },
          React.createElement(CertificateField, {
            labelFr: 'Le – on the:',
            value: dateDrawn,
            className: 'my-0.5'
          })
        )
      ),
      React.createElement('div', { className: 'my-1 flex justify-between items-center text-[8px]' },
        React.createElement('div', null,
          React.createElement('p', null, 'Le Secretaire D’état Civil Registry'),
          React.createElement('p', null, 'Secretary')
        ),
        React.createElement('div', null,
          React.createElement('p', null, 'Signature de Officier D’état Civil'),
          React.createElement('p', null, 'Signature of Civil Status Registrar')
        )
      )
    );
  };