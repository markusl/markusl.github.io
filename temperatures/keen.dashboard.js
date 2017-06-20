const client = new Keen({
  projectId: "594677f290b36562a4aed2e7",
  readKey: "5DF6E48C5E39D7F3AE068D332FCA76A23CAAD2041B8B079F0F2B5B23E7297036E3B6C0926FD714366A5EC67A2E1A5B152FCF8EB54C341E38A6C450E2DD283D4FA6DCCA3349AE426E544F81C697DF74C981E8EC0D911AF7A223B65F34919A0C7C"
});

const average_temperature_30_days = new Keen.Query("average", {
  eventCollection: "values",
  timeframe: "last_30_days",
  targetProperty: "value",
  interval: "hourly"
});
const average_temperature_24_hours = new Keen.Query("average", {
  eventCollection: "values",
  timeframe: "last_day",
  targetProperty: "value",
  interval: "hourly"
});
const current_temperature = new Keen.Query("average", {
  event_collection: "values",
  target_property: "value",
  timeframe: "this_2_hours",
  timezone: "UTC"
});

client.run(current_temperature, function(err, res){
  if (err) {
    document.getElementById('current-temp-value').innerText = err;
  }
  else {
    document.getElementById('current-temp-value-loading').style.display = "none";
    document.getElementById('current-temp-value').style.display = "block";
    document.getElementById('current-temp-value').innerText = res.result.toFixed(0) + " °C";
  }
});
const drawTemperature = function(data, chartId) {
  client.draw(data, document.getElementById(chartId), {
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
        width: "100%"
      }
    }
  });
};
const drawTemperature24hourAverage = () => drawTemperature(average_temperature_24_hours, "chart-01");
const drawTemperature30DayAverage = () => drawTemperature(average_temperature_30_days, "chart-02");
[drawTemperature30DayAverage, drawTemperature24hourAverage].forEach(Keen.ready);

$( window ).on( "orientationchange", function( event ) {
  drawTemperature24hourAverage();
  drawTemperature30DayAverage();
});
