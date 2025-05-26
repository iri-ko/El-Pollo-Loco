class Endboss extends MovableObject {
    
    IMAGES_ALERT = [
        "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
    

    constructor(){
        super();
        this.loadImages(this.IMAGES_ALERT);

        this.x = 2100; 
        this.y = 60;
        this.height = 400;
        this.width = 500;
        this.speed = 1 + Math.random() * 0.25;
        this.offset = { top: 80, bottom: 30, left: 50, right: 50 };
        
        this.animate(this.speed);

    }

    animate() {
    setInterval(() => {
        this.playAnimation(this.IMAGES_ALERT); // Pass the correct array
    }, 100);
}


}