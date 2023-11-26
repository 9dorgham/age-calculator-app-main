// get the current date
let date = new Date();
// months of the year
let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let inputDay = document.getElementById("day")
let inputMonth = document.getElementById("month")
let inputYear = document.getElementById("year")

let d2 = date.getDate()
let m2 = 1 + date.getMonth()
let y2 = date.getFullYear();



// calculate the age 
function age(d1, m1, y1) {
    
    if (d1 > d2) {
        d2 = d2 + months[m2 - 2];
        m2 = m2 - 1;
    }

    if (m1 > m2) {
        m2 = m2 + 12;
        y2 = y2 - 1;
    }
    

    let d = d2 - d1;
    let m = m2 - m1;
    let y = y2 - y1;

    writeAge(d, m, y)
}


// Check input field values before writing them
function checkValues () {
    let d1 = inputDay.value;
    let m1 = inputMonth.value;
    let y1 = inputYear.value;
    let list = [inputDay, inputMonth, inputYear]
    let errorBody = "Must be a valid ";
    let state = true;



    list.forEach(ele => {
        let labelElement = ele.parentElement.querySelector('label');
        let erorrElement = ele.parentElement.querySelector('span');
        try {
            erorrElement.textContent = '';
            labelElement.classList.remove("failed");
            if (ele.value == "") {
                throw "This field is required";
            }else if (ele == inputDay && ele.value > 31) {
                throw `${errorBody} day`;
            }else if (ele== inputDay && ele.value > 29 && m1 == 2){
                throw `${errorBody} date`;
            }
            else if (ele == inputMonth && ele.value > 12) {
                throw `${errorBody} Month`;
            }else if (ele == inputYear && ele.value > y2) {
                throw "Must be in the past.";
            }

        }catch (error) {
            labelElement.classList.add("failed")
            erorrElement.textContent = error;
            state = false;
        }
    })
    
    
    if (state) age(d1, m1, y1);
    return 0;
}



// Add the age to html
function writeAge(day, month, year) {
    let resultDay = document.getElementById("result-days");
    let resultMonths = document.getElementById("result-months");
    let resultYears  = document.getElementById("result-years");

    let elements = [resultDay, resultMonths, resultYears]
    let age = [day, month, year]

    elements.forEach((ele) => {
        ele.textContent = "00";
        if (age[elements.indexOf(ele)] == 0) return 0;

        // needed function to make writing effect
        let count = setInterval(() => {
            ele.textContent++;
            if (ele.textContent == age[elements.indexOf(ele)]) {
                clearInterval(count)
            }

        }, 100)

    })
}


let btn = document.getElementById("btn")
btn.addEventListener('click', checkValues)