// Get Selected Item from Html
let select = {
  makePin: document.getElementById('makePin'),
  messageBody: document.getElementById('messageBody'),
  messageList: [],
  countMessage: document.getElementById('countMessage'),
  noMessage: document.getElementById('noMessage'),
  pinInput: document.getElementById('pinInput'),
  pinButton: document.getElementById('pinButton'),
  makeMatch: document.getElementById('makeMatch'),
  lockImage: document.getElementById('lockImage'),
  generatPin: '',
}

// Make Pin functionality
function makePin(){
  const pin = Math.floor(Math.random() * 1000000);
  if (pin.toString().length === 6 ) {
    return pin;
  }else{
    return makePin();
  }
}

// Generate Pin Message HTML
function generateHtml(pin){
  return `<div class="message d-flex align-items-center justify-content-around">
  <img src="./assets/images/message.png" alt="message">
  <div class="copy-message">
    <p>Use ${pin} for two-factor authentication to unlock The Door.</p>
    <a class="copyPin">Copy ${pin}</a>
    <a class="pinRead">make as read</a>
    </div>
    <button class="removeMessage bg-transparent"><img src="./assets/images/trash.png" alt="trash"></button>
</div>`;
}


// Generate Pin 
select.makePin.addEventListener('click', ()=>{
  const generatedPin = makePin();
  select.generatPin = generatedPin;
  const pinMessage = document.createElement('div');
  pinMessage.setAttribute('class', 'pin-message');
  pinMessage.innerHTML = generateHtml(generatedPin);
  select.messageList.push({item: generateHtml(generatedPin), makeAsRead: 0});
  if (select.messageList.length !== 0) {
    select.messageBody.appendChild(pinMessage);
    select.noMessage.setAttribute('class', 'hidden');
  }
  select.countMessage.innerText = select.messageList.length;
  // Copy the pin by clicking the button.
  const copyPin = document.getElementsByClassName('copyPin');
  for (const pin of copyPin) {
    pin.addEventListener('click', ()=>{
      let getpin = pin.innerText.split(' ');
      navigator.clipboard.writeText(getpin[1]);
      pin.classList.add('copied');
      pinMessage.classList.add('pin-read');
      select.messageList.makeAsRead = 1;
    });
  }
  // Make as read by clicking the button
  const makeRead = document.getElementsByClassName('pinRead');
  for (const read of makeRead) {
    read.addEventListener('click', ()=>{
      pinMessage.classList.add('pin-read');
      console.log(select.messageList.makeAsRead);
    });
  }

  // Remove the Message
  const msg = document.getElementsByClassName('removeMessage');
  for (const remove of msg) {
    remove.addEventListener('click', function(){
      select.messageBody.removeChild(remove.parentNode.parentNode);
    });
  }
});

// Get the input from the user to match the pin
select.pinButton.addEventListener('click', (event)=>{
  const number = event.target.innerText;
  let enterPin = select.pinInput;
  if (!isNaN(number)) {
    enterPin.value += number;
  }else{
    if (number === 'C') {
      enterPin.value = '';
    }else if (number === '⬅') {
      const deletes = enterPin.value.split('');
      deletes.pop();
      const remainingDigits = deletes.join('');
      enterPin.value = remainingDigits;
    }
  }
});

// Make a Match with user input value
select.makeMatch.addEventListener('click', ()=>{
  const userEnter = parseInt(select.pinInput.value);
  if (userEnter === select.generatPin) {
    select.lockImage.src = './assets/images/unlock.png';
    select.pinInput.value = '';
  }
});
