function validate(vali) {
    var username = document.getElementById("user").value;
    var fname = document.getElementById("fname").value;
    var account = document.getElementById("account").value;
    var password = document.getElementById('pass').value;
    var regUser = /^[a-zA-Z][\w$.]+@[\w]+\.\w+$|^(09[0-9]{8,})$/;
    var regFname = /^[a-zA-Z0-9]{1,}$/;
    var regAccount = /^[a-zA-Z0-9]{8,}$/;
    var regPass = /^[a-zA-Z0-9!@#$%^&*]{6,}$/;
    var resUser = regUser.test(username);
    var resFname = regFname.test(fname);
    var resAccount = regAccount.test(account);
    var resPass = regPass.test(password);
    if (resUser == false) {
      document.getElementById('userError').style.display = "";
      vali.user.focus();
      return false;
    } else {
      document.getElementById('userError').innerHTML = "";
    }
    if (resFname == false) {
      document.getElementById('fnameError').style.display = "";
      vali.fname.focus();
      return false;
    } else {
        document.getElementById('fnameError').innerHTML = "";
    }
    if (resAccount == false) {
        document.getElementById('accountError').style.display = "";
        vali.account.focus();
        return false;
    } else {
        document.getElementById('accountError').innerHTML = "";
    }
    if (resPass == false) {
        document.getElementById('passError').style.display = "";
        vali.pass.focus();
        return false;
    }  
}
