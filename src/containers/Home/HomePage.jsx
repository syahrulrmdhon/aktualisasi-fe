import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import message from "antd/es/message";
import Navbar from "../../components/Navbar";
import TableAbberation from "../../components/TableAbberation";
import { getListReport, deleteReport } from "../../utils/report";

const HomePage = () => {
  const [dataReport, setDataReport] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const history = useNavigate();
  const getDataReport = async () => {
    const params = {};
    setLoadingReport(true);
    const res = await getListReport(params);
    if (res) {
      setDataReport(res);
      setLoadingReport(false);
    }
  };
  const deleteDataReport = async (id) => {
    const res = await deleteReport(id);
    if (res) {
      console.log(res)
      setDataReport(dataReport.filter((e) => e.id !== id));
      message.success(res.message);
    }
  };

  useEffect(() => {
    getDataReport();
  }, []);
  return (
    <>
      <Navbar />
      <section id="hero">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center"
              data-aos="fade-up"
            >
              <div>
                <h2>Daftar Penyimpangan {new Date().getFullYear()}</h2>
                <button
                  onClick={() => history("/add-report")}
                  className="btn btn-primary"
                >
                  Buat Laporan
                </button>
              </div>
              <TableAbberation
                dataReport={dataReport}
                loadingReport={loadingReport}
                deleteDataReport={deleteDataReport}
              />
            </div>
            {/* <div
              className="col-lg-3 order-1 order-lg-2 hero-img"
              data-aos="fade-left"
            >
              <img src={heroImage} className="img-fluid" alt="" />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
