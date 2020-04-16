const btnCreate = document.querySelector('.btnCreateVertex');
const btnOutMatrix = document.querySelector('.outMatrixs');
const dataEntry = document.querySelector('.dataEntry');
const td = document.querySelectorAll('td');
const tableA = document.querySelector('.tableOfMatrixA');
const vertexValue = document.querySelector('.vertexInput');
const nameOfMatrixA = document.querySelector('.nameOfMatrixA');
const exBtn1 = document.querySelector('.ex1');
const exBtn2 = document.querySelector('.ex2');

exBtn1.addEventListener('click', fill1);
exBtn2.addEventListener('click', fill2);

btnCreate.addEventListener('click', getValue);
dataEntry.addEventListener('click', deleteBlock);

function getValue() {
    const valueOfInput = vertexValue.value;

    document.querySelector('.container').innerHTML = '';
    document.querySelector('.nameOfMatrixA').style.display = 'none';
    document.querySelector('.tableOfMatrixA').innerHTML = '';

    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>+</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
            <button class="btnDeleteVertex">Удалить</button>
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';
    btnOutMatrix.addEventListener('click', outMatrix);
}

function deleteBlock(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    }
}

function fill1() {
    let valueOfInput = 10;
    document.querySelector('.vertexInput').value = valueOfInput;

    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>+</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
            <button class="btnDeleteVertex">Удалить</button>
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';

    document.querySelectorAll('.inputOfNumbers')[0].value = '2 5 6';
    document.querySelectorAll('.inputOfNumbers')[1].value = '1';
    document.querySelectorAll('.inputOfNumbers')[2].value = '2 4 5';
    document.querySelectorAll('.inputOfNumbers')[3].value = '9';
    document.querySelectorAll('.inputOfNumbers')[4].value = '1 7';
    document.querySelectorAll('.inputOfNumbers')[5].value = '5 8 10';
    document.querySelectorAll('.inputOfNumbers')[6].value = '4';
    document.querySelectorAll('.inputOfNumbers')[7].value = '7 10';
    document.querySelectorAll('.inputOfNumbers')[8].value = '7';
    document.querySelectorAll('.inputOfNumbers')[9].value = '8';

    outMatrix(valueOfInput);
}

function fill2() {
    let valueOfInput = 8;
    document.querySelector('.vertexInput').value = valueOfInput;

    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>+</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
            <button class="btnDeleteVertex">Удалить</button>
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';

    document.querySelectorAll('.inputOfNumbers')[0].value = '2 7';
    document.querySelectorAll('.inputOfNumbers')[1].value = '6';
    document.querySelectorAll('.inputOfNumbers')[2].value = '2 6';
    document.querySelectorAll('.inputOfNumbers')[3].value = '3 8';
    document.querySelectorAll('.inputOfNumbers')[4].value = '1 4 8';
    document.querySelectorAll('.inputOfNumbers')[5].value = '7';
    document.querySelectorAll('.inputOfNumbers')[6].value = '';
    document.querySelectorAll('.inputOfNumbers')[7].value = '7';
    
    outMatrix(valueOfInput);
}

function outMatrix(valueOfInput) {
    if (valueOfInput != 8 && valueOfInput != 10) {
        valueOfInput = Number(vertexValue.value);
    }

    document.querySelector('.container').innerHTML = '';

    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    let arr = [];

    for (let t = 0; t < dataOfInputs.length; t++) {
        arr[t] = dataOfInputs[t].split(' ');
    }
    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
    }

    let c = [];
    for(let i = 0; i < arr.length; i++){
        c.push([]);
    }

    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr[i].length; j++){
            for (let k = 0; k < arr.length; k++){
                if (arr[i][j] - 1 == k){
                    c[k].push(i+1)
                }
            }
        }
    }

    let Gm = [];
    for (let i = 0; i < arr.length; i++){
        Gm.push([]);
        for (let j = 0; j < arr.length; j++){
            Gm[i][j] = 0;
        }
    }

    for (let i = 0; i < c.length; i++){
        for (let j = 0; j < c[i].length +1 ; j++){
            for (let k = 0; k < Gm.length +1; k++){
                if (c[i][j] == k){
                    Gm[i][k-1] = 1;
                }
            }
        }
    }

    let PathLengthArr = [];


    for (let i = 0; i < valueOfInput; i++) {
        for (let j = 0; j < valueOfInput; j++) {
            if (i == j) {
                PathLengthArr.push(0);
            } else {
                PathLengthArr.push(99);
            }
        }
    }

    let mas = [];

    for (let i = 0; i < dataOfInputs.length + 1; i++) {
        for (let c = 0; c < dataOfInputs.length + 1; c++) {
            if (i === 0) { }
            else {
                if (c == 0) { }
                else {
                    if (arr[i - 1].indexOf(c) != -1) {
                        mas.push(1)
                    }
                    else {
                        mas.push(0);
                    }
                }
            }
        }
    }

    mas = mas.map((_, i, a) => a.slice(i * valueOfInput, i * valueOfInput + valueOfInput)).filter((el) => el.length);

    let R1, Q1, G1, arrAll = [];
    let next;
    let varForNext = [];

    for (let i = 0; i < 5; i++) {

    }

    R1 = division(mas);
    Q1 = division(Gm);

    R1 = R1.flat();
    Q1 = Q1.flat();

    Q1 = Q1.filter( (item, pos) => {
        return Q1.indexOf(item) === pos;
    })

    G1 = subgraph(R1, Q1);
    arrAll.push(G1);
    arrAll = arrAll.flat();

    varForNext.push(G1)
    varForNext = varForNext.flat();

    next = nextSmallNumber(G1);

    console.log("R1", R1);
    console.log("Q1", Q1);
    console.log("G1", G1);

    document.querySelector('.container').insertAdjacentHTML('beforeend', 
    `
    <div class="decomposition">
        <div class="r">
            <div class="name">R(1) = </div>
            <div class="values">( ${R1.join(', ')} )</div>
        </div>
        <div class="q">
            <div class="name">Q(1) = </div>
            <div class="values">( ${Q1.join(', ')} )</div>
        </div>
        <div class="g">
            <div class="name">G(1) = </div>
            <div class="values">( ${G1.join(', ')} )</div>
        </div>
    </div>
    `
    )

    let R, Q, G;
    let arrOfG = [];
    arrOfG.push(G1);

    for(let i = 0; i < 10; i++) {
        if (arrAll.length === valueOfInput) {
            break;
        }
        R = getNextR(divisionForRest(mas, next).flat(), arrAll.flat());
        Q = getNextR(divisionForRest(Gm, next).flat(), arrAll.flat());
        G = subgraph(R, Q);
        arrAll.push(G);
        arrAll = arrAll.flat();

        varForNext.push(G)
        varForNext = varForNext.flat();

        console.log('\n');
        console.log(`R${next}`, R);
        console.log(`Q${next}`, Q);
        console.log(`G${next}`, G);

        document.querySelector('.container').insertAdjacentHTML('beforeend', 
        `
        <div class="decomposition">
            <div class="r">
                <div class="name">R(${next}) = </div>
                <div class="values">( ${R.join(', ')} )</div>
            </div>
            <div class="q">
                <div class="name">Q(${next}) = </div>
                <div class="values">( ${Q.join(', ')} )</div>
            </div>
            <div class="g">
                <div class="name">G(${next}) = </div>
                <div class="values">( ${G.join(', ')} )</div>
            </div>
        </div>
        `
        )

        next = nextSmallNumber(varForNext);

        arrOfG.push(G);
    }

    let temp = [];
    let temp2 = [];
    let newTemp = [];
    let newTemp2 = [];

    for (let g = 0; g < arrOfG.length; g++) {
        for (let gg = 0; gg < arrOfG[g].length; gg++) {
            for (let i = 0; i < dataOfInputs.length; i++) {
                if (mas[arrOfG[g][gg] - 1][i] == 1) {
                    temp.push(i + 1);
                }
            }
        }
        temp2.push(temp);
        temp = [];
    }

    for (let i = 0; i < temp2.length; i++) {
        temp2[i] = temp2[i].filter( (item, pos) => {
            return temp2[i].indexOf(item) === pos;
        })
    }

    for (let i = 0; i < arrOfG.length; i++) {
        arrOfG[i].filter(item => {
            if (temp2[i].indexOf(item) !== -1) {
                temp2[i].splice(temp2[i].indexOf(item), 1);
            }
        });
    }

    for (let k = 0; k < arrOfG.length; k++) {
        for (let i = 0; i < arrOfG.length; i++) {
            for (let j = 0; j < arrOfG[i].length; j++) {
                if (arrOfG[i].indexOf(temp2[k][j]) !== -1) {
                    newTemp.push(i + 1)
                }
            }
        }
        newTemp2.push(newTemp);
        newTemp = [];
    }

    for (let i = 0; i < newTemp2.length; i++) {
        newTemp2[i] = newTemp2[i].filter( (item, pos) => {
            return newTemp2[i].indexOf(item) === pos;
        })
    }

    // matrix A
    
    dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);

    arr = newTemp2;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < newTemp2.length + 1; i++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < newTemp2.length + 1; c++) {
            if (i === 0) {
                const th = document.createElement('th');
                if (c === 0) {
                    th.textContent = ' '; 
                }
                else {
                    th.textContent = c; 
                }
                tr.appendChild(th);
            }
            else {
                if (c == 0) { // 
                    const th = document.createElement('th');
                    th.textContent = i;
                    tr.appendChild(th);
                }
                else {
                    const td = document.createElement('td');
                    if (arr[i - 1].indexOf(c) != -1) {
                        td.textContent = 1;
                    }
                    else {
                        td.textContent = 0;
                    }
                    tr.appendChild(td);
                }
            }
        }
        fragment.appendChild(tr);
    }
    nameOfMatrixA.style.display = 'block';
    tableA.textContent = '';
    tableA.appendChild(fragment);
}


function subgraph(array1, array2) {
    let array3 = [];

    for (let i = 0; i < array2.length; i++) {
        if (array1.indexOf(array2[i]) !== -1) {
            array3.push(array2[i]);
        }
    }

    return array3;
}

function divisionForRest(Gp, num){
    let R = [];
    let sub_R = [];
    sub_R.push(num);
    R.push([num]);

    sub_R = [];
    for (x = 0; x < 20; x++){
        for (let i = 0; i < Gp.length; i++) {
            for (let k = 0; k < Gp[i].length;k++) {
                for (let j = 0; j < R.length; j++){
                    if (R[j].indexOf(i+1) != -1 && Gp[i][k] != 0 && R.flat().indexOf(k+1) == -1){
                        sub_R.push(k+1);
                    }
                }   
            }
        }
        R.push(sub_R);
        if(sub_R.length == 0){
            x = 20;
        }
        sub_R = [];
    }
    R.pop();
    return R;
}

function getNextR(arr1, arr2) {
    let arr3 = [];

    arr1 = arr1.filter( (item, pos) => {
        return arr1.indexOf(item) === pos;
    })

    arr1.filter(item => {
        if (arr2.indexOf(item) === -1) {
            arr3.push(item);
        }
    });

    return arr3;
}


function nextSmallNumber(arr) {
    let arrOfNumbers = [];

    arr.sort(function (a, b) {
        return a - b;
    });

    for (let i = 0; i < arr[arr.length - 1]; i++) {
        arrOfNumbers.push(i + 1);
    }

    for (let i = 0; i < arrOfNumbers.length; i++) {
        if (arr.indexOf(arrOfNumbers[i]) === -1) {
            return arrOfNumbers[i];
        }
    }

    return arr[arr.length - 1] + 1;
}

function division(Gp){
    let R = [];
    let sub_R = [];
    sub_R.push(1);

    for(let i = 0; i < Gp.length; i++) {
        for(let k = 0; k < Gp[i].length;k++){
            if(i == 0 ){
                if(Gp[i][k] != 0){
                    sub_R.push(k+1);
                }
            }
        }
    }
    R.push(sub_R);
    sub_R = [];
    for (x = 0; x < 20; x++) {
        for (let i = 0; i < Gp.length; i++) {
            for (let k = 0; k < Gp[i].length;k++) {
                for (let j = 0; j < R.length; j++){
                    if (R[j].indexOf(i+1) != -1 && Gp[i][k] != 0 && R.flat().indexOf(k+1) == -1){
                        sub_R.push(k+1);
                    }
                }   
            }
        }
        R.push(sub_R);
        if(sub_R.length == 0){
            x = 20;
        }
        sub_R = [];
    }
    R.pop();
    return R;
}