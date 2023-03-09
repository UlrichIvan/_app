import { memo } from "react";
import CustomLink from "./CustomLink";

const Links = ({ elements = [] }) => {
  return (
    <div className="Links">
      <ul className="tab-content-target">
        {elements.length &&
          elements.map((el, i) => {
            return <CustomLink key={i} link={el.link} type={el.type} />;
          })}
      </ul>
    </div>
  );
};

export default memo(Links);
