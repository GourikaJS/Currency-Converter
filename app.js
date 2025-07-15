const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
         select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`

let img=element.parentElement.querySelector("img");
img.src=newsrc;
}


button.addEventListener("click",async (evt)=>{
evt.preventDefault();

let amount=document.querySelector(".amount input");
let amountValue=amount.value;
console.log(amountValue);
if(amountValue=="" || amountValue<1){
    amountValue=1;
    amount.value=amountValue;
}
// console.log(fromCurr,toCurr);

const url = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
// console.log("URL is:", url);

let response = await fetch(url);
let data = await response.json();
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
let finalAmount=rate*amountValue;
console.log("Exchange rate:", finalAmount);

msg.innerText=`${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

})
