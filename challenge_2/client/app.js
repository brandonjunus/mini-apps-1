var sampleSalesReport = {
  "firstName": "Joshie",
  "lastName": "Wyattson",
  "county": "San Mateo",
  "city": "San Mateo",
  "role": "Broker",
  "sales": 1000000,
  "children": [
  {
    "firstName": "Beth Jr.",
    "lastName": "Johnson",
    "county": "San Mateo",
    "city": "Pacifica",
    "role": "Manager",
    "sales": 2900000,
    "children": [
      {
        "firstName": "Smitty",
        "lastName": "Won",
        "county": "San Mateo",
        "city": "Redwood City",
        "role": "Sales Person",
        "sales": 4800000,
        "children": []
      },
      {
        "firstName": "Allen",
        "lastName": "Price",
        "county": "San Mateo",
        "city": "Burlingame",
        "role": "Sales Person",
        "sales": 2500000,
        "children": []
      }
    ]
  },
  {
    "firstName": "Beth",
    "lastName": "Johnson",
    "county": "San Francisco",
    "city": "San Francisco",
    "role": "Broker/Sales Person",
    "sales": 7500000,
    "children": []
  }
]
};

var finalCsv = `firstName,lastName,county,city,role,sales
Joshie,Wyattson,San Mateo,San Mateo,Broker,1000000
Beth Jr.,Johnson,San Mateo,Pacifica,Manager,2900000
Smitty,Won,San Mateo,Redwood City,Sales Person,4800000
Allen,Price,San Mateo,Burlingame,Sales Person,2500000
Beth,Johnson,San Francisco,San Francisco,Broker/Sales Person,7500000
`

console.log("original sample data", sampleSalesReport);

JSONtoCSV = (JSONfile) => {
  // make columns
  var rows = []; 
  var currentRow = [];
  for(key in JSONfile){
    if (key !== 'children'){
      currentRow.push(key);
    }
  }
  rows.push(currentRow);
  
  // RECURSIVE HELPER FUNCTION TO GET THE DATA
  childrenToCSV = (JSONfile) => {
    currentRow = [];
    for(key in JSONfile){
      if (key !== 'children'){
        currentRow.push(JSONfile[key]);
      }
    }
    rows.push(currentRow);
    if ( JSONfile.children.length > 0){
      for (let i = 0; i < JSONfile.children.length; i++){
        childrenToCSV(JSONfile.children[i])
      }
    }
  }
  
  childrenToCSV(JSONfile);
  
  var csvFile = ""
  for (let i = 0; i < rows.length; i++){
    csvFile += rows[i].join(",");
    csvFile += `\n`
    csvFile.substring(0, csvFile.length - 1);
  }
  return csvFile;
}

csvFile = JSONtoCSV(sampleSalesReport);
csvFile = `data:text/csv;charset=utf-8,` + csvFile;
data = encodeURI(csvFile);
filename = `export.csv`;

link = document.createElement('a');
link.setAttribute('href', data);
link.setAttribute('download', filename);
link.click();