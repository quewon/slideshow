var container = document.getElementById("container");
var currentFrame = -1;
var previousFrame;
var log = [];

function init_slideshow() {
  next_frame();
  remove_previous();

  document.addEventListener("keydown", function(e) {
    if (e.repeat) return;
    if (e.code == "Space" || e.code == "ArrowRight") {
      next_frame();
    } else if (e.code == "ArrowLeft") {
      prev_frame();
    }
  });
  document.addEventListener("keyup", function(e) {
    if (e.code == "Space" || e.code == "ArrowRight") {
      remove_previous();
    } else if (e.code == "ArrowLeft") {
      remove_previous();
    }
  });
  document.addEventListener("blur", remove_previous);
}

function next_frame() {
  if (previousFrame != currentFrame) {
    remove_previous();
  }

  var next = next_slide(currentFrame);

  if (next != undefined && img(next)) {
    if (currentFrame != -1 && currentFrame != next) {
      log.push(currentFrame);
      clear_slide();
    }
    currentFrame = next;
    set_frame(currentFrame);
  }
}

function prev_frame() {
  var id = log.pop();
  if (id != undefined) {
    set_frame(id);
    previousFrame = currentFrame;
    currentFrame = id;
    clear_slide();
  }
}

function remove_previous() {
  if (img(currentFrame)) {
    if (previousFrame != currentFrame && previousFrame != undefined) {
      img(previousFrame).remove();
      canvas(previousFrame).remove();
    }
    previousFrame = currentFrame;

    img(currentFrame).classList.remove("fade");
    canvas(currentFrame).classList.remove("fade");
  }
}

function set_frame(id) {
  const frame = img(id);
  const c = canvas(id);

  frame.classList.add("fade");
  c.classList.add("fade");

  container.appendChild(frame);
  container.appendChild(c);
}
