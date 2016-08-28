var renderer, stage, sprite, direction;
var ballArray = [];

window.addEventListener('load', function (event) {
    
    PIXI.loader.add({
        name: "sharingan"
        , url: "images/sharingan.jpeg"
        , onComplete: function () {
            console.log("cat on complete callback")
        }
        , crossOrigin: true
    }).add("treasure", "images/treasure.png").on("progress", loadProgressHandler).load(setup);

    
}, false);

function loadProgressHandler(loader, resource) {
    console.log("loading ", resource.url, " = ", loader.progress, "%");
}

function setup() {
    //This code will run when the loader has finished loading the image

    //Create the renderer
    renderer = PIXI.autoDetectRenderer(256, 256);
    renderer.view.style.border = "1px solid black";
    renderer.backgroundColor = 0xBABF42;
    renderer.autoResize = true;
    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth - 20, window.innerHeight - 20);

    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    //Create a container object called the `stage`
    stage = new PIXI.Container();

    build();

    loop();
}

function build() {

    var text = new PIXI.Text("Connect 4 Game", {
        fill: 0xEEEEEE
    });

    text.position.set((window.innerWidth - text.width)/2, 100);

    stage.addChild(text);

    sprite = new PIXI.Sprite(PIXI.loader.resources.sharingan.texture);
    sprite.position.set(128, 128);
    sprite.borderRadius = 4;
//        sprite.width = 80;
//        sprite.height = 120;
//        sprite.scale.set(2, 2);
    sprite.anchor.set(0.5, 0.5);

//        stage.addChild(sprite);

    generateGrid(4, 4);

    generateBall();

}

function generateGrid(columns, rows) {

    var width = 75;
    var height = 75;
    var initialPointX = 100;
    var initialPointY = 100;

    for(var j = 0; j < rows; j++) {

        for(var i = 0; i < columns; i++) {

            var graphics = new PIXI.Graphics();

            graphics.beginFill();

            // set the line style to have a width of 5 and set the color to red
            graphics.lineStyle(5, 0xFF0000);
            
            // draw a rectangle
            graphics.drawRect(initialPointX, initialPointY, width, height);

            graphics.endFill();

            initialPointX += width;
            
            graphics.interactive = true;
            
            graphics.mouseover = function(event) {
                positionBall(event.data.global);
            };
            
            graphics.mouseup = function(event) {
                dropBall(event.data.global);
            };
 
            stage.addChild(graphics);    
        }

        initialPointX = 100;
        initialPointY += height;
        
    }

}

function generateBall() {

    var sprite = new PIXI.Graphics();

    sprite.beginFill();

    sprite.fillColor = 0xFE0000;

    sprite.drawCircle(137.5, 50, 37);

    sprite.endFill();

    ballArray.push(sprite);

    stage.addChild(sprite);
}

function positionBall(position) {
    
    var x = position.x;
    var y = position.y;
    
    requestAnimationFrame(positionBall);

    var ball = ballArray[0];

    if(x < 175 && x > 100) {
        ball.x = 0;
    } else if(x < 250 && x > 175) {
        ball.x = 75;
    } else if(x < 325 && x > 250) {
        ball.x = 150;
    } else if(x < 400 && x > 325) {
        ball.x = 225;
    }

    renderer.render(stage);
}

function dropBall(position) {
    
    var x = position.x;
    var y = position.y;

    requestAnimationFrame(dropBall);

    var ball = ballArray[0];

    if(ball.y <= 310) {
        ball.y += 2;
    }

    renderer.render(stage);
}

function loop() {

    requestAnimationFrame(loop);

    if (!direction) {
        direction = 7;
    }
    else if (sprite.y >= window.innerHeight) {
        direction = -7;
    }
    else if (sprite.y <= 0) {
        direction = 7;
    }

    sprite.y += direction;

    //Tell the `renderer` to `render` the `stage`
    renderer.render(stage);
}