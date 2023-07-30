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
          document.getElementById("logincheck").style.display = "none";
          document.getElementById("myaccount").style.display = "inline-block";
        }else{
          document.getElementById("logincheck").style.display = "inline-block";
          document.getElementById("myaccount").style.display = "none";
        }
        console.log(data.success);
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
          // logincheck();
          // openForm();
          // popup();
          // console.log(data);
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
  logincheck();
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

function checkPassword(e) {
  'use strict';
  var el = e.target;
  console.log(el);
  if (el.value.length < 8 && el.value.length !== 0) {
    el.parentNode.previousElementSibling.style.color = '#FB6868';
  } else {
    el.parentNode.previousElementSibling.style.color = '#FDED62';
  }
}

function checkEmail(e) {
  'use strict';
  var el = e.target;
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!reg.test(el.value) && el.value !== '') {
    el.parentNode.previousElementSibling.style.color = '#FB6868';
  } else {
    el.parentNode.previousElementSibling.style.color = '#FDED62';
  }
}

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