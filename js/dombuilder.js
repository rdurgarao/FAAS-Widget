//DOM BUILDER
/**
 * DOMBuilder 2.1.6 (modes: dom [default], html) - https://github.com/insin/DOMBuilder
 * MIT Licensed
 */
(function () {
  function l(c) {
    return t[c]
  }

  var t = {};
  l.define = function (c, e) {
    var a = {}, f = {};
    a.exports = f;
    e(a, f, l);
    if ("[object Array]" == Object.prototype.toString.call(c))for (var f = 0, g = c.length; f < g; f++)t[c[f]] = a.exports; else t[c] = a.exports
  };
  l.define(["isomorph/is", "./is"], function (c) {
    var e = Object.prototype.toString;
    c.exports = {Array: function (a) {
      return"[object Array]" == e.call(a)
    }, Boolean: function (a) {
      return"[object Boolean]" == e.call(a)
    }, Date: function (a) {
      return"[object Date]" == e.call(a)
    }, Empty: function (a) {
      for (var f in a)return!1;
      return!0
    }, Error: function (a) {
      return"[object Error]" == e.call(a)
    }, Function: function (a) {
      return"[object Function]" == e.call(a)
    }, NaN: isNaN, Number: function (a) {
      return"[object Number]" == e.call(a)
    }, Object: function (a) {
      return"[object Object]" == e.call(a)
    }, RegExp: function (a) {
      return"[object RegExp]" == e.call(a)
    }, String: function (a) {
      return"[object String]" == e.call(a)
    }}
  });
  l.define("isomorph/object", function (c) {
    var e = function () {
      var a = Object.prototype.hasOwnProperty;
      return function (f, g) {
        return a.call(f, g)
      }
    }();
    c.exports =
    {hasOwn: e, extend: function (a) {
      for (var f = 1, g = arguments.length, c; f < g; f++)if (c = arguments[f])for (var o in c)e(c, o) && (a[o] = c[o]);
      return a
    }, inherits: function (a, f) {
      var g = function () {
      };
      g.prototype = f.prototype;
      a.prototype = new g;
      return a.prototype.constructor = a
    }, items: function (a) {
      var f = [], g;
      for (g in a)e(a, g) && f.push([g, a[g]]);
      return f
    }, fromItems: function (a) {
      for (var f = {}, g = 0, c = a.length, e; g < c; g++)e = a[g], f[e[0]] = e[1];
      return f
    }, lookup: function (a) {
      for (var f = {}, g = 0, c = a.length; g < c; g++)f["" + a[g]] = !0;
      return f
    }, get: function (a, f, g) {
      return e(a, f) ? a[f] : g
    }}
  });
  l.define("isomorph/array", function (c, e, a) {
    var f = a("./is"), g = Array.prototype.splice;
    c.exports = {flatten: function (a) {
      for (var c = 0, e = a.length, j; c < e; c++)j = a[c], f.Array(j) && (e += j.length - 1, g.apply(a, [c, 1].concat(j)), c--);
      return a
    }}
  });
  l.define(["./dombuilder/core", "./core"], function (c, e, a) {
    function f(b, h) {
      return!!b && "[object Object]" == r.call(b) && (!h || !k.modes[h].isModeObject(b))
    }

    function g(b) {
      return"[object Array]" == r.call(b) && "undefined" == typeof b.isElement
    }

    function l(b) {
      b.isElement = !0;
      return b
    }

    function o(b) {
      for (var h = {}, d = 0, a; a = u[d]; d++)h[a.toUpperCase()] = i(a, b);
      return h
    }

    function i(b, h) {
      var d = function () {
        if (arguments.length) {
          var d = p.call(arguments), a, c = d.length, j = d[0];
          if (1 === c && g(j))d = j; else if (f(j, "undefined" != typeof h ? h : k.mode))a = j, d = 2 == c && g(d[1]) ? d[1] : d.slice(1);
          return k.createElement(b, a, d, h)
        }
        return(a = "undefined" != typeof h ? h : k.mode) ? k.modes[a].createElement(b, {}, []) : l([b])
      };
      d.map = function () {
        var d = p.call(arguments);
        if (g(d[0]))var a = {}, j = d[0], d = n.Function(d[1]) ? d[1] : null; else a =
            d[0], j = d[1], d = n.Function(d[2]) ? d[2] : null;
        return k.map(b, a, j, d, h)
      };
      return d
    }

    function j(b, h) {
      return{index: b, first: 0 == b, last: b == h - 1}
    }

    var n = a("isomorph/is"), m = a("isomorph/object"), x = a("isomorph/array"), r = Object.prototype.toString, p = Array.prototype.slice, a = (e = "undefined" != typeof jQuery) ? jQuery.attrFn : m.lookup("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" ")),
        w = /^([a-z][a-z0-9]*)?(?:#([a-z][-:\w]*))?(?:\.([-\w]+(?:\.[-\w]+)*))?/i, u = "a abbr acronym address area article aside audio b bdi bdo big blockquote body br button canvas caption cite code col colgroup command datalist dd del details dfn div dl dt em embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 hr head header hgroup html i iframe img input ins kbd keygen label legend li link map mark meta meter nav noscript object ol optgroup option output p param pre progress q rp rt ruby samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track tt ul var video wbr".split(" "),
        s = e ? function (b, h) {
          jQuery(b).html(h)
        } : function (b, h) {
          try {
            b.innerHTML = h
          } catch (d) {
            var a = document.createElement("div");
            for (a.innerHTML = h; b.firstChild;)b.removeChild(b.firstChild);
            for (; a.firstChild;)b.appendChild(a.firstChild)
          }
        }, k = {version: "2.1.1", mode: null, modes: {}, addMode: function (b) {
          b = m.extend({isModeObject: function () {
            return!1
          }, api: {}, apply: {}}, b);
          this.modes[b.name] = b;
          this[b.name] = m.extend(o(b.name), b.apply);
          null === this.mode && (this.mode = b.name)
        }, withMode: function (b, h) {
          var d = this.mode;
          this.mode = b;
          try {
            return h.apply(null,
                p.call(arguments, 2))
          } finally {
            this.mode = d
          }
        }, elements: o(), array: o(null), apply: function (b, h) {
          h && this.modes[h] ? m.extend(b, this[h]) : m.extend(b, this.elements);
          return b
        }, build: function (b, h) {
          var h = h || this.mode, d = b[0], a = "#document-fragment" == d, j = !a && f(b[1], h) ? b[1] : null, c = null === j ? 1 : 2, g = b.length, k = [];
          if (!a) {
            null === j && (j = {});
            var e = w.exec(d);
            if (!e)throw Error(d + " is not a valid tag definition");
            d = e[1] || "div";
            e[2] && (j.id = e[2]);
            e[3] && (j["class"] = e[3].replace(/\./g, " "))
          }
          for (e = c; e < g; e++)c = b[e], n.Array(c) ? k.push(this.build(c,
              h)) : k.push(c);
          return a ? this.modes[h].fragment(k) : this.modes[h].createElement(d, j, k)
        }, createElement: function (b, h, d, a) {
          h = h || {};
          d = d || [];
          if (a = "undefined" != typeof a ? a : this.mode)return x.flatten(d), this.modes[a].createElement(b, h, d);
          var b = [b], j;
          for (j in h) {
            b.push(h);
            break
          }
          d.length && (b = b.concat(d));
          return l(b)
        }, textNode: function (b, h) {
          h = "undefined" != typeof h ? h : this.mode;
          return this.modes[h].textNode(b)
        }, map: function (b, h, d, a, c) {
          for (var e = [], f = 0, n = d.length, s, i; f < n; f++) {
            s = m.extend({}, h);
            if (null != a) {
              if (i = "undefined" != typeof c ? k.withMode(c, a, d[f], s, j(f, n)) : a(d[f], s, j(f, n)), null === i)continue
            } else i = d[f];
            g(i) || (i = [i]);
            e.push(this.createElement(b, s, i, c))
          }
          return e
        }, fragment: function () {
          var b = function () {
            var b;
            b = 1 === arguments.length && g(arguments[0]) ? arguments[0] : p.call(arguments);
            return this.mode ? (x.flatten(b), this.modes[this.mode].fragment(b)) : l(["#document-fragment"].concat(b))
          };
          b.map = function (b, d) {
            if (!n.Function(d))return k.fragment(b);
            for (var a = [], c = 0, f = b.length, e; c < f; c++)e = d(b[c], j(c, f)), null !== e && (a = a.concat(e));
            return k.fragment(a)
          };
          return b
        }(), util: {EVENT_ATTRS: a, FRAGMENT_NAME: "#document-fragment", JQUERY_AVAILABLE: e, TAG_NAMES: u, setInnerHTML: s}};
    c.exports = k
  });
  l.define("./dombuilder/dom", function (c, e, a) {
    var c = a("./core"), f = a("isomorph/object"), g = window.document, l = c.util.EVENT_ATTRS, o = c.util.setInnerHTML, i = c.util.JQUERY_AVAILABLE ? function (a, c) {
      if (f.hasOwn(c, "innerHTML")) {
        var e = c.innerHTML;
        delete c.innerHTML;
        return jQuery("<" + a + ">", c).html(e).get(0)
      }
      return jQuery("<" + a + ">", c).get(0)
    } : function () {
      var a = {tabindex: "tabIndex"},
          c = {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, e = function () {
            var a = g.createElement("div");
            a.setAttribute("className", "t");
            a.innerHTML = '<span style="color:silver">s<span>';
            var c = a.getElementsByTagName("span")[0], b = g.createElement("input");
            b.value = "t";
            b.setAttribute("type", "radio");
            return{style: /silver/.test(c.getAttribute("style")),
              getSetAttribute: "t" != a.className, radioValue: "t" == b.value}
          }(), i, r = function (a, e, b) {
            !1 !== e && (e = c[b] || b, e in a && (a[e] = !0), a.setAttribute(b, b.toLowerCase()));
            return b
          }, p = {type: function (a, c) {
            if (!e.radioValue && "radio" == c && a.nodeName && "INPUT" == a.nodeName.toUpperCase()) {
              var b = a.value;
              a.setAttribute("type", c);
              b && (a.value = b);
              return c
            }
          }, value: function (a, c, b) {
            if (i && a.nodeName && "BUTTON" == a.nodeName.toUpperCase())return i(a, c, b);
            a.value = c
          }}, w = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
          u = /\:|^on/;
      e.getSetAttribute || (a = c, i = p.name = p.title = function (a, c, b) {
        if (a = a.getAttributeNode(b))return a.nodeValue = c
      }, p.width = p.height = function (a, c) {
        if ("" === c)return a.setAttribute(name, "auto"), c
      });
      e.style || (p.style = function (a, c) {
        return a.style.cssText = "" + c
      });
      return function (e, k) {
        var b = g.createElement(e), h, d;
        if (f.hasOwn(k, "innerHTML")) {
          o(b, k.innerHTML);
          delete k.innerHTML
        }
        for (h in k) {
          d = k[h];
          if (l[h])b["on" + h] = d; else {
            var m = b, q = h;
            if ("getAttribute"in m) {
              var v = void 0, q = a[q] || q, v = p[q];
              if (!v)if (w.test(q))v =
                  r; else if (i && q != "className" && (m.nodeName && m.nodeName.toUpperCase() == "FORM" || u.test(q)))v = i;
              d !== void 0 && !(v && v(m, d, q) !== void 0) && m.setAttribute(q, "" + d)
            } else {
              q = c[q] || q;
              d !== void 0 && (m[q] = d)
            }
          }
        }
        return b
      }
    }();
    c.addMode({name: "dom", createElement: function (a, c, e) {
      var l = f.hasOwn(c, "innerHTML"), a = i(a, c);
      if (!l)for (var l = 0, c = e.length, r; l < c; l++)(r = e[l]) && r.nodeType ? a.appendChild(r) : a.appendChild(g.createTextNode("" + r));
      return a
    }, textNode: function (a) {
      return g.createTextNode(a)
    }, fragment: function (a) {
      for (var c = g.createDocumentFragment(),
               e = 0, f = a.length, i; e < f; e++)i = a[e], i.nodeType ? c.appendChild(i) : c.appendChild(g.createTextNode("" + i));
      return c
    }, isModeObject: function (a) {
      return!!a.nodeType
    }, api: {createElement: i}})
  });
  l.define("./dombuilder/html", function (c, e, a) {
    function f(b) {
      this.value = b
    }

    function g(b) {
      return new f(b)
    }

    function l(b) {
      return b instanceof f
    }

    function o(b) {
      return b instanceof f ? b.value : k("" + b)
    }

    function i(b) {
      this.childNodes = b || [];
      this._inlineFragments();
      this.firstChild = this.childNodes.length ? this.childNodes[0] : null
    }

    function j(b, a, d) {
      i.call(this, d);
      this.tagName = this.nodeName = b.toLowerCase();
      this.attributes = a || {}
    }

    function n(b) {
      i.call(this, b)
    }

    var c = a("./core"), m = a("isomorph/object"), t = Array.prototype.splice, r = c.util.EVENT_ATTRS, a = c.util.FRAGMENT_NAME, e = c.util.JQUERY_AVAILABLE, p = c.util.setInnerHTML, w = m.lookup(c.util.TAG_NAMES), u = m.lookup("area base br col command embed frame hr input img keygen link meta param source track wbr".split(" ")), s = e ? function (b, a, d) {
      jQuery("#" + b)[a](d)
    } : function (b, a, d) {
      document.getElementById(b)["on" +
          a] = d
    };
    m.inherits(f, String);
    f.prototype.toString = f.prototype.valueOf = function () {
      return this.value
    };
    var k = function () {
      var b = /&/g, a = /</g, d = />/g, c = /"/g, e = /'/g;
      return function (f) {
        return f.replace(b, "&amp;").replace(a, "&lt;").replace(d, "&gt;").replace(c, "&quot;").replace(e, "&#39;")
      }
    }();
    m.inherits(i, Object);
    i.prototype._inlineFragments = function () {
      for (var b = 0, a = this.childNodes.length, d; b < a; b++)d = this.childNodes[b], d instanceof n && (t.apply(this.childNodes, [b, 1].concat(d.childNodes)), d._clear())
    };
    i.prototype.appendChild =
        function (b) {
          b instanceof n ? (this.childNodes = this.childNodes.concat(b.childNodes), b._clear()) : this.childNodes.push(b);
          null === this.firstChild && (this.firstChild = this.childNodes[0])
        };
    i.prototype.cloneNode = function (b) {
      var a = this._clone();
      if (!0 === b)for (var d = 0, c = this.childNodes.length, e; d < c; d++)e = this.childNodes[d], e instanceof j && (e = e.cloneNode(b)), 0 === d && (a.firstChild = e), a.childNodes.push(e);
      return a
    };
    i.prototype.hasChildNodes = function () {
      return!!this.childNodes.length
    };
    i.prototype.removeChild = function (b) {
      if (null !==
          this.firstChild && b === this.firstChild)return this.firstChild = 1 < this.childNodes.length ? this.childNodes[1] : null, this.childNodes.shift();
      for (var a = 1, c = this.childNodes.length; a < c; a++)if (b === this.childNodes[a])return this.childNodes.splice(a, 1)[0];
      throw Error("Node was not found");
    };
    i.prototype._clone = function () {
      return new Node
    };
    m.inherits(j, i);
    j.eventTrackerId = 1;
    j.prototype.nodeType = 1;
    j.prototype._clone = function () {
      return new j(this.tagName, m.extend({}, this.attributes))
    };
    j.prototype.toString = function (a) {
      var a =
          "undefined" != typeof a ? a : !1, c = w[this.tagName] ? this.tagName : o(this.tagName), d = ["<" + c], e;
      for (e in this.attributes)"innerHTML" !== e && (r[e] ? !0 === a && !this.eventsFound && (this.eventsFound = !0) : d.push(" " + o(e.toLowerCase()) + '="' + o(this.attributes[e]) + '"'));
      this.eventsFound && !m.hasOwn(this.attributes, "id") && (this.id = "__DB" + j.eventTrackerId++ + "__", d.push(' id="' + this.id + '"'));
      d.push(">");
      if (u[c])return d.join("");
      if (m.hasOwn(this.attributes, "innerHTML"))d.push(this.attributes.innerHTML); else {
        e = 0;
        for (var g = this.childNodes.length,
                 i; e < g; e++)i = this.childNodes[e], i instanceof j || i instanceof f ? d.push(i.toString(a)) : d.push(k("" + i))
      }
      d.push("</" + c + ">");
      return d.join("")
    };
    j.prototype.addEvents = function () {
      if (this.eventsFound) {
        var a = m.hasOwn(this.attributes, "id") ? o(this.attributes.id) : this.id, c;
        for (c in this.attributes)r[c] && s(a, c, this.attributes[c]);
        delete this.eventsFound;
        delete this.id
      }
      a = 0;
      c = this.childNodes.length;
      for (var d; a < c; a++)d = this.childNodes[a], d instanceof j && d.addEvents()
    };
    j.prototype.insertWithEvents = function (a) {
      p(a,
          this.toString(!0));
      this.addEvents()
    };
    m.inherits(n, i);
    n.prototype._clear = function () {
      this.childNodes = [];
      this.firstChild = null
    };
    n.prototype._clone = function () {
      return new n
    };
    n.prototype.nodeType = 11;
    n.prototype.nodeName = a;
    n.prototype.toString = function (a) {
      for (var a = "undefined" != typeof a ? a : !1, c = [], d = 0, e = this.childNodes.length, g; d < e; d++)g = this.childNodes[d], g instanceof j || g instanceof f ? c.push(g.toString(a)) : c.push(k("" + g));
      return c.join("")
    };
    n.prototype.addEvents = function () {
      for (var a = 0, c = this.childNodes.length,
               d; a < c; a++)d = this.childNodes[a], d instanceof j && d.addEvents()
    };
    n.prototype.insertWithEvents = function (a) {
      p(a, this.toString(!0));
      this.addEvents()
    };
    c.addMode({name: "html", createElement: function (a, c, d) {
      return new j(a, c, d)
    }, textNode: function (a) {
      return a
    }, fragment: function (a) {
      return new n(a)
    }, isModeObject: function (a) {
      return a instanceof i || a instanceof f
    }, api: {escapeHTML: k, conditionalEscape: o, isSafe: l, markSafe: g, SafeString: f, HTMLNode: i, MockElement: j, MockFragment: n}, apply: {isSafe: l, markSafe: g}})
  });
  l.define("DOMBuilder",
      function (c, e, a) {
        e = a("./dombuilder/core");
        a("./dombuilder/dom");
        a("./dombuilder/html");
        c.exports = e
      });
  window.DOMBuilder = t.DOMBuilder
})();

