import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./LoginPage.css";
import mainLogo from "../../assets/logo-bpom.png";
import { postLogin } from "../../utils/auth";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    const data = {
      username: values.username,
      password: values.password,
    };
    const res = await postLogin(null, data);
    if (res) {
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("roles", res.roles);
      localStorage.setItem("username", res.username);
      localStorage.setItem("email", res.email);
      window.location.href = "/";
    }
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container login">
      <img src={mainLogo} className="logo" alt="fireSpot" />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="ant-form-horizontal"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
