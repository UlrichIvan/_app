import "./userinfos.css";
const UserInfos = ({ username = "", pre = "" }) => {
  return (
    <>
      <div className="user-infos">
        <div className="circle">
          <div
            title={username?.toUpperCase()}
            className="circle-pre d-flex justify-content-center align-items-center"
          >
            {pre ? pre.toLocaleUpperCase() : username[0]?.toUpperCase()}
            <div className="add-picture" title="new picture">
              <i className="fa fa-pencil" area-hidden="true"></i>
            </div>
          </div>
          <div className="user-name">{username}</div>
        </div>
        <div className="add-background-picture" title="new background">
          <i className="fa fa-plus" area-hidden="true"></i>
        </div>
      </div>
    </>
  );
};
export default UserInfos;
