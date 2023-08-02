var _images = {};
function load_images(images, onload) {
  _images = images;
  var loadedImages = 0;
  var totalImages = Object.keys(images).length;

  for (let name in images) {
    var img = new Image();
    img.src = images[name];
    img.setAttribute("draggable", false);
    img.onload = function() {
      _images[name] = this;
      loadedImages++;
      if (loadedImages >= totalImages) {
        if (onload) onload();
      }
    }
  }
}

function img(name) {
  return _images[name];
}
