$(document).ready(function() {
  const endpoint = '//localhost:3333'

  function getQuote(){
    $.get(`${endpoint}/quote`).done( response => {
      $('#quote').text(response)
    }).fail(err => {
      console.log(err)
    })
  }

  function addQuote(quote){
    let data = { quote: quote } 
    //YOUR CODE HERE, Add a POST request
    $.ajax({
      url: `${endpoint}/quote`,
      type: "POST",
      data: JSON.stringify(data),
      contentType:"application/json; charset=utf-8",
      dataType:"json",
    }).done( response => {
      const { quote } = response
      $('input').val('');
      $('#quote').text(quote)
    }).fail(err => {
      console.log(err)
    })
  }

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

});
