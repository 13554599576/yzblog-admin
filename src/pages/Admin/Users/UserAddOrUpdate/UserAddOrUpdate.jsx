import React from "react";
import "./UserAddOrUpdate.less";
import { Input, message, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const config = [
  { title: "username", placeholder: "用户名" },
  { title: "password", placeholder: "密码" },
  { title: "email", placeholder: "邮箱" }
];

const props = {
  name: "file",
  action: "http://localhost/admin/upload",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

function UserAddOrUpdate() {
  return (
    <div className="user-add-update-container">
      {config.map((item, index) => {
        return (
          <div key={index}>
            <span>{item.title}</span>
            <Input style={{ width: "10rem" }} placeholder={item.placeholder} />
          </div>
        );
      })}
			icon:
      <Upload {...props}>
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
    </div>
  );
}

export default UserAddOrUpdate;
