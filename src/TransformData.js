import React from 'react';
var d3 = require('d3');
import ZoomableSunburst from './ZoomableSunburst';

/**
 *  * Tryna get a fucking data on the screen
 *  *   */

class TransformData extends React.Component {

    render () {

        var structuredData = [];

        d3.csv("http://localhost:8888/src/data/CSV_Research.csv", function(data) {
            console.log("Lets see what this looks like: ", data);
            console.log("DATA OBJ", structurePrimarySponsorData(data));
            structuredData = JSON.stringify(structurePrimarySponsorData(data));
            // this gives a JSON object with a new object for each row, including empty sponsor and direct sponsor fields if it is aninstance of a previous sponsor
            // to fix this, I need t massage this data into a JSON object with the Primary sponsor at the top level, then the secondary sponsors and under each
            //secondary sponsor there should be the project ids
            //under the primary sponsor there should be a total
        });

        function structurePrimarySponsorData(data) {
            var total = 0;
            var data_obj_alphabet = [ { "Primary_Sponsor": "",
                           "Total_From_Sponsor": "",
                           "Direct_Sponsors": {
                                "ex1": "", 
                                "ex2": ""
                              }
                            } ];

            var data_obj_sorted = [ { "Primary_Sponsor": "",
                           "Total_From_Sponsor": "",
                           "Direct_Sponsors": {
                                "ex1": "", 
                                "ex2": ""
                              }
                            } ];

            var data_obj_dept = [ { "Department": "",
                                    "Total": "" } ];

            var indexPrevSponsor = 0;


            for(var i = 0; i<data.length; i++) {
              var row = data[i];
              if(row.Primary_Sponsor != "") {
                data_obj_alphabet.push({ "Primary_Sponsor": cleanAndEdit(row.Primary_Sponsor),
                                "Total_From_Sponsor": "",
                                "Direct_Sponsors": {}});
                indexPrevSponsor += 1;
              }
              else if(row.Direct_Sponsors != "") {
                if(row.Direct_Sponsors == "Total by Primary Sponsor") {
                  data_obj_alphabet[indexPrevSponsor].Total_From_Sponsor = row.Unexpended_Balance;
                  total += parseInt(row.Auth_Total);
                }
                else {
                  data_obj_alphabet[indexPrevSponsor].Direct_Sponsors[row.Direct_Sponsors] = row.Unexpended_Balance;
                }
              }
            }

            data_obj_sorted = sortByTotal(data_obj_alphabet);
            console.log(data_obj_alphabet);
            console.log(data_obj_sorted);
            console.log(total);
            return data_obj_sorted;
        }

        function cleanAndEdit(s) {
          return s.replace(/([\n\r])/g, ' ');
        }

        function sortByTotal(arr) {
          var newArr = arr.slice();
          newArr.sort(function(a, b) {
            return b.Total_From_Sponsor - a.Total_From_Sponsor;
          });
          return newArr;
        }

        function mapToDepartment(arr) {
          var newArr = arr.slice();
          var deptTemp = "";
          for(var i = 0; i<newArr.length(); i++) {
            deptTemp = setDept(newArr[i].Primary_Sponsor, newArr[i].Total_From_Sponsor);
          }
            
        }

        function setDept(str, total) {
          var deptMap = {"US Government - Military": {
                              "US Army": 0,
                              "US Military General": 0,
                              "US Air Force": 0,
                              "US Navy": 0 },
                         "US Department of Defense": 0,
                         "US Department of Homeland Security": 0,
                         "US Department of Energy": 0,
                         "US Government - Science": 0, 
                         "US Department of Transportation": 0, 
                         "US Department of Health": 0,
                         "NASA": 0,
                         "US Department of Agriculture": 0,
                         "US Department of Education": 0,
                         "US EPA": 0,
                         "US Department of Commerce": 0};

          if(str.contains("DOE") || str.contains("Department of Energy")){
            deptMap["US Department of Energy"] += total;
          }
          else if(str.contains("Army")) {
            deptMap["US Government - Military"]["US Army"] += total;
          }
          else if(str.contains("Air Force")) {
            deptMap["US Government - Military"]["US Air Force"] += total;
          }
          else if(str.contains("Navy")) {
            deptMap["US Government - Military"]["US Navy"] += total;
          }
          

        }
          
        return (
              <ZoomableSunburst
                  hello = {"hello"}
                  dataProp = {structuredData}
              />
          );
      }
}
export default TransformData;


