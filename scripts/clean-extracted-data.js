const fs = require('fs');
const jsdom = require("jsdom");
const sha1 = require('sha1');
const { JSDOM } = jsdom;

let allThreads = [];
let threadIds = {};

const htmlUnescape = (str) => {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

fs.readdirSync(process.argv[2], 'utf8').forEach(file => {
  const dom = new JSDOM(fs.readFileSync(process.argv[2] + file, 'utf8'));
  const { document } = dom.window;

  // Filter out messages that do not contain "em" element, because also the message has class ".message"
  const filterNonMessages = (messageDom) => messageDom.querySelector("em");
  const parseMessageDom = (messageDom) => {
    const body = htmlUnescape(messageDom.querySelector(".body").innerHTML.replace(/<br>/g, "\n").trim());
    return {
      time: /in (\w+ 19\d\d)/.exec(messageDom.innerHTML)[1],
      from: messageDom.querySelector("em").textContent.trim(),
      body: body,
      id: sha1(body)
    }
  }

  const threads = [...document.querySelectorAll(".thread")].map(thread => {
    return {
      id: thread.id,
      subject: thread.querySelector(".subject h3").textContent,
      participants: [...thread.querySelectorAll(".subject .country-icon")]
        .map(n => n.className.replace(/country-icon\W+/, "")),
      messages: [...thread.querySelectorAll(".message")]
        .filter(filterNonMessages)
        .map(parseMessageDom)
    }
  });

  threads.forEach(thread => {
    if(!threadIds[thread.id]) {
      allThreads.push(thread);
      threadIds[thread.id] = true;
    }
  });
});

console.log(JSON.stringify(allThreads, null, 2));
