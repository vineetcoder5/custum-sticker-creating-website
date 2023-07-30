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



document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('loginsignup');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var formData = new FormData(this);
      var credentials = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        password: formData.get('password').trim(),
        logintype: "signup"
      };
      fetch('/unicorn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(function(response) {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Request failed.');
        })
        .then(function(data) {
          var container = document.getElementById('new_content');
          container.innerHTML = data;
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
});


window.onload = function() {
  // Run your command or function here
  console.log("logincheck");
  openForm();

};

/*global console, alert, confirm, prompt*/
/*global console, alert, confirm, prompt*/
var forms = document.forms;
p = document.querySelectorAll('p'),
  input = document.querySelectorAll('input:not([type="submit"])'),
  submit = document.querySelectorAll('input[type="submit"]');
password = input[2],
  password2 = document.getElementById('passwordIn'),
  email = input[1],
  email2 = document.getElementById('emailIn');

[].forEach.call(input, function(inputE) {
  'use strict';

  inputE.addEventListener('focus', function() {
    'use strict';
    inputE.parentNode.previousElementSibling.style.color = '#FDED62';
    inputE.style.transform = 'translate(5px, 5px)';
  });

  inputE.addEventListener('blur', function() {
    'use strict';
    console.log('blur');
    inputE.parentNode.previousElementSibling.style.color = '#fff';
    inputE.style.transform = 'translate(0px, 0px)';
  });
});





