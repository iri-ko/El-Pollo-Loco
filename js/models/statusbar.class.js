class StatusBar extends DrawableObject {
    IMAGES_BAR_HEALTH = [
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    ];

    percentage = 100;

    constructor() {
        super();
        this.x = 20;
        this.y = -10;
        this.height = 50;
        this.width = 150;
        this.loadImages(this.IMAGES_BAR_HEALTH);
        
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let barPath = this.resolveImageIndex()
        this.img = this.imageCache[barPath]
    }

    resolveImageIndex() {
    if (this.percentage == 100) {
        return this.IMAGES_BAR_HEALTH[0];
    } else if (this.percentage > 60) {
        return this.IMAGES_BAR_HEALTH[1];
    } else if (this.percentage > 40) {
        return this.IMAGES_BAR_HEALTH[2];
    } else if (this.percentage > 20) {
        return this.IMAGES_BAR_HEALTH[3];
    } else if (this.percentage > 0) {
        return this.IMAGES_BAR_HEALTH[4];
    } else {
        return this.IMAGES_BAR_HEALTH[5];
    }
}

}
