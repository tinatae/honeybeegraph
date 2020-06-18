# Honey Bee Graph
D3 Graph visualizing U.S. Honey Bee Colony Inventory (2015 - 2018)

#### Technologies:
* D3
* jQuery
* Express
* React
* Node.js

#### Overview:
D3 Bubble Chart showing time progression of U.S. Bee Colony Inventory between January 2015 - December 2018.

#### Functionalities: 
* Data filter
* UI Slider
* Graph tooltip & legend

#### Sample Code:
  ##### Data Container
  ##### The focus of this project was learning the D3 syntax & incorporating it with React. The code sample below maps through the raw data, adds an additional value called `added_together` and is passed to the graph container as `cleanData` props when it is fully updated.

    dataSetCreator(data) {
        let workingData;

        for (let state in data) {
        if (!data.hasOwnProperty(state)) {
            continue;
        }

        workingData = data.map(function (period) {
            return period["states"].map(function (eachState) {
            eachState.added_together = eachState.added + eachState.renovated;
            return eachState;
            });
        });
        return workingData;
        }   
    };

    render() {
        const cleanData = this.dataSetCreator(BeeData);
        return ( <Graph data={cleanData} />);  
    }
    
  ##### D3 Syntax
  ##### D3 is powerful in its ability to visually communicate multiple layers of data in a glance. In the code below, each U.S. state in the `cleanData` props is mapped to a Canvas circle object and assigned graph placement with `x` referring to the total number of colonies for each state and `y` referring to the percentage of colonies lost. Circle radius is `y`'s actual number of colonies lost to give a sense of scale for the percentages (i.e. the visual difference between 10% of 1,000 colonies vs. 10% of 1,000,000 colonies). 
 ##### Circle fill color shows if either the number of `added` + `renovated` colonies is less than or equal+ the number of colonies lost. The logic is admittedly stark because it is unclear from the study what the exact value of an `added` or `renovated` colony is reconciled against a colony lost. But for simplicity's sake here, a single `added` or `renovated` colony measures 1:1 to a colony lost.
  
    circles
      .enter()
      .append("circle")
      .attr("className", "enter")
      .attr("stroke", function (d) {
        if (d.added_together >= d.lost) {
          return "orange";
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
      .on("mouseover", tip.show) 
      .on("mouseout", tip.hide)
      .merge(circles)
      .transition(t)
      .transition(d3.transition().duration(500))
      .attr("cy", function (d) {
        return y(d.percent_lost);
      })
      .attr("cx", function (d) {
        return x(d.total);
      })
      .attr("r", function (d) {
        return Math.sqrt(area(d.lost) / Math.PI);
      });
        
#### Future add-ons:
* 2019 data is set to be released August 2020 so we will update our data then
* An informational page about natural adversaries & detractors of colony health