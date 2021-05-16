
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