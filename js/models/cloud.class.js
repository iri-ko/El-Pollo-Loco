class Cloud extends MovableObject{
    height = 180;
    speed = 0.15;
    
        constructor(){
        super();
        this.loadImage('../assets/img/5_background/layers/4_clouds/w1.png'); //super übergeordnete FUnkiton -> MovalbeObject

        this.y = 20;
        this.width = 500;

        this.x = Math.random() * 500;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }
}