const T = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) c(i);
  new MutationObserver((i) => {
    for (const r of i)
      if (r.type === "childList")
        for (const u of r.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && c(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(i) {
    const r = {};
    return (
      i.integrity && (r.integrity = i.integrity),
      i.referrerpolicy && (r.referrerPolicy = i.referrerpolicy),
      i.crossorigin === "use-credentials"
        ? (r.credentials = "include")
        : i.crossorigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function c(i) {
    if (i.ep) return;
    i.ep = !0;
    const r = o(i);
    fetch(i.href, r);
  }
};
T();
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (e) {
      window.setTimeout(e, 1e3 / 60);
    }
  );
})();
document.onselectstart = function () {
  return !1;
};
var n = document.getElementById("c"),
  s = n.getContext("2d"),
  y = window.devicePixelRatio,
  d = window.innerWidth,
  p = window.innerHeight;
n.width = d * y;
n.height = p * y;
s.scale(y, y);
var q = function (e, t) {
  return ~~(Math.random() * (t - e + 1) + e);
};
s.lineCap = "round";
var A = [];
document.getElementById("trail");
document.getElementById("clear");
function I(e, t) {
  var o = d / 2 - e,
    c = p / 2 - t,
    i = Math.sqrt(o * o + c * c),
    r = Math.atan2(c, o);
  A.push({
    x: e,
    y: t,
    lastX: e,
    lastY: t,
    hue: 0,
    colorAngle: 0,
    angle: r + Math.PI / 2,
    size: q(1, 3) / 2,
    centerX: d / 2,
    centerY: p / 2,
    radius: i,
    speed: (q(5, 10) / 1e3) * (i / 750) + 0.015,
    alpha: 1 - Math.abs(i) / d,
    draw: function () {
      (s.strokeStyle = "hsla(" + this.colorAngle + ",100%,50%,1)"),
        (s.lineWidth = this.size),
        s.beginPath(),
        s.moveTo(this.lastX, this.lastY),
        s.lineTo(this.x, this.y),
        s.stroke();
    },
    update: function () {
      var u = this.x,
        X = this.y;
      (this.lastX = this.x), (this.lastY = this.y);
      var w = d / 2,
        f = p / 2,
        m = u,
        h = X,
        P = f - h,
        C = w - m,
        v = -(P / C),
        H = Math.atan(v),
        l = Math.floor(H * (180 / Math.PI));
      m < w && h < f && (l += 180),
        m < w && h > f && (l += 180),
        m > w && h > f && (l += 360),
        h < f && v == "-Infinity" && (l = 90),
        h > f && v == "Infinity" && (l = 270),
        m < w && v == "0" && (l = 180),
        isNaN(l) && (l = 0),
        (this.colorAngle = l),
        (this.x = this.centerX + Math.sin(this.angle * -1) * this.radius),
        (this.y = this.centerY + Math.cos(this.angle * -1) * this.radius),
        (this.angle += this.speed);
    },
  });
}
function k(e) {
  var t = e.pageX - n.offsetLeft,
    o = e.pageY - n.offsetTop;
  I(t, o);
}
function B() {
  n.addEventListener("mousemove", k, !1);
}
function N() {
  n.removeEventListener("mousemove", k, !1);
}
n.addEventListener("mousedown", k, !1);
n.addEventListener("mousedown", B, !1);
n.addEventListener("mouseup", N, !1);
var F = 100;
for (; F--; ) I(d / 2, p / 2 + F * 2);
var O = function () {
  window.requestAnimFrame(O), s.clearRect(0, 0, d, p);
  for (var e = A.length; e--; )
    for (var t = A[e], o = 3; o--; ) t.update(), t.draw(s);
};
O();
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (e) {
      window.setTimeout(e, 1e3 / 60);
    }
  );
})();
var n = document.getElementById("canv"),
  a = n.getContext("2d"),
  b = (n.width = window.innerWidth),
  M = (n.height = window.innerHeight),
  L = b * 0.5,
  z = M * 0.5,
  g = [],
  E = 0;
window.addEventListener("load", Y);
window.addEventListener("resize", Y, !1);
function Y() {
  (n.width = b = window.innerWidth),
    (n.height = M = window.innerHeight),
    (n.style.position = "absolute"),
    (n.style.left = (window.innerWidth - b) * 0.01 + "px"),
    (n.style.top = (window.innerHeight - M) * 0.01 + "px");
}
function j() {
  E++, E % 6 && W(), window.requestAnimFrame(j);
}
j();
function W() {
  var e = {
    x: x(L - 1e3, L + 1e3),
    y: x(z - 1200, z + 1200),
    r: x(20, 80),
    spX: x(-1, 1),
    spY: x(-1, 1),
  };
  for (g.push(e); g.length > 100; ) g.shift();
  a.clearRect(0, 0, b, M);
  for (var t = 0; t < g.length; t++)
    (e = g[t]),
      (a.fillStyle = R()),
      a.beginPath(),
      a.arc(e.x, e.y, e.r, 0, Math.PI * 2, !0),
      (a.shadowBlur = 80),
      (a.shadowOffsetX = 2),
      (a.shadowOffsetY = 2),
      (a.shadowColor = R()),
      (a.globalCompositeOperation = "lighter"),
      a.fill(),
      (e.x = e.x + e.spX),
      (e.y = e.y + e.spY),
      (e.r = e.r * 0.96);
}
function R() {
  var e = Math.floor(Math.random() * 20),
    t = Math.floor(Math.random() * 20),
    o = Math.floor(Math.random() * 30);
  return "rgb(" + e + "," + t + "," + o + ")";
}
function x(e, t) {
  return Math.floor(Math.random() * (t - e + 1)) + e;
}

window.innerWidth < 700
  ? alert("This website is horizontal scroll oriented")
  : null;

console.log("wrold");
