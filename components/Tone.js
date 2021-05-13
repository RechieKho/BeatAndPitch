import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import useTone from '../hooks/useTone';
import OnOff from './OnOff';
import colorTheme from '../colorTheme';
import Popover from 'react-native-popover-view';
import Picker from 'rmc-picker';
import globalStyle from '../globalStyle';

const Tone = ({
  navigation,
  isToneStarted,
  setIsToneStarted = () => {},
  canToneEnable,
}) => {
  // State
  const [note, setNote] = useState('C4');
  const [play, stop, changeFreq] = useTone();

  // functions
  const getFrequencyRounded = function (note) {
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
        list.push(
          <Picker.Item value={note + octave} key={`${note + octave}-note`}>
            {note + octave}
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
    <Popover
      from={
        <TouchableOpacity>
          <View
            style={[
              globalStyle.smallSection,
              {
                borderBottomColor: colorTheme.grey,
                backgroundColor: colorTheme.white,
                borderStartColor: colorTheme.grey,
                borderEndColor: colorTheme.grey,
              },
            ]}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                textAlignVertical: 'center',
              }}>
              Tone Gen
            </Text>
            <Text style={{textAlignVertical: 'center'}}>Note: {note}</Text>
            <OnOff
              state={isToneStarted}
              setState={value => {
                value ? play(getFrequencyRounded(note)) : stop();
                setIsToneStarted(value);
              }}
              disabled={!canToneEnable}
              baseColor={canToneEnable ? colorTheme.white : colorTheme.grey}
              bgColor={colorTheme.black}
              width={100}></OnOff>
          </View>
        </TouchableOpacity>
      }>
      <View style={globalStyle.selectionBox}>
        <Picker
          selectedValue={note}
          onValueChange={value => {
            setNote(value);
            changeFreq(getFrequencyRounded(value));
          }}>
          {getAllNotes()}
        </Picker>
      </View>
    </Popover>
  );
};

export default Tone;
