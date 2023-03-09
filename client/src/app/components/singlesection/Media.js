import React, { memo } from "react";
import MediaElement from "./MediaElement";

const Media = ({ elements = [] }) => {
  return (
    <div className="Media">
      <ul className="tab-content-target">
        {elements.length &&
          elements.map((el, i) => {
            return (
              <MediaElement
                key={i}
                name={el.name}
                type={el.type}
                link={el.link}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default memo(Media);
