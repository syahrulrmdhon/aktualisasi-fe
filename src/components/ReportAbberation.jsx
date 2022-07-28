import React, { useState } from "react";
import { Page, Text, Image, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { convertDate, ImageExist } from "../utils/index";
import logo_ri from "../assets/logo_ri.png";

const ReportAbberation = ({ dataDetail }) => (
  <Page size="A4" orientation="potrait" style={styles.body}>
    <View style={styles.header} fixed>
      <View style={{ width: "25%" }}>
        <Image style={{ width: "80%", paddingLeft: "20%" }} src={logo_ri} />
      </View>
      <View style={{ width: "25%", borderLeft: "1px solid black" }}>
        <Text
          style={{
            fontSize: 10,
            borderBottom: "1px solid black",
            paddingLeft: "5px",
          }}
        >
          Nomor Formulir
        </Text>
        <Text
          style={{
            fontSize: 10,
            borderBottom: "1px solid black",
            paddingLeft: "5px",
          }}
        >
          Nama Formulir
        </Text>
        <Text
          style={{
            fontSize: 10,
            borderBottom: "1px solid black",
            paddingLeft: "5px",
          }}
        >
          Nomor Revisi
        </Text>
        <Text
          style={{
            fontSize: 10,
            borderBottom: "1px solid black",
            paddingLeft: "5px",
          }}
        >
          Tanggal Efektif
        </Text>
        <Text style={{ fontSize: 10, paddingLeft: "5px" }}>Halaman</Text>
      </View>
      <View style={{ width: "50%", borderLeft: "1px solid black" }}>
        <Text
          style={{
            fontSize: 10,
            borderBottom: "1px solid black",
            paddingLeft: "5px",
          }}
        >
          POM-16.02/CFM.05/SOP.01/33/F02
        </Text>
        <Text
          style={{
            fontSize: 10,
            borderBottom: "1px solid black",
            paddingLeft: "5px",
          }}
        >
          Laporan Penyimpangan
        </Text>
        <Text
          style={{
            fontSize: 10,
            borderBottom: "1px solid black",
            paddingLeft: "5px",
          }}
        >
          01
        </Text>
        <Text
          style={{
            fontSize: 10,
            borderBottom: "1px solid black",
            paddingLeft: "5px",
          }}
        >
          28 Januari 2020
        </Text>
        <Text
          style={{ fontSize: 10, paddingLeft: "5px" }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} dari ${totalPages} hal.`
          }
        />
      </View>
    </View>
    <Text style={{ fontSize: 10 }}>No: {dataDetail.abberation_id}</Text>
    <View style={{ border: "1 px solid black" }}>
      <View
        style={{
          boderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: "#C4E3AC",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            fontSize: 11,
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          LAPORAN PENYIMPANGAN DAN TINDAKAN YANG TELAH DIAMBIL
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            borderRight: "1px solid black",
            padding: "5px",
          }}
        >
          <Text style={{ fontSize: 10 }}>Penyimpangan/Kegagalan No.</Text>
          <Text style={{ fontSize: 10 }}>{dataDetail.abberation_id}</Text>
        </View>
        <View style={{ width: "50%", padding: "5px" }}>
          <Text style={{ fontSize: 10 }}>Tanggal Terjadi Penyimpangan</Text>
          <Text style={{ fontSize: 10 }}>
            {convertDate(dataDetail.date_abberation, "type")}
          </Text>
        </View>
      </View>
      <View
        style={{
          boderBottom: "1px solid black",
          borderTop: "1px solid black",
          padding: "5px",
        }}
      >
        <Text style={{ fontSize: 10 }}>Rincian Penyimpangan</Text>
        <Text style={{ fontSize: 10 }}>{dataDetail.detail_abberation}</Text>
      </View>
      <View
        style={{
          boderBottom: "1px solid black",
          borderTop: "1px solid black",
          padding: "5px",
        }}
      >
        <Text style={{ fontSize: 10 }}>Tindak Perbaikan</Text>
        <Text style={{ fontSize: 10 }}>{dataDetail.corrective_action}</Text>
      </View>
      <View
        style={{
          boderBottom: "1px solid black",
          borderTop: "1px solid black",
          padding: "5px",
        }}
      >
        <Text style={{ fontSize: 10 }}>Analisis Penyebab</Text>
        <Text style={{ fontSize: 10 }}>{dataDetail.cause_analysis}</Text>
      </View>
      <View
        style={{
          boderBottom: "1px solid black",
          borderTop: "1px solid black",
          padding: "5px",
        }}
      >
        <Text style={{ fontSize: 10 }}>Tindakan Pencegahan</Text>
        <Text style={{ fontSize: 10 }}>{dataDetail.preventive_measure}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            borderRight: "1px solid black",
            borderTop: "1px solid black",
            padding: "5px",
          }}
        >
          <Text style={{ fontSize: 10 }}>Pelapor</Text>
          {ImageExist(dataDetail.signature_reporter) ? (
            <Image
              style={{ width: "100px", paddingLeft: "20%" }}
              src={`${process.env.REACT_APP_HOST}${dataDetail.signature_reporter}`}
            />
          ) : (
            <View style={{ height: "80px" }}></View>
          )}

          <Text style={{ fontSize: 10 }}>{dataDetail.reporter_name}</Text>
          <Text style={{ fontSize: 10 }}>
            {convertDate(dataDetail.date_signature_reporter, "type")}
          </Text>
        </View>
        <View
          style={{ width: "50%", padding: "5px", borderTop: "1px solid black" }}
        >
          <Text style={{ fontSize: 10 }}>
            Mengetahui Ka. Sub Dit./Ka. Bid./Kasi
          </Text>
          {ImageExist(dataDetail.signature_headsub) ? (
            <Image
              style={{ width: "100px", paddingLeft: "20%" }}
              src={`${process.env.REACT_APP_HOST}${dataDetail.signature_headsub}`}
            />
          ) : (
            <View style={{ height: "80px" }}></View>
          )}
          <Text style={{ fontSize: 10 }}>{dataDetail.name_headsub}</Text>
          <Text style={{ fontSize: 10 }}>
            {dataDetail.date_signature_headsub &&
              convertDate(dataDetail.date_signature_headsub, "type")}
          </Text>
        </View>
      </View>
      <View
        style={{
          boderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: "#C4E3AC",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 11,
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          KAJIAN TIM PENJAMIN MUTU (AUDITOR INTERNAL)
        </Text>
      </View>
      <View
        style={{
          boderBottom: "1px solid black",
          padding: "5px",
        }}
      >
        <Text style={{ fontSize: 10 }}>
          Rekomendasi Pengananan terhadap Penyimpangan:
        </Text>
        <Text style={{ fontSize: 10 }}>{dataDetail.action_recomendation}</Text>
      </View>
      <View
        style={{
          boderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: "#C4E3AC",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 11,
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          VERIFIKASI PENANGANAN PENYIMPANGAN
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 11,
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          DAN MONEV TINDAKAN PERBAIKAN PENCEGAHAN
        </Text>
      </View>
      <View
        style={{
          boderBottom: "1px solid black",
          padding: "5px",
        }}
      >
        <Text style={{ fontSize: 10 }}>Catatan:</Text>
        <Text style={{ fontSize: 10 }}>{dataDetail.action_recomendation}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "1px solid black",
        }}
      >
        <View
          style={{
            width: "50%",
            borderRight: "1px solid black",
            borderTop: "1px solid black",
            padding: "5px",
          }}
        >
          <Text style={{ fontSize: 10 }}>Dilakukan Oleh</Text>
          <Text style={{ fontSize: 10 }}>Ka. Sub Dit./Ka. Bid./Kasi</Text>
          {ImageExist(dataDetail.signature_headsub) ? (
            <Image
              style={{ width: "100px", paddingLeft: "20%" }}
              src={`${process.env.REACT_APP_HOST}${dataDetail.signature_headsub}`}
            />
          ) : (
            <View style={{ height: "80px" }}></View>
          )}
          <Text style={{ fontSize: 10 }}>{dataDetail.name_headsub}</Text>
          <Text style={{ fontSize: 10 }}>
            {dataDetail.date_signature_headsub &&
              convertDate(dataDetail.date_signature_headsub, "type")}
          </Text>
        </View>
        <View
          style={{ width: "50%", padding: "5px", borderTop: "1px solid black" }}
        >
          <Text style={{ fontSize: 10 }}>Mengetahui</Text>
          <Text
            style={{ fontSize: 10 }}
          >{`Tim Penjamin Mutu (Auditor Internal)`}</Text>
          {ImageExist(dataDetail.signature_auditor) ? (
            <Image
              style={{ width: "100px", paddingLeft: "20%" }}
              src={`${process.env.REACT_APP_HOST}${dataDetail.signature_auditor}`}
            />
          ) : (
            <View style={{ height: "80px" }}></View>
          )}
          <Text style={{ fontSize: 10 }}>{dataDetail.auditor_internal}</Text>
          <Text style={{ fontSize: 10 }}>
            {dataDetail.date_signature_auditor &&
              convertDate(dataDetail.date_signature_auditor, "type")}
          </Text>
        </View>
      </View>
      <View
        style={{
          boderTop: "1px solid black",
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 11,
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          PERSETUJUAN AKHIR OLEH TIM PENJAMINAN MUTU
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 11,
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          DAN KETUA MR/DIREKTUR/KEPALA BALAI
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            borderRight: "1px solid black",
            borderTop: "1px solid black",
            padding: "5px",
          }}
        >
          <Text style={{ fontSize: 10 }}>
            Koordintor Tim Mutu/Wakil Ketua MR
          </Text>
          {ImageExist(dataDetail.signature_head_auditor) ? (
            <Image
              style={{ width: "100px", paddingLeft: "20%" }}
              src={`${process.env.REACT_APP_HOST}${dataDetail.signature_head_auditor}`}
            />
          ) : (
            <View style={{ height: "80px" }}></View>
          )}
          <Text style={{ fontSize: 10 }}>{dataDetail.name_head_auditor}</Text>
          <Text style={{ fontSize: 10 }}>
            {dataDetail.date_signature_head_auditor &&
              convertDate(dataDetail.date_signature_head_auditor, "type")}
          </Text>
        </View>
        <View
          style={{ width: "50%", padding: "5px", borderTop: "1px solid black" }}
        >
          <Text style={{ fontSize: 10 }}>Direktur / Kepala Balai</Text>
          {ImageExist(dataDetail.signature_ceo) ? (
            <Image
              style={{ width: "100px", paddingLeft: "20%" }}
              src={`${process.env.REACT_APP_HOST}${dataDetail.signature_ceo}`}
            />
          ) : (
            <View style={{ height: "80px" }}></View>
          )}
          <Text style={{ fontSize: 10 }}>{dataDetail.name_ceo}</Text>
          <Text style={{ fontSize: 10 }}>
            {dataDetail.date_signature_ceo &&
              convertDate(dataDetail.date_signature_ceo, "type")}
          </Text>
        </View>
      </View>
    </View>
  </Page>
);

export default ReportAbberation;
