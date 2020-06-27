import React, {useEffect, useState} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {Route} from 'react-router-dom'
import AddArticle from "./AddArticle"
import './AdminIndex.css'
import {UserOutlined, VideoCameraOutlined,FormOutlined,MessageOutlined} from '@ant-design/icons'
import ArticleList from "./ArticleList"
import WorkPlace from "./WorkPlace"
import CommentManager from "./CommentManager"

const {Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


function AdminIndex(props) {

  const [collapsed, setCollapsed] = useState(false)

  const [menuItem, setMenuItem] = useState('工作台')
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };
  useEffect(() => {
    if (!localStorage.openId) {
      props.history.push('/login')
    }
  })
  const updateArticle = (e) => {
    if (e.key === 'addArticle') {
      props.history.push('/index/add')
    } else if (e.key === 'articleList') {
      props.history.push('/index/list')
    }
  }
  const selectItem = (e) => {
    console.log(e)
    if(e.key === "1"){
      props.history.push('/index/work')
      console.log(1)
    }else if(e.key === "2"){
      props.history.push('/index/video')
    }else if(e.key === '4'){
      props.history.push('/index/comment')
    }
    const menuItemValue = ['工作台', '视频管理', '文章管理', '留言管理']
    setMenuItem(menuItemValue[parseInt(e.key) - 1])
  }
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"/>
        <Menu onClick={selectItem} theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined/>}>
            工作台
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
            视频管理
          </Menu.Item>
          <SubMenu key="3" onClick={updateArticle}
                   title={
                     <span>文章管理</span>
                   }
                   icon={<FormOutlined />}
          >
            < Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<MessageOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>{menuItem}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{padding: 24, background: '#fff', minHeight: 360}}>
            <div>
              <Route path="/index/work" component={WorkPlace}/>
              <Route path="/index/comment" component={CommentManager}/>
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