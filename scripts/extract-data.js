const getContent = (threadId) => {
   return fetch(`pressthread/${threadId}`, {credentials: 'include'}).then(response => response.text())
}

const displayMessages = (data) => {
   const display = document.createElement("textarea")
   display.style.cssText = `
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      left: 0;
      z-index: 10000;
      width: 100%;
      height: 100%;
      background: #fff;
      margin: 25px;
      overflow: scroll;
`;
   display.value = data;
   document.body.appendChild(display);
}

Promise.all(
   [... document.querySelectorAll(".thread-listing")]
     .map(a => a.id)
     .filter(a => a)
     .map(id => id.split("_")[1])
     .map(getContent)
)
.then(messages => messages.reduce((text, message) => text + message, ""))
.then(messages => displayMessages(messages))
