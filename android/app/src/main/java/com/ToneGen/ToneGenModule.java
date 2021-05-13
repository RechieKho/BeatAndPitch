package com.ToneGen;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.os.Build;

import androidx.annotation.RequiresApi;

public class ToneGenModule extends ReactContextBaseJavaModule {

    // subclass
    private static class Sound{
        // Defaults
        private final int sampleRate = 8000;
        private int numOfSamples = 8000;
        private float frequency = 440;
        private byte[] sound;

        public Sound(){
            this.sound = generateSound(this.numOfSamples, this.sampleRate, this.frequency);
        }

        public Sound(float frequency){
            setFrequency(frequency);
        }

        public void setFrequency(float frequency) {
            this.frequency = frequency;
            updateNumOfSample();
            this.sound = generateSound(this.numOfSamples, this.sampleRate, this.frequency);
        }

        public int getEndOfFrame(){return this.sound.length/4;}

        private byte[] generateSound(int numOfSamples, int sampleRate, float frequency){
            double[] sample = new double[numOfSamples];
            // fill the sample
            for (int i = 0; i < numOfSamples; ++i){
                sample[i] = Math.sin(2 * Math.PI * i / (sampleRate/frequency)); // create sample wave
            }

            // convert to 16 bit pcm sound array
            // assumes the sample buffer is normalised.
            int idx = 0;
            byte[] generatedSnd = new byte[numOfSamples*2];
            for (final double dVal : sample) {
                // scale to maximum amplitude
                final short val = (short) ((dVal * 32767));
                // in 16 bit wav PCM, first byte is the low order byte
                generatedSnd[idx++] = (byte) (val & 0x00ff);
                generatedSnd[idx++] = (byte) ((val & 0xff00) >>> 8);
            }
            return generatedSnd;
        }

        private void updateNumOfSample(){
            // we need to know sample per wave
            float samplePerWave = (this.sampleRate/this.frequency);
            // we need to get number of sample in 1000 ms
            float minimumSample = this.sampleRate;
            // minimum wave needed
            float minimumWave = minimumSample/samplePerWave;
            // turn minimum wave into an int
            int numOfWave = (int) Math.ceil(minimumWave);
            this.numOfSamples = Math.round(numOfWave * samplePerWave);
        }
    }


    // variable
    private final ReactApplicationContext reactContext;
    private AudioTrack audioTrack;
    private boolean isPlaying = false;
    private Sound sound;



    public ToneGenModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        // module name
        return "ToneGen";
    }

    // private method
    @ReactMethod
    private void play(float frequency){
        if(isPlaying) return;
        if(sound == null) sound = new Sound();
        if(audioTrack == null) audioTrack = new AudioTrack(
                AudioManager.STREAM_MUSIC,
                sound.sampleRate,
                AudioFormat.CHANNEL_OUT_MONO,
                AudioFormat.ENCODING_PCM_16BIT,
                sound.getEndOfFrame()*8, // later try * 2
                AudioTrack.MODE_STATIC
        );

        sound.setFrequency(frequency);
        audioTrack.write(sound.sound, 0, sound.numOfSamples);
        audioTrack.setLoopPoints(0, sound.getEndOfFrame(), -1); // each frame have 4 byte
        audioTrack.play();
        isPlaying = true;
    }

    @ReactMethod
    private void changeFrequency(float frequency){
        if(!isPlaying) return;
        sound.setFrequency(frequency);
        audioTrack.write(sound.sound, 0, sound.numOfSamples);
        audioTrack.setLoopPoints(0, sound.getEndOfFrame(), -1); // each frame have 4 byte
        audioTrack.play();
    }

    @ReactMethod
    private void stop(){
        if(!isPlaying) return;
        audioTrack.stop();
        isPlaying = false;
    }

    @ReactMethod
    public boolean isPlaying() {
        return isPlaying;
    }
}