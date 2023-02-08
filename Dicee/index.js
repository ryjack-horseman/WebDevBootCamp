var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var fileName = "images/dice" + randomNumber1 + ".png";
document.querySelector(".img1").setAttribute("src", fileName);
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var fileName2 = "images/dice" + randomNumber2 + ".png";
document.querySelector(".img2").setAttribute("src", fileName2);
var resultString;
if(randomNumber1 === randomNumber2){
    resultString = "Draw!";
}else if(randomNumber1 > randomNumber2){
    resultString = "🚩 Player 1 Wins!";
}else{
    resultString = "Player 2 Wins! 🚩";
}
document.querySelector("h1").innerHTML = resultString;