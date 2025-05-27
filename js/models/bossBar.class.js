class BossBar extends StatusBar {
    constructor() {
        super([
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
        ]);
        this.x = 400;
        this.y = 420;
        this.width = 300;
        this.height = 60;

    }
    setPercentage(percentage) {
        if (isNaN(percentage) || percentage === undefined) {
            console.error(
                "BossBar received an invalid percentage:",
                percentage
            );
            percentage = 100;
        }

        let imageIndex = Math.floor(
            (percentage / 100) * (this.IMAGES.length - 1)
        );
        imageIndex = Math.max(0, Math.min(imageIndex, this.IMAGES.length - 1));

        this.currentImage = this.IMAGES[imageIndex];

        if (this.currentImage) {
            this.img = new Image();
            this.img.src = this.currentImage;
        } else {
            console.error(
                "BossBar image not found for valid percentage:",
                percentage,
                "| Computed index:",
                imageIndex
            );
        }
    }
}
