
function Follow(element){
  var xhttp = new XMLHttpRequest();
  let user_id = element.getAttribute("name");
  let status = parseInt(element.getAttribute("value"));
  console.log(status);
  if(status == 0){
    xhttp.onreadystatechange = function(){
      console.log(this.status);
      if(this.status == 201 && this.readyState == 4){
        element.innerHTML = "Đang theo dõi";
        element.setAttribute("value", "1");
        return;
      }
    };
    let url = `/users/${user_id}/follow`;
    xhttp.open("POST", url, true);
    xhttp.send(JSON.stringify({user_id: user_id}));
  }
  else{
    xhttp.onreadystatechange= function(){
      console.log(this.status);
      if(this.status == 200 && this.readyState == 4){
        element.innerHTML = "Theo dõi";
        element.setAttribute("value", "0");
        return;
      }
    };
    let auth = confirm("Bạn đồng ý hủy theo dõi?");
    if(auth == true){
      let url = `/users/${user_id}/unfollow`;
      xhttp.open("POST", url, true);
      xhttp.send(null);
    }else{
      return;
    }
  }
}

function openEditProfile(){
  document.getElementById("userDetail").classList.remove("dialog-hide");
}
function CloseModal(){
  document.getElementById("userDetail").classList.add("dialog-hide");
}


function updateInfo(){
  
}