class Level {
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new BabyChick(),
        new BabyChick(),
        new BabyChick(),
        new Endboss(),
    ];
    clouds = [new Cloud()];
    backgroundObjects = [
        new BackgroundObject("./assets/img/5_background/layers/air.png", -719),
        new BackgroundObject(
            "./assets/img/5_background/layers/3_third_layer/2.png",
            -719,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/2_second_layer/2.png",
            -719,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/1_first_layer/2.png",
            -719,
            0
        ),

        new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
        new BackgroundObject(
            "./assets/img/5_background/layers/3_third_layer/1.png",
            0,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/2_second_layer/1.png",
            0,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/1_first_layer/1.png",
            0,
            0
        ),

        new BackgroundObject("./assets/img/5_background/layers/air.png", 719),
        new BackgroundObject(
            "./assets/img/5_background/layers/3_third_layer/2.png",
            719,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/2_second_layer/2.png",
            719,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/1_first_layer/2.png",
            719,
            0
        ),

        new BackgroundObject(
            "./assets/img/5_background/layers/air.png",
            719 * 2
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/3_third_layer/1.png",
            719 * 2,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/2_second_layer/1.png",
            719 * 2,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/1_first_layer/1.png",
            719 * 2,
            0
        ),

        new BackgroundObject(
            "./assets/img/5_background/layers/air.png",
            719 * 3
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/3_third_layer/2.png",
            719 * 3,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/2_second_layer/2.png",
            719 * 3,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/1_first_layer/2.png",
            719 * 3,
            0
        ),
    ];
    salsaBottles = [
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
    ];
    
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
    level_end_x = 2200;

    // constructor(enemies, salsaBottles, coins, clouds, backgroundObjects) {
    //     this.enemies = enemies;
    //     this.salsaBottles = salsaBottles;
    //     this.coins = coins;
    //     this.clouds = clouds;
    //     this.backgroundObjects = backgroundObjects;
    // }
}
