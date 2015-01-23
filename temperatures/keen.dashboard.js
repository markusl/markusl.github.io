var client = new Keen({
  projectId: "54ba3608d2eaaa159f67ea9e",
  readKey: "11fe19b03e98e9e8cbc207e68864864ba8136edbfe83b554ef11f1a8c67855204f8861b15775393b02598c9ac5a0efe174071f8d7e697799bd046cbb84d8076db3d87589995c52254b2bda500d648324fb39a3a0f7e7decc2e4127abe771e640a4ab8a94ab90be63e085ce7272da8944"
});

Keen.ready(function() {

  // ----------------------------------------
  // Average temperatures chart
  // ----------------------------------------
  var average_temperature = new Keen.Query("average", {
    eventCollection: "sensors",
    timeframe: "this_month",
    targetProperty: "value",
    interval: "hourly"
  });
  client.draw(average_temperature, document.getElementById("chart-01"), {
    chartType: "areachart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "80%"
      }
    }
  });

});
