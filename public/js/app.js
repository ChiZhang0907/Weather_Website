console.log('Client side js file is loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageQuery1 = document.querySelector('#message-query1')
const messageQuery2 = document.querySelector('#message-query2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    
    const fetchurl = 'http://localhost:3000/weather?address=' + location

    messageQuery1.textContent = 'Loading...'

    fetch(fetchurl).then((response) => {    

        response.json().then((data) => {
            if(data.error) {
                messageQuery1.textContent = data.error
                return messageQuery2.textContent = ''
            }

            messageQuery1.textContent = data.location
            messageQuery2.textContent = data.forecast
        })
    })
})