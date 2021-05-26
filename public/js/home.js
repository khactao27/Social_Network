
// JS for like/unlike
function React(element) {
    var xhttp = new XMLHttpRequest();
    let post_id = element.getAttribute("name");
    let span = element.parentNode.nextElementSibling.firstElementChild;
    let num_of_loves = parseInt(span.getAttribute("name"));
    console.log(parent);
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
    document.getElementById('label_file').innerHTML = "Change image";
};


function Comment(element) {
    var xhttp = new XMLHttpRequest();
    let content = element.previousElementSibling.value;
    let post_id = element.getAttribute("name");
    let comments = element.parentElement.previousElementSibling;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            let comment = JSON.parse(this.responseText);
            let user_id = comment.user_id;
            let cmt = comment.text;
            let span = document.createElement("span");
            let div = document.createElement("div");
            let txt = document.createTextNode(`${user_id}:${cmt}`);
            span.appendChild(txt);
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
    xhttp.send(JSON.stringify(data));
}
