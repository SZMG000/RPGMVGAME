// 斗地主核心js脚本 作者：素质猛哥/SZMG
if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth = 1) {
        const result = [];
        const stack = [...this.map(item => [item, depth])]; 
        
        while (stack.length > 0) {
            const [current, currentDepth] = stack.pop(); // 从栈尾取出 保证顺序
            if (Array.isArray(current) && currentDepth > 0) {
                
                stack.push(...current.map(item => [item, currentDepth - 1]));
            } else {
                
                result.push(current);
            }
        }
        return result.reverse(); 
    };
}

if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function(callback, thisArg) {
        
        return this.map(callback, thisArg).flat(1);
    };
}

class Sprite_m extends Sprite_Button{
    constructor(bitmap){
        super();
        this.setBitmap(bitmap);
    }
    setBitmap(bitmap){
        this.bitmap = bitmap;
    }
}

var AX;
var AY;
var ApicId;
var AcardId;

if(typeof SZMG_DDZGame === 'undefined'){
    var SZMG_DDZGame = {};
}

SZMG_DDZGame = {

    uiConfig: {
    playerCardX: 480,    // 玩家手牌起始位置
    playerCardY: 750,   // 玩家手牌底部起始位置
    cardWidth: 90,      // 扑克牌宽度f
    cardHeight: 135,    // 扑克牌高度
    cardGap: 20, 
    //aiCardGap: 4,      // ai牌之间的间距
    selectOffset: -20,  // 选中牌向上偏移量
    ai1CardX: 10,      // 电脑1牌背位置
    ai1CardY: 10,       // 电脑1牌背Y坐标
    ai2CardX: 1190,      // 电脑2牌背位置
    ai2CardY: 10,       // 电脑2牌背Y坐标

    countPool:0,

    dzCardX: 550,
    dzCardY: 90,
    dzCardGap: 95,
    
    //aiThinkTime: 40,    // AI思考时间
    aiCallTime:60,

    playArea: [
            // 0号：玩家出牌区（靠近自身手牌上方）
            { x: 500, y: 550, gap: 20, picStart: 300, scale: 1 },
            // 1号：电脑1出牌区（靠近自身牌背下方）
            { x: 10, y: 190, gap: 20, picStart: 350, scale: 1 },
            // 2号：电脑2出牌区（靠近自身牌背下方）
            { x: 1190, y: 190, gap: 20, picStart: 400, scale: 1 }
        ],
    },

    gameState: 'idle',
    players:[ //创建3名玩家 其中两个是AI玩家
        {id:0,name:'你',handCards:[],selectedCards:[],isDZ:false,isTurn:false},
        {id:1,name:'AI1',handCards:[],selectedCards:[],isDZ:false,isTurn:false},
        {id:2,name:'AI2',handCards:[],selectedCards:[],isDZ:false,isTurn:false},
    ],
    getplayer:-1,
    cardDeck:[],
    DZCards:[],
    cardBackId:0,
    playedCards:[],
    lastPlayedByPlayer:[[],[],[]],
    lastPlayedCards:[],
    lastPlayerId:-1,
    callTurn:0,
    maxCallScore:0,
    maxCallPlayerId:-1,
    cardValues:{
        '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'T':10,'J':11,'Q':12,'K':13,'A':14,'小王':15,'大王':16
    },
    suits:['黑桃','红心','梅花','方块'],


    start: function(){
        this.gameState = 'dealing';
        this.resetGameData();
        this.createCardDeck();
        this.shuffleDeck();
        this.cardBackId = Math.floor(Math.random() * 3);
        this.dealCards();
    },

    resetGameData: function(){
        this.players.forEach(player => {
           player.handCards = [];
            player.selectedCards = [];
            isDZ = false;
            isTurn = false;
        });
        this.cardDeck = [];
        this.DZCards = [];
        this.lastPlayedByPlayer = [[],[],[]],
        this.lastPlayedCards = [];
        this.lastPlayerId = -1;
        this.playedCards = [];
        this.callTurn = 0;
        this.maxCallScore = 0;
        this.maxCallPlayerId = -1;

        for(let i = 100; i < 550;i++){
            $gameScreen.erasePicture(i);
        }
        //var targetA = SceneManager._scene.children.find(s => s._cid === 1);
        //var targetB = SceneManager._scene.children.find(s => s._cid === 2);
        //SceneManager._scene.removeChild(targetA);
       //SceneManager._scene.removeChild(targetB);
    },

    createCardDeck: function(){ //创建54张扑克牌
        this.cardDeck = [];

        const cardNumbers = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
        for(let num of cardNumbers){
            for(suit of this.suits){
                this.cardDeck.push({
                    id: suit + num,
                    suit: suit,
                    number: num,
                    value: this.cardValues[num],
                    isSelected: false
                });
            }
        }

        this.cardDeck.push({id:'小王',number: 15,value: this.cardValues['小王'],isSelected: false });
        this.cardDeck.push({id:'大王',number: 16,value: this.cardValues['大王'],isSelected: false });
    },

    shuffleDeck: function(){ //洗牌
        const deck = this.cardDeck;
        const deckLen = deck.length;
        
        const getRandomInt = (min,max) => {
            const seed = Date.now() + Math.random() * 1000000 + deckLen;
            const random = (seed % (max - min + 1) + min) | 0;
            return Math.max(min,Math.min(max,random));
        };

        const fisherYatesShuffle = (arr) => {
            const newArr = [...arr];
            for(let i = newArr.length - 1;i > 0;i--){
                const j = getRandomInt(0,i);
                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            }
            return newArr;
        };

        const cutCard = (arr) => {
            const cutPos = getRandomInt(Math.floor(arr.length/3),Math.floor(arr.length*2/3));
            return [...arr.slice(cutPos),...arr.slice(0,cutPos)];

        };

        const splitAndRecombine = (arr) => {
            const len = arr.length;
            const p1 = getRandomInt(Math.floor(len/4),Math.floor(len/3));
            const p2 = getRandomInt(p1 + 1, Math.floor(len*2/3));
            const part1 = arr.slice(0,p1);
            const part2 = arr.slice(p1,p2);
            const part3 = arr.slice(p2);

            const combineOrder = [0,1,2].sort(() => getRandomInt(-1,1));
            const recombineMap = {0: part1, 1:part2, 2:part3};
            return [...recombineMap[combineOrder[0]],...recombineMap[combineOrder[1]],...recombineMap[combineOrder[2]]];
        };

        let shuffledDeck = [...deck];
        shuffledDeck = splitAndRecombine(shuffledDeck);
        for(let i = 0; i < 4; i++){
            shuffledDeck = fisherYatesShuffle(shuffledDeck);
        }
        shuffledDeck = cutCard(shuffledDeck);

        this.cardDeck = shuffledDeck; //完成模拟洗牌动作
    },

    dealCards: function(){
        
       // for(let i = 0; i < this.cardDeck.length - 3;i++){
       //     switch(i % 3){
       //         case 0:this.players[0].handCards.push(this.cardDeck[i]);this.updateCardUI();$gameMap._interpreter.wait(30);break;
       //         //发牌给AI玩家
        //        case 1:this.players[1].handCards.push(this.cardDeck[i]);this.updateAICardUI();$gameMap._interpreter.wait(30);break;
        //        case 2:this.players[2].handCards.push(this.cardDeck[i]);this.updateAICardUI();$gameMap._interpreter.wait(30);break;
        //    }
       // }
        $gameSwitches.setValue(490,true);

        //this.DZCards = this.cardDeck.splice(0,3);
        //this.DZCards.sort((a,b) => a.value - b.value);
        //this.updateDZCardUI();

        //this.players.forEach(p => p.handCards.sort((a,b) => a.value - b.value));
        //this.updateCardUI();
        //$gameMessage.add(`发牌结束 进入叫分环节 叫分最高的玩家成为地主并获得以上地主牌！`);
        this.gameState = 'calling';
        //this.callScore(0);
        //this.setDZ(0);
    },

    callScore: function(score) {
        if (this.gameState !== 'calling' || this.callTurn !== 0 || ![0,1,2,3].includes(score)) {
            return;
        }
        this.doCallScore(0, score);
    },

    doCallScore: function(playerId, score) {
        const player = this.players[playerId];
        player.callScore = score;
        const scoreText = score === 0 ? '不叫' : `${score}分`;
        $gameMessage.add(`${player.name} 选择：${scoreText}`);
        if (score === 3) {
            this.setDZ(playerId);
            return;
        }
        if (score > this.maxCallScore) {
            this.maxCallScore = score;
            this.maxCallPlayerId = playerId;
        }
        this.callTurn = (playerId + 1) % 3;
        if (this.callTurn === 0) {
            this.endCallScore();
        } else {
            //$gameMap._interpreter.wait(this.uiConfig.aiCallTime);
            this.aiCallScore(this.callTurn);
        }
    },

    aiCallScore: function(playerId) {
        const ai = this.players[playerId];
        const handCards = ai.handCards;
        var expectCards = [...handCards,...this.DZCards].sort((a,b) => a.value - b.value); //加入地主牌的预期牌组
        const hasKing1 = expectCards.some(c => c.value ===15);
        const hasKing2 = expectCards.some(c => c.value ===16);
        let score = 0;
        let chips = $gameVariables.value(432);
        let addChips = 0;
        const bombCount = this.getBombCards(expectCards).length;
        const bigCardCount = expectCards.filter(c => c.value >= 13).length;
        const continuousThreeCount = this.getContinuousThreeCount(expectCards);
        const straightCount = this.getStraightCount(expectCards);
        if ((bigCardCount >= 8 && bombCount >= 2) || (hasKing1 && hasKing2 && bigCardCount >= 7)) {
            score = 3;
            addChips = 6;
            $gameVariables.setValue(432,chips + addChips);

        } else if ((bigCardCount >= 5 && hasKing1 && hasKing2) || (bigCardCount >= 6 && (hasKing2 || straightCount >= 2))) {
            var randomCall = Math.floor(Math.random() * 101);
            if(randomCall >= 50){
                score = 2;
                addChips = 4;
                $gameVariables.setValue(432,chips + addChips);
            }else{
                score = 1;
                addChips = 2;
                $gameVariables.setValue(432,chips + addChips);
            }
            
        } else if (bigCardCount >= 4 && (hasKing2 || straightCount >=1 || handCards.filter(c=>c.value>=12).length >=8)) {
            var randomCall = Math.floor(Math.random() * 101);
            if(randomCall >= 50){
                score = 1;
                addChips = 2;
                $gameVariables.setValue(432,chips + addChips);
            }else{
                score = 0;
            }
        } else {
            score = 0;
        }
        if (this.maxCallScore > 0 && score > 0) {
            if (score <= this.maxCallScore) {
                score = 0;
            }
        }
        this.doCallScore(playerId, score);
    },

    endCallScore: function() {
        //$gameMessage.add('=== 叫分结束，开始判定地主 ===');
        
        if (this.maxCallScore > 0) {
            this.setDZ(this.maxCallPlayerId);
        } else {
            // 如果3名玩家均不叫分 则随机指定任意一个玩家成为地主
            $gameMessage.add('所有玩家均不叫分 系统将随机指定一名玩家成为地主！');
            //$gameMap._interpreter.wait(60);
            this.setDZ(Math.floor(Math.random() * 3));
        }
    },

    setDZ: function(playerId) {
        this.countPool = $gameVariables.value(432);
        const landlord = this.players[playerId];
        this.getplayer = playerId;
        this.players.forEach((p, idx) => p.isDZ = (idx === playerId));
        for (let i = 290; i < 294; i++) $gameScreen.erasePicture(i);
        landlord.handCards = [...landlord.handCards, ...this.DZCards];
        landlord.handCards.sort((a,b) => a.value - b.value);
        this.gameState = 'playing';
        landlord.isTurn = true;

        
        $gameMessage.add(`${landlord.name} 成为地主！地主叫分：${landlord.callScore}分，
            获得底牌：${this.DZCards.map(c=>c.id).join(' ')}`);
        
        if(playerId !== 0){
            this.players[0].isTurn = false;
            $gameSwitches.setValue(492,true);
            //this.switchToAI(playerId);
        }else{
            this.lastPlayerId = 0;
            this.setPlayerButton();
        }

        this.updateCardUI();
        
    },

    setPlayerButton:function(){ //生成玩家操作按钮
        const bitmapA = ImageManager.loadPicture('按钮A');
        const bitmapB = ImageManager.loadPicture('按钮B');
        const buttonA = new Sprite_m(bitmapA);
        const buttonB = new Sprite_m(bitmapB);
        buttonA.x = 1020;
        buttonA.y = 820;
        buttonA._cid = 1;
        SceneManager._scene.addChild(buttonA);
        buttonA.setClickHandler(() =>{
            AudioManager.playSe({name:'Cursor1',volume:100,pan:0,pitch:100});
            //$gameSwitches.setValue(492,true);
            SZMG_DDZGame.passPlay();

        });
        buttonB.x = 1020;
        buttonB.y = 760;
        buttonB._cid = 2;
        SceneManager._scene.addChild(buttonB);
        buttonB.setClickHandler(() =>{
            AudioManager.playSe({name:'Cursor1',volume:100,pan:0,pitch:100});
            //$gameSwitches.setValue(492,true);
            SZMG_DDZGame.playCards();

        });
    },

    getContinuousThreeCount: function(handCards) {
        const groups = this.getCardValueGroups(handCards);
        const sortedVals = Object.keys(groups).map(Number).sort((a,b)=>a-b).filter(v => groups[v].length >= 3 && v <= 14);
        let maxCount = 0;
        let curCount = 1;
        for (let i=1; i<sortedVals.length; i++) {
            if (sortedVals[i] - sortedVals[i-1] ===1) {
                curCount++;
                maxCount = Math.max(maxCount, curCount);
            } else {
                curCount = 1;
            }
        }
        return maxCount;
    },

    getStraightCount: function(handCards) {
        const singleVals = [...new Set(handCards.map(c => c.value))].filter(v => v >=2 && v <=14).sort((a,b)=>a-b);
        let straightCount = 0;
        let curLen = 1;
        for (let i=1; i<singleVals.length; i++) {
            if (singleVals[i] - singleVals[i-1] === 1) {
                curLen++;
                if (curLen >=5) straightCount++;
            } else {
                curLen = 1;
            }
        }
        return straightCount;
    },

    updateCardUI: function(){
        const player = this.players[0];
        const { playerCardX, playerCardY, cardWidth, cardHeight, cardGap, selectOffset } = this.uiConfig;

        for (let i = 500; i < 550; i++) $gameScreen.erasePicture(i);
        // 遍历手牌逐个显示
        player.handCards.forEach((card, idx) => {
            const x = playerCardX + idx * cardGap;
            const y = card.isSelected ? playerCardY + selectOffset : playerCardY; //选中后牌向上移动
            $gameScreen.showPicture(
                500 + idx,   //picId
                card.id,     // 文件名
                0,           
                x, y,        
                100, 100,    // 缩放比例
                1000,         
                0            
            );
            this.AX = x;
            this.AY = y;
            this.AcardId = card.id;
            this.ApicId = 500 + idx;
            this.bindCardClick(500 + idx);
        });

    },

    bindCardClick: function(picId){
        const scene = SceneManager._scene;
        
        if (!scene._spriteset || !scene._spriteset._pictureContainer) return;

        var sprite = scene._spriteset._pictureContainer.children.find(s => s._pictureId === picId);  //_pictureId是数字编号
        if (sprite) {
            sprite.width = this.uiConfig.cardWidth;  // 强制设为90 135
            sprite.height = this.uiConfig.cardHeight;
            sprite._originalY = this.uiConfig.playerCardY;

            sprite.interactive = true;// 开启鼠标交互

            //sprite.buttonMode = true;
            //sprite.hitArea = new PIXI.Rectangle(0, 0, this.uiConfig.cardWidth,this.uiConfig.cardHeight);
            sprite.setClickHandler(function (){
                const MpicId = this._pictureId;
                const picName = $gameScreen.picture(MpicId).name();
                if(SZMG_DDZGame.gameState !== 'playing' || !SZMG_DDZGame.players[0].isTurn) {
                    //console.log(cardId);
                    return;
                }else{
                    const player = SZMG_DDZGame.players[0];
                    const card = player.handCards.find(c => c.id === picName); //.id是文件名！
                    const x = this.x;
                    const y = this.y; 
                    //console.log(picName);
                    //console.log(card);
                    card.isSelected = !card.isSelected;
                    player.selectedCards = player.handCards.filter(s => s.isSelected);
                    const by = card.isSelected ? y + SZMG_DDZGame.uiConfig.selectOffset : this._originalY; 
                 //更新玩家扑克牌渲染

                $gameScreen.erasePicture(picId);
                $gameScreen.showPicture(
                    picId,   
                    picName,     // 文件名
                    0,           
                    x, by,        
                    100, 100,    // 缩放比例
                    1000,         
                    0            
                );

                }
            }.bind(sprite));
            //sprite.on('mousedown', () => {
            //});
            
        }else{
            console.log('未绑定扑克牌！');
        }
    },

   /* selectCard: function(picId,cardId,ax,ay){ //玩家点击选牌或取消
        
    },*/

    updateAICardUI: function(){
        const { ai1CardX, ai1CardY, ai2CardX, ai2CardY, cardWidth} = this.uiConfig;
        const cardBack = '牌背b' + this.cardBackId;  //AI牌背图片
        for (let i = 200; i < 300; i++) $gameScreen.erasePicture(i);
        // AI1牌背
        this.players[1].handCards.forEach((_, idx) => {
            $gameScreen.showPicture(200+idx, cardBack, 0, ai1CardX+idx*(cardWidth/10), ai1CardY, 100, 100, 1000, 0);
        });
        // AI2牌背
        this.players[2].handCards.forEach((_, idx) => {
            $gameScreen.showPicture(250+idx, cardBack, 0, ai2CardX+idx*(cardWidth/10), ai2CardY, 100, 100, 1000, 0);
        });
    },

    updateDZCardUI: function(){ //显示地主牌
        const { dzCardX, dzCardY, cardWidth, cardHeight, dzCardGap } = this.uiConfig;
        this.DZCards.forEach((card,idx) => {
            const x = dzCardX + idx * dzCardGap;
            const y = dzCardY;
            $gameScreen.showPicture(
                290 + idx,   
                card.id,     // 文件名
                0,           
                x, y,        
                100, 100,    // 缩放比例
                1000,         
                0            
            );
        });
    },

    updateTableCardUI: function(playerId,cards){ //牌桌上扑克牌显示
        const tabArea = this.uiConfig.playArea[playerId];
        const {cardWidth,cardHeight} = this.uiConfig;
        const picStart = tabArea.picStart; //图片数字id
        const scale = tabArea.scale * 100;
        
        for(let i = picStart; i < picStart + 20; i++){
            $gameScreen.erasePicture(i);
        }

        if(!cards || cards.length === 0) return;

        cards.forEach((card,idx) => {
            const x = tabArea.x + idx * tabArea.gap;
            const y = tabArea.y;
            $gameScreen.showPicture(
                picStart + idx, 
                card.id,
                0,
                x, y,
                scale, scale, 
                1000,
                0
            );
        });
        //const playerName = this.players[playerId].name;
        //const cardType = this.analyzeCardType(cards).type;
    },



    clearAICardUI: function() {
        for (let i = 200; i < 300; i++) $gameScreen.erasePicture(i);
        
    },
    
    playCards: function(){ //玩家出牌
        const playerId = 0;
        const player = this.players[playerId];
        const selected = player.selectedCards;

        if(selected.length == 0) {
            console.log('请选择要出的牌！');
            return;
        }
        
        const cardType = this.analyzeCardType(selected);
        if(!cardType.valid) {
            console.log('无效牌型！');
            return;
        }

        if(!this.isPlayValid(selected)){
            console.log('无法打出该牌型！');
            return;
        } 

        if(cardType.type === '炸弹' || cardType.type === '火箭'){ //打出炸弹或王炸底池翻倍！！！！！
            AudioManager.playSe({name:'Explosion2',volume:90,pan:0,pitch:100});
            let addCount = $gameVariables.value(432) + this.countPool;
            console.log(this.countPool);
            $gameVariables.setValue(432,addCount);
            $gameSwitches.setValue(526,false);
        }

        this.lastPlayedCards = [...selected];
        this.lastPlayedByPlayer[playerId] = [...selected];
        this.lastPlayerId = 0;
        this.playedCards.push(...selected);
        player.handCards = player.handCards.filter(c => !c.isSelected);
        player.selectedCards = [];
        player.isTurn = false;
       
        
        // 更新UI 切换到AI出牌
        this.updateCardUI();
        this.updateTableCardUI(playerId,this.lastPlayedByPlayer[playerId]);
        var targetA = SceneManager._scene.children.find(s => s._cid === 1);
        var targetB = SceneManager._scene.children.find(s => s._cid === 2);
        SceneManager._scene.removeChild(targetA);
        SceneManager._scene.removeChild(targetB);

        // 校验是否获胜
        if (player.handCards.length === 0) {
            this.gameState = 'gameOver';
            this.gameOver(0);
            return;
        }

        this.getplayer = 1;
        $gameSwitches.setValue(492,true);
        //this.switchToAI(1);
    },

    passPlay: function() {
        if (this.gameState !== 'playing' || !this.players[0].isTurn) {
            console.log();
            return;
        }
        // 首个出牌者不能不出
        if (this.lastPlayerId === 0) {
            console.log('首个出牌者不能不出!');
            return;
        }

        const playerHandCards = this.players[0].handCards;
        for(i = 0; i < playerHandCards.length;i++){
            playerHandCards[i].isSelected = false;

        }
        const scene = SceneManager._scene;
        
        //this.lastPlayerId = 0;
        this.players[0].isTurn = false;
        this.updateCardUI();
        var targetA = SceneManager._scene.children.find(s => s._cid === 1);
        var targetB = SceneManager._scene.children.find(s => s._cid === 2);
        SceneManager._scene.removeChild(targetA);
        SceneManager._scene.removeChild(targetB);
        // 切换到AI出牌
        this.getplayer = 1;
        $gameSwitches.setValue(492,true);
        //this.switchToAI(1);
    },

    analyzeCardType: function(cards) {
        if (cards.length === 0) return { type: '空牌', value: 0, valid: true };
        const groups = this.getCardValueGroups(cards);
        const groupVals = Object.keys(groups).map(Number).sort((a,b)=>a-b);
        const groupLens = groupVals.map(v => groups[v].length);
        const cardLen = cards.length;
        const uniqueVals = [...new Set(cards.map(c => c.value))].sort((a,b)=>a-b);

        if (cardLen === 1) return { type: '单牌', value: cards[0].value, valid: true };
        if (cardLen === 2 && groupLens[0] === 2) return { type: '对子', value: groupVals[0], valid: true };
        if (cardLen >=5 && cardLen === uniqueVals.length) {
            const isContinuous = uniqueVals.every((v,i)=>i===0 || v - uniqueVals[i-1] ===1);
            const isInRange = uniqueVals[0] >= 2 && uniqueVals[uniqueVals.length-1] <=14; //顺子牌值范围2～14
            if (isContinuous && isInRange) {
                return { type: '顺子', value: uniqueVals[uniqueVals.length-1], valid: true };
            }
        }
        if (cardLen >=6 && cardLen%2===0) {
            const pairCount = cardLen/2;
            if (groupLens.every(l=>l===2) && groupVals.length===pairCount) {
                const isContinuous = groupVals.every((v,i)=>i===0 || v-groupVals[i-1]===1) && groupVals[groupVals.length-1] <=14;
                if (isContinuous) return { type: '连对', value: groupVals[groupVals.length-1], valid: true };
            }
        }
        if (cardLen ===3 && groupLens[0]===3) return { type: '三张', value: groupVals[0], valid: true };
        if (cardLen ===4 && groupLens.includes(3) && groupLens.includes(1)) {
            const threeVal = groupVals.find(v => groups[v].length===3);
            return { type: '三带一', value: threeVal, valid: true };
        }
        if (cardLen ===5 && groupLens.includes(3) && groupLens.includes(2)) {
            const threeVal = groupVals.find(v => groups[v].length===3);
            return { type: '三带对', value: threeVal, valid: true };
        }
        if (cardLen >=6 && cardLen % 3 === 0) {
            const threeCount = cardLen / 3;
            if (groupLens.every(l => l === 3) && groupVals.length === threeCount) {
                const isContinuous = groupVals.every((v, i) => i === 0 || v - groupVals[i-1] === 1) && groupVals[groupVals.length-1] <=14;
                if (isContinuous) return { type: '飞机', value: groupVals[groupVals.length-1], valid: true };
            }
        }
        if (groupLens.includes(4)) {
            const bombVal = groupVals.find(v => groups[v].length===4);
            return { type: '炸弹', value: cards[0].value * 4, valid: true };
        }
        if (cardLen ===2 && groupVals.includes(15) && groupVals.includes(16)) {
            return { type: '火箭', value: 100, valid: true };
        }
        return { type: '无效牌型', value: 0, valid: false };
    },

    isPlayValid: function(newCards){
        const lastValidCardCards = [...this.lastPlayedCards]; //this.lastPlayedByPlayer.flat()
        if(this.lastPlayerId === 0) return true;
        const newType = this.analyzeCardType(newCards);
        const lastType = this.analyzeCardType(lastValidCardCards);
        if(!newType.valid){
            return false;
        } 

        if(newType.type === '火箭') return true;

        if(newType.type === '炸弹' && lastType.type !== '炸弹' && lastType.type !== '火箭') return true;

        if(newType.type !== lastType.type && this.lastPlayerId !== 0){
            console.log('你选择的牌型与上一位玩家打出的不符!');
            return false;
        } 

        if(newType.value <= lastType.value){
            console.log('该牌打不过上一位玩家打出的牌!');
            return false;
        }

        return newType.type === lastType.type;

        //return newType.type === lastType.type && newCards.length === lastValidCardCards.length && newType.value > lastType.value;
    },

    switchToAI: function(playerId){ //切换至AI出牌回合
        if(playerId > 2) {
            playerId = 0;
            this.players[0].isTurn = true;
            this.updateTableCardUI(playerId,[]);
            this.setPlayerButton();
            return;
        } 
        //var targetA = SceneManager._scene.children.find(s => s._cid === 1);
        //var targetB = SceneManager._scene.children.find(s => s._cid === 2);
        //SceneManager._scene.removeChild(targetA);
        //SceneManager._scene.removeChild(targetB);

        const ai = this.players[playerId];

        if (ai.handCards.length === 0 ) return;
        
        this.updateTableCardUI(playerId,[]);

        if(playerId === this.lastPlayerId){
            this.lastPlayedCards = [];
            this.lastPlayedByPlayer = [[],[],[]];
        }
        
        ai.isTurn = true;

       // $gameMap._interpreter.wait(this.uiConfig.aiThinkTime);
        this.aiPlayCards(playerId);

    },

    aiPlayCards: function(playerId){ //AI出牌控制
        const ai = this.players[playerId];
        ai.isTurn = false;

        const playableCards = this.findPlayableCards(playerId, ai.handCards);
        if (playableCards.length > 0) {
        // 有牌可出：更新出牌记录+渲染牌面+移除手牌
            this.lastPlayedByPlayer[playerId] = [...playableCards];
            this.lastPlayerId = playerId;
            this.playedCards.push(...playableCards);
            this.lastPlayedCards = [...playableCards]; // 上一轮打出的牌！
            this.updateTableCardUI(playerId,this.lastPlayedByPlayer[playerId]);
        // 从AI手牌中移除打出的牌
        playableCards.forEach(c => {
            const idx = ai.handCards.findIndex(card => card.id === c.id);
            if (idx > -1) ai.handCards.splice(idx, 1);
        });
        AudioManager.playSe({name:'Cursor1',volume:100,pan:0,pitch:100});
        this.updateAICardUI();

        const cardType = this.analyzeCardType([...playableCards]);
        if(cardType.type === '炸弹' || cardType.type === '火箭'){  //打出炸弹或王炸底池翻倍！！！！
            AudioManager.playSe({name:'Explosion2',volume:90,pan:0,pitch:100});
            let addCount = $gameVariables.value(432) + this.countPool;
            console.log(this.countPool);
            $gameVariables.setValue(432,addCount);
            $gameSwitches.setValue(526,false);
        }

        if (ai.handCards.length === 0) {
            this.gameState = 'gameOver';
            this.gameOver(playerId);
            return;
        }
        } else {
        // 无牌可出
        }
        if(playerId + 1 > 2){
           //this.players[0].isTurn = true;
           //this.setPlayerButton();
           this.getplayer = 3;
            $gameSwitches.setValue(492,true);
        }else{
            this.getplayer = playerId + 1;
            $gameSwitches.setValue(492,true);
             //this.switchToAI(playerId + 1);
        }
    },

    

    findPlayableCards: function(playerId,handCards){ //AI选牌核心逻辑
        const ai = this.players[playerId];
        const isLandlord = ai.isDZ;
        const friend = this.players.find(p => !p.isZD);
        const landordHandCards = this.players.find(p => p.isDZ).handCards;
        //const landlordHasKing1 = landordHandCards.find(c => c.value === 15);
        //const landlordHasKing2 = landordHandCards.find(c => c.value === 16);
        const AIsmallCards = this.players[playerId].handCards.filter(c => c.value <= 10);
        const p1HandCardsLen = this.players[0].handCards.length;
        const p2HandCardsLen = this.players[1].handCards.length;
        const p3HandCardsLen = this.players[2].handCards.length;
        const playerHasKing1 = this.players[0].handCards.some(c => c.value === 15);
        const playerHasKing2 = this.players[0].handCards.some(c => c.value === 16);
        const playerHandCardType = this.analyzeCardType(this.players[0].handCards).type;
        console.log('当前地主剩余手牌数量：' + landordHandCards.length);
        const lastValidCardCards = this.lastPlayedByPlayer.flat();
        const lastPlayer = this.players[this.lastPlayerId];
        const lastIsLandlord = lastPlayer ? lastPlayer.isDZ : false;
        const lastType = this.analyzeCardType(this.lastPlayedCards);
        const cardLen = handCards.length;
        
        //if(cardLen <= 5) isLandlord = true;

        if (lastValidCardCards.length === 0) { //ai首个出牌
                //const basicCombos = handCards.map(c => [c]); 
                //return basicCombos[Math.floor(Math.random() * basicCombos.length)];

                const allCombos = this.getAllCardCombos(handCards);
                const fCombo = this.sortCombosByValue(allCombos);
    
                if(allCombos.length > 0){
                    if(!isLandlord && landordHandCards.length <= 3){
                        if(landordHandCards.length !== 1){
                            if(AIsmallCards >= 2 && fCombo[fCombo.length - 1][0].value >= 14){
                                console.log('尽可能清理手中小牌！');
                                return [handCards[0]];
                            }else{
                                console.log('压制地主出牌！');
                                return fCombo[fCombo.length - 1];
                            }
                        }else{
                            console.log('压制地主出牌！');
                            return fCombo[fCombo.length - 1];
                        }
                        
                    }else{
                        if(playerId === 1){
                            if(isLandlord && (p1HandCardsLen <= 3 || p3HandCardsLen <= 3)){
                                
                                if(p1HandCardsLen !== 1 && p3HandCardsLen !== 1 ){
                                    if(AIsmallCards >= 2 && fCombo[fCombo.length - 1][0].value >= 14){
                                        console.log('AI1尽可能清理手中小牌！');
                                        return [handCards[0]];
                                    }else{
                                        console.log(' AI1压制农民出牌！');
                                        return fCombo[fCombo.length - 1];
                                }
                                }else{
                                    console.log(' AI1压制农民出牌！');
                                    return fCombo[fCombo.length - 1];
                                }
                                
                                
                            }else{ //牌数量还多时的队友配合逻辑
                                
                                if(AIsmallCards.length >= 2 && fCombo[0][0].value >= 13){
                                    console.log('AI1剩余小牌：' + AIsmallCards + 'AI1战术性保存实力');
                                    return [handCards[0]];
                                }else{
                                    return fCombo[0];
                                }
                            }
                        }

                        if(playerId === 2){
                            if(isLandlord && (p1HandCardsLen <= 3 || p2HandCardsLen <= 3)){
                                
                                if(p1HandCardsLen !== 1 && p2HandCardsLen !== 1 ){
                                    if(AIsmallCards >= 2 && fCombo[fCombo.length - 1][0].value >= 14){
                                        console.log('AI2尽可能清理手中小牌！');
                                        return [handCards[0]];
                                    }else{
                                        console.log(' AI2压制农民出牌！');
                                        return fCombo[fCombo.length - 1];
                                }
                                }else{
                                    console.log(' AI2压制农民出牌！');
                                    return fCombo[fCombo.length - 1];
                                }
                            }else{  //牌数量还多时的队友配合逻辑
                                if(AIsmallCards.length >= 2 && fCombo[0][0].value >= 13){
                                    console.log('AI2剩余小牌：' + AIsmallCards + 'AI2战术性保存实力');
                                    return [handCards[0]];
                                }else{
                                    return fCombo[0];
                                }
                            }
                        }

                    }
                }else{
                    if(playerId === 1){
                        if(isLandlord && (p1HandCardsLen <= 3 || p3HandCardsLen <= 3)){
                            if(p1HandCardsLen !== 1 && p3HandCardsLen !== 1){
                                if(AIsmallCards >= 2){
                                    console.log('AI1地主尽可能清理手中小牌！');
                                    return [handCards[0]];
                                }else{
                                    console.log(' AI1压制农民出牌！');
                                    return [handCards[handCards.length - 1]];
                                }
                            }else{
                                console.log(' AI1压制农民出牌！');
                                return [handCards[handCards.length - 1]];
                            }
                        }else{
                            if(landordHandCards.length <= 3 || p2HandCardsLen < 3){
                                if(landordHandCards.length !== 1 && AIsmallCards >= 2){
                                    console.log('AI1尽可能清理手中小牌！');
                                    return [handCards[0]];
                                }else{
                                    console.log('AI1压制地主出牌！');
                                    return [handCards[handCards.length - 1]];
                                }
                                
                            }else{
                                return [handCards[0]];
                            }
                        }
                    }

                    if(playerId === 2){
                        if(isLandlord && (p1HandCardsLen <= 3 || p2HandCardsLen <= 3)){
                            if(p1HandCardsLen !== 1 && p2HandCardsLen !== 1){
                                if(AIsmallCards >= 2){
                                    console.log('AI2地主尽可能清理手中小牌！');
                                    return [handCards[0]];
                                }else{
                                    console.log(' AI2压制农民出牌！');
                                    return [handCards[handCards.length - 1]];
                                }
                            }else{
                                console.log(' AI2压制农民出牌！');
                                return [handCards[handCards.length - 1]];
                            }
                        }else{
                            if(landordHandCards.length <= 3 || p3HandCardsLen < 3 ){
                                if(landordHandCards.length !== 1 && AIsmallCards >= 2){
                                    console.log('AI2尽可能清理手中小牌！');
                                    return [handCards[0]];
                                }else{
                                    console.log('AI2压制地主出牌！');
                                    return [handCards[handCards.length - 1]];
                                }
                            }else{
                                return [handCards[0]];
                            }
                        }
                    }
                }
                return [handCards[0]];
        }

        

        var biggerCombos = this.getSameTypeBigger(handCards,lastType);
        var sorted = this.sortCombosByValue(biggerCombos);

        if (biggerCombos.length > 0) {
            if(playerId === 1){
                if(p1HandCardsLen <= 3 || p3HandCardsLen <= 3){
                    if(isLandlord || lastIsLandlord){
                        console.log('AI1压制式出牌！');
                        return sorted[sorted.length - 1];
                        }else{
                            if(p2HandCardsLen <= (sorted[0].length + 1)){
                                return sorted[0];
                            }else{
                                console.log('AI1队友让行！');
                                return [];
                            }
                        }
                    }else{
                        if (isLandlord) {
                            const landlordSmallCards = this.players[playerId].handCards.filter(c => c.value <= 10);
                            console.log('AI地主剩余小牌数量：' + landlordSmallCards.length);
                            if(landlordSmallCards.length >= 1 && sorted[0][0].value >= 14){
                                if((playerHasKing1 || playerHasKing2) && sorted[0][0].value === 14 && sorted[0].length === 1){
                                    console.log('AI1诱导玩家打出大小王');
                                    return sorted[0];
                                }else{
                                    console.log('AI1战术性保存实力');
                                    return [];
                                }
                                
                            }else{
                                return sorted[0];
                            }
                        }else {
                            if(lastIsLandlord) {
                                console.log('AI1剩余小牌数量：' + AIsmallCards.length);
                                if(AIsmallCards.length >= 2 && sorted[0][0].value >= 14){
                                    if(this.players[0].isDZ && (playerHasKing1 || playerHasKing2) && sorted[0][0].value === 14 && sorted[0].length === 1){
                                        console.log('AI1诱导玩家打出大小王');
                                        return sorted[0];
                                    }else{
                                        console.log('AI1战术性保存实力');
                                        return [];
                                    }
                                }else{
                                    return sorted[0];
                                }
                            }else{
                                if(landordHandCards.length <= 3 ){
                                
                                    if(sorted[0].length === cardLen){
                                        return sorted[0];
                                    }else {
                                        if(this.lastPlayedCards[0].value <= 10 && friend.handCards.length >= (sorted[0].length + 1)){
                                            console.log('AI1队友支援！')
                                            return sorted[0];
                                        }else{
                                            console.log('AI1队友让行！');
                                            return [];
                                        }
                                    }
                                }else{
                                    if(this.lastPlayedCards[this.lastPlayedCards.length - 1].value >= 12 || sorted[0][0].value >= 12){
                                        console.log('AI1队友让行！');
                                        return [];
                                    }else{
                                        console.log('农民配合式出牌');
                                        return Math.random() > 0.05 ? sorted[0] : [];
                                    }
                                }
                            }
                            
                        }
                    }
                }

            if(playerId === 2){
                if(p1HandCardsLen <= 3 || p2HandCardsLen <= 3){
                    if(isLandlord || lastIsLandlord){
                        console.log('AI2压制式出牌！');
                        return sorted[sorted.length - 1];
                        }else{
                            if(p3HandCardsLen <= (sorted[0].length + 1)){
                                return sorted[0];
                            }else{
                                console.log('AI2队友让行！');
                                return [];
                            }
                        }
                    }else{
                        if (isLandlord) {
                            const landlordSmallCards = this.players[playerId].handCards.filter(c => c.value <= 10);
                            console.log('AI地主剩余小牌数量：' + landlordSmallCards.length);
                            if(landlordSmallCards.length >= 1 && sorted[0][0].value >= 14){
                                if((playerHasKing1 || playerHasKing2) && sorted[0][0].value === 14 && sorted[0].length === 1){
                                    console.log('AI2诱导玩家打出大小王');
                                    return sorted[0];
                                }else{
                                    console.log('AI2战术性保存实力');
                                    return [];
                                }
                            }else{
                                return sorted[0];
                            }
                        }else {
                            if(lastIsLandlord) {
                                
                                console.log('AI2剩余小牌数量：' + AIsmallCards.length);
                                if(AIsmallCards.length >= 2 && sorted[0][0].value >= 14){
                                    if(this.players[0].isDZ && (playerHasKing1 || playerHasKing2) && sorted[0][0].value === 14 && sorted[0].length === 1){
                                        console.log('AI2诱导玩家打出大小王');
                                        return sorted[0];
                                    }else{
                                        console.log('AI2战术性保存实力');
                                        return [];
                                    }
                                }else{
                                    return sorted[0];
                                }
                            }else{
                                if(landordHandCards.length <= 3 ){
                                
                                    if(sorted[0].length === cardLen){
                                        return sorted[0];
                                    }else {
                                        if(this.lastPlayedCards[0].value <= 10 && friend.handCards.length >= (sorted[0].length + 1)){
                                            console.log('AI2队友支援！');
                                            sorted[0];
                                        }else{
                                            console.log('AI2队友让行！');
                                            return [];
                                        }
                                    }
                                }else{
                                    if(this.lastPlayedCards[this.lastPlayedCards.length - 1].value >= 12 || sorted[0][0].value >= 12){
                                        console.log('AI2队友让行！');
                                        return [];
                                    }else{
                                        console.log('农民配合式出牌');
                                        return Math.random() > 0.05 ? sorted[0] : [];
                                    }
                                }
                            }
                            
                        }
                    }
                }
                    
            }


        const [kingBomb, ...bombs] = this.getBombCards(handCards);

        if(isLandlord){
            if(kingBomb && (p1HandCardsLen <= 1 || p2HandCardsLen <= 1 || p3HandCardsLen <= 1 || playerHandCardType !== '无效牌型')){
                console.log('AI打出王炸！');
                return kingBomb;
            }
        }else{
            if(kingBomb && this.analyzeCardType(landordHandCards).type !== '无效牌型' && lastIsLandlord){
                console.log('AI打出王炸！');
                return kingBomb;
            }
        }

        const hasBomb = bombs.length > 0;
        const minBomb = bombs[0] || [];

        if (hasBomb && lastType.type !== '火箭' && lastType.type !== '炸弹') {
            if (isLandlord || (lastIsLandlord && lastType.value >= 10)) 
                if(minBomb !== kingBomb){
                    console.log('AI打出炸弹！');
                    return minBomb;
                }else{
                    return [];
                }
        }

        

        return [];
    },

  getAllCardCombos: function(handCards){
        const self = this;
        const combos = [];

        const MAX_COMBOS = 50; //最大牌面组合数
        const MAX_STRAIGHT_LEN = 8;

        const valueGroups = this.getCardValueGroups(handCards);
        const sortedVals = Object.keys(valueGroups).map(Number).sort((a,b) => a - b);
        const singleVals = [...new Set(handCards.map(c => c.value))].filter(v => v >= 2 && v <=14).sort((a,b)=>a-b);

        for (let i = 0; i < singleVals.length-4 && combos.length < MAX_COMBOS; i++) {
            let straightVals = [singleVals[i]];
            for (let j=i+1; j<singleVals.length; j++) {
                if (singleVals[j] - singleVals[j-1] === 1) {
                    straightVals.push(singleVals[j]);
                } else {
                    break;
                }
            }
            const maxLen = Math.min(straightVals.length, MAX_STRAIGHT_LEN);
            for (let len=5; len<=maxLen && combos.length < MAX_COMBOS; len++) {
                const subVals = straightVals.slice(0, len);
                const straightCards = subVals.map(v => handCards.find(c => c.value === v));
                combos.push(straightCards);
            }
        }

        sortedVals.forEach(v => {
            if (combos.length >= MAX_COMBOS) return combos.filter(cards => self.analyzeCardType(cards).valid);
            if (valueGroups[v].length >= 2) {
                combos.push(valueGroups[v].slice(0, 2));
            }
        });

        for (let i = 0; i < sortedVals.length - 2 && combos.length < MAX_COMBOS;i++) {
            let temp = [sortedVals[i]];
            for (let j = i + 1; j < sortedVals.length; j++) {
                if (sortedVals[j] - sortedVals[j-1] === 1 && sortedVals[j] <= 14 && valueGroups[sortedVals[j]].length >= 2) {
                    temp.push(sortedVals[j]);
                } else {
                    break;
                }
            }
            if (temp.length >= 3) {
                const pairCards = temp.flatMap(v => valueGroups[v].slice(0, 2));
                combos.push(pairCards);
            }
        }

        sortedVals.forEach(v => {
            if (combos.length >= MAX_COMBOS) return combos.filter(cards => self.analyzeCardType(cards).valid);
            if (valueGroups[v].length >= 3) {
                combos.push(valueGroups[v].slice(0, 3));
            }
        });

        sortedVals.forEach(v => {
            if (combos.length >= MAX_COMBOS) return combos.filter(cards => self.analyzeCardType(cards).valid);
            if (valueGroups[v].length >= 3) {
                const threeCards = valueGroups[v].slice(0, 3);
                const singleCard = sortedVals.find(val => val !== v && valueGroups[val].length >= 1);
                if (singleCard) {
                    combos.push([...threeCards, valueGroups[singleCard][0]]);
                }
            }
        });

        sortedVals.forEach(v => {
            if (combos.length >= MAX_COMBOS) return combos.filter(cards => self.analyzeCardType(cards).valid);
            if (valueGroups[v].length >= 3) {
                const threeCards = valueGroups[v].slice(0, 3);
                const pairVal = sortedVals.find(val => val !== v && valueGroups[val].length >= 2);
                if (pairVal) {
                    combos.push([...threeCards, ...valueGroups[pairVal].slice(0, 2)]);
                }
            }
        });

        for (let i = 0; i < sortedVals.length - 1; i++) {
            if (combos.length >= MAX_COMBOS) return combos.filter(cards => self.analyzeCardType(cards).valid);
            let tempThree = [sortedVals[i]];
            for (let j = i + 1; j < sortedVals.length; j++) {
                if (sortedVals[j] - sortedVals[j-1] === 1 && sortedVals[j] <= 14 && valueGroups[sortedVals[j]].length >= 3) {
                    tempThree.push(sortedVals[j]);
                } else {
                    break;
                }
            }
            if (tempThree.length >= 2) {
                const planeCards = tempThree.flatMap(v => valueGroups[v].slice(0, 3));
                combos.push(planeCards);
            }
        }

        return combos.filter(cards => self.analyzeCardType(cards).valid);
    },

    getSameTypeBigger: function(handCards,lastType){
        if (!lastType.valid || lastType.type === '火箭') return [];
            const self = this;
            const allCombos = [...this.getAllCardCombos(handCards)];
            handCards.forEach(c => allCombos.push([c]));
            const lastValidCards = [...this.lastPlayedCards]; //this.lastPlayedByPlayer.flat();
            return allCombos.filter(cards => {
            const curType = self.analyzeCardType(cards);
            return curType.valid && curType.type === lastType.type && cards.length === lastValidCards.length && curType.value > lastType.value;
        });
    },

    sortCombosByValue: function(combos){
        const self = this;
        return combos.sort((a,b) => {
            const aType = self.analyzeCardType(a);
            const bType = self.analyzeCardType(b);
            return aType.value - bType.value;
        });
    },

    getBombCards: function(handCards){
        const groups = this.getCardValueGroups(handCards);
        const bombs = [];
        Object.keys(groups).forEach(v => groups[v].length ===4 && bombs.push(groups[v]));
        const hasKing1 = handCards.some(c => c.value ===15);
        const hasKing2 = handCards.some(c => c.value ===16);
        if (hasKing1 && hasKing2) {
            const kingBomb = handCards.filter(c => c.value ===15 || c.value ===16);
            bombs.unshift(kingBomb);
        }
        return bombs.sort((a,b) => a[0].value - b[0].value);
    },

    getCardValueGroups: function(handCards){
        const groups = {};
        handCards.forEach(card => {
            if(!groups[card.value]) groups[card.value] = [];
            groups[card.value].push(card);
        });
        return groups;
    },



    gameOver: function(winnerId){
        this.gameState = 'idle';
        this.countPool = 0;
        const camp = this.players[winnerId].isDZ ? '地主' : '农民';
        var targetA = SceneManager._scene.children.find(s => s._cid === 1);
        var targetB = SceneManager._scene.children.find(s => s._cid === 2);
        let chips = $gameVariables.value(432);
        SceneManager._scene.removeChild(targetA);
        SceneManager._scene.removeChild(targetB);

        if(winnerId === 0){
            AudioManager.playSe({name:'Coin',volume:90,pan:0,pitch:100});
            if(this.players[0].isDZ){
                $gameParty.gainItem($dataItems[59], chips);
            }else{
                $gameParty.gainItem($dataItems[59], chips / 2);
            }
            
            this.updateTableCardUI(1,this.players[1].handCards);
            this.updateTableCardUI(2,this.players[2].handCards);

            this.players[1].handCards = [];
            this.players[2].handCards = [];
            this.updateAICardUI();
        }

        if(winnerId === 1){
            if(!this.players[0].isDZ && !this.players[1].isDZ){
                AudioManager.playSe({name:'Coin',volume:90,pan:0,pitch:100});
                $gameParty.gainItem($dataItems[59], chips / 2);
            }
            this.updateTableCardUI(2,this.players[2].handCards);

            this.players[2].handCards = [];
            this.updateAICardUI();
        }

        if(winnerId === 2){
            if(!this.players[0].isDZ && !this.players[2].isDZ){
                AudioManager.playSe({name:'Coin',volume:90,pan:0,pitch:100});
                $gameParty.gainItem($dataItems[59], chips / 2);
            }
            this.updateTableCardUI(1,this.players[1].handCards);

            this.players[1].handCards = [];
            this.updateAICardUI();
        }

        this.players.forEach(player => {
            player.handCards = [];
            player.selectedCards = [];
            isDZ = false;
            isTurn = false;
        });

        console.log(camp + '获得本局游戏的胜利！');
        $gameMessage.add(this.players[winnerId].name + '(' + camp + ')' + '获得本局游戏的胜利！');

        //for (let i=100; i<550; i++) $gameScreen.erasePicture(i);
        $gameVariables.setValue(432,0);
        $gameSwitches.setValue(493,true);
    },

    restart: function(){ //重启游戏
        //for (let i=100; i<550; i++) $gameScreen.erasePicture(i);
        //this.resetGameData();
        $gameSwitches.setValue(493,false);
        this.start();
    }
}

