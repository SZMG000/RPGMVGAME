//新的HPUI区域显示效果
//作者：素质猛哥/SZMG
(function() {
    
    var SZMG_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        SZMG_Scene_Map_createAllWindows.call(this);
        this.createSimpleHPWindow();
    };

    var SZMG_Scene_Map_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function() {
        SZMG_Scene_Map_initialize.call(this);
        this._skillCd = 0;          // 当前剩余帧数
        this._skillMaxCd = 180;     // 总冷却时间
    };

    Scene_Map.prototype.createSimpleHPWindow = function() {
        
        this._hpWindow = new Window_Base(0, 0, 375, 180); //旧版：75, 35, 240, 100
        this._hpWindow.spacing = 0;   
        this._hpWindow.padding = 0;
        this._hpWindow.opacity = 0; 
        this.addWindow(this._hpWindow);
    };

    
    var SZMG_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        SZMG_Scene_Map_update.call(this);
        if (this._hpWindow) {
            this.drawPlayerHP();
        }
    };

    Scene_Map.prototype.drawPlayerHP = function() {
        var actor = $gameParty.leader(); 
        if (!actor) return;

        this._hpWindow.contents.clear(); // 清除上一帧内容

        if($gameSwitches.value(428)){
            
            var bitmap = ImageManager.loadFace(actor.faceName());

            bitmap.addLoadListener(function() {
                
                this._hpWindow.contents.blt(bitmap, 0, 0, 180, 180, 0, 0, 90, 90); //头像图片
            }.bind(this));

            this._hpWindow.contents.fontSize = 24;
            this._hpWindow.drawText(actor.name(),90,0,150,'left'); //角色名字

            this._hpWindow.drawActorHp(actor, 90, 50, 180); //HP血条

            //this._hpWindow.drawActorIcons(actor, 0, 185, 15); 

            //$gameSwitches.setValue(428,false);

            //绘制下方飞刀技能图标！！！！
            this.useSkillDown($gameVariables.value(417),$gameVariables.value(418));
        } 


    };

    Scene_Map.prototype.useSkillDown = function(cd,maxCd) {
        var skillX = 280;          // 图标起始 X
        var skillY = 5;          // 图标起始 Y 
        var size = 48;            // 图片尺寸

        this._skillCd = cd;          
        this._skillMaxCd = maxCd;

        var skillBitmap = ImageManager.loadSystem('SK01'); 

        skillBitmap.addLoadListener(function() {
            // 绘制原始图标
            this._hpWindow.contents.blt(skillBitmap, 0, 0, size, size, skillX, skillY);

            
            if (this._skillCd > 0) {
                var rate = this._skillCd / this._skillMaxCd;
                var fillHeight = size * (1 - rate); // 遮罩高度随比例变化
        
                this._hpWindow.contents.paintOpacity = 180; // 遮罩透明度
                
                this._hpWindow.contents.fillRect(skillX, skillY + (size - fillHeight), size, fillHeight, '#000000ff');
                this._hpWindow.contents.paintOpacity = 255;

                
                var seconds = Math.ceil(this._skillMaxCd - this._skillCd);
                this._hpWindow.contents.fontSize = 20;
                this._hpWindow.drawText(seconds, skillX, skillY + 5, size, 'center');
            }
        }.bind(this));
    };

})();