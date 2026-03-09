(() => {
  const STATUS_ORDER = ["Da iniziare", "In corso", "Completato"];

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

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  }

  async function loadData() {
    const response = await fetch("./data/projects.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Impossibile caricare data/projects.json (${response.status})`);
    }

    return response.json();
  }

  function toStatusBucket(status) {
    if (STATUS_ORDER.includes(status)) {
      return status;
    }

    return "Da iniziare";
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

  function renderStats(counts, total) {
    const host = document.getElementById("stats");
    if (!host) {
      return;
    }

    host.innerHTML = "";
    const config = [
      { label: "Totale", value: total },
      { label: "In corso", value: counts["In corso"] || 0 },
      { label: "Completati", value: counts["Completato"] || 0 }
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
    const grouped = {
      "Da iniziare": [],
      "In corso": [],
      Completato: []
    };

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
      const items = grouped[status];
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

        return [project.name, project.statusRaw, project.objective]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
      });

      const counts = {
        "Da iniziare": filtered.filter((p) => toStatusBucket(p.status) === "Da iniziare").length,
        "In corso": filtered.filter((p) => toStatusBucket(p.status) === "In corso").length,
        Completato: filtered.filter((p) => toStatusBucket(p.status) === "Completato").length
      };

      renderStats(counts, filtered.length);
      renderColumns(filtered);
      renderUpdates(Array.isArray(data.updates) ? data.updates : [], filtered.map((p) => p.slug));
    };

    if (searchInput) {
      searchInput.addEventListener("input", refresh);
    }

    refresh();
  }

  function renderSnapshot(project) {
    const host = document.getElementById("snapshot-list");
    if (!host) {
      return;
    }

    host.innerHTML = "";

    const entries = [
      { key: "Stato", value: project.statusRaw || project.status },
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
