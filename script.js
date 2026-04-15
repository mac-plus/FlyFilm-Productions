const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const yearNode = document.querySelector("[data-year]");
const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealNodes = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

if (form && formNote) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const project = String(formData.get("project") || "").trim();

    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject goal:\n${project}`
    );
    const mailtoUrl = `mailto:hello@flyfilmproductions.com?subject=${subject}&body=${body}`;

    formNote.textContent = "Opening your email app to send the inquiry.";
    window.location.href = mailtoUrl;
  });
}

const cinematicShell = document.querySelector("[data-cinematic-shell]");

if (cinematicShell) {
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
      menu_misc: "Uncategorised",
      menu_contact: "Contact Me",
      label_selected: "/// SELECTED",
      btn_back: "← BACK",
      form_title: "START MISSION",
      form_name: "PILOT NAME",
      form_email: "COMMS FREQUENCY",
      form_msg: "MISSION BRIEFING",
      form_submit: "INITIATE LAUNCH",
      form_sent: "TRANSMISSION SENT",
    },
    el: {
      menu_mtb: "ΟΡΕΙΝΗ ΠΟΔΗΛΑΣΙΑ",
      menu_mx: "MOTOCROSS",
      menu_concerts: "ΣΥΝΑΥΛΙΕΣ",
      menu_docu: "ΝΤΟΚΙΜΑΝΤΕΡ",
      menu_misc: "ΔΙΑΦΟΡΑ PROJECTS",
      menu_contact: "ΕΠΙΚΟΙΝΩΝΙΑ",
      label_selected: "/// ΕΠΙΛΟΓΗ",
      btn_back: "← ΠΙΣΩ",
      form_title: "ΕΝΑΡΞΗ ΑΠΟΣΤΟΛΗΣ",
      form_name: "ΟΝΟΜΑ",
      form_email: "EMAIL",
      form_msg: "ΜΗΝΥΜΑ",
      form_submit: "ΑΠΟΣΤΟΛΗ",
      form_sent: "ΤΟ ΜΗΝΥΜΑ ΣΤΑΛΘΗΚΕ",
    },
  };

  const slides = Array.from(cinematicShell.querySelectorAll("[data-cinematic-slide]"));
  const atmosphereVideo = document.getElementById("atmosphereVideo");
  const videoContainer = document.getElementById("videoContainer");
  const matrixGrid = document.getElementById("matrixGrid");
  const projTitle = document.getElementById("projTitle");
  const projDesc = document.getElementById("projDesc");
  const closeBtn = document.getElementById("closeBtn");
  const langToggle = document.getElementById("langToggle");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightboxClose");
  const integratedForm = document.getElementById("integrated-form");
  const integratedName = document.getElementById("integrated-name");
  const integratedEmail = document.getElementById("integrated-email");
  const integratedMessage = document.getElementById("integrated-message");

  let currentLang = "en";

  const setAtmosphere = (type) => {
    if (!atmosphereVideo || !mediaAssets[type]) {
      return;
    }

    const nextSource = mediaAssets[type].bg;
    if (atmosphereVideo.src === nextSource) {
      return;
    }

    atmosphereVideo.style.opacity = "0";
    window.setTimeout(() => {
      atmosphereVideo.src = nextSource;
      atmosphereVideo.play().catch(() => {});
      atmosphereVideo.style.opacity = "1";
    }, 220);
  };

  const updateProjectText = (slide) => {
    if (!slide || !projTitle || !projDesc) {
      return;
    }

    projTitle.textContent =
      slide.getAttribute(`data-title-${currentLang}`) || "Project";
    projDesc.textContent =
      slide.getAttribute(`data-desc-${currentLang}`) || "";
  };

  const openLightbox = (url) => {
    if (!lightbox || !lightboxImage) {
      return;
    }
    lightboxImage.src = url;
    lightbox.classList.add("active");
  };

  const renderMatrix = (type) => {
    if (!matrixGrid) {
      return;
    }

    matrixGrid.innerHTML = "";
    const seed = mediaAssets[type]?.matrix || "city";
    for (let index = 0; index < 4; index += 1) {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "matrix-item";
      item.style.animationDelay = `${index * 0.1}s`;
      item.innerHTML = `<img src="https://picsum.photos/seed/${seed}${index}/640/360" alt="Project still ${index + 1}" loading="lazy">`;
      item.addEventListener("click", () => {
        openLightbox(`https://picsum.photos/seed/${seed}${index}/1600/900`);
      });
      matrixGrid.appendChild(item);
    }
  };

  const setActiveSlide = (slide, updateBackground = true) => {
    if (!slide) {
      return;
    }

    slides.forEach((node) => node.classList.remove("is-active"));
    slide.classList.add("is-active");
    if (updateBackground) {
      setAtmosphere(slide.dataset.type || "mtb");
    }
  };

  const openProject = (slide) => {
    if (!slide) {
      return;
    }

    const type = slide.dataset.type || "mtb";
    setActiveSlide(slide);
    cinematicShell.classList.add("is-project-open");

    if (type === "contact") {
      cinematicShell.classList.add("mode-contact");
      cinematicShell.classList.remove("mode-project");
      if (videoContainer) {
        videoContainer.innerHTML = "";
      }
      return;
    }

    cinematicShell.classList.remove("mode-contact");
    cinematicShell.classList.add("mode-project");
    updateProjectText(slide);
    renderMatrix(type);

    if (videoContainer) {
      videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&controls=1&loop=1&playlist=${YT_ID}&playsinline=1" title="Showreel video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }
  };

  const closeProject = () => {
    cinematicShell.classList.remove("is-project-open");
    window.setTimeout(() => {
      if (videoContainer) {
        videoContainer.innerHTML = "";
      }
    }, 850);
  };

  const applyLanguage = (lang) => {
    const dictionary = translations[lang];
    if (!dictionary) {
      return;
    }

    currentLang = lang;
    document.body.classList.toggle("lang-el", lang === "el");

    const enPill = document.getElementById("pill-en");
    const elPill = document.getElementById("pill-el");
    enPill?.classList.toggle("active", lang === "en");
    elPill?.classList.toggle("active", lang === "el");

    cinematicShell.querySelectorAll("[data-lang-key]").forEach((node) => {
      const key = node.getAttribute("data-lang-key");
      if (key && dictionary[key]) {
        node.textContent = dictionary[key];
      }
    });

    if (integratedName && integratedEmail && integratedMessage) {
      if (lang === "el") {
        integratedName.placeholder = "ΟΝΟΜΑ";
        integratedEmail.placeholder = "EMAIL";
        integratedMessage.placeholder = "ΓΡΑΨΤΕ ΤΟ ΜΗΝΥΜΑ ΣΑΣ...";
      } else {
        integratedName.placeholder = "PILOT NAME";
        integratedEmail.placeholder = "COMMS FREQUENCY";
        integratedMessage.placeholder = "MISSION BRIEFING";
      }
    }

    const activeSlide = cinematicShell.querySelector(".cinematic-slide.is-active");
    if (activeSlide) {
      updateProjectText(activeSlide);
    }
  };

  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", () => setActiveSlide(slide));
    slide.addEventListener("focus", () => setActiveSlide(slide));
    slide.addEventListener("click", () => openProject(slide));
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeProject);
  }

  if (langToggle) {
    langToggle.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (!target.classList.contains("lang-pill")) {
        return;
      }
      const nextLang = target.dataset.lang === "el" ? "el" : "en";
      applyLanguage(nextLang);
    });
  }

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener("click", () => lightbox.classList.remove("active"));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
  }

  if (integratedForm) {
    integratedForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message =
        currentLang === "el"
          ? translations.el.form_sent
          : translations.en.form_sent;
      integratedForm.innerHTML = `<h3 style="color:#00ffcc;text-align:center;font-size:2rem;padding:1.3rem 0;">${message}</h3>`;
    });
  }

  const animateSlidesIn = () => {
    slides.forEach((slide, index) => {
      window.setTimeout(() => {
        slide.classList.add("is-shown");
      }, 280 + index * 90);
    });
  };

  const runLoadSequence = () => {
    if (slides[0]) {
      setActiveSlide(slides[0], false);
      setAtmosphere(slides[0].dataset.type || "mtb");
    }

    applyLanguage("en");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const preloaderDelay = reducedMotion ? 0 : 2200;
    window.setTimeout(() => {
      document.body.classList.add("loaded");
      animateSlidesIn();
    }, preloaderDelay);
  };

  if (document.readyState === "complete") {
    runLoadSequence();
  } else {
    window.addEventListener("load", runLoadSequence, { once: true });
  }
}
