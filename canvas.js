var overlay = document.getElementById("overlay").getContext("2d");
var _canvases = [];

var PI2 = Math.PI*2;
var canvasTransform = { x:0, y:0, sx: 0, sy: 0 };
var previousPosition;
var canvasMousedown = false;
var playerColor = "rgb(0, 0, 255)";

function load_canvases(images) {
  for (let name in images) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.__context = context;

    canvas.width = canvas.height = 1024;
    context.lineCap = "round";

    _canvases[name] = canvas;
  }
  overlay.canvas.width = overlay.canvas.height = 1024;

  document.addEventListener("keypress", function(e) {
    switch (e.code) {
      case "Digit1":
      case "KeyR":
        playerColor = "rgb(255, 0, 0)";
        break;
      case "Digit2":
      case "KeyO":
        playerColor = "rgb(255, 200, 0)";
        break;
      case "Digit3":
      case "KeyY":
        playerColor = "rgb(255, 255, 0)";
        break;
      case "Digit4":
      case "KeyG":
        playerColor = "rgb(0, 255, 0)";
        break;
      case "Digit5":
      case "KeyT":
        playerColor = "rgb(0, 255, 200)";
        break;
      case "Digit6":
      case "KeyC":
        playerColor = "rgb(0, 255, 255)";
        break;
      case "Digit7":
      case "KeyB":
        playerColor = "rgb(0, 0, 255)";
        break;
      case "Digit8":
      case "KeyV":
        playerColor = "rgb(200, 0, 255)";
        break;
      case "Digit9":
      case "KeyM":
        playerColor = "rgb(255, 0, 255)";
        break;
      case "Digit0":
      case "KeyP":
        playerColor = "rgb(255, 200, 255)";
        break;
    }
    for (let name in _canvases) {
      _canvases[name].__context.strokeStyle = playerColor;
    }
    overlay.strokeStyle = playerColor;
  });
  document.addEventListener("mousedown", canvas_mousedown);
  document.addEventListener("touchstart", function(e) {
    const x = (e.pageX - canvasTransform.x) * canvasTransform.sx;
    const y = (e.pageY - canvasTransform.y) * canvasTransform.sy;
    previousPosition = { x: x, y: y };
    if (e.touches) canvas_mousedown(e.touches[0], true);
  });
  document.addEventListener("mouseup", canvas_mouseup);
  document.addEventListener("touchend", function(e) {
    canvas_mouseup();
  });
  document.addEventListener("blur", canvas_mouseup);
  document.addEventListener("mousemove", canvas_move);
  document.addEventListener("touchmove", function(e) {
    if (e.touches) canvas_move(e.touches[0]);
  });
  document.addEventListener("contextmenu", function(e) { e.preventDefault() });

  window.addEventListener("resize", canvas_resize);
  canvas_resize();
  draw();
  setEraseMode(false);
}

function canvas_mousedown(e, touchstart) {
  if (!touchstart && e.button == 2) {
    setEraseMode(true);
  }
  const context = _canvases[currentFrame].__context;
  const x = (e.pageX - canvasTransform.x) * canvasTransform.sx;
  const y = (e.pageY - canvasTransform.y) * canvasTransform.sy;
  mark(context, x, y);
  canvasMousedown = true;
  if (!touchstart) overlay.canvas.classList.add("active");
}
function canvas_move(e) {
  if (currentFrame == -1) return;
  const x = (e.pageX - canvasTransform.x) * canvasTransform.sx;
  const y = (e.pageY - canvasTransform.y) * canvasTransform.sy;
  if (canvasMousedown) mark(_canvases[currentFrame].__context, x, y);
  previousPosition = { x: x, y: y };
}
function canvas_mouseup() {
  canvasMousedown = false;
  overlay.canvas.classList.remove("active");
  setEraseMode(false);
}

function mark(context, x, y) {
  context.beginPath();
  if (previousPosition) {
    context.moveTo(previousPosition.x, previousPosition.y);
  } else {
    context.moveTo(x, y);
  }
  context.lineTo(x, y);
  context.stroke();

  mark_slide(currentFrame, x, y);
}

function draw() {
  requestAnimationFrame(draw);
  overlay.clearRect(0, 0, overlay.canvas.width, overlay.canvas.height);
  overlay.beginPath();
  if (previousPosition) overlay.arc(previousPosition.x, previousPosition.y, overlay.__radius, 0, PI2);
  overlay.stroke();

  draw_slide(overlay, currentFrame);
}

function setEraseMode(value) {
  var strokeStyle;
  if (value == true) {
    strokeStyle = "black";
  } else {
    strokeStyle = playerColor;
  }

  for (let name in _canvases) {
    _canvases[name].__context.strokeStyle = strokeStyle;
    _canvases[name].__context.lineWidth = value ? 20 : 4;
    _canvases[name].__context.globalCompositeOperation = value ? "destination-out" : "source-over";
  }
  overlay.strokeStyle = strokeStyle;
  overlay.__radius = value ? 10 : 4;
}

function canvas(id) {
  return _canvases[id];
}

function canvas_resize() {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const min = Math.min(width, height);
  overlay.canvas.style.width = min+"px";
  canvasTransform.x = width/2 - min/2;
  canvasTransform.y = height/2 - min/2;
  canvasTransform.sx = 1024/min;
  canvasTransform.sy = 1024/min;
  container.style.width = min+"px";
}
