$(document).ready(function(){
  $("button").click(function(e){
    $.getJSON("/" + $(this).val(), function(response) {
      $("tbody").empty();
      response.forEach(function(animal) {
        var newTr = "<tr>";
        newTr += "<td>" + animal.title + "</td>";
        newTr += "<td>" + animal.link + "</td>";
        newTr += "</tr>";
        $("tbody").append(newTr);
      });
    });
  });

  $("#nameButton").click(function(e) {
    alert("Clicked name!")
  });

});
