
// When the user clicks on div, open the popup
function myFunction() {
    var popup = document.getElementById("user-navigation");
    popup.classList.toggle("show");
}

// function getXMLHttpRequest() {
//     /* This function attempts to get a Ajax request object
//      by trying a few different methods for different browsers */
//     let request, err;
//     try {
//         request = new XMLHttpRequest(); //Firefox, Safari, Opera, etc.
//     } catch (err) {
//         try { // First attempt for internet Explorer
//             request = new ActiveXObject("MSXML2.XMLHttp.6.0");
//         } catch (err) {
//             try {
//                 // Second attempt for Internet Explorer
//                 request = new ActiveXObject("MSXML2.XMLHttp.3.0");
//             } catch (err) {
//                 request = false; // oops, can't create one.
//             }
//         }
//     }
//     return request;
// }
// function displayDisplayResults(){
//     // This function will display the search results, and is the callback function for the Ajax request 
//     let ul = document.getElementById('list');
//     var i, n, li, t, a;
//     var span = document.getElementById('popupSearch');

//     span.removeChild(ul);
//     ul = document.createElement("UL");
//     ul.id = "list";
//     var users = JSON.parse(ajaxRequest.responseText);

//     for(let user of users){
//         li = document.createElement("LI");
//         a = document.createElement("a");
//         a.href = `/users/${user.user_id}`;
//         n = `${user.firstname} ${user.lastname}(${user.user_id})`;
//         t = document.createTextNode(n);
//         a.appendChild(t);
//         li.appendChild(a);
//         ul.appendChild(li);
//     }
//     if(users.length == 0){//if no results are found, say so
//         li = document.createElement("LI");
//         li.appendChild(document.createTextNode("No results."));
//         ul.appendChild(li);
//     }
//     span.appendChild(ul);
// }

// function ajaxRespone() {
//     if (ajaxRequest.readyState != 4) {//check to see if we're done
//         return;
//     }
//     else {
//         if (ajaxRequest.status == 200) {
//             // process server data here => results search
//            displaySearchResults();
//            console.log(ajaxRequest.responseText);
//         }
//         else {
//             alert("Search failed" + ajaxRequest.statusText);
//         }
//     }
// }

// let ajaxRequest;
// function liveSearch() {
//     ajaxRequest = getXMLHttpRequest();
//     if (ajaxRequest) {// if the object was created successfully
//         ajaxRequest.onreadystatechange = ajaxRespone;
//         let name = document.getElementById('input-search').value;
//         ajaxRequest.open("GET", `/search?name=${name}`);
//         ajaxRequest.send(null);
//     }
// }