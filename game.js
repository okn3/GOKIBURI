enchant();

//　leapmotionの設定



var fingerPosX = 0;
var fingerPosY = 0;

//leap motion setup
var controller = new Leap.Controller({enableGestures: true});

//leap motion loop
controller.loop(function(frame) {
//	console.log("leap:"+frame.fingers.length);
	if(frame.fingers.length > 0)
	{
		console.log("pos:"+frame.pointables[0].tipPosition[0]);
		fingerPosX = frame.fingers[0].tipPosition[0] + 150;
	}
});

window.onload = function() {

//ゲーム基本設定 2:3 
var gameWidth = 320;
var gameHight = 480;
var game = new Game(gameWidth,gameHight);


game.fps = 24;

//画像読み込み
game.preload('yuka1.jpg');
game.preload('yuka2.jpg');
game.preload('yuka3.jpg');
game.preload('goki1.png');
game.preload('goki2.png');
game.preload('dead.png');
game.preload('jetl.png');
game.preload('jetr.png');
game.preload('hoihoi.png');
game.preload('kumo.png');
game.preload('neko.png');
game.preload('kemuri.png');
game.preload('hb.png');
game.preload('yaji_l.png');
game.preload('yaji_r.png');
game.preload('bgm.mp3');
game.preload('end.mp3');
game.preload('spray.mp3');
game.preload('kasakasa.mp3');
game.preload('neko.mp3');
game.preload('gucha.wav');
game.preload('gabu.mp3');
game.preload('gep.mp3');




game.onload = function() {

	var scene = game.rootScene;
	scene.backgroundColor = "black";


// var scene = new Scene();
// scene.addChild(player);
// game.pushScene(scene);

//プレイヤー設定
var player = new Sprite(27,45);
player.frame = 0;
player.image = game.assets['goki1.png'];
player.x = gameWidth / 2;
player.y = 150;
// player.y = gameHight / 2;
player.rotate(180);

//当たり判定
var hit = new Sprite(5,10);
hit.frame = 0;
hit.x = gameWidth / 2;
hit.y = 160;
// hit.y = gameHight / 2;
hit.rotate(180);

//背景設定
var yuka = new Sprite(320,960);
yuka.image = game.assets['yuka1.jpg'];
yuka.y = -yuka.height + game.height;

//煙の設定
var jetframe = new Sprite(90,40);
jetframe.image = game.assets['kemuri.png'];
jetframe.x = 200;
jetframe.y = 380;

//ガイド
var guide_l = new Sprite(60,30);
guide_l.image = game.assets['yaji_l.png'];
guide_l.x = 80;
guide_l.y = 430;

var guide_r = new Sprite(60,30);
guide_r.image = game.assets['yaji_r.png'];
guide_r.x = 180;
guide_r.y = 430;

/* */

//障害物設定
var jet = new Sprite(40,110);
jet.image = game.assets['jetr.png'];

var hoihoi = new Sprite(155,53);
hoihoi.image = game.assets['hoihoi.png'];

var kumo = new Sprite(50,50);
kumo.image = game.assets['kumo.png'];

var neko = new Sprite(70,70);
neko.image = game.assets['neko.png'];

var hb = new Sprite(50,35);
hb.image = game.assets['hb.png'];

//その他データ
var score = 0;
var score_time = 0;
var score_item = 0;
var msg = "おめでとう" + score + "ポイント獲得";
var timeLeft = 20 * game.fps;
var sideSpeed;
var downSpeed;
var rand=Math.floor( Math.random() * 4);
var rand2=Math.floor(Math.random() * 4);
var rand3=Math.floor(Math.random() * 5);
//var rand4=Math.floor(Math.random() * 360);

//時間ラベル
var timeLabel = new Label('Score: 0');

timeLabel.x = 10;
timeLabel.y = 5;



//タッチ場所取得
var touchPosX = new Label();
touchPosX.x = 5;
touchPosX.y = 20;
touchPosX.text = 'TouchX: 0';
var touchX;

//スコアラベル
var scoreLabel = new Label('Score: 0');
scoreLabel.x = 10;
scoreLabel.y =30;



/*デバッグよう記述
//スコアラベル
var scoreLabel = new Label('Score: 0');
scoreLabel.x = 200;
scoreLabel.y = 5;

//Rotateラベル
var rotateLabel = new Label('Rotate: 0');
rotateLabel.x = 200;
rotateLabel.y = 20;

//Speedラベル
var speedLabel = new Label('Speed: 0');
speedLabel.x = 200;
speedLabel.y = 35;

//Frameラベル
var frameLabel = new Label('Frame: 0');
frameLabel.x = 200;
frameLabel.y = 50;
*/

//障害物出現
jet.x = gameWidth -30;
jet.y = 400;

hoihoi.x = -70;
hoihoi.y = 100;

kumo.x = gameWidth -50;
kumo.y = 50;

neko.x = gameWidth -50;
neko.y = -80;

hb.x = 160;
hb.y = -50;

//ゲーム(EnterFrame)
this.addEventListener("enterframe", function() {
//プレイヤーX軸移動
player.x -= sideSpeed / 10;
hit.x -= sideSpeed / 10;
player.x -= fingerPosX;
hit.x -= fingerPosX;

//画面端に移動不可
if(player.x <= 0){
player.x = 0;
}else if(player.x >= 290){
player.x = 290;
}

if(hit.x <= 0){
hit.x = 0;
}else if(hit.x >= 290){
hit.x = 290;
}


//y軸方向移動
// player.y -= sideSpeed / 10;
// hit.y -= sideSpeed / 10;
player.y -= fingerPosY;
hit.y -= fingerPosY;

//画面端に移動不可
if(player.y <= 0){
player.y = 0;
}else if(player.y >= 450){
player.y = 450;
}

if(hit.y <= 0){
hit.y = 0;
}else if(hit.y >= 450){
hit.y = 450;
}

// player.onenterframe = function(){

//     if(game.input.right) {player.x += 15;
//     }
//     if(game.input.left) {player.x -= 15;
//     }
// player.x -= sideSpeed / 10;

// };


//死亡アクション

if ((hit.intersect(jetframe)) ){
yuka.y = 0;
player.image = game.assets['dead.png'];
game.assets['spray.mp3'].play();
game.assets['bgm.mp3'].stop();
game.stop();
game.end(score, msg);
}

if ((hit.intersect(hoihoi))){
yuka.y = 0;
player.image = game.assets['dead.png'];
game.assets['gucha.wav'].play();
game.assets['bgm.mp3'].stop();
game.stop();
game.end(score, msg);
}

if ((hit.intersect(kumo))){
yuka.y = 0;
player.image = game.assets['dead.png'];
game.assets['gabu.mp3'].play();
game.assets['bgm.mp3'].stop();
game.stop();
game.end(score, msg);
}


if ((hit.intersect(jet))){
yuka.y = 0;
player.image = game.assets['dead.png'];
game.assets['end.mp3'].play();
game.assets['bgm.mp3'].stop();
game.stop();
game.end(score, msg);
}

if ((hit.intersect(neko))){
yuka.y = 0;
player.image = game.assets['dead.png'];
game.assets['neko.mp3'].play();
game.assets['bgm.mp3'].stop();
game.stop();
game.end(score, msg);
}

		

//アイテム取得
if ((hit.intersect(hb))){
score_item +=1;
game.assets['gep.mp3'].play();
hb.x = 500;
}

//スコア表示
score_time = Math.floor(game.frame/24);
score = score_time + score_item * 10;

timeLabel.font  = "15px 'Consolas', 'Monaco', 'ＭＳ ゴシック'"
timeLabel.text = '現在のポイント: ' + score + "点";

scoreLabel.font  = "15px 'Consolas', 'Monaco', 'ＭＳ ゴシック'"
scoreLabel.text = 'ハンバーガー: ' + score_item+ "個";

//frameLabel.text = 'Frame: ' + game.frame;

// フレームイベントが発生したらマップをスクロール
yuka.addEventListener(Event.ENTER_FRAME, function(){
yuka.y = yuka.y + 1 ; // ↓に移動

// マップがスクロールし終わったら再度上に戻す
if (yuka.y > -1 ){ 
yuka.y = -yuka.height + game.height;
}
});

//煙
var i = game.frame;

if (i % 6 == 0)
jetframe.frame = 0;

else if (i % 6 == 1)
jetframe.frame = 1;

else if (i % 6 == 2)
jetframe.frame = 2;

else if (i % 6 == 3)
jetframe.frame = 3;

else if (i % 6 == 4)
jetframe.frame = 4;

else if (i % 6 == 5)
jetframe.frame = 5;

jetframe.y = jetframe.y - (3 + rand); // 下に移動
jet.y = jet.y - (3 + rand); // 下に移動
hoihoi.y = hoihoi.y - (3 + rand2); // 下に移動
kumo.y = kumo.y - (7 + rand3);
kumo.x = kumo.x + (4 + rand3);
neko.y = neko.y - (8 + rand2);
hb.y = hb.y - (3 + rand2);
//neko.x = neko.x - (10 + rand2);
//neko.x = rand4;

if(jet.y < -30){
jet.y = 380;
}
if(hoihoi.y < -30){
hoihoi.y = 360;
rand2 = Math.floor( Math.random() * 4 );
}
if(kumo.y < -100){
kumo.y = 360;
kumo.x = 0;
rand3 = Math.floor( Math.random() * 5 );
}
if(neko.y < -200){
neko.y = 480;
neko.x = Math.floor( Math.random() * 300 );
rand2 = Math.floor( Math.random() * 5 );
}
if(jetframe.y < -30)
jetframe.y = 380;


//
if(hb.y < -200){
hb.y = 480;
hb.x = Math.floor( Math.random() * 300 );
}

//這いよるゴキブリ
game.assets['bgm.mp3'].play();

});

//ゲーム(TouchStart)
this.rootScene.addEventListener('touchstart',function(e){
//touchPosX.text = 'TouchX:' + Math.round(e.localX);
touchX = e.localX;
game.assets['kasakasa.mp3'].play();

if(touchX < gameWidth/2){
if(player.rotation < 255)
player.rotate(25);
}else{
if(player.rotation > 105)
player.rotate(-25)
}
});

//キーボード入力
player.onenterframe = function(){

if(game.input.left){
	game.assets['kasakasa.mp3'].play();
	if(player.rotation < 255)
	player.rotate(25);
	}
if(game.input.right){
	game.assets['kasakasa.mp3'].play();
	if(player.rotation > 105)
	player.rotate(-25);
	}
if(game.input.up){ //書き足した
	game.assets['kasakasa.mp3'].play();
	// if(player.rotation > 105)
	// player.rotate(0);
	player.y -= 25;
	hit.y -= 25;
	}
if(game.input.down){
	game.assets['kasakasa.mp3'].play();
	// if(player.rotation > 105)
	// player.rotate(0);
	player.y += 25;
	hit.y += 25;
	}
};


//プレイヤー(EnterFrame)
player.addEventListener("enterframe",function() {

if(game.frame %2 == 0){
player.image = game.assets['goki1.png'];
}else{
player.image = game.assets['goki2.png'];
}
sideSpeed = player.rotation -180;
//rotateLabel.text = "Rotate: " + sideSpeed;

downSpeed = 90 - Math.abs(sideSpeed);
//speedLabel.text = "Speed: " + downSpeed;
});

game.rootScene.addChild(yuka);
game.rootScene.addChild(player);
// game.rootScene.addChild(scoreLabel);
game.rootScene.addChild(timeLabel);
game.rootScene.addChild(guide_r);
game.rootScene.addChild(guide_l);
game.rootScene.addChild(jet);
game.rootScene.addChild(hoihoi);
game.rootScene.addChild(kumo);
game.rootScene.addChild(neko);
game.rootScene.addChild(hb);
game.rootScene.addChild(jetframe);

};

game.start();
};