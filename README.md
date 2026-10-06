# Quand la peur modifie le trajet

Étude interactive réalisée pour le **Hackathon emlyon — Groupe 7b, 2026**. Elle raconte les liens entre sentiment de vulnérabilité, adaptation du comportement et liberté de déplacement. La cible de l’étude est constituée des femmes de 18 à 34 ans se déplaçant seules dans les grandes unités urbaines françaises.

Trois pages : l’expérience narrative, les données et leur méthodologie, le parcours et l’écosystème. Le site qualifie un besoin ; il ne propose pas une application de sécurité.

## Lancer le site

Ouvrir `index.html` dans un navigateur. Toutes les ressources sont locales, y compris la police Inter. Le site ne nécessite ni installation, ni build, ni serveur applicatif.

Pour utiliser un serveur de développement facultatif depuis la racine :

```sh
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`. Les fichiers JavaScript sont des scripts classiques ; ils ne chargent pas les données avec `fetch`, afin de fonctionner également en `file://`.

## Organisation

- `index.html`, `donnees.html`, `ecosysteme.html` : pages statiques, structure et textes éditoriaux des sections.
- `css/variables.css` : tokens adaptés des références fournies ; `css/style.css` : composants, responsive, impression et mouvement réduit.
- `data/questionnaire.js` : résultats agrégés, populations, questions, effectifs et libellés sources.
- `data/public-data.js` : résultats nationaux et provenance précise.
- `data/content.js` : contenus du parcours, progression, téléphone, scénario, acteurs, alternatives et configuration du rapport.
- `js/charts.js` : graphiques accessibles, filtres, tableaux et données nationales.
- `js/main.js` : navigation mobile, illustrations SVG, parcours au défilement et composants interactifs.
- `js/quiz.js` : scénario pédagogique à trois étapes, retour, bilan et remise à zéro.
- `assets/` : favicon et Inter variable auto-hébergée, avec sa licence.

## Données du questionnaire

Source : Excel « Mobilité et sentiment de sécurité au quotidien (réponses) (1) », fourni le 6 octobre 2026. Le calcul conserve les **19 lignes**, conformément au périmètre demandé. Les mentions techniques de test incluses dans certaines cellules ne sont pas des modalités de réponse et ne sont pas comptées comme telles. Le fichier Excel et les réponses individuelles restent hors du dépôt.

La population `target` retient `Femme` et les tranches `18-24 ans` ou `25-34 ans` : **12 réponses**. La population `all` comprend **19 réponses**, dont 14 femmes, 5 hommes et 17 personnes de 18 à 34 ans. Les données sont exploratoires, sans représentativité nationale. Le questionnaire ne mesure pas la ville, la taille de l’unité urbaine ni le mode de transport.

Colonnes de la feuille « Réponses au formulaire 1 » : D fréquence, F évitement, G situations, H réactions, I sécurité apportée par le téléphone, J limites, K liberté ressentie, M réassurance. Chaque modalité d’une question multiple est comptée au maximum une fois par ligne. Les effectifs ont été recalculés à partir du fichier fourni.

### Modifier un chiffre

Dans `data/questionnaire.js`, modifier `counts.target` et/ou `counts.all` pour la modalité concernée. Le dénominateur est `cohorts.target.n` ou `cohorts.all.n`. Les graphiques, les données du téléphone et le scénario utilisent ces mêmes valeurs. Si l’enquête est enrichie, recalculer tous les agrégats depuis l’Excel avant de les remplacer et vérifier les textes de synthèse statiques dans les pages.

Conserver `sourceLabel` lorsqu’un libellé d’affichage est raccourci. Une question à réponse unique doit totaliser son dénominateur. Les questions multiples peuvent dépasser ce total, mais chaque modalité doit rester comprise entre 0 et le dénominateur. Un résultat absent ou ambigu ne doit pas devenir zéro par défaut.

## Données nationales

Les résultats sont séparés du questionnaire et ne constituent pas une comparaison directe des deux échantillons.

- **VRS 2022 / renoncement** : 27 % des femmes et 7 % des hommes, fichier `Partie4_2.3.xlsx`, feuille `Figure  C02.03 - 3.c`, cellules B4:B5.
- **VRS 2022 / insécurité dans les transports** : 46 % des femmes et 32 % des hommes, souvent ou de temps en temps. Fichier `Partie 4.2 compléments .xlsx`, feuille `Partie 4.2.1`, cellules C6:D6.
- Champ VRS : personnes de 18 à 74 ans vivant en France métropolitaine, questionnaire socle internet, traitements SSMSI. [Publication et téléchargement des tableaux](https://statistiques.interieur.gouv.fr/ssmsi/publications/rapport-denquete-vecu-et-ressenti-en-matiere-de-securite-2022-victimation-delinquance).
- **2024 / transports** : 3 399 victimes de violences sexuelles enregistrées par la police et la gendarmerie, [Interstats Infos rapides n°54, septembre 2025](https://statistiques.interieur.gouv.fr/ssmsi/publications/transports-en-commun-en-2024-le-plus-bas-niveau-de-victimes-enregistrees-depuis-2016), figure 2. Il s’agit de faits enregistrés, pas de toutes les violences subies.

Les coefficients « 2,8 / 1,4 / 1,6 à caractéristiques comparables » ne sont pas publiés faute de source suffisamment vérifiée. La part de 91 % n’est pas rapprochée du total révisé de septembre 2025, afin de ne pas mélanger les versions des sources.

Les liens officiels des alternatives sont disponibles dans `data/content.js` et dans la bibliographie du site. Leur positionnement dans le parcours et la zone de friction sont des analyses du groupe, pas des mesures de performance des dispositifs.

## Modifier le contenu / ajouter le rapport

Les scènes, acteurs, alternatives et étapes sont dans `data/content.js`. Les grands titres et textes propres aux sections sont dans les pages HTML. Les styles et visualisations peuvent être conservés pour la deuxième phase.

Pour ajouter le rapport, déposer le PDF dans `assets/rapport.pdf`, puis renseigner `STUDY_CONTENT.report.url` avec `assets/rapport.pdf`. Le lien est créé seulement lorsqu’une URL est configurée. Mettre aussi à jour le texte de la section `#rapport` et ajouter les noms du groupe à la signature si souhaité.

Le scénario utilise la fréquence des réactions du questionnaire, avec une seule sélection par étape. Les choix restent en mémoire et sont perdus au rechargement. Aucun score, stockage local, envoi de données, traceur ou géolocalisation n’est utilisé.

## GitHub Pages

Les liens de navigation et de ressources sont relatifs. Le site fonctionne à la racine d’un domaine ou sous `/hackathon-emlyon-securite/`.

1. Publier les fichiers sur la branche `main` du dépôt `MaximeGrn/hackathon-emlyon-securite`.
2. Pour GitHub Pages avec l’offre gratuite, rendre le dépôt public.
3. Dans **Settings → Pages → Build and deployment**, choisir **Deploy from a branch**.
4. Sélectionner **main** et **/(root)**, puis **Save**.
5. Attendre la réussite du déploiement et vérifier les trois pages.

Le fichier `.nojekyll` permet de servir les ressources statiques sans traitement Jekyll. Aucun domaine personnalisé n’est nécessaire.

Adresse attendue : [https://maximegrn.github.io/hackathon-emlyon-securite/](https://maximegrn.github.io/hackathon-emlyon-securite/).

## Vérifications

Vérifier les pages en 1440, 1024, 768, 430 et 375 px, la navigation clavier, le menu mobile, les filtres, chaque branche de sélection du scénario, les boutons retour/recommencer et le mode de mouvement réduit. Contrôler les liens internes et les ressources en ouverture directe et sous le chemin de GitHub Pages.

Les graphiques disposent de libellés textuels ; le graphique principal propose aussi un tableau. Le parcours et les informations restent compréhensibles sans animations. La présentation pour impression est simplifiée.

### Validation de cette version — 6 octobre 2026

- Trois pages vérifiées aux cinq largeurs prévues, sans débordement horizontal ni erreur JavaScript.
- 84 effectifs réconciliés indépendamment avec le fichier Excel original.
- Huit vues du graphique principal, quatre états des acteurs, sept filtres des alternatives, quatre étapes de progression et trois états du téléphone contrôlés.
- 64 combinaisons du scénario vérifiées, y compris les comparaisons, le retour et la remise à zéro.
- 50 liens internes, ancres et ressources contrôlés sous le chemin de GitHub Pages ; fonctionnement des trois pages en `file://` confirmé.
- Navigation mobile au clavier, ouverture par Entrée et fermeture par Échap vérifiées.
- Contrôles automatiques axe-core des règles WCAG A/AA à 1440 et 375 px et du bilan du scénario : aucune violation détectée après corrections. Ces contrôles ne remplacent pas une vérification humaine avec des technologies d’assistance.

## Références visuelles

Palette, typographie, espacements et formes inspirés des fichiers de référence Wise fournis. Les illustrations de trajets et les compositions sont propres à cette étude. Inter est distribuée sous licence SIL Open Font License ; voir `assets/fonts/OFL.txt`.
