class BossBar extends StatusBar {
    constructor() {
        super([
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
            "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
        ]);
        this.x = 200;
        this.y = 360;
        this.width = 400;
        this.height = 100;

        this.setPercentage(0);
    }
}
