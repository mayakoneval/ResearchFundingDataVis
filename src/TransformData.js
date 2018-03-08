var d3 = require('d3');

/**
 *  * Tryna get a fucking data on the screen
 *  *   */

export const  structurePrimarySponsorData =(data)=> {
    var structuredData = [];
    var total = 0;
    var data_obj_alphabet = { "name": "Primary Sponsors",
                              "children": [
                                  {}
                               ]
                            };

    var data_obj_sorted = { "name": "Primary Sponsors",
                            "children": [
                              {}
                             ]
                            };
    var data_by_name = { "name": "Names",
                         "children": [] };

    var indexPrevSponsor = 0;
    var indexPrevDirect = 0;

    for(var i = 0; i<data.length; i++) {
      var repeatName = false;
      var row = data[i];
      if(row.Supervisor != "") {
        for(var p = 0; p<data_by_name.children.length; p++) {
          if(row.Supervisor == data_by_name.children[p].name) {
            data_by_name.children[p].size += parseInt(row.Unexpended_Balance);
            repeatName = true;
          }
        }
        if(!repeatName) {
          data_by_name.children.push({"name": row.Supervisor,
                                    "size": parseInt(row.Unexpended_Balance)});
        }
      }

      if(row.Primary_Sponsor != "") {
        data_obj_alphabet.children.push({ "Primary_Sponsor": cleanAndEdit(row.Primary_Sponsor),
                                          "Total_From_Sponsor": "",
                                          "name": "Direct Sponsors",
                                          "children": [{}]});
        indexPrevSponsor += 1;
        indexPrevDirect = 0;
      }
      else if(row.Direct_Sponsors != "") {
        if(row.Direct_Sponsors == "Total by Primary Sponsor") {
          data_obj_alphabet.children[indexPrevSponsor].size = parseInt(row.Unexpended_Balance);
          data_obj_alphabet.children[indexPrevSponsor].Total_From_Sponsor = parseInt(row.Unexpended_Balance);
          total += parseInt(row.Auth_Total);
          indexPrevDirect = 0;
        }
        else {
          //data_obj_alphabet.children[indexPrevSponsor].children = 
          //debugger;
          data_obj_alphabet.children[indexPrevSponsor].children[indexPrevDirect] = {};
          data_obj_alphabet.children[indexPrevSponsor].children[indexPrevDirect]["Direct_Sponsor"] = row.Direct_Sponsors;
          data_obj_alphabet.children[indexPrevSponsor].children[indexPrevDirect].size = parseInt(row.Unexpended_Balance);
          indexPrevDirect += 1;
        }
      }
    }

    data_obj_sorted = sortByTotal(data_obj_alphabet);
    //console.log("unsorted", data_obj_alphabet);
    //console.log("sorted", data_obj_sorted);
    //console.log(total);
    var finalTwoDataObjs = [data_obj_sorted, data_by_name];
    return (finalTwoDataObjs);
}

export const structureDepartmentData =(deptData, nameToAmount)=> {
    // this data comes in as a JSON File, parsing will be a little different

    var structuredData = [];
    var total = 0;

    var data_obj_dept = { "name": "Departments",
                            "children": [
                             ]
                            };

    var departments = [];

    var indexPrevDepartment = 0;
    for(var i = 0; i<deptData.length; i++) {
      var dept = deptData[i].department;
      var row = deptData[i];
      if(dept != "") {
        if(departments.indexOf(dept) == -1) {
          departments.push(dept);
          data_obj_dept.children.push({ "Department": dept,
                                            "name": "Names",
                                            "children": []});
        }
        //console.log(data_obj_dept);
        for(var j = 0; j<1000; j++) {
          //data_obj_dept.children.length
          if(data_obj_dept.children[j].Department == dept) {
            var nameSize = 0;
            for(var y = 0; y<nameToAmount.children.length; y++) {
              //This is where I parse the name from the CSV and match to the JSON !! might have issues
              //TODO: Edit this parsing to be 100% accurate, find out where things go wrong
              var nameStr = nameToAmount.children[y].name;
              var firstName = nameStr.substring(0,nameStr.indexOf('/')-1);
              var lastName = nameStr.substring(nameStr.indexOf('/')+1);
              var prettyName = lastName+" "+firstName;
              if(prettyName == row.name) {
                //console.log("hit the pretty equalizier");
                //console.log("prettyName", prettyName);
                //console.log("row.name", row.name);
                nameSize = nameToAmount.children[y].size;
                break;
              }
            }
            data_obj_dept.children[j].children.push({ "name": row.name,
                                                      "email": row.email,
                                                      "phone": row.phone,
                                                      "address": row.address,
                                                      "title": row.title,
                                                      "url": row.url,
                                                      "size": nameSize
                                                      });
            break;
          }
        }

      }
    }

    console.log("finally", data_obj_dept);
    //console.log(total);
    return (data_obj_dept);
}


function cleanAndEdit(s) {
  return s.replace(/([\n\r])/g, ' ');
}

function sortByTotal(arr) {
  var newArr = arr.children.slice();
  newArr.sort(function(a, b) {
    return b.size - a.size;
  });
  return ({"name": "sponsors",
          "children": newArr});
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

