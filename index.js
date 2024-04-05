const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 2,
}

const floorCollisions2D = [

];
for(let i = 0; i < floorCollisions.length; i += 30){
    floorCollisions2D.push(floorCollisions.slice(i, i + 30));
}

// Collision Block Mapping
const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) =>{
        if(symbol != 0){
            collisionBlocks.push(new CollisionBlock({
                position:{
                    x: x * 32,
                    y: y * 32,
                }
            }));
        }
    });
});

const gravity = 0.5;

const player = new Player({x:0, y:0});
const player2 = new Player({x:300, y:100});

let y = 100;

const keys = {
    d:{
        pressed: false,
    },
    a:{
        pressed: false,
    }
}

const background = new Sprite({
    position:{
        x: 0,
        y: 0,
    },
    imageSrc: './img/verticalPlatformerMap.png',
});

// Animation
function animate() {
    window.requestAnimationFrame(animate);
    // Canvas
    c.fillStyle = '#FFFFFF';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Background Update
    c.save()
    c.scale(2, 2);
    c.translate(0, -background.image.height + scaledCanvas.height);
    background.update();
    collisionBlocks.forEach(CollisionBlock => {
        CollisionBlock.update();
    });

    c.restore();

    // Player Update
    player.update();
    player2.update();

    player.velocity.x = 0;
    if(keys.d.pressed) {player.velocity.x = 4}
    else if (keys.a.pressed) {player.velocity.x = -4}
}

animate();

// Player Controller
window.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case ' ':
            player.velocity.y = -15;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
});