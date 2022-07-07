import React, { useState } from "react";
import { Layout, Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layouts = (props) => {
  const { Header, Footer, Sider, Content } = Layout;
  const [loadingLogout, setLoadingLogout] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    window.location.href = "/";
    setLoadingLogout(true);
  };

  return (
    <Layout>
      <Header className="header">
        <Navbar />
      </Header>
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Content>{props.children}</Content>
      </Layout>
      <Footer>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadingLogout}
          onClick={() => onLogout(loadingLogout)}
        >
          Logout
        </Button>
      </Footer>
    </Layout>
  );
};

export default Layouts;
