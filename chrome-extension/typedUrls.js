
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
        console.log(historyItems[i])


      }          

    });
}

document.addEventListener('DOMContentLoaded', function() {
  buildUrlList();
});
