import React, { useEffect, useState } from "react";
import { reqGetUsersPage, reqDeleteUserById } from "../../../api/reqUsers";
import { message, Button } from "antd";
import { Table, Tag } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import UserHeaderToolBar from "./UserHeaderToolBar/UserHeaderToolBar";
import { useHistory } from "react-router-dom";

function Users() {
  const [usersPage, setUsersPage] = useState({});
  const history = useHistory();

  /**
   * render第一次完成时初始化分页数据
   */
  useEffect(() => {
    initUsersPage(1, 10);
  }, []);

  /**
   * 初始化分页数据
   * @param {*} current
   * @param {*} size
   */
  const initUsersPage = async (current, size) => {
    const result = await reqGetUsersPage(current, size);
    if (result.success) {
      setUsersPage(result.data);
    } else {
      message.error(result.msg);
    }
  };

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
          <CloseCircleTwoTone
            style={{ fontSize: "1.5rem" }}
            twoToneColor="#ff0000"
          />
        )
    },
    {
      title: "roles",
      key: "tbRoles",
      dataIndex: "tbRoles",
      render: tbRoles => (
        <span>
          {tbRoles.map(tbRole => {
            return (
              <Tag key={tbRole.roleId} color="geekblue">
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
      render: (text, user) => (
        <span>
          {/* 携带userId跳转到更新页面 */}
          <Button
            type="primary"
            style={{ marginRight: 16 }}
            onClick={() => {
              history.push("/users/userAddOrUpdate?userId=" + user.userId);
            }}
          >
            修改
          </Button>

          {/* 删除用户 */}
          <Button
            type="primary"
            danger
            onClick={async () => {
              // 1. 删除用户
              const result = await reqDeleteUserById(user.userId);
              // 2. 重新初始化分页数据
              if (result.success) {
                message.success(result.msg);
                if (usersPage.pages === 1) {
                  // 2.1.如果页数只有1页，则初始化第一页
                  initUsersPage(1, usersPage.size);
                } else if (usersPage.total > 1) {
                  // 2.2.如果当前页数量 > 1，则初始化当前页
                  initUsersPage(usersPage.current, usersPage.size);
                } else if (usersPage.total <= 1) {
                  // 2.3.如果当前页数量 <= 1，则初始化上一页
                  initUsersPage(usersPage.current - 1, usersPage.size);
                }
              } else {
                message.error(result.msg);
              }
            }}
          >
            删除
          </Button>
        </span>
      )
    }
  ];

  return (
    <>
      <UserHeaderToolBar setUsersPage={setUsersPage} />
      {Object.keys(usersPage).length !== 0 && (
        <Table
          columns={columns}
          dataSource={usersPage.records}
          pagination={{
            current: usersPage.current,
            total: usersPage.count,
            pageSize: usersPage.size
          }}
          onChange={page => {
            initUsersPage(page.current, page.pageSize);
          }}
        />
      )}
    </>
  );
}

export default Users;
