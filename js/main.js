(function () {
  'use strict';

  // --- 1. TRANSLATION DICTIONARY & I18N ---
  const translations = {
    en: {
      invitation_header: "Ramisetti Family's Holy Wedding Invitation",
      hero_sub: "Together with our families",
      hero_invite: "We joyfully invite you to celebrate the holy matrimony of",
      groom_name: "Chi. Durgaprasad",
      bride_name: "Chi. Sou. Nookaratnam",
      groom_title: "The Groom",
      bride_title: "The Bride",
      groom_parents: "Son of Sri Ramisetti Venkataramana & Srimathi Nookaramma",
      bride_parents: "First daughter of Sri Bade Veerababu & Srimathi Bujji (Pagadalapeta, Kakinada)",
      scripture_quote: "“Marriage is honorable in all things”",
      scripture_ref: "— HEBREWS 13:4",
      scratch_tag: "Interactive Reveal",
      scratch_title: "🎉 Scratch to Reveal Wedding Details 🎉",
      scratch_instr: "✨ Use your finger or mouse to scratch the foil surface below ✨",
      scratch_revealed_badge: "Holy Matrimony Muhurtham",
      scratch_revealed_date: "Friday, 4th Sept 2026",
      scratch_revealed_time: "Morning 10:00 AM IST",
      scratch_revealed_venue: "📍 Uppada Nayakar Colony - 2, At Residence",
      scratch_progress_label: "Scratch completion:",
      countdown_title: "Counting Every Moment",
      days: "Days",
      hours: "Hours",
      mins: "Minutes",
      secs: "Seconds",
      add_calendar: "📅 Add to Calendar",
      whatsapp_share: "💬 Share on WhatsApp",
      get_directions: "🗺️ Get Directions",
      events_title: "Holy Matrimony & Functions",
      muhurtham_title: "Holy Matrimony (వివాహ సమయం)",
      muhurtham_time: "Friday, 04-09-2026 @ 10:00 AM",
      muhurtham_desc: "The sacred union under prayer and God's blessings.",
      officiant_label: "Officiating Pastor:",
      officiant_name: "Pastor Eripilli John Garu (Bethesda Prayer Hall, Uppada)",
      feast_title: "Grand Feast (విందు)",
      feast_time: "Friday, 04-09-2026 @ 12:00 PM Onwards",
      feast_desc: "Join us for a delicious wedding lunch at our residence.",
      blessings_title: "Best Wishes & Blessings",
      best_wishes_from: "With warm wishes from relatives & well-wishers:",
      relatives_list: [
        "Dangeti Jagadeesh & Srimathi Suvarnabhanu",
        "Ramisetti Apparao (Late) & Srimathi Lakshmi",
        "Ramisetti Jagannatham & Srimathi Bangaramma",
        "Ramisetti Appalaraju & Srimathi Bujji"
      ],
      inviters_title: "Welcoming You With Love:",
      inviters_names: "Sri Ramisetti Venkataramana & Srimathi Nookaramma",
      gallery_title: "Our Moments & Gallery",
      venue_title: "Wedding Venue Location",
      venue_name: "Uppada Nayakar Colony - 2, Uppada",
      venue_desc: "At Residence (మా స్వగృహము నందు), Uppada, Kakinada District, AP.",
      open_maps: "Open in Google Maps",
      rsvp_title: "Will You Join Us?",
      rsvp_sub: "Please send your wishes and confirm your attendance",
      name_label: "Your Full Name",
      name_ph: "Enter your name",
      attendance_label: "Will you attend?",
      attending_yes: "Yes, I will attend with joy!",
      attending_family: "Attending with Family",
      attending_no: "Sending blessings from afar",
      guests_label: "Number of Guests",
      message_label: "Your Blessings / Message to the Couple",
      message_ph: "Write your heartfelt wedding message...",
      send_rsvp: "Submit Blessing & RSVP",
      wishes_wall_title: "Guestbook & Sent Blessings",
      footer_text: "Made with ❤️ for Durgaprasad & Nookaratnam Wedding"
    },
    te: {
      invitation_header: "రామిశెట్టి వారి పరిశుద్ధ వివాహ ఆహ్వానము",
      hero_sub: "మా కుటుంబ సభ్యుల సమక్షంలో",
      hero_invite: "నూతన వధూవరుల పరిశుద్ధ వివాహ మహోత్సవమునకు మిమ్మును ప్రేమతో ఆహ్వానించుచున్నాము",
      groom_name: "చి|| దుర్గాప్రసాద్",
      bride_name: "చి|| సౌ|| నూకరత్నం",
      groom_title: "వరూడు",
      bride_title: "వధువు",
      groom_parents: "శ్రీ రామిశెట్టి వెంకటరమణ, శ్రీమతి నూకరమ్మ దంపతుల కనిష్ఠ కుమారుడు",
      bride_parents: "కాకినాడ పగడాలపేట వాస్తవ్యులు శ్రీ బడే వీరబాబు, శ్రీమతి బుజ్జి దంపతుల ప్రథమ కుమార్తె",
      scripture_quote: "“వివాహము అన్ని విషయములోనూ ఘనమైనది”",
      scripture_ref: "— హెబ్రీ : 13:4",
      scratch_tag: "ఆహ్వాన రహస్యం",
      scratch_title: "🎉 వివాహ సమయం తెలుసుకోవడానికి స్క్రాచ్ చేయండి 🎉",
      scratch_instr: "✨ మీ వేలితో లేదా మౌస్‌తో కింద ఉన్న బంగారు పొరను స్క్రాచ్ చేయండి ✨",
      scratch_revealed_badge: "పరిశుద్ధ వివాహ ముహూర్తం",
      scratch_revealed_date: "ది. 04-09-2026 శుక్రవారం",
      scratch_revealed_time: "ఉదయం 10:00 గంటలకు",
      scratch_revealed_venue: "📍 ఉప్పాడ నాయకర్ కాలనీ - 2, మా స్వగృహము నందు",
      scratch_progress_label: "స్క్రాచ్ పూర్తయింది:",
      countdown_title: "వివాహ సమయానికి కౌంట్‌డౌన్",
      days: "రోజులు",
      hours: "గంటలు",
      mins: "నిమిషాలు",
      secs: "సెకన్లు",
      add_calendar: "📅 క్యాలెండర్‌లో జోడించండి",
      whatsapp_share: "💬 వాట్సాప్‌లో షేర్ చేయండి",
      get_directions: "🗺️ దారి తెలుసుకోండి",
      events_title: "వివాహ కార్యక్రమాలు",
      muhurtham_title: "వివాహ సమయం (Holy Matrimony)",
      muhurtham_time: "ది. 04-09-2026 శుక్రవారం ఉదయం 10-00 గంటలకు",
      muhurtham_desc: "దేవుని వాక్యం ద్వారా, ప్రార్థన ద్వారా ఒక్కటవుతున్న నూతన వధూవరుల వివాహ మహోత్సవం.",
      officiant_label: "వివాహ కర్త:",
      officiant_name: "పాస్టర్. ఎరిపిల్లి జాన్ గారు, సంఘకాపరి (బెత్సెస్ద ప్రార్థన మందిరం ఉప్పాడ)",
      feast_title: "విందు (Grand Feast)",
      feast_time: "ది. 04-09-2026 శుక్రవారం మధ్యాహ్నం 12-00 గంటల నుండి",
      feast_desc: "మా స్వగృహము నందు ఏర్పాటు చేసిన భోజన విందులో పాల్గొనవలసిందిగా కోరుచున్నాము.",
      blessings_title: "బంధుమిత్రుల అభినందనలు",
      best_wishes_from: "అభినందనలతో ఆశీర్వదించువారు:",
      relatives_list: [
        "దంగేటి జగదీష్, శ్రీమతి సువర్ణభాను",
        "రామిశెట్టి అప్పారావు (లేటు), శ్రీమతి లక్ష్మి",
        "రామిశెట్టి జగన్నాథం, శ్రీమతి బంగారమ్మ",
        "రామిశెట్టి అప్పలరాజు, శ్రీమతి బుజ్జి"
      ],
      inviters_title: "మీ రాకను ప్రేమతో ఆహ్వానించువారు:",
      inviters_names: "శ్రీ రామిశెట్టి వెంకటరమణ, శ్రీమతి నూకరమ్మ",
      gallery_title: "మధుర జ్ఞాపకాలు & గ్యాలరీ",
      venue_title: "వివాహ వేదిక",
      venue_name: "ఉప్పాడ నాయకర్ కాలనీ - 2",
      venue_desc: "మా స్వగృహము నందు, ఉప్పాడ, కాకినాడ జిల్లా.",
      open_maps: "గూగుల్ మ్యాప్స్‌లో చూడండి",
      rsvp_title: "మీరు విచ్చేస్తున్నారా?",
      rsvp_sub: "మీ ఆశీర్వాదాలను తెలియజేసి రాకను ధృవీకరించండి",
      name_label: "మీ పేరు",
      name_ph: "మీ పూర్తి పేరు నమోదు చేయండి",
      attendance_label: "హాజరవుతున్నారా?",
      attending_yes: "తప్పకుండా విచ్చేస్తున్నాము!",
      attending_family: "కుటుంబసమేతంగా హాజరవుతున్నాము",
      attending_no: "దూరం నుండి ఆశీర్వచనములు తెలియజేస్తున్నాము",
      guests_label: "అతిథుల సంఖ్య",
      message_label: "వధూవరులకు మీ శుభాకాంక్షలు",
      message_ph: "మీ మనస్ఫూర్తి ఆశీర్వాదాలు వ్రాయండి...",
      send_rsvp: "శుభాకాంక్షలు సమర్పించండి",
      wishes_wall_title: "అతిథుల ఆశీర్వచనములు",
      footer_text: "దుర్గాప్రసాద్ & నూకరత్నముల వివాహం కొరకు ప్రేమతో తయారు చేయబడింది ❤️"
    }
  };

  let currentLang = 'en';

  function updateDOMTexts() {
    const dict = translations[currentLang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (key === 'relatives_list' && Array.isArray(dict[key])) {
          el.innerHTML = dict[key].map(name => `<li>✨ ${name}</li>`).join('');
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.textContent = currentLang === 'en' ? 'తెలుగు' : 'English';
    }
  }

  // --- 2. AUDIO SYNTHESIZER ---
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

  function playChimeSound() {
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
      console.warn('Audio note error:', e);
    }
  }

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
    } catch (e) {}
  }

  function toggleAudio() {
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
  }

  // --- 3. PETALS & SPARKS CANVAS ---
  function initCanvasPetals() {
    const canvas = document.getElementById('petal-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Petal {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = Math.random() * 10 + 8;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.03;
        this.color = Math.random() > 0.4 ? '#e84393' : '#d63031';
        this.opacity = Math.random() * 0.6 + 0.3;
      }
      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * 0.8 + this.speedX;
        this.angle += this.spin;
        if (this.y > height + 20) this.reset();
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
        ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    class GoldSpark {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 0.5 + 0.2);
        this.opacity = Math.random() * 0.8 + 0.2;
        this.pulse = Math.random() * 0.02 + 0.01;
      }
      update() {
        this.y += this.speedY;
        this.opacity += Math.sin(Date.now() * 0.003) * this.pulse;
        if (this.y < -10) {
          this.reset();
          this.y = height + 10;
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, this.opacity));
        ctx.fillStyle = '#f3ce70';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffe599';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const petals = Array.from({ length: 30 }, () => new Petal());
    const sparks = Array.from({ length: 45 }, () => new GoldSpark());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      sparks.forEach(s => { s.update(); s.draw(); });
      petals.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- 4. SCRATCH CARD CANVAS ENGINE ---
  function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    let isScratching = false;
    let isRevealed = false;

    function resizeCanvas() {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (!isRevealed) drawFoil();
    }

    function drawFoil() {
      const w = canvas.width;
      const h = canvas.height;
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#e6be53');
      grad.addColorStop(0.3, '#fff3ca');
      grad.addColorStop(0.5, '#b38b22');
      grad.addColorStop(0.8, '#f3c752');
      grad.addColorStop(1, '#85610d');

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      for (let i = 0; i < 60; i++) {
        const rx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
        const ry = (Math.cos(i * 33) * 0.5 + 0.5) * h;
        ctx.beginPath();
        ctx.arc(rx, ry, Math.random() * 3 + 1, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, w - 6, h - 6);

      ctx.fillStyle = '#12060c';
      ctx.font = 'bold 18px Cinzel, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ SCRATCH HERE ✨', w / 2, h / 2 - 12);

      ctx.font = '13px Outfit, sans-serif';
      ctx.fillStyle = '#3d2508';
      ctx.fillText('Scratch to unveil the wedding date', w / 2, h / 2 + 16);
    }

    function getScratchPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function scratch(pos) {
      if (isRevealed) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 26, 0, Math.PI * 2);
      ctx.fill();
      checkProgress();
    }

    function checkProgress() {
      if (isRevealed) return;
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let transparentCount = 0;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) transparentCount++;
      }

      const totalSamples = pixels.length / 16;
      const percent = Math.round((transparentCount / totalSamples) * 100);

      const progressEl = document.getElementById('scratch-percent');
      if (progressEl) progressEl.textContent = `${percent}%`;

      if (percent >= 45) triggerReveal();
    }

    function triggerReveal() {
      isRevealed = true;
      canvas.style.transition = 'opacity 0.8s ease';
      canvas.style.opacity = '0';
      setTimeout(() => { canvas.style.display = 'none'; }, 800);

      playChimeSound();
      if (window.confetti) {
        window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }

      const progressEl = document.getElementById('scratch-percent');
      if (progressEl) progressEl.textContent = '100% Unveiled! 🎉';
    }

    canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(getScratchPos(e)); });
    canvas.addEventListener('mousemove', (e) => { if (isScratching) scratch(getScratchPos(e)); });
    window.addEventListener('mouseup', () => { isScratching = false; });

    canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(getScratchPos(e)); }, { passive: true });
    canvas.addEventListener('touchmove', (e) => { if (isScratching) scratch(getScratchPos(e)); }, { passive: true });
    window.addEventListener('touchend', () => { isScratching = false; });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  // --- 5. COUNTDOWN TIMER ---
  function initCountdown() {
    const targetDate = new Date('2026-09-04T10:00:00+05:30').getTime();

    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');

    function updateTimer() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    const calBtn = document.getElementById('add-calendar-btn');
    if (calBtn) {
      calBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = encodeURIComponent('Durgaprasad & Nookaratnam Holy Wedding Celebration');
        const details = encodeURIComponent('Join us for the Holy Matrimony of Durgaprasad & Nookaratnam at Uppada Nayakar Colony - 2.');
        const location = encodeURIComponent('Uppada Nayakar Colony - 2, Uppada, Andhra Pradesh, India');
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260904T043000Z/20260904T093000Z&details=${details}&location=${location}`;
        window.open(googleUrl, '_blank');
      });
    }

    const waBtn = document.getElementById('share-wa-btn');
    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const text = encodeURIComponent(
          '🌸 *Durgaprasad ❤️ Nookaratnam Wedding Invitation* 🌸\n\n' +
          'Together with our families, we joyfully invite you to celebrate our Holy Matrimony!\n\n' +
          '📅 *Date:* Friday, 4th September 2026 @ 10:00 AM\n' +
          '📍 *Venue:* Uppada Nayakar Colony - 2, Uppada\n\n' +
          'Please open our wedding invitation website for full details & scratch card reveal! ✨'
        );
        window.open(`https://wa.me/?text=${text}`, '_blank');
      });
    }
  }

  // --- 6. RSVP & WISHES WALL ---
  const STORAGE_KEY = 'dp_nk_wedding_wishes_v2';
  const initialWishes = [
    { name: 'Dangeti Jagadeesh & Suvarnabhanu', message: 'Wishing Durgaprasad and Nookaratnam a lifetime of love, joy, and divine blessings!', time: '2 hours ago' },
    { name: 'Pastor Eripilli John Garu', message: 'May God abundantly bless your marriage and guide your steps together as one.', time: '1 day ago' },
    { name: 'Bade Veerababu & Bujji Family', message: 'Heartfelt congratulations to our dear Nookaratnam & Durgaprasad on your sacred union!', time: '2 days ago' }
  ];

  function initRSVP() {
    const form = document.getElementById('rsvp-form');
    const wishesWall = document.getElementById('wishes-wall');

    function getWishes() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : initialWishes;
      } catch (e) {
        return initialWishes;
      }
    }

    function renderWishes() {
      if (!wishesWall) return;
      const list = getWishes();
      wishesWall.innerHTML = list.map(item => `
        <div class="wish-card">
          <div class="wish-author">${escapeHtml(item.name)}</div>
          <div class="wish-text">${escapeHtml(item.message)}</div>
          <div class="wish-time">${escapeHtml(item.time || 'Just now')}</div>
        </div>
      `).join('');
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('guest-name')?.value.trim();
        const attendance = document.getElementById('guest-attendance')?.value;
        const message = document.getElementById('guest-message')?.value.trim();

        if (!name || !message) {
          alert('Please provide your name and a blessing message!');
          return;
        }

        const list = getWishes();
        list.unshift({ name: `${name} (${attendance})`, message: message, time: 'Just now' });
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}

        renderWishes();
        playChimeSound();

        form.reset();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const orig = submitBtn.textContent;
          submitBtn.textContent = '✨ Blessing Sent! Thank You! ✨';
          submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
          setTimeout(() => { submitBtn.textContent = orig; submitBtn.style.background = ''; }, 3500);
        }
      });
    }

    renderWishes();
  }

  function escapeHtml(str) {
    return str ? str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[m]) : '';
  }

  // --- 7. GALLERY LIGHTBOX ---
  function initGallery() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('modal-close');

    if (!modal || !modalImg) return;

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          modalImg.src = img.src;
          modal.classList.add('active');
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) modal.classList.remove('active'); });
  }

  // --- INITIALIZATION ON DOM CONTENT LOADED ---
  document.addEventListener('DOMContentLoaded', () => {
    initCanvasPetals();
    initScratchCard();
    initCountdown();
    initRSVP();
    initGallery();

    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) {
      musicBtn.addEventListener('click', toggleAudio);
    }

    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'te' : 'en';
        updateDOMTexts();
      });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.section').forEach(s => observer.observe(s));
  });

})();
