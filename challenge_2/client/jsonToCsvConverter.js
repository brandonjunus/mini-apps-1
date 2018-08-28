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
  
  // // RECURSIVE HELPER FUNCTION TO GET THE DATA
  childrenToCSV = (JSONfile) => {
    console.log('json children', JSONfile.children)
    currentRow = [];
    for(key in JSONfile){
      if (key !== 'children'){
        currentRow.push(JSONfile[key]);
      }
    }
    rows.push(currentRow);
    if (JSONfile.children.length > 0){
      for (let i = 0; i < JSONfile.children.length; i++){
        childrenToCSV(JSONfile.children[i])
      }
    }
  }
  
  childrenToCSV(JSONfile);
  
  var csvFile = ""
  for (let i = 0; i < rows.length; i++){
    rows[i].unshift(i);
    csvFile += rows[i].join(",");
    csvFile += `\n`
    csvFile.substring(0, csvFile.length - 1);
  }
  return csvFile;
}

module.exports = {
  JSONtoCSV: JSONtoCSV,
}
