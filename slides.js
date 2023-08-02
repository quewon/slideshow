var slide_data = {
  1: {
    next: 1,
    mission: slideMission("you gotta write your name to continue", 50, 58),
    rects: [
      { x: 148, y: 495, w: 732, h: 74, next: 2 }
    ]
  },
  // 3: {
  //   next: 3,
  //   mission: slideMission("your age, please", 46, 23),
  //   rects: [
  //     { x: 118, y: 162, w: 472, h: 105, next: 4 }
  //   ]
  // },
  // 5: {
  //   next: 5,
  //   mission:
  // },
  6: {
    mission: slideMission("this isn't a link ;)", 54, 40),
    rects: [
      { x: 426, y: 355, w: 49, h: 26, mission: true }
    ]
  },
  13: {
    next: 13,
    mission: slideMission("mark any one of the checkboxes", 50, 58),
    rects: [
      { x: 310, y: 484, w: 77, h: 57, next: 14 },
      { x: 580, y: 476, w: 77, h: 65, next: 26 }
    ]
  },
  19: {
    next: 19,
    mission: slideMission("mark any one of the checkboxes", 62, 90),
    rects: [
      { x: 497, y: 807, w: 90, h: 70, next: 22 },
      { x: 699, y: 815, w: 100, h: 69, next: 20 }
    ]
  },
  21: {
    next: 23
  },
  25: {
    next: 25,
    mission: slideMission("mark any one of the checkboxes", 50, 63),
    rects: [
      { x: 160, y: 509, w: 84, h: 72, next: 37 },
      { x: 601, y: 527, w: 56, h: 54, next: 37 }
    ]
  },
  35: {
    next: 35,
    mission: slideMission("mark any one of the checkboxes", 50, 63),
    rects: [
      { x: 265, y: 447, w: 56, h: 42, next: 36 },
      { x: 261, y: 524, w: 50, h: 48, next: 37 }
    ]
  }
};

function slideMission(text, x, y) {
  const el = document.createElement("div");
  el.classList.add("mission");
  el.style.left = (x || 50)+"%";
  el.style.top = (y || 50)+"%";
  el.textContent = text;
  return el;
}

var previousBlocked;
function next_slide(slide) {
  const data = slide_data[slide];

  if (data && data.next) {
    if (data.next == slide) {
      data.blocked = true;
      container.appendChild(data.mission);
      previousBlocked = slide;
    } else {
      data.blocked = false;
      data.mission.remove();
    }
    return data.next;
  }

  return slide+1;
}

function clear_slide() {
  if (previousBlocked) {
    slide_data[previousBlocked].blocked = false;
    slide_data[previousBlocked].mission.remove();
    previousBlocked = null;
  }
}

function mark_slide(slide, x, y) {
  const data = slide_data[slide];
  if (!data) return;
  const rects = data.rects;
  if (!rects) return;

  var selected;
  for (let i=0; i<data.rects.length; i++) {
    const r = data.rects[i];
    if (
      x >= r.x && x <= r.x + r.w &&
      y >= r.y && y <= r.y + r.h
    ) {
      if (r.next) {
        data.next = r.next;
        if (data.blocked) {
          data.mission.remove();
        }
      } else if (r.mission) {
        container.appendChild(data.mission);
        previousBlocked = slide;
      }
      data.blocked = false;
      selected = i;
      break;
    }
  }

  if (selected != null && data.rects.length>1) {
    for (let i=0; i<data.rects.length; i++) {
      if (i==selected) continue;
      const r = data.rects[i];
      canvas(slide).__context.clearRect(r.x, r.y, r.w, r.h);
    }
  }
}

function draw_slide(context, slide) {

}
