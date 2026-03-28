var SZMG = {};
var i = 0;
SZMG.COCK = {}; 
SZMG.Param = {};
SZMG.Param.COCKKeyCode = ['ok','escape','left','right','up','down','pageup','pagedown'];

SZMG.COCK.ClearKey = function(){
	if(i == 0){
		Input.keyMapper[88] = undefined;
		Input.keyMapper[90] = undefined;
		Input.keyMapper[37] = undefined;
		Input.keyMapper[38] = undefined;	
		Input.keyMapper[39] = undefined;
		Input.keyMapper[40] = undefined;
		Input.keyMapper[81] = undefined;
		Input.keyMapper[87] = undefined;
		
	}
	
}

SZMG.COCK.AddKey = function(){
	if(i == 0){
		Input.keyMapper[16] = SZMG.Param.COCKKeyCode[0];
		Input.keyMapper[88] = SZMG.Param.COCKKeyCode[1];
		Input.keyMapper[65] = SZMG.Param.COCKKeyCode[2];
		Input.keyMapper[68] = SZMG.Param.COCKKeyCode[3];
		Input.keyMapper[87] = SZMG.Param.COCKKeyCode[4];
		Input.keyMapper[83] = SZMG.Param.COCKKeyCode[5];
		Input.keyMapper[38] = SZMG.Param.COCKKeyCode[6];
		Input.keyMapper[40] = SZMG.Param.COCKKeyCode[7];
	
	}
	
}

function SZMG_simpleOnKeydown()
{
	document.onkeydown = function (){

		switch (event.keyCode)
		{
			case 9: $gameSwitches.setValue(427,true);//按键 TAB
			break;
			
			case 16: //按键 Enter
			break;
			
			case 27: //按键 ESC
			break;

			case 32: if (!$gameMessage.isBusy()) {
				$gameSwitches.setValue(521,true);
				}//按键 空格
			break;
			
			case 37: //方向 左
			break;
			
			case 38: //方向 上
					 
			break;
			
			case 39: //方向 右
			break;
			
			case 40: //方向 下
			break;
			
			case 66: //按键 B
			break;
			
			case 67: //按键 C
			break;
			
			case 69: $gameSwitches.setValue(426,true); //按键 E
			break;
			
			case 70: $gameSwitches.setValue(540,true);//按键 F
			break;
			
			case 71: //按键 G
			break;
			
			case 72: //按键 H
			break;
			
			case 73: //按键 I
			break;
			
			case 74: //按键 J
			break;
			
			case 75: //按键 K
			break;
			
			case 76: //按键 L
			break;
			
			case 77: //按键 M
			break;
			
			case 78: //按键 N
			break;
			
			case 79: //按键 O
			break;
			
			case 81: //按键 Q
			break;
			
			case 82: //按键 R
			break;
			
			case 84: //按键 T
			break;
			
			case 85: //按键 U
			break;
			
			case 86: //按键 V
			break;
			
			case 88: $gameSwitches.setValue(438,true); //按键 X
			break;
			
			case 89: //按键 Y
			break;
			
			case 90:  //按键 Z
			break;
		}
		
	}
	
}

function SZMG_isMenuOpen(){

	return SceneManager._scene instanceof Scene_MenuBase

}