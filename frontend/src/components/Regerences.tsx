import React from 'react';

const ReferenceTab = ({ refNumber, title, url }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="reference-tab inline-block bg-gray-200 rounded-lg py-2 px-3 text-sm font-medium text-gray-800 hover:bg-gray-300 transition duration-150 ease-in-out m-1"
    >
      <span className="font-bold">[{refNumber}]</span>
      <span className="block">{title}</span>
    </a>
  );

const References = ({ references }) => {
    return (
        references.length > 0 && (
            <div className="mt-8 border-t pt-4">
              <h2 className="text-xl font-bold mb-4">{t('references')}</h2>
              <div className="references-container">
                {references.map((ref, index) => (
                  <ReferenceTab
                    key={index}
                    refNumber={ref[0]}
                    title={ref[1]}
                    url={ref[2]} />
                ))}
              </div>
            </div>
          )
    );
}
export default References;