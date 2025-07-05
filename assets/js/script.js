'use strict';

// Toggle class helper
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// === SIDEBAR TOGGLE ===
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// === TESTIMONIAL MODAL ===
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// === CUSTOM SELECT FILTER ===
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

select.addEventListener("click", () => elementToggleFunc(select));

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// === FORM VALIDATION ===
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// === PAGE NAVIGATION ===
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    pages.forEach((page, i) => {
      const isActive = this.innerHTML.toLowerCase() === page.dataset.page;
      page.classList.toggle("active", isActive);
      navigationLinks[i].classList.toggle("active", isActive);
    });

    window.scrollTo(0, 0);
  });
});

// === KOJIMA QUOTE TYPEWRITER ===
const kojimaQuotes = [
  `"Games are not just a pastime. They are a way of telling stories."`,
  `"I don't want to just create games — I want to create experiences."`
];

const typewriter = document.getElementById('typewriter');
let kojimaIndex = 0;

function typeKojimaQuote() {
  typewriter.textContent = "";
  let charIndex = 0;
  const currentText = kojimaQuotes[kojimaIndex];

  function type() {
    if (charIndex < currentText.length) {
      typewriter.textContent += currentText.charAt(charIndex++);
      setTimeout(type, 50);
    } else {
      setTimeout(() => {
        kojimaIndex = (kojimaIndex + 1) % kojimaQuotes.length;
        typeKojimaQuote();
      }, 2000);
    }
  }

  type();
}

// === JOSEPH FARES FADE QUOTES ===
const faresQuotes = [
  `"Game is made by someone that its life was spent to create and make."`,
  `"If you want something unique, you have to take risks."`
];

const fadeQuote = document.getElementById('fade-quote');
let faresIndex = 0;

function showFaresQuote() {
  fadeQuote.textContent = faresQuotes[faresIndex];
  fadeQuote.style.opacity = 1;

  setTimeout(() => {
    fadeQuote.style.opacity = 0;

    setTimeout(() => {
      faresIndex = (faresIndex + 1) % faresQuotes.length;
      showFaresQuote();
    }, 1500);
  }, 3000);
}

// === BACKGROUND TOGGLE ===
document.querySelectorAll('.navbar-link').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.toggle('default-bg');
    document.body.classList.toggle('navy-bg');
  });
});

// === CONTACT ME BUTTON ===
document.getElementById('go-to-contact')?.addEventListener('click', function () {
  const navButtons = document.querySelectorAll('[data-nav-link]');
  const contactBtn = document.getElementById("go-to-contact");
contactBtn.classList.add("contact-shake");

  navButtons.forEach(button => {
    if (button.textContent.trim().toLowerCase() === 'contact') {
      button.click();
    }
  });
});

// === SKILL PROGRESS BAR ANIMATION ===
const skillNavLink = Array.from(navigationLinks).find(
  link => link.textContent.trim().toLowerCase() === "skill"
);

skillNavLink?.addEventListener("click", () => {
  const fills = document.querySelectorAll(".skill-progress-fill");
  fills.forEach(fill => {
    const target = fill.getAttribute("data-width") || "0";
    fill.style.width = "0";
    setTimeout(() => {
      fill.style.width = target + "%";
    }, 200);
  });
});

// === ON LOAD ===
window.onload = () => {
  typeKojimaQuote();
  showFaresQuote();
};

const playlist = [
  './assets/music/lagu1.mp3',
  './assets/music/lagu2.mp3',
  './assets/music/lagu3.mp3'
];

let currentTrack = 0;
let isPlaying = false;

const bgMusic = document.getElementById("bg-music");     // <audio id="bg-music">
const musicBtn = document.getElementById("music-btn");   // <button id="music-btn">
const musicHint = document.getElementById("music-hint"); // <span id="music-hint">

// Set source awal
bgMusic.src = playlist[currentTrack];

// Play/Pause toggle
musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play();
    isPlaying = true;
    musicBtn.innerHTML = `<ion-icon name="pause-circle-outline"></ion-icon>`;
    musicBtn.classList.add("music-playing"); // <- tambahkan animasi getar
    musicHint.textContent = "Enjoy the music!";
  } else {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.innerHTML = `<ion-icon name="musical-notes-outline"></ion-icon>`;
    musicBtn.classList.remove("music-playing"); // <- stop animasi
    musicHint.textContent = "If you're bored just play the music";
  }
});

// Saat satu lagu selesai, lanjut ke lagu berikutnya
bgMusic.addEventListener("ended", () => {
  currentTrack++;
  if (currentTrack >= playlist.length) {
    currentTrack = 0;
  }
  bgMusic.src = playlist[currentTrack];
  bgMusic.play();
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide-img");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 10; // Width + margin
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  });

  // Autoplay
  let autoplay = setInterval(() => {
    nextBtn.click();
  }, 5000);

  // Pause saat hover
  const sliderContainer = document.querySelector(".sidebar-slider");
  sliderContainer.addEventListener("mouseenter", () => clearInterval(autoplay));
  sliderContainer.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => nextBtn.click(), 5000);
  });

  // Klik slide untuk navigasi ke "portfolio"
  slides.forEach(slide => {
    slide.addEventListener("click", () => {
      const navLinks = document.querySelectorAll("[data-nav-link]");
      navLinks.forEach(link => {
        if (link.textContent.toLowerCase().includes("portfolio")) {
          link.click();
        }
      });

      const targetPage = document.querySelector('[data-page="portfolio"]');
      if (targetPage) {
        window.scrollTo({ top: targetPage.offsetTop, behavior: "smooth" });
      }
    });
  });

  // Update slider setelah semua gambar siap
  window.addEventListener("resize", updateSlider);
  updateSlider();
});
document.addEventListener("DOMContentLoaded", function () {
    const wrappers = document.querySelectorAll(".video-wrapper");

    wrappers.forEach(wrapper => {
      const video = wrapper.querySelector(".hover-video");

      wrapper.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play();
      });

      wrapper.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  });
function typeHeroText() {
  const text = "Hi, I’m Rayhan Muammar Shidqi!";
  const target = document.getElementById("hero-typewriter");

  let index = 0;

  function type() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(type, 75);
    }
  }

  type();
}

window.addEventListener("DOMContentLoaded", () => {
  typeHeroText();
});
