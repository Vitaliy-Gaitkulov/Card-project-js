"use strict";
//new URL('https://www.facebook.com/DwayneJohnson'); // {hostname}

const supportedSocialNetworks = new Map()
  .set("www.facebook.com", "fa fa-facebook")
  .set("twitter.com", "fa fa-twitter")
  .set("www.instagram.com", "fa fa-instagram");
// key - hostname

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam numquam facere deleniti optio non voluptatem. Autem voluptatum perspiciatis voluptas non.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam numquam facere deleniti optio non voluptatem. Autem voluptatum perspiciatis voluptas non.";
const cardContainer = document.getElementById("root"); // ul

const cards = responseData.map((place) => createPlaceCardElement(place)); // создаем li

cardContainer.append(...cards); // добавляем li в ul

/**
 *
 * @param {object} place
 * @returns {HTMLLIElement}
 */
function createPlaceCardElement(place) {
  const { firstName, lastName, contacts } = place;

  const p = createElement("p", { classNames: ["cardDescription"] }, [
    document.createTextNode(lorem || ""),
  ]);

  const h2 = createElement("h2", { classNames: ["cardName"] }, [
    document.createTextNode(firstName + " " + lastName),
  ]);

  const img = createCardImage(place);

  const ulListElement = createUlElement(contacts);

  const article = createElement("article", { classNames: ["cardContainer"] }, [
    img,
    h2,
    p,
    ulListElement,
  ]);

  const wrapper = createElement("li", { classNames: ["cardWrapper"] }, [
    article,
  ]);

  return wrapper; //htmllielement
}

function createUlElement(contacts) {
  const ulList = document.createElement("ul");
  ulList.classList.add("ulLinks");

  const li = contacts.map((contact) => {
    const { hostname } = new URL(contact);

    const cssClasses = supportedSocialNetworks.get(hostname);
    const a = document.createElement("a");
    a.setAttribute("href", contact);
    if(cssClasses === undefined){
      a.setAttribute("class", 'fa fa-google');
    }else{
      a.setAttribute("class", cssClasses);
    }
    
    return a;
  });
  ulList.append(...li);
  return ulList;
}

function createCardImage(place) {
  const { firstName, lastName, id } = place;

  const imageWrapper = document.createElement("div");
  imageWrapper.setAttribute("id", `wrapper${id}`); // устанавливаем  id для контейнер картинки
  imageWrapper.classList.add("imageWrapper");
  imageWrapper.style.backgroundColor = stringToColour(firstName);

  const initials = document.createElement("div");
  initials.classList.add("imagePlaceholder", "imagePlacement");
  initials.append(document.createTextNode(firstName[0] || ""));

  createImage(place);

  imageWrapper.append(initials);
  return imageWrapper;
}

function createImage({ profilePicture, firstName, id }) {
  const img = document.createElement("img"); // = new Image();
  img.setAttribute("src", profilePicture);
  img.setAttribute("alt", firstName);
  img.dataset.id = id; // даём картинки её id
  img.classList.add("cardImage", "imagePlacement");
  img.addEventListener("error", imageErrorHandler);
  img.addEventListener("load", imageLoadHandler);
}

/* 
  EVENT LISTENERS
*/
function imageErrorHandler({ target }) {
  target.remove();
}

function imageLoadHandler({
  target: {
    dataset: { id },
  },
  target,
}) {
  document.getElementById(`wrapper${id}`).append(target);
}

/* 
  UTILS
*/

// DONT TRUST THIS CODE. TAKEN FROM STACKOVERFLOW
function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}

/* 

  LIB

*/
/**
 *
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames
 * @param {object} options.attributes
 * @param {function} options.onClick
 * @param {HTMLElement[]} children
 */
function createElement(type, { classNames, onClick, attributes }, children) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  elem.onclick = onClick;

  elem.append(...children);
  return elem;
}
/* 
ПРИМЕР ВЫЗОВА ФУНКЦИИ
const img = createElement('img', {
  attributes: {
    src: 'src',
    alt: '',
    title: '',
    id:'1',
  },
}); */
