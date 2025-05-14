class Character extends MovableObject {
    IMAGES_WALKING = [
        "assets/img/2_character_pepe/2_walk/W-21.png",
        "assets/img/2_character_pepe/2_walk/W-22.png",
        "assets/img/2_character_pepe/2_walk/W-23.png",
        "assets/img/2_character_pepe/2_walk/W-24.png",
        "assets/img/2_character_pepe/2_walk/W-25.png",
        "assets/img/2_character_pepe/2_walk/W-26.png",
    ];
    world;

    //for creating new Image
    constructor() {
        super();
        this.loadImage("assets/img/2_character_pepe/2_walk/W-21.png"); //super übergeordnete FUnkiton -> MovalbeObject
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {
        setInterval(() => {

            if (this.world.keyboard.RIGHT){
             let i = this.currentImage % this.IMAGES_WALKING.length; //sobald durch Array durchrotiert ist, springt currentImage zurück auf 0
            let path = this.IMAGES_WALKING[i]; //nimmt jeweils das, was
            this.img = this.imageCache[path];
            this.currentImage++;   
            }
            
        }, 100);
    }

    jump() {}
}
