/* Les contenus destinés à être enrichis avec le rapport final sont réunis ici. */
window.STUDY_CONTENT = {
  title: 'Quand la peur modifie le trajet',
  signature: 'Hackathon emlyon — Groupe 7b, 2026',
  report: { url: null, label: 'Télécharger le rapport' },
  story: [
    { time: '23:40', title: 'Au départ, un trajet ordinaire.', text: 'Rentrer chez soi. Le chemin est connu, la destination aussi. Se déplacer seule fait partie du quotidien.', short: 'Départ', point: [92, 292] },
    { time: '23:44', title: 'La rue se vide. Le regard change.', text: 'Moins de monde, moins de lumière. Rien ne permet d’affirmer qu’un danger existe. Pourtant, la situation paraît moins maîtrisable.', short: 'Malaise', point: [214, 228] },
    { time: '23:47', title: 'Le déplacement devient une stratégie.', text: 'Accélérer. Appeler un proche. Regarder une autre rue. Ces ajustements peuvent rassurer, mais ils changent déjà la manière de se déplacer.', short: 'Adaptation', point: [333, 154] },
    { time: '23:50', title: 'Un choix peut devenir une contrainte.', text: 'Faire un détour, payer un autre transport ou attendre quelqu’un. La question devient : peut-on encore rentrer comme on l’avait prévu ?', short: 'Contrainte', point: [423, 73] }
  ],
  chain: [
    { title: 'Vulnérabilité', line: '« Je maîtrise moins la situation. »', description: 'Un environnement paraît inquiétant, même sans danger clairement identifié.', examples: ['Rue peu fréquentée', 'Heure tardive', 'Quartier mal connu'] },
    { title: 'Adaptation', line: '« Je change ma façon de me déplacer. »', description: 'La personne ajuste son comportement pour retrouver de la confiance ou une capacité d’action.', examples: ['Marcher plus vite', 'Appeler un proche', 'Partager sa position'] },
    { title: 'Contrainte', line: '« Mon trajet ne dépend plus que de moi. »', description: 'L’adaptation peut demander du temps, de l’argent ou la disponibilité d’une autre personne.', examples: ['Faire un détour', 'Payer un VTC', 'Attendre un accompagnement'] },
    { title: 'Renoncement', line: '« Je reporte ou j’abandonne. »', description: 'Dans certaines situations, la personne peut décider de ne pas effectuer le déplacement.', examples: ['Reporter une sortie', 'Attendre le lendemain', 'Annuler un déplacement'] }
  ],
  phone: [
    { id: 'connection', title: 'Être reliée', screen: 'Un proche, à distance.', detail: 'Appels, messages et partage de position peuvent maintenir un lien. Mais savoir où se trouve une personne ne signifie pas pouvoir intervenir à proximité.', metric: { question: 'reactions', item: 'call' }, caption: 'déclarent appeler quelqu’un' },
    { id: 'battery', title: 'Batterie & réseau', screen: 'Et si le lien se coupe ?', detail: 'Une batterie vide ou une connexion absente peut rendre indisponibles les stratégies qui reposent sur le téléphone.', metric: { question: 'phoneLimits', item: 'battery' }, caption: 'citent la batterie ou le réseau' },
    { id: 'unlock', title: 'Sortir le téléphone', screen: 'Un geste de plus.', detail: 'Sortir et déverrouiller l’appareil demande une action supplémentaire dans un moment où l’attention est déjà mobilisée.', metric: { question: 'phoneLimits', item: 'unlock' }, caption: 'citent la sortie et le déverrouillage' }
  ],
  journey: [
    { title: 'Préparer', text: 'Choisir un horaire, un itinéraire et un moyen de transport.', need: 'Anticiper les conditions du trajet.' },
    { title: 'Se déplacer', text: 'Marcher, attendre, prendre les transports. Le trajet suit son cours.', need: 'Garder son autonomie.' },
    { title: 'Ressentir', text: 'Une situation semble inhabituelle. Le danger n’est pas nécessairement établi.', need: 'Comprendre et reprendre du contrôle.' },
    { title: 'Se rassurer', text: 'Chercher un lien, une présence ou une possibilité d’aide.', need: 'Disposer d’un appui accessible.' },
    { title: 'Signaler', text: 'Si un problème est identifié, le transmettre à un acteur adapté.', need: 'Pouvoir communiquer la situation.' },
    { title: 'Obtenir une aide', text: 'Un acteur apporte un soutien local ou une intervention.', need: 'Une réponse adaptée au contexte.' }
  ],
  actors: [
    { id: 'close', title: 'Les proches', position: 'Proximité affective', role: 'Écouter, suivre un trajet, maintenir un contact.', limit: 'Une présence rassurante, souvent à distance. Leur disponibilité et leur proximité physique varient.', examples: 'Amis, famille, partenaire' },
    { id: 'local', title: 'Les personnes sur place', position: 'Proximité physique', role: 'Accueillir, orienter ou apporter une aide locale.', limit: 'Une aide potentiellement proche, qui dépend de la présence, de la disponibilité et des capacités des personnes.', examples: 'Passants, commerçants, agents, chauffeurs' },
    { id: 'environment', title: 'Les acteurs du territoire', position: 'Cadre du déplacement', role: 'Agir sur l’éclairage, les services, l’aménagement et les transports.', limit: 'Ils structurent les conditions du trajet ; leur action ne constitue pas forcément une réponse immédiate au malaise.', examples: 'Transporteurs, collectivités' },
    { id: 'intervention', title: 'Les services d’intervention', position: 'Pouvoir d’intervention', role: 'Évaluer une alerte et intervenir selon la situation.', limit: 'Leur action passe par un signalement et une évaluation. Les délais et modalités dépendent du contexte.', examples: 'Police, secours' }
  ],
  alternatives: [
    { title: 'Appeler un proche', family: 'Lien à distance', stages: [2,3], role: 'Maintenir une conversation et ne pas traverser le moment seule.', limit: 'Le proche doit être disponible ; il n’est pas nécessairement sur place.', url: null, source: 'Stratégie déclarée dans notre questionnaire.' },
    { title: 'Partager sa position', family: 'Suivi du trajet', stages: [0,1,3], role: 'Permettre à une personne choisie de suivre sa position, notamment avec Google Maps.', limit: 'Connaître une position ne garantit pas une aide locale. Le partage dépend du téléphone et des réglages.', url: 'https://support.google.com/accounts/answer/9363497?hl=fr', source: 'Aide Google — partage de position.' },
    { title: 'Accompagnement Apple', family: 'Suivi du trajet', stages: [0,1,3], role: 'Informer un proche de l’arrivée et partager des informations si l’accompagnement ne se termine pas comme prévu.', limit: 'Nécessite des appareils et versions compatibles ainsi qu’un destinataire. Le proche reste un appui à distance.', url: 'https://support.apple.com/fr-fr/guide/iphone/iphc143bb7e9/ios', source: 'Assistance Apple — Accompagnement.' },
    { title: 'The Sorority', family: 'Entraide de proximité', stages: [2,3,4,5], role: 'Mettre en relation les membres d’une communauté et alerter des personnes autour de soi.', limit: 'L’aide dépend des personnes présentes et disponibles. Une communauté ne garantit pas une intervention des secours.', url: 'https://www.jointhesorority.com/communaute-application', source: 'The Sorority — fonctionnement de l’application.' },
    { title: 'UMAY & Safe Places', family: 'Présence locale', stages: [0,2,3,5], role: 'Partager un trajet et identifier des lieux partenaires proposant un accueil.', limit: 'Il faut un lieu accessible et ouvert. Les équipes accueillent dans la limite de leurs capacités.', url: 'https://umay.fr/faq/', source: 'UMAY — questions fréquentes.' },
    { title: '3117 / 31177', family: 'Signalement institutionnel', stages: [4,5], role: 'Signaler par appel ou SMS une situation présentant un risque en gare ou à bord d’un train.', limit: 'Ce dispositif a un périmètre ferroviaire et relaie l’alerte aux acteurs compétents ; il ne remplace pas les numéros de secours.', url: 'https://www.sncf-connect.com/fr-be/aide/3117-le-numero-dappel-durgence-bord-des-trains', source: 'SNCF Connect — numéro d’alerte ferroviaire.' },
    { title: 'Taxi ou VTC', family: 'Autre mobilité', stages: [0,1,3], role: 'Changer de mode de déplacement lorsqu’une autre option est disponible.', limit: 'Un coût supplémentaire et une disponibilité variable. Le trajet initial est modifié.', url: null, source: 'Alternative de mobilité analysée par le groupe.' },
    { title: 'Adapter son trajet', family: 'Action individuelle', stages: [1,2,3], role: 'Accélérer, changer de chemin ou se rapprocher d’un lieu fréquenté.', limit: 'La contrainte et l’effort d’adaptation restent à la charge de la personne.', url: null, source: 'Stratégies déclarées dans notre questionnaire.' }
  ],
  quiz: [
    { time: '23:40', title: 'Vous rentrez chez vous.', text: 'Vous marchez seule. La rue devient moins fréquentée. Aucun danger n’est clairement identifié, mais vous vous sentez moins à l’aise.', options: ['continue','faster','call','location'] },
    { time: '23:44', title: 'L’incertitude s’installe.', text: 'Vous remarquez une personne derrière vous depuis quelques minutes, sans connaître son intention. Qu’auriez-vous spontanément envie de faire ?', options: ['continue','detour','call','message'] },
    { time: '23:47', title: 'Le trajet se poursuit.', text: 'Le chemin le plus direct traverse une rue calme. Un autre itinéraire et un autre moyen de transport sont possibles. Quel serait votre réflexe ?', options: ['continue','faster','detour','transport'] }
  ]
};
