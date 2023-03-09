import React from "react";

const GroupHeader = ({
  displaySearch = true,
  setSearch = () => {},
  handlerSearch = () => {},
  search = "",
}) => {
  return (
    <>
      <div
        className="user-header d-flex justify-content-between align-items-center"
        style={{ marginTop: "1rem" }}
      >
        <div
          className={
            "user-title d-flex justify-content-start align-items-center " +
            (displaySearch ? "search" : "")
          }
        >
          {displaySearch ? (
            <>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus={"on"}
                autoComplete={"off"}
                id="user-search-friend"
                placeholder="search..."
              />
            </>
          ) : (
            <>
              <span className="user-icon-dow">
                <i className="fa fa-users" area-hidden="true"></i>
              </span>
              <h3>Yours Groups</h3>
            </>
          )}
        </div>
        <div className="icons" onClick={handlerSearch}>
          <span
            className="user-icon-search"
            title={displaySearch ? "close" : "click here to filter the groups"}
          >
            <i
              className={"fa " + (displaySearch ? "fa-close" : "fa-search")}
              area-hidden="true"
            ></i>
          </span>
        </div>
      </div>
    </>
  );
};

export default GroupHeader;
