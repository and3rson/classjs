window.Class = function (base, props) {
    if (!props.hasOwnProperty('_name')) {
        throw new Error('Class ' + props + ' is missing _name property.');
    }
    var c = function () {
        this._events = {};
        if (props.constructor) {
            props.constructor.apply(this, arguments);
        }
    };
    if (base) {
        var m = function () {
        };
        m.prototype = base.prototype;
        c.prototype = new m();
        c.prototype.parent = base.prototype;
    } else {
        c.prototype = {};
    }

    for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
            c.prototype[prop] = props[prop];
        }
    }

    c.prototype.chain = function () {
        var object = this;
        var chain = [];
        while (object = object.__proto__) {
            chain.push(object);
        }
        return chain;
    };
    c.prototype.dump = function () {
        var chain = this._chain();
        var parts = [];
        for (var i in chain) {
            if (chain.hasOwnProperty(i)) {
                var o = chain[i];
                parts.push(o['_name'] ? o['_name'] : o.toString());
            }
        }
        console.log(parts.join(' <- '));
    };
    c.prototype.emit = function (event) {
        if (!this._events[event]) {
            return;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < this._events[event].length; i++) {
            var timeout = window.setTimeout.bind(window, this._events[event][i].bind(this), 0);
            timeout.apply(null, args);
        }
    };
    c.prototype.connect = function (event, method) {
        if (!this._events[event]) {
            this._events[event] = [method];
        } else {
            this._events[event].push(method);
        }
    };
    c.prototype.disconnect = function (event, method) {
        if (!this._events[event]) {
            return;
        }
        if (method) {
            var pos = this._events[event].indexOf(method);
            if (method != -1) {
                this._events[event].splice(pos, 1);
            }
        } else {
            this._events[event] = [];
        }
    };
    c.prototype.disconnectAll = function () {
        this._events = {};
    };

    return c;
};
