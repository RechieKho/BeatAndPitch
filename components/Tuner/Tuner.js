import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TunerMeter from './TunerMeter';
import TunerNote from './TunerNote';
import useTune from '../../hooks/useTune';
import OnOff from '../OnOff';
import Plane from '../Plane';
import colorTheme from '../../colorTheme';
import globalStyle from '../../globalStyle';

const Tuner = ({
  isTunerStarted,
  setIsTunerStarted = () => {},
  canTunerEnable,
}) => {
  // States
  const [_lastNoteName, _setLastNoteName] = useState('');
  const [note, setNote] = useState({
    cents: 0,
    name: 'A',
    octave: 4,
  });
  const [start, stop] = useTune(note => {
    const rangeSize = 3;
    setNote(prevNote => {
      return prevNote.name !== note.name ||
        !(
          note.cents > prevNote.cents - rangeSize &&
          note.cents < prevNote.cents + rangeSize
        )
        ? note
        : prevNote;
    });
  });

  // init
  useEffect(() => {
    return () => {
      // stop Tuner
      stop();
      setIsTunerStarted(false);
    };
  }, []);

  return (
    <View
      style={[
        globalStyle.section,
        {backgroundColor: colorTheme.pink, borderBottomColor: colorTheme.grey},
      ]}>
      <View style={styles.header}>
        <Text
          style={{
            color: canTunerEnable ? colorTheme.white : colorTheme.grey,
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          Tuner
        </Text>
        <OnOff
          state={isTunerStarted}
          setState={value => {
            if (value) {
              start();
            } else {
              stop();
            }
            setIsTunerStarted(value);
          }}
          disabled={!canTunerEnable}
          baseColor={canTunerEnable ? colorTheme.white : colorTheme.grey}
          bgColor={colorTheme.pink}
          width={100}></OnOff>
      </View>
      <View style={styles.container}>
        <TunerMeter
          width={250} // initially 250
          height={30}
          cents={isTunerStarted ? note.cents || 0 : 0}
          backgroundColor={
            canTunerEnable ? colorTheme.white : colorTheme.grey
          }></TunerMeter>
        {isTunerStarted ? (
          <TunerNote
            note={note.name}
            octave={note.octave}
            color={colorTheme.white}></TunerNote>
        ) : (
          <Text
            style={{
              color: canTunerEnable ? colorTheme.white : colorTheme.grey,
            }}>
            Tuner is not on.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colorTheme.white,
  },
  container: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default Tuner;
