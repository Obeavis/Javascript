  let views = [];
  let months = [];
  $.getJSON("http://dev.4all.com:3050/pageViews", function(data) {

    $.each(data, function (key,value){
    months.push(value.month);
  });
    $.each(data, function (key,value){
    views.push(value.views);
  });

  
  }).then(function() {
  const ctx = document.getElementById('MyChart');

  const chartGraph = new Chart (ctx, {
    type: 'line',
    data: {
          labels: months,
          
          datasets: [{
            label: "Site traffic overview",
            fillColor : "rgba(220,220,220,0.5)",
            backgroundColor: 'rgb(129, 198, 2228)',
            borderColor: 'rgb(0, 150, 215)',

            data: views
          }]
      },
      options: {
          responsive: 'true',
          title: {
            position : "top, bottom",

            display: true,
        }
      }
    });
  });