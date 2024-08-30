import React from 'react';

const ReferenceTab = ({ refNumber, title, url }) => (
  <div className="rounded-md py-2 pl-1 font-normal text-indigo-950 hover:bg-indigo-200 transition duration-150 ease-in-out my-1 min-w-20">
    <a
      className=""
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="">[{refNumber}]</span>
      <span className="ml-1">{title}</span>
    </a>
    </div>
  );

const References = ({ references, referenceTitle }) => {
    return (
        references.length > 0 && (
            <div className="mt-10 border-t-indigo-900 border-t-4 pt-6 text-lg">
              <div className="break-words">
                {references.map((ref, index) => (
                  <ReferenceTab
                    key={index}
                    refNumber={ref['ref_num']}
                    title={ref['title']}
                    url={ref['url']} />
                ))}
              </div>
            </div>
          )
    );
}
export default References;