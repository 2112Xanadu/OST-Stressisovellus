"use strict";

// Code for fetching information to homepage
const url = "http://localhost:3000"; // change url when uploading to server
const user = sessionStorage.getItem("user");
const userid = JSON.parse(user).userid;
const token = sessionStorage.getItem("token");

// Select element to display stress test result
const dailyStress = document.getElementById("ressi");

const printGraph = (stress) => {
  am5.ready(function () {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        title: "result",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "result",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        fill: am5.color(0x7cc7d3),
        stroke: am5.color(0x0a1045),
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );
    chart.children.unshift(
      am5.Label.new(root, {
        text: "Aiemmat tulokset",
        fontSize: 25,
        fontWeight: "350",
        x: am5.percent(50),
        centerX: am5.percent(50),
      })
    );

    // Set data readiness measurements
    /* var data = generateDatas(15);
      console.log(data); */
    let data = [];
    stress.forEach((element) => {
      if (element.result) {
        const timestamp = Date.parse(element.dateAndTime);
        data.push({
          date: timestamp,
          value: element.result,
        });
      }
    });
    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(500);
    chart.appear(500, 100);
  }); // end am5.ready()
};

// Function for displaying stress test result
const printStress = (stress) => {
  // Convert timestamp into a beautiful Finnish style date
  const testip = stress[stress.length - 1].dateAndTime;
  const ts = new Date(testip);
  const date1 = ts.getDate();
  const month1 = ts.getMonth();
  const year1 = ts.getFullYear();
  const dateToDisplay1 = date1 + "." + (month1 + 1) + "." + year1;

  // Insert html if data exists
  if (stress.length > 0) {
    const html = `<h3>Stressidata</h3>
                    <p>
                    <b>Päivämäärä: </b> ${dateToDisplay1}<br>
                    <b>Stressitasotestin tulos:</b> ${
                      stress[stress.length - 1].result
                    }<br>
                    <b>Omat muistiinpanot:</b> <br>${
                      stress[stress.length - 1].comment
                    }</p>`;
    dailyStress.innerHTML = html;
  }
};

// Function for fetching stress results
const getResult = async () => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url + "/stress/:userid", fetchOptions);
    const stress = await response.json();
    printStress(stress);
    printGraph(stress);
  } catch (e) {
    console.log(e.message);
  }
};
getResult();
