class Player {
    constructor (position) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.height = 100;
        this.width = 50;
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y < canvas.height){
            this.velocity.y += gravity;
        }
        else {
            this.velocity.y = 0;
        }
        
    }
}