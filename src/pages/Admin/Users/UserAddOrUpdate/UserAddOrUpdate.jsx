import React, { useEffect, useState } from "react";
import "./UserAddOrUpdate.less";
import { Input, message, Select, Switch, Button } from "antd";
import { reqGetRoles } from "../../../../api/reqRoles";
import { useLocation } from "react-router-dom";
import {
  reqAddUser,
  reqGetUserById,
  reqUpdateUserById
} from "../../../../api/reqUsers";
import {
  userNameValid,
  userPasswordValid,
  userEmailValid,
  userConfirmPasswordValid,
  isNotEmptyValid
} from "../../../../utils/dataValidUtils";

function UserAddOrUpdate() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRealName, setUserRealName] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [roleIds, setRoleIds] = useState([]);
  const [userAllow, setUserAllow] = useState(1);

  const [isUpdate, setIsUpdate] = useState(false);
  const [userId, setUserId] = useState(0);

  const [roles, setRoles] = useState([]);
  const location = useLocation();

  /**
   * Input 标签改变事件
   * @param {*} e
   */
  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "userName":
        setUserName(value);
        break;
      case "userPassword":
        setUserPassword(value);
        break;
      case "userConfirmPassword":
        setUserConfirmPassword(value);
        break;
      case "userEmail":
        setUserEmail(value);
        break;
      case "userNickname":
        setUserNickname(value);
        break;
      case "userRealName":
        setUserRealName(value);
        break;
      default:
        break;
    }
  };

  /**
   * Select标签改变触发事件
   * @param {*} value
   */
  const handleSelectChange = value => {
    setRoleIds(value);
  };

  /**
   * Switch标签改变触发事件
   * @param {*} value
   */
  const handleSwitchChange = value => {
    setUserAllow(value ? 1 : 0);
  };

  /**
   * 提交数据
   */
  const handleSubmit = async () => {
    // 校验数据
    if (!userNameValid(userName)) {
      message.error("用户名必须是6-18位，只允许包含大小写字母和数字");
      return;
    } else if (!userPasswordValid(userPassword)) {
      message.error("密码必须是6-18位，只允许包含大小写字母和数字");
      return;
    } else if (!userConfirmPasswordValid(userPassword, userConfirmPassword)) {
      message.error("两次密码输入不匹配");
      return;
    } else if (!userEmailValid(userEmail)) {
      message.error("邮箱格式不正确");
      return;
    } else if (!isNotEmptyValid(userRealName)) {
      message.error("请输入姓名");
      return;
    } else if (!isNotEmptyValid(userNickname)) {
      message.error("请输入昵称");
      return;
    } else if (!isNotEmptyValid(roleIds)) {
      message.error("请选择角色");
      return;
    }

    const user = {
      userName,
      userPassword,
      userRealName,
      userEmail,
      userAllow,
      userNickname,
      roleIds
    };
    // 添加
    if (!isUpdate) {
      const result = await reqAddUser(user);
      result.success ? message.success(result.msg) : message.error(result.msg);
    } else {
      // 更新
      user.userId = userId;
      const result = await reqUpdateUserById(user);
      result.success ? message.success(result.msg) : message.error(result.msg);
    }
  };

  /**
   * 查询所有角色
   */
  useEffect(() => {
    const initRoles = async () => {
      const result = await reqGetRoles();
      result.success ? setRoles(result.data) : message.error("初始化角色失败");
    };
    initRoles();
  }, []);

  /**
   * 如果是更新则初始化参数，若成功初始化，给数据赋值
   */
  useEffect(() => {
    const initParams = async () => {
      const params = new URLSearchParams(location.search);
      const userId = params.get("userId");
      if (userId) {
        const result = await reqGetUserById(userId);
        if (result.success) {
          const user = result.data;
          setIsUpdate(true);
          setUserId(user.userId);
          setUserName(user.userName);
          setUserPassword(user.userPassword);
          setUserConfirmPassword(user.userPassword);
          setUserEmail(user.userEmail);
          setUserRealName(user.userRealName);
          setUserAllow(user.userAllow);
          setUserNickname(user.userNickname);
          const roleIds = user.tbRoles.map(role => role.roleId.toString());
          setRoleIds(roleIds);
        }
      }
    };
    initParams();
  }, [location]);

  return (
    <div className="user-add-update-container">
      {/* 用户ID */}
      {isUpdate ? (
        <div className="user-info-item">
          <div className="desc">用户ID:</div>
          <Input value={userId} disabled />
        </div>
      ) : null}

      {/* 用户名 */}
      <div className="user-info-item">
        <div className="desc">*用户名:</div>
        <Input
          value={userName}
          onChange={handleInputChange}
          name="userName"
          onBlur={() =>
            userNameValid(userName) ||
            message.error("用户名必须是6-18位，只允许包含大小写字母和数字")
          }
        />
      </div>

      {/* 密码 */}
      <div className="user-info-item">
        <div className="desc">*密码:</div>
        <Input.Password
          value={userPassword}
          onChange={handleInputChange}
          name="userPassword"
          onBlur={() =>
            userPasswordValid(userPassword) ||
            message.error("密码必须是6-18位，只允许包含大小写字母和数字")
          }
        />
      </div>

      {/* 确认密码 */}
      {isUpdate || (
        <div className="user-info-item">
          <div className="desc">*确认密码:</div>
          <Input.Password
            value={userConfirmPassword}
            onChange={handleInputChange}
            name="userConfirmPassword"
            onBlur={() =>
              userConfirmPasswordValid(userPassword, userConfirmPassword) ||
              message.error("两次密码输入不匹配")
            }
          />
        </div>
      )}

      {/* 邮箱 */}
      <div className="user-info-item">
        <div className="desc">*邮箱:</div>
        <Input
          value={userEmail}
          onChange={handleInputChange}
          name="userEmail"
          onBlur={() =>
            userEmailValid(userEmail) || message.error("邮箱格式不正确")
          }
        />
      </div>

      {/* 姓名 */}
      <div className="user-info-item">
        <div className="desc">*姓名:</div>
        <Input
          value={userRealName}
          onChange={handleInputChange}
          name="userRealName"
          onBlur={() =>
            isNotEmptyValid(userRealName) || message.error("请输入姓名")
          }
        />
      </div>

      {/* 昵称 */}
      <div className="user-info-item">
        <div className="desc">*昵称:</div>
        <Input
          value={userNickname}
          onChange={handleInputChange}
          name="userNickname"
          onBlur={() =>
            isNotEmptyValid(userNickname) || message.error("请输入昵称")
          }
        />
      </div>

      {/* 角色 */}
      <div className="user-info-item">
        <div className="desc">*角色:</div>
        <div style={{ width: "100%" }}>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            value={roleIds}
            onChange={handleSelectChange}
            onBlur={() =>
              isNotEmptyValid(roleIds) || message.error("请选择角色")
            }
          >
            {roles.map(role => (
              <Select.Option key={role.roleId}>{role.roleName}</Select.Option>
            ))}
          </Select>
        </div>
      </div>

      {/* 是否开启 */}
      <div className="user-info-item">
        <div className="desc">*是否开启:</div>
        <div style={{ width: "100%" }}>
          <Switch
            checked={userAllow === 1 ? true : false}
            onChange={handleSwitchChange}
          />
        </div>
      </div>

      {/* 提交 */}
      <div className="user-info-item">
        <div className="desc"></div>
        <div style={{ width: "100%" }}>
          <Button type="primary" onClick={handleSubmit}>
            注册
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserAddOrUpdate;
