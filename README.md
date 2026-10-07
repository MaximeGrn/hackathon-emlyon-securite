# Quand la peur modifie le trajet

Le rapport du **Groupe 7b (Hackathon emlyon 2026)** condensé en une carte mentale interactive. La problématique est au centre ; six branches (Cadrage, Notions clés, Terrain, Souffrance, Écosystème, À retenir) regroupent 24 idées. On les découvre dans l'ordre du rapport : chaque branche terminée débloque la suivante.

Problématique : *Comment permettre aux femmes de 18 à 34 ans, se déplaçant seules dans les grandes unités urbaines françaises, de préserver leur indépendance sans avoir à modifier ou renoncer à leurs déplacements par peur d'une situation dangereuse ?*

## Lancer le site

Ouvrir `index.html` dans un navigateur. Il n'y a ni installation, ni build, ni serveur à lancer. Pour passer par un serveur local, depuis la racine du dépôt :

```sh
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Ce que fait le site

- **Parcours guidé** : boutons Précédent et Suivant, ou flèches du clavier. Sur la carte, la caméra zoome sur la branche active.
- **Navigation libre dans la carte** : glisser pour se déplacer ; molette ou deux doigts sur le trackpad pour défiler ; pincer ou Ctrl + molette pour zoomer ; touches + − pour zoomer et 0 pour recentrer. Un clic ouvre une idée, un glisser ne l'ouvre pas.
- **Révélation progressive** : les branches à venir restent grisées tant que la précédente n'est pas parcourue. La progression est gardée dans le navigateur. Le seul bouton en haut est « Vue d'ensemble », qui affiche toute la carte parcourue.
- **« Devine le chiffre »** : quatre fois, on estime un chiffre avec un curseur avant de voir la réponse : 2,8 fois, 53,8 %, 9 sur 13 et 91 %.
- **Mise en situation** en deux scènes : le réflexe choisi est comparé aux réponses du questionnaire, puis placé sur la progression vulnérabilité → adaptation → contrainte → renoncement.
- **Quiz final** de 3 questions, puis la vue d'ensemble de la carte.
- **Mobile** (moins de 900 px) : la carte SVG est remplacée par une rangée de pastilles de branches et un sommaire cliquable.

## Organisation

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page. |
| `data/carte.js` | **Tous les textes et chiffres** : branches, idées, sources. C'est le seul fichier à modifier pour changer le contenu. |
| `js/carte.js` | Construction de la carte SVG, caméra, parcours, panneau, interactions, accessibilité. |
| `DESIGN.md` | Référence de style « Glass Spectre » : couleurs, verre, typographie, composants, règles. |
| `css/variables.css` | Tokens du thème (une couleur par branche, verre, polices système Apple). |
| `css/style.css` | Mise en page, composants, mobile, impression, mouvement réduit. |
| `assets/` | Favicon et police Inter auto-hébergée (avec sa licence). |

Les scripts sont des scripts classiques, sans module ni `fetch`, pour que le site fonctionne aussi en `file://`.

## Modifier le contenu

Dans `data/carte.js`, chaque idée a un `type` qui choisit sa mise en forme : `text`, `facts`, `list`, `scope`, `steps`, `compare`, `funnel`, `bars`, `guess`, `scenario`, `chain`, `chips`, `quote`, `valuechain`, `actors`, `solutions`, `friction`, `quiz`. Pour ajouter une idée, copier un bloc du même type dans la branche voulue : elle apparaît automatiquement sur la carte, dans le parcours et dans le sommaire. Pour garder la carte lisible, un `label` doit faire 4 mots au maximum.

## Sources des chiffres

- **Questionnaire du Groupe 7b** : 20 réponses, dont 15 femmes. L'analyse porte sur les **13 répondantes de 18 à 34 ans**, comme dans le rapport. L'échantillon est exploratoire et ne permet pas de généraliser.
- **SSMSI, *Vécu et ressenti en matière de sécurité*, édition 2024** : à caractéristiques comparables, les femmes ont 2,8 fois plus de risque que les hommes d'avoir renoncé à sortir seules pour des raisons de sécurité.
- **SSMSI, données 2024, reprises par l'Observatoire national des violences faites aux femmes (Miprof, mars 2025)** : environ 3 400 victimes de violences sexuelles enregistrées dans les transports en commun en 2024, dont 91 % de femmes.

Le rapport cite aussi deux autres rapports de risque : 1,4 pour les 18-24 ans face aux 35-45 ans, et 1,6 pour les grandes unités urbaines face au hors unité urbaine. Ils ne sont pas affichés en chiffres. Dans le rapport SSMSI, ils ne figurent que sur un graphique (figure 16), sans valeur écrite. Il faudra les vérifier dans le fichier de données du SSMSI avant de les ajouter.
