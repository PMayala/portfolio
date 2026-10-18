import type { T } from "@/i18n"

/*
 * Every interface string on the site, in English and French.
 * Components read from here with tr(copy.x.y, lang), so no page holds its own translations.
 */

const t = (en: string, fr: string): T => ({ en, fr })

export const copy = {
  meta: {
    role: t("Software engineer and product designer", "Ingénieur logiciel et designer produit"),
    description: t(
      "Plamedi Mayala, software engineer and product designer in Kigali. User centred, tested and monitored products in mobility, fintech and EV charging.",
      "Plamedi Mayala, ingénieur logiciel et designer produit à Kigali. Des produits centrés utilisateur, testés et surveillés : mobilité, fintech et recharge électrique.",
    ),
    work: t("Work", "Projets"),
    workDescription: t("Case studies and client work in product design and software engineering.", "Études de cas et projets clients en design produit et ingénierie logicielle."),
    about: t("About", "Profil"),
    aboutDescription: t("Experience, skills, education and languages of Plamedi Mayala.", "Parcours, compétences, formation et langues de Plamedi Mayala."),
    access: t("Request access", "Demander l'accès"),
    cv: t("CV", "CV"),
  },

  common: {
    skip: t("Skip to content", "Aller au contenu"),
    home: t("Home", "Accueil"),
    allWork: t("All work", "Tous les projets"),
    projects: t("projects", "projets"),
    cases: t("cases", "études"),
    soon: t("Soon", "Bientôt"),
    sections: t("Sections", "Sections"),
    filter: t("Filter by discipline", "Filtrer par discipline"),
    email: t("Email", "E-mail"),
    otherLang: t("Français", "English"),
    getInTouch: t("Get in touch", "Me contacter"),
    fullProfile: t("Full profile", "Parcours complet"),
    everyProject: t("Every project", "Tous les projets"),
    opensNewTab: t("Projects with a link open in a new tab.", "Les projets avec un lien s'ouvrent dans un nouvel onglet."),
    period: t("Period", "Période"),
    client: t("Client", "Client"),
  },

  home: {
    eyebrow: t("Portfolio · 2026", "Portfolio · 2026"),
    numbers: t("In numbers", "En chiffres"),
    workLabel: t("Selected work", "Projets choisis"),
    workTitle: t("Products people rely on, designed with them, tested in the field and watched after launch.", "Des produits dont les gens dépendent, conçus avec eux, testés sur le terrain et suivis après le lancement."),
    workCount: t("projects in total, with client work and the archive.", "projets au total, avec les clients et l'archive."),
    practiceLabel: t("How I work", "Ma méthode"),
    seeCase: t("See the case", "Voir l'étude"),
    clientsLabel: t("Clients", "Clients"),
    clientsTitle: t("Websites for businesses in Rwanda, from mobility to coffee.", "Des sites pour des entreprises au Rwanda, de la mobilité au café."),
    clientsCount: t("client sites", "sites clients"),
    wordsLabel: t("In their words", "Ce qu'ils en disent"),
    aboutLabel: t("About", "Profil"),
    contactLabel: t("Contact", "Contact"),
  },

  work: {
    title: t("All the work, sorted by craft.", "Tout le travail, rangé par métier."),
    casesLabel: t("Case studies", "Études de cas"),
    casesTitle: t("Projects told end to end, most recent first.", "Les projets racontés de bout en bout, du plus récent au plus ancien."),
    clientsLabel: t("Clients", "Clients"),
    clientsTitle: t("Websites designed and built for private clients.", "Des sites conçus et développés pour des clients privés."),
    archiveTitle: t("Earlier projects, concepts and team work.", "Projets plus anciens, concepts et travaux d'équipe."),
  },

  about: {
    timeline: t("Since 2019", "Depuis 2019"),
    experience: t("Experience", "Parcours"),
    experienceTitle: t("Mobility, fintech, careers and agency work.", "Mobilité, fintech, emploi et agence."),
    capabilities: t("Capabilities", "Compétences"),
    capabilitiesTitle: t("From the first user interview to production.", "Du premier entretien utilisateur à la production."),
    principles: t("Principles", "Principes"),
    principlesTitle: t("Five rules I hold every product to.", "Cinq règles que j'applique à chaque produit."),
    education: t("Education", "Formation"),
    certifications: t("Certifications", "Certifications"),
    languages: t("Languages", "Langues"),
  },

  caseStudy: {
    clientBadge: t("Client project", "Projet client"),
    screensFrom: t("Screenshots from the public sites, October 2026.", "Captures des sites publics, octobre 2026."),
    evidence: {
      "figma-nexus": { title: t("The Figma file", "Le fichier Figma"), lead: t("Three products drawn in one file from the same components: the driver app, the operator console and the public site.", "Trois produits dessinés dans un seul fichier avec les mêmes composants : l'appli conducteur, la console opérateur et le site public.") },
      "game-flow": { title: t("The journey", "Le parcours"), lead: t("From first launch to a new league, in five stages.", "Du premier lancement à la création d'une ligue, en cinq étapes.") },
      "game-compare": { title: t("Wireframe to UI", "De la maquette à l'interface"), lead: t("Five screens taken from the wireframes and carried through to finished UI.", "Cinq écrans repris des maquettes et poussés jusqu'à une interface finie.") },
      "game-wireframes": { title: t("Every frame", "Toutes les maquettes"), lead: t("All 24 low fidelity frames, exported from the Figma file.", "Les 24 maquettes basse fidélité, exportées du fichier Figma.") },
    },
  },

  evidence: {
    screen: t("Screen", "Écran"),
    compare: t("Compare wireframe and UI", "Comparer maquette et interface"),
    uiPrefix: t("UI: ", "Interface : "),
    wire: t("Wireframe (Figma)", "Maquette (Figma)"),
    ui: t("UI (coded)", "Interface (codée)"),
    direction: t("Visual direction", "Direction visuelle"),
    directionTitle: t("The flow is the wireframe flow. Colour does one job: it shows the next action.", "Le parcours reste celui des maquettes. La couleur ne sert qu'à une chose : montrer l'action suivante."),
    rules: [
      t("Dark ground, for match nights.", "Fond sombre, pour les soirs de match."),
      t("One lime green, kept for the next action and points won.", "Un seul vert citron, réservé à l'action et aux points gagnés."),
      t("Tabular figures, so clocks, points and ranks hold still.", "Chiffres tabulaires : chrono, points et classement ne bougent pas."),
      t("The same 20 px margins as the wireframes.", "Les mêmes marges de 20 px que les maquettes."),
    ],
    note: t("Drag across the screen to compare. Wireframes come from the Figma file; the UI is a direction coded from those wireframes.", "Glissez sur l'écran pour comparer. Les maquettes viennent du fichier Figma ; l'interface est une proposition codée à partir de ces maquettes."),
    wirePrefix: t("Wireframe: ", "Maquette : "),
    showAll: t("Show all 24 frames", "Voir les 24 maquettes"),
  },

  figma: {
    parts: [
      { title: t("Driver app", "Appli conducteur"), body: t("Find, charge, pay. Twelve phone screens, from the map to the receipt.", "Trouver, recharger, payer. Douze écrans mobiles, du plan au reçu.") },
      { title: t("Operator console", "Console opérateur"), body: t("More than 40 screens: chargers, sessions, alerts, payments, maintenance and the books.", "Plus de 40 écrans : bornes, sessions, alertes, paiements, maintenance et comptabilité.") },
      { title: t("Public website", "Site public"), body: t("Eleven pages that sell the platform to operators, each ending on the same call to action.", "Onze pages pour présenter la plateforme aux opérateurs, chacune finie sur le même appel à l'action.") },
    ],
    overviewAlt: t("Overview of the NEXUS Figma file", "Vue d'ensemble du fichier Figma NEXUS"),
    overview: t("The whole file, on one canvas.", "Le fichier entier, sur un seul canevas."),
    consoleAlt: t("Operator console frames in Figma", "Écrans de la console opérateur dans Figma"),
    console: t("Operator console, up close.", "Console opérateur, en détail."),
    webAlt: t("Public website pages in Figma", "Pages du site public dans Figma"),
    web: t("Public site: every page ends on the same black block.", "Site public : chaque page se termine par le même bloc noir."),
  },

  ops: {
    title: t("One session, watched end to end", "Une session, surveillée de bout en bout"),
    stations: t("stations", "stations"),
    steps: [
      { k: t("Charger", "Borne"), s: t("Online, faulted, offline", "En ligne, en défaut, hors ligne") },
      { k: t("Session", "Session"), s: t("Started, stalled, failed", "Démarrée, bloquée, échouée") },
      { k: t("Payment", "Paiement"), s: t("Authorised, captured, error", "Autorisé, encaissé, erreur") },
      { k: t("Receipt", "Reçu"), s: t("Signed by RRA EBM", "Signé par l'EBM RRA") },
      { k: t("Books", "Comptes"), s: t("Matched to settlement", "Rapproché du règlement") },
    ],
    signal: t("Signal", "Signal"),
    signalBody: t("failed sessions, payment errors, availability", "sessions échouées, erreurs de paiement, disponibilité"),
    action: t("Action", "Action"),
    actionBody: t("triage, assign, fix, verify", "qualifier, attribuer, corriger, vérifier"),
    proof: t("Proof", "Preuve"),
    proofBody: t("every franc reconciled at close", "chaque franc rapproché à la clôture"),
    live: t("Live operations", "Exploitation en direct"),
    online: t("stations online", "stations en ligne"),
    sessions: t("sessions a month", "sessions par mois"),
    soonKicker: t("Archive", "Archive"),
    soonTitle: t("Coming soon", "Bientôt"),
    soonBody: t("Photography, film and brand identities, collected here soon.", "Photo, film et identités de marque, réunis ici prochainement."),
  },

  footer: {
    cases: t("Cases", "Études"),
    clients: t("Clients", "Clients"),
    pages: t("Pages", "Pages"),
    contact: t("Contact", "Contact"),
    colophon: t("Set in Zalando Sans and Zalando Sans Expanded (SIL OFL). Built with Next.js.", "Composé en Zalando Sans et Zalando Sans Expanded (SIL OFL). Construit avec Next.js."),
  },

  cmd: {
    pages: t("Pages", "Pages"),
    work: t("Work", "Projets"),
    actions: t("Actions", "Actions"),
    links: t("Links", "Liens"),
  },

  access: {
    title: t("This portfolio is shared on request.", "Ce portfolio est partagé sur demande."),
    lead: t(
      "It holds client work and internal screens, so I share it with recruiters and teams directly. Ask for access below, or enter the code I sent you.",
      "Il contient des projets clients et des écrans internes : je le partage directement avec les recruteurs et les équipes. Demandez l'accès ci-dessous, ou saisissez le code que je vous ai envoyé.",
    ),
    haveCode: t("I have a code", "J'ai un code"),
    code: t("Access code", "Code d'accès"),
    enter: t("Open the portfolio", "Ouvrir le portfolio"),
    wrong: t("That code does not work. Check it, or request access.", "Ce code ne fonctionne pas. Vérifiez-le, ou demandez l'accès."),
    request: t("Request access", "Demander l'accès"),
    name: t("Your name", "Votre nom"),
    email: t("Work email", "E-mail professionnel"),
    company: t("Company", "Entreprise"),
    reason: t("What is it for?", "C'est pour quoi ?"),
    reasonPlaceholder: t("A role, a project, a referral", "Un poste, un projet, une recommandation"),
    send: t("Send request", "Envoyer la demande"),
    sending: t("Sending", "Envoi"),
    sent: t("Request sent. You will get a code by email.", "Demande envoyée. Vous recevrez un code par e-mail."),
    mailFallback: t("Your email app opened with the request ready to send.", "Votre messagerie s'est ouverte avec la demande prête à partir."),
    subject: t("Portfolio access request", "Demande d'accès au portfolio"),
    preview: t("What is inside", "Ce qu'il contient"),
    inside: [
      t("Eight case studies: EV charging, fintech, transport, careers, mobility", "Huit études de cas : recharge électrique, fintech, transport, emploi, mobilité"),
      t("Client websites, Figma files and coded UI", "Sites clients, fichiers Figma et interfaces codées"),
      t("Field tests, usability scores and monitoring in production", "Tests terrain, scores d'utilisabilité et supervision en production"),
      t("CV in English and French", "CV en anglais et en français"),
    ],
  },

  notFound: {
    title: t("Not here.", "Rien ici."),
    body: t("This page does not exist, or it moved.", "Cette page n'existe pas, ou elle a été déplacée."),
  },
}
