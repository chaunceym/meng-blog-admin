import React, {useState} from 'react'
import {Card, Input, Button, Spin} from 'antd'
import {UserOutlined,UnorderedListOutlined} from '@ant-design/icons'
import './Login.css'

const Login = () => {
  const [usename, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const checkLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>
        <Card title="白日梦的博客管理系统" bordered={true} style={{width: 400}}>
          <Input id="username" size="large" placeholder="输入用户名"
                 prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
          />
          <br/>
          <br/>
          <Input.Password id="password" size="large" placeholder="输入密码"
                          prefix={<UnorderedListOutlined  style={{color: 'rgba(0,0,0,.25'}}/>}
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