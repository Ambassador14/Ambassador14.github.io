(function () {
  "use strict";

  var DATA_URL = "schools/schools.json";
  var IMG_BASE = "schools/";

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === "text") node.textContent = attrs[key];
      else if (key === "class") node.className = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) { node.appendChild(child); });
    return node;
  }

  function firstYear(years) {
    var match = String(years || "").match(/\d{4}/);
    return match ? match[0] : "";
  }

  function yearsLabel(years) {
    return String(years || "").replace(/-expected\s*/i, "–").replace(/(\d{4})-(\d{4})/, "$1–$2");
  }

  function siteUrl(website) {
    if (!website) return "";
    return /^https?:\/\//i.test(website) ? website : "https://" + website;
  }

  function badgeNode(school, alt) {
    if (school.badge) {
      return el("img", { src: IMG_BASE + school.badge, alt: alt, loading: "lazy" });
    }
    return el("div", { class: "initials", role: "img", "aria-label": alt, text: school.initials || school.short_name.slice(0, 3).toUpperCase() });
  }

  /* ---------- Lightbox ---------- */

  var lb = {
    dialog: document.getElementById("lightbox"),
    img: document.getElementById("lb-img"),
    cap: document.getElementById("lb-cap"),
    prev: document.getElementById("lb-prev"),
    next: document.getElementById("lb-next"),
    close: document.getElementById("lb-close"),
    photos: [],
    index: 0,
    opener: null
  };

  function showPhoto() {
    var photo = lb.photos[lb.index];
    lb.img.src = IMG_BASE + photo.src;
    lb.img.alt = photo.alt;
    lb.cap.textContent = photo.alt;
    var many = lb.photos.length > 1;
    lb.prev.hidden = !many;
    lb.next.hidden = !many;
  }

  function openLightbox(photos, index, opener) {
    lb.photos = photos;
    lb.index = index;
    lb.opener = opener;
    showPhoto();
    if (typeof lb.dialog.showModal === "function") lb.dialog.showModal();
    else lb.dialog.setAttribute("open", "");
  }

  function step(delta) {
    lb.index = (lb.index + delta + lb.photos.length) % lb.photos.length;
    showPhoto();
  }

  lb.close.addEventListener("click", function () { lb.dialog.close(); });
  lb.prev.addEventListener("click", function () { step(-1); });
  lb.next.addEventListener("click", function () { step(1); });
  lb.dialog.addEventListener("click", function (event) { if (event.target === lb.dialog) lb.dialog.close(); });
  lb.dialog.addEventListener("close", function () { if (lb.opener) lb.opener.focus(); });
  lb.dialog.addEventListener("keydown", function (event) {
    if (lb.photos.length < 2) return;
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });

  /* ---------- Rendering ---------- */

  function renderBadgeLink(school) {
    var link = el("a", { class: "badge-link", href: "#" + school.id, style: "--accent:" + school.accent }, [
      el("span", { class: "badge-link__plate" }, [badgeNode(school, "")]),
      el("span", { text: school.short_name }),
      el("span", { class: "badge-link__year", text: firstYear(school.years) })
    ]);
    link.setAttribute("aria-label", school.name + ", " + yearsLabel(school.years));
    return link;
  }

  function renderSchool(school) {
    var textChildren = [
      el("h2", { text: school.name }),
      el("p", { class: "school__level", text: school.grades ? school.level_label + ", " + school.grades : school.level_label })
    ];
    if (school.certificate) textChildren.push(el("p", { class: "school__cert", text: school.certificate }));
    if (school.motto) textChildren.push(el("p", { class: "school__motto", text: "\u201C" + school.motto + "\u201D" }));
    if (school.website) {
      textChildren.push(el("a", { class: "school__link", href: siteUrl(school.website), target: "_blank", rel: "noopener", text: "Visit the school website" }));
    }

    var head = el("div", { class: "school__head" }, [
      el("div", { class: "plate" }, [badgeNode(school, school.name + " badge")]),
      el("div", { class: "school__text" }, textChildren)
    ]);

    var inner = el("div", { class: "school__inner" }, [
      el("p", { class: "school__years", text: yearsLabel(school.years) }),
      head
    ]);

    if (school.photos && school.photos.length) {
      var gallery = el("div", { class: "gallery", role: "list" });
      school.photos.forEach(function (photo, index) {
        var button = el("button", { class: "gallery__item", type: "button", role: "listitem", "aria-label": "View photo: " + photo.alt }, [
          el("img", { src: IMG_BASE + photo.src, alt: photo.alt, loading: "lazy" })
        ]);
        button.addEventListener("click", function () { openLightbox(school.photos, index, button); });
        gallery.appendChild(button);
      });
      inner.appendChild(gallery);
    }

    return el("section", { class: "school", id: school.id, style: "--accent:" + school.accent, "aria-labelledby": school.id + "-title" }, [inner]);
  }

  function show(id) { document.getElementById(id).hidden = false; }

  function renderExperience(items) {
    var body = document.getElementById("experience-body");
    items.forEach(function (item) {
      var right = [el("p", { class: "entry__role", text: item.role })];
      if (item.organization) right.push(el("p", { class: "entry__org", text: item.organization }));
      if (item.description) right.push(el("p", { class: "entry__text", text: item.description }));
      body.appendChild(el("div", { class: "entry" }, [
        el("p", { class: "entry__years", text: item.years || "" }),
        el("div", {}, right)
      ]));
    });
  }

  function renderProjects(items) {
    var body = document.getElementById("projects-body");
    items.forEach(function (item) {
      var right = [el("p", { class: "entry__role", text: item.name })];
      if (item.description) right.push(el("p", { class: "entry__text", text: item.description }));
      if (item.url) right.push(el("a", { class: "entry__link", href: item.url, target: "_blank", rel: "noopener", text: "View project" }));
      body.appendChild(el("div", { class: "entry" }, [
        el("p", { class: "entry__years", text: item.year || "" }),
        el("div", {}, right)
      ]));
    });
  }

  function render(data) {
    var owner = data.owner || {};
    document.getElementById("status").hidden = true;
    if (owner.short_name) document.getElementById("name").textContent = owner.short_name;
    document.getElementById("title").textContent = owner.title || "";
    document.getElementById("footer-name").textContent = [owner.name, owner.location].filter(Boolean).join(", ");

    if (owner.photo) {
      document.getElementById("hero-photo-img").src = owner.photo;
      document.getElementById("hero-photo-img").alt = owner.name || "";
      document.getElementById("hero-photo").hidden = false;
    }

    if (owner.about && owner.about.length) {
      var about = document.getElementById("about-body");
      owner.about.forEach(function (text) { about.appendChild(el("p", { text: text })); });
      show("about");
    }

    if (data.experience && data.experience.length) {
      renderExperience(data.experience);
      show("experience");
    }

    if (data.projects && data.projects.length) {
      renderProjects(data.projects);
      show("projects");
      document.getElementById("nav-projects").hidden = false;
    }

    if (data.skills && data.skills.length) {
      var chips = el("ul", { class: "chips" });
      data.skills.forEach(function (skill) { chips.appendChild(el("li", { text: skill })); });
      document.getElementById("skills-body").appendChild(chips);
      show("skills");
      document.getElementById("nav-skills").hidden = false;
    }

    var badges = document.getElementById("badges");
    var schoolsBox = document.getElementById("schools");
    data.schools.forEach(function (school) {
      badges.appendChild(renderBadgeLink(school));
      var section = renderSchool(school);
      section.querySelector("h2").id = school.id + "-title";
      schoolsBox.appendChild(section);
    });
    show("education");

    if ((data.languages && data.languages.length) || (data.interests && data.interests.length)) {
      var langs = document.getElementById("languages-body");
      (data.languages || []).forEach(function (lang) {
        langs.appendChild(el("dt", { text: lang.name }));
        langs.appendChild(el("dd", { text: lang.level }));
      });
      var interests = document.getElementById("interests-body");
      (data.interests || []).forEach(function (item) { interests.appendChild(el("li", { text: item })); });
      show("languages");
    }

    if (owner.email || owner.phone || owner.location) {
      document.getElementById("contact-location").textContent = owner.location ? "Based in " + owner.location + "." : "";
      var mail = document.getElementById("contact-mail");
      if (owner.email) {
        mail.href = "mailto:" + owner.email;
        mail.textContent = owner.email;
      } else {
        mail.hidden = true;
      }
      var phone = document.getElementById("contact-phone");
      if (owner.phone) {
        phone.href = "tel:" + (owner.phone_link || owner.phone.replace(/\s+/g, ""));
        phone.textContent = owner.phone;
        phone.hidden = false;
      }
      if (owner.details && owner.details.length) {
        var details = document.getElementById("contact-details");
        owner.details.forEach(function (item) {
          details.appendChild(el("dt", { text: item.label }));
          details.appendChild(el("dd", { text: item.value }));
        });
        details.hidden = false;
      }
      show("contact");
    }
  }

  fetch(DATA_URL)
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(render)
    .catch(function () {
      document.getElementById("status").textContent =
        "The school list couldn't be loaded. Open this page from GitHub Pages or a local web server (for example, run \"python3 -m http.server\" in this folder) instead of opening the file directly.";
    });
})();
