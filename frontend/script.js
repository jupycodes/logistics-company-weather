function deleteItem(){
    var itemId = document.getElementById("itemId").value;
    const http = new XMLHttpRequest()
    http.open("DELETE", `/${itemId}`)
    http.send()
    alert(`Item ${itemId} successfully deleted`)
}
function editItem(){
    var itemId = document.getElementById("itemId").value;
    document.getElementById("editForm").hidden = false;
    document.getElementById("editForm").setAttribute("method", "POST");
    document.getElementById("editForm").setAttribute("action", `/items/${itemId}`);
}
function showAlert(type){
    alert(`Item was successfully modified.`)
}
  
  async function loadWeatherData(city) {
    const options = {
      method: 'GET',
      };
    const response = await fetch(`/city/${city}`, options)
    const apiResponse = await response.text()
    return apiResponse
  }

  function loadData(url) {
    document.getElementById("csvButton").disabled = false;
    const http = new XMLHttpRequest()
    http.open("GET", url)
    http.send()
    http.onload = () => {
      var jsonData = JSON.parse(http.responseText)
      var col = []
      for (var i = 0; i < jsonData.length; i++) {
        for (var key in jsonData[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key)
          }
        }
      }
      col.push("weather")

      var table = document.createElement("table");
      table.className = 'table';
      var tr = table.insertRow(-1);
      for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
      }
      
      for (var i = 0; i < jsonData.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = jsonData[i][col[j]];
        }
        const weatherData = loadWeatherData(jsonData[i][col[5]])
        console.log(weatherData)
        tabCell.innerHTML = weatherData

      }
      var divShowData = document.getElementById('showData');
      divShowData.innerHTML = "";
      divShowData.appendChild(table);
    }
  }

  function tableToCSV() {
    var csv_data = [];
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].querySelectorAll('td,th');
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {
            csvrow.push(cols[j].innerHTML);
        }
        csv_data.push(csvrow.join(","));
    }
    csv_data = csv_data.join('\n');
    downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
    CSVFile = new Blob([csv_data], { type: "text/csv" });
    var temp_link = document.createElement('a');
    temp_link.download = "GfG.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}