$("#senddata").click(() => {
  var jsonInput = document.getElementById('inputarea').value;
  console.log(jsonInput);
  $.ajax(
    {
      url: "http://127.0.0.1:3000/",
      type: "POST", 
      data: {input: jsonInput},
      success: (result) => {
        console.log("result of post request", result)
        document.getElementById('csvdata').innerHTML = `<p>${result}</p>`
        
        // THIS CODE HERE PRETTY MUCH MAKES YOU DOWNLOAD IT IMMEDIATELY 
        // var csvFile = `data:text/csv;charset=utf-8,` + result;
        // data = encodeURI(csvFile);
        // var link = document.createElement('a');
        // link.setAttribute('href', data);
        // link.setAttribute('download', csvFile + '.csv');
        // link.click();


        csv = 'data:text/csv;charset=utf-8,' + result;
        console.log(csv);
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', 'export.csv');
        link.click();
      }
    }
  );
});