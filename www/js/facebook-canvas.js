// Post a BASE64 Encoded PNG Image to facebook
function PostImageToFacebook(authToken) {
    return {
        postInFB(authToken){
            var canvas = document.getElementById("c");
    var imageData = canvas.toDataURL("image/png");
    try {
        alert('face try');
        blob = dataURItoBlob(imageData);
    } catch (e) {
        console.log(e);
    }
    var fd = new FormData();
    fd.append("access_token", authToken);
    fd.append("source", blob);
    fd.append("message", "Posteado desde CogniFest");
    try {
        alert('try ajax');
        $.ajax({
            url: "https://graph.facebook.com/180129755744867/photos?access_token=" + authToken,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                alert('success try');
                console.log("success " + data);
                $("#poster").html("Posted Canvas Successfully");
            },
            error: function (shr, status, data) {
                alert('error try ' + data + ' ' + shr.status);
                console.log("error " + data + " Status " + shr.status);
            },
            complete: function () {
                alert('complete try');
                console.log("Posted to facebook");
            }
        });

    } catch (e) {
        console.log(e);
        alert('catch' + e);
    }
        }
    }
    
}

// Convert a data URI to blob
function dataURItoBlob(dataURI) {
    alert('data to uri');
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}