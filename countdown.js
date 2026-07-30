/**
 * Script Hitung Mundur (Countdown Timer) JavaScript
 * Bekerja di Browser & Node.js
 */

function startCountdown(targetDate, onTick, onComplete) {
  const targetTime = new Date(targetDate).getTime();

  if (isNaN(targetTime)) {
    console.error("Format tanggal tidak valid!");
    return null;
  }

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      clearInterval(timer);
      onTick({ days: 0, hours: 0, minutes: 0, seconds: 0, finished: true });
      if (typeof onComplete === 'function') {
        onComplete();
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    onTick({ days, hours, minutes, seconds, finished: false });
  }, 1000);

  return timer;
}

// Demo Penggunaan di Node.js (Hitung mundur 10 detik dari sekarang)
console.log("=== MEMULAI HITUNG MUNDUR (DEMO 10 DETIK) ===");
const target = new Date(Date.now() + 10 * 1000);

startCountdown(
  target,
  (time) => {
    if (!time.finished) {
      console.log(`Sisa Waktu: ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`);
    }
  },
  () => {
    console.log("🎉 WAKTU HABIS! ACARA DIMULAI! 🎉");
  }
);
