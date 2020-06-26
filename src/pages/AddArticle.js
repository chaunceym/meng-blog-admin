import React, {useEffect, useState} from 'react';
import './AddArticle.css'
import {Row, Col, Input, Select, Button, DatePicker} from 'antd'
import ReactMarkdown from "react-markdown"
import servicePath from "../config/config"
import axios from "axios"

const {Option} = Select;
const {TextArea} = Input

const AddArticle = (props) => {
  const input = '# This is a header\n\nAnd this is a paragraph'
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别
  const getTypeInfo = () => {
    axios({
      url: servicePath.getTypeInfo,
      header: {'Access-Control-Allow-Origin': '*'},
      withCredentials: true
    })
      .then(data => {
        console.log(data)
        if (data.data.message === '没有登录') {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(data.data.data)
        }
      })
      .catch(err => {
      })
  }

  useEffect(() => {
    getTypeInfo()
  }, [])
  const inputValueChange = (e) => {
    setArticleContent(e.target.value)
  }
  const selectType = () =>{

  }
  return (
    <div>
      <Row gutter={5}>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={21}>
              <Input
                placeholder="博客标题"
                size="large"/>
            </Col>
            <Col span={3}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={selectType}>
                {
                  typeInfo.map((item, index) => {
                    return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
          <br/>
          <Row gutter={10}>
            <Col span={24}>
              <DatePicker placeholder="发布日期" size="large"/>&nbsp;&nbsp;
              <Button size="large">暂存文章</Button>&nbsp;&nbsp;
              <Button type="primary" size="large">发布文章</Button>
            </Col>
            <Col span={24}>
              <br/>
              <TextArea autoSize={true} rows={4} placeholder="文章简介" allowClear={true}/>
              <br/>
              <br/>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                value={articleContent}
                placeholder="文章内容"
                onChange={inputValueChange}
              />
            </Col>
            <Col span={12}>
              <div className="show-html">
                <ReactMarkdown source={articleContent}/>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle