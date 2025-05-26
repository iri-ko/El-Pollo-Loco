class ThrowableObject extends MovableObject {

    IMAGES_SPINNING = [
        "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
        
    ]


    constructor(){
        super()
        this.loadImage("assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png")
        this.x = 100;
        this.y = 100;
        //this.height = 50;
        //this.width = 50;
        //this.loadImages(this.IMAGES_SPINNING);
        //this.animate();
        //
        this.throw(100, 150);
    }

    throw(x, y){
        console.log("end position:" + "x: " + this.x + " y: " + this.y);
        
        this.x = x;
        this.y = y;
        this.speedY = 5;
        
        this.applyGravity();

        console.log("end position:" + "x: " + this.x + " y: " + this.y);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPINNING) 
        }, 60);

        this.moveRight()

    }
    
}