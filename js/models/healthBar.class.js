/**
 * creates new Healthbar for player
 * @class
 */
class HealthBar extends StatusBar {
    /**
     * Creates HealthBar instance.
     * Loads  health bar sprite from ImageHub and initializes it to full health.
     */
    constructor() {
        super(ImageHub.healthBar);
        this.setPercentage(100);
    }
}
