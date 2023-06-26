let EVALSTRING = "";

let nums = "";
let nonNums = ["clr", "del"];
let operArr = ["/", "x", "-", "+"];
let floatFlag = false;
let operFlag = false;
// Get the input
function getInput(event) {
  let currText = event.target.value;

  
  if (operArr.includes(currText) && operFlag == true) return;
  
  if (operArr.includes(currText)) operFlag = true;
  
  if (currText >= '0' && currText <= '9') operFlag = false;
  
  if (currText === "clr") {
    nums = "";
    let p = document.getElementsByClassName("inputStr")[0];
    p.innerHTML = '';
  } else if (currText === "del") {
    nums = nums.slice(0, -1);
  } else if (currText === "." && floatFlag == false) {
    floatFlag = true;
    nums += ".";
  } else if (currText === "=") {
    floatFlag = false;
    doOpp({ number: nums, opp: "=" });
    EVALSTRING = '';
    nums = '';
  } else {
    if (floatFlag == true && operArr.includes(currText)) floatFlag = false;
    if (currText != ".") nums += currText.toString();
  }
  addCurrInput(nums);
}

function addCurrInput(text) {
  let p = document.getElementsByClassName("expStr")[0];
  p.innerHTML = text;
}

function doOpp(oppObject) {
  EVALSTRING += oppObject.number.toString();
  let result = operate();
  let p = document.getElementsByClassName("inputStr")[0];
  p.innerHTML = result;
  EVALSTRING = '';
  addCurrInput('');
}

function operate() {
  let strArr = [];
  
  temp = '';
  for(let c = 0; c < EVALSTRING.length; c++){
    if(EVALSTRING[c] == '+' || EVALSTRING[c] == '-' || EVALSTRING[c] == '/' || EVALSTRING[c] == 'x') {
      strArr.push(temp);
      temp = '';
      strArr.push(EVALSTRING[c]);
    }
    else{
      temp += EVALSTRING[c];
    }
  }
  strArr.push(temp);
  strArr.reverse();
  
  while (strArr.length > 1) {
    let op1 = strArr.pop();
    let op = strArr.pop();
    let op2 = strArr.pop();
    if (op1 !== " " && op2 !== " ") {
      switch (op) {
        case "+":
          strArr.push(String(Number(op1) + Number(op2)));
          break;
        case "-":
          strArr.push(String(Number(op1) - Number(op2)));
          break;
        case "x":
          strArr.push(String(Number(op1) * Number(op2)));
          break;
        case "/":
          strArr.push(String(Number(op1) / Number(op2)));
          break;
      }
    }
  }
  return strArr.join("");
}
