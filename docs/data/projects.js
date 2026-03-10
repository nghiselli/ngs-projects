window.NGS_SITE_DATA = {
  "generatedAt": "2026-03-10T22:31:30+01:00",
  "totalProjects": 29,
  "statusCounts": {
    "Da pianificare": 7,
    "Pianificato": 2,
    "In corso": 10,
    "In pausa": 5,
    "In manutenzione": 1,
    "Completato": 3,
    "Archiviato": 1
  },
  "projects": [
    {
      "name": "cae-sentry-backend",
      "slug": "cae-sentry-backend",
      "status": "Completato",
      "statusRaw": "Completato",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 100,
      "progressText": "100%",
      "lastUpdate": "2023-03-09",
      "objective": "Realizzare e stabilizzare il backend di Sentry (ADS - Alarm Dissemination System) per la gestione della diffusione allarmi, integrazione CAP con AIS e orchestrazione plugin di comunicazione.",
      "readmePath": "readmes/cae-sentry-backend.md",
      "repositoryPath": "cae-sentry-backend",
      "latestDecision": {
        "date": "2023-10-11T09:00:00+01:00",
        "decision": "Consolidato pacchetto estensioni/finalizzazioni richieste da CAE",
        "reason": "Ridurre effort installativo e migliorare affidabilita operativa"
      }
    },
    {
      "name": "ocem.snmp.gateway",
      "slug": "ocem.snmp.gateway",
      "status": "In corso",
      "statusRaw": "In corso",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 55,
      "progressText": "55%",
      "lastUpdate": "2026-03-10",
      "objective": "Sviluppare il gateway SNMP che acquisisce dati da dispositivi SNMP e li pubblica su DDS, come base tecnica per la funzionalita SAO (System Architecture Overview) di Infinite.",
      "readmePath": "readmes/ocem.snmp.gateway.md",
      "repositoryPath": "ocem.snmp.gateway",
      "latestDecision": {
        "date": "2026-03-10T09:00:00+01:00",
        "decision": "Inserito gateway SNMP nel portfolio come iniziativa dedicata",
        "reason": "Rendere esplicita la base tecnica della feature SAO"
      }
    },
    {
      "name": "ocem.sao.mapgenerator",
      "slug": "ocem.sao.mapgenerator",
      "status": "In corso",
      "statusRaw": "In corso",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 55,
      "progressText": "55%",
      "lastUpdate": "2026-03-10",
      "objective": "Automatizzare la preparazione delle mappe per la funzionalita SAO (System Architecture Overview) tramite script Adobe Illustrator e template strutturati.",
      "readmePath": "readmes/ocem.sao.mapgenerator.md",
      "repositoryPath": "ocem.sao.mapgenerator",
      "latestDecision": {
        "date": "2026-03-10T09:00:00+01:00",
        "decision": "Inserito SAO MapGenerator nel portfolio come utility dedicata",
        "reason": "Evidenziare la pipeline di generazione mappe a supporto SAO"
      }
    },
    {
      "name": "ocem.plugin.dds",
      "slug": "ocem.plugin.dds",
      "status": "In corso",
      "statusRaw": "In corso",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 55,
      "progressText": "55%",
      "lastUpdate": "2026-03-10",
      "objective": "Mantenere e consolidare il plugin DDS condiviso usato come interfaccia tecnica verso il middleware Zettascale, per garantire comunicazione publish/subscribe uniforme in tutta la suite OCEM Infinite.",
      "readmePath": "readmes/ocem.plugin.dds.md",
      "repositoryPath": "ocem.plugin.dds",
      "latestDecision": {
        "date": "2026-03-10T09:00:00+01:00",
        "decision": "Inserito `ocem.plugin.dds` come progetto portfolio dedicato",
        "reason": "Rendere visibile il componente shared critico della suite"
      }
    },
    {
      "name": "ocem.modbus.simulator",
      "slug": "ocem.modbus.simulator",
      "status": "In corso",
      "statusRaw": "In corso",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 55,
      "progressText": "55%",
      "lastUpdate": "2026-03-10",
      "objective": "Mettere a disposizione un simulatore Modbus per validare integrazioni e test end-to-end con dispositivi di campo della famiglia CCR/FMCU/IO LOGIC.",
      "readmePath": "readmes/ocem.modbus.simulator.md",
      "repositoryPath": "ocem.modbus.simulator",
      "latestDecision": {
        "date": "2026-03-10T09:00:00+01:00",
        "decision": "Inserito simulatore Modbus nel portfolio come modulo attivo",
        "reason": "Tracciare chiaramente il supporto testing hardware-like"
      }
    },
    {
      "name": "ocem.infinite.proxy",
      "slug": "ocem.infinite.proxy",
      "status": "In pausa",
      "statusRaw": "In pausa",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 65,
      "progressText": "65%",
      "lastUpdate": "2026-03-10",
      "objective": "Fornire un modulo proxy di frontiera per consentire accesso remoto a OCEM Infinite attraverso segmenti di rete separati, con autenticazione e instradamento controllato.",
      "readmePath": "readmes/ocem.infinite.proxy.md",
      "repositoryPath": "ocem.infinite.proxy",
      "latestDecision": {
        "date": "2026-03-10T09:00:00+01:00",
        "decision": "Progetto marcato In pausa nel portfolio pur mantenendolo visibile",
        "reason": "Stato reale del piano rilasci e dipendenze di suite"
      }
    },
    {
      "name": "ocem.infinite.frontend",
      "slug": "ocem.infinite.frontend",
      "status": "In corso",
      "statusRaw": "In corso",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 55,
      "progressText": "55%",
      "lastUpdate": "2026-03-10",
      "objective": "Consolidare il frontend V2 di OCEM Infinite come suite di moduli UI dedicati a operation, amministrazione, logging e proxy login.",
      "readmePath": "readmes/ocem.infinite.frontend.md",
      "repositoryPath": "ocem.infinite.frontend",
      "latestDecision": {
        "date": "2026-03-10T09:00:00+01:00",
        "decision": "Inserita suite frontend OCEM Infinite nel portfolio come progetto in corso",
        "reason": "Tracciare chiaramente il perimetro multi-modulo del prodotto"
      }
    },
    {
      "name": "ocem.infinite.configurator",
      "slug": "ocem.infinite.configurator",
      "status": "Archiviato",
      "statusRaw": "Archiviato",
      "priority": "Bassa",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 50,
      "progressText": "50%",
      "lastUpdate": "2024-03-10",
      "objective": "Sviluppare il frontend configurator dedicato per guidare configurazione e setup del sistema OCEM Infinite con workflow operativi semplificati.",
      "readmePath": "readmes/ocem.infinite.configurator.md",
      "repositoryPath": "ocem.infinite.configurator",
      "latestDecision": {
        "date": "2026-03-10T09:00:00+01:00",
        "decision": "Progetto configurator incluso nel portfolio come In corso",
        "reason": "Evidenziare il ruolo del modulo nel setup dell'ecosistema Infinite"
      }
    },
    {
      "name": "ocem.ilcms.simulator",
      "slug": "ocem.ilcms.simulator",
      "status": "In corso",
      "statusRaw": "In corso",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 55,
      "progressText": "55%",
      "lastUpdate": "2026-03-10",
      "objective": "Fornire un simulatore ILCMS per dispositivi ECB e sensori, utile a sviluppo, test funzionali e validazione integrazioni della suite OCEM Infinite.",
      "readmePath": "readmes/ocem.ilcms.simulator.md",
      "repositoryPath": "ocem.ilcms.simulator",
      "latestDecision": {
        "date": "2026-03-10T09:00:00+01:00",
        "decision": "Inserito simulatore ILCMS nel portfolio della suite Infinite",
        "reason": "Rendere visibile la componente test fondamentale"
      }
    },
    {
      "name": "ngs-userManual-creator",
      "slug": "ngs-usermanual-creator",
      "status": "Da pianificare",
      "statusRaw": "Da Pianificare",
      "priority": "Bassa",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 0,
      "progressText": "0%",
      "lastUpdate": "N/D",
      "objective": "Sarebbe comodo e interessante avere un progetto che aiuti l'utente nella generazione di manuali d'uso per i clienti. I manuali sarebbero una variante di un manuale di prodotto completo. Il sistema, oltre capire quali ...",
      "readmePath": "readmes/ngs-usermanual-creator.md",
      "repositoryPath": "ngs-userManual-creator",
      "latestDecision": null
    },
    {
      "name": "ngs-time-utilities-cli",
      "slug": "ngs-time-utilities-cli",
      "status": "In corso",
      "statusRaw": "In corso avanzato (MVP operativo, versione corrente 1.3.0)",
      "priority": "Media",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 55,
      "progressText": "55%",
      "lastUpdate": "2026-03-09",
      "objective": "Costruire una CLI operativa per integrare Asana e Clockify in modalita veloce/scriptabile, e usarla come progetto pilota per definire un template riusabile di interactive CLI NGS. Documenti principali di riferimento: ...",
      "readmePath": "readmes/ngs-time-utilities-cli.md",
      "repositoryPath": "ngs-time-utilities-cli",
      "latestDecision": {
        "date": "2026-03-09T09:00:00+01:00",
        "decision": "Posizionare `ngs-time-utilities-cli` come PoC per template CLI riusabile",
        "reason": "Abilitare riuso su `infinite-installer-cli` e progetti futuri"
      }
    },
    {
      "name": "ngs-time-utilities",
      "slug": "ngs-time-utilities",
      "status": "In corso",
      "statusRaw": "In corso avanzato (v2.6.0 stabile, roadmap v3.0.0 avviata)",
      "priority": "Media",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 55,
      "progressText": "55%",
      "lastUpdate": "2026-03-09",
      "objective": "Consolidare una piattaforma operativa per monitoraggio giornate/ore, integrazione Asana-Clockify e reporting utile al lavoro quotidiano, con potenziale di upsell verso il cliente principale. Documenti principali di ri...",
      "readmePath": "readmes/ngs-time-utilities.md",
      "repositoryPath": "ngs-time-utilities",
      "latestDecision": {
        "date": "2026-03-09T09:00:00+01:00",
        "decision": "Priorita a hardening/test prima del refactor strutturale v3",
        "reason": "Ridurre regressioni sui flussi gia stabili"
      }
    },
    {
      "name": "ngs-ticketing-system",
      "slug": "ngs-ticketing-system",
      "status": "Da pianificare",
      "statusRaw": "Da Pianificare",
      "priority": "Bassa",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 0,
      "progressText": "0%",
      "lastUpdate": "N/D",
      "objective": "Breve descrizione del risultato che vuoi ottenere.",
      "readmePath": "readmes/ngs-ticketing-system.md",
      "repositoryPath": "ngs-ticketing-system",
      "latestDecision": null
    },
    {
      "name": "ocem.snmp.simulator",
      "slug": "ocem.snmp.simulator",
      "status": "In corso",
      "statusRaw": "In corso",
      "priority": "Alta",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 90,
      "progressText": "90%",
      "lastUpdate": "2026-03-10",
      "objective": "Costruire un simulatore SNMP affidabile e configurabile per emulare device INFINITE (UPS, host, switch, NTP, printer), supportare test di integrazione senza hardware reale, e permettere verifica visuale/runtime del co...",
      "readmePath": "readmes/ocem.snmp.simulator.md",
      "repositoryPath": "ocem.snmp.simulator",
      "latestDecision": {
        "date": "2026-03-10T09:05:00+01:00",
        "decision": "Chiusa release `v1.7.0` su `main` con merge branch `release-1.7.0`",
        "reason": "Consolidare baseline Management API e preparare publish del tag remoto"
      }
    },
    {
      "name": "ngs-projects",
      "slug": "ngs-projects",
      "status": "In manutenzione",
      "statusRaw": "In manutenzione",
      "priority": "Alta",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 95,
      "progressText": "95%",
      "lastUpdate": "2026-03-10",
      "objective": "Mantenere e far evolvere il portfolio operativo dei progetti NGS con board di stato, pagine progetto generate dai README e changelog aggiornamenti.",
      "readmePath": "readmes/ngs-projects.md",
      "repositoryPath": "ngs-projects",
      "latestDecision": {
        "date": "2026-03-10T09:01:00+01:00",
        "decision": "Mostrare tutti gli aggiornamenti senza limite hardcoded",
        "reason": "Aumentare visibilita storica nel tab Aggiornamenti"
      }
    },
    {
      "name": "ngs-infinite-utilities",
      "slug": "ngs-infinite-utilities",
      "status": "In corso",
      "statusRaw": "In corso",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 55,
      "progressText": "55%",
      "lastUpdate": "2026-03-10",
      "objective": "Raccogliere utility operative trasversali per risolvere problemi ricorrenti nello sviluppo, testing e supporto della suite OCEM Infinite.",
      "readmePath": "readmes/ngs-infinite-utilities.md",
      "repositoryPath": "ngs-infinite-utilities",
      "latestDecision": {
        "date": "2026-03-10T09:00:00+01:00",
        "decision": "Inserito `ngs-infinite-utilities` nel portfolio",
        "reason": "Rendere visibile il toolkit operativo trasversale per Infinite"
      }
    },
    {
      "name": "ngs-documentation-utilities",
      "slug": "ngs-documentation-utilities",
      "status": "In pausa",
      "statusRaw": "In pausa (base completa, da consolidare su piu progetti target)",
      "priority": "Bassa",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 65,
      "progressText": "65%",
      "lastUpdate": "2026-03-09",
      "objective": "Costruire una pipeline automatica per generare documentazione tecnica enterprise da codebase C# usando Roslyn + LLM locali + DocFX, con output navigabile e deployabile. Documenti principali di riferimento: | Documento...",
      "readmePath": "readmes/ngs-documentation-utilities.md",
      "repositoryPath": "ngs-documentation-utilities",
      "latestDecision": {
        "date": "2026-03-09T09:01:00+01:00",
        "decision": "README progetto-idee allineato a stato reale implementazione",
        "reason": "Tenere roadmap e backlog coerenti con il repository tecnico"
      }
    },
    {
      "name": "ngs-cli-template",
      "slug": "ngs-cli-template",
      "status": "Pianificato",
      "statusRaw": "Pianificato",
      "priority": "Media",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 20,
      "progressText": "20%",
      "lastUpdate": "N/D",
      "objective": "Breve descrizione del risultato che vuoi ottenere.",
      "readmePath": "readmes/ngs-cli-template.md",
      "repositoryPath": "ngs-cli-template",
      "latestDecision": null
    },
    {
      "name": "ngs-budget-utilities",
      "slug": "ngs-budget-utilities",
      "status": "In pausa",
      "statusRaw": "In pausa (foundation completata, sviluppo feature core in avvio)",
      "priority": "Media",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 5,
      "progressText": "5%",
      "lastUpdate": "2026-03-09",
      "objective": "Costruire un personal finance monitor semplice ma robusto per uso individuale, con import da fonti eterogenee, categorizzazione assistita e report utili per decisioni mensili/annuali. Documenti principali di riferimen...",
      "readmePath": "readmes/ngs-budget-utilities.md",
      "repositoryPath": "ngs-budget-utilities",
      "latestDecision": {
        "date": "2026-03-09T09:00:00+01:00",
        "decision": "Priorita su feature core M1/M2/M3 prima di analytics avanzate",
        "reason": "Consegnare rapidamente valore pratico nel flusso quotidiano"
      }
    },
    {
      "name": "ngs-authentication",
      "slug": "ngs-authentication",
      "status": "In pausa",
      "statusRaw": "In pausa (PoC parziale disponibile in ngs-budget-utilities)",
      "priority": "Alta",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 45,
      "progressText": "45%",
      "lastUpdate": "2026-03-09",
      "objective": "Costruire un layer di autenticazione riusabile per i progetti NGS, con due direzioni evolutive: - modulo condiviso riusabile (NuGet privato o git submodule/template); - eventuale authentication server centralizzato pe...",
      "readmePath": "readmes/ngs-authentication.md",
      "repositoryPath": "ngs-authentication",
      "latestDecision": {
        "date": "2026-03-09T09:01:00+01:00",
        "decision": "Strategia in due fasi: modulo riusabile prima, auth server dopo",
        "reason": "Ridurre rischio e consegnare valore prima"
      }
    },
    {
      "name": "ngp-campusWorkflow-platform",
      "slug": "ngp-campusworkflow-platform",
      "status": "Da pianificare",
      "statusRaw": "Da pianificare",
      "priority": "Media",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 0,
      "progressText": "0%",
      "lastUpdate": "N/D",
      "objective": "Breve descrizione del risultato che vuoi ottenere.",
      "readmePath": "readmes/ngp-campusworkflow-platform.md",
      "repositoryPath": "ngp-campusWorkflow-platform",
      "latestDecision": null
    },
    {
      "name": "infinte-automated-testing-tool",
      "slug": "infinte-automated-testing-tool",
      "status": "Da pianificare",
      "statusRaw": "Da pianificare",
      "priority": "Bassa",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 0,
      "progressText": "0%",
      "lastUpdate": "N/D",
      "objective": "Breve descrizione del risultato che vuoi ottenere.",
      "readmePath": "readmes/infinte-automated-testing-tool.md",
      "repositoryPath": "infinte-automated-testing-tool",
      "latestDecision": null
    },
    {
      "name": "infinite-unified-simulator",
      "slug": "infinite-unified-simulator",
      "status": "Da pianificare",
      "statusRaw": "Da pianificare",
      "priority": "Bassa",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 0,
      "progressText": "0%",
      "lastUpdate": "N/D",
      "objective": "Breve descrizione del risultato che vuoi ottenere.",
      "readmePath": "readmes/infinite-unified-simulator.md",
      "repositoryPath": "infinite-unified-simulator",
      "latestDecision": null
    },
    {
      "name": "infinite-installer-cli",
      "slug": "infinite-installer-cli",
      "status": "Pianificato",
      "statusRaw": "Pianificato",
      "priority": "Media",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 20,
      "progressText": "20%",
      "lastUpdate": "2026-03-08",
      "objective": "Creare una CLI interattiva per installazione/manutenzione INFINITE, duale rispetto al wizard principale, con UX a menu e comandi batch per automazione.",
      "readmePath": "readmes/infinite-installer-cli.md",
      "repositoryPath": "infinite-installer-cli",
      "latestDecision": {
        "date": "2026-03-08T09:01:00+01:00",
        "decision": "Avvio posticipato finche non e pronto il template da `ngs-time-utilities-cli`",
        "reason": "Ridurre rischio e tempi di bootstrap"
      }
    },
    {
      "name": "infinite-installer",
      "slug": "infinite-installer",
      "status": "In pausa",
      "statusRaw": "In Pausa (implementazione PowerShell avanzata; distribuzione in ridefinizione con wrapper .NET 10)",
      "priority": "Media",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 65,
      "progressText": "65%",
      "lastUpdate": "2026-03-08",
      "objective": "Automatizzare in modo affidabile l'installazione di OCEM INFINITE su macchine target Windows, riducendo tempi, errori manuali e variabilita tra installazioni, tramite orchestrazione modulare e distribuzione controllata.",
      "readmePath": "readmes/infinite-installer.md",
      "repositoryPath": "infinite-installer",
      "latestDecision": {
        "date": "2026-03-08T09:01:00+01:00",
        "decision": "Progetto CLI separato mantenuto come stream duale (`infinite-installer-cli`)",
        "reason": "Distinguere percorso GUI/wrapper da UX CLI interattiva"
      }
    },
    {
      "name": "infinite-digital-twin",
      "slug": "infinite-digital-twin",
      "status": "Da pianificare",
      "statusRaw": "Da Pianificare",
      "priority": "Bassa",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 0,
      "progressText": "0%",
      "lastUpdate": "N/D",
      "objective": "Breve descrizione del risultato che vuoi ottenere.",
      "readmePath": "readmes/infinite-digital-twin.md",
      "repositoryPath": "infinite-digital-twin",
      "latestDecision": null
    },
    {
      "name": "cae-sentry-frontend",
      "slug": "cae-sentry-frontend",
      "status": "Completato",
      "statusRaw": "Completato",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 100,
      "progressText": "100%",
      "lastUpdate": "2023-03-09",
      "objective": "Fornire l'interfaccia web di Sentry per configurazione e operativita ADS, rendendo disponibili workflow di gestione allarmi, plugin, utenti e report in modo usabile e coerente con il contesto applicativo CAE.",
      "readmePath": "readmes/cae-sentry-frontend.md",
      "repositoryPath": "cae-sentry-frontend",
      "latestDecision": {
        "date": "2023-10-11T09:00:00+01:00",
        "decision": "Prioritizzate estensioni sicurezza e semplificazione installazioni",
        "reason": "Rispondere ai feedback dei clienti e alla compliance richiesta"
      }
    },
    {
      "name": "ngs-outlook2notion-syncronizer",
      "slug": "ngs-outlook2notion-syncronizer",
      "status": "Da pianificare",
      "statusRaw": "Da Pianificare",
      "priority": "Bassa",
      "projectType": "Personale",
      "includeInPortfolio": "Si",
      "progressPercent": 0,
      "progressText": "0%",
      "lastUpdate": "N/D",
      "objective": "Breve descrizione del risultato che vuoi ottenere.",
      "readmePath": "readmes/ngs-outlook2notion-syncronizer.md",
      "repositoryPath": "ngs-outlook2notion-syncronizer",
      "latestDecision": null
    },
    {
      "name": "siboni-frontend",
      "slug": "siboni-frontend",
      "status": "Completato",
      "statusRaw": "Completato",
      "priority": "Alta",
      "projectType": "Cliente",
      "includeInPortfolio": "Si",
      "progressPercent": 100,
      "progressText": "100%",
      "lastUpdate": "2024-03-09",
      "objective": "Sviluppare il frontend del MES Siboni con interfacce dedicate ai diversi contesti operativi (manager/tablet), garantendo una UX coerente con i processi di produzione e gestione.",
      "readmePath": "readmes/siboni-frontend.md",
      "repositoryPath": "siboni-frontend",
      "latestDecision": {
        "date": "2024-03-09T09:00:00+01:00",
        "decision": "Classificato progetto Siboni frontend come completato nel portfolio NGS",
        "reason": "Uniformare monitoraggio e report dei progetti cliente"
      }
    }
  ],
  "updates": [
    {
      "date": "2026-03-10T09:05:00+01:00",
      "project": "ocem.snmp.simulator",
      "slug": "ocem.snmp.simulator",
      "status": "In corso",
      "summary": "Chiusa release `v1.7.0` su `main` con merge branch `release-1.7.0`",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:01:00+01:00",
      "project": "ngs-projects",
      "slug": "ngs-projects",
      "status": "In manutenzione",
      "summary": "Mostrare tutti gli aggiornamenti senza limite hardcoded",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:00:00+01:00",
      "project": "ngs-infinite-utilities",
      "slug": "ngs-infinite-utilities",
      "status": "In corso",
      "summary": "Inserito `ngs-infinite-utilities` nel portfolio",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:00:00+01:00",
      "project": "ocem.ilcms.simulator",
      "slug": "ocem.ilcms.simulator",
      "status": "In corso",
      "summary": "Inserito simulatore ILCMS nel portfolio della suite Infinite",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:00:00+01:00",
      "project": "ocem.infinite.configurator",
      "slug": "ocem.infinite.configurator",
      "status": "Archiviato",
      "summary": "Progetto configurator incluso nel portfolio come In corso",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:00:00+01:00",
      "project": "ocem.infinite.frontend",
      "slug": "ocem.infinite.frontend",
      "status": "In corso",
      "summary": "Inserita suite frontend OCEM Infinite nel portfolio come progetto in corso",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:00:00+01:00",
      "project": "ocem.infinite.proxy",
      "slug": "ocem.infinite.proxy",
      "status": "In pausa",
      "summary": "Progetto marcato In pausa nel portfolio pur mantenendolo visibile",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:00:00+01:00",
      "project": "ocem.modbus.simulator",
      "slug": "ocem.modbus.simulator",
      "status": "In corso",
      "summary": "Inserito simulatore Modbus nel portfolio come modulo attivo",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:00:00+01:00",
      "project": "ocem.plugin.dds",
      "slug": "ocem.plugin.dds",
      "status": "In corso",
      "summary": "Inserito `ocem.plugin.dds` come progetto portfolio dedicato",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:00:00+01:00",
      "project": "ocem.sao.mapgenerator",
      "slug": "ocem.sao.mapgenerator",
      "status": "In corso",
      "summary": "Inserito SAO MapGenerator nel portfolio come utility dedicata",
      "source": "decision-log"
    },
    {
      "date": "2026-03-10T09:00:00+01:00",
      "project": "ocem.snmp.gateway",
      "slug": "ocem.snmp.gateway",
      "status": "In corso",
      "summary": "Inserito gateway SNMP nel portfolio come iniziativa dedicata",
      "source": "decision-log"
    },
    {
      "date": "2026-03-09T09:01:00+01:00",
      "project": "ngs-authentication",
      "slug": "ngs-authentication",
      "status": "In pausa",
      "summary": "Strategia in due fasi: modulo riusabile prima, auth server dopo",
      "source": "decision-log"
    },
    {
      "date": "2026-03-09T09:01:00+01:00",
      "project": "ngs-documentation-utilities",
      "slug": "ngs-documentation-utilities",
      "status": "In pausa",
      "summary": "README progetto-idee allineato a stato reale implementazione",
      "source": "decision-log"
    },
    {
      "date": "2026-03-09T09:00:00+01:00",
      "project": "ngs-budget-utilities",
      "slug": "ngs-budget-utilities",
      "status": "In pausa",
      "summary": "Priorita su feature core M1/M2/M3 prima di analytics avanzate",
      "source": "decision-log"
    },
    {
      "date": "2026-03-09T09:00:00+01:00",
      "project": "ngs-time-utilities",
      "slug": "ngs-time-utilities",
      "status": "In corso",
      "summary": "Priorita a hardening/test prima del refactor strutturale v3",
      "source": "decision-log"
    },
    {
      "date": "2026-03-09T09:00:00+01:00",
      "project": "ngs-time-utilities-cli",
      "slug": "ngs-time-utilities-cli",
      "status": "In corso",
      "summary": "Posizionare `ngs-time-utilities-cli` come PoC per template CLI riusabile",
      "source": "decision-log"
    },
    {
      "date": "2026-03-08T09:01:00+01:00",
      "project": "infinite-installer",
      "slug": "infinite-installer",
      "status": "In pausa",
      "summary": "Progetto CLI separato mantenuto come stream duale (`infinite-installer-cli`)",
      "source": "decision-log"
    },
    {
      "date": "2026-03-08T09:01:00+01:00",
      "project": "infinite-installer-cli",
      "slug": "infinite-installer-cli",
      "status": "Pianificato",
      "summary": "Avvio posticipato finche non e pronto il template da `ngs-time-utilities-cli`",
      "source": "decision-log"
    },
    {
      "date": "2024-03-09T09:00:00+01:00",
      "project": "siboni-frontend",
      "slug": "siboni-frontend",
      "status": "Completato",
      "summary": "Classificato progetto Siboni frontend come completato nel portfolio NGS",
      "source": "decision-log"
    },
    {
      "date": "2023-10-11T09:00:00+01:00",
      "project": "cae-sentry-backend",
      "slug": "cae-sentry-backend",
      "status": "Completato",
      "summary": "Consolidato pacchetto estensioni/finalizzazioni richieste da CAE",
      "source": "decision-log"
    },
    {
      "date": "2023-10-11T09:00:00+01:00",
      "project": "cae-sentry-frontend",
      "slug": "cae-sentry-frontend",
      "status": "Completato",
      "summary": "Prioritizzate estensioni sicurezza e semplificazione installazioni",
      "source": "decision-log"
    },
    {
      "date": "N/D",
      "project": "infinite-digital-twin",
      "slug": "infinite-digital-twin",
      "status": "Da pianificare",
      "summary": "Snapshot: Da Pianificare",
      "source": "snapshot"
    },
    {
      "date": "N/D",
      "project": "infinite-unified-simulator",
      "slug": "infinite-unified-simulator",
      "status": "Da pianificare",
      "summary": "Snapshot: Da pianificare",
      "source": "snapshot"
    },
    {
      "date": "N/D",
      "project": "infinte-automated-testing-tool",
      "slug": "infinte-automated-testing-tool",
      "status": "Da pianificare",
      "summary": "Snapshot: Da pianificare",
      "source": "snapshot"
    },
    {
      "date": "N/D",
      "project": "ngp-campusWorkflow-platform",
      "slug": "ngp-campusworkflow-platform",
      "status": "Da pianificare",
      "summary": "Snapshot: Da pianificare",
      "source": "snapshot"
    },
    {
      "date": "N/D",
      "project": "ngs-cli-template",
      "slug": "ngs-cli-template",
      "status": "Pianificato",
      "summary": "Snapshot: Pianificato",
      "source": "snapshot"
    },
    {
      "date": "N/D",
      "project": "ngs-outlook2notion-syncronizer",
      "slug": "ngs-outlook2notion-syncronizer",
      "status": "Da pianificare",
      "summary": "Snapshot: Da Pianificare",
      "source": "snapshot"
    },
    {
      "date": "N/D",
      "project": "ngs-ticketing-system",
      "slug": "ngs-ticketing-system",
      "status": "Da pianificare",
      "summary": "Snapshot: Da Pianificare",
      "source": "snapshot"
    },
    {
      "date": "N/D",
      "project": "ngs-userManual-creator",
      "slug": "ngs-usermanual-creator",
      "status": "Da pianificare",
      "summary": "Snapshot: Da Pianificare",
      "source": "snapshot"
    }
  ]
};
