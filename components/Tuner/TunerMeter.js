import React, {PureComponent} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import InsectShadow from 'react-native-inset-shadow';

const TunerMeter = ({
  cents,
  width,
  height,
  backgroundColor,
  borderRadius = 4,
}) => {
  const [displayCents] = useState(new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.timing(displayCents, {
      toValue: cents,
      duration: 500,
      useNativeDriver: true,
    });
    animation.start();

    return () => {
      animation.stop();
    };
  });

  const pointerMotion = {
    transform: [
      {
        translateX: displayCents.interpolate({
          inputRange: [-50, 50],
          outputRange: [0, width - 1],
        }),
      },
    ],
  };

  return (
    <View style={{width, height, backgroundColor, borderRadius}}>
      <InsectShadow shadowRadius={10} shadowOpacity={0.8}>
        <View style={{flex: 1}}>
          <View style={styles.meter}>
            <View style={[styles.scale, styles.strong]}></View>
            <View style={styles.scale}></View>
            <View style={styles.scale}></View>
            <View style={styles.scale}></View>
            <View style={styles.scale}></View>
            <View style={[styles.scale, styles.strong]}></View>
            <View style={styles.scale}></View>
            <View style={styles.scale}></View>
            <View style={styles.scale}></View>
            <View style={styles.scale}></View>
            <View style={[styles.scale, styles.strong]}></View>
          </View>
          <Animated.View
            style={[styles.scale, styles.pointerBase, pointerMotion]}
          />
        </View>
      </InsectShadow>
    </View>
  );
};

const styles = StyleSheet.create({
  scale: {
    width: 1,
    height: '20%',
    backgroundColor: 'black',
  },
  strong: {
    width: 3,
    height: '30%',
  },
  pointerBase: {
    height: '70%',
    position: 'absolute',
    bottom: 0,
  },
  meter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default React.memo(TunerMeter);
