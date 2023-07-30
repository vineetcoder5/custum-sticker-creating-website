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


function loadImages(tabName) {
    const galleryContainer = document.getElementById("gallary");
    fetch(`/get_images/${tabName}`)
        .then(response => response.json())
        .then(images => {
            galleryContainer.innerHTML = "";
            console.log(images)
            images.forEach(image => {
                const divElement = document.createElement("div");
                divElement.style.height = "120px";
                divElement.style.width = "120px";
                divElement.style.display = "flex";
                divElement.style.backgroundColor = "#f3e9e9";
                divElement.style.margin = "12px";
                // divElement.style.float = "left";
                var filename = "static/"+ tabName + "/"+image;
                console.log(filename)
                divElement.innerHTML = `
                    <img style="width: 100%; height: 100%;" src="${filename}">
                `;
                galleryContainer.appendChild(divElement);
            });
        })
        .catch(error => console.error("Error loading images:", error));
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
            console.log(data.user)
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
    loadImages("coders");
};

// canvas script



window.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let images = [];
    let selectedImage = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let resizeHandleRadius = 8;
    let resizeHandleSelected = null;

    function setCanvasSize() {
        const devicePixelRatio = window.devicePixelRatio || 1;
        const canvasWidth = canvas.offsetWidth * devicePixelRatio;
        const canvasHeight = canvas.offsetHeight * devicePixelRatio;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Scale the context to match the device pixel ratio
        context.scale(devicePixelRatio, devicePixelRatio);

        // Additional code to update the canvas content based on the new size
        // ...
        console.log(`Canvas size set to ${canvasWidth} x ${canvasHeight}`);
        
    }

    // Call the setCanvasSize function initially and on window resize
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);


    const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', deleteSelectedImage);

const uploadUrlButton = document.getElementById('upload-url');
    uploadUrlButton.addEventListener('click', handleImageUrlUpload);

    // ... existing code ...

    const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', openUploadDialog);

function openUploadDialog() {
    const uploadInput = document.getElementById('upload');
    uploadInput.click();
}

    function handleImageUrlUpload() {
        const imageUrlInput = document.getElementById('image-url');
        const imageUrl = imageUrlInput.value.trim();

        if (imageUrl === '') {
            return;
        }

        const image = new Image();
        image.onload = function () {
            const scaledWidth = image.width / 4;
            const scaledHeight = image.height / 4;

            images.push({
                x: canvas.width / 2 - scaledWidth / 2,
                y: canvas.height / 2 - scaledHeight / 2,
                width: scaledWidth,
                height: scaledHeight,
                img: image,
                rotationAngle: 0,
                borderColor: 'white',
                fillColor: 'white',
                opacity: 1
            });
            redrawCanvas();
            updateLayerStack();

            imageUrlInput.value = ''; // Clear the input field after upload
        };
        image.src = imageUrl;
    }
    
    

// Function to delete the selected image
function deleteSelectedImage() {
if (selectedImage !== null) {
    images.splice(selectedImage, 1);
    selectedImage = null;
    redrawCanvas();
    updateLayerStack();
}
}


    // Handle image upload
    const upload = document.getElementById('upload');
    upload.addEventListener('change', handleImageUpload);

    // Handle drag and drop
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);

    // Handle zoom in/out
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    zoomInButton.addEventListener('click', zoomIn);
    zoomOutButton.addEventListener('click', zoomOut);

    // Handle rotation
    const rotationAngleInput = document.getElementById('rotation-angle');
    const rotateButton = document.getElementById('rotate');
    rotateButton.addEventListener('click', handleRotateButtonClick);

    // Handle layer stack
    const layerList = document.getElementById('layer-list');
    let draggingLayerIndex = null;

    function handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                const scaledWidth = image.width / 4;
                const scaledHeight = image.height / 4;

                images.push({
                    x: canvas.width / 2 - scaledWidth / 2,
                    y: canvas.height / 2 - scaledHeight / 2,
                    width: scaledWidth,
                    height: scaledHeight,
                    img: image,
                    rotationAngle: 0,
                    borderColor: 'white',
                    fillColor: 'white',
                    opacity: 1
                });
                redrawCanvas();
                updateLayerStack();
            };
            image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                const scaledWidth = image.width / 4;
                const scaledHeight = image.height / 4;

                images.push({
                    x: event.clientX - canvas.getBoundingClientRect().left - scaledWidth / 2,
                    y: event.clientY - canvas.getBoundingClientRect().top - scaledHeight / 2,
                    width: scaledWidth,
                    height: scaledHeight,
                    img: image,
                    rotationAngle: 0,
                    borderColor: 'white',
                    fillColor: 'white',
                    opacity: 1
                });
                redrawCanvas();
                updateLayerStack();
            };
            image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    function redrawCanvas() {
context.clearRect(0, 0, canvas.width, canvas.height);
images.forEach((image, index) => {
context.save();
context.translate(image.x + image.width / 2, image.y + image.height / 2);
context.rotate((image.rotationAngle * Math.PI) / 180);
context.globalAlpha = image.opacity;

// Draw the image
context.drawImage(image.img, -image.width / 2, -image.height / 2, image.width, image.height);

// Draw the selection border and resize handles
if (selectedImage === index) {
    context.strokeStyle = image.borderColor;
    context.lineWidth = 2;

    // Calculate the border coordinates based on the rotated image
    const borderX = -image.width / 2;
    const borderY = -image.height / 2;
    const borderWidth = image.width;
    const borderHeight = image.height;
    
    // Draw the border
    context.beginPath();
    context.rect(borderX, borderY, borderWidth, borderHeight);
    context.closePath();
    context.stroke();

    // Draw the resize handles
    drawResizeHandles(borderX, borderY, borderWidth, borderHeight);

    // Convert pixel values to centimeters
    const cmConversionFactor = 0.02645833; // Adjust this factor based on your desired conversion rate
    const widthInCm = (image.width * cmConversionFactor).toFixed(2);
    const heightInCm = (image.height * cmConversionFactor).toFixed(2);

    // Show image dimensions in cm
    const fontSize = 14;
    const textWidth = `Width: ${widthInCm} cm`;
    const textHeight = `Height: ${heightInCm} cm`;
    const textXWidth = borderX + borderWidth / 2 - context.measureText(textWidth).width / 2;
    const textYWidth = borderY - fontSize - 5;
    const textXHeight = borderX + borderWidth + 5;
    const textYHeight = borderY + borderHeight / 2 + fontSize / 2;

    context.fillStyle = image.borderColor;
    context.font = `${fontSize}px Arial`;
    context.fillText(textWidth, textXWidth, textYWidth);
    context.fillText(textHeight, textXHeight, textYHeight);
}

context.restore();
});
}





    function drawResizeHandles(x, y, width, height) {
        const handleSize = resizeHandleRadius * 2;

        // Top left
        drawCircle(x, y, resizeHandleRadius);
        // Top right
        drawCircle(x + width, y, resizeHandleRadius);
        // Bottom left
        drawCircle(x, y + height, resizeHandleRadius);
        // Bottom right
        drawCircle(x + width, y + height, resizeHandleRadius);

        function drawCircle(centerX, centerY, radius) {
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            context.fillStyle = 'red';
            context.strokeStyle = 'white';
            context.lineWidth = 1;
            context.fill();
            context.stroke();
        }
    }

    function handleCanvasClick(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        let selected = null;
        images.forEach((image, index) => {
            if (
                x >= image.x &&
                x <= image.x + image.width &&
                y >= image.y &&
                y <= image.y + image.height
            ) {
                selected = index;
            }
        });

        selectedImage = selected;
        redrawCanvas();
        updateLayerStack();
    }

    function handleMouseDown(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (selectedImage !== null && isPointInResizeHandle(x, y)) {
            isDragging = false;
            dragStartX = x;
            dragStartY = y;
            resizeHandleSelected = getResizeHandleIndex(x, y);
        } else if (selectedImage !== null && isPointInsideBoundingBox(x, y)) {
            isDragging = true;
            dragStartX = x - images[selectedImage].x;
            dragStartY = y - images[selectedImage].y;
        }
    }

    function handleMouseMove(event) {
        if (!isDragging && resizeHandleSelected === null) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (resizeHandleSelected !== null) {
            resizeImage(x, y);
        } else if (isDragging) {
            moveImage(x, y);
        }
    }

    function handleMouseUp(event) {
        isDragging = false;
        resizeHandleSelected = null;
    }

    function moveImage(x, y) {
        const image = images[selectedImage];
        image.x = x - dragStartX;
        image.y = y - dragStartY;
        redrawCanvas();
        updateLayerStack();
    }

    function resizeImage(x, y) {
const image = images[selectedImage];
const resizeHandleX = image.x + image.width;
const resizeHandleY = image.y + image.height;

if (resizeHandleSelected === 0) {
// Top left
const newWidth = resizeHandleX - x;
const newHeight = resizeHandleY - y;
if (newWidth <= 0 || newHeight <= 0) {
    return; // Don't update the image dimensions if width or height is negative
}
image.x = x;
image.y = y;
image.width = newWidth;
image.height = newHeight;
} else if (resizeHandleSelected === 1) {
// Top right
const newWidth = x - image.x;
const newHeight = resizeHandleY - y;
if (newWidth <= 0 || newHeight <= 0) {
    return; // Don't update the image dimensions if width or height is negative
}
image.y = y;
image.width = newWidth;
image.height = newHeight;
} else if (resizeHandleSelected === 2) {
// Bottom left
const newWidth = resizeHandleX - x;
const newHeight = y - image.y;
if (newWidth <= 0 || newHeight <= 0) {
    return; // Don't update the image dimensions if width or height is negative
}
image.x = x;
image.width = newWidth;
image.height = newHeight;
} else if (resizeHandleSelected === 3) {
// Bottom right
const newWidth = x - image.x;
const newHeight = y - image.y;
if (newWidth <= 0 || newHeight <= 0) {
    return; // Don't update the image dimensions if width or height is negative
}
image.width = newWidth;
image.height = newHeight;
}

redrawCanvas();
updateLayerStack();
}

    function isPointInResizeHandle(x, y) {
        if (selectedImage === null) return false;

        const image = images[selectedImage];
        const resizeHandleX = image.x + image.width;
        const resizeHandleY = image.y + image.height;

        // Top left
        if (isPointInCircle(x, y, image.x, image.y, resizeHandleRadius)) {
            return true;
        }
        // Top right
        if (isPointInCircle(x, y, resizeHandleX, image.y, resizeHandleRadius)) {
            return true;
        }
        // Bottom left
        if (isPointInCircle(x, y, image.x, resizeHandleY, resizeHandleRadius)) {
            return true;
        }
        // Bottom right
        if (isPointInCircle(x, y, resizeHandleX, resizeHandleY, resizeHandleRadius)) {
            return true;
        }

        return false;
    }

    function isPointInCircle(x, y, centerX, centerY, radius) {
        const dx = x - centerX;
        const dy = y - centerY;
        return dx * dx + dy * dy <= radius * radius;
    }

    function getResizeHandleIndex(x, y) {
        if (selectedImage === null) return null;

        const image = images[selectedImage];
        const resizeHandleX = image.x + image.width;
        const resizeHandleY = image.y + image.height;

        // Top left
        if (isPointInCircle(x, y, image.x, image.y, resizeHandleRadius)) {
            return 0;
        }
        // Top right
        if (isPointInCircle(x, y, resizeHandleX, image.y, resizeHandleRadius)) {
            return 1;
        }
        // Bottom left
        if (isPointInCircle(x, y, image.x, resizeHandleY, resizeHandleRadius)) {
            return 2;
        }
        // Bottom right
        if (isPointInCircle(x, y, resizeHandleX, resizeHandleY, resizeHandleRadius)) {
            return 3;
        }

        return null;
    }

    function isPointInsideBoundingBox(x, y) {
        if (selectedImage === null) return false;

        const image = images[selectedImage];
        return (
            x >= image.x &&
            x <= image.x + image.width &&
            y >= image.y &&
            y <= image.y + image.height
        );
    }

    function zoomIn() {
        canvas.width *= 1.1;
        canvas.height *= 1.1;
        redrawCanvas();
    }

    function zoomOut() {
        canvas.width *= 0.9;
        canvas.height *= 0.9;
        redrawCanvas();
    }

    function handleRotateButtonClick() {
        const angle = parseInt(rotationAngleInput.value);
        if (!isNaN(angle)) {
            rotateSelectedImage(angle);
        }
    }

    function rotateSelectedImage(angle) {
        if (selectedImage !== null) {
            const image = images[selectedImage];
            image.rotationAngle += angle;
            redrawCanvas();
        }
    }

    function deleteSelectedImage() {
        if (selectedImage !== null) {
            images.splice(selectedImage, 1);
            selectedImage = null;
            redrawCanvas();
            updateLayerStack();
        }
    }

    function updateLayerStack() {
        layerList.innerHTML = '';
        images.forEach((image, index) => {
            const layerItem = document.createElement('div');
            layerItem.classList.add('layer-stack-item');
            layerItem.draggable = true;
            layerItem.addEventListener('dragstart', handleLayerDragStart);
            layerItem.addEventListener('dragover', handleLayerDragOver);
            layerItem.addEventListener('drop', handleLayerDrop);
            layerItem.addEventListener('dragend', handleLayerDragEnd);

            const layerImage = document.createElement('img');
            layerImage.src = image.img.src;

            const layerIndex = document.createElement('span');
            layerIndex.innerText = index + 1;

            layerItem.appendChild(layerImage);
            layerItem.appendChild(layerIndex);
            layerList.appendChild(layerItem);
        });
    }

    function handleLayerDragStart(event) {
        draggingLayerIndex = parseInt(event.target.querySelector('span').innerText) - 1;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', '');
        this.classList.add('selected');
    }

    function handleLayerDragOver(event) {
        event.preventDefault();
    }

    function handleLayerDrop(event) {
        event.preventDefault();

        const targetLayerIndex = parseInt(event.target.querySelector('span').innerText) - 1;

        if (draggingLayerIndex !== null && targetLayerIndex !== null && draggingLayerIndex !== targetLayerIndex) {
            const temp = images[draggingLayerIndex];
            images[draggingLayerIndex] = images[targetLayerIndex];
            images[targetLayerIndex] = temp;
            redrawCanvas();
            updateLayerStack();
        }
    }

    function handleLayerDragEnd() {
        draggingLayerIndex = null;
        this.classList.remove('selected');
    }

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    updateLayerStack();
    // function downloadCanvas() {
    //     // Create a temporary anchor element
    //     const link = document.createElement('a');
    //     link.href = canvas.toDataURL(); // Convert canvas to data URL
    //     link.download = 'canvas.png'; // Set the download filename
    //     link.click(); // Simulate a click event to trigger the download
    // }
    
    // // Add click event listener to the download button
    // const downloadButton = document.getElementById('download');
    // downloadButton.addEventListener('click', downloadCanvas);

    function downloadCanvas() {
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
                var canvas = document.getElementById("canvas");
                // var context = canvas.getContext("2d");
                // context.font = "14px Arial, sans-serif";
                // context.fillText("ID: " +  document.getElementById("idd").textContent, 10, 12);
                const link = document.createElement('a');
                link.href = canvas.toDataURL(); // Convert canvas to data URL
                link.download = 'canvas.png'; // Set the download filename
                // link.click(); // Simulate a click event to trigger the download

                const canvasDataUrl = canvas.toDataURL();
                const blob = dataURLtoBlob(canvasDataUrl);
                const formData = new FormData();
                formData.append('file', blob, 'canvas.png');
                fetch('/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    window.location.href = "/cart";
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }else{
                openForm();
                console.log(data.success);
                return
            }
        //   console.log(data.success);
        })
        .catch(function(error) {
            // Handle errors
            console.log(error);
        });
        // Create a temporary anchor element
        // const link = document.createElement('a');
        // link.href = canvas.toDataURL(); // Convert canvas to data URL
        // link.download = 'canvas.png'; // Set the download filename
        // link.click(); // Simulate a click event to trigger the download

        // const canvasDataUrl = canvas.toDataURL();
        // const blob = dataURLtoBlob(canvasDataUrl);
        // const formData = new FormData();
        // formData.append('file', blob, 'canvas.png');
        // fetch('/upload', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => {
        //     // Handle the response from the server
        //     // ...
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
    }
    
    // Add click event listener to the download button
    const downloadButton = document.getElementById('download');
    downloadButton.addEventListener('click', downloadCanvas);



    function dataURLtoBlob(dataURL) {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const b64Data = parts[1];
    
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        return new Blob(byteArrays, { type: contentType });
    }
    
});
