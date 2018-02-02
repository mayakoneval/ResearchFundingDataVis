import React from 'react';
var d3 = require('d3');
var ZoomableSunburst = require('./ZoomableSunburst');

/**
 *  * Tryna get a fucking data on the screen
 *  *   */

class TransformData extends React.Component {

    render () {

        var structuredData = [];

        d3.csv("http://localhost:8888/src/data/CSV_Research.csv", function(data) {
            console.log("Lets see what this looks like: ", data);
            console.log("DATA OBJ", structurePrimarySponsorData(data));
            structuredData = structurePrimarySponsorData(data);
            // this gives a JSON object with a new object for each row, including empty sponsor and direct sponsor fields if it is aninstance of a previous sponsor
            // to fix this, I need t massage this data into a JSON object with the Primary sponsor at the top level, then the secondary sponsors and under each
            //secondary sponsor there should be the project ids
            //under the primary sponsor there should be a total
        });

        function structurePrimarySponsorData(data) {
            var total = 0;
            var data_obj = [ { "Primary_Sponsor": "",
                           "Total_From_Sponsor": "",
                           "Direct_Sponsors": {
                                "ex1": "", 
                                "ex2": ""
                              }
                            } ];
            var indexPrevSponsor = 0;
            for(var i = 0; i<data.length; i++) {
              var row = data[i];
              if(row.Primary_Sponsor != "") {
                data_obj.push({ "Primary_Sponsor": cleanAndEdit(row.Primary_Sponsor),
                                "Total_From_Sponsor": "",
                                "Direct_Sponsors": {}});
                indexPrevSponsor += 1;
              }
              else if(row.Direct_Sponsors != "") {
                if(row.Direct_Sponsors == "Total by Primary Sponsor") {
                  data_obj[indexPrevSponsor].Total_From_Sponsor = row.Unexpended_Balance;
                  total += parseInt(row.Auth_Total);
                }
                else {
                  data_obj[indexPrevSponsor].Direct_Sponsors[row.Direct_Sponsors] = row.Unexpended_Balance;
                }
              }
            }
            console.log(total);
            return data_obj;
        }

        function cleanAndEdit(s) {
          return s.replace(/([\n\r])/g, ' ');
        }
          
        return (
            <div>
              // this is the issue (unsure why rn)
            </div>
          );
      }
}
export default TransformData;


