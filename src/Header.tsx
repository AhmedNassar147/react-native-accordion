import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
import { HeaderProps } from "./index.interface";

const { memo } = React;

const Header: React.FC<HeaderProps> = ({
  toggleAccordion,
  headerText,
  extraText,
  icon,
  headerIconContianerStyle,
  extraTextStyle,
  headerContainerStyle,
  headerTextStyle
}) => (
  <TouchableOpacity
    onPress={toggleAccordion}
    style={[
      styles.rowStyle,
      styles.horizontalCenteredFlex,
      styles.headerContainer,
      headerContainerStyle
    ]}
  >
    <View
      style={[
        styles.headerContent,
        styles.rowStyle,
        styles.horizontalCenteredFlex
      ]}
    >
      <TouchableOpacity
        style={[styles.headerIconContainer, headerIconContianerStyle]}
      >
        {icon && icon}
      </TouchableOpacity>
      <Text style={[styles.headerText, headerTextStyle]}>{headerText}</Text>
    </View>

    {!!extraText && (
      <Text
        style={[styles.headerExtraText, extraTextStyle]}
        children={extraText}
      />
    )}
  </TouchableOpacity>
);

export default memo(Header);
