import React from "react";
import { View } from "react-native";
import Collapsible from "./Collapsible";
import styles from "./styles";
import Header from "./Header";
import AccorsionProps from "./index.interface";

const { useState, memo, useCallback } = React;

const Accordion: React.FC<AccorsionProps> = ({
  itemKey,
  children,
  onChange,
  headerText,
  extraText,
  extraTextStyle,
  headerContainerStyle,
  headerIconContianerStyle,
  headerTextStyle,
  icon
}) => {
  const [activeKey, setActiveKey] = useState("");

  const toggleActiveState = useCallback(() => {
    setActiveKey(oldKey => {
      const key = oldKey === itemKey ? "" : itemKey;
      if (onChange) {
        onChange(key);
      }
      return key;
    });
  }, [setActiveKey, onChange, itemKey]);

  return (
    <View style={[styles.shadow, styles.accordContainerStyle]}>
      <Header
        toggleAccordion={toggleActiveState}
        headerText={headerText}
        extraText={extraText}
        extraTextStyle={extraTextStyle}
        headerContainerStyle={headerContainerStyle}
        headerIconContianerStyle={headerIconContianerStyle}
        headerTextStyle={headerTextStyle}
        icon={icon}
      />

      <Collapsible collapsed={!activeKey} align="top">
        {children}
      </Collapsible>
    </View>
  );
};

export default memo(Accordion);
