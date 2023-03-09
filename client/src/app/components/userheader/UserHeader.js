import React from "react";

const UserHeader = ({
  displaySearch = true,
  setSearch = () => {},
  handlerSearch = () => {},
  search = "",
}) => {
  return (
    <>
      <div className="user-header d-flex justify-content-between align-items-center">
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
                placeholder="search your friend..."
              />
            </>
          ) : (
            <>
              <span className="user-icon-dow">
                <i className="fa fa-user" area-hidden="true"></i>
              </span>
              <h3>Yours friends</h3>
            </>
          )}
        </div>
        <div className="icons" onClick={handlerSearch}>
          <span
            className="user-icon-search"
            title={
              displaySearch ? "close" : "click here to search your friends"
            }
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

export default UserHeader;
