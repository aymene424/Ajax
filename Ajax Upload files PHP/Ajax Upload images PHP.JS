var formData = new FormData();

for (var i = 0; i < $('#Multiple-photos-input')[0].files.length; i++) {
    formData.append('file[' + i + ']', $('#Multiple-photos-input')[0].files[i]);

    if (i == $('#Multiple-photos-input')[0].files.length - 1) {

        $.ajax({
            url: 'db_upload.php',
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                alert(result);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }
}


/* php code behinde */

if (isset($_FILES['file'])) {
    
    $all_full_url = "";
    for ($i = 0; $i < count($_FILES['file']['tmp_name']); $i++) {
        $time = date('mdYhisa', time());
        $full_url = 'folderUpload/'.$time.$i.'.jpg';

        if (move_uploaded_file($_FILES['file']['tmp_name'][$i], '../../'.$full_url)) {

            if ($i < count($_FILES['file']['name']) - 1) {
                $all_full_url. = $full_url.'#';
            } else {

                $all_full_url. = $full_url;

                if (SQ_UpdateMultiplePhotoProfil($GLOBALS['all_full_url'], db_connect())) {
                    echo "Success UPLOAD";
                } else {
                    echo "FAILED UPLOAD";
                }
            }

        }
    }

}
