import React from "react";
import logo from "../assets/logo-bpom.png";

const Navbar = () => {
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <div className="logo me-auto w-100" style={{ display: "flex" }}>
          <img className="mx-1" src={logo} alt="logo-bpom" />
          <h1 className="mx-1 mt-2">
            <a href="">SIPEPSI</a>
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
      </div>
    </header>
  );
};

export default Navbar;
