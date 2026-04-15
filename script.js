const YT_ID = "dF1I2Eo54iE";
const mediaAssets = {
  mtb: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-cyclist-riding-a-mountain-bike-downhill-4396-large.mp4",
    matrix: "mtb",
  },
  mx: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-motocross-racer-jumping-4524-large.mp4",
    matrix: "mx",
  },
  concerts: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-crowd-cheering-at-a-concert-4519-large.mp4",
    matrix: "concert",
  },
  docu: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-river-in-the-forest-4247-large.mp4",
    matrix: "nature",
  },
  misc: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4",
    matrix: "city",
  },
  contact: {
    bg: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
    matrix: "",
  },
};

const translations = {
  en: {
    menu_mtb: "Mountain Bike",
    menu_mx: "Moto Cross",
    menu_concerts: "Live Concerts",
    menu_docu: "Documentaries",
    menu_misc: "UnCategorised",
    menu_contact: "Contact Me",
    label_selected: "/// SELECTED",
    btn_back: "\u2190 BACK",
    form_title: "START MISSION",
    form_name: "PILOT NAME",
    form_email: "COMMS FREQUENCY",
    form_msg: "MISSION BRIEFING",
    form_submit: "INITIATE LAUNCH",
    form_success: "TRANSMISSION SENT",
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
    form_success: "ΤΟ ΜΗΝΥΜΑ ΣΤΑΛΘΗΚΕ",
  },
};

let currentLang = "en";

const body = document.body;
const slides = Array.from(document.querySelectorAll(".slide"));
const atmosphereVideo = document.getElementById("atmosphereVideo");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightboxClose");
const langToggle = document.getElementById("langToggle");
const pillEn = document.getElementById("pill-en");
const pillEl = document.getElementById("pill-el");
const closeButton = document.getElementById("closeBtn");
const videoContainer = document.getElementById("videoContainer");
const matrixGrid = document.getElementById("matrixGrid");
const projectTitle = document.getElementById("projTitle");
const projectDescription = document.getElementById("projDesc");
const integratedForm = document.getElementById("integrated-form");
const formName = integratedForm?.querySelector('input[name="name"]');
const formEmail = integratedForm?.querySelector('input[name="email"]');
const formMessage = integratedForm?.querySelector('textarea[name="message"]');
const projectButtons = slides.filter((slide) => slide.dataset.type !== "contact");

function setFormPlaceholders(lang) {
  if (!formName || !formEmail || !formMessage) {
    return;
  }

  if (lang === "el") {
    formName.placeholder = "ΟΝΟΜΑ";
    formEmail.placeholder = "EMAIL";
    formMessage.placeholder = "ΓΡΑΨΤΕ ΤΟ ΜΗΝΥΜΑ ΣΑΣ...";
    return;
  }

  formName.placeholder = "PILOT NAME";
  formEmail.placeholder = "COMMS FREQUENCY";
  formMessage.placeholder = "MISSION BRIEFING";
}

function updateProjectText(slide) {
  if (!slide) {
    return;
  }

  const title = slide.getAttribute(`data-title-${currentLang}`) || "";
  const description = slide.getAttribute(`data-desc-${currentLang}`) || "";
  projectTitle.textContent = title;
  projectDescription.textContent = description;
}

function updateLanguage(lang) {
  currentLang = lang;
  body.classList.toggle("lang-el", lang === "el");
  pillEn?.classList.toggle("active", lang === "en");
  pillEl?.classList.toggle("active", lang === "el");

  document.querySelectorAll("[data-lang-key]").forEach((element) => {
    const key = element.getAttribute("data-lang-key");
    const value = translations[lang]?.[key];
    if (value) {
      element.textContent = value;
    }
  });

  setFormPlaceholders(lang);
  updateProjectText(document.querySelector(".slide.is-active"));
}

function updateAtmosphere(type) {
  if (!atmosphereVideo || !mediaAssets[type]) {
    return;
  }

  const source = mediaAssets[type].bg;
  if (atmosphereVideo.getAttribute("src") === source) {
    return;
  }

  atmosphereVideo.style.opacity = "0";
  window.setTimeout(() => {
    atmosphereVideo.src = source;
    atmosphereVideo.play().catch(() => {});
    atmosphereVideo.style.opacity = "1";
  }, 250);
}

function setActiveSlide(slide) {
  slides.forEach((entry) => {
    entry.classList.toggle("is-active", entry === slide);
  });

  if (slide) {
    updateAtmosphere(slide.dataset.type);
  }
}

function createMatrixItem(seed, index) {
  const item = document.createElement("button");
  item.type = "button";
  item.className = "matrix-item";
  item.style.animationDelay = `${index * 0.1}s`;
  item.setAttribute("aria-label", `Open gallery still ${index + 1}`);

  const image = document.createElement("img");
  image.src = `https://picsum.photos/seed/${seed}${index}/400/300`;
  image.alt = `Portfolio still ${index + 1}`;
  image.loading = "lazy";
  item.appendChild(image);

  item.addEventListener("click", () => {
    lightboxImage.src = `https://picsum.photos/seed/${seed}${index}/1600/900`;
    lightbox.classList.add("active");
  });

  return item;
}

function populateMatrix(type) {
  matrixGrid.innerHTML = "";
  const seed = mediaAssets[type]?.matrix || "city";

  for (let index = 0; index < 4; index += 1) {
    matrixGrid.appendChild(createMatrixItem(seed, index));
  }
}

function renderVideoFrame() {
  videoContainer.innerHTML = "";
  const frame = document.createElement("iframe");
  frame.src =
    `https://www.youtube.com/embed/${YT_ID}?si=MSnXe1T7HNEtCqgm&autoplay=1&mute=1&controls=1&loop=1&playlist=${YT_ID}&playsinline=1`;
  frame.title = "FlyFilm featured reel";
  frame.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allowFullscreen = true;
  videoContainer.appendChild(frame);
}

function openProject(slide) {
  if (!slide) {
    return;
  }

  const { type } = slide.dataset;
  setActiveSlide(slide);

  if (type === "contact") {
    videoContainer.innerHTML = "";
    body.classList.remove("mode-project");
    body.classList.add("mode-contact");
  } else {
    renderVideoFrame();
    populateMatrix(type);
    updateProjectText(slide);
    body.classList.remove("mode-contact");
    body.classList.add("mode-project");
  }

  body.classList.add("view-project");
}

function closeProject() {
  body.classList.remove("view-project");
  window.setTimeout(() => {
    videoContainer.innerHTML = "";
  }, 1000);
}

window.addEventListener("load", () => {
  if (atmosphereVideo) {
    atmosphereVideo.src = mediaAssets.mtb.bg;
    atmosphereVideo.play().catch(() => {});
  }

  window.setTimeout(() => {
    body.classList.add("loaded");
    slides.forEach((slide, index) => {
      window.setTimeout(() => {
        slide.classList.add("reveal");
      }, 500 + index * 100);
    });
  }, 3500);
});

langToggle?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.classList.contains("lang-pill")) {
    return;
  }

  updateLanguage(target.dataset.lang === "el" ? "el" : "en");
});

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

  slide.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(slide);
    }
  });
});

closeButton?.addEventListener("click", closeProject);

lightboxClose?.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    lightbox.classList.remove("active");
    if (body.classList.contains("view-project")) {
      closeProject();
    }
  }
});

integratedForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  integratedForm.innerHTML = `<h3 class="form-success">${translations[currentLang].form_success}</h3>`;
});

setFormPlaceholders(currentLang);
setActiveSlide(projectButtons[0] || slides[0]);
updateLanguage(currentLang);
