/*jslint browser this */
/*global _, player */

(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [], tries: [], fleet: [], game: null, play: function () {
            var self = this;
            ////🔥 EX08 l’ordinateur joue de façon plus intelligente
            let col = Math.floor(Math.random() * 10);
            let row = Math.floor(Math.random() * 10);

            let inFire = this.tries[row][col];
            if (inFire !== 0) {
                while (inFire !== 0) {
                    col = Math.floor(Math.random() * 10);
                    row = Math.floor(Math.random() * 10);
                    inFire = this.tries[row][col];
                }
            }
            setTimeout(function () {
                self.game.fire(this, col, row, function (hasSucced) {
                    self.tries[row][col] = hasSucced;
                });
                console.log(row, col);
            }, 200);
        }, isShipOk: function (callback) {
            var i = 0;
            var j;
            this.fleet.forEach(function (ship) {
                //// 🔥 EX05 l'ordinateur place ses bateaux de façon aléatoire
                let orientation;
                let col;
                let row;

                do {
                    orientation = Math.floor(Math.random() * 2);
                    col = Math.floor(Math.random() * 10);
                    row = Math.floor(Math.random() * 10);
                } while (!this.setActiveShipPosition(col, row, ship, orientation));
                if (this.activeShip < this.fleet.length - 1) {
                    this.activeShip += 1;
                    return true;
                } else {
                    return false;
                }
            }, this);

            setTimeout(function () {
                callback();
            }, 500);
        }, setActiveShipPosition: function (x, y, ship, orientation) {
            var ship = this.fleet[this.activeShip];
            var i = 0;

            if (orientation === 1) {
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
    });

    global.computer = computer;
})(this);
