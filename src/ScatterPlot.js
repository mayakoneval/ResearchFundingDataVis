import React from 'react';
var rd3 = require('react-d3');
var ScatterChart = rd3.ScatterChart;

/**
 *  * Tryna get a fucking graph on the screen
 *  *   */

class ScatterPlot extends React.Component {

    render() {
 
        var scatterData = [
          {
            name: "series1",
            values: [ { x: 0, y: 20 }, { x: 5, y: 7 }, { x: 20, y: 9 }, { x: 24, y: 10 } ]
          },
          {
            name: "series2",
            values: [ { x: 30, y: 20 }, { x: 45, y: 15 }, { x: 55, y: 10 }, { x: 70, y: 5 } ]
          },
          {
            name: "series3",
            values: [ { x: 70, y: 82 }, { x: 69, y: 77 }, { x: 83, y: 90 }, { x: 76, y: 82 } ]
          }
        ];
        return (
            <div>
              <ScatterChart
                data={scatterData}
                width={500}
                height={400}
                yHideOrigin={true}
                title="Scatter Chart"
              />
            </div>
        );
    }
}
export default ScatterPlot;

