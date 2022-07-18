import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CanvasSignature from "react-signature-canvas";
import { getReport, updateReport } from "../../utils/report";
import { convertDate } from "../../utils/index";

const Signature = React.forwardRef((props, ref) => (
  <CanvasSignature
    penColor="blue"
    {...props}
    style={{ border: "1px solid black" }}
    ref={ref}
  />
));

const VerifyPage = () => {
  const { id: idReport, group } = useParams();
  const [state, setState] = useState({});
  const ref = React.createRef();
  const [refStateSubdit, setRefStateSubdit] = useState({});
  const [refStateAI, setRefStateAI] = useState({});
  const [refStateHA, setRefStateHA] = useState({});
  const [refStateCEO, setRefStateCEO] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const history = useNavigate();
  const getDataReport = async (idReport) => {
    const res = await getReport(idReport);
    if (res) {
      setDataDetail(...res);
      setInitial({
        action_recomendation: res[0].action_recomendation || null,
        signature_headsub: res[0].signature_headsub || null,
        name_headsub: res[0].name_headsub || null,
        date_signature_headsub: res[0].date_signature_headsub || null,
        signature_auditor: res[0].signature_auditor || null,
        date_signature_auditor: res[0].date_signature_auditor || null,
        internal_auditor: res[0].internal_auditor || null,
        signature_head_auditor: res[0].signature_head_auditor || null,
        name_head_auditor: res[0].name_head_auditor || null,
        date_signature_head_auditor: res[0].date_signature_head_auditor || null,
        signature_ceo: res[0].signature_ceo || null,
        name_ceo: res[0].name_ceo || null,
        date_signature_ceo: res[0].date_signature_ceo || null,
      });
    }
  };
  const [initial, setInitial] = useState({
    action_recomendation: dataDetail.action_recomendation || '',
    signature_headsub: '',
    name_headsub: '',
    date_signature_headsub: '',
    signature_auditor: '',
    date_signature_auditor: '',
    internal_auditor: '',
    signature_head_auditor: '',
    name_head_auditor: '',
    date_signature_head_auditor: '',
    signature_ceo: '',
    name_ceo: '',
    date_signature_ceo: '',
  });

  const updateDataReport = async (idReport, postData) => {
    let store = await updateReport(idReport, postData);
    if (store) {
      setLoadingSubmit(false);
      message.success(store.message);
      history("/verificator");
    } else {
      setLoadingSubmit(false);
      message.error("I'm sorry, there was an error");
    }
  };

  const onSubmitForm = (values) => {
    let dataHeadSub;
    let dataAI;
    let dataHA;
    let dataCEO;
    if (!values.signature_headsub) {
      const current = refStateSubdit.getTrimmedCanvas();
      dataHeadSub =
        current.width > 1 || current.height > 1 ? current.toDataURL() : null;
    }
    if(!values.signature_auditor) {
      const currentAI = refStateAI.getTrimmedCanvas();
      dataAI =
        currentAI.width > 1 || currentAI.height > 1 ? currentAI.toDataURL() : null;
    }
    if(!values.signature_head_auditor) {
      const currentHA = refStateHA.getTrimmedCanvas();
      dataHA =
        currentHA.width > 1 || currentHA.height > 1 ? currentHA.toDataURL() : null;
    }
    if(!values.signature_ceo) {
      const currentCEO = refStateCEO.getTrimmedCanvas();
      dataCEO =
        currentCEO.width > 1 || currentCEO.height > 1 ? currentCEO.toDataURL() : null;
    }
    const postData = {
      ...values,
      ...(!values.signature_headsub &&
        dataHeadSub && {
          signature_headsub: dataHeadSub,
          date_signature_headsub: new Date().toISOString().split("T")[0],
        }),
      ...(!values.signature_auditor && dataAI && {
        signature_auditor: dataAI,
        date_signature_auditor: new Date().toISOString().split("T")[0],
      }),
      ...(!values.signature_head_auditor && dataHA && {
        signature_head_auditor: dataHA,
        date_signature_head_auditor: new Date().toISOString().split("T")[0],
      }),
      ...(!values.signature_ceo && dataCEO && {
        signature_ceor: dataCEO,
        date_signature_ceo: new Date().toISOString().split("T")[0],
      }),
    };
    setState({ ...postData });
    console.log("postData: ", postData);
    updateDataReport(idReport, postData);
  };

  useEffect(() => {
    getDataReport(idReport);
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
                <h3>Detail Laporan Penyimpangan</h3>
              </div>
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
                        <h6 className="font-weight-bold">Nomor Penyimpangan</h6>
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
                        <h6 className="font-weight-bold">Tindakan Perbaikan</h6>
                        <p>{dataDetail.corrective_action}</p>
                      </div>
                      <div className="col-md-12">
                        <h6 className="font-weight-bold">Analisis Penyebab</h6>
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
                            src={`${process.env.REACT_APP_HOST}${dataDetail.signature_reporter}`}
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
                      <div className="col-md-6">
                        <h6 className="font-weight-bold">
                          Mengetahui Ka. Sub Dit/Ka. Bid/Kasi
                        </h6>
                        {dataDetail.signature_headsub ? (
                          <>
                            {dataDetail.signature_headsub && (
                              <img
                                src={`${process.env.REACT_APP_HOST}${dataDetail.signature_headsub}`}
                                width="100"
                                alt="ttd-pelapor"
                              />
                            )}
                            <p>{dataDetail.name_headsub}</p>
                            <p>
                              {dataDetail.date_signature_headsub &&
                                convertDate(dataDetail.date_signature_headsub)}
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
                                        setRefStateSubdit(ref);
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
                              onClick={() => refStateSubdit.clear()}
                            >
                              Clear
                            </div>
                            <div className="form-group">
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
                            </div>
                          </>
                        )}
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
                              src={`${process.env.REACT_APP_HOST}${dataDetail.signature_auditor}`}
                              width="100"
                              alt="ttd-pelapor"
                            />
                            <p>{dataDetail.internal_auditor || "....."}</p>
                            <p>
                              {dataDetail.date_signature_auditor &&
                                convertDate(dataDetail.date_signature_auditor)}
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
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-md-6">
                        <h6 className="font-weight-bold">
                          Koordinalor Tim Mutu/Wakil Ketua MR
                        </h6>
                        {dataDetail.signature_head_auditor ? (
                          <>
                            <img
                              src={`${process.env.REACT_APP_HOST}${dataDetail.signature_head_auditor}`}
                              width="100"
                              alt="ttd-pelapor"
                            />
                            <p>{dataDetail.name_head_auditor || "....."}</p>
                            <p>
                              {dataDetail.date_signature_head_auditor &&
                                convertDate(
                                  dataDetail.date_signature_head_auditor
                                )}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              Tanda Tangan Koordinalor Tim Mutu/Wakil Ketua MR
                            </p>
                            <label
                              style={{
                                border: "1px solid #576971",
                                cursor: "crosshair",
                                borderRadius: "5px",
                              }}
                            >
                              <Field
                                name="signature_head_auditor"
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
                                        setRefStateHA(ref);
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
                              onClick={() => refStateHA.clear()}
                            >
                              Clear
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                name="name_head_auditor"
                                className="form-control"
                                placeholder="Nama Koordinalor Tim Mutu/Wakil Ketua MR"
                                value={values.name_head_auditor}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-md-6">
                        <h6 className="font-weight-bold">Direktur</h6>
                        {dataDetail.signature_ceo ? (
                          <>
                            <img
                              src={`${process.env.REACT_APP_HOST}${dataDetail.signature_ceo}`}
                              width="100"
                              alt="ttd-pelapor"
                            />
                            <p>{dataDetail.name_ceo || "....."}</p>
                            <p>
                              {dataDetail.date_signature_ceo &&
                                convertDate(dataDetail.date_signature_ceo)}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>Tanda Tangan Direktur</p>
                            <label
                              style={{
                                border: "1px solid #576971",
                                cursor: "crosshair",
                                borderRadius: "5px",
                              }}
                            >
                              <Field
                                name="signature_ceo"
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
                                        setRefStateCEO(ref);
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
                              onClick={() => refStateCEO.clear()}
                            >
                              Clear
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                name="name_ceo"
                                className="form-control"
                                placeholder="Nama Direktur"
                                value={values.name_ceo}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyPage;
