window.PUBLIC_DATA = {
  vrs: {
    name: 'SSMSI, enquête Vécu et ressenti en matière de sécurité, vague 2022',
    url: 'https://statistiques.interieur.gouv.fr/ssmsi/publications/rapport-denquete-vecu-et-ressenti-en-matiere-de-securite-2022-victimation-delinquance',
    field: 'Personnes de 18 à 74 ans vivant en France métropolitaine. Questionnaire socle internet ; traitements SSMSI.',
    year: 2022,
    indicators: {
      renoncement: { title: 'Renoncer à sortir seul·e pour des raisons de sécurité', unit: '%', female: 27, male: 7, file: 'Partie4_2.3.xlsx', sheet: 'Figure  C02.03 - 3.c', cells: 'B4:B5' },
      transports: { title: 'Se sentir en insécurité dans les transports', unit: '%', female: 46, male: 32, note: 'Souvent ou de temps en temps.', file: 'Partie 4.2 compléments .xlsx', sheet: 'Partie 4.2.1', cells: 'C6:D6' }
    }
  },
  recorded: {
    title: 'Violences sexuelles dans les transports en commun', count: 3399, year: 2024,
    label: 'victimes enregistrées par la police et la gendarmerie en 2024',
    source: 'SSMSI, Interstats Infos rapides n°54, septembre 2025, figure 2',
    url: 'https://statistiques.interieur.gouv.fr/ssmsi/publications/transports-en-commun-en-2024-le-plus-bas-niveau-de-victimes-enregistrees-depuis-2016',
    field: 'France. Victimes de crimes et délits du périmètre de la publication. Ces enregistrements ne mesurent pas toutes les violences subies.'
  }
};
