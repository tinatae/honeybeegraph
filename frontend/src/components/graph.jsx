import React from "react";
import d3tip from "d3-tip";
import * as d3 from "d3";
import jquery from "jquery";
import * as jqueryui from "jquery-ui-bundle";
import "./stylesheets/jquery-ui.min.css";
import "./stylesheets/jquery-ui.structure.min.css";
import "./stylesheets/jquery-ui.theme.min.css";
import "./stylesheets/style.css";
import { forceCenter } from "d3";

const Margin = { left: 80, right: 20, top: 20, bottom: 100 };
const Width = 650 - Margin.left - Margin.right;
const Height = 400 - Margin.top - Margin.bottom;

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
  "17": "QTR 17 (Jan - Mar 2019)",
  "18": "QTR 18 (Apr - Jun 2019)",
  "19": "QTR 19 (Jul - Sept 2019)",
  "20": "QTR 20 (Oct - Dec 2019)",
  "21": "QTR 21 (Jan - Mar 2020)",
  "22": "QTR 22 (Apr - Jun 2020)",
};

const LegendColor = {
  "NET LOSS *": "rgb(252, 238, 157)",
  "BALANCE / NET GAIN **": "rgb(255, 185, 8)",
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
  "17": "1/1/19 - 3/31/19",
  "18": "4/1/19 - 6/30/19",
  "19": "7/1/19 - 9/30/19",
  "20": "10/1/19 - 12/31/19",
  "21": "1/1/20 - 3/31/20",
  "22": "4/1/20 - 6/30/20",
};

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playButton: "Play",
    };

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const data = this.props.data;
    this.drawChart(data);
  }

  drawChart(data) {
    const g = d3
      .select(this.refs.chartArea)
      .append("svg")
      .attr("width", Width + Margin.left + Margin.right)
      .attr("height", Height + Margin.top + Margin.bottom)
      .append("g")
      .attr("transform", "translate(" + Margin.left + ", " + Margin.top + ")");

      g.append("text")
      .attr("x", Width/2)
      .attr("y", Height+50)
      .attr("font-size", "16px")
      .attr("text-anchor", "middle")
      .text("Total Number of Honey Bee Colonies Per State (#)");
     
      g.append("text")
      .attr("x", -140)
      .attr("y", -40)
      .attr("font-size", "16px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Percentage of Colonies Lost (%)");

    var x = d3.scaleLog().base(10).range([0, Width]).domain([100, 3000000]);
    var y = d3.scaleLinear().range([Height, 0]).domain([0, 100]);
    var area = d3
      .scaleLinear()
      .range([25 * Math.PI, 1000 * Math.PI])
      .domain([0, 250000]);

    var xAxisCall = d3
      .axisBottom(x)
      .tickValues([10, 1000, 10000, 100000, 1000000])
      .tickFormat(d3.format(",.2r"));
    g.append("g")
      .attr("className", "x axis")
      .attr("transform", "translate(0," + Height + ")")
      .style("font-size", "13px")
      .call(xAxisCall);

    var yAxisCall = d3.axisLeft(y).tickFormat(function (d) {
      return +d;
    });
    g.append("g")
      .attr("className", "y axis")
      .style("font-size", "13px")
      .call(yAxisCall);

    var legend = g
      .append("g")
      .attr(
        "transform",
        "translate(" + (Width - 10) + "," + (Height - 240) + ")"
      );

    ["NET LOSS *", "BALANCE / NET GAIN **"].forEach(function (percentRange, i) {
      var legendRow = legend
        .append("g")
        .attr("transform", "translate(0, " + i * 20 + ")");

      legendRow
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", LegendColor[percentRange])
        .attr("stroke", "#5F0B0B");

      legendRow
        .append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("font-size", "13px")
        .style("fill", "rgb(150, 7, 7)")
        .text(percentRange);
    });

    var timeLabel = g
      .append("text")
      .attr("y", Height - 250)
      .attr("x", Width / 2)
      .attr("font-size", "25px")
      .attr("opacity", "0.4")
      .attr("text-anchor", "middle");

    var time = 0; // NOTE IT'S IMPORTANT TO KEEP MS LOWER THAN LOOP'S DELAY
    var workingData = this.props.data;
    var interval;

    var tip = d3tip()
      .attr("className", "d3-tip")
      .html(function (d) {
        var text =
          "<span style='font-size:12px;'>Name:</span> <span style='font-size:12px; color:blue; text-transform:capitalize; font-weight:600;;'>" +
          d.state +
          "</span><br>";
        text +=
          "<span style='font-size:12px;'>Data Period:</span> <span style='font-size:12px; color:blue; font-weight:600;'>" +
          DateTable[d.table] +
          "</span><br>";
        text +=
          "<span style='font-size:12px;'>Total # of Colonies:</span> <span style='font-size:12px; color:blue; font-weight:600;'>" +
          d3.format(",.0f")(d.total) +
          " Colonies" +
          "</span><br>";
        text +=
          "<span style='font-size:12px;'>Lost:</span> <span style='font-size:12px; color:rgb(210, 22, 22); font-weight:600;'>" +
          d3.format(",.0f")(d.lost) +
          " Colonies" +
          "</span><br>";
        text +=
          "<span style='font-size:12px;'>Percent Lost:</span> <span style='font-size:12px; color:rgb(210, 22, 22); font-weight:600;'>" +
          d.percent_lost +
          "%" +
          "</span><br>";
        text +=
          "<span style='font-size:12px;'>Added:</span> <span style='font-size:12px; color:#5F0B0B;font-weight:600;'>" +
          d3.format(",.0f")(d.added) +
          " Colonies" +
          "</span><br>";
        text +=
          "<span style='font-size:12px;'>Renovated:</span> <span style='font-size:12px; color:#5F0B0B; font-weight:600;'>" +
          d3.format(",.0f")(d.renovated) +
          " Colonies" +
          "</span><br>";
        return text;
      });
      tip.style("background-color", "white").style("padding", "3px").style("border", "1px solid black").style("z-index", "999").style("width", "205px")
    g.call(tip);

    jquery("#date-slider").slider({
      max: 22,
      min: 1,
      step: 1,
      value: 1,
      slide: function (event, ui) {
        time = ui.value - 1;
        update(workingData[time]);
      },
    });

    update(workingData[0]);

    jquery("#play-button").on("click", function () {
      if (jquery("#play-button").val() === "Play") {
        jquery("#play-button").text("Pause");
        interval = setInterval(step, 430);
      } else {
        jquery("#play-button").text("Play");
        clearInterval(interval);
      }
    });

    jquery("#reset-button").on("click", function () {
      time = 0;
      update(workingData[0]);
    });

    jquery("#percentRange-select").on("change", function () {
      update(workingData[time]);
    });

    function step() {
      time = time < 22 ? time + 1 : 0; // ONCE GO THROUGH ALL DATA, LOOP BACK
      update(workingData[time]);
    }

    function update(data) {

      var t = d3.transition().duration(250);

      var percentRange = jquery("#percentRange-select").val();

      var currentData = data.filter(function (d) {
        if (percentRange === "all") {
          return true;
        } else if (percentRange >= 10) {
          return d.percent_lost >= percentRange;
        } else {
          return d.percent_lost <= percentRange;
        }
      });

      var circles = g.selectAll("circle").data(currentData, function (d) {
        return d.state;
      });

      circles.exit().attr("className", "exit").remove();

      circles
        .enter()
        .append("circle")
        .attr("className", "enter")
        .attr("stroke", function (d) {
          if (d.added_together >= d.lost) {
            return "orange";
            // return "#5F0B0B";
          } else {
            return "rgb(150, 7, 7)";
          }
        })
        .attr("fill", function (d) {
          if (d.added_together >= d.lost) {
            return LegendColor["BALANCE / NET GAIN **"];
          } else {
            return LegendColor["NET LOSS *"];
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

      jquery("#period")[0].innerHTML = time + 1;
      jquery("#date-slider").slider("value", time + 1);
    }
  }

  handleClick() {
    return (e) => {
      this.state.playButton === "Play"
        ? this.setState({ playButton: "Pause" })
        : this.setState({ playButton: "Play" });
    };
  }

    render() {
 
      if (this.props.data) {

        return (
          <div className="outer">
            <div id="me">
                <div>
                  <i
                    id="link"
                    className="fab fa-github"
                    title="&#11041; Project Code"
                    onClick={() =>
                      window.location.replace(
                        "https://github.com/tinatae/honeybeegraph.git"
                      )
                    }
                  ></i>
                </div>
                <div>
                  <i
                    id="link"
                    className="fab fa-linkedin"
                    title="&#11041; 🐝"
                    onClick={() =>
                      window.location.replace(
                        "https://www.linkedin.com/in/tina-tae-87a3ba18/"
                      )
                    }
                  ></i>
                </div>
                <div>
                  <i id="link" className="fas fa-feather-alt" title="&#11041; Portfolio" onClick={() =>
                    window.location.replace(
                      "https://tinatae.com"
                    )
                  }></i>
                </div>
            </div>


            <div className="whole">
              <div id="title">
                <img id="comb-4" src="/4comb.svg" alt="4 hexagon honeycomb abstract" />
                <h2>
                  H&nbsp;O&nbsp;N&nbsp;E&nbsp;Y&nbsp;B&nbsp;E&nbsp;E&emsp;C&nbsp;O&nbsp;L&nbsp;O&nbsp;N&nbsp;Y&emsp;C&nbsp;O&nbsp;U&nbsp;N&nbsp;T&emsp;B&nbsp;Y&emsp;S&nbsp;T&nbsp;A&nbsp;T&nbsp;E&emsp;(&nbsp;U.S.&nbsp;)
                </h2>
              </div>
              <h3>( 2 0 1 5 - 2 0 2 0 )</h3>

              <div id="top-row">
                <select id="percentRange-select" className="form-control">
                  <option value="all">Show All States</option>
                  <option disabled value="">
                    &emsp;--&emsp;&emsp;⬡&emsp;&emsp;--&emsp;
                  </option>
                  <option value="50">50% or Greater Loss</option>
                  <option value="25">25% or Greater Loss</option>
                  <option value="10">10% or Greater Loss</option>
                  <option disabled value="">
                    &emsp;--&emsp;&emsp;⬡&emsp;&emsp;--&emsp;
                  </option>
                  <option value="9">Less Than 10% Loss</option>
                  <option value="5">Less Than 5% Loss</option>
                  <option value="2">Less Than 2% Loss</option>
                  <option disabled value="">
                    &emsp;--&emsp;&emsp;⬡&emsp;&emsp;--&emsp;
                  </option>
                  <option value="1">&emsp;1% or Less Loss</option>
                </select>

                <div id="jquery-buttons">
                  <button
                    onClick={this.handleClick()}
                    id="play-button"
                    value={this.state.playButton}
                  >
                    Play
                  </button>
                  <button id="reset-button">Reset</button>
                </div>

                <div id="slider-div">
                  <span id="slider-label">
                    {" "}
                    QTR <span id="period"></span>
                  </span>
                  <div id="date-slider"></div>
                </div>
              </div>

              <div className="whole-chart-section">
                <div id="chart-area" ref="chartArea"></div>

                <div className="asterisk">
                  <div>
                    &ensp;* Number of Added + Renovated Colonies{" "}
                    <span id="make-italic">Less Than</span> Number of Colonies Lost
                  </div>
                  <div>
                    ** Number of Added + Renovated Colonies{" "}
                    <span id="make-italic">Greater Than or Equal To</span> Number
                    of Colonies Lost
                  </div>
                </div>
              </div>

              <div className="box-this">
                <div id="no-data">
                  Please Note: <span id="make-blue">Alaska, Delaware, Nevada, New Hampshire, Rhode Island not included in visualization</span> because individual state data not available<br />
                </div>
                <div id="suspended">
                  Quarterly collection of colony data suspended for July 2019 ∴ <span id="make-blue">Quarter 18 (4/1/19 - 6/30/19) data entered as "N/A"</span> for all fields in all states.
                </div>
              </div>

              <div id="cite-source">
                National Agricultural Statistics Service (NASS), Agricultural
                Statistics Board, United States Department of Agriculture (USDA).
                (2020).
                <span id="make-italic"> Honey Bee Colonies</span> [Data set].
                United States Department of Agriculture / Economics, Statistics
                and Market Information System. Retrieved from{" "}
                <span id="make-underline">
                  <a
                    onClick={() =>
                      window.location.replace(
                        "https://usda.library.cornell.edu/concern/publications/rn301137d"
                      )
                    }
                    href="https://usda.library.cornell.edu/concern/publications/rn301137d"
                  >
                    https://usda.library.cornell.edu/concern/publications/rn301137d
                  </a>
                </span>
                <div id="artist">
                  <div>⬡</div>
                  <div>
                    Background image taken from https://unsplash.com by Matthew T Rader
                  </div>
                </div>
              </div>

              <img id="end-comb" src="/4comb.svg" alt="4 hexagon honeycomb abstract" />
            </div>
          </div>

        );
      } else {
        return <div>One minute while we load bee data!</div>;
      }
    }
  }

  export default Graph;

