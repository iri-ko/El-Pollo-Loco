class MovableObject {
    x = 70; //PLatzierung von CHarakter und Enemies
    y = 150;
    height = 250;
    width = 100;
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