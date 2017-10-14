var fancyText = document.getElementById('fancy');
var intervalTime = 150;
var initialPause = 1000;
var callbackPause = 500;


//callback is a function
function deleteContent(callback) {

    var intervalId = setInterval(function() {
        if (fancyText.innerHTML.length == 0) {
            clearInterval(intervalId);

            if (callback) {
                setTimeout(callback, callbackPause);
            }
        }

        fancyText.innerHTML = fancyText.innerHTML.substring(0, fancyText.innerHTML.length - 1);
    }, intervalTime);

}

function addContent(contentToAdd, callback) {
    var currentIndex = 0;

    var intervalId = setInterval(function() {
        if (currentIndex == contentToAdd.length) {
            clearInterval(intervalId);

            if (callback) {
                setTimeout(callback, callbackPause);
            }
        }

        fancyText.innerHTML = contentToAdd.substring(0, currentIndex);
        currentIndex++;
    }, intervalTime);
}

setTimeout(function() {
    deleteContent(function() {
        addContent("a Comp Sci major", function() {
            deleteContent(function() {
                addContent("in love with puppies", function() {
                    deleteContent(function() {
                        addContent("Alekya");
                    })
                });
            });
        });
    });
}, initialPause);


  function checkboxes()
        {
         var inputElems = document.getElementsByTagName("input"),
          count = 0;

          for (var i=0; i<inputElems.length; i++) {
             if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
                count++;

             }

          }
            alert(count);
       }
