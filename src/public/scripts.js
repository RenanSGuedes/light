/*let buttonText = document.querySelector('button')
let showReport = document.querySelector('div.report')

showReport.style.display = 'none'
buttonText.innerHTML = "Mais"

buttonText.addEventListener('click', function() {
  if (showReport.style.display === 'none') {
    showReport.style.display = 'contents'
    buttonText.innerHTML = 'Menos'
  } else {
    showReport.style.display = 'none'
    buttonText.innerHTML = 'Mais'
  }
})*/

document.querySelector('.help').addEventListener('click', function() {
  document
    .querySelector('.form')
      .classList.toggle('hide')
})

document.querySelector('.help').addEventListener('click', function() {
  document
    .querySelector('.fas.fa-lightbulb')
      .classList.toggle('hide')

  document
    .querySelector('.hero')
      .classList.toggle('hide')
})

document.getElementById('range').addEventListener('mousemove', function() {
  document.querySelector('output').innerHTML = `${document.getElementById('range').value}km`
})