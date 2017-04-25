/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var baseurl = "http://13.76.138.152/service/";
 function CachDay(time){

 switch (typeof time) {
     case 'number': break;
     case 'string': time = +new Date(time); break;
     case 'object': if (time.constructor === Date) time = time.getTime(); break;
     default: time = +new Date();
 }
 var time_formats = [
     [60, 'seconds', 1], // 60
     [120, '1 minute ago', '1 minute from now'], // 60*2
     [3600, 'minutes', 60], // 60*60, 60
     [7200, '1 hour ago', '1 hour from now'], // 60*60*2
     [86400, 'hours', 3600], // 60*60*24, 60*60
     [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
     [604800, 'days', 86400], // 60*60*24*7, 60*60*24
     [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
     [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
     [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
     [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
     [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
     [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
     [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
     [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
 ];
 var seconds = (+new Date() - time) / 1000,
     token = 'ago', list_choice = 1;

 if (seconds == 0) {
     return 'Just now'
 }
 if (seconds < 0) {
     seconds = Math.abs(seconds);
     token = 'from now';
     list_choice = 2;
 }
 var i = 0, format;
 while (format = time_formats[i++])
     if (seconds < format[0]) {
         if (typeof format[2] == 'string')
             return format[list_choice];
         else
             return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
     }
 return time;
 }
 // scroll_huy_17_5_2017
function scroll_hide_nav() {
    var iScrollPos = 0;
    $(window).scroll(function () {
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > iScrollPos) {
          $("#menunav").hide();
      } else {
         $("#menunav").show();
     }
     iScrollPos = iCurScrollPos;
    });
}
// end scroll_huy_17_5_2017