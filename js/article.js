/* --------------SYSTEM------------------------------------------------------------------------ */
localStorage.page = "article.html";
localStorage.idclick = localStorage.username;
GotoTarget("followed.html",localStorage.idclick,"click_follow");



var IdUser=localStorage.username;
var idbv = localStorage.idbv;
var user = localStorage.iduser;
/* --------------------------------------------------------- DATA ------------------------------------------------------------------------- */
//Đếm số followed
// function count_follow() {
//   var dataString="iduser="+localStorage.iduser+"&demfollow=";
//   $.ajax({
//   type: "POST",
//   url: baseurl+"show_number_followed.php",
//   data: dataString,
//   crossDomain: true,
//   cache: false,
//   success: function(data)
//   {
//       if(data!="")
//       {
//         //$('#show_numberfollow').html(data+' người theo dõi');
//       }
//       else
//       {
//         console.log(data);
//       }
//       //$("#test").html(data);
//   }
//   });
// }
/////LOAD AVATAR + COVER
function load_avatar_cover() {
  var root = baseurl+"";
  var url=root+"show_profile.php?id="+IdUser;
  var urlCover = root+"data/img/cover/";
  var urlAvatar = root+"data/img/avatar/";
  $.getJSON(url,function(result){
    console.log(result);
    $.each(result, function(i, field){
    var id=field.id;
    var username=field.iduser;
    var avatar=field.avatar;
    var cover=field.cover;
    var hoten=field.hoten;
    var Time=field.Time;
    var img = new Image();
    img.src = urlAvatar+avatar;
    localStorage.portrait = "ss";
    img.onload = function() {
      //alert( this.naturalWidth +' '+ this.naturalHeight );
      if( (this.naturalHeight) > (this.naturalWidth) )
      {
        localStorage.portrait = 'portrait';
      }
    }
    $("#profile").html('<form id="uploadimage3" action="" method="post" enctype="multipart/form-data"><div class="cover" style="width:100%;float:left;height:200px"> <div class="thumbnail_cover"><img src="'+urlCover+cover+'" class="portrait" /></div></div><div class="p_avatar" > <div class="thumbnail_avatar"><img src="'+urlAvatar+avatar+'"  /></div></div><div class="p_shopname"><span style="color: #000;font-size: 18px;font-weight: bold;">'+hoten+'</span><br/><span class="glyphicon glyphicon-tag" style="font-size:11px;"></span><span style="color:rgb(184, 184, 184);font-size:11px;">&nbsp; Địa chỉ: 123/456 An Châu - Tp. Long Xuyên - An Giang</span></div></form>');
    $('#show_popup_userinfo').html('<div style="width:15%;float:left"> <img src="'+urlAvatar+avatar+'" class="img-responsive" /> </div> <div style="width:80%;float:left;margin-left:10px">'+hoten+'</div> <div style="clear:both"></div><br/> <p>Tên shop: '+hoten+'</p> <p>Địa chỉ: Địa chỉ chưa cập nhật ...</p> <p>Điện thoại: 01663902688</p> <p>Email: huysoi.lx@gmail.com</p> <p>Thông tin về shop: Shop bán quần ap sỉ lẻ</p>');
    });
  });
}
/////////////////////////////////// LOAD DATA   ///////////////////////////////////////////////////////////////
//CLick follow
function click_follow() {
  $('#follow').click(function(){
    var user_follow = localStorage.iduser;
    var user_followed = localStorage.username;
    var dataString="user_follow="+user_follow+"&user_followed="+user_followed+"&InsertFollow=";
    $.ajax({
    type: "POST",
    url: baseurl+"insert_follow.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    success: function(data)
    {
      console.log(data);
        if(data=="yes")
        {
          CheckFollow();
        }
        else
        {
          alert("Thử lại");
        }
        //$("#test").html(data);
    }
    });
  });
}
function CheckFollow()
{
  var user_follow = localStorage.iduser;
  var user_followed = localStorage.username;
  var dataString="user_follow="+user_follow+"&user_followed="+user_followed+"&CheckFollow=";
  $.ajax({
  type: "POST",
  url: baseurl+"checkfollow.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(data)
  {
      if(data=="yes")
      {
        $("#follow").html('<img src="img/nhammat.png" style="width: 15%;margin-bottom: 5px" />');
      }
      else
      {
        $("#follow").html('<img src="img/momat.png" style="width: 15%;margin-bottom: 5px" />');
      }
      //$("#test").html(data);
  }
  });
}
function load_data() {
  var limitStart = 15;
  $(function() {
     loadResults(0);
      $(window).scroll(function() {
        if($("#loading").css('display') == 'none') {
          if($(this).scrollTop() + $(this).innerHeight() >= $("body")[0].scrollHeight) {
             loadResults(limitStart);
             limitStart+=15;
          }
        }
    });
    function loadResults(limitStart) {
    $("#loading").show();
    var root = baseurl+"";
    var url=root+"showdata_byuser.php";
    var urlIMG = root+"data/img/";
    var urlAvatar = root+"data/img/avatar/";
    console.log(url);
      $.ajax({
          url: url,
          type: "post",
          dataType: "json",
          data: {
              limitStart: limitStart,
              id: IdUser,
              idbv: localStorage.idbv
          },
          success: function(data) {
                  console.log(data);
                 $.each(data, function(index, value) {

                   var user = localStorage.iduser;
                   var id=value.id;
                   var iduser=value.iduser;
                   var img=value.img;
                   var noidung=value.noidung;
                   var hoten=value.hoten;
                   var avatar=value.avatar;
                   var Time=value.Time;
                   var NewImg = img.split('||');
                   var preview=value.preview;
                   if(preview==null) preview="";
                   var num_new_data = NewImg.length-1;
                   var Show_Img = "";
                   var data_img = [];
                   var count = 0;
                   for(var i=0;i<num_new_data;i++)
                   {
                     Show_Img += '<div class="col-xs-4 col-sm-5cols"  id="s_img_click_'+id+i+'"> <div class="thunho"> <img id="img_'+id+i+'"  src="'+urlIMG+NewImg[i]+'" onClick="Test('+id+','+i+');"  /></div></div>';
                     data_img.push(urlIMG+NewImg[i]);
                     count ++;
                   }
                   console.log(count);
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

                   $("#r_timelife").append('<div class="p_timelife"> <div class="p_status_avatar"><div class="thunho" style="border-radius:50%;border:1px solid #b2b2b2"><img src="'+urlAvatar+avatar+'"  /> </div></div> <div class="p_status_post" style="line-height:15px"> <span style="font-family:vietbook_font_bold;font-size:13px">'+hoten+'</span> <span style="font-size:12px">đã '+stt+'</span><br/> <span style="color:rgb(173, 173, 173);font-size:10px">'+CachDay(Time)+'</span> </div>'+option+' <div style="clear:both"> </div><div style="margin:10px"><span style="font-size:13px;">'+noidung+'</span></div> '+preview+' <div id="p_noidung'+id+'" style="margin-top:5px;margin-bottom:10px"><!--here--></div><div style="clear:both"></div><hr style="margin:0px" /> </center> </div><div style="width:7%;float:left;margin:0px 0px 10px 5px"><img src="img/love_nf_green.png" class="img-responsive" id="p_green2'+id+'" /><img src="img/love_nf_yellow.png" class="img-responsive" id="p_yellow2'+id+'" /></div><div style="color:#4a81ba;width:7%;float:left;margin:3px 5px 0px 5px" id="userliked_'+id+'"></div>  <div style="width:7%;float:left;margin:0px 0px 10px 5px"><img src="img/comment_nf.png" class="img-responsive" id="click_comment_'+id+'"/> </div><div style="color:#4a81ba;width:7%;float:left;margin:3px 5px 0px 5px" id="usercomment_'+id+'"></div> <div id="chat_'+id+'" style="color:#4a81ba;width:7%;float:left;margin:3px 5px 0px 5px"><img class="img-responsive" src="img/chat.png"></div><div style="clear:both"></div></div><center><img src="img/loader.gif" id="loader'+id+'" /></center><div class="r_comment" id="r_comment_'+id+'"> <hr style="clear:both;margin:0px" /> <div class="comment_p"> <!-- Area từng comment --> <div id="binhluan'+id+'" style="margin-left:10px;margin-top:-5px"> </div> <!-- End Area từng comment --> <!-- Area Comment --> <table cellpadding="0" cellspacing="0" style="width:100%"> <tr> <td> <div align="left"> <form method="post" name="form" action=""> <table cellpadding="0" cellspacing="0" style="width:100%"> <tr> <td align="left"> </td> </tr> <tr> <td style="padding:4px; padding-left:10px;" class="comment_box"> <input type="hidden" name="idbv" id="idbv'+id+'" value="'+id+'" /> <textarea cols="30" rows="2" placeholder="Nhập bình luận ..." name="content" id="content'+id+'" style="width:90%;float:left;overflow: hidden;outline:none;border: 0 none #FFF;font-size:13px"></textarea> <input type="image" id="v'+id+'" border="0" name="submit" src="img/planeden.png" class="comment_button'+id+'" style="width:8%;float:right;margin-top:15px" /> </td> </tr> </table> </form> </div> <div style="height:7px"> </div> <div id="flash" align="left"> </div> <div id="display" align="left"> </div> </td> </tr> </table> <!-- End Area Comment--> </div></div><div style="background:rgb(219, 219, 219);height:10px"></div>'+popup_option);
                   checklike("p_green2","p_yellow2",user,id);
                   $('#chat_'+id).click(function(){
                      localStorage.username = iduser;
                          window.location.href="chatting.html";
                   });
                   //checklike ("p_green","p_yellow",user,id);
                   //Like va dislike ngoài
                   LikeProcess(id,"p_green2","p_yellow2",user,iduser,"p_green","p_yellow");
                   DisLikeProcess(id,"p_green2","p_yellow2",user,"p_green","p_yellow");
                   //Like và dislike trong popup
                   LikeProcess(id,"p_green","p_yellow",user,iduser,"p_green2","p_yellow2");
                   DisLikeProcess(id,"p_green","p_yellow",user,"p_green2","p_yellow2");
                   //Cắt hình
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
                   $('#loader'+id).hide();
                   $('#r_comment_'+id).hide();
                   var control = "#img_"+id+(count-1);
                   var imgs = $(control).attr('src');
                   //Sửa bài viết
                   $("#edit_"+id).click(function() {
                     localStorage.idbv = id;
                     window.location.href="editbaiviet.html";
                     $('#option_'+id).modal('hide');
                   });
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
                   //Show like
                   var control = "userliked_";
                   showlike(control,id);
                   showcomment("usercomment_",id);
                   //Load comment từng row
                   $("#click_comment_"+id).click(function() {
                     localStorage.idbv = id;
                     window.location.href = "articleonly.html";
                   });
                   //End load comment từng row
                   //Xử lý insert comment
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
               });
               $("#loading").hide();
          },
          error: function(xhr, textStatus, error){
              console.log(error);
          }
      });
    };
  });
}
/////////////////////////////////// CHECK LIKE ////////////////////////////////////////////////////////////////


/* --------------------------------------------------------- OTHER ---------------------------------------------------------------------------- */
$(document).ready(function()
{
  function run()
  {
    ShowMessage();
    setTimeout(function(){ run();  }, 5000);
  }
  run();
  $(".se-pre-con").fadeOut("slow");
  $("#progress-wrp").hide() ;
  $("#danganh").hide() ;

  ChangeIcon("profiles","profiles");
  //Show số lượng thông báo
  var username = localStorage.iduser;
  ShowNote(username,"note","show_note.php");
  GotoPage4("chat.html","badge_message");
  //Hàm update note và chuyển đến trang chi tiết note
  var page="note.html";
  var control="chuong";
  var action="update_note.php";
  //Idea: Kiểm tra theo post localStorage.sonote nếu > 0 mới update
  GotoNote(page,username,"chuong2",action);
  GotoPage2_focus("timkiem.html","txtTim");
});
//////THOÁT
function thoat() {
  $("#logout").click(function() {
    localStorage.clear();
    window.location.href="home.html";
  });
}
//Scroll mất navbar
$(window).scroll(function(){
  if ($(this).scrollTop() > 200) {
    $(".fixed-nav-bar-user").css("background-color","#fff");
    $(".fixed-nav-bar-user").css("box-shadow","0px 1px 1px 0px rgba(31,31,31,1)");
  }
  else if($(this).scrollTop() == 0)
  {
    $(".fixed-nav-bar-user").css("background-color","transparent");
    $(".fixed-nav-bar-user").css("box-shadow","0px 0px 0px 0px #fff");
  }
});
