
const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const brandInput = document.getElementById('brand')
const priceInput = document.getElementById('price')
const urlInput = document.getElementById('url')
const form = document.getElementById('banana-form')
const myURL = 'https://striveschool-api.herokuapp.com/api/product/'
const resetBtn = document.getElementById('resetBtn')

resetBtn.addEventListener('click', function(){
    const form= document.getElementById('banana-form')
    form.reset()
})


const addressBarContent = new URLSearchParams(location.search)
console.log(addressBarContent)

const bananasId = addressBarContent.get('bananasId')
console.log(bananasId)

if (bananasId) {
  
  document.getElementById('form-title').innerText = 'Edit banana'
  
  fetch(myURL + '/' + bananasId, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDMzYzE4N2U1YzAwMTgxNGM2MzAiLCJpYXQiOjE3MDU2NjIyNTMsImV4cCI6MTcwNjg3MTg1M30.8TQjYnUsOjn5Hvz3owgjMXJWj5PLq9T8guin9lEFTLk",
        'Content-Type': 'application/json'
      },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(
          "non sono riuscito a recuperare l'evento per ripopolare il form"
        )
      }
    })
    .then((singleBanana) => {
     
      nameInput.value = singleBanana.name
      descriptionInput.value = singleBanana.description
      brandInput.value = singleBanana.brand
      urlInput.value = singleBanana.imageUrl
      priceInput.value = singleBanana.price
    })
    .catch((err) => {
      console.log(err)
    })
}


form.addEventListener('submit', function (e) {
  e.preventDefault() 



  const newBanana = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: urlInput.value,
    price: priceInput.value,
  }

  console.log('ecco i dati raccolti dal form che sto per inviare:', newBanana)

 

  let URLToUse
  let methodToUse

  if (bananasId) {
    methodToUse = 'PUT'
    URLToUse = myURL + '/' + bananasId
  } else {
    methodToUse = 'POST'
    URLToUse = myURL
  }
  console.log('Dati da inviare:', JSON.stringify(newBanana));


  fetch(URLToUse, {
      method: methodToUse, 
    
      headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDMzYzE4N2U1YzAwMTgxNGM2MzAiLCJpYXQiOjE3MDU2NjIyNTMsImV4cCI6MTcwNjg3MTg1M30.8TQjYnUsOjn5Hvz3owgjMXJWj5PLq9T8guin9lEFTLk",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBanana), 
        
  })
  
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
  
    if (data.ok) {
      alert('BANANA SALVATA!');
      
      nameInput.value = '';
      descriptionInput.value = '';
      brandInput.value = '';
      urlInput.value = '';
      priceInput.value = '';
    } else {
      alert('BANANA SALVATA!');
      console.log(data);
    }
  })
    .catch((err) => {
      console.log(err)
    })
})