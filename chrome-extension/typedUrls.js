function buildUrlList() {

  // To look for history items visited in the last day,
  // subtract a day of microseconds from the current time.
  var microsecondsPerDay = 1000 * 60 * 60 * 24;
  var oneDayAgo = (new Date).getTime() - microsecondsPerDay;

  var urlArray = [];

  chrome.history.search({
      'text': '',
      'startTime': oneDayAgo
    },
    function(historyItems) {
      for (var i = 0; i < historyItems.length; ++i) {

        const data = historyItems[i].url;
        const request = new XMLHttpRequest();

        request.open('POST', "http://localhost:8000/timebudget/sites", true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 
        request.send(data);

        console.log(request);
      }          

    });
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("The DOM loaded");
  buildUrlList();
});
