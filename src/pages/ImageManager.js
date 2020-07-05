import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Button, Col, List, message, Modal, Row} from 'antd';
import servicePath from "../config/config"

const {confirm} = Modal;

const ImageManager = (props) => {
  const [imagesManager, setImagesManager] = useState([])
  useEffect(() => {
    getImagesPath()
  }, [])
  const getImagesPath = () => {
    axios(servicePath.getImagesPath).then(data => {
      if (data.data.message === '获取成功') {
        setImagesManager([...data.data.data])
      }
    })
  }
  const deleteImage = (id) => {
    confirm({
      title: '确认删除?',
      onOk() {
        axios({
		url:servicePath.deleteImage + id,
		withCredentials: true
	})
          .then(data => {
            if (data.data.message === '删除成功') {
              message.success('删除成功')
              getImagesPath()
            } else if(data.data.message === '没有登录'){
		props.history.push('/login')
            }else{
              message.error('删除失败')
	    }
          })
          .catch(err => {
            message.error('删除失败')
          })
      }
    })
  }
  const copyImagePath = (id) => {
    const input = document.getElementById('input')

    const path = imagesManager.filter(item => {
      return item.id === id
    })
    input.value = `![](${path[0].path})`
    input.select()
    document.execCommand('copy');
    message.success('复制成功')
  }
  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <input style={{opacity: '0'}} type="text" id="input"/>
      </div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}> <b>图片预览</b> </Col>
            <Col span={12}> <b>图片地址</b> </Col>
            <Col span={4}> <b>操作</b> </Col>
          </Row>
        }
        bordered
        dataSource={imagesManager}
        renderItem={item => (
          <List.Item>
            <Col span={8}>
              <a rel="noopener noreferrer" href={item.path} target={'_blank'}>
                <img width="35%" src={item.path} alt=""/>
              </a>
            </Col>
            <Col span={12}>
              <span>{item.path}</span>
            </Col>
            <Col span={4}>
              <Button onClick={() => copyImagePath(item.id)}>复制</Button>&nbsp;
              <Button danger onClick={() => deleteImage(item.id)}>删除</Button>
            </Col>
          </List.Item>
        )}
      />
    </div>
  )
}
export default ImageManager
