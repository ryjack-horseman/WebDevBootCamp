
var drums = document.querySelectorAll(".drum");
var numDrumBtns = drums.length;

for(var i = 0; i < numDrumBtns; i++){
    drums[i].addEventListener("click", function () {
        alert("I got clicked");
    });
}
