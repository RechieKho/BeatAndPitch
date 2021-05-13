import {NativeModules} from 'react-native';
const {ToneGen} = NativeModules;

/**
 *
 * @param {Number} frequency
 * @returns {[(Number)=>void, ()=>void, (Number)=>void]}
 */
const useTone = () => {
  return [
    ToneGen.play,
    ToneGen.stop,
    ToneGen.changeFrequency,
    ToneGen.isPlaying,
  ];
};

export default useTone;
