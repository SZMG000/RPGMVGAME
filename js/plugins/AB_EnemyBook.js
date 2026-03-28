// =============================================================================
// AB_EnemyBook.js
// Version: 1.24
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================



/*:
 * @plugindesc  战斗敌人图鉴系统
 * @author ヱビ 汉化：硕明云书
 * 
 * @param ShowCommandInBattle
 * @text 作战中显示命令
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定战斗中是否显示敌人的信息指令。
 * 0:不展示、1:展示
 * @default 1
 * 
 * @param ShowAllBookCommandInBattle
 * @text 战斗中显示图鉴命令
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定战斗中是否显示图鉴命令。
 * 0:不展示、1:展示
 * @default 1
 * 
 * @param ResisterTiming
 * @text 战斗中显示所有图鉴命令
 * @type select
 * @option 未注册
 * @value 0
 * @option 战斗开始时
 * @value 1
 * @option 战斗结束时
 * @value 2
 * @desc 登录图鉴
 * 0:未选择、1:战斗开始时、2:战斗结束时
 * @default 2
 * 
 * @param ShowCurrentStatus
 * @text 显示战斗当前状态信息
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc ON那么，在图鉴中敌人现在的信息（现在HP等）。
 * 也可以使用插件命令进行更改。0:OFF、1:ON
 * @default 0
 * 
 * @param HideUnknownStatusInSkill
 * @text 未知状态登记显示
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc ON这样的话，用技能看敌人的信息的时候，没有被登记的敌人也会显示【？？？】0:OFF、1:ON
 * @default 0
 * 
 * @param ShowGeneralStatusInSkill
 * @text 技能查看信息
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc ON这样的话，用技能看敌人的信息的时候，现在也不是HP而是一般的数据。0:OFF、1:ON
 * @default 0
 * 
 * @param HideItemUntilGet
 * @text 隐藏直到获取
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc 在获得项目之前不要显示。0:OFF、1:ON
 * @default 0
 * 
 * @param ---用語、アイコン---
 * @text ---术语、图标---
 * @default 
 * 
 * @param EnemyBookCommandName
 * @text EnemyBook命令名称
 * @desc バトル中の敵の情報を見るコマンドの名前です。
 * @default 敌人情报
 * 
 * @param EnemyBookAllCommandName
 * @text EnemyBook所有命令名称
 * @desc バトル中、通常通り図鑑を開くコマンドの名前です。
 * @default 图鉴
 * 
 * @param Achievement
 * @text 完成率
 * @desc 達成率の名前です。
 * @default 完成率
 * 
 * @param UnknownEnemy
 * @text 未知敌人
 * @desc 未確認の敵キャラの索引名です。
 * @default ？？？？？？
 * 
 * @param UnknownData
 * @text 未知数据
 * @desc まだ図鑑に登録されていない敵キャラの各データの内容です。
 * @default ？？？
 * 
 * @param WeakElementName
 * @text 弱点属性
 * @desc 有效属性的名称。
 * @default 弱点属性
 * 
 * @param ResistElementName
 * @text 耐性属性
 * @desc 効きにくい属性の名前です。
 * @default 耐性属性
 * 
 * @param WeakStateName
 * @text 弱点状态名称
 * @desc 効きやすいステートの名前です。
 * @default 弱点状态
 * 
 * @param ResistStateName
 * @text 耐性状态
 * @desc 生效的状态的名字。包括无效状态。
 * @default 耐性状态
 * 
 * @param NoEffectStateName
 * @text 无效状态
 * @desc 効かないステートの名前です。
 * @default 无效状态
 * 
 * @param DefeatNumberName
 * @text 打倒数量
 * @desc 敵を倒した数の名前です。
 * @default 打倒数量
 * 
 * @param UnknownDropItemIcon
 * @text 未知DropItem图标
 * @type number
 * @min 0
 * @desc 未知の敵キャラの落とすアイテムのアイコンの番号です。
 * デフォルト：16
 * @default 16
 * 
 * @param AddEnemySkillMessage
 * @text 图鉴登记
 * @desc 用技能将敌人角色登录图鉴成功时的消息
 * @default %1图鉴登记了！
 * 
 * @param FailToAddEnemySkillMessage
 * @text 不能图鉴登记
 * @desc スキルで敵キャラを図鑑に登録することに失敗したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1不能登在图鉴上！

 * @param MissToAddEnemySkillMessage
 * @text 图鉴登记失败
 * @desc スキルで敵キャラを図鑑に登録することに失敗したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1图鉴登记失败了！
 * 
 * @param FailToCheckEnemySkillMessage
 * @text 图鉴登记失败
 * @desc スキルで敵キャラの情報を見ることに失敗したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1的信息不明白！
 * 
 * @param ---表示項目---
 * @default 
 * 
 * @param DispNo
 * @text 显示NO
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 0:非表示、1:表示
 * @default 1
 * 
 * @param DispLv
 * @text 显示lv
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 0:非表示、1:表示
 * @default 1
 * 
 * @param DispDefeatNumber
 * @text 显示击败数
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DispHP
 * @text 显示HP
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否在图鉴上显示HP。0:非表示、1:表示
 * @default 1
 * 
 * @param DispMP
 * @text 显示MP
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否在图鉴中显示MP。0:非表示、1:表示
 * @default 1
 * 
 * @param DispATK
 * @text 显示攻击力
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否在图鉴上显示攻击力。0:非表示、1:表示
 * @default 1
 * 
 * @param DispDEF
 * @text 显示防御力
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否在图鉴上显示防御力。0:非表示、1:表示
 * @default 1
 * 
 * @param DispMAT
 * @text 显示魔法攻击
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否在图鉴上显示魔法力。0:非表示、1:表示
 * @default 1
 * 
 * @param DispMDF
 * @text 显示魔法防御
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否在图鉴上显示魔法防御。0:非表示、1:表示
 * @default 1
 * 
 * @param DispAGI
 * @text 显示敏捷
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 决定是否在图鉴中显示敏捷性。0:非表示、1:表示
 * @default 1
 * 
 * @param DispLUK
 * @text 显示幸运
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否在图鉴上显示运气。0:非表示、1:表示
 * @default 1
 * 
 * @param DispGold
 * @text 显示获得金钱
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否在图鉴中显示。0:非表示、1:表示
 * @default 1
 * 
 * @param DispDropItems
 * @text 显示获得物品
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否在图鉴中显示。0:非表示、1:表示
 * @default 1
 * 
 * @param DispWeakElement
 * @text 显示效果
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 决定是否显示对图鉴有效的属性。0:非表示、1:表示
 * @default 1
 * 
 * @param DispResistElement
 * @text 显示ResistElement
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 是否显示图鉴中难以奏效的属性。0:非表示、1:表示
 * @default 1
 * 
 * @param DispWeakState
 * @text 显示WeakState
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 図鑑に効きやすいステートを表示するか決めます。
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DispResistState
 * @text 显示ResistState
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 図鑑に効きにくいステートを表示するか決めます。（無効含む）
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DispNoEffectState
 * @text 显示NoEffectState
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 図鑑に効かないステートを表示するか決めます。
 * 0:非表示、1:表示
 * @default 0
 * 
 * @param DispDescribe
 * @text 显示描述
 * @type select
 * @option 显示
 * @value 1
 * @option 不显示
 * @value 0
 * @desc 図鑑に敵キャラの説明を表示するか決めます。
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param ---属性アイコン---
 * @text ---属性图标---
 * @default 
 * 
 * @param UseElementIconInPluginParameter
 * @text 使用插件参数中的元素
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc 使用下面的参数而不是属性中的图标吗？
 * 0:OFF、1:ON
 * @default 1
 * 
 * @param ElementIcons
 * @text 元素图标
 * @desc 属性图标。从1号开始按顺序用半角空间分开排列
 * べてください。
 * @default 76 64 65 66 67 68 69 70 71
 * 
 * @help
 * ============================================================================
 * ❀ 插件概要 ❀                    
 * ============================================================================
 * 汉化：硕明云书
 * 官方自带的Yoji Ojima插件“EnemyBook.js”改版插件
 * 
 * 〇特性
 * 
 * ❀打开怪物图鉴
 * ❀EnemyBook.js也可以看到没有的项目
 * ❀可以追加战斗中可以看到图鉴的命令
 * ❀可以制作查看敌人信息的查看技能
 * 
 * 〇可以显示的内容（★是EnemyBook.js中没有的项目）
 * 
 * - 敌人的名字
 * - 敌人的插图
 * ★ 敌人的编号
 * ★ 等级（在备注栏中设置）
 * ★ 打倒那个敌人的数量
 * - HP、MP、攻击力、防御力、魔法力、魔法防御、敏捷性、幸运值
 * ★ 容易生效的属性、不容易生效的属性
 * ★ 有效状态、无效状态、无效状态
 * - 说明备注（在备注栏中设置，2行）
 * ★ 图鉴的完成率
 * 
 * ============================================================================
 * 4个使用方法
 * ============================================================================
 * 
 * １．图鉴
 * 表示：图鉴中所有敌人的名单
 * 操作：使用道具，和人搭话，战斗中“图鉴”命令
 * 
 * ２．战斗中敌人的状态一览
 * 表示：战斗中敌人的名单。当前状态，如HP规格
 * 操作：战斗中“敌人的情报”命令。查看当前信息的设置为ON时
 * 
 * ３．战斗中敌人图鉴的情报
 * 表示：战斗中敌人的名单。不是当前状态，而是图鉴信息
 * 操作：战斗中“敌人的情报”命令。查看当前信息的设置为OFF时
 * 
 * ４．查看
 * 表示：检查的敌人当前状态
 * 操作：对敌人使用检查技能
 * 
 * ５．检查（一般数据）
 * 表示：检查过的敌人的一般数据
 * 操作：对敌人使用检查技能。
 *       ShowGeneralStatusInskill为ON时。
 * 
 * ============================================================================
 * 首先的导入方法
 * ============================================================================
 * 
 * 在插件管理器中导入此插件
 * 只需在显示图鉴的活动中添加插件命令“EnemyBook open”！
 * 
 * 数据库中的敌人角色，如果名字不是空白的话，就会登录图鉴。
 * （即使有名字也不想登录图鉴的敌人角色，需要设定）
 * 
 * 但是，就这样显示的项目太多，无法显示，所以插件
 * 删除参数中显示的项目。
 * 
 * ============================================================================
 * 其他
 * ============================================================================
 * 
 * 〇属性的表示方法，2种
 * 
 * 1.在属性名称中插入图标
 *   例：\i[64]炎
 * 
 * 2.使用插件参数
 *   将UseElementIconInPluginParameter设为ON
 *   请将属性图标的编号以半角空格分隔排列在元素Icons中。
 *   例：76 64 65 66 67 68 69 70 71
 * 
 * 〇未确认的敌人角色
 * 
 * 在与尚未登录图鉴的敌人战斗中打开图鉴，数据就会显示出来「？？？」
 * 显示「？？？」的部分由插件参数的UnknownData设置
 * 
 * 〇查看当前信息的设定、敌人的信息命令
 * 
 * 默认情况下，在敌人的信息命令中，一般敌人的数据都会出现
 * 如果插件参数ShowCurrentStatus为ON
 * 战斗中打开敌人信息时，显示当前敌人角色的参数。
 * 现在不仅仅是HP，攻击力和属性有效度的变化也被表示。
 * 可以通过插件命令更改查看当前信息的设置。
 * 
 * 〇看当前信息的设置和检查技能
 * 
 * 默认情况下，检查技能会显示当前敌人的数据。
 *打开插件参数ShowGeneralStatusInskill后，通过技能检查
 *时，也可以显示一般敌人的数据。
 *
 *〇登录图鉴的时机
 *
 *通过插件参数ResisterTiming，可以设定在图鉴中登录的时机
 *
 *0：未注册
 *1:战斗开始时
 *2:战斗结束时
 *〇没有买到的物品？？？-v1.22
 *如果插件参数HideItemUntilGet为ON，则将未获得的项目
 * ？？？中所述修改相应参数的值。
 * ============================================================================
 * 插件命令
 * ============================================================================
 * 
 * 〇EnemyBook.js的命令
 * 
 * EnemyBook open 
 *   打开图鉴画面。
 * EnemyBook add 3
 *   将敌人角色3号追加到图鉴中。
 * EnemyBook remove 4
 *   从图鉴中删除敌人角色4号。
 * EnemyBook complete
 *   完成图鉴
 * EnemyBook clear
 *   清除图鉴
 * 
 * 〇其他插件命令
 * 
 * EnemyBook showInBattle
 *   使之能在战斗中打开「敌人的信息」。
 * EnemyBook hideInBattle
 *   使之不能在战斗中打开「敌人的信息」。
 * EnemyBook showCurrentStatus
 *   战斗中打开“敌人的信息”，可以看到现在敌人的参数。
 * EnemyBook showGeneralStatus
 *   在战斗中打开“敌人的信息”，就能看到敌人的一般信息。
 * 
 * 〇v1.06
 * 
 * EnemyBook getAchievement per 12
 *   将图鉴的达成率（%）放入变量12号。
 * EnemyBook getAchievement num 14
 *   将图鉴的登录数放入变量14号。
 * EnemyBook isRegistered 5 96
 *   将敌人角色5号是否登录在图鉴中放入开关96号。
 * EnemyBook getDefeatNumber 3 24
 *   把打倒敌人角色3号的数量放入变量24。
 * 
 * 〇v1.16
 * EnemyBook openEnemy 16
 *   打开ID16的敌人角色的画面。
 * 
 * 〇v1.17
 * EnemyBook showAllInBattle
 *   使之能在战斗中打开「图鉴」。
 * EnemyBook hideAllInBattle
 *   避免在战斗中打开“图鉴”。
 * 
 * 〇v1.20
 * EnemyBook clearDefeatNumber
 *   重置打倒的数量。
 * 
 * 〇v1.22
 * EnemyBook clearEnemyDrop
 *   重置是否获得能量滴。
 * 
 * ============================================================================
 * 敌人角色的备注栏
 * ============================================================================
 * <desc1:文字>
 *   说明第1行。
 * <desc2:文字>
 *   说明第二行。
 * <book:no>
 *   设定这个的敌人角色不会登在图鉴上。
 * 
 * 〇其他标记
 * 
 * <bookLevel:3>
 *   在图鉴中记载强度的标准水平。
 *   如果你什嚒都不写，什嚒都不会显示。
 * 
 * <bookCanCheck>
 *   已在版本1.04中添加。
 *   <book:no>即使是写过的敌人，如果加上这个标签的话<checkEnemyStatus>的技能
 * 
 * ============================================================================
 * 技能注释栏
 * ============================================================================
 * 
 * <addToEnemyBook>
 *   将对象注册到图鉴中。
 *   对象是图鉴上刊登的敌人角色的情况下，成功信息
 *   否则将显示失败消息。
 * 
 * <checkEnemyStatus>
 *   查看对象信息。
 *   如果对象是图鉴上的敌人角色，则显示图鉴
 *   否则将显示失败消息。
 *   此技能显示目标的当前参数（如当前HP）。
 *   〇v1.21
 *   插件参数在HideUnknownStatusInSkill上「？？？」也可以显示
 *   我会了。
 * 
 * 可以通过插件参数设置这两种技能的消息。
 * 
 * ============================================================================
 * 状态注释栏
 * ============================================================================
 * 
 * <book:no>
 *   您可以不在图鉴中显示此状态。
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・不需要信用标记
 * ・可用于商业游戏，禁止销售插件本身！
 * ・可修改
 * ・也可以只重新分发素材
 * ・成人游戏，也可以在残酷的游戏中使用
 * ・是图库素材的改变素材
 * 请看塔克尔公式的使用条款。
 *     https://tkool.jp/support/guideline
 */


(function() {
	var parameters = PluginManager.parameters('AB_EnemyBook');
	var EnemyBookCommandName = (parameters['EnemyBookCommandName'] || "敵の情報");
	var ShowCommandInBattle = (parameters['ShowCommandInBattle'] == 1) ? true : false;
	var EnemyBookAllCommandName = (parameters['EnemyBookAllCommandName'] || "図鑑");
	var ShowAllBookCommandInBattle = (parameters['ShowAllBookCommandInBattle'] == 1) ? true : false;
	var ResisterTiming = Number(parameters['ResisterTiming']);
	var Achievement = String(parameters['Achievement'] || "");
	var UnknownEnemy = String(parameters['UnknownEnemy'] || "");
	var UnknownData = String(parameters['UnknownData'] || "");
	var HideUnknownStatusInSkill = (parameters['HideUnknownStatusInSkill'] == 1) ? true : false;
	var HideItemUntilGet = (parameters['HideItemUntilGet'] == 1) ? true : false;
	var ShowCommandInBattle = (parameters['ShowCommandInBattle'] == 1) ? true : false;
	var ShowGeneralStatusInSkill = (parameters['ShowGeneralStatusInSkill'] == 1) ? true : false;
	var AddEnemySkillMessage = String(parameters['AddEnemySkillMessage'] || "");
	var FailToAddEnemySkillMessage = String(parameters['FailToAddEnemySkillMessage'] || "");
	var MissToAddEnemySkillMessage = String(parameters['MissToAddEnemySkillMessage'] || "");
	var FailToCheckEnemySkillMessage = String(parameters['FailToCheckEnemySkillMessage'] || "");
	var DispNo = (parameters['DispNo'] == 1) ? true : false;
	var DispLv = (parameters['DispLv'] == 1) ? true : false;
	var ShowCurrentStatus = (parameters['ShowCurrentStatus'] == 1) ? true : false;
	var DispDescribe = (parameters['DispDescribe'] == 1) ? true : false;

	var DispDefeatNumber = (parameters['DispDefeatNumber'] == 1) ? true : false;

	var UseElementIconInPluginParameter = (parameters['UseElementIconInPluginParameter'] == 1) ? true : false;
	var dispParameters = [];
	dispParameters[0] = (parameters['DispHP'] == 1) ? true : false;
	dispParameters[1] = (parameters['DispMP'] == 1) ? true : false;
	dispParameters[2] = (parameters['DispATK'] == 1) ? true : false;
	dispParameters[3] = (parameters['DispDEF'] == 1) ? true : false;
	dispParameters[4] = (parameters['DispMAT'] == 1) ? true : false;
	dispParameters[5] = (parameters['DispMDF'] == 1) ? true : false;
	dispParameters[6] = (parameters['DispAGI'] == 1) ? true : false;
	dispParameters[7] = (parameters['DispLUK'] == 1) ? true : false;
	var DispGold = (parameters['DispGold'] == 1) ? true : false;
	var DispDropItems = (parameters['DispDropItems'] == 1) ? true : false;
	var dispRates = [];
	dispRates[1] = (parameters['DispResistElement'] == 1) ? true : false;
	var ResistElementName = String(parameters['ResistElementName'] || "耐性属性");
	dispRates[0] = (parameters['DispWeakElement'] == 1) ? true : false;
	var WeakElementName = String(parameters['WeakElementName'] || "弱点属性");
	dispRates[3] = (parameters['DispResistState'] == 1) ? true : false;
	var ResistStateName = String(parameters['ResistStateName'] || "耐性ステート");
	dispRates[2] = (parameters['DispWeakState'] == 1) ? true : false;
	var WeakStateName = String(parameters['WeakStateName'] || "弱点ステート");
	dispRates[4] = (parameters['DispNoEffectState'] == 1) ? true : false;
	var NoEffectStateName = String(parameters['NoEffectStateName'] || "無効ステート");
	var UnknownDropItemIcon = Number(parameters['UnknownDropItemIcon']);
	if (UnknownDropItemIcon === Number.NaN) UnknownDropItemIcon = 0;
	var DefeatNumberName = String(parameters['DefeatNumberName'] || "倒した数");
	var ElementIcons = (parameters['ElementIcons']).split(" ");
	var a = [0];
	ElementIcons = a.concat(ElementIcons);

	if (typeof(Imported) === "undefined") Imported = {};


//=============================================================================
// Game_System
//=============================================================================

	var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'EnemyBook') {
			switch(args[0]) {
			case 'open':
				// v1.17
				if ($gameParty.inBattle()) {
					SceneManager._scene.allBattleEnemyBook();
				} else {
					SceneManager.push(Scene_EnemyBook);
				}
				break;
			case 'add':
				$gameSystem.addToEnemyBook(Number(args[1]));
				break;
			case 'remove':
				$gameSystem.removeFromEnemyBook(Number(args[1]));
				break;
			case 'complete':
				$gameSystem.completeEnemyBook();
				break;
			case 'clear':
				$gameSystem.clearEnemyBook();
				break;
			case 'showInBattle':
				$gameSystem.setShowBattleEnemyBook(true);
				break;
			case 'hideInBattle':
				$gameSystem.setShowBattleEnemyBook(false);
				break;
			case 'showCurrentStatus':
				$gameSystem.setShowCurrentEnemysStatus(true);
				break;
			case 'showGeneralStatus':
				$gameSystem.setShowCurrentEnemysStatus(false);
				break;
			case 'getAchievement':
				$gameSystem.getAchievement(args[1], Number(args[2]));
				break;
			case 'isRegistered':
				$gameSystem.isRegistered(Number(args[1]), Number(args[2]));
				break;
			case 'getDefeatNumber':
				$gameSystem.getDefeatNumber(Number(args[1]), Number(args[2]));
				break;
			// v1.16
			case 'openEnemy':
				$gameTemp.ABEnemyBookId = Number(args[1]);
				SceneManager.push(Scene_EnemyBook);
				break;
			//v1.17
			case 'showAllInBattle':
				$gameSystem.setShowBattleAllEnemyBook(true);
				break;
			case 'hideAllInBattle':
				$gameSystem.setShowBattleAllEnemyBook(false);
				break;
			case 'clearDefeatNumber':
				$gameSystem.clearDefeatNumber();
				break;
			// 1.22
			case 'clearEnemyDrop':
				$gameSystem.clearEnemyDropGot();
				break;
			}
		}
	};
	
	var Game_System_prototype_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		Game_System_prototype_initialize.call(this);
		this.initEnemyBookSettings();
	};

	Game_System.prototype.initEnemyBookSettings = function() {
		this._showBattleEnemyBook = ShowCommandInBattle;
		this._showAllBookCommandInBattle = ShowAllBookCommandInBattle;
		this._showCurrentEnemyStatus = ShowCurrentStatus;
	};

	Game_System.prototype.setShowBattleEnemyBook = function(value) {
		this._showBattleEnemyBook = value;
	};
	Game_System.prototype.isShowBattleEnemyBook = function() {
		if (this._showBattleEnemyBook === undefined) this.initEnemyBookSettings();
		return this._showBattleEnemyBook;
	};

	Game_System.prototype.setShowBattleAllEnemyBook = function(value) {
		this._showAllBookCommandInBattle = value;
	};
	Game_System.prototype.isShowBattleAllEnemyBook = function() {
		if (this._showAllBookCommandInBattle === undefined) this.initEnemyBookSettings();
		return this._showAllBookCommandInBattle;
	};

	Game_System.prototype.setShowCurrentEnemysStatus = function(value) {
		this._showCurrentEnemyStatus = value;
	};
	Game_System.prototype.isShowCurrentEnemysStatus = function() {
		if (this._showCurrentEnemyStatus === undefined) this.initEnemyBookSettings();
		return this._showCurrentEnemyStatus;
	};

	Game_System.prototype.clearEnemyBook = function() {
		this._enemyBookFlags = [];
	};

	Game_System.prototype.addToEnemyBook = function(enemyId) {
		if (!this._enemyBookFlags) {
			this.clearEnemyBook();
		}
		this._enemyBookFlags[enemyId] = true;
	};

	
	Game_System.prototype.removeFromEnemyBook = function(enemyId) {
		if (this._enemyBookFlags) {
			this._enemyBookFlags[enemyId] = false;
		}
	};

	Game_System.prototype.completeEnemyBook = function() {
		this.clearEnemyBook();
		for (var i = 1; i < $dataEnemies.length; i++) {
			this._enemyBookFlags[i] = true;
		}
	};
	
	
	Game_System.prototype.isInEnemyBook = function(enemy) {
		if (this._enemyBookFlags && enemy) {
				return !!this._enemyBookFlags[enemy.id];
		} else {
			return false;
		}
	};

	Game_System.prototype.clearDefeatNumber = function() {
		this._defeatNumbers = [];
	};

	Game_System.prototype.incrementDefeatNumber = function(id) {
		if (!this._defeatNumbers) {
			this.clearDefeatNumber();
		}
		if (!this._defeatNumbers[id]) {
			this._defeatNumbers[id] = 0;
		}
		this._defeatNumbers[id]++;
	};

	Game_System.prototype.defeatNumber = function(id) {
		if (!this._defeatNumbers) {
			this.clearDefeatNumber();
		}
		if (!this._defeatNumbers[id]) {
			this._defeatNumbers[id] = 0;
		}
		return this._defeatNumbers[id];
	};

	Game_System.prototype.getRegisterNumber = function() {
		var a=0;
		for (var i=1; i<$dataEnemies.length; i++) {
			var enemy = $dataEnemies[i];
			if (enemy.name && enemy.meta.book !== 'no') {
				if (this.isInEnemyBook(enemy)) a++;
			}
		}
		return a;
	};

	Game_System.prototype.getRegisterPercent = function() {
		var a=0;
		var b=0;
		for (var i=1; i<$dataEnemies.length; i++) {
			var enemy = $dataEnemies[i];
			if (enemy.name && enemy.meta.book !== 'no') {
				if (this.isInEnemyBook(enemy)) a++;
				b++;
			}
		}
		return Math.floor(a*100/b);
	};

	Game_System.prototype.getAchievement = function(type, vId) {
		if (type == 'per' || type == 'percent') {
			var num = this.getRegisterPercent();
			$gameVariables.setValue(vId, num);
		} else if (type == 'num' || type == 'number') {
			var num = this.getRegisterNumber();
			$gameVariables.setValue(vId, num);
		}
	};

	Game_System.prototype.isRegistered = function(eId, sId) {
		var enemy = $dataEnemies[eId];
		if (this.isInEnemyBook(enemy)) {
			$gameSwitches.setValue(sId, true);
		} else {
			$gameSwitches.setValue(sId, false);
		}
	};

	Game_System.prototype.getDefeatNumber = function(eId, vId) {
		var num = this.defeatNumber(eId);
		$gameVariables.setValue(vId, num);
	};

	Game_System.prototype.clearEnemyDropGot = function() {
		this._enemyDropGot = [];
	};

	Game_System.prototype.setEnemyDropGot = function(eId, iId, value) {
		if (!this._enemyDropGot) {
			this._enemyDropGot = [];
		}
		if (!this._enemyDropGot[eId]) {
			this._enemyDropGot[eId] = [];
		}
		this._enemyDropGot[eId][iId] = value;
	};

	Game_System.prototype.getEnemyDropGot = function(eId, iId) {
		if (!HideItemUntilGet) return true;
		if (!this._enemyDropGot) {
			this._enemyDropGot = [];
			return false;
		}
		if (!this._enemyDropGot[eId]) {
			return false;
		}
		if (!this._enemyDropGot[eId][iId]) {
			return false;
		}
		return true;
	};


//=============================================================================
// 戦闘開始時に登録
//=============================================================================
	if (ResisterTiming === 1) {
		var _Game_Troop_setup = Game_Troop.prototype.setup;
		Game_Troop.prototype.setup = function(troopId) {
			_Game_Troop_setup.call(this, troopId);
			this.members().forEach(function(enemy) {
				if (enemy.isAppeared()) {
					$gameSystem.addToEnemyBook(enemy.enemyId());
				}
			}, this);
		};
		
		var _Game_Enemy_appear = Game_Enemy.prototype.appear;
		Game_Enemy.prototype.appear = function() {
			_Game_Enemy_appear.call(this);
			$gameSystem.addToEnemyBook(this._enemyId);
		};
		
		var _Game_Enemy_transform = Game_Enemy.prototype.transform;
			Game_Enemy.prototype.transform = function(enemyId) {
			_Game_Enemy_transform.call(this, enemyId);
			$gameSystem.addToEnemyBook(enemyId);
		};
//=============================================================================
// 戦闘終了時に登録
//=============================================================================
	} else if (ResisterTiming === 2) {
		
		var _Game_Troop_setup = Game_Troop.prototype.setup;
		Game_Troop.prototype.setup = function(troopId) {
			_Game_Troop_setup.call(this, troopId);
			this._appearedMembers = [];
			this.members().forEach(function(enemy) {
				if (enemy.isAppeared()) {
					this._appearedMembers.push(enemy.enemyId());
				}
			}, this);
		};
		
		var _Game_Enemy_appear = Game_Enemy.prototype.appear;
		Game_Enemy.prototype.appear = function() {
			_Game_Enemy_appear.call(this);
			this.friendsUnit()._appearedMembers.push(this._enemyId);
		};
		
		var _Game_Enemy_transform = Game_Enemy.prototype.transform;
			Game_Enemy.prototype.transform = function(enemyId) {
			_Game_Enemy_transform.call(this, enemyId);
			this.friendsUnit()._appearedMembers.push(this._enemyId);
		};

		var Game_Troop_prototype_onBattleEnd = 
			(Game_Troop.prototype.onBattleEnd || Game_Unit.prototype.onBattleEnd);
		Game_Troop.prototype.onBattleEnd = function() {
			Game_Troop_prototype_onBattleEnd.call(this);
			for (var i=0,l=this._appearedMembers.length; i<l; i++) {
				$gameSystem.addToEnemyBook(this._appearedMembers[i]);
			}
		};
	}

//=============================================================================
// Window_PartyCommand
//=============================================================================

	var Window_PartyCommand_prototype_makeCommandList = 
		Window_PartyCommand.prototype.makeCommandList;
	Window_PartyCommand.prototype.makeCommandList = function() {
		Window_PartyCommand_prototype_makeCommandList.call(this);
		this.addEnemyBookCommand();
		this.addAllEnemyBookCommand();
	}

	Window_PartyCommand.prototype.addEnemyBookCommand = function() {
		if (!$gameSystem.isShowBattleEnemyBook()) return;
		var index = this.findSymbol('escape');
		var obj = {name:EnemyBookCommandName, symbol:'enemybook', enabled:true};
		//this.addCommandAt(index, EnemyBookCommandName, 'enemybook', true);
		this._list.splice(index, 0, obj);
		
	};
	// v1.17
	Window_PartyCommand.prototype.addAllEnemyBookCommand = function() {
		if (!$gameSystem.isShowBattleAllEnemyBook()) return;
		var index = this.findSymbol('escape');
		var obj = {name:EnemyBookAllCommandName, symbol:'allenemybook', enabled:true};
		this._list.splice(index, 0, obj);
	};


//=============================================================================
// Scene_Battle
//=============================================================================
	var Scene_Battle_prototype_createAllWindows = 
		Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		Scene_Battle_prototype_createAllWindows.call(this);
		this.createEnemyBookWindows();
	};

	Scene_Battle.prototype.createEnemyBookWindows = function() {
		this._enemyBookIndexWindow = new Window_EnemyBookIndex(0, 0);
		this._enemyBookIndexWindow.setHandler('cancel', this.endBattleEnemyBook.bind(this));
		this._enemyBookIndexWindow.deselect();

		var wx = this._enemyBookIndexWindow.width;
		var ww = Graphics.boxWidth - wx;
		var wh = Scene_EnemyBook.prototype.calcStatusWindowHeight();
		this._enemyBookStatusWindow = new Window_EnemyBookStatus(wx, 0, ww, wh);

		this._enemyBookIndexWindow.hide();
		this._enemyBookStatusWindow.hide();


		this.addWindow(this._enemyBookIndexWindow);
		this.addWindow(this._enemyBookStatusWindow);

		this._enemyBookIndexWindow.setStatusWindow(this._enemyBookStatusWindow);
	};
	
	var Scene_Battle_prototype_isAnyInputWindowActive = 
		Scene_Battle.prototype.isAnyInputWindowActive;
	Scene_Battle.prototype.isAnyInputWindowActive = function() {
		if (Scene_Battle_prototype_isAnyInputWindowActive.call(this)) return true;
		return this._enemyBookIndexWindow.active;
	};

	var Scene_Battle_prototype_createPartyCommandWindow = 
		Scene_Battle.prototype.createPartyCommandWindow;
	Scene_Battle.prototype.createPartyCommandWindow = function() {
		Scene_Battle_prototype_createPartyCommandWindow.call(this);
		var win = this._partyCommandWindow;
		win.setHandler('enemybook', this.battleEnemyBook.bind(this));
		win.setHandler('allenemybook', this.allBattleEnemyBook.bind(this));
	};

	Scene_Battle.prototype.battleEnemyBook = function() {
		// v1.17
		this._enemyBookStatusWindow.isAllEnemies = false;
		this._enemyBookIndexWindow.isAllEnemies = false;
		this._enemyBookStatusWindow.setup();
		this._enemyBookIndexWindow.setup();
	};
// v1.17
	Scene_Battle.prototype.allBattleEnemyBook = function() {
		this._enemyBookStatusWindow.isAllEnemies = true;
		this._enemyBookIndexWindow.isAllEnemies = true;
		this._enemyBookStatusWindow.setup();
		this._enemyBookIndexWindow.setup();
	};

	// v1.17deselectをcloseの後に移動
	// これが呼ばれた後に
	// Window_EnemyBookIndex.processCancelが呼ばれる？
	Scene_Battle.prototype.endBattleEnemyBook = function() {
		this._enemyBookIndexWindow.close();
		this._enemyBookStatusWindow.close();
		this._enemyBookIndexWindow.deselect();
		//this.startPartyCommandSelection();
	};

//=============================================================================
// Scene_EnemyBook
//=============================================================================

	Scene_EnemyBook = function() {
		this.initialize.apply(this, arguments);
	}
	Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;
	
	Scene_EnemyBook.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_EnemyBook.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this._percentWindow = new Window_EnemyBookPercent(0, 0);
		var wy = this._percentWindow.height;
		this._indexWindow = new Window_EnemyBookIndex(0, wy);
		this._indexWindow.setHandler('cancel', this.popScene.bind(this));
		var wx = this._indexWindow.width;
		var ww = Graphics.boxWidth - wx;
		var wh = this.calcStatusWindowHeight();
		this._statusWindow = new Window_EnemyBookStatus(wx, 0, ww, wh);
		this.addWindow(this._percentWindow);
		this.addWindow(this._indexWindow);
		this.addWindow(this._statusWindow);
		// Xv1.16 （セットアップって自動で呼ばれたような？）
		this._indexWindow.isAllEnemies = true;
		this._statusWindow.isAllEnemies = true;
		this._indexWindow.setup();
		this._indexWindow.setStatusWindow(this._statusWindow);
		this._indexWindow.setPercentWindow(this._percentWindow);
	};

	Scene_EnemyBook.prototype.calcStatusWindowHeight = function() {
		var lineHeight = Window_Base.prototype.lineHeight();
		var textPadding = Window_Base.prototype.textPadding();
		var standardPadding = Window_Base.prototype.standardPadding();
		var paramHeight = Scene_EnemyBook.prototype.calcParameterHeight();
		var height = paramHeight + standardPadding * 2;
		var linePlus = 0;
		for (var i = 0; i < 5; i++) {
			if (dispRates[i]) {
				linePlus += 0.5;
			}
		}
		linePlus = Math.ceil(linePlus) * 2;

		if (DispDescribe) {
			linePlus += 2;
		}
		height += linePlus * lineHeight + textPadding * Math.ceil(linePlus / 2);
		return height;
	};

	Scene_EnemyBook.prototype.calcParameterHeight = function() {
		var lineHeight = Window_Base.prototype.lineHeight();
		var textPadding = Window_Base.prototype.textPadding();
		var standardPadding = Window_Base.prototype.standardPadding();
		var height = 0;
		var linePlus = 0;
		for (var i = 0; i < 8; i++) {
			if (dispParameters[i]) {
				linePlus++;
			}
		}
		if (DispDefeatNumber) linePlus++;
		if (DispLv) linePlus++;

		linePlus = Math.max(linePlus, DispGold ? 9 : 6); //$dataEnemies[enemyId].gold
		//linePlus = Math.max(linePlus, DispDropItems ? 9 : 6);
		height = lineHeight * linePlus + textPadding * 2;

		return height;
	};


//=============================================================================
// Window_EnemyBookPercent
//=============================================================================

	Window_EnemyBookPercent = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyBookPercent.prototype = Object.create(Window_Base.prototype);
	Window_EnemyBookPercent.prototype.constructor = Window_EnemyBookPercent;

	Window_EnemyBookPercent.prototype.initialize = function(x, y, width, height) {
		var width = Math.floor(Graphics.boxWidth / 3);
		var height = this.fittingHeight(1);
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.max = 0;
		this.achievement = 0;
	};

	Window_EnemyBookPercent.prototype.setup = function() {
		this.show();
		this.open();
	};

	Window_EnemyBookPercent.prototype.setAchievement = function(max, achievement) {
		this.max = max;
		this.achievement = achievement;
		this.refresh();
	}

	Window_EnemyBookPercent.prototype.refresh = function() {
		if (this.max === 0) return;
		var w1 = this.contentsWidth()/2;
		this.drawText(Achievement, 0, 0, w1);
		this.drawText(Math.floor(this.achievement / this.max * 100) + "%", w1, 0, w1, 'right');
	}

//=============================================================================
// Window_EnemyBookIndex
//=============================================================================
	Window_EnemyBookIndex = function() {
		this.initialize.apply(this, arguments);
	}
	Window_EnemyBookIndex.prototype = Object.create(Window_Selectable.prototype);
	Window_EnemyBookIndex.prototype.constructor = Window_EnemyBookIndex;

	Window_EnemyBookIndex.lastIndex  = 0;

	Window_EnemyBookIndex.prototype.initialize = function(x, y) {
		var width = Math.floor(Graphics.boxWidth / 3);
		var height = Graphics.boxHeight - y;
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		//this.refresh();
		// v1.17
		this.isAllEnemies = false;
		this.enemy = null;
	}

	Window_EnemyBookIndex.prototype.setup = function() {
		this.refresh();
				// v1.17
		// setupがいつ呼ばれるかによっては図鑑を開いたときでも
		// 初期カーソルが0になってしまう恐れ
		if (!this.isAllEnemies) {
			this.select(0);
		// ver1.16
		} else if ($gameTemp.ABEnemyBookId){
			var no = 0;
			var id = $gameTemp.ABEnemyBookId;
			$gameTemp.ABEnemyBookId = null;
			this._list.some(function(enemy, i){
				if (id === enemy.enemyId()) {
					no = i;
					return true;
				}
				return false;
			});
			this.select(no);
		} else {
			this.select(Window_EnemyBookIndex.lastIndex);
		}
		this.show();
		this.activate();
		this.open();
	};

	Window_EnemyBookIndex.prototype.setupWhenCheck = function() {
		this.refresh();
				// v1.17
		// setupWhenCheckがいつ呼ばれるかによっては図鑑を開いたときでも
		// 初期カーソルが0になってしまう恐れ
		// ただsetupWhenCheckはチェックスキルのときだけ使われるので平気だった
		if (!this.isAllEnemies) {
			this.select(0);
		} else {
			this.select(Window_EnemyBookIndex.lastIndex);
		}
		this.openness = 255;
		this.hide();
		this.activate();
	};

	Window_EnemyBookIndex.prototype.maxCols = function() {
		return 1;
	};

	Window_EnemyBookIndex.prototype.maxItems = function() {
		return this._list ? this._list.length : 0;
	};

	Window_EnemyBookIndex.prototype.setPercentWindow = function(percentWindow) {
		this._percentWindow = percentWindow;
		this.updatePercent();
	};

	Window_EnemyBookIndex.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
		this.updateStatus();
	};

	Window_EnemyBookIndex.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		this.updateStatus();
	};

	Window_EnemyBookIndex.prototype.updatePercent = function() {
		if (this._percentWindow && this._list) {
			var a = $gameSystem.getRegisterNumber();
			this._percentWindow.setAchievement(this._list.length, a);
		}
	}

	Window_EnemyBookIndex.prototype.updateStatus = function() {
		if (this._statusWindow && this._list) {
			var enemy = this._list[this.index()];
			this._statusWindow.setEnemy(enemy);
		}
	};

	Window_EnemyBookIndex.prototype.refresh = function() {
		this._list = [];
		if (this.enemy) {
			this._list.push(this.enemy);
				// v1.17
		} else if (!this.isAllEnemies && $gameSystem.isShowCurrentEnemysStatus()) {
			var enemies = $gameTroop.aliveMembers();
			for (var i=0,l=enemies.length; i<l; i++) {
				if (enemies[i].enemy().meta.book !== 'no') {
					this._list.push(enemies[i]);
				}
			}
				// v1.17
		} else if (!this.isAllEnemies) {
			var enemyIds = [];
			var enemies = $gameTroop.aliveMembers();
			for (var i=0,l=enemies.length; i<l; i++) {
				var id = enemies[i].enemyId();
				var flag = enemyIds.some(function(id2) {
					return id === id2;
				});
				if (enemies[i].enemy().meta.book !== 'no' && !flag) {
					enemyIds.push(id);
					var gameEnemy = new Game_Enemy(id,0,0);
					this._list.push(gameEnemy);
				}
			}
		} else {
			for (var i = 1; i < $dataEnemies.length; i++) {
				var enemy = $dataEnemies[i];
				if (enemy.name && enemy.meta.book !== 'no') {
					var gameEnemy = new Game_Enemy(i,0,0);
					this._list.push(gameEnemy);
				}
			}
		}
		this.createContents();
		this.drawAllItems();
	};

	Window_EnemyBookIndex.prototype.drawItem = function(index) {
		var enemy = this._list[index];
		var rect = this.itemRectForText(index);
		var name;
		// ここは、名前を？にするか判定しているだけなので変えない
		// v1.18　（↑は間違ってた）
		if (!this.isAllEnemies || $gameSystem.isInEnemyBook(enemy.enemy())) {
			name = enemy.name();
		} else {
			name = UnknownEnemy;
		}
				// v1.17
		if (this.isAllEnemies && DispNo) {
			this.drawText(index+1, rect.x, rect.y, 40);
			this.drawText(name, rect.x + 40, rect.y, rect.width - 40);
		} else {
			this.drawText(name, rect.x, rect.y, rect.width);
		}
	};
/* ツクールMV rpg_windows.jsより
Window_Selectable.processCancelでハンドラが呼ばれている。
Window_Selectable.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};
*/
// TODO: 戦闘中に図鑑（全体）を開いた後、チェックスキルを使うと何も表示されない
	Window_EnemyBookIndex.prototype.processCancel = function() {
		// v1.17
		if (this.isAllEnemies) {
			Window_EnemyBookIndex.lastIndex = this.index();
		}
		this.enemy = null;
		this._statusWindow.isCheck = false;
		// v1.17 後ろに移動
		Window_Selectable.prototype.processCancel.call(this);
	};

//=============================================================================
// Window_EnemyBookStatus
//=============================================================================

	Window_EnemyBookStatus = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyBookStatus.prototype = Object.create(Window_Base.prototype);
	Window_EnemyBookStatus.prototype.constructor = Window_EnemyBookStatus;

	Window_EnemyBookStatus.prototype.initialize = function(x, y, width, height) {
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this._defaultX = x;
		this._enemy = null;
		this._enemySprite = new Sprite();
		this._enemySprite.anchor.x = 0.5;
		this._enemySprite.anchor.y = 0.5;
		this._enemySprite.x = width / 4;
		this._enemySprite.y = width / 4 + this.lineHeight();
		this.addChildToBack(this._enemySprite);
		this.isCheck = false;
		this.refresh();
		// v1.17
		this.isAllEnemies = false;
		// this._cw = 0;
		this._spriteFrameCountAB = 0;
	};

	Window_EnemyBookStatus.prototype.setup = function() {
		this.x = this._defaultX;
		this.show();
		this.open();
	};

	Window_EnemyBookStatus.prototype.setupWhenCheck = function() {
		this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
		this.show();
		this.open();
	};

	Window_EnemyBookStatus.prototype.setEnemy = function(enemy) {
		if (this._enemy !== enemy) {
			this._enemy = enemy;
			this.refresh();
		}
	};

// refresh に移動
// Version 1.11で復活

	Window_EnemyBookStatus.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		// ver 1.11
		if (this._enemySprite.bitmap) {
			var dataEnemy = this._enemy.enemy();
			// version 1.15
			var bitmap = this._enemySprite.bitmap;
			// ver 1.13
			if (Imported.YEP_X_AnimatedSVEnemies) {
				if (this._spriteFrameCountAB % 12 === 0) {
					if (dataEnemy.sideviewBattler[0]) {
						var ary = [0,1,2,1];
						var motionIndex = 0; // 待機モーション
						var pattern = ary[Math.floor(this._spriteFrameCountAB / 12) % 4];
						var cw = bitmap.width / 9;
						var ch = bitmap.height / 6;
						var cx = Math.floor(motionIndex / 6) * 3 + pattern;
						var cy = motionIndex % 6;
						this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
						// YEP_X_AnimatedSVEnemiesにはここに Sprite_Enemy.adjustMainBitmapSettingsがある。
						// これはBitmapを新しく作っている。（？）
						// サイドビューバトラーの高さと幅を指定していた場合調整される。
						// this._enemySprite.bitmap = new Bitmap(cw, ch);
					// サイドビューバトラーじゃない場合
					} else {
						// 1回目に表示されるようになったけどはみ出す
						this._enemySprite.setFrame(0,0,bitmap.width, bitmap.height);
						// undefined
						// console.log(this._enemySprite.spriteScaleX);
					}
				}
			}
			//ver 1.12
			if (Imported.YEP_X_AnimatedSVEnemies && dataEnemy.sideviewBattler[0]) {
				var bitmapWidth = bitmap.width / 9;
			} else {
				var bitmapWidth = bitmap.width;
			}
			var contentsWidth = this.contents.width;
			var scale = 1;
			//
			//console.log(this._enemySprite.bitmap.width);
			//console.log(contentsWidth);
			if (bitmapWidth > contentsWidth / 2) {
				scale = contentsWidth / bitmapWidth / 2;
				//console.log("bitmapWidth(+"bitmapWidth"+) > contentsWidth / 2");
			}
			this._enemySprite.scale.x = scale;
			this._enemySprite.scale.y = scale;
			this._spriteFrameCountAB++;
		}
	};

	Window_EnemyBookStatus.prototype.refresh = function() {
		var enemy = this._enemy;
		var column1x = 0;
		var column2x = this.contentsWidth() / 2 + this.standardPadding() / 2;
		var columnWidth = this.contentsWidth() / 2 - this.standardPadding();
		var x = 0;
		var y = 0;
		var w = column2x / 2 - this.standardPadding();
		//var mY = 0;
		var lineHeight = this.lineHeight();

		this.contents.clear();

				// v1.17
		if (!enemy || (this.isAllEnemies && !$gameSystem.isInEnemyBook(enemy.enemy()))) {
			this._enemySprite.bitmap = null;
			return;
		}

		
		var isUnknownEnemy = (!$gameSystem.isInEnemyBook(enemy.enemy()) && (!this.isCheck || HideUnknownStatusInSkill));
		var dataEnemy = enemy.enemy();

		var name = enemy.battlerName();
		var hue = enemy.battlerHue();

		var bitmap;
		
		this._enemySprite.scale.x = 1;
		this._enemySprite.scale.y = 1;
		if ($gameSystem.isSideView()) {
			// YEP_X_AnimatedSVEnemiesへの対応（v1.08）
			if (Imported.YEP_X_AnimatedSVEnemies && dataEnemy.sideviewBattler[0]) {
				name = Yanfly.Util.getRandomElement(dataEnemy.sideviewBattler);
				bitmap = ImageManager.loadSvActor(name);
				var motionIndex = 0;
				var pattern = 1;
				var cw = bitmap.width / 9;
				var ch = bitmap.height / 6;
				var cx = Math.floor(motionIndex / 6) * 3 + pattern;
				var cy = motionIndex % 6;
				this._enemySprite.bitmap = bitmap;
				this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);

			} else {
				bitmap = ImageManager.loadSvEnemy(name, hue);
				var cw = bitmap.width;
				var ch = bitmap.height;
				var cx = 0;
				var cy = 0;
				this._enemySprite.bitmap = bitmap;
				// Ver1.11 たぶんこれが原因で1回目に表示されないので、
				// YEP_X_AnimatedSVEnemiesを使っていないときは
				// 処理をしない
				if (Imported.YEP_X_AnimatedSVEnemies) {
					this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
				}
			}
			
		} else {
			bitmap = ImageManager.loadEnemy(name, hue);
			var cw = bitmap.width;
			var ch = bitmap.height;
			var cx = 0;
			var cy = 0;
			this._enemySprite.bitmap = bitmap;
			if (Imported.YEP_X_AnimatedSVEnemies) {
				this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
			}
		}
		// Version 1.11
		// version 1.13で削除
		// this._cw = cw;

		// ver 1.12
/*
		var bitmapWidth = this._cw;
		var contentsWidth = this.contents.width;
		var scale = 1;
		if (bitmapWidth > contentsWidth / 2) {
			scale = contentsWidth / bitmapWidth / 2;
		}
		this._enemySprite.scale.x = scale;
		this._enemySprite.scale.y = scale;
		
*/
		this.resetTextColor();
		this.drawText(enemy.name(), x, y, columnWidth);

		x = column2x;

		if (dataEnemy.meta.bookLevel && DispLv) {
			this.resetTextColor();
			this.drawText(TextManager.levelA + " " + dataEnemy.meta.bookLevel, x, y);
		}


		if (DispLv) y += lineHeight;
		if (DispDefeatNumber) {
			this.resetTextColor();
			this.drawText(DefeatNumberName, x, y, w);
			this.drawText($gameSystem.defeatNumber(enemy.enemyId()), x + w, y, w , 'right');
			y += lineHeight;
		}

		if (y != 0) y += this.textPadding();

		for (var i = 0; i < 8; i++) {
			if (dispParameters[i]) {
				// v1.17
				if (i == 0 && !this.isAllEnemies && ($gameSystem.isShowCurrentEnemysStatus() || this.isCheck) && !ShowGeneralStatusInSkill) {
					if (!isUnknownEnemy) {
						this.drawActorHp(enemy, x, y, 220);
					}	else {
						this.changeTextColor(this.systemColor());
						this.drawText(TextManager.hpA, x, y, 60);
						this.resetTextColor();
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				// v1.17
				} else if (i == 1 && !this.isAllEnemies && ($gameSystem.isShowCurrentEnemysStatus() || this.isCheck) && !ShowGeneralStatusInSkill) {
					if (!isUnknownEnemy) {
						this.drawActorMp(enemy, x, y, 220);
					}	else {
						this.changeTextColor(this.systemColor());
						this.drawText(TextManager.mpA, x, y, 60);
						this.resetTextColor();
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				} else {
					this.changeTextColor(this.systemColor());
					this.drawText(TextManager.param(i), x, y, w);
					this.resetTextColor();
					if (!isUnknownEnemy) {
						this.drawText(enemy.param(i), x + w, y, w, 'right');
					} else {
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				}
				y += lineHeight;
			}
		}
/*
		if (DispDefeatNumber) {
			this.resetTextColor();
			this.changeTextColor(this.systemColor());
			this.drawText(DefeatNumberName, x, y, w);
			this.resetTextColor();
			this.drawText($gameSystem.defeatNumber(enemy.enemyId()), x + w, y, w , 'right');
			y += lineHeight;
		}
*/
		//mY = y;

		x = column1x;
		y = lineHeight * 6 + this.textPadding();

		if (DispGold) {
			if (!isUnknownEnemy) {
				this.changeTextColor(this.systemColor());
				this.drawText('获得金钱：' + $dataEnemies[enemy._enemyId].gold, x + w * 2, y, w, 'right');
				this.resetTextColor();
			}else {
				this.changeTextColor(this.systemColor());
				//this.drawText(TextManager.hpA, x, y, 60);
				this.drawText(UnknownData, x + w * 2, y, w, 'right');
				this.resetTextColor();
			}
		}

	/*	
		if (DispDropItems) {
			for (var i = 0, l = dataEnemy.dropItems.length; i < l; i++) {
				var di = dataEnemy.dropItems[i];
				if (di.kind > 0) {
					if (!isUnknownEnemy && $gameSystem.getEnemyDropGot(enemy._enemyId, i)) {
						var item = enemy.itemObject(di.kind, di.dataId);
						this.drawItemName(item, x, y, columnWidth);
					} else {
						this.drawIcon(16, x, y);
						this.drawText(UnknownData, x + 32, y);
					}
					y += lineHeight;
				}
			}
		}
	*/

		x = 0;
		y = Scene_EnemyBook.prototype.calcParameterHeight();
		//y = (mY > y) ? mY : y;
		var j = 0;

		for (var i = 0; i < 5; i++) {
			if (dispRates[i]) {
				switch(i) {
				case 0:
					this.drawWeakElement(x, y, columnWidth);
					break;
				case 1:
					this.drawResistElement(x, y, columnWidth);
					break;
				case 2:
					this.drawWeakStates(x, y, columnWidth);
					break;
				case 3:
					this.drawResistStates(x, y, columnWidth);
					break;
				case 4:
					this.drawNoEffectStates(x, y, columnWidth);
					break;
				}
				j++;
				if (j % 2 == 1) {
					x = column2x;
				} else {
					x = column1x;
					y += lineHeight * 2 + this.textPadding();
				}
			}
		}
		if (x == column2x) 
			y += lineHeight * 2 + this.textPadding();
		x = 0;
		
		if (!isUnknownEnemy && DispDescribe) {
			this.drawTextEx(dataEnemy.meta.desc1, x, y + lineHeight * 0);
			this.drawTextEx(dataEnemy.meta.desc2, x, y + lineHeight * 1);
		}
	};

	Window_EnemyBookStatus.prototype.findElementIcon = function(elementId) {
		if (UseElementIconInPluginParameter) {
			return ElementIcons[elementId];
		} else {
			var elementName = $dataSystem.elements[elementId];
			if (elementName.match(/\i\[(\d+)\]/i)) {
				return RegExp.$1;
			}
		}
		return 0;
	};

	Window_EnemyBookStatus.prototype.drawResistElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate < 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push(icon);
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawWeakElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate > 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push(icon);
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawResistStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate < 1 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				if (dispRates[4] && (rate <= 0 || enemy.isStateResist(i))) continue;
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};
	Window_EnemyBookStatus.prototype.drawWeakStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if (rate > 1 && $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawNoEffectStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate <= 0 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(NoEffectStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};
//=============================================================================
// Game_Action
//=============================================================================

	var Game_Action_prototype_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		Game_Action_prototype_apply.call(this, target);
		this.applyEnemyBookEffect(target);
	};

	Game_Action.prototype.applyEnemyBookEffect = function(target) {
		if (target.isEnemy()) {
			if (this._item.object().meta.addToEnemyBook) {
				this.addToEnemyBook(target);
			}
			if (this._item.object().meta.checkEnemyStatus) {
				this.checkEnemyStatus(target);
			}
		}
	};

	Game_Action.prototype.addToEnemyBook = function(target) {
		var result = target.result();
		this.makeSuccess(target);
		if (result.isHit()) {
			if (target.enemy().meta.book !== "no") {
				$gameSystem.addToEnemyBook(target.enemyId());
				var message = AddEnemySkillMessage.replace("%1", target.name());
				if (message) {
					BattleManager._logWindow.push('addText', message);
				}
			} else {
				var message = FailToAddEnemySkillMessage.replace("%1", target.name());
				if (message) {
					BattleManager._logWindow.push('addText', message);
				}
			}
		} else {
			var message = MissToAddEnemySkillMessage.replace("%1", target.name());
			if (message) {
				BattleManager._logWindow.push('addText', message);
			}
		}
	};

	Game_Action.prototype.checkEnemyStatus = function(target) {
		this.makeSuccess(target);
		if (!(target.enemy().meta.book == "no" && !target.enemy().meta.bookCanCheck)) {
			var indexWindow = SceneManager._scene._enemyBookIndexWindow;
			var statusWindow = SceneManager._scene._enemyBookStatusWindow;
			if (ShowGeneralStatusInSkill) {
				var id = target.enemyId();
				indexWindow.enemy = new Game_Enemy(id, 0, 0);
			} else {
				indexWindow.enemy = target;
			}
			statusWindow.isCheck = true;
			// v1.17
			indexWindow.isAllEnemies = false;
			statusWindow.isAllEnemies = false;

			indexWindow.setupWhenCheck();
			statusWindow.setupWhenCheck();
		} else {
			var message = FailToCheckEnemySkillMessage.replace("%1", target.name());
			if (message) {
				BattleManager._logWindow.push('addText', message);
			}
		}
	};


//=============================================================================
// Game_Enemy
//=============================================================================

	var _Game_Enemy_die = Game_Enemy.prototype.die;
	Game_Enemy.prototype.die = function() {
		_Game_Enemy_die.call(this);
		$gameSystem.incrementDefeatNumber(this.enemyId());
	};

	var _Game_Enemy_prototype_makeDropItems = Game_Enemy.prototype.makeDropItems;
	Game_Enemy.prototype.makeDropItems = function() {
		var r = _Game_Enemy_prototype_makeDropItems.call(this);
		for (var i=0, l=r.length; i<l; i++) {
			var DI = this.enemy().dropItems;
			for (var j=0, jl=DI.length; j<jl; j++) {
				if (r[i].id === DI[j].dataId) {
					switch (DI[j].kind) {
					case 1:
						if (DataManager.isItem(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					case 2:
						if (DataManager.isWeapon(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					case 3:
						if (DataManager.isArmor(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					}
				}
			}
		}
		return r;
	}

})();