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
        fish : cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END , function (event) {
            //alert("发射炮弹");
            var touch =this.node.convertTouchToNodeSpace(event);  //this.node.convertTouchToWorldSpace(event); //event.getLocation()
            touch = this.node.convertToWorldSpace(touch);
            
            // touch.x -= cc.winSize.width / 2;
            // touch.y -= cc.winSize.height / 2;
            cc.log(touch.x + " " + touch.y);
            //向量差计算,结束点-开始点，向量的指向是朝着结束点  
            var check = this.fish.getComponent('Fish').checkCollider(touch);

            cc.log('check: ' + check);
        }.bind(this));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
