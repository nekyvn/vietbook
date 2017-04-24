//Setting Static
//Vinh' code at here
var DirectoryEmoticon = "img/emoticons/";
var Emoticons = [];

// function Emoticon(code, path)
// {
//     this.Code = String(code);
//     this.Path = DirectoryEmoticon + path;

//     this.ToHTML = function(size = 100)
//     {
//         return "<img class= \"Emoticon\" src=\""+this.Path+"\" style=\"width:"+size+"%; \" />";
//     }
// }
// function Emoticon(code, path)
// {
//     this.Code = String(code);
//     this.Path = DirectoryEmoticon + path;
// }

// Emoticon.prototype.ToHTML = function()
// {
//     return "<img class= \"Emoticon\" src=\""+this.Path+"\" />";
// }
function DecodeEmoticon(text)
{
    var Text = text;
    var loop = true;
    var index = -1;
    do{
        loop = false;

        for(var i = 0; i < Emoticons.length; i++)
        {
            index = Text.indexOf(Emoticons[i][0]);
            if(index >= 0)
            {
                if(loop == false) loop = true;
                //cắt nó đi
                var first = Text.slice(0,index);
                var last = Text.slice(index + Emoticons[i][0].length, Text.length);
                Text = first + '<img src="img/emoticons/'+Emoticons[i][1]+'" class="chat_emoticon"/>' + last;
            }
        }
    }while(loop);
    return Text;
}

function ShowEmoticonInMenu(id, IdBoxInput)
{
    var box = document.getElementById(id);
    if(box)
    {
        for(var i = 0; i < Emoticons.length; i++)
        {
            var idemoticon = "emoticon-" + i;
            var click = "InputEmoticon('"+IdBoxInput+"',"+i+")";
            box.innerHTML += "<img id=\"" + idemoticon + "\" width='32' height='32' src=\"" + "img/emoticons/" +
            Emoticons[i][1] + "\" alt=\""+ Emoticons[i].Code +"\" onclick=\""+ click + "\"/>";
            var e = document.getElementById(idemoticon);

        }
    }
}

function InputEmoticon(IdBoxInput, IdEmoticon)
{
    var BoxInput = document.getElementById(IdBoxInput);
    //BoxInput.innerHTML += Emoticons[IdEmoticon][i].ToHTML();
    //alert('<img src="img/emoticons/'+Emoticons[IdEmoticon][1]+'" />');
    BoxInput.innerHTML += '<img src="img/emoticons/'+Emoticons[IdEmoticon][1]+'" class="chat_emoticon" />';
}
Emoticons[0] =  ["[:P]","1.png"];
Emoticons[1] =  ["[:>]","2.png"];
Emoticons[2] =  ["[:)]","3.png"];
Emoticons[3] =  ["[:-)]","4.png"];
Emoticons[4] =  ["[:Z]","5.png"];
Emoticons[5] =  ["[:|]","6.png"];
Emoticons[6] =  ["[:))]","7.png"];
Emoticons[7] =  ["[:-o]","8.png"];
Emoticons[8] =  ["[;-S]","9.png"];
Emoticons[9] =  ["[:~]","10.png"];
Emoticons[10] =  ["[:')']","11.png"];
Emoticons[11] =  ["[:-*]","12.png"];
Emoticons[12] =  ["[*-)]","13.png"];
Emoticons[13] =  ["[:-((]","14.png"];
Emoticons[14] =  ["[:-D]","15.png"];
Emoticons[15] =  ["[:-$]","16.png"];
Emoticons[16] =  ["[8-)]","17.png"];
Emoticons[17] =  ["[>.<]","18.png"];
Emoticons[18] =  ["[:B]","19.png"];
Emoticons[19] =  ["[o.o]","20.png"];
Emoticons[20] =  ["[._.]","21.png"];
Emoticons[21] =  ["[-_-]","22.png"];
Emoticons[22] =  ["[v.v]","23.png"];
Emoticons[23] =  ["[o0o]","24.png"];
Emoticons[24] =  ["[:*]","25.png"];
Emoticons[25] =  ["[._*]","26.png"];
// Emoticons[26] =  ["[*.']","27.png"];
// Emoticons[27] =  ["['_']","28.png"];
// Emoticons[28] =  ["[:B]","29.png"];
// Emoticons[29] =  ["[.@.]","30.png"];
//Emoticons[0] = new Emoticon("[:P]","1.png");
// Emoticons[1] = new Emoticon("[:>]","2.png");
// Emoticons[2] = new Emoticon("[:)]","3.png");
// Emoticons[3] = new Emoticon("[:-)]","4.png");
// Emoticons[4] = new Emoticon("[:Z]","5.png");
// Emoticons[5] = new Emoticon("[:|]","6.png");
// Emoticons[6] = new Emoticon("[:))]","7.png");
// Emoticons[7] = new Emoticon("[:-o]","8.png");
// Emoticons[8] = new Emoticon("[;-S]","9.png");
// Emoticons[9] = new Emoticon("[:~]","10.png");
// Emoticons[10] = new Emoticon("[:')']","11.png");
// Emoticons[11] = new Emoticon("[:-*]","12.png");
// Emoticons[12] = new Emoticon("[*-)]","13.png");
// Emoticons[13] = new Emoticon("[:-((]","14.png");
// Emoticons[14] = new Emoticon("[:-D]","15.png");
// Emoticons[15] = new Emoticon("[:(]","16.png");
// Emoticons[16] = new Emoticon("[8-)]","17.png");
// Emoticons[17] = new Emoticon("[>.<]","18.png");
// Emoticons[18] = new Emoticon("[:((]","19.png");
// Emoticons[19] = new Emoticon("[o.o]","20.png");
// Emoticons[20] = new Emoticon("[._.]","21.png");
// Emoticons[21] = new Emoticon("[-_-]","22.png");
// Emoticons[22] = new Emoticon("[v.v]","23.png");
// Emoticons[23] = new Emoticon("[o0o]","24.png");
// Emoticons[24] = new Emoticon("[:*]","25.png");
// Emoticons[25] = new Emoticon("[._*]","26.png");
// Emoticons[26] = new Emoticon("[*.']","27.png");
// Emoticons[27] = new Emoticon("['_']","28.png");
// Emoticons[28] = new Emoticon("[:B]","29.png");
// Emoticons[29] = new Emoticon("[.@.]","30.png");
