let registerButton = document.querySelector('button');
let checkBox = document.getElementById('checkboxID');

registerButton.addEventListener('click', () =>{
    output.innerText = input.value;
})

function checkCheckbox() {
    var agree = document.getElementById('checkboxID');
    if (agree.checked == true) {
        registerButton.disabled = true;
    }
    else {
        registerButton.disabled = false;
    }
}
