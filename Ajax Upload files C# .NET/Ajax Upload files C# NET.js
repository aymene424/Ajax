var formData = new FormData();
for (var i = 0; i < number_images; i++) {
    formData.append('file[' + i + ']', $('#Link_img_albums')[0].files[i]);
    // Insertion de l'image qui sont dans l'input file, dans la variable créer précédement

    if (i == number_images - 1) {

        $.ajax({
            type: 'post',
            url: 'Uploader.ashx', // Le Post doit être vers une page ( Gestionnaire Générique .ashx ) pour les UPLOAD
            data: formData, // Le Type de data à envoyé c'est Data l'image
            success: function (status) {
                if (status != 'error') {

                    var dataJSONReturned = $.parseJSON(status.toString());
                }
            },
            processData: false,
            contentType: false,
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }

        });
    }
}

/* .ashx.cs Uploader C# */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.IO;

namespace Cash_Admin {
    /// <summary>
    /// Description résumée de _Upload_album
    /// </summary>
    public class _Upload_album: IHttpHandler {
        public static string jobVar = "";
        public static string directoryVar = "";


        public void ProcessRequest(HttpContext context) {
            context.Response.ContentType = "text/plain";
            try {
                string dirFullPath = HttpContext.Current.Server.MapPath("~/Folder/"); // Le chemain d'accès Virtuel dans le serveur
                string[] idirectories; // Variable pour stocké les dossiers qui existe dans le virtuel chemain
                int numFiles; // Nombre de fichiers
                idirectories = System.IO.Directory.GetDirectories(dirFullPath); // On stock les dossier qui existent dans le chemain virtuel dans la variables files
                numFiles = idirectories.Length; // On stock le nombre des fichiers dans le chemain virtuel
                numFiles = numFiles + 1; // On incrémente le nombre de fichier +1 pour le prochain fichier qui va être uploadé
                string new_Path_album = "";

                new_Path_album = HttpContext.Current.Server.MapPath("~/Folder/" + "ALBUM_" + numFiles.ToString() + "/"); // New Direcotry Album Folder
                Directory.CreateDirectory(new_Path_album); // Create New Folder in the last directory

                string str_image = "";
                string list_images = ""; // To Export AS JSON
                int i = 0; // Compteur
                string JSON_Manuel = "";

                foreach(string s in context.Request.Files) {
                    HttpPostedFile file = context.Request.Files[s]; // pour chaque fichier uploadé par le client (C:/.../fichier....)
                    string fileName = file.FileName; // On prend le nom de chaque fichier
                    string fileExtension = file.ContentType; // On prend le type du fichier 

                    if (!string.IsNullOrEmpty(fileName)) // Si le fichier existe toujours dans le coté client et il n'a pas était supprimé
                    {
                        fileExtension = Path.GetExtension(fileName); // Get extention du fichier
                        str_image = "PHOTO_ALBUM_" + numFiles.ToString() + i.ToString() + DateTime.Now.ToString("yyyyMMddHHmmss") + fileExtension; // On nome le fichier uploadé
                        string pathToSave_100 = new_Path_album + str_image; // Virtuel Directory Server + name file

                        list_images += str_image + "#"; // To Export AS JSON

                        file.SaveAs(pathToSave_100); // Save AS le fichier dans le server
                        i++;
                        //File.Delete(pathToSave_100);
                    }
                }

                JSON_Manuel = "{\"code_directory\":\"" + "ALBUM_" + numFiles.ToString() + "\", \"list_images\":\"" + list_images + "\"}";

                context.Response.Write(JSON_Manuel);
            } catch (Exception ac) {

            }
        }

        public bool IsReusable {
            get {
                return false;
            }
        }
    }
}
