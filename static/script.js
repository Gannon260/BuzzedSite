var fancyText = document.getElementById('fancy');
var intervalTime = 150;
var initialPause = 1000;
var callbackPause = 500;

var questionTypeMap = {};

// populate questions
firebase.database().ref('questions').on('value', function(snapshot) {
  console.log(snapshot.val())
  var snapshotMap = snapshot.val();
  var keys = Object.keys(snapshotMap);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    console.log(key);
    questionTypeMap[snapshotMap[key].question] = snapshotMap[key].type;
  }
  console.log(questionTypeMap);
});



function writeUserScore(social, academic, timestamp) {
  firebase.database().ref('user-scores').push({
    social: social,
    academic: academic,
    timestamp: timestamp
  });rue
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
    if(i%2 == 1 && inputElems[i].type == "checkbox"
     && inputElems[i].checked == true)
    {
      even++;

    }

  }

  function writeQuestion(type, question) {
    firebase.database().ref('questions').push({
      type: type,
      question: question
    });
  }

  var timestamp = new Date().getTime()

  document.getElementById("printed").innerHTML = odd+even;
  //writeUserScore(odd, even, timestamp);
  //writeQuestion("consistency", "Whats the diff between Jam and Jelly?");
  //writeQuestion("it hurt when i did", "Did it hurt when you fell from Tennessee?");
}
