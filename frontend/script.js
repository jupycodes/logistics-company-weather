function deleteItem(){
    let itemId = document.getElementById("itemId").value;
    const http = new XMLHttpRequest();
    http.open("DELETE", `/${itemId}`);
    http.send();
    alert(`Item ${itemId} successfully deleted`);
}
function editItem(){
    let itemId = document.getElementById("itemId").value;
    document.getElementById("editForm").hidden = false;
    document.getElementById("editForm").setAttribute("method", "POST");
    document.getElementById("editForm").setAttribute("action", `/items/${itemId}`);
}
function showAlert(type){
    alert(`Item was successfully modified.`);
}
  
  async function loadWeatherData(city) {
    const options = {
      method: 'GET',
      };
    const response = await fetch(`/city/${city}`, options);
    const apiResponse = await response.text();
    return apiResponse;
  }

  function loadData(url) {
    document.getElementById("csvButton").disabled = false;
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    http.onload = () => {
      let jsonData = JSON.parse(http.responseText);
      let col = [];
      for (let i = 0; i < jsonData.length; i++) {
        for (let key in jsonData[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key);
          }
        }
      }
      col.push("weather");

      let table = document.createElement("table");
      table.className = 'table';
      let tr = table.insertRow(-1);
      for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
      }
      
      for (let i = 0; i < jsonData.length; i++) {
        tr = table.insertRow(-1);
        for (let j = 0; j < col.length; j++) {
          let tabCell = tr.insertCell(-1);         

          if(j === 6) {
            let city = jsonData[i][col[5]];
            const weatherData = loadWeatherData(city)
              .then( res => {
                console.log(res);
                tabCell.innerHTML = res;
              })
          }else{
            tabCell.innerHTML = jsonData[i][col[j]];
          }
        }
        
      }
      let divShowData = document.getElementById('showData');
      divShowData.innerHTML = "";
      divShowData.appendChild(table);
    }
  }

  function tableToCSV() {
    let csv_data = [];
    let rows = document.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll('td,th');
        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
            csvrow.push(cols[j].innerHTML);
        }
        csv_data.push(csvrow.join(","));
    }
    csv_data = csv_data.join('\n');
    downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
    CSVFile = new Blob([csv_data], { type: "text/csv" });
    let temp_link = document.createElement('a');
    temp_link.download = "GfG.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}