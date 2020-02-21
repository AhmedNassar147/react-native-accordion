import { StyleProp, ViewStyle, TextStyle } from "react-native";
type CollapseAlign = "top" | "bottom" | "center";

export interface HeaderProps {
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerText: string;
  headerTextStyle?: StyleProp<TextStyle>;
  extraText?: string;
  extraTextStyle: StyleProp<TextStyle>;

  toggleAccordion: () => void;
  icon?: React.ReactNode;
  headerIconContianerStyle?: StyleProp<ViewStyle>;
}

export interface CollapsibleProps {
  style?: StyleProp<ViewStyle>;
  children?: any;
  align?: CollapseAlign;
  duration?: number;
  collapsedHeight?: number;
  collapsed: boolean;
}

export default interface AccorsionProps
  extends Omit<HeaderProps, "toggleAccordion"> {
  itemKey: string;
  children: any;
  onChange?: (orderKey: string) => void;
}
