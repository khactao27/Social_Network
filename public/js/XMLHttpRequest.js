function getXMLHttpRequest(){
    /* This function attempts to get a Ajax request object
     by trying a few different methods for different browsers */
     let request, err;
     try{
         request = new XMLHttpRequest(); //Firefox, Safari, Opera, etc.
     }catch(err){
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