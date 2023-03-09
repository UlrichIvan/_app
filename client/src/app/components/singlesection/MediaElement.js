import React, { memo } from "react";

const MediaElement = ({ name = "", type = "PDF", link = "" }) => {
  return (
    <div className="MediaElement">
      <li className="tab-content-item d-flex justify-content-between align-items-center">
        <div className="file  d-flex d-flex align-items-center">
          <div className="logo media">
            <i className={`fa fa-${type} fa-2x`} aria-hidden="true"></i>
          </div>
          <div className="name" title={name}>
            {name}
          </div>
        </div>
        <div className="download" title="Download" data-link={link}>
          <i className="fa fa-download" area-hidden="true"></i>
        </div>
      </li>
    </div>
  );
};

export default memo(MediaElement);
