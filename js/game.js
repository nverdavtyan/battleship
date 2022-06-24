/*jslint browser this */
/*global _, player, computer, utils */

(function () {
    "use strict";

    var game = {
        PHASE_INIT_PLAYER: "PHASE_INIT_PLAYER",
        PHASE_INIT_OPPONENT: "PHASE_INIT_OPPONENT",
        PHASE_PLAY_PLAYER: "PHASE_PLAY_PLAYER",
        PHASE_PLAY_OPPONENT: "PHASE_PLAY_OPPONENT",
        PHASE_GAME_OVER: "PHASE_GAME_OVER",
        PHASE_WAITING: "waiting",

        currentPhase: "",
        phaseOrder: [], // garde une référence vers l'indice du tableau phaseOrder qui correspond à la phase de jeu pour le joueur humain
        playerTurnPhaseIndex: 2,

        // l'interface utilisateur doit-elle être bloquée ?
        waiting: false,

        // garde une référence vers les nœuds correspondant du dom
        grid: null,
        miniGrid: null,

        // liste des joueurs
        players: [],

        
        // lancement du jeu
        init: function () {
            // initialisation
            this.grid = document.querySelector(".board .main-grid");
            this.miniGrid = document.querySelector(".mini-grid");
            //// 🔥 EX03 mauvaise class sélectionnée .board

            this.playerTurnPhaseIndex = 0;
            // initialise les joueurs
            this.setupPlayers();

            // ajoute les écouteurs d'événement sur la grille
            this.addListeners();
            let modal = document.getElementById("game_modal");
            let computer = document.querySelector(".computer");
            let player = document.querySelector(".player");
            let random = document.querySelector(".random");

            // défini l'ordre des phases de jeu
            let self = this;
            computer.addEventListener("click", function () {
                //// 🔥 EX12 (joueur humain, ordinateur, ou aléatoire)

                self.phaseOrder = [self.PHASE_INIT_OPPONENT, self.PHASE_INIT_PLAYER, self.PHASE_PLAY_OPPONENT, self.PHASE_PLAY_PLAYER, self.PHASE_GAME_OVER,];
                modal.style.display = "none";
                self.goNextPhase();
            });
            player.addEventListener("click", function () {
                self.phaseOrder = [self.PHASE_INIT_PLAYER, self.PHASE_INIT_OPPONENT, self.PHASE_PLAY_PLAYER, self.PHASE_PLAY_OPPONENT, self.PHASE_GAME_OVER,];
                modal.style.display = "none";
                self.goNextPhase();
            });
            random.addEventListener("click", function () {
                let rand = Math.floor(Math.random() * 2);
                if (rand === 0) {
                    self.phaseOrder = [self.PHASE_INIT_OPPONENT, self.PHASE_INIT_PLAYER, self.PHASE_PLAY_OPPONENT, self.PHASE_PLAY_PLAYER, self.PHASE_GAME_OVER,];
                    modal.style.display = "none";
                    self.goNextPhase();
                } else {
                    self.phaseOrder = [self.PHASE_INIT_PLAYER, self.PHASE_INIT_OPPONENT, self.PHASE_PLAY_PLAYER, self.PHASE_PLAY_OPPONENT, self.PHASE_GAME_OVER,];
                    modal.style.display = "none";
                    self.goNextPhase();
                }
            });
            // c'est parti !  🔥
            // this.goNextPhase();
        },
        setupPlayers: function () {
            // donne aux objets player et computer une réference vers l'objet game
            player.setGame(this);
            computer.setGame(this);

            // todo : implémenter le jeu en réseaux
            this.players = [player, computer];

            this.players[0].init();
            this.players[1].init();
        },
        
        goNextPhase: function () {
            // récupération du numéro d'index de la phase courante

            var ci = this.phaseOrder.indexOf(this.currentPhase);
            var self = this;

            if (ci !== this.phaseOrder.length - 1) {
                this.currentPhase = this.phaseOrder[ci + 1];
            } else {
                this.currentPhase = this.phaseOrder[0];
            }
            switch (this.currentPhase) {
                case this.PHASE_GAME_OVER:
                    // detection de la fin de partie
                    if (!this.gameIsOver()) {
                        // le jeu n'est pas terminé on recommence un tour de jeu
                        this.currentPhase = this.phaseOrder[this.playerTurnPhaseIndex + 1];
                        utils.info("A vous de jouer, choisissez une case !");
                        self.goNextPhase();
                    }
                    break;
                ////🔥 EX10 le bug est corrigé, manque le break
                case this.PHASE_INIT_PLAYER:
                    utils.info("Placez vos bateaux");
                    break;
                case this.PHASE_INIT_OPPONENT:
                    this.wait();
                    utils.info("En attente de votre adversaire");
                    this.players[1].isShipOk(function () {
                        self.stopWaiting();
                        self.goNextPhase();
                    });
                    break;
                case this.PHASE_PLAY_PLAYER:
                    utils.info("A vous de jouer, choisissez une case !");
                    break;
                case this.PHASE_PLAY_OPPONENT:
                    utils.info("A votre adversaire de jouer...");
                    this.players[1].play();
                    break;
            }
        },

        gameIsOver: function () {
            return this.statusOver;
        },
        getPhase: function () {
            if (this.waiting) {
                return this.PHASE_WAITING;
            }
            return this.currentPhase;
        }, // met le jeu en mode "attente" (les actions joueurs ne doivent pas être pris en compte si le jeu est dans ce mode)
        wait: function () {
            this.waiting = true;
        }, // met fin au mode mode "attente"
        stopWaiting: function () {
            this.waiting = false;
        },
        addListeners: function () {
            // on ajoute des acouteur uniquement sur la grid (délégation d'événement)
            this.grid.addEventListener("mousemove", _.bind(this.handleMouseMove, this));
            this.grid.addEventListener("click", _.bind(this.handleClick, this));
            this.grid.addEventListener("contextmenu", _.bind(this.handleRightClick, this));
        },

        handleRightClick: function (e) {
            e.preventDefault();
          function gridMove() {
            let gridShift = utils.calculateGridMove(this.players[0]);
            return gridShift;
          }

            ////ex04 🔥 clique droit change l’orientation du bateau en vertical
            if (this.getPhase() === this.PHASE_INIT_PLAYER && e.target.classList.contains("cell")) {
                var ship = this.players[0].fleet[this.players[0].activeShip];
                if (ship.dom.parentNode) {
                    //// 🔥 ex04  changement l’orientation du bateau en vertical.
                    var newWidth = ship.dom.style.height;
                    ship.dom.style.height = ship.dom.style.width;
                    ship.dom.style.width = newWidth;
                    let gridShift = gridMove.call(this);
                  //// 🔥 verification l’orientation du bateau pour le curseur .
                    if (ship.dom.clientWidth > ship.dom.clientHeight) {
                        ship.dom.style.top = "" + utils.eq(e.target.parentNode) * utils.CELL_SIZE - gridShift + "px";
                        ship.dom.style.left = "" + utils.eq(e.target) * utils.CELL_SIZE - Math.floor(ship.life / 2) * utils.CELL_SIZE + "px";
                    } else {
                        ship.dom.style.top = "" + utils.eq(e.target.parentNode) * utils.CELL_SIZE - gridShift - Math.floor(ship.life / 2) * utils.CELL_SIZE + "px";
                        ship.dom.style.left = "" + utils.eq(e.target) * utils.CELL_SIZE + "px";
                    }
                }
            }
        },

        handleMouseMove: function (e) {
            // on est dans la phase de placement des bateau
            if (this.getPhase() === this.PHASE_INIT_PLAYER && e.target.classList.contains("cell")) {
                var ship = this.players[0].fleet[this.players[0].activeShip];

                // si on n'a pas encore affiché (ajouté aux DOM) ce bateau
                if (!ship.dom.parentNode) {
                    this.grid.appendChild(ship.dom);
                    // passage en arrière plan pour ne pas empêcher la capture des événements sur les cellules de la grille
                    ship.dom.style.zIndex = -1;
                }

                // décalage visuel, le point d'ancrage du curseur est au milieu du bateau
                let gridShift = utils.calculateGridMove(this.players[0]);
                //// 🔥 verification l’orientation du bateau pour le curseur .
                if (ship.dom.clientWidth > ship.dom.clientHeight) {
                    ship.dom.style.top = "" + utils.eq(e.target.parentNode) * utils.CELL_SIZE - gridShift + "px";
                    ship.dom.style.left = "" + utils.eq(e.target) * utils.CELL_SIZE - Math.floor(ship.life / 2) * utils.CELL_SIZE + "px";
                } else {
                    ship.dom.style.top = "" + utils.eq(e.target.parentNode) * utils.CELL_SIZE - gridShift - Math.floor(ship.life / 2) * utils.CELL_SIZE + "px";
                    ship.dom.style.left = "" + utils.eq(e.target) * utils.CELL_SIZE + "px";
                }
            }
        },

        handleClick: function (e) {
            // self garde une référence vers "this" en cas de changement de scope
            var self = this;

            // si on a cliqué sur une cellule (délégation d'événement)
            if (e.target.classList.contains("cell")) {
                // si on est dans la phase de placement des bateaux
                if (this.getPhase() === this.PHASE_INIT_PLAYER) {
                    // on enregistre la position du bateau, si cela se passe bien (la fonction renvoie true) on continue
                    if (this.players[0].setActiveShipPosition(utils.eq(e.target), utils.eq(e.target.parentNode))) {
                        // et on passe au bateau suivant (s'il n'y en plus la fonction retournera false)
                        if (!this.players[0].activateNextShip()) {
                            this.wait();
                            utils.confirm("Confirmez le placement ?", function () {
                                // si le placement est confirmé
                                self.stopWaiting();
                                self.renderMiniMap();
                                //self.players[0].clearPreview();
                                self.goNextPhase();
                            }, function () {
                                self.stopWaiting();
                                // sinon, on efface les bateaux (les positions enregistrées), et on recommence
                                self.players[0].resetShipPlacement();
                            });
                        }
                    }
                    // si on est dans la phase de jeu (du joueur humain)
                } else if (this.getPhase() === this.PHASE_PLAY_PLAYER) {
                    this.players[0].play(utils.eq(e.target), utils.eq(e.target.parentNode));
                }
            }
        }, // fonction utlisée par les objets représentant les joueurs (ordinateur ou non)
        // pour placer un tir et obtenir de l'adversaire l'information de réusssite ou non du tir
        fire: function (from, col, line, callback) {
            this.wait();
            var self = this;
            var msg = "";

            // determine qui est l'attaquant et qui est attaqué
            var target = this.players.indexOf(from) === 0 ? this.players[1] : this.players[0];
            var target1 = this.players.indexOf(from) === 0 ? this.players[0] : this.players[1];

            if (this.currentPhase === this.PHASE_PLAY_OPPONENT) {
                msg += "Votre adversaire vous a... ";
            }

            // on demande à l'attaqué si il a un bateaux à la position visée
            // le résultat devra être passé en paramètre à la fonction de callback (3e paramètre)
            target.receiveAttack(col, line, target1, function (hasSucceed, isFire) {
                if (hasSucceed) {
                    if (isFire === true) {
                        //// 🔥 EX07 si le joueur choisit une case où il a déjà tiré on affiche cette message,
                        msg += "Vous avez déjà touché a cette position !";
                        const audio = new Audio("audio/goodShot.mp3");
                        //// 🔥 EX13  un son du tir puis un son en cas de tir réussi
                        audio.play();
                        self.renderMap(true);
                    } else {
                        msg += "Touché !";
                        const audio = new Audio("audio/goodShot.m4a");
                        audio.play();
                        self.renderMap(true);
                    }
                } else {
                    if (isFire === true) {
                        msg += "Vous avez déjà manqué votre tir à cette position !";
                        const audio = new Audio("audio/badShot.mp3");
                        audio.play();
                        self.renderMap(false);
                    } else {
                        msg += "Manqué...";
                        const audio = new Audio("audio/badShot.mp3");
                        audio.play();
                        self.renderMap(false);
                    }
                }

                utils.info(msg);

                // on invoque la fonction callback (4e paramètre passé à la méthode fire)
                // pour transmettre à l'attaquant le résultat de l'attaque
                callback(hasSucceed);

            

                // on fait une petite pause avant de continuer...
                // histoire de laisser le temps au joueur de lire les message affiché
                setTimeout(function () {
                    self.stopWaiting();
                    self.goNextPhase();
                }, 1000);
            });
        },
        renderMap: function (status) {
            if (this.currentPhase === "PHASE_PLAY_PLAYER") {
                this.players[0].renderTries(this.grid);
            } else {
                this.players[1].renderTries(this.miniGrid, "hide");
            }
        },
        renderMiniMap: function () {
            var ships = this.players[0].fleet;
            ships.forEach((ship) => {
                this.miniGrid.appendChild(ship.dom);
            });
        },
    };

    // point d'entrée
    document.addEventListener("DOMContentLoaded", function () {
        game.init();
    });
})();
