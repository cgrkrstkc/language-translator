
const leftText = document.querySelector(".left__Text");
const rightText = document.querySelector(".right__Text");

const leftCopy = document.querySelector(".left__copy");
const rightCopy = document.querySelector(".right__copy");

const leftSpeaker = document.querySelector(".left__speaker");
const rightSpeaker = document.querySelector(".right__speaker");

const firstLanguage = document.querySelector(".first__language");
const secondLanguage = document.querySelector(".second__language");



const exchangeBtn = document.querySelector(".exchange");


const translateBtn = document.querySelector(".translate__btn");




//LEFT SPEAKER
function speakerLeft(){
    let utterance;
    utterance = new SpeechSynthesisUtterance(leftText.value)
    utterance.lang = firstLanguage[0].value
    speechSynthesis.speak(utterance)
    
}

leftSpeaker.addEventListener("click",speakerLeft)
//RIGHT SPEAKER
function speakerRight(){
    let utterance;
    utterance = new SpeechSynthesisUtterance(rightText.value)
    utterance.lang = secondLanguage[1].value
    speechSynthesis.speak(utterance)
    
}

rightSpeaker.addEventListener("click",speakerRight)

//LEFT COPY TO CLIPBOARD
function copyToLeft(){
    navigator.clipboard.writeText(leftText.value)
 }
 
 leftCopy.addEventListener("click",copyToLeft)
 


//RIGHT COPY TO CLIPBOARD
function copyToRight(){
    navigator.clipboard.writeText(rightText.value)
}

rightCopy.addEventListener("click",copyToRight)

//TRANSLATE LANGUAGES

//EXCHANGE LANGUAGES
function exchangeLanguage(){
    [rightText.value, leftText.value] = [leftText.value, rightText.value]

    let temp = firstLanguage.value;
    firstLanguage.value = secondLanguage.value;
    secondLanguage.value = temp

    /*
    console.log("first selected: ",  firstLanguage.value)
    console.log("second selected: ",  secondLanguage.value)
    console.log("left: ", left.value, "right: ", right.value)
    */
    /*
   let temp = String(leftText.value).toLowerCase();
   leftText.value = String(rightText.value).toLowerCase();
   rightText.value = temp;
   */
}

exchangeBtn.addEventListener("click", exchangeLanguage)


//SECTION - FETCHING DATA 

function getFetch(api){    
    fetch(api)
    .then(response => response.json())
    .then(data => {
        if (data.responseStatus) {
            rightText.value =  data.responseData.translatedText
            console.log(data)            
        } else {
            alert("The server doesn't respond properly, try again later")
        }
    })
    .catch(error => console.error())
}

//TRANSLATE WITH CLICK BUTTON
function translate(){
   
    let textValue = leftText.value,
    translateFrom = firstLanguage.value,
    translateTo = secondLanguage.value;

    let API = `https://api.mymemory.translated.net/get?q=${textValue}&langpair=${translateFrom}|${translateTo}`

    if(textValue.length > 1){
        rightText.value =  "Translating..."
        getFetch(API)        
    }else {
        alert("Please type a word longer than one letter")
        rightText.value =  "";
    }


}

translateBtn.addEventListener("click", translate)




//TRANSLATE WITH ENTER KEY
function translateWithEnte(e){ 
    let textValue = leftText.value,
    translateFrom = firstLanguage.value,
    translateTo = secondLanguage.value;

    let API = `https://api.mymemory.translated.net/get?q=${textValue}&langpair=${translateFrom}|${translateTo}`

    if(e.key === "Enter"){
        if(e.target.value.length > 1){
            rightText.value =  "Translating..."
            getFetch(API)        
        }else {
            alert("Please type a word longer than one letter")
            rightText.value =  "";
        }
    }else return;
        


}

leftText.addEventListener("keydown",(e)=>{
    translateWithEnte(e)
});
