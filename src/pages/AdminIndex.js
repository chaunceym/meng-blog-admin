import React, {useState} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {Route} from 'react-router-dom'
import AddArticle from "./AddArticle"
import './AdminIndex.css'
import {UserOutlined, VideoCameraOutlined} from '@ant-design/icons'
import ArticleList from "./ArticleList"

const {Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


function AdminIndex(props) {

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };
  const updateArticle = (e) => {
    if (e.key === 'addArticle') {
      props.history.push('/index/add')
    } else if (e.key === 'articleList') {
      props.history.push('/index/list')
    }
  }
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined/>}>
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
            <span>文章列表</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={updateArticle}
            title={
              <span>
                  <span>文章管理</span>
                </span>
            }
            icon={<VideoCameraOutlined/>}
          >
            < Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>

          </SubMenu>

          <Menu.Item key="9" icon={<VideoCameraOutlined/>}>
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{padding: 24, background: '#fff', minHeight: 360}}>
            <div>
              <Route path="/index/add" component={AddArticle}/>
              <Route path="/index/list" component={ArticleList}/>
            </div>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>mengxiangyu.top</Footer>
      </Layout>
    </Layout>
  )

}

export default AdminIndex