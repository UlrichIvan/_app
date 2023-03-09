import React from "react";
import "./userinfos.css";
const UserInfosDescriptions = ({ name = "", pre = "" }) => {
  return (
    <>
      <div className="user-infos">
        <div className="circle">
          <div
            title={name?.toUpperCase()}
            className="circle-pre d-flex justify-content-center align-items-center"
          >
            {pre ? pre.toLocaleUpperCase() : name[0]?.toUpperCase()}
            <div className="add-picture" title="new picture">
              <i className="fa fa-pencil" area-hidden="true"></i>
            </div>
          </div>
          <div className="user-name">{name}</div>
        </div>
        <div className="add-background-picture" title="new background">
          <i className="fa fa-plus" area-hidden="true"></i>
        </div>
      </div>
    </>
  );
};

export default UserInfosDescriptions;
