import React, { useState } from "react";
import Button from "antd/es/button";
import Checkbox from "antd/es/checkbox";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Alert from "antd/es/alert";
import "./LoginPage.css";
import mainLogo from "../../assets/logo-bpom.png";
import { postLogin } from "../../utils/auth";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    const data = {
      username: values.username,
      password: values.password,
    };
    const res = await postLogin(null, data);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("roles", res.data.roles);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("email", res.data.email);
      window.location.href = "/";
    } else {
      setError(true);
      setIsLoading(false);
      setErrorMessage(res.message);
    }
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div
          className="col-md-12 mb-2 pb-2 pt-4"
          style={{ textAlign: "center" }}
        >
          <img src={mainLogo} className="logo-login" alt="fireSpot" />
          <div>
            <h1 className="mt-2 mb-0">
              <a href="">SIPEPSI</a>
            </h1>
            <p
              className="mx-1"
              style={{
                fontFamily: '"Open Sans", sans-serif',
                color: "#576971",
              }}
            >
              <b>Si</b>stem <b>Pe</b>laporan <b>P</b>enyimpangan <b>S</b>arana
              Produks<b>i</b>
            </p>
            <p
              style={{
                fontFamily: '"Open Sans", sans-serif',
                color: "#576971",
              }}
            >
              Direktorat Pengawasan Produksi Obat Narkotika Psikotropika dan
              Prekursor
            </p>
          </div>
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          {error ? (
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              className="mb-2"
            />
          ) : (
            ""
          )}
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
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default LoginPage;
