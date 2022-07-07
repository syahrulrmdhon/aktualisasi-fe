import React from "react";

const Navbar = () => {
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <div className="logo me-auto w-100">
          <h1>
            <a href="">SP3SP</a>
          </h1>
          <p className="mt-4" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            Sistem Pencatatan dan Pelaporan Penyimpangan Sarana Produksi
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
