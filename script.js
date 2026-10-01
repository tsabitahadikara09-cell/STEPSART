// Demo data untuk UI. Nantinya bisa dihubungkan ke database dan data gelang.
  const currentStreak = 12;
  const nextReward = 30;
  const completedDays = new Set([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]);
  const today = new Date(2026, 9, 1); // Contoh tanggal demo: 1 Oktober 2026
  let shownMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  document.getElementById('streakNumber').textContent = currentStreak;
  document.getElementById('streakProgress').style.width = Math.min(100, currentStreak / nextReward * 100) + '%';
  document.getElementById('progressText').textContent = `${currentStreak} / ${nextReward} days`;
  document.getElementById('streakMessage').textContent = currentStreak >= 7 ? 'You’re on fire!' : 'Good start!';
  document.getElementById('streakSubtext').textContent = `Keep your streak going and reach ${nextReward} days for a special reward!`;

  document.getElementById('todayDate').textContent = new Intl.DateTimeFormat('id-ID', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  }).format(today);

  function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    const monthLabel = document.getElementById('monthLabel');
    monthLabel.textContent = new Intl.DateTimeFormat('en-US', {
      month: 'long', year: 'numeric'
    }).format(shownMonth);

    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(day => {
      const el = document.createElement('div');
      el.className = 'weekday';
      el.textContent = day;
      grid.appendChild(el);
    });

    const year = shownMonth.getFullYear();
    const month = shownMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Ubah Minggu (0) menjadi 6 agar kalender dimulai dari Senin.
    const offset = (firstDay.getDay() + 6) % 7;

    for (let i = 0; i < offset; i++) {
      const blank = document.createElement('div');
      blank.className = 'day empty';
      grid.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const el = document.createElement('button');
      el.className = 'day';
      el.textContent = day;
      const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
      // Data contoh penyelesaian streak hanya diterapkan pada Oktober.
      const isCompleted = year === 2026 && month === 9 && completedDays.has(day);
      if (isCompleted) el.classList.add('completed');
      if (isToday) el.classList.add('today');
      el.title = isCompleted ? 'Streak completed' : 'Belum menyelesaikan target';
      el.addEventListener('click', () => {
        alert(`${day} ${monthLabel.textContent}: ${isCompleted ? 'Streak completed! 🔥' : 'Belum ada streak pada tanggal ini.'}`);
      });
      grid.appendChild(el);
    }
  }

  document.getElementById('prevMonth').addEventListener('click', () => {
    shownMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() - 1, 1);
    renderCalendar();
  });
  document.getElementById('nextMonth').addEventListener('click', () => {
    shownMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 1);
    renderCalendar();
  });
  document.getElementById('viewRewards').addEventListener('click', () => {
    alert('Streak Rewards\\n7 hari: 100 coins\\n14 hari: Basic Character\\n30 hari: Advanced Character\\n60 hari: Special Frame\\n100 hari: Exclusive Character');
  });
  document.getElementById('editCharacter').addEventListener('click', () => {
    const name = prompt('Masukkan nama karakter kamu:', document.getElementById('characterName').textContent);
    if (name && name.trim()) document.getElementById('characterName').textContent = name.trim();
    const emoji = prompt('Pilih emoji karakter (contoh: 🐻, 🐱, 🐰):', document.getElementById('characterPortrait').textContent);
    if (emoji && emoji.trim()) {
      document.getElementById('characterPortrait').textContent = emoji.trim();
      document.querySelector('.hero-character').textContent = emoji.trim();
    }
  });
  document.getElementById('searchInput').addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      alert(`Demo pencarian: "${event.target.value.trim()}"`);
    }
  });

  // Navigasi demo: menandai menu yang dipilih.
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector('.nav-item.active')?.classList.remove('active');
      item.classList.add('active');
      if (!item.textContent.includes('Streak')) {
        alert(`${item.textContent.trim()} masih berupa tampilan demo. Saat ini halaman Streak yang dibuat.`);
      }
    });
  });

  renderCalendar();
