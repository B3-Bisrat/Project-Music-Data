import { getUserIDs, getListenEvents } from "./data.mjs";

window.onload = function () {
  const userSelect = document.querySelector("#user-select");
  const results = document.querySelector("#results");
  const userIDs = getUserIDs();

  for (const userID of userIDs) {
    const option = document.createElement("option");

    option.value = userID;
    option.textContent = `User ${userID}`;

    userSelect.appendChild(option);
  }

  userSelect.addEventListener("change", function () {
    const selectedUserID = userSelect.value;
    const listenEvents = getListenEvents(selectedUserID);

    results.textContent = `User ${selectedUserID} has ${listenEvents.length} listening events.`;
  });
};
