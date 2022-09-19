import React, { useState } from "react";
import {
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Document, PDFViewer } from "@react-pdf/renderer";
import NewWindow from "react-new-window";
import Table from "antd/es/table";
import Button from "antd/es/button";
import Tag from "antd/es/tag";
import Modal from "antd/es/modal";
import Tooltip from "antd/es/tooltip";
import Skeleton from "antd/es/skeleton";
import ReportAbberation from "./ReportAbberation";
import { convertDate, ImageExist } from "../utils/index";

const confirmDelete = (id, deleteDataReport) => {
  Modal.confirm({
    title: "Apakah anda yakin akan menghapus ini?",
    icon: <ExclamationCircleOutlined />,
    content: "Data tidak bisa di kembalikan jika terhapus.",
    okText: "Yakin",
    cancelText: "Tidak",
    onOk: () => deleteDataReport(id),
  });
};

const TableHeadsub = ({ dataReport, loadingReport, group }) => {
  const history = useNavigate();
  const [visible, setVisible] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [showFile, setShowFile] = useState(false);
  const onDetail = (id) => {
    setVisible(true);
    setDataDetail(dataReport.find((el) => el.id === id));
  };
  const handleDownload = (id) => {
    setShowFile(true);
    setDataDetail(dataReport.find((el) => el.id === id));
  };
  const columns = [
    {
      title: "Nomor Penyimpangan",
      dataIndex: "abberation_id",
      key: "abberation_id",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Tanggal Penyimpangan",
      dataIndex: "date_abberation",
      key: "date_abberation",
      render: (text) => <div>{convertDate(text)}</div>,
    },
    {
      title: "Nama Sarana",
      dataIndex: "facility_name",
      key: "facility_name",
    },
    {
      title: "Bisnis Proses",
      dataIndex: "bussiness_process",
      key: "bussiness_process",
    },
    {
      title: "Jenis Penyimpangan",
      dataIndex: "type_abberation",
      key: "type_abberation",
    },
    {
      title: "Signed",
      key: "signed",
      render: (val) => (
        <>
          <Tag color={val.signature_headsub ? "green" : "volcano"}>
            {val.signature_headsub ? "Signed" : "Not Signed"}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "id",
      render: (val) => (
        <div>
          <div>
            {showFile && dataDetail.id === val.id ? (
              <Tooltip placement="top" title="Tutup Laporan">
                <Button
                  danger
                  shape="round"
                  className="mb-2 mr-2"
                  icon={<FullscreenExitOutlined />}
                  onClick={() => setShowFile(false)}
                />
              </Tooltip>
            ) : (
              <Tooltip placement="top" title="Download Laporan">
                <Button
                  type="primary"
                  shape="round"
                  className="mb-2 mr-2"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(val.id)}
                />
              </Tooltip>
            )}
          </div>
          <div>
            <Tooltip placement="top" title="Lihat Detail">
              <Button
                type="default"
                shape="round"
                icon={<EyeOutlined />}
                onClick={() => onDetail(val.id)}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="top" title="Tindak Lanjuti Laporan">
              <Button
                type="default"
                className="btn btn-success mt-2"
                style={{
                  backgroundColor: "#28a745",
                  borderColor: "#28a745",
                  color: "#fff",
                }}
                shape="round"
                onClick={() => history(`/headsub-followup/${group}/${val.id}`)}
                icon={<EditOutlined />}
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="mt-2">
        {loadingReport ? (
          <Skeleton />
        ) : (
          <Table columns={columns} dataSource={dataReport} />
        )}
      </div>
      <Modal
        title="Detail Laporan Penyimpangan"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <div className="row">
          <div className="col-md-6">
            <h6 className="font-weight-bold">Nomor Penyimpangan</h6>
            <p>{dataDetail.abberation_id}</p>
          </div>
          <div className="col-md-6">
            <h6 className="font-weight-bold">Tanggal Penyimpangan</h6>
            <p>{convertDate(dataDetail.date_abberation)}</p>
          </div>
          <div className="col-md-12">
            <h6 className="font-weight-bold">Rincian Penyimpangan</h6>
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
            <h6 className="font-weight-bold">Tindakan Pencegahan</h6>
            <p>{dataDetail.preventive_measure}</p>
          </div>
          <div className="col-md-6">
            <h6 className="font-weight-bold">Pelapor</h6>
            {dataDetail.signature_reporter &&
            ImageExist(dataDetail.signature_reporter) ? (
              <img
                src={`${dataDetail.signature_reporter.pathUrl}`}
                width="100"
                alt="ttd-pelapor"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://ik.imagekit.io/vn1tyriomme/Screenshot_47_DnQ9H1lCN.png";
                }}
              />
            ) : (
              <div className="mb-4" style={{ height: "80px" }} />
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
            {dataDetail.signature_headsub &&
            ImageExist(dataDetail.signature_headsub) ? (
              <img
                src={`${dataDetail.signature_headsub.pathUrl}`}
                width="100"
                alt="ttd-pelapor"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://ik.imagekit.io/vn1tyriomme/Screenshot_47_DnQ9H1lCN.png";
                }}
              />
            ) : (
              <div className="mb-4" style={{ height: "80px" }} />
            )}
            <p>{dataDetail.name_headsub}</p>
            <p>
              {dataDetail.date_signature_headsub &&
                convertDate(dataDetail.date_signature_headsub)}
            </p>
          </div>
          <div className="col-md-12">
            <h6 className="font-weight-bold">
              Rekomendasi Penanganan terhadap Penyimpangan
            </h6>
            <p>{dataDetail.action_recomendation || "....."}</p>
          </div>
          <div className="col-md-12">
            <h6 className="font-weight-bold">Catatan</h6>
            <p>{dataDetail.notes_headsub || "....."}</p>
          </div>
          <div className="col-md-6">
            <h6 className="font-weight-bold">
              Dilakukan Oleh Ka. Sub Dit/Ka. Bid/Kasi
            </h6>
            {dataDetail.signature_headsub &&
            ImageExist(dataDetail.signature_headsub) ? (
              <img
                src={`${dataDetail.signature_headsub.pathUrl}`}
                width="100"
                alt="ttd-pelapor"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://ik.imagekit.io/vn1tyriomme/Screenshot_47_DnQ9H1lCN.png";
                }}
              />
            ) : (
              <div className="mb-4" style={{ height: "80px" }} />
            )}
            <p>{dataDetail.name_headsub || "....."}</p>
            <p>
              {dataDetail.date_signature_headsub &&
                convertDate(dataDetail.date_signature_headsub)}
            </p>
          </div>
          <div className="col-md-6">
            <h6 className="font-weight-bold">
              Mengetahui
              <br />
              Tim Penjaminan Mutu
            </h6>
            {dataDetail.signature_auditor &&
            ImageExist(dataDetail.signature_auditor) ? (
              <img
                src={`${dataDetail.signature_auditor.pathUrl}`}
                width="100"
                alt="ttd-pelapor"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://ik.imagekit.io/vn1tyriomme/Screenshot_47_DnQ9H1lCN.png";
                }}
              />
            ) : (
              <div className="mb-4" style={{ height: "80px" }} />
            )}
            <p>{dataDetail.internal_auditor || "....."}</p>
            <p>
              {dataDetail.date_signature_auditor &&
                convertDate(dataDetail.date_signature_auditor)}
            </p>
          </div>
          <div className="col-md-6">
            <h6 className="font-weight-bold">
              Koordinalor Tim Mutu/Wakil Ketua MR
            </h6>
            {dataDetail.signature_head_auditor &&
            ImageExist(dataDetail.signature_head_auditor) ? (
              <img
                src={`${dataDetail.signature_head_auditor.pathUrl}`}
                width="100"
                alt="ttd-pelapor"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://ik.imagekit.io/vn1tyriomme/Screenshot_47_DnQ9H1lCN.png";
                }}
              />
            ) : (
              <div className="mb-4" style={{ height: "80px" }} />
            )}
            <p>{dataDetail.name_head_auditor || "....."}</p>
            <p>
              {dataDetail.date_signature_head_auditor &&
                convertDate(dataDetail.date_signature_head_auditor)}
            </p>
          </div>
          <div className="col-md-6">
            <h6 className="font-weight-bold">Direktur</h6>
            {dataDetail.signature_ceo &&
            ImageExist(dataDetail.signature_ceo) ? (
              <img
                src={`${dataDetail.signature_ceo.pathUrl}`}
                width="100"
                alt="ttd-pelapor"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://ik.imagekit.io/vn1tyriomme/Screenshot_47_DnQ9H1lCN.png";
                }}
              />
            ) : (
              <div className="mb-4" style={{ height: "80px" }} />
            )}
            <p>{dataDetail.name_ceo || "....."}</p>
            <p>
              {dataDetail.date_signature_ceo &&
                convertDate(dataDetail.date_signature_ceo)}
            </p>
          </div>
        </div>
      </Modal>
      {showFile && (
        <NewWindow title="Laporan Penyimpangan">
          <PDFViewer showToolbar={true} width="100%" height="1000">
            <Document>
              <ReportAbberation dataDetail={dataDetail} />
            </Document>
          </PDFViewer>
        </NewWindow>
      )}
    </>
  );
};

export default TableHeadsub;
