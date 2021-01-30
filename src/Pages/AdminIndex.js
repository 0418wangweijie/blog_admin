import { Layout, Menu, Breadcrumb } from 'antd';
import React, { useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    SwitcherOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import TypeList from './type/index'
import MusicList from './music/index'
import Chart from './Chart'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {

    const [collapsed, setcollapsed] = useState(false)
    const [breadcrumb, setBreadcrumb] = useState('')
    const [breadcrumbItem, setBreadcrumbItem] = useState('')
    const onCollapse = collapsed => {
        setcollapsed(collapsed)
    };

    const handleClickArticle = e => {
        // eslint-disable-next-line eqeqeq
        if (e.key == 'articleList') {
            setBreadcrumb('文章管理')
            setBreadcrumbItem('文章列表')
            props.history.push('/index/list/')
        }
        // eslint-disable-next-line eqeqeq
        if (e.key == 'addArticle') {
            setBreadcrumb('文章管理')
            setBreadcrumbItem('添加文章')
            props.history.push('/index/add/')
        }
    }
    const handleClickType = e => {
        if (e.key === "typeList") {
            setBreadcrumb('类型管理')
            setBreadcrumbItem('类型列表')
            props.history.push('/index/type/')
        }
    }
    const handleClickMusic = e => {
        if (e.key === "musicList") {
            setBreadcrumb('音乐管理')
            setBreadcrumbItem('音乐列表')
            props.history.push('/index/music/')
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => props.history.push('/index/')}>
                        首页
                    </Menu.Item>
                    <SubMenu key="sub1" onClick={handleClickArticle} icon={<FileTextOutlined />} title="文章管理">
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<SwitcherOutlined />} onClick={handleClickType} title="类型管理">
                        <Menu.Item key="typeList">类型列表</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<SwitcherOutlined />} onClick={handleClickMusic} title="音乐管理">
                        <Menu.Item key="musicList">音乐列表</Menu.Item>
                    </SubMenu>

                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
                        <Breadcrumb.Item>{breadcrumbItem}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div >
                            <Route path='/index/' exact component={Chart}></Route>
                            <Route path='/index/add/' exact component={AddArticle}></Route>
                            <Route path='/index/list/' exact component={ArticleList}></Route>
                            <Route path='/index/type/' exact component={TypeList}></Route>
                            <Route path='/index/music/' exact component={MusicList}></Route>

                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2020 wangweijie blog</Footer>
            </Layout>
        </Layout >

    );
}

export default AdminIndex