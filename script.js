const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const yearNode = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const contactFormNote = document.querySelector("[data-form-note]");
const portfolioModule = document.querySelector("[data-portfolio-module]");

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

const openMailto = ({ subject, body, noteNode, noteText }) => {
  if (noteNode && noteText) {
    noteNode.textContent = noteText;
  }
  window.location.href = `mailto:hello@flyfilmproductions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

if (contactForm && contactFormNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "").trim();

    openMailto({
      subject: `New project inquiry from ${name}`,
      body: `Name: ${name}\nEmail: ${email}\n\nProject goal:\n${project}`,
      noteNode: contactFormNote,
      noteText: "Opening your email app to send the inquiry.",
    });
  });
}

if (portfolioModule) {
  const languageToggle = document.getElementById("langToggle");
  const atmosphereVideo = document.getElementById("atmosphereVideo");
  const galleryGrid = document.getElementById("galleryGrid");
  const portfolioTitle = document.getElementById("portfolioTitle");
  const portfolioDesc = document.getElementById("portfolioDesc");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const watchReel = document.getElementById("watchReel");

  const portfolioItems = Array.from(portfolioModule.querySelectorAll(".portfolio-item"));

  const translations = {
    en: {
      menu_mtb: "Mountain Bike",
      menu_mx: "Moto Cross",
      menu_concerts: "Live Concerts",
      menu_docu: "Documentaries",
      menu_misc: "Uncategorised",
      menu_contact: "Contact Me",
      label_selected: "/// SELECTED",
      cta_contact: "Start Project",
    },
    el: {
      menu_mtb: "ΟΡΕΙΝΗ ΠΟΔΗΛΑΣΙΑ",
      menu_mx: "MOTOCROSS",
      menu_concerts: "ΣΥΝΑΥΛΙΕΣ",
      menu_docu: "ΝΤΟΚΙΜΑΝΤΕΡ",
      menu_misc: "ΔΙΑΦΟΡΑ PROJECTS",
      menu_contact: "ΕΠΙΚΟΙΝΩΝΙΑ",
      label_selected: "/// ΕΠΙΛΟΓΗ",
      cta_contact: "ΕΝΑΡΞΗ PROJECT",
    },
  };

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

  let currentLanguage = "en";

  const applyLanguage = (lang) => {
    currentLanguage = lang;

    portfolioModule.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (!key || !translations[lang][key]) {
        return;
      }
      node.textContent = translations[lang][key];
    });

    languageToggle?.querySelectorAll(".lang-pill").forEach((pill) => {
      const isActive = pill.dataset.lang === lang;
      pill.classList.toggle("is-active", isActive);
    });

    const activeItem = portfolioModule.querySelector(".portfolio-item.is-active");
    if (activeItem) {
      updatePreview(activeItem);
    }
  };

  const setAtmosphere = (type) => {
    if (!atmosphereVideo || !mediaAssets[type]) {
      return;
    }

    const nextSource = mediaAssets[type].bg;
    if (atmosphereVideo.src === nextSource) {
      return;
    }

    atmosphereVideo.style.opacity = "0.35";
    window.setTimeout(() => {
      atmosphereVideo.src = nextSource;
      atmosphereVideo.play().catch(() => {});
      atmosphereVideo.style.opacity = "1";
    }, 120);
  };

  const openLightbox = (src) => {
    if (!lightbox || !lightboxImage) {
      return;
    }
    lightboxImage.src = src;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const renderGallery = (type) => {
    if (!galleryGrid) {
      return;
    }

    galleryGrid.innerHTML = "";
    const seed = mediaAssets[type]?.seed || "city";
    for (let index = 0; index < 4; index += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-item";
      button.innerHTML = `<img src="https://picsum.photos/seed/${seed}${index}/640/360" alt="Portfolio still ${index + 1}" loading="lazy" />`;
      button.addEventListener("click", () => {
        openLightbox(`https://picsum.photos/seed/${seed}${index}/1600/900`);
      });
      galleryGrid.appendChild(button);
    }
  };

  const updatePreview = (item) => {
    const type = item.dataset.type || "mtb";
    const title = item.getAttribute(`data-title-${currentLanguage}`) || "";
    const description = item.getAttribute(`data-desc-${currentLanguage}`) || "";

    portfolioItems.forEach((node) => {
      const isActive = node === item;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-selected", String(isActive));
    });

    if (portfolioTitle) {
      portfolioTitle.textContent = title;
    }
    if (portfolioDesc) {
      portfolioDesc.textContent = description;
    }

    if (watchReel) {
      if (type === "contact") {
        watchReel.href = "#contact";
        watchReel.textContent = currentLanguage === "el" ? "Επικοινωνία" : "Contact";
      } else {
        watchReel.href = "https://www.youtube.com/watch?v=dF1I2Eo54iE";
        watchReel.textContent = currentLanguage === "el" ? "Δες Reel" : "Watch Reel";
      }
    }

    setAtmosphere(type);
    renderGallery(type);
  };

  portfolioItems.forEach((item) => {
    item.addEventListener("click", () => updatePreview(item));
    item.addEventListener("mouseenter", () => setAtmosphere(item.dataset.type || "mtb"));
    item.addEventListener("focus", () => setAtmosphere(item.dataset.type || "mtb"));
  });

  languageToggle?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("lang-pill")) {
      return;
    }
    const lang = target.dataset.lang === "el" ? "el" : "en";
    applyLanguage(lang);
  });

  lightboxClose?.addEventListener("click", () => {
    lightbox?.classList.remove("active");
    lightbox?.setAttribute("aria-hidden", "true");
  });

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

  const defaultItem = portfolioItems[0];
  if (defaultItem) {
    updatePreview(defaultItem);
  }
  applyLanguage("en");
}

const loadPreloader = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    document.body.classList.add("loaded");
    return;
  }
  window.setTimeout(() => {
    document.body.classList.add("loaded");
  }, 1400);
};

if (document.readyState === "complete") {
  loadPreloader();
} else {
  window.addEventListener("load", loadPreloader, { once: true });
}
