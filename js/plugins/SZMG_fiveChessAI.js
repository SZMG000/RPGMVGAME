// 五子棋核心js脚本 作者：素质猛哥/SZMG
var BOARD_SIZE =13;
var WIN_COUNT = 5;
var CONS_WIN = 0;
var CHESS_a = 1;
var PLAYER_THREE = 0;
var AI_MARK = 0;
var AI_THREE = 0;
var COMFIRM_X = -1;
var COMFIRM_Y = -1;
var TOUCHX = -1;
var TOUCHY = -1;
//var W = 0;

function default_CHESS_a(){
	CHESS_a = $gameVariables.value(174);
}

function SZMG_checkWin(x,y) {  //检测是否获胜

	var varid = 1 + x * BOARD_SIZE +(y + 1); // 2 + (x-1) * BOARD_SIZE + y
	var color = $gameVariables.value(varid);
	if(color === 0) return false;

	var dirs = [[1,0],[0,1],[1,1],[1,-1]]; //横 竖 斜
	for(var d =0;d < dirs.length;d++){
		var dx = dirs[d][0];
		var dy = dirs[d][1];
		var count = 1;

		for(var i = 1;i < WIN_COUNT;i++){
			var nx = x + dx * i;
			var ny = y + dy * i;
			if(nx < 0 || nx > BOARD_SIZE || ny < 0 || ny > BOARD_SIZE ) break; //超出棋盘范围
			var nColor = $gameVariables.value(1 + nx * BOARD_SIZE + (ny + 1));
			if(nColor === color) count++;
			else break; 
		}

		for(var i = 1;i < WIN_COUNT;i++){
			var nx = x - dx * i;
			var ny = y - dy * i;
			if(nx < 0 || nx > BOARD_SIZE || ny < 0 || ny > BOARD_SIZE ) break;
			var nColor = $gameVariables.value(1 + nx * BOARD_SIZE + (ny + 1));
			if(nColor === color) count++;
			else break; 
		}

		if(count >= WIN_COUNT) { //连续五颗获胜
			$gameVariables.setValue(171,color);
			return true;

		}
		

	}
	return false;


}

function SZMG_aiScore(x,y,color){ //ai策略
	var score = 0;
	var playerColor = 1;

	var dirs = [[1,0],[0,1],[1,1],[1,-1]];
	for (var d =0;d < dirs.length; d++){
		var dx = dirs[d][0];
		var dy = dirs[d][1];

		var aiCount = 0;
		var aiEmpty = 0;

		var playerCount = 0;
		var playerEmpty = 0;

		var thsEmpty = 0;

		for(var i = 1;i < WIN_COUNT;i++){ //检查ai和玩家的连子 超出棋盘break 中间有别的颜色棋子break
			let nx = x + dx * i;
			let ny = y + dy * i;
			if(nx < 0 || nx > BOARD_SIZE - 1|| ny < 0 || ny > BOARD_SIZE - 1) break; //>=
			let c = $gameVariables.value(1 + nx * BOARD_SIZE + (ny + 1));
			if(c === color) aiCount++;
			else if (c === 0){
				aiEmpty++;
				thsEmpty++;
			}
			else break; 
			if(thsEmpty >= 2) {
				thsEmpty = 0;
				break;
			}
		}

		for(var i = 1;i < WIN_COUNT;i++){
			let nx = x - dx * i;
			let ny = y - dy * i;
			if(nx < 0 || nx > BOARD_SIZE - 1|| ny < 0 || ny > BOARD_SIZE - 1) break;
			let c = $gameVariables.value(1 + nx * BOARD_SIZE + (ny + 1));
			if(c === color) aiCount++;
			else if (c === 0){
				aiEmpty++;
				thsEmpty++;
			}
			else break;
			 if(thsEmpty >= 2) {
				thsEmpty = 0;
				break;
			}
		}

		for(var i = 1;i < WIN_COUNT;i++){
			let nx = x + dx * i;
			let ny = y + dy * i;
			if(nx < 0 || nx > BOARD_SIZE - 1|| ny < 0 || ny > BOARD_SIZE - 1) break;
			let c = $gameVariables.value(1 + nx * BOARD_SIZE + (ny + 1));
			if(c === playerColor) playerCount++;
			else if (c === 0)playerEmpty++;
			else break; 
		}

		for(var i = 1;i < WIN_COUNT;i++){
			let nx = x - dx * i;
			let ny = y - dy * i;
			if(nx < 0 || nx > BOARD_SIZE - 1|| ny < 0 || ny > BOARD_SIZE - 1) break;
			let c = $gameVariables.value(1 + nx * BOARD_SIZE + (ny + 1));
			if(c === playerColor) playerCount++;
			else if (c === 0)playerEmpty++;
			else break; 
		}

		if(aiCount >= 4) score += 16000;
		if(playerCount >= 4) score += 9800;
		if(aiCount >= 3 && aiEmpty >= 1){ // ai3连子后优先将自己的子全连起来而不是选择中间留空
			score += 2500;
			var naiChess = 0;
			for(var px = -1; px <= 1;px++){
				for (var py = -1; py <= 1;py++) {
					if(px == 0 && py ==0) continue;
						if(x + px < 0 || x + px > BOARD_SIZE - 1|| y + py < 0 || y + py > BOARD_SIZE - 1) continue;
							if($gameVariables.value(1 + (x + px) * BOARD_SIZE + ((y + 1) + py)) == 2){
								naiChess++;
							}else continue;
						}

				}
				if(naiChess >= 2){
				score += 2500;
			}else if(naiChess == 1){
				score += 750;
			}else{

			}
		
		}
		if(playerCount >= 3 && playerEmpty >= 1) { //ai连子小于3时优先封堵玩家活三
			if(PLAYER_THREE == 1 && AI_THREE == 0){
				
				if(1 + x * BOARD_SIZE + (y + 1) == AI_MARK){
					score += 9800;
					console.log("ai必须围堵！围堵位置：" + x + "," + y + "," + AI_MARK);
				}else{
					score += 800;
				}
			}else{
				score += 800;
			}
		
		}
		if(aiCount >= 2 && aiEmpty >= 2) {
			score += 600;
			}
		if(playerCount >= 2 && playerEmpty >= 2) {
			score += 300;
		}
		if(aiCount >= 1) score += 10;
	}


	
	// ai优先紧邻玩家棋子落子
	if(CHESS_a > 1){
		var nplayerChess = 0;

		for(var px = -1; px <= 1;px++){
			for (var py = -1; py <= 1;py++) {
				if(px == 0 && py ==0) continue;
					if(x + px < 0 || x + px > BOARD_SIZE - 1|| y + py < 0 || y + py > BOARD_SIZE - 1) continue;
						if($gameVariables.value(1 + (x + px) * BOARD_SIZE + ((y + 1) + py)) == 1){
							nplayerChess++;
						}else continue;
					}

			}

		if(nplayerChess >= 3 && aiCount < 3){
				score += 2500;
		}else if(nplayerChess == 2 && aiCount < 3){
			score += 1600;
		}else if(nplayerChess == 1 && aiCount < 3){
			score += 800;
		}else{
			score += 0;
		}

	}
	

	// ai优先从棋盘中间开始落子   
	var centerX = Math.floor(BOARD_SIZE/2);
	var centerY = Math.floor(BOARD_SIZE/2);
	var dist = Math.abs(x - centerX) + Math.abs(y - centerY);
	score += (BOARD_SIZE - dist) * 10;
	return score;

}


function SZMG_PLAYER_HAS_THREE(x,y,acount,aiEmpty){ //判断玩家和AI是否有活三
	var dirs = [[1,0],[0,1],[1,1],[1,-1]];
	var count = 0;
	if($gameVariables.value(AI_MARK) != 0){
		PLAYER_THREE = 0;
	}

	if(AI_THREE == 0){
		for(var d =0;d < dirs.length;d++){
			var adx = dirs[d][0];
			var ady = dirs[d][1];
			for(var i = 1;i <= WIN_COUNT;i++){
				var anx = x + adx * i;
				var any = y + ady * i;
				if(anx < 0 || anx > BOARD_SIZE || any < 0 || any > BOARD_SIZE ) {
					acount = 0;
					break;
				} //超出棋盘范围
				var nColor = $gameVariables.value(1 + anx * BOARD_SIZE + (any + 1));
				if(nColor == 2) {
					acount++;
				}
				else if(nColor == 0){
					aiEmpty++;
					break;
				} else break;
			}

			for(var i = 1;i <= WIN_COUNT;i++){
				var anx = x - adx * i;
				var any = y - ady * i;
				if(anx < 0 || anx > BOARD_SIZE || any < 0 || any > BOARD_SIZE ) {
					acount = 0;
					break;
				} //超出棋盘范围
				var nColor = $gameVariables.value(1 + anx * BOARD_SIZE + (any + 1));
				if(nColor == 2) {
					acount++;
				}
				else if(nColor == 0){
					aiEmpty++;
					break;
				}else break;
			}
			if(acount >= 3 && acount + aiEmpty >= 4){
				AI_THREE = 1;
				break;
			}else{
			}
			AI_THREE = 0;
			acount = 0;
			aiEmpty = 0;
		}
	}

	if(PLAYER_THREE == 0){
		for(var d =0;d < dirs.length;d++){
		var dx = dirs[d][0];
		var dy = dirs[d][1];
			for(var i = 1;i <= WIN_COUNT;i++){
				var nx = x + dx * i;
				var ny = y + dy * i;
				if(nx < 0 || nx > BOARD_SIZE || ny < 0 || ny > BOARD_SIZE ) {
					count = 0;
					break;
				} //超出棋盘范围
				var nColor = $gameVariables.value(1 + nx * BOARD_SIZE + (ny + 1));
				if(nColor == 1) {
					count++;
				}
				else if(nColor == 2){
					count = 0;
					break;
				} else break;
			}

			for(var i = 1;i <= WIN_COUNT;i++){
				var nx = x - dx * i;
				var ny = y - dy * i;
				if(nx < 0 || nx > BOARD_SIZE || ny < 0 || ny > BOARD_SIZE ) {
					count = 0;
					break;
				} //超出棋盘范围
				var nColor = $gameVariables.value(1 + nx * BOARD_SIZE + (ny + 1));
				if(nColor == 1) {
					count++;
				}
				else if(nColor == 2){
					count = 0;
					break;
				} else break;
			}
			if(count >= 3){
				PLAYER_THREE = 1;
				AI_MARK = 1 + x * BOARD_SIZE + (y + 1);
				break;
			}else{
			}
			PLAYER_THREE = 0;
			count = 0;
		}
	}
}

function SZMG_aiChess(){ // ai落子
	$gameSwitches.setValue(442,true);
	AI_THREE = 0;
	var bestX = 0;
	var bestY = 0;
	var maxScore = 0;

	for(var x = 0;x < BOARD_SIZE;x++){
		for(var y = 0; y < BOARD_SIZE;y++){
			var varid = 1 + x * BOARD_SIZE + (y + 1);
			if($gameVariables.value(varid) !== 0) continue;

			if(AI_THREE == 1 && PLAYER_THREE == 1) break;

			SZMG_PLAYER_HAS_THREE(x,y,0,0);

		}
	}

	console.log("AI三连子：" + AI_THREE + "玩家活三：" + PLAYER_THREE );

	for(var x = 0;x < BOARD_SIZE;x++){
		for(var y = 0; y < BOARD_SIZE;y++){
			var varid = 1 + x * BOARD_SIZE + (y + 1);
			if($gameVariables.value(varid) !== 0) continue;

			var score = SZMG_aiScore(x,y,2);
			if(score > maxScore){
				maxScore = score;
				bestX = x;
				bestY = y;
			}
		}
	}

	var varid = 1 + bestX * BOARD_SIZE + (bestY + 1);
	$gameVariables.setValue(varid,2);


	var screenX = bestX  * 48 - 24;
    var screenY = bestY * 48 - 24;
    $gameScreen.showPicture(CHESS_a, "BChess", 0, 432 + screenX, 162 + screenY, 100, 100, 1000, 0); //ai棋子渲染
	CHESS_a++;
	AudioManager.playSe({name:'Cursor1',volume:100,pan:0,pitch:100});
	$gameVariables.setValue(174,CHESS_a);


	// 检查ai是否获胜
	if(SZMG_checkWin(bestX,bestY)){
		$gameSwitches.setValue(441,false);
		$gameSwitches.setValue(442,false);
		$gameSwitches.setValue(444,true);
		$gameMessage.add("你输了！");
		CONS_WIN = 0;
		PLAYER_THREE = 0;
		$gameVariables.setValue(175,0);
		return;
	}else{
			if(CHESS_a > 169){ //平局
				$gameSwitches.setValue(441,false);
				$gameSwitches.setValue(442,false);
				$gameSwitches.setValue(444,true);
				PLAYER_THREE = 0;
				$gameMessage.add("平局 棋局结束");

			}

	}
	$gameVariables.setValue(173,1);
	$gameSwitches.setValue(442,false); //ai回合结束

}

function SZMG_processMapTouch(){ //玩家鼠标点击落子
	
	if(!$gameSwitches.value(441)){
		//document.body.style.cursor = "none";
		clear_Touch();
		return;
	}else{
		document.body.style.cursor = 'url("img/pictures/fiveChessCur.png"), auto';
		if($gameVariables.value(173) == 1){

			if($gameSwitches.value(442)) {
				clear_Touch();
				return;
			}

			if(TouchInput.isTriggered()){
				TOUCHX = $gameMap.canvasToMapX(TouchInput.x);
				TOUCHY = $gameMap.canvasToMapY(TouchInput.y);

				if(TOUCHX < 0 || TOUCHX > BOARD_SIZE - 1|| TOUCHY < 0 || TOUCHY > BOARD_SIZE - 1) {
				//console.log("");
					clear_Touch();
					return;
				}else{

					var varid = 1 + TOUCHX * BOARD_SIZE + (TOUCHY + 1);
					if($gameVariables.value(varid) !== 0) return;

					var screenX = TOUCHX * 48 - 24;
    				var screenY = TOUCHY * 48 - 24;

					console.log(COMFIRM_X);
					console.log(COMFIRM_Y);
					//console.log(W);
					if(TouchInput.isTriggered())

					if(COMFIRM_X == TOUCHX && COMFIRM_Y == TOUCHY){
						$gameScreen.showPicture(CHESS_a, "WChess", 0, 432 + screenX, 162 + screenY, 100, 100, 1000, 0); //玩家棋子渲染 432 162
						$gameVariables.setValue(varid,1);
						COMFIRM_X = -1;
						COMFIRM_Y = -1;
						player_Comfirm_Chess(TOUCHX,TOUCHY);

					}else{
						//W++;
						$gameScreen.showPicture(CHESS_a, "WChess", 0, 432 + screenX, 162 + screenY, 100, 100, 150, 0); //玩家棋子渲染 432 162
						COMFIRM_X = TOUCHX;
						COMFIRM_Y = TOUCHY;
						//if(W >= 2){
							//COMFIRM_X = TOUCHX;
							//COMFIRM_Y = TOUCHY;
						//	W = 0;
						//}
						clear_Touch();
					}

				}

			}
			
			//var timer = setInterval(function(){
			//	SZMG_aiChess();
			//	clearInterval(timer);

			//},800);

		}else {
			clear_Touch();
			return;
		}
		
	}
	return;
}

function player_Comfirm_Chess(x,y){
	CHESS_a++;
	AudioManager.playSe({name:'Cursor1',volume:100,pan:0,pitch:100});
	$gameVariables.setValue(174,CHESS_a);


	if(SZMG_checkWin(x,y)){ //检测玩家是否获胜
		AudioManager.playSe({name:'Coin',volume:90,pan:0,pitch:100});
		$gameParty.gainGold(20);
		$gameSwitches.setValue(441,false);
		$gameSwitches.setValue(444,true);
		PLAYER_THREE = 0;

		CONS_WIN = $gameVariables.value(175);
		CONS_WIN++;
		if(CONS_WIN == 3){
			$gameMessage.add("你赢了！恭喜达成3连胜！获得额外50G！");
			$gameParty.gainGold(50);
		}else if(CONS_WIN == 5){
			$gameMessage.add("你赢了！恭喜达成5连胜！获得额外180G！");
			$gameParty.gainGold(180);
		}else if(CONS_WIN == 8){
			$gameMessage.add("你赢了！恭喜达成8连胜！获得额外350G！");
			$gameParty.gainGold(350);
		}else if(CONS_WIN == 10){
			$gameMessage.add("你赢了！恭喜达成10连胜！获得额外600G！");
			$gameParty.gainGold(600);
		}else if(CONS_WIN > 10){
			$gameMessage.add("你赢了！恭喜达成" + CONS_WIN + "连胜！获得额外700G！");
			$gameParty.gainGold(700);
		}else{
			$gameMessage.add("你赢了！当前连胜次数：" + CONS_WIN);
		}
			$gameVariables.setValue(175,CONS_WIN);
			return;
		}else{
		if(CHESS_a > 169){ //平局
			$gameSwitches.setValue(441,false);
			$gameSwitches.setValue(444,true);
			$gameMessage.add("平局 棋局结束");
			PLAYER_THREE = 0;

		}
	}

	$gameVariables.setValue(173,2);

}

function cleanAll_Chess(){
	for(var a = 1; a < CHESS_a + 1;a++){
		$gameScreen.erasePicture(a);
	}

	$gameVariables.setValue(174,1);

}

function clear_Touch(){
	TouchInput._x = 0;
	TouchInput._y = 0;
	TouchInput._preX = 0;
	TouchInput._preY = 0;
	TouchInput._pressedTime = 0;
	TouchInput._isPressed = false;
	TouchInput._wasPressed = false;
	TouchInput._triggered = false;
	TouchInput._released = false;
	_touches = [];
}

