import React, {useState} from 'react';
import {View, ScrollView, PermissionsAndroid} from 'react-native';
import globalStyle from '../globalStyle';
import {useEffect} from 'react';
import Tuner from './Tuner/Tuner';
import Tone from './Tone';

const Main = ({navigation}) => {
  const [isPermissionDone, setIsPermissionDone] = useState(false);
  const [isTickerStarted, setIsTickerStarted] = useState(false);
  const [isTunerStarted, setIsTunerStarted] = useState(false);
  const [isToneStarted, setIsToneStarted] = useState(false);

  // functions
  const canTickerEnable = () => !isTunerStarted;
  const canTunerEnable = () => !isTickerStarted && !isToneStarted;
  const canToneEnable = () => !isTunerStarted;

  // Get Permission
  useEffect(async () => {
    // get Permission
    const getPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
        } catch (error) {
          throw new Error(error.message);
        }
      }
    };
    try {
      await getPermission();
    } catch (error) {
      Alert.alert(
        'OOPS!!',
        error.message,
        [
          {
            text: 'okay',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
    setIsPermissionDone(true);
  }, []);

  return (
    <View style={globalStyle.body}>
      <ScrollView style={{flex: 1}}>
        {isPermissionDone && (
          <Tuner
            isTunerStarted={isTunerStarted}
            setIsTunerStarted={setIsTunerStarted}
            canTunerEnable={canTunerEnable()}></Tuner>
        )}
        <Tone
          isToneStarted={isToneStarted}
          setIsToneStarted={setIsToneStarted}
          canToneEnable={canToneEnable()}
        />
      </ScrollView>
    </View>
  );
};

export default Main;
