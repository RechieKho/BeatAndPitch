import React, {useState} from 'react';
import {View, PermissionsAndroid, TouchableOpacity, Text} from 'react-native';
import globalStyle from '../globalStyle';
import {useEffect} from 'react';
import colorTheme from '../colorTheme';
import Tuner from './Tuner/Tuner';
import Tone from './Tone';
import Metronome from './Metronome';

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
      {isPermissionDone && (
        <Tuner
          isTunerStarted={isTunerStarted}
          setIsTunerStarted={setIsTunerStarted}
          canTunerEnable={canTunerEnable()}></Tuner>
      )}
      <Tone
        navigation={navigation}
        isToneStarted={isToneStarted}
        setIsToneStarted={setIsToneStarted}
        canToneEnable={canToneEnable()}
      />
      <Metronome
        isTickerStarted={isTickerStarted}
        setIsTickerStarted={setIsTickerStarted}
        canTickerEnable={canTickerEnable()}
      />
      {/* About */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('About');
        }}>
        <View
          style={[
            globalStyle.smallSection,
            {
              backgroundColor: colorTheme.yellow,
              borderBottomColor: colorTheme.grey,
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
            About
          </Text>
          <Text style={{textAlignVertical: 'center'}}>Go To About &gt;</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
