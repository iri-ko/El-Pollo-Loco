class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d'); 
        setTimeout(() => this.draw(), 100);
        this.canvas = canvas;
    }
    

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height); 
        //zugriff auf Bild und Koordinaten vom Charakter)

        this.enemies.forEach(enemy => {
        this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height); 
        });

        let self = this;

        //draw() wird immer wieder ausgeführt
        requestAnimationFrame(function() {
            self.draw(); //this geht hier nicht mehr -> deswegen oben self als this definiert und hier unten statt this verwendet
        });
    };
}
