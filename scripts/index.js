class Activity {
  constructor({ id, title, description, imgUrl }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
  }
  getAllActivities() {
    return this.activities;
  }
  createActivity(obj) {
    let activity = new Activity({ id: this.activities.length + 1, ...obj });
    this.activities.push(activity);
  }
  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id !== id);
    this.activities.forEach((activity, index) => {
      activity.id = index + 1;
    });
  }
}

let myRepository = new Repository();

function createActivityHTML(obj) {
  const { id, title, description, imgUrl } = obj;

  const cardTitle = document.createElement("h3");
  const cardDesc = document.createElement("p");
  const cardImg = document.createElement("img");
  const card = document.createElement("div");
  const delBtn = document.createElement("button");

  cardTitle.innerText = title;
  cardTitle.classList.add("card_title");

  cardDesc.innerText = description;
  cardDesc.classList.add("card_desc");

  cardImg.setAttribute("src", imgUrl);
  cardImg.classList.add("card_img");

  delBtn.innerText = "Borrar actividad";
  delBtn.classList.add("del_btn");

  function deleteCard() {
    myRepository.deleteActivity(id);

    activityToHTML();

    if (myRepository.getAllActivities().length === 0) {
      const container = document.getElementById("cards_container");
      const text = document.createElement("p");
      text.innerText = "¡No hay actividades que mostrar!";
      container.appendChild(text);
    }
  }

  delBtn.addEventListener("click", deleteCard);

  card.id = "card_container";
  card.appendChild(cardTitle);
  card.appendChild(cardImg);
  card.appendChild(cardDesc);
  card.appendChild(delBtn);

  return card;
}

function activityToHTML() {
  const container = document.getElementById("cards_container");

  container.innerHTML = "";

  let activitiesHTML = myRepository.getAllActivities().map(createActivityHTML);

  activitiesHTML.forEach((activity) => container.appendChild(activity));
}

function handler(event) {
  event.preventDefault();

  const titleInput = document.getElementById("hobbie_name");
  const descriptionInput = document.getElementById("hobbie_desc");
  const imgUrlInput = document.getElementById("hobbie_img");

  const obj = {
    title: titleInput.value,
    description: descriptionInput.value,
    imgUrl: imgUrlInput.value,
  };

  if (!obj.title || !obj.description || !obj.imgUrl) {
    alert("Faltan campos que llenar");
    return;
  }

  myRepository.createActivity(obj);

  activityToHTML();
}

const activityAddBtn = document.getElementById("add_hobbie_btn");
activityAddBtn.addEventListener("click", handler);

module.exports = { Activity, Repository };
