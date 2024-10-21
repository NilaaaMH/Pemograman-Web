const display = document.getElementById("display");

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    // Apapun ekspresinya, hasilnya akan selalu "miss you :("
    display.value = "miss you :(";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}
