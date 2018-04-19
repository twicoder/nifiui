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
$(document).ready(function(){nf.Users.init()
});
nf.Users=(function(){var a={urls:{banners:"../nifi-api/controller/banners",controllerAbout:"../nifi-api/controller/about",authorities:"../nifi-api/controller/authorities"}};
var c=function(){return $.Deferred(function(d){$.ajax({type:"GET",url:a.urls.authorities,dataType:"json"}).done(function(e){if(nf.Common.isDefinedAndNotNull(e.authorities)){nf.Common.setAuthorities(e.authorities);
d.resolve(e)
}else{d.reject()
}}).fail(function(g,e,f){nf.Common.handleAjaxError(g,e,f);
d.reject()
})
}).promise()
};
var b=function(){nf.Common.addHoverEffect("#refresh-button","button-refresh","button-refresh-hover").click(function(){nf.UsersTable.loadUsersTable()
});
return $.Deferred(function(d){if(top===window){$.ajax({type:"GET",url:a.urls.banners,dataType:"json"}).done(function(i){if(nf.Common.isDefinedAndNotNull(i.banners)){if(nf.Common.isDefinedAndNotNull(i.banners.headerText)&&i.banners.headerText!==""){var f=$("#banner-header").text(i.banners.headerText).show();
var h=function(j){var k=$("#"+j);
k.css("top",(parseInt(f.css("height"),10)+parseInt(k.css("top"),10))+"px")
};
h("users")
}if(nf.Common.isDefinedAndNotNull(i.banners.footerText)&&i.banners.footerText!==""){var e=$("#banner-footer").text(i.banners.footerText).show();
var g=function(j){var k=$("#"+j);
k.css("bottom",parseInt(e.css("height"),10)+"px")
};
g("users")
}}d.resolve()
}).fail(function(g,e,f){nf.Common.handleAjaxError(g,e,f);
d.reject()
})
}else{d.resolve()
}})
};
return{init:function(){c().done(function(){nf.UsersTable.init();
nf.UsersTable.loadUsersTable().done(function(){b().done(function(){nf.UsersTable.resetTableSize();
$.ajax({type:"GET",url:a.urls.controllerAbout,dataType:"json"}).done(function(e){var d=e.about;
var f=d.title+" Users";
document.title=f;
$("#users-header-text").text(f)
}).fail(nf.Common.handleAjaxError)
})
})
})
}}
}());
nf.UsersTable=(function(){var c={filterText:"Filter",styles:{filterList:"users-filter-list"},urls:{users:"../nifi-api/controller/users",userGroups:"../nifi-api/controller/user-groups"}};
var i=function(){$("#user-details-dialog").modal({headerText:"User Details",overlayBackground:false,buttons:[{buttonText:"Ok",handler:{click:function(){$("#user-details-dialog").modal("hide")
}}}],handler:{close:function(){$("#user-name-details-dialog").text("");
$("#user-dn-details-dialog").text("");
$("#user-created-details-dialog").text("");
$("#user-verified-details-dialog").text("");
$("#user-justification-details-dialog").text("")
}}})
};
var l=function(){$("#user-roles-dialog").modal({headerText:"User Roles",overlayBackground:false,buttons:[{buttonText:"Apply",handler:{click:function(){var p=$("#user-id-roles-dialog").val();
var q=[];
var s=function(t){return $("#"+t).hasClass("checkbox-checked")
};
if(s("role-admin-checkbox")){q.push("ROLE_ADMIN")
}if(s("role-dfm-checkbox")){q.push("ROLE_DFM")
}if(s("role-provenance-checkbox")){q.push("ROLE_PROVENANCE")
}if(s("role-monitor-checkbox")){q.push("ROLE_MONITOR")
}if(s("role-nifi-checkbox")){q.push("ROLE_NIFI")
}if(s("role-proxy-checkbox")){q.push("ROLE_PROXY")
}var r={};
r.id=p;
r.authorities=q;
r.status="ACTIVE";
var o={};
o.user=r;
$.ajax({type:"PUT",url:c.urls.users+"/"+encodeURIComponent(p),data:JSON.stringify(o),contentType:"application/json",dataType:"json"}).done(function(u){if(nf.Common.isDefinedAndNotNull(u.user)){var t=u.user;
var v=$("#users-table").data("gridInstance");
var w=v.getData();
w.updateItem(t.id,t)
}}).fail(nf.Common.handleAjaxError);
$("#user-roles-dialog").modal("hide")
}}},{buttonText:"Cancel",handler:{click:function(){$("#user-roles-dialog").modal("hide")
}}}],handler:{close:function(){$("div.role-checkbox").removeClass("checkbox-checked").addClass("checkbox-unchecked");
$("#user-id-roles-dialog").val("")
}}})
};
var m=function(){$("#group-roles-dialog").modal({headerText:"Group Roles",overlayBackground:false,buttons:[{buttonText:"Apply",handler:{click:function(){var q=$("#group-name-roles-dialog").text();
var r=[];
var s=function(t){return $("#"+t).hasClass("checkbox-checked")
};
if(s("group-role-admin-checkbox")){r.push("ROLE_ADMIN")
}if(s("group-role-dfm-checkbox")){r.push("ROLE_DFM")
}if(s("group-role-provenance-checkbox")){r.push("ROLE_PROVENANCE")
}if(s("group-role-monitor-checkbox")){r.push("ROLE_MONITOR")
}if(s("group-role-nifi-checkbox")){r.push("ROLE_NIFI")
}if(s("group-role-proxy-checkbox")){r.push("ROLE_PROXY")
}var p={};
p.group=q;
p.authorities=r;
p.status="ACTIVE";
var o={};
o.userGroup=p;
$.ajax({type:"PUT",url:c.urls.userGroups+"/"+encodeURIComponent(q),data:JSON.stringify(o),contentType:"application/json",dataType:"json"}).done(function(){nf.UsersTable.loadUsersTable()
}).fail(nf.Common.handleAjaxError);
$("#group-roles-dialog").modal("hide")
}}},{buttonText:"Cancel",handler:{click:function(){$("#group-roles-dialog").modal("hide")
}}}],handler:{close:function(){$("div.role-checkbox").removeClass("checkbox-checked").addClass("checkbox-unchecked");
$("#group-name-roles-dialog").text("")
}}})
};
var b=function(){$("#user-delete-dialog").modal({headerText:"Delete User",overlayBackground:false,buttons:[{buttonText:"Delete",handler:{click:function(){var o=$("#user-id-delete-dialog").val();
$.ajax({type:"DELETE",url:c.urls.users+"/"+encodeURIComponent(o),dataType:"json"}).done(function(){nf.UsersTable.loadUsersTable()
}).fail(nf.Common.handleAjaxError);
$("#user-delete-dialog").modal("hide")
}}},{buttonText:"Cancel",handler:{click:function(){$("#user-delete-dialog").modal("hide")
}}}],handler:{close:function(){$("#user-id-delete-dialog").val("");
$("#user-name-delete-dialog").text("")
}}})
};
var h=function(){$("#user-revoke-dialog").modal({headerText:"Revoke Access",overlayBackground:false,buttons:[{buttonText:"Revoke",handler:{click:function(){var o=$("#user-id-revoke-dialog").val();
$.ajax({type:"PUT",url:c.urls.users+"/"+encodeURIComponent(o),data:{status:"DISABLED"},dataType:"json"}).done(function(q){if(nf.Common.isDefinedAndNotNull(q.user)){var p=q.user;
var r=$("#users-table").data("gridInstance");
var s=r.getData();
s.updateItem(p.id,p)
}}).fail(nf.Common.handleAjaxError);
$("#user-revoke-dialog").modal("hide")
}}},{buttonText:"Cancel",handler:{click:function(){$("#user-revoke-dialog").modal("hide")
}}}],handler:{close:function(){$("#user-id-revoke-dialog").val("");
$("#user-name-revoke-dialog").text("")
}}})
};
var n=function(){$("#group-revoke-dialog").modal({headerText:"Revoke Access",overlayBackground:false,buttons:[{buttonText:"Revoke",handler:{click:function(){var o=$("#group-name-revoke-dialog").text();
$.ajax({type:"PUT",url:c.urls.userGroups+"/"+encodeURIComponent(o),data:{status:"DISABLED"},dataType:"json"}).done(function(){nf.UsersTable.loadUsersTable()
}).fail(nf.Common.handleAjaxError);
$("#group-revoke-dialog").modal("hide")
}}},{buttonText:"Cancel",handler:{click:function(){$("#group-revoke-dialog").modal("hide")
}}}],handler:{close:function(){$("#group-name-revoke-dialog").text("")
}}})
};
var k=function(){$("#user-group-dialog").modal({headerText:"Set Users Group",overlayBackground:false,buttons:[{buttonText:"Group",handler:{click:function(){var q=$.trim($("#group-name").val());
if(q===""){nf.Dialog.showOkDialog({headerText:"Group Users",dialogContent:"Group name cannot be blank.",overlayBackground:false})
}else{var r=$("#group-name").data("selected-user-ids");
var p={};
p.userIds=r;
p.group=q;
var o={};
o.userGroup=p;
$.ajax({type:"PUT",url:c.urls.userGroups+"/"+encodeURIComponent(q),data:JSON.stringify(o),contentType:"application/json",dataType:"json"}).done(function(){nf.UsersTable.loadUsersTable()
}).fail(nf.Common.handleAjaxError)
}$("#user-group-dialog").modal("hide")
}}},{buttonText:"Cancel",handler:{click:function(){$("#user-group-dialog").modal("hide")
}}}],handler:{close:function(){$("#group-name").removeData("selected-user-ids");
$("#group-name").val("");
$("div.group-role-checkbox").removeClass("checkbox-checked").addClass("checkbox-unchecked")
}}})
};
var d=function(){$("#users-filter").keyup(function(){g()
}).focus(function(){if($(this).hasClass(c.styles.filterList)){$(this).removeClass(c.styles.filterList).val("")
}}).blur(function(){if($(this).val()===""){$(this).addClass(c.styles.filterList).val(c.filterText)
}}).addClass(c.styles.filterList).val(c.filterText);
$("#users-filter-type").combo({options:[{text:"by user",value:"userName"},{text:"by group",value:"userGroup"},{text:"by role",value:"authorities"}],select:function(x){g()
}});
nf.Common.addHoverEffect("#group-button","button-normal","button-over").click(function(){e()
});
$(window).resize(function(){nf.UsersTable.resetTableSize()
});
var w=function(B,y,A,z,x){return'<img src="images/iconDetails.png" title="View Details" class="pointer" style="margin-top: 4px;" onclick="javascript:nf.UsersTable.showUserDetails(\''+B+"');\"/>"
};
var v=function(B,y,A,z,x){return nf.Common.formatValue(A)
};
var p=function(C,y,B,z,x){var A=$("#group-collaspe-checkbox").hasClass("checkbox-checked");
var D=function(){var E=[];
$.each(B,function(G,H){var F=H;
if(H==="ROLE_ADMIN"){F="Administrator"
}else{if(H==="ROLE_DFM"){F="Data Flow Manager"
}else{if(H==="ROLE_PROVENANCE"){F="Provenance"
}else{if(H==="ROLE_MONITOR"){F="Read Only"
}else{if(H==="ROLE_NIFI"){F="NiFi"
}else{if(H==="ROLE_PROXY"){F="Proxy"
}}}}}}E.push(F)
});
return E.join(", ")
};
if(A&&nf.Common.isDefinedAndNotNull(x.userGroup)){if(x.status==="PENDING"){return'<span style="color: #0081D7; font-weight: bold;">Authorization Pending</span>'
}else{if(x.status==="DISABLED"){return'<span style="color: red; font-weight: bold;">Access Revoked</span>'
}else{if(nf.Common.isDefinedAndNotNull(B)){if(!nf.Common.isEmpty(B)){return D()
}else{return'<span class="unset">No roles set</span>'
}}else{return'<span class="unset">Multiple users with different roles</span>'
}}}}else{if(x.status==="PENDING"){return'<span style="color: #0081D7; font-weight: bold;">Authorization Pending</span>'
}else{if(x.status==="DISABLED"){return'<span style="color: red; font-weight: bold;">Access Revoked</span>'
}else{if(!nf.Common.isEmpty(B)){return D()
}else{return'<span class="unset">No roles set</span>'
}}}}};
var o=function(C,y,B,z,x){var A=$("#group-collaspe-checkbox").hasClass("checkbox-checked");
if(nf.Common.isDefinedAndNotNull(B)){return B
}else{if(A&&nf.Common.isDefinedAndNotNull(x.userGroup)){return'<span class="unset">Multiple users with different status</span>'
}else{return'<span class="unset">No status set</span>'
}}};
var t=function(D,y,B,z,x){var A=$("#group-collaspe-checkbox").hasClass("checkbox-checked");
if(nf.Common.isDefinedAndNotNull(x.userGroup)&&A){var C='<img src="images/iconEdit.png" title="Edit Access" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.UsersTable.updateGroupAccess(\''+D+'\');"/>&nbsp;<img src="images/iconRevoke.png" title="Revoke Access" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.UsersTable.revokeGroupAccess(\''+D+'\');"/>&nbsp;&nbsp;<img src="images/ungroup.png" title="Ungroup" class="pointer" onclick="javascript:nf.UsersTable.ungroup(\''+D+"');\"/>"
}else{var C='<img src="images/iconEdit.png" title="Edit Access" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.UsersTable.updateUserAccess(\''+D+"');\"/>";
if(x.status==="ACTIVE"){C+='&nbsp;<img src="images/iconRevoke.png" title="Revoke Access" class="pointer" onclick="javascript:nf.UsersTable.revokeUserAccess(\''+D+"');\"/>";
if(nf.Common.isDefinedAndNotNull(x.userGroup)){C+='&nbsp;&nbsp;<img src="images/ungroup.png" title="Ungroup" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.UsersTable.ungroupUser(\''+D+"');\"/>"
}}else{C+='&nbsp;<img src="images/iconDelete.png" title="Delete Account" class="pointer" onclick="javascript:nf.UsersTable.deleteUserAccount(\''+D+"');\"/>"
}}return C
};
var u=[{id:"moreDetails",name:"&nbsp;",sortable:false,resizable:false,formatter:w,width:50,maxWidth:50},{id:"userName",name:"User",field:"userName",sortable:true,resizable:true},{id:"userGroup",name:"Group",field:"userGroup",sortable:true,resizable:true,formatter:v},{id:"authorities",name:"Roles",field:"authorities",sortable:true,resizable:true,formatter:p},{id:"lastAccessed",name:"Last Accessed",field:"lastAccessed",sortable:true,resizable:true,formatter:v},{id:"status",name:"Status",field:"status",sortable:true,resizable:false,formatter:o},{id:"actions",name:"&nbsp;",sortable:false,resizable:false,formatter:t,width:100,maxWidth:100}];
var r={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false};
var s=new Slick.Data.DataView({inlineFilters:false});
s.setItems([]);
s.setFilterArgs({searchString:j(),property:$("#users-filter-type").combo("getSelectedOption").value});
s.setFilter(a);
f({columnId:"userName",sortAsc:true},s);
var q=new Slick.Grid("#users-table",s,u,r);
q.setSelectionModel(new Slick.RowSelectionModel());
q.registerPlugin(new Slick.AutoTooltips());
q.setSortColumn("userName",true);
q.onSort.subscribe(function(y,x){f({columnId:x.sortCol.field,sortAsc:x.sortAsc},s)
});
s.onRowCountChanged.subscribe(function(y,x){q.updateRowCount();
q.render();
$("#displayed-users").text(x.current)
});
s.onRowsChanged.subscribe(function(y,x){q.invalidateRows(x.rows);
q.render()
});
$("#users-table").data("gridInstance",q);
$("#displayed-users").text("0")
};
var f=function(o,q){var p=function(t,r){if(o.columnId==="lastAccessed"){var w=nf.Common.parseDateTime(t[o.columnId]);
var v=nf.Common.parseDateTime(r[o.columnId]);
return w.getTime()-v.getTime()
}else{var s=nf.Common.isDefinedAndNotNull(t[o.columnId])?t[o.columnId]:"";
var u=nf.Common.isDefinedAndNotNull(r[o.columnId])?r[o.columnId]:"";
return s===u?0:s>u?1:-1
}};
q.sort(p,o.sortAsc)
};
var e=function(){var p=$("#users-table").data("gridInstance");
var o=p.getSelectedRows();
if($.isArray(o)&&o.length>0){var r=p.getData();
var s=[];
$.each(o,function(v,u){var t=r.getItem(u);
s=s.concat(t.id.split(","))
});
var q=$("#group-name");
q.data("selected-user-ids",s);
$("#user-group-dialog").modal("show");
q.focus()
}else{nf.Dialog.showOkDialog({headerText:"Group Users",dialogContent:"Select one or more users to group.",overlayBackground:false})
}};
var j=function(){var p="";
var o=$("#users-filter");
if(!o.hasClass(c.styles.filterList)){p=o.val()
}return p
};
var g=function(){var o=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(o)){var p=o.getData();
p.setFilterArgs({searchString:j(),property:$("#users-filter-type").combo("getSelectedOption").value});
p.refresh()
}};
var a=function(v,u){if(u.searchString===""){return true
}try{var o=new RegExp(u.searchString,"i")
}catch(t){return false
}if(u.property==="authorities"){var s=v[u.property];
var w=false;
for(var r=0;
r<s.length;
r++){var q=s[r];
var p=q;
if(q==="ROLE_ADMIN"){p="Administrator"
}else{if(q==="ROLE_DFM"){p="Data Flow Manager"
}else{if(q==="ROLE_PROVENANCE"){p="Provenance"
}else{if(q==="ROLE_MONITOR"){p="Read Only"
}else{if(q==="ROLE_NIFI"){p="NiFi"
}else{if(q==="ROLE_PROXY"){p="Proxy"
}}}}}}if(p.search(o)>=0){w=true;
break
}}return w
}else{return v[u.property].search(o)>=0
}};
return{init:function(){i();
l();
m();
h();
b();
k();
n();
d()
},revokeUserAccess:function(r){var o=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(o)){var q=o.getData();
var p=q.getItem(r);
$("#user-id-revoke-dialog").val(p.id);
$("#user-name-revoke-dialog").text(p.userName);
$("#user-revoke-dialog").modal("show")
}},deleteUserAccount:function(r){var o=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(o)){var q=o.getData();
var p=q.getItem(r);
$("#user-id-delete-dialog").val(p.id);
$("#user-name-delete-dialog").text(p.userName);
$("#user-delete-dialog").modal("show")
}},revokeGroupAccess:function(r){var o=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(o)){var q=o.getData();
var p=q.getItem(r);
$("#group-name-revoke-dialog").text(p.userGroup);
$("#group-revoke-dialog").modal("show")
}},updateUserAccess:function(s){var p=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(p)){var r=p.getData();
var q=r.getItem(s);
$("#user-id-roles-dialog").val(q.id);
$("#user-name-roles-dialog").attr("title",q.dn).text(q.userName);
$("#user-justification-roles-dialog").html(nf.Common.formatValue(q.justification));
var o=function(t){$("#"+t).removeClass("checkbox-unchecked").addClass("checkbox-checked")
};
$.each(q.authorities,function(t,u){if(u==="ROLE_ADMIN"){o("role-admin-checkbox")
}else{if(u==="ROLE_DFM"){o("role-dfm-checkbox")
}else{if(u==="ROLE_PROVENANCE"){o("role-provenance-checkbox")
}else{if(u==="ROLE_MONITOR"){o("role-monitor-checkbox")
}else{if(u==="ROLE_NIFI"){o("role-nifi-checkbox")
}else{if(u==="ROLE_PROXY"){o("role-proxy-checkbox")
}}}}}}});
$("#user-roles-dialog").modal("show")
}},updateGroupAccess:function(r){var o=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(o)){var q=o.getData();
var p=q.getItem(r);
$("#group-name-roles-dialog").text(p.userGroup);
$("#group-roles-dialog").modal("show")
}},ungroupUser:function(r){var o=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(o)){var q=o.getData();
var p=q.getItem(r);
nf.Dialog.showYesNoDialog({dialogContent:"Remove user '"+nf.Common.escapeHtml(p.userName)+"' from group '"+nf.Common.escapeHtml(p.userGroup)+"'?",overlayBackground:false,yesHandler:function(){$.ajax({type:"DELETE",url:c.urls.userGroups+"/"+encodeURIComponent(p.userGroup)+"/users/"+encodeURIComponent(p.id),dataType:"json"}).done(function(s){nf.UsersTable.loadUsersTable()
}).fail(nf.Common.handleAjaxError)
}})
}},ungroup:function(r){var o=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(o)){var q=o.getData();
var p=q.getItem(r);
nf.Dialog.showYesNoDialog({dialogContent:"Remove all users from group '"+nf.Common.escapeHtml(p.userGroup)+"'?",overlayBackground:false,yesHandler:function(){$.ajax({type:"DELETE",url:c.urls.userGroups+"/"+encodeURIComponent(p.userGroup),dataType:"json"}).done(function(s){nf.UsersTable.loadUsersTable()
}).fail(nf.Common.handleAjaxError)
}})
}},resetTableSize:function(){var o=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(o)){o.resizeCanvas()
}},loadUsersTable:function(){return $.ajax({type:"GET",url:c.urls.users,data:{grouped:$("#group-collaspe-checkbox").hasClass("checkbox-checked")},dataType:"json"}).done(function(o){if(nf.Common.isDefinedAndNotNull(o.users)){var p=$("#users-table").data("gridInstance");
var q=p.getData();
q.setItems(o.users);
q.reSort();
p.invalidate();
p.getSelectionModel().setSelectedRows([]);
$("#users-last-refreshed").text(o.generated);
$("#total-users").text(o.users.length)
}else{$("#total-users").text("0")
}}).fail(nf.Common.handleAjaxError)
},showUserDetails:function(s){var q=$("#users-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(q)){var r=q.getData();
var o=r.getItem(s);
var p=$("#group-collaspe-checkbox").hasClass("checkbox-checked");
$("#user-name-details-dialog").text(o.userName);
$("#user-dn-details-dialog").text(o.dn);
if(nf.Common.isDefinedAndNotNull(o.creation)){$("#user-created-details-dialog").text(o.creation)
}else{if(p&&nf.Common.isDefinedAndNotNull(o.userGroup)){$("#user-created-details-dialog").html('<span class="unset">Multiple users with different creation timestamps.</span>')
}else{$("#user-created-details-dialog").html('<span class="unset">No creation timestamp set</span>')
}}if(nf.Common.isDefinedAndNotNull(o.lastVerified)){$("#user-verified-details-dialog").text(o.lastVerified)
}else{if(p&&nf.Common.isDefinedAndNotNull(o.userGroup)){$("#user-verified-details-dialog").html('<span class="unset">Multiple users with different last verified timestamps.</span>')
}else{$("#user-verified-details-dialog").html('<span class="unset">No last verified timestamp set.</span>')
}}if(nf.Common.isDefinedAndNotNull(o.justification)){$("#user-justification-details-dialog").text(o.justification)
}else{if(p&&nf.Common.isDefinedAndNotNull(o.userGroup)){$("#user-justification-details-dialog").html('<span class="unset">Multiple users with different justifications.</span>')
}else{$("#user-justification-details-dialog").html('<span class="unset">No justification set.</span>')
}}$("#user-details-dialog").modal("show")
}}}
}());
