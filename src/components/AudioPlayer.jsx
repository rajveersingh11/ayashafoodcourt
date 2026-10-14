import React, { useEffect, useRef } from 'react';

export default function AudioPlayer({ isPlaying, onToggle }) {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioContext();
          audioCtxRef.current = ctx;

          // White noise buffer for gentle kitchen sizzle
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          // Bandpass filter to shape noise like mild simmering ghee
          const bandpass = ctx.createBiquadFilter();
          bandpass.type = 'bandpass';
          bandpass.frequency.value = 1800;
          bandpass.Q.value = 3.0;

          // Gentle gain node
          const gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
          gainNodeRef.current = gainNode;

          whiteNoise.connect(bandpass);
          bandpass.connect(gainNode);
          gainNode.connect(ctx.destination);

          whiteNoise.start(0);
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      } catch (e) {
        console.warn('AudioContext not allowed yet:', e);
      }
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
    }

    return () => {
      // cleanup on unmount
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [isPlaying]);

  return null; // Headless audio component
}
