import {View, StyleSheet} from 'react-native';
import React from 'react';

const Plane = ({backgroundColor = '#ffffff', children}) => {
  var LightenColor = function (color, percent) {
    var num = parseInt(color, 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00ff) + amt,
      G = (num & 0x0000ff) + amt;

    return (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1);
  };

  const colorStyle = {
    backgroundColor,
    borderColor: '#' + LightenColor(backgroundColor, 50),
  };

  return <View style={[styles.plane, colorStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  plane: {
    marginBottom: 15,
    padding: 12,
    minHeight: 200,
    borderRadius: 15,
    borderEndWidth: 0.1,
    borderStartWidth: 0.1,
    borderBottomWidth: 5,
  },
});

export default Plane;
