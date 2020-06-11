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
* Dropdown data filter
* Date UI Slider
* Tooltip data & legend color coordination

#### Sample Code:
  ##### Data Container
  ##### Honestly, the only notable code was the D3 syntax. That said, React was double-rendering our static graph when we had data-handling in the same container, so the issue was solved by separating data logic into its own container & passing it in as props to the D3 graph when it was fully ready to be mapped.

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