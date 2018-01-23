import React from 'react';
var rd3 = require('react-d3');
var BarChart = rd3.BarChart;
var PieChart = rd3.PieChart;

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
        var pieData = [
            {label: 'Margarita', value: 20.0},
              {label: 'John', value: 55.0},
                {label: 'Tim', value: 25.0 }
        ];

        return (
            <PieChart
              data={pieData}
                width={400}
                  height={400}
                    radius={100}
                      innerRadius={20}
                        title="Pie Chart"
                        />);
    }
}
export default BarGraph;

