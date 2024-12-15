import { StyleSheet } from "react-native";
import { COLORS } from "./Colors";

export const ITEM_STYLES = StyleSheet.create({
  item: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.secondaryBlack,
    marginVertical: 20,
  },
  thumbnail: {
    width: 75,
    height: "100%",
    marginRight: 10,
  },
  informations: {
    width: "80%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
    fontSize: 14,
    marginTop: 5,
  },
  subInformation: {
    color: COLORS.grey,
    fontFamily: "LatoRegular",
    fontSize: 10,
    marginTop: 5,
  },
  downloadButton: {
    width: 100,
    backgroundColor: "none",
    justifyContent: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 10,
    fontFamily: "LatoSemiBold",
    color: COLORS.green,
  },
});
