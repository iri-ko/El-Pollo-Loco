class MovableObject {
    x = 70; //PLatzierung von CHarakter und Enemies
    y = 200;
    height = 250;
    width = 150;
    img;

    loadImage(path){
        this.img = new Image(); //vorgefertigt
        this.img.src = path; 
    }

    moveRight(){
    console.log('move right');
    }

    moveLeft(){
        
    }
}