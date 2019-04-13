function howToPlay(){
  swal({
    closeOnClickOutside: false,
    title: "How to play (detailed description of modes)",
    text: "Easy Mode:8 blocks no chances to miss | Medium Mode:12 blocks one chance to miss | Hard Mode:12 blocks no chances to miss",
  })
}

$(document).ready(function() {
  $('body').fadeIn(400);
  if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem("start")!=1){
      swal({
        closeOnClickOutside: false,
        icon: "info",
        title: "Hi, nice to see you",
        text: "If you want check rules of the game. Please click question mark next to the big Memory word"
      })
      localStorage.setItem("start", "1");
    }
  } else {
   alert("Sorry, your browser does not support Web Storage...");
  }
  if (window.matchMedia("(max-width: 500px)").matches) {
    $(".fb-like").attr("data-size", "small");
  }
  $("#button").click(function() {
    $(".tryb").slideToggle(100);
  });
  $.ajax({
    type: "POST",
    url: "tp_server.php",
    success: function(result) {
      var obj = JSON.parse(result);
      var txt="<p class='par' style='color:red;'>Username  |  Score  |  Mode</p>";
      for (i = 0; i < 3; i++) {
        txt += "<p class='paragraf'>" + obj.results[i].username+"  |  " + obj.results[i].level+"  |  "+obj.results[i].Mode+ "</p>";
      }
      $("#list").html(txt);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }
  });
});
