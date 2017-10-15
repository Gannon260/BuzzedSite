var fancyText = document.getElementById('fancy');
var intervalTime = 150;
var initialPause = 1000;
var callbackPause = 500;

var questionTypeMap = {};

// populate questions
firebase.database().ref('questions').on('value', function(snapshot) {
  // console.log(snapshot.val())
  var snapshotMap = snapshot.val();
  var keys = Object.keys(snapshotMap);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    // console.log(key);
    questionTypeMap[snapshotMap[key].question] = snapshotMap[key].type;

    var questionNode = document.createElement("div");
    questionNode.class = "question";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = "checkbox";
    questionNode.appendChild(input);
    var label = document.createElement("span");
    label.innerHTML = snapshotMap[key].question;
    label.style.margin = 0;
    questionNode.appendChild(label);

    // var textnode = document.createTextNode(snapshotMap[key].question);
    // node.appendChild(textnode);
    document.getElementById("questions").appendChild(questionNode);
  }
  // document.getElementById("questions").style.display = 'none';
//  console.log(questionTypeMap);
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
  var questionElement = document.getElementById("questions"),
  count = 0;

  var social = 0;
  var academic = 0;
  var totalSocial = 0;
  var totalAcademic = 0;

  var nodeList = questionElement.childNodes;

  for (var i = 1; i < nodeList.length; i++) {
    var node = nodeList[i];
    var input = node.childNodes[0];
    var question = node.childNodes[1].innerHTML;

    console.log(input);
    console.log(question);
    console.log(questionTypeMap[question]);
    //type of question
    if (questionTypeMap[question] == "social"){
      totalSocial++;
        if (input.checked) {
        social++;
      }
  }

    if (questionTypeMap[question] == "academic"){
      totalAcademic++;
        if (input.checked) {
        academic++;
      }
    }
    console.log(social);
    console.log(totalSocial);
    console.log(academic);
    console.log(totalAcademic);

  }

  // var odd=0;
  // var even=0;
  //
  //
  // for (var i=0; i<inputElems.length; i++) {
  //   if(i%2 == 0 && inputElems[i].type == "checkbox" && inputElems[i].checked == true)
  //   {
  //     odd++;
  //
  //   }
  //   if(i%2 == 1 && inputElems[i].type == "checkbox"
  //    && inputElems[i].checked == true)
  //   {
  //     even++;
  //
  //   }
  //
  // }
  //
  // function writeQuestion(type, question) {
  //   firebase.database().ref('questions').push({
  //     type: type,
  //     question: question
  //   });
  // }

  var timestamp = new Date().getTime()

  // document.getElementById("printed").innerHTML = odd+even;
  writeUserScore(odd, even, timestamp);
  //writeQuestion("consistency", "Whats the diff between Jam and Jelly?");
  //writeQuestion("it hurt when i did", "Did it hurt when you fell from Tennessee?");
}
