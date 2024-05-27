const colorPicker = document.getElementById('colorPicker')
const selectElement = document.getElementById('select')

let chosenColor = ''
let selectedScheme = ''

//Trigger Default Choices
document.addEventListener('DOMContentLoaded', function () {
    handleSelectedScheme()
    chosenColor = colorPicker.value.replace('#', '');
})

//Get Chosen Color
colorPicker.addEventListener('change', watchColorPicker)

function watchColorPicker(e) {
    chosenColor = (e.target.value.replace('#', ''))
}

//handle the select Element Values
selectElement.addEventListener('change', handleSelectedScheme)

function handleSelectedScheme() {
    selectedScheme = selectElement.value
}

//Generate the Colors Cols
document.getElementById('btn').addEventListener('click', function () {

    fetch(`https://www.thecolorapi.com/scheme?hex=${chosenColor}&mode=${selectedScheme}`)

        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }

            return res.json();
        })

        .then(data => {
            console.log(data)
            let columnHTML = ''
            data.colors.forEach(function (color, index) {
                columnHTML +=
                    `
                <div class="col-wrapper" style="animation-delay: ${index * 0.1}s">
                <img class="color-cols fade-in" src="${color.image.bare}">
                <h2 style="color: ${color.hex.value}">${color.hex.value}</h2>
                </div>
                `
            })

            document.getElementById('colorCols').innerHTML = columnHTML
            copyToClipboard()
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error))
})




//Copy to Clipboard
function copyToClipboard() {
    const columns = document.querySelectorAll('.color-cols')
    columns.forEach(column => {
        console.log(column)
        column.addEventListener('click', function () {
            const hexValue = column.nextElementSibling.textContent
            console.log(hexValue);
            navigator.clipboard.writeText(hexValue)
                .then(() => {
                    showNotification()
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err)
                });
        });
    });
}

function showNotification() {
    const notification = document.getElementById('notification');
    console.log(notification);
    notification.textContent = 'Hex Value copied to clipboard!';
    notification.classList.remove('hidden');

    setTimeout(function () {
        notification.classList.add('hidden');
    }, 1000);
}