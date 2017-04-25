/*
Title: Simple J code
Author: Thành Huy
*/

var root = baseurl;
localStorage.numberBadge = 0;

// function GotoTarget(page,control)
// {
//   $('#'+control).click(function(){
//     window.location.href=page;
//   });
// }
//EXTENSION

//MESSEAGE
//Gửi message
document.addEventListener('deviceready', function () {
// Enable to debug issues.
// window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
var notificationOpenedCallback = function(jsonData) {
  setBadge2();
  window.location.href="chat.html";
};
window.plugins.OneSignal
  .startInit("3e65cb5d-e651-4264-b91f-661478b4802d", "797976187418")
  .handleNotificationOpened(notificationOpenedCallback)
  .endInit();
  // Sync hashed email if you have a login system or collect it.
  //   Will be used to reach the user at the most optimal time of day.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
  }, false);
//End gửi message


//END MESSAGE
//Set thông báo ngoài icon
function setBadge(number) {
  document.addEventListener('deviceready', function () {
        cordova.plugins.notification.badge.set(number);
    }, false);
}
function setBadge2() {
  document.addEventListener('deviceready', function () {
      localStorage.numberBadge++;
      cordova.plugins.notification.badge.set(localStorage.numberBadge);
    }, false);
}
function clearBadge() {
  document.addEventListener('deviceready', function () {
        cordova.plugins.notification.badge.clear();
    }, false);
}
function runContinue() {

}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

//Hàm chuyển trang user
function GotoUser(page,user_togo,position,idcontrol)
{
  $('#'+idcontrol+position).click(function(){
    localStorage.username = user_togo;
    window.location.href=page;
  });
}
//Show số lượng thông báo
function ShowNote(username,control,action)
{
  var dataString="username="+username+"&shownote=";
  $.ajax({
  type: "POST",
  url: root+action,
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(data)
  {
      if(data>0)
      {
        $('#note').html('<span style="position:absolute;right:0;bottom:0;font-size:10px;color:#fff;background:red;height:17px;padding:0px 3px 9px 3px;border-radius: 20%;font-weight:bold">'+data+'</span>');
        localStorage.badge = data;
      }
      else {
        localStorage.badge = 0;
      }
  }
  });
}
//Show số lượng tin nhắn
function ShowMessage()
{
  var dataString="username="+localStorage.id+"&showmessage=";
  $.ajax({
  type: "POST",
  url: root+"count_message_all.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(data)
  {
      if(data>0)
      {
        $('#badge_message').html('<span style="position:absolute;right:15px;bottom:15px;font-size:10px;color:#fff;background:red;height:17px;padding:0px 3px 9px 3px;border-radius: 20%;font-weight:bold;vertical-align: text-top;">'+data+'</span>');
      }
      else {
      }
  }
  });
}
function getNumberBadge(username)
{
  var dataString="username="+username+"&shownote=";
  $.ajax({
  type: "POST",
  url: root+"show_note.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(data)
  {
      if(data>0)
      {
        localStorage.badge = data;
      }
      else {
        localStorage.badge = 0;
      }
  }
  });
}
//Hàm update note và chuyển đến trang chi tiết note
function GotoNote(page,username,control,action)
{
  $('#'+control).click(function(){
    window.location.href=page;
  });
}
function update_note(){
  var dataString="username="+localStorage.iduser+"&updatenote=";
  $.ajax({
  type: "POST",
  url: root+"update_note.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(data)
  {
      console.log(data);
  }
  });
}
//Hàm di chuyển đến bài viết note hiển thị
function GotoArticle(page,idbv,username,control)
{
  $('#'+control).click(function(){
    localStorage.idbv = idbv;
    localStorage.username = username;
    window.location.href=page;
  });
}
//Hàm di chuyển đến user
function GotoTarget(page,user_togo,control)
{
  $('#'+control).click(function(){
    localStorage.username = user_togo;
    window.location.href=page;
  });
}
//Hàm di chuyển đến Trang nào đó
function GotoPage2_focus(page,control)
{
  $(document).ready(function(){
    $('#'+control).focus(function(){
        window.location.href=page;
    });
});
}
function GotoPage4(page,control)
{
  $(document).ready(function(){
    $('#'+control).click(function(){
        window.location.href=page;
    });
});
}
//Hàm di chuyển đến Trang nào đó ko contrl
function GotoPage3_focus(page)
{
  $(document).ready(function(){
    window.location.href=page;
  });
}
//Hàm đổi icon
function ChangeIcon(page,control) {
  switch (page) {
    case "home": $('#'+control).html('<img src="img/homefs.png" class="img-responsive"  />');
    break;
    case "cate": $('#'+control).html('<img src="img/catefs.png" class="img-responsive"  />');
    break;
    case "user": $('#'+control).html('<img src="img/icn_btBar_12.png" class="img-responsive"  />');
    break;
    case "chat": $('#'+control).html('<img src="img/chatfs.png" class="img-responsive"  />');
    break;
    case "chuong": $('#'+control).html('<img src="img/chuongfs.png" class="img-responsive"  />');
    break;
    case "profiles": $('#'+control).html('<img src="img/userfs.png" class="img-responsive"  />');
    break;
  }
}
function LikeProcess(id,green,yellow,username,iduser,popupgreen,popupyellow)
{
  $("#"+green+id).click(function() {
    var dataString="username="+username.toLowerCase()+"&idbaiviet="+id+"&user_noted=" + iduser.toLowerCase() + "&savelike=";
    $.ajax({
    type: "POST",
    url: baseurl+"insert_like.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    success: function(data)
    {
        if(data=="yes")
        {
          $("#"+green+id).hide();
          $("#"+yellow+id).show();
          if(popupgreen!="")
          {
            $("#"+popupgreen+id).hide();
            $("#"+popupyellow+id).show();
            //alert("#"+popupyellow+id);
          }
        }
        else
        {
          $("#"+green+id).show();
          $("#"+yellow+id).hide();
        }
        //$("#test").html(data);
    }
    });
  });
}
function DisLikeProcess(id,green,yellow,username,popupgreen,popupyellow)
{
  $("#"+yellow+id).click(function() {
    var dataString="username="+username+"&idbaiviet="+id+"&dislike=";
    $.ajax({
    type: "POST",
    url: baseurl+"delete_like.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    success: function(data)
    {
        if(data=="yes")
        {
          $("#"+green+id).show();
          $("#"+yellow+id).hide();
          if(popupyellow!="")
          {
            $("#"+popupgreen+id).show();
            $("#"+popupyellow+id).hide();
          }
        }
        else
        {
          $("#"+green+id).hide();
          $("#"+yellow+id).show();
        }
        //$("#test").html(data);
    }
    });
  });
}
//Check like chưa
function checklike (green,yellow,user,id)
{
  var dataString="username="+user+"&idbaiviet="+id+"&checklike=";
  $.ajax({
  type: "POST",
  url: baseurl+"checkliked.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(data)
  {
      console.log(data);
      if(data==1)
      {
        $("#"+green+id).show();
        $("#"+yellow+id).hide();
      }
      else
      {
        $("#"+green+id).hide();
        $("#"+yellow+id).show();
      }
      //$("#test").html(data);
  }
  });
}
function showlike(control,id)
{
  var dataString = 'idbaiviet=' + id + '&demlike=';
  $.ajax({
      type: "POST",
      url: baseurl+"show_like.php",
      data: dataString,
      cache: false,
      success: function(html) {
        if(html!="")
        {
          $("#"+control+id).html(html);
        }
      }
  });
}
function showcomment(control,id)
{
  var dataString = 'idbaiviet=' + id + '&demcomment=';
  $.ajax({
      type: "POST",
      url: baseurl+"show_count_comment.php",
      data: dataString,
      cache: false,
      success: function(html) {
        if(html!="")
        {
          $("#"+control+id).html(html);
        }
      }
  });
}
//Hiển thị toast
function toast() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", "");  }, 5000);
}
//Xóa comment
function xoa_comment(id,idcomment,urlIMG) {
  var txt;
  var r = confirm("Bạn có chắc muốn xóa bình luận?");
  if (r == true) {
    var base_url = baseurl+'delete_comment.php';
    var dataString="idcomment="+idcomment+"&delcoment=";
    $.ajax({
      type: "POST",
      url: base_url,
      data: dataString,
      crossDomain: true,
      cache: false,
      success:function(data)
      {
        console.log(data);
            if(data=="yes")
            {
              window.location.href="articleonly.html";
              //console.log(data)
            }
            else
            {
              console.log(data);
            }
            //$("#test").html(data);
      }
    });
  }

}
function xoa_comment_popup(id,idcomment,urlIMG) {
  var txt;
  var res;
  var r = confirm("Bạn có chắc muốn xóa bình luận?");
  if (r == true) {
    var base_url = baseurl+'delete_comment.php';
    var dataString="idcomment="+idcomment+"&delcoment=";
    $.ajax({
      type: "POST",
      url: base_url,
      data: dataString,
      crossDomain: true,
      cache: false,
      success:function(data)
      {
        console.log(data);
            if(data=="yes")
            {
              //$("#display").append(html);
                  $("#content"+id).val('');
                  $('#loader'+id).show();
                  $("#binhluan"+id).html("");
                  var data_comment = "";
                  $('#r_comment_'+id).show();
                  var url=root+"show_comment.php?idbv="+id;
                  var urlAvatar = urlIMG+"avatar/";
                    $.getJSON(url,function(comment){
                      console.log(comment);
                      $.each(comment, function(j, row){
                        var idcomment=row.id;
                        var idbv=row.idbaiviet;
                        var username=row.username;
                        var hoten=row.hoten;
                        var hinhanh=row.avatar;
                        var noidung_comment=row.noidung;
                        var Time_comment=row.Time;
                        //data_comment = '<div class="col-md-12" style="text-align:left;background:#fff;padding: 10px;font-size:12px"> <div style="width:10%;float:left"> <img src="'+urlAvatar+hinhanh+'" class="img-responsive" /> </div> <div style="width:85%;float:left;padding-left:10px"> '+noidung_comment+' <br/> <span style="font-size:11px">Bởi</span> <span style="color:rgb(90, 81, 204);font-size:11px">'+hoten+'</span> <span style="color:rgb(168, 37, 37);font-size:11px">'+CachDay(Time_comment)+'</span> </div> <div style="clear:both"></div></div>';

                        $("#binhluan"+id).append('<div class="col-md-12" style="text-align:left;background:#fff;padding: 10px;font-size:13px"> <div style="width:10%;float:left"> <img src="'+urlAvatar+hinhanh+'" class="img-responsive" /> </div> <div style="width:85%;float:left;padding-left:10px"> '+noidung_comment+' <br/> <span style="font-size:11px">Bởi</span> <span style="color:rgb(90, 81, 204);font-size:11px">'+hoten+'</span> <span style="color:rgb(168, 37, 37);font-size:11px">'+CachDay(Time_comment)+'</span> </div> <div style="clear:both"></div></div>');
                      });
                    });
            }
            else
            {
              console.log(data);
              res = 0;
            }
            //$("#test").html(data);
      }
    });
  }
  return res;
}
//Xóa comment img
function xoa_comment_img(id,urlIMG) {
  var txt;
  var r = confirm("Bạn có chắc muốn xóa bình luận?");
  if (r == true) {
    var base_url = baseurl+'delete_comment_img.php';
    var dataString="id="+id+"&delcoment=";
    $.ajax({
      type: "POST",
      url: base_url,
      data: dataString,
      crossDomain: true,
      cache: false,
      success:function(data)
      {
        console.log(data);
            if(data=="yes")
            {
              //window.location.href="articleonly.html";
              //console.log(data)
              countcomment_img(urlIMG);
              show_popup(urlIMG);
            }
            else
            {
              //console.log(data);
            }
            //$("#test").html(data);
      }
    });
  }

}
function save_note(user_noting,user_noted,openid) {
  var base_url = baseurl+'insert_note.php';
  var dataString="user_noting="+user_noting+"&user_noted="+user_noted+"&openid="+openid+"&savelike=";
  $.ajax({
    type: "POST",
    url: base_url,
    data: dataString,
    crossDomain: true,
    cache: false,
    success:function(data)
    {
      console.log(data);
          if(data==1)
          {
            console.log(data);
          }
          else
          {
            console.log(data);
          }
          //$("#test").html(data);
    }
  });
}
//Sửa comment
function sua_comment(id,idcomment,noidung,urlIMG) {
  var base_url = baseurl+'update_comment.php';
  var dataString="idcomment="+idcomment+"&noidung="+noidung+"&updatecoment=";
  $.ajax({
    type: "POST",
    url: base_url,
    data: dataString,
    crossDomain: true,
    cache: false,
    success:function(data)
    {
      console.log(data);
          if(data==1)
          {
            window.location.href="articleonly.html";
          }
          else
          {
            console.log(data);
          }
          //$("#test").html(data);
    }
  });
}
function sua_comment_popup(id,idcomment,noidung,urlIMG) {
  var base_url = baseurl+'update_comment.php';
  var dataString="idcomment="+idcomment+"&noidung="+noidung+"&updatecoment=";
  $.ajax({
    type: "POST",
    url: base_url,
    data: dataString,
    crossDomain: true,
    cache: false,
    success:function(data)
    {
      console.log(data);
          if(data==1)
          {
            //$("#display").append(html);
                  $("#content"+id).val('');
                  $('#loader'+id).show();
                  $("#binhluan"+id).html("");
                  var data_comment = "";
                  $('#r_comment_'+id).show();
                  var url=root+"show_comment.php?idbv="+id;
                  var urlAvatar = urlIMG+"avatar/";
                    $.getJSON(url,function(comment){
                      console.log(comment);
                      $.each(comment, function(j, row){
                        var idcomment=row.id;
                        var idbv=row.idbaiviet;
                        var username=row.username;
                        var hoten=row.hoten;
                        var hinhanh=row.avatar;
                        var noidung_comment=row.noidung;
                        var Time_comment=row.Time;
                        //data_comment = '<div class="col-md-12" style="text-align:left;background:#fff;padding: 10px;font-size:12px"> <div style="width:10%;float:left"> <img src="'+urlAvatar+hinhanh+'" class="img-responsive" /> </div> <div style="width:85%;float:left;padding-left:10px"> '+noidung_comment+' <br/> <span style="font-size:11px">Bởi</span> <span style="color:rgb(90, 81, 204);font-size:11px">'+hoten+'</span> <span style="color:rgb(168, 37, 37);font-size:11px">'+CachDay(Time_comment)+'</span> </div> <div style="clear:both"></div></div>';

                        $("#binhluan"+id).append('<div class="col-md-12" style="text-align:left;background:#fff;padding: 10px;font-size:13px"> <div style="width:10%;float:left"> <img src="'+urlAvatar+hinhanh+'" class="img-responsive" /> </div> <div style="width:85%;float:left;padding-left:10px"> '+noidung_comment+' <br/> <span style="font-size:11px">Bởi</span> <span style="color:rgb(90, 81, 204);font-size:11px">'+hoten+'</span> <span style="color:rgb(168, 37, 37);font-size:11px">'+CachDay(Time_comment)+'</span> </div> <div style="clear:both"></div></div>');
                      });
                    });
          }
          else
          {
            console.log(data);
          }
          //$("#test").html(data);
    }
  });
}
//Sửa comment
function sua_comment_img(id,noidung,urlIMG) {
  var base_url = baseurl+'update_comment_img.php';
  var dataString="id="+id+"&noidung="+noidung+"&updatecoment=";
  $.ajax({
    type: "POST",
    url: base_url,
    data: dataString,
    crossDomain: true,
    cache: false,
    success:function(data)
    {
      console.log(data);
          if(data==1)
          {
            //window.location.href="articleonly.html";
            show_popup(urlIMG);
          }
          else
          {
            //console.log(data);
          }
          //$("#test").html(data);
    }
  });
}
//Show comment
function hienthi_comment(id,urlIMG)
{
  $("#binhluan"+id).html('');
  var url=root+"show_comment.php?idbv="+id;
  var urlAvatar = urlIMG+"avatar/";
    $.getJSON(url,function(comment){
      console.log(comment);
      $.each(comment, function(j, row){
        var idcomment=row.id;
        var idbv=row.idbaiviet;
        var username=row.username;
        var hoten=row.hoten;
        var hinhanh=row.avatar;
        var noidung_comment=row.noidung;
        var Time_comment=row.Time;
        var can_edit = '';
        if(localStorage.iduser.toLowerCase()==username.toLowerCase())
        {
          can_edit = '<div style="width:10%;float:right;padding-left:10px"><span class="glyphicon glyphicon-pencil" id="edit_comment_'+idcomment+'"></span></div>';
        }
        var modal_popup = '<div id="pop_comment_'+idcomment+'" class="modal fade" role="dialog"> <div class="modal-dialog"> <!-- Modal content--> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Thao tác</h4> </div> <div class="modal-body"> <p id="sua_comment_'+idcomment+'"><span class="glyphicon glyphicon-pencil"></span> Sửa bình luận.</p> <p id="xoa_comment_'+idcomment+'"><span class="glyphicon glyphicon-remove"></span> Xóa bình luận.</p> <p id="input_edit_'+idcomment+'"> <textarea id="txtNoidung_'+idcomment+'" style="width:90%;float:left;border:none" placeholder="Nhập nội dung ..."></textarea> <span id="btnSendEdit_'+idcomment+'" class="glyphicon glyphicon-ok" style="width:10%;float:right;font-size: 20px;text-align:right;padding-top:25px"></span> </p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button> </div> </div> </div></div>';
        $("#binhluan"+id).append('<div class="col-md-12" style="text-align:left;background:#fff;padding: 10px;font-size:13px"> <div style="width:10%;float:left"> <img src="'+urlAvatar+hinhanh+'" class="img-responsive" /> </div> <div style="width:75%;float:left;padding-left:10px"> '+noidung_comment+' <br/> <span style="font-size:11px">Bởi</span> <span style="color:rgb(90, 81, 204);font-size:11px" id="idcomment'+idcomment+'">'+hoten+'</span> <span style="color:rgb(168, 37, 37);font-size:11px">'+CachDay(Time_comment)+'</span> </div>'+can_edit+'<div style="clear:both"></div></div>'+modal_popup);
        $("#edit_comment_"+idcomment).click(function(event) {
          localStorage.idcomment = idcomment;
          localStorage.noidung_comment = noidung_comment;
          $("#sua_comment_"+idcomment).show();
          $("#xoa_comment_"+idcomment).show();
          //$("#txtNoidung").html(localStorage.noidung_comment);

          $("#input_edit_"+idcomment).hide();
          $("#pop_comment_"+idcomment).modal('show');
        });
        $("#sua_comment_"+idcomment).click(function(event) {
          $("#input_edit_"+idcomment).show();
          $("#sua_comment_"+idcomment).hide();
          $("#xoa_comment_"+idcomment).hide();
          $("#txtNoidung_"+idcomment).html(localStorage.noidung_comment);
        });
        $("#xoa_comment_"+idcomment).click(function(event) {
          xoa_comment(id,localStorage.idcomment,urlIMG);
        });
        $("#btnSendEdit_"+idcomment).click(function(event) {
          var noidung = $("#txtNoidung_"+idcomment).val();
          sua_comment(id,localStorage.idcomment,noidung,urlIMG);
        });
        $("#idcomment"+idcomment).click(function() {
          localStorage.username = username;
          window.location.href="user.html";
        });

      });
    });
    $("#pop_comment").modal("hide");
    $(".modal-backdrop").hide();
    $('html,body').animate({ scrollTop: 9999999 }, 'slow');
}
var uploaded = 0;
function uploadFile2(fileURL) {
  document.addEventListener("deviceready", function() {
    var win = function (r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    //alert("Up Success");
    uploaded ++;
    }

    var fail = function (error) {
      alert("Up fail");
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
    }

    var options = new FileUploadOptions();
    options.fileKey = "txtImage";

    options.fileName = localStorage.newname;
    options.mimeType = "image/jpeg";

    var params = {};
    params.value1 = "UploadIMG";
    params.user1 = localStorage.iduser;
    params.user2 = localStorage.username;
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI(baseurl+"upload_img_chat.php"), win, fail, options);
  },false);
}
function uploadFile(fileURL) {
  document.addEventListener("deviceready", function() {
    var win = function (r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    //alert("Up Success");
    uploaded ++;
    }

    var fail = function (error) {
      alert("Up fail");
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
    }

    var options = new FileUploadOptions();
    options.fileKey = "txtImage";

    options.fileName = localStorage.newname;
    options.mimeType = "image/jpeg";

    var params = {};
    params.value1 = "UploadIMG";
    params.user1 = localStorage.iduser;
    params.user2 = localStorage.username;
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI(baseurl+"upload_4.php"), win, fail, options);
  },false);
}
function uploadAvatar(fileURL) {
  document.addEventListener("deviceready", function() {
    var win = function (r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    window.location.href="profile.html";
    }

    var fail = function (error) {
      alert("Up fail");
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
    }

    var options = new FileUploadOptions();
    options.fileKey = "txtImage";

    options.fileName = localStorage.newname;
    options.mimeType = "image/jpeg";

    var params = {};
    params.IdUser = localStorage.iduser;
    params.UpdateAvatar = "UpdateAvatar";
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI(baseurl+"update_avatar.php"), win, fail, options);
  },false);
}
function uploadCover(fileURL) {
  document.addEventListener("deviceready", function() {
    var win = function (r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    window.location.href="profile.html";
    }

    var fail = function (error) {
      alert("Up fail");
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
    }

    var options = new FileUploadOptions();
    options.fileKey = "txtImage";

    options.fileName = localStorage.newname;
    options.mimeType = "image/jpeg";

    var params = {};
    params.IdUser = localStorage.iduser;
    params.UpdateCover = "UpdateCover";
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI(baseurl+"update_cover.php"), win, fail, options);
  },false);
}


//Scale image
var test = 0;

function getphotochat(iduser,username,message,text,UrlAvatar)
{
  var data_hinh = localStorage.Img_Save.split('||');
  var count_data_hinh = data_hinh.length-1;
  var text = document.createElement("p");
  var boxchat = document.getElementById("Box-Chat");
  window.imagePicker.getPictures(
    function(results) {
      for (var i = 0; i < results.length; i++) {
        localStorage.Img_Save += results[i]+"||";
        text.innerHTML += '<li class="self"> <div class="avatar"><img src="'+UrlAvatar+'" /></div> <div class="msg"><img src="'+ results[i] +'" style="width: 200px; height: auto;" /><br/> </div> </li>';
        var newname = md5(new Date() + Math.random()) + "_" + results[i].substr(results[i].lastIndexOf('/') + 1);
        localStorage.newname = newname;
        uploadFile2(results[i]);
      }
    }, function (error) {
      console.log('Error: ' + error);
    }, 
    {
      quality:40,
      maximumImagesCount: 10,
      width:1200,
      height: 1200
    }
    );
  boxchat.appendChild(text);
}

function getphoto()
{
  var data_hinh = localStorage.Img_Save.split('||');
  var count_data_hinh = data_hinh.length-1;

  window.imagePicker.getPictures(
    function(results) {
      for (var i = 0; i < results.length; i++) {
        localStorage.Img_Save += results[i]+"||";
        $('#showimg').append('<div class="col-xs-4 col-sm-5cols"> <div class="thunho"> <img id="img" src="'+results[i]+'"  /> </div> </div>');
      }
      var data_hinh = localStorage.Img_Save.split('||');
      var count_data_hinh = data_hinh.length-1;
      if(count_data_hinh>=10)
      {
        $("#wrap_addimg").hide();
      }
    }, function (error) {
      console.log('Error: ' + error);
    }, {
      quality:40,
      maximumImagesCount: 10-count_data_hinh,
      width:1200,
      height: 1200
    }
    );

}
function getphoto_edit()
{
  var data_hinh_cu = localStorage.old_img.split('||');
  var count_data_hinh_cu = data_hinh_cu.length-1;
  var data_hinh = localStorage.Img_Save.split('||');
  var count_data_hinh = data_hinh.length-1;
  window.imagePicker.getPictures(
    function(results) {
        for (var i = 0; i < results.length; i++) {
            localStorage.Img_Save += results[i]+"||";
            $('#showimg').append('<div class="col-xs-4 col-sm-5cols"> <div class="thunho"> <img id="img" src="'+results[i]+'"  /> </div> </div>');
        }

        var data_hinh_cu = localStorage.old_img.split('||');
        var count_data_hinh_cu = data_hinh_cu.length-1;
        var data_hinh = localStorage.Img_Save.split('||');
        var count_data_hinh = data_hinh.length-1;
        if(count_data_hinh + count_data_hinh_cu >= 10)
        {
          $("#wrap_addimg").hide();
        }
    }, function (error) {
        console.log('Error: ' + error);
    }, {
        quality:40,
        maximumImagesCount: 10 - (count_data_hinh_cu+count_data_hinh),
        width: 1200,
        height: 1200
    }
  );

}
// Move to user with cookie
function GotoUser(page,user_togo,position,idcontrol)
{
  $('#'+idcontrol+position).click(function(){
    localStorage.username = user_togo;
    window.location.href=page;
  });
}
//Tìm link
function findUrls( text )
{
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;

    // Regular expression to find FTP, HTTP(S) and email URLs.
    var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null )
    {
        var token = matchArray[0];
        urlArray.push( token );
    }

    return urlArray;
}
function removeAllByTextContent(tag, search) {
  var anchors  = document.getElementsByTagName(tag);

  for (var i=anchors.length-1; i>=0; i--) {
    var    a = anchors[i],
        text = a.textContent || a.innerText;

    if (text == search) a.parentNode.removeChild(a);
  }
}
function like_img_process(username,img,like,dislike)
{
  var dataString="username="+username.toLowerCase()+"&img="+img+"&savelike=";
  $.ajax({
  type: "POST",
  url: baseurl+"insert_like_img.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(result)
  {
      if(result=="yes")
      {
        $("#like_img").hide();
        $("#dislike_img").show();

        //For new grid image

      }
      else
      {
        console.log("Fail");
      }
      //$("#test").html(data);
  }
  });
}
function dislike_img_process(img, username, like,dislike)
{
  var dataString="img="+img+"&username=" + username + "&dislike=";
  $.ajax({
  type: "POST",
  url: baseurl+"delete_like_img.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(result)
  {
      if(result=="yes")
      {
        $("#like_img").show();
        $("#dislike_img").hide();
      }
      else
      {
        console.log("Fail");
      }
      //$("#test").html(data);
  }
  });
}
//Check like img chưa
function checklike_img (img,like,dislike)
{
  var dataString="img="+img+"&checklike=";
  $.ajax({
  type: "POST",
  url: baseurl+"checkliked_img.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(data)
  {

      if(data==1)
      {
        like.style.display = 'none';
        dislike.style.display = 'inline';
      }
      else
      {
        like.style.display = 'inline';
        dislike.style.display = 'none';
      }
      //console.log(localStorage.like);
      //$("#test").html(data);
      console.log(data);
  }
  });
}
function checklike_img2 (img)
{
  var dataString="img="+img+"&checklike=";
  $.ajax({
  type: "POST",
  url: baseurl+"checkliked_img.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(data)
  {

      if(data==1)
      {
        $("#like_img").hide();
        $("#dislike_img").show();
      }
      else
      {
        $("#like_img").show();
        $("#dislike_img").hide();
      }
  }
  });
}
//Code check like of Trung
function checklike_imgNew(img, username, callback){
  var dataString="img="+img+"&username=" + username + "&checklike=";
  console.log(dataString);
  $.ajax({
    type: "POST",
    url: baseurl+"checkliked_img.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    success: function(data)
    {

        callback(data);
    }
  });
}
function countlike_img (img)
{
  var dataString="img="+img+"&count=";
  $.ajax({
  type: "POST",
  url: baseurl+"show_like_img.php",
  data: dataString,
  success: function(data)
  {
      $("#number_like").html(data);
  }
  });
}
function countcomment_img (img)
{
  var dataString="img="+img+"&count=";
  $.ajax({
  type: "POST",
  url: baseurl+"show_comment2_img.php",
  data: dataString,
  crossDomain: true,
  cache: false,
  success: function(data)
  {

      $("#number_comment").html(data);
  }
  });
}
function show_popup(img)
{
  $('#user_comment').html("");
  var root = baseurl+"";
  var url=root+"show_comment_img.php?img="+img;
  var urlCover = root+"data/img/cover/";
  var urlAvatar = root+"data/img/avatar/";
  console.log(url);
  $.getJSON(url,function(result){
    $.each(result, function(i, field){
    var id=field.id;
    var avatar=field.avatar;
    var noidung=field.noidung;
    var hoten=field.hoten;
    var Time=field.Time;
    var username=field.username;
    var img=field.img;
    var can_edit = '';
    if(localStorage.iduser.toLowerCase()==username.toLowerCase())
    {
      can_edit = '<div style="width:10%;float:right;padding-left:10px"><span class="glyphicon glyphicon-pencil" id="edit_comment_'+id+'"></span></div>';
    }
    var modal_popup = '<div style="z-index:10000" id="pop_comment_'+id+'" class="modal fade" role="dialog"> <div class="modal-dialog"> <!-- Modal content--> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Thao tác</h4> </div> <div class="modal-body"> <p id="sua_comment_'+id+'"><span class="glyphicon glyphicon-pencil"></span> Sửa bình luận.</p> <p id="xoa_comment_'+id+'"><span class="glyphicon glyphicon-remove"></span> Xóa bình luận.</p> <p id="input_edit_'+id+'"> <textarea id="txtNoidung_'+id+'" style="width:90%;float:left;border:none" placeholder="Nhập nội dung ..."></textarea> <span id="btnSendEdit_'+id+'" class="glyphicon glyphicon-ok" style="width:10%;float:right;font-size: 20px;text-align:right;padding-top:25px"></span> </p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button> </div> </div> </div></div>';
    $('#user_comment').append('<div class="col-md-12" style="text-align:left;background:#fff;padding: 10px;font-size:13px"> <div style="width:10%;float:left"> <img src="'+urlAvatar+avatar+'" class="img-responsive"> </div> <div style="width:75%;float:left;padding-left:10px"> '+noidung+' <br> <span style="font-size:11px">Bởi</span> <span style="color:rgb(90, 81, 204);font-size:11px" id="idcomment'+id+'">'+hoten+'</span> <span style="color:rgb(168, 37, 37);font-size:11px">'+CachDay(Time)+'</span> <span style="color:rgb(90, 81, 204);font-size:11px" id="reply_comment_'+id+'">Trả lời</span></div> '+can_edit+'<div style="clear:both"> </div></div>'+modal_popup);
    $("#edit_comment_"+id).click(function(event) {
      localStorage.idcomment = id;
      localStorage.noidung_comment = noidung;
      $("#sua_comment_"+id).show();
      $("#xoa_comment_"+id).show();
      //$("#txtNoidung").html(localStorage.noidung_comment);

      $("#input_edit_"+id).hide();
      $("#pop_comment_"+id).modal('show');
    });
    $('#reply_comment_'+id).click(function(){
      localStorage.idcomment = id;
      window.location.href = "reply_comment_img.html";
    });
    $("#sua_comment_"+id).click(function(event) {
      $("#input_edit_"+id).show();
      $("#sua_comment_"+id).hide();
      $("#xoa_comment_"+id).hide();
      $("#txtNoidung_"+id).focus();
      $("#txtNoidung_"+id).html(localStorage.noidung_comment);
    });
    $("#xoa_comment_"+id).click(function(event) {
      xoa_comment_img(id,img);
    });
    $("#btnSendEdit_"+id).click(function(event) {
      var noidung = $("#txtNoidung_"+id).val();
      sua_comment_img(id,noidung,img);
    });
    $("#idcomment"+id).click(function() {
      localStorage.username = username;
      window.location.href="user.html";
    });

    });
  });
  $('#popupcomment').modal('show');
  $('#user_comment').animate({ scrollTop: 9999999 }, 'slow');

}
function close_popup()
{
  $('#popupcomment').modal('hide');
   $('#popipcomment').on('hidden.bs.modal', function (e) {
    $(this).data('bs.modal', null);
  });
}
function send_comment(img)
{
  var element = $(this);
  var noidung = $("#txtcomment").val();
  var username = localStorage.iduser;
  var dataString = 'content=' + noidung + '&img=' + img + '&username=' + username + '&postcm=';
  console.log("data gui len: " + dataString);
  if (noidung == '') {
      alert("Bạn chưa nhập bình luận");
  } else {
      $("#flash"+id).show();
      $("#flash"+id).fadeIn(400).html('<img src="img/loading.gif" align="absmiddle" height="10" width="10" >&nbsp;<span class="loading">Loading Comment...</span>');
      $.ajax({
          type: "POST",
          url: baseurl+"insert_comment_img.php",
          data: dataString,
          cache: false,
          success: function(html) {
              //$("#display").append(html);
              $("#txtcomment").val('');
              countcomment_img(img);
              show_popup(img);

              // console.log(html);
              //$("#test").html(html);
          }
      });
  }
  return false;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// XỬ lý
var id = 1, dialog;

callback = function () {
    cordova.plugins.notification.local.getIds(function (ids) {
        showToast('IDs: ' + ids.join(' ,'));
    });
};

showToast = function (text) {
    setTimeout(function () {
        if (device.platform != 'windows') {
            window.plugins.toast.showShortBottom(text);
        } else {
            showDialog(text);
        }
    }, 100);
};

showDialog = function (text) {
    if (dialog) {
        dialog.content = text;
        return;
    }

    dialog = new Windows.UI.Popups.MessageDialog(text);

    dialog.showAsync().done(function () {
        dialog = null;
    });
};
hasPermission = function () {
    cordova.plugins.notification.local.hasPermission(function (granted) {
        showToast(granted ? 'Yes' : 'No');
    });
};

registerPermission = function () {
    cordova.plugins.notification.local.registerPermission(function (granted) {
        showToast(granted ? 'Yes' : 'No');
    });
};
schedule = function () {
    cordova.plugins.notification.local.schedule({
        id: 1,
        text: 'Test Message 1',
        icon: 'http://3.bp.blogspot.com/-Qdsy-GpempY/UU_BN9LTqSI/AAAAAAAAAMA/LkwLW2yNBJ4/s1600/supersu.png',
        smallIcon: 'res://cordova',
        sound: null,
                                                badge: 1,
        data: { test: id }
    });
};
scheduleMultiple = function () {
    cordova.plugins.notification.local.schedule([{
        id: 1,
        text: 'Multi Message 1',
        icon: 'res://cordova'
    }, {
        id: 2,
        text: 'Multi Message 2',
        icon: 'res://icon',
        smallIcon: 'ic_media_play'
    }, {
        id: 3,
        text: 'Multi Message 3',
        icon: 'res://icon',
        smallIcon: 'ic_media_pause'
    }]);
};
var c = 0;
function test(){
  c++;
  return "Hello mấy cưng: "+ c;
}
scheduleDelayed = function () {
    var now = new Date().getTime(),
        _5_sec_from_now = new Date(now + 1 * 1000);
    var message = test();
    var sound = device.platform == 'Android' ? 'file://ting.wav' : 'file://beep.caf';

    cordova.plugins.notification.local.schedule({
        id: 1,
        title: 'Thông báo từ Vietbook',
        text: message,
        at: _5_sec_from_now,
        sound: sound,
        badge: 12
    });
};

scheduleMinutely = function () {
    var sound = device.platform == 'Android' ? 'file://ting.wav' : 'file://beep.caf';
    var message = test();
    cordova.plugins.notification.local.schedule({
        id: localStorage.text,
        title: 'Thông báo từ Vietbook',
        text: message,
        every: 'second',
        sound: sound,
        icon: 'res://icon',
        smallIcon: 'res://ic_popup_sync'
    });
};
update = function () {
    cordova.plugins.notification.local.update({
        id: 1,
        text: 'Updated Message 1',
        icon: 'res://icon',
        color: 'FF0000',
        json: { updated: true }
    });
};

updateInterval = function () {
    cordova.plugins.notification.local.update({
        id: 1,
        text: 'Updated Message 1',
        every: 'second'
    });
};
clearSingle = function () {
    cordova.plugins.notification.local.clear(1, callback);
};

clearMultiple = function () {
    cordova.plugins.notification.local.clear([2, 3], callback);
};

clearAll = function () {
    cordova.plugins.notification.local.clearAll(callback);
};
cancel = function () {
    cordova.plugins.notification.local.cancel(1, callback);
};

cancelMultiple = function () {
    cordova.plugins.notification.local.cancel([2, 3], callback);
};

cancelAll = function () {
    cordova.plugins.notification.local.cancelAll(callback);
};
isPresent = function () {
    cordova.plugins.notification.local.isPresent(id, function (present) {
        showToast(present ? 'Yes' : 'No');
    });
};

isScheduled = function () {
    cordova.plugins.notification.local.isScheduled(id, function (scheduled) {
        showToast(scheduled ? 'Yes' : 'No');
    });
};

isTriggered = function () {
    cordova.plugins.notification.local.isTriggered(id, function (triggered) {
        showToast(triggered ? 'Yes' : 'No');
    });
};
var callbackIds = function (ids) {
    console.log(ids);
    showToast(ids.length === 0 ? '- none -' : ids.join(' ,'));
};

getIds = function () {
    cordova.plugins.notification.local.getIds(callbackIds);
};

getScheduledIds = function () {
    cordova.plugins.notification.local.getScheduledIds(callbackIds);
};

getTriggeredIds = function () {
    cordova.plugins.notification.local.getTriggeredIds(callbackIds);
};
var callbackOpts = function (notifications) {
    console.log(notifications);
    showToast(notifications.length === 0 ? '- none -' : notifications.join(' ,'));
};

var callbackSingleOpts = function (notification) {
    console.log(notification);
    showToast(notification ? notification.toString() : '- none -');
};

get = function () {
    cordova.plugins.notification.local.get(1, callbackSingleOpts);
};

getMultiple = function () {
    cordova.plugins.notification.local.get([1, 2], callbackOpts);
};

getAll = function () {
    cordova.plugins.notification.local.getAll(callbackOpts);
};

getScheduled = function () {
    cordova.plugins.notification.local.getScheduled(callbackOpts);
};

getTriggered = function () {
    cordova.plugins.notification.local.getTriggered(callbackOpts);
};
setDefaultTitle = function () {
    cordova.plugins.notification.local.setDefaults({
        title: 'New Default Title'
    });
};
document.addEventListener('deviceready', function () {
    cordova.plugins.notification.local.on('schedule', function (notification) {
      //localStorage.text ++;
      $(document).ready(function()
      {
        var IdUser=localStorage.id;
        var root = baseurl+"";
        var url=root+"select_message.php?id="+IdUser+"&count=";
        $.getJSON(url,function(result){
          $.each(result, function(i, field){
            var id=field.id;
            var noidung=field.value;
            var user_partner=field.hoten;
            var username_partner = field.username;
            if(noidung!="" || noidung !="undefined")
            {
              localStorage.text = user_partner + " vừa nhắn tin cho bạn";
              localStorage.username = username_partner;
              console.log('onschedule', arguments);
            }
            else
            {
              localStorage.text = user_partner + " vừa nhắn tin cho bạn";
              localStorage.username = username_partner;
              console.log('onschedule', arguments);
            }
          });
        });
      });
    });

    cordova.plugins.notification.local.on('update', function (notification) {
        console.log('onupdate', arguments);
        // showToast('updated: ' + notification.id);
    });

    cordova.plugins.notification.local.on('trigger', function (notification) {
        console.log('ontrigger', arguments);
        showToast('triggered: ' + notification.id);
    });

    cordova.plugins.notification.local.on('click', function (notification) {
        console.log('onclick', arguments);
        window.location.href="chatting.html";
    });

    cordova.plugins.notification.local.on('cancel', function (notification) {
        console.log('oncancel', arguments);
        // showToast('canceled: ' + notification.id);
    });

    cordova.plugins.notification.local.on('clear', function (notification) {
        console.log('onclear', arguments);
        showToast('cleared: ' + notification.id);
    });

    cordova.plugins.notification.local.on('cancelall', function () {
        console.log('oncancelall', arguments);
        // showToast('canceled all');
    });

    cordova.plugins.notification.local.on('clearall', function () {
        console.log('onclearall', arguments);
        // showToast('cleared all');
    });
    //scheduleMinutely();
}, false);
