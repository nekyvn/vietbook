function CreateImage(src, img, isOne)
        {
            if(isOne === undefined){
                isOne = null;
            }
            img.onclick = function()
            {
                var pannel = document.createElement("div");
                var titleBar = document.createElement('div');
                var dockImage = document.createElement("div");
                var actionBar = document.createElement("div");
                
                document.body.appendChild(pannel);

                pannel.style = "";
                pannel.className = "image-grid-panel";

                pannel.appendChild(titleBar);
                pannel.appendChild(dockImage);
                pannel.appendChild(actionBar);


                titleBar.style = "";
                titleBar.className = "title-bar";

                dockImage.style = "";
                dockImage.className = "dock-image";

                actionBar.style = "";
                actionBar.className = "action-bar";
                var div_back = document.createElement('div');
                div_back.className = 'image-view-back';
                pannel.appendChild(div_back);


                var div_next = document.createElement('div');
                div_next.className = "image-view-next";
                pannel.appendChild(div_next);

                

                var icon_cmt = new Image();
                var icon_like = new Image();
                var icon_unlike = new Image();
                var icon_close = new Image();
                var icon_next = new Image();
                var icon_back = new Image();

                
                icon_cmt.src = "img/icn_feel_1.png";
                icon_cmt.className = "icn_btn";
                icon_like.src = "img/icn_love.png";
                icon_like.className = "icn_btn";
                icon_like.id="dislike_img";

                icon_unlike.src="img/icn_feel_0.png";
                icon_unlike.id="like_img"; 
                icon_unlike.className = "icn_btn";   
                icon_close.src = "img/icon-close.png";

                icon_next.src = "img/icon-next.png";
                icon_back.src = "img/icon-back.png";
                icon_back.className = "view-icon";
                icon_next.className = "view-icon";
                
                icon_close.style.height = "30px";

            
                icon_unlike.style.height = "30px";
                icon_cmt.style.height = "30px";
                icon_like.style.height ="30px";
                icon_close.onclick = function()
                {
                    document.body.removeChild(pannel);
                }

                icon_cmt.onclick = function()
                {
                    show_popup(src);
                }                

                // Check Like 
                if(checklike_imgNew(src, localStorage.iduser, function(result){
                    if(result != 0){ // Đã like
                        icon_like.style.setProperty("display", "block");
                        icon_unlike.style.setProperty("display", "none");
                    } else { // Chưa like
                        icon_like.style.setProperty("display", "none");
                        icon_unlike.style.setProperty("display", "block");
                    }
                }));
                actionBar.appendChild(icon_like);
                actionBar.appendChild(icon_unlike);
                 icon_like.onclick = function() //Unlike
                {
                    $(document).ready(function(){
                        dislike_img_process(src, localStorage.iduser);
                        countlike_img(src);
                        if(checklike_imgNew(src, localStorage.iduser, function(result){
                            if(result > 0){ // Đã like
                                // icon_like.style.setProperty("display", "block");
                                // icon_unlike.style.setProperty("display", "none");
                                $('#dislike_img').hide();
                                $('#like_img').show();
                            } else { // Chưa like
                                // icon_like.style.setProperty("display", "none");
                                // icon_unlike.style.setProperty("display", "block");
                                $('#dislike_img').show();
                                $('#like_img').hide();
                            }
                        }));
                    });
                    
                }

                icon_unlike.onclick = function(){ //Like
                    $(document).ready(function(){
                        like_img_process(localStorage.iduser,src);
                        
                        if(checklike_imgNew(src, localStorage.iduser, function(result){
                            if(result != 0){ // Đã like
                                $('#dislike_img').show();
                                $('#like_img').hide();
                            } else { // Chưa like
                                $('#dislike_img').hide();
                                $('#like_img').show();
                            }
                        }));
                        countlike_img(src);
                    });
                } 

                div_next.onclick = function()
                {
                    if(img.next != undefined)
                    {
                        if(img.next.src != "")
                        {
                            img.next.onclick();
                            icon_close.onclick();
                        }
                        else
                        {
                            CreateImage(img.next.source, img.next);
                        }
                    }
                }

                div_back.onclick = function()
                {
                    if(img.back != undefined)
                    {
                        if(img.next.src != "")
                        {
                            img.next.onclick();
                            icon_close.onclick();
                        }
                        else
                        {
                            CreateImage(img.next.source, img.next);
                        }
                    }
                }

                titleBar.appendChild(icon_close);
                //Add like numbers
                var number_like = document.createElement('div');
                number_like.id = "number_like";
                number_like.className = "number_like";
                actionBar.appendChild(icon_like);
                actionBar.appendChild(icon_unlike);
                actionBar.appendChild(number_like);
                countlike_img(src);

                actionBar.appendChild(icon_cmt);
                //Add comment numbers
                var number_comment = document.createElement('div');
                number_comment.id = "number_comment";
                number_comment.className = "number_comment";
                actionBar.appendChild(number_comment);
                countcomment_img(src);
                var imageDetail = new Image();
                dockImage.appendChild(imageDetail);
                if(isOne == true){
                    $('.image-view-next').hide();
                    $('.image-view-back').hide();
                } 
                imageDetail.onload = function()
                {
                    if(imageDetail.width > imageDetail.height){
                        imageDetail.style.setProperty("width","100%");
                        imageDetail.style.setProperty("position", "absolute");
                        // imageDetail.style.setProperty("top", "25%");
                    }
                    else{
                        // // imageDetail.style.setProperty("height","100%");
                        // imageDetail.style.setProperty("position" , "absolute");
                        // if(imageDetail.height >= 900){
                        //     imageDetail.style.setProperty("width","100%");
                        //     imageDetail.style.setProperty("position" , "");
                        // }
                        console.log(imageDetail.height / imageDetail.width);
                        var tile = imageDetail.height / imageDetail.width;
                        // if(tile == 1.3377926421404682){
                        //     imageDetail.style.setProperty("width","100%");
                        //     imageDetail.style.setProperty("position" , "absolute");   
                        // } else if(tile > 1.3333333333333333){
                        //     imageDetail.style.setProperty("width","100%");
                            
                        // } else if(tile <= 1.3333333333333333){
                        //     imageDetail.style.setProperty("width","100%");
                        //     imageDetail.style.setProperty("position" , "absolute");
                        // }
                        if(tile <= 1.4981273408239701){
                            imageDetail.style.setProperty("width","100%");
                            imageDetail.style.setProperty("position" , "absolute");
                        } else if(tile >= 1.77){
                            imageDetail.style.setProperty("height", "100%");
                            imageDetail.style.setProperty("position" , "absolute");
                        }
                    }

                }
                imageDetail.src = img.src;
                imageDetail.style = "";
                imageDetail.style.setProperty("align","middle");
                $(document).ready(function(){

                        // $('#comment_modal_close').click(function(){
                        //     $('#txtcomment').val("");
                        //     $("#popupcomment").modal('hide');
                        // });
                        //     $('#btnSend').click(function(){

                        //         console.log($('#popupcomment'));
                        //     });
                        function send_cm(){
                            send_comment(imageDetail.src);
                        }
                        $('.image-grid-panel').append($('<div>', {
                    id: "popupcomment",
                    class: "modal fade",
                    role: "dialog"
                }).append(
                    $('<div>', {
                        class: 'modal-content'
                      }).append(
                          $('<div>', {
                              class: 'modal-header',
                              text: "Bình luận"
                              })
                          ).append(
                              $('<div>', {
                                  id: 'user_comment',
                                  class: 'modal-body'
                                  })
                              ).append(
                                  $('<div>', {
                                      class: 'modal-footer'
                                    }).append(
                                        $('<div>', {
                                            id: 'input_comment',
                                            class: 'input_comment'
                                          }).append(
                                              $('<textarea>', {
                                                  id: 'txtcomment',
                                                  class: 'input_comment',
                                                  placeholder: "Nhập bình luận",
                                                  style: "width:90%;float:left;margin-bottom:10px;border: none"
                                                })).append(
                                                    $('<img>', {
                                                        id: 'btnSend',
                                                        src: "img/check.png",
                                                        style: "width:10%;float:left;margin-top:13px",
                                                        on: {
                                                            click: function(event) {
                                                                // send_comment();
                                                                send_cm();
                                                            }.bind(this)
                                                        }
                                                      }))
                                        ).append(
                                        $('<button>', {
                                            class: 'btn btn-default',
                                            text: "Đóng",
                                            on: {
                                                click: function(event) {
                                                    close_popup();
                                                }.bind(this)
                                            }
                                          })
                                  )
                                )));
                                    $('#btnSend').click(function(){
                                        console.log($('#popcomment'));
                                    });
                                });
                
            }

            img.src = src;
        }

        function CreateListImage(list, images, count)
        {
            for(var i = 0; i < count; i++)
            {
                images.push(new Image());
                images[i].source = list[i];
            }

            for(var i = 0; i < images.length; i++)
            {
                images[i].next = images[(i + 1) % images.length];
                if(i > 0)
                    images[i].back = images[i - 1];
                if(i == 0 && images.length > 0)
                    images[0].back = images[images.length - 1];
            }
        }

        function ContentImageInGirdCell(img, list, index, cell)
        {
            img.className = "ImageInCell";
            img.style = "";
            img.style.setProperty("position","relative");
            img.onload = function()
            {
                var w = img.width;
                var h = img.height;
                var tile = cell.clientWidth / cell.clientHeight;
                if(w/h > tile)
                {
                    img.style.setProperty("height","100%");
                    var move = (img.clientWidth - cell.clientWidth) / 2;
                    img.style.setProperty("left","-" + move + "px");
                }
                else if(w/h < tile)
                {
                    img.style.setProperty("width","100%");
                    var move = (img.clientHeight - cell.clientHeight) / 2;
                    img.style.setProperty("top","-" + move + "px");
                }
                else
                {
                    img.style.setProperty("width","100%");
                    img.style.setProperty("height","100%");
                }
            }

            CreateImage(list[index], img);
            
            cell.appendChild(img);
        }
        function ContentImageInGirdCell2(img, list, index, cell)
        {
            img.className = "ImageInCell";
            img.style = "";
            img.style.setProperty("position","relative");
            img.onload = function()
            {
               
                    img.style.setProperty("width","100%");
                    img.style.setProperty("height","100%");
                
            }

            CreateImage(list[index], img, true);
            
            cell.appendChild(img);

        }
        function GirdImage1(list, divParent)
        {
            var DivGird = document.createElement("div");
            DivGird.className = "GirdImage";
            document.getElementById(divParent).appendChild(DivGird);
            DivGird.style = "";
            DivGird.style.setProperty("width","100%");
            DivGird.style.setProperty("height","100%");


            var GirdLayout1 = document.createElement("div");
            GirdLayout1.className = "GirdLayout";
            DivGird.appendChild(GirdLayout1);
            GirdLayout1.style = "";
            GirdLayout1.style.setProperty("float","left");
            GirdLayout1.style.setProperty("width","100%");
            GirdLayout1.style.setProperty("height","100%");


            var GirdCell1 = document.createElement("div");

            GirdCell1.style = "";

            GirdCell1.style.setProperty("width", "100%");

            // GirdCell1.style.setProperty("height", "100%");
            GirdCell1.style.setProperty("overflow","hidden");

            GirdLayout1.appendChild(GirdCell1);

            var images = new Array();
            
            CreateListImage(list, images, 1);

            ContentImageInGirdCell2(images[0], list, 0, GirdCell1);

        }

        function GirdImage2(list, divParent)
        {
            var DivGird = document.createElement("div");
            DivGird.className = "GirdImage";
            document.getElementById(divParent).appendChild(DivGird);
            DivGird.style = "";
            
            DivGird.style.setProperty("width","100%");
            DivGird.style.setProperty("height",DivGird.clientWidth * (2/3) + "px");
            
            var GirdLayout1 = document.createElement("div");
            GirdLayout1.className = "GirdLayout";
            DivGird.appendChild(GirdLayout1);
            GirdLayout1.style = "";
            GirdLayout1.style.setProperty("float","left");
            GirdLayout1.style.setProperty("width","50%");
            GirdLayout1.style.setProperty("height","100%");
            

            var GirdLayout2 = document.createElement("div");
            GirdLayout2.className = "GirdLayout";
            DivGird.appendChild(GirdLayout2);
            GirdLayout2.style = "";
            GirdLayout2.style.setProperty("float","left");
            GirdLayout2.style.setProperty("width","50%");
            GirdLayout2.style.setProperty("height","100%");
            

            var GirdCell1 = document.createElement("div");
            var GirdCell2 = document.createElement("div");

            GirdCell1.style = "";
            GirdCell2.style = "";

            GirdCell1.style.setProperty("width", "100%");
            GirdCell2.style.setProperty("width", "100%");

            GirdCell1.style.setProperty("height", "100%");
            GirdCell2.style.setProperty("height", "100%");
            GirdCell1.style.setProperty("overflow","hidden");
            GirdCell2.style.setProperty("overflow","hidden");

            GirdLayout1.appendChild(GirdCell1);
            GirdLayout2.appendChild(GirdCell2);

            var images = new Array();
            
            CreateListImage(list,images,2);

            ContentImageInGirdCell(images[0], list, 0, GirdCell1);
            ContentImageInGirdCell(images[1], list, 1, GirdCell2);
        }

        function GirdImage3(list, divParent)
        {
            var DivGird = document.createElement("div");
            DivGird.className = "GirdImage";
            document.getElementById(divParent).appendChild(DivGird);
            DivGird.style = "";
            DivGird.style.setProperty("width","100%");
            DivGird.style.setProperty("height",DivGird.clientWidth * (2/3) + "px");
            

            var GirdLayout1 = document.createElement("div");
            GirdLayout1.className = "GirdLayout";
            DivGird.appendChild(GirdLayout1);
            GirdLayout1.style = "";
            GirdLayout1.style.setProperty("float","left");
            GirdLayout1.style.setProperty("width","66.6666%");
            GirdLayout1.style.setProperty("height","100%");
            

            var GirdLayout2 = document.createElement("div");
            GirdLayout2.className = "GirdLayout";
            DivGird.appendChild(GirdLayout2);
            GirdLayout2.style = "";
            GirdLayout2.style.setProperty("float","left");
            GirdLayout2.style.setProperty("width","33.33333%");
            GirdLayout2.style.setProperty("height","100%");
            

            var GirdCell1 = document.createElement("div");
            var GirdCell2 = document.createElement("div");
            var GirdCell3 = document.createElement("div");

            GirdCell1.style = "";
            GirdCell2.style = "";
            GirdCell3.style = "";

            GirdCell1.style.setProperty("width", "100%");
            GirdCell2.style.setProperty("width", "100%");
            GirdCell3.style.setProperty("width", "100%");

            GirdCell1.style.setProperty("height", "100%");
            GirdCell2.style.setProperty("height", "50%");
            GirdCell3.style.setProperty("height", "50%");
            GirdCell1.style.setProperty("overflow","hidden");
            GirdCell2.style.setProperty("overflow","hidden");
            GirdCell3.style.setProperty("overflow","hidden");

            GirdLayout1.appendChild(GirdCell1);
            GirdLayout2.appendChild(GirdCell2);
            GirdLayout2.appendChild(GirdCell3);

            var images = new Array();
            
            CreateListImage(list,images,3);
            
            ContentImageInGirdCell(images[0], list, 0, GirdCell1);
            ContentImageInGirdCell(images[1], list, 1, GirdCell2);
            ContentImageInGirdCell(images[2], list, 2, GirdCell3);
        }

        function GirdImage3_2(list, divParent)
        {
            var DivGird = document.createElement("div");
            DivGird.className = "GirdImage";
            document.getElementById(divParent).appendChild(DivGird);
            DivGird.style = "";
            DivGird.style.setProperty("width","100%");
            DivGird.style.setProperty("height",DivGird.clientWidth * (2/3) + "px");
            

            var GirdLayout1 = document.createElement("div");
            GirdLayout1.className = "GirdLayout";
            DivGird.appendChild(GirdLayout1);
            GirdLayout1.style = "";
            GirdLayout1.style.setProperty("float","left");
            GirdLayout1.style.setProperty("width","100%");
            GirdLayout1.style.setProperty("height","100%");
            

            var GirdLayout2 = document.createElement("div");
            GirdLayout2.className = "GirdLayout";
            DivGird.appendChild(GirdLayout2);
            GirdLayout2.style = "";
            GirdLayout2.style.setProperty("float","left");
            GirdLayout2.style.setProperty("width","100%");
            GirdLayout2.style.setProperty("height","100%");
            

            var GirdCell1 = document.createElement("div");
            var GirdCell2 = document.createElement("div");
            var GirdCell3 = document.createElement("div");

            GirdCell1.style = "";
            GirdCell2.style = "";
            GirdCell3.style = "";

            GirdCell1.style.setProperty("width", "100%");
            GirdCell2.style.setProperty("width", "50%");
            GirdCell3.style.setProperty("width", "50%");
            GirdCell2.style.setProperty("float", "left");
            GirdCell3.style.setProperty("float", "left");
            GirdCell1.style.setProperty("height", "100%");
            GirdCell2.style.setProperty("height", "100%");
            GirdCell3.style.setProperty("height", "100%");
            GirdCell1.style.setProperty("overflow","hidden");
            GirdCell2.style.setProperty("overflow","hidden");
            GirdCell3.style.setProperty("overflow","hidden");

            GirdLayout1.appendChild(GirdCell1);
            GirdLayout2.appendChild(GirdCell2);
            GirdLayout2.appendChild(GirdCell3);

            var images = new Array();
            
            CreateListImage(list,images,3);
            
            ContentImageInGirdCell(images[0], list, 0, GirdCell1);
            ContentImageInGirdCell(images[1], list, 1, GirdCell2);
            ContentImageInGirdCell(images[2], list, 2, GirdCell3);
        }
        function GirdImage4(list, divParent)
        {
            var DivGird = document.createElement("div");
            DivGird.className = "GirdImage";
            document.getElementById(divParent).appendChild(DivGird);
            DivGird.style = "";
            DivGird.style.setProperty("width","100%");
            DivGird.style.setProperty("height","400px");
            

            var GirdLayout1 = document.createElement("div");
            GirdLayout1.className = "GirdLayout";
            DivGird.appendChild(GirdLayout1);
            GirdLayout1.style = "";
            GirdLayout1.style.setProperty("float","left");
            GirdLayout1.style.setProperty("width","50%");
            GirdLayout1.style.setProperty("height","100%");
            

            var GirdLayout2 = document.createElement("div");
            GirdLayout2.className = "GirdLayout";
            DivGird.appendChild(GirdLayout2);
            GirdLayout2.style = "";
            GirdLayout2.style.setProperty("float","left");
            GirdLayout2.style.setProperty("width","50%");
            GirdLayout2.style.setProperty("height","100%");
            

            var GirdCell1 = document.createElement("div");
            var GirdCell2 = document.createElement("div");
            var GirdCell3 = document.createElement("div");
            var GirdCell4 = document.createElement("div");

            GirdCell1.style = "";
            GirdCell2.style = "";
            GirdCell3.style = "";
            GirdCell4.style = "";

            GirdCell1.style.setProperty("width", "100%");
            GirdCell2.style.setProperty("width", "100%");
            GirdCell3.style.setProperty("width", "100%");
            GirdCell4.style.setProperty("width", "100%");

            GirdCell1.style.setProperty("height", "50%");
            GirdCell2.style.setProperty("height", "50%");
            GirdCell3.style.setProperty("height", "50%");
            GirdCell4.style.setProperty("height", "50%");

            GirdCell1.style.setProperty("overflow","hidden");
            GirdCell2.style.setProperty("overflow","hidden");
            GirdCell3.style.setProperty("overflow","hidden");
            GirdCell4.style.setProperty("overflow","hidden");

            GirdLayout1.appendChild(GirdCell1);
            GirdLayout1.appendChild(GirdCell2);
            GirdLayout2.appendChild(GirdCell3);
            GirdLayout2.appendChild(GirdCell4);

            var images = new Array();
            
            CreateListImage(list,images,4);

            ContentImageInGirdCell(images[0], list, 0, GirdCell1);
            ContentImageInGirdCell(images[1], list, 1, GirdCell2);
            ContentImageInGirdCell(images[2], list, 2, GirdCell3);
            ContentImageInGirdCell(images[3], list, 3, GirdCell4);
        }

        function GirdImageMore(list, divParent)
        {
            var DivGird = document.createElement("div");
            DivGird.className = "GirdImage";
            document.getElementById(divParent).appendChild(DivGird);
            DivGird.style = "";
            DivGird.style.setProperty("width","100%");
            DivGird.style.setProperty("height","400px");
            

            var GirdLayout1 = document.createElement("div");
            GirdLayout1.className = "GirdLayout";
            DivGird.appendChild(GirdLayout1);
            GirdLayout1.style = "";
            GirdLayout1.style.setProperty("float","left");
            GirdLayout1.style.setProperty("width","50%");
            GirdLayout1.style.setProperty("height","100%");
            

            var GirdLayout2 = document.createElement("div");
            GirdLayout2.className = "GirdLayout";
            DivGird.appendChild(GirdLayout2);
            GirdLayout2.style = "";
            GirdLayout2.style.setProperty("float","left");
            GirdLayout2.style.setProperty("width","50%");
            GirdLayout2.style.setProperty("height","100%");
            

            var GirdCell1 = document.createElement("div");
            var GirdCell2 = document.createElement("div");
            var GirdCell3 = document.createElement("div");
            var GirdCell4 = document.createElement("div");

            GirdCell1.style = "";
            GirdCell2.style = "";
            GirdCell3.style = "";
            GirdCell4.style = "";

            GirdCell1.style.setProperty("width", "100%");
            GirdCell2.style.setProperty("width", "100%");
            GirdCell3.style.setProperty("width", "100%");
            GirdCell4.style.setProperty("width", "100%");

            GirdCell1.style.setProperty("height", "50%");
            GirdCell2.style.setProperty("height", "50%");
            GirdCell3.style.setProperty("height", "50%");
            GirdCell4.style.setProperty("height", "50%");

            GirdCell1.style.setProperty("overflow","hidden");
            GirdCell2.style.setProperty("overflow","hidden");
            GirdCell3.style.setProperty("overflow","hidden");
            GirdCell4.style.setProperty("overflow","hidden");
            GirdCell4.style.setProperty("position", "relative");

            GirdLayout1.appendChild(GirdCell1);
            GirdLayout1.appendChild(GirdCell2);
            GirdLayout2.appendChild(GirdCell3);
            GirdLayout2.appendChild(GirdCell4);

            var images = new Array();
            
            CreateListImage(list,images,list.length);
            var text = document.createElement("div");
            GirdCell4.appendChild(text);
            ContentImageInGirdCell(images[0], list, 0, GirdCell1);
            ContentImageInGirdCell(images[1], list, 1, GirdCell2);
            ContentImageInGirdCell(images[2], list, 2, GirdCell3);
            ContentImageInGirdCell(images[3], list, 3, GirdCell4);

            images[3].style.setProperty("opacity","0.5");
            
            text.innerText = "+" + (list.length - 4);
            text.style = "";
            text.style.setProperty("width","50%");
            text.style.setProperty("text-align","center");
            text.style.setProperty("position","absolute");
            text.style.setProperty("font-size","300%");
            text.style.setProperty("transform","translate(0%,20%)");
            text.style.setProperty("left", "25%");
            text.style.setProperty("bottom", "40%");
        }