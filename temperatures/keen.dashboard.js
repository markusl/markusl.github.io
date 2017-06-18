const client = new Keen({
  projectId: "594677f290b36562a4aed2e7",
  readKey: "5DF6E48C5E39D7F3AE068D332FCA76A23CAAD2041B8B079F0F2B5B23E7297036E3B6C0926FD714366A5EC67A2E1A5B152FCF8EB54C341E38A6C450E2DD283D4FA6DCCA3349AE426E544F81C697DF74C981E8EC0D911AF7A223B65F34919A0C7C"
});

Keen.ready(function() {

  // ----------------------------------------
  // Average temperatures chart
  // ----------------------------------------
  const average_temperature = new Keen.Query("average", {
    eventCollection: "values",
    timeframe: "last_30_days",
    targetProperty: "value",
    interval: "hourly"
  });
  client.draw(average_temperature, document.getElementById("chart-01"), {
    chartType: "areachart",
    title: false,
    height: 250,
    vAxis: { title: 'Temperature °C', minValue: 17, maxValue: 25 },
    width: "auto",
    chartOptions: {
      interpolateNulls: true,
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "80%"
      }
    }
  });

});
