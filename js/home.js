//Load avatar on top
var data_img = [];
var dimession ="";

function load_avatar_ontop()
{
  var IdUser=localStorage.iduser;
  var root = baseurl+"";
  var url=root+"show_follow.php?id="+IdUser;
  console.log(url)
  var urlCover = root+"data/img/cover/";
  var urlAvatar = root+"data/img/avatar/";
  //$('#home_user').append('<div>');
  var coun = 0;
  $.getJSON(url,function(result){
    $.each(result, function(i, field){
      var id=field.id;
      var username=field.username;
      var avatar=field.avatar;
      var cover=field.cover;
      var hoten=field.hoten;
      var Time=field.Time;
      $('#mouseSwipeScroll').append('<div class="panel"><div class="khungvien" style="width:100%"><img src="'+urlAvatar+avatar+'" class="img-responsive" id="home_child_user_'+id+'" style="border-radius:50%;padding:3px;border: 1px solid #b2b2b2;" /></div></div>');
      //GotoUser("user.html",username,id,"home_child_user_");
      $('#home_child_user_'+id).click(function(){
        localStorage.username = username;
        window.location.href="user.html";
      });
    });
  });
  $('#loadavatar').hide();
}

  //=======================================================
  //Load data normaly
  //Các hàm hổ trợ
  //Load instagram
  function load_instagram(LastImg,id,urlIMG)
  {
    if(LastImg!="")
    {
      img.src = urlIMG+LastImg[0];
      var rong = img.width;
      var cao = img.height;
      var allow = rong - cao;
      if(allow>=100 & allow<=200)
      {
       dimession = 'style="width:135%"';
     }
     else if(allow>=200 & allow<=400)
     {
      dimession = 'style="width:170%"';
    }
    else if(allow>=400 & allow<=600)
    {
      dimession = 'style="width:200%"';
    }
    else if(allow>=600 & allow<=800)
    {
      dimession = 'style="width:230%"';
    }
    else if(allow>=800)
    {
      dimession = 'style="width:260%"';
    }
    $('#sanpham2').append('<div class="col-xs-4 col-sm-5cols" id="sanphamcon_'+id+'"></div>');
    $('#load5s').hide();
    $('#sanphamcon_'+id).html('<div class="thunho">  <div id="flip-this" class="flip-horizontal" ><div class="front" id="front_'+id+'"><img onload="this.style.opacity=\'1\'" src="'+urlIMG+LastImg[0]+'" '+dimession+' alt="" id="main_img'+id+'" ></div> <div> </div></div> ');
  }
}
 //Load facebook
 function load_facebook(img,urlIMG,iduser,urlAvatar,avatar,hoten,Time,id,noidung,preview)
 {
  var data_img = [];
  var NewImg = img.split('||');
  var num_new_data = NewImg.length-1;
  var Show_Img = "";
  var count = 0;
  for(var i=0;i<num_new_data;i++)
  {
    Show_Img += '<div class="col-xs-4 col-sm-5cols"  id="s_img_click_'+id+i+'"> <div class="thunho"> <img id="img_'+id+i+'"  src="'+urlIMG+NewImg[i]+'" onClick="Test('+id+','+i+');"  /></div></div>';
    data_img.push(urlIMG+NewImg[i]);
    count ++;
  }

  var stt="";
  if(count>0) stt="đăng "+count+" ảnh";
  else stt="cập nhật trạng thái";


  var option ="";
  var popup_option = "";
  if(localStorage.iduser.toLowerCase()==iduser.toLowerCase())
  {
    option  = '<div style="width:2%;float:left"><span class="glyphicon glyphicon-chevron-down" data-toggle="modal" data-target="#option_'+id+'" "></span></div>';
    popup_option   = '<div class="modal fade" id="option_'+id+'" role="dialog" style="top:30%"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-body"> <p id="edit_'+id+'"><span class="glyphicon glyphicon-pencil"></span> Chỉnh sửa bài viết.</p> <p id="del_'+id+'"><span class="glyphicon glyphicon-remove"></span> Xóa bài viết.</p> <span data-dismiss="modal" style="float:right">Đóng</span><div style="clear:both"></div> </div> </div> </div></div>';
  }

  //   var link = findUrls(noidung);
  //   if(link!="")
  //   {

  //   	$('#load').show();
		// $.post(baseurl+"fetch.php?url="+link[0], {
		// }, function(response){
		// 	$('#loaders'+id).html($('<a href="'+link[0]+'">'+response+'</a>').fadeIn('slow'));
		// 	$('#load').hide();
		// });
		// preview = '<div id="loaders'+id+'"><div align="center" id="load" style="display:none"><img src="load.gif" /></div></div>';

  //   }
  $("#kieu2").append('<div class="p_timelife" style="margin-bottom:0px"> <div class="p_status_avatar"><div class="thunho" style="border-radius:50%;border:1px solid #b2b2b2"><img src="'+urlAvatar+avatar+'"  /> </div></div> <div class="p_status_post" style="line-height:15px"> <span style="font-family:vietbook_font_bold;font-size:13px" id="hoten_'+id+'">'+hoten+'</span> <span style="font-size:12px">đã '+stt+'</span><br/> <span style="color:rgb(173, 173, 173);font-size:10px">'+CachDay(Time)+'</span> </div>'+option+' <div style="clear:both"> </div><div style="margin:10px"><span style="font-size:13px;">'+noidung+'</span></div> <center><div class="p_noidung'+id+'" id="p_noidung'+id+'"  style="margin-top:5px;margin-bottom:10px"><!--here--></div></center>'+preview+'<div style="clear:both"></div><hr style="margin:0px" /> </center> </div><div style="width:7%;float:left;margin:0px 0px 10px 10px"><img src="img/love_nf_green.png" class="img-responsive" id="p_green2'+id+'" /><img src="img/love_nf_yellow.png" class="img-responsive" id="p_yellow2'+id+'" /></div><div style="color:#4a81ba;width:7%;float:left;margin:3px 5px 0px 5px" id="userliked_'+id+'"></div>  <div style="width:7%;float:left;margin:0px 0px 10px 5px"><img src="img/comment_nf.png" class="img-responsive" id="click_comment_'+id+'"/> </div><div style="color:#4a81ba;width:7%;float:left;margin:3px 5px 0px 5px" id="usercomment_'+id+'"></div> <div style="clear:both"></div></div><center><img src="img/loader.gif" id="loader'+id+'" /></center><div class="r_comment" id="r_comment_'+id+'"> <hr style="clear:both;margin:0px" /> <div class="comment_p"> <!-- Area từng comment --> <div id="binhluan'+id+'" style="margin-left:10px;margin-top:-5px"> </div> <!-- End Area từng comment --> <!-- Area Comment --> <table cellpadding="0" cellspacing="0" style="width:100%"> <tr> <td> <div align="left"> <form method="post" name="form" action=""> <table cellpadding="0" cellspacing="0" style="width:100%"> <tr> <td align="left"> </td> </tr> <tr> <td style="padding:4px; padding-left:10px;" class="comment_box"> <input type="hidden" name="idbv" id="idbv'+id+'" value="'+id+'" /> <textarea cols="30" rows="2" placeholder="Nhập bình luận ..." name="content" id="content'+id+'" style="width:90%;float:left;overflow: hidden;outline:none;border: 0 none #FFF;font-size:13px"></textarea> <input type="image" id="v'+id+'" border="0" name="submit" src="img/planeden.png" class="comment_button'+id+'" style="width:8%;float:right;margin-top:15px" /> </td> </tr> </table> </form> </div> <div style="height:7px"> </div> <div id="flash" align="left"> </div> <div id="display" align="left"> </div> </td> </tr> </table> <!-- End Area Comment--> </div></div><div style="background:rgb(219, 219, 219);height:10px;    margin: 0px -10px;"></div>'+popup_option);

    //Cắt hình
    $(document).ready(function(){
      if(count == 2){
      $('#p_noidung'+id).ready(function(){
        $(this).html(GirdImage2(data_img, 'p_noidung'+id));
      });
    } else if(count == 3){
        var first_img = new Image();
        first_img.src= data_img[0];
        first_img.onload = function(){
          if(first_img.width > first_img.height){
            $('#p_noidung'+id).ready(function(){
              $(this).html(GirdImage3_2(data_img, 'p_noidung'+id));
            });
          } else if(first_img.height > first_img.width) {
            $('#p_noidung'+id).ready(function(){
              $(this).html(GirdImage3(data_img, 'p_noidung'+id));
            });
          }
        };
     } else if(count == 4){
        $('#p_noidung'+id).ready(function(){
          $(this).html(GirdImage4(data_img, 'p_noidung'+id));
        });
     } else if(count == 1){
      $('#p_noidung'+id).ready(function(){
        $(this).html(GirdImage1(data_img, 'p_noidung'+id));
      });
     } else if(count > 4) {
      $('#p_noidung'+id).ready(function(){
        $(this).html(GirdImageMore(data_img, 'p_noidung'+id));
      });
     } 
    });
 $('#loader'+id).hide();
 $('#r_comment_'+id).hide();
 var control = "#img_"+id+(count-1);
 var imgs = $(control).attr('src');

 checklike ("p_green2","p_yellow2",localStorage.iduser,id);
    //checklike ("p_green","p_yellow",user,id);
    //Like va dislike ngoài
    LikeProcess(id,"p_green2","p_yellow2",localStorage.iduser,iduser,"p_green","p_yellow");
    DisLikeProcess(id,"p_green2","p_yellow2",localStorage.iduser,"p_green","p_yellow")
    //Like và dislike trong popup
    // LikeProcess(id,"p_green","p_yellow",localStorage.iduser,iduser,"p_green2","p_yellow2");
    // DisLikeProcess(id,"p_green","p_yellow",localStorage.iduser,"p_green2","p_yellow2");
    $("#hoten_"+id).click(function() {
      localStorage.username = iduser;
      window.location.href="user.html";
    });
    //Sửa bài viết
    $("#edit_"+id).click(function() {
      localStorage.idbv = id;
      window.location.href="editbaiviet.html";
      $('#option_'+id).modal('hide');
    });
    //Click vào hình
    $('#img_'+id+i).click(function(){
    	localStorage.is_click_img = 1;
    })
    //Xóa bài viết
    $("#del_"+id).click(function() {
      var con = confirm("Bạn có chắc muốn xóa bài viết này?");
      if(con)
      {
        var base_url = baseurl+'delete_baiviet.php';
        var dataString="idbaiviet="+id+"&del_bv=";
        $.ajax({
          type: "POST",
          url: base_url,
          data: dataString,
          crossDomain: true,
          cache: false,
          success:function(data)
          {
            if(data=="yes")
            {
              $('#option_'+id).modal('hide');
              window.location.href = "profile.html";
            }
            else
            {
              $('#option_'+id).modal('hide');
              window.location.href = "profile.html";
            }
                //$("#test").html(data);
              }
            });

      }
    });
    var control = "userliked_";
    showlike(control,id);
    $("#click_comment_"+id).click(function() {
      localStorage.idbv = id;
      window.location.href = "articleonly.html";
    });
    showcomment("usercomment_",id);
  }
 //Edit
 function edit_article(id)
 {
  $("#edit_"+id).click(function() {
    localStorage.idbv = id;
    window.location.href="editbaiviet.html";
    $('#option_'+id).modal('hide');
  });
}
 //delete
 function del_article(id)
 {
  $("#del_"+id).click(function() {
    var con = confirm("Bạn có chắc muốn xóa bài viết này?");
    if(con)
    {
      var base_url = baseurl+'delete_baiviet.php';
      var dataString="idbaiviet="+id+"&del_bv=";
      $.ajax({
        type: "POST",
        url: base_url,
        data: dataString,
        crossDomain: true,
        cache: false,
        success:function(data)
        {
          if(data=="yes")
          {
            $('#option_'+id).modal('hide');
            window.location.href = "profile.html";
          }
          else
          {
            $('#option_'+id).modal('hide');
            window.location.href = "profile.html";
          }
                //$("#test").html(data);
              }
            });

    }
  });
}
 //Load comment
 function load_comment()
 {
  $("#click_commentz_"+id).click(function() {
    $('#loader'+id).show();
    $("#binhluan"+id).html("");
    var data_comment = "";
    $('#r_comment_'+id).show();
    var url=root+"show_comment.php?idbv="+id;
    var urlAvatar = urlIMG+"avatar/";
    $.getJSON(url,function(comment){
            //console.log(comment);
            $.each(comment, function(j, row){
              var idcomment=row.id;
              var idbv=row.idbaiviet;
              var username=row.username;
              var hoten=row.hoten;
              var hinhanh=row.avatar;
              var noidung_comment=row.noidung;
              var Time_comment=row.Time;
              $("#binhluan"+id).append('<div class="col-md-12" style="text-align:left;background:#fff;padding: 10px;font-size:13px"> <div style="width:10%;float:left"> <img src="'+urlAvatar+hinhanh+'" class="img-responsive" /> </div> <div style="width:85%;float:left;padding-left:10px"> '+noidung_comment+' <br/> <span style="font-size:11px">Bởi</span> <span style="color:rgb(90, 81, 204);font-size:11px">'+hoten+'</span> <span style="color:rgb(168, 37, 37);font-size:11px">'+CachDay(Time_comment)+'</span> </div> <div style="clear:both"></div></div>');
            });
          });
    $('#loader'+id).hide();
  });
}
 //Insert comment
 function insert_comment()
 {
  $(function() {
    $(".comment_button"+id).click(function() {
      var element = $(this);
      var noidung = $("#content"+id).val();
      var idbv = $("#idbv"+id).val();
      var username = user;
      var dataString = 'content=' + noidung + '&idbv=' + idbv + '&username=' + username + '&postcm=';
      if (noidung == '') {
        alert("Bạn chưa nhập bình luận");
      } else {
        $("#flash"+id).show();
        $("#flash"+id).fadeIn(400).html('<img src="img/loading.gif" align="absmiddle" height="10" width="10" >&nbsp;<span class="loading">Loading Comment...</span>');
        $.ajax({
          type: "POST",
          url: baseurl+"insert_comment.php",
          data: dataString,
          cache: false,
          success: function(html) {
                        //$("#display").append(html);
                        $("#content"+id).val('');
                        $("#flash"+id).hide();
                        $("#binhluan"+id).html(html);
                        //$("#test").html(html);
                      }
                    });
      }
      return false;
    });
  });
}
 //Hàm load chính
 function load_data_normal()
 {
   var root = baseurl;
   var url=root+"showdata2.php?username="+localStorage.iduser;
   var urlIMG = root+"data/img/";
   var urlAvatar = urlIMG+"avatar/";
   $.getJSON(url,function(result){
    $.each(result, function(i, field){
     var user = localStorage.iduser;
     var id=field.id;
     var iduser=field.iduser;
     var img=field.img;
     var noidung=field.noidung;
     var avatar=field.avatar;
     var hoten=field.hoten;
     var Time=field.Time;
     var LoveIcon="";
     var LastImg = img.split('||');
        //Load kiểu 2
        data_img = [];
        load_facebook(img,urlIMG,iduser,urlAvatar,avatar,hoten,Time,id,noidung);
		    //Load kiểu 1


        setTimeout(function(){
          load_instagram(LastImg,id,urlIMG);
          $(".flip-horizontal").flip({
            trigger: 'hover'
          });
          GotoArticle("article.html",id,iduser,"sanphamcon_"+id);
        }, 3000);


        //del_article();
        $('#loader'+id).hide();
        $('#r_comment_'+id).hide();


      });
		//Lật hình

  });
 }
 //=======================================================
//LazyLoad
function LazyLoad(begin,end) {
  var root = baseurl;
  var url=root+"showdata2.php?begin="+begin+"&end="+end;
  var urlIMG = root+"data/img/";
  var urlAvatar = urlIMG+"avatar/";
  $.getJSON(url,function(result){
    $.each(result, function(i, field){
      var user = localStorage.iduser;
      var id=field.id;
      var iduser=field.iduser;
      var img=field.img;
      var noidung=field.noidung;
      var avatar=field.avatar;
      var hoten=field.hoten;
      var Time=field.Time;
      var LoveIcon="";
      var LastImg = img.split('||');
        //Load kiểu 1
        setTimeout(function(){
          load_instagram(LastImg,id,urlIMG);
          $(".flip-horizontal").flip({
            trigger: 'hover'
          });
          GotoArticle("article.html",id,iduser,"sanphamcon_"+id);
        }, 0);
        //Load kiểu 2
        setTimeout(function(){
          data_img = [];
          load_facebook(img,urlIMG,iduser,urlAvatar,avatar,hoten,Time,id,noidung);
        }, 10000);


        // setTimeout(function(){

        // }, 5000);
        //Hiển thị like
        //var control = "userliked_";
        //showlike(control,id);
        //Sửa bài viết
        //edit_article(id);
        //wtf?
        // var control = "userliked_";
        // showlike(control,id);
        //Xóa bài viết
        //del_article();
        $('#loader'+id).hide();
        $('#r_comment_'+id).hide();

        // checklike ("p_green2","p_yellow2",user,id);
        // checklike ("p_green","p_yellow",user,id);
        // //Like va dislike ngoài
        // LikeProcess(id,"p_green2","p_yellow2",user,iduser,"p_green","p_yellow");
        // DisLikeProcess(id,"p_green2","p_yellow2",user,"p_green","p_yellow")
        //Like và dislike trong popup
        // LikeProcess(id,"p_green","p_yellow",user,iduser,"p_green2","p_yellow2");
        // DisLikeProcess(id,"p_green","p_yellow",user,"p_green2","p_yellow2");
        //Load comment từng row
        //load_comment();
        //End load comment từng row
        //Xử lý insert comment
        //insert_comment();
      });
    //Lật hình

  });
}
var limitStart = 15;
var count = 0;
$(function() {
 loadResults(0);
 if(count<=15)
 {
   setTimeout(function(){ loadResults(limitStart);limitStart+=15; }, 1000);
 }
 $(window).scroll(function() {
  if($("#loading").css('display') == 'none') {
    if($(this).scrollTop() + $(this).innerHeight() >= $("#kieu1")[0].scrollHeight) {

     loadResults(limitStart);
     limitStart+=15;
   }
 }
});

 function loadResults(limitStart) {
    //console.log(limitStart);
    $('#load5s').hide();
    $("#loading").show();
    $.ajax({
      url: baseurl + "showdata2.php",
      type: "post",
      dataType: "json",
      data: {
        limitStart: limitStart,
        username: localStorage.iduser
      },
      success: function(data) {
        $.each(data, function(index, value) {

         var UrlImg = baseurl + "data/img/";
         var LastImg = value.img.split('||');
         var Img = value.img;
         var iduser = value.iduser;
         var urlAvatar = UrlImg + "avatar/";
         var avatar = value.avatar;
         var hoten = value.hoten;
         var Time = value.Time;
         var id = value.id;
         var preview = value.preview;
         var preview=value.preview;
         if(preview==null) preview="";
         var noidung = value.noidung;
         if(Img!="")
         {
          var img = new Image;
          count ++;
					 //console.log(UrlImg+LastImg[0]);
                     //img.src = UrlImg+LastImg[0];
           var img = new Image();
           img.src = UrlImg+LastImg[0];
           img.onload = function() {
            var rong = img.width;
            var cao = img.height;
            var allow = rong - cao;
					 //console.log(count + ".rong: "+allow+" /cao: "+cao+" /allow: "+ allow);
					 if(allow<=0)
					 {
            dimession = 'style="width:100%"';
          }
          else if(allow>=100 & allow<=200)
          {
            dimession = 'style="width:100%"';
          }
          else if(allow>=200 & allow<=400)
          {
           dimession = 'style="width:130%"';
         }
         else if(allow>=400 & allow<=600)
         {
           dimession = 'style="width:180%"';
         }
         else if(allow>=600 & allow<=800)
         {
           dimession = 'style="width:200%"';
         }
         else if(allow>=800)
         {
           dimession = 'style="width:250%"';
         }

         $("#sanpham2").append('<div class="col-xs-4 col-sm-5cols" id="sanphamcon_'+value.id+'"></div>');
         $('#sanphamcon_'+value.id).html('<div class="thunho">  <div id="flip-this" class="flip-horizontal" ><div class="front" id="front_'+value.id+'"><img onload="this.style.opacity=\'1\'" src="'+UrlImg+LastImg[0]+'" '+dimession+' alt="" id="main_img'+value.id+'" ></div> <div> </div></div> ');
         $(".flip-horizontal").flip({
           trigger: 'hover'
         });
         GotoArticle("article.html",id,iduser,"sanphamcon_"+id);
       };

     }
     
     load_facebook(Img,UrlImg,iduser,urlAvatar,avatar,hoten,Time,id,noidung,preview);
   });
        $("#loading").hide();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
       console.log(errorThrown);
     }
   });


  };
});
