const addressBarContent = new URLSearchParams(location.search)
console.log(addressBarContent)
const bananasId = addressBarContent.get('bananasId')
console.log(bananasId)

const myURL = 'https://striveschool-api.herokuapp.com/api/product'

fetch(myURL + '/' + bananasId, {
    method: 'GET',
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDMzYzE4N2U1YzAwMTgxNGM2MzAiLCJpYXQiOjE3MDU2NjIyNTMsImV4cCI6MTcwNjg3MTg1M30.8TQjYnUsOjn5Hvz3owgjMXJWj5PLq9T8guin9lEFTLk",
        'Content-Type': 'application/json'
      },
    
}) 
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nella chiamata')
    }
  })
  .then((singlebanana) => {
    console.log(singlebanana)
    document.getElementById('name').innerText = singlebanana.name
    document.getElementById('description').innerText = singlebanana.description
    document.getElementById('price').innerText = singlebanana.price + '€'

    
    document.getElementById('delete').addEventListener('click', function () {
      
      fetch(myURL + '/' + bananasId, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDMzYzE4N2U1YzAwMTgxNGM2MzAiLCJpYXQiOjE3MDU2NjIyNTMsImV4cCI6MTcwNjg3MTg1M30.8TQjYnUsOjn5Hvz3owgjMXJWj5PLq9T8guin9lEFTLk",
            'Content-Type': 'application/json'
          },
      })
        .then((response) => {
          if (response.ok) {
            alert('cancellato!')
            location.assign('./homePage.html') 
          } else {
            alert('problema nella cancellazione :(')
            throw new Error('errore nella cancellazione')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })

  
    document
      .getElementById('edit')
      .setAttribute('href', './backoffice.html?bananasId=' + singlebanana._id)
  })
  .catch((err) => {
    console.log(err)
  })

