var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var modal = document.getElementById('myModal');

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var spa = document.getElementsByClassName("close")[0];
// spa.onclick = function() {
//   modal.style.display = "none";
// }
AFRAME.registerComponent('markerhandler', {

    init: function() {
        const animatedMarker = document.querySelector("#marker1");
        var modal = document.getElementById('myModal');
        animatedMarker.addEventListener('click', function(ev, target){
            // const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
            // if (aEntity && intersectedElement === aEntity) {
            //     const scale = aEntity.getAttribute('scale');
            //     Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
            //     aEntity.setAttribute('scale', scale);
            // }
            //console.log(ev.detail.intersectedEl.id);
            //alert(ev.detail.intersectedEl.id);
            //modal.style.display = "none";
            console.log("Clicked");
            id = pos[ev.detail.intersectedEl.id.slice(-1)];
            //alert(objects[id][0]);
            //window.location.replace("/"+id);
            window.open('/'+id, '_blank');
        });

    // $('#marker1').on('click touchstart', function(ev) {
    //                 //alert(ev.detail.intersectedEl.id);
    //                 //alert("clicked");
    //         //modal.style.display = "none";
    //         console.log("Clicked");
    //         id = pos[ev.detail.intersectedEl.id.slice(-1)];
    //         //alert(objects[id][0]);
    //         //window.location.replace("/"+id);
    //         window.open('/'+id, '_blank');
    // });

}});



// When the user clicks on the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

function init() {
    var o0_Name = document.getElementById("o0_Name").value;
    var o0_Id = document.getElementById("o0_Id").value;
    var o0_Desc = document.getElementById("o0_Desc").value;
    var o0_image = document.getElementById("o0_img").value;

    var o1_Name = document.getElementById("o1_Name").value;
    var o1_Id = document.getElementById("o1_Id").value;
    var o1_Desc= document.getElementById("o1_Desc").value;
    var o1_image = document.getElementById("o1_img").value;

    var o2_Name = document.getElementById("o2_Name").value;
    var o2_Id = document.getElementById("o2_Id").value;
    var o2_Desc = document.getElementById("o2_Desc").value;
    var o2_image = document.getElementById("o2_img").value;

    var o3_Name = document.getElementById("o3_Name").value;
    var o3_Id = document.getElementById("o3_Id").value;
    var o3_Desc = document.getElementById("o3_Desc").value;
    var o3_image = document.getElementById("o3_img").value;

    objects = {
        [o0_Id] : [o0_Name, o0_Desc, o0_image],
        [o1_Id] : [o1_Name, o1_Desc, o1_image],
        [o2_Id] : [o2_Name, o2_Desc, o2_image],
        [o3_Id] : [o3_Name, o3_Desc, o3_image],
    };

    console.log(objects);

    console.log("Running");
    pos = ['0','0','0','0']
    // var images = document.getElementById("opener3");
    // images.width="0";
    // images.height="0";
    aEntity = document.querySelector("#o3");
    aEntity.setAttribute('width',0.0001);
    aEntity = document.querySelector("#o0");
    aEntity.setAttribute('width',0.0001);
    aEntity = document.querySelector("#o1");
    aEntity.setAttribute('width',0.0001);
    aEntity = document.querySelector("#o2");
    aEntity.setAttribute('width',0.0001);
    reader = ["-1.4 0 -1.4", "1.4 0 -1.4", "-1.4 0 1.4", "1.4 0 1.4"]
    //aEntity.setAttribute('height',0);
    //images.innerHTML = "";
//     for (i = 0; i < images.length; i++) { 
//     images[i].style.visibility = "hidden";
//     console.log(images[i].display);
// }
//     console.log("Running");
     // The function returns the product of p1 and p2
}