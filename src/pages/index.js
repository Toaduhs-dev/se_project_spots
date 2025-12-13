import "../pages/index.css";
import "../scripts/validation.js";
import {
  enableValidation,
  validationConfig,
  resetValidation,
  hasInvalidInput,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "227608dc-7e64-4ef8-bb48-b1a4e92b6004",
    "Content-Type": "application/json",
  },
});

let currentSelectorCard = "";
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const avatarBtn = document.querySelector(".profile__avatar-btn");

const newPostBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const newPostNameInput = newPostModal.querySelector("#card-caption-input");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");

const profileNameEl = document.querySelector(".profile__name");
const profileAboutEl = document.querySelector(".profile__about");

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitButton = avatarModal.querySelector(".modal__button");
const avatarModalCloseButton = avatarModal.querySelector(
  ".modal__close-button"
);
const avatarPicture = document.querySelector(".profile__image");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button"
);
const modalCancelButton = document.querySelector(".close__delete-modal");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const avatarModalBtn = document.querySelector(".profile__avatar-btn");

const deleteModal = document.querySelector("#delete__modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const closeDeleteModal = deleteModal.querySelector(".modal__close-button");

const previewImageElement = previewModal.querySelector(".modal__image");
const previewCaptionElement = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  if (cardImageElement) {
    cardImageElement.src = data.link;
    cardImageElement.alt = data.name;
  }

  if (cardTitleElement) {
    cardTitleElement.textContent = data.name;
  }

  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");
  if (cardLikeButtonElement) {
    cardLikeButtonElement.addEventListener("click", () => {
      cardLikeButtonElement.classList.toggle("card__like-button_active");
    });
  }

  const cardDeleteButtonElement = cardElement.querySelector(
    ".card__delete-button"
  );
  cardDeleteButtonElement.addEventListener("click", (evt) => {
    openDeleteModal(evt);
  });

  const openDeleteModal = (evt) => {
    evt.target.closest(".card").remove();
    openModal(deleteModal);
  };

  deleteForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    evt.target.closest(".card").remove();
    closeModal(deleteModal);
    currentSelectorCard = null;
  });

  cardImageElement.addEventListener("click", () => {
    previewImageElement.src = data.link;
    previewImageElement.alt = data.name;
    previewCaptionElement.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileAboutEl.textContent;
  resetValidation(
    editProfileFormEl,
    Array.from(editProfileFormEl.querySelectorAll(".modal__input")),
    validationConfig
  );
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
  resetValidation(
    newPostFormEl,
    Array.from(newPostFormEl.querySelectorAll(".modal__input")),
    validationConfig
  );
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

previewModalCloseButton.addEventListener("click", function () {
  closeModal(previewModal);
});

avatarModalCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
});

//Need to add Delete Card event?
//Need Liking cards
//Need Loading text
//Need Pull Request Demo
//Add Styling

const editProfileFormEl = editProfileModal.querySelector(".modal__form");

function handleProfileFormSubmit(evt) {
  if (!editProfileFormEl.checkValidity()) {
    return;
  }
  evt.preventDefault();
  api
    .editUserInfo({ name: "test", about: "test" })
    .then((data) => {
      //Use data argument instead of the input values
      editProfileNameInput.value === profileNameEl.textContent;
      editProfileDescriptionInput.value === profileAboutEl.textContent;
      profileNameEl.textContent = editProfileNameInput.value;
      profileAboutEl.textContent = editProfileDescriptionInput.value;
      closeModal(editProfileModal);
    })
    .catch(console.error);
}
closeDeleteModal.addEventListener("click", () => closeModal(deleteModal));

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const caption = newPostNameInput.value;
  const link = newPostLinkInput.value;
  console.log(caption);
  console.log(link);

  const cardElement = getCardElement({ name: caption, link: link });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (evt) => openModal(deleteModal));

  if (hasInvalidInput([newPostNameInput, newPostLinkInput])) {
    return;
  }
  if (cardsList && cardElement) {
    cardsList.prepend(cardElement);
  }

  closeModal(newPostModal);
  newPostFormEl.reset();
  resetValidation(
    newPostFormEl,
    Array.from(newPostFormEl.querySelectorAll(".modal__input")),
    validationConfig
  );
}

api
  .getAppInfo()
  .then(([cards, userData]) => {
    profileAboutEl.textContent = userData.about;
    profileNameEl.textContent = userData.name;
    avatarPicture.src = userData.avatar;
    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });
  })
  .catch((err) => console.error(`An error occurred when loading data: ${err}`));

editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);
newPostFormEl.addEventListener("submit", handleAddCardSubmit);

enableValidation(validationConfig);
