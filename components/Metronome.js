import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import OnOff from './OnOff';
import Plane from './Plane';
import colorTheme from '../colorTheme';
import globalStyle from '../globalStyle';
import Ticker from 'react-native-metronome';
import Picker from 'rmc-picker';
import Popover from 'react-native-popover-view';

const Metronome = ({
  isTickerStarted,
  setIsTickerStarted = () => {},
  canTickerEnable,
}) => {
  // State
  const [beat, setBeat] = useState(80);

  // function
  const getAllBeat = (slowest, fastest) => {
    let list = [];
    for (let i = slowest; i <= fastest; i++) {
      list.push(
        <Picker.Item value={i} key={i}>
          {i}
        </Picker.Item>,
      );
    }
    return list;
  };

  return (
    <Popover
      from={
        <TouchableOpacity>
          <View
            style={[
              globalStyle.smallSection,
              {
                borderBottomColor: colorTheme.grey,
                backgroundColor: colorTheme.green,
                borderStartColor: colorTheme.grey,
                borderEndColor: colorTheme.grey,
              },
            ]}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                textAlignVertical: 'center',
                color: canTickerEnable ? colorTheme.white : colorTheme.grey,
              }}>
              Ticker
            </Text>
            <Text
              style={{
                textAlignVertical: 'center',
                color: canTickerEnable ? colorTheme.white : colorTheme.grey,
              }}>
              Beat: {beat}
            </Text>
            <OnOff
              state={isTickerStarted}
              setState={value => {
                value ? Ticker.play(beat) : Ticker.stop();
                setIsTickerStarted(value);
              }}
              disabled={!canTickerEnable}
              baseColor={canTickerEnable ? colorTheme.white : colorTheme.grey}
              bgColor={colorTheme.green}
              width={100}></OnOff>
          </View>
        </TouchableOpacity>
      }>
      <View style={globalStyle.selectionBox}>
        <Picker
          selectedValue={beat.toString()}
          onValueChange={value => {
            setBeat(parseInt(value));
            if (isTickerStarted) Ticker.play(parseInt(value));
          }}>
          {getAllBeat(40, 200)}
        </Picker>
      </View>
    </Popover>
  );
};

export default Metronome;
