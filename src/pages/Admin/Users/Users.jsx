import React, { useEffect, useState } from "react";
import { reqGetUsersPage } from "../../../api/reqUsers";
import { message, Button } from "antd";
import { Table, Tag } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import UserHeaderToolBar from "./UserHeaderToolBar/UserHeaderToolBar";

const columns = [
  {
    title: "用户名",
    dataIndex: "userName",
    key: "userName"
  },
  {
    title: "用户邮箱",
    dataIndex: "userEmail",
    key: "userEmail"
  },
  {
    title: "是否启用",
    dataIndex: "userAllow",
    key: "userAllow",
    render: userAllow =>
      userAllow === 1 ? (
        <CheckCircleTwoTone
          style={{ fontSize: "1.5rem" }}
          twoToneColor="#00ffd9"
        />
      ) : (
        <CloseCircleTwoTone twoToneColor="#ff0000" />
      )
  },
  {
    title: "roles",
    key: "tbRoles",
    dataIndex: "tbRoles",
    render: tbRoles => (
      <span>
        {tbRoles.map(tbRole => {
          let color = tbRole.roleName.length > 5 ? "geekblue" : "green";
          return (
            <Tag key={tbRole.roleId} color={color}>
              {tbRole.roleName.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Button type="link" style={{ marginRight: 16 }}>
          Invite {record.name}
        </Button>
        <Button type="link">Delete</Button>
      </span>
    )
  }
];

function Users() {
  const [usersPage, setUsersPage] = useState([]);

  useEffect(() => {
    const initUsersPage = async (current, size) => {
      const result = await reqGetUsersPage(current, size);
      if (result.success) {
        setUsersPage(result.data);
      } else {
        message.error(result.msg);
      }
    };
    initUsersPage(1, 10);
  }, []);

  return (
    <>
      <UserHeaderToolBar setUsersPage={setUsersPage} />
      <Table columns={columns} dataSource={usersPage.records} />
    </>
  );
}

export default Users;
