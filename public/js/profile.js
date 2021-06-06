
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