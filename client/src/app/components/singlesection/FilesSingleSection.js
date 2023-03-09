import React, { memo, useCallback, useState } from "react";
import { docs, docsTab, docsTabNames, links, media } from "../../utils/utils";
import Docs from "./Docs";
import Links from "./Links";
import Media from "./Media";

const FilesSingleSection = () => {
  const [tabs, setTabs] = useState(docsTab);
  const [tab, setTab] = useState(docsTabNames.DOCS);

  const handlerClick = useCallback(
    (tabname, e) => {
      e.preventDefault();
      const newTabs = tabs.map((t) => {
        if (t.name === tabname) {
          t.active = true;
        } else {
          t.active = false;
        }
        return t;
      });
      setTabs(newTabs);
      setTab(tabname);
    },
    [tabs]
  );
  return (
    <div className="FilesSingleSection">
      <div className="tabs">
        {/* tabs target */}
        <ul className="tab-list d-flex align-items-center justify-content-between">
          {tabs.length &&
            tabs.map((tab, i) => {
              return (
                <li
                  key={i}
                  onClick={handlerClick.bind(null, tab.name)}
                  className={`tab ${tab.name + (tab.active ? " active" : "")}`}
                >
                  {tab.name}
                </li>
              );
            })}
        </ul>
        {/* tabs target content  */}
        <div className="tab-contents">
          {tab === docsTabNames.DOCS && <Docs elements={docs} />}
          {tab === docsTabNames.LINKS && <Links elements={links} />}
          {tab === docsTabNames.MEDIA && <Media elements={media} />}
        </div>
      </div>
    </div>
  );
};

export default memo(FilesSingleSection);
