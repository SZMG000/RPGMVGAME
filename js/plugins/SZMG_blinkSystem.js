//制作者：素质猛哥/SZMG
(function (){
    const _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
    Sprite_Character.prototype.initMembers = function(){
        _Sprite_Character_initMembers.call(this);
        this._blinktimer = 0;
        this._nextBlink = 120;
    };

    const _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function(){
        _Sprite_Character_update.call(this);
        if(this._characterName && this._characterName.includes('_blink')){
            if (this._character && !this._character.isMoving()) {
                this.updateBlink();
            } else {
                this._blinktimer = 0;
            }
            
        }
    };

    Sprite_Character.prototype.updateBlink = function(){
        if(this._blinktimer > 0){
            this._blinktimer--;
        }else{
            if(this._nextBlink > 0){
                this._nextBlink--;
            }else{
                this._blinktimer = 12;
                this._nextBlink = 120 + Math.randomInt(240);
            }
        }
    };

    //修改行走图切割宽度
    const _Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
    Sprite_Character.prototype.patternWidth = function(){
        if(this._characterName && this._characterName.includes('_blink')){
            if (this.bitmap && this.bitmap.width > 0) {
                return this.bitmap.width / 5; // 宽度变为 1/5
            }
        }

        return _Sprite_Character_patternWidth.call(this); 
    };

    const _Sprite_Character_characterPatternX = Sprite_Character.prototype.characterPatternX;
    Sprite_Character.prototype.characterPatternX = function(){
        if(this._blinktimer > 0 && this._characterName.includes('_blink')){
            if(this._blinktimer > 9 || this._blinktimer <= 3){
                return 3;
            }else{
                return 4;
            }
        }

        return _Sprite_Character_characterPatternX.call(this);
    };

    const _Window_Base_drawCharacter = Window_Base.prototype.drawCharacter;
    Window_Base.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
    // 检查是否是特殊 5 列眨眼图
    if (characterName && characterName.includes('_blink')) {
        const bitmap = ImageManager.loadCharacter(characterName);
        const isBig = ImageManager.isBigCharacter(characterName); // 检查文件名是否有 $
        
        // 确保图片加载后获取正确尺寸
            bitmap.addLoadListener(function() {
                
                const pw = bitmap.width / (isBig ? 5 : 20);
                const ph = bitmap.height / (isBig ? 4 : 8);
            
                
                const n = characterIndex;
                const sx = (isBig ? 0 : (n % 4 * 5)) + 1; // 锁定第 2 列（站立帧）
                const sy = (isBig ? 0 : (Math.floor(n / 4) * 4));
            
                
                this.contents.blt(bitmap, sx * pw, sy * ph, pw, ph, x - pw / 2, y - ph);
            }.bind(this));
        } else {
            // 普通 3 列图走引擎原逻辑
            _Window_Base_drawCharacter.apply(this, arguments);
        }
    };
    
})();