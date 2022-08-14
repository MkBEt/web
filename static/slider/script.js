/**
 * Swiper 8.2.5
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: June 27, 2022
 */

function isObject$1(e) {
  return (
    null !== e &&
    "object" == typeof e &&
    "constructor" in e &&
    e.constructor === Object
  );
}
function extend$1(e, t) {
  void 0 === e && (e = {}),
    void 0 === t && (t = {}),
    Object.keys(t).forEach((s) => {
      void 0 === e[s]
        ? (e[s] = t[s])
        : isObject$1(t[s]) &&
          isObject$1(e[s]) &&
          Object.keys(t[s]).length > 0 &&
          extend$1(e[s], t[s]);
    });
}
const ssrDocument = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  createEvent: () => ({ initEvent() {} }),
  createElement: () => ({
    children: [],
    childNodes: [],
    style: {},
    setAttribute() {},
    getElementsByTagName: () => [],
  }),
  createElementNS: () => ({}),
  importNode: () => null,
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function getDocument() {
  const e = "undefined" != typeof document ? document : {};
  return extend$1(e, ssrDocument), e;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle: () => ({ getPropertyValue: () => "" }),
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia: () => ({}),
  requestAnimationFrame: (e) =>
    "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
  cancelAnimationFrame(e) {
    "undefined" != typeof setTimeout && clearTimeout(e);
  },
};
function getWindow() {
  const e = "undefined" != typeof window ? window : {};
  return extend$1(e, ssrWindow), e;
}
function makeReactive(e) {
  const t = e.__proto__;
  Object.defineProperty(e, "__proto__", {
    get: () => t,
    set(e) {
      t.__proto__ = e;
    },
  });
}
class Dom7 extends Array {
  constructor(e) {
    "number" == typeof e ? super(e) : (super(...(e || [])), makeReactive(this));
  }
}
function arrayFlat(e) {
  void 0 === e && (e = []);
  const t = [];
  return (
    e.forEach((e) => {
      Array.isArray(e) ? t.push(...arrayFlat(e)) : t.push(e);
    }),
    t
  );
}
function arrayFilter(e, t) {
  return Array.prototype.filter.call(e, t);
}
function arrayUnique(e) {
  const t = [];
  for (let s = 0; s < e.length; s += 1) -1 === t.indexOf(e[s]) && t.push(e[s]);
  return t;
}
function qsa(e, t) {
  if ("string" != typeof e) return [e];
  const s = [],
    a = t.querySelectorAll(e);
  for (let e = 0; e < a.length; e += 1) s.push(a[e]);
  return s;
}
function $(e, t) {
  const s = getWindow(),
    a = getDocument();
  let i = [];
  if (!t && e instanceof Dom7) return e;
  if (!e) return new Dom7(i);
  if ("string" == typeof e) {
    const s = e.trim();
    if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
      let e = "div";
      0 === s.indexOf("<li") && (e = "ul"),
        0 === s.indexOf("<tr") && (e = "tbody"),
        (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
        0 === s.indexOf("<tbody") && (e = "table"),
        0 === s.indexOf("<option") && (e = "select");
      const t = a.createElement(e);
      t.innerHTML = s;
      for (let e = 0; e < t.childNodes.length; e += 1) i.push(t.childNodes[e]);
    } else i = qsa(e.trim(), t || a);
  } else if (e.nodeType || e === s || e === a) i.push(e);
  else if (Array.isArray(e)) {
    if (e instanceof Dom7) return e;
    i = e;
  }
  return new Dom7(arrayUnique(i));
}
function addClass() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  const a = arrayFlat(t.map((e) => e.split(" ")));
  return (
    this.forEach((e) => {
      e.classList.add(...a);
    }),
    this
  );
}
function removeClass() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  const a = arrayFlat(t.map((e) => e.split(" ")));
  return (
    this.forEach((e) => {
      e.classList.remove(...a);
    }),
    this
  );
}
function toggleClass() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  const a = arrayFlat(t.map((e) => e.split(" ")));
  this.forEach((e) => {
    a.forEach((t) => {
      e.classList.toggle(t);
    });
  });
}
function hasClass() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  const a = arrayFlat(t.map((e) => e.split(" ")));
  return (
    arrayFilter(
      this,
      (e) => a.filter((t) => e.classList.contains(t)).length > 0
    ).length > 0
  );
}
function attr(e, t) {
  if (1 === arguments.length && "string" == typeof e)
    return this[0] ? this[0].getAttribute(e) : void 0;
  for (let s = 0; s < this.length; s += 1)
    if (2 === arguments.length) this[s].setAttribute(e, t);
    else for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
  return this;
}
function removeAttr(e) {
  for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
  return this;
}
function transform(e) {
  for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
  return this;
}
function transition$1(e) {
  for (let t = 0; t < this.length; t += 1)
    this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
  return this;
}
function on() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  let [a, i, r, n] = t;
  function l(e) {
    const t = e.target;
    if (!t) return;
    const s = e.target.dom7EventData || [];
    if ((s.indexOf(e) < 0 && s.unshift(e), $(t).is(i))) r.apply(t, s);
    else {
      const e = $(t).parents();
      for (let t = 0; t < e.length; t += 1) $(e[t]).is(i) && r.apply(e[t], s);
    }
  }
  function o(e) {
    const t = (e && e.target && e.target.dom7EventData) || [];
    t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
  }
  "function" == typeof t[1] && (([a, r, n] = t), (i = void 0)), n || (n = !1);
  const d = a.split(" ");
  let c;
  for (let e = 0; e < this.length; e += 1) {
    const t = this[e];
    if (i)
      for (c = 0; c < d.length; c += 1) {
        const e = d[c];
        t.dom7LiveListeners || (t.dom7LiveListeners = {}),
          t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
          t.dom7LiveListeners[e].push({ listener: r, proxyListener: l }),
          t.addEventListener(e, l, n);
      }
    else
      for (c = 0; c < d.length; c += 1) {
        const e = d[c];
        t.dom7Listeners || (t.dom7Listeners = {}),
          t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
          t.dom7Listeners[e].push({ listener: r, proxyListener: o }),
          t.addEventListener(e, o, n);
      }
  }
  return this;
}
function off() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  let [a, i, r, n] = t;
  "function" == typeof t[1] && (([a, r, n] = t), (i = void 0)), n || (n = !1);
  const l = a.split(" ");
  for (let e = 0; e < l.length; e += 1) {
    const t = l[e];
    for (let e = 0; e < this.length; e += 1) {
      const s = this[e];
      let a;
      if (
        (!i && s.dom7Listeners
          ? (a = s.dom7Listeners[t])
          : i && s.dom7LiveListeners && (a = s.dom7LiveListeners[t]),
        a && a.length)
      )
        for (let e = a.length - 1; e >= 0; e -= 1) {
          const i = a[e];
          (r && i.listener === r) ||
          (r &&
            i.listener &&
            i.listener.dom7proxy &&
            i.listener.dom7proxy === r)
            ? (s.removeEventListener(t, i.proxyListener, n), a.splice(e, 1))
            : r ||
              (s.removeEventListener(t, i.proxyListener, n), a.splice(e, 1));
        }
    }
  }
  return this;
}
function trigger() {
  const e = getWindow();
  for (var t = arguments.length, s = new Array(t), a = 0; a < t; a++)
    s[a] = arguments[a];
  const i = s[0].split(" "),
    r = s[1];
  for (let t = 0; t < i.length; t += 1) {
    const a = i[t];
    for (let t = 0; t < this.length; t += 1) {
      const i = this[t];
      if (e.CustomEvent) {
        const t = new e.CustomEvent(a, {
          detail: r,
          bubbles: !0,
          cancelable: !0,
        });
        (i.dom7EventData = s.filter((e, t) => t > 0)),
          i.dispatchEvent(t),
          (i.dom7EventData = []),
          delete i.dom7EventData;
      }
    }
  }
  return this;
}
function transitionEnd$1(e) {
  const t = this;
  return (
    e &&
      t.on("transitionend", function s(a) {
        a.target === this && (e.call(this, a), t.off("transitionend", s));
      }),
    this
  );
}
function outerWidth(e) {
  if (this.length > 0) {
    if (e) {
      const e = this.styles();
      return (
        this[0].offsetWidth +
        parseFloat(e.getPropertyValue("margin-right")) +
        parseFloat(e.getPropertyValue("margin-left"))
      );
    }
    return this[0].offsetWidth;
  }
  return null;
}
function outerHeight(e) {
  if (this.length > 0) {
    if (e) {
      const e = this.styles();
      return (
        this[0].offsetHeight +
        parseFloat(e.getPropertyValue("margin-top")) +
        parseFloat(e.getPropertyValue("margin-bottom"))
      );
    }
    return this[0].offsetHeight;
  }
  return null;
}
function offset() {
  if (this.length > 0) {
    const e = getWindow(),
      t = getDocument(),
      s = this[0],
      a = s.getBoundingClientRect(),
      i = t.body,
      r = s.clientTop || i.clientTop || 0,
      n = s.clientLeft || i.clientLeft || 0,
      l = s === e ? e.scrollY : s.scrollTop,
      o = s === e ? e.scrollX : s.scrollLeft;
    return { top: a.top + l - r, left: a.left + o - n };
  }
  return null;
}
function styles() {
  const e = getWindow();
  return this[0] ? e.getComputedStyle(this[0], null) : {};
}
function css(e, t) {
  const s = getWindow();
  let a;
  if (1 === arguments.length) {
    if ("string" != typeof e) {
      for (a = 0; a < this.length; a += 1)
        for (const t in e) this[a].style[t] = e[t];
      return this;
    }
    if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e);
  }
  if (2 === arguments.length && "string" == typeof e) {
    for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
    return this;
  }
  return this;
}
function each(e) {
  return e
    ? (this.forEach((t, s) => {
        e.apply(t, [t, s]);
      }),
      this)
    : this;
}
function filter(e) {
  return $(arrayFilter(this, e));
}
function html(e) {
  if (void 0 === e) return this[0] ? this[0].innerHTML : null;
  for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
  return this;
}
function text(e) {
  if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
  for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
  return this;
}
function is(e) {
  const t = getWindow(),
    s = getDocument(),
    a = this[0];
  let i, r;
  if (!a || void 0 === e) return !1;
  if ("string" == typeof e) {
    if (a.matches) return a.matches(e);
    if (a.webkitMatchesSelector) return a.webkitMatchesSelector(e);
    if (a.msMatchesSelector) return a.msMatchesSelector(e);
    for (i = $(e), r = 0; r < i.length; r += 1) if (i[r] === a) return !0;
    return !1;
  }
  if (e === s) return a === s;
  if (e === t) return a === t;
  if (e.nodeType || e instanceof Dom7) {
    for (i = e.nodeType ? [e] : e, r = 0; r < i.length; r += 1)
      if (i[r] === a) return !0;
    return !1;
  }
  return !1;
}
function index() {
  let e,
    t = this[0];
  if (t) {
    for (e = 0; null !== (t = t.previousSibling); )
      1 === t.nodeType && (e += 1);
    return e;
  }
}
function eq(e) {
  if (void 0 === e) return this;
  const t = this.length;
  if (e > t - 1) return $([]);
  if (e < 0) {
    const s = t + e;
    return $(s < 0 ? [] : [this[s]]);
  }
  return $([this[e]]);
}
function append() {
  let e;
  const t = getDocument();
  for (let s = 0; s < arguments.length; s += 1) {
    e = s < 0 || arguments.length <= s ? void 0 : arguments[s];
    for (let s = 0; s < this.length; s += 1)
      if ("string" == typeof e) {
        const a = t.createElement("div");
        for (a.innerHTML = e; a.firstChild; ) this[s].appendChild(a.firstChild);
      } else if (e instanceof Dom7)
        for (let t = 0; t < e.length; t += 1) this[s].appendChild(e[t]);
      else this[s].appendChild(e);
  }
  return this;
}
function prepend(e) {
  const t = getDocument();
  let s, a;
  for (s = 0; s < this.length; s += 1)
    if ("string" == typeof e) {
      const i = t.createElement("div");
      for (i.innerHTML = e, a = i.childNodes.length - 1; a >= 0; a -= 1)
        this[s].insertBefore(i.childNodes[a], this[s].childNodes[0]);
    } else if (e instanceof Dom7)
      for (a = 0; a < e.length; a += 1)
        this[s].insertBefore(e[a], this[s].childNodes[0]);
    else this[s].insertBefore(e, this[s].childNodes[0]);
  return this;
}
function next(e) {
  return this.length > 0
    ? e
      ? this[0].nextElementSibling && $(this[0].nextElementSibling).is(e)
        ? $([this[0].nextElementSibling])
        : $([])
      : this[0].nextElementSibling
      ? $([this[0].nextElementSibling])
      : $([])
    : $([]);
}
function nextAll(e) {
  const t = [];
  let s = this[0];
  if (!s) return $([]);
  for (; s.nextElementSibling; ) {
    const a = s.nextElementSibling;
    e ? $(a).is(e) && t.push(a) : t.push(a), (s = a);
  }
  return $(t);
}
function prev(e) {
  if (this.length > 0) {
    const t = this[0];
    return e
      ? t.previousElementSibling && $(t.previousElementSibling).is(e)
        ? $([t.previousElementSibling])
        : $([])
      : t.previousElementSibling
      ? $([t.previousElementSibling])
      : $([]);
  }
  return $([]);
}
function prevAll(e) {
  const t = [];
  let s = this[0];
  if (!s) return $([]);
  for (; s.previousElementSibling; ) {
    const a = s.previousElementSibling;
    e ? $(a).is(e) && t.push(a) : t.push(a), (s = a);
  }
  return $(t);
}
function parent(e) {
  const t = [];
  for (let s = 0; s < this.length; s += 1)
    null !== this[s].parentNode &&
      (e
        ? $(this[s].parentNode).is(e) && t.push(this[s].parentNode)
        : t.push(this[s].parentNode));
  return $(t);
}
function parents(e) {
  const t = [];
  for (let s = 0; s < this.length; s += 1) {
    let a = this[s].parentNode;
    for (; a; ) e ? $(a).is(e) && t.push(a) : t.push(a), (a = a.parentNode);
  }
  return $(t);
}
function closest(e) {
  let t = this;
  return void 0 === e ? $([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
}
function find(e) {
  const t = [];
  for (let s = 0; s < this.length; s += 1) {
    const a = this[s].querySelectorAll(e);
    for (let e = 0; e < a.length; e += 1) t.push(a[e]);
  }
  return $(t);
}
function children(e) {
  const t = [];
  for (let s = 0; s < this.length; s += 1) {
    const a = this[s].children;
    for (let s = 0; s < a.length; s += 1) (e && !$(a[s]).is(e)) || t.push(a[s]);
  }
  return $(t);
}
function remove() {
  for (let e = 0; e < this.length; e += 1)
    this[e].parentNode && this[e].parentNode.removeChild(this[e]);
  return this;
}
$.fn = Dom7.prototype;
const Methods = {
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  toggleClass: toggleClass,
  attr: attr,
  removeAttr: removeAttr,
  transform: transform,
  transition: transition$1,
  on: on,
  off: off,
  trigger: trigger,
  transitionEnd: transitionEnd$1,
  outerWidth: outerWidth,
  outerHeight: outerHeight,
  styles: styles,
  offset: offset,
  css: css,
  each: each,
  html: html,
  text: text,
  is: is,
  index: index,
  eq: eq,
  append: append,
  prepend: prepend,
  next: next,
  nextAll: nextAll,
  prev: prev,
  prevAll: prevAll,
  parent: parent,
  parents: parents,
  closest: closest,
  find: find,
  children: children,
  filter: filter,
  remove: remove,
};
function deleteProps(e) {
  const t = e;
  Object.keys(t).forEach((e) => {
    try {
      t[e] = null;
    } catch (e) {}
    try {
      delete t[e];
    } catch (e) {}
  });
}
function nextTick(e, t) {
  return void 0 === t && (t = 0), setTimeout(e, t);
}
function now() {
  return Date.now();
}
function getComputedStyle$1(e) {
  const t = getWindow();
  let s;
  return (
    t.getComputedStyle && (s = t.getComputedStyle(e, null)),
    !s && e.currentStyle && (s = e.currentStyle),
    s || (s = e.style),
    s
  );
}
function getTranslate(e, t) {
  void 0 === t && (t = "x");
  const s = getWindow();
  let a, i, r;
  const n = getComputedStyle$1(e);
  return (
    s.WebKitCSSMatrix
      ? ((i = n.transform || n.webkitTransform),
        i.split(",").length > 6 &&
          (i = i
            .split(", ")
            .map((e) => e.replace(",", "."))
            .join(", ")),
        (r = new s.WebKitCSSMatrix("none" === i ? "" : i)))
      : ((r =
          n.MozTransform ||
          n.OTransform ||
          n.MsTransform ||
          n.msTransform ||
          n.transform ||
          n
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (a = r.toString().split(","))),
    "x" === t &&
      (i = s.WebKitCSSMatrix
        ? r.m41
        : 16 === a.length
        ? parseFloat(a[12])
        : parseFloat(a[4])),
    "y" === t &&
      (i = s.WebKitCSSMatrix
        ? r.m42
        : 16 === a.length
        ? parseFloat(a[13])
        : parseFloat(a[5])),
    i || 0
  );
}
function isObject(e) {
  return (
    "object" == typeof e &&
    null !== e &&
    e.constructor &&
    "Object" === Object.prototype.toString.call(e).slice(8, -1)
  );
}
function isNode(e) {
  return "undefined" != typeof window && void 0 !== window.HTMLElement
    ? e instanceof HTMLElement
    : e && (1 === e.nodeType || 11 === e.nodeType);
}
function extend() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    t = ["__proto__", "constructor", "prototype"];
  for (let s = 1; s < arguments.length; s += 1) {
    const a = s < 0 || arguments.length <= s ? void 0 : arguments[s];
    if (null != a && !isNode(a)) {
      const s = Object.keys(Object(a)).filter((e) => t.indexOf(e) < 0);
      for (let t = 0, i = s.length; t < i; t += 1) {
        const i = s[t],
          r = Object.getOwnPropertyDescriptor(a, i);
        void 0 !== r &&
          r.enumerable &&
          (isObject(e[i]) && isObject(a[i])
            ? a[i].__swiper__
              ? (e[i] = a[i])
              : extend(e[i], a[i])
            : !isObject(e[i]) && isObject(a[i])
            ? ((e[i] = {}),
              a[i].__swiper__ ? (e[i] = a[i]) : extend(e[i], a[i]))
            : (e[i] = a[i]));
      }
    }
  }
  return e;
}
function setCSSProperty(e, t, s) {
  e.style.setProperty(t, s);
}
function animateCSSModeScroll(e) {
  let { swiper: t, targetPosition: s, side: a } = e;
  const i = getWindow(),
    r = -t.translate;
  let n,
    l = null;
  const o = t.params.speed;
  (t.wrapperEl.style.scrollSnapType = "none"),
    i.cancelAnimationFrame(t.cssModeFrameID);
  const d = s > r ? "next" : "prev",
    c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
    p = () => {
      (n = new Date().getTime()), null === l && (l = n);
      const e = Math.max(Math.min((n - l) / o, 1), 0),
        d = 0.5 - Math.cos(e * Math.PI) / 2;
      let u = r + d * (s - r);
      if ((c(u, s) && (u = s), t.wrapperEl.scrollTo({ [a]: u }), c(u, s)))
        return (
          (t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (t.wrapperEl.style.overflow = ""), t.wrapperEl.scrollTo({ [a]: u });
          }),
          void i.cancelAnimationFrame(t.cssModeFrameID)
        );
      t.cssModeFrameID = i.requestAnimationFrame(p);
    };
  p();
}
let support, deviceCached, browser;
function calcSupport() {
  const e = getWindow(),
    t = getDocument();
  return {
    smoothScroll:
      t.documentElement && "scrollBehavior" in t.documentElement.style,
    touch: !!(
      "ontouchstart" in e ||
      (e.DocumentTouch && t instanceof e.DocumentTouch)
    ),
    passiveListener: (function () {
      let t = !1;
      try {
        const s = Object.defineProperty({}, "passive", {
          get() {
            t = !0;
          },
        });
        e.addEventListener("testPassiveListener", null, s);
      } catch (e) {}
      return t;
    })(),
    gestures: "ongesturestart" in e,
  };
}
function getSupport() {
  return support || (support = calcSupport()), support;
}
function calcDevice(e) {
  let { userAgent: t } = void 0 === e ? {} : e;
  const s = getSupport(),
    a = getWindow(),
    i = a.navigator.platform,
    r = t || a.navigator.userAgent,
    n = { ios: !1, android: !1 },
    l = a.screen.width,
    o = a.screen.height,
    d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = r.match(/(iPad).*OS\s([\d_]+)/);
  const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    u = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    h = "Win32" === i;
  let m = "MacIntel" === i;
  return (
    !c &&
      m &&
      s.touch &&
      [
        "1024x1366",
        "1366x1024",
        "834x1194",
        "1194x834",
        "834x1112",
        "1112x834",
        "768x1024",
        "1024x768",
        "820x1180",
        "1180x820",
        "810x1080",
        "1080x810",
      ].indexOf(`${l}x${o}`) >= 0 &&
      ((c = r.match(/(Version)\/([\d.]+)/)),
      c || (c = [0, 1, "13_0_0"]),
      (m = !1)),
    d && !h && ((n.os = "android"), (n.android = !0)),
    (c || u || p) && ((n.os = "ios"), (n.ios = !0)),
    n
  );
}
function getDevice(e) {
  return (
    void 0 === e && (e = {}),
    deviceCached || (deviceCached = calcDevice(e)),
    deviceCached
  );
}
function calcBrowser() {
  const e = getWindow();
  return {
    isSafari: (function () {
      const t = e.navigator.userAgent.toLowerCase();
      return (
        t.indexOf("safari") >= 0 &&
        t.indexOf("chrome") < 0 &&
        t.indexOf("android") < 0
      );
    })(),
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    ),
  };
}
function getBrowser() {
  return browser || (browser = calcBrowser()), browser;
}
function Resize(e) {
  let { swiper: t, on: s, emit: a } = e;
  const i = getWindow();
  let r = null,
    n = null;
  const l = () => {
      t && !t.destroyed && t.initialized && (a("beforeResize"), a("resize"));
    },
    o = () => {
      t && !t.destroyed && t.initialized && a("orientationchange");
    };
  s("init", () => {
    t.params.resizeObserver && void 0 !== i.ResizeObserver
      ? t &&
        !t.destroyed &&
        t.initialized &&
        ((r = new ResizeObserver((e) => {
          n = i.requestAnimationFrame(() => {
            const { width: s, height: a } = t;
            let i = s,
              r = a;
            e.forEach((e) => {
              let { contentBoxSize: s, contentRect: a, target: n } = e;
              (n && n !== t.el) ||
                ((i = a ? a.width : (s[0] || s).inlineSize),
                (r = a ? a.height : (s[0] || s).blockSize));
            }),
              (i === s && r === a) || l();
          });
        })),
        r.observe(t.el))
      : (i.addEventListener("resize", l),
        i.addEventListener("orientationchange", o));
  }),
    s("destroy", () => {
      n && i.cancelAnimationFrame(n),
        r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
        i.removeEventListener("resize", l),
        i.removeEventListener("orientationchange", o);
    });
}
function Observer(e) {
  let { swiper: t, extendParams: s, on: a, emit: i } = e;
  const r = [],
    n = getWindow(),
    l = function (e, t) {
      void 0 === t && (t = {});
      const s = new (n.MutationObserver || n.WebkitMutationObserver)((e) => {
        if (1 === e.length) return void i("observerUpdate", e[0]);
        const t = function () {
          i("observerUpdate", e[0]);
        };
        n.requestAnimationFrame
          ? n.requestAnimationFrame(t)
          : n.setTimeout(t, 0);
      });
      s.observe(e, {
        attributes: void 0 === t.attributes || t.attributes,
        childList: void 0 === t.childList || t.childList,
        characterData: void 0 === t.characterData || t.characterData,
      }),
        r.push(s);
    };
  s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    a("init", () => {
      if (t.params.observer) {
        if (t.params.observeParents) {
          const e = t.$el.parents();
          for (let t = 0; t < e.length; t += 1) l(e[t]);
        }
        l(t.$el[0], { childList: t.params.observeSlideChildren }),
          l(t.$wrapperEl[0], { attributes: !1 });
      }
    }),
    a("destroy", () => {
      r.forEach((e) => {
        e.disconnect();
      }),
        r.splice(0, r.length);
    });
}
Object.keys(Methods).forEach((e) => {
  Object.defineProperty($.fn, e, { value: Methods[e], writable: !0 });
});
var eventsEmitter = {
  on(e, t, s) {
    const a = this;
    if (!a.eventsListeners || a.destroyed) return a;
    if ("function" != typeof t) return a;
    const i = s ? "unshift" : "push";
    return (
      e.split(" ").forEach((e) => {
        a.eventsListeners[e] || (a.eventsListeners[e] = []),
          a.eventsListeners[e][i](t);
      }),
      a
    );
  },
  once(e, t, s) {
    const a = this;
    if (!a.eventsListeners || a.destroyed) return a;
    if ("function" != typeof t) return a;
    function i() {
      a.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
      for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
        r[n] = arguments[n];
      t.apply(a, r);
    }
    return (i.__emitterProxy = t), a.on(e, i, s);
  },
  onAny(e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed) return s;
    if ("function" != typeof e) return s;
    const a = t ? "unshift" : "push";
    return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed) return t;
    if (!t.eventsAnyListeners) return t;
    const s = t.eventsAnyListeners.indexOf(e);
    return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
  },
  off(e, t) {
    const s = this;
    return !s.eventsListeners || s.destroyed
      ? s
      : s.eventsListeners
      ? (e.split(" ").forEach((e) => {
          void 0 === t
            ? (s.eventsListeners[e] = [])
            : s.eventsListeners[e] &&
              s.eventsListeners[e].forEach((a, i) => {
                (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                  s.eventsListeners[e].splice(i, 1);
              });
        }),
        s)
      : s;
  },
  emit() {
    const e = this;
    if (!e.eventsListeners || e.destroyed) return e;
    if (!e.eventsListeners) return e;
    let t, s, a;
    for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
      r[n] = arguments[n];
    "string" == typeof r[0] || Array.isArray(r[0])
      ? ((t = r[0]), (s = r.slice(1, r.length)), (a = e))
      : ((t = r[0].events), (s = r[0].data), (a = r[0].context || e)),
      s.unshift(a);
    return (
      (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
        e.eventsAnyListeners &&
          e.eventsAnyListeners.length &&
          e.eventsAnyListeners.forEach((e) => {
            e.apply(a, [t, ...s]);
          }),
          e.eventsListeners &&
            e.eventsListeners[t] &&
            e.eventsListeners[t].forEach((e) => {
              e.apply(a, s);
            });
      }),
      e
    );
  },
};
function updateSize() {
  const e = this;
  let t, s;
  const a = e.$el;
  (t =
    void 0 !== e.params.width && null !== e.params.width
      ? e.params.width
      : a[0].clientWidth),
    (s =
      void 0 !== e.params.height && null !== e.params.height
        ? e.params.height
        : a[0].clientHeight),
    (0 === t && e.isHorizontal()) ||
      (0 === s && e.isVertical()) ||
      ((t =
        t -
        parseInt(a.css("padding-left") || 0, 10) -
        parseInt(a.css("padding-right") || 0, 10)),
      (s =
        s -
        parseInt(a.css("padding-top") || 0, 10) -
        parseInt(a.css("padding-bottom") || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(s) && (s = 0),
      Object.assign(e, {
        width: t,
        height: s,
        size: e.isHorizontal() ? t : s,
      }));
}
function updateSlides() {
  const e = this;
  function t(t) {
    return e.isHorizontal()
      ? t
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[t];
  }
  function s(e, s) {
    return parseFloat(e.getPropertyValue(t(s)) || 0);
  }
  const a = e.params,
    { $wrapperEl: i, size: r, rtlTranslate: n, wrongRTL: l } = e,
    o = e.virtual && a.virtual.enabled,
    d = o ? e.virtual.slides.length : e.slides.length,
    c = i.children(`.${e.params.slideClass}`),
    p = o ? e.virtual.slides.length : c.length;
  let u = [];
  const h = [],
    m = [];
  let f = a.slidesOffsetBefore;
  "function" == typeof f && (f = a.slidesOffsetBefore.call(e));
  let g = a.slidesOffsetAfter;
  "function" == typeof g && (g = a.slidesOffsetAfter.call(e));
  const v = e.snapGrid.length,
    w = e.slidesGrid.length;
  let b = a.spaceBetween,
    x = -f,
    y = 0,
    $ = 0;
  if (void 0 === r) return;
  "string" == typeof b &&
    b.indexOf("%") >= 0 &&
    (b = (parseFloat(b.replace("%", "")) / 100) * r),
    (e.virtualSize = -b),
    n
      ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
      : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
    a.centeredSlides &&
      a.cssMode &&
      (setCSSProperty(e.wrapperEl, "--swiper-centered-offset-before", ""),
      setCSSProperty(e.wrapperEl, "--swiper-centered-offset-after", ""));
  const E = a.grid && a.grid.rows > 1 && e.grid;
  let C;
  E && e.grid.initSlides(p);
  const T =
    "auto" === a.slidesPerView &&
    a.breakpoints &&
    Object.keys(a.breakpoints).filter(
      (e) => void 0 !== a.breakpoints[e].slidesPerView
    ).length > 0;
  for (let i = 0; i < p; i += 1) {
    C = 0;
    const n = c.eq(i);
    if ((E && e.grid.updateSlide(i, n, p, t), "none" !== n.css("display"))) {
      if ("auto" === a.slidesPerView) {
        T && (c[i].style[t("width")] = "");
        const r = getComputedStyle(n[0]),
          l = n[0].style.transform,
          o = n[0].style.webkitTransform;
        if (
          (l && (n[0].style.transform = "none"),
          o && (n[0].style.webkitTransform = "none"),
          a.roundLengths)
        )
          C = e.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
        else {
          const e = s(r, "width"),
            t = s(r, "padding-left"),
            a = s(r, "padding-right"),
            i = s(r, "margin-left"),
            l = s(r, "margin-right"),
            o = r.getPropertyValue("box-sizing");
          if (o && "border-box" === o) C = e + i + l;
          else {
            const { clientWidth: s, offsetWidth: r } = n[0];
            C = e + t + a + i + l + (r - s);
          }
        }
        l && (n[0].style.transform = l),
          o && (n[0].style.webkitTransform = o),
          a.roundLengths && (C = Math.floor(C));
      } else
        (C = (r - (a.slidesPerView - 1) * b) / a.slidesPerView),
          a.roundLengths && (C = Math.floor(C)),
          c[i] && (c[i].style[t("width")] = `${C}px`);
      c[i] && (c[i].swiperSlideSize = C),
        m.push(C),
        a.centeredSlides
          ? ((x = x + C / 2 + y / 2 + b),
            0 === y && 0 !== i && (x = x - r / 2 - b),
            0 === i && (x = x - r / 2 - b),
            Math.abs(x) < 0.001 && (x = 0),
            a.roundLengths && (x = Math.floor(x)),
            $ % a.slidesPerGroup == 0 && u.push(x),
            h.push(x))
          : (a.roundLengths && (x = Math.floor(x)),
            ($ - Math.min(e.params.slidesPerGroupSkip, $)) %
              e.params.slidesPerGroup ==
              0 && u.push(x),
            h.push(x),
            (x = x + C + b)),
        (e.virtualSize += C + b),
        (y = C),
        ($ += 1);
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, r) + g),
    n &&
      l &&
      ("slide" === a.effect || "coverflow" === a.effect) &&
      i.css({ width: `${e.virtualSize + a.spaceBetween}px` }),
    a.setWrapperSize &&
      i.css({ [t("width")]: `${e.virtualSize + a.spaceBetween}px` }),
    E && e.grid.updateWrapperSize(C, u, t),
    !a.centeredSlides)
  ) {
    const t = [];
    for (let s = 0; s < u.length; s += 1) {
      let i = u[s];
      a.roundLengths && (i = Math.floor(i)),
        u[s] <= e.virtualSize - r && t.push(i);
    }
    (u = t),
      Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
        u.push(e.virtualSize - r);
  }
  if ((0 === u.length && (u = [0]), 0 !== a.spaceBetween)) {
    const s = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
    c.filter((e, t) => !a.cssMode || t !== c.length - 1).css({ [s]: `${b}px` });
  }
  if (a.centeredSlides && a.centeredSlidesBounds) {
    let e = 0;
    m.forEach((t) => {
      e += t + (a.spaceBetween ? a.spaceBetween : 0);
    }),
      (e -= a.spaceBetween);
    const t = e - r;
    u = u.map((e) => (e < 0 ? -f : e > t ? t + g : e));
  }
  if (a.centerInsufficientSlides) {
    let e = 0;
    if (
      (m.forEach((t) => {
        e += t + (a.spaceBetween ? a.spaceBetween : 0);
      }),
      (e -= a.spaceBetween),
      e < r)
    ) {
      const t = (r - e) / 2;
      u.forEach((e, s) => {
        u[s] = e - t;
      }),
        h.forEach((e, s) => {
          h[s] = e + t;
        });
    }
  }
  if (
    (Object.assign(e, {
      slides: c,
      snapGrid: u,
      slidesGrid: h,
      slidesSizesGrid: m,
    }),
    a.centeredSlides && a.cssMode && !a.centeredSlidesBounds)
  ) {
    setCSSProperty(
      e.wrapperEl,
      "--swiper-centered-offset-before",
      -u[0] + "px"
    ),
      setCSSProperty(
        e.wrapperEl,
        "--swiper-centered-offset-after",
        e.size / 2 - m[m.length - 1] / 2 + "px"
      );
    const t = -e.snapGrid[0],
      s = -e.slidesGrid[0];
    (e.snapGrid = e.snapGrid.map((e) => e + t)),
      (e.slidesGrid = e.slidesGrid.map((e) => e + s));
  }
  if (
    (p !== d && e.emit("slidesLengthChange"),
    u.length !== v &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit("snapGridLengthChange")),
    h.length !== w && e.emit("slidesGridLengthChange"),
    a.watchSlidesProgress && e.updateSlidesOffset(),
    !(o || a.cssMode || ("slide" !== a.effect && "fade" !== a.effect)))
  ) {
    const t = `${a.containerModifierClass}backface-hidden`,
      s = e.$el.hasClass(t);
    p <= a.maxBackfaceHiddenSlides
      ? s || e.$el.addClass(t)
      : s && e.$el.removeClass(t);
  }
}
function updateAutoHeight(e) {
  const t = this,
    s = [],
    a = t.virtual && t.params.virtual.enabled;
  let i,
    r = 0;
  "number" == typeof e
    ? t.setTransition(e)
    : !0 === e && t.setTransition(t.params.speed);
  const n = (e) =>
    a
      ? t.slides.filter(
          (t) => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
        )[0]
      : t.slides.eq(e)[0];
  if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || $([])).each((e) => {
        s.push(e);
      });
    else
      for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
        const e = t.activeIndex + i;
        if (e > t.slides.length && !a) break;
        s.push(n(e));
      }
  else s.push(n(t.activeIndex));
  for (i = 0; i < s.length; i += 1)
    if (void 0 !== s[i]) {
      const e = s[i].offsetHeight;
      r = e > r ? e : r;
    }
  (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
}
function updateSlidesOffset() {
  const e = this,
    t = e.slides;
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset = e.isHorizontal()
      ? t[s].offsetLeft
      : t[s].offsetTop;
}
function updateSlidesProgress(e) {
  void 0 === e && (e = (this && this.translate) || 0);
  const t = this,
    s = t.params,
    { slides: a, rtlTranslate: i, snapGrid: r } = t;
  if (0 === a.length) return;
  void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
  let n = -e;
  i && (n = e),
    a.removeClass(s.slideVisibleClass),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = []);
  for (let e = 0; e < a.length; e += 1) {
    const l = a[e];
    let o = l.swiperSlideOffset;
    s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
    const d =
        (n + (s.centeredSlides ? t.minTranslate() : 0) - o) /
        (l.swiperSlideSize + s.spaceBetween),
      c =
        (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
        (l.swiperSlideSize + s.spaceBetween),
      p = -(n - o),
      u = p + t.slidesSizesGrid[e];
    ((p >= 0 && p < t.size - 1) ||
      (u > 1 && u <= t.size) ||
      (p <= 0 && u >= t.size)) &&
      (t.visibleSlides.push(l),
      t.visibleSlidesIndexes.push(e),
      a.eq(e).addClass(s.slideVisibleClass)),
      (l.progress = i ? -d : d),
      (l.originalProgress = i ? -c : c);
  }
  t.visibleSlides = $(t.visibleSlides);
}
function updateProgress(e) {
  const t = this;
  if (void 0 === e) {
    const s = t.rtlTranslate ? -1 : 1;
    e = (t && t.translate && t.translate * s) || 0;
  }
  const s = t.params,
    a = t.maxTranslate() - t.minTranslate();
  let { progress: i, isBeginning: r, isEnd: n } = t;
  const l = r,
    o = n;
  0 === a
    ? ((i = 0), (r = !0), (n = !0))
    : ((i = (e - t.minTranslate()) / a), (r = i <= 0), (n = i >= 1)),
    Object.assign(t, { progress: i, isBeginning: r, isEnd: n }),
    (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
      t.updateSlidesProgress(e),
    r && !l && t.emit("reachBeginning toEdge"),
    n && !o && t.emit("reachEnd toEdge"),
    ((l && !r) || (o && !n)) && t.emit("fromEdge"),
    t.emit("progress", i);
}
function updateSlidesClasses() {
  const e = this,
    { slides: t, params: s, $wrapperEl: a, activeIndex: i, realIndex: r } = e,
    n = e.virtual && s.virtual.enabled;
  let l;
  t.removeClass(
    `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
  ),
    (l = n
      ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`)
      : t.eq(i)),
    l.addClass(s.slideActiveClass),
    s.loop &&
      (l.hasClass(s.slideDuplicateClass)
        ? a
            .children(
              `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
            )
            .addClass(s.slideDuplicateActiveClass)
        : a
            .children(
              `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
            )
            .addClass(s.slideDuplicateActiveClass));
  let o = l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
  s.loop && 0 === o.length && ((o = t.eq(0)), o.addClass(s.slideNextClass));
  let d = l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
  s.loop && 0 === d.length && ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
    s.loop &&
      (o.hasClass(s.slideDuplicateClass)
        ? a
            .children(
              `.${s.slideClass}:not(.${
                s.slideDuplicateClass
              })[data-swiper-slide-index="${o.attr(
                "data-swiper-slide-index"
              )}"]`
            )
            .addClass(s.slideDuplicateNextClass)
        : a
            .children(
              `.${s.slideClass}.${
                s.slideDuplicateClass
              }[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`
            )
            .addClass(s.slideDuplicateNextClass),
      d.hasClass(s.slideDuplicateClass)
        ? a
            .children(
              `.${s.slideClass}:not(.${
                s.slideDuplicateClass
              })[data-swiper-slide-index="${d.attr(
                "data-swiper-slide-index"
              )}"]`
            )
            .addClass(s.slideDuplicatePrevClass)
        : a
            .children(
              `.${s.slideClass}.${
                s.slideDuplicateClass
              }[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`
            )
            .addClass(s.slideDuplicatePrevClass)),
    e.emitSlidesClasses();
}
function updateActiveIndex(e) {
  const t = this,
    s = t.rtlTranslate ? t.translate : -t.translate,
    {
      slidesGrid: a,
      snapGrid: i,
      params: r,
      activeIndex: n,
      realIndex: l,
      snapIndex: o,
    } = t;
  let d,
    c = e;
  if (void 0 === c) {
    for (let e = 0; e < a.length; e += 1)
      void 0 !== a[e + 1]
        ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2
          ? (c = e)
          : s >= a[e] && s < a[e + 1] && (c = e + 1)
        : s >= a[e] && (c = e);
    r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
  }
  if (i.indexOf(s) >= 0) d = i.indexOf(s);
  else {
    const e = Math.min(r.slidesPerGroupSkip, c);
    d = e + Math.floor((c - e) / r.slidesPerGroup);
  }
  if ((d >= i.length && (d = i.length - 1), c === n))
    return void (d !== o && ((t.snapIndex = d), t.emit("snapIndexChange")));
  const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
  Object.assign(t, {
    snapIndex: d,
    realIndex: p,
    previousIndex: n,
    activeIndex: c,
  }),
    t.emit("activeIndexChange"),
    t.emit("snapIndexChange"),
    l !== p && t.emit("realIndexChange"),
    (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
}
function updateClickedSlide(e) {
  const t = this,
    s = t.params,
    a = $(e).closest(`.${s.slideClass}`)[0];
  let i,
    r = !1;
  if (a)
    for (let e = 0; e < t.slides.length; e += 1)
      if (t.slides[e] === a) {
        (r = !0), (i = e);
        break;
      }
  if (!a || !r)
    return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
  (t.clickedSlide = a),
    t.virtual && t.params.virtual.enabled
      ? (t.clickedIndex = parseInt($(a).attr("data-swiper-slide-index"), 10))
      : (t.clickedIndex = i),
    s.slideToClickedSlide &&
      void 0 !== t.clickedIndex &&
      t.clickedIndex !== t.activeIndex &&
      t.slideToClickedSlide();
}
var update = {
  updateSize: updateSize,
  updateSlides: updateSlides,
  updateAutoHeight: updateAutoHeight,
  updateSlidesOffset: updateSlidesOffset,
  updateSlidesProgress: updateSlidesProgress,
  updateProgress: updateProgress,
  updateSlidesClasses: updateSlidesClasses,
  updateActiveIndex: updateActiveIndex,
  updateClickedSlide: updateClickedSlide,
};
function getSwiperTranslate(e) {
  void 0 === e && (e = this.isHorizontal() ? "x" : "y");
  const { params: t, rtlTranslate: s, translate: a, $wrapperEl: i } = this;
  if (t.virtualTranslate) return s ? -a : a;
  if (t.cssMode) return a;
  let r = getTranslate(i[0], e);
  return s && (r = -r), r || 0;
}
function setTranslate(e, t) {
  const s = this,
    {
      rtlTranslate: a,
      params: i,
      $wrapperEl: r,
      wrapperEl: n,
      progress: l,
    } = s;
  let o = 0,
    d = 0;
  let c;
  s.isHorizontal() ? (o = a ? -e : e) : (d = e),
    i.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
    i.cssMode
      ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
          ? -o
          : -d)
      : i.virtualTranslate || r.transform(`translate3d(${o}px, ${d}px, 0px)`),
    (s.previousTranslate = s.translate),
    (s.translate = s.isHorizontal() ? o : d);
  const p = s.maxTranslate() - s.minTranslate();
  (c = 0 === p ? 0 : (e - s.minTranslate()) / p),
    c !== l && s.updateProgress(e),
    s.emit("setTranslate", s.translate, t);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(e, t, s, a, i) {
  void 0 === e && (e = 0),
    void 0 === t && (t = this.params.speed),
    void 0 === s && (s = !0),
    void 0 === a && (a = !0);
  const r = this,
    { params: n, wrapperEl: l } = r;
  if (r.animating && n.preventInteractionOnTransition) return !1;
  const o = r.minTranslate(),
    d = r.maxTranslate();
  let c;
  if (
    ((c = a && e > o ? o : a && e < d ? d : e), r.updateProgress(c), n.cssMode)
  ) {
    const e = r.isHorizontal();
    if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
    else {
      if (!r.support.smoothScroll)
        return (
          animateCSSModeScroll({
            swiper: r,
            targetPosition: -c,
            side: e ? "left" : "top",
          }),
          !0
        );
      l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
    }
    return !0;
  }
  return (
    0 === t
      ? (r.setTransition(0),
        r.setTranslate(c),
        s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd")))
      : (r.setTransition(t),
        r.setTranslate(c),
        s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (e) {
              r &&
                !r.destroyed &&
                e.target === this &&
                (r.$wrapperEl[0].removeEventListener(
                  "transitionend",
                  r.onTranslateToWrapperTransitionEnd
                ),
                r.$wrapperEl[0].removeEventListener(
                  "webkitTransitionEnd",
                  r.onTranslateToWrapperTransitionEnd
                ),
                (r.onTranslateToWrapperTransitionEnd = null),
                delete r.onTranslateToWrapperTransitionEnd,
                s && r.emit("transitionEnd"));
            }),
          r.$wrapperEl[0].addEventListener(
            "transitionend",
            r.onTranslateToWrapperTransitionEnd
          ),
          r.$wrapperEl[0].addEventListener(
            "webkitTransitionEnd",
            r.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate: setTranslate,
  minTranslate: minTranslate,
  maxTranslate: maxTranslate,
  translateTo: translateTo,
};
function setTransition(e, t) {
  const s = this;
  s.params.cssMode || s.$wrapperEl.transition(e), s.emit("setTransition", e, t);
}
function transitionEmit(e) {
  let { swiper: t, runCallbacks: s, direction: a, step: i } = e;
  const { activeIndex: r, previousIndex: n } = t;
  let l = a;
  if (
    (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
    t.emit(`transition${i}`),
    s && r !== n)
  ) {
    if ("reset" === l) return void t.emit(`slideResetTransition${i}`);
    t.emit(`slideChangeTransition${i}`),
      "next" === l
        ? t.emit(`slideNextTransition${i}`)
        : t.emit(`slidePrevTransition${i}`);
  }
}
function transitionStart(e, t) {
  void 0 === e && (e = !0);
  const s = this,
    { params: a } = s;
  a.cssMode ||
    (a.autoHeight && s.updateAutoHeight(),
    transitionEmit({
      swiper: s,
      runCallbacks: e,
      direction: t,
      step: "Start",
    }));
}
function transitionEnd(e, t) {
  void 0 === e && (e = !0);
  const s = this,
    { params: a } = s;
  (s.animating = !1),
    a.cssMode ||
      (s.setTransition(0),
      transitionEmit({
        swiper: s,
        runCallbacks: e,
        direction: t,
        step: "End",
      }));
}
var transition = {
  setTransition: setTransition,
  transitionStart: transitionStart,
  transitionEnd: transitionEnd,
};
function slideTo(e, t, s, a, i) {
  if (
    (void 0 === e && (e = 0),
    void 0 === t && (t = this.params.speed),
    void 0 === s && (s = !0),
    "number" != typeof e && "string" != typeof e)
  )
    throw new Error(
      `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
    );
  if ("string" == typeof e) {
    const t = parseInt(e, 10);
    if (!isFinite(t))
      throw new Error(
        `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
      );
    e = t;
  }
  const r = this;
  let n = e;
  n < 0 && (n = 0);
  const {
    params: l,
    snapGrid: o,
    slidesGrid: d,
    previousIndex: c,
    activeIndex: p,
    rtlTranslate: u,
    wrapperEl: h,
    enabled: m,
  } = r;
  if ((r.animating && l.preventInteractionOnTransition) || (!m && !a && !i))
    return !1;
  const f = Math.min(r.params.slidesPerGroupSkip, n);
  let g = f + Math.floor((n - f) / r.params.slidesPerGroup);
  g >= o.length && (g = o.length - 1),
    (p || l.initialSlide || 0) === (c || 0) &&
      s &&
      r.emit("beforeSlideChangeStart");
  const v = -o[g];
  if ((r.updateProgress(v), l.normalizeSlideIndex))
    for (let e = 0; e < d.length; e += 1) {
      const t = -Math.floor(100 * v),
        s = Math.floor(100 * d[e]),
        a = Math.floor(100 * d[e + 1]);
      void 0 !== d[e + 1]
        ? t >= s && t < a - (a - s) / 2
          ? (n = e)
          : t >= s && t < a && (n = e + 1)
        : t >= s && (n = e);
    }
  if (r.initialized && n !== p) {
    if (!r.allowSlideNext && v < r.translate && v < r.minTranslate()) return !1;
    if (
      !r.allowSlidePrev &&
      v > r.translate &&
      v > r.maxTranslate() &&
      (p || 0) !== n
    )
      return !1;
  }
  let w;
  if (
    ((w = n > p ? "next" : n < p ? "prev" : "reset"),
    (u && -v === r.translate) || (!u && v === r.translate))
  )
    return (
      r.updateActiveIndex(n),
      l.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      "slide" !== l.effect && r.setTranslate(v),
      "reset" !== w && (r.transitionStart(s, w), r.transitionEnd(s, w)),
      !1
    );
  if (l.cssMode) {
    const e = r.isHorizontal(),
      s = u ? v : -v;
    if (0 === t) {
      const t = r.virtual && r.params.virtual.enabled;
      t &&
        ((r.wrapperEl.style.scrollSnapType = "none"),
        (r._immediateVirtual = !0)),
        (h[e ? "scrollLeft" : "scrollTop"] = s),
        t &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ""),
              (r._swiperImmediateVirtual = !1);
          });
    } else {
      if (!r.support.smoothScroll)
        return (
          animateCSSModeScroll({
            swiper: r,
            targetPosition: s,
            side: e ? "left" : "top",
          }),
          !0
        );
      h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
    }
    return !0;
  }
  return (
    r.setTransition(t),
    r.setTranslate(v),
    r.updateActiveIndex(n),
    r.updateSlidesClasses(),
    r.emit("beforeTransitionStart", t, a),
    r.transitionStart(s, w),
    0 === t
      ? r.transitionEnd(s, w)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (e) {
            r &&
              !r.destroyed &&
              e.target === this &&
              (r.$wrapperEl[0].removeEventListener(
                "transitionend",
                r.onSlideToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].removeEventListener(
                "webkitTransitionEnd",
                r.onSlideToWrapperTransitionEnd
              ),
              (r.onSlideToWrapperTransitionEnd = null),
              delete r.onSlideToWrapperTransitionEnd,
              r.transitionEnd(s, w));
          }),
        r.$wrapperEl[0].addEventListener(
          "transitionend",
          r.onSlideToWrapperTransitionEnd
        ),
        r.$wrapperEl[0].addEventListener(
          "webkitTransitionEnd",
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function slideToLoop(e, t, s, a) {
  if (
    (void 0 === e && (e = 0),
    void 0 === t && (t = this.params.speed),
    void 0 === s && (s = !0),
    "string" == typeof e)
  ) {
    const t = parseInt(e, 10);
    if (!isFinite(t))
      throw new Error(
        `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
      );
    e = t;
  }
  const i = this;
  let r = e;
  return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, s, a);
}
function slideNext(e, t, s) {
  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
  const a = this,
    { animating: i, enabled: r, params: n } = a;
  if (!r) return a;
  let l = n.slidesPerGroup;
  "auto" === n.slidesPerView &&
    1 === n.slidesPerGroup &&
    n.slidesPerGroupAuto &&
    (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
  const o = a.activeIndex < n.slidesPerGroupSkip ? 1 : l;
  if (n.loop) {
    if (i && n.loopPreventsSlide) return !1;
    a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
  }
  return n.rewind && a.isEnd
    ? a.slideTo(0, e, t, s)
    : a.slideTo(a.activeIndex + o, e, t, s);
}
function slidePrev(e, t, s) {
  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
  const a = this,
    {
      params: i,
      animating: r,
      snapGrid: n,
      slidesGrid: l,
      rtlTranslate: o,
      enabled: d,
    } = a;
  if (!d) return a;
  if (i.loop) {
    if (r && i.loopPreventsSlide) return !1;
    a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
  }
  function c(e) {
    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
  }
  const p = c(o ? a.translate : -a.translate),
    u = n.map((e) => c(e));
  let h = n[u.indexOf(p) - 1];
  if (void 0 === h && i.cssMode) {
    let e;
    n.forEach((t, s) => {
      p >= t && (e = s);
    }),
      void 0 !== e && (h = n[e > 0 ? e - 1 : e]);
  }
  let m = 0;
  if (
    (void 0 !== h &&
      ((m = l.indexOf(h)),
      m < 0 && (m = a.activeIndex - 1),
      "auto" === i.slidesPerView &&
        1 === i.slidesPerGroup &&
        i.slidesPerGroupAuto &&
        ((m = m - a.slidesPerViewDynamic("previous", !0) + 1),
        (m = Math.max(m, 0)))),
    i.rewind && a.isBeginning)
  ) {
    const i =
      a.params.virtual && a.params.virtual.enabled && a.virtual
        ? a.virtual.slides.length - 1
        : a.slides.length - 1;
    return a.slideTo(i, e, t, s);
  }
  return a.slideTo(m, e, t, s);
}
function slideReset(e, t, s) {
  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
  return this.slideTo(this.activeIndex, e, t, s);
}
function slideToClosest(e, t, s, a) {
  void 0 === e && (e = this.params.speed),
    void 0 === t && (t = !0),
    void 0 === a && (a = 0.5);
  const i = this;
  let r = i.activeIndex;
  const n = Math.min(i.params.slidesPerGroupSkip, r),
    l = n + Math.floor((r - n) / i.params.slidesPerGroup),
    o = i.rtlTranslate ? i.translate : -i.translate;
  if (o >= i.snapGrid[l]) {
    const e = i.snapGrid[l];
    o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup);
  } else {
    const e = i.snapGrid[l - 1];
    o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, i.slidesGrid.length - 1)),
    i.slideTo(r, e, t, s)
  );
}
function slideToClickedSlide() {
  const e = this,
    { params: t, $wrapperEl: s } = e,
    a = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
  let i,
    r = e.clickedIndex;
  if (t.loop) {
    if (e.animating) return;
    (i = parseInt($(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
      t.centeredSlides
        ? r < e.loopedSlides - a / 2 ||
          r > e.slides.length - e.loopedSlides + a / 2
          ? (e.loopFix(),
            (r = s
              .children(
                `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
              )
              .eq(0)
              .index()),
            nextTick(() => {
              e.slideTo(r);
            }))
          : e.slideTo(r)
        : r > e.slides.length - a
        ? (e.loopFix(),
          (r = s
            .children(
              `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
            )
            .eq(0)
            .index()),
          nextTick(() => {
            e.slideTo(r);
          }))
        : e.slideTo(r);
  } else e.slideTo(r);
}
var slide = {
  slideTo: slideTo,
  slideToLoop: slideToLoop,
  slideNext: slideNext,
  slidePrev: slidePrev,
  slideReset: slideReset,
  slideToClosest: slideToClosest,
  slideToClickedSlide: slideToClickedSlide,
};
function loopCreate() {
  const e = this,
    t = getDocument(),
    { params: s, $wrapperEl: a } = e,
    i = a.children().length > 0 ? $(a.children()[0].parentNode) : a;
  i.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
  let r = i.children(`.${s.slideClass}`);
  if (s.loopFillGroupWithBlank) {
    const e = s.slidesPerGroup - (r.length % s.slidesPerGroup);
    if (e !== s.slidesPerGroup) {
      for (let a = 0; a < e; a += 1) {
        const e = $(t.createElement("div")).addClass(
          `${s.slideClass} ${s.slideBlankClass}`
        );
        i.append(e);
      }
      r = i.children(`.${s.slideClass}`);
    }
  }
  "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = r.length),
    (e.loopedSlides = Math.ceil(
      parseFloat(s.loopedSlides || s.slidesPerView, 10)
    )),
    (e.loopedSlides += s.loopAdditionalSlides),
    e.loopedSlides > r.length && (e.loopedSlides = r.length);
  const n = [],
    l = [];
  r.each((t, s) => {
    const a = $(t);
    s < e.loopedSlides && l.push(t),
      s < r.length && s >= r.length - e.loopedSlides && n.push(t),
      a.attr("data-swiper-slide-index", s);
  });
  for (let e = 0; e < l.length; e += 1)
    i.append($(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
  for (let e = n.length - 1; e >= 0; e -= 1)
    i.prepend($(n[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
}
function loopFix() {
  const e = this;
  e.emit("beforeLoopFix");
  const {
    activeIndex: t,
    slides: s,
    loopedSlides: a,
    allowSlidePrev: i,
    allowSlideNext: r,
    snapGrid: n,
    rtlTranslate: l,
  } = e;
  let o;
  (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
  const d = -n[t] - e.getTranslate();
  if (t < a) {
    (o = s.length - 3 * a + t), (o += a);
    e.slideTo(o, 0, !1, !0) &&
      0 !== d &&
      e.setTranslate((l ? -e.translate : e.translate) - d);
  } else if (t >= s.length - a) {
    (o = -s.length + t + a), (o += a);
    e.slideTo(o, 0, !1, !0) &&
      0 !== d &&
      e.setTranslate((l ? -e.translate : e.translate) - d);
  }
  (e.allowSlidePrev = i), (e.allowSlideNext = r), e.emit("loopFix");
}
function loopDestroy() {
  const { $wrapperEl: e, params: t, slides: s } = this;
  e
    .children(
      `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
    )
    .remove(),
    s.removeAttr("data-swiper-slide-index");
}
var loop = {
  loopCreate: loopCreate,
  loopFix: loopFix,
  loopDestroy: loopDestroy,
};
function setGrabCursor(e) {
  const t = this;
  if (
    t.support.touch ||
    !t.params.simulateTouch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode
  )
    return;
  const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
  (s.style.cursor = "move"), (s.style.cursor = e ? "grabbing" : "grab");
}
function unsetGrabCursor() {
  const e = this;
  e.support.touch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e[
      "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
    ].style.cursor = "");
}
var grabCursor = {
  setGrabCursor: setGrabCursor,
  unsetGrabCursor: unsetGrabCursor,
};
function closestElement(e, t) {
  return (
    void 0 === t && (t = this),
    (function t(s) {
      if (!s || s === getDocument() || s === getWindow()) return null;
      s.assignedSlot && (s = s.assignedSlot);
      const a = s.closest(e);
      return a || s.getRootNode ? a || t(s.getRootNode().host) : null;
    })(t)
  );
}
function onTouchStart(e) {
  const t = this,
    s = getDocument(),
    a = getWindow(),
    i = t.touchEventsData,
    { params: r, touches: n, enabled: l } = t;
  if (!l) return;
  if (t.animating && r.preventInteractionOnTransition) return;
  !t.animating && r.cssMode && r.loop && t.loopFix();
  let o = e;
  o.originalEvent && (o = o.originalEvent);
  let d = $(o.target);
  if ("wrapper" === r.touchEventsTarget && !d.closest(t.wrapperEl).length)
    return;
  if (
    ((i.isTouchEvent = "touchstart" === o.type),
    !i.isTouchEvent && "which" in o && 3 === o.which)
  )
    return;
  if (!i.isTouchEvent && "button" in o && o.button > 0) return;
  if (i.isTouched && i.isMoved) return;
  !!r.noSwipingClass &&
    "" !== r.noSwipingClass &&
    o.target &&
    o.target.shadowRoot &&
    e.path &&
    e.path[0] &&
    (d = $(e.path[0]));
  const c = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    p = !(!o.target || !o.target.shadowRoot);
  if (r.noSwiping && (p ? closestElement(c, d[0]) : d.closest(c)[0]))
    return void (t.allowClick = !0);
  if (r.swipeHandler && !d.closest(r.swipeHandler)[0]) return;
  (n.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX),
    (n.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY);
  const u = n.currentX,
    h = n.currentY,
    m = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
    f = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
  if (m && (u <= f || u >= a.innerWidth - f)) {
    if ("prevent" !== m) return;
    e.preventDefault();
  }
  if (
    (Object.assign(i, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
    (n.startX = u),
    (n.startY = h),
    (i.touchStartTime = now()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    r.threshold > 0 && (i.allowThresholdMove = !1),
    "touchstart" !== o.type)
  ) {
    let e = !0;
    d.is(i.focusableElements) &&
      ((e = !1), "SELECT" === d[0].nodeName && (i.isTouched = !1)),
      s.activeElement &&
        $(s.activeElement).is(i.focusableElements) &&
        s.activeElement !== d[0] &&
        s.activeElement.blur();
    const a = e && t.allowTouchMove && r.touchStartPreventDefault;
    (!r.touchStartForcePreventDefault && !a) ||
      d[0].isContentEditable ||
      o.preventDefault();
  }
  t.params.freeMode &&
    t.params.freeMode.enabled &&
    t.freeMode &&
    t.animating &&
    !r.cssMode &&
    t.freeMode.onTouchStart(),
    t.emit("touchStart", o);
}
function onTouchMove(e) {
  const t = getDocument(),
    s = this,
    a = s.touchEventsData,
    { params: i, touches: r, rtlTranslate: n, enabled: l } = s;
  if (!l) return;
  let o = e;
  if ((o.originalEvent && (o = o.originalEvent), !a.isTouched))
    return void (
      a.startMoving &&
      a.isScrolling &&
      s.emit("touchMoveOpposite", o)
    );
  if (a.isTouchEvent && "touchmove" !== o.type) return;
  const d =
      "touchmove" === o.type &&
      o.targetTouches &&
      (o.targetTouches[0] || o.changedTouches[0]),
    c = "touchmove" === o.type ? d.pageX : o.pageX,
    p = "touchmove" === o.type ? d.pageY : o.pageY;
  if (o.preventedByNestedSwiper) return (r.startX = c), void (r.startY = p);
  if (!s.allowTouchMove)
    return (
      $(o.target).is(a.focusableElements) || (s.allowClick = !1),
      void (
        a.isTouched &&
        (Object.assign(r, { startX: c, startY: p, currentX: c, currentY: p }),
        (a.touchStartTime = now()))
      )
    );
  if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
    if (s.isVertical()) {
      if (
        (p < r.startY && s.translate <= s.maxTranslate()) ||
        (p > r.startY && s.translate >= s.minTranslate())
      )
        return (a.isTouched = !1), void (a.isMoved = !1);
    } else if (
      (c < r.startX && s.translate <= s.maxTranslate()) ||
      (c > r.startX && s.translate >= s.minTranslate())
    )
      return;
  if (
    a.isTouchEvent &&
    t.activeElement &&
    o.target === t.activeElement &&
    $(o.target).is(a.focusableElements)
  )
    return (a.isMoved = !0), void (s.allowClick = !1);
  if (
    (a.allowTouchCallbacks && s.emit("touchMove", o),
    o.targetTouches && o.targetTouches.length > 1)
  )
    return;
  (r.currentX = c), (r.currentY = p);
  const u = r.currentX - r.startX,
    h = r.currentY - r.startY;
  if (s.params.threshold && Math.sqrt(u ** 2 + h ** 2) < s.params.threshold)
    return;
  if (void 0 === a.isScrolling) {
    let e;
    (s.isHorizontal() && r.currentY === r.startY) ||
    (s.isVertical() && r.currentX === r.startX)
      ? (a.isScrolling = !1)
      : u * u + h * h >= 25 &&
        ((e = (180 * Math.atan2(Math.abs(h), Math.abs(u))) / Math.PI),
        (a.isScrolling = s.isHorizontal()
          ? e > i.touchAngle
          : 90 - e > i.touchAngle));
  }
  if (
    (a.isScrolling && s.emit("touchMoveOpposite", o),
    void 0 === a.startMoving &&
      ((r.currentX === r.startX && r.currentY === r.startY) ||
        (a.startMoving = !0)),
    a.isScrolling)
  )
    return void (a.isTouched = !1);
  if (!a.startMoving) return;
  (s.allowClick = !1),
    !i.cssMode && o.cancelable && o.preventDefault(),
    i.touchMoveStopPropagation && !i.nested && o.stopPropagation(),
    a.isMoved ||
      (i.loop && !i.cssMode && s.loopFix(),
      (a.startTranslate = s.getTranslate()),
      s.setTransition(0),
      s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
      (a.allowMomentumBounce = !1),
      !i.grabCursor ||
        (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
        s.setGrabCursor(!0),
      s.emit("sliderFirstMove", o)),
    s.emit("sliderMove", o),
    (a.isMoved = !0);
  let m = s.isHorizontal() ? u : h;
  (r.diff = m),
    (m *= i.touchRatio),
    n && (m = -m),
    (s.swipeDirection = m > 0 ? "prev" : "next"),
    (a.currentTranslate = m + a.startTranslate);
  let f = !0,
    g = i.resistanceRatio;
  if (
    (i.touchReleaseOnEdges && (g = 0),
    m > 0 && a.currentTranslate > s.minTranslate()
      ? ((f = !1),
        i.resistance &&
          (a.currentTranslate =
            s.minTranslate() -
            1 +
            (-s.minTranslate() + a.startTranslate + m) ** g))
      : m < 0 &&
        a.currentTranslate < s.maxTranslate() &&
        ((f = !1),
        i.resistance &&
          (a.currentTranslate =
            s.maxTranslate() +
            1 -
            (s.maxTranslate() - a.startTranslate - m) ** g)),
    f && (o.preventedByNestedSwiper = !0),
    !s.allowSlideNext &&
      "next" === s.swipeDirection &&
      a.currentTranslate < a.startTranslate &&
      (a.currentTranslate = a.startTranslate),
    !s.allowSlidePrev &&
      "prev" === s.swipeDirection &&
      a.currentTranslate > a.startTranslate &&
      (a.currentTranslate = a.startTranslate),
    s.allowSlidePrev ||
      s.allowSlideNext ||
      (a.currentTranslate = a.startTranslate),
    i.threshold > 0)
  ) {
    if (!(Math.abs(m) > i.threshold || a.allowThresholdMove))
      return void (a.currentTranslate = a.startTranslate);
    if (!a.allowThresholdMove)
      return (
        (a.allowThresholdMove = !0),
        (r.startX = r.currentX),
        (r.startY = r.currentY),
        (a.currentTranslate = a.startTranslate),
        void (r.diff = s.isHorizontal()
          ? r.currentX - r.startX
          : r.currentY - r.startY)
      );
  }
  i.followFinger &&
    !i.cssMode &&
    (((i.freeMode && i.freeMode.enabled && s.freeMode) ||
      i.watchSlidesProgress) &&
      (s.updateActiveIndex(), s.updateSlidesClasses()),
    s.params.freeMode &&
      i.freeMode.enabled &&
      s.freeMode &&
      s.freeMode.onTouchMove(),
    s.updateProgress(a.currentTranslate),
    s.setTranslate(a.currentTranslate));
}
function onTouchEnd(e) {
  const t = this,
    s = t.touchEventsData,
    { params: a, touches: i, rtlTranslate: r, slidesGrid: n, enabled: l } = t;
  if (!l) return;
  let o = e;
  if (
    (o.originalEvent && (o = o.originalEvent),
    s.allowTouchCallbacks && t.emit("touchEnd", o),
    (s.allowTouchCallbacks = !1),
    !s.isTouched)
  )
    return (
      s.isMoved && a.grabCursor && t.setGrabCursor(!1),
      (s.isMoved = !1),
      void (s.startMoving = !1)
    );
  a.grabCursor &&
    s.isMoved &&
    s.isTouched &&
    (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
    t.setGrabCursor(!1);
  const d = now(),
    c = d - s.touchStartTime;
  if (t.allowClick) {
    const e = o.path || (o.composedPath && o.composedPath());
    t.updateClickedSlide((e && e[0]) || o.target),
      t.emit("tap click", o),
      c < 300 &&
        d - s.lastClickTime < 300 &&
        t.emit("doubleTap doubleClick", o);
  }
  if (
    ((s.lastClickTime = now()),
    nextTick(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !s.isTouched ||
      !s.isMoved ||
      !t.swipeDirection ||
      0 === i.diff ||
      s.currentTranslate === s.startTranslate)
  )
    return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
  let p;
  if (
    ((s.isTouched = !1),
    (s.isMoved = !1),
    (s.startMoving = !1),
    (p = a.followFinger
      ? r
        ? t.translate
        : -t.translate
      : -s.currentTranslate),
    a.cssMode)
  )
    return;
  if (t.params.freeMode && a.freeMode.enabled)
    return void t.freeMode.onTouchEnd({ currentPos: p });
  let u = 0,
    h = t.slidesSizesGrid[0];
  for (
    let e = 0;
    e < n.length;
    e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
  ) {
    const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    void 0 !== n[e + t]
      ? p >= n[e] && p < n[e + t] && ((u = e), (h = n[e + t] - n[e]))
      : p >= n[e] && ((u = e), (h = n[n.length - 1] - n[n.length - 2]));
  }
  let m = null,
    f = null;
  a.rewind &&
    (t.isBeginning
      ? (f =
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (m = 0));
  const g = (p - n[u]) / h,
    v = u < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
  if (c > a.longSwipesMs) {
    if (!a.longSwipes) return void t.slideTo(t.activeIndex);
    "next" === t.swipeDirection &&
      (g >= a.longSwipesRatio
        ? t.slideTo(a.rewind && t.isEnd ? m : u + v)
        : t.slideTo(u)),
      "prev" === t.swipeDirection &&
        (g > 1 - a.longSwipesRatio
          ? t.slideTo(u + v)
          : null !== f && g < 0 && Math.abs(g) > a.longSwipesRatio
          ? t.slideTo(f)
          : t.slideTo(u));
  } else {
    if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
    t.navigation &&
    (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
      ? o.target === t.navigation.nextEl
        ? t.slideTo(u + v)
        : t.slideTo(u)
      : ("next" === t.swipeDirection && t.slideTo(null !== m ? m : u + v),
        "prev" === t.swipeDirection && t.slideTo(null !== f ? f : u));
  }
}
function onResize() {
  const e = this,
    { params: t, el: s } = e;
  if (s && 0 === s.offsetWidth) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e;
  (e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses(),
    ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
    e.isEnd &&
    !e.isBeginning &&
    !e.params.centeredSlides
      ? e.slideTo(e.slides.length - 1, 0, !1, !0)
      : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
    (e.allowSlidePrev = i),
    (e.allowSlideNext = a),
    e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
}
function onClick(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function onScroll() {
  const e = this,
    { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
  if (!a) return;
  let i;
  (e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    0 === e.translate && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
  const r = e.maxTranslate() - e.minTranslate();
  (i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
    i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1);
}
let dummyEventAttached = !1;
function dummyEventListener() {}
const events = (e, t) => {
  const s = getDocument(),
    {
      params: a,
      touchEvents: i,
      el: r,
      wrapperEl: n,
      device: l,
      support: o,
    } = e,
    d = !!a.nested,
    c = "on" === t ? "addEventListener" : "removeEventListener",
    p = t;
  if (o.touch) {
    const t = !(
      "touchstart" !== i.start ||
      !o.passiveListener ||
      !a.passiveListeners
    ) && { passive: !0, capture: !1 };
    r[c](i.start, e.onTouchStart, t),
      r[c](
        i.move,
        e.onTouchMove,
        o.passiveListener ? { passive: !1, capture: d } : d
      ),
      r[c](i.end, e.onTouchEnd, t),
      i.cancel && r[c](i.cancel, e.onTouchEnd, t);
  } else
    r[c](i.start, e.onTouchStart, !1),
      s[c](i.move, e.onTouchMove, d),
      s[c](i.end, e.onTouchEnd, !1);
  (a.preventClicks || a.preventClicksPropagation) &&
    r[c]("click", e.onClick, !0),
    a.cssMode && n[c]("scroll", e.onScroll),
    a.updateOnWindowResize
      ? e[p](
          l.ios || l.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          onResize,
          !0
        )
      : e[p]("observerUpdate", onResize, !0);
};
function attachEvents() {
  const e = this,
    t = getDocument(),
    { params: s, support: a } = e;
  (e.onTouchStart = onTouchStart.bind(e)),
    (e.onTouchMove = onTouchMove.bind(e)),
    (e.onTouchEnd = onTouchEnd.bind(e)),
    s.cssMode && (e.onScroll = onScroll.bind(e)),
    (e.onClick = onClick.bind(e)),
    a.touch &&
      !dummyEventAttached &&
      (t.addEventListener("touchstart", dummyEventListener),
      (dummyEventAttached = !0)),
    events(e, "on");
}
function detachEvents() {
  events(this, "off");
}
var events$1 = { attachEvents: attachEvents, detachEvents: detachEvents };
const isGridEnabled = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function setBreakpoint() {
  const e = this,
    {
      activeIndex: t,
      initialized: s,
      loopedSlides: a = 0,
      params: i,
      $el: r,
    } = e,
    n = i.breakpoints;
  if (!n || (n && 0 === Object.keys(n).length)) return;
  const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
  if (!l || e.currentBreakpoint === l) return;
  const o = (l in n ? n[l] : void 0) || e.originalParams,
    d = isGridEnabled(e, i),
    c = isGridEnabled(e, o),
    p = i.enabled;
  d && !c
    ? (r.removeClass(
        `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !d &&
      c &&
      (r.addClass(`${i.containerModifierClass}grid`),
      ((o.grid.fill && "column" === o.grid.fill) ||
        (!o.grid.fill && "column" === i.grid.fill)) &&
        r.addClass(`${i.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ["navigation", "pagination", "scrollbar"].forEach((t) => {
      const s = i[t] && i[t].enabled,
        a = o[t] && o[t].enabled;
      s && !a && e[t].disable(), !s && a && e[t].enable();
    });
  const u = o.direction && o.direction !== i.direction,
    h = i.loop && (o.slidesPerView !== i.slidesPerView || u);
  u && s && e.changeDirection(), extend(e.params, o);
  const m = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    p && !m ? e.disable() : !p && m && e.enable(),
    (e.currentBreakpoint = l),
    e.emit("_beforeBreakpoint", o),
    h &&
      s &&
      (e.loopDestroy(),
      e.loopCreate(),
      e.updateSlides(),
      e.slideTo(t - a + e.loopedSlides, 0, !1)),
    e.emit("breakpoint", o);
}
function getBreakpoint(e, t, s) {
  if ((void 0 === t && (t = "window"), !e || ("container" === t && !s))) return;
  let a = !1;
  const i = getWindow(),
    r = "window" === t ? i.innerHeight : s.clientHeight,
    n = Object.keys(e).map((e) => {
      if ("string" == typeof e && 0 === e.indexOf("@")) {
        const t = parseFloat(e.substr(1));
        return { value: r * t, point: e };
      }
      return { value: e, point: e };
    });
  n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
  for (let e = 0; e < n.length; e += 1) {
    const { point: r, value: l } = n[e];
    "window" === t
      ? i.matchMedia(`(min-width: ${l}px)`).matches && (a = r)
      : l <= s.clientWidth && (a = r);
  }
  return a || "max";
}
var breakpoints = {
  setBreakpoint: setBreakpoint,
  getBreakpoint: getBreakpoint,
};
function prepareClasses(e, t) {
  const s = [];
  return (
    e.forEach((e) => {
      "object" == typeof e
        ? Object.keys(e).forEach((a) => {
            e[a] && s.push(t + a);
          })
        : "string" == typeof e && s.push(t + e);
    }),
    s
  );
}
function addClasses() {
  const e = this,
    { classNames: t, params: s, rtl: a, $el: i, device: r, support: n } = e,
    l = prepareClasses(
      [
        "initialized",
        s.direction,
        { "pointer-events": !n.touch },
        { "free-mode": e.params.freeMode && s.freeMode.enabled },
        { autoheight: s.autoHeight },
        { rtl: a },
        { grid: s.grid && s.grid.rows > 1 },
        {
          "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
        },
        { android: r.android },
        { ios: r.ios },
        { "css-mode": s.cssMode },
        { centered: s.cssMode && s.centeredSlides },
        { "watch-progress": s.watchSlidesProgress },
      ],
      s.containerModifierClass
    );
  t.push(...l), i.addClass([...t].join(" ")), e.emitContainerClasses();
}
function removeClasses() {
  const { $el: e, classNames: t } = this;
  e.removeClass(t.join(" ")), this.emitContainerClasses();
}
var classes = { addClasses: addClasses, removeClasses: removeClasses };
function loadImage(e, t, s, a, i, r) {
  const n = getWindow();
  let l;
  function o() {
    r && r();
  }
  $(e).parent("picture")[0] || (e.complete && i)
    ? o()
    : t
    ? ((l = new n.Image()),
      (l.onload = o),
      (l.onerror = o),
      a && (l.sizes = a),
      s && (l.srcset = s),
      t && (l.src = t))
    : o();
}
function preloadImages() {
  const e = this;
  function t() {
    null != e &&
      e &&
      !e.destroyed &&
      (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
      e.imagesLoaded === e.imagesToLoad.length &&
        (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
  }
  e.imagesToLoad = e.$el.find("img");
  for (let s = 0; s < e.imagesToLoad.length; s += 1) {
    const a = e.imagesToLoad[s];
    e.loadImage(
      a,
      a.currentSrc || a.getAttribute("src"),
      a.srcset || a.getAttribute("srcset"),
      a.sizes || a.getAttribute("sizes"),
      !0,
      t
    );
  }
}
var images = { loadImage: loadImage, preloadImages: preloadImages };
function checkOverflow() {
  const e = this,
    { isLocked: t, params: s } = e,
    { slidesOffsetBefore: a } = s;
  if (a) {
    const t = e.slides.length - 1,
      s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
    e.isLocked = e.size > s;
  } else e.isLocked = 1 === e.snapGrid.length;
  !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
    !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var checkOverflow$1 = { checkOverflow: checkOverflow },
  defaults = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function moduleExtendParams(e, t) {
  return function (s) {
    void 0 === s && (s = {});
    const a = Object.keys(s)[0],
      i = s[a];
    "object" == typeof i && null !== i
      ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 &&
          !0 === e[a] &&
          (e[a] = { auto: !0 }),
        a in e && "enabled" in i
          ? (!0 === e[a] && (e[a] = { enabled: !0 }),
            "object" != typeof e[a] || "enabled" in e[a] || (e[a].enabled = !0),
            e[a] || (e[a] = { enabled: !1 }),
            extend(t, s))
          : extend(t, s))
      : extend(t, s);
  };
}
const prototypes = {
    eventsEmitter: eventsEmitter,
    update: update,
    translate: translate,
    transition: transition,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    events: events$1,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images,
  },
  extendedDefaults = {};
class Swiper {
  constructor() {
    let e, t;
    for (var s = arguments.length, a = new Array(s), i = 0; i < s; i++)
      a[i] = arguments[i];
    if (
      (1 === a.length &&
      a[0].constructor &&
      "Object" === Object.prototype.toString.call(a[0]).slice(8, -1)
        ? (t = a[0])
        : ([e, t] = a),
      t || (t = {}),
      (t = extend({}, t)),
      e && !t.el && (t.el = e),
      t.el && $(t.el).length > 1)
    ) {
      const e = [];
      return (
        $(t.el).each((s) => {
          const a = extend({}, t, { el: s });
          e.push(new Swiper(a));
        }),
        e
      );
    }
    const r = this;
    (r.__swiper__ = !0),
      (r.support = getSupport()),
      (r.device = getDevice({ userAgent: t.userAgent })),
      (r.browser = getBrowser()),
      (r.eventsListeners = {}),
      (r.eventsAnyListeners = []),
      (r.modules = [...r.__modules__]),
      t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
    const n = {};
    r.modules.forEach((e) => {
      e({
        swiper: r,
        extendParams: moduleExtendParams(t, n),
        on: r.on.bind(r),
        once: r.once.bind(r),
        off: r.off.bind(r),
        emit: r.emit.bind(r),
      });
    });
    const l = extend({}, defaults, n);
    return (
      (r.params = extend({}, l, extendedDefaults, t)),
      (r.originalParams = extend({}, r.params)),
      (r.passedParams = extend({}, t)),
      r.params &&
        r.params.on &&
        Object.keys(r.params.on).forEach((e) => {
          r.on(e, r.params.on[e]);
        }),
      r.params && r.params.onAny && r.onAny(r.params.onAny),
      (r.$ = $),
      Object.assign(r, {
        enabled: r.params.enabled,
        el: e,
        classNames: [],
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal: () => "horizontal" === r.params.direction,
        isVertical: () => "vertical" === r.params.direction,
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: r.params.allowSlideNext,
        allowSlidePrev: r.params.allowSlidePrev,
        touchEvents: (function () {
          const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
            t = ["pointerdown", "pointermove", "pointerup"];
          return (
            (r.touchEventsTouch = {
              start: e[0],
              move: e[1],
              end: e[2],
              cancel: e[3],
            }),
            (r.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
            r.support.touch || !r.params.simulateTouch
              ? r.touchEventsTouch
              : r.touchEventsDesktop
          );
        })(),
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: r.params.focusableElements,
          lastClickTime: now(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          isTouchEvent: void 0,
          startMoving: void 0,
        },
        allowClick: !0,
        allowTouchMove: r.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      r.emit("_swiper"),
      r.params.init && r.init(),
      r
    );
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"));
  }
  setProgress(e, t) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const a = s.minTranslate(),
      i = (s.maxTranslate() - a) * e + a;
    s.translateTo(i, void 0 === t ? 0 : t),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className
      .split(" ")
      .filter(
        (t) =>
          0 === t.indexOf("swiper") ||
          0 === t.indexOf(e.params.containerModifierClass)
      );
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed
      ? ""
      : e.className
          .split(" ")
          .filter(
            (e) =>
              0 === e.indexOf("swiper-slide") ||
              0 === e.indexOf(t.params.slideClass)
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.each((s) => {
      const a = e.getSlideClasses(s);
      t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a);
    }),
      e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    void 0 === e && (e = "current"), void 0 === t && (t = !1);
    const {
      params: s,
      slides: a,
      slidesGrid: i,
      slidesSizesGrid: r,
      size: n,
      activeIndex: l,
    } = this;
    let o = 1;
    if (s.centeredSlides) {
      let e,
        t = a[l].swiperSlideSize;
      for (let s = l + 1; s < a.length; s += 1)
        a[s] &&
          !e &&
          ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      for (let s = l - 1; s >= 0; s -= 1)
        a[s] &&
          !e &&
          ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
    } else if ("current" === e)
      for (let e = l + 1; e < a.length; e += 1) {
        (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
      }
    else
      for (let e = l - 1; e >= 0; e -= 1) {
        i[l] - i[e] < n && (o += 1);
      }
    return o;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: t, params: s } = e;
    function a() {
      const t = e.rtlTranslate ? -1 * e.translate : e.translate,
        s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
      e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let i;
    s.breakpoints && e.setBreakpoint(),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses(),
      e.params.freeMode && e.params.freeMode.enabled
        ? (a(), e.params.autoHeight && e.updateAutoHeight())
        : ((i =
            ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) &&
            e.isEnd &&
            !e.params.centeredSlides
              ? e.slideTo(e.slides.length - 1, 0, !1, !0)
              : e.slideTo(e.activeIndex, 0, !1, !0)),
          i || a()),
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
      e.emit("update");
  }
  changeDirection(e, t) {
    void 0 === t && (t = !0);
    const s = this,
      a = s.params.direction;
    return (
      e || (e = "horizontal" === a ? "vertical" : "horizontal"),
      e === a ||
        ("horizontal" !== e && "vertical" !== e) ||
        (s.$el
          .removeClass(`${s.params.containerModifierClass}${a}`)
          .addClass(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        (s.params.direction = e),
        s.slides.each((t) => {
          "vertical" === e ? (t.style.width = "") : (t.style.height = "");
        }),
        s.emit("changeDirection"),
        t && s.update()),
      s
    );
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    const s = $(e || t.params.el);
    if (!(e = s[0])) return !1;
    e.swiper = t;
    const a = () =>
      `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let i = (() => {
      if (e && e.shadowRoot && e.shadowRoot.querySelector) {
        const t = $(e.shadowRoot.querySelector(a()));
        return (t.children = (e) => s.children(e)), t;
      }
      return s.children ? s.children(a()) : $(s).children(a());
    })();
    if (0 === i.length && t.params.createElements) {
      const e = getDocument().createElement("div");
      (i = $(e)),
        (e.className = t.params.wrapperClass),
        s.append(e),
        s.children(`.${t.params.slideClass}`).each((e) => {
          i.append(e);
        });
    }
    return (
      Object.assign(t, {
        $el: s,
        el: e,
        $wrapperEl: i,
        wrapperEl: i[0],
        mounted: !0,
        rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
        rtlTranslate:
          "horizontal" === t.params.direction &&
          ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
        wrongRTL: "-webkit-box" === i.css("display"),
      }),
      !0
    );
  }
  init(e) {
    const t = this;
    if (t.initialized) return t;
    return (
      !1 === t.mount(e) ||
        (t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.params.loop && t.loopCreate(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.preloadImages && t.preloadImages(),
        t.params.loop
          ? t.slideTo(
              t.params.initialSlide + t.loopedSlides,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            ),
        t.attachEvents(),
        (t.initialized = !0),
        t.emit("init"),
        t.emit("afterInit")),
      t
    );
  }
  destroy(e, t) {
    void 0 === e && (e = !0), void 0 === t && (t = !0);
    const s = this,
      { params: a, $el: i, $wrapperEl: r, slides: n } = s;
    return (
      void 0 === s.params ||
        s.destroyed ||
        (s.emit("beforeDestroy"),
        (s.initialized = !1),
        s.detachEvents(),
        a.loop && s.loopDestroy(),
        t &&
          (s.removeClasses(),
          i.removeAttr("style"),
          r.removeAttr("style"),
          n &&
            n.length &&
            n
              .removeClass(
                [
                  a.slideVisibleClass,
                  a.slideActiveClass,
                  a.slideNextClass,
                  a.slidePrevClass,
                ].join(" ")
              )
              .removeAttr("style")
              .removeAttr("data-swiper-slide-index")),
        s.emit("destroy"),
        Object.keys(s.eventsListeners).forEach((e) => {
          s.off(e);
        }),
        !1 !== e && ((s.$el[0].swiper = null), deleteProps(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    extend(extendedDefaults, e);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(e) {
    Swiper.prototype.__modules__ || (Swiper.prototype.__modules__ = []);
    const t = Swiper.prototype.__modules__;
    "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((e) => Swiper.installModule(e)), Swiper)
      : (Swiper.installModule(e), Swiper);
  }
}
function Virtual(e) {
  let t,
    { swiper: s, extendParams: a, on: i, emit: r } = e;
  function n(e, t) {
    const a = s.params.virtual;
    if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t];
    const i = a.renderSlide
      ? $(a.renderSlide.call(s, e, t))
      : $(
          `<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`
        );
    return (
      i.attr("data-swiper-slide-index") || i.attr("data-swiper-slide-index", t),
      a.cache && (s.virtual.cache[t] = i),
      i
    );
  }
  function l(e) {
    const { slidesPerView: t, slidesPerGroup: a, centeredSlides: i } = s.params,
      { addSlidesBefore: l, addSlidesAfter: o } = s.params.virtual,
      { from: d, to: c, slides: p, slidesGrid: u, offset: h } = s.virtual;
    s.params.cssMode || s.updateActiveIndex();
    const m = s.activeIndex || 0;
    let f, g, v;
    (f = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top"),
      i
        ? ((g = Math.floor(t / 2) + a + o), (v = Math.floor(t / 2) + a + l))
        : ((g = t + (a - 1) + o), (v = a + l));
    const w = Math.max((m || 0) - v, 0),
      b = Math.min((m || 0) + g, p.length - 1),
      x = (s.slidesGrid[w] || 0) - (s.slidesGrid[0] || 0);
    function y() {
      s.updateSlides(),
        s.updateProgress(),
        s.updateSlidesClasses(),
        s.lazy && s.params.lazy.enabled && s.lazy.load(),
        r("virtualUpdate");
    }
    if (
      (Object.assign(s.virtual, {
        from: w,
        to: b,
        offset: x,
        slidesGrid: s.slidesGrid,
      }),
      d === w && c === b && !e)
    )
      return (
        s.slidesGrid !== u && x !== h && s.slides.css(f, `${x}px`),
        s.updateProgress(),
        void r("virtualUpdate")
      );
    if (s.params.virtual.renderExternal)
      return (
        s.params.virtual.renderExternal.call(s, {
          offset: x,
          from: w,
          to: b,
          slides: (function () {
            const e = [];
            for (let t = w; t <= b; t += 1) e.push(p[t]);
            return e;
          })(),
        }),
        void (s.params.virtual.renderExternalUpdate ? y() : r("virtualUpdate"))
      );
    const $ = [],
      E = [];
    if (e) s.$wrapperEl.find(`.${s.params.slideClass}`).remove();
    else
      for (let e = d; e <= c; e += 1)
        (e < w || e > b) &&
          s.$wrapperEl
            .find(`.${s.params.slideClass}[data-swiper-slide-index="${e}"]`)
            .remove();
    for (let t = 0; t < p.length; t += 1)
      t >= w &&
        t <= b &&
        (void 0 === c || e
          ? E.push(t)
          : (t > c && E.push(t), t < d && $.push(t)));
    E.forEach((e) => {
      s.$wrapperEl.append(n(p[e], e));
    }),
      $.sort((e, t) => t - e).forEach((e) => {
        s.$wrapperEl.prepend(n(p[e], e));
      }),
      s.$wrapperEl.children(".swiper-slide").css(f, `${x}px`),
      y();
  }
  a({
    virtual: {
      enabled: !1,
      slides: [],
      cache: !0,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: !0,
      addSlidesBefore: 0,
      addSlidesAfter: 0,
    },
  }),
    (s.virtual = {
      cache: {},
      from: void 0,
      to: void 0,
      slides: [],
      offset: 0,
      slidesGrid: [],
    }),
    i("beforeInit", () => {
      s.params.virtual.enabled &&
        ((s.virtual.slides = s.params.virtual.slides),
        s.classNames.push(`${s.params.containerModifierClass}virtual`),
        (s.params.watchSlidesProgress = !0),
        (s.originalParams.watchSlidesProgress = !0),
        s.params.initialSlide || l());
    }),
    i("setTranslate", () => {
      s.params.virtual.enabled &&
        (s.params.cssMode && !s._immediateVirtual
          ? (clearTimeout(t),
            (t = setTimeout(() => {
              l();
            }, 100)))
          : l());
    }),
    i("init update resize", () => {
      s.params.virtual.enabled &&
        s.params.cssMode &&
        setCSSProperty(
          s.wrapperEl,
          "--swiper-virtual-size",
          `${s.virtualSize}px`
        );
    }),
    Object.assign(s.virtual, {
      appendSlide: function (e) {
        if ("object" == typeof e && "length" in e)
          for (let t = 0; t < e.length; t += 1)
            e[t] && s.virtual.slides.push(e[t]);
        else s.virtual.slides.push(e);
        l(!0);
      },
      prependSlide: function (e) {
        const t = s.activeIndex;
        let a = t + 1,
          i = 1;
        if (Array.isArray(e)) {
          for (let t = 0; t < e.length; t += 1)
            e[t] && s.virtual.slides.unshift(e[t]);
          (a = t + e.length), (i = e.length);
        } else s.virtual.slides.unshift(e);
        if (s.params.virtual.cache) {
          const e = s.virtual.cache,
            t = {};
          Object.keys(e).forEach((s) => {
            const a = e[s],
              r = a.attr("data-swiper-slide-index");
            r && a.attr("data-swiper-slide-index", parseInt(r, 10) + i),
              (t[parseInt(s, 10) + i] = a);
          }),
            (s.virtual.cache = t);
        }
        l(!0), s.slideTo(a, 0);
      },
      removeSlide: function (e) {
        if (null == e) return;
        let t = s.activeIndex;
        if (Array.isArray(e))
          for (let a = e.length - 1; a >= 0; a -= 1)
            s.virtual.slides.splice(e[a], 1),
              s.params.virtual.cache && delete s.virtual.cache[e[a]],
              e[a] < t && (t -= 1),
              (t = Math.max(t, 0));
        else
          s.virtual.slides.splice(e, 1),
            s.params.virtual.cache && delete s.virtual.cache[e],
            e < t && (t -= 1),
            (t = Math.max(t, 0));
        l(!0), s.slideTo(t, 0);
      },
      removeAllSlides: function () {
        (s.virtual.slides = []),
          s.params.virtual.cache && (s.virtual.cache = {}),
          l(!0),
          s.slideTo(0, 0);
      },
      update: l,
    });
}
function Keyboard(e) {
  let { swiper: t, extendParams: s, on: a, emit: i } = e;
  const r = getDocument(),
    n = getWindow();
  function l(e) {
    if (!t.enabled) return;
    const { rtlTranslate: s } = t;
    let a = e;
    a.originalEvent && (a = a.originalEvent);
    const l = a.keyCode || a.charCode,
      o = t.params.keyboard.pageUpDown,
      d = o && 33 === l,
      c = o && 34 === l,
      p = 37 === l,
      u = 39 === l,
      h = 38 === l,
      m = 40 === l;
    if (
      !t.allowSlideNext &&
      ((t.isHorizontal() && u) || (t.isVertical() && m) || c)
    )
      return !1;
    if (
      !t.allowSlidePrev &&
      ((t.isHorizontal() && p) || (t.isVertical() && h) || d)
    )
      return !1;
    if (
      !(
        a.shiftKey ||
        a.altKey ||
        a.ctrlKey ||
        a.metaKey ||
        (r.activeElement &&
          r.activeElement.nodeName &&
          ("input" === r.activeElement.nodeName.toLowerCase() ||
            "textarea" === r.activeElement.nodeName.toLowerCase()))
      )
    ) {
      if (t.params.keyboard.onlyInViewport && (d || c || p || u || h || m)) {
        let e = !1;
        if (
          t.$el.parents(`.${t.params.slideClass}`).length > 0 &&
          0 === t.$el.parents(`.${t.params.slideActiveClass}`).length
        )
          return;
        const a = t.$el,
          i = a[0].clientWidth,
          r = a[0].clientHeight,
          l = n.innerWidth,
          o = n.innerHeight,
          d = t.$el.offset();
        s && (d.left -= t.$el[0].scrollLeft);
        const c = [
          [d.left, d.top],
          [d.left + i, d.top],
          [d.left, d.top + r],
          [d.left + i, d.top + r],
        ];
        for (let t = 0; t < c.length; t += 1) {
          const s = c[t];
          if (s[0] >= 0 && s[0] <= l && s[1] >= 0 && s[1] <= o) {
            if (0 === s[0] && 0 === s[1]) continue;
            e = !0;
          }
        }
        if (!e) return;
      }
      t.isHorizontal()
        ? ((d || c || p || u) &&
            (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
          (((c || u) && !s) || ((d || p) && s)) && t.slideNext(),
          (((d || p) && !s) || ((c || u) && s)) && t.slidePrev())
        : ((d || c || h || m) &&
            (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
          (c || m) && t.slideNext(),
          (d || h) && t.slidePrev()),
        i("keyPress", l);
    }
  }
  function o() {
    t.keyboard.enabled || ($(r).on("keydown", l), (t.keyboard.enabled = !0));
  }
  function d() {
    t.keyboard.enabled && ($(r).off("keydown", l), (t.keyboard.enabled = !1));
  }
  (t.keyboard = { enabled: !1 }),
    s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
    a("init", () => {
      t.params.keyboard.enabled && o();
    }),
    a("destroy", () => {
      t.keyboard.enabled && d();
    }),
    Object.assign(t.keyboard, { enable: o, disable: d });
}
function Mousewheel(e) {
  let { swiper: t, extendParams: s, on: a, emit: i } = e;
  const r = getWindow();
  let n;
  s({
    mousewheel: {
      enabled: !1,
      releaseOnEdges: !1,
      invert: !1,
      forceToAxis: !1,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null,
    },
  }),
    (t.mousewheel = { enabled: !1 });
  let l,
    o = now();
  const d = [];
  function c() {
    t.enabled && (t.mouseEntered = !0);
  }
  function p() {
    t.enabled && (t.mouseEntered = !1);
  }
  function u(e) {
    return (
      !(
        t.params.mousewheel.thresholdDelta &&
        e.delta < t.params.mousewheel.thresholdDelta
      ) &&
      !(
        t.params.mousewheel.thresholdTime &&
        now() - o < t.params.mousewheel.thresholdTime
      ) &&
      ((e.delta >= 6 && now() - o < 60) ||
        (e.direction < 0
          ? (t.isEnd && !t.params.loop) ||
            t.animating ||
            (t.slideNext(), i("scroll", e.raw))
          : (t.isBeginning && !t.params.loop) ||
            t.animating ||
            (t.slidePrev(), i("scroll", e.raw)),
        (o = new r.Date().getTime()),
        !1))
    );
  }
  function h(e) {
    let s = e,
      a = !0;
    if (!t.enabled) return;
    const r = t.params.mousewheel;
    t.params.cssMode && s.preventDefault();
    let o = t.$el;
    if (
      ("container" !== t.params.mousewheel.eventsTarget &&
        (o = $(t.params.mousewheel.eventsTarget)),
      !t.mouseEntered && !o[0].contains(s.target) && !r.releaseOnEdges)
    )
      return !0;
    s.originalEvent && (s = s.originalEvent);
    let c = 0;
    const p = t.rtlTranslate ? -1 : 1,
      h = (function (e) {
        let t = 0,
          s = 0,
          a = 0,
          i = 0;
        return (
          "detail" in e && (s = e.detail),
          "wheelDelta" in e && (s = -e.wheelDelta / 120),
          "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
          "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
          "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)),
          (a = 10 * t),
          (i = 10 * s),
          "deltaY" in e && (i = e.deltaY),
          "deltaX" in e && (a = e.deltaX),
          e.shiftKey && !a && ((a = i), (i = 0)),
          (a || i) &&
            e.deltaMode &&
            (1 === e.deltaMode
              ? ((a *= 40), (i *= 40))
              : ((a *= 800), (i *= 800))),
          a && !t && (t = a < 1 ? -1 : 1),
          i && !s && (s = i < 1 ? -1 : 1),
          { spinX: t, spinY: s, pixelX: a, pixelY: i }
        );
      })(s);
    if (r.forceToAxis)
      if (t.isHorizontal()) {
        if (!(Math.abs(h.pixelX) > Math.abs(h.pixelY))) return !0;
        c = -h.pixelX * p;
      } else {
        if (!(Math.abs(h.pixelY) > Math.abs(h.pixelX))) return !0;
        c = -h.pixelY;
      }
    else
      c = Math.abs(h.pixelX) > Math.abs(h.pixelY) ? -h.pixelX * p : -h.pixelY;
    if (0 === c) return !0;
    r.invert && (c = -c);
    let m = t.getTranslate() + c * r.sensitivity;
    if (
      (m >= t.minTranslate() && (m = t.minTranslate()),
      m <= t.maxTranslate() && (m = t.maxTranslate()),
      (a =
        !!t.params.loop || !(m === t.minTranslate() || m === t.maxTranslate())),
      a && t.params.nested && s.stopPropagation(),
      t.params.freeMode && t.params.freeMode.enabled)
    ) {
      const e = { time: now(), delta: Math.abs(c), direction: Math.sign(c) },
        a =
          l &&
          e.time < l.time + 500 &&
          e.delta <= l.delta &&
          e.direction === l.direction;
      if (!a) {
        (l = void 0), t.params.loop && t.loopFix();
        let o = t.getTranslate() + c * r.sensitivity;
        const p = t.isBeginning,
          u = t.isEnd;
        if (
          (o >= t.minTranslate() && (o = t.minTranslate()),
          o <= t.maxTranslate() && (o = t.maxTranslate()),
          t.setTransition(0),
          t.setTranslate(o),
          t.updateProgress(),
          t.updateActiveIndex(),
          t.updateSlidesClasses(),
          ((!p && t.isBeginning) || (!u && t.isEnd)) && t.updateSlidesClasses(),
          t.params.freeMode.sticky)
        ) {
          clearTimeout(n), (n = void 0), d.length >= 15 && d.shift();
          const s = d.length ? d[d.length - 1] : void 0,
            a = d[0];
          if (
            (d.push(e), s && (e.delta > s.delta || e.direction !== s.direction))
          )
            d.splice(0);
          else if (
            d.length >= 15 &&
            e.time - a.time < 500 &&
            a.delta - e.delta >= 1 &&
            e.delta <= 6
          ) {
            const s = c > 0 ? 0.8 : 0.2;
            (l = e),
              d.splice(0),
              (n = nextTick(() => {
                t.slideToClosest(t.params.speed, !0, void 0, s);
              }, 0));
          }
          n ||
            (n = nextTick(() => {
              (l = e),
                d.splice(0),
                t.slideToClosest(t.params.speed, !0, void 0, 0.5);
            }, 500));
        }
        if (
          (a || i("scroll", s),
          t.params.autoplay &&
            t.params.autoplayDisableOnInteraction &&
            t.autoplay.stop(),
          o === t.minTranslate() || o === t.maxTranslate())
        )
          return !0;
      }
    } else {
      const s = {
        time: now(),
        delta: Math.abs(c),
        direction: Math.sign(c),
        raw: e,
      };
      d.length >= 2 && d.shift();
      const a = d.length ? d[d.length - 1] : void 0;
      if (
        (d.push(s),
        a
          ? (s.direction !== a.direction ||
              s.delta > a.delta ||
              s.time > a.time + 150) &&
            u(s)
          : u(s),
        (function (e) {
          const s = t.params.mousewheel;
          if (e.direction < 0) {
            if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0;
          } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
            return !0;
          return !1;
        })(s))
      )
        return !0;
    }
    return s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1;
  }
  function m(e) {
    let s = t.$el;
    "container" !== t.params.mousewheel.eventsTarget &&
      (s = $(t.params.mousewheel.eventsTarget)),
      s[e]("mouseenter", c),
      s[e]("mouseleave", p),
      s[e]("wheel", h);
  }
  function f() {
    return t.params.cssMode
      ? (t.wrapperEl.removeEventListener("wheel", h), !0)
      : !t.mousewheel.enabled && (m("on"), (t.mousewheel.enabled = !0), !0);
  }
  function g() {
    return t.params.cssMode
      ? (t.wrapperEl.addEventListener(event, h), !0)
      : !!t.mousewheel.enabled && (m("off"), (t.mousewheel.enabled = !1), !0);
  }
  a("init", () => {
    !t.params.mousewheel.enabled && t.params.cssMode && g(),
      t.params.mousewheel.enabled && f();
  }),
    a("destroy", () => {
      t.params.cssMode && f(), t.mousewheel.enabled && g();
    }),
    Object.assign(t.mousewheel, { enable: f, disable: g });
}
function createElementIfNotDefined(e, t, s, a) {
  const i = getDocument();
  return (
    e.params.createElements &&
      Object.keys(a).forEach((r) => {
        if (!s[r] && !0 === s.auto) {
          let n = e.$el.children(`.${a[r]}`)[0];
          n ||
            ((n = i.createElement("div")),
            (n.className = a[r]),
            e.$el.append(n)),
            (s[r] = n),
            (t[r] = n);
        }
      }),
    s
  );
}
function Navigation(e) {
  let { swiper: t, extendParams: s, on: a, emit: i } = e;
  function r(e) {
    let s;
    return (
      e &&
        ((s = $(e)),
        t.params.uniqueNavElements &&
          "string" == typeof e &&
          s.length > 1 &&
          1 === t.$el.find(e).length &&
          (s = t.$el.find(e))),
      s
    );
  }
  function n(e, s) {
    const a = t.params.navigation;
    e &&
      e.length > 0 &&
      (e[s ? "addClass" : "removeClass"](a.disabledClass),
      e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
      t.params.watchOverflow &&
        t.enabled &&
        e[t.isLocked ? "addClass" : "removeClass"](a.lockClass));
  }
  function l() {
    if (t.params.loop) return;
    const { $nextEl: e, $prevEl: s } = t.navigation;
    n(s, t.isBeginning && !t.params.rewind), n(e, t.isEnd && !t.params.rewind);
  }
  function o(e) {
    e.preventDefault(),
      (!t.isBeginning || t.params.loop || t.params.rewind) && t.slidePrev();
  }
  function d(e) {
    e.preventDefault(),
      (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
  }
  function c() {
    const e = t.params.navigation;
    if (
      ((t.params.navigation = createElementIfNotDefined(
        t,
        t.originalParams.navigation,
        t.params.navigation,
        { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
      )),
      !e.nextEl && !e.prevEl)
    )
      return;
    const s = r(e.nextEl),
      a = r(e.prevEl);
    s && s.length > 0 && s.on("click", d),
      a && a.length > 0 && a.on("click", o),
      Object.assign(t.navigation, {
        $nextEl: s,
        nextEl: s && s[0],
        $prevEl: a,
        prevEl: a && a[0],
      }),
      t.enabled || (s && s.addClass(e.lockClass), a && a.addClass(e.lockClass));
  }
  function p() {
    const { $nextEl: e, $prevEl: s } = t.navigation;
    e &&
      e.length &&
      (e.off("click", d), e.removeClass(t.params.navigation.disabledClass)),
      s &&
        s.length &&
        (s.off("click", o), s.removeClass(t.params.navigation.disabledClass));
  }
  s({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (t.navigation = {
      nextEl: null,
      $nextEl: null,
      prevEl: null,
      $prevEl: null,
    }),
    a("init", () => {
      !1 === t.params.navigation.enabled ? u() : (c(), l());
    }),
    a("toEdge fromEdge lock unlock", () => {
      l();
    }),
    a("destroy", () => {
      p();
    }),
    a("enable disable", () => {
      const { $nextEl: e, $prevEl: s } = t.navigation;
      e &&
        e[t.enabled ? "removeClass" : "addClass"](
          t.params.navigation.lockClass
        ),
        s &&
          s[t.enabled ? "removeClass" : "addClass"](
            t.params.navigation.lockClass
          );
    }),
    a("click", (e, s) => {
      const { $nextEl: a, $prevEl: r } = t.navigation,
        n = s.target;
      if (t.params.navigation.hideOnClick && !$(n).is(r) && !$(n).is(a)) {
        if (
          t.pagination &&
          t.params.pagination &&
          t.params.pagination.clickable &&
          (t.pagination.el === n || t.pagination.el.contains(n))
        )
          return;
        let e;
        a
          ? (e = a.hasClass(t.params.navigation.hiddenClass))
          : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
          i(!0 === e ? "navigationShow" : "navigationHide"),
          a && a.toggleClass(t.params.navigation.hiddenClass),
          r && r.toggleClass(t.params.navigation.hiddenClass);
      }
    });
  const u = () => {
    t.$el.addClass(t.params.navigation.navigationDisabledClass), p();
  };
  Object.assign(t.navigation, {
    enable: () => {
      t.$el.removeClass(t.params.navigation.navigationDisabledClass), c(), l();
    },
    disable: u,
    update: l,
    init: c,
    destroy: p,
  });
}
function classesToSelector(e) {
  return (
    void 0 === e && (e = ""),
    `.${e
      .trim()
      .replace(/([\.:!\/])/g, "\\$1")
      .replace(/ /g, ".")}`
  );
}
function Pagination(e) {
  let { swiper: t, extendParams: s, on: a, emit: i } = e;
  const r = "swiper-pagination";
  let n;
  s({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (e) => e,
      formatFractionTotal: (e) => e,
      bulletClass: `${r}-bullet`,
      bulletActiveClass: `${r}-bullet-active`,
      modifierClass: `${r}-`,
      currentClass: `${r}-current`,
      totalClass: `${r}-total`,
      hiddenClass: `${r}-hidden`,
      progressbarFillClass: `${r}-progressbar-fill`,
      progressbarOppositeClass: `${r}-progressbar-opposite`,
      clickableClass: `${r}-clickable`,
      lockClass: `${r}-lock`,
      horizontalClass: `${r}-horizontal`,
      verticalClass: `${r}-vertical`,
      paginationDisabledClass: `${r}-disabled`,
    },
  }),
    (t.pagination = { el: null, $el: null, bullets: [] });
  let l = 0;
  function o() {
    return (
      !t.params.pagination.el ||
      !t.pagination.el ||
      !t.pagination.$el ||
      0 === t.pagination.$el.length
    );
  }
  function d(e, s) {
    const { bulletActiveClass: a } = t.params.pagination;
    e[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`);
  }
  function c() {
    const e = t.rtl,
      s = t.params.pagination;
    if (o()) return;
    const a =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.slides.length,
      r = t.pagination.$el;
    let c;
    const p = t.params.loop
      ? Math.ceil((a - 2 * t.loopedSlides) / t.params.slidesPerGroup)
      : t.snapGrid.length;
    if (
      (t.params.loop
        ? ((c = Math.ceil(
            (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
          )),
          c > a - 1 - 2 * t.loopedSlides && (c -= a - 2 * t.loopedSlides),
          c > p - 1 && (c -= p),
          c < 0 && "bullets" !== t.params.paginationType && (c = p + c))
        : (c = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
      "bullets" === s.type &&
        t.pagination.bullets &&
        t.pagination.bullets.length > 0)
    ) {
      const a = t.pagination.bullets;
      let i, o, p;
      if (
        (s.dynamicBullets &&
          ((n = a.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
          r.css(
            t.isHorizontal() ? "width" : "height",
            n * (s.dynamicMainBullets + 4) + "px"
          ),
          s.dynamicMainBullets > 1 &&
            void 0 !== t.previousIndex &&
            ((l += c - (t.previousIndex - t.loopedSlides || 0)),
            l > s.dynamicMainBullets - 1
              ? (l = s.dynamicMainBullets - 1)
              : l < 0 && (l = 0)),
          (i = Math.max(c - l, 0)),
          (o = i + (Math.min(a.length, s.dynamicMainBullets) - 1)),
          (p = (o + i) / 2)),
        a.removeClass(
          ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
            .map((e) => `${s.bulletActiveClass}${e}`)
            .join(" ")
        ),
        r.length > 1)
      )
        a.each((e) => {
          const t = $(e),
            a = t.index();
          a === c && t.addClass(s.bulletActiveClass),
            s.dynamicBullets &&
              (a >= i && a <= o && t.addClass(`${s.bulletActiveClass}-main`),
              a === i && d(t, "prev"),
              a === o && d(t, "next"));
        });
      else {
        const e = a.eq(c),
          r = e.index();
        if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
          const e = a.eq(i),
            n = a.eq(o);
          for (let e = i; e <= o; e += 1)
            a.eq(e).addClass(`${s.bulletActiveClass}-main`);
          if (t.params.loop)
            if (r >= a.length) {
              for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                a.eq(a.length - e).addClass(`${s.bulletActiveClass}-main`);
              a.eq(a.length - s.dynamicMainBullets - 1).addClass(
                `${s.bulletActiveClass}-prev`
              );
            } else d(e, "prev"), d(n, "next");
          else d(e, "prev"), d(n, "next");
        }
      }
      if (s.dynamicBullets) {
        const i = Math.min(a.length, s.dynamicMainBullets + 4),
          r = (n * i - n) / 2 - p * n,
          l = e ? "right" : "left";
        a.css(t.isHorizontal() ? l : "top", `${r}px`);
      }
    }
    if (
      ("fraction" === s.type &&
        (r
          .find(classesToSelector(s.currentClass))
          .text(s.formatFractionCurrent(c + 1)),
        r.find(classesToSelector(s.totalClass)).text(s.formatFractionTotal(p))),
      "progressbar" === s.type)
    ) {
      let e;
      e = s.progressbarOpposite
        ? t.isHorizontal()
          ? "vertical"
          : "horizontal"
        : t.isHorizontal()
        ? "horizontal"
        : "vertical";
      const a = (c + 1) / p;
      let i = 1,
        n = 1;
      "horizontal" === e ? (i = a) : (n = a),
        r
          .find(classesToSelector(s.progressbarFillClass))
          .transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${n})`)
          .transition(t.params.speed);
    }
    "custom" === s.type && s.renderCustom
      ? (r.html(s.renderCustom(t, c + 1, p)), i("paginationRender", r[0]))
      : i("paginationUpdate", r[0]),
      t.params.watchOverflow &&
        t.enabled &&
        r[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
  }
  function p() {
    const e = t.params.pagination;
    if (o()) return;
    const s =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.slides.length,
      a = t.pagination.$el;
    let r = "";
    if ("bullets" === e.type) {
      let i = t.params.loop
        ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
        : t.snapGrid.length;
      t.params.freeMode &&
        t.params.freeMode.enabled &&
        !t.params.loop &&
        i > s &&
        (i = s);
      for (let s = 0; s < i; s += 1)
        e.renderBullet
          ? (r += e.renderBullet.call(t, s, e.bulletClass))
          : (r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
      a.html(r),
        (t.pagination.bullets = a.find(classesToSelector(e.bulletClass)));
    }
    "fraction" === e.type &&
      ((r = e.renderFraction
        ? e.renderFraction.call(t, e.currentClass, e.totalClass)
        : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
      a.html(r)),
      "progressbar" === e.type &&
        ((r = e.renderProgressbar
          ? e.renderProgressbar.call(t, e.progressbarFillClass)
          : `<span class="${e.progressbarFillClass}"></span>`),
        a.html(r)),
      "custom" !== e.type && i("paginationRender", t.pagination.$el[0]);
  }
  function u() {
    t.params.pagination = createElementIfNotDefined(
      t,
      t.originalParams.pagination,
      t.params.pagination,
      { el: "swiper-pagination" }
    );
    const e = t.params.pagination;
    if (!e.el) return;
    let s = $(e.el);
    0 !== s.length &&
      (t.params.uniqueNavElements &&
        "string" == typeof e.el &&
        s.length > 1 &&
        ((s = t.$el.find(e.el)),
        s.length > 1 &&
          (s = s.filter((e) => $(e).parents(".swiper")[0] === t.el))),
      "bullets" === e.type && e.clickable && s.addClass(e.clickableClass),
      s.addClass(e.modifierClass + e.type),
      s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
      "bullets" === e.type &&
        e.dynamicBullets &&
        (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
        (l = 0),
        e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
      "progressbar" === e.type &&
        e.progressbarOpposite &&
        s.addClass(e.progressbarOppositeClass),
      e.clickable &&
        s.on("click", classesToSelector(e.bulletClass), function (e) {
          e.preventDefault();
          let s = $(this).index() * t.params.slidesPerGroup;
          t.params.loop && (s += t.loopedSlides), t.slideTo(s);
        }),
      Object.assign(t.pagination, { $el: s, el: s[0] }),
      t.enabled || s.addClass(e.lockClass));
  }
  function h() {
    const e = t.params.pagination;
    if (o()) return;
    const s = t.pagination.$el;
    s.removeClass(e.hiddenClass),
      s.removeClass(e.modifierClass + e.type),
      s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
      t.pagination.bullets &&
        t.pagination.bullets.removeClass &&
        t.pagination.bullets.removeClass(e.bulletActiveClass),
      e.clickable && s.off("click", classesToSelector(e.bulletClass));
  }
  a("init", () => {
    !1 === t.params.pagination.enabled ? m() : (u(), p(), c());
  }),
    a("activeIndexChange", () => {
      (t.params.loop || void 0 === t.snapIndex) && c();
    }),
    a("snapIndexChange", () => {
      t.params.loop || c();
    }),
    a("slidesLengthChange", () => {
      t.params.loop && (p(), c());
    }),
    a("snapGridLengthChange", () => {
      t.params.loop || (p(), c());
    }),
    a("destroy", () => {
      h();
    }),
    a("enable disable", () => {
      const { $el: e } = t.pagination;
      e &&
        e[t.enabled ? "removeClass" : "addClass"](
          t.params.pagination.lockClass
        );
    }),
    a("lock unlock", () => {
      c();
    }),
    a("click", (e, s) => {
      const a = s.target,
        { $el: r } = t.pagination;
      if (
        t.params.pagination.el &&
        t.params.pagination.hideOnClick &&
        r &&
        r.length > 0 &&
        !$(a).hasClass(t.params.pagination.bulletClass)
      ) {
        if (
          t.navigation &&
          ((t.navigation.nextEl && a === t.navigation.nextEl) ||
            (t.navigation.prevEl && a === t.navigation.prevEl))
        )
          return;
        const e = r.hasClass(t.params.pagination.hiddenClass);
        i(!0 === e ? "paginationShow" : "paginationHide"),
          r.toggleClass(t.params.pagination.hiddenClass);
      }
    });
  const m = () => {
    t.$el.addClass(t.params.pagination.paginationDisabledClass),
      t.pagination.$el &&
        t.pagination.$el.addClass(t.params.pagination.paginationDisabledClass),
      h();
  };
  Object.assign(t.pagination, {
    enable: () => {
      t.$el.removeClass(t.params.pagination.paginationDisabledClass),
        t.pagination.$el &&
          t.pagination.$el.removeClass(
            t.params.pagination.paginationDisabledClass
          ),
        u(),
        p(),
        c();
    },
    disable: m,
    render: p,
    update: c,
    init: u,
    destroy: h,
  });
}
function Scrollbar(e) {
  let { swiper: t, extendParams: s, on: a, emit: i } = e;
  const r = getDocument();
  let n,
    l,
    o,
    d,
    c = !1,
    p = null,
    u = null;
  function h() {
    if (!t.params.scrollbar.el || !t.scrollbar.el) return;
    const { scrollbar: e, rtlTranslate: s, progress: a } = t,
      { $dragEl: i, $el: r } = e,
      n = t.params.scrollbar;
    let d = l,
      c = (o - l) * a;
    s
      ? ((c = -c), c > 0 ? ((d = l - c), (c = 0)) : -c + l > o && (d = o + c))
      : c < 0
      ? ((d = l + c), (c = 0))
      : c + l > o && (d = o - c),
      t.isHorizontal()
        ? (i.transform(`translate3d(${c}px, 0, 0)`),
          (i[0].style.width = `${d}px`))
        : (i.transform(`translate3d(0px, ${c}px, 0)`),
          (i[0].style.height = `${d}px`)),
      n.hide &&
        (clearTimeout(p),
        (r[0].style.opacity = 1),
        (p = setTimeout(() => {
          (r[0].style.opacity = 0), r.transition(400);
        }, 1e3)));
  }
  function m() {
    if (!t.params.scrollbar.el || !t.scrollbar.el) return;
    const { scrollbar: e } = t,
      { $dragEl: s, $el: a } = e;
    (s[0].style.width = ""),
      (s[0].style.height = ""),
      (o = t.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight),
      (d =
        t.size /
        (t.virtualSize +
          t.params.slidesOffsetBefore -
          (t.params.centeredSlides ? t.snapGrid[0] : 0))),
      (l =
        "auto" === t.params.scrollbar.dragSize
          ? o * d
          : parseInt(t.params.scrollbar.dragSize, 10)),
      t.isHorizontal()
        ? (s[0].style.width = `${l}px`)
        : (s[0].style.height = `${l}px`),
      (a[0].style.display = d >= 1 ? "none" : ""),
      t.params.scrollbar.hide && (a[0].style.opacity = 0),
      t.params.watchOverflow &&
        t.enabled &&
        e.$el[t.isLocked ? "addClass" : "removeClass"](
          t.params.scrollbar.lockClass
        );
  }
  function f(e) {
    return t.isHorizontal()
      ? "touchstart" === e.type || "touchmove" === e.type
        ? e.targetTouches[0].clientX
        : e.clientX
      : "touchstart" === e.type || "touchmove" === e.type
      ? e.targetTouches[0].clientY
      : e.clientY;
  }
  function g(e) {
    const { scrollbar: s, rtlTranslate: a } = t,
      { $el: i } = s;
    let r;
    (r =
      (f(e) -
        i.offset()[t.isHorizontal() ? "left" : "top"] -
        (null !== n ? n : l / 2)) /
      (o - l)),
      (r = Math.max(Math.min(r, 1), 0)),
      a && (r = 1 - r);
    const d = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
    t.updateProgress(d),
      t.setTranslate(d),
      t.updateActiveIndex(),
      t.updateSlidesClasses();
  }
  function v(e) {
    const s = t.params.scrollbar,
      { scrollbar: a, $wrapperEl: r } = t,
      { $el: l, $dragEl: o } = a;
    (c = !0),
      (n =
        e.target === o[0] || e.target === o
          ? f(e) -
            e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"]
          : null),
      e.preventDefault(),
      e.stopPropagation(),
      r.transition(100),
      o.transition(100),
      g(e),
      clearTimeout(u),
      l.transition(0),
      s.hide && l.css("opacity", 1),
      t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
      i("scrollbarDragStart", e);
  }
  function w(e) {
    const { scrollbar: s, $wrapperEl: a } = t,
      { $el: r, $dragEl: n } = s;
    c &&
      (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
      g(e),
      a.transition(0),
      r.transition(0),
      n.transition(0),
      i("scrollbarDragMove", e));
  }
  function b(e) {
    const s = t.params.scrollbar,
      { scrollbar: a, $wrapperEl: r } = t,
      { $el: n } = a;
    c &&
      ((c = !1),
      t.params.cssMode &&
        (t.$wrapperEl.css("scroll-snap-type", ""), r.transition("")),
      s.hide &&
        (clearTimeout(u),
        (u = nextTick(() => {
          n.css("opacity", 0), n.transition(400);
        }, 1e3))),
      i("scrollbarDragEnd", e),
      s.snapOnRelease && t.slideToClosest());
  }
  function x(e) {
    const {
        scrollbar: s,
        touchEventsTouch: a,
        touchEventsDesktop: i,
        params: n,
        support: l,
      } = t,
      o = s.$el;
    if (!o) return;
    const d = o[0],
      c = !(!l.passiveListener || !n.passiveListeners) && {
        passive: !1,
        capture: !1,
      },
      p = !(!l.passiveListener || !n.passiveListeners) && {
        passive: !0,
        capture: !1,
      };
    if (!d) return;
    const u = "on" === e ? "addEventListener" : "removeEventListener";
    l.touch
      ? (d[u](a.start, v, c), d[u](a.move, w, c), d[u](a.end, b, p))
      : (d[u](i.start, v, c), r[u](i.move, w, c), r[u](i.end, b, p));
  }
  function y() {
    const { scrollbar: e, $el: s } = t;
    t.params.scrollbar = createElementIfNotDefined(
      t,
      t.originalParams.scrollbar,
      t.params.scrollbar,
      { el: "swiper-scrollbar" }
    );
    const a = t.params.scrollbar;
    if (!a.el) return;
    let i = $(a.el);
    t.params.uniqueNavElements &&
      "string" == typeof a.el &&
      i.length > 1 &&
      1 === s.find(a.el).length &&
      (i = s.find(a.el)),
      i.addClass(t.isHorizontal() ? a.horizontalClass : a.verticalClass);
    let r = i.find(`.${t.params.scrollbar.dragClass}`);
    0 === r.length &&
      ((r = $(`<div class="${t.params.scrollbar.dragClass}"></div>`)),
      i.append(r)),
      Object.assign(e, { $el: i, el: i[0], $dragEl: r, dragEl: r[0] }),
      a.draggable && t.params.scrollbar.el && t.scrollbar.el && x("on"),
      i &&
        i[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass);
  }
  function E() {
    const e = t.params.scrollbar,
      s = t.scrollbar.$el;
    s && s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
      t.params.scrollbar.el && t.scrollbar.el && x("off");
  }
  s({
    scrollbar: {
      el: null,
      dragSize: "auto",
      hide: !1,
      draggable: !1,
      snapOnRelease: !0,
      lockClass: "swiper-scrollbar-lock",
      dragClass: "swiper-scrollbar-drag",
      scrollbarDisabledClass: "swiper-scrollbar-disabled",
      horizontalClass: "swiper-scrollbar-horizontal",
      verticalClass: "swiper-scrollbar-vertical",
    },
  }),
    (t.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
    a("init", () => {
      !1 === t.params.scrollbar.enabled ? C() : (y(), m(), h());
    }),
    a("update resize observerUpdate lock unlock", () => {
      m();
    }),
    a("setTranslate", () => {
      h();
    }),
    a("setTransition", (e, s) => {
      !(function (e) {
        t.params.scrollbar.el &&
          t.scrollbar.el &&
          t.scrollbar.$dragEl.transition(e);
      })(s);
    }),
    a("enable disable", () => {
      const { $el: e } = t.scrollbar;
      e &&
        e[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass);
    }),
    a("destroy", () => {
      E();
    });
  const C = () => {
    t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),
      t.scrollbar.$el &&
        t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),
      E();
  };
  Object.assign(t.scrollbar, {
    enable: () => {
      t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),
        t.scrollbar.$el &&
          t.scrollbar.$el.removeClass(
            t.params.scrollbar.scrollbarDisabledClass
          ),
        y(),
        m(),
        h();
    },
    disable: C,
    updateSize: m,
    setTranslate: h,
    init: y,
    destroy: E,
  });
}
function Parallax(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({ parallax: { enabled: !1 } });
  const i = (e, s) => {
      const { rtl: a } = t,
        i = $(e),
        r = a ? -1 : 1,
        n = i.attr("data-swiper-parallax") || "0";
      let l = i.attr("data-swiper-parallax-x"),
        o = i.attr("data-swiper-parallax-y");
      const d = i.attr("data-swiper-parallax-scale"),
        c = i.attr("data-swiper-parallax-opacity");
      if (
        (l || o
          ? ((l = l || "0"), (o = o || "0"))
          : t.isHorizontal()
          ? ((l = n), (o = "0"))
          : ((o = n), (l = "0")),
        (l =
          l.indexOf("%") >= 0
            ? parseInt(l, 10) * s * r + "%"
            : l * s * r + "px"),
        (o = o.indexOf("%") >= 0 ? parseInt(o, 10) * s + "%" : o * s + "px"),
        null != c)
      ) {
        const e = c - (c - 1) * (1 - Math.abs(s));
        i[0].style.opacity = e;
      }
      if (null == d) i.transform(`translate3d(${l}, ${o}, 0px)`);
      else {
        const e = d - (d - 1) * (1 - Math.abs(s));
        i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`);
      }
    },
    r = () => {
      const { $el: e, slides: s, progress: a, snapGrid: r } = t;
      e
        .children(
          "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
        )
        .each((e) => {
          i(e, a);
        }),
        s.each((e, s) => {
          let n = e.progress;
          t.params.slidesPerGroup > 1 &&
            "auto" !== t.params.slidesPerView &&
            (n += Math.ceil(s / 2) - a * (r.length - 1)),
            (n = Math.min(Math.max(n, -1), 1)),
            $(e)
              .find(
                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
              )
              .each((e) => {
                i(e, n);
              });
        });
    };
  a("beforeInit", () => {
    t.params.parallax.enabled &&
      ((t.params.watchSlidesProgress = !0),
      (t.originalParams.watchSlidesProgress = !0));
  }),
    a("init", () => {
      t.params.parallax.enabled && r();
    }),
    a("setTranslate", () => {
      t.params.parallax.enabled && r();
    }),
    a("setTransition", (e, s) => {
      t.params.parallax.enabled &&
        (function (e) {
          void 0 === e && (e = t.params.speed);
          const { $el: s } = t;
          s.find(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          ).each((t) => {
            const s = $(t);
            let a = parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
            0 === e && (a = 0), s.transition(a);
          });
        })(s);
    });
}
function Zoom(e) {
  let { swiper: t, extendParams: s, on: a, emit: i } = e;
  const r = getWindow();
  s({
    zoom: {
      enabled: !1,
      maxRatio: 3,
      minRatio: 1,
      toggle: !0,
      containerClass: "swiper-zoom-container",
      zoomedSlideClass: "swiper-slide-zoomed",
    },
  }),
    (t.zoom = { enabled: !1 });
  let n,
    l,
    o,
    d = 1,
    c = !1;
  const p = {
      $slideEl: void 0,
      slideWidth: void 0,
      slideHeight: void 0,
      $imageEl: void 0,
      $imageWrapEl: void 0,
      maxRatio: 3,
    },
    u = {
      isTouched: void 0,
      isMoved: void 0,
      currentX: void 0,
      currentY: void 0,
      minX: void 0,
      minY: void 0,
      maxX: void 0,
      maxY: void 0,
      width: void 0,
      height: void 0,
      startX: void 0,
      startY: void 0,
      touchesStart: {},
      touchesCurrent: {},
    },
    h = {
      x: void 0,
      y: void 0,
      prevPositionX: void 0,
      prevPositionY: void 0,
      prevTime: void 0,
    };
  let m = 1;
  function f(e) {
    if (e.targetTouches.length < 2) return 1;
    const t = e.targetTouches[0].pageX,
      s = e.targetTouches[0].pageY,
      a = e.targetTouches[1].pageX,
      i = e.targetTouches[1].pageY;
    return Math.sqrt((a - t) ** 2 + (i - s) ** 2);
  }
  function g(e) {
    const s = t.support,
      a = t.params.zoom;
    if (((l = !1), (o = !1), !s.gestures)) {
      if (
        "touchstart" !== e.type ||
        ("touchstart" === e.type && e.targetTouches.length < 2)
      )
        return;
      (l = !0), (p.scaleStart = f(e));
    }
    (p.$slideEl && p.$slideEl.length) ||
    ((p.$slideEl = $(e.target).closest(`.${t.params.slideClass}`)),
    0 === p.$slideEl.length && (p.$slideEl = t.slides.eq(t.activeIndex)),
    (p.$imageEl = p.$slideEl
      .find(`.${a.containerClass}`)
      .eq(0)
      .find("picture, img, svg, canvas, .swiper-zoom-target")
      .eq(0)),
    (p.$imageWrapEl = p.$imageEl.parent(`.${a.containerClass}`)),
    (p.maxRatio = p.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
    0 !== p.$imageWrapEl.length)
      ? (p.$imageEl && p.$imageEl.transition(0), (c = !0))
      : (p.$imageEl = void 0);
  }
  function v(e) {
    const s = t.support,
      a = t.params.zoom,
      i = t.zoom;
    if (!s.gestures) {
      if (
        "touchmove" !== e.type ||
        ("touchmove" === e.type && e.targetTouches.length < 2)
      )
        return;
      (o = !0), (p.scaleMove = f(e));
    }
    p.$imageEl && 0 !== p.$imageEl.length
      ? (s.gestures
          ? (i.scale = e.scale * d)
          : (i.scale = (p.scaleMove / p.scaleStart) * d),
        i.scale > p.maxRatio &&
          (i.scale = p.maxRatio - 1 + (i.scale - p.maxRatio + 1) ** 0.5),
        i.scale < a.minRatio &&
          (i.scale = a.minRatio + 1 - (a.minRatio - i.scale + 1) ** 0.5),
        p.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`))
      : "gesturechange" === e.type && g(e);
  }
  function w(e) {
    const s = t.device,
      a = t.support,
      i = t.params.zoom,
      r = t.zoom;
    if (!a.gestures) {
      if (!l || !o) return;
      if (
        "touchend" !== e.type ||
        ("touchend" === e.type && e.changedTouches.length < 2 && !s.android)
      )
        return;
      (l = !1), (o = !1);
    }
    p.$imageEl &&
      0 !== p.$imageEl.length &&
      ((r.scale = Math.max(Math.min(r.scale, p.maxRatio), i.minRatio)),
      p.$imageEl
        .transition(t.params.speed)
        .transform(`translate3d(0,0,0) scale(${r.scale})`),
      (d = r.scale),
      (c = !1),
      1 === r.scale && (p.$slideEl = void 0));
  }
  function b(e) {
    const s = t.zoom;
    if (!p.$imageEl || 0 === p.$imageEl.length) return;
    if (((t.allowClick = !1), !u.isTouched || !p.$slideEl)) return;
    u.isMoved ||
      ((u.width = p.$imageEl[0].offsetWidth),
      (u.height = p.$imageEl[0].offsetHeight),
      (u.startX = getTranslate(p.$imageWrapEl[0], "x") || 0),
      (u.startY = getTranslate(p.$imageWrapEl[0], "y") || 0),
      (p.slideWidth = p.$slideEl[0].offsetWidth),
      (p.slideHeight = p.$slideEl[0].offsetHeight),
      p.$imageWrapEl.transition(0));
    const a = u.width * s.scale,
      i = u.height * s.scale;
    if (!(a < p.slideWidth && i < p.slideHeight)) {
      if (
        ((u.minX = Math.min(p.slideWidth / 2 - a / 2, 0)),
        (u.maxX = -u.minX),
        (u.minY = Math.min(p.slideHeight / 2 - i / 2, 0)),
        (u.maxY = -u.minY),
        (u.touchesCurrent.x =
          "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
        (u.touchesCurrent.y =
          "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
        !u.isMoved && !c)
      ) {
        if (
          t.isHorizontal() &&
          ((Math.floor(u.minX) === Math.floor(u.startX) &&
            u.touchesCurrent.x < u.touchesStart.x) ||
            (Math.floor(u.maxX) === Math.floor(u.startX) &&
              u.touchesCurrent.x > u.touchesStart.x))
        )
          return void (u.isTouched = !1);
        if (
          !t.isHorizontal() &&
          ((Math.floor(u.minY) === Math.floor(u.startY) &&
            u.touchesCurrent.y < u.touchesStart.y) ||
            (Math.floor(u.maxY) === Math.floor(u.startY) &&
              u.touchesCurrent.y > u.touchesStart.y))
        )
          return void (u.isTouched = !1);
      }
      e.cancelable && e.preventDefault(),
        e.stopPropagation(),
        (u.isMoved = !0),
        (u.currentX = u.touchesCurrent.x - u.touchesStart.x + u.startX),
        (u.currentY = u.touchesCurrent.y - u.touchesStart.y + u.startY),
        u.currentX < u.minX &&
          (u.currentX = u.minX + 1 - (u.minX - u.currentX + 1) ** 0.8),
        u.currentX > u.maxX &&
          (u.currentX = u.maxX - 1 + (u.currentX - u.maxX + 1) ** 0.8),
        u.currentY < u.minY &&
          (u.currentY = u.minY + 1 - (u.minY - u.currentY + 1) ** 0.8),
        u.currentY > u.maxY &&
          (u.currentY = u.maxY - 1 + (u.currentY - u.maxY + 1) ** 0.8),
        h.prevPositionX || (h.prevPositionX = u.touchesCurrent.x),
        h.prevPositionY || (h.prevPositionY = u.touchesCurrent.y),
        h.prevTime || (h.prevTime = Date.now()),
        (h.x =
          (u.touchesCurrent.x - h.prevPositionX) /
          (Date.now() - h.prevTime) /
          2),
        (h.y =
          (u.touchesCurrent.y - h.prevPositionY) /
          (Date.now() - h.prevTime) /
          2),
        Math.abs(u.touchesCurrent.x - h.prevPositionX) < 2 && (h.x = 0),
        Math.abs(u.touchesCurrent.y - h.prevPositionY) < 2 && (h.y = 0),
        (h.prevPositionX = u.touchesCurrent.x),
        (h.prevPositionY = u.touchesCurrent.y),
        (h.prevTime = Date.now()),
        p.$imageWrapEl.transform(
          `translate3d(${u.currentX}px, ${u.currentY}px,0)`
        );
    }
  }
  function x() {
    const e = t.zoom;
    p.$slideEl &&
      t.previousIndex !== t.activeIndex &&
      (p.$imageEl && p.$imageEl.transform("translate3d(0,0,0) scale(1)"),
      p.$imageWrapEl && p.$imageWrapEl.transform("translate3d(0,0,0)"),
      (e.scale = 1),
      (d = 1),
      (p.$slideEl = void 0),
      (p.$imageEl = void 0),
      (p.$imageWrapEl = void 0));
  }
  function y(e) {
    const s = t.zoom,
      a = t.params.zoom;
    if (
      (p.$slideEl ||
        (e &&
          e.target &&
          (p.$slideEl = $(e.target).closest(`.${t.params.slideClass}`)),
        p.$slideEl ||
          (t.params.virtual && t.params.virtual.enabled && t.virtual
            ? (p.$slideEl = t.$wrapperEl.children(
                `.${t.params.slideActiveClass}`
              ))
            : (p.$slideEl = t.slides.eq(t.activeIndex))),
        (p.$imageEl = p.$slideEl
          .find(`.${a.containerClass}`)
          .eq(0)
          .find("picture, img, svg, canvas, .swiper-zoom-target")
          .eq(0)),
        (p.$imageWrapEl = p.$imageEl.parent(`.${a.containerClass}`))),
      !p.$imageEl ||
        0 === p.$imageEl.length ||
        !p.$imageWrapEl ||
        0 === p.$imageWrapEl.length)
    )
      return;
    let i, n, l, o, c, h, m, f, g, v, w, b, x, y, E, C, T, S;
    t.params.cssMode &&
      ((t.wrapperEl.style.overflow = "hidden"),
      (t.wrapperEl.style.touchAction = "none")),
      p.$slideEl.addClass(`${a.zoomedSlideClass}`),
      void 0 === u.touchesStart.x && e
        ? ((i = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX),
          (n = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
        : ((i = u.touchesStart.x), (n = u.touchesStart.y)),
      (s.scale = p.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
      (d = p.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
      e
        ? ((T = p.$slideEl[0].offsetWidth),
          (S = p.$slideEl[0].offsetHeight),
          (l = p.$slideEl.offset().left + r.scrollX),
          (o = p.$slideEl.offset().top + r.scrollY),
          (c = l + T / 2 - i),
          (h = o + S / 2 - n),
          (g = p.$imageEl[0].offsetWidth),
          (v = p.$imageEl[0].offsetHeight),
          (w = g * s.scale),
          (b = v * s.scale),
          (x = Math.min(T / 2 - w / 2, 0)),
          (y = Math.min(S / 2 - b / 2, 0)),
          (E = -x),
          (C = -y),
          (m = c * s.scale),
          (f = h * s.scale),
          m < x && (m = x),
          m > E && (m = E),
          f < y && (f = y),
          f > C && (f = C))
        : ((m = 0), (f = 0)),
      p.$imageWrapEl.transition(300).transform(`translate3d(${m}px, ${f}px,0)`),
      p.$imageEl
        .transition(300)
        .transform(`translate3d(0,0,0) scale(${s.scale})`);
  }
  function E() {
    const e = t.zoom,
      s = t.params.zoom;
    p.$slideEl ||
      (t.params.virtual && t.params.virtual.enabled && t.virtual
        ? (p.$slideEl = t.$wrapperEl.children(`.${t.params.slideActiveClass}`))
        : (p.$slideEl = t.slides.eq(t.activeIndex)),
      (p.$imageEl = p.$slideEl
        .find(`.${s.containerClass}`)
        .eq(0)
        .find("picture, img, svg, canvas, .swiper-zoom-target")
        .eq(0)),
      (p.$imageWrapEl = p.$imageEl.parent(`.${s.containerClass}`))),
      p.$imageEl &&
        0 !== p.$imageEl.length &&
        p.$imageWrapEl &&
        0 !== p.$imageWrapEl.length &&
        (t.params.cssMode &&
          ((t.wrapperEl.style.overflow = ""),
          (t.wrapperEl.style.touchAction = "")),
        (e.scale = 1),
        (d = 1),
        p.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
        p.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
        p.$slideEl.removeClass(`${s.zoomedSlideClass}`),
        (p.$slideEl = void 0));
  }
  function C(e) {
    const s = t.zoom;
    s.scale && 1 !== s.scale ? E() : y(e);
  }
  function T() {
    const e = t.support;
    return {
      passiveListener: !(
        "touchstart" !== t.touchEvents.start ||
        !e.passiveListener ||
        !t.params.passiveListeners
      ) && { passive: !0, capture: !1 },
      activeListenerWithCapture: !e.passiveListener || {
        passive: !1,
        capture: !0,
      },
    };
  }
  function S() {
    return `.${t.params.slideClass}`;
  }
  function M(e) {
    const { passiveListener: s } = T(),
      a = S();
    t.$wrapperEl[e]("gesturestart", a, g, s),
      t.$wrapperEl[e]("gesturechange", a, v, s),
      t.$wrapperEl[e]("gestureend", a, w, s);
  }
  function P() {
    n || ((n = !0), M("on"));
  }
  function k() {
    n && ((n = !1), M("off"));
  }
  function z() {
    const e = t.zoom;
    if (e.enabled) return;
    e.enabled = !0;
    const s = t.support,
      { passiveListener: a, activeListenerWithCapture: i } = T(),
      r = S();
    s.gestures
      ? (t.$wrapperEl.on(t.touchEvents.start, P, a),
        t.$wrapperEl.on(t.touchEvents.end, k, a))
      : "touchstart" === t.touchEvents.start &&
        (t.$wrapperEl.on(t.touchEvents.start, r, g, a),
        t.$wrapperEl.on(t.touchEvents.move, r, v, i),
        t.$wrapperEl.on(t.touchEvents.end, r, w, a),
        t.touchEvents.cancel && t.$wrapperEl.on(t.touchEvents.cancel, r, w, a)),
      t.$wrapperEl.on(
        t.touchEvents.move,
        `.${t.params.zoom.containerClass}`,
        b,
        i
      );
  }
  function O() {
    const e = t.zoom;
    if (!e.enabled) return;
    const s = t.support;
    e.enabled = !1;
    const { passiveListener: a, activeListenerWithCapture: i } = T(),
      r = S();
    s.gestures
      ? (t.$wrapperEl.off(t.touchEvents.start, P, a),
        t.$wrapperEl.off(t.touchEvents.end, k, a))
      : "touchstart" === t.touchEvents.start &&
        (t.$wrapperEl.off(t.touchEvents.start, r, g, a),
        t.$wrapperEl.off(t.touchEvents.move, r, v, i),
        t.$wrapperEl.off(t.touchEvents.end, r, w, a),
        t.touchEvents.cancel &&
          t.$wrapperEl.off(t.touchEvents.cancel, r, w, a)),
      t.$wrapperEl.off(
        t.touchEvents.move,
        `.${t.params.zoom.containerClass}`,
        b,
        i
      );
  }
  Object.defineProperty(t.zoom, "scale", {
    get: () => m,
    set(e) {
      if (m !== e) {
        const t = p.$imageEl ? p.$imageEl[0] : void 0,
          s = p.$slideEl ? p.$slideEl[0] : void 0;
        i("zoomChange", e, t, s);
      }
      m = e;
    },
  }),
    a("init", () => {
      t.params.zoom.enabled && z();
    }),
    a("destroy", () => {
      O();
    }),
    a("touchStart", (e, s) => {
      t.zoom.enabled &&
        (function (e) {
          const s = t.device;
          p.$imageEl &&
            0 !== p.$imageEl.length &&
            (u.isTouched ||
              (s.android && e.cancelable && e.preventDefault(),
              (u.isTouched = !0),
              (u.touchesStart.x =
                "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
              (u.touchesStart.y =
                "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
        })(s);
    }),
    a("touchEnd", (e, s) => {
      t.zoom.enabled &&
        (function () {
          const e = t.zoom;
          if (!p.$imageEl || 0 === p.$imageEl.length) return;
          if (!u.isTouched || !u.isMoved)
            return (u.isTouched = !1), void (u.isMoved = !1);
          (u.isTouched = !1), (u.isMoved = !1);
          let s = 300,
            a = 300;
          const i = h.x * s,
            r = u.currentX + i,
            n = h.y * a,
            l = u.currentY + n;
          0 !== h.x && (s = Math.abs((r - u.currentX) / h.x)),
            0 !== h.y && (a = Math.abs((l - u.currentY) / h.y));
          const o = Math.max(s, a);
          (u.currentX = r), (u.currentY = l);
          const d = u.width * e.scale,
            c = u.height * e.scale;
          (u.minX = Math.min(p.slideWidth / 2 - d / 2, 0)),
            (u.maxX = -u.minX),
            (u.minY = Math.min(p.slideHeight / 2 - c / 2, 0)),
            (u.maxY = -u.minY),
            (u.currentX = Math.max(Math.min(u.currentX, u.maxX), u.minX)),
            (u.currentY = Math.max(Math.min(u.currentY, u.maxY), u.minY)),
            p.$imageWrapEl
              .transition(o)
              .transform(`translate3d(${u.currentX}px, ${u.currentY}px,0)`);
        })();
    }),
    a("doubleTap", (e, s) => {
      !t.animating &&
        t.params.zoom.enabled &&
        t.zoom.enabled &&
        t.params.zoom.toggle &&
        C(s);
    }),
    a("transitionEnd", () => {
      t.zoom.enabled && t.params.zoom.enabled && x();
    }),
    a("slideChange", () => {
      t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && x();
    }),
    Object.assign(t.zoom, { enable: z, disable: O, in: y, out: E, toggle: C });
}
function Lazy(e) {
  let { swiper: t, extendParams: s, on: a, emit: i } = e;
  s({
    lazy: {
      checkInView: !1,
      enabled: !1,
      loadPrevNext: !1,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: !1,
      scrollingElement: "",
      elementClass: "swiper-lazy",
      loadingClass: "swiper-lazy-loading",
      loadedClass: "swiper-lazy-loaded",
      preloaderClass: "swiper-lazy-preloader",
    },
  }),
    (t.lazy = {});
  let r = !1,
    n = !1;
  function l(e, s) {
    void 0 === s && (s = !0);
    const a = t.params.lazy;
    if (void 0 === e) return;
    if (0 === t.slides.length) return;
    const r =
        t.virtual && t.params.virtual.enabled
          ? t.$wrapperEl.children(
              `.${t.params.slideClass}[data-swiper-slide-index="${e}"]`
            )
          : t.slides.eq(e),
      n = r.find(
        `.${a.elementClass}:not(.${a.loadedClass}):not(.${a.loadingClass})`
      );
    !r.hasClass(a.elementClass) ||
      r.hasClass(a.loadedClass) ||
      r.hasClass(a.loadingClass) ||
      n.push(r[0]),
      0 !== n.length &&
        n.each((e) => {
          const n = $(e);
          n.addClass(a.loadingClass);
          const o = n.attr("data-background"),
            d = n.attr("data-src"),
            c = n.attr("data-srcset"),
            p = n.attr("data-sizes"),
            u = n.parent("picture");
          t.loadImage(n[0], d || o, c, p, !1, () => {
            if (null != t && t && (!t || t.params) && !t.destroyed) {
              if (
                (o
                  ? (n.css("background-image", `url("${o}")`),
                    n.removeAttr("data-background"))
                  : (c && (n.attr("srcset", c), n.removeAttr("data-srcset")),
                    p && (n.attr("sizes", p), n.removeAttr("data-sizes")),
                    u.length &&
                      u.children("source").each((e) => {
                        const t = $(e);
                        t.attr("data-srcset") &&
                          (t.attr("srcset", t.attr("data-srcset")),
                          t.removeAttr("data-srcset"));
                      }),
                    d && (n.attr("src", d), n.removeAttr("data-src"))),
                n.addClass(a.loadedClass).removeClass(a.loadingClass),
                r.find(`.${a.preloaderClass}`).remove(),
                t.params.loop && s)
              ) {
                const e = r.attr("data-swiper-slide-index");
                if (r.hasClass(t.params.slideDuplicateClass)) {
                  l(
                    t.$wrapperEl
                      .children(
                        `[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`
                      )
                      .index(),
                    !1
                  );
                } else {
                  l(
                    t.$wrapperEl
                      .children(
                        `.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`
                      )
                      .index(),
                    !1
                  );
                }
              }
              i("lazyImageReady", r[0], n[0]),
                t.params.autoHeight && t.updateAutoHeight();
            }
          }),
            i("lazyImageLoad", r[0], n[0]);
        });
  }
  function o() {
    const { $wrapperEl: e, params: s, slides: a, activeIndex: i } = t,
      r = t.virtual && s.virtual.enabled,
      o = s.lazy;
    let d = s.slidesPerView;
    function c(t) {
      if (r) {
        if (
          e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`).length
        )
          return !0;
      } else if (a[t]) return !0;
      return !1;
    }
    function p(e) {
      return r ? $(e).attr("data-swiper-slide-index") : $(e).index();
    }
    if (("auto" === d && (d = 0), n || (n = !0), t.params.watchSlidesProgress))
      e.children(`.${s.slideVisibleClass}`).each((e) => {
        l(r ? $(e).attr("data-swiper-slide-index") : $(e).index());
      });
    else if (d > 1) for (let e = i; e < i + d; e += 1) c(e) && l(e);
    else l(i);
    if (o.loadPrevNext)
      if (d > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
        const e = o.loadPrevNextAmount,
          t = Math.ceil(d),
          s = Math.min(i + t + Math.max(e, t), a.length),
          r = Math.max(i - Math.max(t, e), 0);
        for (let e = i + t; e < s; e += 1) c(e) && l(e);
        for (let e = r; e < i; e += 1) c(e) && l(e);
      } else {
        const t = e.children(`.${s.slideNextClass}`);
        t.length > 0 && l(p(t));
        const a = e.children(`.${s.slidePrevClass}`);
        a.length > 0 && l(p(a));
      }
  }
  function d() {
    const e = getWindow();
    if (!t || t.destroyed) return;
    const s = t.params.lazy.scrollingElement
        ? $(t.params.lazy.scrollingElement)
        : $(e),
      a = s[0] === e,
      i = a ? e.innerWidth : s[0].offsetWidth,
      n = a ? e.innerHeight : s[0].offsetHeight,
      l = t.$el.offset(),
      { rtlTranslate: c } = t;
    let p = !1;
    c && (l.left -= t.$el[0].scrollLeft);
    const u = [
      [l.left, l.top],
      [l.left + t.width, l.top],
      [l.left, l.top + t.height],
      [l.left + t.width, l.top + t.height],
    ];
    for (let e = 0; e < u.length; e += 1) {
      const t = u[e];
      if (t[0] >= 0 && t[0] <= i && t[1] >= 0 && t[1] <= n) {
        if (0 === t[0] && 0 === t[1]) continue;
        p = !0;
      }
    }
    const h = !(
      "touchstart" !== t.touchEvents.start ||
      !t.support.passiveListener ||
      !t.params.passiveListeners
    ) && { passive: !0, capture: !1 };
    p ? (o(), s.off("scroll", d, h)) : r || ((r = !0), s.on("scroll", d, h));
  }
  a("beforeInit", () => {
    t.params.lazy.enabled &&
      t.params.preloadImages &&
      (t.params.preloadImages = !1);
  }),
    a("init", () => {
      t.params.lazy.enabled && (t.params.lazy.checkInView ? d() : o());
    }),
    a("scroll", () => {
      t.params.freeMode &&
        t.params.freeMode.enabled &&
        !t.params.freeMode.sticky &&
        o();
    }),
    a("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
      t.params.lazy.enabled && (t.params.lazy.checkInView ? d() : o());
    }),
    a("transitionStart", () => {
      t.params.lazy.enabled &&
        (t.params.lazy.loadOnTransitionStart ||
          (!t.params.lazy.loadOnTransitionStart && !n)) &&
        (t.params.lazy.checkInView ? d() : o());
    }),
    a("transitionEnd", () => {
      t.params.lazy.enabled &&
        !t.params.lazy.loadOnTransitionStart &&
        (t.params.lazy.checkInView ? d() : o());
    }),
    a("slideChange", () => {
      const {
        lazy: e,
        cssMode: s,
        watchSlidesProgress: a,
        touchReleaseOnEdges: i,
        resistanceRatio: r,
      } = t.params;
      e.enabled && (s || (a && (i || 0 === r))) && o();
    }),
    a("destroy", () => {
      t.$el &&
        t.$el
          .find(`.${t.params.lazy.loadingClass}`)
          .removeClass(t.params.lazy.loadingClass);
    }),
    Object.assign(t.lazy, { load: o, loadInSlide: l });
}
function Controller(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  function i(e, t) {
    const s = (function () {
      let e, t, s;
      return (a, i) => {
        for (t = -1, e = a.length; e - t > 1; )
          (s = (e + t) >> 1), a[s] <= i ? (t = s) : (e = s);
        return e;
      };
    })();
    let a, i;
    return (
      (this.x = e),
      (this.y = t),
      (this.lastIndex = e.length - 1),
      (this.interpolate = function (e) {
        return e
          ? ((i = s(this.x, e)),
            (a = i - 1),
            ((e - this.x[a]) * (this.y[i] - this.y[a])) /
              (this.x[i] - this.x[a]) +
              this.y[a])
          : 0;
      }),
      this
    );
  }
  function r() {
    t.controller.control &&
      t.controller.spline &&
      ((t.controller.spline = void 0), delete t.controller.spline);
  }
  s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
    (t.controller = { control: void 0 }),
    a("beforeInit", () => {
      t.controller.control = t.params.controller.control;
    }),
    a("update", () => {
      r();
    }),
    a("resize", () => {
      r();
    }),
    a("observerUpdate", () => {
      r();
    }),
    a("setTranslate", (e, s, a) => {
      t.controller.control && t.controller.setTranslate(s, a);
    }),
    a("setTransition", (e, s, a) => {
      t.controller.control && t.controller.setTransition(s, a);
    }),
    Object.assign(t.controller, {
      setTranslate: function (e, s) {
        const a = t.controller.control;
        let r, n;
        const l = t.constructor;
        function o(e) {
          const s = t.rtlTranslate ? -t.translate : t.translate;
          "slide" === t.params.controller.by &&
            (!(function (e) {
              t.controller.spline ||
                (t.controller.spline = t.params.loop
                  ? new i(t.slidesGrid, e.slidesGrid)
                  : new i(t.snapGrid, e.snapGrid));
            })(e),
            (n = -t.controller.spline.interpolate(-s))),
            (n && "container" !== t.params.controller.by) ||
              ((r =
                (e.maxTranslate() - e.minTranslate()) /
                (t.maxTranslate() - t.minTranslate())),
              (n = (s - t.minTranslate()) * r + e.minTranslate())),
            t.params.controller.inverse && (n = e.maxTranslate() - n),
            e.updateProgress(n),
            e.setTranslate(n, t),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        }
        if (Array.isArray(a))
          for (let e = 0; e < a.length; e += 1)
            a[e] !== s && a[e] instanceof l && o(a[e]);
        else a instanceof l && s !== a && o(a);
      },
      setTransition: function (e, s) {
        const a = t.constructor,
          i = t.controller.control;
        let r;
        function n(s) {
          s.setTransition(e, t),
            0 !== e &&
              (s.transitionStart(),
              s.params.autoHeight &&
                nextTick(() => {
                  s.updateAutoHeight();
                }),
              s.$wrapperEl.transitionEnd(() => {
                i &&
                  (s.params.loop &&
                    "slide" === t.params.controller.by &&
                    s.loopFix(),
                  s.transitionEnd());
              }));
        }
        if (Array.isArray(i))
          for (r = 0; r < i.length; r += 1)
            i[r] !== s && i[r] instanceof a && n(i[r]);
        else i instanceof a && s !== i && n(i);
      },
    });
}
function A11y(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({
    a11y: {
      enabled: !0,
      notificationClass: "swiper-notification",
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
      paginationBulletMessage: "Go to slide {{index}}",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
      slideRole: "group",
      id: null,
    },
  });
  let i = null;
  function r(e) {
    const t = i;
    0 !== t.length && (t.html(""), t.html(e));
  }
  function n(e) {
    e.attr("tabIndex", "0");
  }
  function l(e) {
    e.attr("tabIndex", "-1");
  }
  function o(e, t) {
    e.attr("role", t);
  }
  function d(e, t) {
    e.attr("aria-roledescription", t);
  }
  function c(e, t) {
    e.attr("aria-label", t);
  }
  function p(e) {
    e.attr("aria-disabled", !0);
  }
  function u(e) {
    e.attr("aria-disabled", !1);
  }
  function h(e) {
    if (13 !== e.keyCode && 32 !== e.keyCode) return;
    const s = t.params.a11y,
      a = $(e.target);
    t.navigation &&
      t.navigation.$nextEl &&
      a.is(t.navigation.$nextEl) &&
      ((t.isEnd && !t.params.loop) || t.slideNext(),
      t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)),
      t.navigation &&
        t.navigation.$prevEl &&
        a.is(t.navigation.$prevEl) &&
        ((t.isBeginning && !t.params.loop) || t.slidePrev(),
        t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)),
      t.pagination &&
        a.is(classesToSelector(t.params.pagination.bulletClass)) &&
        a[0].click();
  }
  function m() {
    return t.pagination && t.pagination.bullets && t.pagination.bullets.length;
  }
  function f() {
    return m() && t.params.pagination.clickable;
  }
  const g = (e, t, s) => {
      n(e),
        "BUTTON" !== e[0].tagName && (o(e, "button"), e.on("keydown", h)),
        c(e, s),
        (function (e, t) {
          e.attr("aria-controls", t);
        })(e, t);
    },
    v = (e) => {
      const s = e.target.closest(`.${t.params.slideClass}`);
      if (!s || !t.slides.includes(s)) return;
      const a = t.slides.indexOf(s) === t.activeIndex,
        i =
          t.params.watchSlidesProgress &&
          t.visibleSlides &&
          t.visibleSlides.includes(s);
      a || i || t.slideTo(t.slides.indexOf(s), 0);
    },
    w = () => {
      const e = t.params.a11y;
      e.itemRoleDescriptionMessage &&
        d($(t.slides), e.itemRoleDescriptionMessage),
        o($(t.slides), e.slideRole);
      const s = t.params.loop
        ? t.slides.filter(
            (e) => !e.classList.contains(t.params.slideDuplicateClass)
          ).length
        : t.slides.length;
      e.slideLabelMessage &&
        t.slides.each((a, i) => {
          const r = $(a),
            n = t.params.loop
              ? parseInt(r.attr("data-swiper-slide-index"), 10)
              : i;
          c(
            r,
            e.slideLabelMessage
              .replace(/\{\{index\}\}/, n + 1)
              .replace(/\{\{slidesLength\}\}/, s)
          );
        });
    },
    b = () => {
      const e = t.params.a11y;
      t.$el.append(i);
      const s = t.$el;
      e.containerRoleDescriptionMessage &&
        d(s, e.containerRoleDescriptionMessage),
        e.containerMessage && c(s, e.containerMessage);
      const a = t.$wrapperEl,
        r =
          e.id ||
          a.attr("id") ||
          `swiper-wrapper-${
            ((n = 16),
            void 0 === n && (n = 16),
            "x"
              .repeat(n)
              .replace(/x/g, () => Math.round(16 * Math.random()).toString(16)))
          }`;
      var n;
      const l =
        t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
      var o;
      let p, u;
      (o = r),
        a.attr("id", o),
        (function (e, t) {
          e.attr("aria-live", t);
        })(a, l),
        w(),
        t.navigation && t.navigation.$nextEl && (p = t.navigation.$nextEl),
        t.navigation && t.navigation.$prevEl && (u = t.navigation.$prevEl),
        p && p.length && g(p, r, e.nextSlideMessage),
        u && u.length && g(u, r, e.prevSlideMessage),
        f() &&
          t.pagination.$el.on(
            "keydown",
            classesToSelector(t.params.pagination.bulletClass),
            h
          ),
        t.$el.on("focus", v, !0);
    };
  a("beforeInit", () => {
    i = $(
      `<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`
    );
  }),
    a("afterInit", () => {
      t.params.a11y.enabled && b();
    }),
    a("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
      t.params.a11y.enabled && w();
    }),
    a("fromEdge toEdge afterInit lock unlock", () => {
      t.params.a11y.enabled &&
        (function () {
          if (t.params.loop || t.params.rewind || !t.navigation) return;
          const { $nextEl: e, $prevEl: s } = t.navigation;
          s && s.length > 0 && (t.isBeginning ? (p(s), l(s)) : (u(s), n(s))),
            e && e.length > 0 && (t.isEnd ? (p(e), l(e)) : (u(e), n(e)));
        })();
    }),
    a("paginationUpdate", () => {
      t.params.a11y.enabled &&
        (function () {
          const e = t.params.a11y;
          m() &&
            t.pagination.bullets.each((s) => {
              const a = $(s);
              t.params.pagination.clickable &&
                (n(a),
                t.params.pagination.renderBullet ||
                  (o(a, "button"),
                  c(
                    a,
                    e.paginationBulletMessage.replace(
                      /\{\{index\}\}/,
                      a.index() + 1
                    )
                  ))),
                a.is(`.${t.params.pagination.bulletActiveClass}`)
                  ? a.attr("aria-current", "true")
                  : a.removeAttr("aria-current");
            });
        })();
    }),
    a("destroy", () => {
      t.params.a11y.enabled &&
        (function () {
          let e, s;
          i && i.length > 0 && i.remove(),
            t.navigation && t.navigation.$nextEl && (e = t.navigation.$nextEl),
            t.navigation && t.navigation.$prevEl && (s = t.navigation.$prevEl),
            e && e.off("keydown", h),
            s && s.off("keydown", h),
            f() &&
              t.pagination.$el.off(
                "keydown",
                classesToSelector(t.params.pagination.bulletClass),
                h
              ),
            t.$el.off("focus", v, !0);
        })();
    });
}
function History(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({
    history: {
      enabled: !1,
      root: "",
      replaceState: !1,
      key: "slides",
      keepQuery: !1,
    },
  });
  let i = !1,
    r = {};
  const n = (e) =>
      e
        .toString()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, ""),
    l = (e) => {
      const t = getWindow();
      let s;
      s = e ? new URL(e) : t.location;
      const a = s.pathname
          .slice(1)
          .split("/")
          .filter((e) => "" !== e),
        i = a.length;
      return { key: a[i - 2], value: a[i - 1] };
    },
    o = (e, s) => {
      const a = getWindow();
      if (!i || !t.params.history.enabled) return;
      let r;
      r = t.params.url ? new URL(t.params.url) : a.location;
      const l = t.slides.eq(s);
      let o = n(l.attr("data-history"));
      if (t.params.history.root.length > 0) {
        let s = t.params.history.root;
        "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
          (o = `${s}/${e}/${o}`);
      } else r.pathname.includes(e) || (o = `${e}/${o}`);
      t.params.history.keepQuery && (o += r.search);
      const d = a.history.state;
      (d && d.value === o) ||
        (t.params.history.replaceState
          ? a.history.replaceState({ value: o }, null, o)
          : a.history.pushState({ value: o }, null, o));
    },
    d = (e, s, a) => {
      if (s)
        for (let i = 0, r = t.slides.length; i < r; i += 1) {
          const r = t.slides.eq(i);
          if (
            n(r.attr("data-history")) === s &&
            !r.hasClass(t.params.slideDuplicateClass)
          ) {
            const s = r.index();
            t.slideTo(s, e, a);
          }
        }
      else t.slideTo(0, e, a);
    },
    c = () => {
      (r = l(t.params.url)), d(t.params.speed, r.value, !1);
    };
  a("init", () => {
    t.params.history.enabled &&
      (() => {
        const e = getWindow();
        if (t.params.history) {
          if (!e.history || !e.history.pushState)
            return (
              (t.params.history.enabled = !1),
              void (t.params.hashNavigation.enabled = !0)
            );
          (i = !0),
            (r = l(t.params.url)),
            (r.key || r.value) &&
              (d(0, r.value, t.params.runCallbacksOnInit),
              t.params.history.replaceState ||
                e.addEventListener("popstate", c));
        }
      })();
  }),
    a("destroy", () => {
      t.params.history.enabled &&
        (() => {
          const e = getWindow();
          t.params.history.replaceState || e.removeEventListener("popstate", c);
        })();
    }),
    a("transitionEnd _freeModeNoMomentumRelease", () => {
      i && o(t.params.history.key, t.activeIndex);
    }),
    a("slideChange", () => {
      i && t.params.cssMode && o(t.params.history.key, t.activeIndex);
    });
}
function HashNavigation(e) {
  let { swiper: t, extendParams: s, emit: a, on: i } = e,
    r = !1;
  const n = getDocument(),
    l = getWindow();
  s({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } });
  const o = () => {
      a("hashChange");
      const e = n.location.hash.replace("#", "");
      if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
        const s = t.$wrapperEl
          .children(`.${t.params.slideClass}[data-hash="${e}"]`)
          .index();
        if (void 0 === s) return;
        t.slideTo(s);
      }
    },
    d = () => {
      if (r && t.params.hashNavigation.enabled)
        if (
          t.params.hashNavigation.replaceState &&
          l.history &&
          l.history.replaceState
        )
          l.history.replaceState(
            null,
            null,
            `#${t.slides.eq(t.activeIndex).attr("data-hash")}` || ""
          ),
            a("hashSet");
        else {
          const e = t.slides.eq(t.activeIndex),
            s = e.attr("data-hash") || e.attr("data-history");
          (n.location.hash = s || ""), a("hashSet");
        }
    };
  i("init", () => {
    t.params.hashNavigation.enabled &&
      (() => {
        if (
          !t.params.hashNavigation.enabled ||
          (t.params.history && t.params.history.enabled)
        )
          return;
        r = !0;
        const e = n.location.hash.replace("#", "");
        if (e) {
          const s = 0;
          for (let a = 0, i = t.slides.length; a < i; a += 1) {
            const i = t.slides.eq(a);
            if (
              (i.attr("data-hash") || i.attr("data-history")) === e &&
              !i.hasClass(t.params.slideDuplicateClass)
            ) {
              const e = i.index();
              t.slideTo(e, s, t.params.runCallbacksOnInit, !0);
            }
          }
        }
        t.params.hashNavigation.watchState && $(l).on("hashchange", o);
      })();
  }),
    i("destroy", () => {
      t.params.hashNavigation.enabled &&
        t.params.hashNavigation.watchState &&
        $(l).off("hashchange", o);
    }),
    i("transitionEnd _freeModeNoMomentumRelease", () => {
      r && d();
    }),
    i("slideChange", () => {
      r && t.params.cssMode && d();
    });
}
function Autoplay(e) {
  let t,
    { swiper: s, extendParams: a, on: i, emit: r } = e;
  function n() {
    const e = s.slides.eq(s.activeIndex);
    let a = s.params.autoplay.delay;
    e.attr("data-swiper-autoplay") &&
      (a = e.attr("data-swiper-autoplay") || s.params.autoplay.delay),
      clearTimeout(t),
      (t = nextTick(() => {
        let e;
        s.params.autoplay.reverseDirection
          ? s.params.loop
            ? (s.loopFix(),
              (e = s.slidePrev(s.params.speed, !0, !0)),
              r("autoplay"))
            : s.isBeginning
            ? s.params.autoplay.stopOnLastSlide
              ? o()
              : ((e = s.slideTo(s.slides.length - 1, s.params.speed, !0, !0)),
                r("autoplay"))
            : ((e = s.slidePrev(s.params.speed, !0, !0)), r("autoplay"))
          : s.params.loop
          ? (s.loopFix(),
            (e = s.slideNext(s.params.speed, !0, !0)),
            r("autoplay"))
          : s.isEnd
          ? s.params.autoplay.stopOnLastSlide
            ? o()
            : ((e = s.slideTo(0, s.params.speed, !0, !0)), r("autoplay"))
          : ((e = s.slideNext(s.params.speed, !0, !0)), r("autoplay")),
          ((s.params.cssMode && s.autoplay.running) || !1 === e) && n();
      }, a));
  }
  function l() {
    return (
      void 0 === t &&
      !s.autoplay.running &&
      ((s.autoplay.running = !0), r("autoplayStart"), n(), !0)
    );
  }
  function o() {
    return (
      !!s.autoplay.running &&
      void 0 !== t &&
      (t && (clearTimeout(t), (t = void 0)),
      (s.autoplay.running = !1),
      r("autoplayStop"),
      !0)
    );
  }
  function d(e) {
    s.autoplay.running &&
      (s.autoplay.paused ||
        (t && clearTimeout(t),
        (s.autoplay.paused = !0),
        0 !== e && s.params.autoplay.waitForTransition
          ? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
              s.$wrapperEl[0].addEventListener(e, p);
            })
          : ((s.autoplay.paused = !1), n())));
  }
  function c() {
    const e = getDocument();
    "hidden" === e.visibilityState && s.autoplay.running && d(),
      "visible" === e.visibilityState &&
        s.autoplay.paused &&
        (n(), (s.autoplay.paused = !1));
  }
  function p(e) {
    s &&
      !s.destroyed &&
      s.$wrapperEl &&
      e.target === s.$wrapperEl[0] &&
      (["transitionend", "webkitTransitionEnd"].forEach((e) => {
        s.$wrapperEl[0].removeEventListener(e, p);
      }),
      (s.autoplay.paused = !1),
      s.autoplay.running ? n() : o());
  }
  function u() {
    s.params.autoplay.disableOnInteraction ? o() : (r("autoplayPause"), d()),
      ["transitionend", "webkitTransitionEnd"].forEach((e) => {
        s.$wrapperEl[0].removeEventListener(e, p);
      });
  }
  function h() {
    s.params.autoplay.disableOnInteraction ||
      ((s.autoplay.paused = !1), r("autoplayResume"), n());
  }
  (s.autoplay = { running: !1, paused: !1 }),
    a({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !0,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1,
      },
    }),
    i("init", () => {
      if (s.params.autoplay.enabled) {
        l();
        getDocument().addEventListener("visibilitychange", c),
          s.params.autoplay.pauseOnMouseEnter &&
            (s.$el.on("mouseenter", u), s.$el.on("mouseleave", h));
      }
    }),
    i("beforeTransitionStart", (e, t, a) => {
      s.autoplay.running &&
        (a || !s.params.autoplay.disableOnInteraction
          ? s.autoplay.pause(t)
          : o());
    }),
    i("sliderFirstMove", () => {
      s.autoplay.running &&
        (s.params.autoplay.disableOnInteraction ? o() : d());
    }),
    i("touchEnd", () => {
      s.params.cssMode &&
        s.autoplay.paused &&
        !s.params.autoplay.disableOnInteraction &&
        n();
    }),
    i("destroy", () => {
      s.$el.off("mouseenter", u),
        s.$el.off("mouseleave", h),
        s.autoplay.running && o();
      getDocument().removeEventListener("visibilitychange", c);
    }),
    Object.assign(s.autoplay, { pause: d, run: n, start: l, stop: o });
}
function Thumb(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: !0,
      autoScrollOffset: 0,
      slideThumbActiveClass: "swiper-slide-thumb-active",
      thumbsContainerClass: "swiper-thumbs",
    },
  });
  let i = !1,
    r = !1;
  function n() {
    const e = t.thumbs.swiper;
    if (!e || e.destroyed) return;
    const s = e.clickedIndex,
      a = e.clickedSlide;
    if (a && $(a).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
    if (null == s) return;
    let i;
    if (
      ((i = e.params.loop
        ? parseInt($(e.clickedSlide).attr("data-swiper-slide-index"), 10)
        : s),
      t.params.loop)
    ) {
      let e = t.activeIndex;
      t.slides.eq(e).hasClass(t.params.slideDuplicateClass) &&
        (t.loopFix(),
        (t._clientLeft = t.$wrapperEl[0].clientLeft),
        (e = t.activeIndex));
      const s = t.slides
          .eq(e)
          .prevAll(`[data-swiper-slide-index="${i}"]`)
          .eq(0)
          .index(),
        a = t.slides
          .eq(e)
          .nextAll(`[data-swiper-slide-index="${i}"]`)
          .eq(0)
          .index();
      i = void 0 === s ? a : void 0 === a ? s : a - e < e - s ? a : s;
    }
    t.slideTo(i);
  }
  function l() {
    const { thumbs: e } = t.params;
    if (i) return !1;
    i = !0;
    const s = t.constructor;
    if (e.swiper instanceof s)
      (t.thumbs.swiper = e.swiper),
        Object.assign(t.thumbs.swiper.originalParams, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        }),
        Object.assign(t.thumbs.swiper.params, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        });
    else if (isObject(e.swiper)) {
      const a = Object.assign({}, e.swiper);
      Object.assign(a, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
        (t.thumbs.swiper = new s(a)),
        (r = !0);
    }
    return (
      t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
      t.thumbs.swiper.on("tap", n),
      !0
    );
  }
  function o(e) {
    const s = t.thumbs.swiper;
    if (!s || s.destroyed) return;
    const a =
        "auto" === s.params.slidesPerView
          ? s.slidesPerViewDynamic()
          : s.params.slidesPerView,
      i = t.params.thumbs.autoScrollOffset,
      r = i && !s.params.loop;
    if (t.realIndex !== s.realIndex || r) {
      let n,
        l,
        o = s.activeIndex;
      if (s.params.loop) {
        s.slides.eq(o).hasClass(s.params.slideDuplicateClass) &&
          (s.loopFix(),
          (s._clientLeft = s.$wrapperEl[0].clientLeft),
          (o = s.activeIndex));
        const e = s.slides
            .eq(o)
            .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
            .eq(0)
            .index(),
          a = s.slides
            .eq(o)
            .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
            .eq(0)
            .index();
        (n =
          void 0 === e
            ? a
            : void 0 === a
            ? e
            : a - o == o - e
            ? s.params.slidesPerGroup > 1
              ? a
              : o
            : a - o < o - e
            ? a
            : e),
          (l = t.activeIndex > t.previousIndex ? "next" : "prev");
      } else (n = t.realIndex), (l = n > t.previousIndex ? "next" : "prev");
      r && (n += "next" === l ? i : -1 * i),
        s.visibleSlidesIndexes &&
          s.visibleSlidesIndexes.indexOf(n) < 0 &&
          (s.params.centeredSlides
            ? (n =
                n > o ? n - Math.floor(a / 2) + 1 : n + Math.floor(a / 2) - 1)
            : n > o && s.params.slidesPerGroup,
          s.slideTo(n, e ? 0 : void 0));
    }
    let n = 1;
    const l = t.params.thumbs.slideThumbActiveClass;
    if (
      (t.params.slidesPerView > 1 &&
        !t.params.centeredSlides &&
        (n = t.params.slidesPerView),
      t.params.thumbs.multipleActiveThumbs || (n = 1),
      (n = Math.floor(n)),
      s.slides.removeClass(l),
      s.params.loop || (s.params.virtual && s.params.virtual.enabled))
    )
      for (let e = 0; e < n; e += 1)
        s.$wrapperEl
          .children(`[data-swiper-slide-index="${t.realIndex + e}"]`)
          .addClass(l);
    else
      for (let e = 0; e < n; e += 1) s.slides.eq(t.realIndex + e).addClass(l);
  }
  (t.thumbs = { swiper: null }),
    a("beforeInit", () => {
      const { thumbs: e } = t.params;
      e && e.swiper && (l(), o(!0));
    }),
    a("slideChange update resize observerUpdate", () => {
      o();
    }),
    a("setTransition", (e, s) => {
      const a = t.thumbs.swiper;
      a && !a.destroyed && a.setTransition(s);
    }),
    a("beforeDestroy", () => {
      const e = t.thumbs.swiper;
      e && !e.destroyed && r && e.destroy();
    }),
    Object.assign(t.thumbs, { init: l, update: o });
}
function freeMode(e) {
  let { swiper: t, extendParams: s, emit: a, once: i } = e;
  s({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: 0.02,
    },
  }),
    Object.assign(t, {
      freeMode: {
        onTouchStart: function () {
          const e = t.getTranslate();
          t.setTranslate(e),
            t.setTransition(0),
            (t.touchEventsData.velocities.length = 0),
            t.freeMode.onTouchEnd({
              currentPos: t.rtl ? t.translate : -t.translate,
            });
        },
        onTouchMove: function () {
          const { touchEventsData: e, touches: s } = t;
          0 === e.velocities.length &&
            e.velocities.push({
              position: s[t.isHorizontal() ? "startX" : "startY"],
              time: e.touchStartTime,
            }),
            e.velocities.push({
              position: s[t.isHorizontal() ? "currentX" : "currentY"],
              time: now(),
            });
        },
        onTouchEnd: function (e) {
          let { currentPos: s } = e;
          const {
              params: r,
              $wrapperEl: n,
              rtlTranslate: l,
              snapGrid: o,
              touchEventsData: d,
            } = t,
            c = now() - d.touchStartTime;
          if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
          else if (s > -t.maxTranslate())
            t.slides.length < o.length
              ? t.slideTo(o.length - 1)
              : t.slideTo(t.slides.length - 1);
          else {
            if (r.freeMode.momentum) {
              if (d.velocities.length > 1) {
                const e = d.velocities.pop(),
                  s = d.velocities.pop(),
                  a = e.position - s.position,
                  i = e.time - s.time;
                (t.velocity = a / i),
                  (t.velocity /= 2),
                  Math.abs(t.velocity) < r.freeMode.minimumVelocity &&
                    (t.velocity = 0),
                  (i > 150 || now() - e.time > 300) && (t.velocity = 0);
              } else t.velocity = 0;
              (t.velocity *= r.freeMode.momentumVelocityRatio),
                (d.velocities.length = 0);
              let e = 1e3 * r.freeMode.momentumRatio;
              const s = t.velocity * e;
              let c = t.translate + s;
              l && (c = -c);
              let p,
                u = !1;
              const h =
                20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
              let m;
              if (c < t.maxTranslate())
                r.freeMode.momentumBounce
                  ? (c + t.maxTranslate() < -h && (c = t.maxTranslate() - h),
                    (p = t.maxTranslate()),
                    (u = !0),
                    (d.allowMomentumBounce = !0))
                  : (c = t.maxTranslate()),
                  r.loop && r.centeredSlides && (m = !0);
              else if (c > t.minTranslate())
                r.freeMode.momentumBounce
                  ? (c - t.minTranslate() > h && (c = t.minTranslate() + h),
                    (p = t.minTranslate()),
                    (u = !0),
                    (d.allowMomentumBounce = !0))
                  : (c = t.minTranslate()),
                  r.loop && r.centeredSlides && (m = !0);
              else if (r.freeMode.sticky) {
                let e;
                for (let t = 0; t < o.length; t += 1)
                  if (o[t] > -c) {
                    e = t;
                    break;
                  }
                (c =
                  Math.abs(o[e] - c) < Math.abs(o[e - 1] - c) ||
                  "next" === t.swipeDirection
                    ? o[e]
                    : o[e - 1]),
                  (c = -c);
              }
              if (
                (m &&
                  i("transitionEnd", () => {
                    t.loopFix();
                  }),
                0 !== t.velocity)
              ) {
                if (
                  ((e = l
                    ? Math.abs((-c - t.translate) / t.velocity)
                    : Math.abs((c - t.translate) / t.velocity)),
                  r.freeMode.sticky)
                ) {
                  const s = Math.abs((l ? -c : c) - t.translate),
                    a = t.slidesSizesGrid[t.activeIndex];
                  e =
                    s < a ? r.speed : s < 2 * a ? 1.5 * r.speed : 2.5 * r.speed;
                }
              } else if (r.freeMode.sticky) return void t.slideToClosest();
              r.freeMode.momentumBounce && u
                ? (t.updateProgress(p),
                  t.setTransition(e),
                  t.setTranslate(c),
                  t.transitionStart(!0, t.swipeDirection),
                  (t.animating = !0),
                  n.transitionEnd(() => {
                    t &&
                      !t.destroyed &&
                      d.allowMomentumBounce &&
                      (a("momentumBounce"),
                      t.setTransition(r.speed),
                      setTimeout(() => {
                        t.setTranslate(p),
                          n.transitionEnd(() => {
                            t && !t.destroyed && t.transitionEnd();
                          });
                      }, 0));
                  }))
                : t.velocity
                ? (a("_freeModeNoMomentumRelease"),
                  t.updateProgress(c),
                  t.setTransition(e),
                  t.setTranslate(c),
                  t.transitionStart(!0, t.swipeDirection),
                  t.animating ||
                    ((t.animating = !0),
                    n.transitionEnd(() => {
                      t && !t.destroyed && t.transitionEnd();
                    })))
                : t.updateProgress(c),
                t.updateActiveIndex(),
                t.updateSlidesClasses();
            } else {
              if (r.freeMode.sticky) return void t.slideToClosest();
              r.freeMode && a("_freeModeNoMomentumRelease");
            }
            (!r.freeMode.momentum || c >= r.longSwipesMs) &&
              (t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses());
          }
        },
      },
    });
}
function Grid(e) {
  let t,
    s,
    a,
    { swiper: i, extendParams: r } = e;
  r({ grid: { rows: 1, fill: "column" } });
  i.grid = {
    initSlides: (e) => {
      const { slidesPerView: r } = i.params,
        { rows: n, fill: l } = i.params.grid;
      (s = t / n),
        (a = Math.floor(e / n)),
        (t = Math.floor(e / n) === e / n ? e : Math.ceil(e / n) * n),
        "auto" !== r && "row" === l && (t = Math.max(t, r * n));
    },
    updateSlide: (e, r, n, l) => {
      const { slidesPerGroup: o, spaceBetween: d } = i.params,
        { rows: c, fill: p } = i.params.grid;
      let u, h, m;
      if ("row" === p && o > 1) {
        const s = Math.floor(e / (o * c)),
          a = e - c * o * s,
          i = 0 === s ? o : Math.min(Math.ceil((n - s * c * o) / c), o);
        (m = Math.floor(a / i)),
          (h = a - m * i + s * o),
          (u = h + (m * t) / c),
          r.css({ "-webkit-order": u, order: u });
      } else
        "column" === p
          ? ((h = Math.floor(e / c)),
            (m = e - h * c),
            (h > a || (h === a && m === c - 1)) &&
              ((m += 1), m >= c && ((m = 0), (h += 1))))
          : ((m = Math.floor(e / s)), (h = e - m * s));
      r.css(l("margin-top"), 0 !== m ? d && `${d}px` : "");
    },
    updateWrapperSize: (e, s, a) => {
      const { spaceBetween: r, centeredSlides: n, roundLengths: l } = i.params,
        { rows: o } = i.params.grid;
      if (
        ((i.virtualSize = (e + r) * t),
        (i.virtualSize = Math.ceil(i.virtualSize / o) - r),
        i.$wrapperEl.css({ [a("width")]: `${i.virtualSize + r}px` }),
        n)
      ) {
        s.splice(0, s.length);
        const e = [];
        for (let t = 0; t < s.length; t += 1) {
          let a = s[t];
          l && (a = Math.floor(a)), s[t] < i.virtualSize + s[0] && e.push(a);
        }
        s.push(...e);
      }
    },
  };
}
function appendSlide(e) {
  const t = this,
    { $wrapperEl: s, params: a } = t;
  if ((a.loop && t.loopDestroy(), "object" == typeof e && "length" in e))
    for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
  else s.append(e);
  a.loop && t.loopCreate(), a.observer || t.update();
}
function prependSlide(e) {
  const t = this,
    { params: s, $wrapperEl: a, activeIndex: i } = t;
  s.loop && t.loopDestroy();
  let r = i + 1;
  if ("object" == typeof e && "length" in e) {
    for (let t = 0; t < e.length; t += 1) e[t] && a.prepend(e[t]);
    r = i + e.length;
  } else a.prepend(e);
  s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, !1);
}
function addSlide(e, t) {
  const s = this,
    { $wrapperEl: a, params: i, activeIndex: r } = s;
  let n = r;
  i.loop &&
    ((n -= s.loopedSlides),
    s.loopDestroy(),
    (s.slides = a.children(`.${i.slideClass}`)));
  const l = s.slides.length;
  if (e <= 0) return void s.prependSlide(t);
  if (e >= l) return void s.appendSlide(t);
  let o = n > e ? n + 1 : n;
  const d = [];
  for (let t = l - 1; t >= e; t -= 1) {
    const e = s.slides.eq(t);
    e.remove(), d.unshift(e);
  }
  if ("object" == typeof t && "length" in t) {
    for (let e = 0; e < t.length; e += 1) t[e] && a.append(t[e]);
    o = n > e ? n + t.length : n;
  } else a.append(t);
  for (let e = 0; e < d.length; e += 1) a.append(d[e]);
  i.loop && s.loopCreate(),
    i.observer || s.update(),
    i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
}
function removeSlide(e) {
  const t = this,
    { params: s, $wrapperEl: a, activeIndex: i } = t;
  let r = i;
  s.loop &&
    ((r -= t.loopedSlides),
    t.loopDestroy(),
    (t.slides = a.children(`.${s.slideClass}`)));
  let n,
    l = r;
  if ("object" == typeof e && "length" in e) {
    for (let s = 0; s < e.length; s += 1)
      (n = e[s]), t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1);
    l = Math.max(l, 0);
  } else
    (n = e),
      t.slides[n] && t.slides.eq(n).remove(),
      n < l && (l -= 1),
      (l = Math.max(l, 0));
  s.loop && t.loopCreate(),
    s.observer || t.update(),
    s.loop ? t.slideTo(l + t.loopedSlides, 0, !1) : t.slideTo(l, 0, !1);
}
function removeAllSlides() {
  const e = this,
    t = [];
  for (let s = 0; s < e.slides.length; s += 1) t.push(s);
  e.removeSlide(t);
}
function Manipulation(e) {
  let { swiper: t } = e;
  Object.assign(t, {
    appendSlide: appendSlide.bind(t),
    prependSlide: prependSlide.bind(t),
    addSlide: addSlide.bind(t),
    removeSlide: removeSlide.bind(t),
    removeAllSlides: removeAllSlides.bind(t),
  });
}
function effectInit(e) {
  const {
    effect: t,
    swiper: s,
    on: a,
    setTranslate: i,
    setTransition: r,
    overwriteParams: n,
    perspective: l,
    recreateShadows: o,
    getEffectParams: d,
  } = e;
  let c;
  a("beforeInit", () => {
    if (s.params.effect !== t) return;
    s.classNames.push(`${s.params.containerModifierClass}${t}`),
      l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
    const e = n ? n() : {};
    Object.assign(s.params, e), Object.assign(s.originalParams, e);
  }),
    a("setTranslate", () => {
      s.params.effect === t && i();
    }),
    a("setTransition", (e, a) => {
      s.params.effect === t && r(a);
    }),
    a("transitionEnd", () => {
      if (s.params.effect === t && o) {
        if (!d || !d().slideShadows) return;
        s.slides.each((e) => {
          s.$(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .remove();
        }),
          o();
      }
    }),
    a("virtualUpdate", () => {
      s.params.effect === t &&
        (s.slides.length || (c = !0),
        requestAnimationFrame(() => {
          c && s.slides && s.slides.length && (i(), (c = !1));
        }));
    });
}
function effectTarget(e, t) {
  return e.transformEl
    ? t.find(e.transformEl).css({
        "backface-visibility": "hidden",
        "-webkit-backface-visibility": "hidden",
      })
    : t;
}
function effectVirtualTransitionEnd(e) {
  let { swiper: t, duration: s, transformEl: a, allSlides: i } = e;
  const { slides: r, activeIndex: n, $wrapperEl: l } = t;
  if (t.params.virtualTranslate && 0 !== s) {
    let e,
      s = !1;
    (e = i ? (a ? r.find(a) : r) : a ? r.eq(n).find(a) : r.eq(n)),
      e.transitionEnd(() => {
        if (s) return;
        if (!t || t.destroyed) return;
        (s = !0), (t.animating = !1);
        const e = ["webkitTransitionEnd", "transitionend"];
        for (let t = 0; t < e.length; t += 1) l.trigger(e[t]);
      });
  }
}
function EffectFade(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({ fadeEffect: { crossFade: !1, transformEl: null } });
  effectInit({
    effect: "fade",
    swiper: t,
    on: a,
    setTranslate: () => {
      const { slides: e } = t,
        s = t.params.fadeEffect;
      for (let a = 0; a < e.length; a += 1) {
        const e = t.slides.eq(a);
        let i = -e[0].swiperSlideOffset;
        t.params.virtualTranslate || (i -= t.translate);
        let r = 0;
        t.isHorizontal() || ((r = i), (i = 0));
        const n = t.params.fadeEffect.crossFade
          ? Math.max(1 - Math.abs(e[0].progress), 0)
          : 1 + Math.min(Math.max(e[0].progress, -1), 0);
        effectTarget(s, e)
          .css({ opacity: n })
          .transform(`translate3d(${i}px, ${r}px, 0px)`);
      }
    },
    setTransition: (e) => {
      const { transformEl: s } = t.params.fadeEffect;
      (s ? t.slides.find(s) : t.slides).transition(e),
        effectVirtualTransitionEnd({
          swiper: t,
          duration: e,
          transformEl: s,
          allSlides: !0,
        });
    },
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !t.params.cssMode,
    }),
  });
}
function EffectCube(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({
    cubeEffect: {
      slideShadows: !0,
      shadow: !0,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
  const i = (e, t, s) => {
    let a = s
        ? e.find(".swiper-slide-shadow-left")
        : e.find(".swiper-slide-shadow-top"),
      i = s
        ? e.find(".swiper-slide-shadow-right")
        : e.find(".swiper-slide-shadow-bottom");
    0 === a.length &&
      ((a = $(`<div class="swiper-slide-shadow-${s ? "left" : "top"}"></div>`)),
      e.append(a)),
      0 === i.length &&
        ((i = $(
          `<div class="swiper-slide-shadow-${s ? "right" : "bottom"}"></div>`
        )),
        e.append(i)),
      a.length && (a[0].style.opacity = Math.max(-t, 0)),
      i.length && (i[0].style.opacity = Math.max(t, 0));
  };
  effectInit({
    effect: "cube",
    swiper: t,
    on: a,
    setTranslate: () => {
      const {
          $el: e,
          $wrapperEl: s,
          slides: a,
          width: r,
          height: n,
          rtlTranslate: l,
          size: o,
          browser: d,
        } = t,
        c = t.params.cubeEffect,
        p = t.isHorizontal(),
        u = t.virtual && t.params.virtual.enabled;
      let h,
        m = 0;
      c.shadow &&
        (p
          ? ((h = s.find(".swiper-cube-shadow")),
            0 === h.length &&
              ((h = $('<div class="swiper-cube-shadow"></div>')), s.append(h)),
            h.css({ height: `${r}px` }))
          : ((h = e.find(".swiper-cube-shadow")),
            0 === h.length &&
              ((h = $('<div class="swiper-cube-shadow"></div>')),
              e.append(h))));
      for (let e = 0; e < a.length; e += 1) {
        const t = a.eq(e);
        let s = e;
        u && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
        let r = 90 * s,
          n = Math.floor(r / 360);
        l && ((r = -r), (n = Math.floor(-r / 360)));
        const d = Math.max(Math.min(t[0].progress, 1), -1);
        let h = 0,
          f = 0,
          g = 0;
        s % 4 == 0
          ? ((h = 4 * -n * o), (g = 0))
          : (s - 1) % 4 == 0
          ? ((h = 0), (g = 4 * -n * o))
          : (s - 2) % 4 == 0
          ? ((h = o + 4 * n * o), (g = o))
          : (s - 3) % 4 == 0 && ((h = -o), (g = 3 * o + 4 * o * n)),
          l && (h = -h),
          p || ((f = h), (h = 0));
        const v = `rotateX(${p ? 0 : -r}deg) rotateY(${
          p ? r : 0
        }deg) translate3d(${h}px, ${f}px, ${g}px)`;
        d <= 1 &&
          d > -1 &&
          ((m = 90 * s + 90 * d), l && (m = 90 * -s - 90 * d)),
          t.transform(v),
          c.slideShadows && i(t, d, p);
      }
      if (
        (s.css({
          "-webkit-transform-origin": `50% 50% -${o / 2}px`,
          "transform-origin": `50% 50% -${o / 2}px`,
        }),
        c.shadow)
      )
        if (p)
          h.transform(
            `translate3d(0px, ${r / 2 + c.shadowOffset}px, ${
              -r / 2
            }px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`
          );
        else {
          const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90),
            t =
              1.5 -
              (Math.sin((2 * e * Math.PI) / 360) / 2 +
                Math.cos((2 * e * Math.PI) / 360) / 2),
            s = c.shadowScale,
            a = c.shadowScale / t,
            i = c.shadowOffset;
          h.transform(
            `scale3d(${s}, 1, ${a}) translate3d(0px, ${n / 2 + i}px, ${
              -n / 2 / a
            }px) rotateX(-90deg)`
          );
        }
      const f = d.isSafari || d.isWebView ? -o / 2 : 0;
      s.transform(
        `translate3d(0px,0,${f}px) rotateX(${
          t.isHorizontal() ? 0 : m
        }deg) rotateY(${t.isHorizontal() ? -m : 0}deg)`
      ),
        s[0].style.setProperty("--swiper-cube-translate-z", `${f}px`);
    },
    setTransition: (e) => {
      const { $el: s, slides: a } = t;
      a
        .transition(e)
        .find(
          ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
        )
        .transition(e),
        t.params.cubeEffect.shadow &&
          !t.isHorizontal() &&
          s.find(".swiper-cube-shadow").transition(e);
    },
    recreateShadows: () => {
      const e = t.isHorizontal();
      t.slides.each((t) => {
        const s = Math.max(Math.min(t.progress, 1), -1);
        i($(t), s, e);
      });
    },
    getEffectParams: () => t.params.cubeEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: !1,
      virtualTranslate: !0,
    }),
  });
}
function createShadow(e, t, s) {
  const a = "swiper-slide-shadow" + (s ? `-${s}` : ""),
    i = e.transformEl ? t.find(e.transformEl) : t;
  let r = i.children(`.${a}`);
  return (
    r.length ||
      ((r = $(`<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`)),
      i.append(r)),
    r
  );
}
function EffectFlip(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({ flipEffect: { slideShadows: !0, limitRotation: !0, transformEl: null } });
  const i = (e, s, a) => {
    let i = t.isHorizontal()
        ? e.find(".swiper-slide-shadow-left")
        : e.find(".swiper-slide-shadow-top"),
      r = t.isHorizontal()
        ? e.find(".swiper-slide-shadow-right")
        : e.find(".swiper-slide-shadow-bottom");
    0 === i.length &&
      (i = createShadow(a, e, t.isHorizontal() ? "left" : "top")),
      0 === r.length &&
        (r = createShadow(a, e, t.isHorizontal() ? "right" : "bottom")),
      i.length && (i[0].style.opacity = Math.max(-s, 0)),
      r.length && (r[0].style.opacity = Math.max(s, 0));
  };
  effectInit({
    effect: "flip",
    swiper: t,
    on: a,
    setTranslate: () => {
      const { slides: e, rtlTranslate: s } = t,
        a = t.params.flipEffect;
      for (let r = 0; r < e.length; r += 1) {
        const n = e.eq(r);
        let l = n[0].progress;
        t.params.flipEffect.limitRotation &&
          (l = Math.max(Math.min(n[0].progress, 1), -1));
        const o = n[0].swiperSlideOffset;
        let d = -180 * l,
          c = 0,
          p = t.params.cssMode ? -o - t.translate : -o,
          u = 0;
        t.isHorizontal()
          ? s && (d = -d)
          : ((u = p), (p = 0), (c = -d), (d = 0)),
          (n[0].style.zIndex = -Math.abs(Math.round(l)) + e.length),
          a.slideShadows && i(n, l, a);
        const h = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
        effectTarget(a, n).transform(h);
      }
    },
    setTransition: (e) => {
      const { transformEl: s } = t.params.flipEffect;
      (s ? t.slides.find(s) : t.slides)
        .transition(e)
        .find(
          ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
        )
        .transition(e),
        effectVirtualTransitionEnd({ swiper: t, duration: e, transformEl: s });
    },
    recreateShadows: () => {
      const e = t.params.flipEffect;
      t.slides.each((s) => {
        const a = $(s);
        let r = a[0].progress;
        t.params.flipEffect.limitRotation &&
          (r = Math.max(Math.min(s.progress, 1), -1)),
          i(a, r, e);
      });
    },
    getEffectParams: () => t.params.flipEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !t.params.cssMode,
    }),
  });
}
function EffectCoverflow(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: !0,
      transformEl: null,
    },
  });
  effectInit({
    effect: "coverflow",
    swiper: t,
    on: a,
    setTranslate: () => {
      const { width: e, height: s, slides: a, slidesSizesGrid: i } = t,
        r = t.params.coverflowEffect,
        n = t.isHorizontal(),
        l = t.translate,
        o = n ? e / 2 - l : s / 2 - l,
        d = n ? r.rotate : -r.rotate,
        c = r.depth;
      for (let e = 0, t = a.length; e < t; e += 1) {
        const t = a.eq(e),
          s = i[e],
          l = (o - t[0].swiperSlideOffset - s / 2) / s,
          p = "function" == typeof r.modifier ? r.modifier(l) : l * r.modifier;
        let u = n ? d * p : 0,
          h = n ? 0 : d * p,
          m = -c * Math.abs(p),
          f = r.stretch;
        "string" == typeof f &&
          -1 !== f.indexOf("%") &&
          (f = (parseFloat(r.stretch) / 100) * s);
        let g = n ? 0 : f * p,
          v = n ? f * p : 0,
          w = 1 - (1 - r.scale) * Math.abs(p);
        Math.abs(v) < 0.001 && (v = 0),
          Math.abs(g) < 0.001 && (g = 0),
          Math.abs(m) < 0.001 && (m = 0),
          Math.abs(u) < 0.001 && (u = 0),
          Math.abs(h) < 0.001 && (h = 0),
          Math.abs(w) < 0.001 && (w = 0);
        const b = `translate3d(${v}px,${g}px,${m}px)  rotateX(${h}deg) rotateY(${u}deg) scale(${w})`;
        if (
          (effectTarget(r, t).transform(b),
          (t[0].style.zIndex = 1 - Math.abs(Math.round(p))),
          r.slideShadows)
        ) {
          let e = n
              ? t.find(".swiper-slide-shadow-left")
              : t.find(".swiper-slide-shadow-top"),
            s = n
              ? t.find(".swiper-slide-shadow-right")
              : t.find(".swiper-slide-shadow-bottom");
          0 === e.length && (e = createShadow(r, t, n ? "left" : "top")),
            0 === s.length && (s = createShadow(r, t, n ? "right" : "bottom")),
            e.length && (e[0].style.opacity = p > 0 ? p : 0),
            s.length && (s[0].style.opacity = -p > 0 ? -p : 0);
        }
      }
    },
    setTransition: (e) => {
      const { transformEl: s } = t.params.coverflowEffect;
      (s ? t.slides.find(s) : t.slides)
        .transition(e)
        .find(
          ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
        )
        .transition(e);
    },
    perspective: () => !0,
    overwriteParams: () => ({ watchSlidesProgress: !0 }),
  });
}
function EffectCreative(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({
    creativeEffect: {
      transformEl: null,
      limitProgress: 1,
      shadowPerProgress: !1,
      progressMultiplier: 1,
      perspective: !0,
      prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
      next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
    },
  });
  const i = (e) => ("string" == typeof e ? e : `${e}px`);
  effectInit({
    effect: "creative",
    swiper: t,
    on: a,
    setTranslate: () => {
      const { slides: e, $wrapperEl: s, slidesSizesGrid: a } = t,
        r = t.params.creativeEffect,
        { progressMultiplier: n } = r,
        l = t.params.centeredSlides;
      if (l) {
        const e = a[0] / 2 - t.params.slidesOffsetBefore || 0;
        s.transform(`translateX(calc(50% - ${e}px))`);
      }
      for (let s = 0; s < e.length; s += 1) {
        const a = e.eq(s),
          o = a[0].progress,
          d = Math.min(
            Math.max(a[0].progress, -r.limitProgress),
            r.limitProgress
          );
        let c = d;
        l ||
          (c = Math.min(
            Math.max(a[0].originalProgress, -r.limitProgress),
            r.limitProgress
          ));
        const p = a[0].swiperSlideOffset,
          u = [t.params.cssMode ? -p - t.translate : -p, 0, 0],
          h = [0, 0, 0];
        let m = !1;
        t.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
        let f = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1,
        };
        d < 0 ? ((f = r.next), (m = !0)) : d > 0 && ((f = r.prev), (m = !0)),
          u.forEach((e, t) => {
            u[t] = `calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d * n)}))`;
          }),
          h.forEach((e, t) => {
            h[t] = f.rotate[t] * Math.abs(d * n);
          }),
          (a[0].style.zIndex = -Math.abs(Math.round(o)) + e.length);
        const g = u.join(", "),
          v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
          w =
            c < 0
              ? `scale(${1 + (1 - f.scale) * c * n})`
              : `scale(${1 - (1 - f.scale) * c * n})`,
          b = c < 0 ? 1 + (1 - f.opacity) * c * n : 1 - (1 - f.opacity) * c * n,
          x = `translate3d(${g}) ${v} ${w}`;
        if ((m && f.shadow) || !m) {
          let e = a.children(".swiper-slide-shadow");
          if (
            (0 === e.length && f.shadow && (e = createShadow(r, a)), e.length)
          ) {
            const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
            e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
          }
        }
        const y = effectTarget(r, a);
        y.transform(x).css({ opacity: b }),
          f.origin && y.css("transform-origin", f.origin);
      }
    },
    setTransition: (e) => {
      const { transformEl: s } = t.params.creativeEffect;
      (s ? t.slides.find(s) : t.slides)
        .transition(e)
        .find(".swiper-slide-shadow")
        .transition(e),
        effectVirtualTransitionEnd({
          swiper: t,
          duration: e,
          transformEl: s,
          allSlides: !0,
        });
    },
    perspective: () => t.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !t.params.cssMode,
    }),
  });
}
function EffectCards(e) {
  let { swiper: t, extendParams: s, on: a } = e;
  s({ cardsEffect: { slideShadows: !0, transformEl: null, rotate: !0 } });
  effectInit({
    effect: "cards",
    swiper: t,
    on: a,
    setTranslate: () => {
      const { slides: e, activeIndex: s } = t,
        a = t.params.cardsEffect,
        { startTranslate: i, isTouched: r } = t.touchEventsData,
        n = t.translate;
      for (let l = 0; l < e.length; l += 1) {
        const o = e.eq(l),
          d = o[0].progress,
          c = Math.min(Math.max(d, -4), 4);
        let p = o[0].swiperSlideOffset;
        t.params.centeredSlides &&
          !t.params.cssMode &&
          t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`),
          t.params.centeredSlides &&
            t.params.cssMode &&
            (p -= e[0].swiperSlideOffset);
        let u = t.params.cssMode ? -p - t.translate : -p,
          h = 0;
        const m = -100 * Math.abs(c);
        let f = 1,
          g = -2 * c,
          v = 8 - 0.75 * Math.abs(c);
        const w =
            t.virtual && t.params.virtual.enabled ? t.virtual.from + l : l,
          b =
            (w === s || w === s - 1) &&
            c > 0 &&
            c < 1 &&
            (r || t.params.cssMode) &&
            n < i,
          x =
            (w === s || w === s + 1) &&
            c < 0 &&
            c > -1 &&
            (r || t.params.cssMode) &&
            n > i;
        if (b || x) {
          const e = (1 - Math.abs((Math.abs(c) - 0.5) / 0.5)) ** 0.5;
          (g += -28 * c * e),
            (f += -0.5 * e),
            (v += 96 * e),
            (h = -25 * e * Math.abs(c) + "%");
        }
        if (
          ((u =
            c < 0
              ? `calc(${u}px + (${v * Math.abs(c)}%))`
              : c > 0
              ? `calc(${u}px + (-${v * Math.abs(c)}%))`
              : `${u}px`),
          !t.isHorizontal())
        ) {
          const e = h;
          (h = u), (u = e);
        }
        const y = c < 0 ? "" + (1 + (1 - f) * c) : "" + (1 - (1 - f) * c),
          $ = `\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${
            a.rotate ? g : 0
          }deg)\n        scale(${y})\n      `;
        if (a.slideShadows) {
          let e = o.find(".swiper-slide-shadow");
          0 === e.length && (e = createShadow(a, o)),
            e.length &&
              (e[0].style.opacity = Math.min(
                Math.max((Math.abs(c) - 0.5) / 0.5, 0),
                1
              ));
        }
        o[0].style.zIndex = -Math.abs(Math.round(d)) + e.length;
        effectTarget(a, o).transform($);
      }
    },
    setTransition: (e) => {
      const { transformEl: s } = t.params.cardsEffect;
      (s ? t.slides.find(s) : t.slides)
        .transition(e)
        .find(".swiper-slide-shadow")
        .transition(e),
        effectVirtualTransitionEnd({ swiper: t, duration: e, transformEl: s });
    },
    perspective: () => !0,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !t.params.cssMode,
    }),
  });
}
Object.keys(prototypes).forEach((e) => {
  Object.keys(prototypes[e]).forEach((t) => {
    Swiper.prototype[t] = prototypes[e][t];
  });
}),
  Swiper.use([Resize, Observer]);
const modules = [
  Virtual,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Parallax,
  Zoom,
  Lazy,
  Controller,
  A11y,
  History,
  HashNavigation,
  Autoplay,
  Thumb,
  freeMode,
  Grid,
  Manipulation,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  EffectCreative,
  EffectCards,
];
Swiper.use(modules);
export default Swiper;
//# sourceMappingURL=swiper-bundle.esm.browser.min.js.map
