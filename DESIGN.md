# Glass Pomme : référence de style
> Vert pomme sur verre dépoli. Une carte qui flotte sur un fond de halos vert tendre, des panneaux translucides qui captent la lumière du curseur, une typographie système nette et silencieuse.

**Thème** : clair

Cette référence remplace la référence « Wise » (vert forêt et lime) et la variante bleue « Glass Blue ». La structure est la même (tokens, typographie, composants, règles), adaptée à un site de type tech, minimaliste, dans l'esprit d'Apple et du « liquid glass ».

## Intention

Le site doit faire penser à une page produit Apple, pas à une landing page ni à un tableau de bord. Trois principes :

1. **Le contenu d'abord.** Beaucoup d'espace, peu de traits, aucune décoration qui ne porte pas d'information.
2. **Une seule couleur d'action.** Le vert pomme `#34c759` (le vert système d'Apple) signale ce qui est actif, cliquable ou important. Tout le reste est en niveaux de gris.
3. **De la profondeur, pas des bordures.** Les couches se distinguent par le verre (flou, transparence, reflet) et par des ombres très douces, jamais par des cadres épais.

## Tokens — couleurs

| Nom | Valeur | Token | Rôle |
|---|---|---|---|
| Vert pomme | `#34c759` | `--accent` | Couleur unique d'action en aplat : bouton principal, branche active, idée en cours, barres mises en avant. **Toujours avec un texte foncé** (`--on-accent`, contraste 7,6:1), jamais du blanc (2,2:1) |
| Vert pomme clair | `#5fd67b` | `--accent-bright` | Reflets, halos. Jamais en texte |
| Vert survol | `#2db14f` | `--accent-hover` | Survol du bouton principal |
| Vert encre | `#1d7f35` | `--accent-ink` | Le vert **en texte** : liens, chiffres clés, libellé de l'idée en cours (4,7:1 sur la toile) |
| Vert profond | `#1b6b2c` | `--accent-deep` | Texte vert sur fond vert pâle |
| Vert brume | `#eaf8ec` | `--accent-mist` | Surfaces teintées : idée déjà vue, puces, cartes mises en avant |
| Vert tendre | `#c9eed1` | `--accent-sky` | Sélection de texte, barres secondaires |
| Texte sur vert | `#06210f` | `--on-accent` | Texte posé sur un aplat vert pomme |
| Forêt nuit | `#1b4527` → `#0b1f11` | — | Nœud central et grande citation : dégradé très sombre, texte blanc, surtitre vert pomme |
| Bleu données | `#0071e3` | `--data` | Accent rare : données nationales uniquement |
| Rouge alerte | `#d70015` | `--red` | Accent rare : zone de friction et mauvaise réponse uniquement |
| Rouge brume | `#fff0f0` | `--red-mist` | Fond de la zone de friction |
| Encre | `#1d1d1f` | `--ink` | Titres et texte principal (le noir d'Apple, jamais `#000`) |
| Graphite | `#424245` | `--ink-2` | Texte courant long |
| Gris secondaire | `#6e6e73` | `--ink-3` | Légendes, sources, métadonnées |
| Gris tertiaire | `#86868b` | `--ink-4` | Éléments verrouillés et désactivés uniquement |
| Séparateur | `rgb(0 0 0 / 8%)` | `--hairline` | Filets de 1 px |
| Toile | `#f4f8f3` | `--canvas` | Fond de page, légèrement verdi |

## Verre (liquid glass)

| Niveau | Fond | Flou | Usage |
|---|---|---|---|
| Verre léger | `rgb(255 255 255 / 55%)` | `blur(24px) saturate(180%)` | Barre du haut, barre de parcours, commandes de zoom |
| Verre dense | `rgb(255 255 255 / 84%)` | `blur(32px) saturate(180%)` | Panneau de lecture (beaucoup de texte : il faut du contraste) |
| Verre de carte | `rgb(255 255 255 / 80%)` | aucun (SVG) | Nœuds de la carte : blanc translucide, liseré blanc, ombre douce |

Chaque surface en verre a :
- un liseré intérieur clair `inset 0 1px 0 rgb(255 255 255 / 80%)` et un contour `1px rgb(255 255 255 / 60%)` ;
- une ombre verdâtre très diffuse `0 12px 40px rgb(18 53 28 / 12%)` ;
- un **reflet interactif** : un halo blanc radial qui suit le curseur au survol (`--mx`, `--my` mis à jour en JavaScript). C'est la partie « liquide » du verre.

Le verre n'existe que s'il y a quelque chose derrière : la page a un **fond de halos verts** (3 taches floues vert tendre, vert pomme pâle et menthe) qui dérivent lentement. L'animation est coupée si l'utilisateur demande moins de mouvement.

## Tokens — typographie

Les polices d'Apple (SF Pro) ne peuvent pas être hébergées sur un site. On utilise donc la **police système** : sur Mac, iPhone et iPad, le navigateur affiche SF Pro ; ailleurs, on retombe sur Inter, auto-hébergée, de dessin très proche.

```css
--font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, sans-serif;
--font-text: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', 'Segoe UI', system-ui, sans-serif;
```

| Rôle | Taille | Graisse | Interligne | Approche |
|---|---|---|---|---|
| Chiffre géant | 72–80 px | 700 | 1 | -0,04 em |
| Titre de panneau | 32 px | 700 | 1,1 | -0,025 em |
| Titre de nœud (carte) | 20 px | 600 | 1 | -0,02 em |
| Sous-titre | 19–21 px | 600 | 1,3 | -0,015 em |
| Texte courant | 17 px | 400 | 1,47 | -0,01 em |
| Libellé de feuille (carte) | 15,5 px | 500 | 1 | -0,01 em |
| Légende, source | 12–13 px | 400–500 | 1,4 | 0 |
| Surtitre | 12 px | 600 | 1 | +0,06 em, majuscules |

Règles : jamais de graisse 800 ou 900 (trop « Wise », pas assez Apple) ; titres serrés, texte courant presque neutre ; chiffres en `tabular-nums`.

## Formes et espacement

- Base 4 px. Espacements usuels : 8, 12, 16, 24, 32, 48.
- Rayons : pilules `999px` (boutons, nœuds, puces), cartes `20px`, panneaux `28px`, petites cartes `14px`.
- Densité aérée : 28 à 32 px de marge intérieure dans le panneau, 16 px entre les blocs flottants et le bord de l'écran.

## Mise en page

- **La carte occupe tout l'écran.** Tout le reste flotte au-dessus en verre : barre du haut (en haut), panneau de lecture (à droite, 440 px), barre de parcours (en bas, sous la carte), commandes de zoom (à gauche).
- La caméra cadre la branche active **dans la zone visible**, c'est-à-dire en tenant compte du panneau et des barres.
- **Mobile (moins de 900 px)** : pas de carte ; pastilles de branches, panneau pleine largeur en verre dense, barre de parcours collée en bas.

## Composants

### Bouton principal
Pilule vert pomme `#34c759`, texte `#06210f`, graisse 500, 15–17 px, padding 12 × 22 px. Survol : `#2db14f`. Pas d'ombre.

### Bouton secondaire
Pilule en verre léger, texte encre. Survol : le reflet interactif apparaît.

### Lien texte
Vert encre `#1d7f35`, sans soulignement au repos, souligné au survol.

### Nœud central
Rectangle arrondi 28 px, dégradé forêt nuit `#1b4527` vers `#0b1f11`, surtitre vert pomme, texte blanc. C'est le seul bloc sombre de la carte : il ancre le regard.

### Nœud de branche
Pilule en verre de carte, numéro dans une pastille vert pomme, titre encre.
États : **active** = vert pomme plein, texte `#06210f` ; **terminée** = vert brume, texte vert profond ; **verrouillée** = verre à 40 %, texte gris tertiaire, sans ombre.

### Feuille
Point de 7 px (contour vert encre), libellé encre. **Vue** = point plein vert pomme ; **en cours** = point vert agrandi avec halo vert à 30 %, libellé vert encre en graisse 600 ; **à venir** = libellé gris tertiaire.

### Liens de la carte
Courbes de Bézier, vert pomme à 22 % d'opacité, 2 px ; liens vers les feuilles déjà vues à 42 %.

### Panneau de lecture
Verre dense, rayon 28 px, défilement interne. Surtitre « 3 · Terrain » et compteur « Idée 2 sur 6 » en gris secondaire, titre à 32 px.

### Barres de données
Piste `#eef2f8` de 6 px, remplissage vert tendre ; la valeur mise en avant en vert pomme plein.

### Devine le chiffre
Carte blanche à 70 %, curseur natif teinté en vert (`accent-color`), chiffre géant en vert encre (en bleu données pour les chiffres nationaux). Après validation : deux repères sur une piste (« Toi » en gris, « Réalité » en couleur) et l'écart chiffré.

## À faire

- Garder un seul vert d'action par zone visible : le reste en gris.
- Mettre du flou derrière chaque surface flottante, et un fond coloré derrière tout le verre.
- Laisser respirer : si un écran semble chargé, enlever un élément plutôt que réduire les marges.
- Garder l'accessibilité : contraste AA du texte (le verre dense sert à ça), focus visible vert encre, `prefers-reduced-motion` respecté.

## À éviter

- Pas de lime fluo ni de noir pur ; pas de texte blanc sur le vert pomme.
- Pas de bordures épaisses ni de pointillés : la hiérarchie vient du verre, des ombres et de la couleur.
- Pas de graisse 800/900, pas de majuscules sauf pour les surtitres.
- Pas d'emoji, de badge, de confetti : le sujet est sérieux.
- Pas de vert pomme `#34c759` en texte sur fond clair (contraste 2:1) : utiliser le vert encre `#1d7f35`.

## Démarrage rapide

```css
:root {
  --accent: #34c759; --accent-bright: #5fd67b; --accent-hover: #2db14f;
  --accent-ink: #1d7f35; --accent-deep: #1b6b2c; --accent-mist: #eaf8ec;
  --accent-sky: #c9eed1; --on-accent: #06210f; --data: #0071e3;
  --red: #d70015; --red-mist: #fff0f0;
  --ink: #1d1d1f; --ink-2: #424245; --ink-3: #6e6e73; --ink-4: #86868b;
  --hairline: rgb(0 0 0 / 8%); --canvas: #f4f8f3;
  --glass: rgb(255 255 255 / 55%); --glass-dense: rgb(255 255 255 / 84%);
  --glass-blur: blur(24px) saturate(180%);
  --glass-edge: inset 0 1px 0 rgb(255 255 255 / 85%), inset 0 0 0 1px rgb(255 255 255 / 55%);
  --shadow-float: 0 12px 40px rgb(18 53 28 / 12%);
  --radius-pill: 999px; --radius-card: 20px; --radius-panel: 28px;
}
```
