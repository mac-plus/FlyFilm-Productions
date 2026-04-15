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
      panel_title: "Selected",
      panel_contact: "Start Mission",
      panel_contact_copy: "Fastest way to reach us for availability and rates.",
      btn_back: "Back",
      form_name: "Name",
      form_email: "Email",
      form_msg: "Message",
      form_submit: "Send Inquiry",
      form_sent: "Transmission sent",
      form_note: "Opening your email app...",
    },
    el: {
      menu_mtb: "ΟΡΕΙΝΗ ΠΟΔΗΛΑΣΙΑ",
      menu_mx: "MOTOCROSS",
      menu_concerts: "ΣΥΝΑΥΛΙΕΣ",
      menu_docu: "ΝΤΟΚΙΜΑΝΤΕΡ",
      menu_misc: "ΔΙΑΦΟΡΑ PROJECTS",
      menu_contact: "ΕΠΙΚΟΙΝΩΝΙΑ",
      panel_title: "Επιλογή",
      panel_contact: "Εναρξη",
      panel_contact_copy: "Ο πιο γρήγορος τρόπος επικοινωνίας για διαθεσιμότητα και κόστος.",
      btn_back: "Πίσω",
      form_name: "Ονομα",
      form_email: "Email",
      form_msg: "Μήνυμα",
      form_submit: "Αποστολή",
      form_sent: "Το μήνυμα στάλθηκε",
      form_note: "Ανοίγει η εφαρμογή email...",
    },
  };

  const slides = Array.from(cinematicShell.querySelectorAll("[data-cinematic-slide]"));
  const atmosphereVideo = document.getElementById("atmosphereVideo");
  const player = document.querySelector("[data-player]");
  const panelTitle = document.querySelector("[data-panel-title]");
  const panelName = document.querySelector("[data-panel-name]");
  const panelDescription = document.querySelector("[data-panel-description]");
  const closePanel = document.querySelector("[data-close-panel]");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightboxClose");
  const gallery = document.querySelector("[data-gallery]");
  const languageToggle = document.getElementById("langToggle");
  const cinematicForm = document.querySelector("[data-cinematic-form]");
  const cinematicFormNote = document.querySelector("[data-cinematic-form-note]");

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
    }, 200);
  };

  const setActiveSlide = (slide, updateBackground = true) => {
    if (!slide) {
      return;
    }

    slides.forEach((item) => item.classList.remove("is-active"));
    slide.classList.add("is-active");

    if (updateBackground) {
      setAtmosphere(slide.dataset.type || "mtb");
    }
  };

  const openLightbox = (src) => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = src;
    lightbox.classList.add("active");
  };

  const renderGallery = (type) => {
    if (!gallery) {
      return;
    }

    gallery.innerHTML = "";
    const seed = mediaAssets[type]?.matrix || "city";
    for (let index = 0; index < 4; index += 1) {
      const thumb = document.createElement("button");
      thumb.className = "gallery-item";
      thumb.type = "button";
      thumb.innerHTML = `<img src="https://picsum.photos/seed/${seed}${index}/640/360" alt="Project still ${index + 1}" loading="lazy" />`;
      thumb.addEventListener("click", () => {
        openLightbox(`https://picsum.photos/seed/${seed}${index}/1600/900`);
      });
      gallery.appendChild(thumb);
    }
  };

  const renderProjectPanel = (slide) => {
    if (!slide || !panelName || !panelDescription || !player) {
      return;
    }

    const type = slide.dataset.type || "mtb";
    const title = slide.getAttribute(`data-title-${currentLang}`) || "";
    const description = slide.getAttribute(`data-desc-${currentLang}`) || "";

    panelName.textContent = title;
    panelDescription.textContent = description;
    setActiveSlide(slide);

    if (type === "contact") {
      cinematicShell.classList.add("is-contact");
      player.innerHTML = "";
      if (panelTitle) {
        panelTitle.textContent = translations[currentLang].panel_contact;
      }
      return;
    }

    cinematicShell.classList.remove("is-contact");
    if (panelTitle) {
      panelTitle.textContent = translations[currentLang].panel_title;
    }
    renderGallery(type);

    player.innerHTML = `<iframe src="https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&controls=1&loop=1&playlist=${YT_ID}&playsinline=1" title="Showreel video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  };

  const openPanel = (slide) => {
    renderProjectPanel(slide);
    cinematicShell.classList.add("is-panel-open");
  };

  const closePanelView = () => {
    cinematicShell.classList.remove("is-panel-open");
    window.setTimeout(() => {
      if (player) {
        player.innerHTML = "";
      }
    }, 300);
  };

  const applyLanguage = (language) => {
    const dictionary = translations[language];
    if (!dictionary) {
      return;
    }

    currentLang = language;
    document.body.classList.toggle("lang-el", language === "el");

    const enPill = document.getElementById("pill-en");
    const elPill = document.getElementById("pill-el");
    enPill?.classList.toggle("active", language === "en");
    elPill?.classList.toggle("active", language === "el");

    cinematicShell.querySelectorAll("[data-lang-key]").forEach((node) => {
      const key = node.getAttribute("data-lang-key");
      if (key && dictionary[key]) {
        node.textContent = dictionary[key];
      }
    });

    if (cinematicFormNote) {
      cinematicFormNote.textContent = "";
    }

    const active = cinematicShell.querySelector(".cinematic-slide.is-active");
    if (active) {
      renderProjectPanel(active);
    }
  };

  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", () => setActiveSlide(slide));
    slide.addEventListener("focus", () => setActiveSlide(slide));
    slide.addEventListener("click", () => openPanel(slide));
  });

  if (closePanel) {
    closePanel.addEventListener("click", closePanelView);
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.classList.contains("lang-pill")) {
        return;
      }

      const lang = target.dataset.lang === "el" ? "el" : "en";
      applyLanguage(lang);
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

  if (cinematicForm && cinematicFormNote) {
    cinematicForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(cinematicForm);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();

      const subject = encodeURIComponent(`Live portfolio inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      const mailtoUrl = `mailto:hello@flyfilmproductions.com?subject=${subject}&body=${body}`;

      cinematicFormNote.textContent = translations[currentLang].form_note;
      window.location.href = mailtoUrl;
    });
  }

  const revealSlides = () => {
    slides.forEach((slide, index) => {
      window.setTimeout(() => {
        slide.classList.add("is-shown");
      }, 180 + index * 65);
    });
  };

  const initCinematicModule = () => {
    if (slides[0]) {
      setActiveSlide(slides[0], false);
      setAtmosphere(slides[0].dataset.type || "mtb");
    }

    applyLanguage("en");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const preloaderDelay = reducedMotion ? 0 : 1300;
    window.setTimeout(() => {
      document.body.classList.add("loaded");
      revealSlides();
    }, preloaderDelay);
  };

  if (document.readyState === "complete") {
    initCinematicModule();
  } else {
    window.addEventListener("load", initCinematicModule, { once: true });
  }
}
