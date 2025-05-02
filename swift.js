document.addEventListener("DOMContentLoaded", function () {
    // Handle btn-aid click
    const btnAid = document.querySelector(".btn-aid");
    btnAid.addEventListener("click", function (event) {
        event.preventDefault();
        alert("Provided Code:\n\n<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>SwiftRescue App</title>\n</head>\n<body>\n  <!-- Your content here -->\n</body>\n</html>");
    });

    // Handle btn-help click
    const btnHelp = document.querySelector(".btn-help a");
    btnHelp.setAttribute("href", "tel:112");
});