window.addEventListener('load', function (event) {
    
    var renderer, stage, sprite, direction;
    
    PIXI.loader.add({
        name: "sharingan"
        , url: "images/sharingan.jpeg"
        , onComplete: function () {
            console.log("cat on complete callback")
        }
        , crossOrigin: true
    }).add("treasure", "images/treasure.png").on("progress", loadProgressHandler).load(setup);

    function loadProgressHandler(loader, resource) {
        console.log("loading ", resource.url, " = ", loader.progress, "%");
    }

    function setup() {
        //This code will run when the loader has finished loading the image
        
        //Create the renderer
        renderer = PIXI.autoDetectRenderer(256, 256);
        renderer.view.style.border = "1px solid black";
        renderer.backgroundColor = 0x061639;
        renderer.autoResize = true;
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";
        renderer.autoResize = true;
        renderer.resize(window.innerWidth - 20, window.innerHeight - 20);
        
        //Add the canvas to the HTML document
        document.body.appendChild(renderer.view);
        
        //Create a container object called the `stage`
        stage = new PIXI.Container();
        
        var text = new PIXI.Text("Finally get the hang of this!", {
            fill: 0xEEEEEE
        });
        stage.addChild(text);
        
        sprite = new PIXI.Sprite(PIXI.loader.resources.sharingan.texture);
        sprite.position.set(128, 128);
        sprite.borderRadius = 4;
//        sprite.width = 80;
//        sprite.height = 120;
//        sprite.scale.set(2, 2);
        sprite.anchor.set(0.5, 0.5);
        
        stage.addChild(sprite);
        
        loop();
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
}, false);