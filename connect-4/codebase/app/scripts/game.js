var config = {
    'resolution': {
        'width': 640,
        'height': 480
    }, 
    'backgroundColor': 0xEEEEEE
};

window.addEventListener('load', function (event) {
    var render = setup(config);
    render();
}, false);

!function($w) {
    
    var config;
    var renderer;
    var rootStage;
    var caption;
    
    function setup(_config) {
        config = _config;
        renderer = new PIXI.WebGLRenderer(config.resolution.width, config.resolution.height);
        renderer.backgroundColor = config.backgroundColor;
        
        $w.document.body.appendChild(renderer.view);
        
        rootStage = new PIXI.Container();
        
        build();
        
        return render;
    }
    
    function build() {
        caption = new PIXI.Text("Test", {
            'font': '20px Helvetica',
            'fill': 0x009900
        });
        caption.position.set((config.resolution.width - caption._width) / 2, 0);
        
        rootStage.addChild(caption);
    };
    
    function recolor() {
        var style = caption.style;
        style.fill = Math.floor(0xFFFFFF * Math.random());
        
        caption.style = style;
        caption.position.y += 1;
    };
    
    function render() {
        recolor();
        renderer.render(rootStage);
        requestAnimationFrame(render);
    }
    
    $w.setup = setup;
}(this);