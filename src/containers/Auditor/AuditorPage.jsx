import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import message from "antd/es/message";
import Select from "antd/es/select";
import Tabs from "antd/es/tabs";
import Navbar from "../../components/Navbar";
import TableVerification from "../../components/TableVerification";
import { getListReport } from "../../utils/audit";

const AuditorPage = () => {
  const [dataReport, setDataReport] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const [username] = useState(localStorage.getItem("username"));
  const [token] = useState(localStorage.getItem("token"));
  const [year, setYear] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  });
  const [group, setGroup] = useState("pb");
  const history = useNavigate();
  const { TabPane } = Tabs;
  const { Option } = Select;
  const getDataReport = async ({ year, group }) => {
    const params = { year: year || new Date().getFullYear(), group: group };
    setLoadingReport(true);
    const res = await getListReport(params, token);
    if (res.status === 200) {
      setDataReport(res.data);
      setLoadingReport(false);
    } else if (res.status === 401) {
      console.log(res.status === 401);
      setLoadingReport(false);
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  const handleChange = (e) => {
    setYear({ label: e, value: e });
    getDataReport({ year: e, group: group });
  };

  const onTabChange = (e) => {
    setGroup(e);
    getDataReport({ year: year.label, group: e });
  };

  useEffect(() => {
    getDataReport({ year: year.label, group: group });
  }, []);

  return (
    <>
      <Navbar username={username} />
      <section id="hero">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center"
              data-aos="fade-up"
            >
              <div className="row">
                <div className="col-md-6">
                  <h2>Daftar Penyimpangan {year.label}</h2>
                </div>
                <div className="col-md-6" style={{ textAlign: "end" }}>
                  <h2></h2>
                  <Select
                    size="large"
                    onChange={handleChange}
                    style={{
                      width: 200,
                    }}
                    defaultValue={year}
                  >
                    <Option value={new Date().getFullYear() - 2}>
                      {new Date().getFullYear() - 2}
                    </Option>
                    <Option value={new Date().getFullYear() - 1}>
                      {new Date().getFullYear() - 1}
                    </Option>
                    <Option value={new Date().getFullYear()}>
                      {new Date().getFullYear()}
                    </Option>
                  </Select>
                </div>
              </div>
              <Tabs defaultActiveKey="pb" onChange={onTabChange}>
                <TabPane tab="Produk Biologi" key="pb">
                  <TableVerification
                    dataReport={dataReport}
                    loadingReport={loadingReport}
                    group={group}
                  />
                </TabPane>
                <TabPane tab="Obat" key="ob">
                  <TableVerification
                    dataReport={dataReport}
                    loadingReport={loadingReport}
                    group={group}
                  />
                </TabPane>
                <TabPane tab="Bahan Baku Obat" key="bbo">
                  <TableVerification
                    dataReport={dataReport}
                    loadingReport={loadingReport}
                    group={group}
                  />
                </TabPane>
                <TabPane tab="Impor dan Ekspor" key="ie">
                  <TableVerification
                    dataReport={dataReport}
                    loadingReport={loadingReport}
                    group={group}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuditorPage;
