const featuredProjects = {
  brand: {
    type: "Launch campaign",
    title: "Velocity One product reveal",
    summary:
      "A cinematic release film paired with six social cutdowns and a homepage hero edit for a fast-moving product launch.",
    turnaround: "10 days",
    deliverables: "1 hero film, 6 cutdowns",
    fit: "Brands shipping something new",
  },
  event: {
    type: "Live event capture",
    title: "Summit keynote and social recap",
    summary:
      "Multi-camera event coverage shaped into a highlight film, speaker clips, and same-week social edits to extend the event lifecycle.",
    turnaround: "72 hours for first cut",
    deliverables: "1 recap film, 8 short clips",
    fit: "Teams that need speed after an event",
  },
  story: {
    type: "Founder documentary",
    title: "Origin story for a scaling company",
    summary:
      "A trust-building narrative film combining interviews, b-roll, and culture moments for websites, sales decks, and investor presentations.",
    turnaround: "2 weeks",
    deliverables: "1 flagship film, 3 support edits",
    fit: "Founders and brands building credibility",
  },
};

const projectButtons = Array.from(document.querySelectorAll("[data-project]"));
const projectFields = {
  type: document.getElementById("project-type"),
  title: document.getElementById("project-title"),
  summary: document.getElementById("project-summary"),
  turnaround: document.getElementById("project-turnaround"),
  deliverables: document.getElementById("project-deliverables"),
  fit: document.getElementById("project-fit"),
};

const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));

const briefDialog = document.getElementById("brief-dialog");
const briefForm = document.getElementById("brief-builder");
const preview = document.getElementById("brief-preview");
const sendBriefButton = document.getElementById("send-brief");
const copyBriefButton = document.getElementById("copy-brief");
const openBriefButtons = document.querySelectorAll("[data-open-brief]");
const closeBriefButton = document.querySelector("[data-close-brief]");

const defaultMessage = "Share your production goals here.";

function updateFeaturedProject(key) {
  const data = featuredProjects[key];
  if (!data) {
    return;
  }

  projectFields.type.textContent = data.type;
  projectFields.title.textContent = data.title;
  projectFields.summary.textContent = data.summary;
  projectFields.turnaround.textContent = data.turnaround;
  projectFields.deliverables.textContent = data.deliverables;
  projectFields.fit.textContent = data.fit;

  projectButtons.forEach((button) => {
    const isActive = button.dataset.project === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function getBriefText() {
  const formData = new FormData(briefForm);
  const projectType = formData.get("projectType") || "Brand film";
  const timeline = formData.get("timeline") || "ASAP";
  const budget = formData.get("budget") || "$5k - $10k";
  const message = (formData.get("message") || "").toString().trim() || defaultMessage;

  return `We need a ${projectType} with a timeline of ${timeline} and a budget around ${budget}.\nMessage: ${message}`;
}

function updateBriefPreview() {
  preview.textContent = getBriefText();
}

function launchEmail() {
  const subject = encodeURIComponent("FlyFilm project brief");
  const body = encodeURIComponent(getBriefText());
  window.location.href = `mailto:hello@flyfilmproductions.com?subject=${subject}&body=${body}`;
}

async function copyBriefToClipboard() {
  const text = getBriefText();

  try {
    await navigator.clipboard.writeText(text);
    copyBriefButton.textContent = "Copied";
    window.setTimeout(() => {
      copyBriefButton.textContent = "Copy summary";
    }, 1800);
  } catch (_error) {
    copyBriefButton.textContent = "Copy unavailable";
    window.setTimeout(() => {
      copyBriefButton.textContent = "Copy summary";
    }, 1800);
  }
}

function openBriefDialog() {
  if (!briefDialog.open) {
    briefDialog.showModal();
  }
}

function closeBriefDialog() {
  if (briefDialog.open) {
    briefDialog.close();
  }
}

function updateActiveNav(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const activeId = `#${entry.target.id}`;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === activeId);
    });
  });
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateFeaturedProject(button.dataset.project);
  });
});

openBriefButtons.forEach((button) => {
  button.addEventListener("click", openBriefDialog);
});

closeBriefButton?.addEventListener("click", closeBriefDialog);

briefDialog?.addEventListener("click", (event) => {
  const rect = briefDialog.getBoundingClientRect();
  const isInsideDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!isInsideDialog) {
    closeBriefDialog();
  }
});

briefForm?.addEventListener("input", updateBriefPreview);
sendBriefButton?.addEventListener("click", launchEmail);
copyBriefButton?.addEventListener("click", copyBriefToClipboard);

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(updateActiveNav, {
    threshold: 0.45,
  });

  sections.forEach((section) => observer.observe(section));
}

document.getElementById("current-year").textContent = String(new Date().getFullYear());
updateFeaturedProject("brand");
updateBriefPreview();
