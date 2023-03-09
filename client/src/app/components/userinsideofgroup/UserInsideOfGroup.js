import React, { useCallback, useMemo, useState } from "react";
import User from "./User";
const UserInsideOfGroup = ({ group, username }) => {
  const [displayFilter, setDisplayFilter] = useState(false);
  const [search, setSearch] = useState("");

  const handlerClick = useCallback(
    (e) => {
      e.preventDefault();
      setDisplayFilter(!displayFilter);
      setSearch("");
    },
    [displayFilter, setDisplayFilter, setSearch]
  );

  const filterFriends = useMemo(() => {
    let gps = group.userFriends.filter((f) => {
      if (search.trim().length) {
        return f.indexOf(search) !== -1;
      } else return true;
    });
    return gps.length
      ? gps.map((f, i) => {
          return (
            <User
              key={i}
              f={f === username ? "vous" : f}
              title={f}
              pre={f[0]}
            />
          );
        })
      : group.userFriends.map((f, i) => {
          return (
            <User
              key={i}
              f={f === username ? "vous" : f}
              title={f}
              pre={f[0]}
            />
          );
        });
  }, [group.userFriends, username, search]);

  return (
    <>
      <div className="chat-users-inside-of-group">
        <div className="header d-flex align-items-center justify-content-between">
          {displayFilter ? (
            <div className="filter-users">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus={"on"}
                autoComplete={"off"}
                id="user-search-friend"
                placeholder="Filter members..."
              />
            </div>
          ) : (
            <div className="wrapper d-flex align-items-center w-100">
              <span className="header-icon">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
              <h3>Members</h3>
            </div>
          )}
          <span className="user-icon-dow" onClick={handlerClick}>
            <i
              className={displayFilter ? "fa fa-close" : "fa fa-search"}
              area-hidden="true"
              title={displayFilter ? "close filter" : "click and filter users"}
            ></i>
          </span>
        </div>
        {group.userFriends.length === 0 && (
          <div
            className="loader-messages"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              textAlign: "center",
            }}
          >
            loading...
          </div>
        )}
        <div className="users">
          <ul className="user-body">{filterFriends}</ul>
        </div>
      </div>
    </>
  );
};

export default UserInsideOfGroup;
