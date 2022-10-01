const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const hint = document.getElementById('hint');
const hintBtn = document.getElementById('hint-button');
const hintMsg = document.getElementById('hint-message');

const easyBtn = document.getElementById('easy-button');
const mediumBtn = document.getElementById('medium-button');
const hardBtn = document.getElementById('hard-button');

const figureParts= document.querySelectorAll(".figure-part");

const completion = document.getElementById('complete-container');

let words = [];
let wordBank = [];

let easyWords = [ ['apple','I keep the doctor away'], 
                ['wizard','I can cast spells'],
                ['cat','I am a pet which meows'], 
                ['firefighter','I save lives and fight fire'], 
                ['airplane','I fly high in the sky'],
                ['singapore','I am a little red dot on the world map']];

let mediumWords = [['application','I appear everywhere on your phone'],
                    ['programming','IS students do this all the time'],
                    ['skyscraper','I am a really tall building'],
                    ['interface','I am a platform'],
                    ['astronaut','Space explorers'],
                    ['avalanche','I am made up of snow and you should run when you see me']];

let hardWords = [['abstruse','Difficult to understand'],
                    ['assiduous','Marked by care and persistent effort'],
                    ['blandishment','Flattery intended to persuade'],
                    ['camaraderie','The quality of affording easy familiarity and sociability'],
                    ['dogmatic','Pertaining to a code of beliefs accepted as authoritative'],
                    ['fallacious','Containing or based on incorrect reasoning']];

let randomNum;
let selectedWord;
let hintWord;

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display= 'flex';
        wordBank.push(selectedWord);
    }
}

// Update the wrong letters
function updateWrongLetterE1(){
    //Display wrong letters
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Display parts
    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = `Unfortunately you lost. \nThe word is ${selectedWord}.😕`;
        popup.style.display = 'flex';
        wordBank.push(selectedWord);
    }
}

//Show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Keydown letter press
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else{
                showNotification();
            }
        }
    }
});

//Refresh the page
function restart(){
    hint.style.display = 'block';
    correctLetters.splice(0);
    wrongLetters.splice(0);
    let carryOn = false;
    for(let info of words){
        if(wordBank.indexOf(info[0]) < 0){
            carryOn = true;
        }
    }
    if(carryOn){
        randomNum = Math.floor(Math.random() * words.length);
        while(wordBank.indexOf(words[randomNum][0]) > -1){
            randomNum = Math.floor(Math.random() * words.length);
        }
        selectedWord = words[randomNum][0];
        hintWord = words[randomNum][1];
        if(words == easyWords){
            easyBtn.style.boxShadow = '0px 0px 5px 2px rgb(68, 239, 102)';
            mediumBtn.style.boxShadow = 'none';
            hardBtn.style.boxShadow = 'none';
        }else if(words == mediumWords){
            mediumBtn.style.boxShadow = '0px 0px 5px 2px rgb(223, 235, 56)';
            easyBtn.style.boxShadow = 'none';
            hardBtn.style.boxShadow = 'none';
        }else if(words == hardWords){
            hardBtn.style.boxShadow = '0px 0px 5px 2px rgb(239, 108, 68)';
            easyBtn.style.boxShadow = 'none';
            mediumBtn.style.boxShadow = 'none';
        }
    }else{
        completion.classList.add('show');
        setTimeout(() => {
            completion.classList.remove('show');
        }, 4000);
        if(words == easyWords){
            easyBtn.style.display = 'none';
        }else if(words == mediumWords){
            mediumBtn.style.display = 'none';
        }else if(words == hardWords){
            hardBtn.style.display = 'none';
        }
        hint.style.display = 'none';
        selectedWord = "";
    }
    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
    hintMsg.style.display = 'none';
    hintBtn.style.display = 'block';   
}

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //Empty arrays
    restart()
});

//Hint function
hintBtn.addEventListener('click', ()=>{
    hintMsg.innerHTML = hintWord;
    hintMsg.style.display = 'flex';
    hintBtn.style.display = 'none';
})

//Set difficulty
easyBtn.addEventListener('click', ()=>{
    words = easyWords;
    restart()
})
mediumBtn.addEventListener('click', ()=>{
    words = mediumWords;
    restart()
})
hardBtn.addEventListener('click', ()=>{
    words = hardWords;
    restart()
})