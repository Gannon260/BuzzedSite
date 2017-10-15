var fancyText = document.getElementById('fancy');
var intervalTime = 150;
var initialPause = 1000;
var callbackPause = 500;

function writeUserScore(social, academics, Usertime) {
  firebase.database().ref('user-scores').push({
    social: social,
    academics: academics,
    Usertime: Usertime
  });
}

function submitQuiz()
{
  var inputElems = document.getElementsByTagName("input"),
  count = 0;


  var odd=0;
  var even=0;

  for (var i=0; i<inputElems.length; i++) {
    if(i%2 == 0 && inputElems[i].type == "checkbox" && inputElems[i].checked == true)
    {
      odd++;

    }
    if(i%2 == 1 && inputElems[i].type == "checkbox" && inputElems[i].checked == true)
    {
      even++;

    }

  }

  var Usertime = new Date().getTime()

  document.getElementById("printed").innerHTML = odd+even;
  writeUserScore(odd, even, Usertime);
}
