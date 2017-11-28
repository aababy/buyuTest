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
        _polygon : [cc.Vec2],
    },

    // use this for initialization
    onLoad: function () {
        //[-46, -14, -30, 187, 11, 187, 43, -21, 16, -188, -21, -188],
        var vec = [cc.v2(-46, -14), cc.v2(-30, 187), cc.v2(11, 187), cc.v2(43, -21), cc.v2(16, -188), cc.v2(-21, -188)];

        for (let i = 0; i < vec.length; i++) {
            this._polygon.push(vec[i]);
        }

        this.node
        //var polygon = [cc.v2(-50, -50), cc.v2(-50, 50), cc.v2(50, 50), cc.v2(50, -50)];
    },

    checkCollider: function(pos) {
        pos = this.node.convertToNodeSpaceAR(pos);

        if (cc.Intersection.pointInPolygon(pos, this._polygon)) {
            return true;
        } else {
            return false;
        }
    },
});
