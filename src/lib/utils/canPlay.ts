export const canPlayAudio = () => {
  const AudioContext = window.AudioContext;
  if (AudioContext) {
    const audioContext = new AudioContext();
    return audioContext.state === 'running';
  }
  return false;
};
