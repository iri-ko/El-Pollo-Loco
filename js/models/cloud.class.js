/**
 * creates new Cloud
 * @class
 */
class Cloud extends MovableObject {
    /**
     * height of cloud sprite.
     * @type {number}
     */
    height = 180;

    /**
     * movement speed of cloud.
     * @type {number}
     */
    speed = 0.15;

    /**
     * vertical position of cloud.
     * @type {number}
     */
    y = 20;

    /**
     * width of cloud sprite.
     * @type {number}
     */
    width = 500;

    /**
     * horizontal position of cloud, randomized within a range.
     * @type {number}
     */
    x = Math.random() * 500;

    /**
     * Creates Cloud instance and initializes movement.
     */
    constructor() {
        super();
        this.loadImage("assets/img/5_background/layers/4_clouds/w1.png");
        this.animate();
    }

    /**
     * Starts  cloud movement animation, making it continuously move left.
     */
    animate() {
        IntervalHub.startInterval(this.moveLeft, 17, "cloudMoveleft");
    }
}
