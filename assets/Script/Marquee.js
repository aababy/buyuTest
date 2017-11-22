var stateType = {
    static: 1,
    speedUp: 2,
    speedDown: 3,
  };

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
        zeroY : 109,
        height : 238,
        final : 0,
        num1 : cc.Node,
        num2 : cc.Node,
        speed : 100,
        state : 0,
        checkNum : cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.speed = 100;
        this.num1.y = 50;
        this.num2.y = this.num1.position.y + this.height;

        this.state = stateType.speedUp;

        this.final = this.zeroY - 4 * this.height / 10;
        if (this.final < 0) {
            this.checkNum = this.num1;
        } else {
            this.checkNum = this.num2;
        }

        this.schedule(this.scrollTo5, 3);
    },

    scrollTo5: function () {

    },

    speedDown: function () {
        this.state = stateType.speedDown;
    },

    update: function (dt) {
        if (this.state != stateType.static) {
            this.num1.y -= dt * this.speed;
            this.num2.y -= dt * this.speed;

            //检查是否过了一半, 交换
            if (this.num2.y < 0) {
                this.num1.y = this.num2.position.y + this.height;
    
                let temp = this.num1;
                this.num1 = this.num2;
                this.num2 = temp;
            }

            if (this.checkNum.y < this.final) {
                this.state = stateType.static;
            }
        }
    },

    // update: function (dt) {
    //     if (this.state != stateType.static) {
    //         if (this.state == stateType.speedUp) {
    //             this.speed += dt * 50;
    //             if (this.speed > 300) {
    //                 this.speed = 300;
    //             }
    //         } else {
    //             this.speed -= dt * 50;
    //             if (this.speed < 0) {
    //                 this.speed = 0;
    //                 this.state = stateType.static;
    //             }
    //         }

    //         this.num1.y -= dt * this.speed;
    //         this.num2.y -= dt * this.speed;

    //         //检查是否过了一半, 交换
    //         if (this.num2.y < 0) {
    //             this.num1.y = this.num2.position.y + this.height;
    
    //             let temp = this.num1;
    //             this.num1 = this.num2;
    //             this.num2 = temp;
    //         }
    //     }
    // },
});
