/**
 *
 *	Bunch of scripts included in one file to reduce number HTTP requests
 *
 */



/*!
	Autosize v1.18.9 - 2014-05-27
	Automatically adjust textarea height based on user input.
	(c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e) {
    var t, o = {
            className: "autosizejs",
            id: "autosizejs",
            append: "\n",
            callback: !1,
            resizeDelay: 10,
            placeholder: !0
        },
        i = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
        n = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
        s = e(i).data("autosize", !0)[0];
    s.style.lineHeight = "99px", "99px" === e(s).css("lineHeight") && n.push("lineHeight"), s.style.lineHeight = "", e.fn.autosize = function(i) {
        return this.length ? (i = e.extend({}, o, i || {}), s.parentNode !== document.body && e(document.body).append(s), this.each(function() {
            function o() {
                var t, o = window.getComputedStyle ? window.getComputedStyle(u, null) : !1;
                o ? (t = u.getBoundingClientRect().width, (0 === t || "number" != typeof t) && (t = parseInt(o.width, 10)), e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function(e, i) {
                    t -= parseInt(o[i], 10)
                })) : t = p.width(), s.style.width = Math.max(t, 0) + "px"
            }

            function a() {
                var a = {};
                if (t = u, s.className = i.className, s.id = i.id, d = parseInt(p.css("maxHeight"), 10), e.each(n, function(e, t) {
                        a[t] = p.css(t)
                    }), e(s).css(a).attr("wrap", p.attr("wrap")), o(), window.chrome) {
                    var r = u.style.width;
                    u.style.width = "0px", u.offsetWidth, u.style.width = r
                }
            }

            function r() {
                var e, n;
                t !== u ? a() : o(), s.value = !u.value && i.placeholder ? (p.attr("placeholder") || "") + i.append : u.value + i.append, s.style.overflowY = u.style.overflowY, n = parseInt(u.style.height, 10), s.scrollTop = 0, s.scrollTop = 9e4, e = s.scrollTop, d && e > d ? (u.style.overflowY = "scroll", e = d) : (u.style.overflowY = "hidden", c > e && (e = c)), e += w, n !== e && (u.style.height = e + "px", f && i.callback.call(u, u))
            }

            function l() {
                clearTimeout(h), h = setTimeout(function() {
                    var e = p.width();
                    e !== g && (g = e, r())
                }, parseInt(i.resizeDelay, 10))
            }
            var d, c, h, u = this,
                p = e(u),
                w = 0,
                f = e.isFunction(i.callback),
                z = {
                    height: u.style.height,
                    overflow: u.style.overflow,
                    overflowY: u.style.overflowY,
                    wordWrap: u.style.wordWrap,
                    resize: u.style.resize
                },
                g = p.width(),
                y = p.css("resize");
            p.data("autosize") || (p.data("autosize", !0), ("border-box" === p.css("box-sizing") || "border-box" === p.css("-moz-box-sizing") || "border-box" === p.css("-webkit-box-sizing")) && (w = p.outerHeight() - p.height()), c = Math.max(parseInt(p.css("minHeight"), 10) - w || 0, p.height()), p.css({
                overflow: "hidden",
                overflowY: "hidden",
                wordWrap: "break-word"
            }), "vertical" === y ? p.css("resize", "none") : "both" === y && p.css("resize", "horizontal"), "onpropertychange" in u ? "oninput" in u ? p.on("input.autosize keyup.autosize", r) : p.on("propertychange.autosize", function() {
                "value" === event.propertyName && r()
            }) : p.on("input.autosize", r), i.resizeDelay !== !1 && e(window).on("resize.autosize", l), p.on("autosize.resize", r), p.on("autosize.resizeIncludeStyle", function() {
                t = null, r()
            }), p.on("autosize.destroy", function() {
                t = null, clearTimeout(h), e(window).off("resize", l), p.off("autosize").off(".autosize").css(z).removeData("autosize")
            }), r())
        })) : this
    }
})(window.jQuery || window.$);


/* Scroll Monitor */
(function(e) {
    if (typeof define !== "undefined" && define.amd) {
        define(["jquery"], e)
    } else if (typeof module !== "undefined" && module.exports) {
        var t = require("jquery");
        module.exports = e(t)
    } else {
        window.scrollMonitor = e(jQuery)
    }
})(function(e) {
    function m() {
        return window.innerHeight || document.documentElement.clientHeight
    }

    function y() {
        t.viewportTop = n.scrollTop();
        t.viewportBottom = t.viewportTop + t.viewportHeight;
        t.documentHeight = r.height();
        if (t.documentHeight !== d) {
            g = i.length;
            while (g--) {
                i[g].recalculateLocation()
            }
            d = t.documentHeight
        }
    }

    function b() {
        t.viewportHeight = m();
        y();
        x()
    }

    function E() {
        clearTimeout(w);
        w = setTimeout(b, 100)
    }

    function x() {
        S = i.length;
        while (S--) {
            i[S].update()
        }
        S = i.length;
        while (S--) {
            i[S].triggerCallbacks()
        }
    }

    function T(n, r) {
        function x(e) {
            if (e.length === 0) {
                return
            }
            E = e.length;
            while (E--) {
                S = e[E];
                S.callback.call(i, v);
                if (S.isOne) {
                    e.splice(E, 1)
                }
            }
        }
        var i = this;
        this.watchItem = n;
        if (!r) {
            this.offsets = p
        } else if (r === +r) {
            this.offsets = {
                top: r,
                bottom: r
            }
        } else {
            this.offsets = e.extend({}, p, r)
        }
        this.callbacks = {};
        for (var d = 0, m = h.length; d < m; d++) {
            i.callbacks[h[d]] = []
        }
        this.locked = false;
        var g;
        var y;
        var b;
        var w;
        var E;
        var S;
        this.triggerCallbacks = function() {
            if (this.isInViewport && !g) {
                x(this.callbacks[o])
            }
            if (this.isFullyInViewport && !y) {
                x(this.callbacks[u])
            }
            if (this.isAboveViewport !== b && this.isBelowViewport !== w) {
                x(this.callbacks[s]);
                if (!y && !this.isFullyInViewport) {
                    x(this.callbacks[u]);
                    x(this.callbacks[f])
                }
                if (!g && !this.isInViewport) {
                    x(this.callbacks[o]);
                    x(this.callbacks[a])
                }
            }
            if (!this.isFullyInViewport && y) {
                x(this.callbacks[f])
            }
            if (!this.isInViewport && g) {
                x(this.callbacks[a])
            }
            if (this.isInViewport !== g) {
                x(this.callbacks[s])
            }
            switch (true) {
                case g !== this.isInViewport:
                case y !== this.isFullyInViewport:
                case b !== this.isAboveViewport:
                case w !== this.isBelowViewport:
                    x(this.callbacks[c])
            }
            g = this.isInViewport;
            y = this.isFullyInViewport;
            b = this.isAboveViewport;
            w = this.isBelowViewport
        };
        this.recalculateLocation = function() {
            if (this.locked) {
                return
            }
            var n = this.top;
            var r = this.bottom;
            if (this.watchItem.nodeName) {
                var i = this.watchItem.style.display;
                if (i === "none") {
                    this.watchItem.style.display = ""
                }
                var s = e(this.watchItem).offset();
                this.top = s.top;
                this.bottom = s.top + this.watchItem.offsetHeight;
                if (i === "none") {
                    this.watchItem.style.display = i
                }
            } else if (this.watchItem === +this.watchItem) {
                if (this.watchItem > 0) {
                    this.top = this.bottom = this.watchItem
                } else {
                    this.top = this.bottom = t.documentHeight - this.watchItem
                }
            } else {
                this.top = this.watchItem.top;
                this.bottom = this.watchItem.bottom
            }
            this.top -= this.offsets.top;
            this.bottom += this.offsets.bottom;
            this.height = this.bottom - this.top;
            if ((n !== undefined || r !== undefined) && (this.top !== n || this.bottom !== r)) {
                x(this.callbacks[l])
            }
        };
        this.recalculateLocation();
        this.update();
        g = this.isInViewport;
        y = this.isFullyInViewport;
        b = this.isAboveViewport;
        w = this.isBelowViewport
    }

    function O(e) {
        v = e;
        y();
        x()
    }
    var t = {};
    var n = e(window);
    var r = e(document);
    var i = [];
    var s = "visibilityChange";
    var o = "enterViewport";
    var u = "fullyEnterViewport";
    var a = "exitViewport";
    var f = "partiallyExitViewport";
    var l = "locationChange";
    var c = "stateChange";
    var h = [s, o, u, a, f, l, c];
    var p = {
        top: 0,
        bottom: 0
    };
    t.viewportTop;
    t.viewportBottom;
    t.documentHeight;
    t.viewportHeight = m();
    var d;
    var v;
    var g;
    var w;
    var S;
    T.prototype = {
        on: function(e, t, n) {
            switch (true) {
                case e === s && !this.isInViewport && this.isAboveViewport:
                case e === o && this.isInViewport:
                case e === u && this.isFullyInViewport:
                case e === a && this.isAboveViewport && !this.isInViewport:
                case e === f && this.isAboveViewport:
                    t();
                    if (n) {
                        return
                    }
            }
            if (this.callbacks[e]) {
                this.callbacks[e].push({
                    callback: t,
                    isOne: n
                })
            } else {
                throw new Error("Tried to add a scroll monitor listener of type " + e + ". Your options are: " + h.join(", "))
            }
        },
        off: function(e, t) {
            if (this.callbacks[e]) {
                for (var n = 0, r; r = this.callbacks[e][n]; n++) {
                    if (r.callback === t) {
                        this.callbacks[e].splice(n, 1);
                        break
                    }
                }
            } else {
                throw new Error("Tried to remove a scroll monitor listener of type " + e + ". Your options are: " + h.join(", "))
            }
        },
        one: function(e, t) {
            this.on(e, t, true)
        },
        recalculateSize: function() {
            this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom;
            this.bottom = this.top + this.height
        },
        update: function() {
            this.isAboveViewport = this.top < t.viewportTop;
            this.isBelowViewport = this.bottom > t.viewportBottom;
            this.isInViewport = this.top <= t.viewportBottom && this.bottom >= t.viewportTop;
            this.isFullyInViewport = this.top >= t.viewportTop && this.bottom <= t.viewportBottom || this.isAboveViewport && this.isBelowViewport
        },
        destroy: function() {
            var e = i.indexOf(this),
                t = this;
            i.splice(e, 1);
            for (var n = 0, r = h.length; n < r; n++) {
                t.callbacks[h[n]].length = 0
            }
        },
        lock: function() {
            this.locked = true
        },
        unlock: function() {
            this.locked = false
        }
    };
    var N = function(e) {
        return function(t, n) {
            this.on.call(this, e, t, n)
        }
    };
    for (var C = 0, k = h.length; C < k; C++) {
        var L = h[C];
        T.prototype[L] = N(L)
    }
    try {
        y()
    } catch (A) {
        e(y)
    }
    n.on("scroll", O);
    n.on("resize", E);
    t.beget = t.create = function(t, n) {
        if (typeof t === "string") {
            t = e(t)[0]
        }
        if (t instanceof e) {
            t = t[0]
        }
        var r = new T(t, n);
        i.push(r);
        r.update();
        return r
    };
    t.update = function() {
        v = null;
        y();
        x()
    };
    t.recalculateLocations = function() {
        t.documentHeight = 0;
        t.update()
    };
    return t
})



/* Count It Up */
function countUp(a, b, c, d, e, f) {
    for (var g = 0, h = ["webkit", "moz", "ms", "o"], i = 0; i < h.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[h[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[h[i] + "CancelAnimationFrame"] || window[h[i] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(a) {
        var c = (new Date).getTime(),
            d = Math.max(0, 16 - (c - g)),
            e = window.setTimeout(function() {
                a(c + d)
            }, d);
        return g = c + d, e
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    }), this.options = f || {
        useEasing: !0,
        useGrouping: !0,
        separator: ",",
        decimal: "."
    }, "" == this.options.separator && (this.options.useGrouping = !1), null == this.options.prefix && (this.options.prefix = ""), null == this.options.suffix && (this.options.suffix = "");
    var j = this;
    this.d = "string" == typeof a ? document.getElementById(a) : a, this.startVal = Number(b), this.endVal = Number(c), this.countDown = this.startVal > this.endVal ? !0 : !1, this.startTime = null, this.timestamp = null, this.remaining = null, this.frameVal = this.startVal, this.rAF = null, this.decimals = Math.max(0, d || 0), this.dec = Math.pow(10, this.decimals), this.duration = 1e3 * e || 2e3, this.version = function() {
        return "1.3.1"
    }, this.printValue = function(a) {
        var b = isNaN(a) ? "--" : j.formatNumber(a);
        "INPUT" == j.d.tagName ? this.d.value = b : this.d.innerHTML = b
    }, this.easeOutExpo = function(a, b, c, d) {
        return 1024 * c * (-Math.pow(2, -10 * a / d) + 1) / 1023 + b
    }, this.count = function(a) {
        null === j.startTime && (j.startTime = a), j.timestamp = a;
        var b = a - j.startTime;
        if (j.remaining = j.duration - b, j.options.useEasing)
            if (j.countDown) {
                var c = j.easeOutExpo(b, 0, j.startVal - j.endVal, j.duration);
                j.frameVal = j.startVal - c
            } else j.frameVal = j.easeOutExpo(b, j.startVal, j.endVal - j.startVal, j.duration);
        else if (j.countDown) {
            var c = (j.startVal - j.endVal) * (b / j.duration);
            j.frameVal = j.startVal - c
        } else j.frameVal = j.startVal + (j.endVal - j.startVal) * (b / j.duration);
        j.frameVal = j.countDown ? j.frameVal < j.endVal ? j.endVal : j.frameVal : j.frameVal > j.endVal ? j.endVal : j.frameVal, j.frameVal = Math.round(j.frameVal * j.dec) / j.dec, j.printValue(j.frameVal), b < j.duration ? j.rAF = requestAnimationFrame(j.count) : null != j.callback && j.callback()
    }, this.start = function(a) {
        return j.callback = a, isNaN(j.endVal) || isNaN(j.startVal) ? (console.log("countUp error: startVal or endVal is not a number"), j.printValue()) : j.rAF = requestAnimationFrame(j.count), !1
    }, this.stop = function() {
        cancelAnimationFrame(j.rAF)
    }, this.reset = function() {
        j.startTime = null, j.startVal = b, cancelAnimationFrame(j.rAF), j.printValue(j.startVal)
    }, this.resume = function() {
        j.stop(), j.startTime = null, j.duration = j.remaining, j.startVal = j.frameVal, requestAnimationFrame(j.count)
    }, this.formatNumber = function(a) {
        a = a.toFixed(j.decimals), a += "";
        var b, c, d, e;
        if (b = a.split("."), c = b[0], d = b.length > 1 ? j.options.decimal + b[1] : "", e = /(\d+)(\d{3})/, j.options.useGrouping)
            for (; e.test(c);) c = c.replace(e, "$1" + j.options.separator + "$2");
        return j.options.prefix + c + d + j.options.suffix
    }, j.printValue(j.startVal)
}


/*! perfect-scrollbar - v0.5.2
 * http://noraesae.github.com/perfect-scrollbar/
 * Copyright (c) 2014 Hyunje Alex Jun; Licensed MIT */
(function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery)
})(function(e) {
    "use strict";
    var t = {
            wheelSpeed: 1,
            wheelPropagation: !1,
            minScrollbarLength: null,
            maxScrollbarLength: null,
            useBothWheelAxes: !1,
            useKeyboard: !0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            includePadding: !1
        },
        o = function() {
            var e = 0;
            return function() {
                var t = e;
                return e += 1, ".perfect-scrollbar-" + t
            }
        }();
    e.fn.perfectScrollbar = function(n, r) {
        return this.each(function() {
            var l = e.extend(!0, {}, t),
                a = e(this);
            if ("object" == typeof n ? e.extend(!0, l, n) : r = n, "update" === r) return a.data("perfect-scrollbar-update") && a.data("perfect-scrollbar-update")(), a;
            if ("destroy" === r) return a.data("perfect-scrollbar-destroy") && a.data("perfect-scrollbar-destroy")(), a;
            if (a.data("perfect-scrollbar")) return a.data("perfect-scrollbar");
            a.addClass("ps-container");
            var s, i, c, d, u, p, f, v, h, b, g = e("<div class='ps-scrollbar-x-rail'></div>").appendTo(a),
                m = e("<div class='ps-scrollbar-y-rail'></div>").appendTo(a),
                w = e("<div class='ps-scrollbar-x'></div>").appendTo(g),
                T = e("<div class='ps-scrollbar-y'></div>").appendTo(m),
                L = parseInt(g.css("bottom"), 10),
                y = L === L,
                I = y ? null : parseInt(g.css("top"), 10),
                S = parseInt(m.css("right"), 10),
                C = S === S,
                x = C ? null : parseInt(m.css("left"), 10),
                D = "rtl" === a.css("direction"),
                X = o(),
                Y = parseInt(g.css("borderLeftWidth"), 10) + parseInt(g.css("borderRightWidth"), 10),
                P = parseInt(g.css("borderTopWidth"), 10) + parseInt(g.css("borderBottomWidth"), 10),
                k = function(e, t) {
                    var o = e + t,
                        n = d - h;
                    b = 0 > o ? 0 : o > n ? n : o;
                    var r = parseInt(b * (p - d) / (d - h), 10);
                    a.scrollTop(r)
                },
                E = function(e, t) {
                    var o = e + t,
                        n = c - f;
                    v = 0 > o ? 0 : o > n ? n : o;
                    var r = parseInt(v * (u - c) / (c - f), 10);
                    a.scrollLeft(r)
                },
                M = function(e) {
                    return l.minScrollbarLength && (e = Math.max(e, l.minScrollbarLength)), l.maxScrollbarLength && (e = Math.min(e, l.maxScrollbarLength)), e
                },
                W = function() {
                    var e = {
                        width: c,
                        display: s ? "inherit" : "none"
                    };
                    e.left = D ? a.scrollLeft() + c - u : a.scrollLeft(), y ? e.bottom = L - a.scrollTop() : e.top = I + a.scrollTop(), g.css(e);
                    var t = {
                        top: a.scrollTop(),
                        height: d,
                        display: i ? "inherit" : "none"
                    };
                    C ? t.right = D ? u - a.scrollLeft() - S - T.outerWidth() : S - a.scrollLeft() : t.left = D ? a.scrollLeft() + 2 * c - u - x - T.outerWidth() : x + a.scrollLeft(), m.css(t), w.css({
                        left: v,
                        width: f - Y
                    }), T.css({
                        top: b,
                        height: h - P
                    }), s ? a.addClass("ps-active-x") : a.removeClass("ps-active-x"), i ? a.addClass("ps-active-y") : a.removeClass("ps-active-y")
                },
                j = function() {
                    g.hide(), m.hide(), c = l.includePadding ? a.innerWidth() : a.width(), d = l.includePadding ? a.innerHeight() : a.height(), u = a.prop("scrollWidth"), p = a.prop("scrollHeight"), !l.suppressScrollX && u > c + l.scrollXMarginOffset ? (s = !0, f = M(parseInt(c * c / u, 10)), v = parseInt(a.scrollLeft() * (c - f) / (u - c), 10)) : (s = !1, f = 0, v = 0, a.scrollLeft(0)), !l.suppressScrollY && p > d + l.scrollYMarginOffset ? (i = !0, h = M(parseInt(d * d / p, 10)), b = parseInt(a.scrollTop() * (d - h) / (p - d), 10)) : (i = !1, h = 0, b = 0, a.scrollTop(0)), b >= d - h && (b = d - h), v >= c - f && (v = c - f), W(), l.suppressScrollX || g.show(), l.suppressScrollY || m.show()
                },
                O = function() {
                    var t, o;
                    w.bind("mousedown" + X, function(e) {
                        o = e.pageX, t = w.position().left, g.addClass("in-scrolling"), e.stopPropagation(), e.preventDefault()
                    }), e(document).bind("mousemove" + X, function(e) {
                        g.hasClass("in-scrolling") && (E(t, e.pageX - o), j(), e.stopPropagation(), e.preventDefault())
                    }), e(document).bind("mouseup" + X, function() {
                        g.hasClass("in-scrolling") && g.removeClass("in-scrolling")
                    }), t = o = null
                },
                q = function() {
                    var t, o;
                    T.bind("mousedown" + X, function(e) {
                        o = e.pageY, t = T.position().top, m.addClass("in-scrolling"), e.stopPropagation(), e.preventDefault()
                    }), e(document).bind("mousemove" + X, function(e) {
                        m.hasClass("in-scrolling") && (k(t, e.pageY - o), j(), e.stopPropagation(), e.preventDefault())
                    }), e(document).bind("mouseup" + X, function() {
                        m.hasClass("in-scrolling") && m.removeClass("in-scrolling")
                    }), t = o = null
                },
                A = function(e, t) {
                    var o = a.scrollTop();
                    if (0 === e) {
                        if (!i) return !1;
                        if (0 === o && t > 0 || o >= p - d && 0 > t) return !l.wheelPropagation
                    }
                    var n = a.scrollLeft();
                    if (0 === t) {
                        if (!s) return !1;
                        if (0 === n && 0 > e || n >= u - c && e > 0) return !l.wheelPropagation
                    }
                    return !0
                },
                B = function() {
                    var e = !1,
                        t = function(e) {
                            var t = e.originalEvent.deltaX,
                                o = -1 * e.originalEvent.deltaY;
                            return (t === void 0 || o === void 0) && (t = -1 * e.originalEvent.wheelDeltaX / 6, o = e.originalEvent.wheelDeltaY / 6), e.originalEvent.deltaMode && 1 === e.originalEvent.deltaMode && (t *= 10, o *= 10), t !== t && o !== o && (t = 0, o = e.originalEvent.wheelDelta), [t, o]
                        },
                        o = function(o) {
                            var n = t(o),
                                r = n[0],
                                c = n[1];
                            e = !1, l.useBothWheelAxes ? i && !s ? (c ? a.scrollTop(a.scrollTop() - c * l.wheelSpeed) : a.scrollTop(a.scrollTop() + r * l.wheelSpeed), e = !0) : s && !i && (r ? a.scrollLeft(a.scrollLeft() + r * l.wheelSpeed) : a.scrollLeft(a.scrollLeft() - c * l.wheelSpeed), e = !0) : (a.scrollTop(a.scrollTop() - c * l.wheelSpeed), a.scrollLeft(a.scrollLeft() + r * l.wheelSpeed)), j(), e = e || A(r, c), e && (o.stopPropagation(), o.preventDefault())
                        };
                    window.onwheel !== void 0 ? a.bind("wheel" + X, o) : window.onmousewheel !== void 0 && a.bind("mousewheel" + X, o)
                },
                H = function() {
                    var t = !1;
                    a.bind("mouseenter" + X, function() {
                        t = !0
                    }), a.bind("mouseleave" + X, function() {
                        t = !1
                    });
                    var o = !1;
                    e(document).bind("keydown" + X, function(n) {
                        if (!(n.isDefaultPrevented && n.isDefaultPrevented() || !t || e(document.activeElement).is(":input,[contenteditable]"))) {
                            var r = 0,
                                l = 0;
                            switch (n.which) {
                                case 37:
                                    r = -30;
                                    break;
                                case 38:
                                    l = 30;
                                    break;
                                case 39:
                                    r = 30;
                                    break;
                                case 40:
                                    l = -30;
                                    break;
                                case 33:
                                    l = 90;
                                    break;
                                case 32:
                                case 34:
                                    l = -90;
                                    break;
                                case 35:
                                    l = -d;
                                    break;
                                case 36:
                                    l = d;
                                    break;
                                default:
                                    return
                            }
                            a.scrollTop(a.scrollTop() - l), a.scrollLeft(a.scrollLeft() + r), o = A(r, l), o && n.preventDefault()
                        }
                    })
                },
                K = function() {
                    var e = function(e) {
                        e.stopPropagation()
                    };
                    T.bind("click" + X, e), m.bind("click" + X, function(e) {
                        var t = parseInt(h / 2, 10),
                            o = e.pageY - m.offset().top - t,
                            n = d - h,
                            r = o / n;
                        0 > r ? r = 0 : r > 1 && (r = 1), a.scrollTop((p - d) * r)
                    }), w.bind("click" + X, e), g.bind("click" + X, function(e) {
                        var t = parseInt(f / 2, 10),
                            o = e.pageX - g.offset().left - t,
                            n = c - f,
                            r = o / n;
                        0 > r ? r = 0 : r > 1 && (r = 1), a.scrollLeft((u - c) * r)
                    })
                },
                Q = function() {
                    var t = function(e, t) {
                            a.scrollTop(a.scrollTop() - t), a.scrollLeft(a.scrollLeft() - e), j()
                        },
                        o = {},
                        n = 0,
                        r = {},
                        l = null,
                        s = !1;
                    e(window).bind("touchstart" + X, function() {
                        s = !0
                    }), e(window).bind("touchend" + X, function() {
                        s = !1
                    }), a.bind("touchstart" + X, function(e) {
                        var t = e.originalEvent.targetTouches[0];
                        o.pageX = t.pageX, o.pageY = t.pageY, n = (new Date).getTime(), null !== l && clearInterval(l), e.stopPropagation()
                    }), a.bind("touchmove" + X, function(e) {
                        if (!s && 1 === e.originalEvent.targetTouches.length) {
                            var l = e.originalEvent.targetTouches[0],
                                a = {};
                            a.pageX = l.pageX, a.pageY = l.pageY;
                            var i = a.pageX - o.pageX,
                                c = a.pageY - o.pageY;
                            t(i, c), o = a;
                            var d = (new Date).getTime(),
                                u = d - n;
                            u > 0 && (r.x = i / u, r.y = c / u, n = d), e.preventDefault()
                        }
                    }), a.bind("touchend" + X, function() {
                        clearInterval(l), l = setInterval(function() {
                            return .01 > Math.abs(r.x) && .01 > Math.abs(r.y) ? (clearInterval(l), void 0) : (t(30 * r.x, 30 * r.y), r.x *= .8, r.y *= .8, void 0)
                        }, 10)
                    })
                },
                R = function() {
                    a.bind("scroll" + X, function() {
                        j()
                    })
                },
                z = function() {
                    a.unbind(X), e(window).unbind(X), e(document).unbind(X), a.data("perfect-scrollbar", null), a.data("perfect-scrollbar-update", null), a.data("perfect-scrollbar-destroy", null), w.remove(), T.remove(), g.remove(), m.remove(), g = m = w = T = s = i = c = d = u = p = f = v = L = y = I = h = b = S = C = x = D = X = null
                },
                F = function(t) {
                    a.addClass("ie").addClass("ie" + t);
                    var o = function() {
                            var t = function() {
                                    e(this).addClass("hover")
                                },
                                o = function() {
                                    e(this).removeClass("hover")
                                };
                            a.bind("mouseenter" + X, t).bind("mouseleave" + X, o), g.bind("mouseenter" + X, t).bind("mouseleave" + X, o), m.bind("mouseenter" + X, t).bind("mouseleave" + X, o), w.bind("mouseenter" + X, t).bind("mouseleave" + X, o), T.bind("mouseenter" + X, t).bind("mouseleave" + X, o)
                        },
                        n = function() {
                            W = function() {
                                var e = {
                                    left: v + a.scrollLeft(),
                                    width: f
                                };
                                y ? e.bottom = L : e.top = I, w.css(e);
                                var t = {
                                    top: b + a.scrollTop(),
                                    height: h
                                };
                                C ? t.right = S : t.left = x, T.css(t), w.hide().show(), T.hide().show()
                            }
                        };
                    6 === t && (o(), n())
                },
                G = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                J = function() {
                    var e = navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);
                    e && "msie" === e[1] && F(parseInt(e[2], 10)), j(), R(), O(), q(), K(), B(), G && Q(), l.useKeyboard && H(), a.data("perfect-scrollbar", a), a.data("perfect-scrollbar-update", j), a.data("perfect-scrollbar-destroy", z)
                };
            return J(), a
        })
    }
});


/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
(function($) {
    $.fn.hoverIntent = function(handlerIn, handlerOut, selector) {
        var cfg = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        };
        if (typeof handlerIn === "object") {
            cfg = $.extend(cfg, handlerIn)
        } else {
            if ($.isFunction(handlerOut)) {
                cfg = $.extend(cfg, {
                    over: handlerIn,
                    out: handlerOut,
                    selector: selector
                })
            } else {
                cfg = $.extend(cfg, {
                    over: handlerIn,
                    out: handlerIn,
                    selector: handlerOut
                })
            }
        }
        var cX, cY, pX, pY;
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY
        };
        var compare = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if (Math.sqrt((pX - cX) * (pX - cX) + (pY - cY) * (pY - cY)) < cfg.sensitivity) {
                $(ob).off("mousemove.hoverIntent", track);
                ob.hoverIntent_s = true;
                return cfg.over.apply(ob, [ev])
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function() {
                    compare(ev, ob)
                }, cfg.interval)
            }
        };
        var delay = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = false;
            return cfg.out.apply(ob, [ev])
        };
        var handleHover = function(e) {
            var ev = $.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
            }
            if (e.type === "mouseenter") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).on("mousemove.hoverIntent", track);
                if (!ob.hoverIntent_s) {
                    ob.hoverIntent_t = setTimeout(function() {
                        compare(ev, ob)
                    }, cfg.interval)
                }
            } else {
                $(ob).off("mousemove.hoverIntent", track);
                if (ob.hoverIntent_s) {
                    ob.hoverIntent_t = setTimeout(function() {
                        delay(ev, ob)
                    }, cfg.timeout)
                }
            }
        };
        return this.on({
            "mouseenter.hoverIntent": handleHover,
            "mouseleave.hoverIntent": handleHover
        }, cfg.selector)
    }
})(jQuery);


/*! Cookies.js - 0.4.0; Copyright (c) 2014, Scott Hamper; http://www.opensource.org/licenses/MIT */
(function(e) {
    "use strict";
    var b = function(a, d, c) {
        return 1 === arguments.length ? b.get(a) : b.set(a, d, c)
    };
    b._document = document;
    b._navigator = navigator;
    b.defaults = {
        path: "/"
    };
    b.get = function(a) {
        b._cachedDocumentCookie !== b._document.cookie && b._renewCache();
        return b._cache[a]
    };
    b.set = function(a, d, c) {
        c = b._getExtendedOptions(c);
        c.expires = b._getExpiresDate(d === e ? -1 : c.expires);
        b._document.cookie = b._generateCookieString(a, d, c);
        return b
    };
    b.expire = function(a, d) {
        return b.set(a, e, d)
    };
    b._getExtendedOptions = function(a) {
        return {
            path: a && a.path || b.defaults.path,
            domain: a && a.domain || b.defaults.domain,
            expires: a && a.expires || b.defaults.expires,
            secure: a && a.secure !== e ? a.secure : b.defaults.secure
        }
    };
    b._isValidDate = function(a) {
        return "[object Date]" === Object.prototype.toString.call(a) && !isNaN(a.getTime())
    };
    b._getExpiresDate = function(a, d) {
        d = d || new Date;
        switch (typeof a) {
            case "number":
                a = new Date(d.getTime() + 1E3 * a);
                break;
            case "string":
                a = new Date(a)
        }
        if (a && !b._isValidDate(a)) throw Error("`expires` parameter cannot be converted to a valid Date instance");
        return a
    };
    b._generateCookieString = function(a, b, c) {
        a = a.replace(/[^#$&+\^`|]/g, encodeURIComponent);
        a = a.replace(/\(/g, "%28").replace(/\)/g, "%29");
        b = (b + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
        c = c || {};
        a = a + "=" + b + (c.path ? ";path=" + c.path : "");
        a += c.domain ? ";domain=" + c.domain : "";
        a += c.expires ? ";expires=" + c.expires.toUTCString() : "";
        return a += c.secure ? ";secure" : ""
    };
    b._getCookieObjectFromString = function(a) {
        var d = {};
        a = a ? a.split("; ") : [];
        for (var c = 0; c < a.length; c++) {
            var f = b._getKeyValuePairFromCookieString(a[c]);
            d[f.key] === e && (d[f.key] = f.value)
        }
        return d
    };
    b._getKeyValuePairFromCookieString = function(a) {
        var b = a.indexOf("="),
            b = 0 > b ? a.length : b;
        return {
            key: decodeURIComponent(a.substr(0, b)),
            value: decodeURIComponent(a.substr(b + 1))
        }
    };
    b._renewCache = function() {
        b._cache = b._getCookieObjectFromString(b._document.cookie);
        b._cachedDocumentCookie = b._document.cookie
    };
    b._areEnabled = function() {
        var a = "1" === b.set("cookies.js", 1).get("cookies.js");
        b.expire("cookies.js");
        return a
    };
    b.enabled = b._areEnabled();
    "function" === typeof define && define.amd ? define(function() {
        return b
    }) : "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = b), exports.Cookies = b) : window.Cookies = b
})();