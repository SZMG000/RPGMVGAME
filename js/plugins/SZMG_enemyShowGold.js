//伤害输出和怪物死后爆出金币的文字提示效果 
//作者：素质猛哥/SZMG
var SZMG_PopupManager = SZMG_PopupManager || {};

SZMG_PopupManager.showGold = function(eventId,amount){
    var event = $gameMap.event(eventId);
    if(!event) return;

    var sprite = new Sprite(new Bitmap(128, 48));
    sprite.bitmap.fontSize = 24;
    sprite.bitmap.textColor = '#FFD700'; //金币的颜色～
    sprite.bitmap.outlineColor = 'rgba(0,0,0,0.8)';
    sprite.bitmap.outlineWidth = 4;
    sprite.bitmap.drawText("+" + amount + " G", 0, 0, 128, 48, 'center');

    sprite.x = event.screenX() - 48;
    sprite.y = event.screenY() - 88;
    sprite.z = 9; 

    SceneManager._scene.addChild(sprite);

    var duration = 60; //飘动时间
    var speed = 1.2;

    var updatePopup = function(){
        if(duration > 0){
            sprite.y -= speed;
            duration--;
            sprite.opacity -= 2; //渐隐效果
            
            requestAnimationFrame(updatePopup);
        }else{
            if(sprite.parent){
                sprite.parent.removeChild(sprite);
            }
            //sprite.bitmap.destroy();
            sprite.destroy();
        }
    };

    updatePopup();
};

SZMG_PopupManager.showDamage = function(eventId,damage,isBJ){
    var event = $gameMap.event(eventId);
    if(!event) return;

    var sprite = new Sprite(new Bitmap(180, 90));
    if(isBJ){
        sprite.bitmap.fontSize = 24;
        sprite.bitmap.textColor = '#ff0000ff';
        sprite.bitmap.outlineColor = 'rgba(0,0,0,0.8)';
        sprite.bitmap.outlineWidth = 4;
        sprite.bitmap.drawText("暴击！！" + damage, 0, 0, 180, 90, 'center');
    }else{
        sprite.bitmap.fontSize = 17;
        sprite.bitmap.textColor = '#ffffffff';
        sprite.bitmap.outlineColor = 'rgba(0,0,0,0.8)';
        sprite.bitmap.outlineWidth = 4;
        sprite.bitmap.drawText(damage, 0, 0, 180, 90, 'center');
    }

    sprite.x = event.screenX() - 48;
    sprite.y = event.screenY() - 48;
    sprite.z = 9; 

    SceneManager._scene.addChild(sprite);

    var duration = 45; //飘动时间
    var speed = 1.2;

    var updateDamagePopup = function(){
        if(duration > 0){
            sprite.y -= speed;
            duration--;
            sprite.opacity -= 3; //渐隐效果
            
            requestAnimationFrame(updateDamagePopup);
        }else{
            if(sprite.parent){
                sprite.parent.removeChild(sprite);
            }
            
            sprite.destroy();
        }
    };

    updateDamagePopup();
    
}