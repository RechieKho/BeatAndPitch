import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useTone from '../hooks/useTone';
import OnOff from './OnOff';
import Plane from './Plane';
import colorTheme from '../colorTheme';
import globalStyle from '../globalStyle';
import Picker from 'rmc-picker';

const Tone = ({isToneStarted, setIsToneStarted = () => {}, canToneEnable}) => {
  // State
  const [note, setNote] = useState('C4');
  const [play, stop, changeFreq] = useTone();

  // functions
  const gerFrequencyRounded = function (note) {
    let notes = [
      'A',
      'A#',
      'B',
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
    ];
    let octave;
    let keyNumber;

    if (note.length === 3) {
      octave = note.charAt(2);
    } else {
      octave = note.charAt(1);
    }

    keyNumber = notes.indexOf(note.slice(0, -1));

    if (keyNumber < 3) {
      keyNumber = keyNumber + 12 + (octave - 1) * 12 + 1;
    } else {
      keyNumber = keyNumber + (octave - 1) * 12 + 1;
    }

    const freq = 440 * Math.pow(2, (keyNumber - 49) / 12);

    // Return frequency of note, rounded
    return Math.round(freq);
  };
  const getAllNotes = () => {
    const notes = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];
    let list = [];
    for (let octave = 1; octave < 7; octave++) {
      for (let note of notes) {
        let currentNote = `${note}${octave}`;
        list.push(
          <Picker.Item value={currentNote} key={currentNote}>
            {currentNote}
          </Picker.Item>,
        );
      }
    }
    return list;
  };

  // init
  useEffect(() => {
    return () => {
      // stop Tone
      stop();
      setIsToneStarted(false);
    };
  }, []);

  return (
    <Plane backgroundColor={colorTheme.white}>
      <View style={styles.header}>
        <Text
          style={[
            globalStyle.h1,
            {color: canToneEnable ? colorTheme.black : colorTheme.grey},
          ]}>
          Tone Gen
        </Text>
        <OnOff
          state={isToneStarted}
          setState={value => {
            value ? play(gerFrequencyRounded(note)) : stop();
            setIsToneStarted(value);
          }}
          disabled={!canToneEnable}
          baseColor={colorTheme.white}
          bgColor={canToneEnable ? colorTheme.black : colorTheme.grey}
          width={100}></OnOff>
      </View>
      <View style={styles.container}>
        <Picker
          selectedValue={note}
          onValueChange={value => {
            setNote(value);
            changeFreq(gerFrequencyRounded(value));
          }}>
          {getAllNotes()}
        </Picker>
      </View>
      {!isToneStarted && (
        <Text
          style={{color: colorTheme.grey, marginTop: 4, textAlign: 'center'}}>
          Tone Generator is not on.
        </Text>
      )}
    </Plane>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colorTheme.grey,
  },
  container: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
export default Tone;
