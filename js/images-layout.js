/*
Show image với bố cục layout 3 hình.
id: id của div chứa layout
images: một mảng danh sách các url của hình
*/
function ShowImageBy3Frame(id,images)
{
    var cssDiv = "width:50%; height: 450px; float:left; display: inline-block; margin:auto;";
    var cssImg = "width:100%;height:100%; display: inline-block; margin:auto;";

    var divC1 = document.createElement("div");
    divC1.style = cssDiv;
    var divC2 = document.createElement("div");
    divC2.style = cssDiv;
    var divR1 = document.createElement("div");
    var divR2 = document.createElement("div");
    divR1.style = "width:100%; height: 225px; margin:auto; position: relative;"
    divR2.style = "width:100%; height: 225px; margin:auto; position: relative;"
    divR1.style.backgroundColor = "red";
    divR2.style.backgroundColor = "blue";
    divC2.appendChild(divR1);
    divC2.appendChild(divR2);

    divR1.className = "image-wrap";

    var Img1 = new Image();
    var Img2 = new Image();
    var Img3 = new Image();


    Img1.src = images[0];
    Img1.style = "width:400px;height:450px; display: inline-block; margin:auto;";
    Img1.align = "top";
    Img1.width = 400;
    Img1.height = 450;
    Img2.src = images[1];
    Img2.style = cssImg;
    Img3.src = images[2];
    Img3.style = cssImg;

    divC1.appendChild(Img1);
    divR1.appendChild(Img2);
    divR2.appendChild(Img3);

    document.getElementById(id).style = "max-width: 800px;margin:0 auto;font-size: 0;";
    document.getElementById(id).appendChild(divC1);
    document.getElementById(id).appendChild(divC2);
}

function DefineGirdAgain(id,count)
{

    switch(count)
    {
        case 3:
        {
            var div1 = document.getElementById(id).childNodes.item(0);
            var div2 = document.getElementById(id).childNodes.item(1);
            var div3 = document.getElementById(id).childNodes.item(2);
            var divNew = document.createElement("div");
            divNew.id = "Div-New-gird-3";
            divNew.style = "float: left; width: 33.333333333%;";
            divNew.appendChild(div2);
            divNew.appendChild(div3);
            document.getElementById(id).appendChild(divNew);
            div1.style = "width: 66.6666666667%; float:left;";
            div2.style.width = "100%";
            div3.style.width = "100%";

            var img1 = div1.childNodes.item(0).childNodes.item(0);
            var img2 = div2.childNodes.item(0).childNodes.item(0);
            var img3 = div3.childNodes.item(0).childNodes.item(0);
            img1.style.width = "100%";
            img2.style.width = "100%";
            CropImage(img1,203,100);
            CropImage(img2,10,100);
            CropImage(img3,100,100);
        }break;
    }
}
function NewGridFunc(id, count){
    switch(count){
        case 3:
            var div1 = document.getElementById(id).childNodes.item(0);
            var div2 = document.getElementById(id).childNodes.item(1);
            var div3 = document.getElementById(id).childNodes.item(2);

            var img1 = div1.childNodes.item(0).childNodes.item(0);
            var img2 = div2.childNodes.item(0).childNodes.item(0);
            var img3 = div3.childNodes.item(0).childNodes.item(0);
            //console.log("width: " + img1.width + " height: " + img1.height);
            if(img1.width > img1.height){
                div1.style = "clear:both; width: 100%";
                var divNew = document.createElement("div");
                divNew.style="clear: both; width: 100%";
                divNew.appendChild(div2);
                divNew.appendChild(div3);
                document.getElementById(id).appendChild(divNew);
                div2.style.width = "50%";
                div3.style.width = "50%";
                CropImage(img1, 203, 100);
                CropImage(img2, 203, 100);
                CropImage(img3, 203, 100);
            } else {
                 var divNew = document.createElement("div");
                divNew.id = "Div-New-gird-3";
                divNew.style = "float: left; width: 33.333333333%;";
                divNew.appendChild(div2);
                divNew.appendChild(div3);
                document.getElementById(id).appendChild(divNew);
                div1.style = "width: 66.6666666667%; float:left;";
                div2.style.width = "100%";
                div3.style.width = "100%";

                var img1 = div1.childNodes.item(0).childNodes.item(0);
                var img2 = div2.childNodes.item(0).childNodes.item(0);
                var img3 = div3.childNodes.item(0).childNodes.item(0);
                img1.style.width = "100%";
                img2.style.width = "100%";
                CropImage(img1,300,100);
                img2_type = CheckImg(img2);
                img3_type = CheckImg(img3);
                if(img2_type == "p" && img3_type == "p"){
                    img2.style = "height: 150px";
                    img3.style = "height: 150px";
                } else if(img2_type == "l" && img3_type == "p"){
                    img2.style = "height: 100px";
                    img3.style = "height: 200px";
                } else if(img2_type == "p" && img3_type == "l"){
                    img2.style = "height: 200px";
                    img3.style = "height: 100px";
                }
            }
        break;
        case 4:
            var div1 = document.getElementById(id).childNodes.item(0);
            var div2 = document.getElementById(id).childNodes.item(1);
            var div3 = document.getElementById(id).childNodes.item(2);
            var div4 = document.getElementById(id).childNodes.item(3);

            var img1 = div1.childNodes.item(0).childNodes.item(0);
            var img2 = div2.childNodes.item(0).childNodes.item(0);
            var img3 = div3.childNodes.item(0).childNodes.item(0);
            var img4 = div4.childNodes.item(0).childNodes.item(0);
            CropImage(img1, 150,200);
            CropImage(img2,150, 200);
            CropImage(img3,150, 200);
            CropImage(img4,150, 200);
        break;
        
    }
}

function CropImage(image,heights,widths)
{
    var img = new Image();
    //console.log("src: " + image.src);
    var width = image.width;
    var height = image.height;

    //console.log(image.parentElement.nodeName);
    var div = image.parentElement;
    var background = "";
    var size = "";
    if(width/height > 16/9)
    {
        width = (height * 16) / 9;
        var delta = (image.width - width) / 2;
        background = "background: url('" + image.src + "') -" + delta + "px 0px;";
        size = "width : " + widths + "%; height: " + heights + "px;";
        image.style = size + background;
    }
    else
    {
        height = (width/16) * 9;
        var delta = (image.height - height) / 2;
        background = "background: url('" + image.src + "') 0px -"+ "0" + "px;";
        size = "width : " + widths + "%; height: " + heights + "px;";
        image.style = size + background;
    }
    image.style = "opacity: 0;"
    div.style = size +
    background +
    "background-size: cover;";
}

function CheckImg(image){
    if(image.width > image.height){
        return "l";
    } else return "p";
}