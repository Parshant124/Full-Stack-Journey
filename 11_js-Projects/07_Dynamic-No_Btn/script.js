const yesBtn = document.getElementById("Yes-btn");
const noBtn = document.getElementById("No-btn");
const mainDiv = document.getElementById("mainDiv");
const btnDiv = document.getElementById("btnDiv");
const yesMsg = document.getElementById("yes-Msg");
const noMsgDisplay = document.getElementById("msgDisplay");

const messages = [
  "Nice try 😏",
  "Nope!",
  "Catch me if you can.",
  "Too slow!",
  "Almost had me!",
  "Try harder.",
  "Not today.",
  "Mission failed.",
  "Keep dreaming.",
  "You'll never click me.",
  "Wrong choice!",
  "I refuse.",
  "Think again.",
  "Are you sure about that?",
  "Persistence is impressive.",
  "You missed!",
  "Getting warmer...",
  "Still not happening.",
  "Give up already.",
  "Just click Yes ❤️",
];

const colors = [
  "#FF6B6B",
  "#FFD93D",
  "#6BCB77",
  "#4D96FF",
  "#B983FF",
  "#FF8FAB",
  "#00C2A8",
  "#F9A826",
  "#A0E7E5",
  "#F38BA0",
  "#7AE582",
  "#8EECF5",
  "#C77DFF",
  "#FFB703",
  "#90DBF4",
];

const yesButtonTexts = [
  "Yes",
  "Yes 😊",
  "Absolutely Yes",
  "Definitely Yes",
  "100% Yes",
  "I Mean Yes",
  "Why Not Yes?",
  "You Know You Want To 😏",
  "Just Click Me ❤️",
  "I'm The Better Choice",
  "Don't Be Shy 😄",
  "Make Me Happy 💖",
  "This One ⬅️",
  "Click Here 🥺",
  "Pretty Please 💕",
  "You Can't Resist 😌",
  "Accept ❤️",
  "Let's Go! 🎉",
  "Say Yes 💍",
  "YES!! ❤️",
];

const noButtonTexts = [
  "No",
  "No 😅",
  "Not Today",
  "Nope!",
  "Try Again",
  "Missed Me 😏",
  "Too Slow!",
  "Can't Catch Me",
  "Keep Trying",
  "Almost 😂",
  "Still No",
  "Never!",
  "Give Up 😎",
  "You Wish!",
  "Not Happening",
  "I'm Fast 💨",
  "Catch Me First",
  "You Lost 😜",
  "Seriously? 😂",
  "Impossible!",
];

let yesContentSize = 18;

noBtn.addEventListener('mouseenter', ()=>{

    const body = document.body;

    const width = body.clientWidth;
    const height = body.clientHeight;

    const randomX = Math.floor(Math.random() * (width - noBtn.offsetWidth));
    const randomY = Math.floor(Math.random() * (height - noBtn.offsetHeight));

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    noMsgDisplay.textContent = messages[Math.floor(Math.random() * messages.length)]
    noMsgDisplay.style.color = colors[Math.floor(Math.random() * colors.length)];
    yesBtn.textContent = yesButtonTexts[Math.floor(Math.random() * yesButtonTexts.length)]
    noBtn.textContent = noButtonTexts[Math.floor(Math.random() * noButtonTexts.length)]

    if(yesContentSize + 1 <= 30){
        yesContentSize += 1;
        yesBtn.style.fontSize = `${yesContentSize}px`
        noMsgDisplay.style.fontSize = `${yesContentSize}px`
    }
})


yesBtn.addEventListener('click', ()=>{
    mainDiv.classList.add('hidden');
    btnDiv.classList.add('hidden');
    yesMsg.classList.remove('hidden');
})