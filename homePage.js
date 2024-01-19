const generateCards = function (arrayOfBananas) {
    
    arrayOfBananas.forEach((bananas) => {
      const newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12','col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2')
      newCol.innerHTML = `
          <div class="card h-100 rounded-4 shadow-lg bg-warning text-success-emphasis">
              <img class='img-fluid rounded-4' src="${bananas.imageUrl}">
              <div class="card-body d-flex flex-column">
              <h2 class="card-text">${bananas.brand}</h2>
              <h5 class="card-title">${bananas.name}</h5>
                  <p class="card-text flex-grow-1">${bananas.description}</p>
                  <a href="#" class="btn btn-primary"><i class="bi bi-cart-check me-2"></i>${
                    bananas.price || '?'
                  }€</a>
                  <a href="./details.html?bananasId=${
                    bananas._id
                  }" class="btn btn-success mt-2"><i class="bi bi-caret-right"></i></i>
                   FIND OUT MORE! 
                  </a>
              </div>
          </div>
          `
      
      const eventsRow = document.getElementById('events-row')
      eventsRow.appendChild(newCol)
    })
  }
  
  
  
  const getBanana = function () {
    const myURL = 'https://striveschool-api.herokuapp.com/api/product/'
    
    fetch(myURL, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDMzYzE4N2U1YzAwMTgxNGM2MzAiLCJpYXQiOjE3MDU2NjIyNTMsImV4cCI6MTcwNjg3MTg1M30.8TQjYnUsOjn5Hvz3owgjMXJWj5PLq9T8guin9lEFTLk",
          },
    })
      .then((response) => {
       
        console.log('response', response)
        if (response.ok) {
         
          return response.json()
        } else {
          
          throw new Error('errore nella chiamata')
        }
      })
      .then((data) => {
        console.log('DATA', data)
  
        generateCards(data)
      })
      .catch((err) => {
        
        console.log(err)
      })
  }
  
  getBanana()