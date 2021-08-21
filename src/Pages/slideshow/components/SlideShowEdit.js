import {
  Upload,
  Form,
  Modal,
  Input,
  Select,
  Button,
  InputNumber,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import servicePath from "../../../config/apiAdminUrl";
import axios from "axios";
const { Option } = Select;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [form] = Form.useForm();
  const { values, visible, onSuccess, onCancel } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    if (values?.id) {
      setImageUrl(values?.files_url);
    }
  }, []);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onChange = (info) => {
    setLoading(true);
    if (info?.file?.response?.code == 200) {
      setImageUrl(info?.file.response.data.url.file);
      setLoading(false);
    }
  };
  // 模糊查询文章
  const selectTitleChange = (val) => {
    if (
      val &&
      (/^[\u4e00-\u9fa5]+$/i.test(val) || /^[0-9]+.?[0-9]*/.test(val))
    ) {
      const params = { title: val };
      axios
        .get(servicePath.getArticle, { params })
        .then((res) => {
          if (res?.data?.data) {
            setArticleList(res?.data?.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onFinish = (val) => {
    val._id = values?._id;
    val.files_url = imageUrl;
    const data = val;
    if (val?._id) {
      axios
        .post(servicePath.updateSlideShow, data)
        .then((res) => {
          console.log(res);
          if (res?.status === 200) {
            message.success("保存成功");
            onSuccess();
          } else {
            message.error("保存失败");
          }
        })
        .catch((err) => {
          message.error(err);
        });
    } else if (!val?._id) {
      axios
        .post(servicePath.addSlideShow, data)
        .then((res) => {
          if (res?.status === 200) {
            message.success("保存成功");
            onSuccess();
          } else {
            message.error("保存失败");
          }
        })
        .catch((err) => {
          message.error(err);
        });
    }
  };
  const tailLayout = {
    wrapperCol: { offset: 9, span: 15 },
  };
  return (
    <Modal
      title="更新轮播图"
      visible={visible}
      footer={null}
      onCancel={onCancel}
    >
      <Form
        layout="horizontal"
        onFinish={onFinish}
        initialValues={{ ...values }}
        form={form}
      >
        <Form.Item label="名称" name="name">
          <Input placeholder="请输入轮播图名称"></Input>
        </Form.Item>
        <Form.Item label="关联文章" name="article_id">
          <Select
            placeholder="请输入轮播图名称"
            onSearch={selectTitleChange}
            allowClear
            filterOption
            showSearch
            optionFilterProp="children"
          >
            {articleList?.map((item, index) => {
              return (
                <Option value={item?._id} key={item?._id + index}>
                  {item?.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="图片">
          <Upload
            name="file"
            listType="picture-card"
            onChange={onChange}
            showUploadList={false}
            action={servicePath.upload}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="slideshow" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="排序" name="sort">
          <InputNumber placeholder="请输入轮播图位置"></InputNumber>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
