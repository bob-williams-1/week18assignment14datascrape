$(document).ready(function() {

$("#scrapedData").click(function(e){
  $.getJSON("/scrape", function() {
    $("tbody").empty();
  });

});

$("#getItems").click(function(e){
  $.getJSON("/getItems", function(response) {
    $("tbody").empty();
    response.forEach(function(scrapedData) {
      var newTr = "<tr>";
      newTr += "<td>" + scrapedData.title + "</td>";
      newTr += "<td>" + scrapedData.link + "</td>";
      newTr += "</tr>";
      $("tbody").append(newTr);
      var newTextForm = '<form action="/submit/'+ scrapedData._id + '"  method="post">'
      newTextForm += '<input type="text" name="title" placeholder="Title">'
      newTextForm += '<textarea type="text" name="body">Comments Here Please!</textarea>'
      newTextForm +=  '<input type="submit">'
      newTextForm += '</form>'
      $("tbody").append(newTextForm);
      var newButton2 = '<button type="button" name="button" class="deleteItem" id="deleteItem" data-id="' +scrapedData._id + '">Delete</button>';
      $("tbody").append(newButton2);
    });
  });
});

$("#deleteAll").click(function(e){
  $.getJSON("/deleteAll", function() {
    $("tbody").empty();
  });
});

$(document).on('click', '.deleteItem', function(e){
    var selected = $(this);
    console.log(selected);
    console.log(selected.data('id'));

    $.getJSON("/delete/" + selected.data('id'), function() {


    });

    $.getJSON("/getItems", function(response) {
    $("tbody").empty();
    response.forEach(function(scrapedData) {
      var newTr = "<tr>";
      newTr += "<td>" + scrapedData.title + "</td>";
      newTr += "<td>" + scrapedData.link + "</td>";
      newTr += "</tr>";
      $("tbody").append(newTr);
      var newTextForm = '<form action="/submit/'+ scrapedData._id + '"  method="post">'
      newTextForm += '<input type="text" name="title" placeholder="Title">'
      newTextForm += '<textarea type="text" name="body">Comments Here Please!</textarea>'
      newTextForm +=  '<input type="submit">'
      newTextForm += '</form>'
      $("tbody").append(newTextForm);
      var newButton2 = '<button type="button" name="button" class="deleteItem" id="deleteItem" data-id="' +scrapedData._id + '">Delete</button>';
      $("tbody").append(newButton2);
    });
  });

});


}); //end of document.ready
