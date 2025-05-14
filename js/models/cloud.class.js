class Cloud extends MovableObject{
    height = 180;
    
        constructor(){
        super();
        this.loadImage('../assets/img/5_background/layers/4_clouds/1.png'); //super übergeordnete FUnkiton -> MovalbeObject

        this.x = 50 + Math.random() * 60;
        this.y = 20;
        this.width = 500;

    }

}