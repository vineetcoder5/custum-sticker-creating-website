var open = 1;
function openForm() {
	if (open==0){
		document.getElementById("wrapper").style.display = "none";
		open=1;
	}else{
		document.getElementById("wrapper").style.display = "block";
		open=0;
	}
}
function isLoggedIn() {
  console.log(document.cookie.includes('self.id='));
  return document.cookie.includes('session='); // Check if the "session" cookie exists
}
function add_to_cart(filename){
  var credentials = 'logincheck';
  fetch('/api/logincheck', {
  method: 'POST',
  headers: {
      'Content-Type': 'text/plain'
  },
  body: credentials
  })
  .then(function(response) {
      if (response.ok) {
      return response.json();
      }
      throw new Error('Request failed.');
  })
  .then(function(data) {
      // Handle the response from Flask
      if (data.success){
        console.log(filename)
        var credentials = filename;
        fetch('/add_to_cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: credentials
        })
          .then(function(response) {
            if (response.ok) {
              window.location.href = "/cart";
              return response.json();
            }
            throw new Error('Request failed.');
          })
          .then(function(data) {
            // Handle the response from Flask
            console.log(data);
          //   console.log(data.success);
          })
          .catch(function(error) {
            // Handle errors
            console.log(error);
          });
      }else{
          openForm();
          console.log(data.success);
      }
  //   console.log(data.success);
  })
  .catch(function(error) {
      // Handle errors
      console.log(error);
  });
}

function scrollRight() {
    const container = document.getElementById("sticker_select");
    const scrollStep = 80; 
    container.scrollBy(scrollStep, 0);
}

function scrollle() {
    const container = document.getElementById("sticker_select");
    const scrollStep = 80; 
    container.scrollBy(-scrollStep, 0);
}

function preview_image(url){
    var imgElement = document.getElementById("image_pre");
    imgElement.src = url;
    document.getElementById("preview").style.display = "block";
    document.getElementById("gallary").style.filter = "blur(4px)";
    console.log(url);
}

function preview_close(){
    document.getElementById("preview").style.display = "none";
    document.getElementById("gallary").style.filter = "blur(0px)";
}

function loadImages(tabName) {
    const galleryContainer = document.getElementById("gallary");
    const fragment = document.createDocumentFragment(); // Use DocumentFragment
    fetch(`/pre_built`)
        .then(response => response.json())
        .then(images => {
            galleryContainer.innerHTML = "";
            images.forEach(image => {
                const divElement = document.createElement("div");
                divElement.id = "products";

                const productContainer = document.createElement("div");
                productContainer.style.height = "300px";
                productContainer.style.width = "274px";
                productContainer.style.display = "flex";
                productContainer.style.backgroundColor = "rgb(243, 233, 233)";
                productContainer.style.margin = "12px";
                productContainer.style.flexDirection = "column";

                const filename = `static/cart_images/pre_built/${image}`;
                const fileNameWithoutExtension = image.split('.').slice(0, -1).join('.')
                productContainer.innerHTML = `
                    <img onclick="preview_image('${filename}')" alt="${fileNameWithoutExtension}" style="width: 100%; height: 100%;" src="${filename}">
                `;

                const cartButtonContainer = document.createElement("div");
                const cartButton = document.createElement("button");
                cartButton.id = "cart_button";
                cartButton.className = "custom-btn btn-15";
                cartButton.style.marginRight = "0px";
                cartButton.onclick = function() {
                  add_to_cart(`${fileNameWithoutExtension}`);
                };
                cartButton.innerHTML = `
                    <div>
                        <img src="static/image/cart.png" alt="${fileNameWithoutExtension}" width="30px" height="30px" style="float: left;">
                    </div>
                    <div style="padding: 7px;">Add to cart</div>
                `;

                cartButtonContainer.appendChild(cartButton);
                divElement.appendChild(productContainer);
                divElement.appendChild(cartButtonContainer);

                fragment.appendChild(divElement);
            });
            galleryContainer.innerHTML = "";
            galleryContainer.appendChild(fragment);
        })
        .catch(error => console.error("Error loading images:", error));
}




function mobile_custumize(){
  document.getElementById("popup_heading").textContent = "message";
  document.getElementById("popup_pragraph").textContent = "Please open in laptop to custumize sticker sheet.";
  popup();
  return;
}
// /*global console, alert, confirm, prompt*/
// /*global console, alert, confirm, prompt*/
// var forms = document.forms;
// p = document.querySelectorAll('p'),
//   input = document.querySelectorAll('input:not([type="submit"])'),
//   submit = document.querySelectorAll('input[type="submit"]');
// password = input[2],
//   password2 = document.getElementById('passwordIn'),
//   email = input[1],
//   email2 = document.getElementById('emailIn');

// [].forEach.call(input, function(inputE) {
//   'use strict';

//   inputE.addEventListener('focus', function() {
//     'use strict';
//     inputE.parentNode.previousElementSibling.style.color = '#FDED62';
//     inputE.style.transform = 'translate(5px, 5px)';
//   });

//   inputE.addEventListener('blur', function() {
//     'use strict';
//     console.log('blur');
//     inputE.parentNode.previousElementSibling.style.color = '#fff';
//     inputE.style.transform = 'translate(0px, 0px)';
//   });
// });

// function checkPassword(e) {
//   'use strict';
//   var el = e.target;
//   console.log(el);
//   if (el.value.length < 8 && el.value.length !== 0) {
//     el.parentNode.previousElementSibling.style.color = '#FB6868';
//   } else {
//     el.parentNode.previousElementSibling.style.color = '#FDED62';
//   }
// }

// function checkEmail(e) {
//   'use strict';
//   var el = e.target;
//   var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   if (!reg.test(el.value) && el.value !== '') {
//     el.parentNode.previousElementSibling.style.color = '#FB6868';
//   } else {
//     el.parentNode.previousElementSibling.style.color = '#FDED62';
//   }
// }

// password.addEventListener('input', checkPassword);
// password.addEventListener('focus', checkPassword);
// email.addEventListener('input', checkEmail);
// email.addEventListener('focus', checkEmail);
// submit[0].addEventListener('click', function(e) {
//   'use strict';
// });

// password2.addEventListener('input', checkPassword);
// password2.addEventListener('focus', checkPassword);
// email2.addEventListener('input', checkEmail);
// email2.addEventListener('focus', checkEmail);
// submit[1].addEventListener('click', function(e) {
//   'use strict';
// });

// var button = document.getElementById('button'),
//   wrapper = document.getElementById('wrapper'),
//   c = true,
//   one = document.getElementById('one'),
//   two = document.getElementById('two');
var c = true;
function changeform() {
  'use strict';
  var button = document.getElementById('button'),
  wrapper = document.getElementById('wrapper'),
  one = document.getElementById('one'),
  two = document.getElementById('two');
  if (c) {
    one.style.pointerEvents = 'none';
    two.style.pointerEvents = 'auto';
    one.style.opacity = '0.1';
    two.style.opacity = '1';
    one.style.transform = 'translateX(100%)';
    two.style.transform = 'translateX(0%)';
    button.textContent = 'Sign Up';

    c = false;
  } else {
    one.style.pointerEvents = 'auto';
    two.style.pointerEvents = 'none';
    one.style.opacity = '1';
    two.style.opacity = '0.1';
    one.style.transform = 'translateX(0%)';
    two.style.transform = 'translateX(-100%)';
    button.textContent = 'Sign In';

    c = true;
  }

};

// // editor display

function layerr() {
  document.getElementById("layerr").style.display = "block";
   document.getElementById("stickers").style.display = "none";
  document.getElementById("deleteeditor").style.display = "none";
  document.getElementById("uploadd").style.display = "none";
}
function stickers() {
  document.getElementById("layerr").style.display = "none";
  document.getElementById("stickers").style.display = "flex";
  document.getElementById("deleteeditor").style.display = "none";
  document.getElementById("uploadd").style.display = "none";
  loadImages('coders')
}
function uploadd() {
  document.getElementById("layerr").style.display = "none";
  document.getElementById("stickers").style.display = "none";
  document.getElementById("deleteeditor").style.display = "none";
  document.getElementById("uploadd").style.display = "block";
}
function deleteeditor() {
    document.getElementById("layerr").style.display = "none";
    document.getElementById("stickers").style.display = "none";
    document.getElementById("uploadd").style.display = "none";
    document.getElementById("deleteeditor").style.display = "flex";
  }

  function popup(){
    document.getElementById("login-failed").style.visibility = "visible";
    document.getElementById("login-failed").style.opacity = 1;
  }
  function closepopup(){
    document.getElementById("login-failed").style.visibility = "hidden";
    document.getElementById("login-failed").style.opacity = 0;
  }


  function logincheck(){
    var credentials = 'logincheck';
  
      fetch('/api/logincheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: credentials
      })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed.');
        })
        .then(function(data) {
          // Handle the response from Flask
          if (data.success){
            // console.log(data.user)
            document.getElementById("idd").textContent = data.user;
            document.getElementById("logincheck").style.display = "none";
            document.getElementById("myaccount").style.display = "inline-block";
            document.getElementById("cart_button").style.display = "inline-block";
          }else{
            document.getElementById("logincheck").style.display = "inline-block";
            document.getElementById("myaccount").style.display = "none";
            document.getElementById("cart_button").style.display = "none";
          }
        //   console.log(data.success);
        })
        .catch(function(error) {
          // Handle errors
          console.log(error);
        });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('loginsignup');
    if (form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        var credentials = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim().toLowerCase(),
            password: formData.get('password').trim(),
            logintype: "signup"
        };
        if(credentials.name.length==0){
            document.getElementById("popup_heading").textContent = "Error";
            document.getElementById("popup_pragraph").textContent = "Please enter your name.";
            openForm();
            popup();
            return;
        }
        if(credentials.email.length==0){
            document.getElementById("popup_heading").textContent = "Error";
            document.getElementById("popup_pragraph").textContent = "Please enter your email.";
            openForm();
            popup();
            return;
        }
        if (credentials.password.length<7) {
            // Handle empty password field
            document.getElementById("popup_heading").textContent = "Error";
            document.getElementById("popup_pragraph").textContent = "Please enter the password correctly in correct format.";
            openForm();
            popup();
            return;
        }
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(function(response) {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed.');
          })
          .then(function(data) {
            if(data.success){
                logincheck();
                openForm();
            }else{
                logincheck();
                openForm();
                document.getElementById("popup_heading").textContent = "Error";
                document.getElementById("popup_pragraph").textContent = data.message;
                popup();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('loginsignin');
    if (form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
  
        var formData = new FormData(this);
        var credentials = {
            email: formData.get('email').trim().toLowerCase(),
            password: formData.get('password').trim(),
            logintype: "signin"
        };
        if(credentials.email.length==0){
            document.getElementById("popup_heading").textContent = "Error";
            document.getElementById("popup_pragraph").textContent = "Please enter your email.";
            openForm();
            popup();
            return;
        }
        if (credentials.password.length==0) {
            // Handle empty password field
            document.getElementById("popup_heading").textContent = "Error";
            document.getElementById("popup_pragraph").textContent = "Please enter the password";
            openForm();
            popup();
            return;
        }
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(function(response) {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed.');
          })
          .then(function(data) {
            if(data.success){
                logincheck();
                openForm();
            }else{
                logincheck();
                openForm();
                document.getElementById("popup_heading").textContent = "Error";
                document.getElementById("popup_pragraph").textContent = data.message;
                popup();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  });

// function cart(){
//     var credentials = 'logincheck';
//     fetch('/api/logincheck', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'text/plain'
//     },
//     body: credentials
//     })
//     .then(function(response) {
//         if (response.ok) {
//         return response.json();
//         }
//         throw new Error('Request failed.');
//     })
//     .then(function(data) {
//         // Handle the response from Flask
//         if (data.success){
//             window.location.href = "/cart";
//         }else{
//             openForm();
//              console.log(data.success);
//         }
//     //   console.log(data.success);
//     })
//     .catch(function(error) {
//         // Handle errors
//         console.log(error);
//     });
// }
window.onload = function() {
    // Run your command or function here
    console.log("logincheck");
    logincheck();
    loadImages("cart_images");
    isLoggedIn();
};

// canvas script

