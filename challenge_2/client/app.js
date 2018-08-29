$("#senddata").click(() => {
  var jsonInput = document.getElementById('inputarea').value;
  var filter = document.getElementById('filter').value;

  var textFile = document.getElementById('fileinput').files[0];
  console.log(textFile);

  read = () => {
    var file = textFile;
    var reader = new FileReader();
    reader.onload = () => {
      console.log("readerfile", reader.result);
    }
    reader.readAsText(file);
  }

  read();
  $.ajax(
    {
      url: "http://127.0.0.1:3000/",
      type: "POST", 
      data: {
        filter: filter,
        input: jsonInput
      },
      success: (result) => {
        document.getElementById('csvdata').innerHTML = `<p>${result}</p>`
        
        // THIS CODE MAKES YOU DOWNLOAD IT IMMEDIATELY
        // csv = 'data:text/csv;charset=utf-8,' + result;
        // data = encodeURI(csv);
        // link = document.createElement('a');
        // link.setAttribute('href', data);
        // link.setAttribute('download', 'export.csv');
        // link.click();
      }
    }
  );
});

$("#uploadfile").click(() => {
  var jsonInput = document.getElementById('inputarea').value;
  var filter = document.getElementById('filter').value;

  var textFile = document.getElementById('fileinput').files[0];
  console.log(textFile);

  read = (callback) => {
    var file = textFile;
    var reader = new FileReader();
    reader.onload = () => {
      console.log("readerfile", reader.result);
      callback(reader.result)
    }
    reader.readAsText(file);
  }

  read((result)=> {
    $.ajax(
      {
        url: "http://127.0.0.1:3000/",
        type: "POST", 
        data: {
          filter: filter,
          input: result
        },
        success: (result) => {
          document.getElementById('csvdata').innerHTML = `<p>${result}</p>`
          
          // THIS CODE MAKES YOU DOWNLOAD IT IMMEDIATELY
          // csv = 'data:text/csv;charset=utf-8,' + result;
          // data = encodeURI(csv);
          // link = document.createElement('a');
          // link.setAttribute('href', data);
          // link.setAttribute('download', 'export.csv');
          // link.click();
        }
      }
    );
  });
});