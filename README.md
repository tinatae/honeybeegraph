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
Next data drop (2019 data) slated for August of 2020.

#### Functionalities: 
* Data filter
* UI Slider
* Graph tooltip & legend

#### Sample Code:
  ##### Data Container
  ##### Overall, the only notable code was the D3 syntax. That said, React was double-rendering our static graph when we had data-handling & graph-rendering in the same container. The issue was resolved by separating the two & passing the data in as props to the graph when it was ready to be mapped.

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

    
#### Future add-ons:
* If we're being honest, a warning page about the murder hornets that have landed in the U.S. and can decapitate up to 40 honeybees per minute.
* Warning page about honeybees & cell phone radiation
* Warning page about honeybee mites & other seasonal affectors