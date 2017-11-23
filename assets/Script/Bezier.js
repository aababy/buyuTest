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
        bez : [cc.Vec2],
    },

    // use this for initialization
    onLoad: function () {
        this.scheduleOnce(this.runBezier, 2);
        //this.draw();

        var array = [10.0, 2.96, 6.85, 3.23, 9.9, 8.57, 0, 8.3];
        var win = cc.winSize;
        var x = 0, y = 0;
        for (let i = 0; i < array.length; i++) {
            if (i % 2 == 0) {
                x = array[i]/10 * win.width - win.width / 2;
            } else {
                y = array[i]/10 * win.height - win.height / 2;
                this.bez.push(cc.v2(x, y));
            }
        }

        // var x1 = cc.v2(array[2]/10 * win.width, array[3]/10 * win.height);
        // var x2 = cc.v2(array[4]/10 * win.width, array[5]/10 * win.height);
        // var x3 = cc.v2(array[6]/10 * win.width, array[7]/10 * win.height);

        // cc.log(x0 + " " + x1 + " " + x2 + " " + x3);
        this.node.position = this.bez[0];
        cc.log(this.bez[0]);   
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

    //http://www.j--d.com/bezier 工具
    runBezier: function () {
        // this.node.position = cc.v2.ZERO; //this.bez[0];

        // var bezierParam = [cc.p(0, 166), cc.p(0, 166), cc.p(0, 0)];     
        // var bezier = cc.bezierBy(4, bezierParam);

        // var bezierParam = [cc.p(0, cc.winSize.height / 2), cc.p(300, -cc.winSize.height / 2), cc.p(300, 100)];
        var bezierParam = [this.bez[1], this.bez[2], this.bez[3]];     //抛物线
        var bezier = cc.bezierTo(4, bezierParam);

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
});
