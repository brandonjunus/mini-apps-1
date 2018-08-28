$("#senddata").click(() => {
  var jsonInput = document.getElementById('inputarea').value;
  console.log(jsonInput);
  $.ajax(
    {
      url: "http://127.0.0.1:3000/",
      type: "POST", 
      data: {input: jsonInput},
      success: (result) => {
        document.getElementById('csvdata').innerHTML = `<p>${result}</p>`
        
        // THIS CODE MAKES YOU DOWNLOAD IT IMMEDIATELY
        csv = 'data:text/csv;charset=utf-8,' + result;
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', 'export.csv');
        link.click();
      }
    }
  );
});