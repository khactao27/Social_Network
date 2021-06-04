
function Follow(element){
  var xhttp = new XMLHttpRequest();
  let user_id = element.getAttribute("name");
  let status = parseInt(element.getAttribute("value"));
  let follower = document.getElementById("num-follower");
  if(status == 0){
    xhttp.onreadystatechange = function(){
      console.log(this.status);
      if(this.status == 201 && this.readyState == 4){
        element.innerHTML = "Đang theo dõi";
        element.setAttribute("value", "1");
        let data = JSON.parse(this.responseText);
        let num_followers = data.num_followers;
        follower.innerHTML = `${num_followers} người theo dõi`;
        element.style.background ="#beb3f3";
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
        let data = JSON.parse(this.responseText);
        let num_followers = data.num_followers;
        follower.innerHTML = `${num_followers} người theo dõi`;
        element.style.background = "rgb(253, 253, 253)";
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

let editModal = document.getElementById("editModal");
function openEditProfile(){
  editModal.style.display = "block";
}
function closeEdit(){
  editModal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == editModal) {
      editModal.style.display = "none";
  }
}

function updateInfo(){
  let fullname = document.getElementById("txtFullName").value;
  let class_id = document.getElementById("txtIdClass").value;
  let birthday = document.getElementById("txtDOB").value;
  let gender = document.getElementsByName("gender").value;
  let hometown = document.getElementById("txtHometown").value;
  let status = parseInt(document.getElementById("relation-select").value);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){

  }
}

function changeAvatar(event){
  var image = document.getElementById('avatar_change');
  image.src = URL.createObjectURL(event.target.files[0]);
  document.getElementById('label_avatar').innerHTML = "Đổi ảnh khác";
}