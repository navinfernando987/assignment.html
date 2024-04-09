document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
   d
    if (username && password) {
      
      if (username === "admin" && password === "admin") {
        
        document.getElementById("message").innerText = "Login successful!";
        document.getElementById("message").style.color = "green";
        
      } else {
        
        document.getElementById("message").innerText = "Invalid username or password";
        document.getElementById("message").style.color = "red";
      }
    } else {
      document.getElementById("message").innerText = "Please fill in both fields";
      document.getElementById("message").style.color = "red";
    }
  });