# W1 - JavaScript - W-SPE-502

## My_Battleship - Coulez votre adversaire !

> Delivery method: battleship on Github

### INTRODUCTION

Vous reprenez le projet inachevé (archive disponible avec ce sujet) de quelqu’un d’autre. Vous allez devoir le débugger et terminer le projet.
Nous vous recommandons de bien prendre connaissance de l’ensemble du code (il y a plusieurs fichiers inclus dans la page HTML). 
Il peut également être de bon ton de se renseigner sur les librairies tierces utilisées.

Le précédent développeur même s’il vous a laissé un projet inachevé, s’est appliqué à mettre en place de bonnes pratiques d’architecture, et/ou des astuces de code, inspirez-vous ! 
Par ailleurs il vous a laissé un peu de documentation et des commentaires dans le code, exploitez les !
Nous vous recommandons également de faire des "commits atomiques" (si ce terme ne vous dit rien,renseignez-vous ;), cela vous permettra plus facilement de revenir en arrière si besoin.

### RESTRICTIONS

Vous n’avez pas le droit d’utiliser des librairies autres que celles déjà incluses dans le projet (excepté pour l’exercICE_17, pour ce dernier, seul socket.io est autorisée)

L’intégralité du code que vous rendez (même si ce n’est pas le vôtre à la base) doit être valide JSLint (https://www.jslint.com/ et sans changer les directives en en-tête des fichiers (si vous avez besoin de le faire, vous devrez être capable de le justifier en soutenance). 
Par ailleurs vous devrez être capable, en soutenance, d’expliquer n’importe quelle partie du code (même si ce n’est pas le vôtre à la base)

> Le code qui vous ait fourni est déjà (dans la mesure du possible) valide JSLint

### PROJET

Les exercices n’ont pas toujours de rapport entre eux, il est tout de même très conseillé de les aborder dans l’ordre dans lequel ils sont donnés.

#### EXERCICE_0<a id='0'></a>

- [x] EX00

Ouvrez la console (outils développeur) de votre navigateur, corrigez l’erreur JS qui y est affichée ("TypeError : player.setGame...").

Pour cet exercice, vous ne devez pas modifier le contenu du fichier game.js !

#### EXERCICE_1<a id='1'></a>

- [x] EX01

Faire en sorte que les bateaux une fois placés s’effacent correctement de la grande map.
Pour cet exercice, vous ne devez pas modifier le contenu du fichier game.js !

#### EXERCICE_2<a id='2'></a>

- [x] EX02

Implémentez la fonction renderMiniMap (déclarée dans le fichier game.js ligne 219, et appelée dans le même fichier à la ligne 160) qui a pour effet de colorer les cases de la minimap (sur la gauche) pour correspondre à l’emplacement des bateaux choisi par le joueur (les positions des bateaux sont enregistrées au moment où le joueur clique sur la grande grille).

Les différentes cases doivent être colorées de la couleur du bateau qui occupe la case.

#### EXERCICE_3<a id='3'></a>

- [x] EX03

Faire en sorte d’empêcher que l’utilisateur puisse placer 2 bateaux sur une même case, ou qu’un de ces bateaux sorte du terrain.
Si ces conditions ne sont pas respectées, il ne doit pas être du tout possible de placer le bateau (on ne doit pas passer au bateau suivant).

#### EXERCICE_4<a id='4'></a>

- [x] EX04

Faire en sorte de permettre à l’utilisateur de placer ses bateaux verticalement : pendant la phase de placement, le fait de faire un "clique droit" doit changer l’orientation du bateau.

#### EXERCICE_5<a id='5'></a>

- [x] EX05

Faire en sorte que l’ordinateur place ses bateaux de façon aléatoire (en respectant les mêmes règles deplacement que le joueur : pas de chevauchement, pas de sortie de la map).

Pour cet exercice, vous n’avez pas obligatoirement à créer de nouvelles fonctions.

#### EXERCICE_6<a id='6'></a>

- [x] EX05

Faire en sorte que les cases où l’utilisateur a déjà tiré soient affichées sur la carte (rouge si c’est touché, gris
si c’est manqué).

#### EXERCICE_7<a id='7'></a>

Faire en sorte que si le joueur choisit une case où il a déjà tiré, le message soit différent du message classique,
et l’information (touché ou manqué) ne change pas (par rapport au premier tir qui a eu lieu).

#### EXERCICE_8<a id='8'></a>

Modifier le code pour que l’ordinateur joue de façon plus intelligente (sans pour autant "tricher", l’objet com-
puter ne doit pas toucher à la propriété grid de l’autre joueur), actuellement il tire toujours dans la première
case en haut à gauche...

#### EXERCICE_9<a id='9'></a>

Une fois que l’ordinateur a joué (a fait une tentative de tir), si le joueur est touché (et uniquement dans
ce cas-là) la "Mini Map" doit être mise à jour pour refléter la perte subie par le joueur. Si un bateau est
complètement coulé, la classe css "sunk" doit être attribuée à l’icône du bateau correspondant (au-dessus
de la "mini map").

#### EXERCICE_10<a id='10'></a>

Une fois que l’ordinateur a joué (a fait une tentative de tir), la main devrait être redonnée au joueur, or
actuellement, ce n’est pas le cas. Trouvez, ce qui provoque ce bug, corrigez-le.

#### EXERCICE_11<a id='11'></a>

Implémentez la détection de fin de partie (fonction gameIsOver, dans le fichier game.js ligne 105 et appelée
à la ligne 80).

#### EXERCICE_12<a id='12'></a>

Implémentez la possibilité de choisir qui commence (joueur humain, ordinateur, ou aléatoire).

#### EXERCICE_13<a id='13'></a>

Ajoutez du son pour chaque tir : un son indépendamment de la réussite du tir puis un son en cas de tir réussi,
et un autre en cas de tri raté.

#### EXERCICE_14<a id='14'></a>

Ajoutez des animations dans les cases de la grille consécutivement à un tir du joueur : une animation
d’explosion pour un tir réussi, et une autre en cas de tri raté.

#### EXERCICE_15<a id='15'></a>

Implémentez plusieurs niveaux de jeu pour l’IA.
niveau facile : tirs aléatoires
niveau difficile : tirs réfléchis

#### EXERCICE_16<a id='16'></a>

Implémentez la possibilité d’avoir une aide de jeu : si le joueur le désir, l’ordinateur lui suggère une case à
jouer.

#### EXERCICE_17<a id='17'></a>

Implémentez une version multi-joueurs (en réseaux).
Si vous en êtes là, un assistant sera sûrement de bon conseil pour la suite des opérations.

- [x]
  [EXERCICE_0](#0)
- [x]
  [EXERCICE_1](#1)
- [x]
  [EXERCICE_2](#2)
- [x]
  [EXERCICE_3](#3)
- [x]
  [EXERCICE_4](#4)
- [x]
  [EXERCICE_5](#5)
- [ ]
  [EXERCICE_6](#6)
- [ ]
  [EXERCICE_7](#7)
- [ ]
  [EXERCICE_8](#8)
- [ ]
  [EXERCICE_9](#9)
- [ ]
  [EXERCICE_10](#10)
- [ ]
  [EXERCICE_11](#11)
- [ ]
  [EXERCICE_12](#12)
- [ ]
  [EXERCICE_13](#13)
- [ ]
  [EXERCICE_14](#14)
- [ ]
  [EXERCICE_15](#15)
- [ ]
  [EXERCICE_16](#16)
- [ ]
  [EXERCICE_17](#17)