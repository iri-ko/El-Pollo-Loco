class Cloud extends MovableObject{
    height = 180;
    
        constructor(){
        super();
        this.loadImage('../assets/img/5_background/layers/4_clouds/1.png'); //super übergeordnete FUnkiton -> MovalbeObject

        this.y = 20;
        this.width = 500;

        this.x = Math.random() * 500;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= 0.15 // X gets reduced by 5 according to set time
        }, 1000 / 60) //set time
    }



}