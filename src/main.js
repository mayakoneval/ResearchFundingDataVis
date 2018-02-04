import React from 'react';
import ReactDOM from 'react-dom';
import {structurePrimarySponsorData} from './TransformData';
import ZoomableSunburst from './ZoomableSunburst';
var d3 = require('d3');

document.addEventListener('DOMContentLoaded', function() {
                              
      d3.csv("http://localhost:8888/src/data/CSV_Research.csv", function(data) {
          console.log("DATA OBJ", structurePrimarySponsorData(data));
          var structuredData = structurePrimarySponsorData(data);
          // this gives a JSON object with a new object for each row, including empty sponsor and direct sponsor fields if it is aninstance of a previous sponsor
          // to fix this, I need t massage this data into a JSON object with the Primary sponsor at the top level, then the secondary sponsors and under each
          //secondary sponsor there should be the project ids
          //under the primary sponsor there should be a total
          ReactDOM.render(
            <ZoomableSunburst
                dataProp = {structuredData}
            />,
            document.getElementById('mount')
          );
      });
});
