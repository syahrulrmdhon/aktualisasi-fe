import React from "react";
import {
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Table from "antd/es/table";
import Button from "antd/es/button";
import Tag from "antd/es/tag";
import Modal from "antd/es/modal";
import { convertDate } from "../utils/index";

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

const TableAbberation = ({ dataReport, loadingReport, deleteDataReport }) => {
  const history = useNavigate();
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
      dataIndex: "signed",
      render: (val) => (
        <>
          <Tag color={!val ? "volcano" : "green"}>
            {val ? "Signed" : "Not Signed"}
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
            <Button
              type="primary"
              shape="round"
              className="mb-2 mr-2"
              icon={<DownloadOutlined />}
            />
            <Button type="default" shape="round" icon={<EyeOutlined />} />
          </div>
          <div>
            <Button
              type="default"
              className="btn btn-success mb-2 mr-2"
              shape="round"
              onClick={() => history(`/add-report/${val.id}`)}
              icon={<EditOutlined />}
            />
            <Button
              type="danger"
              shape="round"
              icon={<DeleteOutlined />}
              onClick={() => confirmDelete(val.id, deleteDataReport)}
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="mt-2">
        <Table columns={columns} dataSource={dataReport} />
      </div>
    </>
  );
};

export default TableAbberation;
