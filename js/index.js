const testingUserData = {
  incomingRequest: {
    ID: ["Elytron", "GamerShadow", "gamer", "Devil"],
  },
  friendList: {
    ID: ["Elytron", "GamerShadow", "gamer"],
  },
  message: {},
};

fetchFriendList();

function addUserPopupOpen() {
  const ele = document.querySelector("#add-friend-pop-up");
  ele.classList.remove("hidden-popup");
}

function addUserPopupClose() {
  const ele = document.querySelector("#add-friend-pop-up");
  ele.classList.add("hidden-popup");
}

function fetchFriendList() {
  const list = document.getElementById("dm-list");
  for (let i = 0; i < testingUserData.friendList.ID.length; i++) {
    let element = document.createElement("div");
    element.innerHTML = `
    <div class="user-btn">
    <div class="user-image">
        <br />
        <img src="./src/img/logo/discord.png" alt="">
    </div>
    <div class="user-userid">
        <br />
        <h2>${testingUserData.friendList.ID[i]}</h2>
    </div>
  </div>
    `;
    list.append(element);
  }
}

function fetchIncomingRequest() {}
