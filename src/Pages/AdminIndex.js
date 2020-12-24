import { Layout, Menu, Breadcrumb } from 'antd';
import React, { useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {

    const [collapsed, setcollapsed] = useState(false)
    const [articleType, setArticleType] = useState('')
    const onCollapse = collapsed => {
        setcollapsed(collapsed)
    };

    const handleClickArticle = e => {
        if (e.key == 'articleList') {
            setArticleType('文章列表')
            props.history.push('/index/list/')
        }
        if (e.key == 'addArticle') {
            setArticleType('添加文章')
            props.history.push('/index/add/')
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        首页
            </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        博客
            </Menu.Item>
                    <SubMenu key="sub1" onClick={handleClickArticle} icon={<UserOutlined />} title="文章管理">
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
            </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                        <Breadcrumb.Item>{articleType}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div >
                            <Route path='/index/' exact component={AddArticle}></Route>
                            <Route path='/index/add/' exact component={AddArticle}></Route>
                            <Route path='/index/list/' exact component={ArticleList}></Route>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2020 wangweijie blog</Footer>
            </Layout>
        </Layout>

    );
}

export default AdminIndex