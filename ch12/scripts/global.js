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

function showPic(whichpic) {
  
  if (!document.getElementById('placeholder')) return true;
  let source = whichpic.getAttribute('href');
  let placeholder = document.getElementById('placeholder');
  placeholder.setAttribute('src', source);
  if (!document.getElementById('description')) return false;
  let text;
  //完全用let代替var,有时会出错，变量定义了却未使用。当变量在两个不同的作用域内时 
  if (whichpic.getAttribute('title')) {
    text = whichpic.getAttribute('title');
  } else {
    text = '';
  }
  let description = document.getElementById('description');
  if (description.firstChild.nodeType == 3) {
    description.firstChild.nodeValue = text;
  }

  return false;
}

function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('imagegallery')) return false;
  let placeholder = document.createElement('img');
  placeholder.setAttribute('id', 'placeholder');
  placeholder.setAttribute('src', 'images/placeholder.gif');
  placeholder.setAttribute('alt', 'my image gallery');
  let description = document.createElement('p');
  description.setAttribute('id', 'description');
  let desctext = document.createTextNode('Choose an image');
  description.appendChild(desctext);
  let gallery = document.getElementById('imagegallery');
  insertAfter(description, gallery);
  insertAfter(placeholder,description);
}

function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('imagegallery')) return false;
  let gallery = document.getElementById('imagegallery');
  let links = gallery.getElementsByTagName('a');
  for (let i=0; i<links.length; i++) {
    links[i].onclick = function() {
      return showPic(this);
    }
  }
}

function stripeTables() {
  if (!document.getElementsByTagName) return false;
  let tables = document.getElementsByTagName('table');
  for (let i=0; i<tables.length; i++) {
    let odd = false;
    let rows = tables[i].getElementsByTagName('tr');
    for (let j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j], 'odd');
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

function highlightRows() {
  if (!document.getElementsByTagName) return false;
  let rows = document.getElementsByTagName('tr');
  for (let i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className;
    rows[i].onmouseover = function() {
      addClass(this, 'highlight');
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName;
    }
  }
}

function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  let abbreviations = document.getElementsByTagName('abbr');
  if (abbreviations.length < 1) return false;
  let defs = new Array();
  for (let i=0; i<abbreviations.length; i++) {
    let current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    let definition = current_abbr.getAttribute('title');
    let key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  let dlist = document.createElement('dl');
  for (key in defs) {
    let definition = defs[key];
    let dtitle = document.createElement('dt');
    let dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    let ddesc = document.createElement('dd');
    let ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  let header = document.createElement('h3');
  let header_text = document.createTextNode('Abbreviations');
  header.appendChild(header_text);
  let articles = document.getElementsByTagName('article');
  if (articles.length == 0) return false;
  let container = articles[0];
  container.appendChild(header);
  container.appendChild(dlist);
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);