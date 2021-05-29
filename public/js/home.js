
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
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let ul = document.getElementById("list");
            let span = document.getElementById('popupSearch');
            span.removeChild(ul);
            ul = document.createElement("UL");
            ul.id = "list";
            var li, a, text, n;

            let users = JSON.parse(this.responseText);
            if (users.length == 0) {
                li = document.createElement("LI");
                li.appendChild(document.createTextNode("No results."));
                ul.appendChild(li);
            } else {
                for (var user of users) {
                    li = document.createElement("LI");
                    a = document.createElement("a");
                    a.href = `/users/${user.user_id}`;
                    n = `${user.fullname} (${user.user_id})`;
                    text = document.createTextNode(n);
                    a.appendChild(text);
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            }
            span.appendChild(ul);
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

function Chat(element){
    alert("Tính năng này đăng được phát triển, vui lòng thử lại sau =))");
}