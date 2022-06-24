/*jslint browser this */
/*global _, shipFactory, player, utils */

(function (global) {
    "use strict";

    var sheep = {
        dom: {
            parentNode: {
                removeChild: function () {
                },
            },
        },
    };

    var player = {
        grid: [], tries: [], fleet: [], game: null, activeShip: 0, init: function () {
            // créé la flotte
            this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));

            // créé les grilles
            this.grid = utils.createGrid(10, 10);
            this.tries = utils.createGrid(10, 10);
        }, play: function (col, line) {
            // appel la fonction fire du game, et lui passe une calback pour récupérer le résultat du tir
            this.game.fire(this, col, line, _.bind(function (hasSucced) {
                this.tries[line][col] = hasSucced;
            }, this));
        }, // quand il est attaqué le joueur doit dire si il a un bateaux ou non à l'emplacement choisi par l'adversaire
        receiveAttack: function (col, line, target1, callback) {
            var succeed = false;
            var isFire = false;
            if (target1.tries[line][col] === false || (target1.tries[line][col] === true && target1.tries[line][col] !== 0)) {
                isFire = true;
            }
            if (this.grid[line][col] !== 0) {
                succeed = true;
                this.grid[line][col] = "🔥";
            }
            callback.call(undefined, succeed, isFire);
        },

        setActiveShipPosition: function (x, y, ship) {
            var ship = this.fleet[this.activeShip];
            var i = 0;

            if (ship.dom.clientWidth > ship.dom.clientHeight) {
                //// EX03 🔥 Vérification de l'emplacement des bateaux
                //// horizontal ou vertical

                ship.life === 3 ? (x -= 1) : (x -= 2);

                while (i < ship.life) {
                    if (this.grid[y][x + i] > 0) {
                        return false;
                    }
                    i += 1;
                }
                if (x < 0 || x + ship.life > 10) {
                    return false;
                }
                i = 0;
                while (i < ship.life) {
                    this.grid[y][x + i] = ship.id;
                    i += 1;
                }
            } else {
                if (ship.life == 3) y++;

                while (i < ship.life) {
                    if (!this.grid[y + i - 2] || this.grid[y + i - 2][x] > 0) {
                        return false;
                    }
                    i += 1;
                }

                if (y < 2 || y + ship.life > 12) {
                    return false;
                }

                i = 0;
                while (i < ship.life) {
                    this.grid[y + i - 2][x] = ship.id;
                    i += 1;
                }
            }

            return true;
        },
         
        setGame:function(game){    //// 🔥  exercice 0 corrigé
            this.game = game;
        },
        clearPreview: function () {
            //// 🔥 ex01  les bateaux une fois placés s’effacent correctement de la grande map.
            this.fleet.forEach(function (ship) {
                ////🔥 ex01  mauvaise variable changement sheep par ship
                if (ship.dom.parentNode) {
                    ship.dom.parentNode.removeChild(ship.dom);
                }
            });
        }, resetShipPlacement: function () {
            this.clearPreview();

            this.activeShip = 0;
            this.grid = utils.createGrid(10, 10);
        }, activateNextShip: function () {
            if (this.activeShip < this.fleet.length - 1) {
                this.activeShip += 1;
                return true;
            } else {
                return false;
            }
        }, renderTries: function (grid, status) {
            console.log(this.grid);
            var that = this;
            setTimeout(function () {
                that.tries.forEach(function (row, rid) {
                    row.forEach(function (val, col) {
                        var node = grid.querySelector(".row:nth-child(" + (rid + 1) + ") .cell:nth-child(" + (col + 1) + ")");

                        if (val === true) {
                          
                            node.style.backgroundColor = "#e60019";
                        } else if (val === false && status !== "hide") {
                            node.style.backgroundColor = "#aeaeae";
                        }
                    });
                });
            }, 100);
        },
        
        renderShips: function (grid) {
        },
    };

    global.player = player;
})(this);
