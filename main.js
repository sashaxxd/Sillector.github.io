// Менеджеры
var scene = j2Ds.getSceneManager();
var v2df = j2Ds.getMathManager().v2f;
var mgs = j2Ds.getGameStateManager();
var io = j2Ds.getIO();
var layers = j2Ds.getLayerManager();
var textureManager = j2Ds.getTextureManager();
var device = j2Ds.getDeviceManager();

//j2Ds.errorManager


// Расчет размеров
var canvid = 'game_window';
var my_width = 640;
var my_height = 350;
document.getElementById(canvid).width = my_width;
document.getElementById(canvid).height = my_height;
$('#'+canvid).css('width', $('#'+canvid).css('width'))
$('#'+canvid).css('height', $('#'+canvid).css('height'))

var coeff = parseInt($('#'+canvid).css('width'))/my_width;
$('#'+canvid).css('height', my_height*coeff+'px')
// Инициализация сцены
scene.initCanvas(canvid);

scene.canvas.addEventListener("fullscreenchange", my_fullscrin_off);
scene.canvas.addEventListener("mozfullscreenchange", my_fullscrin_off);
scene.canvas.addEventListener("webkitfullscreenchange", my_fullscrin_off);
scene.canvas.addEventListener("msfullscreenchange", my_fullscrin_off);

// Полноэкранный режим
var is_fullscrin_click = false;

var last_scrin= {
    my_width: parseInt($(scene.canvas).css('width')),
    my_height : parseInt($(scene.canvas).css('height'))
 };

var is_fullscrin = false;
var is_fullscrin_just = false;
function my_fullscrin_off () {
    if(is_fullscrin)
    if(is_fullscrin_just){
        is_fullscrin_just = false;
        return;
    } 
    var last_scrin_coeff = coeff;
    $(scene.canvas).css('width',last_scrin.my_width+'px');
    $(scene.canvas).css('height',last_scrin.my_height+'px');
    coeff = last_scrin.my_width/my_width;
    is_fullscrin = false;
}

function my_fullscrin(){
    if(is_fullscrin) return;

    var new_height, new_width, last_scrin_coeff = coeff;
        
    if(scene.canvas.requestFullscreen) {
        scene.canvas.requestFullscreen();
    } else if(scene.canvas.mozRequestFullScreen) {
        scene.canvas.mozRequestFullScreen();
    } else if(scene.canvas.webkitRequestFullscreen) {
        scene.canvas.webkitRequestFullscreen();
    } else if(scene.canvas.msRequestFullscreen) {
        scene.canvas.msRequestFullscreen();
    }

    alert(screen.Orientation)
    for (var i = screen.length - 1; i >= 0; i--) {
        alert(screen[i])
    };
    if(screen.Orientation) {
        alert(1);
        screen.LockOrientation('landscape-primary')
    } else if(screen.mozOrientation) {
        screen.mozLockOrientation('landscape-primary')
    } else if(screen.webkitOrientation) {
        screen.webkitLockOrientation('landscape-primary')
    } else if(screen.msOrientation) {
        screen.msLockOrientation('landscape-primary')
    }
    if(screen.mozOrientation){

    }

    if(my_height/my_width * screen.width<screen.height){
        new_width = screen.width;
        coeff = screen.width/my_width;
        new_height = my_height*coeff;
    }
    else{
        new_height = screen.height;
        coeff = screen.height/my_height;
        new_width = my_width*coeff;
    }
    $(scene.canvas).css('width',new_width+'px');
    $(scene.canvas).css('height',new_height+'px');
    is_fullscrin_just = true;
    is_fullscrin = true;
}


// изменения курсора
function my_set_cursor(_path){
    if($(scene.canvas).css('cursor') != 'url("'+_path+'"), auto')
        $(scene.canvas).css('cursor', 'url("'+_path+'"), auto');
}


// Инициализация задего фона
var bg_imageMap, bg_anim, bg;
var bg_snake_imageMap, bg_snake_anim, bg_snake;
var bg_rect_imageMap, bg_rect_anim, bg_rect;

bg_imageMap = textureManager.loadImageMap('background/background_main_color.png');
bg_snake_imageMap = textureManager.loadImageMap('background/background_snake.png');
bg_rect_imageMap = textureManager.loadImageMap('background/background_main_rotating_rectangles.png');

bg_anim = bg_imageMap.getAnimation(0, 0, my_width, my_height, 1);
bg_snake_anim = bg_snake_imageMap.getAnimation(0, 0, my_width, my_height, 1);
bg_rect_anim = bg_rect_imageMap.getAnimation(0, 0, 772, 680, 1);

bg = scene.addSpriteNode(v2df(0,0), v2df(my_width, my_height), bg_anim);
bg_snake = scene.addSpriteNode(v2df(0,0), v2df(my_width, my_height), bg_snake_anim);
bg_rect = scene.addSpriteNode(v2df(-66, -165), v2df(772, 680), bg_rect_anim);

// 1 сцена - Логотип
var load_logo_imageMap, load_logo_anim, load_logo;
var timer = 20;
mgs.add('load_logo', function() {

    scene.clear();

    bg_rect.setRotation(bg_rect.getRotation()+1)
    bg.draw();
    bg_rect.draw();
    bg_snake.draw();

    load_logo.draw();
    timer--;
    if(timer < 0){
        if(load_logo.getAlpha() > 0.5)
            load_logo.setAlpha(load_logo.getAlpha()-0.02);
        else
            j2Ds.scene.setGameState('main_menu');

    }
}, function() {
    load_logo_imageMap = textureManager.loadImageMap('background/load_logo.png');
    load_logo_anim = load_logo_imageMap.getAnimation(0, 0, 640, 350, 1);
    load_logo = scene.addSpriteNode(v2df(0,0), v2df(my_width, my_height), load_logo_anim);
});



// 2 сцена - Меню
var buttons_play_imageMap, buttons_play_anim, buttons_play;
var logo_snake_imageMap, logo_snake_anim, logo_snake;
var button_lines_imageMap, button_lines_anim, button_lines;
mgs.add('main_menu', function() { 

    scene.clear();

    bg_rect.setRotation(bg_rect.getRotation()+1)
    bg.draw();
    bg_rect.draw();
    bg_snake.draw();

    
    my_set_cursor('cursor.png');

    button_lines.draw();
    logo_snake.draw();

    if(io.onNode(buttons_play)){
        my_set_cursor('cursor1.png');
        buttons_play.drawFrame(2);
    }
    else       
        buttons_play.drawFrame(1);

    if(io.onNode(buttons_more)){
        my_set_cursor('cursor1.png');
        buttons_more.drawFrame(2);
    }
    else       
        buttons_more.drawFrame(1);
    if(io.onNode(buttons_score)){
        my_set_cursor('cursor1.png');
        buttons_score.drawFrame(2);
    }
    else       
        buttons_score.drawFrame(1);

    if (io.isMousePress('LEFT') && io.onNode(buttons_play)) {
        j2Ds.scene.setGameState('level_select');
    }

}, function() {

    buttons_play_imageMap = textureManager.loadImageMap('main_menu/main_menu_play_game.png');
    logo_snake_imageMap = textureManager.loadImageMap('main_menu/main_menu_logo.png');
    button_lines_imageMap = textureManager.loadImageMap('main_menu/main_manu_button_lines.png');

    buttons_play_anim = buttons_play_imageMap.getAnimation(0, 0, 184, 30, 2);
    logo_snake_anim = logo_snake_imageMap.getAnimation(0, 0, 184, 48, 1);
    button_lines_anim = button_lines_imageMap.getAnimation(0, 0, 184, 28, 1);
    buttons_more_anim = buttons_play_imageMap.getAnimation(0, 30, 81, 30, 2);
    buttons_score_anim = buttons_play_imageMap.getAnimation(0, 60, 81, 30, 2);

    buttons_play = scene.addSpriteNode(v2df(232,165), v2df(184, 30), buttons_play_anim);
    logo_snake = scene.addSpriteNode(v2df(232,117), v2df(184, 48), logo_snake_anim);
    button_lines = scene.addSpriteNode(v2df(232,195), v2df(184, 28), button_lines_anim);
    buttons_more = scene.addSpriteNode(v2df(335,205), v2df(81, 30), buttons_more_anim);
    buttons_score = scene.addSpriteNode(v2df(232,205), v2df(81, 30), buttons_score_anim);
});



// Ввбор уровня
var menu_stage = "animation_left";
mgs.add('level_select', function() {

    function move_obj1(_obj, _right){
        
        if(right == 0){
            _obj.setPosition(v2df(_obj.getPosition().x+1,_obj.getPosition().y));
        }
        else{           
            _obj.setPosition(v2df(_obj.getPosition().x-1,_obj.getPosition().y));
        }
        return 1;
    }
    scene.clear();

    bg_rect.setRotation(bg_rect.getRotation()+1)
    bg.draw();
    bg_rect.draw();
    bg_snake.draw();


    my_set_cursor('cursor.png');

    button_lines.draw();
    logo_snake.draw();

    if(io.onNode(buttons_play)){
        my_set_cursor('cursor1.png');
        buttons_play.drawFrame(2);
    }
    else       
        buttons_play.drawFrame(1);

    if(io.onNode(buttons_more)){
        my_set_cursor('cursor1.png');
        buttons_more.drawFrame(2);
    }
    else       
        buttons_more.drawFrame(1);
    if(io.onNode(buttons_score)){
        my_set_cursor('cursor1.png');
        buttons_score.drawFrame(2);
    }
    else       
        buttons_score.drawFrame(1);

    if(menu_stage == 'animation_left'){
        if(buttons_play.getPosition1().x > 40){
            var speed = 6;
            buttons_play.setPosition(v2df(buttons_play.getPosition().x-speed,buttons_play.getPosition().y));
            logo_snake.setPosition(v2df(logo_snake.getPosition().x-speed,logo_snake.getPosition().y));
            button_lines.setPosition(v2df(button_lines.getPosition().x-speed,button_lines.getPosition().y));
            buttons_more.setPosition(v2df(buttons_more.getPosition().x-speed,buttons_more.getPosition().y));
            buttons_score.setPosition(v2df(buttons_score.getPosition().x-speed,buttons_score.getPosition().y));
        }else{
            menu_stage = 'level_select';
        }
    }

}, function() {

    buttons_play_imageMap = textureManager.loadImageMap('main_menu/main_menu_play_game.png');
    logo_snake_imageMap = textureManager.loadImageMap('main_menu/main_menu_logo.png');
    button_lines_imageMap = textureManager.loadImageMap('main_menu/main_manu_button_lines.png');

    buttons_play_anim = buttons_play_imageMap.getAnimation(0, 0, 184, 30, 2);
    logo_snake_anim = logo_snake_imageMap.getAnimation(0, 0, 184, 48, 1);
    button_lines_anim = button_lines_imageMap.getAnimation(0, 0, 184, 28, 1);
    buttons_more_anim = buttons_play_imageMap.getAnimation(0, 30, 81, 30, 2);
    buttons_score_anim = buttons_play_imageMap.getAnimation(0, 60, 81, 30, 2);

    buttons_play = scene.addSpriteNode(v2df(232,165), v2df(184, 30), buttons_play_anim);
    logo_snake = scene.addSpriteNode(v2df(232,117), v2df(184, 48), logo_snake_anim);
    button_lines = scene.addSpriteNode(v2df(232,195), v2df(184, 28), button_lines_anim);
    buttons_more = scene.addSpriteNode(v2df(335,205), v2df(81, 30), buttons_more_anim);
    buttons_score = scene.addSpriteNode(v2df(232,205), v2df(81, 30), buttons_score_anim);
});



//Запуск сцены
$(document).ready(function(){
    j2Ds.scene.start('load_logo', 25); 
    $('#full_scrin_button').click(function() {
        my_fullscrin();
    });
});