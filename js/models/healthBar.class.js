class HealthBar extends StatusBar {
    constructor() {
        super([
            "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
            "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
            "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
            "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
            "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
            "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
        ]); 

        this.setPercentage(100);
    }
}
