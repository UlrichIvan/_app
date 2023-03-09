import React, { memo } from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ type = "link", link = "" }) => {
  return (
    <div className="CustomLink">
      <li className="tab-content-item d-flex justify-content-between align-items-center">
        <div className="file  d-flex d-flex align-items-center">
          <div className="logo link">
            <i className={`fa fa-${type} fa-2x`} aria-hidden="true"></i>
          </div>
          <div className="name link" title={link}>
            <Link className="name" to={link} target="_blank">
              {link}
            </Link>
          </div>
        </div>
        <div className="download" title="Download">
          <div className="name" title="copy">
            <i className="fa fa-clone" aria-hidden="true"></i>{" "}
          </div>
        </div>
      </li>
    </div>
  );
};

export default memo(CustomLink);
