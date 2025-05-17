class Level {
    enemies;
    clouds;
    backgroundObjects;
    salsaBottles;
    coins;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, salsaBottles, coins){
        this.enemies = enemies;
        this.salsaBottles = salsaBottles;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}