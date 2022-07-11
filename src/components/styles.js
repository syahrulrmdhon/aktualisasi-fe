import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  body: {
    paddingLeft: "2cm",
    paddingRight: "2cm",
    paddingTop: "1cm",
  },
  header: {
    display: "flex",
    marginLeft: "0.7cm",
    marginRight: "0.7cm",
    flexDirection: "row",
    fontSize: 11,
    marginBottom: 5,
    border: "1px solid black",
  },
});
