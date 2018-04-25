/* ------------------------------ */
/* 
    To use Ajax you should implement JQuery.js
    You can download it form official site of JQuery 
*/
/* ------------------------------ */

var JSon_Data = '{"nameVariableINCodeBehinde":"' + variable + '"}';

    $.ajax({
        type: "POST", // POST Méthode
        url: 'nameOfpage.aspx/Name_Function_Code_Behinde', // Name of page who have the functionc c# (NOT the .aspx.cs)
        contentType: "application/json; charset=utf-8",
        dataType: "json", // Data Format (Json, XML, ..)
        data: JSon_Data, // Data to Send
        success: function (result) {

            var JSON_Result = $.parseJSON(result.d); // Convert Result returned by C# .NET / SQL SERVER  To JSON
            
            // Do smothing

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });