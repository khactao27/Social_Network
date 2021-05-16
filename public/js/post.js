
//clickable for like post
// use the AJAX for save in data base
function react(){
    
    let like = document.getElementById("like").getAttribute("fill");
    console.log(like);
    if(like === "red"){
        document.getElementById("like").style.fill= "black";
        return;
    }else{
        document.getElementById("like").style.fill= "red";
        return;
    }
}

// click to the icon chat -> focus on input comment
function comment(){
    let comment = document.getElementById("comment");
}