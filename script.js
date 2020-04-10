const btnCreate = document.querySelector('.btnCreateVertex');
const btnOutMatrix = document.querySelector('.outMatrixs');
const dataEntry = document.querySelector('.dataEntry');
const td = document.querySelectorAll('td');
const tableA = document.querySelector('.tableOfMatrixA');
const vertexValue = document.querySelector('.vertexInput');
const nameOfMatrixA = document.querySelector('.nameOfMatrixA');
const lines = document.querySelector('.lines');

const tableB = document.querySelector('.tableOfMatrixB');
const nameOfMatrixB = document.querySelector('.nameOfMatrixB');

// btnCreate.addEventListener('click', getValue);
// dataEntry.addEventListener('click', deleteBlock);
// vertexValue.value = 10;
outMatrix();

function getValue() {
    const valueOfInput = vertexValue.value;
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

function outMatrix() {
    // let valueOfInput = Number(vertexValue.value);
    let valueOfInput = 8;

    // console.log("valueOfInputvalueOfInputvalueOfInput1", typeof valueOfInput);
    // valueOfInput = 10;
    // console.log("valueOfInputvalueOfInputvalueOfInput2", typeof valueOfInput); return;
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

    // document.querySelectorAll('.inputOfNumbers')[0].value = '2 5 6';
    // document.querySelectorAll('.inputOfNumbers')[1].value = '1';
    // document.querySelectorAll('.inputOfNumbers')[2].value = '2 4 5';
    // document.querySelectorAll('.inputOfNumbers')[3].value = '9';
    // document.querySelectorAll('.inputOfNumbers')[4].value = '1 7';
    // document.querySelectorAll('.inputOfNumbers')[5].value = '5 8 10';
    // document.querySelectorAll('.inputOfNumbers')[6].value = '4';
    // document.querySelectorAll('.inputOfNumbers')[7].value = '7 10';
    // document.querySelectorAll('.inputOfNumbers')[8].value = '7';
    // document.querySelectorAll('.inputOfNumbers')[9].value = '8';

    document.querySelectorAll('.inputOfNumbers')[0].value = '2 7';
    document.querySelectorAll('.inputOfNumbers')[1].value = '6';
    document.querySelectorAll('.inputOfNumbers')[2].value = '2 6';
    document.querySelectorAll('.inputOfNumbers')[3].value = '3 8';
    document.querySelectorAll('.inputOfNumbers')[4].value = '1 4 8';
    document.querySelectorAll('.inputOfNumbers')[5].value = '7';
    document.querySelectorAll('.inputOfNumbers')[6].value = '';
    document.querySelectorAll('.inputOfNumbers')[7].value = '7';


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

    for (let i = 0; i < arr.length; i++){ // преобразование множества G+ в G-
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

    for (let i = 0; i < c.length; i++){ //преобразование множества G- в матрицу смежности
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

    // mas это матрица смежности из g+ для получения R
    // Gm это матрица смежности из g- для получения Q

    // console.log(mas);
    // console.log(arr);

    let R1, Q1, G1, arrAll = [];
    let R3, Q3, G3;
    let R4, Q4, G4;
    let R8, Q8, G8;
    let next1, next2, next3;
    let varForNext = [];

    for (let i = 0; i < 5; i++) {

    }

    R1 = division(mas); // находим R1
    Q1 = division(Gm); // находим Q1

    // Q = getNextR(divisionForRest(Gm, next1).flat(), arrAll.flat()); // находим Q3

    R1 = R1.flat(); // поднимаем все массивы на один уровень в R1
    Q1 = Q1.flat(); // поднимаем все массивы на один уровень в Q1

    // Убираем одинаковые (баг)
    Q1 = Q1.filter( (item, pos) => {
        return Q1.indexOf(item) === pos;
    })

    G1 = subgraph(R1, Q1); // находим сильно связанный подграф
    arrAll.push(G1); // заносим в общий массив
    arrAll = arrAll.flat();

    varForNext.push(G1)
    varForNext = varForNext.flat();

    next1 = nextSmallNumber(G1); // находим следующую вершину с меньшим номером

    // R3 = getNextR(divisionForRest(mas, next1).flat(), arrAll.flat()); // находим R3
    // Q3 = divisionForRest(Gm, next1).flat(); // находим Q3
    // G3 = subgraph(R3, Q3); // находим G3
    // arrAll.push(G3); // заносим в общий массив
    // arrAll = arrAll.flat();

    // varForNext.push(G3)
    // varForNext = varForNext.flat();

    // next2 = nextSmallNumber(varForNext); // находим следующую вершину с меньшим номером

    // R4 = getNextR(divisionForRest(mas, next2).flat(), arrAll.flat()); // находим R3
    // Q4 = getNextR(divisionForRest(Gm, next2).flat(), arrAll.flat()); // находим Q3
    // G4 = subgraph(R4, Q4); // находим G3
    // arrAll.push(G4); // заносим в общий массив
    // arrAll = arrAll.flat();

    // varForNext.push(G4);
    // varForNext = varForNext.flat();

    // next3 = nextSmallNumber(varForNext); // находим следующую вершину с меньшим номером

    // R8 = getNextR(divisionForRest(mas, next3).flat(), arrAll.flat()); // находим R3
    // Q8 = getNextR(divisionForRest(Gm, next3).flat(), arrAll.flat()); // находим Q3
    // G8 = subgraph(R8, Q8); // находим G3
    // arrAll.push(G8); // заносим в общий массив
    // arrAll = arrAll.flat();

    console.log("R1", R1);
    console.log("Q1", Q1);
    console.log("G1", G1);
        console.log('\n');
    console.log("Next1:", next1);
        console.log('\n');
    // console.log("R3", R3);
    // console.log("Q3", Q3);
    // console.log("G3", G3);
    //     console.log('\n');
    // console.log("Next2:", next2);
    //     console.log('\n');
    // console.log("R4", R4);
    // console.log("Q4", Q4);
    // console.log("G4", G4);
    //     console.log('\n');
    // console.log("Next3:", next3);
    //     console.log('\n');
    // console.log("R8", R8);
    // console.log("Q8", Q8);
    // console.log("G8", G8);
    //     console.log('\n');
    // if (arrAll.length === valueOfInput) {
    //     console.log("Конец!");
    // }

    let R, Q, G;
    let arrOfG = [];
    arrOfG.push(G1);

    for(let i = 0; i < 10; i++) {
        if (arrAll.length === valueOfInput) {
            console.log("Конец!");
            break;
        }
        R = getNextR(divisionForRest(mas, next1).flat(), arrAll.flat()); // находим R3
        Q = getNextR(divisionForRest(Gm, next1).flat(), arrAll.flat()); // находим Q3
        G = subgraph(R, Q); // находим G3
        arrAll.push(G); // заносим в общий массив
        arrAll = arrAll.flat();

        varForNext.push(G)
        varForNext = varForNext.flat();

        console.log(`R${next1}`, R);
        console.log(`Q${next1}`, Q);
        console.log(`G${next1}`, G);
        console.log('\n');
        console.log("Next1:", next1);
        console.log('\n');

        next1 = nextSmallNumber(varForNext); // находим следующую вершину с меньшим номером

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

    console.log("newTemp2", newTemp2);

    // matrix A
    
    dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    console.log('dataOfInputs', dataOfInputs);

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
            else { // все остальные
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

function divisionForRest(Gp, num){//заполнение R, или Q
    let R = [];
    let sub_R = [];
    sub_R.push(num);
    R.push([num]);

    sub_R = [];
    for (x = 0; x < 20; x++){ //заполняем остальные
        for (let i = 0; i < Gp.length; i++) {
            for (let k = 0; k < Gp[i].length;k++) {
                for (let j = 0; j < R.length; j++){
                    if (R[j].indexOf(i+1) != -1 && Gp[i][k] != 0 && R.flat().indexOf(k+1) == -1){
                        sub_R.push(k+1);
                        // console.log(k+1);
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

function division(Gp){//заполнение R, или Q
    let R = [];
    let sub_R = [];
    sub_R.push(1);

    for(let i = 0; i < Gp.length; i++){//заполняем первый уровень
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
    for (x = 0; x < 20; x++){ //заполняем остальные
        for (let i = 0; i < Gp.length; i++) {
            for (let k = 0; k < Gp[i].length;k++) {
                for (let j = 0; j < R.length; j++){
                    if (R[j].indexOf(i+1) != -1 && Gp[i][k] != 0 && R.flat().indexOf(k+1) == -1){
                        sub_R.push(k+1);
                        // console.log(k+1);
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