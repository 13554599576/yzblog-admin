import React from "react";
import { Avatar, Button } from "antd";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { reqDeleteToken } from "../../api/reqLogin";

function HeaderAvatarAndDesc(props) {
  const history = useHistory();

  const cancle = () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    reqDeleteToken(token);
    history.replace("/login");
  };

  return (
    <>
      <Avatar src={props.userToken.userIcon} size="large" />
      <span style={{ color: "white", fontSize: "1.5rem" }}>
        {props.userToken.userNickname}
      </span>
      <Button type="link" onClick={cancle}>
        退出
      </Button>
    </>
  );
}

HeaderAvatarAndDesc.propTypes = {
  userToken: PropTypes.object.isRequired
};

export default HeaderAvatarAndDesc;
