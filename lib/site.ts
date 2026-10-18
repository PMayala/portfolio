import type { T } from "@/i18n"

const t = (en: string, fr: string): T => ({ en, fr })

export const person = {
  name: "Plamedi Mayala",
  email: "mayalaplamedi.rw@gmail.com",
  phone: "+250 785 368 349",
  phoneHref: "tel:+250785368349",
  city: "Kigali, Rwanda",
  timeZone: "Africa/Kigali",
  cv: t("/Plamedi-Mayala-CV-en.pdf", "/Plamedi-Mayala-CV-fr.pdf"),
  url: "https://plamedi-mayala.vercel.app",
  links: [
    { label: "GitHub", href: "https://github.com/PMayala" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/plamedi-mayala-1b1681287/" },
  ],
}

export const ui = {
  nav: {
    work: t("Work", "Projets"),
    practice: t("How I work", "Méthode"),
    clients: t("Clients", "Clients"),
    about: t("About", "Profil"),
    contact: t("Contact", "Contact"),
  },
  cv: t("CV", "CV"),
  menu: t("Menu", "Menu"),
  close: t("Close", "Fermer"),
  kigali: t("Kigali", "Kigali"),
  theme: t("Switch colour theme", "Changer de thème"),
  jump: t("Jump to", "Aller à"),
  search: t("Type a page or project", "Tapez une page ou un projet"),
  noResults: t("Nothing matches", "Aucun résultat"),
  copy: t("Copy email", "Copier l'e-mail"),
  copied: t("Copied", "Copié"),
  viewCase: t("Read the case", "Lire l'étude"),
  viewProject: t("See the project", "Voir le projet"),
  preview: t("Open preview", "Ouvrir l'aperçu"),
  back: t("All work", "Tous les projets"),
  next: t("Next", "Suivant"),
  role: t("Role", "Rôle"),
  year: t("Year", "Année"),
  status: t("Status", "Statut"),
  stack: t("Tools", "Outils"),
  links: t("Links", "Liens"),
  sources: t("Sources", "Sources"),
  context: t("Context", "Contexte"),
  did: t("What I did", "Ce que j'ai fait"),
  decisions: t("Decisions", "Choix"),
  outcome: t("Outcome", "Résultats"),
  screens: t("Screens", "Écrans"),
  brief: t("The brief", "Le brief"),
  available: t("Taking on new work", "Disponible pour de nouveaux projets"),
  top: t("Back to top", "Haut de page"),
  all: t("All", "Tout"),
  soon: t("Soon", "Bientôt"),
}

export const hero = {
  eyebrow: t("Software engineer and product designer", "Ingénieur logiciel et designer produit"),
  title: t("I build the screen, the system behind it, and keep both running.", "Je conçois l'écran, le système derrière, et je fais tourner les deux."),
  lead: t(
    "Kigali. Mobility, fintech and EV charging. I talk to users, test with them, write the code and monitor it after launch.",
    "Kigali. Mobilité, fintech et recharge électrique. J'écoute les utilisateurs, je teste avec eux, j'écris le code et je le surveille après le lancement.",
  ),
  ctaWork: t("See the work", "Voir les projets"),
  ctaContact: t("Write to me", "M'écrire"),
}

export type Stat = { value: string; label: T; source: T }

export const stats: Stat[] = [
  { value: "50+", label: t("Charging stations kept online", "Stations de recharge maintenues en ligne"), source: t("EVPlugin", "EVPlugin") },
  { value: "8,000", label: t("Charging sessions a month on a platform I ran", "Sessions de recharge par mois sur une plateforme que je gérais"), source: t("EVPlugin, monthly average", "EVPlugin, moyenne mensuelle") },
  { value: "1,200", label: t("Beta users on Aplini, which I co-founded", "Utilisateurs bêta sur Aplini, que j'ai cofondée"), source: t("Aplini, 2025", "Aplini, 2025") },
  { value: "78.5", label: t("Usability score in the Byaboneka+ field test", "Score d'utilisabilité au test terrain Byaboneka+"), source: t("SUS, 12 users", "SUS, 12 utilisateurs") },
]

export const about = {
  statement: t(
    "I wrote my first programs in 2019, in a maths, physics and computer science class at École des Sciences Byimana. In 2023 I started software engineering at African Leadership University in Kigali, and I have worked on real products ever since: interfaces for an agritech startup, a bike sharing app, a live EV charging platform, a career platform I co-founded. Today I lead creative direction at 4PM Digital Agency. The method has not changed: meet the people who will use the product, test with them early, ship, then watch what happens in production.",
    "J'ai écrit mes premiers programmes en 2019, en section maths, physique et informatique à l'École des Sciences Byimana. En 2023, j'ai commencé le génie logiciel à l'African Leadership University à Kigali, et depuis je travaille sur de vrais produits : des interfaces pour une startup agritech, une appli de vélos partagés, une plateforme de recharge en service, une plateforme d'emploi que j'ai cofondée. Aujourd'hui, je dirige la création chez 4PM Digital Agency. La méthode n'a pas changé : rencontrer ceux qui utiliseront le produit, tester tôt avec eux, livrer, puis observer ce qui se passe en production.",
  ),
  short: t("Writing software since 2019. Designing it with the people who use it.", "J'écris du logiciel depuis 2019. Je le conçois avec ceux qui l'utilisent."),
  offClock: t("Off the clock: music, photography, film and open source.", "En dehors du travail : musique, photographie, cinéma et open source."),
  portraitAlt: t("Portrait of Plamedi Mayala", "Portrait de Plamedi Mayala"),
  timeline: [
    { year: "2019", text: t("A Levels in maths, physics and computer science. First programs.", "Bac maths, physique, informatique. Premiers programmes.") },
    { year: "2022", text: t("Websites and IT for small businesses and NGOs, ten projects and more.", "Sites et informatique pour petites entreprises et ONG, plus de dix projets.") },
    { year: "2023", text: t("BSc Software Engineering at African Leadership University, Kigali.", "Licence en génie logiciel à l'African Leadership University, Kigali.") },
    { year: "2024", text: t("Frontend at Agrisense, mobile at GURARIDE, then IT Officer at EVPlugin.", "Frontend chez Agrisense, mobile chez GURARIDE, puis responsable informatique chez EVPlugin.") },
    { year: "2025", text: t("Co-founded Aplini, about 1,200 beta users.", "Cofondateur d'Aplini, environ 1 200 utilisateurs bêta.") },
    { year: "2026", text: t("Finished the BSc with Upper Second honours. Creative Director at 4PM Digital Agency.", "Licence terminée avec mention bien. Directeur de création chez 4PM Digital Agency.") },
  ],
}

export type Role = { period: T; place: string; title: T; org: string; summary: T; points: T[]; tags: string[] }

export const experience: Role[] = [
  {
    period: t("Jun 2026 to now", "Juin 2026 à aujourd'hui"),
    place: "Kigali",
    title: t("Creative Director", "Directeur de création"),
    org: "4PM Digital Agency Ltd",
    summary: t("Digital agency in Kigali building websites, apps and brands for businesses.", "Agence numérique à Kigali : sites, applis et marques pour les entreprises."),
    points: [t("Lead creative direction on client projects, from the first scope to launch, working with the agency's designers, developers and specialists.", "Direction de création sur les projets clients, du cadrage au lancement, avec les designers, développeurs et spécialistes de l'agence.")],
    tags: ["Creative direction", "Brand", "Product"],
  },
  {
    period: t("Dec 2024 to Jun 2026", "Déc. 2024 à juin 2026"),
    place: "Kigali",
    title: t("IT Officer", "Responsable informatique"),
    org: "EVPlugin E-Mobility Rwanda",
    summary: t("Charging platform for drivers, station operators and site owners.", "Plateforme de recharge pour conducteurs, opérateurs et propriétaires de sites."),
    points: [
      t("Kept the platform healthy for more than 50 stations and about 8,000 sessions a month: availability, failed sessions, payment errors, incidents to a root cause.", "Plateforme maintenue en forme pour plus de 50 stations et environ 8 000 sessions par mois : disponibilité, sessions échouées, erreurs de paiement, incidents jusqu'à la cause racine."),
      t("Matched charging transactions against Mobile Money payments and chased every gap until the books closed.", "Transactions rapprochées des paiements Mobile Money, chaque écart suivi jusqu'à la clôture."),
      t("Tested releases before live chargers, fixed defects, wrote user guides and trained station staff.", "Versions testées avant les bornes, défauts corrigés, guides rédigés, personnel formé."),
    ],
    tags: ["Monitoring", "Incidents", "Reconciliation"],
  },
  {
    period: t("Jan 2025 to Jan 2026", "Janv. 2025 à janv. 2026"),
    place: "Kigali, part time",
    title: t("Co-founder and Software Developer", "Cofondateur et développeur"),
    org: "Aplini",
    summary: t("Career platform for finding and applying to jobs. About 1,200 beta users.", "Plateforme pour trouver un emploi et postuler. Environ 1 200 utilisateurs bêta."),
    points: [
      t("Built it with Next.js, Node.js and Supabase, including semantic matching on OpenAI embeddings and pgvector.", "Développée avec Next.js, Node.js et Supabase, dont le rapprochement sémantique (embeddings OpenAI, pgvector)."),
      t("Set up SQL dashboards and used them with user feedback to choose what to build next.", "Tableaux SQL, croisés avec les retours, pour décider de la suite."),
    ],
    tags: ["Next.js", "pgvector", "Analytics"],
  },
  {
    period: t("Dec 2024 to Dec 2025", "Déc. 2024 à déc. 2025"),
    place: "Kigali",
    title: t("Product Designer and Developer", "Designer produit et développeur"),
    org: "S.U.L E-Mobility",
    summary: t("Customer web app and campaigns for an e-mobility brand.", "Appli web client et campagnes pour une marque d'e-mobilité."),
    points: [t("Shipped the customer web app on a reusable component system and shot the campaigns that brought the first qualified leads.", "Appli web client sur un système de composants, campagnes qui ont apporté les premiers prospects.")],
    tags: ["Design system", "Content"],
  },
  { period: t("2024 to 2025", "2024 à 2025"), place: "Kigali", title: t("Mobile App Developer", "Développeur mobile"), org: "GURARIDE Rwanda", summary: t("Design and mobile development for a consumer mobility app.", "Design et développement mobile d'une appli de mobilité."), points: [], tags: ["Mobile"] },
  { period: t("Sep to Dec 2024", "Sept. à déc. 2024"), place: "Kigali", title: t("Frontend Developer", "Développeur frontend"), org: "Agrisense Technologies", summary: t("Web interfaces for machine learning crop and soil advice.", "Interfaces web de conseil cultures et sols."), points: [], tags: ["React"] },
  { period: t("Sep to Oct 2024", "Sept. à oct. 2024"), place: "Kigali", title: t("UI/UX Designer, intern", "Designer UI/UX, stagiaire"), org: "ThinkGreen Afrika", summary: t("Research, wireframes and Figma prototypes.", "Recherche, maquettes et prototypes Figma."), points: [], tags: ["Figma"] },
  { period: t("Sep 2022 to May 2023", "Sept. 2022 à mai 2023"), place: "Rwanda", title: t("Multimedia and IT, independent", "Multimédia et informatique, indépendant"), org: "Freelance", summary: t("Ten projects and more for businesses and NGOs: websites, identities, photo, video.", "Plus de dix projets pour entreprises et ONG : sites, identités, photo, vidéo."), points: [], tags: ["Brand", "Photo", "Video"] },
]

export const capabilities: { key: string; title: T; line: T; items: (string | T)[] }[] = [
  { key: "build", title: t("Build", "Développer"), line: t("Web and phone products, front to back.", "Produits web et mobiles, du front au back."), items: ["TypeScript", "JavaScript", "Python", "SQL", "React", "Next.js", "Node.js", "Express", "Django", "REST"] },
  { key: "data", title: t("Data and infrastructure", "Données et infrastructure"), line: t("Storage, search and the pipeline to ship.", "Stockage, recherche et chaîne de livraison."), items: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "pgvector", "Docker", "GitHub Actions", "AWS"] },
  { key: "design", title: t("Design", "Design"), line: t("From an interview to a tested prototype.", "De l'entretien au prototype testé."), items: ["Figma", "Framer", t("User interviews", "Entretiens"), t("Usability tests", "Tests d'utilisabilité"), t("Wireframes", "Maquettes"), t("Design systems", "Systèmes de design")] },
  { key: "operate", title: t("Operate", "Exploiter"), line: t("Know it works, and know first when it stops.", "Savoir que ça marche, et savoir en premier quand ça s'arrête."), items: ["Sentry", "Grafana", t("Alerts", "Alertes"), t("Incident triage", "Tri des incidents"), t("Root cause analysis", "Cause racine"), t("SQL reporting", "Reporting SQL")] },
  { key: "payments", title: t("Payments", "Paiements"), line: t("Money that reconciles to the franc.", "De l'argent rapproché au franc près."), items: ["Mobile Money", t("Card payments", "Paiement carte"), t("Reconciliation", "Rapprochement"), t("RRA EBM invoicing", "Facturation EBM RRA")] },
  { key: "media", title: t("Media", "Médias"), line: t("The story around the product.", "Le récit autour du produit."), items: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects", "DaVinci Resolve"] },
]

/** How I work, each habit tied to a project where it can be checked. */
export const practice = {
  title: t("Four habits, and the projects that prove them.", "Quatre habitudes, et les projets qui les prouvent."),
  lead: t(
    "Good products come from the same loop: understand the people, test with them, change course when the evidence says so, and keep watching after launch.",
    "Les bons produits viennent de la même boucle : comprendre les gens, tester avec eux, changer de cap quand les faits le disent, et continuer d'observer après le lancement.",
  ),
  pillars: [
    {
      key: "users",
      title: t("User centred", "Centré utilisateur"),
      body: t("I start where the product will be used. Bus staff and riders for Byaboneka+, savings group members for Kibina, station staff at EVPlugin. Copy ships in English, French and Kinyarwanda because that is what they speak.", "Je commence là où le produit servira. Personnel de bus et passagers pour Byaboneka+, membres de tontines pour Kibina, personnel des stations chez EVPlugin. Les textes sortent en anglais, français et kinyarwanda, parce que c'est leur langue."),
      proof: t("3 languages on every product", "3 langues sur chaque produit"),
      slug: "byaboneka",
      shot: "/work/byaboneka/how.webp",
      alt: t("Byaboneka+: report, match, verify, return", "Byaboneka+ : signaler, rapprocher, vérifier, restituer"),
    },
    {
      key: "testing",
      title: t("Tested", "Testé"),
      body: t("A five day field pilot with 12 people from KBS and Royal Express gave Byaboneka+ a usability score of 78.5. Kibina's money logic sits behind more than 100 unit tests. At EVPlugin, every release was tested before it reached a live charger.", "Un pilote de cinq jours avec 12 personnes de KBS et Royal Express a donné à Byaboneka+ un score d'utilisabilité de 78,5. La logique financière de Kibina est couverte par plus de 100 tests unitaires. Chez EVPlugin, chaque version était testée avant d'atteindre une borne en service."),
      proof: t("SUS 78.5 in the field", "SUS 78,5 sur le terrain"),
      slug: "byaboneka",
      shot: "/work/byaboneka/mobile.webp",
      alt: t("Byaboneka+ on a phone", "Byaboneka+ sur téléphone"),
    },
    {
      key: "pivot",
      title: t("Ready to pivot", "Prêt à pivoter"),
      body: t("At Aplini, sign ups looked healthy but activation told the real story, so the roadmap moved to activation and matches. Keyword search missed people whose skills came from another field, so matching runs on meaning, with embeddings. On THE GAME, every screen stayed grey until the flow held up, so changing direction cost minutes, not days.", "Chez Aplini, les inscriptions semblaient bonnes mais l'activation disait la vérité : la feuille de route a suivi l'activation et les rapprochements. La recherche par mots clés ratait les profils venus d'ailleurs : le rapprochement se fait donc sur le sens, avec des embeddings. Sur THE GAME, chaque écran est resté gris tant que le parcours ne tenait pas : changer de direction coûtait des minutes, pas des jours."),
      proof: t("Roadmap set by activation data", "Feuille de route fixée par l'activation"),
      slug: "aplini",
      shot: "/work/aplini/hero.webp",
      alt: t("Aplini homepage", "Accueil Aplini"),
    },
    {
      key: "monitoring",
      title: t("Monitored", "Surveillé"),
      body: t("At EVPlugin I kept more than 50 stations and about 8,000 sessions a month healthy: availability, failed sessions and payment errors, every incident taken to a root cause, every Mobile Money payment matched to a session. NEXUS turns that experience into software: alerts that escalate until someone owns them, and a log of every remote command.", "Chez EVPlugin, j'ai maintenu en forme plus de 50 stations et environ 8 000 sessions par mois : disponibilité, sessions échouées, erreurs de paiement, chaque incident mené à sa cause racine, chaque paiement Mobile Money rapproché d'une session. NEXUS transforme cette expérience en logiciel : des alertes qui montent jusqu'à leur prise en charge, et un journal de chaque commande à distance."),
      proof: t("50+ stations, 8,000 sessions a month", "50+ stations, 8 000 sessions par mois"),
      slug: "evplugin",
      shot: "/work/nexus/console-alerts.webp",
      alt: t("Escalated alerts in the NEXUS console", "Alertes escaladées dans la console NEXUS"),
    },
  ],
}

/** Real quotes only. Add { quote, name, role, org } entries and the section appears on the home page. */
export type Testimonial = { quote: T; name: string; role: T; org: string }
export const testimonials: Testimonial[] = []

export const principles: { title: T; body: T }[] = [
  { title: t("Money has to reconcile.", "L'argent doit se rapprocher."), body: t("If a number cannot be traced to a transaction, it is not finished.", "Un chiffre sans transaction derrière n'est pas fini.") },
  { title: t("A working homepage proves nothing.", "Une page d'accueil qui marche ne prouve rien."), body: t("I test the journey people came for: pay, book, claim, get paid.", "Je teste le parcours pour lequel on vient : payer, réserver, réclamer, être payé.") },
  { title: t("Ship in the user's language.", "Livrer dans la langue de l'utilisateur."), body: t("English, French and Kinyarwanda, because that is what my users speak.", "Anglais, français et kinyarwanda, parce que c'est ce que parlent mes utilisateurs.") },
  { title: t("Measure after launch.", "Mesurer après le lancement."), body: t("A redesign is a guess until activation, completion or a usability score says otherwise.", "Une refonte reste une hypothèse tant que les chiffres ne disent pas le contraire.") },
  { title: t("Write it down.", "L'écrire."), body: t("Guides for staff, logs for audits, notes for whoever is on call next.", "Des guides pour le personnel, des journaux pour l'audit, des notes pour la prochaine astreinte.") },
]

export const education = {
  degrees: [
    { title: t("BSc (Hons) Software Engineering", "BSc (Hons) génie logiciel"), org: "African Leadership University, Kigali", period: "2023 to 2026", detail: t("Second Class Honours, Upper Division. CGPA 4.32 out of 5. Capstone: Byaboneka+, supervised by Dirac Murairi.", "Mention bien (Upper Division). CGPA 4,32 sur 5. Projet de fin d'études : Byaboneka+, encadré par Dirac Murairi.") },
    { title: t("A Level: Maths, Physics, Computer Science", "Baccalauréat : maths, physique, informatique"), org: "École des Sciences Byimana", period: "2019 to 2022", detail: t("Final grade 55 out of 60.", "Note finale 55 sur 60.") },
  ],
  certs: [
    { name: "Google UX Design", issuer: t("Google", "Google") },
    { name: "APIs", issuer: t("Meta", "Meta") },
    { name: "GitHub Actions", issuer: t("Duke University", "Duke University") },
    { name: "Grafana Fundamentals", issuer: t("Grafana Labs, 2025", "Grafana Labs, 2025") },
    { name: "Kubernetes Pod Management", issuer: t("Coursera, 2025", "Coursera, 2025") },
    { name: "ITIL 4 Foundation", issuer: t("In progress, Dec 2026", "En cours, déc. 2026") },
  ],
  volunteering: { role: t("Volunteer, Rwanda Red Cross", "Bénévole, Croix-Rouge rwandaise"), period: "2018 to 2022", detail: t("Community service, humanitarian work and youth programmes.", "Service communautaire, action humanitaire et programmes jeunesse.") },
}

export const languages: { name: T; level: T; use: T }[] = [
  { name: t("English", "Anglais"), level: t("Fluent", "Courant"), use: t("Code, docs and clients", "Code, docs et clients") },
  { name: t("French", "Français"), level: t("Fluent", "Courant"), use: t("Clients, product copy, translation", "Clients, textes, traduction") },
  { name: t("Kinyarwanda", "Kinyarwanda"), level: t("Fluent", "Courant"), use: t("Daily life, interviews, field tests", "Vie quotidienne, entretiens, tests terrain") },
  { name: t("Sign language", "Langue des signes"), level: t("Fluent", "Courant"), use: t("Signed conversation", "Conversation signée") },
]

export const contact = {
  title: t("Have a product that needs to work in the real world?", "Un produit qui doit tenir dans le monde réel ?"),
  lead: t("Email is the fastest way to reach me. References on request.", "L'e-mail est le plus rapide. Références sur demande."),
}
