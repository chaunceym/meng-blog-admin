import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {List, Row, Col, message, Button, Modal} from 'antd';
import servicePath from "../config/config"

const {confirm} = Modal;

const ImageManager = () => {
  const [imagesManager, setImagesManager] = useState([])
  useEffect(() => {
    getImagesPath()
  }, [])
  const getImagesPath = () => {
    axios(servicePath.getImagesPath).then(data => {
      setImagesManager([...data.data.data])
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
  const deleteImage = () => {
    confirm({
      title: '确认删除?',
      onOk() {
        axios(servicePath.deleteImage)
          .then(data => {
            if (data.data.message === '删除成功') {
              message.success('删除成功')
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
  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <input type="file" onChange={uploadImage}/>
      </div>
      <List
        header={
          <Row className="list-div">
            <Col span={20}> <b>地址</b> </Col>
            <Col span={4}> <b>操作</b> </Col>
          </Row>
        }
        bordered
        dataSource={imagesManager}
        renderItem={item => (
          <List.Item>
            <Col span={20}>
              <a href={item} target="_blank">{item}</a>
            </Col>
            <Col span={4}>
              <Button danger onClick={deleteImage}>删除</Button>
            </Col>
          </List.Item>
        )}
      />
    </div>
  )
}
export default ImageManager