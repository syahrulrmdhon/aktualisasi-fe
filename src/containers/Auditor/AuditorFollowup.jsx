import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import message from "antd/es/message";
import Skeleton from "antd/es/skeleton";
import DatePicker from "antd/es/date-picker";
import Spin from "antd/es/spin";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CanvasSignature from "react-signature-canvas";
import { getReport, updateReport } from "../../utils/audit";
import { convertDate } from "../../utils/index";
import * as Yup from "yup";

const Signature = React.forwardRef((props, ref) => (
  <CanvasSignature
    penColor="blue"
    {...props}
    style={{ border: "1px solid black" }}
    ref={ref}
  />
));

const AuditorFollowup = () => {
  const { id: idReport, group } = useParams();
  const [state, setState] = useState({});
  const ref = React.createRef();
  const [username] = useState(localStorage.getItem("username"));
  const [token] = useState(localStorage.getItem("token"));
  const [refStateAI, setRefStateAI] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const history = useNavigate();
  console.log(dataDetail.action_recomendation);
  const [initial, setInitial] = useState({
    action_recomendation: dataDetail.action_recomendation || "",
    signature_auditor: dataDetail.signature_auditor || "",
    date_signature_auditor: dataDetail.date_signature_auditor || "",
    internal_auditor: dataDetail.internal_auditor || "",
  });
  const getDataReport = async (idReport) => {
    const res = await getReport(idReport, token);
    if (res.status === 200) {
      setDataDetail(...res.data);
      setInitial({
        action_recomendation: res.data[0].action_recomendation || null,
        signature_auditor: res.data[0].signature_auditor || null,
        date_signature_auditor: res.data[0].date_signature_auditor || null,
        internal_auditor: res.data[0].internal_auditor || null,
      });
    }
  };

  const updateDataReport = async (idReport, postData) => {
    setLoadingSubmit(true);
    let store = await updateReport(idReport, postData, token);
    if (store.status === 200) {
      setLoadingSubmit(false);
      message.success(store.data.message);
      history("/auditor");
    } else {
      setLoadingSubmit(false);
      message.error("I'm sorry, there was an error");
    }
  };

  const onSubmitForm = (values) => {
    let dataAI;
    if (!values.signature_auditor) {
      const currentAI = refStateAI.getTrimmedCanvas();
      dataAI =
        currentAI.width > 1 || currentAI.height > 1
          ? currentAI.toDataURL()
          : null;
    }
    const postData = {
      ...values,
      ...(!values.signature_auditor &&
        dataAI && {
          signature_auditor: dataAI,
          //   date_signature_auditor: new Date().toISOString().split("T")[0],
        }),
    };
    setState({ ...postData });
    console.log("postData: ", postData);
    updateDataReport(idReport, postData);
  };

  const ReportSchema = Yup.object().shape({
    action_recomendation: Yup.string().required("Required"),
    date_signature_auditor: Yup.string().required("Required"),
    internal_auditor: Yup.string().required("Required"),
  });

  useEffect(() => {
    getDataReport(idReport);
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
              <div>
                <h3>Detail Laporan Penyimpangan</h3>
              </div>
              <Spin spinning={loadingSubmit}>
                {idReport && !dataDetail.abberation_id ? (
                  <Skeleton />
                ) : (
                  <Formik
                    enableReinitialize
                    initialValues={initial}
                    validationSchema={ReportSchema}
                    onSubmit={(values) => {
                      onSubmitForm(values);
                    }}
                  >
                    {({ values, errors, touched, handleSubmit, setValues }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6">
                            <h6 className="font-weight-bold">
                              Nomor Penyimpangan
                            </h6>
                            <p>{dataDetail.abberation_id}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="font-weight-bold">
                              Tanggal Penyimpangan
                            </h6>
                            <p>{convertDate(dataDetail.date_abberation)}</p>
                          </div>
                          <div className="col-md-12">
                            <h6 className="font-weight-bold">
                              Rincian Penyimpangan
                            </h6>
                            <p>{dataDetail.detail_abberation}</p>
                          </div>
                          <div className="col-md-12">
                            <h6 className="font-weight-bold">
                              Tindakan Perbaikan
                            </h6>
                            <p>{dataDetail.corrective_action}</p>
                          </div>
                          <div className="col-md-12">
                            <h6 className="font-weight-bold">
                              Analisis Penyebab
                            </h6>
                            <p>{dataDetail.cause_analysis}</p>
                          </div>
                          <div className="col-md-12">
                            <h6 className="font-weight-bold">
                              Tindakan Pencegahan
                            </h6>
                            <p>{dataDetail.preventive_measure}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="font-weight-bold">Pelapor</h6>
                            {dataDetail.signature_reporter && (
                              <img
                                src={`${dataDetail.signature_reporter.pathUrl}`}
                                width="100"
                                alt="ttd-pelapor"
                              />
                            )}
                            <p>{dataDetail.reporter_name}</p>
                            <p>
                              {dataDetail.date_signature_reporter &&
                                convertDate(dataDetail.date_signature_reporter)}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <h6 className="font-weight-bold">
                              Rekomendasi Penanganan terhadap Penyimpangan
                            </h6>
                            {
                              <div className="form-group">
                                <textarea
                                  type="text"
                                  name="action_recomendation"
                                  className="form-control"
                                  value={values.action_recomendation}
                                  onChange={(e) =>
                                    setValues({
                                      ...values,
                                      [e.target.name]: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            }
                            {errors.action_recomendation &&
                              touched.action_recomendation && (
                                <p className="text-danger">
                                  Rekomendasi Penanganan wajib diisi
                                </p>
                              )}
                          </div>
                          <div className="col-md-6">
                            <h6 className="font-weight-bold">
                              Mengetahui
                              <br />
                              Tim Penjaminan Mutu
                            </h6>
                            {dataDetail.signature_auditor ? (
                              <>
                                <img
                                  src={`${dataDetail.signature_auditor.pathUrl}`}
                                  width="100"
                                  alt="ttd-auditor"
                                />
                                <p>{dataDetail.internal_auditor || "....."}</p>
                                <p>
                                  {dataDetail.date_signature_auditor &&
                                    convertDate(
                                      dataDetail.date_signature_auditor
                                    )}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>Tanda Tangan Tim Penjaminan Mutu</p>
                                <label
                                  style={{
                                    border: "1px solid #576971",
                                    cursor: "crosshair",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <Field
                                    name="signature_auditor"
                                    style={{ border: "1px solid black" }}
                                    onMouseUp={(e) => {
                                      setValues({
                                        ...values,
                                        [e.target.name]: e.target.toDataURL(),
                                      });
                                    }}
                                  >
                                    {(props) => (
                                      <>
                                        <Signature
                                          {...props}
                                          ref={(ref) => {
                                            setRefStateAI(ref);
                                            return ref;
                                          }}
                                        />
                                      </>
                                    )}
                                  </Field>
                                </label>
                                <div
                                  className="text-primary"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => refStateAI.clear()}
                                >
                                  Clear
                                </div>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="internal_auditor"
                                    className="form-control"
                                    placeholder="Nama Tim Penjamin Mutu"
                                    value={values.internal_auditor}
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        [e.target.name]: e.target.value,
                                      })
                                    }
                                  />
                                  {errors.internal_auditor &&
                                    touched.internal_auditor && (
                                      <p className="text-danger">
                                        Nama Tim Penjamin Mutu wajib diisi
                                      </p>
                                    )}
                                </div>
                                <div className="form-group">
                                  <label>Tanggal TTD Laporan</label>
                                  <DatePicker
                                    name="date_signature_auditor"
                                    className="form-control"
                                    defaultValue={values.date_signature_auditor}
                                    onChange={(date, dateString) => {
                                      console.log(date, dateString);
                                      setValues({
                                        ...values,
                                        date_signature_auditor: dateString,
                                      });
                                    }}
                                  />
                                  {errors.date_signature_auditor &&
                                    touched.date_signature_auditor && (
                                      <p className="text-danger">
                                        Tanggal TTD Laporan wajib diisi
                                      </p>
                                    )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    )}
                  </Formik>
                )}
              </Spin>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuditorFollowup;
