import React, { useState, useEffect } from "react";
import "./Admin.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  SafetyOutlined,
  AreaChartOutlined,
  FileOutlined,
  FileTextOutlined,
  UserOutlined,
  QrcodeOutlined,
  TagOutlined
} from "@ant-design/icons";
import HeaderAvatarAndDesc from "../../components/HeaderAvatarAndDesc/HeaderAvatarAndDesc";
import { reqGetToken } from "../../api/reqLogin";
import Users from "./Users/Users";
import { useHistory, useLocation, Route, Switch } from "react-router-dom";
import UserAddOrUpdate from "./Users/UserAddOrUpdate/UserAddOrUpdate";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

/**
 * 由于antd 4.0不再提供Icon组件，转而使用了独立的包。也就是说无法再像以前一样快乐的玩耍了。
 * 不定义数组导航json了，该咋写咋写吧。
 */
// const menuList = [];

function Admin() {
  const [selectedKeys, setSelectedKeys] = useState("1");
  const [collapsed, setCollapsed] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const history = useHistory();
  const location = useLocation();

  /**
   * 获取token的信息
   */
  useEffect(() => {
    const getToken = async () => {
      if (localStorage.getItem("token")) {
        const result = await reqGetToken(localStorage.getItem("token"));
        if (result.success) {
          setUserToken(result.data);
        }
      } else {
        history.replace("/login");
      }
    };
    getToken();
  }, [history, selectedKeys]);

  const splitPathname = () => {
    const splits = location.pathname.split("/");
    splits.splice(0, 1);
    return splits.map((split, index) => (
      <Breadcrumb.Item key={index}>{split}</Breadcrumb.Item>
    ));
  };

  /**
   * 左侧菜单展开和收缩
   * @param {} collapsed
   */
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  /**
   * 点击导航key改变
   * @param {} e
   */
  const handleClick = e => {
    history.push(e.key);
    setSelectedKeys(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          selectedKeys={[selectedKeys]}
          onClick={handleClick}
          mode="inline"
        >
          {/* 用户管理 */}
          <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                <span>User Admin</span>
              </span>
            }
          >
            <Menu.Item key="/users">
              <UserOutlined />
              <span>User Admin</span>
            </Menu.Item>
            <Menu.Item key="/roles">
              <SafetyOutlined />
              <span>Role Admin</span>
            </Menu.Item>
          </SubMenu>
          {/* 博文管理 */}
          <SubMenu
            key="sub2"
            title={
              <span>
                <FileTextOutlined />
                <span>Article Admin</span>
              </span>
            }
          >
            <Menu.Item key="6">
              <FileTextOutlined />
              <span>Article Admin</span>
            </Menu.Item>
            <Menu.Item key="7">
              <QrcodeOutlined />
              <span>Type Admin</span>
            </Menu.Item>
            <Menu.Item key="8">
              <TagOutlined />
              <span>Tag Admin</span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <FileOutlined />
          </Menu.Item>
          <Menu.Item key="/thread-pool">
            <AreaChartOutlined />
            <span>Thread Admin</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* 头部 */}
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {userToken ? <HeaderAvatarAndDesc userToken={userToken} /> : null}
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {splitPathname()}
          </Breadcrumb>
          <div
            className="site-layout-content"
            style={{ padding: 24, minHeight: "80vh" }}
          >
            <Switch>
              <Route path="/users/userAddOrUpdate" component={UserAddOrUpdate} />
              <Route path="/users" component={Users} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
