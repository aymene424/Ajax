$(function(){
    

    var image;
    var cropper;
    
    image = document.getElementById('image-id');
    cropper = new Cropper(image, {
            aspectRatio: 16 / 9,
            viewMode: 3,
            crop: function (event) {
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY);
            },
        });


    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //$('.profil-photo').attr('src', e.target.result);
                cropper.replace(e.target.result, false);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
   
    $('#input-file').change(function(){
        
        readURL(this);

    });
    

    
    $(document).on('click', '#btn-send', function(){
       
        cropper.getCroppedCanvas().toBlob(function (blob) {
          var formData = new FormData();

          formData.append('file', blob);

          $.ajax({
            url: 'phpfile.php or ashx .NET',
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
        });
        
    });
    
});