var fancyText = document.getElementById('fancy');
var intervalTime = 150;
var initialPause = 1000;
var callbackPause = 500;

var questionTypeMap = {};

firebase.database().ref('questions').on('value', function(snapshot) {
  // console.log(snapshot.val())
  var snapshotMap = snapshot.val();
  var keys = Object.keys(snapshotMap);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
    }
    return array;
  }

keys = shuffle(keys);

  for (var i = 0; i < Math.min(keys.length, 15); i++) {
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


    document.getElementById("questions").appendChild(questionNode);
  }

});



function writeUserScore(social, totalSocial, academic, totalAcademic, timestamp) {
  firebase.database().ref('user-scores').push({
    "social": social,
    "academic": academic,
    "total-social": totalSocial,
    "total-academic": totalAcademic,
    "timestamp": timestamp
  });
}

var idQuestions = document.getElementById('questions');

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

  var timestamp = new Date().getTime();
  writeUserScore(social, totalSocial, academic, totalAcademic, timestamp);

  myScatter.data.datasets[1].data.push(
    {
      x: toInteger((social/totalSocial)*100),
      y: toInteger((academic/totalAcademic)*100),
    }
  );
  myScatter.update();

  var quizContainer = document.getElementById('quiz-wrapper');
    quizContainer.style.display = 'none';
}

//Chart

var color = Chart.helpers.color;
var scatterChartData = {

    datasets: [{
        // label: "Responses",
        displayLabel: false,
        pointRadius: 6,
        borderColor: window.chartColors.blue,
        backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
        data: [{

        }]

        },{
        // label: "You",
        pointRadius: 7,
        borderColor: window.chartColors.red,
        backgroundColor: color(window.chartColors.red).alpha(0.6).rgbString(),
        data: [{

        }]
    }]
};
window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.canvas.width = 300;
    ctx.canvas.height = 300;
    var myScatter = Chart.Scatter(ctx, {
        data: scatterChartData,
        options: {
            legend: {
              display: false
            },
            title: {
                display: true,
                text: 'Results',
                fontSize: 20
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Buzz",
                  fontSize: 20},
                ticks: {
                  beginAtZero: true,
                  steps: 10,
                  stepValue: 5,
                  max: 100,
                  fontSize: 20
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Bud",
                  fontSize: 20
                },
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: 100,
                    fontSize: 20
                }
              }]
            }
          }
        });
        window.myScatter = myScatter;
      };

function toInteger(number){
    return Math.round(
    Number(number)
  );
};
var userScoresRef = firebase.database().ref('user-scores');
userScoresRef.orderByChild("timestamp").limitToLast(50).once('value').then(function(snapshot) {
  var val = snapshot.val();
  const keys = Object.keys(val);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];

    var totalSocial = val[key]["total-social"];
     var totalAcademic = val[key]["total-academic"];

     var social = val[key].social;
     var academic = val[key].academic;

     myScatter.data.datasets[0].data.push(
         {
           x: toInteger((social/totalSocial)*100),
           y: toInteger((academic/totalAcademic)*100),
         }
       );
  }
  myScatter.update();
});
