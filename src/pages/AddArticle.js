import React, {useEffect, useState} from 'react';
import './AddArticle.css'
import {Row, message, Col, Input, Select, Button, DatePicker, Tag} from 'antd'
import ReactMarkdown from "react-markdown"
import servicePath from "../config/config"
import axios from "axios"
import CodeBlock from "../util/CodeBlock"
import moment from "moment"

const {Option} = Select;
const {TextArea} = Input

const AddArticle = (props) => {
  const [articleId, setArticleId] = useState(0)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [introducemd, setIntroducemd] = useState('')
  const [showDate, setShowDate] = useState(moment(moment(Date.now()).format().split('T')[0], 'YYYY-MM-DD'))   //发布日期
  const [typeInfo, setTypeInfo] = useState([])
  const [selectedType, setSelectType] = useState(1)
  const [isDraft, setIsDraft] = useState(false)
  const getTypeInfo = () => {
    axios({
      url: servicePath.getTypeInfo,
      header: {'Access-Control-Allow-Origin': '*'},
      withCredentials: true
    })
      .then(data => {
        if (data.data.message === '没有登录') {
          localStorage.removeItem('openId')
          message.warning('请登录')
          props.history.push('/login')
        } else {
          setTypeInfo(data.data.data)
        }
      })
      .catch(err => {
      })
  }
  const getArticleInfo = (id) => {
    axios({
      url: servicePath.getArticleInfo + id,
      header: {'Access-Control-Allow-Origin': '*'},
      withCredentials: true
    })
      .then(data => {
        const articleInfo = data.data.data[0]
        if (articleInfo.isDraft) {
          setIsDraft(true)
        }
        setArticleTitle(articleInfo.title)
        setArticleContent(articleInfo.article_content)
        setIntroducemd(articleInfo.introduce)
        setShowDate(moment(articleInfo.addTime, 'YYYY-MM-DD'))
        setSelectType(articleInfo.typeId)
      })
      .catch(err => {
        message.error('获取文章失败')
      })

  }
  const saveArticleUpdate = (id, articleAttr) => {
    axios({
      url: servicePath.updateArticle + id,
      method: 'post',
      data: articleAttr,
      header: {'Access-Control-Allow-Origin': '*'},
      withCredentials: true
    })
      .then(data => {
        if (data.data.message === '修改成功') {
          message.success('修改成功')
          setArticleTitle('')
          setArticleContent('')
          setIntroducemd('')
        } else {
          message.error('修改失败')
        }
      })
      .catch(err => {
        message.error('修改失败')
      })

  }
  const saveArticleAdd = (articleAttr) => {
    axios({
      url: servicePath.addArticle,
      method: 'post',
      data: articleAttr,
      withCredentials: true
    })
      .then(data => {
        if (data.data.message === '添加成功') {
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
  useEffect(() => {
    getTypeInfo()
    if (props.location.query) {
      const {id} = props.location.query
      if (id) {
        setArticleId(id)
        getArticleInfo(id)
      }
    }
  }, [])
  const inputValueChange = (e) => {
    setArticleContent(e.target.value)
  }
  const selectType = (value) => {
    setSelectType(value)
  }
  const articleAttr = () => {
    const articleAttr = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd
    }
    const dateText = showDate._i.replace('-', '/')
    articleAttr.addTime = (new Date(dateText).getTime()) / 1000
    articleAttr.view_count = Math.ceil(Math.random() * 100) + 1000
    return articleAttr
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
    const articleAttrValue = articleAttr()
    if (articleId === 0) {
      articleAttrValue.isDraft = false
      saveArticleAdd(articleAttrValue)
    } else {
      articleAttrValue.id = articleId
      saveArticleUpdate(articleId, articleAttrValue)
    }
  }
  const changeIntroducemd = (e) => {
    setIntroducemd(e.target.value)
  }
  const saveAsDraft = () => {
    checkArticleAttr()
    const articleAttrValue = articleAttr()
    if (articleId === 0) {
      articleAttrValue.isDraft = true
      saveArticleAdd(articleAttrValue)
    } else {
      articleAttrValue.id = articleId
      articleAttrValue.isDraft = true
      saveArticleUpdate(articleId, articleAttrValue)
    }
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
              <Select className="article-type" value={selectedType} size="large" onChange={selectType}>
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
              <DatePicker value={showDate}
                          onChange={(date, dateString) => setShowDate(moment(dateString, 'YYYY-MM-DD'))}
                          placeholder="发布日期"
                          size="large"/>&nbsp;&nbsp;
              <Button size="large" onClick={saveAsDraft}>暂存文章</Button>&nbsp;&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>&nbsp;&nbsp;
              {
                isDraft && <Tag color="red">草稿</Tag>
              }
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
                <ReactMarkdown source={articleContent}
                               renderers={{
                                 code: CodeBlock
                               }}
                               escapeHtml={false}/>

              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle