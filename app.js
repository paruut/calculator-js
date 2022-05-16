    let result = document.querySelector(".result");
    let btns = document.querySelector(".buttons");
    let ops = document.querySelectorAll(".operator");
    let clearToggle = false;
    let timeFlag = false;
    let valStack = [];
    let canOperate = false;
    btns.addEventListener("click", (e) => {
        let resultValue = result.innerHTML;
        let btn = e.target;

        let doubleBordered = document.querySelector(".doubleBordered");
        if(null !== doubleBordered) doubleBordered.classList.remove("doubleBordered");

        if(btn.className.indexOf("resetBtn") > -1){
           init();
        }else 
        if(btn.className.indexOf("number") > -1){
            canOperate = true;
            if(clearToggle){
                resultValue = "";
                clearToggle = false;
            }
            if(resultValue == '0' && btn.className.indexOf("dot") === -1){
                resultValue = "";
            }
            result.innerHTML = resultValue + btn.innerHTML;
        }else {
            clearToggle = true;
            if(canOperate){
                btn.classList.add("doubleBordered");

                if(btn.innerHTML === '*' || btn.innerHTML === '/'){
                    if(!timeFlag){
                        valStack.push(resultValue);
                        valStack.push(btn.innerHTML);
                        timeFlag = true;
                        return;
                    }
                }else 
                if(btn.innerHTML === '%'){
                    resultValue = parseFloat(resultValue/100);
                   // valStack.push(resultValue);
                    result.innerHTML = resultValue;
                    return;
                }

                if(valStack.length > 1){
                    let op = valStack.pop();
                    let num1 = valStack.pop();
                    resultValue = calculate(num1,resultValue,op);
                    if((btn.innerHTML === '+' || btn.innerHTML === '-'|| btn.innerHTML === '=') && timeFlag){
                        while(valStack.length > 1){
                            op = valStack.pop();
                            num1 = valStack.pop();
                            resultValue = calculate(num1,resultValue,op);
                        }
                        timeFlag = false;
                    }

                }
                valStack.push(resultValue);
                valStack.push(btn.innerHTML);
                result.innerHTML = resultValue;
                if(btn.innerHTML === '='){
                    clearToggle = true;
                    timeFlag = false;
                    valStack = [];
                    return;
                }
            }
            canOperate = false;
        }

    },false);

    const calculate = (num1, num2, op) => {
        switch (op) {
            case "+":
                return parseFloat(num1) + parseFloat(num2);
            case "-":
                return parseFloat(num1) - parseFloat(num2);
            case "*":
                return parseFloat(num1) * parseFloat(num2);
            case "/":
                return parseFloat(num1) / parseFloat(num2);

        }
    };

    const init = () => {
        clearToggle = false;
        timeFlag = false;
        valStack = [];
        canOperate = false;
        result.innerHTML = "0";
    };