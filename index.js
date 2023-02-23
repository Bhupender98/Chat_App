const friendsCollection = document.getElementById("friends-collection");
let activeUser = document.getElementById("active-user");
let messageContainer = document.getElementById("messages");
let chat = document.getElementById("chat");
let textarea = document.getElementById("textarea");
let messageBtn = document.getElementById("textarea-btn");
let messages = document.getElementById("messages");

window.addEventListener("resize", () => {
  if (screen.width > 480) {
    chat.style.cssText = `
  display: block; 
  width: 370px;
  height: 100%;
  border-right: 2px solid white;
`;
  }
  if (screen.width <= 480) {
    chat.style.display = "none";
  }
});
// getting data from json file
async function getData() {
  let fetchedData = await fetch("test.json");
  let data = await fetchedData.json();
  let person = data.datas;
  person[0].messages.push("Hey about");

  Object.entries(person).forEach((entry) => {
    const [key, value] = entry;
    let messages = value.messages;
    let html = `
      <a>
        <div class="friend">
          <div class="about-friend">
          <img src=${value.image} alt="avatar-image" />
            <div class="name-about">
              <p>${value.name}</p>
              <span>${value.about}</span>
              </div>
          </div>
          <div class="time-stamp">
            <p>${value.active}</p>
          </div>
        </div>
      </a>
  `;
    friendsCollection.innerHTML += html;
  });

  let friends = document.querySelectorAll(".friend");
  friends.forEach((friend, index) => {
    // getmessages(person[0].messages);
    friend.addEventListener("click", (e) => {
      if (screen.width <= 480) {
        hidechatsession();
      }
      messageContainer.innerHTML = "";
      let about = `
      <div class="image-name-about">
              <img src=${person[index].image} alt="active_user_image" />
              <div class="active-user-profile">
              <p>${person[index].name}</p>
                <span>${person[index].about}</span>
              </div>
            </div>
          `;
      activeUser.innerHTML = about;
      // send messages
      messageBtn.addEventListener("click", () => {
        const message = textarea.value;

        // Create new message list item
        const messageItem = document.createElement("div");
        // class of div 
        messageItem.className = "msg";
        // create p tag to show content 
        const msgText = document.createElement('p');
        // append the message to div 
        if(message !== ""){
          msgText.innerText = message;
          messageItem.append(msgText);
          // Add message item to message list
          messages.appendChild(messageItem);
        }
        // Clear message input
        textarea.value = "";
      });

      let mes = person[index].messages;
      getmessages(mes);
    });
  });
}
getData();

// get the messages from json
function getmessages(messages) {
  for (let msg = 0; msg < messages.length; msg++) {
    const element = messages[msg];
    let innermessages = `
          <div class="msg"> 
              <p>${messages[msg]}</p>
          </div>
    `;
    messageContainer.innerHTML += innermessages;
  }
}



// toggle button
const toggle = document.getElementById("toggle");
toggle.addEventListener("click", () => {
  let chat = document.getElementById("chat");
  chat.style.cssText = `
  display: block; 
  position: absolute;
  z-index: 1;
  width: 100%;
`;
});

// hide session section
const hide = document.getElementById("hidebutton");
hide.addEventListener("click", () => {
  chat.style.display = "none";
});
function hidechatsession() {
  chat.style.display = "none";
}
