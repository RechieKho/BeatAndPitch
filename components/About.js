import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import globalStyle from '../globalStyle';

const About = () => {
  return (
    <View style={globalStyle.body}>
      <ScrollView>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
          Thank you for using this app ✨✨✨
        </Text>
        <Text style={styles.p}>
          This android application is handmade by me, Rechie Kho, (during his
          all time low,) with the help of packages from Github
          (https://github.com/) and npm (https://www.npmjs.com/).
        </Text>
        <Text style={styles.p}>
          These are the packages that makes this application possible:
        </Text>
        <Text style={styles.p}>👉 React Native</Text>
        <Text style={styles.p}>👉 Open JDK</Text>
        <Text style={styles.p}>👉 pitchfinder</Text>
        <Text style={styles.p}>👉 React</Text>
        <Text style={styles.p}>👉 React Native inset-shadow</Text>
        <Text style={styles.p}>👉 React Native gesture handler</Text>
        <Text style={styles.p}>👉 React Native metronome</Text>
        <Text style={styles.p}>👉 React Native popover view</Text>
        <Text style={styles.p}>👉 React Native reanimated</Text>
        <Text style={styles.p}>👉 React Native Recording</Text>
        <Text style={styles.p}>👉 React Native safe area context</Text>
        <Text style={styles.p}>👉 React Native screens</Text>
        <Text style={styles.p}>👉 React Native switch selector</Text>
        <Text style={styles.p}>👉 rmc picker</Text>
        <Text style={styles.p}>👉 React Navigation</Text>
        <Text style={styles.p}>
          **PSS: Sorry I have no time to add the web address, But these packages
          are surely popular enough to find on google, Good luck on finding it
          👍
        </Text>
      </ScrollView>
      <Text style={{textAlign: 'center', padding: 15}}>
        Create with 💖 by Rechie Kho
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  p: {
    marginBottom: 20,
  },
});

export default About;
