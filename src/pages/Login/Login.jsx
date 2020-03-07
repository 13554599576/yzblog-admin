import React from "react";
import "./Login.css";
import { Input, Button } from "antd";
import { reqLogin } from "../../api/reqLogin";

function Login(props) {
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case "userName":
        setUserName(value);
        break;
      case "userPassword":
        setUserPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const userAddDTO = { userName, userPassword };
    const result = await reqLogin(userAddDTO);
    if (result.success) {
      localStorage.setItem("token", result.data);
      props.history.replace("/");
    }
  };

  return (
    <div className="login-background">
      <div className="login-form">
        <p>LOGIN</p>
        <Input
          placeholder="用户名"
          value={userName}
          name="userName"
          onChange={handleInputChange}
        />
        <Input
          placeholder="密码"
          value={userPassword}
          name="userPassword"
          onChange={handleInputChange}
        />
        <div className="login-form-button">
          <Button type="primary" onClick={handleSubmit}>
            登录
          </Button>
          <Button>注册</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
