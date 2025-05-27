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

    IMAGES_BOSS_HURT = [
        "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_BOSS_DEAD = [
        "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    IMAGES_BOSS_WALKING = [
        "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
        "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
        "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
        "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_BOSS_ATTACKING = [
        "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    energy = 100;

    constructor() {
        super();
        this.world = this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.loadImages(this.IMAGES_BOSS_ATTACKING);
        this.loadImages(this.IMAGES_BOSS_WALKING);

        this.x = 2100;
        this.y = 60;
        this.height = 400;
        this.width = 500;
        this.speed = 25;
        this.offset = { top: 80, bottom: 30, left: 50, right: 50 };

        this.animate(this.speed);
    }

    animate() {
        setInterval(() => {
            let distance = Math.abs(this.world.character.x - this.x);

            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_BOSS_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_BOSS_HURT);
            } else if (distance <= 150) {
                
                this.playAnimation(this.IMAGES_BOSS_ATTACKING);
                
            } else if (distance <= 700) {
                this.playAnimation(this.IMAGES_BOSS_WALKING);
                this.x -= this.speed;
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 100);
    }
}
