class StatusBar extends DrawableObject {
    percentage;
    IMAGES = []; // placeholder for dynamic storage
    x = 20;
    y = -10;
    height = 60;
    width = 200;

    constructor(images) {
        super();
        this.IMAGES = images; //

        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let barPath = this.resolveImageIndex();
        1;
        this.img = this.imageCache[barPath];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) return this.IMAGES[0];
        if (this.percentage > 80) return this.IMAGES[1];
        if (this.percentage > 60) return this.IMAGES[2];
        if (this.percentage > 20) return this.IMAGES[3];
        if (this.percentage > 0) return this.IMAGES[4];
        if (this.percentage == 0) return this.IMAGES[5];
    }
}
