nf.Client={};
nf.Client.version=-1;
nf.Client.clientId=null;
nf.Client.getRevision=function(){return{version:nf.Client.version,clientId:nf.Client.clientId}
};
nf.Client.setRevision=function(a){if(nf.Common.isDefinedAndNotNull(a.version)){if(nf.Common.isDefinedAndNotNull(nf.Client.version)){if(a.version>nf.Client.version){nf.Client.version=a.version
}}else{nf.Client.version=a.version
}}if(nf.Common.isDefinedAndNotNull(a.clientId)){nf.Client.clientId=a.clientId
}};
$(document).ready(function(){var a="images/bg-error.png";
$("<img/>").attr("src",a).on("load",function(){$("div.message-pane").css("background-image",a)
});
$(document).on("mouseenter","span.link",function(){$(this).addClass("link-over")
}).on("mouseleave","span.link",function(){$(this).removeClass("link-over")
});
$(document).on("click","div.nf-checkbox",function(){var b=$(this);
if(b.hasClass("checkbox-unchecked")){b.removeClass("checkbox-unchecked").addClass("checkbox-checked")
}else{b.removeClass("checkbox-checked").addClass("checkbox-unchecked")
}});
$(document).ajaxStart(function(){$("div.loading-container").addClass("ajax-loading")
}).ajaxStop(function(){$("div.loading-container").removeClass("ajax-loading")
});
$("img.setting-icon").qtip(nf.Common.config.tooltipConfig)
});
nf.Common={config:{tooltipConfig:{style:{classes:"nifi-tooltip"},show:{solo:true,effect:false},hide:{effect:false},position:{at:"top right",my:"bottom left"}}},SUPPORTS_SVG:!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,authorities:undefined,setAuthorities:function(a){nf.Common.authorities=a
},cachedScript:function(a){return $.ajax({dataType:"script",cache:true,url:a})
},canAccessProvenance:function(){var a=false;
if(nf.Common.isDefinedAndNotNull(nf.Common.authorities)){$.each(nf.Common.authorities,function(b,c){if(c==="ROLE_PROVENANCE"){a=true;
return false
}})
}return a
},isDFM:function(){var a=false;
if(nf.Common.isDefinedAndNotNull(nf.Common.authorities)){$.each(nf.Common.authorities,function(b,c){if(c==="ROLE_DFM"){a=true;
return false
}})
}return a
},isAdmin:function(){var a=false;
if(nf.Common.isDefinedAndNotNull(nf.Common.authorities)){$.each(nf.Common.authorities,function(b,c){if(c==="ROLE_ADMIN"){a=true;
return false
}})
}return a
},addHoverEffect:function(a,c,b){$(document).on("mouseenter",a,function(){$(this).removeClass(c).addClass(b)
}).on("mouseleave",a,function(){$(this).removeClass(b).addClass(c)
});
return $(a).addClass(c)
},handleAjaxError:function(d,a,b){if(d.status===400||d.status===404||d.status===409){nf.Dialog.showOkDialog({dialogContent:nf.Common.escapeHtml(d.responseText),overlayBackground:false})
}else{if(d.status===401&&$("#registration-pane").length){$("#registration-pane").show();
nf.Common.closeCanvas()
}else{if(d.status<99||d.status===12007||d.status===12029){var c="Please ensure the application is running and check the logs for any errors.";
if(nf.Common.isDefinedAndNotNull(a)){if(a==="timeout"){c="Request has timed out. Please ensure the application is running and check the logs for any errors."
}else{if(a==="abort"){c="Request has been aborted."
}else{if(a==="No Transport"){c="Request transport mechanism failed. Please ensure the host where the application is running is accessible."
}}}}$("#message-title").text("Unable to communicate with NiFi");
$("#message-content").text(c)
}else{if(d.status===401){$("#message-title").text("Unauthorized");
if($.trim(d.responseText)===""){$("#message-content").text("Authorization is required to use this NiFi.")
}else{$("#message-content").text(d.responseText)
}}else{if(d.status===403){$("#message-title").text("Forbidden");
if($.trim(d.responseText)===""){$("#message-content").text("Unable to authorize you to use this NiFi.")
}else{$("#message-content").text(d.responseText)
}}else{if(d.status===500){$("#message-title").text("An unexpected error has occurred");
if($.trim(d.responseText)===""){$("#message-content").text("An error occurred communicating with the application core. Please check the logs and fix any configuration issues before restarting.")
}else{$("#message-content").text(d.responseText)
}}else{if(d.status===200){$("#message-title").text("Parse Error");
if($.trim(d.responseText)===""){$("#message-content").text("Unable to interpret response from NiFi.")
}else{$("#message-content").text(d.responseText)
}}else{$("#message-title").text(d.status+": Unexpected Response");
$("#message-content").text("An unexpected error has occurred. Please check the logs.")
}}}}}$("#message-pane").show();
nf.Common.closeCanvas()
}}},closeCanvas:function(){if(nf.Common.isDefinedAndNotNull(nf.Canvas)){if($("#splash").is(":visible")){nf.Canvas.hideSplash()
}nf.ContextMenu.hide();
nf.Canvas.stopRevisionPolling();
nf.Canvas.stopStatusPolling()
}},populateField:function(b,a){if(nf.Common.isUndefined(a)||nf.Common.isNull(a)){return $("#"+b).addClass("unset").text("No value set")
}else{if(a===""){return $("#"+b).addClass("blank").text("Empty string set")
}else{return $("#"+b).text(a)
}}},clearField:function(a){return $("#"+a).removeClass("unset blank").text("")
},cleanUpTooltips:function(a,b){a.find(b).each(function(){var d=$(this);
if(d.data("qtip")){var c=d.qtip("api");
c.destroy(true)
}})
},formatPropertyTooltip:function(a,b){var c=[];
if(nf.Common.isDefinedAndNotNull(a)){if(!nf.Common.isBlank(a.description)){c.push(nf.Common.escapeHtml(a.description))
}if(!nf.Common.isBlank(a.defaultValue)){c.push("<b>Default value:</b> "+nf.Common.escapeHtml(a.defaultValue))
}if(!nf.Common.isBlank(a.supportsEl)){c.push("<b>Supports expression language:</b> "+nf.Common.escapeHtml(a.supportsEl))
}}if(nf.Common.isDefinedAndNotNull(b)){if(!nf.Common.isEmpty(b.previousValues)){var d=[];
$.each(b.previousValues,function(f,e){d.push("<li>"+nf.Common.escapeHtml(e.previousValue)+" - "+nf.Common.escapeHtml(e.timestamp)+" ("+nf.Common.escapeHtml(e.userName)+")</li>")
});
c.push('<b>History:</b><ul class="property-info">'+d.join("")+"</ul>")
}}if(c.length>0){return c.join("<br/><br/>")
}else{return null
}},formatProperty:function(a,b){return'<div><span class="label">'+nf.Common.formatValue(a)+": </span>"+nf.Common.formatValue(b)+"</div>"
},formatValue:function(a){if(nf.Common.isDefinedAndNotNull(a)){if(a===""){return'<span class="blank">Empty string set</span>'
}else{return nf.Common.escapeHtml(a)
}}else{return'<span class="unset">No value set</span>'
}},escapeHtml:(function(){var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2f;"};
return function(b){if(nf.Common.isDefinedAndNotNull(b)){return String(b).replace(/[&<>"'\/]/g,function(c){return a[c]
})
}else{return""
}}
}()),submit:function(e,a,d){var c=window.onbeforeunload;
window.onbeforeunload=null;
var b=$("<form></form>").attr({method:e,action:a,style:"display: none;"});
if(nf.Common.isDefinedAndNotNull(d)){$.each(d,function(f,g){$("<textarea></textarea>").attr("name",f).val(g).appendTo(b)
})
}b.appendTo("body").submit().remove();
if(c!==null){window.onbeforeunload=c
}},formatUnorderedList:function(b){if($.isArray(b)){var a=$('<ul class="result"></ul>');
$.each(b,function(d,e){var c=$("<li></li>").appendTo(a);
if(e instanceof jQuery){c.append(e)
}else{c.text(e)
}});
return a
}else{return null
}},substringAfterLast:function(e,d){var b="";
var c=e.lastIndexOf(d);
if(c>=0){var a=c+d.length;
if(a<e.length){b=e.substr(a)
}}return b
},setCursor:function(b,a){if(a){$("#"+b).addClass("pointer")
}else{$("#"+b).removeClass("pointer")
}},MILLIS_PER_DAY:86400000,MILLIS_PER_HOUR:3600000,MILLIS_PER_MINUTE:60000,MILLIS_PER_SECOND:1000,formatDuration:function(d){d=d<1?0:d;
var f=d/nf.Common.MILLIS_PER_DAY;
f=f>=1?parseInt(f,10):0;
d%=nf.Common.MILLIS_PER_DAY;
var a=d/nf.Common.MILLIS_PER_HOUR;
a=a>=1?parseInt(a,10):0;
d%=nf.Common.MILLIS_PER_HOUR;
var b=d/nf.Common.MILLIS_PER_MINUTE;
b=b>=1?parseInt(b,10):0;
d%=nf.Common.MILLIS_PER_MINUTE;
var e=d/nf.Common.MILLIS_PER_SECOND;
e=e>=1?parseInt(e,10):0;
d=Math.floor(d%nf.Common.MILLIS_PER_SECOND);
var c=nf.Common.pad(a,2,"0")+":"+nf.Common.pad(b,2,"0")+":"+nf.Common.pad(e,2,"0")+"."+nf.Common.pad(d,3,"0");
if(f>0){return f+" days and "+c
}else{return c
}},BYTES_IN_KILOBYTE:1024,BYTES_IN_MEGABYTE:1048576,BYTES_IN_GIGABYTE:1073741824,BYTES_IN_TERABYTE:1099511627776,formatDataSize:function(b){var a=parseFloat(b/nf.Common.BYTES_IN_TERABYTE);
if(a>1){return a.toFixed(2)+" TB"
}a=parseFloat(b/nf.Common.BYTES_IN_GIGABYTE);
if(a>1){return a.toFixed(2)+" GB"
}a=parseFloat(b/nf.Common.BYTES_IN_MEGABYTE);
if(a>1){return a.toFixed(2)+" MB"
}a=parseFloat(b/nf.Common.BYTES_IN_KILOBYTE);
if(a>1){return a.toFixed(2)+" KB"
}return parseFloat(b).toFixed(2)+" bytes"
},formatInteger:function(b){var a=b+"";
var c=/(\d+)(\d{3})/;
while(c.test(a)){a=a.replace(c,"$1,$2")
}return a
},formatFloat:function(a){if(nf.Common.isUndefinedOrNull(a)){return 0+""
}return a.toFixed(2)+""
},pad:function(d,b,c){var a=d+"";
while(a.length<b){a=c+a
}return a
},formatDateTime:function(a){return nf.Common.pad(a.getMonth()+1,2,"0")+"/"+nf.Common.pad(a.getDate(),2,"0")+"/"+nf.Common.pad(a.getFullYear(),2,"0")+" "+nf.Common.pad(a.getHours(),2,"0")+":"+nf.Common.pad(a.getMinutes(),2,"0")+":"+nf.Common.pad(a.getSeconds(),2,"0")+"."+nf.Common.pad(a.getMilliseconds(),3,"0")
},parseDateTime:function(a){if(!nf.Common.isDefinedAndNotNull(a)){return new Date()
}if(a==="No value set"){return new Date()
}if(a==="Empty string set"){return new Date()
}var c=a.split(/ /);
if(c.length!==3){return new Date()
}var b=c[0].split(/\//);
var d=c[1].split(/:/);
if(b.length!==3||d.length!==3){return new Date()
}var e=d[2].split(/\./);
if(e.length===2){return new Date(parseInt(b[2],10),parseInt(b[0],10),parseInt(b[1],10),parseInt(d[0],10),parseInt(d[1],10),parseInt(e[0],10),parseInt(e[1],10))
}else{return new Date(parseInt(b[2],10),parseInt(b[0],10),parseInt(b[1],10),parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10),0)
}},parseDuration:function(a){var b=a.split(/:/);
if(b.length!==3){return 0
}var c=b[2].split(/\./);
if(c.length===2){return new Date(1970,0,1,parseInt(b[0],10),parseInt(b[1],10),parseInt(c[0],10),parseInt(c[1],10)).getTime()
}else{return new Date(1970,0,1,parseInt(b[0],10),parseInt(b[1],10),parseInt(b[2],10),0).getTime()
}},parseSize:function(c){var d=c.split(/ /);
var b=parseFloat(d[0].replace(/,/g,""));
var a=d[1];
if(a==="KB"){return b*1024
}else{if(a==="MB"){return b*1024*1024
}else{if(a==="GB"){return b*1024*1024*1024
}else{if(a==="TB"){return b*1024*1024*1024*1024
}else{return b
}}}}},parseCount:function(c){var b=c.split(/ /,1);
if(b.length!==1){return 0
}var a=parseInt(b[0].replace(/,/g,""),10);
if(isNaN(a)){return 0
}return a
},isDefinedAndNotNull:function(a){return !nf.Common.isUndefined(a)&&!nf.Common.isNull(a)
},isUndefinedOrNull:function(a){return nf.Common.isUndefined(a)||nf.Common.isNull(a)
},isUndefined:function(a){return typeof a==="undefined"
},isBlank:function(a){return nf.Common.isUndefined(a)||nf.Common.isNull(a)||$.trim(a)===""
},isNull:function(a){return a===null
},isEmpty:function(a){return $.isArray(a)?a.length===0:true
},doBulletinsDiffer:function(b,c){if($.isArray(b)&&$.isArray(c)){if(b.length===c.length){for(var a=0;
a<b.length;
a++){if(b[a].id!==c[a].id){return true
}}}else{return true
}}else{if($.isArray(b)||$.isArray(c)){return true
}}return false
},getFormattedBulletins:function(b){var a=[];
$.each(b,function(d,c){var g="";
if(nf.Common.isDefinedAndNotNull(c.nodeAddress)){g="-&nbsp"+nf.Common.escapeHtml(c.nodeAddress)+"&nbsp;-&nbsp;"
}var f=$("<pre></pre>").css({"white-space":"pre-wrap"}).text(c.message);
var e=$("<div>"+nf.Common.escapeHtml(c.timestamp)+"&nbsp;"+g+"&nbsp;<b>"+nf.Common.escapeHtml(c.level)+"</b>&nbsp;</div>").append(f);
a.push(e)
});
return a
}};
$(document).ready(function(){nf.Common.addHoverEffect("div.button","button-normal","button-over");
$("#nf-ok-dialog").modal({buttons:[{buttonText:"Ok",handler:{click:function(){$("#nf-ok-dialog").modal("hide")
}}}],handler:{close:function(){$("#nf-ok-dialog-content").empty()
}}});
$("#nf-yes-no-dialog").modal({handler:{close:function(){$("#nf-yes-no-dialog-content").empty()
}}})
});
nf.Dialog=(function(){return{showOkDialog:function(a){a=$.extend({headerText:"",dialogContent:"",overlayBackground:true},a);
var b=$("<p></p>").append(a.dialogContent);
$("#nf-ok-dialog-content").append(b);
if(nf.Common.isBlank(a.headerText)){$("#nf-ok-dialog-content").css("margin-top","-10px")
}else{$("#nf-ok-dialog-content").css("margin-top","0px")
}$("#nf-ok-dialog").modal("setHeaderText",a.headerText).modal("setOverlayBackground",a.overlayBackground).modal("show")
},showYesNoDialog:function(a){a=$.extend({headerText:"",dialogContent:"",overlayBackgrond:true},a);
var b=$("<p></p>").append(a.dialogContent);
$("#nf-yes-no-dialog-content").append(b);
$("#nf-yes-no-dialog").modal("setButtonModel",[{buttonText:"Yes",handler:{click:function(){$("#nf-yes-no-dialog").modal("hide");
if(typeof a.yesHandler==="function"){a.yesHandler.call(this)
}}}},{buttonText:"No",handler:{click:function(){$("#nf-yes-no-dialog").modal("hide");
if(typeof a.noHandler==="function"){a.noHandler.call(this)
}}}}]);
$("#nf-yes-no-dialog").modal("setOverlayBackground",a.overlayBackground).modal("show")
}}
}());
$(document).ready(function(){nf.BulletinBoard.init()
});
nf.BulletinBoard=(function(){var d={pollInterval:3,maxBulletins:1000,defaultFilterText:"Filter",urls:{banners:"../nifi-api/controller/banners",controllerAbout:"../nifi-api/controller/about",bulletinBoard:"../nifi-api/controller/bulletin-board"},styles:{filterList:"bulletin-board-filter-list",bulletinBoardPolling:"bulletin-board-polling",bulletinBoardPollingHover:"bulletin-board-polling-hover",bulletinBoardStopped:"bulletin-board-stopped",bulletinBoardStoppedHover:"bulletin-board-stopped-hover"}};
var f=null;
var i=null;
var e=null;
var a=null;
var c=function(){$("#refresh-button").addClass(d.styles.bulletinBoardPolling).click(function(){h();
if($(this).hasClass(d.styles.bulletinBoardPollingHover)){$(this).removeClass(d.styles.bulletinBoardPollingHover).addClass(d.styles.bulletinBoardStoppedHover)
}else{if($(this).hasClass(d.styles.bulletinBoardStoppedHover)){$(this).removeClass(d.styles.bulletinBoardStoppedHover).addClass(d.styles.bulletinBoardPollingHover)
}}}).hover(function(){if(f===true){$(this).removeClass(d.styles.bulletinBoardPolling).addClass(d.styles.bulletinBoardPollingHover)
}else{$(this).removeClass(d.styles.bulletinBoardStopped).addClass(d.styles.bulletinBoardStoppedHover)
}},function(){if(f===true){$(this).removeClass(d.styles.bulletinBoardPollingHover+" "+d.styles.bulletinBoardStoppedHover).addClass(d.styles.bulletinBoardPolling)
}else{$(this).removeClass(d.styles.bulletinBoardStoppedHover+" "+d.styles.bulletinBoardPollingHover).addClass(d.styles.bulletinBoardStopped)
}});
nf.Common.addHoverEffect("#clear-bulletins-button","button-normal","button-over").click(function(){$("#bulletin-board-container").empty()
});
$("#bulletin-board-filter").focus(function(){if($(this).hasClass(d.styles.filterList)){$(this).removeClass(d.styles.filterList).val("")
}}).blur(function(){if($(this).val()===""){$(this).addClass(d.styles.filterList).val(d.defaultFilterText)
}}).addClass(d.styles.filterList).val(d.defaultFilterText);
$("#bulletin-board-filter-type").combo({options:[{text:"by message",value:"message"},{text:"by source name",value:"sourceName"},{text:"by source id",value:"sourceId"},{text:"by group id",value:"groupId"}]});
var o=$.ajax({type:"GET",url:d.urls.controllerAbout,dataType:"json"}).done(function(q){var p=q.about;
var r=p.title+" Bulletin Board";
document.title=r;
$("#bulletin-board-header-text").text(r)
}).fail(nf.Common.handleAjaxError);
var n=$.Deferred(function(p){if(top===window){$.ajax({type:"GET",url:d.urls.banners,dataType:"json"}).done(function(u){if(nf.Common.isDefinedAndNotNull(u.banners)){if(nf.Common.isDefinedAndNotNull(u.banners.headerText)&&u.banners.headerText!==""){var r=$("#banner-header").text(u.banners.headerText).show();
var t=function(v){var w=$("#"+v);
w.css("top",(parseInt(r.css("height"),10)+parseInt(w.css("top"),10))+"px")
};
t("bulletin-board")
}if(nf.Common.isDefinedAndNotNull(u.banners.footerText)&&u.banners.footerText!==""){var q=$("#banner-footer").text(u.banners.footerText).show();
var s=function(v){var w=$("#"+v);
w.css("bottom",parseInt(q.css("height"),10)+"px")
};
s("bulletin-board")
}}p.resolve()
}).fail(function(s,q,r){nf.Common.handleAjaxError(s,q,r);
p.reject()
})
}else{p.resolve()
}});
return $.Deferred(function(p){$.when(o,n).done(function(){p.resolve()
}).fail(function(){p.reject()
})
}).promise()
};
var h=function(){if(f===true){m()
}else{b()
}};
var b=function(){var o=$("#refresh-button");
var n=$("#bulletin-board-container");
g(n,'<div class="bulletin-action">Auto refresh started</div>');
$("#bulletin-error-message").text("").hide();
f=true;
k();
o.removeClass(d.styles.bulletinBoardStopped).addClass(d.styles.bulletinBoardPolling)
};
var m=function(){var o=$("#refresh-button");
var n=$("#bulletin-board-container");
g(n,'<div class="bulletin-action">Auto refresh stopped</div>');
f=false;
i=null;
e=null;
a=null;
o.removeClass(d.styles.bulletinBoardPolling).addClass(d.styles.bulletinBoardStopped)
};
var k=function(){var n=$("body").is(":visible");
if(!n){f=false
}if(f){j().done(function(){if(f){setTimeout(k,d.pollInterval*1000)
}})
}};
var j=function(){var r={};
if(nf.Common.isDefinedAndNotNull(i)){r.after=i
}else{r.limit=10
}var p=$("#bulletin-board-container");
var n=$("#bulletin-board-filter");
if(!n.hasClass(d.styles.filterList)){var q=n.val();
if(q!==""){var s=$("#bulletin-board-filter-type").combo("getSelectedOption");
r[s.value]=q;
if(e!==q||a!==s.text){var o=$('<div class="bulletin-action"></div>').text("Filter "+s.text+" matching '"+q+"'");
g(p,o.get(0));
e=q;
a=s.text
}}else{if(e!==null){g(p,'<div class="bulletin-action">Filter removed</div>');
e=null;
a=null
}}}return $.ajax({type:"GET",url:d.urls.bulletinBoard,data:r,dataType:"json"}).done(function(t){if(nf.Common.isDefinedAndNotNull(t.bulletinBoard)){var u=t.bulletinBoard;
$("#bulletin-board-last-refreshed").text(u.generated);
var y=t.bulletinBoard.bulletins;
var x=[];
$.each(y,function(C,A){var F="bulletin-normal";
if(A.level==="ERROR"){F="bulletin-error"
}else{if(A.level==="WARN"||A.level==="WARNING"){F="bulletin-warn"
}}var E;
if(nf.Common.isDefinedAndNotNull(A.sourceId)&&nf.Common.isDefinedAndNotNull(A.groupId)&&top!==window){E=$('<div class="bulletin-source bulletin-link"></div>').text(A.sourceId).on("click",function(){l(A.groupId,A.sourceId)
})
}else{var D=A.sourceId;
if(nf.Common.isUndefined(D)||nf.Common.isNull(D)){D=""
}E=$('<div class="bulletin-source"></div>').text(D)
}var B=$('<div class="bulletin"></div>');
var z=$('<div class="bulletin-info"></div>').appendTo(B);
$('<div class="bulletin-timestamp"></div>').text(A.timestamp).appendTo(z);
$('<div class="bulletin-severity"></div>').addClass(F).text(A.level).appendTo(z);
E.appendTo(z);
$('<div class="clear"></div>').appendTo(z);
if(nf.Common.isDefinedAndNotNull(A.nodeAddress)){$('<div class="bulletin-node"></div>').text(A.nodeAddress).appendTo(B)
}$('<pre class="bulletin-message"></pre>').text(A.message).appendTo(B);
$('<div class="clear"></div>').appendTo(B);
x.push(B.get(0));
if(C+1===y.length){i=A.id
}});
g(p,x);
var w=p.contents();
var v=w.length;
if(v>d.maxBulletins){w.slice(0,v-d.maxBulletins).remove();
p.prepend('<div class="bulletin-action">&#8230;</div>')
}}}).fail(function(v,t,u){if(v.status===404){$("#bulletin-error-message").text(v.responseText).show();
h()
}else{nf.Common.handleAjaxError(v,t,u)
}})
};
var g=function(n,o){n.append(o).animate({scrollTop:n[0].scrollHeight},"slow")
};
var l=function(n,o){if(top!==window){if(nf.Common.isDefinedAndNotNull(parent.nf)&&nf.Common.isDefinedAndNotNull(parent.nf.CanvasUtils)&&nf.Common.isDefinedAndNotNull(parent.nf.Shell)){parent.nf.CanvasUtils.showComponent(n,o);
parent.$("#shell-close-button").click()
}}};
return{init:function(){c().done(function(){b()
})
}}
}());
