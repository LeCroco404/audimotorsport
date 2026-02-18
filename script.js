function gererNav() {
  var nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

function gererApparition() {
  var elements = document.querySelectorAll('.bloc-texte');
  if (elements.length === 0) return;

  var obs = new IntersectionObserver(function(entrees) {
    entrees.forEach(function(entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add('visible');
        obs.unobserve(entree.target);
      }
    });
  }, { threshold: 0.25 });

  elements.forEach(function(el) { obs.observe(el); });
}

function gererParallaxe() {
  var blocs = document.querySelectorAll('.bloc');
  if (blocs.length === 0) return;

  window.addEventListener('scroll', function() {
    blocs.forEach(function(bloc) {
      var rect = bloc.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      var progression = rect.top / window.innerHeight;
      var deplacement = progression * 40;
      var img = bloc.querySelector('.bloc-img');
      if (img) {
        img.style.transform = 'translateY(' + deplacement + 'px)';
      }
    });
  }, { passive: true });
}

const video = document.getElementById("audiVideo");
const playPause = document.getElementById("playPause");
const muteBtn = document.getElementById("muteBtn");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.getElementById("progressBar");

playPause.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPause.textContent = "⏸";
  } else {
    video.pause();
    playPause.textContent = "▶";
  }
});

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇" : "🔊";
});

video.addEventListener("timeupdate", () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";
});

progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const percent = clickX / width;
  video.currentTime = percent * video.duration;
});

function gererLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var lbImage   = document.getElementById('lb-image');
  var lbLegende = document.getElementById('lb-legende');
  var lbFermer  = document.getElementById('lb-fermer');
  var items = document.querySelectorAll('.galerie-item');
  items.forEach(function(item) {
    item.addEventListener('click', function() {
      var img     = item.querySelector('img');
      var legende = item.querySelector('figcaption');
      lbImage.src      = img.src;
      lbImage.alt      = img.alt;
      lbLegende.textContent = legende ? legende.textContent : '';
      lightbox.classList.add('ouverte');
    });
  });
  lbFermer.addEventListener('click', function() {
    lightbox.classList.remove('ouverte');
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('ouverte');
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      lightbox.classList.remove('ouverte');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  gererNav();
  gererApparition();
  gererParallaxe();
  gererLightbox();
});