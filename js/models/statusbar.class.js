class StatusBar extends DrawableObject {
    percentage = 100;
    IMAGES = []; // placeholder for dynamic storage

    constructor(images) {
        super();
        this.IMAGES = images; // 
        this.x = 20;
        this.y = -10;
        this.height = 60;
        this.width = 200;

        this.loadImages(this.IMAGES);
        this.setPercentage(100); 
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let barPath = this.resolveImageIndex(); 1
        this.img = this.imageCache[barPath]; 
    }

    resolveImageIndex() {
        if (this.percentage == 100) return this.IMAGES[0];
        if (this.percentage > 60) return this.IMAGES[1];
        if (this.percentage > 40) return this.IMAGES[2];
        if (this.percentage > 20) return this.IMAGES[3];
        if (this.percentage > 0) return this.IMAGES[4];
        return this.IMAGES[5];
    }
}
