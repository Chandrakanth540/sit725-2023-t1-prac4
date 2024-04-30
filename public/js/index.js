document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var options = {
    opacity: 0.5,
    inDuration: 300,
  };
  var instances = M.Modal.init(elems, options);
  var instance = M.Modal.getInstance(elems[0]);
});

function InsertCardPlease(newCar) {
  let { title, image, desc } = newCar;

  let cardSec = document.getElementsByClassName('card-section');
  let newCard = `<div class="card">
  <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src=${image}>
  </div>
  <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${title}<i
              class="material-icons right">more_vert</i></span>
      <p><a href="#">see more</a></p>
  </div>
  <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${title}<i
              class="material-icons right">close</i></span>
      <p>${desc}</p>
  </div>
</div>`;
  cardSec[0].innerHTML += newCard;
}
let output = [];
fetch('/api/cars', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);
    output = data.data;
    output.forEach((element) => {
      InsertCardPlease(element);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
submitBtn.addEventListener('click', async function (event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;
  const image = document.getElementById('image').value;

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, desc, image }),
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error:', error);
  }
});
