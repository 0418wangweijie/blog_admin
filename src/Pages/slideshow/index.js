import { Button, Card, Table, Space, Popconfirm, Image, message } from "antd";
import React, { useState, useEffect } from "react";
import SlideShowEdit from "./components/SlideShowEdit";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Axios from "axios";
import servicePath from "../../config/apiAdminUrl";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    getSlideShow();
  }, []);
  const getSlideShow = () => {
    Axios({ url: servicePath.getSildeShow, method: "GET" })
      .then((res) => {
        if (res?.data?.data) {
          setData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDelete = (id) => {
    axios(servicePath.deleteSlideshow + id)
      .then((res) => {
        if (res?.status === 200) {
          message.success("删除成功");
          getSlideShow();
        } else {
          message.error("删除失败");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };
  const colums = [
    { title: "轮播图标题", dataIndex: "name" },
    {
      title: "图片",
      dataIndex: "files_url",
      render: (_, record) => {
        return <Image src={record.files_url} width={200} />;
      },
    },
    { title: "排序", dataIndex: "sort" },
    {
      title: "操作",
      dataIndex: "options",
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setVisible(true);
                setValues(record);
              }}
            >
              <EditOutlined />
              修改
            </Button>
            <Popconfirm
              title="确定要删除这个类型吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => onDelete(record._id)}
            >
              <Button type="primary" size="small" danger>
                <DeleteOutlined />
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const onCancel = () => {
    setVisible(false);
  };
  const onSuccessUpdate = () => {
    setVisible(false);
    getSlideShow();
  };
  return (
    <Card
      title="轮播图列表"
      extra={
        <Button
          onClick={() => {
            setVisible(true);
          }}
          type="primary"
        >
          添加
          <PlusOutlined />
        </Button>
      }
    >
      <Table rowKey="_id" columns={colums} dataSource={data} />
      <SlideShowEdit
        visible={visible}
        values={values}
        onCancel={onCancel}
        onSuccess={onSuccessUpdate}
      />
    </Card>
  );
};
