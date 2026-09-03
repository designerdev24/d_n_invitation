import { playChimeSound } from './audioPlayer.js';

const STORAGE_KEY = 'dp_nk_wedding_wishes_v1';

const initialWishes = [
  {
    name: 'Dangeti Jagadeesh & Suvarnabhanu',
    message: 'Wishing Durgaprasad and Nookaratnam a lifetime of love, joy, and divine blessings!',
    time: '2 hours ago'
  },
  {
    name: 'Pastor Eripilli John Garu',
    message: 'May God abundantly bless your marriage and guide your steps together as one.',
    time: '1 day ago'
  },
  {
    name: 'Bade Veerababu & Bujji Family',
    message: ' Heartfelt congratulations to our dear Nookaratnam & Durgaprasad on your sacred union!',
    time: '2 days ago'
  }
];

export function initRSVP() {
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

  function saveWish(newWish) {
    const list = getWishes();
    list.unshift(newWish);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('LocalStorage error:', e);
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
      const guests = document.getElementById('guest-count')?.value || '1';
      const message = document.getElementById('guest-message')?.value.trim();

      if (!name || !message) {
        alert('Please provide your name and a blessing message!');
        return;
      }

      const wishObj = {
        name: `${name} (${attendance})`,
        message: message,
        time: 'Just now'
      };

      saveWish(wishObj);
      renderWishes();
      playChimeSound();

      // Form reset & Success feedback
      form.reset();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✨ Blessing Sent! Thank You! ✨';
        submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 3500);
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
