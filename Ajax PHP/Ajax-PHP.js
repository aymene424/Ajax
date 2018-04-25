/* ------------------------------ */
/* 
    To use Ajax you should implement JQuery.js
    You can download it form official site of JQuery 
*/
/* ------------------------------ */

$.ajax({
    
    type: "POST", // Type Post
    url: 'yourfilephp.php', // URL Of your file php where you have traitement inside (if he is inside folder : foldername/yourfilephp.php..)
    data: {
        Function_Handle: "1", // Variable to Start the code php in 'yourfilephp.php' you should use if(isset($_POST["Function_Handle"]))
        others_options: value_options // The options sended in JSON format

    },
    success: function (result) {

        var JSON_ARRAY = $.parseJSON(result); // Convert the result returned by your PHP to JSON if you want
    },
    error: function (xhr, status, error) {
        
        var err = eval("(" + xhr.responseText + ")");
        alert(err.Message);
        // if something Wrong at the php will alert it (Copy and past the code in JSFiddle website to see better)
    }
});
