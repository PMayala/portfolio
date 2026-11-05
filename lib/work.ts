import type { T } from "@/i18n"
import type { MediaPath } from "@/lib/media"

export type Discipline = "design" | "engineering" | "multimedia"

export type Shot = {
  src: MediaPath
  alt: T
  caption?: T
  /** How the image is presented: in a browser window, a phone, or bare. */
  frame: "browser" | "phone" | "none"
  /** Address shown in the browser bar. */
  url?: string
}

export type Metric = { value: string; label: T }
export type Source = { label: string; href: string }

/** Extra evidence blocks drawn on the case page. */
export type Evidence = "figma-nexus" | "game-flow" | "game-compare" | "game-wireframes"

export type Project = {
  slug: string
  name: string
  /** case: full study. client: client work with its own page. archive: listed only. */
  kind: "case" | "client" | "archive"
  disciplines: Discipline[]
  year: string
  sector: T
  status: T
  summary: T
  role: T
  period?: T
  stack: string[]
  links: { label: T; href: string }[]
  /** Card and lead image. Omitted for internal work, which shows a diagram instead. */
  cover?: Shot
  diagram?: "ops-loop"
  evidence?: Evidence[]
  shots: Shot[]
  context: T[]
  did: T[]
  decisions: { title: T; body: T }[]
  outcome: Metric[]
  outcomeNote?: T
  sources: Source[]
  /** Accent used on the client card. */
  tint?: string
}

const t = (en: string, fr: string): T => ({ en, fr })

export const disciplines: { key: Discipline; label: T; line: T }[] = [
  { key: "design", label: t("Product design", "Design produit"), line: t("Research, flows, wireframes, interface", "Recherche, parcours, maquettes, interface") },
  { key: "engineering", label: t("Software engineering", "Ingénierie logicielle"), line: t("Systems that run, get paid and stay up", "Des systèmes qui tournent, encaissent et tiennent") },
  { key: "multimedia", label: t("Multimedia", "Multimédia"), line: t("Photo, film and identity", "Photo, film et identité") },
]

const all: Project[] = [
  /* ------------------------------------------------------------------ Case studies */
  {
    slug: "nexuscharge",
    name: "NEXUSCHARGE",
    kind: "case",
    disciplines: ["engineering", "design"],
    year: "2026",
    sector: t("EV charging · Operations software", "Recharge VE · Logiciel d'exploitation"),
    status: t("Live demo", "Démo en ligne"),
    summary: t(
      "Software that runs an EV charging business from the charger to the bank: drivers, payments, tax receipts and the books.",
      "Un logiciel qui fait tourner une activité de recharge, de la borne à la banque : conducteurs, paiements, reçus fiscaux et comptabilité.",
    ),
    role: t("Product designer and engineer", "Designer produit et ingénieur"),
    stack: ["Node.js", "TypeScript", "PostgreSQL", "OCPP 1.6 to 2.1", "OCPI 2.2.1", "MTN MoMo", "Airtel Money", "IremboPay", "RRA EBM"],
    links: [
      { label: t("Public site", "Site public"), href: "https://demo.nexuscharge.rw/" },
      { label: t("Operator console", "Console opérateur"), href: "https://charge.demo.nexuscharge.rw/console/" },
      { label: t("Driver app", "Appli conducteur"), href: "https://charge.demo.nexuscharge.rw/driver/" },
      { label: t("Figma file", "Fichier Figma"), href: "https://www.figma.com/design/s8pReOoLgiTPnBHSSmCouz/NEXUS?node-id=2013-158" },
    ],
    cover: {
      src: "/work/nexus/console-command.webp",
      frame: "browser",
      url: "charge.demo.nexuscharge.rw/console",
      alt: t("NEXUS operator console: command center with chargers reporting, alerts and revenue", "Console NEXUS : centre de commande avec bornes connectées, alertes et revenus"),
      caption: t("Operator console, command center", "Console opérateur, centre de commande"),
    },
    evidence: ["figma-nexus"],
    shots: [
      { src: "/work/nexus/site-hero.webp", frame: "browser", url: "demo.nexuscharge.rw", alt: t("NEXUS public site: Every charge paid, invoiced and in the books by morning", "Site public NEXUS : chaque recharge payée, facturée et comptabilisée le matin"), caption: t("Public site", "Site public") },
      { src: "/work/nexus/console-alerts.webp", frame: "browser", url: "console/#/alerts", alt: t("Alerts escalated to level 3 with an on call technician", "Alertes escaladées au niveau 3 avec un technicien d'astreinte"), caption: t("Alerts climb a level until someone takes them", "Les alertes montent d'un niveau tant que personne ne les prend") },
      { src: "/work/nexus/driver-map.webp", frame: "phone", alt: t("Driver app map of Rwanda with stations and free connectors", "Carte de l'appli conducteur avec stations et connecteurs libres"), caption: t("Driver app: find, scan, approve a limit, pay", "Appli conducteur : trouver, scanner, valider un plafond, payer") },
      { src: "/work/nexus/console-maintenance.webp", frame: "browser", url: "console/#/maintenance", alt: t("Maintenance tickets with severity, status and assignee", "Tickets de maintenance avec gravité, statut et responsable"), caption: t("Charger faults open tickets with a severity", "Les défauts de borne ouvrent des tickets avec une gravité") },
      { src: "/work/nexus/console-log.webp", frame: "browser", url: "console/#/commands", alt: t("Command log: every remote command, who sent it, why, and the charger's answer", "Journal : chaque commande à distance, son auteur, sa raison et la réponse de la borne"), caption: t("Every remote command is logged with who, why and the answer", "Chaque commande est journalisée : qui, pourquoi, réponse") },
      { src: "/work/nexus/console-payments.webp", frame: "browser", url: "console/#/payments", alt: t("Payments by provider with authorised, captured and returned amounts", "Paiements par fournisseur : autorisés, encaissés, remboursés"), caption: t("Payments, per provider", "Paiements, par fournisseur") },
    ],
    context: [
      t(
        "Running chargers is the easy part. Money is where it breaks: a driver pays and the charger never starts, or the provider statement says one number and the sheet says another.",
        "Faire tourner des bornes, c'est facile. L'argent, c'est là que ça casse : un conducteur paie et la borne ne démarre pas, ou le relevé dit un chiffre et le tableur un autre.",
      ),
      t(
        "Operators in Rwanda also need mobile money first, receipts that hold up with the Rwanda Revenue Authority, and software that keeps going when the signal drops.",
        "Au Rwanda, il faut aussi le mobile money d'abord, des reçus valables auprès de la RRA, et un logiciel qui tient quand le réseau tombe.",
      ),
    ],
    did: [
      t("Designed more than 60 Figma frames across the driver app, the operator console and the public site.", "Plus de 60 écrans Figma pour l'appli conducteur, la console et le site public."),
      t("Connected chargers over OCPP 1.6 to 2.1, with OCPI roaming to other networks.", "Bornes connectées en OCPP 1.6 à 2.1, avec itinérance OCPI."),
      t("Built the driver flow: pay after charging by MoMo, Airtel Money or card, with a receipt signed through RRA EBM.", "Parcours conducteur : paiement après recharge par MoMo, Airtel Money ou carte, reçu signé via l'EBM de la RRA."),
      t("Matched every franc against provider settlements, so the books close without a spreadsheet.", "Chaque franc rapproché des règlements fournisseurs, pour clôturer sans tableur."),
      t("Gave seven roles only the access they need, including a read only RRA auditor.", "Sept rôles aux accès limités, dont un auditeur RRA en lecture seule."),
      t("Served console, driver app and site from one Node.js server that works offline first.", "Console, appli et site servis par un seul serveur Node.js, pensé hors ligne d'abord."),
    ],
    decisions: [
      { title: t("A command is done when the charger says so", "Une commande est finie quand la borne le dit"), body: t("The console never shows a remote start or stop as done before the charger confirms it. The log keeps who asked, why, and what came back.", "La console n'affiche jamais un démarrage ou un arrêt comme fait avant la confirmation de la borne. Le journal garde qui, pourquoi et la réponse.") },
      { title: t("Every alert has a name on it", "Chaque alerte porte un nom"), body: t("Critical faults climb level by level until a person takes them, and there is always someone named on call.", "Les défauts critiques montent de niveau jusqu'à leur prise en charge, avec toujours une personne d'astreinte nommée.") },
      { title: t("Pay for what you used", "Payer ce qu'on a consommé"), body: t("Drivers approve a spending limit on their phone, charge, and pay only for the energy that went into the car.", "Le conducteur valide un plafond sur son téléphone, recharge, et ne paie que l'énergie consommée.") },
    ],
    outcome: [
      { value: "60+", label: t("Figma frames across three apps", "Écrans Figma sur trois applis") },
      { value: "7", label: t("Roles with scoped access", "Rôles aux accès limités") },
      { value: "3", label: t("Apps on one server", "Applis sur un seul serveur") },
    ],
    outcomeNote: t("The public demo runs on synthetic data and resets every night. No real money moves.", "La démo publique utilise des données fictives et se réinitialise chaque nuit. Aucun argent réel ne circule."),
    sources: [
      { label: "demo.nexuscharge.rw", href: "https://demo.nexuscharge.rw/" },
      { label: "charge.demo.nexuscharge.rw/console", href: "https://charge.demo.nexuscharge.rw/console/" },
      { label: "Figma: NEXUS", href: "https://www.figma.com/design/s8pReOoLgiTPnBHSSmCouz/NEXUS?node-id=2013-158" },
    ],
  },
  {
    slug: "thegame",
    name: "THE GAME",
    kind: "case",
    disciplines: ["design"],
    year: "Concept",
    sector: t("Fantasy sports · Mobile app", "Sport fantasy · Appli mobile"),
    status: t("Wireframes to UI", "Des maquettes à l'interface"),
    summary: t(
      "A fantasy sports app where friends start a league, draft real players in a live draft, and score points across every sport.",
      "Une appli de sport fantasy : on crée une ligue entre amis, on draft de vrais joueurs en direct et on marque des points dans tous les sports.",
    ),
    role: t("Product designer", "Designer produit"),
    stack: ["Figma", "Low fidelity wireframes", "User flows", "UI design"],
    links: [{ label: t("Figma file", "Fichier Figma"), href: "https://www.figma.com/design/oAvQ2lT2w200sClyO0o8MF/THE-GAME?node-id=0-1" }],
    cover: {
      src: "/work/thegame/home.webp",
      frame: "phone",
      alt: t("THE GAME home wireframe: welcome back, draft starting soon, live updates, your leagues", "Maquette d'accueil THE GAME : bon retour, draft imminent, live, vos ligues"),
    },
    evidence: ["game-flow", "game-compare", "game-wireframes"],
    shots: [],
    context: [
      t(
        "Fantasy apps usually lock you into one sport and one public league. The idea here was the opposite: your own group, any sport, and a draft that feels like an event.",
        "Les applis fantasy enferment souvent dans un sport et une ligue publique. L'idée ici : votre groupe, n'importe quel sport, et un draft qui se vit comme un événement.",
      ),
      t(
        "The hard part is the first five minutes. Someone has to set up a league, invite friends and agree on rules before anyone has had fun.",
        "Le plus dur, ce sont les cinq premières minutes. Quelqu'un doit créer la ligue, inviter ses amis et fixer les règles avant que quiconque s'amuse.",
      ),
    ],
    did: [
      t("Mapped the journey from first launch to a live draft, then drew it as 24 low fidelity frames.", "Cartographie du parcours, du premier lancement au draft en direct, en 24 maquettes basse fidélité."),
      t("Kept sign up short: email or phone, a six digit code, then pick your sports and teams.", "Inscription courte : e-mail ou téléphone, un code à six chiffres, puis le choix des sports et équipes."),
      t("Split league creation into four steps: details, draft settings, sports and scoring, preview and post.", "Création de ligue en quatre étapes : détails, réglages du draft, sports et barème, aperçu et publication."),
      t("Ended setup on a six character invite code, so the group can join from any chat.", "Fin de configuration sur un code d'invitation à six caractères, partageable dans n'importe quel chat."),
      t("Designed the live draft around a visible clock: 60 seconds per pick, auto draft when time runs out.", "Draft en direct construit autour d'un chrono visible : 60 secondes par choix, choix auto à la fin."),
    ],
    decisions: [
      { title: t("Wireframes before colour", "Les maquettes avant la couleur"), body: t("Every screen started grey so the group could argue about flow and content, not about colour.", "Chaque écran a commencé en gris pour débattre du parcours et du contenu, pas des couleurs.") },
      { title: t("Setup ends with something to share", "La configuration se termine par un partage"), body: t("The last screen of league creation is an invite code and two buttons: share and copy. The next action is obvious.", "Le dernier écran est un code d'invitation et deux boutons : partager et copier. L'action suivante est évidente.") },
      { title: t("Scoring you can read", "Un barème lisible"), body: t("Points for a win, a draw, a goal and a clean sheet sit in one list the organiser can edit before the season starts.", "Victoire, nul, but et clean sheet tiennent dans une liste modifiable avant le début de la saison.") },
    ],
    outcome: [
      { value: "24", label: t("Low fidelity frames", "Maquettes basse fidélité") },
      { value: "4", label: t("Steps to create a league", "Étapes pour créer une ligue") },
      { value: "12", label: t("Sports at onboarding", "Sports à l'inscription") },
    ],
    sources: [{ label: "Figma: THE GAME", href: "https://www.figma.com/design/oAvQ2lT2w200sClyO0o8MF/THE-GAME?node-id=0-1" }],
  },
  {
    slug: "kibina",
    name: "Kibina",
    kind: "case",
    disciplines: ["engineering", "design"],
    year: "2026",
    sector: t("Fintech · Savings groups", "Fintech · Groupes d'épargne"),
    status: t("Live", "En ligne"),
    summary: t(
      "Replaces the notebook and the group chat for savings groups. Every balance comes from a double entry ledger.",
      "Remplace le cahier et le groupe de discussion des tontines. Chaque solde vient d'un grand livre en partie double.",
    ),
    role: t("Product designer and engineer", "Designer produit et ingénieur"),
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Double entry ledger", "Mobile Money"],
    links: [{ label: t("kibina.rw", "kibina.rw"), href: "https://www.kibina.rw/" }],
    cover: { src: "/work/kibina/hero.webp", frame: "browser", url: "kibina.rw", alt: t("Kibina homepage: Run your Kibina without the notebook", "Accueil Kibina : gérez votre tontine sans le cahier") },
    shots: [
      { src: "/work/kibina/people.webp", frame: "browser", url: "kibina.rw", alt: t("Who Kibina is for, and four reasons it holds up", "À qui s'adresse Kibina, et quatre raisons d'y croire"), caption: t("Built for real money, not a spreadsheet", "Conçu pour de l'argent réel, pas un tableur") },
      { src: "/work/kibina/mobile.webp", frame: "phone", alt: t("Kibina on a phone", "Kibina sur téléphone"), caption: t("Phone first", "Pensé téléphone") },
      { src: "/work/kibina/map.webp", frame: "browser", url: "kibina.rw", alt: t("Map of Rwanda's thirty districts", "Carte des trente districts du Rwanda"), caption: t("From Kigali to Rusizi", "De Kigali à Rusizi") },
      { src: "/work/kibina/features.webp", frame: "browser", url: "kibina.rw", alt: t("Contributions, loans and interest, double entry ledger", "Cotisations, prêts et intérêts, grand livre"), caption: t("Contributions, loans, ledger", "Cotisations, prêts, grand livre") },
    ],
    context: [
      t(
        "Savings groups keep contributions, loans, fines and payouts in a notebook, a group chat and a calculator. When the numbers disagree, trust goes before the money does.",
        "Les tontines tiennent cotisations, prêts, amendes et versements dans un cahier, un groupe de discussion et une calculatrice. Quand les chiffres divergent, la confiance part avant l'argent.",
      ),
    ],
    did: [
      t("One record for contributions, loans, fines and payouts.", "Un seul registre pour cotisations, prêts, amendes et versements."),
      t("Every balance computed from a double entry ledger, so any member can trace it.", "Chaque solde calculé depuis un grand livre en partie double, traçable par tout membre."),
      t("More than 100 unit tests on the money logic.", "Plus de 100 tests unitaires sur la logique financière."),
      t("Shipped in the languages members speak.", "Livré dans les langues des membres."),
    ],
    decisions: [{ title: t("Balances are calculated, never typed", "Les soldes se calculent, ils ne se tapent pas"), body: t("Nobody edits a balance. It is the sum of transactions, so the committee can always explain it.", "Personne ne modifie un solde : c'est la somme des transactions, toujours explicable au comité.") }],
    outcome: [
      { value: "100+", label: t("Unit tests on money logic", "Tests unitaires sur l'argent") },
      { value: "30", label: t("Districts the product is built for", "Districts couverts par le produit") },
    ],
    sources: [{ label: "kibina.rw", href: "https://www.kibina.rw/" }],
  },
  {
    slug: "byaboneka",
    name: "Byaboneka+",
    kind: "case",
    disciplines: ["design", "engineering"],
    year: "2026",
    sector: t("Transport · Trust and safety", "Transport · Confiance et sécurité"),
    status: t("Field tested", "Testé sur le terrain"),
    summary: t("Lost and found for Kigali's buses and motos, with ownership checks before anything changes hands.", "Objets trouvés pour les bus et motos de Kigali, avec vérification du propriétaire avant toute remise."),
    role: t("Capstone: research, design and engineering", "Projet de fin d'études : recherche, design et développement"),
    period: t("African Leadership University, supervised by Dirac Murairi", "African Leadership University, encadré par Dirac Murairi"),
    stack: ["Web app", "Matching", "Challenge questions", "Handover codes", "EN · FR · RW"],
    links: [{ label: t("byaboneka-plus.vercel.app", "byaboneka-plus.vercel.app"), href: "https://byaboneka-plus.vercel.app/" }],
    cover: { src: "/work/byaboneka/hero.webp", frame: "browser", url: "byaboneka-plus.vercel.app", alt: t("Byaboneka+ homepage: Lost something? We'll help you find it", "Accueil Byaboneka+ : vous avez perdu quelque chose ?") },
    shots: [
      { src: "/work/byaboneka/how.webp", frame: "browser", url: "byaboneka-plus.vercel.app", alt: t("How it works: report, match, verify, return", "Fonctionnement : signaler, rapprocher, vérifier, restituer"), caption: t("Report, match, verify, return", "Signaler, rapprocher, vérifier, restituer") },
      { src: "/work/byaboneka/mobile.webp", frame: "phone", alt: t("Byaboneka+ on a phone", "Byaboneka+ sur téléphone"), caption: t("Phone", "Téléphone") },
    ],
    context: [t("Items lost on Kigali buses and motos rarely get home, and anyone can claim a found phone. Search is the easy part. Proving who owns the item is the real problem.", "Les objets perdus dans les bus et motos de Kigali rentrent rarement, et n'importe qui peut réclamer un téléphone trouvé. Chercher est facile. Prouver la propriété, c'est le vrai problème.")],
    did: [
      t("Matched lost reports with found reports.", "Rapprochement des déclarations de perte et de découverte."),
      t("Checked ownership with questions only the owner can answer.", "Vérification par des questions que seul le propriétaire peut résoudre."),
      t("Flagged suspicious claims for review.", "Signalement des réclamations suspectes."),
      t("Confirmed each handover with a single use code.", "Chaque remise confirmée par un code à usage unique."),
      t("Ran a five day pilot with 12 people from KBS and Royal Express.", "Pilote de cinq jours avec 12 personnes de KBS et Royal Express."),
    ],
    decisions: [{ title: t("Verify before you return", "Vérifier avant de rendre"), body: t("A match only opens a claim. The item moves after the claimant passes the questions and the handover code is confirmed.", "Un rapprochement ouvre seulement une réclamation. L'objet change de mains après les questions et la confirmation du code.") }],
    outcome: [
      { value: "78.5", label: t("Usability score (SUS)", "Score d'utilisabilité (SUS)") },
      { value: "87%", label: t("Match accuracy in the pilot", "Précision des rapprochements") },
      { value: "83%", label: t("Of claims ended in a return", "Des réclamations aboutissent") },
    ],
    outcomeNote: t("Five day pilot, 12 users from KBS and Royal Express. A SUS of 68 is usually read as average.", "Pilote de cinq jours, 12 utilisateurs. Un SUS de 68 est en général considéré comme moyen."),
    sources: [{ label: "byaboneka-plus.vercel.app", href: "https://byaboneka-plus.vercel.app/" }],
  },
  {
    slug: "aplini",
    name: "Aplini",
    kind: "case",
    disciplines: ["engineering"],
    year: "2025",
    sector: t("Career tech · Two sided platform", "Emploi · Plateforme biface"),
    status: t("Live", "En ligne"),
    summary: t("Career platform I co-founded. Semantic matching shows people roles that fit their skills, not only their keywords.", "Plateforme carrière cofondée. Le rapprochement sémantique montre des offres adaptées aux compétences, pas seulement aux mots clés."),
    role: t("Co-founder and software developer", "Cofondateur et développeur"),
    period: t("Jan 2025 to Jan 2026, part time", "Janv. 2025 à janv. 2026, temps partiel"),
    stack: ["Next.js", "Node.js", "Supabase", "OpenAI embeddings", "pgvector", "OAuth 2.0", "Sentry", "GitHub Actions"],
    links: [{ label: t("aplini.com", "aplini.com"), href: "https://aplini.com/" }],
    cover: { src: "/work/aplini/hero.webp", frame: "browser", url: "aplini.com", alt: t("Aplini homepage: Your career shouldn't be left to chance", "Accueil Aplini : votre carrière ne devrait pas dépendre du hasard") },
    shots: [
      { src: "/work/aplini/problem.webp", frame: "browser", url: "aplini.com", alt: t("No one helps you build your career", "Personne ne vous aide à bâtir votre carrière"), caption: t("The problem, in the users' words", "Le problème, dans les mots des utilisateurs") },
      { src: "/work/aplini/mobile.webp", frame: "phone", alt: t("Aplini on a phone", "Aplini sur téléphone"), caption: t("Phone", "Téléphone") },
    ],
    context: [t("Job seekers spend hours on listings that do not fit them. Keyword search misses people whose skills come from another field.", "Les candidats passent des heures sur des offres qui ne leur vont pas. La recherche par mots clés rate ceux dont les compétences viennent d'ailleurs.")],
    did: [
      t("Built the product with Next.js, Node.js and Supabase.", "Produit développé avec Next.js, Node.js et Supabase."),
      t("Semantic job matching on OpenAI embeddings and pgvector.", "Rapprochement sémantique avec embeddings OpenAI et pgvector."),
      t("SQL dashboards for sign ups, activation and matches, read next to user feedback to pick what to build.", "Tableaux SQL (inscriptions, activation, rapprochements) lus avec les retours pour prioriser."),
      t("Code review, CI/CD and separate environments for the founding team.", "Revue de code, CI/CD et environnements séparés pour l'équipe."),
    ],
    decisions: [{ title: t("Measure activation, not sign ups", "Mesurer l'activation, pas les inscriptions"), body: t("Sign ups showed curiosity. Activation and matches showed whether the product worked, so they set the roadmap.", "Les inscriptions montraient la curiosité. L'activation et les rapprochements montraient si le produit marchait : ils ont fixé la feuille de route.") }],
    outcome: [{ value: "1,200", label: t("Beta users", "Utilisateurs bêta") }],
    sources: [{ label: "aplini.com", href: "https://aplini.com/" }],
  },
  {
    slug: "evplugin",
    name: "EVPlugin",
    kind: "case",
    disciplines: ["engineering"],
    year: "2024 to 2026",
    sector: t("EV charging · Live operations", "Recharge VE · Exploitation"),
    status: t("Internal platform", "Plateforme interne"),
    summary: t("Kept a charging platform healthy for more than 50 stations and about 8,000 sessions a month.", "Une plateforme de recharge maintenue en forme : plus de 50 stations, environ 8 000 sessions par mois."),
    role: t("IT Officer", "Responsable informatique"),
    period: t("Dec 2024 to Jun 2026, Kigali", "Déc. 2024 à juin 2026, Kigali"),
    stack: ["Grafana", "Prometheus", "Terraform", "AWS", "Docker", "OCPP", "OCPI", "PostgreSQL", "MySQL", "Mobile Money"],
    links: [],
    diagram: "ops-loop",
    shots: [],
    context: [
      t("EVPlugin runs public EV charging in Rwanda. Its first station opened in Kacyiru, Kigali, with charging for cars and motorcycles. The platform serves drivers, station operators and site owners.", "EVPlugin exploite la recharge publique au Rwanda. Sa première station a ouvert à Kacyiru, Kigali, pour voitures et motos. La plateforme sert conducteurs, opérateurs et propriétaires de sites."),
      t("A failed session is a driver stuck at a charger. A payment with no matching session is money nobody can explain. Both had to be caught early.", "Une session ratée, c'est un conducteur bloqué. Un paiement sans session, c'est de l'argent qu'on ne sait pas expliquer. Il fallait repérer les deux tôt."),
    ],
    did: [
      t("Grafana and Prometheus alerts on availability, failed sessions and payment errors across more than 50 stations.", "Alertes Grafana et Prometheus sur la disponibilité, les sessions échouées et les erreurs de paiement de plus de 50 stations."),
      t("Led incident response through to root cause and wrote the runbooks.", "Réponse aux incidents menée jusqu'à la cause racine, runbooks rédigés."),
      t("Ran the Dockerised services on Linux and AWS, with infrastructure in Terraform, IAM access controls, secrets management and backups proven by test restores.", "Services dockerisés sur Linux et AWS, infrastructure en Terraform, accès IAM, gestion des secrets, sauvegardes vérifiées par restauration."),
      t("Integrated chargers over OCPP and roaming partners over OCPI, and troubleshot GSM connectivity on station modems.", "Bornes intégrées en OCPP, partenaires d'itinérance en OCPI, connectivité GSM des modems dépannée."),
      t("Matched charging transactions against Mobile Money payments and chased every gap until the books closed.", "Transactions rapprochées des paiements Mobile Money, chaque écart suivi jusqu'à la clôture."),
      t("Tested releases before they reached live chargers and fixed defects.", "Versions testées avant les bornes en service, défauts corrigés."),
      t("Wrote the user guides and trained station staff.", "Guides utilisateurs rédigés, personnel formé."),
    ],
    decisions: [
      { title: t("Watch the journey, not only the server", "Surveiller le parcours, pas seulement le serveur"), body: t("A server can answer while sessions fail. Failed sessions and unmatched payments sat next to uptime and errors as first class signals.", "Un serveur peut répondre pendant que les sessions échouent. Sessions ratées et paiements orphelins comptaient autant que la disponibilité.") },
      { title: t("Close the loop at the charger", "Boucler à la borne"), body: t("I wrote the guides and trained station staff, so the people at the charger could help drivers directly.", "Guides et formation : les personnes à la borne pouvaient aider directement les conducteurs.") },
    ],
    outcome: [
      { value: "50+", label: t("Charging stations kept online", "Stations maintenues en ligne") },
      { value: "8,000", label: t("Sessions a month, about", "Sessions par mois, environ") },
    ],
    outcomeNote: t("The platform is internal, so this page shows how it was run instead of screenshots.", "La plateforme est interne : cette page montre l'exploitation plutôt que des captures."),
    sources: [{ label: "CleanTechnica: EVPlugin opens public fast charging in Kigali (2021)", href: "https://cleantechnica.com/2021/07/01/evplugin-emobility-solutions-launches-public-ev-fast-charging-station-network-in-kigali/" }],
  },
  {
    slug: "guraride",
    name: "GURARIDE",
    kind: "case",
    disciplines: ["design", "engineering"],
    year: "2024 to 2025",
    sector: t("Micromobility · Consumer app", "Micromobilité · Appli grand public"),
    status: t("Shipped", "Livré"),
    summary: t("Designed the mobile app for bike and e-scooter sharing in Rwanda, from flows to UI, and tested it with riders.", "Appli mobile de vélos et trottinettes partagés au Rwanda, conçue des parcours à l'interface et testée avec des cyclistes."),
    role: t("UI/UX designer", "Designer UI/UX"),
    period: t("2024 to 2025, GURARIDE Rwanda", "2024 à 2025, GURARIDE Rwanda"),
    stack: ["Mobile", "GPS", "QR unlock", "Payments", "Figma"],
    links: [],
    cover: { src: "/work/guraride/app-2.webp", frame: "none", alt: t("GURARIDE app screens: map, QR unlock and ride", "Écrans GURARIDE : carte, déverrouillage QR et trajet") },
    shots: [
      { src: "/work/guraride/street.webp", frame: "none", alt: t("GURARIDE bikes and riders in Kigali", "Vélos et cyclistes GURARIDE à Kigali"), caption: t("In service in Kigali", "En service à Kigali") },
      { src: "/work/guraride/app-1.webp", frame: "none", alt: t("GURARIDE map and ride screens", "Écrans carte et trajet"), caption: t("Find a bike, start a ride", "Trouver un vélo, démarrer") },
      { src: "/work/guraride/rider.webp", frame: "none", alt: t("Rider on a GURARIDE bike", "Cycliste sur un vélo GURARIDE") },
      { src: "/work/guraride/app-3.webp", frame: "none", alt: t("QR unlock and payment screens", "Écrans déverrouillage QR et paiement"), caption: t("Scan to unlock", "Scanner pour déverrouiller") },
    ],
    context: [t("Shared bikes only work if a rider can find one, unlock it and pay in under a minute, on any phone, standing in the street.", "Les vélos partagés ne marchent que si l'on peut en trouver un, le déverrouiller et payer en moins d'une minute, sur n'importe quel téléphone, dans la rue.")],
    did: [
      t("Live map of nearby bikes and docks.", "Carte en direct des vélos et stations proches."),
      t("QR scan to unlock and start a ride.", "Scan QR pour déverrouiller et démarrer."),
      t("Battery level for e-bikes and scooters.", "Niveau de batterie des vélos et trottinettes."),
      t("Ride history, ride packages and payment.", "Historique, forfaits et paiement."),
    ],
    decisions: [{ title: t("Designed for the street", "Pensé pour la rue"), body: t("Large touch targets, strong contrast for sunlight, and unlock always one tap away.", "Grandes zones tactiles, fort contraste au soleil, déverrouillage toujours à portée.") }],
    outcome: [],
    sources: [],
  },
  {
    slug: "sul",
    name: "S.U.L E-Mobility",
    kind: "case",
    disciplines: ["design", "multimedia", "engineering"],
    year: "2024 to 2025",
    sector: t("E-mobility · Web and campaigns", "E-mobilité · Web et campagnes"),
    status: t("Shipped", "Livré"),
    summary: t("Designed and shipped the customer web app on a reusable component system, and shot the campaigns that brought the first qualified leads.", "Appli web client sur un système de composants, et campagnes photo et vidéo qui ont apporté les premiers prospects qualifiés."),
    role: t("Product designer and developer", "Designer produit et développeur"),
    period: t("Dec 2024 to Dec 2025, Kigali", "Déc. 2024 à déc. 2025, Kigali"),
    stack: ["Next.js", "Design system", "Figma", "Photography", "Video"],
    links: [],
    cover: { src: "/work/sul/site-2.webp", frame: "none", alt: t("S.U.L E-Mobility website screens", "Écrans du site S.U.L E-Mobility") },
    shots: [
      { src: "/work/sul/photo-rider.webp", frame: "none", alt: t("Rider on an S.U.L electric motorcycle", "Pilote sur une moto électrique S.U.L"), caption: t("Campaign photography", "Photographie de campagne") },
      { src: "/work/sul/site-1.webp", frame: "none", alt: t("S.U.L website: explore our lineup", "Site S.U.L : la gamme"), caption: t("Product pages", "Pages produit") },
      { src: "/work/sul/photo-bike.webp", frame: "none", alt: t("S.U.L electric motorcycle detail", "Détail d'une moto électrique S.U.L"), caption: t("Campaign photography", "Photographie de campagne") },
    ],
    context: [t("A young e-mobility brand needed a site customers could act on, and pictures strong enough to stop a scroll.", "Une jeune marque d'e-mobilité avait besoin d'un site qui fait agir, et d'images capables d'arrêter le défilement.")],
    did: [
      t("Designed and shipped the customer web app in Next.js on a reusable component system.", "Appli web client en Next.js sur un système de composants réutilisables."),
      t("Shot the photos and video for targeted campaigns that brought the company its first qualified leads.", "Photos et vidéos des campagnes ciblées qui ont apporté les premiers prospects qualifiés."),
    ],
    decisions: [],
    outcome: [],
    sources: [],
  },

  /* ------------------------------------------------------------------ Client work */
  {
    slug: "spark",
    name: "Spark",
    kind: "client",
    disciplines: ["design", "engineering"],
    year: "2026",
    sector: t("Electric ride network · Kigali", "Réseau de courses électriques · Kigali"),
    status: t("Client project", "Projet client"),
    summary: t("Site for an all electric ride network in Kigali: riders, drivers and the fleet, in English, French and Kinyarwanda.", "Site d'un réseau de courses 100 % électrique à Kigali : passagers, chauffeurs et flotte, en anglais, français et kinyarwanda."),
    role: t("Design and development", "Design et développement"),
    stack: ["Next.js", "EN · FR · RW", "Responsive"],
    links: [{ label: t("Visit site", "Voir le site"), href: "https://spark-mobility.vercel.app/" }],
    cover: { src: "/work/spark/s0.webp", frame: "browser", url: "spark-mobility.vercel.app", alt: t("Spark homepage: Electric mobility, built for Kigali", "Accueil Spark : la mobilité électrique, pensée pour Kigali") },
    shots: [
      { src: "/work/spark/s3.webp", frame: "browser", url: "spark-mobility.vercel.app", alt: t("Spark app section: your whole trip, in one tap", "Section appli Spark : tout le trajet, en un geste"), caption: t("The app, shown in the page", "L'appli, montrée dans la page") },
      { src: "/work/spark/mobile.webp", frame: "phone", alt: t("Spark on a phone", "Spark sur téléphone") },
      { src: "/work/spark/s2.webp", frame: "browser", url: "spark-mobility.vercel.app", alt: t("From request to arrival in minutes", "De la demande à l'arrivée en quelques minutes"), caption: t("How a ride works", "Le déroulé d'une course") },
    ],
    context: [t("Spark presents three audiences on one site: people who need a ride, people who want to drive, and businesses that need a fleet. Fares are shown before you confirm and every trip has SOS to 112.", "Spark parle à trois publics : ceux qui veulent une course, ceux qui veulent conduire, et les entreprises qui ont besoin d'une flotte. Le prix est affiché avant validation et chaque trajet a un SOS vers le 112.")],
    did: [], decisions: [], outcome: [], sources: [{ label: "spark-mobility.vercel.app", href: "https://spark-mobility.vercel.app/" }],
    tint: "#2563EB",
  },
  {
    slug: "amazi",
    name: "Amazi Moto",
    kind: "client",
    disciplines: ["design", "engineering"],
    year: "2026",
    sector: t("Electric motorcycles · Kigali", "Motos électriques · Kigali"),
    status: t("Client project", "Projet client"),
    summary: t("Site for electric motorcycles you can own or rent in Kigali, built around battery swapping in under a minute.", "Site de motos électriques à acheter ou louer à Kigali, autour d'un échange de batterie en moins d'une minute."),
    role: t("Design and development", "Design et développement"),
    stack: ["Next.js", "Product viewer", "Responsive"],
    links: [{ label: t("Visit site", "Voir le site"), href: "https://amazi-delta.vercel.app/" }],
    cover: { src: "/work/amazi/s0.webp", frame: "browser", url: "amazi-delta.vercel.app", alt: t("Amazi Moto homepage: Electric mobility, built for Rwanda", "Accueil Amazi Moto : la mobilité électrique, pensée pour le Rwanda") },
    shots: [
      { src: "/work/amazi/s2.webp", frame: "browser", url: "amazi-delta.vercel.app", alt: t("Motorcycle viewer with specifications", "Visionneuse de la moto avec caractéristiques"), caption: t("One motorcycle, every angle", "Une moto, tous les angles") },
      { src: "/work/amazi/mobile.webp", frame: "phone", alt: t("Amazi Moto on a phone", "Amazi Moto sur téléphone") },
      { src: "/work/amazi/s1.webp", frame: "browser", url: "amazi-delta.vercel.app", alt: t("A motorcycle that earns its keep", "Une moto qui se rentabilise"), caption: t("Written for working riders", "Écrit pour les pilotes qui travaillent") },
    ],
    context: [t("For a moto taxi rider, fuel is the biggest daily cost. The site talks to that rider first: range, running cost, the swap, and the choice to buy, pay over time or rent by the day.", "Pour un moto-taxi, le carburant est le premier coût du jour. Le site parle d'abord à ce pilote : autonomie, coût, échange de batterie, achat, paiement échelonné ou location à la journée.")],
    did: [], decisions: [], outcome: [], sources: [{ label: "amazi-delta.vercel.app", href: "https://amazi-delta.vercel.app/" }],
    tint: "#0EA5E9",
  },
  {
    slug: "feels",
    name: "Feels Coffee",
    kind: "client",
    disciplines: ["design", "engineering"],
    year: "2026",
    sector: t("Specialty café · Rugando, Kigali", "Café de spécialité · Rugando, Kigali"),
    status: t("Client project", "Projet client"),
    summary: t("Site for a specialty café and all day kitchen opposite the Court Boutique Hotel, open until 11 at night.", "Site d'un café de spécialité et cuisine toute la journée, face au Court Boutique Hotel, ouvert jusqu'à 23 h."),
    role: t("Design and development", "Design et développement"),
    stack: ["Next.js", "Menu", "Maps and WhatsApp"],
    links: [{ label: t("Visit site", "Voir le site"), href: "https://feels-coffee.vercel.app/" }],
    cover: { src: "/work/feels/s0.webp", frame: "browser", url: "feels-coffee.vercel.app", alt: t("Feels Coffee homepage: Coffee that feels human", "Accueil Feels Coffee : un café qui a du cœur") },
    shots: [
      { src: "/work/feels/s2.webp", frame: "browser", url: "feels-coffee.vercel.app", alt: t("Espresso pour, the coffee section", "Extraction d'espresso, section café"), caption: t("Grown close to home", "Cultivé tout près") },
      { src: "/work/feels/mobile.webp", frame: "phone", alt: t("Feels Coffee on a phone", "Feels Coffee sur téléphone") },
    ],
    context: [t("People come to Feels to work, meet or do nothing over a good cup. The site has three jobs: show the room, show the menu, and get you there with one tap to call, WhatsApp or open Maps.", "On vient chez Feels pour travailler, se retrouver ou ne rien faire autour d'un bon café. Le site a trois missions : montrer le lieu, le menu, et vous y amener en un geste.")],
    did: [], decisions: [], outcome: [], sources: [{ label: "feels-coffee.vercel.app", href: "https://feels-coffee.vercel.app/" }],
    tint: "#B45309",
  },
  {
    slug: "indabo",
    name: "Indabo Café",
    kind: "client",
    disciplines: ["design", "engineering"],
    year: "2026",
    sector: t("Garden café and plant shop · Kigali", "Café jardin et boutique de plantes · Kigali"),
    status: t("Client project", "Projet client"),
    summary: t("Site for a garden café with two locations, Kiyovu and Kimihurura, where the plants you sit under are for sale.", "Site d'un café jardin sur deux adresses, Kiyovu et Kimihurura, où les plantes du lieu sont à vendre."),
    role: t("Design and development", "Design et développement"),
    stack: ["Next.js", "Editorial type", "Reservations"],
    links: [{ label: t("Visit site", "Voir le site"), href: "https://indabo-cafe-three.vercel.app/" }],
    cover: { src: "/work/indabo/s1.webp", frame: "browser", url: "indabo-cafe-three.vercel.app", alt: t("Indabo Café: We grow slowly, and on purpose", "Indabo Café : on grandit lentement, et exprès") },
    shots: [
      { src: "/work/indabo/s2.webp", frame: "browser", url: "indabo-cafe-three.vercel.app", alt: t("Two gardens, one idea: Kiyovu and Kimihurura", "Deux jardins, une idée : Kiyovu et Kimihurura"), caption: t("Two gardens, one idea", "Deux jardins, une idée") },
      { src: "/work/indabo/mobile.webp", frame: "phone", alt: t("Indabo Café on a phone", "Indabo Café sur téléphone") },
    ],
    context: [t("Indabo opened in 2020 as a garden first. The site is slow on purpose: big type, room to breathe, and the two gardens side by side so you can pick one.", "Indabo a ouvert en 2020, d'abord comme un jardin. Le site prend son temps : grande typographie, de l'air, et les deux jardins côte à côte pour choisir.")],
    did: [], decisions: [], outcome: [], sources: [{ label: "indabo-cafe-three.vercel.app", href: "https://indabo-cafe-three.vercel.app/" }],
    tint: "#3F6212",
  },
  {
    slug: "stafford",
    name: "Stafford Coffee Brewers",
    kind: "client",
    disciplines: ["design", "engineering"],
    year: "2026",
    sector: t("Roadside specialty coffee · Rwanda", "Café de spécialité au bord de la route · Rwanda"),
    status: t("Client project", "Projet client"),
    summary: t("Site for roadside coffee counters on the road south, from Kiyovu in Kigali to Musambira, Ruhango and Nyanza.", "Site de comptoirs de café sur la route du sud, de Kiyovu à Kigali jusqu'à Musambira, Ruhango et Nyanza."),
    role: t("Design and development", "Design et développement"),
    stack: ["Next.js", "Route map", "Menu"],
    links: [{ label: t("Visit site", "Voir le site"), href: "https://stafford-coffee-brewers.vercel.app/" }],
    cover: { src: "/work/stafford/s0.webp", frame: "browser", url: "stafford-coffee-brewers.vercel.app", alt: t("Stafford Coffee Brewers: Every great road deserves a pause", "Stafford Coffee Brewers : toute belle route mérite une pause") },
    shots: [
      { src: "/work/stafford/s3.webp", frame: "browser", url: "stafford-coffee-brewers.vercel.app", alt: t("Four stops across Rwanda", "Quatre arrêts à travers le Rwanda"), caption: t("The counters, as a route", "Les comptoirs, comme un itinéraire") },
      { src: "/work/stafford/mobile.webp", frame: "phone", alt: t("Stafford Coffee Brewers on a phone", "Stafford Coffee Brewers sur téléphone") },
      { src: "/work/stafford/s1.webp", frame: "browser", url: "stafford-coffee-brewers.vercel.app", alt: t("A reason to slow down: the story", "Une raison de ralentir : l'histoire"), caption: t("The story", "L'histoire") },
    ],
    context: [t("Stafford turns a roadside stop into a destination. The site follows the road: you begin the route, pass each counter in order, and find the one closest to you.", "Stafford fait d'une halte un but de voyage. Le site suit la route : on part, on passe chaque comptoir dans l'ordre, on trouve le plus proche.")],
    did: [], decisions: [], outcome: [], sources: [{ label: "stafford-coffee-brewers.vercel.app", href: "https://stafford-coffee-brewers.vercel.app/" }],
    tint: "#C2410C",
  },

  /* ------------------------------------------------------------------ Archive */
  { slug: "pamoja", name: "Pamoja", kind: "archive", disciplines: ["design", "engineering"], year: "2023", sector: t("Food waste · Marketplace", "Gaspillage · Marketplace"), status: t("Live", "En ligne"), summary: t("Surplus food from shops and restaurants at a discount.", "Invendus de commerces et restaurants à prix réduit."), role: t("Design and development", "Design et développement"), stack: [], links: [{ label: t("pamoja-web.vercel.app", "pamoja-web.vercel.app"), href: "https://pamoja-web.vercel.app/" }], cover: { src: "/work/pamoja/shot.webp", frame: "none", alt: t("Pamoja screens", "Écrans Pamoja") }, shots: [], context: [], did: [], decisions: [], outcome: [], sources: [] },
  { slug: "maktaba", name: "Maktaba", kind: "archive", disciplines: ["engineering"], year: "2023", sector: t("Education · Library system", "Éducation · Bibliothèque"), status: t("Live", "En ligne"), summary: t("Library management for schools: books, borrowers, overdue reports.", "Gestion de bibliothèque scolaire : livres, emprunteurs, retards."), role: t("Full stack (MERN)", "Full stack (MERN)"), stack: [], links: [{ label: t("makta-iwwo.vercel.app", "makta-iwwo.vercel.app"), href: "https://makta-iwwo.vercel.app/" }], cover: { src: "/work/maktaba/shot.webp", frame: "none", alt: t("Maktaba dashboard screens", "Écrans Maktaba") }, shots: [], context: [], did: [], decisions: [], outcome: [], sources: [] },
  { slug: "agrisense", name: "Agrisense", kind: "archive", disciplines: ["engineering"], year: "2024", sector: t("Agritech · ML advice", "Agritech · Conseil ML"), status: t("Live", "En ligne"), summary: t("Web interfaces for machine learning crop and soil advice.", "Interfaces web de conseil cultures et sols."), role: t("Frontend developer", "Développeur frontend"), stack: [], links: [{ label: t("agrisensetech.com", "agrisensetech.com"), href: "https://www.agrisensetech.com/" }], cover: { src: "/work/agrisense/live.webp", frame: "browser", url: "agrisensetech.com", alt: t("Agrisense Technologies website", "Site Agrisense Technologies") }, shots: [], context: [], did: [], decisions: [], outcome: [], sources: [] },
  { slug: "askafrica", name: "AskAfrica", kind: "archive", disciplines: ["design", "engineering"], year: "2024", sector: t("Community · Q&A", "Communauté · Q&R"), status: t("Offline", "Hors ligne"), summary: t("Community questions and answers with reputation and moderation.", "Questions-réponses avec réputation et modération."), role: t("Design and development", "Design et développement"), stack: [], links: [], cover: { src: "/work/askafrica/cover.webp", frame: "none", alt: t("AskAfrica screens", "Écrans AskAfrica") }, shots: [], context: [], did: [], decisions: [], outcome: [], sources: [] },
  { slug: "aquasense", name: "AquaSense", kind: "archive", disciplines: ["design"], year: "2024", sector: t("Agritech · Irrigation", "Agritech · Irrigation"), status: t("Concept", "Concept"), summary: t("Phone app concept for soil moisture and irrigation schedules.", "Concept d'appli pour l'humidité du sol et l'irrigation."), role: t("UI and UX design", "Design UI et UX"), stack: [], links: [], cover: { src: "/work/aquasense/app.webp", frame: "none", alt: t("AquaSense screens", "Écrans AquaSense") }, shots: [], context: [], did: [], decisions: [], outcome: [], sources: [] },
  { slug: "ventureble", name: "Ventureble", kind: "archive", disciplines: ["design"], year: "2023", sector: t("Fintech · Crowdfunding", "Fintech · Financement participatif"), status: t("Concept", "Concept"), summary: t("Investor and founder dashboards for a crowdfunding platform.", "Tableaux de bord investisseurs et fondateurs."), role: t("Product design", "Design produit"), stack: [], links: [], cover: { src: "/work/ventureble/wallet.webp", frame: "none", alt: t("Ventureble wallet dashboard", "Tableau de bord Ventureble") }, shots: [], context: [], did: [], decisions: [], outcome: [], sources: [] },
  { slug: "wellness", name: "Wellness app", kind: "archive", disciplines: ["design"], year: "2024", sector: t("Health · Web and phone", "Santé · Web et téléphone"), status: t("Concept", "Concept"), summary: t("Mood tracking, journaling and appointments for a mental health service.", "Suivi d'humeur, journal et rendez-vous pour la santé mentale."), role: t("UI and UX design", "Design UI et UX"), stack: [], links: [], cover: { src: "/work/wellness/shot.webp", frame: "none", alt: t("Wellness app screens", "Écrans bien-être") }, shots: [], context: [], did: [], decisions: [], outcome: [], sources: [] },
]

/** Most recent first: cases by when the work ended, then clients, then the archive. */
const order = ["nexuscharge", "evplugin", "byaboneka", "kibina", "aplini", "sul", "guraride", "thegame", "spark", "amazi", "stafford", "feels", "indabo", "agrisense", "askafrica", "aquasense", "wellness", "pamoja", "maktaba", "ventureble"]
export const projects: Project[] = [...all].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))

export const caseStudies = projects.filter((p) => p.kind === "case")
export const clientWork = projects.filter((p) => p.kind === "client")
export const archive = projects.filter((p) => p.kind === "archive")
/** Everything with its own page. */
export const pages = projects.filter((p) => p.kind !== "archive")

export function getProject(slug: string) {
  return pages.find((p) => p.slug === slug)
}

export function nextProject(slug: string) {
  const i = pages.findIndex((p) => p.slug === slug)
  return pages[(i + 1) % pages.length]
}
