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
  url: "https://plamedi-mayala-nu.vercel.app",
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
  eyebrow: t("Software developer · DevOps · UI/UX", "Développeur logiciel · DevOps · UI/UX"),
  title: t("I build, fix, monitor and analyse the systems people rely on.", "Je construis, répare, surveille et analyse les systèmes dont les gens dépendent."),
  lead: t(
    "Kigali. Hands on experience in platform operations and IT support: uptime and error rates watched, incidents taken to the root cause, infrastructure in code, releases through reviewed pipelines.",
    "Kigali. Une expérience concrète de l'exploitation de plateformes et du support informatique : disponibilité et taux d'erreur suivis, incidents menés à la cause racine, infrastructure en code, livraisons par pipelines revus.",
  ),
  ctaWork: t("See the work", "Voir les projets"),
  ctaContact: t("Write to me", "M'écrire"),
}

export type Stat = { value: string; label: T; source: T }

export const stats: Stat[] = [
  { value: "50+", label: t("Charging stations kept healthy with Grafana and Prometheus alerts", "Stations de recharge suivies avec des alertes Grafana et Prometheus"), source: t("EVPlugin", "EVPlugin") },
  { value: "8,000", label: t("Charging sessions a month on a platform I ran", "Sessions de recharge par mois sur une plateforme que je gérais"), source: t("EVPlugin, monthly average", "EVPlugin, moyenne mensuelle") },
  { value: "1,200", label: t("Beta users on Aplini, which I co-founded", "Utilisateurs bêta sur Aplini, que j'ai cofondée"), source: t("Aplini, 2025", "Aplini, 2025") },
  { value: "78.5", label: t("Usability score in the Byaboneka+ field pilot", "Score d'utilisabilité au pilote terrain Byaboneka+"), source: t("SUS, 12 users", "SUS, 12 utilisateurs") },
]

export const about = {
  statement: t(
    "I wrote my first programs in 2019, in a maths, physics and computer science class at École des Sciences Byimana. From 2020 I built PHP websites and handled IT support for small businesses and NGOs, then studied software engineering at African Leadership University. Since then I have run a live EV charging platform, co-founded a career platform and now lead creative direction at 4PM Digital Agency. I build systems, keep an eye on how they perform, fix what breaks and look at the data to see what can be improved. I work well with technical teams and non technical users alike, and I am most useful where day to day reliability matters.",
    "J'ai écrit mes premiers programmes en 2019, en section maths, physique et informatique à l'École des Sciences Byimana. Dès 2020, j'ai créé des sites PHP et assuré le support informatique de petites entreprises et d'ONG, avant d'étudier le génie logiciel à l'African Leadership University. Depuis, j'ai exploité une plateforme de recharge en service, cofondé une plateforme d'emploi, et je dirige aujourd'hui la création chez 4PM Digital Agency. Je construis des systèmes, je surveille leurs performances, je répare ce qui casse et je lis les données pour voir ce qui peut s'améliorer. Je travaille aussi bien avec des équipes techniques qu'avec des utilisateurs non techniques, et je suis le plus utile là où la fiabilité au quotidien compte.",
  ),
  short: t("Software developer. Reliability first, people always.", "Développeur logiciel. La fiabilité d'abord, les gens toujours."),
  offClock: t("Off the clock: music, photography, film and open source.", "En dehors du travail : musique, photographie, cinéma et open source."),
  portraitAlt: t("Portrait of Plamedi Mayala", "Portrait de Plamedi Mayala"),
  timeline: [
    { year: "2019", text: t("A Levels in maths, physics and computer science. First programs.", "Bac maths, physique, informatique. Premiers programmes.") },
    { year: "2020", text: t("PHP websites, IT support, identities, photo and video for businesses and NGOs.", "Sites PHP, support informatique, identités, photo et vidéo pour entreprises et ONG.") },
    { year: "2023", text: t("BSc Software Engineering at African Leadership University, Kigali.", "Licence en génie logiciel à l'African Leadership University, Kigali.") },
    { year: "2024", text: t("Frontend at Agrisense, UI/UX at GURARIDE, then IT Officer at EVPlugin.", "Frontend chez Agrisense, UI/UX chez GURARIDE, puis responsable informatique chez EVPlugin.") },
    { year: "2025", text: t("Co-founded Aplini, about 1,200 beta users.", "Cofondateur d'Aplini, environ 1 200 utilisateurs bêta.") },
    { year: "2026", text: t("BSc with Upper Second honours. Creative Director at 4PM Digital Agency.", "Licence avec mention bien. Directeur de création chez 4PM Digital Agency.") },
  ],
}

export type Role = { period: T; place: string; title: T; org: string; summary: T; points: T[]; tags: string[] }

export const experience: Role[] = [
  {
    period: t("Jun 2026 to now", "Juin 2026 à aujourd'hui"),
    place: "Kigali",
    title: t("Creative Director", "Directeur de création"),
    org: "4PM Digital Agency Ltd",
    summary: t("Digital agency building websites, apps and brands for businesses.", "Agence numérique : sites, applis et marques pour les entreprises."),
    points: [
      t("Set the creative direction and lead product design and UI/UX for client websites, apps and brands, from first concept to launch.", "Direction de création, design produit et UI/UX des sites, applis et marques des clients, du premier concept au lancement."),
      t("Scope each project with the client and run delivery with clear project management, leading the agency's developers and specialists.", "Cadrage de chaque projet avec le client et pilotage de la livraison, à la tête des développeurs et spécialistes de l'agence."),
      t("Plan the solution architecture for client builds and ship them to AWS through GitHub Actions pipelines, on Dockerised Linux servers behind Nginx with monitoring in place.", "Architecture des projets clients, livrés sur AWS par pipelines GitHub Actions, sur serveurs Linux dockerisés derrière Nginx, avec supervision."),
    ],
    tags: ["Creative direction", "Architecture", "AWS", "CI/CD"],
  },
  {
    period: t("Dec 2024 to Jun 2026", "Déc. 2024 à juin 2026"),
    place: "Kigali",
    title: t("IT Officer", "Responsable informatique"),
    org: "EVPlugin E-Mobility Rwanda",
    summary: t("Charging management platform serving drivers, station operators and site owners.", "Plateforme de gestion de recharge pour conducteurs, opérateurs et propriétaires de sites."),
    points: [
      t("Kept the platform healthy for 50+ stations and about 8,000 sessions a month with Grafana and Prometheus alerts on availability, failed sessions and payment errors; led incident response through to root cause and wrote the runbooks.", "Plateforme maintenue en forme pour plus de 50 stations et environ 8 000 sessions par mois, avec des alertes Grafana et Prometheus sur la disponibilité, les sessions échouées et les erreurs de paiement ; réponse aux incidents jusqu'à la cause racine et rédaction des runbooks."),
      t("Ran the Dockerised services on Linux and AWS, with infrastructure in Terraform, IAM access controls, secrets management and backups proven by test restores.", "Services dockerisés sur Linux et AWS, infrastructure en Terraform, contrôles d'accès IAM, gestion des secrets et sauvegardes vérifiées par des restaurations."),
      t("Handled integration with chargers over OCPP and roaming partners over OCPI, and troubleshot GSM connectivity on station modems and mobile devices.", "Intégration des bornes en OCPP et des partenaires d'itinérance en OCPI, dépannage de la connectivité GSM des modems et appareils mobiles."),
      t("Reconciled charging transactions against Mobile Money and VAS payments in SQL (PostgreSQL, MySQL) and chased every mismatch until the books closed.", "Rapprochement des transactions avec les paiements Mobile Money et VAS en SQL (PostgreSQL, MySQL), chaque écart suivi jusqu'à la clôture."),
      t("Tested releases in staging before they reached live chargers, fixed defects, supported drivers and operators, and trained station staff.", "Versions testées en préproduction avant les bornes en service, défauts corrigés, support aux conducteurs et opérateurs, formation du personnel."),
    ],
    tags: ["Grafana", "Prometheus", "Terraform", "OCPP", "SQL"],
  },
  {
    period: t("Jan 2025 to Jan 2026", "Janv. 2025 à janv. 2026"),
    place: "Kigali, part time",
    title: t("Co-founder and Software Developer", "Cofondateur et développeur"),
    org: "Aplini",
    summary: t("Career platform for job discovery and applications. Grew to about 1,200 beta users.", "Plateforme pour trouver un emploi et postuler. Environ 1 200 utilisateurs bêta."),
    points: [
      t("Built the product with Next.js, Node.js and Supabase, including semantic job matching on OpenAI embeddings and pgvector, so people see roles that fit their skills, not only their keywords.", "Produit développé avec Next.js, Node.js et Supabase, dont le rapprochement sémantique (embeddings OpenAI, pgvector) : des offres adaptées aux compétences, pas seulement aux mots clés."),
      t("Protected user data with SSO (OAuth 2.0), row level access controls and encryption, and assessed the vendor risk of depending on third party AI APIs.", "Données protégées par SSO (OAuth 2.0), contrôles d'accès par ligne et chiffrement ; évaluation du risque fournisseur lié aux API d'IA tierces."),
      t("Set up code review, CI/CD on GitHub Actions, Sentry monitoring and separate development, staging and production environments.", "Revue de code, CI/CD sur GitHub Actions, supervision Sentry et environnements séparés de développement, préproduction et production."),
      t("Led product priorities using SQL dashboards for sign ups, activation and matches, combined with analysis of user feedback.", "Priorités produit fixées avec des tableaux SQL (inscriptions, activation, rapprochements) et l'analyse des retours utilisateurs."),
    ],
    tags: ["Next.js", "pgvector", "OAuth 2.0", "Sentry"],
  },
  {
    period: t("Dec 2024 to Dec 2025", "Déc. 2024 à déc. 2025"),
    place: "Kigali",
    title: t("Product Designer and Developer", "Designer produit et développeur"),
    org: "S.U.L E-Mobility",
    summary: t("Customer web app and campaigns for an e-mobility brand.", "Appli web client et campagnes pour une marque d'e-mobilité."),
    points: [
      t("Designed and shipped the customer web app in Next.js and TypeScript on a reusable design system, shaped by user interviews and usability testing.", "Appli web client conçue et livrée en Next.js et TypeScript sur un système de design réutilisable, guidée par des entretiens et des tests d'utilisabilité."),
      t("Built REST API integrations with the backend and payment providers, deployed with Docker and GitHub Actions.", "Intégrations d'API REST avec le backend et les prestataires de paiement, déployées avec Docker et GitHub Actions."),
      t("Shot the photos and video for targeted campaigns that brought the company its first qualified leads.", "Photos et vidéos des campagnes ciblées qui ont apporté les premiers prospects qualifiés."),
    ],
    tags: ["Design system", "REST", "Docker"],
  },
  { period: t("2024 to 2025", "2024 à 2025"), place: "Kigali", title: t("UI/UX Designer", "Designer UI/UX"), org: "GURARIDE Rwanda", summary: t("Designed the mobile app in Figma, from flows to UI, tested it with riders and helped the developers with code (Java, XML layouts) when needed.", "Appli mobile conçue dans Figma, des parcours à l'interface, testée avec des cyclistes, avec un coup de main au code (Java, mises en page XML)."), points: [], tags: ["Figma", "Usability testing"] },
  { period: t("Sep to Dec 2024", "Sept. à déc. 2024"), place: "Kigali", title: t("Frontend Developer", "Développeur frontend"), org: "Agrisense Technologies", summary: t("React interfaces for machine learning crop and soil advice on Python and Django REST APIs, built light for low bandwidth use.", "Interfaces React de conseil cultures et sols sur API Python et Django REST, légères pour les connexions lentes."), points: [], tags: ["React", "Django"] },
  { period: t("Sep to Oct 2024", "Sept. à oct. 2024"), place: "Kigali", title: t("UI/UX Designer, intern", "Designer UI/UX, stagiaire"), org: "ThinkGreen Afrika", summary: t("User research, wireframes, Figma prototypes and usability testing.", "Recherche utilisateur, maquettes, prototypes Figma et tests d'utilisabilité."), points: [], tags: ["Figma"] },
  { period: t("2020 to May 2023", "2020 à mai 2023"), place: "Rwanda", title: t("Multimedia and IT, independent", "Multimédia et informatique, indépendant"), org: "Freelance", summary: t("Ten projects and more for businesses and NGOs: PHP websites on MySQL and Microsoft SQL Server, IT support and troubleshooting, identities, photo and video.", "Plus de dix projets pour entreprises et ONG : sites PHP sur MySQL et Microsoft SQL Server, support et dépannage informatique, identités, photo et vidéo."), points: [], tags: ["PHP", "IT support", "Photo", "Video"] },
]

/** Toolkit, in the order of the CV: infrastructure and operations first, then product and people. */
export const capabilities: { key: string; title: T; line: T; items: (string | T)[] }[] = [
  { key: "cloud", title: t("Cloud and IaC", "Cloud et IaC"), line: t("Reproducible dev, staging and production.", "Développement, préproduction et production reproductibles."), items: ["AWS (EC2, S3, RDS, VPC, IAM, CloudWatch)", "Terraform", "Docker", "Kubernetes", "Linux", "Nginx"] },
  { key: "cicd", title: t("CI/CD", "CI/CD"), line: t("Reviewed pipelines, no hand deploys.", "Pipelines revus, aucun déploiement à la main."), items: ["GitHub Actions", t("Automated tests", "Tests automatisés"), t("Builds and releases", "Builds et livraisons"), t("Git workflows", "Workflows Git")] },
  { key: "observability", title: t("Observability", "Observabilité"), line: t("Alerts that reach a person.", "Des alertes qui atteignent une personne."), items: ["Grafana", "Prometheus", "Sentry", "CloudWatch", t("Uptime, error rate and latency alerts", "Alertes disponibilité, erreurs et latence"), t("Incident response", "Réponse aux incidents"), t("Runbooks", "Runbooks"), t("Root cause analysis", "Analyse de cause racine")] },
  { key: "reliability", title: t("Reliability", "Fiabilité"), line: t("Backups that are tested, costs that are tracked.", "Des sauvegardes testées, des coûts suivis."), items: [t("Tested restores", "Restaurations testées"), t("Disaster recovery", "Reprise après sinistre"), t("Business continuity", "Continuité d'activité"), t("Cost tracking", "Suivi des coûts"), t("Performance monitoring", "Suivi des performances")] },
  { key: "security", title: t("Security and privacy", "Sécurité et confidentialité"), line: t("Access, encryption and the risk of every vendor.", "Accès, chiffrement et risque de chaque fournisseur."), items: ["SSO (OAuth 2.0, OIDC, SAML)", t("Encryption in transit and at rest", "Chiffrement en transit et au repos"), t("Secrets management", "Gestion des secrets"), t("Vulnerability management", "Gestion des vulnérabilités"), t("De-identification", "Désidentification"), t("Data sovereignty", "Souveraineté des données")] },
  { key: "architecture", title: t("Architecture", "Architecture"), line: t("Systems that hold up on real networks.", "Des systèmes qui tiennent sur de vrais réseaux."), items: [t("Solution architecture", "Architecture de solution"), t("Multi tenant platforms", "Plateformes multi locataires"), t("Offline first, low bandwidth", "Hors ligne d'abord, faible débit"), t("Systems integration", "Intégration de systèmes"), "REST APIs", "XML"] },
  { key: "code", title: t("Programming and data", "Programmation et données"), line: t("Front to back, and the databases behind.", "Du front au back, et les bases derrière."), items: ["TypeScript", "JavaScript", "Python", "Java", "PHP", "SQL", "React", "Next.js", "Node.js", "Django", "PostgreSQL", "MySQL", "SQL Server", "Oracle", "Supabase", "MongoDB", "Redis"] },
  { key: "ai", title: t("AI", "IA"), line: t("Used where it helps, with the risk assessed.", "Utilisée là où elle aide, avec le risque évalué."), items: ["OpenAI APIs", "Embeddings", "pgvector", t("Semantic search", "Recherche sémantique")] },
  { key: "telecoms", title: t("Telecoms and payments", "Télécoms et paiements"), line: t("Money that reconciles to the franc.", "De l'argent rapproché au franc près."), items: ["GSM", t("Roaming (OCPI)", "Itinérance (OCPI)"), "VAS", "Mobile Money", t("Card payments", "Paiement carte"), t("Reconciliation", "Rapprochement"), "RRA EBM"] },
  { key: "design", title: t("Design", "Design"), line: t("From an interview to a tested prototype.", "De l'entretien au prototype testé."), items: ["Figma", "Framer", t("User interviews", "Entretiens"), t("Usability testing", "Tests d'utilisabilité"), t("Design systems", "Systèmes de design"), "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "DaVinci Resolve"] },
  { key: "ways", title: t("Ways of working", "Façon de travailler"), line: t("Technical needs, explained to everyone.", "Les besoins techniques, expliqués à tous."), items: [t("Leadership", "Leadership"), t("Project management", "Gestion de projet"), t("Troubleshooting", "Dépannage"), t("Customer service", "Service client"), "Microsoft Office"] },
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
      body: t("At EVPlugin I kept more than 50 stations and about 8,000 sessions a month healthy with Grafana and Prometheus alerts on availability, failed sessions and payment errors. Every incident went to a root cause and into a runbook, and every Mobile Money payment was matched to a session. NEXUS turns that experience into software: alerts that escalate until someone owns them, and a log of every remote command.", "Chez EVPlugin, j'ai maintenu en forme plus de 50 stations et environ 8 000 sessions par mois avec des alertes Grafana et Prometheus sur la disponibilité, les sessions échouées et les erreurs de paiement. Chaque incident est allé jusqu'à sa cause racine et dans un runbook, chaque paiement Mobile Money a été rapproché d'une session. NEXUS transforme cette expérience en logiciel : des alertes qui montent jusqu'à leur prise en charge, et un journal de chaque commande à distance."),
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
    { title: t("BSc (Hons) Software Engineering", "BSc (Hons) génie logiciel"), org: "African Leadership University, Kigali", period: "2023 to 2026", detail: t("Second Class Honours, Upper Division. CGPA 4.32 out of 5. Capstone: Byaboneka+ (field pilot).", "Mention bien (Upper Division). CGPA 4,32 sur 5. Projet de fin d'études : Byaboneka+ (pilote terrain).") },
    { title: t("A Level: Mathematics, Physics and Computer Science", "Baccalauréat : mathématiques, physique, informatique"), org: "École des Sciences Byimana", period: "2019 to 2022", detail: t("Final grade 55 out of 60.", "Note finale 55 sur 60.") },
  ],
  certs: [
    { name: t("ITIL 4 Foundation", "ITIL 4 Foundation"), issuer: t("In progress, Dec 2026", "En cours, déc. 2026") },
    { name: t("Grafana Fundamentals", "Grafana Fundamentals"), issuer: t("Grafana Labs, 2025", "Grafana Labs, 2025") },
    { name: t("Kubernetes Pod Management", "Kubernetes Pod Management"), issuer: t("Coursera, 2025", "Coursera, 2025") },
    { name: t("GitHub Actions", "GitHub Actions"), issuer: t("Duke University", "Duke University") },
    { name: t("APIs", "APIs"), issuer: t("Meta", "Meta") },
    { name: t("Volunteer Certificate", "Certificat de bénévolat"), issuer: t("Rwanda Red Cross", "Croix-Rouge rwandaise") },
  ],
  volunteering: { role: t("Volunteer, Rwanda Red Cross", "Bénévole, Croix-Rouge rwandaise"), period: "2018 to 2022", detail: t("Community service, humanitarian work and youth programmes.", "Service communautaire, action humanitaire et programmes jeunesse.") },
}

/** CEFR levels and self rated skills (5 = fluent), as in the CV. */
export const languages: { name: T; level: string; speak: number; write: number | null; read: number | null; use: T }[] = [
  { name: t("English", "Anglais"), level: "C1", speak: 5, write: 5, read: 5, use: t("Working language for code, documentation and clients", "Langue de travail : code, documentation et clients") },
  { name: t("French", "Français"), level: "C1", speak: 5, write: 5, read: 5, use: t("Client work, product copy, translation", "Projets clients, textes produit, traduction") },
  { name: t("Kinyarwanda", "Kinyarwanda"), level: "C1", speak: 5, write: 5, read: 5, use: t("Daily life, user interviews, field pilots", "Vie quotidienne, entretiens, pilotes terrain") },
  { name: t("Sign language", "Langue des signes"), level: "C1", speak: 5, write: null, read: null, use: t("Signed conversation (speaking = signing)", "Conversation signée (parler = signer)") },
]

/** Referees: names and roles only on the site. Contact details are in the CV. */
export const referees: { name: string; role: T; org: string }[] = [
  { name: "Eve Kayiranga", role: t("HR Manager", "Responsable RH"), org: "EVPlugin E-Mobility Rwanda" },
  { name: "Eric Matheri", role: t("CFO", "Directeur financier"), org: "EVPlugin E-Mobility Rwanda" },
  { name: "Pelin Mutanguha", role: t("BSE Coach", "Coach BSE"), org: "African Leadership University" },
  { name: "Patrick Malenge", role: t("CEO", "PDG"), org: "Aplini" },
  { name: "Alimamy Bangura", role: t("CEO", "PDG"), org: "ThinkGreen Afrika" },
]

export const contact = {
  title: t("Have a product that needs to work in the real world?", "Un produit qui doit tenir dans le monde réel ?"),
  lead: t("Email is the fastest way to reach me. Five referees are listed in the CV.", "L'e-mail est le plus rapide. Cinq référents figurent dans le CV."),
}
