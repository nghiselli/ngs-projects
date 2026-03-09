(() => {
  const STATUS_ORDER = ["Da pianificare", "Pianificato", "In corso", "In pausa", "Completato", "Archiviato"];

  const DEFAULT_BRAND = {
    companyName: "Nicola Ghiselli Solutions",
    tagline: "Project portfolio",
    logoPath: "./assets/ngs-mark.svg",
    website: "",
    github: "https://github.com/nghiselli",
    email: "",
    cellulare: "",
    sede: "",
    piva: "",
    codiceDestinatario: "",
    footerNote: ""
  };

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  }

  function formatDate(value) {
    if (!value || value === "N/D") {
      return "N/D";
    }

    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      return parsed.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    }

    return value;
  }

  function getBrandData() {
    const runtime = window.NGS_BRAND && typeof window.NGS_BRAND === "object" ? window.NGS_BRAND : {};
    return {
      ...DEFAULT_BRAND,
      ...runtime
    };
  }

  function appendFooterLink(host, label, href) {
    if (!host || !href) {
      return;
    }

    const link = document.createElement("a");
    link.className = "footer-link";
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    host.appendChild(link);
  }

  function appendFooterText(host, label, value) {
    if (!host || !value) {
      return;
    }

    const item = document.createElement("span");
    item.className = "footer-item";
    item.textContent = `${label}: ${value}`;
    host.appendChild(item);
  }

  function applyBrand() {
    const brand = getBrandData();

    setText("brand-name", brand.companyName || DEFAULT_BRAND.companyName);
    setText("brand-tagline", brand.tagline || DEFAULT_BRAND.tagline);

    const logo = document.getElementById("brand-logo");
    if (logo) {
      if (brand.logoPath) {
        logo.src = brand.logoPath;
        logo.alt = `Logo ${brand.companyName || "azienda"}`;
      } else {
        logo.style.display = "none";
      }
    }

    const footerCompany = document.getElementById("footer-company");
    if (footerCompany) {
      if (brand.footerNote) {
        footerCompany.textContent = `${brand.companyName} - ${brand.footerNote}`;
      } else {
        footerCompany.textContent = brand.companyName || DEFAULT_BRAND.companyName;
      }
    }

    const footerLinks = document.getElementById("footer-links");
    if (footerLinks) {
      footerLinks.innerHTML = "";
      appendFooterLink(footerLinks, "GitHub", brand.github);
      appendFooterLink(footerLinks, "Website", brand.website);

      if (brand.email) {
        appendFooterLink(footerLinks, "Email", `mailto:${brand.email}`);
      }

      if (brand.cellulare) {
        const normalizedPhone = String(brand.cellulare).replace(/\s+/g, "");
        appendFooterLink(footerLinks, "Cellulare", `tel:${normalizedPhone}`);
      }

      appendFooterText(footerLinks, "Sede", brand.sede);
      appendFooterText(footerLinks, "P.IVA", brand.piva);
      appendFooterText(footerLinks, "Cod. Dest.", brand.codiceDestinatario);
    }
  }

  async function loadData() {
    const embedded = window.NGS_SITE_DATA;
    if (embedded && Array.isArray(embedded.projects)) {
      return embedded;
    }

    try {
      const response = await fetch("./data/projects.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Impossibile caricare data/projects.json (${response.status})`);
      }

      return response.json();
    } catch (error) {
      if (window.location.protocol === "file:") {
        throw new Error("Dati bloccati in file://. Avvia un server locale su docs (es. python -m http.server 5500 -d docs).");
      }

      throw error;
    }
  }

  function toStatusBucket(status) {
    if (STATUS_ORDER.includes(status)) {
      return status;
    }

    return "Da pianificare";
  }

  function createCard(project) {
    const template = document.getElementById("project-card-template");
    const fragment = template.content.cloneNode(true);
    const link = fragment.querySelector("a");
    const title = fragment.querySelector("h3");
    const pill = fragment.querySelector(".pill");
    const status = fragment.querySelector(".project-status");
    const objective = fragment.querySelector(".project-objective");
    const date = fragment.querySelector(".project-date");

    link.href = `./project.html?slug=${encodeURIComponent(project.slug)}`;
    link.setAttribute("aria-label", `Apri il progetto ${project.name}`);
    title.textContent = project.name;
    pill.textContent = project.priority || "N/D";
    status.textContent = project.statusRaw || project.status;
    objective.textContent = project.objective || "Obiettivo non definito.";
    date.textContent = formatDate(project.lastUpdate);

    return fragment;
  }

  function createEmpty(message) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = message;
    return empty;
  }

  function setupTabs() {
    const tabs = Array.from(document.querySelectorAll("[data-tab-target]"));
    const panels = Array.from(document.querySelectorAll("[data-tab-panel]"));

    if (tabs.length === 0 || panels.length === 0) {
      return;
    }

    const activate = (target) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.tabTarget === target;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.tabIndex = isActive ? 0 : -1;
      });

      panels.forEach((panel) => {
        const isActive = panel.dataset.tabPanel === target;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activate(tab.dataset.tabTarget || ""));
    });

    const initial = tabs.find((tab) => tab.classList.contains("is-active"));
    activate(initial?.dataset.tabTarget || tabs[0].dataset.tabTarget || "");
  }

  function renderStats(counts, total) {
    const host = document.getElementById("stats");
    if (!host) {
      return;
    }

    host.innerHTML = "";
    const config = [
      { label: "Totale", value: total },
      { label: "Da pianificare", value: counts["Da pianificare"] || 0 },
      { label: "Pianificati", value: counts.Pianificato || 0 },
      { label: "In corso", value: counts["In corso"] || 0 },
      { label: "Completati", value: counts.Completato || 0 },
      { label: "Archiviati", value: counts.Archiviato || 0 }
    ];

    config.forEach((entry) => {
      const card = document.createElement("div");
      card.className = "stat-chip";
      const label = document.createElement("span");
      label.className = "stat-label";
      label.textContent = entry.label;
      const value = document.createElement("span");
      value.className = "stat-value";
      value.textContent = String(entry.value);
      card.append(label, value);
      host.appendChild(card);
    });
  }

  function renderColumns(projects) {
    const grouped = Object.fromEntries(STATUS_ORDER.map((status) => [status, []]));

    projects.forEach((project) => {
      grouped[toStatusBucket(project.status)].push(project);
    });

    STATUS_ORDER.forEach((status) => {
      const key = status.toLowerCase().replace(/\s+/g, "-");
      const holder = document.getElementById(`cards-${key}`);
      const count = document.getElementById(`count-${key}`);
      if (!holder || !count) {
        return;
      }

      holder.innerHTML = "";
      const items = grouped[status] || [];
      count.textContent = String(items.length);

      if (items.length === 0) {
        holder.appendChild(createEmpty("Nessun progetto in questo stato."));
        return;
      }

      items.sort((a, b) => a.name.localeCompare(b.name, "it"));
      items.forEach((project) => holder.appendChild(createCard(project)));
    });
  }

  function renderUpdates(updates, allowedSlugs) {
    const list = document.getElementById("updates-list");
    if (!list) {
      return;
    }

    list.innerHTML = "";

    const slugSet = new Set(allowedSlugs);
    const scoped = updates.filter((update) => slugSet.has(update.slug)).slice(0, 12);

    if (scoped.length === 0) {
      list.appendChild(createEmpty("Nessun aggiornamento per il filtro corrente."));
      return;
    }

    scoped.forEach((update) => {
      const item = document.createElement("li");
      item.className = "update-item";

      const date = document.createElement("span");
      date.className = "update-date";
      date.textContent = formatDate(update.date);

      const summary = document.createElement("p");
      summary.className = "update-summary";

      const link = document.createElement("a");
      link.href = `./project.html?slug=${encodeURIComponent(update.slug)}`;
      link.textContent = update.project;

      summary.append(link, document.createTextNode(` - ${update.summary}`));

      item.append(date, summary);
      list.appendChild(item);
    });
  }

  function applyIndexPage(data) {
    const generatedAt = new Date(data.generatedAt);
    const generatedText = Number.isNaN(generatedAt.getTime())
      ? "Ultima generazione non disponibile"
      : `Ultima generazione: ${generatedAt.toLocaleString("it-IT")}`;

    setText("generated-at", generatedText);

    const projects = Array.isArray(data.projects) ? data.projects : [];

    const searchInput = document.getElementById("search-input");
    const refresh = () => {
      const query = (searchInput?.value || "").trim().toLowerCase();
      const filtered = projects.filter((project) => {
        if (!query) {
          return true;
        }

        return [project.name, project.statusRaw, project.projectType, project.objective]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
      });

      const counts = Object.fromEntries(STATUS_ORDER.map((status) => [status, 0]));
      filtered.forEach((project) => {
        const bucket = toStatusBucket(project.status);
        counts[bucket] += 1;
      });

      renderStats(counts, filtered.length);
      renderColumns(filtered);
      renderUpdates(Array.isArray(data.updates) ? data.updates : [], filtered.map((p) => p.slug));
    };

    if (searchInput) {
      searchInput.addEventListener("input", refresh);
    }

    refresh();
    setupTabs();
  }

  function renderSnapshot(project) {
    const host = document.getElementById("snapshot-list");
    if (!host) {
      return;
    }

    host.innerHTML = "";

    const entries = [
      { key: "Stato", value: project.statusRaw || project.status },
      { key: "Tipo progetto", value: project.projectType || "Non specificato" },
      { key: "Priorita", value: project.priority || "N/D" },
      { key: "Ultimo aggiornamento", value: formatDate(project.lastUpdate) },
      { key: "Path repository", value: project.repositoryPath || "N/D" }
    ];

    entries.forEach((entry) => {
      const dt = document.createElement("dt");
      dt.textContent = entry.key;
      const dd = document.createElement("dd");
      dd.textContent = entry.value;
      host.append(dt, dd);
    });
  }

  function renderDecision(project) {
    const host = document.getElementById("latest-decision");
    if (!host) {
      return;
    }

    host.innerHTML = "";

    if (!project.latestDecision) {
      host.textContent = "Nessuna decisione recente disponibile.";
      return;
    }

    const date = document.createElement("span");
    date.className = "mono";
    date.textContent = formatDate(project.latestDecision.date);

    const summary = document.createElement("strong");
    summary.textContent = project.latestDecision.decision || "N/D";

    const reason = document.createElement("span");
    reason.textContent = project.latestDecision.reason || "N/D";

    host.append(date, summary, reason);
  }

  async function renderReadme(project) {
    const host = document.getElementById("readme-content");
    if (!host) {
      return;
    }

    const embeddedReadmes = window.NGS_READMES && typeof window.NGS_READMES === "object"
      ? window.NGS_READMES
      : null;

    if (embeddedReadmes && typeof embeddedReadmes[project.slug] === "string") {
      const markdown = embeddedReadmes[project.slug];
      if (typeof window.marked?.parse === "function") {
        host.innerHTML = window.marked.parse(markdown, { breaks: true, gfm: true });
      } else {
        host.textContent = markdown;
      }
      return;
    }

    try {
      const response = await fetch(`./${project.readmePath}`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`README non trovato (${response.status})`);
      }

      const markdown = await response.text();
      if (typeof window.marked?.parse === "function") {
        host.innerHTML = window.marked.parse(markdown, { breaks: true, gfm: true });
      } else {
        host.textContent = markdown;
      }
    } catch (error) {
      host.innerHTML = "";
      host.appendChild(createEmpty(error instanceof Error ? error.message : "Errore durante il caricamento README."));
    }
  }

  async function applyProjectPage(data) {
    const params = new URLSearchParams(window.location.search);
    const slug = (params.get("slug") || "").toLowerCase();
    const projects = Array.isArray(data.projects) ? data.projects : [];
    const project = projects.find((entry) => entry.slug === slug);

    if (!project) {
      setText("project-name", "Progetto non trovato");
      setText("project-meta", "Controlla il parametro slug nella URL.");
      const host = document.getElementById("readme-content");
      if (host) {
        host.innerHTML = "";
        host.appendChild(createEmpty("Nessun progetto corrisponde allo slug richiesto."));
      }
      return;
    }

    document.title = `${project.name} - NGS Projects`;

    setText("project-name", project.name);
    const metaHost = document.getElementById("project-meta");
    if (metaHost) {
      metaHost.innerHTML = "";
      [
        project.status || "N/D",
        `Tipo: ${project.projectType || "Non specificato"}`,
        `Priorita: ${project.priority || "N/D"}`,
        `Aggiornato: ${formatDate(project.lastUpdate)}`
      ].forEach((label) => {
        const pill = document.createElement("span");
        pill.className = "meta-pill";
        pill.textContent = label;
        metaHost.appendChild(pill);
      });
    }

    renderSnapshot(project);
    renderDecision(project);
    await renderReadme(project);
  }

  async function main() {
    applyBrand();

    try {
      const data = await loadData();
      const page = document.body.dataset.page;
      if (page === "project") {
        await applyProjectPage(data);
      } else {
        applyIndexPage(data);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Errore inatteso";
      const target = document.getElementById("generated-at") || document.body;
      target.textContent = `Errore caricamento dati: ${message}`;
    }
  }

  void main();
})();


