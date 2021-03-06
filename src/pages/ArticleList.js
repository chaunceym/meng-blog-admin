import React, {useState, useEffect} from 'react';
import {List, Row, Col, Modal, message, Button, Tag, Pagination} from 'antd';
import axios from 'axios'
import servicePath from '../config/config'

const {confirm} = Modal;

const ArticleList = (props) => {
  const [list, setList] = useState([])
  const [listLength, setListLength] = useState([])
const [currentPage,setCurrentPage] = useState(1)
  const getArticleList = () => {
    axios({
      url: servicePath.getArticleList,
      withCredentials: true,
    })
      .then(data => {
	if(data.data.message === '没有登录'){
	   props.history.push('/login')
	}else{
	   setListLength(data.data.data)
	}
      })
      .catch(err => {
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
    	      getArticleListByPage(currentPage)
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
  const updateArticle = (id) => {
    props.history.push({pathname: '/index/add', query: {id: id}})
  }
  const getArticleListByPage = (page = 1) => {
    axios({
      url: servicePath.getArticleListByPage + page,
      withCredentials: true,
    })
      .then(data => {
        setList(data.data.data)
      })
      .catch(err => {
        message.error('获取数据失败')
      })
  }
  useEffect(() => {
    getArticleList()
    getArticleListByPage()
  }, [])
  const changePage = (page) => {
    setCurrentPage(page)
    getArticleListByPage(page)
  }
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}> <b>标题</b> </Col>
            <Col span={3}> <b>类别</b> </Col>
            <Col span={3}> <b>发布时间</b> </Col>
            <Col span={3}> <b>草稿</b> </Col>
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
              <span>{item.isDraft ? <Tag color="red">是</Tag> : <Tag color="green">否</Tag>}</span>
            </Col>
            <Col span={3}>
              {item.view_count}
            </Col>

            <Col span={4}>
              <Button onClick={() => updateArticle(item.id)} type="primary">修改</Button>&nbsp;
              <Button onClick={() => deleteArticle(item.id)}>删除</Button>
            </Col>
          </List.Item>
        )}
      />
      <div style={{textAlign: 'center', marginTop: '10px'}}>
        <Pagination defaultCurrent={1} onChange={changePage} total={listLength}/>
      </div>
    </div>
  )
}

export default ArticleList
