console.log("script loaded");


document.addEventListener("DOMContentLoaded", () => {
  // ===== Award toggle (The Seed) =====
  const toggle = document.querySelector(".award-toggle");
  const box = document.querySelector(".award-photo");

  if (toggle && box) {
    const originalText = toggle.textContent.trim();

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      box.hidden = isOpen;
      toggle.textContent = isOpen ? originalText : "Hide ←";
    });
  }

  // ===== Lightbox (Photograph only) =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.querySelector(".lightbox-close");
  const photoLinks = document.querySelectorAll(".photo-grid a.photo-item");

  function openLightbox(src, altText = "") {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = altText;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  photoLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const img = a.querySelector("img");
      openLightbox(a.getAttribute("href"), img?.alt || "");
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ===== Video Lightbox (The Seed + GMC) =====
  const videoLb = document.getElementById("videoLightbox");
  const videoTitle = document.getElementById("videoTitle");
  const videoThumb = document.getElementById("videoThumb");
  const videoGo = document.getElementById("videoGo");
  const videoCta = document.getElementById("videoCta");
  const videoClose = document.querySelector(".video-close");
  const videoLinks = document.querySelectorAll("a.stills-link, a.still-item");

  function openVideoLightbox({ url, title, thumbSrc }) {
    if (!videoLb || !videoTitle || !videoThumb || !videoGo || !videoCta) return;

    videoTitle.textContent = title || "Watch";
    videoThumb.src = thumbSrc || "";
    videoThumb.alt = title || "Video thumbnail";
    videoGo.href = url;
    videoCta.href = url;

    videoLb.classList.add("is-open");
    videoLb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeVideoLightbox() {
    if (!videoLb || !videoThumb || !videoGo || !videoCta) return;

    videoLb.classList.remove("is-open");
    videoLb.setAttribute("aria-hidden", "true");
    videoThumb.src = "";
    videoGo.href = "#";
    videoCta.href = "#";
    document.body.style.overflow = "";
  }

videoLinks.forEach((a) => {
  a.addEventListener("click", (e) => {

    if (!videoLb) return;  // ✅ 이 줄 추가 (라이트박스 못찾으면 그냥 유튜브로 가게)

    e.preventDefault();


      const url = a.href;
      const nearestTitle = a.closest(".project")?.querySelector(".project-header h3")?.textContent?.trim();
      const img = a.querySelector("img");
      const alt = img?.alt?.trim();
      const title = nearestTitle ? (alt ? `${nearestTitle} — ${alt}` : nearestTitle) : (alt || "Watch");
      const thumbSrc = img?.getAttribute("src") || "";

      openVideoLightbox({ url, title, thumbSrc });
    });
  });

  videoClose?.addEventListener("click", closeVideoLightbox);

  videoLb?.addEventListener("click", (e) => {
    if (e.target === videoLb) closeVideoLightbox();
  });

  // ===== ESC 닫기: 둘 다 닫기 =====
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (lightbox?.classList.contains("is-open")) closeLightbox();
    if (videoLb?.classList.contains("is-open")) closeVideoLightbox();
  });
});
