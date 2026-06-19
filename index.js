const div = document.createElement('div')
div.textContent = 'Hello World'
document.body.appendChild(div)
const button = document.createElement('button')
button.style.color = 'blue'
button.style.scale = '4'
// center button
button.style.transform = 'translate(-50%, -50%)'
document.body.appendChild(button)
