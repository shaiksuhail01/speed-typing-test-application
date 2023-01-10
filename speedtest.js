let typingContainer = document.getElementById("speedTypingTest");
let quoteDisplay = document.getElementById("quoteDisplay");
let quoteTextArea = document.getElementById("quoteInput");
let result = document.getElementById("result");
let submitButton = document.getElementById("submitBtn");
let resetButton = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");
let timeValue = document.getElementById("timeValue");
let uniqueId = null;
let counter = 0;
let quote = null;

function timerStart() {
    uniqueId = setInterval(function() {
        counter = counter + 1;
        timeValue.textContent = counter;
    }, 1000);

}
submitButton.addEventListener("click", function() {
    let quoteTextAreaValue = quoteTextArea.value;
    if (quoteTextAreaValue === quote) {
        clearInterval(uniqueId);
        result.textContent = "You typed in " + counter + " seconds";
    } else {
        result.textContent = "You typed incorrect sentence";
    }
});

function httpRequest() {
    spinner.classList.remove("d-none");
    quoteDisplay.textContent = "";
    let options = {
        method: "GET"
    };
    fetch("https://apis.ccbp.in/random-quote", options).then(function(response) {
        return response.json();
    }).then(function(jsonData) {
        spinner.classList.add("d-none");
        quote = jsonData.content;
        quoteDisplay.textContent = quote;
        timerStart();
    });
}
httpRequest();
resetButton.addEventListener("click", function() {
    clearInterval(uniqueId);
    timeValue.textContent = 0;
    counter = 0;
    quoteTextArea.value = "";
    result.textContent = "";
    httpRequest();
});
