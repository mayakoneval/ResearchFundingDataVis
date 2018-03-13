import React from 'react';
import ReactDOM from 'react-dom';
import {structurePrimarySponsorData} from './TransformData';
import {structureDepartmentData} from './TransformData';
import ZoomableSunburst from './ZoomableSunburst';
var d3 = require('d3');
//const fs = require('fs');

document.addEventListener('DOMContentLoaded', function() {

      // this is where the csv parsing happens - then i call a function from 
      // src/TransformData that makes it a array of objects 
      // then this render method shows us the ZoomableSunburst component and we 
      // pass is the structuredData array as a prop
      var nameData;

      d3.csv("/data/CSV_Research.csv", function(data) {
          var twoObjs = structurePrimarySponsorData(data);
          var structuredData = twoObjs[0];
          nameData = twoObjs[1];
          /*const content = JSON.stringify(structuredData);

          fs.writeFile("sponsorExport.json", content, 'utf8', function (err) {
              if (err) {
                return console.log(err);
              }

              console.log("The file was saved!");
          }); */
          // this gives a JSON object with a new object for each row, including empty sponsor and direct sponsor fields if it is aninstance of a previous sponsor
          // to fix this, I need t massage this data into a JSON object with the Primary sponsor at the top level, then the secondary sponsors and under each
          //secondary sponsor there should be the project ids
          //under the primary sponsor there should be a total
          d3.json("/data/department_data.json", function(data) {
            var deptData = structureDepartmentData(data, nameData);

            const content2 = JSON.stringify(deptData);

            /*fs.writeFile("deptExport.json", content, 'utf8', function (err) {
                if (err) {
                  return console.log(err);
                }

                console.log("The file was saved!");
            }); */

            ReactDOM.render(
              <ZoomableSunburst
                  dataProp = {deptData}
              />,
              document.getElementById('mount')
            );

          });

          ReactDOM.render(
            <ZoomableSunburst
                dataProp = {structuredData}
            />,
            document.getElementById('mount')
          );
      });

});
