import React from 'react';
var rd3 = require('react-d3');
var PieChart = rd3.PieChart;

/**
 *  * Tryna get a fucking graph on the screen
 *  *   */

class PieGraph extends React.Component {

    render() {
 
        var pieData = [
            {label: 'Margarita', value: 20.0},
            {label: 'John', value: 55.0},
            {label: 'Tim', value: 25.0 }
        ];

        return (
            <div>
              helloeheleooe
              <PieChart
                data={pieData}
                width={400}
                height={400}
                radius={100}
                innerRadius={20}
                title="Pie Chart"
              />
            </div>
        );
    }
}
export default PieGraph;

