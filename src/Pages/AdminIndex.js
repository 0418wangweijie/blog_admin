import { Layout, Menu, Breadcrumb } from "antd";
import React, { useState } from "react";
import {
  PictureOutlined,
  PieChartOutlined,
  CustomerServiceOutlined,
  ApartmentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import { Route } from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import TypeList from "./type/index";
import MusicList from "./music/index";
import SlideShow from "./slideshow/index";
import Chart from "./Chart";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setcollapsed] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState("");
  const [breadcrumbItem, setBreadcrumbItem] = useState("");
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onCollapse = (collapsed) => {
    setcollapsed(collapsed);
  };
  const rootSubmenuKeys = ["sub", "sub1", "sub2", "sub3", "sub4"];
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onClick = (e) => {
    if (e.key === "articleList") {
      setBreadcrumb("文章管理");
      setBreadcrumbItem("文章列表");
      props.history.push("/index/list/");
    }
    if (e.key === "addArticle") {
      setBreadcrumb("文章管理");
      setBreadcrumbItem("添加文章");
      props.history.push("/index/add/");
    }
    if (e.key === "typeList") {
      setBreadcrumb("类型管理");
      setBreadcrumbItem("类型列表");
      props.history.push("/index/type/");
    }
    if (e.key === "musicList") {
      setBreadcrumb("音乐管理");
      setBreadcrumbItem("音乐列表");
      props.history.push("/index/music/");
    }
    if (e.key === "slideshow") {
      setBreadcrumb("音乐管理");
      setBreadcrumbItem("音乐列表");
      props.history.push("/index/slideshow/");
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff" }} className="header" theme="light">
        <div className="logo">
          <span className="header-logo">王沧海</span>
          <span className="header-txt">后台管理</span>
        </div>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          theme="light"
        >
          <Menu
            theme="light"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onClick}
          >
            <Menu.Item
              key="sub"
              icon={<PieChartOutlined />}
              onClick={() => {
                setBreadcrumb("首页");
                setBreadcrumbItem("");
                props.history.push("/index/");
              }}
            >
              首页
            </Menu.Item>
            <SubMenu key="sub1" icon={<FileTextOutlined />} title="文章管理">
              <Menu.Item key="articleList">文章列表</Menu.Item>
              <Menu.Item key="addArticle">添加文章</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<ApartmentOutlined />} title="类型管理">
              <Menu.Item key="typeList">类型列表</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<CustomerServiceOutlined />}
              title="音乐管理"
            >
              <Menu.Item key="musicList">音乐列表</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<PictureOutlined />} title="轮播图管理">
              <Menu.Item key="slideshow">轮播图列表</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
              <Breadcrumb.Item>{breadcrumbItem}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div>
                <Route path="/index/" exact component={Chart}></Route>
                <Route path="/index/add/" exact component={AddArticle}></Route>
                <Route
                  path="/index/list/"
                  exact
                  component={ArticleList}
                ></Route>
                <Route path="/index/type/" exact component={TypeList}></Route>
                <Route path="/index/music/" exact component={MusicList}></Route>
                <Route
                  path="/index/slideshow/"
                  exact
                  component={SlideShow}
                ></Route>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>©2020 wangweijie blog</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
