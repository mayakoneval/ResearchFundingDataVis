import React from 'react';
var rd3 = require('react-d3');
var BarChart = rd3.BarChart;

/**
 *  * Tryna get a fucking graph on the screen
 *  *   */

class BarGraph extends React.Component {

    render() {
 
        var barData = [
            {label: 'A', value: 5},
            {label: 'B', value: 6},
            {label: 'F', value: 7}
        ];

        return (
            <div>
              <BarChart
                  data={barData}
                  width={500}
                  height={200}
                  fill={'#3182bd'}
                  title='Bar Chart'
              />
            </div>
        );
    }
}
export default BarGraph;

