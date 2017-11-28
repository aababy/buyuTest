cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        bez : [],
        index : 1,

        P0 : cc.Vec2,
        P1 : cc.Vec2,
        P2 : cc.Vec2,
        P3 : cc.Vec2,
        total_length : 0,
        nIndex : 0,
        STEP : 70,
        acc : 0,
    },

    // use this for initialization
    onLoad: function () {
        this.scheduleOnce(this.runBezier, 0);
        //this.draw();

        var array = [
            [10.0, 2.96, 6.85, 3.23, 9.9, 8.57, 0, 8.3],
            [10, 9.24, -3.06, 6.84, 5.23, 2.94, 0, 0.68],
            [0, 7.85, 13.1, 7.02, 2.79, 0.49, 10, 0.58],
            [0, 1.92, 4.34, 6.45, 7.88, 4.55, 10, 10],
        ];

        var win = cc.winSize;
        var x = 0, y = 0;
        for(let i = 0; i < array.length; i++) {
            this.bez[i] = new Array();
            for (let j = 0; j < array[i].length; j++) {
                if (j % 2 == 0) {
                    x = array[i][j]/10 * win.width - win.width / 2;
                } else {
                    y = array[i][j]/10 * win.height - win.height / 2;
                    this.bez[i].push(cc.v2(x, y));
                }
            }
        }

        this.index = 1;

        this.P0 = this.bez[1][0];
        this.P1 = this.bez[1][1];
        this.P2 = this.bez[1][2];
        this.P3 = this.bez[1][3];
    },

    test : function() {
        this.total_length = this.beze_length(1.0); 
    },

    generateCoins: function () {
        cc.loader.loadRes("Prefab/Coins", function (err , prefable) {  
            for (let index = 0; index < 5; index++) {
                var node = cc.instantiate(prefable);
                node.position = cc.v2(0 + index * 20, 0);
                
                var bezierParam = [cc.p(0, 166), cc.p(0, 166), cc.p(0, 0)];     
                var bezier = cc.bezierBy(1, bezierParam);
                bezierParam = [cc.p(0, 20), cc.p(0, 20), cc.p(0, 0)];
                var bezier1 = cc.bezierBy(1, bezierParam);

                var seq = cc.sequence(bezier, bezier1);
                node.runAction(seq);

                this.node.addChild(node);
            }
        }.bind(this));
    },

    //匀速曲线， 后面来弄 http://blog.csdn.net/kongbu0622/article/details/10124065
    //http://www.j--d.com/bezier 工具
    runBezier: function () {
        this.node.position = this.bez[this.index][0];

        // var bezierParam = [cc.p(0, cc.winSize.height / 2), cc.p(300, -cc.winSize.height / 2), cc.p(300, 100)];
        var bezierParam = [this.bez[this.index][1], this.bez[this.index][2], this.bez[this.index][3]];     //抛物线
        var bezier = cc.bezierTo(16, bezierParam).easing(cc.easeInOut(3.0));

        this.node.runAction(bezier);
    },

    draw: function () {
        var graphics = this.node.getComponent(cc.Graphics);
        graphics.moveTo(this.bez[0].x, this.bez[0].y);
        graphics.bezierCurveTo(this.bez[1].x, this.bez[1].y, this.bez[2].x, this.bez[2].y, this.bez[3].x, this.bez[3].y);    //这是贝塞尔的参数
        graphics.strokeColor = cc.hexToColor('#097c25');
        graphics.lineWidth = 2;
        graphics.stroke();
    },

    paraCurve: function () {
        var start = cc.p(261, 259);
        var bezierParam = [cc.p(0, 168), cc.p(300, -cc.winSize.height / 2), cc.p(300, 100)];
        var bezier = cc.bezierBy(3, bezierParam);

        this.node.runAction(bezier);
    },

    //-------------------------------------------------------------------------------------  
    //x坐标方程  
    beze_x: function (t) {  
        var it = 1-t;  
        return it*it*it*this.P0.x + 3*it*it*t*this.P1.x + 3*it*t*t*this.P2.x + t*t*t*this.P3.x;  
    },
    //-------------------------------------------------------------------------------------  
    //y坐标方程  
    beze_y: function (t) {  
        var it = 1-t;  
        return it*it*it*this.P0.y + 3*it*it*t*this.P1.y + 3*it*t*t*this.P2.y + t*t*t*this.P3.y;  
    },

    //-------------------------------------------------------------------------------------  
    //x坐标速度方程  
    beze_speed_x: function (t) {  
        var it = 1-t;  
        return -3*this.P0.x*it*it + 3*this.P1.x*it*it - 6*this.P1.x*it*t + 6*this.P2.x*it*t - 3*this.P2.x*t*t + 3*this.P3.x*t*t;  
    },
    
    //-------------------------------------------------------------------------------------  
    //y坐标速度方程  
    beze_speed_y: function(t) {  
        var it = 1-t;  
        return -3*this.P0.y*it*it + 3*this.P1.y*it*it - 6*this.P1.y*it*t + 6*this.P2.y*it*t - 3*this.P2.y*t*t + 3*this.P3.y*t*t;  
    },  
    //-------------------------------------------------------------------------------------  
    //速度方程  
    beze_speed: function (t) {  
        var sx = this.beze_speed_x(t);
        var sy = this.beze_speed_y(t);
        return Math.sqrt(sx*sx+sy*sy);  
    },
    //-------------------------------------------------------------------------------------  
    //长度方程,使用Simpson积分算法  
    beze_length: function (t) {  
        //在总长度范围内，使用simpson算法的分割数  
        var TOTAL_SIMPSON_STEP = 10000;  
        //分割份数  
        var stepCounts = Math.round(TOTAL_SIMPSON_STEP*t);  
        if(stepCounts % 2 == 0) stepCounts++;    //偶数
        if(stepCounts==0) return 0;  

        var halfCounts = Math.floor(stepCounts/2);  
        var sum1 = 0, sum2 = 0;  
        var dStep = Math.floor(t/stepCounts);  

        for(let i = 0; i < halfCounts; i++) {  
            sum1 += this.beze_speed((2*i+1)*dStep);  
        }  
        for(let i = 1; i < halfCounts; i++) {  
            sum2 += this.beze_speed((2*i)*dStep);  
        }  
        return (this.beze_speed(0)+this.beze_speed(1)+2*sum2+4*sum1)*dStep/3.0;  
    },  

    //-------------------------------------------------------------------------------------  
    //根据t推导出匀速运动自变量t'的方程(使用牛顿切线法)  

    beze_even: function (t) {  
        var len = t*this.total_length; //如果按照匀速增长,此时对应的曲线长度  
        var t1 = t; 
        var t2 = 0;  
        
        do {  
            t2 = t1 - (this.beze_length(t1)-len)/this.beze_speed(t1);  
            if(Math.abs(t1-t2) < Number.EPSILON) break;  
            t1=t2;  
        } while(true);  
        return t2;  
    },

    // update: function (dt) {
    //     this.acc += dt;

    //     // if (this.acc > 1) 
    //     {
    //         // this.acc = 0;

    //         if(this.acc < 10) {  
    //             var t = this.acc/10;  
    //             //求得匀速运动对应的t值
    //             t = this.beze_even(t);
    
    //             //根据贝塞尔曲线函数，求得取得此时的x,y坐标          
    //             var x = this.beze_x(t);  
    //             var y = this.beze_y(t);   
    
    //             this.node.position = cc.v2(Math.round(x+0.5), Math.round(y+0.5));
    
    //             this.nIndex++;
    //         } else {  
                 
    //         }
    //     }
    // },   
});