//Add exercise.json somehow

var newExercise = new Array();

function addButton() {
    var set_value = document.getElementById("set_value");
    var rep_value = document.getElementById("rep_value");
    var load_value = document.getElementById("load_value");
    var RIR_value = document.getElementById("RIR_value");
    addRow(set_value.value, rep_value.value, load_value.value, RIR_value.value);
    //new row values
    set_value.value = "";
    rep_value.value = "";
    load_value.value = "";
    RIR_value.value = "";
};

function remove(button) {
    var row = button.parentNode.parentNode;
    var table = document.getElementById("exercise-table");
    table.deleteRow(row.rowIndex);
};

function addRow(set, rep, load, rir) {
    var tBody = document.getElementById("exercise-table").getElementsByTagName("tbody")[0];

    row = tBody.insertRow(-1);

    //Add exercise cell MODIFY CODE HERE
    var cell = row.insertCell(-1);
    cell.innerHTML = 'EXERCISE NAME TEMP'

    //Add cells
    var cell = row.insertCell(-1);
    cell.innerHTML = set;
    cell = row.insertCell(-1);
    cell.innerHTML = rep;
    cell = row.insertCell(-1);
    cell.innerHTML = load;
    cell = row.insertCell(-1);
    cell.innerHTML = rir;

    //Add Button cell
    cell = row.insertCell(-1);
    var removeButton = document.createElement("input");
    removeButton.setAttribute("class", "btn btn-danger");
    removeButton.type = "button";
    removeButton.value = "-";
    removeButton.setAttribute("onclick", "remove(this);");
    cell.appendChild(removeButton);
}