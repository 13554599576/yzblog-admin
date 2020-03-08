import React from "react";
import { Input, Button, message } from "antd";
import PropTypes from "prop-types";
import { reqGetUsersPage } from "../../../../api/reqUsers";
import { useHistory } from "react-router-dom";

function UserHeaderToolBar({ setUsersPage }) {
  const history = useHistory();

  const toUserAddOrUpdate = () => {
    history.push("/users/userAddOrUpdate");
  };

  /**
   * 回车键调用，根据关键字初始化用户
   * @param {*} e
   */
  const handleEnter = async e => {
    if (e.target.value !== "") {
      const result = await reqGetUsersPage(1, 10, e.target.value);
      if (result.success) {
        setUsersPage(result.data);
      } else {
        message.error(result.msg);
      }
    }
  };

  return (
    <div className="toolbar-container">
      <Input.Search
        style={{ width: "15rem", marginRight: "1.5rem" }}
        onPressEnter={handleEnter}
      />
      <Button
        type="primary"
        style={{ marginRight: "2rem" }}
        onClick={toUserAddOrUpdate}
      >
        添加
      </Button>
      <Button type="danger">清空所有</Button>
    </div>
  );
}

UserHeaderToolBar.propTypes = {
  setUsersPage: PropTypes.func.isRequired
};

export default UserHeaderToolBar;
