var open = 1;
function openForm() {
	if (open==0){
        // document.getElementById("huge_cart").style.filter = "blur(0px)";
		document.getElementById("adress_form").style.display = "none";
		open=1;
	}else{
    document.getElementById("Name").value = document.getElementById("final_name").textContent.trim();
    document.getElementById("address1").value = document.getElementById("final_adress1").textContent.trim();
    document.getElementById("address2").value = document.getElementById("final_adress2").textContent.trim();
    document.getElementById("state").value = document.getElementById("final_state").textContent.trim();
    document.getElementById("pincode").value = document.getElementById("final_pincode").textContent.trim();
    document.getElementById("mobilenumber").value = document.getElementById("final_mobilenumber").textContent.trim();
    // document.getElementById("huge_cart").style.filter = "blur(2px)";
    document.getElementById("adress_form").style.display = "block";
    open=0;
	}
}

function logout(){
    var payload = { cart_id: "logout"};
    // Make a POST request to the Python server
    fetch('/log_out', {
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
          console.log(data);
          location.reload();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
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
  console.log("ko")
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
