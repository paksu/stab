const fs = require('fs');
const jsdom = require("jsdom");
const sha1 = require('sha1');
const { JSDOM } = jsdom;

const dom = new JSDOM(fs.readFileSync(process.argv[2], 'utf8'));
const { document } = dom.window;

// Filter out messages that do not contain "em" element, because also the message has class ".message"
const filterNonMessages = (messageDom) => messageDom.querySelector("em");
const parseMessageDom = (messageDom) => {
  const body = messageDom.querySelector(".body").innerHTML.replace(/<br>/g, "\n").trim();
  return {
    time: /in (\w+ 19\d\d)/.exec(messageDom.innerHTML)[1],
    from: messageDom.querySelector("em").textContent.trim(),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis nisl. Mauris lacus odio, commodo accumsan sollicitudin quis, sagittis vel sapien. Nunc rhoncus commodo ultrices. Suspendisse at magna sagittis, gravida elit vitae, semper orci. Aliquam quis risus vitae lacus commodo gravida. Proin sed pellentesque ante. Nam at magna id neque dictum rhoncus lobortis a lacus. Vestibulum eleifend, lacus ac semper scelerisque, nunc orci faucibus nulla, et consequat ipsum eros in sapien. Maecenas auctor justo lorem, ac lacinia turpis dictum nec.",
    id: sha1(Math.random())
  }
}

const res = [...document.querySelectorAll(".thread")].map(thread => {
  return {
    id: thread.id,
    subject: thread.querySelector(".subject h3").textContent,
    participants: [...thread.querySelectorAll(".subject .country-icon")]
      .map(n => n.className.replace(/country-icon\W+/, "")),
    messages: [...thread.querySelectorAll(".message")]
      .filter(filterNonMessages)
      .map(parseMessageDom)
  }
})

console.log(JSON.stringify(res, null, 2))
