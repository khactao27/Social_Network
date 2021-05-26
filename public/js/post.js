
//clickable for like post
// use the AJAX for save in data base
function getXMLHttpRequest() {
    /* This function attempts to get a Ajax request object
     by trying a few different methods for different browsers */
    let request, err;
    try {
        request = new XMLHttpRequest(); //Firefox, Safari, Opera, etc.
    } catch (err) {
        try { // First attempt for internet Explorer
            request = new ActiveXObject("MSXML2.XMLHttp.6.0");
        } catch (err) {
            try {
                // Second attempt for Internet Explorer
                request = new ActiveXObject("MSXML2.XMLHttp.3.0");
            } catch (err) {
                request = false; // oops, can't create one.
            }
        }
    }
    return request;
}

function ajaxRespone() {
    if (ajaxRequest.readyState != 4) {//check to see if we're done
        return;
    }
    else {
        if (ajaxRequest.status == 200) {
            // process server data here => results search
           displaySearchResults();
        }
        else {
            alert("Search failed" + ajaxRequest.statusText);
        }
    }
}

function React(element){
    
}

// click to the icon chat -> focus on input comment
function comment(){
    let comment = document.getElementById("comment");
}