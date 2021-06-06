
// JS for like/unlike
function React(element) {
    var xhttp = new XMLHttpRequest();
    let post_id = element.getAttribute("name");
    let span = element.parentNode.nextElementSibling.firstElementChild;
    let num_of_loves = parseInt(span.getAttribute("name"));
    if (element.getAttribute("fill") === "#999999") {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                element.setAttribute("fill", "#ed4956");
                num_of_loves++;
                span.innerHTML = num_of_loves + " Like";
                span.setAttribute("name", num_of_loves);
            }
        }
        let url = "/posts/" + post_id + "/like";
        xhttp.open("POST", url, true);
        xhttp.send(null);
    } else {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                element.setAttribute("fill", "#999999");
                num_of_loves--;
                span.innerHTML = num_of_loves + " Like";
                span.setAttribute("name", num_of_loves);
            }
        }
        let url = "/posts/" + post_id + "/unlike";
        xhttp.open("POST", url, true);
        xhttp.send(null);
    }
}
// JS for create new post
//for check input enter?
let checkEmptyInput = () => {
    var content = document.getElementById("post");
    if (content != null) {
        document.getElementById("btn-submit");
    }
}
// Get the modal
let modal = document.getElementById("myModal");
// Get the form for onclick display the new post.

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the textarea, open the modal 
let postNew = document.getElementById("input-post");
postNew.onclick = function () {
    document.getElementsByClassName("modal")[0].style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    document.getElementsByClassName("modal")[0].style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        document.getElementsByClassName("modal")[0].style.display = "none";
    }
}
var loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById('label_file').innerHTML = "Đổi ảnh khác";
};


function Comment(element) {
    var xhttp = new XMLHttpRequest();
    let content = element.previousElementSibling.value;
    if(content == "") return;
    let post_id = element.getAttribute("name");
    let comments = element.parentElement.previousElementSibling;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            let comment = JSON.parse(this.responseText);
            let user_id = comment.user_id;
            let cmt = comment.text;
            let span = document.createElement("span");
            let div = document.createElement("div");
            let txt = document.createTextNode(`${user_id}`);
            let a = document.createElement("a");
            a.href =`/users/${user_id}`;
            a.appendChild(txt);
            span.appendChild(a);
            span.appendChild(document.createTextNode(`: ${cmt}`));
            div.appendChild(span);
            comments.appendChild(div);
            element.previousElementSibling.value ="";
        }
    }
    let url = `/posts/${post_id}/comments`;
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    let data = {
        content: content,
        post_id: post_id
    }
    console.log(url);
    console.log(data);
    xhttp.send(JSON.stringify(data));
}
function openSearch() {
    let popupSearch = document.getElementById("popupSearch");
    popupSearch.classList.toggle("show");
}

function liveSearch() {
    let name = document.getElementById('input-search').value;
    if(name == null){
        return;
    }
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let span = document.getElementById('popupSearch');
            span.innerHTML="";
            let a, text, img, div;
            let users = JSON.parse(this.responseText);
            if (users.length == 0) {
                div = document.createElement("div");
                div.appendChild(document.createTextNode("Không có kết quả phù hợp."))
                span.appendChild(div);
            } else {
                for (var user of users) {
                    div = document.createElement("div");
                    div.classList.add("user-result");
                    img = document.createElement("img");
                    img.src = user.avatar;
                    img.classList.add("avatar-header");
                    a = document.createElement("a");
                    a.href = `/users/${user.user_id}`;
                    text = document.createTextNode(`${user.fullname} (${user.user_id})`);
                    a.appendChild(text);
                    div.appendChild(img);
                    div.appendChild(a);
                    span.appendChild(div);
                }
            }
        }
    }
    let url = '/search?name=' + name;
    xhttp.open("GET", url, true);
    xhttp.send(null);
}
function myFunction() {
    var popup = document.getElementById("user-navigation");
    popup.classList.toggle("show");
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return ' Vừa xong.';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' phút trước.';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' giờ trước';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' ngày trước.';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' tháng trước.';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' năm trước.';   
    }
}

function openBell(){
    var popup = document.getElementById("bell");
    popup.innerHTML="";
    document.getElementById("bell-icon").src ="/icons/bellstatics.png";
    popup.classList.toggle("show");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let notifications = JSON.parse(this.responseText);
            notifications.forEach(notification => {
                let div = document.createElement("div");
                div.classList.add("notification");
                let a = document.createElement("a");
                a.href = `/users/${notification.actor_id}`;
                let text = document.createTextNode(`${notification.actor_id} đã theo dõi bạn!`);
                let small = document.createElement("small");
                let textspan = document.createTextNode(`${timeDifference(new Date().getTime(), new Date(notification.timestamp).getTime())}`);
                small.appendChild(textspan);
                a.appendChild(text);
                div.appendChild(a);
                div.appendChild(small);
                popup.appendChild(div);
            });
        }
    }
    xhttp.open("GET", '/notifications', true);
    xhttp.send(null);
}
function openOptions(element){
    let popup = element.nextElementSibling;
    popup.classList.toggle("show");
}
function Chat(element){
    alert("Tính năng này đăng được phát triển, vui lòng thử lại sau =))");
}

function editPost(element){
    element.nextElementSibling.style.display="block";
}
function closeEditPost(element){
    element.parentElement.parentElement.style.display="none";
}

function deletePost(element){
   let result = confirm("Bạn có chắc chắn muốn xóa post này không ?");
   if(result == true){
       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function(){
           if(this.readyState == 4 && this.status == 200){
               alert("Bạn đã xóa bài viết thành công!");
               location.reload();
               return;
           }
       }
       let post_id = element.getAttribute("name");
       let url = `/posts/${post_id}`;
       console.log(url);
       xhttp.open("DELETE", url, true);
       xhttp.send(null);
   }
   else{
       return;
   }
}

function updatePost(element){
    
}