class BossBar extends StatusBar {
    x = 400;
    y = 420;
    width = 300;
    height = 60;

    constructor() {
        super(ImageHub.bossBar);
    }

    setPercentage(percentage) {
        let imageIndex = Math.floor(
            (percentage / 100) * (this.IMAGES.length - 1)
        );
        imageIndex = Math.max(0, Math.min(imageIndex, this.IMAGES.length - 1));

        this.currentImage = this.IMAGES[imageIndex];

        if (this.currentImage) {
            this.img = new Image();
            this.img.src = this.currentImage;
        }
    }
}
