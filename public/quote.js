var edit = document.getElementById('edit');

//edit.addEventListener('click',function(){
//  var editname = document.getElementById('quoteName').value;
//  var editquote = document.getElementById('quoteText').value;
//  fetch('quotes', {
//  method: 'put',
//  headers: {'Content-Type': 'application/json'},
//  body: JSON.stringify({
//    'name': editname,
//    'quote': editquote
//  })
//})
//});

//END OF CODE//

edit.addEventListener('click', function () {
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'I find your lack of faith disturbing.'
   })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
  console.log(data)
  window.location.reload()
  })
});