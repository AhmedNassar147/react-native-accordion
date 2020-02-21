import { StyleSheet, I18nManager, Platform } from "react-native";
import theme from "./theme";

const isRtl = I18nManager.isRTL;

export default StyleSheet.create({
  mainStyles: {
    position: "absolute",
    opacity: 0
  },
  collapsebleStyle: {
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  accordContainerStyle: {
    borderRadius: 8,
    position: "relative",
    zIndex: 500,
    marginVertical: 4
  },
  headerContainer: {
    height: 55,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.placeholder,
    borderRadius: 5,
    width: "100%",
    justifyContent: "space-between"
  },
  headerContent: {
    height: "100%"
  },
  horizontalCenteredFlex: {
    alignItems: "center"
  },
  rowStyle: {
    flexDirection: isRtl ? "row-reverse" : "row"
  },
  headerText: {
    height: 26,
    fontSize: 17,
    lineHeight: 24,
    color: theme.black23
  },
  headerExtraText: {
    height: 26,
    fontSize: 15,
    lineHeight: 25,
    color: theme.black23,
    opacity: 0.85
  },
  headerIconContainer: {
    marginEnd: 12,
    minWidth: 24
  },
  shadow: {
    backgroundColor: theme.white,
    shadowColor: Platform.select({
      ios: "rgba(114, 124, 142, 0.4)",
      android: "#000"
    }),
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 9,
    shadowOpacity: 0.5
  }
});
