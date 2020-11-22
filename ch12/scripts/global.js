function addLoadEvent(func) {
  let oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function insertAfter(newElement, targetElement) {
  let parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

function addClass(element, value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += ' ';
    newClassName += value;
    element.className = newClassName;
  }
}

function highlightPage() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  let headers = document.getElementsByTagName('header');
  if (headers.length == 0) return false;
  let navs = headers[0].getElementsByTagName('nav');
  if (navs.length == 0) return false;
  let links = navs[0].getElementsByTagName('a');
  let linkurl;
  for (let i=0; i<links.length; i++) {
    linkurl = links[i].getAttribute('href');
    if (window.location.href.indexOf(linkurl) != -1) {
      links[i].className = 'here';
      let linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute('id', linktext);
    }
  }
}

function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  let elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = '0px';
  }
  if (!elem.style.top) {
    elem.style.top = '0px';
  }
  let xpos = parseInt(elem.style.left);
  let ypos = parseInt(elem.style.top);
  let dist = 0;
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    dist = Math.ceil((final_x - xpos)/10);
    xpos += dist;
  }
  if (xpos > final_x) {
    dist = Math.ceil((xpos - final_x)/10);
    xpos -= dist;
  }
  if (ypos < final_y) {
    dist = Math.ceil((final_y - ypos)/10);
    ypos += dist;
  }
  if (ypos > final_y) {
    dist = Math.ceil((ypos - final_y)/10);
    ypos -= dist;
  }
  elem.style.left = xpos + 'px';
  elem.style.top = ypos + 'px';
  let repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('intro'))  return false;
  let intro = document.getElementById('intro');
  let slideshow = document.createElement('div');
  slideshow.setAttribute('id', 'slideshow');
  let preview = document.createElement('img');
  preview.setAttribute('src', 'images/slideshow.gif');
  preview.setAttribute('alt', 'a glimse of what awaits you');
  preview.setAttribute('id', 'preview');
  slideshow.appendChild(preview);
  insertAfter(slideshow, intro);
  //let links = intro.getElementsByTagName('a');
  let links = document.getElementsByTagName('a');
  let destination;
  for (let i=0; i<links.length; i++) {
    links[i].onmouseover = function() {
      destination = this.getAttribute('href');
      if (destination.indexOf('index.html') != -1) {
        moveElement('preview',0,0,5);
      }
      if (destination.indexOf('about.html') != -1) {
        moveElement('preview',-150,0,5);
      }
      if (destination.indexOf('photos.html') != -1) {
        moveElement('preview',-300,0,5);
      }
      if (destination.indexOf('live.html') != -1) {
        moveElement('preview',-450,0,5);
      }
      if (destination.indexOf('contact.html') != -1) {
        moveElement('preview',-600,0,5);
      }
    }
  }
  let frame = document.createElement('img');
  frame.setAttribute('src', 'images/frame.gif');
  frame.setAttribute('alt', '');
  frame.setAttribute('id', 'frame');
  slideshow.appendChild(frame);
}

function showSection(id) {
  let sections = document.getElementsByTagName('section');
  for (let i=0; i<sections.length; i++) {
    if (sections[i].getAttribute('id') != id) {
      sections[i].style.display = 'none';
    } else {
      sections[i].style.display = 'block';
    }
  }
}

function prepareInternalnav() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  let articles = document.getElementsByTagName('article');
  if (articles.length == 0) return false;
  let navs = articles[0].getElementsByTagName('nav');
  if (navs.length == 0) return false;
  let nav = navs[0];
  let links = nav.getElementsByTagName('a');
  for (let i=0; i<links.length; i++) {
    let sectionId = links[i].getAttribute('href').split('#')[1];
    if (!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = 'none';
    links[i].destination = sectionId;
    links[i].onclick = function() {
      showSection(this.destination);
      return false;
    }
  }
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);