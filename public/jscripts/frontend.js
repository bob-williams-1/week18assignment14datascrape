$(document).ready(function(){
  
  $("button").click(function(e){
    $.getJSON("/" + $(this).val(), function(response) {
      $("tbody").empty();
      response.forEach(function(person) {
        var newTr = "<tr>"
        newTr += "<td>" + person.title + "</td>";
        newTr += "</tr>";
        $("tbody").append(newTr);
      });
    })
      });


  $("#nameButton").click(function(e) {
    alert("Clicked name!")
  };

});
