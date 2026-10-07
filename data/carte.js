/* Contenu de la carte mentale. Source unique : le rapport du Groupe 7b.
   Tous les textes et chiffres du site sont ici ; js/carte.js ne fait que les afficher.
   Questionnaire : 20 réponses, 15 femmes, analyse sur 13 répondantes de 18 à 34 ans. */
(function () {
  'use strict';

  var N = 13;
  var SRC_Q = 'Questionnaire Groupe 7b, 13 répondantes de 18 à 34 ans. Plusieurs réponses possibles.';
  var SRC_Q_SINGLE = 'Questionnaire Groupe 7b, 13 répondantes de 18 à 34 ans.';
  var SRC_RAPPORT = 'Rapport du Groupe 7b.';
  var SRC_VRS = {
    label: 'SSMSI, Vécu et ressenti en matière de sécurité, rapport d’enquête, édition 2024.',
    url: 'https://statistiques.interieur.gouv.fr/ssmsi/publications/vecu-et-ressenti-en-matiere-de-securite-victimation-delinquance-et-sentiment'
  };
  var SRC_TC = {
    label: 'SSMSI, données 2024, reprises par l’Observatoire national des violences faites aux femmes (Miprof, mars 2025).',
    url: 'https://arretonslesviolences.gouv.fr/sites/default/files/2025-03/Lettre%2023%20Observatoire%20national%20des%20violences%20faites%20aux%20femmes.pdf'
  };

  window.CARTE = {
    title: 'Quand la peur modifie le trajet',
    team: 'Groupe 7b · Hackathon emlyon 2026',
    n: N,

    center: {
      label: 'Problématique',
      short: ['Garder son indépendance', 'sans modifier ses trajets', 'par peur'],
      question: 'Comment permettre aux femmes de 18 à 34 ans, se déplaçant seules dans les grandes unités urbaines françaises, de préserver leur indépendance sans avoir à modifier ou renoncer à leurs déplacements par peur d’une situation dangereuse ?',
      intro: 'Notre rapport, condensé en une carte. Six branches, une vingtaine d’idées, environ dix minutes. Avance idée par idée : chaque branche terminée débloque la suivante. Quatre fois, on te demandera de deviner un chiffre avant de le voir.'
    },

    branches: [
      {
        id: 'cadrage', title: 'Cadrage', ideas: [
          {
            id: 'cible', label: 'La cible', title: 'Un public volontairement resserré',
            type: 'facts',
            lead: 'Au départ, nous visions toutes les personnes qui peuvent se sentir vulnérables en se déplaçant : femmes, personnes âgées, personnes en situation de handicap, travailleurs de nuit. Trop large : les causes et les besoins diffèrent trop d’un public à l’autre.',
            facts: [
              { k: 'Qui', v: 'Des femmes de 18 à 34 ans qui se déplacent seules.' },
              { k: 'Où', v: 'Dans les unités urbaines de 100 000 habitants ou plus : Paris, Lyon, Marseille, Bordeaux, Rennes…' },
              { k: 'Comment', v: 'À pied et en transports en commun, sur les trajets du quotidien et de retour.' }
            ],
            source: SRC_RAPPORT
          },
          {
            id: 'pourquoi', label: 'Pourquoi elles', title: 'Le renoncement touche d’abord les femmes',
            type: 'guess', accent: 'blue',
            guess: {
              question: 'À caractéristiques comparables, combien de fois plus que les hommes les femmes ont-elles renoncé à sortir seules pour des raisons de sécurité ?',
              min: 1, max: 5, step: 0.1, start: 1.5, answer: 2.8, unit: 'fois plus', decimals: 1
            },
            lead: 'Les jeunes adultes et les habitants des grandes unités urbaines sont eux aussi plus concernés par ce renoncement. C’est ce qui justifie notre cible.',
            source: SRC_VRS
          },
          {
            id: 'hypotheses', label: 'Trois hypothèses', title: 'Ce que nous voulions vérifier',
            type: 'list', numbered: true,
            items: [
              { t: 'La peur agit avant le danger.', d: 'Elle peut modifier un déplacement avant même qu’un danger soit clairement identifié.' },
              { t: 'Les solutions ratent un moment.', d: 'Téléphone, partage de position, alerte, appel à un proche : elles couvrent mal l’instant où l’on ressent un malaise sans savoir si l’on est en danger.' },
              { t: 'Le besoin est le contrôle.', d: 'Moins supprimer totalement le risque que garder assez de contrôle et de confiance pour continuer à se déplacer librement.' }
            ],
            source: SRC_RAPPORT
          },
          {
            id: 'perimetre', label: 'Le périmètre', title: 'Ce qui est dans l’étude, et ce qui n’y est pas',
            type: 'scope',
            inside: ['Marcher dans la rue', 'Attendre à un arrêt, une station', 'Les correspondances et les transports en commun', 'Rejoindre sa voiture, traverser un parking'],
            outside: ['Le temps passé dans un véhicule personnel : l’habitacle fermé change la nature du sentiment d’insécurité'],
            note: 'Taxis et VTC sont traités comme une stratégie d’adaptation, pas comme le cœur du trajet. Le sujet croise mobilité, sécurité publique, espace urbain et technologies d’assistance : on parle d’un écosystème de la réassurance.',
            source: SRC_RAPPORT
          }
        ]
      },
      {
        id: 'notions', title: 'Notions clés', ideas: [
          {
            id: 'etapes', label: 'Un trajet en étapes', title: 'Un déplacement n’est pas un bloc',
            type: 'steps',
            lead: 'C’est une chaîne. Le sentiment de vulnérabilité peut apparaître à chaque maillon, pas seulement à l’arrivée.',
            steps: [
              { t: 'Départ', d: 'domicile, lieu' },
              { t: 'Rue', d: 'premier trajet', hot: true },
              { t: 'Attente', d: 'arrêt, station', hot: true },
              { t: 'Transport', d: 'bus, métro, tram', hot: true },
              { t: 'Dernier tronçon', d: 'marche jusqu’à l’arrivée', hot: true },
              { t: 'Arrivée', d: 'destination' }
            ],
            source: 'Rapport du Groupe 7b, figure 1.'
          },
          {
            id: 'ressentie', label: 'Objective ou ressentie', title: 'Deux sécurités à ne pas confondre',
            type: 'compare',
            pair: [
              { k: 'Sécurité objective', v: 'Le risque réel d’agression ou d’incident dans une situation donnée.' },
              { k: 'Sécurité ressentie', v: 'La manière dont une personne perçoit cette situation.', strong: true }
            ],
            after: 'On peut donc se sentir en insécurité sans aucun danger visible : un lieu vide, mal éclairé, inconnu, un comportement qui inquiète. Notre étude porte sur ce ressenti.',
            source: 'Rapport du Groupe 7b, figure 2.'
          },
          {
            id: 'vulnerabilite', label: 'Vulnérabilité situationnelle', title: 'Un contexte, pas une personne',
            type: 'text',
            lead: 'La vulnérabilité ne décrit pas quelqu’un en permanence. Elle décrit un moment où l’on se sent moins capable d’anticiper, d’éviter ou de gérer une menace potentielle.',
            body: ['Ce ressenti déclenche des modifications du trajet : changer de chemin, appeler un proche, accélérer le pas, prendre un VTC. Parfois il mène au renoncement, c’est-à-dire l’abandon pur et simple d’une sortie.'],
            source: SRC_RAPPORT
          },
          {
            id: 'independance', label: 'Autonomie et indépendance', title: 'Décider seule, et agir seule',
            type: 'compare',
            pair: [
              { k: 'Autonomie', v: 'La capacité de décider par soi-même.' },
              { k: 'Indépendance', v: 'Pouvoir agir sans dépendre systématiquement d’un tiers pour se sentir en sécurité.', strong: true }
            ],
            after: 'C’est l’indépendance que notre problématique cherche à préserver : rentrer seule sans devoir attendre quelqu’un.',
            source: SRC_RAPPORT
          }
        ]
      },
      {
        id: 'terrain', title: 'Terrain', ideas: [
          {
            id: 'enquete', label: 'L’enquête', title: 'Un questionnaire centré sur la cible',
            type: 'funnel',
            funnel: [
              { v: 20, k: 'réponses recueillies' },
              { v: 15, k: 'femmes' },
              { v: 13, k: 'femmes de 18 à 34 ans', strong: true }
            ],
            lead: 'Tous les chiffres de cette branche portent sur ces 13 répondantes. Elles sont très mobiles : 11 sur 13 se déplacent seules tous les jours, les 2 autres plusieurs fois par semaine.',
            caveat: 'Un échantillon exploratoire : il éclaire des comportements, il ne permet pas de généraliser.',
            source: SRC_Q_SINGLE
          },
          {
            id: 'evitement', label: '53,8 % évitent', title: 'Éviter un trajet est banal',
            type: 'guess',
            guess: {
              question: 'Sur les 13 répondantes, quelle part modifie ou évite certains déplacements au moins « parfois » ?',
              min: 0, max: 100, step: 1, start: 20, answer: 53.8, unit: '%', decimals: 1
            },
            bars: { title: 'Évitez-vous certains déplacements quand vous êtes seule ?', items: [
              { k: 'Jamais', v: 0 }, { k: 'Rarement', v: 6 }, { k: 'Parfois', v: 5, hot: true }, { k: 'Souvent', v: 2, hot: true }
            ] },
            lead: '7 répondantes sur 13. Et aucune ne répond « jamais ».',
            source: SRC_Q_SINGLE
          },
          {
            id: 'declencheurs', label: 'Ce qui déclenche', title: 'Le malaise naît du contexte',
            type: 'bars',
            bars: { title: 'Situations qui poussent à modifier ou éviter un trajet', items: [
              { k: 'Un lieu peu fréquenté', v: 8, hot: true }, { k: 'L’heure tardive', v: 6 }, { k: 'La peur de certaines rencontres', v: 5 },
              { k: 'Un quartier mal connu', v: 4 }, { k: 'L’absence de transports', v: 4 }
            ] },
            lead: 'Ce sont des configurations de trajet, pas des agressions. Le sentiment d’insécurité apparaît avant qu’un danger soit avéré.',
            source: SRC_Q
          },
          {
            id: 'telephone', label: 'Le téléphone limité', title: 'Il rassure, mais il lâche',
            type: 'guess',
            guess: {
              question: 'Sur 13 répondantes, combien citent le risque de ne plus avoir de batterie ou de réseau comme limite du téléphone ?',
              min: 0, max: 13, step: 1, start: 3, answer: 9, unit: 'sur 13', decimals: 0
            },
            lead: 'Le téléphone rassure : totalement pour 4 répondantes, plutôt pour 4, un peu pour 4, pas vraiment pour 1. Mais il ne suffit pas.',
            bars: { title: 'Ses limites', items: [
              { k: 'Pas de batterie ou de réseau', v: 9, hot: true }, { k: 'Devoir le sortir et le déverrouiller', v: 8 },
              { k: 'Ne pas avoir le temps de l’utiliser', v: 6 }, { k: 'Accessibilité limitée', v: 5 }, { k: 'Risque d’attirer l’attention', v: 5 }
            ] },
            source: SRC_Q
          },
          {
            id: 'rassure', label: 'Ce qui rassure', title: 'Savoir qu’une aide est possible',
            type: 'bars',
            bars: { title: 'Ce qui rassurerait le plus en cas de malaise', items: [
              { k: 'Savoir que quelqu’un pourrait intervenir', v: 8, hot: true }, { k: 'Être dans un lieu fréquenté', v: 7 },
              { k: 'Qu’un proche connaisse ma position', v: 5 }, { k: 'Être accompagnée', v: 5 },
              { k: 'Pouvoir signaler facilement un problème', v: 4 }, { k: 'Pouvoir joindre rapidement quelqu’un', v: 4 }
            ] },
            lead: 'Le besoin dépasse la simple alerte. Ce qui compte, c’est la certitude qu’une aide concrète pourrait arriver, et ne pas être seule face à une situation incertaine.',
            source: SRC_Q
          },
          {
            id: 'national', label: 'Les chiffres nationaux', title: 'Les données publiques vont dans le même sens',
            type: 'guess', accent: 'blue',
            guess: {
              question: 'En 2024, environ 3 400 victimes de violences sexuelles ont été enregistrées dans les transports en commun. Quelle part étaient des femmes ?',
              min: 0, max: 100, step: 1, start: 50, answer: 91, unit: '%', decimals: 0
            },
            lead: 'Notre questionnaire confirme à petite échelle ce que montrent les données publiques : le sujet ne se limite pas à l’agression. Il commence avant, avec l’anticipation du risque, les stratégies d’adaptation et les restrictions de liberté qui en découlent.',
            source: SRC_TC
          }
        ]
      },
      {
        id: 'souffrance', title: 'Souffrance', ideas: [
          {
            id: 'situation', label: 'Mise en situation', title: 'À toi de jouer',
            type: 'scenario',
            scenes: [
              {
                time: '23 h 00',
                text: 'Tu sors du métro. La rue est vide, tu connais mal le quartier. Rien ne se passe, mais tu n’es pas à l’aise. Ton premier réflexe ?',
                options: [
                  { k: 'Marcher plus vite', v: 8 },
                  { k: 'Appeler quelqu’un', v: 5 },
                  { k: 'Partager ma position', v: 5 },
                  { k: 'Changer de chemin', v: 4 },
                  { k: 'Prendre un autre moyen de transport', v: 3 }
                ],
                note: 'Marcher plus vite est le réflexe le plus cité : 8 sur 13. Ces gestes rassurent, mais ils modifient déjà le trajet.'
              },
              {
                time: 'Le lendemain, 23 h 00',
                text: 'Même trajet, même heure. Tu fais quoi ?',
                options: [
                  { k: 'Je reprends le même trajet', stage: -1, why: 'Tu gardes ta liberté de mouvement. C’est exactement ce que notre problématique veut préserver.' },
                  { k: 'Je change d’itinéraire', stage: 1, why: 'Tu adaptes ton trajet pour reprendre le contrôle.' },
                  { k: 'Je prends un VTC', stage: 2, why: 'L’adaptation a désormais un coût : de l’argent.' },
                  { k: 'J’attends que quelqu’un m’accompagne', stage: 3, why: 'Tu dépends d’un tiers : ton indépendance recule.' },
                  { k: 'Je ne sors pas', stage: 3, why: 'Le déplacement est abandonné.' }
                ],
                note: 'Chaque choix se place sur la progression décrite dans notre rapport.'
              }
            ],
            source: 'Scène fictive. Réponses comparées au questionnaire Groupe 7b, 13 répondantes, plusieurs réponses possibles.'
          },
          {
            id: 'progression', label: 'La progression', title: 'De la peur à la perte de liberté',
            type: 'chain',
            chain: [
              { k: 'Vulnérabilité', d: 'Une situation fait naître le malaise : rue peu fréquentée, heure tardive, quartier inconnu, absence de transports.' },
              { k: 'Adaptation', d: 'On cherche à reprendre le contrôle : marcher plus vite, appeler un proche, partager sa position, changer de chemin.' },
              { k: 'Contrainte', d: 'Ces ajustements rassurent, mais ils coûtent : du temps, de l’argent, la disponibilité d’un proche.' },
              { k: 'Renoncement', d: 'Éviter une sortie, partir plus tôt, attendre d’être accompagnée, ne plus emprunter certains trajets.' }
            ],
            lead: 'Le problème ne commence pas au moment d’une agression. Il commence plus tôt, et il s’aggrave par étapes.',
            source: SRC_RAPPORT
          },
          {
            id: 'cout', label: 'Le coût invisible', title: 'La souffrance est dans les conséquences',
            type: 'chips',
            lead: 'Elle ne repose pas seulement sur la peur d’une agression. Elle est aussi dans tout ce que cette peur fait payer, chaque jour :',
            chips: ['Charge mentale', 'Perte de temps', 'Coût supplémentaire', 'Dépendance aux proches', 'Liberté de déplacement réduite'],
            after: 'L’enjeu n’est donc pas seulement de protéger en cas de danger, mais de garder assez de confiance pour ne pas modifier systématiquement ses choix.',
            source: SRC_RAPPORT
          },
          {
            id: 'besoin', label: 'Le besoin fondamental', title: 'Le besoin, en une phrase',
            type: 'quote',
            quote: 'Pouvoir se déplacer seule en conservant suffisamment de contrôle, de confiance et de capacité d’action pour ne pas avoir à modifier ou abandonner son déplacement.',
            after: 'Les répondantes ne demandent pas d’abord un bouton d’alerte. Elles veulent savoir qu’elles pourront agir, et qu’une aide arrivera réellement si la situation se dégrade.',
            source: SRC_RAPPORT
          }
        ]
      },
      {
        id: 'ecosysteme', title: 'Écosystème', ideas: [
          {
            id: 'chaine', label: 'La chaîne du trajet', title: 'Où le besoin est mal couvert',
            type: 'valuechain',
            steps: [
              { t: 'Préparer le trajet', d: 'Savoir où aller, comment rentrer' },
              { t: 'Se déplacer', d: 'Évoluer dans un environnement rassurant' },
              { t: 'Ressentir un malaise', d: 'Comprendre, garder le contrôle', hot: true },
              { t: 'Se rassurer', d: 'Sans interrompre le trajet', hot: true },
              { t: 'Signaler un problème', d: 'Demander de l’aide facilement' },
              { t: 'Obtenir une aide', d: 'Savoir que l’aide est réelle' }
            ],
            lead: 'Beaucoup de dispositifs se concentrent sur l’alerte et l’intervention, une fois le problème identifié. Or une grande partie de la souffrance apparaît avant : dans la phase intermédiaire, quand on se sent vulnérable sans savoir si l’on est en danger.',
            source: 'Rapport du Groupe 7b, figure 6.'
          },
          {
            id: 'acteurs', label: 'Proches mais démunis', title: 'Les acteurs autour du trajet',
            type: 'actors',
            near: [
              { k: 'Entourage', d: 'Famille, amis, colocataires. Rassurent à distance.' },
              { k: 'Transports', d: 'RATP, SNCF, bus locaux, agents, conducteurs, VTC et taxis.' },
              { k: 'Espace public', d: 'Commerces lieux sûrs, bars, passants, témoins.' },
              { k: 'Solutions privées', d: 'Applis (UMAY, The Sorority), bijoux SOS, télésurveillance.' }
            ],
            far: [
              { k: 'Sécurité publique', d: 'Police, gendarmerie, police municipale. Arrivent après l’alerte.' },
              { k: 'Institutions, associations', d: 'Mairies (éclairage, rues), État, lois, financement, associations d’aide.' }
            ],
            punch: 'Ceux qui sont près d’elle ont peu de pouvoir, ceux qui en ont sont loin.',
            source: 'Rapport du Groupe 7b, figure 7.'
          },
          {
            id: 'solutions', label: '7 solutions existantes', title: 'Des réponses nombreuses, mais partielles',
            type: 'solutions',
            lead: 'Ce ne sont pas toutes des concurrentes : ce sont les alternatives utilisées aujourd’hui pour se rassurer ou obtenir de l’aide. Choisis-en une.',
            items: [
              { k: 'Partage de position (Google Maps)', moment: 'Réassurance, suivi', gives: 'Un proche suit la position ou la progression du trajet.', limit: 'Informe le proche, mais ne garantit ni sa disponibilité ni une intervention rapide.' },
              { k: 'Accompagnement Apple', moment: 'Suivi, détection d’anomalie', gives: 'Prévient un contact si le trajet ne se déroule pas comme prévu ; peut transmettre position, batterie et réseau.', limit: 'Repose toujours sur un contact de confiance et doit avoir été activé en amont.' },
              { k: 'UMAY', moment: 'Réassurance, refuge, alerte', gives: 'Suivi de trajet, personnes de confiance, SOS et commerces « Safe Places ».', limit: 'Les contacts doivent utiliser l’application ; une Safe Place doit être ouverte et accessible à proximité.' },
              { k: 'The Sorority', moment: 'Alerte, entraide de proximité', gives: 'Alerte les membres proches, met en relation, indique des lieux sûrs.', limit: 'La réponse dépend des membres présents et disponibles à proximité.' },
              { k: '3117 / 31177', moment: 'Alerte, intervention', gives: 'Alerte directement la Sûreté ferroviaire d’une situation dangereuse.', limit: 'Limité au ferroviaire, et utile surtout quand la situation est assez préoccupante pour être signalée.' },
              { k: 'Taxi ou VTC', moment: 'Évitement du risque perçu', gives: 'Évite une partie du trajet à pied ou en transports.', limit: 'Coûte de l’argent et ne supprime pas forcément les premiers et derniers mètres.' },
              { k: 'Appeler un proche', moment: 'Réassurance', gives: 'Une présence rassurante et la possibilité de signaler vite un problème.', limit: 'Le proche peut être loin et n’a pas forcément les moyens d’intervenir.' }
            ],
            source: 'Rapport du Groupe 7b, figure 8.'
          },
          {
            id: 'partielles', label: 'Aucune ne couvre tout', title: 'Chacune couvre un morceau du parcours',
            type: 'list',
            items: [
              { t: 'Elles informent sans garantir.', d: 'Certaines transmettent une information, sans garantir qu’une intervention suivra.' },
              { t: 'Elles arrivent tard.', d: 'D’autres demandent une action volontaire quand la personne se sent déjà en danger.' },
              { t: 'Elles dépendent des autres.', d: 'Les solutions de proximité dépendent de la disponibilité d’un proche, d’un membre de la communauté ou d’un lieu refuge.' }
            ],
            after: 'Le problème n’est pas l’absence de solutions. C’est qu’aucune ne couvre seule toute la chaîne.',
            source: SRC_RAPPORT
          }
        ]
      },
      {
        id: 'retenir', title: 'À retenir', ideas: [
          {
            id: 'friction', label: 'La zone de friction', title: 'Entre le malaise et l’urgence',
            type: 'friction',
            lead: 'La personne ressent un malaise et cherche à être rassurée ou accompagnée, mais la situation ne justifie pas encore une alerte d’urgence. C’est la zone la moins couverte.',
            zones: [
              { k: 'Avant', d: 'Préparer, suivre le trajet', ex: 'Partage de position, VTC' },
              { k: 'Le malaise', d: 'Se sentir vulnérable sans savoir si l’on est en danger', hot: true },
              { k: 'L’urgence', d: 'Alerter, obtenir une intervention', ex: '3117, police, secours' }
            ],
            source: SRC_RAPPORT
          },
          {
            id: 'phrase', label: 'La phrase à retenir', title: 'Si tu ne retiens qu’une chose',
            type: 'quote', big: true,
            quote: 'Permettre aux femmes de conserver leur liberté de déplacement en leur donnant suffisamment de confiance, de contrôle et de capacité d’action pour ne pas avoir à modifier ou abandonner leurs déplacements par peur.',
            after: 'La suite du projet partira de ce besoin, pas d’une technologie ou d’une solution décidée à l’avance.',
            source: 'Rapport du Groupe 7b, conclusion.'
          },
          {
            id: 'quiz', label: 'Quiz final', title: 'Trois questions pour vérifier',
            type: 'quiz',
            questions: [
              {
                q: 'Quand le sentiment d’insécurité apparaît-il le plus souvent ?',
                options: ['Uniquement après une agression', 'Dans certains contextes, avant tout danger avéré', 'Seulement dans les transports en commun'],
                answer: 1,
                why: 'Lieu peu fréquenté (8 sur 13), heure tardive (6 sur 13) : le malaise naît du contexte, avant qu’un danger soit identifié.'
              },
              {
                q: 'Qu’est-ce qui rassurerait le plus les répondantes ?',
                options: ['Une alarme sonore plus puissante', 'Savoir que quelqu’un pourrait intervenir', 'Une meilleure application de cartographie'],
                answer: 1,
                why: '8 répondantes sur 13 (61,5 %) : le besoin porte sur une aide concrète, pas seulement sur l’alerte.'
              },
              {
                q: 'Quelle phase du trajet est la moins couverte par les solutions existantes ?',
                options: ['La préparation du trajet', 'L’intervention des secours', 'Le moment entre le malaise et l’urgence'],
                answer: 2,
                why: 'Les solutions agissent surtout avant (suivi, VTC) ou après (alerte, intervention). Le moment du malaise reste le moins couvert.'
              }
            ],
            source: SRC_RAPPORT
          }
        ]
      }
    ]
  };
})();
