import {dbank} from "../../declarations/dbank";

window.addEventListener("load", async function(){
  update();
});

document.querySelector("form").addEventListener("submit", async function() {
  event.preventDefault();

  console.log("Here");

  //const button = event.target.querySelector("#submit-btn");

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank.topUp(inputAmount);
  } else if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank.withdrawAmount(outputAmount);
  }
  
  await dbank.compound();

  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");
});

async function update() {
  const currentAmount = await dbank.checkBalence();
  console.log(currentAmount);
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}