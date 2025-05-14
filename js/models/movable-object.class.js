class MovableObject {
    x = 20; //PLatzierung von CHarakter und Enemies
    y = 40;
    height = 70;
    width = 70;
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