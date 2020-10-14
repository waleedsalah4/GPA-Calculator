const main = document.querySelector('#main');
const termGpa = document.querySelector('#cur__term');
const totalGpa = document.querySelector('#total__gpa')


const isEmpty = (inp) => {
	return inp.some((el) => el.value === '');
};

const inRange = (inp) => {
    return (
		parseFloat(inp[0].value) >= 0 &&
		parseFloat(inp[0].value) <= 100 &&
		parseFloat(inp[1].value) >= 1 &&
		parseFloat(inp[1].value) <= 4
	);
}

const resetInputs = (inputs) => {
    inputs.forEach(input =>  (input.value = '' ))
};

const renderData = (display, inputs) =>{
    const markup = `
        <div class="data data__item">
            <div class="table__data">${parseFloat(inputs[0].value)}</div>
            <div class="remove__item">&#10060;</div>
            <div class="table__data">${parseFloat(inputs[1].value)}</div>
        </div>
    `;
    display.insertAdjacentHTML('beforeend', markup);

}


const renderGpa = (subjects, element) => {
	let total = subjects.reduce(
		(acc, el) => {
			let deg = parseFloat(el.children[0].textContent);
			let grade = 0;

			if (deg < 60) grade = 0;
			else if (deg < 65) grade = 2;
			else if (deg < 70) grade = 2.3;
			else if (deg < 75) grade = 2.7;
			else if (deg < 80) grade = 3;
			else if (deg < 85) grade = 3.3;
			else if (deg < 90) grade = 3.7;
			else grade = 4;

			acc.degrees += grade * parseFloat(el.children[2].textContent);
			acc.hours += parseFloat(el.children[2].textContent);
			return acc;
		},{ degrees: 0, hours: 0 }
	);

	if (total.hours === 0) {
		element.textContent = 0;
	} else {
		element.textContent = (total.degrees / total.hours).toFixed(3);
	}
}

const renderTotalGpa = (lastGpa, lastHours, termGpa, termHours, element) => {
	let gpa = (lastGpa * lastHours + termGpa * termHours) / (lastHours + termHours);
	element.textContent = gpa ? gpa.toFixed(3) : 0;
};


const renderTerm = () => {
    const markup =`
        <div class="calc__gpa">
        <div class="get__data">
            <label class="lable" for="degree">Enter a subject degree</label>
            <input class="input" id="degree" type="text" name="degree" placeholder="Degree">
            <label class="lable" for="hours">Enter a subject credit</label>
            <input class="input" id="hours" type="text" name="hours" placeholder="hours">
            <button class="button add_sub">Add Subject</button>
        </div>
    <div class="display__input">
        <div class="data">
                <div class="display dis__degree">Degree</div>
                <div class="display dis__hours">hours</div>
            </div>
    </div>
    <div class="calc__button">
            <button class="button calc__gpa">Calculate GPA</button>
            <p class="your__gpa">Your GPA is : <span class="gpa__value"></span></p>
        </div>
    </div>

    `; 
    main.innerHTML = '';
    main.insertAdjacentHTML('beforeend', markup)
};


//total gba
const renderTotal = ()=> {
    const markup = `
        <div class="calc__gpa--total">
            <div class="get__data">
                <label class="label" for="gpa__total--input">Your last total GPA</label>
                <input
                    id="gpa__total--input"
                    type="text"
                    class="input"
                    placeholder="Your last total GPA"
                />
                <label class="label" for="hours__total--input">Your last total credit</label>
                <input
                    id="hours__total--input"
                    type="text"
                    class="input"
                    placeholder="Your last total credit"
                />
                <label class="label" for="gpa__term--input">Your GPA in this term</label>
                <input
                    id="gpa__term--input"
                    type="text"
                    class="input"
                    placeholder="Your GPA in this Term"
                />
                <label class="label" for="hours__term--input">Your total credit in this term</label>
                <input
                    id="hours__term--input"
                    type="text"
                    class="input"
                    placeholder="Your total credit in this term">
                <button class="button calc__total">Calculate Total GPA</button>
                <p class="your__gpa">Your GPA is: <span class="gpa__value"></span></p>
            </div>
        </div>
    `;

    main.innerHTML = '';
    main.insertAdjacentHTML('beforeend',markup)
}


termGpa.addEventListener('click', ()=> {
    renderTerm();
})

totalGpa.addEventListener('click', ()=> {
    renderTotal()
})




main.addEventListener('click', (e)=> {
    if (e.target.matches('.add_sub')) {
        let inputs = [...document.querySelectorAll('.input')];
        // const warrningPara = document.querySelector('.warrning_para');
        // const inputContainer = document.querySelector('.gpa__data');
        const display = document.querySelector('.display__input');

        //check if inputs empty
        if (isEmpty(inputs)) { 
            alert('fill ALL inputs')

            // check if it's not in the correct range
        } else if (!inRange(inputs)){
            alert('out of range')
        
        } else {
            renderData(display, inputs);
            resetInputs(inputs) 
        }
    }

    //if the delete item clicked
    if(e.target.matches('.remove__item')){
        const deleteItem = e.target.parentNode
        e.target.parentNode.parentNode.removeChild(deleteItem);
    }

    //calculate GPA
    if(e.target.matches('.calc__gpa')){
        let gpaValue = document.querySelector('.gpa__value');
		let subjects = [...document.querySelectorAll('.data__item')];
		renderGpa(subjects, gpaValue);
    }


    if(e.target.matches('.calc__total')){
        let gpaValue = document.querySelector('.gpa__value');
		let lastGpa = parseFloat(document.getElementById('gpa__total--input').value);
		let lastHours = parseFloat(document.getElementById('hours__total--input').value);
		let termGpa = parseFloat(document.getElementById('gpa__term--input').value);
		let termHours = parseFloat(document.getElementById('hours__term--input').value);
		renderTotalGpa(lastGpa, lastHours, termGpa, termHours, gpaValue);
    }
})

