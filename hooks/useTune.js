import Recording from 'react-native-recording';
import PitchFinder from 'pitchfinder';
import React, {useState} from 'react';

const useTune = (
  onNoteDetected = () => {},
  sampleRate = 22050,
  bufferSize = 2048,
) => {
  // variables
  const [listenerSub, setListenerSub] = useState(null);

  // functions
  const isStarted = () => listenerSub !== null;

  const start = () => {
    // variable
    const middleA = 440;
    const semitone = 69;
    const noteStrings = [
      'C',
      'C♯',
      'D',
      'D♯',
      'E',
      'F',
      'F♯',
      'G',
      'G♯',
      'A',
      'A♯',
      'B',
    ];

    // function
    const getNote = frequency => {
      const note = 12 * (Math.log(frequency / middleA) / Math.log(2));
      return Math.round(note) + semitone;
    };

    const getCents = (frequency, note) => {
      // function
      const getStandardFrequency = note => {
        return middleA * Math.pow(2, (note - semitone) / 12);
      };
      return Math.floor(
        (1200 * Math.log(frequency / getStandardFrequency(note))) / Math.log(2),
      );
    };

    // init microphone
    Recording.init({
      sampleRate: sampleRate,
      bufferSize: bufferSize,
    });
    Recording.start();

    // add listener
    const listenerSubscription = Recording.addRecordingEventListener(data => {
      const pitchFinder = new PitchFinder.YIN({sampleRate});
      const frequency = pitchFinder(data);
      if (frequency && onNoteDetected) {
        const note = getNote(frequency);
        onNoteDetected({
          name: noteStrings[note % 12],
          value: note,
          cents: getCents(frequency, note),
          octave: parseInt(note / 12) - 1,
          frequency: frequency,
        });
      }
    });

    setListenerSub(listenerSubscription);
  };

  const stop = () => {
    if (!isStarted()) return;
    listenerSub.remove();
    Recording.stop();
    setListenerSub(null);
  };

  return [start, stop, isStarted];
};

export default useTune;
