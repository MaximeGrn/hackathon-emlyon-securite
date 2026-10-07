# Glass Blue : référence de style
> Bleu Apple sur verre dépoli. Une carte qui flotte sur un ciel bleu diffus, des panneaux translucides qui captent la lumière du curseur, une typographie système nette et silencieuse.

**Thème** : clair

Cette référence remplace la référence « Wise » (vert forêt et lime). La structure est la même (tokens, typographie, composants, règles), adaptée à un site de type tech, minimaliste, dans l'esprit d'Apple et du « liquid glass ».

## Intention

Le site doit faire penser à une page produit Apple, pas à une landing page ni à un tableau de bord. Trois principes :

1. **Le contenu d'abord.** Beaucoup d'espace, peu de traits, aucune décoration qui ne porte pas d'information.
2. **Une seule couleur d'action.** Le bleu `#0071e3` signale ce qui est actif, cliquable ou important. Tout le reste est en niveaux de gris.
3. **De la profondeur, pas des bordures.** Les couches se distinguent par le verre (flou, transparence, reflet) et par des ombres très douces, jamais par des cadres épais.

## Tokens — couleurs

| Nom | Valeur | Token | Rôle |
|---|---|---|---|
| Bleu action | `#0071e3` | `--blue` | Couleur unique d'action : bouton principal, état actif, idée en cours, chiffres clés, liens. Contraste 4,7:1 sur blanc |
| Bleu vif | `#2997ff` | `--blue-bright` | Haut des dégradés du nœud central, reflets. Jamais en texte sur fond clair |
| Bleu profond | `#0058b0` | `--blue-deep` | Texte bleu sur fond bleu pâle, survol du bouton principal |
| Bleu brume | `#e8f1fd` | `--blue-mist` | Surfaces teintées : idée déjà vue, puces, cartes mises en avant |
| Bleu ciel | `#cfe3fb` | `--blue-sky` | Barres secondaires, liens de la carte, pistes de curseur |
| Indigo | `#5e5ce6` | `--indigo` | Accent rare : données nationales uniquement |
| Rouge alerte | `#d70015` | `--red` | Accent rare : zone de friction et mauvaise réponse uniquement |
| Rouge brume | `#fff0f0` | `--red-mist` | Fond de la zone de friction |
| Encre | `#1d1d1f` | `--ink` | Titres et texte principal (le noir d'Apple, jamais `#000`) |
| Graphite | `#424245` | `--ink-2` | Texte courant long |
| Gris secondaire | `#6e6e73` | `--ink-3` | Légendes, sources, métadonnées |
| Gris tertiaire | `#86868b` | `--ink-4` | Éléments verrouillés et désactivés uniquement |
| Séparateur | `rgb(0 0 0 / 8%)` | `--hairline` | Filets de 1 px |
| Toile | `#f5f7fb` | `--canvas` | Fond de page, légèrement bleuté |

## Verre (liquid glass)

| Niveau | Fond | Flou | Usage |
|---|---|---|---|
| Verre léger | `rgb(255 255 255 / 55%)` | `blur(24px) saturate(180%)` | Barre du haut, barre de parcours, commandes de zoom |
| Verre dense | `rgb(255 255 255 / 84%)` | `blur(32px) saturate(180%)` | Panneau de lecture (beaucoup de texte : il faut du contraste) |
| Verre de carte | `rgb(255 255 255 / 78%)` | aucun (SVG) | Nœuds de la carte : blanc translucide, liseré blanc, ombre bleutée |

Chaque surface en verre a :
- un liseré intérieur clair `inset 0 1px 0 rgb(255 255 255 / 80%)` et un contour `1px rgb(255 255 255 / 60%)` ;
- une ombre bleutée très diffuse `0 12px 40px rgb(16 42 90 / 12%)` ;
- un **reflet interactif** : un halo blanc radial qui suit le curseur au survol (`--mx`, `--my` mis à jour en JavaScript). C'est la partie « liquide » du verre.

Le verre n'existe que s'il y a quelque chose derrière : la page a un **fond de halos bleus** (3 taches floues bleu ciel, bleu et indigo pâle) qui dérivent lentement. L'animation est coupée si l'utilisateur demande moins de mouvement.

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
Pilule bleu `#0071e3`, texte blanc, graisse 500, 17 px, padding 12 × 22 px. Survol : `#0058b0`. Pas d'ombre.

### Bouton secondaire
Pilule en verre léger, texte encre. Survol : le reflet interactif apparaît.

### Lien texte
Bleu `#0071e3`, sans soulignement au repos, souligné au survol.

### Nœud central
Rectangle arrondi 28 px, dégradé `#2997ff` vers `#0060df`, texte blanc. C'est le seul aplat de couleur fort de la carte.

### Nœud de branche
Pilule en verre de carte, numéro dans une pastille bleue, titre encre.
États : **active** = bleu plein, texte blanc ; **terminée** = bleu brume, texte bleu profond ; **verrouillée** = verre à 40 %, texte gris tertiaire, sans ombre.

### Feuille
Point de 7 px (contour bleu), libellé encre. **Vue** = point plein bleu ; **en cours** = point bleu agrandi avec halo bleu à 25 %, libellé bleu en graisse 600 ; **à venir** = libellé gris tertiaire.

### Liens de la carte
Courbes de Bézier, bleu à 22 % d'opacité, 2 px ; liens vers les feuilles déjà vues à 40 %.

### Panneau de lecture
Verre dense, rayon 28 px, défilement interne. Surtitre « 3 · Terrain » et compteur « Idée 2 sur 6 » en gris secondaire, titre à 32 px.

### Barres de données
Piste `#eef2f8` de 6 px, remplissage bleu ciel ; la valeur mise en avant en bleu plein.

### Devine le chiffre
Carte blanche à 70 %, curseur natif teinté en bleu (`accent-color`), chiffre géant. Après validation : deux repères sur une piste (« Toi » en gris, « Réalité » en bleu) et l'écart chiffré.

## À faire

- Garder un seul bleu d'action par zone visible : le reste en gris.
- Mettre du flou derrière chaque surface flottante, et un fond coloré derrière tout le verre.
- Laisser respirer : si un écran semble chargé, enlever un élément plutôt que réduire les marges.
- Garder l'accessibilité : contraste AA du texte (le verre dense sert à ça), focus visible bleu, `prefers-reduced-motion` respecté.

## À éviter

- Pas de vert, de lime ni de noir pur.
- Pas de bordures épaisses ni de pointillés : la hiérarchie vient du verre, des ombres et de la couleur.
- Pas de graisse 800/900, pas de majuscules sauf pour les surtitres.
- Pas d'emoji, de badge, de confetti : le sujet est sérieux.
- Pas de bleu vif `#2997ff` en texte sur fond clair (contraste insuffisant).

## Démarrage rapide

```css
:root {
  --blue: #0071e3; --blue-bright: #2997ff; --blue-deep: #0058b0;
  --blue-mist: #e8f1fd; --blue-sky: #cfe3fb; --indigo: #5e5ce6;
  --red: #d70015; --red-mist: #fff0f0;
  --ink: #1d1d1f; --ink-2: #424245; --ink-3: #6e6e73; --ink-4: #86868b;
  --hairline: rgb(0 0 0 / 8%); --canvas: #f5f7fb;
  --glass: rgb(255 255 255 / 55%); --glass-dense: rgb(255 255 255 / 84%);
  --glass-blur: blur(24px) saturate(180%);
  --glass-edge: inset 0 1px 0 rgb(255 255 255 / 80%), 0 0 0 1px rgb(255 255 255 / 55%);
  --shadow-float: 0 12px 40px rgb(16 42 90 / 12%);
  --radius-pill: 999px; --radius-card: 20px; --radius-panel: 28px;
}
```
