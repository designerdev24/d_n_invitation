let audioCtx = null;
let isPlaying = false;
let ambientInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 1.2);
    });
  } catch (e) {
    console.warn('Audio playback not allowed yet:', e);
  }
}

// Gentle Ambient Indian Pentatonic Melody Synthesizer (Raag Mohanam / Bhupali vibe)
const pentatonicNotes = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25];

function playAmbientNote() {
  if (!isPlaying) return;
  try {
    const ctx = getAudioContext();
    const freq = pentatonicNotes[Math.floor(Math.random() * pentatonicNotes.length)];
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.5);
  } catch (e) {
    console.warn('Audio synth error:', e);
  }
}

export function toggleAudio() {
  const btn = document.getElementById('music-toggle-btn');
  const wave = document.getElementById('audio-waves');

  if (isPlaying) {
    isPlaying = false;
    if (ambientInterval) clearInterval(ambientInterval);
    if (btn) btn.classList.remove('active');
    if (wave) wave.style.display = 'none';
  } else {
    isPlaying = true;
    getAudioContext();
    playAmbientNote();
    ambientInterval = setInterval(playAmbientNote, 900);
    if (btn) btn.classList.add('active');
    if (wave) wave.style.display = 'flex';
  }
  return isPlaying;
}

export function initAudioPlayer() {
  const btn = document.getElementById('music-toggle-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      toggleAudio();
    });
  }

  // First user interaction auto-starts subtle ambient music if user consents
  const handleFirstInteraction = () => {
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
  };

  window.addEventListener('click', handleFirstInteraction);
  window.addEventListener('touchstart', handleFirstInteraction);
}
