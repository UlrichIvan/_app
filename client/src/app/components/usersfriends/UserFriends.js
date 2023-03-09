import { memo, useMemo } from "react";
import UserFriend from "../userfriend/UserFriend";
import UserHeader from "../userheader/UserHeader";
import "./userfriends.css";
const UserFriends = ({
  displaySearch = false,
  friends = [],
  setSearch = () => {},
  handlerSearch = () => {},
  search = "",
}) => {
  const filterFriends = useMemo(() => {
    let gps = friends.filter((f) => {
      if (search.trim().length) {
        return f.name.indexOf(search) !== -1;
      } else return true;
    });
    return gps.length
      ? gps.map((f, i) => {
          return <UserFriend key={i} f={f} isauth={f.isauth} />;
        })
      : friends;
  }, [friends, search]);

  return (
    <>
      <div className="user-friends">
        <UserHeader
          displaySearch={displaySearch}
          handlerSearch={handlerSearch}
          setSearch={setSearch}
          search={search}
        />
        {<ul className="user-body">{filterFriends}</ul>}
      </div>
    </>
  );
};

export default memo(UserFriends);
