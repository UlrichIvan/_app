const UserFriendDescriptions = ({ name = "", pre = "", isauth = false }) => {
  return (
    <div className="UserFriendDescriptions">
      <div className="user-infos">
        <div className="circle">
          <div
            title={name?.toUpperCase()}
            className="circle-pre d-flex justify-content-center align-items-center"
          >
            {pre ? pre.toLocaleUpperCase() : name[0]?.toUpperCase()}
          </div>
          <div className="user-name">{name}</div>
        </div>
        <p
          style={{
            color: "white",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {isauth ? "En ligne" : "hors ligne"}
        </p>
        <div className="call-messages d-flex justify-content-center align-items-center">
          <div className="audio-call" title={"Audio call with " + name}>
            <i className="fa fa-phone" area-hidden="true"></i>
          </div>
          <div className="video-call" title={"Video call with " + name}>
            <i className="fa fa-video-camera" area-hidden="true"></i>
          </div>
          <div
            className="count-new-messages position-relative"
            title={"Messages notifications from " + name}
          >
            <div className="badge-number position-absolute">
              <div className="number">4</div>
            </div>
            <i className="fa fa-bell" area-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFriendDescriptions;
