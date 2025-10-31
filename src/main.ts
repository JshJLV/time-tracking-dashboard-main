import { getUserActivity } from "./get-users";
import type { UserActivity } from "./types/types";

const dashboard = document.querySelector<HTMLDivElement>("#dashboard");
const filteredButtons = document.querySelectorAll<HTMLButtonElement>(
  ".profile-card__button"
);
let activities: UserActivity[] | null = null;
let defaultButton: HTMLButtonElement;

const createCard = (activities: UserActivity[], defaultTimeframe: string) => {
  if (!dashboard) return;

  activities.forEach((activity) => {
    const article = document.createElement("article");
    article.className = "activity-card";
    article.innerHTML = `
      <div class="activity-card__background activity-card__background--${
        activity.title == "Self Care"
          ? "self-care"
          : activity.title.toLowerCase()
      }">
        <img
          src="/src/images/icon-${
            activity.title == "Self Care" ? "self-care" : activity.title
          }.svg"
          class="activity-card__icon"
          alt="${activity.title} icon"
        />
      </div>
      <div class="activity-card__content">
        <div class="activity-card__header">
          <p class="activity-card__name-activity">${activity.title}</p>
          <button class="activity-card__button">
            <img src="/src/images/icon-ellipsis.svg" alt="icon ellipsis" />
          </button>
        </div>
        <div class="activity-card__timeframes">
          <p class="activity-card__current">${
            activity.timeframes[defaultTimeframe].current
          }hrs</p>
          <p class="activity-card__previus">Last Week - ${
            activity.timeframes[defaultTimeframe].previous
          }hrs</p>
        </div>
      </div>
    `;

    dashboard.appendChild(article);
  });
};

const filterActivities = (timeframe: EventTarget | null) => {
  document.querySelectorAll(".activity-card__timeframes").forEach((card, i) => {
    card.children[0].textContent = `${
      activities[i].timeframes[timeframe.id].current
    }hrs`;
    card.children[1].textContent = `Last Week - ${
      activities[i].timeframes[timeframe.id].previous
    }hrs`;
  });
};

const loadActivities = async () => {
  const defaultTimeframe = "weekly";
  if (!activities) {
    activities = await getUserActivity();
    createCard(activities, defaultTimeframe);
  }

  filteredButtons.forEach((button) => {
    if (button.id === defaultTimeframe) {
      button.classList.add("profile-card__button--active");
      defaultButton = button;
    }

    button.addEventListener("click", (e) => {
      filterActivities(e.target);
      const target = e.target as HTMLButtonElement;
      if (target.id !== defaultButton.id) {
        defaultButton.classList.remove("profile-card__button--active");
        target.classList.add("profile-card__button--active");
        defaultButton = target;
      }
    });
  });
};

loadActivities();
