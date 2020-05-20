import React from "react";
import d3tip from "d3-tip";
import * as d3 from "d3";
import jquery from "jquery";
import * as jqueryui from "jquery-ui-bundle";
import "./stylesheets/jquery-ui.min.css";
import "./stylesheets/jquery-ui.structure.min.css";
import "./stylesheets/jquery-ui.theme.min.css";


const Margin = { left: 80, right: 100, top: 50, bottom: 100 };
const Width = 800 - Margin.left - Margin.right;
const Height = 450 - Margin.top - Margin.bottom;

const QuarterTable = {
  "1": "QTR 1 (Jan - Mar 2015)",
  "2": "QTR 2 (Apr - Jun 2015)",
  "3": "QTR 3 (Jul - Sept 2015)",
  "4": "QTR 4 (Oct - Dec 2015)",
  "5": "QTR 5 (Jan - Mar 2016)",
  "6": "QTR 6 (Apr - Jun 2016)",
  "7": "QTR 7 (Jul - Sept 2016)",
  "8": "QTR 8 (Oct - Dec 2016)",
  "9": "QTR 9 (Jan - Mar 2017)",
  "10": "QTR 10 (Apr - Jun 2017)",
  "11": "QTR 11 (Jul - Sept 2017)",
  "12": "QTR 12 (Oct - Dec 2017)",
  "13": "QTR 13 (Jan - Mar 2018)",
  "14": "QTR 14 (Apr - Jun 2018)",
  "15": "QTR 15 (Jul - Sept 2018)",
  "16": "QTR 16 (Oct - Dec 2018)",
};

const LegendColor = {
  "Net Loss *": "#5F0B0B",
  "Balance / Net Gain **": "#FFC707",
};

const DateTable = {
  "1": "1/1/15 - 3/31/15",
  "2": "4/1/15 - 6/30/15",
  "3": "7/1/15 - 9/30/15",
  "4": "10/1/15 - 12/31/15",
  "5": "1/1/16 - 3/31/16",
  "6": "4/1/16 - 6/30/16",
  "7": "7/1/16 - 9/30/16",
  "8": "10/1/16 - 12/31/16",
  "9": "1/1/17 - 3/31/17",
  "10": "4/1/17 - 6/30/17",
  "11": "7/1/17 - 9/30/17",
  "12": "10/1/17 - 12/31/17",
  "13": "1/1/18 - 3/31/18",
  "14": "4/1/18 - 6/30/18",
  "15": "7/1/18 - 9/30/18",
  "16": "10/1/18 - 12/31/18",
};

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playButton: "Play",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const data = this.props.data;
    this.drawChart(data);
  }

  drawChart(data) {
    
    const g = d3.select(this.refs.chartArea)
      .append("svg")
      .attr("width", Width + Margin.left + Margin.right)
      .attr("height", Height + Margin.top + Margin.bottom)
      .append("g")
      .attr("transform", "translate(" + Margin.left + ", " + Margin.top + ")");

     var xLabel = g.append("text")
      .attr("x", Width / 2)
      .attr("y", Height + 50)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Total Number of Colonies per State");

    var yLabel = g.append("text")
      .attr("x", -170)
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Percentage of Colonies Lost (%)");

    var x = d3.scaleLog().base(10).range([0, Width]).domain([100, 10000000]);
    var y = d3.scaleLinear().range([Height, 0]).domain([0, 100]);
    var area = d3.scaleLinear().range([25 * Math.PI, 1000 * Math.PI]).domain([0, 250000]);

    var xAxisCall = d3
      .axisBottom(x)
      .tickValues([10, 1000, 10000, 100000, 1000000, 10000000])
      .tickFormat(d3.format(",.2r"));
    g.append("g")
      .attr("className", "x axis")
      .attr("transform", "translate(0," + Height + ")")
      .call(xAxisCall);

    var yAxisCall = d3.axisLeft(y).tickFormat(function (d) {
      return +d;
    });

    g.append("g").attr("className", "y axis").call(yAxisCall);

    var legend = g.append("g")
      .attr("transform", "translate(" + (Width - 10) + "," + (Height - 300) + ")");

    ["Net Loss *", "Balance / Net Gain **"].forEach(function (percentRange, i) {
      var legendRow = legend.append("g")
        .attr("transform", "translate(0, " + i * 20 + ")");

      legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", LegendColor[percentRange]);

      legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .text(percentRange);
    });

     var timeLabel = g
        .append("text")
        .attr("y", Height - 320)
        .attr("x", Width / 2)
        .attr("font-size", "25px")
        .attr("opacity", "0.4")
        .attr("text-anchor", "middle");

      var tip = d3tip()
        .attr("className", "d3-tip")
        .html(function (d) {
          var text =
            "<span style='font-size:14px;'>Name:</span> <span style='color:blue;text-transform:capitalize;font-weight:600;'>" +
            d.state +
            "</span><br>";
          text +=
            "<span style='font-size:14px;'>Data Period:</span> <span style='color:blue;font-weight:600;'>" +
            DateTable[d.table] +
            "</span><br>";
          text +=
            "<span style='font-size:14px;'>Total Number of Colonies:</span> <span style='color:blue;font-weight:600;'>" +
            d3.format(",.0f")(d.total) +
            " Colonies" +
            "</span><br>";
          text +=
            "<span style='font-size:14px;'>Lost Colonies:</span> <span style='color:red;font-weight:600;'>" +
            d3.format(",.0f")(d.lost) +
            " Colonies" +
            "</span><br>";
          text +=
            "<span style='font-size:14px;'>Percent Lost:</span> <span style='color:red;font-weight:600;'>" +
            d.percent_lost +
            "%" +
            "</span><br>";
          text +=
            "<span style='font-size:14px;'>Added:</span> <span style='color:purple;font-weight:600;'>" +
            d3.format(",.0f")(d.added) +
            " Colonies" +
            "</span><br>";
          text +=
            "<span style='font-size:14px;'>Renovated:</span> <span style='color:purple;font-weight:600;'>" +
            d3.format(",.0f")(d.renovated) +
            " Colonies" +
            "</span><br>";
          return text;
        });

        g.call(tip);

        var time = 0; // NOTE IT'S IMPORTANT TO KEEP MS LOWER THAN LOOP'S DELAY
      var workingData = this.props.data;
      var interval;

      jquery("#date-slider").slider({
          max: 16,
          min: 1,
          step: 1,
          value: 1,
          slide: function (event, ui) {
            time = ui.value - 1;
            update(workingData[time]);
          },
        });

      function update(data) {
        var t = d3.transition().duration(250);

        var percentRange = jquery(
          "#percentRange-select"
        ).val();

        var currentData = data.filter(function (d) {
          if (percentRange === "all") {
            return true;
          } else if (percentRange >= 10) {
            return d.percent_lost >= percentRange;
          } else {
            return d.percent_lost <= percentRange;
          }
        });

        var circles = g
          .selectAll("circle")
          .data(currentData, function (d) {
            return d.state;
          });

        circles.exit().attr("className", "exit").remove();

        circles
          .enter()
          .append("circle")
          .attr("className", "enter")
          .attr("stroke", "orange")
          .attr("fill", function (d) {
            if (d.added_together >= d.lost) {
              return LegendColor["Balance / Net Gain **"];
            } else {
              return LegendColor["Net Loss *"];
            }
          })
          .on("mouseover", tip.show) // EVENT HANDLERS ADDED BEFORE UPDATE
          .on("mouseout", tip.hide)
          .merge(circles) // UPDATES OLD ELEMENTS PRESENT IN NEW DATA
          .transition(t)
          .transition(d3.transition().duration(500)) // SWAP OUT FOR VARIABLE
          .attr("cy", function (d) {
            return y(d.percent_lost);
          })
          .attr("cx", function (d) {
            return x(d.total);
          })
          .attr("r", function (d) {
            return Math.sqrt(area(d.lost) / Math.PI);
          });

        timeLabel.text(QuarterTable[time + 1]);

        // jquery("#period")[0].innerHTML = +(time + 1);
        // jquery("#date-slider").slider("value", time + 1);
      }

      update(workingData[0]);

      

      jquery("#play-button").on("click", function () {
        if (jquery("#play-button").val() === "Play") {
          jquery("#play-button").text("Pause");
          interval = setInterval(step, 500);
        } else { jquery("#play-button").text("Play");
          clearInterval(interval)}
      });

      jquery("#reset-button").on("click", function () {
        time = 0;
        update(workingData[0]);
      });

      jquery("#percentRange-select").on("change", function () {
        update(workingData[time]);
      });


      function step() {
        time = (time < 16) ? (time + 1) : (0); // ONCE GO THROUGH ALL DATA, LOOP BACK
        update(workingData[time]);
      }




  //   svgCanvas.selectAll("rect")
  //       .data(data).enter()
  //           .append("rect")
  //           .attr("width", 40)
  //           .attr("height", (datapoint) => datapoint * scale)
  //           .attr("fill", "orange")
  //           .attr("x", (datapoint, iteration) => iteration * 45)
  //           .attr("y", (datapoint) => canvasHeight - datapoint * scale)

  //   svgCanvas.selectAll("text")
  //   .data(data).enter()
  //       .append("text")
  //       .attr("x", (dataPoint, i) => i * 45 + 10)
  //       .attr("y", (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
  //       .text(dataPoint => dataPoint)
  // }


}


  handleClick() {
    return (e) => {
      this.state.playButton === "Play" ? this.setState({ playButton: "Pause" }) : this.setState({ playButton: "Play" });
    };
  }

  render() {
  
    // if (this.props.data) {

      return (
        <div>
          <button
            onClick={this.handleClick()}
            id="play-button"
            value={this.state.playButton}
          >
            Play
          </button>
          <button id="reset-button">Reset</button>

          <div id="slider-div">
            <label>
              Quarter <span id="period"></span>
            </label>
            <div id="date-slider"></div>
          </div>
          <div>
            <select
              id="percentRange-select"
              className="form-control"
            >
              <option selected value="all">
                All
              </option>
              <option value="50">
                Lost more than 50%
              </option>
              <option value="25">
                Lost more than 25%
              </option>
              <option value="10">
                Lost more than 10%
              </option>
              <option value="9">Less than 10% Loss</option>
              <option value="5">Less than 5% Loss</option>
              <option value="2">Less than 2% Loss</option>
              <option value="1">Less than 1% Loss</option>
            </select>
          </div>

          <div>
            {/* <svg id="chart-area"></svg> */}
            <div ref="chartArea"></div>

            <div id="asterisk">
              * Number of Added + Renovated Colonies Less
              Than Number of Lost Colonies
            </div>
            <div id="asterisk">
              ** Number of Added + Renovated Colonies
              Greater Than or Equal to Number of Lost
              Colonies
            </div>
          </div>
          <div id="cite-source">
            National Agricultural Statistics Service
            (NASS), Agricultural Statistics Board, United
            States Department of Agriculture (USDA).
            (2019).
            <span id="make-italic">
              {" "}
              Honey Bee Colonies
            </span>{" "}
            [Data set]. United States Department of
            Agriculture / Economics, Statistics and Market
            Information System. Retrieved from{" "}
            <span id="make-underline">
              https://usda.library.cornell.edu/concern/publications/rn301137d
            </span>
          </div>
        </div>
      );
    // } else {
    //   return <div>Sorry</div>;
    // } 
  }
}

export default Graph;