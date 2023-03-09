import { memo } from "react";
import Doc from "./Doc";

const Docs = ({ elements = [] }) => {
  return (
    <div className="docs">
      <ul className="tab-content-target">
        {elements.length &&
          elements.map((doc, i) => {
            return (
              <Doc key={i} name={doc.name} type={doc.type} link={doc.link} />
            );
          })}
      </ul>
    </div>
  );
};

export default memo(Docs);
