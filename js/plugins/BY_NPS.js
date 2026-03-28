//==================================原插件信息=================================
// XueYu Plugins - Gif
// AXY_Gif.js
// Version: 1.0
// License: BSD
//=============================================================================
//===============================二次修改：不语_CR=============================
//
 /*:
 * @plugindesc v3.0.1 图片、文字、动画等自由显示
 * @author 【不语_CR 】【原作者：XueYu】
 *
 * @param ----基本参数设置----
 * @default
 *
 * @param 分辨率宽度
 * @parent ----基本参数设置----
 * @param resWidth
 * @parent ----基本参数设置----
 * @desc 此插件显示的效果会根据此分辨率自动调整大小，默认1280
 * @default 1280
 *
 * @param 分辨率高度
 * @parent ----基本参数设置----
 * @param resHeight
 * @parent ----基本参数设置----
 * @desc 此插件显示的效果会根据此分辨率自动调整大小，默认720
 * @default 720
 *
 * @param path
 * @parent ----基本参数设置----
 * @desc 文件路径
 * @default img/nps/
 *
 * @param ----图片----
 * @default
 *
 * @param 锚点（原点）
 * @parent ----图片----
 * @param Anchor
 * @parent ----图片----
 * @desc 图片的原点  topleft/center
 * @default topleft
 *
 * @param X
 * @parent ----图片----
 * @desc The x position of img. this is a eval param, so you can use Variables.
 * img的x位置。这是一个eval参数，所以可以使用变量
 * @default Graphics.width/2
 *
 * @param Y
 * @parent ----图片----
 * @desc The y position of img. this is a eval param, so you can use Variables.
 * @default Graphics.height/2-90
 *
 * @param Width
 * @parent ----图片----
 * @desc The img width with % percent or px. img宽度的百分比或px。
 * @default 100%
 *
 * @param Height
 * @parent ----图片----
 * @desc The img height with % percent or px.
 * @default 100%
 *
 * @param opacity
 * @parent ----图片----
 * @desc  图片的不透明度。0 - 1
 * @default 1
 *
 * @param zIndex
 * @parent ----图片----
 * @desc The css zIndex.
 * @default 10000
 *
 * @param 改变（一般用于旋转）
 * @parent ----图片----
 * @param transform
 * @parent ----图片----
 * @desc 可用脚本 $gameTemp._DXXtransform = "rotate(0deg)"; 修改。
 * @default rotate(0deg)
 *
 * @param 延时
 * @parent ----图片----
 * @param delay
 * @parent ----图片----
 * @desc The Img life time. set to 0 to disable. unit is microseconds. 
 * Img的使用寿命。设置为0禁用。单位是微秒。
 * @default 0
 *
 *
 * @param ----Animation 动画----
 * @default
 *
 * @param Animation
 * @parent ----Animation 动画----
 * @type struct<Animation>[]
 * @default []
 * @desc 动画设置
 *
 *
 *
 *
 * @help
 * 简介
 * 这个插件能在游戏任何地方显示文字、图片、图片血条、动画，并且可以在游戏过程中移动和改变
 * 插件前置条件：
 *              游戏需要安装 jquery 类库，可以上网搜，也可以拿实例工程里面的。
 * 类库的安装方法：
 *              1、在js文件夹里，放置jquery类库文件，例如实例里面的，jquery-3.1.1.min.js
 *              2、用记事本或其他代码编辑软件，打开index.html文件，在里面添加以下代码，具体位置，可参考实例。
 *                <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
 * 
 *
 * 注意：以下命令需写在MV脚本里（插件指令的上面那个选项）
 *
 *
 * 2020-10-10（版本1.0.0）   图片、文字、动画等自由显示 
 * 2020-10-11（版本1.1.0）   新增动画帧数由变量来指定的功能
 * 2020-10-15（版本1.2.0）   1、新增文本阴影，使文字更贴合MV自带文字。2、修复HPui大小设置问题
 * 2020-10-24（版本1.3.0）   调整hui，实现不规则进度条
 * 2020-11-18（版本1.3.1）   移动图片 增加移动时长与图片改变
 * 2020-11-23（版本1.3.2）   移动图片 新增位置不变 只替换图片的功能
 * 2020-12-03（版本1.3.3）   移动图片 新增图片镜像变幻功能
 * 2020-12-08（版本2.0.0）   新增图片点击与触摸事件，新增文字点击与触摸事件
 * 2020-12-17（版本2.0.1）   新增图片事件交互禁用（用于一些遮罩图片的显示）
 * 2020-12-24（版本2.1.0）   新增显示跟随屏幕自动缩放功能、修改部分BUG
 * 2020-01-01（版本3.0.0）   新增滚动窗口创建、修复屏幕缩放事件丢失、修改鼠标触摸默认事件、增加设置所有元素透明度功能
 * 2020-01-16（版本3.0.1）   修复默认鼠标触碰效果闪烁问题、修复图片显示小几率错位bug、新增Hui根据脚本显示数值
 * 
 *-------------------------------------------图片----------------------------------------------
 * 显示图片:
 * BY_NPS.show({filename:'1.gif'});
 * BY_NPS.show({filename:'url=img/faces/Actor1.png'});
 * BY_NPS.show({filename:'1.gif',id:2});
 * BY_NPS.show({id:3,filename:'1.gif',delay:3000});
 * BY_NPS.show({x:0, y:0, align:'topleft', filename:'url=http://www.yourdomain.com/gif.jpg'});
 * 
 *
 * 以下是所有默认参数:
 * BY_NPS.show({x:0, y:0, align:'topleft', filename:'1.gif',id:1,delay:0,width:'100%',height:'100%',opacity:1,zIndex:1,NoEvent:true});
 *  NoEvent: 若为true 则禁用事件交互 
 * 
 * 移动图片:
 * BY_NPS.move(id,x,y,delay,filename,transform);
 * 范例：BY_NPS.move(1,50,50); 将图片1移动到50,50,持续默认时间（0.01秒）
 *       BY_NPS.move(1,50,50,500,"hhh.png"); 将图片1移动到50,50,持续0.5秒,并改变成hhh图片
 *       BY_NPS.move(1,"old","old",500,"hhh.png");将图片的位置保持不变,持续0.5秒,图片变成hhh图片
 *       BY_NPS.move(1,"old","old",500,"hhh.png","rotateY(180deg)");将图片的位置保持不变,持续0.5秒,图片变成hhh图片,图片水平镜像翻转
 *
 * 根据id移除图片:
 * BY_NPS.remove(id);
 *
 * 移除所有图片:
 * BY_NPS.removeall();
 *
 * 图片触摸执行方法 
 * BY_NPS.PicMOnEndOff(id, BYeventON, BYeventOff);
 * id：图片的id
 * BYeventON： 鼠标移动到图片时，触发的方法，
 *              若为空，则执行默认方法；
 *              若为大于1的数字，则执行公共事件,这里的数字为公共事件的id
 *              若想要执行其他指定方法，则需要加上""； 例："BY_NPS.remove(1)" 执行移除1号图片方法
 * BYeventOff：鼠标离开图片时，触发的方法，用法与上面相同。
 *
 * 范例：BY_NPS.PicMOnEndOff(1);        创建1号图片触摸方法，并使用默认方法
 *       BY_NPS.PicMOnEndOff(1,3,4);    创建1号图片触摸方法，鼠标移动到上方时，执行公共事件3，离开时执行公共事件4
 *       BY_NPS.PicMOnEndOff(1,"BY_NPS.move(1,50,50)","BY_NPS.remove(1)");    创建1号图片触摸方法，鼠标移动到上方时，移动图片1到坐标50,50，离开时删除图片1
 *
 * 图片按下时执行方法 
 * BY_NPS.PicMdown(id, BYevent); 
 * BYevent： 与上面触摸方法用法相同
 * 
 * 图片放开时执行方法 
 * BY_NPS.PicMup(id, BYevent);
 *
 *
 *--------------------------------------------文字---------------------------------------------
 * 显示文字：
 * BY_NPS.showtext({x:500, y:500, id:50, content:'你好吗', color:'#000000', size:10, AutoChange:1});
 * 注：若使用了变量做为文字显示的内容，并且想实时改变，则需要加上AutoChange参数
 * AutoChange:1 1为变量的编号  
 *
 * 改变文字
 * BY_NPS.changetext(id,x,y,concent,size,color);
 * 注：这里的参数需要按照固定的顺序，若参数无需改动，可设置为0，或者不写
 * 例：BY_NPS.changetext(1,100,250,"改变内容",2,'#00FFFF');
 * 
 * 移除文字
 * BY_NPS.removetext(id);
 *
 * 移除所有文字
 * BY_NPS.removealltext();
 *
 * 文字触摸时执行方法 
 * BY_NPS.TextMOnEndOff(id, BYeventON, BYeventOff);
 * 
 * 文字按下执行方法 
 * BY_NPS.TextMdown(id, BYevent);
 * 
 * 文字放开执行方法 
 * BY_NPS.TextMup(id, BYevent);
 *---------------------------------------------动画----------------------------------------------
 * 显示动画：
 * BY_NPS.showAnimation({x:50,y:50,aid:0,id:1,delay:-1});
 * 参数解析：
 * id：动画的id，用于标识移动、移除
 * x：屏幕的x坐标
 * y：屏幕的y坐标
 * aid：动画数组中的id，通常从0开始，根据在插件参数中设置的数组，指定显示哪个动画
 * align：对齐方式，决定动画的原点的位置，默认为左上角，可用的参数：topleft  、 center
 * delay：-1    无限循环显示动画
 *        0    显示1次动画
 *       >1    限时显示动画
 *
 * 移动动画：
 * BY_NPS.moveAin(id,x,y,delay);
 * 注：此处的delay为移动的时间，默认为100
 * 例：BY_NPS.moveAin(1,80,80);
 *
 * 移除动画：
 * BY_NPS.removeAin(id,delay);
 * 注：此处的delay为消失的时间，默认为10
 * 例：BY_NPS.removeAin(1);
 *
 * 移除所有动画：
 * BY_NPS.removeallAin();
 *
 *
 *--------------------------------------------艺术数字------------------------------------
 * 显示艺术数字：
 * BY_NPS.showPicText({id:id, x:0, y:20, textw:16, texth:25, size:0.75, filename:"white1625.png", content:content, uijd:uijd, Adjust:1});
 * textw:图片里单个文字宽度
 * texth:图片里单个文字高度
 * size:  尺寸（与文字宽度高度搭配使用）默认1
 * filename:  图片名称，带后缀。图片内容：包含123456789+-./%
 * content：文字内容
 * uijd：UI角度，包含left \ right \ down \ up  默认为left
 * Adjust： 1或0 默认0 是否自动调整大小
 *
 * 改变艺术数字
 * BY_NPS.changePicText({id:1,content:'345.45%'});
 *
 * 移动艺术数字
 * BY_NPS.movePicText({id:1,x:0,y:85,delay:1000});
 *
 * 移除艺术数字
 * BY_NPS.removePicText(id);
 *
 * 移除所有艺术数字
 * BY_NPS.removeallPicText();
 *
 *
 *-------------------------------------------HPUI-----------------------------------------
 * 显示HPUI:
 * BY_NPS.showHPui({id:1, x:0, y:0, filename1:"hp01v.png", filename2:"hp01w.png", Pwidth:225, Pheight:40, uijd:"left", Vmax:2, Vnow:3 });
 * filename1: HPUI内容的图片名称
 * filename2：HPUI底框的图片名称
 * Pwidth:显示的宽度
 * pheight:显示的长度
 * uijd：显示角度，参数有：left 、 right 、 down 、up 默认为left
 * Vmax：UI满值，以HP为例，则这里的数值为 HPmax。注意：这里代入的是变量，只能填变量编号，默认为变量2
 * Vnow：UI现值，以HP为例，则这里的数值为 HPnow。注意：这里代入的是变量，只能填变量编号，默认为变量3
 * ps：上面变量的值一定要是数字，否则会出错;
 *     HPUI会根据设置的变量，进行实时变化，无需手动设置。
 *	
 * 移动HPUI：
 * BY_NPS.moveHPui(id,x,y,delay);
 *
 * 移除HPUI:
 * BY_NPS.removeHPui(id);
 *
 * 移除所有HPUI：
 * BY_NPS.removeallHPui();
 *
 *
 *========================================================================
 */
 /*~struct~Animation:
 * @param id
 * @desc 动画的调用id，从0开始
 * @type Number
 * @default 0
 *
 * @param pic
 * @desc 动画的图片文件名，包含后缀，例：animation0.png
 * @type String
 * @default animation0.png
 *
 * @param picsize
 * @desc 显示的动画的帧图片大小，例：512*512图片，里面每一帧的动画大小是128，则此处数值为128
 * @type Number
 * @default 128
 *
 * @param picw
 * @desc 图片的宽度是由多少个帧动画组成，例：512*512图片，帧动画大小为128，则此处数值为4
 * @type Number
 * @default 4
 *
 * @param pich
 * @desc 图片的高度是由多少个帧动画组成，例：512*512图片，帧动画大小为128，则此处数值为4
 * @type Number
 * @default 4
 * 
 * @param frameValue
 * @desc 指定变量作为动画帧数，可在游戏内自由调整动画帧数时常与停留时间，默认为0，设置的数值为变量编号
 * @type Number
 * @default 0
 *
 * @param frame
 * @desc 动画帧的设置，该值为一个数组，数组内的元素总数表示动画总帧数，每个元素表示每帧的停留时间
 * @type []
 * @default [150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150]
 *
 *
 *
*/

// Imported
var Imported = Imported || {};
Imported.BY_NPS = true;

// Parameter Variables
var BY = BY || {};
BY.NPS = BY.NPS || {};

BY.NPS.Parameters = PluginManager.parameters('BY_NPS');
BY.NPS.Param = BY.NPS.Param || {};

// 
BY.NPS.Param.Anchor = String(BY.NPS.Parameters['Anchor']);
BY.NPS.Param.X = String(BY.NPS.Parameters['X']);
BY.NPS.Param.Y = String(BY.NPS.Parameters['Y']);
BY.NPS.Param.Width = String(BY.NPS.Parameters['Width']);
BY.NPS.Param.Height = String(BY.NPS.Parameters['Height']);
BY.NPS.Param.opacity = parseFloat(BY.NPS.Parameters['opacity']);
BY.NPS.Param.zIndex = parseInt(BY.NPS.Parameters['zIndex']);
BY.NPS.Param.delay = parseInt(BY.NPS.Parameters['delay']);
BY.NPS.Param.path = String(BY.NPS.Parameters['path']);
BY.NPS.Param.resWidth = parseInt(BY.NPS.Parameters['resWidth']);
BY.NPS.Param.resHeight = parseInt(BY.NPS.Parameters['resHeight']);

BY.NPS.Param.Animation = Array(BY.NPS.Parameters['Animation']);

BY.NPS.Param.transform = String(BY.NPS.Parameters['transform']);

//-----------将动画字符串转换成数组------------------------
BY.NPS.getAnimationArray = function() {
    var ArrayString = BY.NPS.Param.Animation;
    // ArrayString = ArrayString[0].replace(/[\'\"\\\/\b\f\n\r\t]/g, ''); 
    if(ArrayString){
    	ArrayString = JSON.parse(ArrayString);
    	for(var i = 0; i< ArrayString.length; i++ ){
    		ArrayString[i] = JSON.parse(ArrayString[i]);
    		ArrayString[i].frame = JSON.parse(ArrayString[i].frame);
    	}
    }
    // console.log(ArrayString);    
    return ArrayString
  };
var AnimationArray = BY.NPS.getAnimationArray();

var Animationclear  = [];
var TextIdArray     = [];
var AutoTextIdArray = [];
var HPuiIdArray     = [];

var AllShowNow      = []; //创建所有当前显示内容数组
var TempShow        = false; 
//main
//NPS
BY_NPS = {
//=========================================================图片====================================	
	show: function () {
		//console.log(arguments[3]);
		var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
		var filename 	=	 BYNPSArgs['filename'] ? BYNPSArgs['filename'] : "";
		var delay	 	=	 BYNPSArgs['delay'] ? BYNPSArgs['delay'] : BY.NPS.Param.delay;
		var id			=	 BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var x			=	 BYNPSArgs['x'] != undefined ? BYNPSArgs['x'] : eval(BY.NPS.Param.X);
		var y			=	 BYNPSArgs['y'] != undefined ? BYNPSArgs['y'] : eval(BY.NPS.Param.Y);
		var width		=	 BYNPSArgs['width'] ? BYNPSArgs['width'] : BY.NPS.Param.Width;
		var height		=	 BYNPSArgs['height'] ? BYNPSArgs['height'] : BY.NPS.Param.Height;
		var opacity		=	 BYNPSArgs['opacity'] ? BYNPSArgs['opacity'] : BY.NPS.Param.opacity;
		var align		=	 BYNPSArgs['align'] ? BYNPSArgs['align'] : BY.NPS.Param.Anchor;
		var transform   =    BYNPSArgs['transform'] ? BYNPSArgs['transform'] :  "rotate(0deg)";
        var zIndex      =    BYNPSArgs['zIndex'] ? BYNPSArgs['zIndex'] : BY.NPS.Param.zIndex;
        var NoEvent     =    BYNPSArgs['NoEvent'] ? BYNPSArgs['NoEvent'] : false;
		
		if(!TempShow){
		    var addShowArray = {BYtype:"pic", filename:filename, delay:delay, id:id, x:x, y:y, width:width, height:height, opacity:opacity, align:align, transform:transform, zIndex:zIndex, NoEvent:NoEvent};
	    	AllShowNow.push(addShowArray);//当前显示元素数组添加
	    	// console.log(AllShowNow);
        }

		if(filename.indexOf('url=') != -1){
			filename = filename.replace('url=', '');
		}
		else{
			filename = BY.NPS.Param.path + filename;
		}
		// if($("#BYNPS"+id)[0]){console.log("此图片id已存在");}
		
		var BYNPSEntity;
		var BYNPSTemplate = '<div id="BYNPS'+id+'" class="BYNPS" width=1600 height=900 style="visibility:hidden;position:fixed;left:0px;top:0px;transform:'+transform+';z-index:'+
		zIndex+';"><img src="'+filename+'" style="width:'+width+';height:'+height+';opacity:'+opacity+';" /></div>';

		BYNPSEntity = $('body').append(BYNPSTemplate);
		// var compelOnload = $("#BYNPS"+id+" img")[0].onload();
		
		$("#BYNPS"+id+" img")[0].onload = function(){
			if(!$("#BYNPS"+id+" img")[0]){
				$("#BYNPS"+id).remove();
				console.log("图片加载失败");
				return;
			}
			if(align == 'center'){
				if(width.indexOf("px") != -1){
					var widthpx = width;
					var widthint = parseFloat(width);
				}
				else{
					if($("#BYNPS"+id+" img")[0].naturalWidth == "undefined"){
					   // console.log($("#BYNPS"+id+" img")[0]);
					   var widthint = width;
					}else{					   
					   var widthint = $("#BYNPS"+id+" img")[0].naturalWidth*parseFloat(width)/100;
					}                      
					var Wadj = BY_NPS.AdjustWidth(widthint);
					var widthpx = Wadj+'px';
					}

				if(height.indexOf("px") != -1){
					var heightpx = height;
					var heightint = parseFloat(height);
				}
				else{
					if($("#BYNPS"+id+" img")[0].naturalHeight  == "undefined"){
   					   var heightint = height;
					}else{
					   var heightint = $("#BYNPS"+id+" img")[0].naturalHeight*parseFloat(height)/100;
					}
				    var Hadj = BY_NPS.AdjustHeight(heightint);
					var heightpx = Hadj+'px';
				}
				var imgx = widthint/2;
				var imgy = heightint/2;
				var divx = x-imgx;//*parseFloat(width)/100;				
				var divy = y-imgy;//*parseFloat(height)/100;

				divx = BY_NPS.AdjustX(divx);
				divy = BY_NPS.AdjustY(divy);

                // console.log("x:" + divx + " y:" + divy);
				$("#BYNPS"+id+" img").css({'width':widthpx,'height':heightpx});
				if(NoEvent){
                   $("#BYNPS"+id).css({'pointer-events':'none'});
				}
				$("#BYNPS"+id).css({left:divx+'px', top:divy+'px', visibility:'visible'});

			}
			else{
			var wint = $("#BYNPS"+id+" img")[0].naturalWidth * parseFloat(width)/100;			
			var hint = $("#BYNPS"+id+" img")[0].naturalHeight * parseFloat(height)/100;
			// console.log("w:" + wint + " h:" + hint);
			var w = BY_NPS.AdjustWidth(wint) + 'px';
			var h = BY_NPS.AdjustHeight(hint) + 'px';
			x = BY_NPS.AdjustX(x) + 'px';
			y = BY_NPS.AdjustY(y) + 'px';
			$("#BYNPS"+id+" img").css({'width':w,'height':h});
			if(NoEvent){
               $("#BYNPS"+id).css({'pointer-events':'none'});
			}
			$("#BYNPS"+id).css({left:x, top:y, visibility:'visible'});
			// console.log($("#BYNPS"+id));
		    }
		}

		if(delay>=1){
			setTimeout(function()
			{
				$("#BYNPS"+id).remove();
			}, 0); //delay
			this.removeAllShowArray("pic",id);//从数组中删除该元素
		}

	},
	remove: function () {
		var id			=	 arguments[0] ? arguments[0] : 1;
		// $("#BYNPS"+id+" img").animate({'opacity': '0'},100);
		$("#BYNPS"+id).stop().animate({"opacity": "0"},0, function() {
			$(this).remove();
		});
		this.removeAllShowArray("pic",id);//从数组中删除该元素
	},
	removeall: function () {
		$(".BYNPS").stop().animate({"opacity": "0"}, 0, function() {
			$(this).remove();
		});
		if(!TempShow){
			this.removeAllShowArray("pic","all");//从数组中删除该元素
        }

	},
	move: function () {
		var id	= arguments[0] ? arguments[0] : 1;
        var x1 = arguments[1];    
        var y1 = arguments[2];
        var sd = arguments[3] ? arguments[3] : 0;
        var Pic = arguments[4] ? arguments[4] : 0;
        var TForm = arguments[5] ? arguments[5] : null;
        // var align = arguments[5] ? arguments[5] : "lefttop";

        // if(align == "center"){       	
        // 	var picw = $("#BYNPS"+id+" img")[0].naturalWidth;
        // 	var pich = $("#BYNPS"+id+" img")[0].naturalHeight;
        // 	x1 = x1 - picw / 2;
        // 	y1 = y1 - pich / 2;
        // }
        this.changeSArraypic(id,x1,y1,Pic);//更改当前显示数组
        //----------判断x、y 坐标值是否不变------
        if(x1 == "old"){
            x1 = $("#BYNPS"+id)[0].style.left;
        }else{
        	x1 = BY_NPS.AdjustX(x1);
        	x1 = x1 + "px";
        }
		if(y1 == "old"){
            y1 = $("#BYNPS"+id)[0].style.top;
		}else{
			y1 = BY_NPS.AdjustY(y1);
			y1 = y1 + "px";
		}
        //----------判断x、y 坐标值是否不变-----
        if(Pic){
			if(Pic.indexOf('url=') != -1){
				Pic = Pic.replace('url=', '');
			}
			else{
				Pic = "img/nps/" + Pic;
			}       	
        	$("#BYNPS"+id+" img").attr('src', Pic);
        }
		$('#BYNPS'+id).animate({"left": x1, "top": y1},sd);
		if(TForm){
				$('#BYNPS'+id)[0].style.transform = TForm;
		}
	},
//=========================================================文字====================================	
	showtext: function () {
		var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
		var delay	 	=	 BYNPSArgs['delay'] ? BYNPSArgs['delay'] : BY.NPS.Param.delay;
		var id			=	 BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var x			=	 BYNPSArgs['x'] != undefined ? BYNPSArgs['x'] : 0;
		var y			=	 BYNPSArgs['y'] != undefined ? BYNPSArgs['y'] : 0;
		var opacity		=	 BYNPSArgs['opacity'] ? BYNPSArgs['opacity'] : BY.NPS.Param.opacity;
		var content		=	 BYNPSArgs['content'] ? BYNPSArgs['content'] : 0;
		var color		=	 BYNPSArgs['color'] ? BYNPSArgs['color'] : 'white';
		var size		=	 BYNPSArgs['size'] ? BYNPSArgs['size'] : 5;
		var zIndex		=	 BYNPSArgs['zIndex'] ? BYNPSArgs['zIndex'] : 10001;
		var AutoChange  =    BYNPSArgs['AutoChange'] ? BYNPSArgs['AutoChange'] : 0;
		var BYNPSEntity;
		//------------用于id判断，防止id重复错误-------------		
		if(TextIdArray.indexOf(id) == -1){
		   TextIdArray.push(id);
		}else{
			console.log("该文字id已存在");
			return;
		}

        if(!TempShow){
	        var addShowArray = {BYtype:"text", content:content, delay:delay, id:id, x:x, y:y, color:color, size:size, opacity:opacity, zIndex:zIndex, AutoChange:AutoChange};
		    AllShowNow.push(addShowArray);//当前显示元素数组添加
		    // console.log(AllShowNow);        	
        }

        if(AutoChange){
        	var inpush = {atid:id,valueid:AutoChange};
        	AutoTextIdArray.push(inpush);
        }
		var Wpanduan = (window.innerWidth / BY.NPS.Param.resWidth );
		Wpanduan = Wpanduan.toFixed(2);
        size = Math.round(size * Wpanduan);     
        size = size + "px";

		var BYNPSTemplate = '<div id="BYNPStext'+id+'" class="BYNPS" style="visibility:hidden;position:fixed;left:0px;top:0px;z-index:'+zIndex+';font-weight: 550;"><p id="BYtext'+id+'" style="font-size:'+size+'; color:'+color+';">'+content+'</p></div>';

		BYNPSEntity = $('body').append(BYNPSTemplate);	
		x = BY_NPS.AdjustX(x);
		y = BY_NPS.AdjustY(y);
		$("#BYNPStext"+id).css({left:x, top:y, visibility:'visible'});
		$("#BYNPStext"+id)[0].style.textShadow = "3px 3px 5px #000000";

		// $("#BYNPStext"+id).css({});

        if(AutoTextIdArray){
        	var act =  setTimeout(autoChangeText,0); //100
            function autoChangeText(){
           		if(AutoTextIdArray == null){return;}
                for(var i=0 ; i< AutoTextIdArray.length; i++ ){                	
                    var autoTextId = AutoTextIdArray[i].atid;
                    var newid = AutoTextIdArray[i].valueid
                    var newconcent = $gameVariables.value(newid);
                    if(TextIdArray[autoTextId] != -1){
                    	BY_NPS.changetext(autoTextId,0,0,newconcent);
                    }        
                }
           		var Ainf =  setTimeout(autoChangeText,0); //100
           }
        }
		if(delay>=1){
			setTimeout(function()
			{
				$('#BYNPStext'+id).remove();
			}, 0); //delay
			var Index = TextIdArray.indexOf(id);
			TextIdArray.splice(Index,1);
			for(var i=0 ; i< AutoTextIdArray.length; i++){
                if(AutoTextIdArray[i].atid == id){
                   AutoTextIdArray.splice(i,1);
                }
			}
			this.removeAllShowArray("text",id);//从数组中删除该元素
		}
	},
	changetext: function () {
		var id	= arguments[0] ? arguments[0] : 1;
        var x1 = arguments[1] ? arguments[1] : 0;        
        var y1 = arguments[2] ? arguments[2] : 0;
        var BYcontent = arguments[3] ? arguments[3] : 0;
        var BYsize = arguments[4] ? arguments[4] : 0;
        var BYcolor = arguments[5] ? arguments[5] : 0;
        if(TextIdArray.indexOf(id) == -1){ return; }
        this.changeSArraytext(id,x1,y1,BYcontent,BYsize,BYcolor);
        if(x1 > 0 || y1 > 0){
        	x1 = BY_NPS.AdjustX(x1);
		    y1 = BY_NPS.AdjustY(y1);
        	x1 = x1 + "px";
            y1 = y1 + "px";
        	$('#BYNPStext'+id).animate({left: x1, top: y1},0);
        }
        var oldSize = $('#BYNPStext'+ id + '>p')[0].style.fontSize;
        var oldColor = $('#BYNPStext'+ id + '>p')[0].style.color;
        var oldContent = $('#BYNPStext'+ id + '>p')[0].innerText;
        if(BYcontent == 0){ BYcontent = oldContent; }
        if(BYsize == 0){ BYsize = oldSize; }
        if(BYcolor == 0 ){ BYcolor = oldColor; }
		var Wpanduan = (window.innerWidth / BY.NPS.Param.resWidth );
		Wpanduan = Wpanduan.toFixed(2);
        BYsize = Math.round(BYsize * Wpanduan);
        BYsize = BYsize + "px";
        if(BYcontent || BYsize || BYcolor){
        	$('#BYNPStext'+ id + '>p')[0].style.fontSize = BYsize;
        	$('#BYNPStext'+ id + '>p')[0].style.color = BYcolor;
        	var NewText = '<font>'+BYcontent+'</font>';
        	$('#BYNPStext'+ id + '>p').html(NewText);
        }
	},
	removetext: function () {
		var id = arguments[0] ? arguments[0] : 1;
		var Index = TextIdArray.indexOf(id);
		TextIdArray.splice(Index,1);
		for(var i=0 ; i< AutoTextIdArray.length; i++){
            if(AutoTextIdArray[i].atid == id){
                AutoTextIdArray.splice(i,1);
            }
		}
		$('#BYNPStext'+id).stop().animate({"opacity": "0"},0, function() {
			$(this).remove();
		});
		this.removeAllShowArray("text",id);//从数组中删除该元素
	},
	removealltext: function () {
		$('.BYNPStext').stop().animate({"opacity": "0"}, 0, function() {
			$(this).remove();
		});
		TextIdArray = [];
        AutoTextIdArray = [];
        if(!TempShow){
           this.removeAllShowArray("text","all");//从数组中删除该元素
        }
	},
//=========================================================调整坐标（共用）====================================	
	AdjustWidth: function () {
        var Wself = arguments[0] ? arguments[0] : 1;
        var Wnow = parseInt(Graphics._canvas.style.width);
        var Wadjust = Wnow / BY.NPS.Param.resWidth * Wself ;
        Wadjust = Math.round(Wadjust);
        return  Wadjust;
	},
	AdjustHeight: function () {
        var Hself = arguments[0] ? arguments[0] : 1;
        var Hnow = parseInt(Graphics._canvas.style.height);
        var Hadjust = Hnow / BY.NPS.Param.resHeight * Hself ;
        Hadjust = Math.round(Hadjust);
        return  Hadjust;
	},
	AdjustX: function () {
        var Xself = arguments[0] ? arguments[0] : 1;
        var Wnow = parseInt(Graphics._canvas.style.width);
        var Winner = window.innerWidth;
        var Xadjust = Wnow / BY.NPS.Param.resWidth * Xself;
        if(Wnow != Winner){
           var Xpy = (Winner - Wnow) / 2;
           Xadjust = Xadjust + Xpy;
        }
        Xadjust = Math.round(Xadjust);
        return  Xadjust;
	},
	AdjustY: function () {
        var Yself = arguments[0] ? arguments[0] : 1; //当前值
        var Hnow = parseInt(Graphics._canvas.style.height);
        var Hinner = window.innerHeight;      
        var Yadjust = Hnow / BY.NPS.Param.resHeight * Yself;
        if(Hnow != Hinner){
        	var Ypy = (Hinner - Hnow) / 2 ;
        	Yadjust = Yadjust + Ypy;
        }
        Yadjust = Math.round(Yadjust);
        return  Yadjust;
	},
//=========================================================动画====================================	
	showAnimation: function () {
		var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
		var delay	 	=	 BYNPSArgs['delay'] ? BYNPSArgs['delay'] : BY.NPS.Param.delay;
		var id			=	 BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var aid         =	 BYNPSArgs['aid'];
		var x			=	 BYNPSArgs['x'] != undefined ? BYNPSArgs['x'] : eval(BY.NPS.Param.X);
		var y			=	 BYNPSArgs['y'] != undefined ? BYNPSArgs['y'] : eval(BY.NPS.Param.Y);
		var align		=	 BYNPSArgs['align'] ? BYNPSArgs['align'] : "topleft";
        //------------检测id是否重复并写入id----------
        for(var i = 0; i<Animationclear.length; i++){
            if(Animationclear[i].Aid == id){
        		console.log("该动画id已存在");
            	return;
            }
        }               
        //------------检测id是否重复并写入id----------

		if(!TempShow){
	        var addShowArray = {BYtype:"ani", aid:aid, delay:delay, id:id, x:x, y:y};
		    AllShowNow.push(addShowArray);//当前显示元素数组添加
		    // console.log(AllShowNow);
		}

		var AniArray   = AnimationArray;
        var divWoH     = AniArray[aid].picsize;
        var filename   = AniArray[aid].pic;
		var picw       = AniArray[aid].picw;
		var pich       = AniArray[aid].pich;
        var nowpw      = picw * 100;
		var nowph      = pich * 100;
		var Ainf       = AniArray[aid].frameValue;

		var AnId = {Aid:id, Ax:x, Ay:y, tid:aid, frameValue:Ainf}
        Animationclear.push(AnId);

		if(filename.indexOf('url=') != -1){
			filename = filename.replace('url=', '');
		}
		else{
			filename = BY.NPS.Param.path + "animation/" + filename;
		}

        if(align == "center"){
           x = x - divWoH / 2;
           y = y - divWoH / 2;
        }
        //------------------------自动调整显示大小------
        var xt = x;
        var yt = y;
        var divWoHt = divWoH;
        xt = BY_NPS.AdjustX(xt);
       	yt = BY_NPS.AdjustY(yt);
       	divWoHt = BY_NPS.AdjustX(divWoHt);
        //------------------------自动调整显示大小------

		var BYNPSEntity;
		var BYNPSTemplate = '<div id="BYanimation'+id+'" class="BYNPS" width='+divWoHt+' height='+divWoHt+' style="visibility:hidden;position:fixed;left:'+xt+'px;top:'+yt+'px;z-index:'+BY.NPS.Param.zIndex+';background:url('+filename+');background-repeat: no-repeat;width:'+divWoHt+'px; height:'+divWoHt+'px;background-size:'+nowpw+'% '+nowph+'% "></div>';
        
		BYNPSEntity = $('body').append(BYNPSTemplate);

		$("#BYanimation"+id).css({visibility:'visible'});

        var ainFrame = [];
        if(Ainf > 0 ){
            ainFrame = $gameVariables.value(Ainf);
        }else{
			ainFrame = AniArray[aid].frame;
        }

		if(ainFrame.length > 1){
           var len = ainFrame.length;
           var t1 =   ainFrame[0];
           var l = 0;
           var windex = 0;
           var hindex = 0;
           var Ainf =  setTimeout(fresh(),0); //delay
           // var text = divWoH;
           function fresh(){
           	l++
           	windex++
           	if(windex > picw-1){windex=0;hindex++;}
           	if(l >= len){l = 0;windex=0;hindex=0;}           	
           	var AIndex = -1;
	        for(var i = 0; i<Animationclear.length; i++){
	            if(Animationclear[i].Aid == id){
                	AIndex = i;
	            }
	        }
	        if(TempShow){return;}//自动刷新时关闭已有动画更新
           	if(AIndex == -1){return;}
           	//-------------修复移动动画后，动画返回原位问题---
            var mx = Animationclear[AIndex].Ax;
            var my = Animationclear[AIndex].Ay;
            //-------------修复移动动画后，动画返回原位问题---
           	var xA = BY_NPS.AdjustX(mx);
           	var yA = BY_NPS.AdjustY(my);
           	var wA = BY_NPS.AdjustWidth(divWoH);
           	var hA = BY_NPS.AdjustHeight(divWoH);
           	var xmove =  -1* windex * wA;
            var ymove =  -1* hindex * hA;
            var t2 = ainFrame[l]; 
            if(Animationclear[AIndex].frameValue > 0){
            	var fraId = Animationclear[AIndex].frameValue;
            	fraId = $gameVariables.value(fraId)
           		t2 = fraId[l];
           	}	
       		$("#BYanimation"+id).css({'background-position-x': xmove+'px', 'background-position-y': ymove+'px','left':xA +'px', 'top':yA +'px','width':wA +'px', 'height':hA +'px','background-size':nowpw+'%' +nowph+'%' });
           	// $("#BYanimation"+id).animate({'background-position-x': xmove+'px',}, 1000);
           	Ainf =  setTimeout(fresh,0); //t2
           }

		}

		if(delay >= 1){
			setTimeout(function()
			{
				$('#BYanimation'+id).stop().animate({"opacity": "0"},10);
				$('#BYanimation'+id).remove();
				//-------------------------删除已有动画id--------------
	        	for(var i = 0; i<Animationclear.length; i++){
		            if(Animationclear[i].Aid == id){
	                	var DeleAid = i;
		            }
		        }
		        Animationclear.splice(DeleAid,1);
		        this.removeAllShowArray("ani",id);//从数组中删除该元素
                //-------------------------删除已有动画id--------------
			}, 0); //delay
		}else if(delay == -1){
         return;
		}else{//自动播放1次动画
			var delay1 = 0;
			for(var i=0; i<ainFrame.length; i++){
                delay1 = delay1 + ainFrame[i];
			}
			setTimeout(function()
			{
				$('#BYanimation'+id).stop().animate({"opacity": "0"},10);
				$('#BYanimation'+id).remove();
				//-------------------------删除已有动画id--------------
	        	for(var i = 0; i<Animationclear.length; i++){
		            if(Animationclear[i].Aid == id){
	                	var DeleAid = i;
		            }
		        }
		        Animationclear.splice(DeleAid,1);
		        this.removeAllShowArray("ani",id);//从数组中删除该元素
                //-------------------------删除已有动画id--------------
			}, 0); //delay1
		}
	},
	removeAin: function () {
		var id = arguments[0] ? arguments[0] : 1;
		var delay = arguments[1] ? arguments[0] : 0;
		// $('#BYanimation'+id).css({'left':'-1000px', 'top':'-1000px'});
		$('#BYanimation'+id).stop().animate({"opacity": "0"},delay, function() {
			$(this).remove();
		});
		//-------------------------删除已有动画id--------------
        for(var i = 0; i<Animationclear.length; i++){
	        if(Animationclear[i].Aid == id){
                var DeleAid = i;
	        }
	    }
	    Animationclear.splice(DeleAid,1);
	    this.removeAllShowArray("ani",id);//从数组中删除该元素
        //-------------------------删除已有动画id--------------
	},
	moveAin: function () {
		var id	= arguments[0] ? arguments[0] : 1;
        var x1 = arguments[1] ? arguments[1] : 1;        
        var y1 = arguments[2] ? arguments[2] : 1;
        var delay = arguments[3] ? arguments[3] : 0;
        this.changeSArrayani(id,x1,y1);
        //------------------------改变移动后的动图x、y------------
       	for(var i = 0; i<Animationclear.length; i++){
            if(Animationclear[i].Aid == id){
               Animationclear[i].Ax = x1;
               Animationclear[i].Ay = y1;
            }
        }
		//------------------------改变移动后的动图x、y------------
		x1 = BY_NPS.AdjustX(x1);
		y1 = BY_NPS.AdjustY(y1);
        x1 = x1 + "px";
        y1 = y1 + "px";
		$('#BYanimation'+id).animate({left: x1, top: y1},delay);
	},
	removeallAin: function () {
		$('.BYanimation').stop().animate({"opacity": "0"}, 0, function() {
			$(this).remove();
			Animationclear = [];
		});
        if(!TempShow){
			this.removeAllShowArray("ani","all");//从数组中删除该元素
        }
	},
//=========================================================线条====================================	
	showLine: function () {
		//console.log(arguments[3]);
		var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
		var delay	 	=	 BYNPSArgs['delay'] ? BYNPSArgs['delay'] : BY.NPS.Param.delay;
		var id			=	 BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var aid         =	 BYNPSArgs['aid'];
		var x			=	 BYNPSArgs['x'] != undefined ? BYNPSArgs['x'] : eval(BY.NPS.Param.X);
		var y			=	 BYNPSArgs['y'] != undefined ? BYNPSArgs['y'] : eval(BY.NPS.Param.Y);
		// var w           =	 BYNPSArgs['w'];
		var LoR         =	 BYNPSArgs['LoR'];
		var align		=	 BYNPSArgs['align'] ? BYNPSArgs['align'] : BY.NPS.Param.Anchor;
		var transform   =    BYNPSArgs['transform'] ? BYNPSArgs['transform'] :  "rotate(0deg)";
		// console.log("x:" + x + " y:" + y);

		var LineArray  = [
		{id:0, pic:"HitS0.png", picw:20, pich:20},
		];

        var filename = LineArray[aid].pic;
		var picw = LineArray[aid].picw;
		var pich = LineArray[aid].pich;
		var fw = $gameVariables.value(24);
        var nowpw = picw / fw  * 100;
		var nowph = pich / fw  * 100;

		if(filename.indexOf('url=') != -1){
			filename = filename.replace('url=', '');
		}
		else{
			filename = BY.NPS.Param.path + filename;
		}

        if(align == "center"){
           // x = x - divWoH / 2;
           if(LoR == "left"){ y = y + pich / 2;}else{y = y - pich / 2;}
        } 
		x = BY_NPS.AdjustX(x);
		y = BY_NPS.AdjustY(y);
		picw = BY_NPS.AdjustWidth(picw);
        pich = BY_NPS.AdjustHeight(pich);

		var BYNPSEntity;
		var BYNPSTemplate = '<div id="BYline'+id+'" class="BYNPS" width='+picw+' height='+pich+' style="visibility:hidden;position:fixed;left:'+x+'px;top:'+y+'px;transform:'+transform+';transform-origin:left top; z-index:'+BY.NPS.Param.zIndex+';background:url('+filename+');background-repeat: no-repeat;width:'+picw+'px; height:'+pich+'px;background-size:'+nowpw+'% '+nowph+'% "></div>';

		BYNPSEntity = $('body').append(BYNPSTemplate);

		$("#BYline"+id).css({visibility:'visible'});

        $("#BYline"+id).css({'background-position-x': '0px', 'background-position-y': '0px'});
     
		if(delay>=1){
			setTimeout(function()
			{
				$('#BYline'+id).stop().animate({"opacity": "0"},10);
				$('#BYline'+id).remove();
			}, 0); //delay
		}
	},
	removeLine: function () {
		var id = arguments[0] ? arguments[0] : 1;
		// $('#BYanimation'+id).css({'left':'-1000px', 'top':'-1000px'});
		$('#BYline'+id).stop().animate({"opacity": "0"},500, function() {
			$(this).remove();
		});
	},
	moveLine: function () {
		var id	= arguments[0] ? arguments[0] : 1;
        var AR = arguments[1] ? arguments[1] : 0;
        var w1 = $gameVariables.value(24);
        w1 = w1 + AR;
        w1 = BY_NPS.AdjustWidth(w1);
      
        var nowpw = 100;
        var nowph = 100;

		$("#BYline"+id).css({width: w1 + 'px', "background-size":nowpw +'%' + nowph +'%' });
		// $("#BYline"+id).animate({width: w1 + 'px', "background-size":nowpw +'%' + nowph +'%' },1);
		// $('#BYline'+id).animate({width: w1},300);
		 // console.log($('#BYline'+id));
	},
	removeallLine: function () {
		$('.BYline').stop().animate({"opacity": "0"}, "fast", function() {
			$(this).remove();
		});
	},
//=========================================================HUI====================================	
	showHPui: function () {
		var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
		var filename 	=	 BYNPSArgs['filename1'] ? BYNPSArgs['filename1'] : "";
		var filename2 	=	 BYNPSArgs['filename2'] ? BYNPSArgs['filename2'] : "";
		var delay	 	=	 BYNPSArgs['delay'] ? BYNPSArgs['delay'] : BY.NPS.Param.delay;
		var id			=	 BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var x			=	 BYNPSArgs['x'] != undefined ? BYNPSArgs['x'] : eval(BY.NPS.Param.X);
		var y			=	 BYNPSArgs['y'] != undefined ? BYNPSArgs['y'] : eval(BY.NPS.Param.Y);
		var Pwidth      =    BYNPSArgs['Pwidth'] ? BYNPSArgs['Pwidth'] : 100;
		var Pheight     =    BYNPSArgs['Pheight'] ? BYNPSArgs['Pheight'] : 100;
		// var size		=	 BYNPSArgs['size'] ? BYNPSArgs['size'] : 1;
		var zIndex      =    BYNPSArgs['zIndex'] ? BYNPSArgs['zIndex'] : BY.NPS.Param.zIndex - 1;
		var Vmax		=	 BYNPSArgs['Vmax'] ? BYNPSArgs['Vmax'] : 2;
		var Vnow        =	 BYNPSArgs['Vnow'] ? BYNPSArgs['Vnow'] : 3;
        var uijd        =    BYNPSArgs['uijd'] ? BYNPSArgs['uijd'] : "left";
        var jd          =    "rotate(0deg)";   
		// var align		=	 BYNPSArgs['align'] ? BYNPSArgs['align'] : "topleft";
		// var transform   =    $gameTemp._DXXtransform ? $gameTemp._DXXtransform : BY.NPS.Param.transform;
		for(var i=0; i<HPuiIdArray.length; i++){
			if(HPuiIdArray[i].Hid == id){
	           //console.log("该HPUIid已经存在");
	           return;
			}
		}

		if(!TempShow){
	        var addShowArray = {BYtype:"Hui", filename1:filename, filename2:filename2, delay:delay, id:id, x:x, y:y, Pwidth:Pwidth, Pheight:Pheight, zIndex:zIndex, Vmax:Vmax, Vnow:Vnow, uijd:uijd};
		    AllShowNow.push(addShowArray);//当前显示元素数组添加
		    // console.log(AllShowNow);
		}

		var HpArray = {Hid:id, Vm:Vmax, Vn:Vnow};
		HPuiIdArray.push(HpArray);

		switch (uijd) 
		{ 
		  case 'left':jd="rotate(0deg)"; 
		  break; 
		  case 'right':jd="rotate(180deg)"; 
		  break; 
		  case 'up':jd="rotate(90deg)"; 
		  break; 
		  case 'down':jd="rotate(-90deg)"; 
		  break;
		}
		    
	    if(!filename){
            console.log("HPUI图1没有指定"); 
            return;
	    }
	    if(!filename2){
            console.log("HPUI图2没有指定"); 
            return;
	    }

		if(filename.indexOf('url=') != -1){
			filename = filename.replace('url=', '');
		}
		else{
			filename = BY.NPS.Param.path + "gaugeui/" + filename;
			filename2 = BY.NPS.Param.path + "gaugeui/" + filename2;
		}

		x = BY_NPS.AdjustX(x);
		y = BY_NPS.AdjustY(y);

		var HPwidth = BY_NPS.AdjustWidth(Pwidth);
        var HPheight = BY_NPS.AdjustHeight(Pheight);
        
        
		var BYNPSEntity;
		var BYNPSTemplate = '<div id="BYHPui'+id+'" class="BYNPS" width='+HPwidth+' height='+HPheight+' style="visibility:hidden;position:fixed;left:'+x+'px;top:'+y+'px;transform:'+jd+';transform-origin:top left ;z-index:'+zIndex+';background:url('+filename2+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px;background-size:'+100+'% '+100+'% "> <img id="BYHPuiimg'+id+'" src="'+filename+'" width="'+HPwidth+'" height="'+HPheight+'"style="visibility:visible;position:absolute" /></div>';
        
        // var BYNPSTemplate = '<div id="BYHPui'+id+'" class="BYHPui" width='+HPwidth+' height='+HPheight+' style="visibility:hidden;position:fixed;left:'+x+'px;top:'+y+'px;transform:'+jd+';transform-origin:top left ;z-index:'+zIndex+'><img src="'+filename+'" style="float:left; width:'+HPwidth+'px;height:'+HPheight+'px;opacity:visible;" /></div>';

		BYNPSEntity = $('body').append(BYNPSTemplate);
		$("#BYHPui"+id).css({visibility:'visible'});

		if(delay>=1){
			setTimeout(function()
			{
				$('#BYHPui'+id).stop().animate({"opacity": "0"},10);
				$('#BYHPui'+id).remove();
			}, 0); //delay
			this.removeAllShowArray("Hui",id);//从数组中删除该元素
		}    
        //----------------------------------自动更新HPui-----------
        var ahpui =  setTimeout(autoChangeHpui,0); //10
        function autoChangeHpui(){
           	if(HPuiIdArray == null){return;}
                for(var i=0 ; i< HPuiIdArray.length; i++ ){                	
                    var Hid  = HPuiIdArray[i].Hid;
                    var Vmax = HPuiIdArray[i].Vm;              
                    var Vnow = HPuiIdArray[i].Vn;
                    if(Vmax >= 1 ){
						Vmax = $gameVariables.value(Vmax);
                    }else{
                    	Vmax = eval(Vmax);
                    }
                    if(Vnow >= 1 ){
						Vnow = $gameVariables.value(Vnow);
                    }else{
                    	Vnow = eval(Vnow);
                    }
                    if(HPuiIdArray[i].Hid == Hid){
                    	BY_NPS.changeHPui(Hid,Vnow,Vmax);
                    }     
                }
           		 Ainf =  setTimeout(autoChangeHpui,0); // 原来的1000
        }
	},
	removeHPui: function () {
		var id = arguments[0] ? arguments[0] : 1;
		for(var i=0; i<HPuiIdArray.length; i++){
			if(HPuiIdArray[i].Hid == id){
				HPuiIdArray.splice(i,1);
			}
		}
		$('#BYHPui'+id).stop().animate({"opacity": "0"},0, function() {
			$(this).remove();
		});
		this.removeAllShowArray("Hui",id);//从数组中删除该元素
	},
	changeHPui: function (id,HPnow,HPmax) {
	    // console.log("id:" + id + "MAX:" + HPmax + "NOW:" + HPnow);
	    if($("#BYHPui"+id)[0]){
		    var nowph = $("#BYHPui"+id)[0].clientHeight;    
	        var nowpw = $("#BYHPui"+id)[0].clientWidth;        
	        var HPx =  (HPmax - HPnow)/HPmax * nowpw;
	        HPx = nowpw - HPx;
	        $("#BYHPuiimg"+id)[0].style.clip = "rect(0px "+HPx+"px "+nowph+"px 0px)";
	    }
	},
    moveHPui: function () {
		var id	= arguments[0] ? arguments[0] : 1;
        var x1 = arguments[1] ? arguments[1] : 1;        
        var y1 = arguments[2] ? arguments[2] : 1;
        var delay = arguments[3] ? arguments[3] : 0;
        this.changeSArrayHui(id,x1,y1);

		x1 = BY_NPS.AdjustX(x1);
		y1 = BY_NPS.AdjustY(y1);
        x1 = x1 + "px";
        y1 = y1 + "px";
		$("#BYHPui"+id).animate({left: x1, top: y1},delay);
	},
	removeallHPui: function () {
		HPuiIdArray = [];
		$('.BYHPui').stop().animate({"opacity": "0"}, 0, function() {
			$(this).remove();
		});
		if(!TempShow){
			this.removeAllShowArray("Hui","all");//从数组中删除该元素
        }

	},
//=========================================================艺术字====================================
	showPicText: function () {
		//console.log(arguments[3]);
		var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
		var filename 	=	 BYNPSArgs['filename'] ? BYNPSArgs['filename'] : "";
		var delay	 	=	 BYNPSArgs['delay'] ? BYNPSArgs['delay'] : 0
		var id			=	 BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var x			=	 BYNPSArgs['x'] != undefined ? BYNPSArgs['x'] : eval(BY.NPS.Param.X);
		var y			=	 BYNPSArgs['y'] != undefined ? BYNPSArgs['y'] : eval(BY.NPS.Param.Y);
		var size		=	 BYNPSArgs['size'] ? BYNPSArgs['size'] : 1;
		var textw		=	 BYNPSArgs['textw'] ? BYNPSArgs['textw'] : 32;
		var texth		=	 BYNPSArgs['texth'] ? BYNPSArgs['texth'] : 50;
		var content		=	 BYNPSArgs['content'] ? BYNPSArgs['content'] : 0;
		var zIndex      =    BYNPSArgs['zIndex'] ? BYNPSArgs['zIndex'] : BY.NPS.Param.zIndex + 3;
		var Adjust		=	 BYNPSArgs['Adjust'] ? BYNPSArgs['Adjust'] : 1;

        var uijd        =    BYNPSArgs['uijd'] ? BYNPSArgs['uijd'] : "left";
        var jd = "rotate(0deg)";  

		if(!TempShow){
		    var addShowArray = {BYtype:"Ptext", filename:filename, content:content, delay:delay, id:id, x:x, y:y, textw:textw, size:size, texth:texth, zIndex:zIndex, Adjust:Adjust, uijd:uijd};
		    AllShowNow.push(addShowArray);//当前显示元素数组添加
		    // console.log(AllShowNow);
		}
      
		switch (uijd) 
		{ 
		  case 'left':jd="rotate(0deg)"; 
		  break; 
		  case 'right':jd="rotate(180deg)"; 
		  break; 
		  case 'up':jd="rotate(90deg)"; 
		  break; 
		  case 'down':jd="rotate(-90deg)"; 
		  break;
		}
        
        
		if(filename.indexOf('url=') != -1){
			filename = filename.replace('url=', '');
		}
		else{
			filename = BY.NPS.Param.path + "number/" + filename;
		}

        content = content.toString();
        var len = content.length;
        var numb = '';
        var HPwidth = textw * size;
        var HPheight = texth * size;
        var DivWidth = len * HPwidth;
        var Pzind = HPwidth * -1;

        if(Adjust == 1 ){
			x = BY_NPS.AdjustX(x);
			y = BY_NPS.AdjustY(y);
        }
        
		HPwidth = BY_NPS.AdjustWidth(HPwidth);
        HPheight = BY_NPS.AdjustHeight(HPheight);
		Pzind = BY_NPS.AdjustWidth(Pzind);
        DivWidth = BY_NPS.AdjustWidth(DivWidth);

        for(var i = 0; i < len; i++){
        	if( ! +content.charAt(i) && +content.charAt(i) != 0){
        		var checkT = content.charAt(i);        	
            }else{
				var checkT = +content.charAt(i);  
            }

            switch(checkT){
                case 0:
                    numb += '<div id="num0" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:0px 0px;"></div>';
                    break;
                case 1:
                    numb += '<div id="num1" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind +'px 0px;"></div>';
                    break;   
                case 2:
                    numb += '<div id="num2" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*2 +'px 0px;"></div>';
                    break;   
                case 3:
                    numb += '<div id="num3" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*3 +'px 0px;"></div>';
                    break;   
                case 4:
                    numb += '<div id="num4" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*4 +'px 0px;"></div>';
                    break;   
                case 5:
                    numb += '<div id="num5" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*5 +'px 0px;"></div>';
                    break;   
                case 6:
                    numb += '<div id="num6" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*6 +'px 0px;"></div>';
                    break;   
                case 7:
                    numb += '<div id="num7" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*7 +'px 0px;"></div>';
                    break;   
                case 8:
                    numb += '<div id="num8" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*8 +'px 0px;"></div>';
                    break;   
                case 9:
                    numb += '<div id="num9" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*9 +'px 0px;"></div>';
                    break;
                case '+':
                    numb += '<div id="num10" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*10 +'px 0px;"></div>';
                    break;
                case '-':
                    numb += '<div id="num11" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*11 +'px 0px;"></div>';
                    break; 
                case '.':
                    numb += '<div id="num12" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*12 +'px 0px;"></div>';
                    break; 
                case '/':
                    numb += '<div id="num13" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*13 +'px 0px;"></div>';
                    break;  
                case '%':
                    numb += '<div id="num14" class="number" width='+HPwidth+' height='+HPheight+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+HPwidth+'px; height:'+HPheight+'px; background-size:'+1500+'% '+100+'%; background-position:'+ Pzind*14 +'px 0px;"></div>';
                    break;        
            }
        }
        var BYNPSEntity;
		var BYNPSTemplate = '<div id="BYPicText'+id+'" class="BYNPS" width='+DivWidth+' height='+HPheight+' style="visibility:hidden;position:fixed;left:'+x+'px;top:'+y+'px;transform:'+jd+';transform-origin:top left ;z-index:'+zIndex+';"> '+numb+' </div>';

		BYNPSEntity = $('body').append(BYNPSTemplate);
		$("#BYPicText"+id).css({visibility:'visible'});

		if(delay>=1){
			setTimeout(function()
			{
				$('#BYPicText'+id).stop().animate({"opacity": "0"},10);
				$('#BYPicText'+id).remove();
			}, 0);
			this.removeAllShowArray("Ptext",id);//从数组中删除该元素
		}
	},
	removePicText: function () {
		var id = arguments[0] ? arguments[0] : 1;
		$('#BYPicText'+id).stop().animate({"opacity": "0"},0, function() {
			$(this).remove();
		});
		this.removeAllShowArray("Ptext",id);//从数组中删除该元素
	},
	movePicText: function () {
	    var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
	    var id          =    BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var x		  	=	 BYNPSArgs['x'] ? BYNPSArgs['x'] : 0;
		var y		  	=	 BYNPSArgs['y'] ? BYNPSArgs['y'] : 0;
        var delay       =    BYNPSArgs['delay'] ? BYNPSArgs['delay'] : 0;
        this.changeSArrayPtext(id,x,y);

		var x1 = BY_NPS.AdjustX(x);
		var y1 = BY_NPS.AdjustY(y);
        x1 = x1 + "px";
        y1 = y1 + "px";

		$("#BYPicText"+id).animate({left: x1, top: y1},delay);
	},
	changePicText: function () {
        var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
		var id          =    BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var checkPicId  =    $('#BYPicText'+id)[0];
		if(!checkPicId){ return; }
		var filename 	=	 BYNPSArgs['filename'] ? BYNPSArgs['filename'] : $("#BYPicText"+ id + " .number")[0].style.backgroundImage;
		var content		=	 BYNPSArgs['content'] ? BYNPSArgs['content'] : 0;        
		var tw = $("#BYPicText"+ id + " .number")[0].style.width;
		var th = $("#BYPicText"+ id + " .number")[0].style.height;
		if(tw.indexOf('px') != -1){
           tw = tw.replace('px' , '');
           tw = parseInt(tw);
		}
		if(th.indexOf('px') != -1){
           th = th.replace('px' , '');
           th = parseInt(th);
		}
		// console.log("tw:" + tw + " th:" + th);
		var pzi = tw * -1 ;
 
		if(filename.indexOf('url(') != -1){
			filename = filename.split("/");
			filename = filename[filename.length - 1];
			filename = filename.replace(')', '');
			filename = filename.replace('"', '');
		}
		this.changeSArrayPtextz(id,filename,content);
		if(filename.indexOf('url=') != -1){
			filename = filename.replace('url=', '');
		}
		else{
			filename = BY.NPS.Param.path + "number/" + filename;
		}

        content = content.toString();
        var len = content.length;
        var numb = '';

        for(var i = 0; i < len; i++){
        	if( ! +content.charAt(i) && +content.charAt(i) != 0){
        		var checkT = content.charAt(i);        	
            }else{
				var checkT = +content.charAt(i);  
            }
            switch(checkT){
                case 0:
                    numb += '<div id="num0" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:0px 0px;"></div>';
                    break;
                case 1:
                    numb += '<div id="num1" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi +'px 0px;"></div>';
                    break;   
                case 2:
                    numb += '<div id="num2" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*2 +'px 0px;"></div>';
                    break;   
                case 3:
                    numb += '<div id="num3" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*3 +'px 0px;"></div>';
                    break;   
                case 4:
                    numb += '<div id="num4" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*4 +'px 0px;"></div>';
                    break;   
                case 5:
                    numb += '<div id="num5" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*5 +'px 0px;"></div>';
                    break;   
                case 6:
                    numb += '<div id="num6" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*6 +'px 0px;"></div>';
                    break;   
                case 7:
                    numb += '<div id="num7" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*7 +'px 0px;"></div>';
                    break;   
                case 8:
                    numb += '<div id="num8" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*8 +'px 0px;"></div>';
                    break;   
                case 9:
                    numb += '<div id="num9" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*9 +'px 0px;"></div>';
                    break;
                case '+':
                    numb += '<div id="num10" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*10 +'px 0px;"></div>';
                    break;
                case '-':
                    numb += '<div id="num11" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*11 +'px 0px;"></div>';
                    break; 
                case '.':
                    numb += '<div id="num12" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*12 +'px 0px;"></div>';
                    break; 
                case '/':
                    numb += '<div id="num13" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*13 +'px 0px;"></div>';
                    break;  
                case '%':
                    numb += '<div id="num14" class="number" width='+tw+' height='+th+' style="float:left;background:url('+filename+');background-repeat: no-repeat;width:'+tw+'px; height:'+th+'px; background-size:'+1500+'% '+100+'%; background-position:'+ pzi*14 +'px 0px;"></div>';
                    break;        
            }
        }
        // console.log(numb);

        $("#BYPicText"+ id + " .number").remove();
        $('#BYPicText'+id).append(numb);
	},
	removeallPicText: function () {
		$('.BYPicText').stop().animate({"opacity": "0"}, 0, function() {
			$(this).remove();
		});
		if(!TempShow){
			this.removeAllShowArray("Ptext","all");//从数组中删除该元素
        }
	},
//=========================================================滑动窗口====================================	
	showSwindow: function () {
		var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
		var id			=	 BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var x			=	 BYNPSArgs['x'] != undefined ? BYNPSArgs['x'] : 0;
		var y			=	 BYNPSArgs['y'] != undefined ? BYNPSArgs['y'] : 0;
		var width       =	 BYNPSArgs['width'] != undefined ? BYNPSArgs['width'] : 0;
		var height      =	 BYNPSArgs['height'] != undefined ? BYNPSArgs['height'] : 0;
		var background  =    BYNPSArgs['background'] ? BYNPSArgs['background'] : "#000000";
		var filename    =    BYNPSArgs['filename'] ? BYNPSArgs['filename'] : 'Swindow.png';
		var Offsetx     =    BYNPSArgs['Offsetx'] ? BYNPSArgs['Offsetx'] : 10;
		var Offsety     =    BYNPSArgs['Offsety'] ? BYNPSArgs['Offsety'] : 10;
		var opacity		=	 BYNPSArgs['opacity'] ? BYNPSArgs['opacity'] : 0.6;
		var zIndex		=	 BYNPSArgs['zIndex'] ? BYNPSArgs['zIndex'] : 10001;

		var BYNPSEntity;

      //   if(!TempShow){
	     //    var addShowArray = {BYtype:"text", content:content, delay:delay, id:id, x:x, y:y, color:color, size:size, opacity:opacity, zIndex:zIndex, AutoChange:AutoChange};
		    // AllShowNow.push(addShowArray);//当前显示元素数组添加
		    // console.log(AllShowNow);        	
      //   }
        width = BY_NPS.AdjustWidth(width);
        height = BY_NPS.AdjustHeight(height);
        var height2 = height + Offsetx;
		var width2 = width + Offsety;
		var zIndex2 = zIndex +1;
       
		x = BY_NPS.AdjustX(x);
		y = BY_NPS.AdjustY(y);
		var x2 = x - Offsetx/2;
		var y2 = y - Offsety/2;
        
		if(filename.indexOf('url=') != -1){
			filename = filename.replace('url=', '');
		}
		else{
			filename = BY.NPS.Param.path + filename;
		}
        
    	var BYNPSTemplate = '<div id="BYSwindow'+id+'" class="BYNPS" style="visibility:hide;position:fixed;left:'+x+'px;top:'+y+'px;z-index:'+zIndex+';height:'+height+'px;width:'+width+'px;overflow:auto;background:'+background+';">';
    	BYNPSEntity = $('body').append(BYNPSTemplate);
 
		$("#BYSwindow"+id).css({left:x, top:y, visibility:'visible'});
		var div2 = '<div id="BYSwindow'+id+'K" style="position:fixed;left:'+x2+'px;top:'+y2+'px;z-index:'+zIndex2+';visibility:visible;height:'+height2+'px;width:'+width2+'px;background:url('+filename+');background-repeat: no-repeat;background-size:'+100+'% '+100+'%;">';
		var addDiv2 = $('body').append(div2);
		$("#BYSwindow"+id+"K").css({'pointer-events':'none'});
		this.setBakckgoundAndOpacity($("#BYSwindow"+id), background, opacity);

	},
	colorToRGB: function (color) {
	    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/g;
	    var sColor = color.toLowerCase();
	    if (sColor && reg.test(sColor)) {
	        if (sColor.length === 4) {
	            var sColorNew = "#";
	            for (var i = 1; i < 4; i += 1) {
	                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
	            }
	            sColor = sColorNew;
	        }
	        //处理六位的颜色值
	        var sColorChange = [];
	        for (var i = 1; i < 7; i += 2) {
	            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
	        }
	        return sColorChange.join(",");
	    } else {
	        return color;
	    }
	},
	setBakckgoundAndOpacity: function (obj, color, opacity) {
	    var rgbaObj = this.colorToRGB(color);
	        jQuery(obj).css({
	            'background': 'rgba(' + rgbaObj + ',' + opacity + ')'
	        });
	},
	addTextNews: function() {
	    var BYNPSArgs 	=	 arguments[0] ? arguments[0] : {};
		var id			=	 BYNPSArgs['id'] ? BYNPSArgs['id'] : 1;
		var BYcontent   =    BYNPSArgs['news'] ? BYNPSArgs['news'] : "null?";  
		if($("#BYSwindow"+id)[0]){
			var NewText = '<p style="font-size:30; color:#FFFFFF;">'+BYcontent+'</p>';
			$("#BYSwindow"+id).append(NewText);
			$("#BYSwindow"+id).scrollTop($("#BYSwindow"+id)[0].scrollHeight);
		}else{
			console.log("此窗口id不存在");
		}
	},
	removeSwindow: function () {
		var id = arguments[0] ? arguments[0] : 1;
		$("#BYSwindow"+id).stop().animate({"opacity": "0"},0, function() {
			$(this).remove();
		});
		$("#BYSwindow"+id+"K").stop().animate({"opacity": "0"},0, function() {
			$(this).remove();
		});
	},
//=========================================================检查id（共用）====================================	
	checkIdInArray: function (id,array) {
		var CheckId = id;
		var CheckArray = array;
		for(var i = 0; i < CheckArray.length; i++){
            if(CheckArray[i].id == CheckId){
               return true;
            }
		}
	},
//=========================================================移除当前显示数组元素&改变更新数组（共用）====================================	
	removeAllShowArray: function (type,id) {
         for(var i=0; i<AllShowNow.length; i++){
         	if(id == "all"){
         		if(AllShowNow[i].BYtype == type){
         			AllShowNow.splice(i, 1);
         		}
         	}else if(AllShowNow[i].BYtype == type && AllShowNow[i].id == id){
               AllShowNow.splice(i, 1);            
               return;
         	}
         }
	},
    
	changeSArraypic: function (id,x,y,pic,eventON,eventOFF,eventDown) {
         for(var i=0; i<AllShowNow.length; i++){
			if(AllShowNow[i].BYtype == "pic" && AllShowNow[i].id == id){
               if(x != "old"){
               	 AllShowNow[i].x = x;
               }
               if(y != "old"){
               	 AllShowNow[i].y = y;
               }
               if(pic){
               	AllShowNow[i].filename = pic;
               }
               if(eventON || eventON == 0){
               	AllShowNow[i].eventON = eventON;
               }
              if(eventOFF || eventOFF == 0){
               	AllShowNow[i].eventOFF = eventOFF;
               }
              if(eventDown){
               	AllShowNow[i].eventDown = eventDown;
               }                           
         	}
         }
	},

	changeSArraytext: function (id,x,y,BYcontent,BYsize,BYcolor) {
         for(var i=0; i<AllShowNow.length; i++){
			if(AllShowNow[i].BYtype == "text" && AllShowNow[i].id == id){
               if(x != "old" && x != 0){
               	 AllShowNow[i].x = x;
               }
               if(y != "old" && y != 0){
               	 AllShowNow[i].y = y;
               }
               if(BYcontent){
               	AllShowNow[i].content = BYcontent;
               }
               if(BYsize){
               	AllShowNow[i].size = BYsize;
               }
               if(BYcolor){
               	AllShowNow[i].color = BYcolor;
               }                          
         	}
         }
	},

	changeSArrayani: function (id,x,y) {
         for(var i=0; i<AllShowNow.length; i++){
			if(AllShowNow[i].BYtype == "ani" && AllShowNow[i].id == id){
               if(x != "old"){
               	 AllShowNow[i].x = x;
               }
               if(y != "old"){
               	 AllShowNow[i].y = y;
               }                         
         	}
         }
	},

	changeSArrayHui: function (id,x,y) {
         for(var i=0; i<AllShowNow.length; i++){
			if(AllShowNow[i].BYtype == "Hui" && AllShowNow[i].id == id){
               if(x != "old"){
               	 AllShowNow[i].x = x;
               }
               if(y != "old"){
               	 AllShowNow[i].y = y;
               }                         
         	}
         }
	},

	changeSArrayPtext: function (id,x,y) {
         for(var i=0; i<AllShowNow.length; i++){
			if(AllShowNow[i].BYtype == "Ptext" && AllShowNow[i].id == id){
               if(x != "old"){
               	 AllShowNow[i].x = x;
               }
               if(y != "old"){
               	 AllShowNow[i].y = y;
               }                         
         	}
         }
	},

	changeSArrayPtextz: function (id,filename,content) {
         for(var i=0; i<AllShowNow.length; i++){
			if(AllShowNow[i].BYtype == "Ptext" && AllShowNow[i].id == id){
               	AllShowNow[i].filename = filename;
               if(content){
               	 AllShowNow[i].content = String(content);
               }                         
         	}
         }
	},
//=========================触摸事件监听创建====================================
    //图片触摸方法 BY_NPS.PicMOnEndOff(id, BYeventON, BYeventOff);
	PicMOnEndOff: function (id, BYeventON, BYeventOff) {
         if($("#BYNPS"+id)[0]){
	        if(!BYeventON){ 
	        	BYeventON= 0;
	          $("#BYNPS"+id).mouseenter(function(){
	          	if(BY.KeyControl){
	          		BY.KeyControl.MouseIndex(id);	
	          	}
	          	var y = $("#BYNPS"+id)[0].style.top;
	          	y = y.replace("px", "");
	          	y = JSON.parse(y);
	          	y -= 10;
	          	y = y + "px";
		        $('#BYNPS'+id).animate({"top": y},0);
			  });
	        }else if(BYeventON >= 1){
	          $("#BYNPS"+id).mouseenter(function(){
				$gameTemp.reserveCommonEvent(BYeventON);
			  });
	        }else{
	          $("#BYNPS"+id).mouseenter(function(){
				eval(BYeventON);
			  });
	        }

            if(!BYeventOff){
            	BYeventOff = 0;
	          $("#BYNPS"+id).mouseleave(function(){
	          	var y = $("#BYNPS"+id)[0].style.top;
	          	y = y.replace("px", "");
	          	y = JSON.parse(y);
	          	y += 10;
	          	y = y + "px";
	          	$('#BYNPS'+id).animate({"top": y},0);
  		        $("#BYNPS"+id).css({'pointer-events':'none'});
		        setTimeout(function()
				{
					$("#BYNPS"+id).css({'pointer-events':'auto'});
				}, 0); //300
			  });
	        }else if(BYeventOff >= 1){
	          $("#BYNPS"+id).mouseleave(function(){
				$gameTemp.reserveCommonEvent(BYeventOff);
			  });
	        }else{
	          $("#BYNPS"+id).mouseleave(function(){
				eval(BYeventOff);
			  });
	        }
	        this.changeSArraypic(id,"old","old",0,BYeventON,BYeventOff);
         }
	},

	//文字触摸方法 BY_NPS.TextMOnEndOff(id, BYeventON, BYeventOff);
	TextMOnEndOff: function (id, BYeventON, BYeventOff) {
         if($("#BYNPStext"+id)[0]){
	        if(!BYeventON){ 
	          $("#BYNPStext"+id).mouseenter(function(){
	          	var x = $("#BYNPStext"+id)[0].style.left;
	          	var y = $("#BYNPStext"+id)[0].style.top;
	          	x = x.replace("px", "");
	          	y = y.replace("px", "");
	          	x = JSON.parse(x);
	          	y = JSON.parse(y);
	          	y -= 10;
	          	y = y + "px";
	          	$('#BYNPStext'+id).animate({"top": y},0);
			  });
	        }else if(BYeventON >= 1){
	          $("#BYNPStext"+id).mouseenter(function(){
				$gameTemp.reserveCommonEvent(BYeventON);
			  });
	        }else{
	          $("#BYNPStext"+id).mouseenter(function(){
				eval(BYeventON);
			  });
	        }

            if(!BYeventOff){
	          $("#BYNPStext"+id).mouseleave(function(){
	          	var x = $("#BYNPStext"+id)[0].style.left;
	          	var y = $("#BYNPStext"+id)[0].style.top;
	          	x = x.replace("px", "");
	          	y = y.replace("px", "");
	          	x = JSON.parse(x);
	          	y = JSON.parse(y);
	          	y += 10;
	            y = y + "px";
	          	$('#BYNPStext'+id).animate({"top": y},0);
			  });
	        }else if(BYeventOff >= 1){
	          $("#BYNPStext"+id).mouseleave(function(){
				$gameTemp.reserveCommonEvent(BYeventOff);
			  });
	        }else{
	          $("#BYNPStext"+id).mouseleave(function(){
				eval(BYeventOff);
			  });
	        }
         }
	},

//=========================按下与放开事件监听创建====================================
    //图片按下方法 BY_NPS.PicMdown(id, BYevent);
	PicMdown: function (id, BYevent) {
         if($("#BYNPS"+id)[0]){ 
            //------------------------事件判断
	        if(!BYevent){ 
              return;
	        }else if(BYevent >= 1){
	          $("#BYNPS"+id).mousedown(function(){
				$gameTemp.reserveCommonEvent(BYevent);
			  });
	        }else{
	          $("#BYNPS"+id).mousedown(function(){
				eval(BYevent);
			  });
	        }
			//------------------------事件判断
			this.changeSArraypic(id,"old","old",0, null,null,BYevent);
         }
	},

	//图片放开方法 BY_NPS.PicMup(id, BYevent);
	PicMup: function (id, BYevent) {
         if($("#BYNPS"+id)[0]){ 
            //------------------------事件判断
	        if(!BYevent){ 
              return;
	        }else if(BYevent >= 1){
	          $("#BYNPS"+id).mouseup(function(){
				$gameTemp.reserveCommonEvent(BYevent);
			  });
	        }else{
	          $("#BYNPS"+id).mouseup(function(){
				eval(BYevent);
			  });
	        }
			//------------------------事件判断
         }
	},

	//文字按下方法 BY_NPS.TextMdown(id, BYevent);
	TextMdown: function (id, BYevent) {
         if($("#BYNPStext"+id)[0]){ 
            //------------------------事件判断
	        if(!BYevent){ 
              return;
	        }else if(BYevent >= 1){
	          $("#BYNPStext"+id).mousedown(function(){
				$gameTemp.reserveCommonEvent(BYevent);
			  });
	        }else{
	          $("#BYNPStext"+id).mousedown(function(){
				eval(BYevent);
			  });
	        }
			//------------------------事件判断
         }
	},

	//文字放开方法 BY_NPS.TextMup(id, BYevent);
	TextMup: function (id, BYevent) {
         if($("#BYNPStext"+id)[0]){ 
            //------------------------事件判断
	        if(!BYevent){ 
              return;
	        }else if(BYevent >= 1){
	          $("#BYNPStext"+id).mouseup(function(){
				$gameTemp.reserveCommonEvent(BYevent);
			  });
	        }else{
	          $("#BYNPStext"+id).mouseup(function(){
				eval(BYevent);
			  });
	        }
			//------------------------事件判断
         }
	},

};

//---------新增游戏屏幕缩放继承-----------------------
BY.NPS.Graphics_updateCanvas = Graphics._updateCanvas;
Graphics._updateCanvas = function() {
   BY.NPS.Graphics_updateCanvas.call(this);
   if(AllShowNow[0]){
	   TempShow = true;
	   BY_NPS.removeall();
	   BY_NPS.removealltext();
	   BY_NPS.removeallAin();
	   BY_NPS.removeallPicText();
	   BY_NPS.removeallHPui();
	   BY.NPS.updatShow();
	   TempShow = false; 
   }
};

BY.NPS.updatShow = function(){
	for(var i=0; i<AllShowNow.length; i++){
        if(AllShowNow[i].BYtype == "pic"){
			BY_NPS.show(AllShowNow[i]);
			var tid = AllShowNow[i].id;
			if(AllShowNow[i].eventON == 0 || AllShowNow[i].eventON){ //如果图片存在触摸事件
			  var Eon  = AllShowNow[i].eventON;
			  var Eoff = AllShowNow[i].eventOFF;
			  BY_NPS.PicMOnEndOff(tid, Eon, Eoff);
			}
			if(AllShowNow[i].eventDown){
              var Edown = AllShowNow[i].eventDown;
			  BY_NPS.PicMdown(tid, Edown);
			}
        }
        if(AllShowNow[i].BYtype == "text"){
			BY_NPS.showtext(AllShowNow[i]);
        }
        if(AllShowNow[i].BYtype == "ani"){
			BY_NPS.showAnimation(AllShowNow[i]);
        }
        if(AllShowNow[i].BYtype == "Ptext"){
        	BY_NPS.showPicText(AllShowNow[i]);
        }
        if(AllShowNow[i].BYtype == "Hui"){
			BY_NPS.showHPui(AllShowNow[i]);
        }
	}
};

//----------------新增透明化所有显示----------------
BY.NPS.AllOpacity = function(BYopacity){
	var BYo = BYopacity != undefined  ? BYopacity : 1;
    $(".BYNPS").css("opacity",BYo);
};
