import React, {useState} from 'react'
import {Card, Input, Button, Spin, message} from 'antd'
import {UserOutlined, UnorderedListOutlined} from '@ant-design/icons'
import './Login.css'
import axios from "axios"
import servicePath from "../config/config"
const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const getUsername = (e) => {
    setUsername(e.target.value)
  }
  const getPassword = (e) => {
    setPassword(e.target.value)
  }
  const checkLogin = () => {
    if (!username) {
      return message.error('用户名不能为空')
    } else if (!password) {
      return message.error('密码不能为空')
    }
    setIsLoading(true)
    const userInfo = {username, password}
    axios({
      url: servicePath.checkLogin,
      method: 'post',
      data: userInfo,
      withCredentials: true
    })
      .then(data => {
        setIsLoading(false)
        console.log(data.data.message === '登录成功')
        if (data.data.message === '登录成功') {
          localStorage.setItem('openId', data.data.openId)
          props.history.push('/index')
        } else {
          message.error('登录失败')
        }
      })
      .catch(err => {
        message.error('登录失败')
      })
  }
  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>
        <Card title="白日梦的博客管理系统" bordered={true} style={{width: 400}}>
          <Input onInput={getUsername} id="username" size="large" placeholder="输入用户名" value={username}
                 prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
          />
          <br/>
          <br/>
          <Input.Password onInput={getPassword} value={password} id="password" size="large" placeholder="输入密码"
                          prefix={<UnorderedListOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
          />
          <br/>
          <br/>
          <Button onClick={checkLogin} type="primary" size="large" block>登录</Button>
        </Card>
      </Spin>
    </div>
  )
}
export default Login