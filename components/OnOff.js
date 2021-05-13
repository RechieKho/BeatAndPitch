import React from 'react';
import {View} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

const OnOff = ({state, setState, baseColor, bgColor, disabled, width}) => (
  <View style={{width}}>
    <SwitchSelector
      options={[
        {label: 'On', value: 0},
        {label: 'Off', value: 1},
      ]}
      initial={state ? 0 : 1}
      onPress={value => {
        switch (value) {
          case 0:
            // switch on
            setState(true);
            break;
          case 1:
            // switch off
            setState(false);
        }
      }}
      hasPadding
      textColor={baseColor}
      backgroundColor={bgColor}
      selectedColor={bgColor}
      buttonColor={baseColor}
      borderColor={baseColor}
      disabled={disabled}
    />
  </View>
);

export default OnOff;
