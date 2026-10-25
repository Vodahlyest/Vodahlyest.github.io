/*
  ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
     СЭДКЭТ :: presave card :: скрипты (JavaScript 1.5)
  ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
*/

var CONFIG = {
  track:      "НАЗВАНИЕ ТРЕКА",
  vkUrl:      "https://vkvideo.ru/",
  ytUrl:      "https://www.youtube.com/",
  bonusVideo: "видео с историей создания трека",
  partner:    "НАШИ ДРУЗЬЯ",
  discount:   "100 РУБЛЕЙ СКИДКИ",
  event:      "КОНЦЕРТ СЭДКЭТ",
  promo:      "SADKAT100",
  ticketsUrl: "https://example.com/"
};
// ===============================================

function $(id) { return document.getElementById(id); }

function setStatus(t) {
  window.status = t;
  $("status").innerHTML = t;
}

function sadAlert(t) {
  alert(":'(  " + t);
}

// --- подставляем настройки в страницу ---
function fill() {
  $("trk1").innerHTML = "&laquo;" + CONFIG.track + "&raquo;";
  $("trk2").innerHTML = "&laquo;" + CONFIG.track + "&raquo;";
  $("bonusv").innerHTML = CONFIG.bonusVideo;
  $("partner").innerHTML = CONFIG.partner;
  $("discount").innerHTML = CONFIG.discount;
  $("event").innerHTML = CONFIG.event;
  $("promo").value = CONFIG.promo;
  $("tickets").href = CONFIG.ticketsUrl;
  $("nowplaying").innerHTML = "*** 1. СЭДКЭТ - " + CONFIG.track +
    " (03:33) *** 128 kbps *** 44 kHz *** stereo *** &lt;3 ***";
}

// --- переходы с "модемной" загрузкой ---
var current = "s1";
var loadTimer = null;

function go(id) {
  if (loadTimer) return;
  $(current).style.display = "none";
  $("loader").style.display = "block";
  setStatus("Загрузка страницы...");

  var row = $("cells");
  while (row.firstChild) row.removeChild(row.firstChild);
  var i, cells = [];
  for (i = 0; i < 25; i++) {
    var td = document.createElement("td");
    td.className = "cell";
    td.innerHTML = "&nbsp;";
    row.appendChild(td);
    cells[i] = td;
  }

  var n = 0;
  var phrases = ["пииии-кшшшш-трррр...", "рукопожатие с сервером...", "загрузка чувств...", "почти готово x_X"];
  loadTimer = setInterval(function () {
    if (n < cells.length) {
      cells[n].style.background = "#ff1493";
      $("loadtxt").innerHTML = phrases[Math.floor(n / 7)];
      n++;
    } else {
      clearInterval(loadTimer);
      loadTimer = null;
      $("loader").style.display = "none";
      $(id).style.display = "block";
      current = id;
      setStatus("Готово");
      window.scrollTo(0, 0);
    }
  }, 40);
}

function pick(p) {
  var w = $("watch");
  if (p == "vk") {
    w.href = CONFIG.vkUrl;
    w.innerHTML = "&#9654; СМОТРЕТЬ НА VK ВИДЕО";
  } else {
    w.href = CONFIG.ytUrl;
    w.innerHTML = "&#9654; СМОТРЕТЬ НА YOUTUBE";
  }
  $("copymsg").innerHTML = "&nbsp;";
  go("s3");
}

function copyCode() {
  var f = $("promo");
  var ok = false;
  f.focus();
  f.select();
  if (f.setSelectionRange) f.setSelectionRange(0, f.value.length);
  try {
    if (window.clipboardData && window.clipboardData.setData) {
      ok = window.clipboardData.setData("Text", f.value);
    } else {
      ok = document.execCommand("copy");
    }
  } catch (e) {
    ok = false;
  }
  $("copymsg").innerHTML = ok
    ? "<span class='lime'>СКОПИРОВАНО! &lt;3</span>"
    : "<span class='pink'>нажми Ctrl+C, браузер стесняется =(</span>";
  setStatus(ok ? "Промокод в буфере обмена" : "Выдели и скопируй вручную");
}

// --- мигание как у <blink> ---
function blinker() {
  var els = document.getElementsByTagName("span");
  var on = true;
  setInterval(function () {
    on = !on;
    for (var i = 0; i < els.length; i++) {
      if (els[i].className == "blink") {
        els[i].style.visibility = on ? "visible" : "hidden";
      }
    }
  }, 500);
}

function counter() {
  var m = document.cookie.match(/sadkat_visits=(\d+)/);
  var n = m ? parseInt(m[1], 10) + 1 : 1;
  var exp = new Date();
  exp.setFullYear(exp.getFullYear() + 1);
  document.cookie = "sadkat_visits=" + n + "; expires=" + exp.toGMTString() + "; path=/";
  var s = "" + n;
  while (s.length < 6) s = "0" + s;
  $("counter").innerHTML = s;
}

var TRAIL = 8;
var trail = [];
var mx = -100, my = -100;
var chars = ["*", "+", "&lt;3", "&#9734;", "x"];
var colors = ["#ff1493", "#ffffff", "#00ffff", "#ff66cc", "#99ff00"];

function initTrail() {
  for (var i = 0; i < TRAIL; i++) {
    var s = document.createElement("span");
    s.className = "trail";
    s.innerHTML = chars[i % chars.length];
    s.style.color = colors[i % colors.length];
    s.style.left = "-100px";
    s.style.top = "-100px";
    document.body.appendChild(s);
    trail[i] = { el: s, x: -100, y: -100 };
  }
  document.onmousemove = function (e) {
    e = e || window.event;
    if (e.pageX != null) {
      mx = e.pageX;
      my = e.pageY;
    } else {
      mx = e.clientX + document.body.scrollLeft;
      my = e.clientY + document.body.scrollTop;
    }
  };
  setInterval(function () {
    var px = mx + 10, py = my + 10;
    for (var i = 0; i < TRAIL; i++) {
      var t = trail[i];
      t.x += (px - t.x) * 0.45;
      t.y += (py - t.y) * 0.45;
      t.el.style.left = Math.round(t.x) + "px";
      t.el.style.top = Math.round(t.y) + "px";
      px = t.x + 6;
      py = t.y + 4;
    }
  }, 40);
}

function init() {
  fill();
  blinker();
  counter();
  initTrail();
  setStatus("Готово");
}
