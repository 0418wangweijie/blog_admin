import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Input, Button, Form, Spin, message } from "antd";
import "../static/css/Login.css";
import { UserOutlined, LockTwoTone } from "@ant-design/icons";
import axios from "axios";
import servicePath from "../config/apiAdminUrl";

function Login(props) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (value) => {
    setIsLoading(true);
    // 获取cookies的方法
    // function getCookie(name) {
    //     var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    //     // eslint-disable-next-line no-cond-assign
    //     if (arr = document.cookie.match(reg))
    //         return unescape(arr[2]);
    //     else
    //         return null;
    // }
    axios({
      url: servicePath.login,
      method: "POST",
      // headers: {
      //     // eslint-disable-next-line no-undef
      //     'x-csrf-token': getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
      // },
      data: {
        username: value.username,
        password: value.password,
      },
      // withCredentials: true
    }).then((res) => {
      setIsLoading(false);
      if (res.data.data === "登录成功") {
        message.success("登录成功");
        localStorage.setItem("openId", res.data.openId);
        props.history.push("/index");
      } else {
        message.error("登录失败");
      }
    });
  };
  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title="登录页面"
          bordered={true}
          style={{ width: 400, textAlign: "center" }}
        >
          <Form onFinish={onSubmit} form={form}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input
                prefix={<UserOutlined color="#40a9ff" />}
                placeholder="请输入账号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                prefix={<LockTwoTone />}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                htmlType="submit"
                type="primary"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </div>
  );
}
export default Login;
