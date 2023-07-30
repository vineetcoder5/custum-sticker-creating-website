function section_one(){
    document.getElementById("section_one").style.display = "flex";
    document.getElementById("section_two").style.display = "none";
    document.getElementById("section_four").style.display = "none";
    document.getElementById("section_three").style.display = "none";
}
function section_two(){
    document.getElementById("section_one").style.display = "none";
    document.getElementById("section_two").style.display = "block";
    document.getElementById("section_four").style.display = "none";
    document.getElementById("section_three").style.display = "none";
}
function section_three(){
    document.getElementById("section_one").style.display = "none";
    document.getElementById("section_two").style.display = "none";
    document.getElementById("section_four").style.display = "none";
    document.getElementById("section_three").style.display = "block";
}
function section_four(){
    document.getElementById("section_one").style.display = "none";
    document.getElementById("section_two").style.display = "none";
    document.getElementById("section_three").style.display = "none";
    document.getElementById("section_four").style.display = "block";
}
function showPreview(imageUrl) {
    console.log("ko");
    // Here, you can use the 'imageUrl' to perform any actions, such as opening a preview in a new tab or displaying it in a modal.
    var imgElement = document.getElementById("dynamic_image");
    imgElement.src = imageUrl;
    document.getElementById("preview_image").style.display = "flex";
    document.getElementById("adress_list").style.display = "none";
}
  
function resetPreview() {
var previewImageElement = document.getElementById("preview_image");
previewImageElement.style.display = "none";

var cartTotalElement = document.getElementById("adress_list");
cartTotalElement.style.display = "block";
}

// document.addEventListener('DOMContentLoaded', function() {
//     var ctx = document.getElementById('saleschart').getContext('2d');
//     // Create the chart data
//     var data = {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: 'Number of orders',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             lineTension:0.4
//         }]
//     };

//     // Create the chart
//     var chart = new Chart(ctx, {
//         type: 'line',
//         data: data,
//         options: {
//             responsive: false
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('revenuechart').getContext('2d');
    // Create the chart data
    var data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Number of orders verified',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            lineTension:0.4
        }]
    };

    // Create the chart
    var chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: false
        }
    });
});



function order_stats(){
    var cartElement = "stats";
    // console.log("decrement item:", cartElement.querySelector("#current_order_id").textContent);
    // console.log("decrement item:", cartElement.querySelector("#Quantity").textContent);
    var payload = { stats: cartElement,
                  };
    // Make a POST request to the Python server
    fetch('/order_stats', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data[1]);
        // Handle the response from Python
        if(data[0].success){
            console.log(data[0].orderdelivered)
            document.getElementById("orderdelivered").textContent = data[0].orderdelivered;
            document.getElementById("pendingprinting").textContent = data[0].pendingprint;
            document.getElementById("pendingverify").textContent = data[0].verify;
            document.getElementById("income").textContent = data[0].income;
            console.log(data[0].success);
            var processedData = processChartData(data[1]);

          // Create the chart data
          var ctx = document.getElementById('saleschart').getContext('2d');
          var chartData = {
              labels: processedData.labels,
              datasets: [{
                  label: 'Number of orders',
                  data: processedData.values,
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  lineTension: 0.4
              }]
          };
          // Create the chart
          var chart = new Chart(ctx, {
              type: 'line',
              data: chartData,
              options: {
                  responsive: false
              }
          });
        }else{
            console.log("failed");
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function processChartData(rawData) {
    var labels = rawData.map(function(item) {
      var date = new Date(item[0]);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    });
  
    var values = rawData.map(function(item) {
      return item[1];
    });
  
    return {
      labels: labels,
      values: values
    };
  }
// search order js

function search_order(){
    const userId = document.getElementById("user_id").value;
    console.log(userId);
    // Make the POST request to Flask with the user ID as data
    fetch('/order_search', {
    method: 'POST',
    body: JSON.stringify({ userId: userId }),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => {
    // Rest of your code to handle the received data
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML='';

  // Loop through the received data and generate the list items
  data.data.forEach(item => {
    // Create a new <li> element
    const liElement = document.createElement('li');
    date = item[0];
    const dateObject = new Date(date);
    // Extract the date components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
    const day = dateObject.getDate();
    
    // Create the date string in 'YYYY-MM-DD' format
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    var imgsourse="/static/cart_images/" + item[2] + ".png";

    // Use Jinja template to fill in the data
    liElement.innerHTML = `
      <div id="search_list">
        <div id="current_order_id" style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[4]}</div>
        <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${formattedDate}</div>
        <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[1]}</div>
        <div style="height: 9vh; width: fit-content; float: left; display: flex; justify-content: flex-start;" onmouseover="showPreview('${imgsourse}')" onmouseout="resetPreview()">
            <img style="background-color: white; border-radius: 10px;" src="${imgsourse}" alt="order image">
        </div> 
        <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[3]}</div>
        <button onclick="order_done(this)" class="input2" style=" width: auto; border-radius: 15px; display: flex; align-items: center;">
        <div style=" width: fit-content; float: left; display: flex; justify-content: flex-start;">
            <img style=" border-radius: 10px;" src="/static/image/verify.png" alt="order image" >
        </div>
        </button>
      </div>
    `;
    // Append the <li> element to the list container
    listContainer.appendChild(liElement);
  });
    document.getElementById("final_name").textContent = data.adress[0][0];
    document.getElementById("final_adress1").textContent = data.adress[0][1];
    document.getElementById("final_adress2").textContent = data.adress[0][2];
    document.getElementById("final_state").textContent = data.adress[0][3];
    document.getElementById("final_pincode").textContent = data.adress[0][4];
    document.getElementById("final_mobilenumber").textContent = data.adress[0][5];
    document.getElementById("final_email").textContent = data.adress[0][6];
})
    .catch(error => {
    console.error('Error:', error);
    });
}


function order_done(element){
    var cartElement = element.closest("#search_list");
    // console.log("decrement item:", cartElement.querySelector("#current_order_id").textContent);
    // console.log("decrement item:", cartElement.querySelector("#Quantity").textContent);
    var payload = { orderid: cartElement.querySelector("#current_order_id").textContent,
                  };
    // Make a POST request to the Python server
    fetch('/order_done', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from Python
        if(data.success){
            search_order()
            console.log(data.success);
        }else{
            console.log("failed");
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// serch js end


function payment_verification(){
    console.log("JO")
    var verify="payment_verify";
    var payload = { verify: verify,
                  };
    // Make the POST request to Flask with the user ID as data
    fetch('/payment_detail', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data.success);
    // Rest of your code to handle the received data
    const listContainer = document.getElementById('payment_verify_list');
    listContainer.innerHTML='';

  // Loop through the received data and generate the list items
    data.forEach(item => {
        // Create a new <li> element
        const liElement = document.createElement('li');
        date = item[0];
        const dateObject = new Date(date);
        var formattedDateTime = dateObject.toLocaleString();
        // // Extract the date components
        // const year = dateObject.getFullYear();
        // const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
        // const day = dateObject.getDate();
        
        // // Create the date string in 'YYYY-MM-DD' format
        // const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        // var imgsourse="/static/cart_images/" + item[2] + ".png";

        // Use Jinja template to fill in the data
        liElement.innerHTML = `
            <div id="verify_payment_list">
                <button onclick="order_reject(this)" class="input2" style=" float: left; width: auto; border-radius: 15px; display: flex; align-items: center;">
                  <div style=" width: fit-content; float: left; display: flex; justify-content: flex-start;">
                    <img style=" border-radius: 10px;" src="/static/image/delete.png" alt="reject" >
                  </div>
                </button>
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${formattedDateTime}</div>
                <div id="verify_order_id" style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[1]}</div>
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[2]}</div>
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[3]}</div>
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[4]}</div>
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[5]}</div>
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[6]}</div>
                <button onclick="order_verified(this)" class="input2" style=" width: auto; border-radius: 15px; display: flex; align-items: center;">
                  <div style=" width: fit-content; float: left; display: flex; justify-content: flex-start;">
                    <img style=" border-radius: 10px;" src="/static/image/verify.png" alt="verify" >
                  </div>
                </button>
            </div>
        `;
        // Append the <li> element to the list container
        listContainer.appendChild(liElement);
  });
})
.catch(error => {
console.error('Error:', error);
});
}

function order_reject(element){
    var cartElement = element.closest("#verify_payment_list");
    // console.log("decrement item:", cartElement.querySelector("#current_order_id").textContent);
    // console.log("decrement item:", cartElement.querySelector("#Quantity").textContent);
    var payload = { orderid: cartElement.querySelector("#verify_order_id").textContent,
                  };
    // Make a POST request to the Python server
    fetch('/order_reject', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data.success);
        // Handle the response from Python
        if(data.success){
            payment_verification()
            console.log(data.success);
        }else{
            console.log("failed");
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function order_verified(element){
    var cartElement = element.closest("#verify_payment_list");
    // console.log("decrement item:", cartElement.querySelector("#current_order_id").textContent);
    // console.log("decrement item:", cartElement.querySelector("#Quantity").textContent);
    var payload = { orderid: cartElement.querySelector("#verify_order_id").textContent,
                  };
    // Make a POST request to the Python server
    fetch('/order_verified', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.success);
        // Handle the response from Python
        if(data.success){
            payment_verification()
            console.log(data.success);
        }else{
            console.log("failed");
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



function download_order(){
    // console.log("JO")
    var quantity= document.getElementById("quantity_number").value;
    var payload = { quantity: quantity,
                  };
    // Make the POST request to Flask with the user ID as data
    fetch('/download_order', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data.success);
    // Rest of your code to handle the received data
    const listContainer = document.getElementById('download_order_list');
    listContainer.innerHTML='';
    document.getElementById("orders_quan").textContent = "download for printing  " + data[1];
    console.log(data[1])

  // Loop through the received data and generate the list items
    data[0].forEach(item => {
        // Create a new <li> element
        const liElement = document.createElement('li');
        date = item[0];
        const dateObject = new Date(date);
        // var formattedDateTime = dateObject.toLocaleString();
        // // Extract the date components
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
        const day = dateObject.getDate();
        
        // Create the date string in 'YYYY-MM-DD' format
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        var imgsourse="/static/cart_images/" + item[2] + ".png";
        var savename= quantity+"#"+item[4]+"#"+item[2] + ".png";

        // Use Jinja template to fill in the data
        liElement.innerHTML = `
            <div id="download_orders">
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${formattedDate}</div>
                <div id="download_order_id" style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[3]}</div>
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[4]}</div>
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[1]}</div>
                <div style="height: 9vh; width: fit-content; float: left; display: flex; justify-content: flex-start;">
                    <img style="background-color: white; border-radius: 10px;" src="${imgsourse}" alt="order image">
                </div> 
                <div style="font-family: monospace; font-size: 15px; width: fit-content; float: left;">${item[2]}</div>
                <button onclick="downloadImage('${imgsourse}', '${savename}', ${item[4]})" class="input2" style=" float: left; width: auto; border-radius: 15px; display: flex; align-items: center;">
                <div style=" width: fit-content; float: left; display: flex; justify-content: flex-start;">
                    <img style=" border-radius: 10px;" src="/static/image/download.png" alt="reject" >
                </div>
                </button>
                <button onclick="order_printing(this)" class="input2" style=" width: auto; border-radius: 15px; display: flex; align-items: center;">
                <div style=" width: fit-content; float: left; display: flex; justify-content: flex-start;">
                    <img style=" border-radius: 10px;" src="/static/image/verify.png" alt="verify" >
                </div>
                </button>
            </div>
        `;
        // Append the <li> element to the list container
        listContainer.appendChild(liElement);
  });
})
.catch(error => {
console.error('Error:', error);
});
}

function downloadImage(url, filename,id) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
        // Create an image element to load the image from the blob
        const img = new Image();
        img.onload = () => {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height + 20; // To accommodate the ID at the top

            // Get the canvas context
            const ctx = canvas.getContext('2d');

            // Draw the image on the canvas
            ctx.drawImage(img, 0, 20, img.width, img.height);

            // Draw the ID on top of the image
            ctx.font = '15px Arial';
            ctx.fillStyle = 'black'; // Set the color for the ID text
            ctx.fillText('ID: ' + id, 10, 20); // Position the ID text on top of the image

            // Convert the canvas to a data URL
            const dataUrl = canvas.toDataURL();

            // Create a temporary link and trigger the download
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = filename;
            console.log(filename)
            a.click();

            // Clean up
            URL.revokeObjectURL(dataUrl);
        };
        img.src = URL.createObjectURL(blob);
        })
        .catch(error => {
        console.error('Error downloading image:', error);
        });
    // fetch(url)
    //   .then(response => response.blob())
    //   .then(blob => {
    //     const a = document.createElement('a');
    //     const objectUrl = URL.createObjectURL(blob);
    //     a.href = objectUrl;
    //     a.download = filename;
    //     a.click();
    //     URL.revokeObjectURL(objectUrl);
    //   })
    //   .catch(error => {
    //     console.error('Error downloading image:', error);
    //   });
}


function order_printing(element){
    var cartElement = element.closest("#download_orders");
    // console.log("decrement item:", cartElement.querySelector("#current_order_id").textContent);
    // console.log("decrement item:", cartElement.querySelector("#Quantity").textContent);
    var payload = { orderid: cartElement.querySelector("#download_order_id").textContent,
                  };
    // Make a POST request to the Python server
    fetch('/order_printing', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.success);
        // Handle the response from Python
        if(data.success){
            download_order();
            console.log(data.success);
        }else{
            console.log("failed");
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });
}