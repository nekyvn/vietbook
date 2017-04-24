//Load avatar on top
var data_img = [];
var dimession ="";
var img = new Image;


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


  var limitStart = 15;
    var count = 0;
  $(function() {
     loadResults(0);
     console.log(count);
     if(count<15)
     {
       loadResults(limitStart);
       limitStart+=15;
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
    console.log(limitStart);
    $('#load5s').hide();
  	$("#loading").show();
      $.ajax({
          url: baseurl + "showdata_byuser2.php",
          type: "post",
          dataType: "json",
          data: {
              limitStart: limitStart,
              username: localStorage.iduser
          },
          success: function(data) {
                  //console.log(data);
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
                   for(var i=0;i<LastImg.length-1;i++)
                    {
                      count ++;
                      var img = new Image;
                      var img = new Image();
                      img.src = UrlImg+LastImg[i];
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
                        $("#sanpham2").append('<div class="col-xs-4 col-sm-5cols" id="sanphamcon_'+value.id+i+'"></div>');
                        $('#sanphamcon_'+value.id+i).html('<div class="thunho">  <div id="flip-this" class="flip-horizontal" ><div class="front" id="front_'+value.id+i+'"><img onload="this.style.opacity=\'1\'" src="'+UrlImg+LastImg[i]+'" '+dimession+' alt="" id="main_img'+value.id+i+'" ></div> <div> </div></div> ');
                        $(".flip-horizontal").flip({
                         trigger: 'hover'
                        });
                        GotoArticle("article.html",id,iduser,"sanphamcon_"+id+i);
                      
                    }


               });
               $("#loading").hide();
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
             console.log(errorThrown);
          }
      });
  };
  });
