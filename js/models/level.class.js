/**
 * Represents a game level, containing enemies, collectibles, environmental objects, and the level boundary.
 */
class Level {
    /**
     * Array of enemy objects present in the level.
     * @type {MovableObject[]}
     */
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new BabyChick(),
        new BabyChick(),
        new BabyChick(),
        new Endboss(),
    ];

    /**
     * Array of cloud objects present in the level.
     * @type {Cloud[]}
     */
    clouds = [new Cloud()];

    /**
     * Array of background objects used for rendering the level scenery.
     * @type {BackgroundObject[]}
     */
    backgroundObjects = [
        new BackgroundObject("./assets/img/5_background/layers/air.png", -719),
        new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", -719, 0),
        new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", -719, 0),
        new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", -719, 0),
        new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
        new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 0, 0),
        new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 0, 0),
        new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 0, 0),
        new BackgroundObject("./assets/img/5_background/layers/air.png", 719),
        new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 719, 0),
        new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 719, 0),
        new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 719, 0),
        new BackgroundObject("./assets/img/5_background/layers/air.png", 719 * 2),
        new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 719 * 2, 0),
        new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 719 * 2, 0),
        new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 719 * 2, 0),
        new BackgroundObject("./assets/img/5_background/layers/air.png", 719 * 3),
        new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 719 * 3, 0),
        new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 719 * 3, 0),
        new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 719 * 3, 0),
    ];

    /**
     * Array of collectible salsa bottles in the level.
     * @type {SalsaBottle[]}
     */
    salsaBottles = [
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
    ];

    /**
     * Array of collectible coins in the level.
     * @type {Coin[]}
     */
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];

    /**
     * The horizontal boundary that defines the end of the level.
     * @type {number}
     */
    level_end_x = 2200;
}
