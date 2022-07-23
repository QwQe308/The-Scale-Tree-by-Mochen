addLayer("p", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "P", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { 
        return {
            points:n(0),
            unlocked:true,
            limit:n(2),
            math:n(0),
            digitCapacity:n(4),
            pc:n(0),
            cl21:n(0),
        }
},
    color: "无",
    resource: "点数", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires:new ExpantaNum(10),
    exponent:1,
    tooltip() {return "" },
    baseAmount(){return player.points},//基础资源数量
    baseResource:"点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return true},
    update(diff){
        var hpg = hasUpgrade
        var pc = n(0)
        if(inChallenge("g",11))pc = pc.add(1)
        if(hpg('p',11)) pc = pc.add(0.5)
        if(hpg('p',12)) pc = pc.add(0.5)
        if(hpg('p',14)) pc = pc.add(0.25)
        if(hpg('p',21)) pc = pc.add(0.5)
        if(hpg('p',22)) pc = pc.add(0.25)
        if(hpg('p',23)) pc = pc.mul(1.15)
        if(hpg('p',24)) pc = pc.mul(1.2)
        pc = pc.add(layers.g.clickables[21].gain())
        if(!inChallenge("g",11))pc = pc.mul(layers.g.clickables[22].gain())
        if(!inChallenge("g",11))pc = pc.pow(layers.g.clickables[23].gain())
        if(hpg('p',34)) pc = pc.mul(1.5)
        if(hasChallenge("g",11)) pc = pc.pow(1.15)
player.points = player.points.add(pc.mul(diff))
player.points = player.points.min(player.p.limit.pow(player.p.digitCapacity).sub(1))
player.p.pc = pc
if(inChallenge("g",11))player.p.digitCapacity = player.p.cl21.add(4)
    },
    

upgrades:{
        11: {
            title:"<h3>开始<br>每秒获取增加0.5",
            cost:new ExpantaNum(0),
            unlocked(){return !inChallenge("g",11)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost)},
            },
        12: {
            title:"<h3>等待<br>每秒获取<br>再增加0.5",
            cost:new ExpantaNum(4),
            unlocked(){return hasUpgrade("p",11)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost)},
            },
         13: {
            title:"<h3>有点少<br>多增加一位数上限",
            cost:new ExpantaNum(12),
            unlocked(){return hasUpgrade("p",12)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost);player.p.digitCapacity = player.p.digitCapacity.add(1)},
            },
        14: {
            title:"<h3>不对劲<br>每秒获取<br>增加0.25",
            cost:new ExpantaNum(20),
            unlocked(){return hasUpgrade("p",13)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost)},
            },
        15: {
            title:"<h3>不可逆<br>进制增加1",
            cost:new ExpantaNum(28),
            unlocked(){return hasUpgrade("p",14)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost);player.p.limit = player.p.limit.add(1)},
            },
        21: {
            title:"<h3>有点慢<br>每秒获取<br>增加0.5",
            cost:new ExpantaNum(43),
            unlocked(){return hasUpgrade("p",15)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost)},
            },
        22: {
            title:"<h3>漫长<br>每秒获取<br>增加0.25",
            cost:new ExpantaNum(66),
            unlocked(){return hasUpgrade("p",21)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost)},
            },
        23: {
            title:"<h3>加速<br>每秒获取<br>x1.15",
            cost:new ExpantaNum(99),
            unlocked(){return hasUpgrade("p",22)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost)},
            },
        24: {
            title:"<h3>二次加速<br>每秒获取<br>x1.2",
            cost:new ExpantaNum(133),
            unlocked(){return hasUpgrade("p",23)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost)},
            },
        25: {
            title:"<h3>开启点新元素",
            cost:new ExpantaNum(150),
            unlocked(){return hasUpgrade("p",24)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost)},
            },
        31: {
            title:"<h3>增加1位数上限",
            cost:new ExpantaNum(36),
            unlocked(){return hasUpgrade("p",25)},
            canAfford() {return player.g.points.gte(this.cost)},
            pay(){costg(this.cost);player.p.digitCapacity = player.p.digitCapacity.add(1)},
            currencyDisplayName:"金币"
            },
        32: {
            title:"<h3>增加1位进制",
            cost:new ExpantaNum(66),
            unlocked(){return hasUpgrade("p",31)},
            canAfford() {return player.g.points.gte(this.cost)},
            pay(){costg(this.cost);player.p.limit = player.p.limit.add(1)},
            currencyDisplayName:"金币"
            },
        33: {
            title:"<h3>改善金币获取公式",
            cost:new ExpantaNum(96),
            unlocked(){return hasUpgrade("p",31)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){costg(this.cost)},
            },
        34: {
            title:"<h3>是不是有点慢<br>点数获取x1.5",
            cost:new ExpantaNum(1000),
            unlocked(){return hasUpgrade("p",32)&&hasUpgrade("p",33)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost)},
            },
        35: {
            title:"<h3>让我们玩大的<br>再增加1位进制<br>解锁挑战",
            cost:new ExpantaNum(4095),
            unlocked(){return hasUpgrade("p",34)},
            canAfford() {return player.points.gte(this.cost)},
            pay(){cost(this.cost);player.p.limit = player.p.limit.add(1)},
            },
        },
    clickables:{
        /*11:{
            title:"点击增加数字",
            canClick(){return true},
            onClick(){
                if(player.p.limit.pow(player.p.digitCapacity).sub(1).gt(player.points)){
                player.points = player.points.add(100000)
                }
            },
        },
        12:{
            title:"点击增加位数",
            canClick(){return true},
            onClick(){
                player.p.digitCapacity = player.p.digitCapacity.add(1)
                }
            },
        13:{
            title:"点击增加进制",
            canClick(){return true},
            onClick(){
               player.p.limit = player.p.limit.add(1)
                }
            },*/
        21:{
            title(){return "增加位数上限<br>等级:"+player.p.cl21+"<br>增加+"+format(this.gain())+"<br>消耗："+formatWhole(this.cost())},
            style() {return {'height':'175px','width':'175px'}},
            canClick(){return player.points.gte(this.cost())},
            unlocked(){return inChallenge("g",11)},
            cost(){var cost = player.p.limit.pow(player.p.digitCapacity).sub(1);return cost},
            gain(){var gain = player.p.cl21;return gain},
            onClick(){player.points = player.points.sub(this.cost());player.p.cl21 = player.p.cl21.add(1)},
        },
    },
    tabFormat: [
        //"main-display",//你有xxx该重置点
        ["display-text",function(){return "所有数字已用进制代替(雾"}],
        "blank",
        //"prestige-button",//获取重置点按钮
        //"resource-display",//你有xxx什么
        "milestones",//里程碑
        "blank",//空
        "challenges",//挑战
        "buyables",//重复购买项
        "clickables",//按钮
        "blank",
        "blank",
        "upgrades",//升级
        ],
})
addLayer("g", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "G", // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() { 
        return {
            points:n(0),
            unlocked:true,
            cl21:n(0),
            cl22:n(0),
            cl23:n(0),
            getgoldtime:n(3),
        }
},
    color: "gold",
    resource: "金币", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires:new ExpantaNum(10),
    exponent:1,
    tooltip() {return "" },
    baseAmount(){return player.points},//基础资源数量
    baseResource:"点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return hasUpgrade("p",25)||inChallenge("g",11)||hasChallenge("g",11)},
    update(diff){
        player.g.getgoldtime = player.g.getgoldtime.sub(n(1).mul(diff)).max(0)
    },
    clickables:{
        11:{
            title(){return "将你的点数卖成" + format(this.gain(),2) + "金币" + "<br>间隔:"+format(player.g.getgoldtime,2) + "s"},
            canClick(){return this.gain().gte(1)&&player.g.getgoldtime.lte(0)},
            gain(){
                var gain = n(0)
                var num = player.points.add(2)
                hasUpgrade("p",33)?gain = num.pow(0.6):gain = num.pow(0.5)
                return gain
            },
            onClick(){
                player.g.points = player.g.points.add(this.gain())
                player.points = n(0)
                player.g.getgoldtime = n(3)
            },
        },
        21:{
            title(){return "增加点数获取<br>等级:"+player.g.cl21+"<br>你的点数获取+"+format(this.gain())+"<br>消耗："+formatWhole(this.cost())},
            style() {return {'height':'175px','width':'175px'}},
            canClick(){return player.g.points.gte(this.cost())},
            cost(){var cost = n(1);cost=cost.mul(n(2).mul(player.g.cl21.add(1)));return cost},
            gain(){var gain = n(0);gain = gain.add(player.g.cl21.mul(0.15));return gain},
            onClick(){player.g.points = player.g.points.sub(this.cost());player.g.cl21 = player.g.cl21.add(1)},
        },
        22:{
            title(){return "增加点数获取<br>等级:"+player.g.cl22+"<br>你的点数获取x"+format(this.gain())+"<br>消耗："+formatWhole(this.cost())},
            style() {return {'height':'175px','width':'175px'}},
            canClick(){return player.g.points.gte(this.cost())},
            unlocked(){return !inChallenge("g",11)},
            cost(){var cost = n(2);cost=cost.mul(n(3).mul(player.g.cl22.add(1)));return cost},
            gain(){var gain = n(0);gain = gain.add(player.g.cl22.mul(0.025)).add(1);return gain},
            onClick(){player.g.points = player.g.points.sub(this.cost());player.g.cl22 = player.g.cl22.add(1)},
        },
        23:{
            title(){return "增加点数获取<br>等级:"+player.g.cl23+"<br>你的点数获取^"+format(this.gain(),4)+"<br>消耗："+formatWhole(this.cost())},
            style() {return {'height':'175px','width':'175px'}},
            canClick(){return player.g.points.gte(this.cost())},
            unlocked(){return !inChallenge("g",11)},
            cost(){var cost = n(4);cost=cost.mul(n(6).mul(player.g.cl23.add(1)));return cost},
            gain(){var gain = n(0);gain = gain.add(player.g.cl23.mul(0.002)).add(1);return gain},
            onClick(){player.g.points = player.g.points.sub(this.cost());player.g.cl23 = player.g.cl23.add(1)},
        },
    },
    challenges: {
        11: {
            name: "<big><big><big>二 进 制",
            challengeDescription: "点数获取+1,禁用p节点所有升级和g节点后两个可重购买项,并且进制强制等于2,添加p节点可购买项.",
            canComplete(){return player.points.gte("1023")},
            goalDescription(){return format(ExpantaNum("1023"))+"点数(1111111111)(十位数)"},
            rewardDescription(){return `增加一位数上限,并且点数获取^1.15`},
            unlocked(){return hasUpgrade("p",35)||inChallenge("g",11)||hasChallenge("g",11)},
            onEnter(){layerDataReset("p");layerDataReset("g")},
            onComplete(){player.p.digitCapacity = n(5)},
        },
    },
    tabFormat: [
        ["display-text",function(){return "所有数字已用进制代替(雾"}],
        "blank",
        ["display-text",function(){return "您有 <span style='color: " + tmp[this.layer].color + " ; font-size: 25px;'>" + 
        formatWhole(player.g.points) + "</span> 金币"}],
        //"main-display",//你有xxx该重置点
        //"prestige-button",//获取重置点按钮
        //"resource-display",//你有xxx什么
        "blank",//空
        "buyables",//重复购买项
        "clickables",//按钮
        "blank",
        "blank",
        "upgrades",//升级
        "milestones",//里程碑
        "challenges",//挑战
        ],
})
