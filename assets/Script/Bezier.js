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
    },

    // use this for initialization
    onLoad: function () {
        this.scheduleOnce(this.generateCoins, 0);
        //this.scheduleOnce(this.runBezier, 2);
        //this.draw();

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
        // var bezierParam = [cc.p(0, cc.winSize.height / 2), cc.p(300, -cc.winSize.height / 2), cc.p(300, 100)];
        var bezierParam = [cc.p(0, 166), cc.p(0, 166), cc.p(0, 0)];     //抛物线
        var bezier = cc.bezierBy(2, bezierParam);

        this.node.runAction(bezier);
    },

    draw: function () {
        var graphics = this.node.getComponent(cc.Graphics);
        graphics.moveTo(cc.p(0, 0));
        graphics.bezierCurveTo(0, cc.winSize.height / 2, 300, -cc.winSize.height / 2, 300, 100);    //这是贝塞尔的参数
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
