import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Button, Input, Select, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiAdminUrl";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  // const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(); //选择的文章类别

  const [isLoading, setIsLoading] = useState(false);

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  useEffect(() => {
    fecthType();
    if (props.location?.query?.record) {
      let values = props.location.query.record;
      console.log(values);
      setArticleId(values._id);
      setSelectType(values.typeId);
      getArticle();
    }
  }, []);

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const changeType = (value) => {
    setSelectType(value);
  };

  const changeCreateTime = (date, dateString) => {
    setShowDate(dateString);
  };

  const changeArtivleTitle = (e) => {
    setArticleTitle(e.target.value);
  };

  const getArticle = () => {
    if (props.location?.query?.record) {
      let values = props.location.query.record;
      setArticleTitle(values.title);
      setArticleContent(values.content);
      let htmlContent = marked(values.content);
      setIntroducehtml(htmlContent);
      setIntroducemd(values.introduce);
      let htmlIntroduce = marked(values.introduce);
      setIntroducehtml(htmlIntroduce);
      console.log(values.createTime);
      setShowDate(moment(values.createTime));
    }
  };
  const saveArticle = () => {
    setIsLoading(true);
    if (!selectedType) {
      message.error("请选择文章类型");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    } else if (!articleTitle) {
      message.error("请输入文章标题");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    } else if (!articleContent) {
      message.error("请输入文章内容");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    } else if (!introducemd) {
      message.error("请输入简介");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    } else if (!showDate) {
      message.error("请选择日期");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    }
    let dateText = moment(showDate);

    let dataProps = {};

    dataProps.title = articleTitle;
    dataProps.content = articleContent;
    dataProps.introduce = introducemd;
    dataProps.createTime = new Date(dateText).getTime();
    dataProps.typeId = selectedType;

    if (articleId === 0) {
      console.log(dataProps);
      // dataProps.visitCount = 0
      axios({
        url: servicePath.saveArticle,
        method: "POST",
        data: dataProps,
        // withCredentials: true
      })
        .then((res) => {
          if (res.data.insertId) {
            setIsLoading(false);
            setArticleId(res.data.insertId);
            message.success("保存成功");
            props.history.push("/index/list/");
          } else {
            setIsLoading(false);
            message.error("保存失败");
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else {
      dataProps._id = articleId;
      axios({
        url: servicePath.updateArticle,
        method: "POST",
        data: dataProps,
        // withCredentials: true
      })
        .then((res) => {
          if (res.data.data.ok === 1) {
            setIsLoading(false);
            message.success("修改成功");
          } else {
            setIsLoading(false);
            message.error("修改失败");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(JSON.stringify(error));
        });
    }
  };
  const fecthType = async () => {
    const resType = await axios({
      url: servicePath.getType,
      method: "GET",
      // withCredentials: true
    })
      .then((res) => {
        if (res.data.data == "没有登录") {
          localStorage.removeItem("openId");
          props.history.push("/");
        }
        return res.data.data;
      })
      .catch((error) => {
        return error;
      });
    setTypeInfo(resType);
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                onChange={changeArtivleTitle}
                placeholder="请输入博客标题"
                size="large"
              />
            </Col>
            <Col span={4}>
              <Select
                onChange={changeType}
                value={selectedType}
                placeholder="请选择文章类型"
                size="large"
              >
                {typeInfo?.map((item, index) => {
                  return (
                    <Option value={item._id} key={index}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                onChange={changeContent}
                className="markdown-content"
                rows="35"
                placeholder="请输入文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button> &nbsp;
              <Button
                type="primary"
                onClick={saveArticle}
                loading={isLoading}
                size="large"
              >
                发布文章
              </Button>
              <br />
              <Col span={24}>
                <br />
                <TextArea
                  value={introducemd}
                  onChange={changeIntroduce}
                  rows={4}
                  placeholder="请输入简介"
                />
                <br />
                <br />
                <div
                  dangerouslySetInnerHTML={{ __html: introducehtml }}
                  className="introduce-html"
                ></div>
              </Col>
              <Col span={12}>
                <div className="date-select">
                  <DatePicker
                    format="YYYY-MM-DD"
                    value={showDate ? moment(showDate) : null}
                    onChange={changeCreateTime}
                    placeholder="请输入发布日期"
                    size="large"
                  />
                </div>
              </Col>
              {/* <Col span={12}>
                                <div className="date-select">
                                    <DatePicker placeholder="请输入修改日期" size="large"/>
                                </div>
                            </Col> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
