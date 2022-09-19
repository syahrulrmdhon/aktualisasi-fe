import React from "react";
import logo from "../assets/logo-bpom.png";
import {
  UserOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Avatar from "antd/es/avatar";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";
import Modal from "antd/es/modal";

const Navbar = ({ username }) => {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const confirmLogout = (logout) => {
    Modal.confirm({
      title: "Apakah anda yakin untuk keluar?",
      icon: <ExclamationCircleOutlined />,
      okText: "Keluar",
      cancelText: "Batalkan",
      onOk: () => logout(),
    });
  };
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <div className="logo me-auto w-100" style={{ display: "flex" }}>
          <img className="mx-1" src={logo} alt="logo-bpom" />
          <h1 className="mx-1 mt-2">
            <a href="/">SIPEPSI</a>
          </h1>
          <p
            className="mx-1"
            style={{ fontFamily: '"Open Sans", sans-serif', color: "#576971" }}
          >
            <b>Si</b>stem <b>Pe</b>laporan <b>P</b>enyimpangan <b>S</b>arana
            Produks<b>i</b>
            <br />
            Direktorat Pengawasan Produksi Obat, Narkotika, Psikotropika dan
            Prekursor
          </p>
        </div>
        <div className="row w-100 justify-content-end">
          <div className="col-md-4 float-right" style={{ textAlign: "end" }}>
            <Avatar icon={<UserOutlined />} />
            <span className="ml-2 mr-4 font-weight-bold">{username}</span>
            <Tooltip placement="bottom" title="Logout">
              <Button
                type="primary"
                danger
                icon={<PoweroffOutlined />}
                shape="round"
                onClick={() => confirmLogout(logout)}
              ></Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
