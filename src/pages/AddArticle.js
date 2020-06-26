import React, {useEffect, useState} from 'react';
import './AddArticle.css'
import {Row, message, Col, Input, Select, Button, DatePicker} from 'antd'
import ReactMarkdown from "react-markdown"
import servicePath from "../config/config"
import axios from "axios"

const {Option} = Select;
const {TextArea} = Input

const AddArticle = (props) => {
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [introducemd, setIntroducemd] = useState('')            //简介的markdown内容
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
  const selectType = (value) => {
    setSelectType(value)
  }
  const checkArticleAttr = () => {
    if (!articleTitle) {
      return message.warning('文章名不能为空')
    } else if (!articleContent) {
      return message.warning('文章内容不能为空')
    } else if (!introducemd) {
      return message.warning('文章简介不能为空')
    } else if (!showDate) {
      return message.warning('发布日期不能为空')
    }
  }
  const saveArticle = () => {
    checkArticleAttr()
    const articleAttr = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd
    }
    const dateText = showDate.replace('-', '/')
    articleAttr.addTime = (new Date(dateText).getTime()) / 1000
    if (articleId === 0) {
      articleAttr.view_count = Math.ceil(Math.random() * 100) + 1000
      axios({
        url: servicePath.addArticle,
        method: 'post',
        data: articleAttr,
        withCredentials: true
      })
        .then(data => {
          if (data.data.message === '添加成功') {
            setArticleId(data.data.insertId)
            message.success('添加成功')
            setArticleTitle('')
            setArticleContent('')
            setIntroducemd('')
          } else {
            message.error('添加失败')
          }
        })
        .catch(err => {
          message.error('添加失败')
        })
    }
  }
  const changeIntroducemd = (e) => {
    setIntroducemd(e.target.value)
  }
  return (
    <div>
      <Row gutter={5}>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={21}>
              <Input
                value={articleTitle}
                onChange={e => setArticleTitle(e.target.value)}
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
              <DatePicker onChange={(date, dateString) => setShowDate(dateString)} placeholder="发布日期"
                          size="large"/>&nbsp;&nbsp;
              <Button size="large">暂存文章</Button>&nbsp;&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
            </Col>
            <Col span={24}>
              <br/>
              <TextArea onInput={changeIntroducemd} value={introducemd} autoSize={true} rows={4} placeholder="文章简介"
                        allowClear={true}/>
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