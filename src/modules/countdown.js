export function initCountdown() {
  // Target Date: September 4, 2026, 10:00:00 AM IST (UTC+05:30)
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

  // Calendar Action Handlers
  const calBtn = document.getElementById('add-calendar-btn');
  if (calBtn) {
    calBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openGoogleCalendar();
    });
  }

  const waBtn = document.getElementById('share-wa-btn');
  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      shareWhatsApp();
    });
  }
}

function openGoogleCalendar() {
  const title = encodeURIComponent('Durgaprasad & Nookaratnam Holy Wedding Celebration');
  const details = encodeURIComponent('Join us for the Holy Matrimony of Durgaprasad & Nookaratnam at Uppada Nayakar Colony - 2. Officiated by Pastor Eripilli John Garu.');
  const location = encodeURIComponent('Uppada Nayakar Colony - 2, Uppada, Andhra Pradesh, India');
  const startDate = '20260904T043000Z'; // 10:00 AM IST in UTC
  const endDate = '20260904T093000Z';

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  window.open(googleUrl, '_blank');
}

function shareWhatsApp() {
  const text = encodeURIComponent(
    '🌸 *Durgaprasad ❤️ Nookaratnam Wedding Invitation* 🌸\n\n' +
    'Together with our families, we joyfully invite you to celebrate our Holy Matrimony!\n\n' +
    '📅 *Date:* Friday, 4th September 2026 @ 10:00 AM\n' +
    '📍 *Venue:* Uppada Nayakar Colony - 2, Uppada\n\n' +
    'Please open our interactive wedding invitation for full details, location map & scratch card reveal! ✨'
  );
  window.open(`https://wa.me/?text=${text}`, '_blank');
}
