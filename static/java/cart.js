function handleDelete(element) {
    var cartElement = element.closest("#cart_elements");
    console.log("decrement item:", cartElement.querySelector("#cart_item_name").textContent);
    console.log("decrement item:", cartElement.querySelector("#Quantity").textContent);
    var payload = { cart_id: cartElement.querySelector("#cart_item_name").textContent.trim(),
                    quantity: cartElement.querySelector("#Quantity").textContent.trim(),
                    type: "delete"
                  };
    // Make a POST request to the Python server
    fetch('/update_cart', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from Python
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function increment(element){
    var cartElement = element.closest("#cart_elements");
    console.log("decrement item:", cartElement.querySelector("#cart_item_name").textContent);
    console.log("decrement item:", cartElement.querySelector("#Quantity").textContent);
    var payload = { cart_id: cartElement.querySelector("#cart_item_name").textContent.trim(),
                    quantity: cartElement.querySelector("#Quantity").textContent.trim(),
                    type: "increment"
                  };
    // Make a POST request to the Python server
    fetch('/update_cart', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from Python
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function decrement(element){
    var cartElement = element.closest("#cart_elements");
    console.log("decrement item:", cartElement.querySelector("#cart_item_name").textContent);
    console.log("decrement item:", cartElement.querySelector("#Quantity").textContent);
    var payload = { cart_id: cartElement.querySelector("#cart_item_name").textContent.trim(),
                    quantity: cartElement.querySelector("#Quantity").textContent.trim(),
                    type: "decrement"
                  };
    // Make a POST request to the Python server
    fetch('/update_cart', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from Python
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

var open = 1;
function openForm() {
	if (open==0){
    document.getElementById("huge_cart").style.filter = "blur(0px)";
		document.getElementById("adress_form").style.display = "none";
		open=1;
	}else{
    document.getElementById("Name").value = document.getElementById("final_name").textContent.trim();
    document.getElementById("address1").value = document.getElementById("final_adress1").textContent.trim();
    document.getElementById("address2").value = document.getElementById("final_adress2").textContent.trim();
    document.getElementById("state").value = document.getElementById("final_state").textContent.trim();
    document.getElementById("pincode").value = document.getElementById("final_pincode").textContent.trim();
    document.getElementById("mobilenumber").value = document.getElementById("final_mobilenumber").textContent.trim();
    document.getElementById("huge_cart").style.filter = "blur(2px)";
		document.getElementById("adress_form").style.display = "block";
		open=0;
	}
}


// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('address');
    // Add submit event listener
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Get the input values
      const name = document.getElementById('Name').value.trim();
      const address1 = document.getElementById('address1').value.trim();
      const address2 = document.getElementById('address2').value.trim();
      const state = document.getElementById('state').value.trim();
      const pincode = document.getElementById('pincode').value.trim();
      const mobileNumber = document.getElementById('mobilenumber').value.trim();
  
      // Log the input values
    //   console.log('Name:', name);
    //   console.log('Address 1:', address1);
    //   console.log('Address 2:', address2);
    //   console.log('State:', state);
    //   console.log('Pincode:', pincode);
    //   console.log('Mobile Number:', mobileNumber);
  
      // Perform additional actions or send the form data to the server
      // using AJAX or other techniques
      const formData = {
        name: name,
        address1: address1,
        address2: address2,
        state: state,
        pincode: pincode,
        mobileNumber: mobileNumber
      };
  
      // Send the form data to the server
      fetch('/update_adress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data);
        openForm();
        if(data.message){
            console.log("sucess");
            document.getElementById("final_name").textContent = name;
            document.getElementById("final_adress1").textContent = address1;
            document.getElementById("final_adress2").textContent = address2;
            document.getElementById("final_state").textContent = state;
            document.getElementById("final_pincode").textContent = pincode;
            document.getElementById("final_mobilenumber").textContent = mobileNumber;
        }
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
    });
});


function showPreview(imageUrl) {
  // Here, you can use the 'imageUrl' to perform any actions, such as opening a preview in a new tab or displaying it in a modal.
  var imgElement = document.getElementById("dynamic_image");
  imgElement.src = imageUrl;
  document.getElementById("preview_image").style.display = "flex";
  document.getElementById("cart_total").style.display = "none";
}

function resetPreview() {
  var previewImageElement = document.getElementById("preview_image");
  previewImageElement.style.display = "none";

  var cartTotalElement = document.getElementById("cart_total");
  cartTotalElement.style.display = "block";
}


function openpayment(){
  console.log(document.getElementById("cart_total_value").textContent)
  if(document.getElementById("cart_total_value").textContent == "₹None"){
    document.getElementById("popup_heading").textContent = "please";
    document.getElementById("popup_pragraph").textContent = " add item to cart";
    return
  }
  document.getElementById("payment_form").style.display = "flex";
  document.getElementById("huge_cart").style.filter = "blur(2px)";
  var data = {
    qrcode: "qrcode",
    };

    fetch('/generate_qr_code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
      var qrCodeBase64 = responseData.qr_code_base64;
      var qrCodeImage = document.createElement('img');
      qrCodeImage.src = 'data:image/png;base64,' + qrCodeBase64;
      qrCodeImage.style.height = '29vh';
      var qrImageContainer = document.getElementById('qr_image');
      qrImageContainer.innerHTML = '';
      qrImageContainer.appendChild(qrCodeImage);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  
}
function upi_mobile() {
  var name = "upi payment";
  var data = {
    payment: "name",
  };

  fetch('/upi_mobile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the response from Python
    if(data.success){
      console.log(data.message);
      // window.location.href = data.message;
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// function upimobile(){
//   var name = "upi payment";
//   var data = {
//     payment: "name",

//   };
//   fetch('/upi_mobile', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Handle the response from Python
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
//   // fetch('/upimobile', {
//   //     method: 'POST',
//   //     headers: {
//   //         'Content-Type': 'application/json'
//   //     },
//   //     body: JSON.stringify(data)
//   // })
//   // .then(response => response.json())
//   // .then(responseData => {
//   //   console.log(responseData);
//   //   // if(responseData.success){
//   //   //   console.log(responseData.message)
//   //   // }
//   //   // console.log(responseData.success);
//   //   // window.location.href = "upi://pay?pa=9437118029%40upi&am=1&tn=Payment%20for%20purchase";
//   // })
//   // .catch(error => {
//   //     console.error('Error:', error);
//   // });
// }

function closepayment(){
  document.getElementById("payment_form").style.display = "none";
  document.getElementById("huge_cart").style.filter = "blur(0px)";
}

function popup(){
  document.getElementById("login-failed").style.visibility = "visible";
  document.getElementById("login-failed").style.opacity = 1;
}
function closepopup(){
  document.getElementById("login-failed").style.visibility = "hidden";
  document.getElementById("login-failed").style.opacity = 0;
}

function payment_done(){
  const name = document.getElementById('sender_name').value.trim();
  const adress1 = document.getElementById('final_adress1').textContent.trim();
  const adress2 = document.getElementById('final_adress2').textContent.trim();
  const state = document.getElementById('final_state').textContent.trim();
  const pincode = document.getElementById('final_pincode').textContent.trim();
  const mobilenumber = document.getElementById('final_mobilenumber').textContent.trim();
  if(name.length==0){
    document.getElementById("popup_heading").textContent = "please";
    document.getElementById("popup_pragraph").textContent = "Enter your sender name for payment verification or payment will be failed. then cick on payment done";
    popup();
    return;
  }
  if(adress1=="Flat, House no., Building, Compant, Apartment"){
    document.getElementById("popup_heading").textContent = "please";
    document.getElementById("popup_pragraph").textContent = "Enter your adress correctly";
    popup();
    return;
  }
  if(adress2=="Area, Street, Sector, Village"){
    document.getElementById("popup_heading").textContent = "please";
    document.getElementById("popup_pragraph").textContent = "Enter your adress correctly";
    popup();
    return;
  }
  if(pincode=="Pincode"){
    document.getElementById("popup_heading").textContent = "please";
    document.getElementById("popup_pragraph").textContent = "Enter your pincode";
    popup();
    return;
  }
  if(state=="State"){
    document.getElementById("popup_heading").textContent = "please";
    document.getElementById("popup_pragraph").textContent = "Enter your state";
    popup();
    return;
  }
  if(mobilenumber=="None"){
    document.getElementById("popup_heading").textContent = "please";
    document.getElementById("popup_pragraph").textContent = "Enter your Mobile number";
    popup();
    return;
  }
  console.log(name)
  var data = {
    sender: name,
    };

    fetch('/ordered', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData.success);
      closepayment()
      location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function gtag_report_conversion() {
  gtag('event', 'conversion', {
      'send_to': 'AW-11176520506/csFkCKzXm70YELrWsNEp',
      'transaction_id': document.getElementById('sender_name').value.trim()
  })
  return false;
}