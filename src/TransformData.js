import React from 'react';
var d3 = require('d3');

/**
 *  * Tryna get a fucking data on the screen
 *  *   */

class ScatterPlot extends React.Component {

    render () {

        d3.csv("http://localhost:8888/src/data/CSV_Research.csv", function(data) {
            console.log("Lets see what this looks like: ", data);
            // this gives a JSON object with a new object for each row, including empty sponsor and direct sponsor fields if it is aninstance of a previous sponsor
            // to fix this, I need t massage this data into a JSON object with the Primary sponsor at the top level, then the secondary sponsors and under each
            //secondary sponsor there should be the project ids
            //under the primary sponsor there should be a total
        });

        function structurePrimarySponsorData(data) {
            data_obj = [ { "Primary_Sponsor": "",
                           "Total_From_Sponsor": "" } ];
            for(var i = 0; i<data.length; i++) {
              if(row.Primary_Sponsor != "") {
              }
            }
        }
          
        return (
              <div>
              </div>
          );
      }
}
export default ScatterPlot;

