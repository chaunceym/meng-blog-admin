import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Button, Col, List, message, Modal, Row} from 'antd';
import servicePath from "../config/config"

const {confirm} = Modal;

const ImageManager = () => {
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
  const uploadImage = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    axios({
      url: servicePath.uploadImage,
      method: 'post',
      data: formData
    })
      .then(data => {
        if (data.data.message === '添加成功') {
          message.success('添加成功')
          getImagesPath()
        } else {
          message.error('添加失败')
        }
      })
      .catch(err => {
        message.error('添加失败')
      })
  }
  const deleteImage = (id) => {
    confirm({
      title: '确认删除?',
      onOk() {
        axios(servicePath.deleteImage + id)
          .then(data => {
            if (data.data.message === '删除成功') {
              message.success('删除成功')
              getImagesPath()
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
        <input type="file" onChange={uploadImage}/>
      </div>
      <List
        header={
          <Row className="list-div" >
            <Col span={12}> <b>地址</b> </Col>
            <Col span={8}> <b>图片预览</b> </Col>
            <Col span={4}> <b>操作</b> </Col>
          </Row>
        }
        bordered
        dataSource={imagesManager}
        renderItem={item => (
          <List.Item>
            <Col span={12}>
              <span>![](<a href={item.path}>{item.path}</a>)</span>
              <input style={{opacity: '0'}} type="text" id="input"/>
            </Col>
            <Col span={8}>
              <img width="50%" src={item.path} alt=""/>
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