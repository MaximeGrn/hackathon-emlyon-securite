/* Données agrégées uniquement. Les effectifs proviennent de l'Excel fourni.
   Voir README.md et la section Méthodologie pour les règles de calcul. */
window.STUDY_DATA = {
  source: { id: 'questionnaire', label: 'Enquête du Hackathon emlyon — Groupe 7b, 2026', date: '6 octobre 2026', total: 19, women: 14, age18to34: 17 },
  cohorts: {
    target: { label: 'Femmes de 18 à 34 ans', n: 12, age: { '18–24 ans': 9, '25–34 ans': 3 } },
    all: { label: 'Ensemble des réponses', n: 19, age: { '18–24 ans': 13, '25–34 ans': 4, 'Plus de 35 ans': 2 } }
  },
  questions: {
    situations: {
      title: 'Ce qui rend un trajet inquiétant', multiple: true, column: 'G',
      wording: 'Si oui, quelles situations vous poussent le plus à modifier ou éviter un déplacement ?',
      items: [
        { id: 'quiet', label: 'Un lieu peu fréquenté', counts: { target: 8, all: 9 } },
        { id: 'late', label: 'L’heure tardive', counts: { target: 6, all: 8 } },
        { id: 'encounters', label: 'La peur de certaines rencontres', counts: { target: 4, all: 8 } },
        { id: 'unknown', label: 'Un quartier mal connu', sourceLabel: 'Un quartier que je connais mal', counts: { target: 4, all: 6 } },
        { id: 'no-transit', label: 'L’absence de transports', counts: { target: 4, all: 7 } },
        { id: 'walking', label: 'Devoir marcher seul·e', sourceLabel: 'Le fait de devoir marcher seul(e)', counts: { target: 0, all: 2 } },
        { id: 'mobility', label: 'État physique / mobilité', sourceLabel: 'Mon état physique / difficulté de mobilité', counts: { target: 0, all: 1 } }
      ]
    },
    reactions: {
      title: 'Ce que l’on change en chemin', multiple: true, column: 'H',
      wording: 'Lorsque vous êtes seul(e) et que vous ne vous sentez pas à l’aise pendant un trajet, que faites-vous spontanément ?',
      items: [
        { id: 'faster', label: 'Marcher plus vite', sourceLabel: 'Je marche plus vite', counts: { target: 7, all: 12 } },
        { id: 'call', label: 'Appeler quelqu’un', sourceLabel: "J'appelle quelqu'un", counts: { target: 5, all: 7 } },
        { id: 'location', label: 'Partager sa localisation', sourceLabel: 'Je partage ma localisation', counts: { target: 4, all: 4 } },
        { id: 'detour', label: 'Changer de chemin', sourceLabel: 'Je change de chemin', counts: { target: 3, all: 4 } },
        { id: 'message', label: 'Envoyer un message à un proche', sourceLabel: "J'envoie un message à un proche", counts: { target: 3, all: 3 } },
        { id: 'transport', label: 'Prendre un autre transport', sourceLabel: 'Je prends un autre moyen de transport', counts: { target: 2, all: 5 } },
        { id: 'continue', label: 'Ne rien faire de particulier', sourceLabel: 'Je ne fais rien de particulier', counts: { target: 2, all: 2 } },
        { id: 'people', label: 'Se rapprocher d’autres personnes', sourceLabel: "Je me rapproche d'autres personnes", counts: { target: 0, all: 1 } }
      ]
    },
    phoneLimits: {
      title: 'Les limites du téléphone', multiple: true, column: 'J',
      wording: 'Selon vous, quelles sont les limites du téléphone dans une situation où vous ne vous sentez pas en sécurité ?',
      items: [
        { id: 'battery', label: 'Pas de batterie ou de réseau', sourceLabel: 'Je peux ne pas avoir de batterie ou de réseau', counts: { target: 8, all: 11 } },
        { id: 'unlock', label: 'Le sortir et le déverrouiller', sourceLabel: 'Il faut le sortir et le déverouiller', counts: { target: 7, all: 10 } },
        { id: 'attention', label: 'Attirer l’attention', sourceLabel: "Cela peut attirer l'attention", counts: { target: 5, all: 9 } },
        { id: 'access', label: 'Un téléphone inaccessible', sourceLabel: 'Il peut être inaccessible dans certaines situations', counts: { target: 5, all: 7 } },
        { id: 'time', label: 'Pas le temps de l’utiliser', sourceLabel: "Je peux ne pas avoir le temps de l'utiliser", counts: { target: 5, all: 6 } },
        { id: 'contact', label: 'Ne pas savoir qui contacter', sourceLabel: 'je ne saurais pas forcément qui contacter', counts: { target: 3, all: 4 } }
      ]
    },
    reassurance: {
      title: 'Ce qui rassurerait le plus', multiple: true, column: 'M',
      wording: 'Dans une situation où vous ne vous sentez pas à l’aise, qu’est-ce qui vous rassurerait le plus ?',
      items: [
        { id: 'intervene', label: 'Quelqu’un pourrait intervenir', sourceLabel: "Savoir que quelqu'un pourrait intervenir si nécessaire", counts: { target: 7, all: 11 } },
        { id: 'busy', label: 'Un lieu fréquenté', sourceLabel: 'Etre dans un lieu fréquenté', counts: { target: 6, all: 9 } },
        { id: 'position', label: 'Un proche connaît ma position', sourceLabel: "Savoir qu'un proche sait où je suis", counts: { target: 5, all: 5 } },
        { id: 'accompanied', label: 'Être accompagné·e', sourceLabel: 'Etre accompagné(e)', counts: { target: 4, all: 7 } },
        { id: 'report', label: 'Signaler facilement un problème', sourceLabel: "Pouvoir signaler facilement qu'il y a un problème", counts: { target: 4, all: 7 } },
        { id: 'reach', label: 'Joindre quelqu’un rapidement', sourceLabel: "Pouvoir joindre quelqu'un rapidement", counts: { target: 4, all: 5 } }
      ]
    },
    avoidance: {
      title: 'Éviter certains déplacements', multiple: false, column: 'F',
      wording: 'Y a-t-il des situations dans lesquelles vous évitez de vous déplacer seul(e) ?',
      items: [
        { id: 'never', label: 'Jamais', counts: { target: 0, all: 2 } },
        { id: 'rarely', label: 'Rarement', counts: { target: 6, all: 9 } },
        { id: 'sometimes', label: 'Parfois', sourceLabel: 'Oui, parfois', counts: { target: 5, all: 6 } },
        { id: 'often', label: 'Souvent', sourceLabel: 'Oui, souvent', counts: { target: 1, all: 2 } }
      ]
    },
    frequency: {
      title: 'Se déplacer seul·e', multiple: false, column: 'D', wording: 'À quelle fréquence vous déplacez-vous seul(e) ?',
      items: [ { label: 'Tous les jours', counts: { target: 10, all: 15 } }, { label: 'Plusieurs fois par semaine', counts: { target: 2, all: 4 } } ]
    },
    freedom: {
      title: 'La liberté ressentie', multiple: false, column: 'K',
      wording: 'Sur une échelle de 1 à 5, à quel point vous sentez-vous libre de vous déplacer où et quand vous le souhaitez ?',
      items: [1,2,3,4,5].map((score, i) => ({ label: String(score), counts: { target: [0,0,5,5,2][i], all: [0,1,6,8,4][i] } }))
    },
    phoneSecurity: {
      title: 'Le téléphone rassure-t-il ?', multiple: false, column: 'I',
      wording: 'Le fait d’avoir votre téléphone sur vous vous donne-t-il réellement un sentiment de sécurité lorsque vous vous déplacez seul(e) ?',
      items: [
        { label: 'Pas vraiment', counts: { target: 1, all: 2 } },
        { label: 'Un peu', counts: { target: 4, all: 7 } },
        { label: 'Oui, plutôt', counts: { target: 4, all: 5 } },
        { id: 'totally', label: 'Oui, totalement', counts: { target: 3, all: 5 } }
      ]
    }
  }
};
