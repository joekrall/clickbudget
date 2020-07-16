
//Maybe make a button such that we can get a timestamp onClick
//And set startTime to that time so that we only get a list
//Of what hasn't been gotten

// Reinvent as ClickBudget. Where do you clicks go?
// You can set goals. It's not so much the time as the power of the initial click

function buildUrlList() {

  // To look for history items visited in the last day,
  // subtract a day of microseconds from the current time.
  var microsecondsPerDay = 1000 * 60 * 60 * 24;
  var oneDayAgo = (new Date).getTime() - microsecondsPerDay;

  var urlArray = [];

  // I'd like to get it to work at startTime: sinceLastClick
  chrome.history.search({
      'text': '',
      'startTime': oneDayAgo,
      'maxResults': 10000
    },
    function(historyItems) {
      // Replace with historyItems.length at some point
      for (var i = 0; i < historyItems.length; ++i) {
        console.log(historyItems[i]);

        fetch('http://localhost:8000/sites', {
          method: 'post',
          headers: {
            'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
        },
          body: `lastVisitTime=${historyItems[i].lastVisitTime}&title=${historyItems[i].title}&url=${historyItems[i].url}&typedCount=${historyItems[i].typedCount}&visitCount=${historyItems[i].visitCount}`
        })
        .then(function (data) {
          console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });

      }          

    });
}

document.addEventListener('DOMContentLoaded', function() {
  buildUrlList();
});
