import React from "react";
import { Animated } from "react-native";
import styles from "./styles";
import { CollapsibleProps } from "./index.interface";
import usePrevious from "./hooks/usePrevious";

const { memo, useState, useRef, useCallback, useEffect, useMemo } = React;

const Collapsible: React.FC<CollapsibleProps> = ({
  collapsedHeight,
  style: styleProps,
  align,
  children,
  collapsed,
  duration
}): JSX.Element => {
  const [measuring, setIsMeasuring] = useState<boolean>(false);
  const [measured, setMeasured] = useState<boolean>(false);
  const [animating, setIsAnimating] = useState<boolean>(false);
  const [height] = useState<Animated.Value>(
    new Animated.Value(collapsedHeight || 0)
  );
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentHandle = useRef(null);
  const _animation = useRef(null);
  const prevCollapsed = usePrevious(collapsed);
  const prevCollapseHeight = usePrevious(collapsedHeight);
  const isCollapsedChanged = !prevCollapsed !== collapsed;
  let unmounted = false;

  const transitionToHeight = useCallback(
    (toHeight: number = 0) => {
      // @ts-ignore
      if (_animation.current && _animation.current.stop) {
        // @ts-ignore
        _animation.current.stop();
      }

      setIsAnimating(true);
      // @ts-ignore
      _animation.current = Animated.timing(height, {
        toValue: toHeight,
        duration
      }).start(() => {
        if (unmounted) {
          return;
        }
        setIsAnimating(false);
      });
    },
    [height, unmounted, duration, _animation, setIsAnimating]
  );

  const measureContent = useCallback(
    callback => {
      setIsMeasuring(true);
      setTimeout(() => {
        if (!contentHandle.current) {
          setIsMeasuring(false);
          callback(collapsedHeight);
        } else {
          // @ts-ignore
          contentHandle.current.getNode().measure((x, y, width, height) => {
            setIsMeasuring(false);
            setMeasured(true);
            setContentHeight(height);
            setTimeout(() => callback(height));
          });
        }
      });
    },
    [collapsedHeight, setIsMeasuring, setMeasured, setContentHeight]
  );

  const toggleCollapsed = useCallback(
    (collapsed: boolean) => {
      if (collapsed) {
        transitionToHeight(collapsedHeight);
      } else if (!contentHandle) {
        if (measured) {
          transitionToHeight(contentHeight);
        }
        return;
      } else {
        measureContent(transitionToHeight);
      }
    },
    [transitionToHeight, collapsedHeight, measureContent, measured]
  );

  const onDidUpdate = useCallback(() => {
    if (prevCollapsed !== collapsed) {
      toggleCollapsed(collapsed);
    } else if (collapsed && prevCollapseHeight !== collapsedHeight) {
      height.setValue(collapsedHeight || 0);
    }
  }, [
    toggleCollapsed,
    collapsed,
    height,
    prevCollapsed,
    collapsedHeight,
    prevCollapseHeight
  ]);

  useEffect(() => {
    if (isCollapsedChanged) {
      setMeasured(true);
      onDidUpdate();
    } else {
      onDidUpdate();
    }
    return () => {
      unmounted = true;
    };
  }, [isCollapsedChanged, onDidUpdate, setMeasured]);

  const handleLayoutChange = useCallback(
    ({
      nativeEvent: {
        layout: { height: layoutHeight }
      }
    }) => {
      if (!animating) {
        if (
          animating ||
          collapsed ||
          measuring ||
          contentHeight === layoutHeight
        ) {
          return;
        } else {
          height.setValue(layoutHeight);
          setContentHeight(contentHeight);
        }
      }
    },
    [animating, collapsed, measuring, setContentHeight, contentHeight]
  );

  const style = useMemo(() => {
    const hasKnownHeight = !measuring && (measured || collapsed);
    let style = null;
    if (hasKnownHeight) {
      style = {
        overflow: "hidden",
        height: height
      };
    }
    return style;
  }, [height, measuring, measured, collapsed]);

  const contentStyle = useMemo(() => {
    let style = null;
    if (align === "center" || align === "bottom") {
      style = {
        transform: [
          {
            translateY: height.interpolate({
              inputRange: [0, contentHeight],
              outputRange: [
                align === "center" ? contentHeight / -2 : -contentHeight,
                0
              ]
            })
          }
        ]
      };
    }
    return style;
  }, [height, align]);

  return (
    // @ts-ignore
    <Animated.View style={style} pointerEvents="auto">
      <Animated.View
        // @ts-ignore
        ref={contentHandle}
        style={[
          styleProps,
          styles.collapsebleStyle,
          measuring && styles.mainStyles,
          contentStyle
        ]}
        onLayout={handleLayoutChange}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
};

Collapsible.defaultProps = {
  collapsedHeight: 0,
  duration: 175
};

export default memo(Collapsible);
