const YT_ID = "dF1I2Eo54iE";

const mediaAssets = {
  mtb: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-cyclist-riding-a-mountain-bike-downhill-4396-large.mp4",
    seed: "mtb",
  },
  mx: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-motocross-racer-jumping-4524-large.mp4",
    seed: "mx",
  },
  concerts: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-crowd-cheering-at-a-concert-4519-large.mp4",
    seed: "concert",
  },
  docu: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-river-in-the-forest-4247-large.mp4",
    seed: "nature",
  },
  misc: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4",
    seed: "city",
  },
  contact: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
    seed: "contact",
  },
};

const translations = {
  en: {
    menu_mtb: "Mountain Bike",
    menu_mx: "Moto Cross",
    menu_concerts: "Live Concerts",
    menu_docu: "Documentaries",
    menu_misc: "Uncategorised",
    menu_contact: "Contact Me",
    label_selected: "/// SELECTED",
    btn_back: "\u2190 BACK",
    form_title: "START MISSION",
    form_name: "PILOT NAME",
    form_email: "COMMS FREQUENCY",
    form_msg: "MISSION BRIEFING",
    form_submit: "INITIATE LAUNCH",
    form_opening: "Opening your email app...",
  },
  el: {
    menu_mtb: "ΟΡΕΙΝΗ ΠΟΔΗΛΑΣΙΑ",
    menu_mx: "MOTOCROSS",
    menu_concerts: "ΣΥΝΑΥΛΙΕΣ",
    menu_docu: "ΝΤΟΚΙΜΑΝΤΕΡ",
    menu_misc: "ΔΙΑΦΟΡΑ PROJECTS",
    menu_contact: "ΕΠΙΚΟΙΝΩΝΙΑ",
    label_selected: "/// ΕΠΙΛΟΓΗ",
    btn_back: "\u2190 ΠΙΣΩ",
    form_title: "ΕΝΑΡΞΗ ΑΠΟΣΤΟΛΗΣ",
    form_name: "ΟΝΟΜΑ",
    form_email: "EMAIL",
    form_msg: "ΜΗΝΥΜΑ",
    form_submit: "ΑΠΟΣΤΟΛΗ",
    form_opening: "Ανοίγει η εφαρμογή email...",
  },
};

const slides = Array.from(document.querySelectorAll(".slide"));
const langToggle = document.getElementById("langToggle");
const atmosphereVideo = document.getElementById("atmosphereVideo");
const videoContainer = document.getElementById("videoContainer");
const projTitle = document.getElementById("projTitle");
const projDesc = document.getElementById("projDesc");
const matrixGrid = document.getElementById("matrixGrid");
const closeBtn = document.getElementById("closeBtn");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxImage = document.getElementById("lightbox-img");
const integratedForm = document.getElementById("integrated-form");
const formStatus = document.getElementById("formStatus");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");

let currentLang = "en";
let activeSlide = null;

const setAtmosphere = (type, immediate = false) => {
  if (!atmosphereVideo || !mediaAssets[type]) {
    return;
  }
  const nextSource = mediaAssets[type].bg;
  if (atmosphereVideo.dataset.source === nextSource) {
    return;
  }

  if (immediate) {
    atmosphereVideo.src = nextSource;
    atmosphereVideo.dataset.source = nextSource;
    atmosphereVideo.play().catch(() => {});
    return;
  }

  atmosphereVideo.style.opacity = "0";
  window.setTimeout(() => {
    atmosphereVideo.src = nextSource;
    atmosphereVideo.dataset.source = nextSource;
    atmosphereVideo.play().catch(() => {});
    atmosphereVideo.style.opacity = "1";
  }, 180);
};

const setActiveSlide = (slide, updateBackground = true) => {
  if (!slide) {
    return;
  }
  activeSlide = slide;
  slides.forEach((item) => {
    const isSelected = item === slide;
    item.classList.toggle("is-active", isSelected);
    item.setAttribute("aria-selected", String(isSelected));
  });
  if (updateBackground) {
    setAtmosphere(slide.dataset.type || "mtb");
  }
};

const updateProjectText = (slide) => {
  if (!slide || !projTitle || !projDesc) {
    return;
  }
  projTitle.textContent = slide.getAttribute(`data-title-${currentLang}`) || "PROJECT";
  projDesc.textContent = slide.getAttribute(`data-desc-${currentLang}`) || "";
};

const openLightbox = (src) => {
  if (!lightbox || !lightboxImage) {
    return;
  }
  lightboxImage.src = src;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  if (!lightbox) {
    return;
  }
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
};

const renderMatrix = (type) => {
  if (!matrixGrid) {
    return;
  }
  matrixGrid.innerHTML = "";
  const seed = mediaAssets[type]?.seed || "city";
  for (let index = 0; index < 4; index += 1) {
    const item = document.createElement("button");
    item.className = "matrix-item";
    item.type = "button";
    item.innerHTML = `<img src="https://picsum.photos/seed/${seed}${index}/640/360" alt="Project still ${index + 1}" loading="lazy">`;
    item.addEventListener("click", () => {
      openLightbox(`https://picsum.photos/seed/${seed}${index}/1600/900`);
    });
    matrixGrid.appendChild(item);
  }
};

const openProject = (slide) => {
  if (!slide) {
    return;
  }
  const type = slide.dataset.type || "mtb";
  setActiveSlide(slide);
  document.body.classList.add("view-project");

  if (type === "contact") {
    document.body.classList.add("mode-contact");
    document.body.classList.remove("mode-project");
    if (videoContainer) {
      videoContainer.innerHTML = "";
    }
    if (matrixGrid) {
      matrixGrid.innerHTML = "";
    }
    closeBtn?.focus();
    return;
  }

  document.body.classList.add("mode-project");
  document.body.classList.remove("mode-contact");
  updateProjectText(slide);
  renderMatrix(type);

  if (videoContainer) {
    videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&controls=1&loop=1&playlist=${YT_ID}&playsinline=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  }

  closeBtn?.focus();
};

const closeProject = () => {
  document.body.classList.remove("view-project", "mode-project", "mode-contact");
  window.setTimeout(() => {
    if (videoContainer) {
      videoContainer.innerHTML = "";
    }
  }, 700);
};

const applyLanguage = (lang) => {
  currentLang = lang;
  document.body.classList.toggle("lang-el", lang === "el");

  const dictionary = translations[lang];
  document.querySelectorAll("[data-lang-key]").forEach((node) => {
    const key = node.getAttribute("data-lang-key");
    if (key && dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  langToggle?.querySelectorAll(".lang-pill").forEach((pill) => {
    const isActive = pill instanceof HTMLElement && pill.dataset.lang === lang;
    pill.classList.toggle("active", isActive);
  });

  if (nameInput && emailInput && messageInput) {
    if (lang === "el") {
      nameInput.placeholder = "ΟΝΟΜΑ";
      emailInput.placeholder = "EMAIL";
      messageInput.placeholder = "ΓΡΑΨΤΕ ΤΟ ΜΗΝΥΜΑ ΣΑΣ...";
    } else {
      nameInput.placeholder = "PILOT NAME";
      emailInput.placeholder = "COMMS FREQUENCY";
      messageInput.placeholder = "MISSION BRIEFING";
    }
  }

  if (formStatus) {
    formStatus.textContent = "";
  }

  if (activeSlide && document.body.classList.contains("mode-project")) {
    updateProjectText(activeSlide);
  }
};

slides.forEach((slide) => {
  slide.addEventListener("mouseenter", () => {
    setActiveSlide(slide);
  });
  slide.addEventListener("focus", () => {
    setActiveSlide(slide);
  });
  slide.addEventListener("click", () => {
    openProject(slide);
  });
});

langToggle?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.classList.contains("lang-pill")) {
    return;
  }
  const lang = target.dataset.lang === "el" ? "el" : "en";
  applyLanguage(lang);
});

closeBtn?.addEventListener("click", closeProject);
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }
  if (lightbox?.classList.contains("active")) {
    closeLightbox();
    return;
  }
  if (document.body.classList.contains("view-project")) {
    closeProject();
  }
});

integratedForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(integratedForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const subject = encodeURIComponent(`Live portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoUrl = `mailto:hello@flyfilmproductions.com?subject=${subject}&body=${body}`;

  if (formStatus) {
    formStatus.textContent = translations[currentLang].form_opening;
  }
  window.location.href = mailtoUrl;
});

const revealSlides = () => {
  slides.forEach((slide, index) => {
    window.setTimeout(() => {
      slide.classList.add("reveal");
    }, 360 + index * 90);
  });
};

const initPortfolio = () => {
  const firstSlide = slides[0];
  if (firstSlide) {
    setActiveSlide(firstSlide, false);
    setAtmosphere(firstSlide.dataset.type || "mtb", true);
  }

  applyLanguage("en");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loaderDelay = reducedMotion ? 0 : 2600;
  window.setTimeout(() => {
    document.body.classList.add("loaded");
    revealSlides();
  }, loaderDelay);
};

if (document.readyState === "complete") {
  initPortfolio();
} else {
  window.addEventListener("load", initPortfolio, { once: true });
}
