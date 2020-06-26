import React, {useState, useEffect} from 'react';
import {List, Row, Col, Modal, message, Button, Switch} from 'antd';
import axios from 'axios'
import servicePath from '../config/config'

const {confirm} = Modal;

const ArticleList = (props) => {
  const [list, setList] = useState([])
  const getArticleList = () => {
    axios({
      url: servicePath.getArticleList,
      withCredentials: true,
      header: {'Access-Control-Allow-Origin': '*'}
    })
      .then(data => {
        setList(data.data.data)
      })
      .catch(err => {
        message.error('获取文章列表失败')
      })
  }
  const deleteArticle = (id) => {
    confirm({
      title: '确认删除?',
      onOk() {
        axios(servicePath.deleteArticle + id, {withCredentials: true})
          .then(data => {
            if (data.data.message === '删除成功') {
              message.success('删除成功')
              getArticleList()
            } else {
              message.error('删除失败')
            }
          })
          .catch(err => {
            message.error('删除失败')
          })
      }
    })
  }
  useEffect(() => {
    getArticleList()
  }, [])
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}> <b>标题</b> </Col>
            <Col span={3}> <b>类别</b> </Col>
            <Col span={3}> <b>发布时间</b> </Col>
            <Col span={3}> <b>集数</b> </Col>
            <Col span={3}> <b>浏览量</b> </Col>
            <Col span={4}> <b>操作</b> </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Col span={8}>
              {item.title}
            </Col>
            <Col span={3}>
              {item.typeName}
            </Col>
            <Col span={3}>
              {item.addTime}
            </Col>
            <Col span={3}>
              共<span>{item.part_count}</span>集
            </Col>
            <Col span={3}>
              {item.view_count}
            </Col>

            <Col span={4}>
              <Button type="primary">修改</Button>&nbsp;
              <Button onClick={() => deleteArticle(item.id)}>删除</Button>
            </Col>
          </List.Item>
        )}
      />
    </div>
  )

}

export default ArticleList