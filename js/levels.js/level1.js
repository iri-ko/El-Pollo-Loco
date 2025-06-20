/**
 * Initializes the game level by creating a new Level instance.
 * The level consists of various entities, including enemies, collectibles, clouds, and background objects.
 *
 * @global
 * @property {Level} level1 - The game level instance.
 */
function initLevel() {
    level1 = new Level(
        [
            new Chicken(), 
            new Chicken(), 
            new Chicken(),
            new BabyChick(),
            new BabyChick(),
            new BabyChick(),   
            new Endboss(),
        ],
        [ 
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
        ],
        [
            new Coin(),
            new Coin(),  
            new Coin(), 
            new Coin(), 
            new Coin(), 
        ],
        [
            new Cloud()
        ],
        [
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

            new BackgroundObject("./assets/img/5_background/layers/air.png", 719*2),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 719*2, 0),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 719*2, 0),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 719*2, 0),

            new BackgroundObject("./assets/img/5_background/layers/air.png", 719*3),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 719*3, 0),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 719*3, 0),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 719*3, 0),
        ]
    );
}
