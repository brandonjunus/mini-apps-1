JSONtoCSV = (JSONfile) => {
  
  console.log("Hello");
  console.log('original json file',  JSONfile);
  
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



module.exports = {
  JSONtoCSV: JSONtoCSV,
  // finalCsv: finalCsv
}
// filename = `export.csv`;

// document.getElementById('csvdata').innerHTML = `<p>${data}</p>`
// link.setAttribute('href', data);
// link.setAttribute('download', filename);
// link.click();

// document.getElementById("senddata").addEventListener('click', () => {
//   console.log("you clicked me lol");


// })