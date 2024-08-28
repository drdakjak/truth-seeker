import React from 'react';

const ReferenceTab = ({ refNumber, title, url }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-indigo-100 rounded-lg py-2 px-3 text-sm font-normal text-indigo-950 hover:bg-indigo-200 transition duration-150 ease-in-out m-1 min-w-40 max-w-60"
    >
      <span className="font-bold">[{refNumber}]</span>
      <span className="block">{title}</span>
    </a>
  );

const References = ({ references, referenceTitle }) => {
    return (
        references.length > 0 && (
            <div className="mt-10 ">
              {/* <h2 className="">{referenceTitle}</h2> */}
              <div className="flex flex-wrap text-center break-words justify-items-stretch">
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