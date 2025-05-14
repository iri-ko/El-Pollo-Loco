class Chicken extends MovableObject{

    IMAGES_WALKING = [
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
    

    constructor(){
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); //super übergeordnete FUnkiton -> MovalbeObject
    this.loadImages(this.IMAGES_WALKING);

        this.x = 250 + Math.random() * 300;
        this.y = 360;
        this.height = 80;
        this.width = 70;
        this.speed = 0.35 + Math.random() * 0.25;
        
        this.animate(this.speed);

    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; //sobald durch Array durchrotiert ist, springt currentImage zurück auf 0
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 80);
        this.moveLeft();
    }



    
}