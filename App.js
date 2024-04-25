const BASE_URL =
  "https://api.fastforex.io/convert?from";
  const api_key = "486ac4f2f3-a30b1a8ede-scgb09"

  const dropdowns = document.querySelectorAll(".dropdown select"); 
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select")
  const toCurr = document.querySelector(".To select")
  

 for (let select of dropdowns) {
    for (currCode in countryList){
       let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "PKR"){
            newOption.selected = "selected";
        }else if(select.name === "To" && currCode === "USD"){
            newOption.selected = "selected";
        }
        select.append(newOption);
      }
      select.addEventListener("change", (evt) => {
        updateFlag(evt.target);

      })
 }
 const exchangeRatesUpdate =async () =>{
    let amount = document.querySelector(".amount input")
    let amtvalue = amount.value;
    if(amtvalue == "" || amtvalue <1){
        alert("Please enter a valid amount ")
    }
    const URL = `${BASE_URL}=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}&amount=${amtvalue}&api_key=${api_key}`;
    let response = await fetch(URL)
    console.log(response);
    let data = await response.json();
    console.log(data)
    let entries = Object.entries(data.result)
    console.log(entries[0][1])
    const msg = document.querySelector(".msg")
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${entries[0][1]} ${toCurr.value}`
     }

 const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
 }

 btn.addEventListener("click", (evt) => {
evt.preventDefault();
exchangeRatesUpdate();

});
window.addEventListener("load", ()=> {
    exchangeRatesUpdate();
  })
