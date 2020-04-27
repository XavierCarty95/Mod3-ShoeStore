// Code your solution here
let ul = document.getElementById("shoe-list")
let container = document.querySelector(".container")
let img = document.getElementById("shoe-image")
let header = document.getElementById("shoe-name")
let shoeDescription = document.getElementById("shoe-description")
let shoePrice =  document.getElementById("shoe-price")
let mainShoe = document.getElementById("main-shoe")




fetch('http://localhost:3000/shoes')
.then(r => r.json())
.then(json => {
     
     json.forEach(element => {
          createHtmlForShoes(element)


     })
   

})

function createHtmlForShoes(json){
  
  let li = document.createElement('li')
  li.innerText += `${json.name}`

  ul.appendChild(li)

  li.addEventListener('click' , function() {
  
       createHtmlForSingleShoe(json)

  })
  



}


function createHtmlForSingleShoe(json){

    
    fetch(`http://localhost:3000/shoes/${json.id}`)
    .then(r => r.json())
    .then(json => {
         
      
    mainShoe.innerHTML = `<img class="card-img-top" id="shoe-image" src='${json.image}'>
    <div class="card-body">
      <h4 class="card-title" id="shoe-name">${json.name}</h4>
      <p class="card-text" id="shoe-description">${json.description}</p>
      <p class="card-text"><small class="text-muted" id="shoe-price">${json.price}</small></p>
      <div class="container" id="form-container">
      <form id="new-review">
      <div class="form-group">
        <textarea class="form-control" id="review-content" rows="3"></textarea>
        <input type="submit" class="btn btn-primary"></input>
      </div>
    </form>
  </div>

  </div>
<h5 class="card-header">Reviews</h5>
<ul class="list-group list-group-flush" id="reviews-list">

  ${json.reviews.forEach(element  => {
   
       element["content"]

  })
 }
</ul>`

let formReview = document.getElementById("new-review")


formReview.addEventListener('submit', function(evt) {
    

    
    evt.preventDefault()
   
    let textArea = document.getElementById('review-content').value
    console.log(textArea)
    let reviewslist = document.getElementById("reviews-list")
    let li = document.createElement("li")
   
     li  = textArea
    reviewslist.append(li)

    
  fetch(`http://localhost:3000/shoes/${json.id}/reviews`, {

      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          
         id: json.id,
         content: textArea


      })

      





    })








})

     })


    
   
   

}

