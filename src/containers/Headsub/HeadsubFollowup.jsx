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
import { getReport, updateReport } from "../../utils/headsub";
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
  const [initial, setInitial] = useState({
    notes_headsub: dataDetail.notes_headsub || "",
    signature_headsub: dataDetail.signature_headsub || "",
    date_signature_headsub: dataDetail.date_signature_headsub || "",
    name_headsub: dataDetail.name_headsub || "",
  });
  const getDataReport = async (idReport) => {
    const res = await getReport(idReport, token);
    if (res.status === 200) {
      setDataDetail(...res.data);
      setInitial({
        notes_headsub: res.data[0].notes_headsub || null,
        signature_headsub: res.data[0].signature_headsub || null,
        date_signature_headsub: res.data[0].date_signature_headsub || null,
        name_headsub: res.data[0].name_headsub || null,
      });
    }
  };

  const updateDataReport = async (idReport, postData) => {
    setLoadingSubmit(true);
    let store = await updateReport(idReport, postData, token);
    if (store.status === 200) {
      setLoadingSubmit(false);
      message.success(store.data.message);
      history("/headsub");
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
          signature_headsub: dataAI,
          //   date_signature_auditor: new Date().toISOString().split("T")[0],
        }),
    };
    setState({ ...postData });
    console.log("postData: ", postData);
    updateDataReport(idReport, postData);
  };

  const ReportSchema = Yup.object().shape({
    // action_recomendation: Yup.string().required("Required"),
    date_signature_headsub: Yup.string().required("Required"),
    name_headsub: Yup.string().required("Required"),
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
                            <p>{dataDetail.action_recomendation}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="font-weight-bold">
                              Mengetahui
                              <br />
                              Tim Penjaminan Mutu
                            </h6>
                            {dataDetail.signature_auditor && (
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
                            )}
                          </div>
                          <div className="col-md-6"></div>
                          <div className=" col-md-12">
                            <h6 className="font-weight-bold">Catatan</h6>
                            {
                              <div className="form-group">
                                <textarea
                                  type="text"
                                  name="notes_headsub"
                                  className="form-control"
                                  value={values.notes_headsub}
                                  onChange={(e) =>
                                    setValues({
                                      ...values,
                                      [e.target.name]: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            }
                            {/* {errors.notes_headsub &&
                              touched.notes_headsub && (
                                <p className="text-danger">
                                  Rekomendasi Penanganan wajib diisi
                                </p>
                              )} */}
                          </div>
                          <div className="col-md-6">
                            <h6 className="font-weight-bold">
                              Dilakukan Oleh
                              <br />
                              Ka. Sub Dit/Ka. Bid/Kasi
                            </h6>
                            {dataDetail.signature_headsub ? (
                              <>
                                <img
                                  src={`${dataDetail.signature_headsub.pathUrl}`}
                                  width="100"
                                  alt="ttd-headsub"
                                />
                                <p>{dataDetail.name_headsub || "....."}</p>
                                <p>
                                  {dataDetail.date_signature_headsub &&
                                    convertDate(
                                      dataDetail.date_signature_headsub
                                    )}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>Tanda Tangan Ka. Sub Dit/Ka. Bid/Kasi</p>
                                <label
                                  style={{
                                    border: "1px solid #576971",
                                    cursor: "crosshair",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <Field
                                    name="signature_headsub"
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
                                  <label>Nama Ka. Sub Dit/Ka. Bid/Kasi</label>
                                  <input
                                    type="text"
                                    name="name_headsub"
                                    className="form-control"
                                    placeholder="Nama Ka. Sub Dit/Ka. Bid/Kasi"
                                    value={values.name_headsub}
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        [e.target.name]: e.target.value,
                                      })
                                    }
                                  />
                                  {errors.name_headsub &&
                                    touched.name_headsub && (
                                      <p className="text-danger">
                                        Nama Ka. Sub Dit/Ka. Bid/Kasi
                                      </p>
                                    )}
                                </div>
                                <div className="form-group">
                                  <label>Tanggal TTD Laporan</label>
                                  <DatePicker
                                    name="date_signature_headsub"
                                    className="form-control"
                                    defaultValue={values.date_signature_headsub}
                                    onChange={(date, dateString) => {
                                      console.log(date, dateString);
                                      setValues({
                                        ...values,
                                        date_signature_headsub: dateString,
                                      });
                                    }}
                                  />
                                  {errors.date_signature_headsub &&
                                    touched.date_signature_headsub && (
                                      <p className="text-danger">
                                        Tanggal TTD Laporan wajib diisi
                                      </p>
                                    )}
                                </div>
                              </>
                            )}
                          </div>
                          {/*here*/}
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
