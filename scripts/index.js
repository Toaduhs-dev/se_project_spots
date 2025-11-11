const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescription = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

const profileNameEl = document.querySelector(".profile__name");
const profileAboutEl = document.querySelector(".profile__about");

editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescription.value = profileAboutEl.textContent;
});

editProfileCloseButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

// Simple: handle edit profile form submit (update DOM only)
// NOTE: All Comment text with ".trim" is an AI fix but all was written by me just reorganized by AI.
// I was having problems with the code and it saving the values when trying to edit the name. Had to use AI to fix this but I had it explain it to me.
// Some of this code was also helped by a tutor.
if (editProfileModal) {
  const editProfileForm = editProfileModal.querySelector(".modal__form");
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", function (evt) {
      evt.preventDefault();
      const name = editProfileNameInput
        ? editProfileNameInput.value.trim()
        : "";
      const about = editProfileDescription
        ? editProfileDescription.value.trim()
        : "";
      console.log("Edit Profile submitted:", { name, about });
      if (editProfileNameInput && profileNameEl)
        profileNameEl.textContent = name || profileNameEl.textContent;
      if (editProfileDescription && profileAboutEl)
        profileAboutEl.textContent = about || profileAboutEl.textContent;
      editProfileModal.classList.remove("modal_is-opened");
    });
  }
}

if (newPostButton && newPostModal && newPostCloseButton) {
  newPostButton.addEventListener("click", function () {
    newPostModal.classList.add("modal_is-opened");
  });

  //Below was and AI fix alongside some of my code.
  // I could not get the New Post Button to function properly and kept getting console errors.
  // Also lines 117-122 are fully AI generated.
  newPostCloseButton.addEventListener("click", function () {
    newPostModal.classList.remove("modal_is-opened");
  });
} else {
  console.warn("New post modal or buttons not found:", {
    newPostButton,
    newPostModal,
    newPostCloseButton,
  });
}

if (newPostModal) {
  const newPostForm = newPostModal.querySelector(".modal__form");
  const imageInput = newPostModal.querySelector("#card-image-input");
  const captionInput = newPostModal.querySelector("#card-caption-input");
  const cardsList = document.querySelector(".cards__list");
  if (newPostForm && imageInput && captionInput && cardsList) {
    newPostForm.addEventListener("submit", function (evt) {
      evt.preventDefault();
      const link = imageInput.value.trim();
      const name = captionInput.value.trim();
      console.log("New Post submitted:", { name, link });
      if (!link || !name) return; // require both
      const li = document.createElement("li");
      li.className = "card";
      li.innerHTML = `\n        <img src="${link}" alt="${name}" class="card__image"/>\n        <div class="card__content">\n          <h2 class="card__title">${name}</h2>\n          <button type="button" class="card__like-button"></button>\n        </div>\n      `;
      cardsList.insertBefore(li, cardsList.firstChild);
      newPostForm.reset();
      newPostModal.classList.remove("modal_is-opened");
    });
  }
}

initialCards.forEach(function (card) {
  console.log(card.name);
  console.log(card.link);
});
