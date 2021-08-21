import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Popconfirm,
  message,
  Button,
  Card,
  Input,
  Select,
  Form,
} from "antd";
import axios from "axios";
import servicePath from "../config/apiAdminUrl";
import "../static/css/ArticleList.css";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function ArticleList(props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [totle, setTotle] = useState();
  const [type, setType] = useState([]);
  const [current, setCurrent] = useState(1);
  const [params, setParams] = useState({ page: 1, limit: 10 });
  useEffect(() => {
    getArticleList();
  }, []);

  const getArticle = (params) => {
    axios.get(servicePath.getArticle, { params }).then((res) => {
      setList(res.data?.data);
      setTotle(res.data?.totle);
    });
  };
  const getArticleList = () => {
    getArticle(params);
    axios({
      url: servicePath.getType,
      method: "GET",
      // withCredentials: true
    }).then((res) => {
      setType(res.data.data);
    });
  };
  const onDeleteConfirm = async (id) => {
    // , { withCredentials: true }
    try {
      const response = await axios(servicePath.deleteArticle + id);
      console.log(response);
      if (response.data?.success) {
        message.success("删除成功");
        getArticleList();
      } else {
        message.error("删除失败");
      }
    } catch (error) {
      message.error("删除失败");
      console.log(error);
    }
  };
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "发布时间",
      dataIndex: "createTime",
      render: (createTime) => {
        return createTime ? moment(createTime).format("YYYY-MM-DD") : null;
      },
    },
    {
      title: "访问次数",
      dataIndex: "visitCount",
    },
    {
      title: "文章分类",
      dataIndex: "typeId",
      render: (_, record) => {
        for (let i = 0; i < type.length; i++) {
          if (type[i]._id === record.typeId) {
            return type[i].typeName;
          }
        }
      },
    },
    {
      title: "操作",
      dataIndex: "options",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              props.history.push({
                pathname: "/index/add",
                query: {
                  record,
                },
              });
            }}
          >
            <EditOutlined />
            修改
          </Button>
          <Popconfirm
            title="要将文章删除吗？"
            onConfirm={() => onDeleteConfirm(record._id)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" type="primary" danger>
              <DeleteOutlined />
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const pagination = { current: current, pageSize: 10, total: totle };
  const onChange = (e) => {
    setCurrent(e.current);
    params.page = e.current;
    getArticle(params);
  };

  const onFinish = (value) => {
    setParams({
      title: value?.title,
      typeId: value?.typeId,
      page: 1,
      limit: 10,
    });
    let newParams = {
      title: value?.title,
      typeId: value?.typeId,
      page: 1,
      limit: 10,
    };
    getArticle(newParams);
    setCurrent(1);
  };

  return (
    <>
      <Card>
        <Form layout="inline" form={form} onFinish={onFinish}>
          <Form.Item name="title" label="文章标题">
            <Input
              placeholder="请输入文章标题"
              style={{ width: 200 }}
              allowClear
            />
          </Form.Item>
          <Form.Item name="typeId" label="文章分类">
            <Select
              placeholder="请选择文章分类"
              style={{ width: 200 }}
              allowClear
            >
              {type?.map((item, index) => {
                return (
                  <Option value={item._id} key={index}>
                    {item.typeName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="文章列表">
        <Table
          bordered
          justify="center"
          rowKey="_id"
          dataSource={list}
          columns={columns}
          pagination={pagination}
          onChange={onChange}
        />
      </Card>
    </>
  );
}
export default ArticleList;
