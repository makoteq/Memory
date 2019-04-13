var png = [
  "img/title_0.png",
  "img/title_1.png",
  "img/title_2.png",
  "img/title_3.png",
  "img/title_4.png",
  "img/title_5.png"
];
var razy =0;
var array = [];
var los1 = "";
var los2 = "";
var click = 0;
var sukces = 0;
var blad = 0;
var color = 0;
var blokada = 0;
var level = 0;
var blokada2 = 0; /*blokada do levelow*/
var username = "";
var mode ="";
var txt ="";
var regex = /((?:w|wy|za|po|przy|z|s|pod|do|od|na|o|roz|ros|nad)?(?:jeb|w?kure?w(?:ysyn|skie)?|pierd[oa]l|dup(?:cz)?|c?huj|c?hój|srań|pizd|rucha(?:ńsk(?:[oau]|iem))|szmac|szmato?)(?:ow[eayo]|owion[aye]|onych|on[yea]|nąć|anymi|anie|n[aye]|an[yiaeą]|ańc[eu]|wsz[ay]|ili|iły|ił[oa]?|ion[yae]|iście|i?a?[ćę]|c?ów|c?u|ie(?:my|sz)|[aąyeę])?|sesja|gówn(?:[ao]|om|ie|ian[eay])|dziwk(?:a(?:rski|rz|rka)?|i|om?|ce)|su(?:kowat[eayo]|k[aio]|ce))/;
/*get url variable*/
window.onload = function checkUrl(){
  /*animacja przejscia strony*/
    $('body').fadeIn(800);
    var url_string = window.location.href; 
    var url = new URL(url_string);
    razy= url.searchParams.get("razy");
    mode = url.searchParams.get("mode");
    console.log(razy/2);
    console.log(mode);
  for (i = 0; i <= razy-1; i++) {
    txt +=" <div class='pole' id='blok"+i+"' onclick=spr("+i+")><img src='"+png[Math.floor(i / 2)]+"' class='img' id='img"+i+"'></div>";
  }
    document.getElementById("contener").innerHTML =txt;
}
function repeat(){
  if ($(".repeat").css('transform') == 'none') {
    $(".repeat").css({'transform': 'rotate(360deg)'});
  } else {
    $(".repeat").css({'transform': ''});
  };
  setTimeout(function() {
    init();
  }, 500);
}

function init(){
  blokada2 = 0;
  level = 0;
  document.getElementById("licznik").innerHTML = level;
    for (i = 0; i < razy; i++) {
      document.getElementById("img" + i).style.display = "none";
      document.getElementById("img" + i).src = "";
    }
  document.getElementById("button").innerHTML = "let's start";
}

function Zaczynamy() {
  /* inicjalizacja */
  document.getElementById("button").innerHTML = "finish the level";
  color = 0;
  sukces = 0;
  blad = 0;
  los1 = 0;
  los2 = 0;
  click = 0;
  blokada = 0;
  if (blokada2 == 1) {
    swal({
      icon:"error",
      closeOnClickOutside: false,
      title: "Damn it...",
      text: "You can click only once",
    }).then(function (value) {
      theEnd();
    });
  }
  document.getElementById("licznik").innerHTML = level;
  //generowanie par+resetowanie koloru pol
  for (i = 0; i < razy; i++) {
    array.push(Math.floor(i / 2));
    document.getElementById("img" + i).style.display = "none";
    document.getElementById("img" + i).src = "";
  }
  //mieszanie tablicy
  for (i = razy - 1; i > 0; i--) {
    var swap = Math.floor(Math.random() * i);
    var tmp = array[i];
    array[i] = array[swap];
    array[swap] = tmp;
  }
  for (i = 0; i < razy; i++) {
    document.getElementById("img" + i).style.display = "block";
    document.getElementById("img" + i).src = png[array[i]];
    blokada2 = 1;
  }
  setTimeout(function() {
    for (i = 0; i < razy; i++) {
      document.getElementById("img" + i).style.display = "none";
      document.getElementById("img" + i).src = "";
      blokada = 1;
    }
  }, 3000);
}
function spr(id) {
  //blokada
  if (blokada == 1) {
    if (click == 1) {
      document.getElementById("img" + id).style.display = "block";
      document.getElementById("img" + id).src = png[array[id]];
      los2 = array[id];
      click = 0;
      if (los1 == los2 && id != color) {
        sukces++;
        document.getElementById("img" + id).style.display = "block";
        document.getElementById("img" + color).style.display = "block";
        document.getElementById("img" + id).src =png[array[id]];
        document.getElementById("img" + color).src =png[array[id]];
      } else if (los1 != los2) {
        setTimeout(rem, 1000, id, color);
        blad++;
      } else if (los1 == los2 && id == color) {
        rem(id, color);
        blad++;
      }
    } else {
      document.getElementById("img" + id).style.display = "block";
      document.getElementById("img" + id).src = png[array[id]];
      los1 = array[id];
      color = id;
      click = 1;
      console;
    }
    if(mode=="Medium"){
      if (((sukces==6) &&(sukces + blad == 6))||((sukces== 6)&&(sukces + blad == 7))) {
        document.getElementById("button").innerHTML = "next level";
        level++;
        blokada = 0;
        blokada2 = 0;
      } else if (sukces + blad>6) {
        theEnd();
      }
    }else
    if (sukces == razy/2 && sukces + blad == razy/2 ) {
      document.getElementById("button").innerHTML = "next level";
      level++;
      blokada = 0;
      blokada2 = 0;
    } else if (sukces + blad == razy/2) {
      theEnd();
    }
  }
}
function rem(id1, color1) {
  document.getElementById("img" + id1).style.display = "none";
  document.getElementById("img" + color1).style.display = "none";
  document.getElementById("img" + id1).src = "";
  document.getElementById("img" + color1).src = "";
}
function theEnd() {
  //modalbox from SweetAlert :-D
  swal({
    closeOnClickOutside: false,
    title: "Oh noo... you lose... next time will be better",
    text: "You complite " + level + " levels",
    icon: "error",
    buttons: {
      main: "MAIN MENU",
      reload: "Let's play again",
      score: "SAVE SCORE"
    }
  }).then(function (value) {
    switch (value) {
      case "main":
        window.location.assign("index.html");
        break;

      case "reload":
        repeat()
        break;

      case "score":
        addUserName();
        break;
    }
  });
}
function addUserName() {
  if(level>0){
  swal({
    closeOnClickOutside: false,
    content: {
      element: "input",
      attributes: {
        placeholder: "Write your username (max 10 characters)"
      }
    }
  }).then(function (value) {
    check(value);
  });
}else{
  swal({
    closeOnClickOutside: false,
    title:"Oh crap!",
    text:"You didn't completed enough levels!",
    button: "OK"
  })
  .then(function (value) {
    repeat();
  });
}
}

function saveScore(username) {
  $.ajax({
    url: "insert.php",
    type: "POST",
    data: {
      Mode:mode,
      level: level,
      nick: username
    },
    success: function(result) {
      swal({
        closeOnClickOutside: false,
        title: "Good job! " + username,
        text: "Your score will bee add to database :-D",
        icon: "success",
        button: "NICE!"
      })
      .then(function (value) {
        window.location.assign("index.html");
      });
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert("Sorry something went wrong!");
    }
  });
}
function check(vol){
  var found = vol.toLowerCase().match(regex);
  if(vol.length>10 || vol.length<=0  ){
    addUserName();
    }else{
      if (found!= null){
        swal({
          icon:"error",
          closeOnClickOutside: false,
          title: "I co?",
          text: "Myślisz że jesteś śmieszny wpisując przekleństwa? ( ͡° ͜ʖ ͡°)",
        }).then(function (value) {
          addUserName();
        });
      }else{
      saveScore(vol);
    }
  }
}