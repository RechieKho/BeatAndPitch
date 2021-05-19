import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colorTheme from '../colorTheme';

const TunerNote = ({note, octave, color}) => {
  return (
    <View>
      <Text style={[styles.text, styles.mainText, {color}]}>
        {note}
        <Text style={[styles.smallText, {color}]}> {octave}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  mainText: {
    fontSize: 40,
  },
  smallText: {
    fontSize: 15,
  },
});

export default TunerNote;
