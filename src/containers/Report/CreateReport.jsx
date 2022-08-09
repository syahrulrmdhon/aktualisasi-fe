import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { DatePicker, message } from "antd";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CanvasSignature from "react-signature-canvas";
import { postReport, getReport, updateReport } from "../../utils/report";

const Signature = React.forwardRef((props, ref) => (
  <CanvasSignature
    penColor="blue"
    {...props}
    style={{ border: "1px solid black" }}
    ref={ref}
  />
));

const CreateReport = () => {
  const [state, setState] = useState({});
  const ref = React.createRef();
  const [refState, setRefState] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const history = useNavigate();
  const { id: idReport, group } = useParams();

  const [initial, setInitial] = useState({
    signature_reporter: dataDetail.signature_reporter || null,
    reporter_name: dataDetail.reporter_name || "",
    abberation_id: dataDetail.abberation_id || "",
    detail_abberation: dataDetail.detail_abberation || "",
    corrective_action: dataDetail.corrective_action || "",
    cause_analysis: dataDetail.cause_analysis || "",
    preventive_measure: dataDetail.preventive_measure || "",
    type_abberation: dataDetail.type_abberation || "",
    bussiness_process: dataDetail.bussiness_process || "",
    facility_name: dataDetail.facility_name || "",
  });

  const getDataReport = async (idReport) => {
    const res = await getReport(idReport);
    if (res) {
      setDataDetail(...res);
      setInitial({
        signature_reporter: res[0].signature_reporter || null,
        reporter_name: res[0].reporter_name || "",
        abberation_id: res[0].abberation_id || "",
        detail_abberation: res[0].detail_abberation || "",
        corrective_action: res[0].corrective_action || "",
        cause_analysis: res[0].cause_analysis || "",
        preventive_measure: res[0].preventive_measure || "",
        type_abberation: res[0].type_abberation || "",
        bussiness_process: res[0].bussiness_process || "",
        facility_name: res[0].facility_name || "",
      });
    }
  };

  useEffect(() => {
    if (idReport) {
      getDataReport(idReport);
    }
  }, [idReport]);

  const postDataReport = async (postData) => {
    setLoadingSubmit(true);
    const dataPost = {
      date_signature_reporter: new Date().toISOString().split("T")[0],
      surveillance_group: group,
      ...postData,
    };
    let store = await postReport(dataPost);
    if (store.status === 200) {
      setLoadingSubmit(false);
      message.success(store.statusText);
      history("/");
    } else {
      setLoadingSubmit(false);
      message.error("I'm sorry, there was an error");
    }
  };

  const updateDataReport = async (idReport, postData) => {
    let store = await updateReport(idReport, postData);
    if (store) {
      setLoadingSubmit(false);
      message.success(store.message);
      history("/");
    } else {
      setLoadingSubmit(false);
      message.error("I'm sorry, there was an error");
    }
  };

  const onSubmitForm = (values) => {
    if (idReport) {
      let data;
      if (!values.signature_reporter) {
        const current = refState.getTrimmedCanvas();
        data =
          current.width > 1 || current.height > 1 ? current.toDataURL() : null;
      }
      const postData = {
        ...values,
        ...(!values.signature_reporter && {
          signature_reporter: data,
        }),
      };
      setState({ ...postData });
      updateDataReport(idReport, postData);
    } else {
      const current = refState.getTrimmedCanvas();
      const data =
        current.width > 1 || current.height > 1 ? current.toDataURL() : null;
      const postData = { ...values, signature_reporter: data };
      setState({ ...postData });
      postDataReport(postData);
    }
  };

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
                <h3>Buat Laporan Penyimpangan</h3>
              </div>
              {idReport && !dataDetail.abberation_id ? (
                <p>Loading...</p>
              ) : (
                <Formik
                  enableReinitialize
                  initialValues={initial}
                  onSubmit={(values) => {
                    onSubmitForm(values);
                  }}
                >
                  {({ values, errors, touched, handleSubmit, setValues }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Nama Pelapor</label>
                            <input
                              type="text"
                              name="reporter_name"
                              className="form-control"
                              placeholder="Nama Pelapor"
                              value={values.reporter_name}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Nomor Penyimpangan</label>
                            <input
                              type="text"
                              name="abberation_id"
                              className="form-control"
                              placeholder="LP/P/V......"
                              value={values.abberation_id}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Tanggal Penyimpangan</label>
                            <DatePicker
                              name="date_abberation"
                              className="form-control"
                              defaultValue={values.date_abberation}
                              onChange={(date, dateString) => {
                                console.log(date, dateString);
                                setValues({
                                  ...values,
                                  date_abberation: dateString,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Bisnis Proses</label>
                            <input
                              type="text"
                              name="bussiness_process"
                              className="form-control"
                              placeholder="Bisnis proses penyimpangan"
                              value={values.bussiness_process}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Jenis Penyimpangan</label>
                            <input
                              type="text"
                              name="type_abberation"
                              className="form-control"
                              placeholder="Jenis Penyimpangan"
                              value={values.type_abberation}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Nama Sarana</label>
                            <input
                              type="text"
                              name="facility_name"
                              className="form-control"
                              placeholder="Nama Sarana / Nama Perusahaan"
                              value={values.facility_name}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Rincian Penyimpangan</label>
                        <textarea
                          name="detail_abberation"
                          className="form-control"
                          rows="3"
                          value={values.detail_abberation}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label>Analisis Penyebab</label>
                        <textarea
                          name="cause_analysis"
                          className="form-control"
                          rows="3"
                          value={values.cause_analysis}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label>Tindakan Perbaikan</label>
                        <textarea
                          name="corrective_action"
                          className="form-control"
                          rows="3"
                          value={values.corrective_action}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label>Tindakan Pencegahan</label>
                        <textarea
                          name="preventive_measure"
                          className="form-control"
                          rows="3"
                          value={values.preventive_measure}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      {!values.signature_reporter && (
                        <>
                          <p>Tanda Tangan Pelapor</p>
                          <label
                            htmlFor="signature_reporter"
                            style={{
                              border: "1px solid #576971",
                              cursor: "crosshair",
                              borderRadius: "5px",
                            }}
                          >
                            <Field
                              name="signature_reporter"
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
                                      setRefState(ref);
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
                            onClick={() => refState.clear()}
                          >
                            Clear
                          </div>
                        </>
                      )}

                      <br />
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateReport;
