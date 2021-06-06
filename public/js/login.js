function validate(vali) {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    var regUser = /^[a-zA-Z0-9]{8,}|^[a-zA-Z][\w$.]+@[\w]+\.\w+$|^(0[0-9]{9,})$/;
    var regPass = /^[a-zA-Z0-9!@#$%^&*]{6,}$/; 
    var resUser = regUser.test(username);
    var resPass = regPass.test(password);
    if (resUser == false) {
      document.getElementById('userError').style.display = "";
      vali.user.focus();
      return false;
    } else {
      document.getElementById('userError').innerHTML = "";
    }
    if (resPass == false) {
      document.getElementById('passError').style.display = "";
      vali.pass.focus();
      return false;
    }
}
  