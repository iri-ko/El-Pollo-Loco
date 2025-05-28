class CoinBar extends StatusBar {
    constructor() {
        super([
            "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
            "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
            "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
            "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
            "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
            "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        ]);
        this.x = 20;
        this.y = 100;

        this.setPercentage(0);
    }
}
