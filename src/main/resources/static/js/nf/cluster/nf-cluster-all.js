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
$(document).ready(function(){nf.Cluster.init()
});
nf.Cluster=(function(){var a={urls:{banners:"../nifi-api/controller/banners",controllerAbout:"../nifi-api/controller/about",authorities:"../nifi-api/controller/authorities"}};
var c=function(){return $.Deferred(function(d){$.ajax({type:"GET",url:a.urls.authorities,dataType:"json"}).done(function(e){if(nf.Common.isDefinedAndNotNull(e.authorities)){nf.Common.setAuthorities(e.authorities);
d.resolve()
}else{d.reject()
}}).fail(function(g,e,f){nf.Common.handleAjaxError(g,e,f);
d.reject()
})
}).promise()
};
var b=function(){nf.Common.addHoverEffect("#refresh-button","button-refresh","button-refresh-hover").click(function(){nf.ClusterTable.loadClusterTable()
});
return $.Deferred(function(d){if(top===window){$.ajax({type:"GET",url:a.urls.banners,dataType:"json"}).done(function(i){if(nf.Common.isDefinedAndNotNull(i.banners)){if(nf.Common.isDefinedAndNotNull(i.banners.headerText)&&i.banners.headerText!==""){var f=$("#banner-header").text(i.banners.headerText).show();
var h=function(j){var k=$("#"+j);
k.css("top",(parseInt(f.css("height"),10)+parseInt(k.css("top"),10))+"px")
};
h("counters")
}if(nf.Common.isDefinedAndNotNull(i.banners.footerText)&&i.banners.footerText!==""){var e=$("#banner-footer").text(i.banners.footerText).show();
var g=function(j){var k=$("#"+j);
k.css("bottom",parseInt(e.css("height"),10)+"px")
};
g("counters")
}}d.resolve()
}).fail(function(g,e,f){nf.Common.handleAjaxError(g,e,f);
d.reject()
})
}else{d.resolve()
}}).promise()
};
return{init:function(){c().done(function(){nf.ClusterTable.init();
nf.ClusterTable.loadClusterTable().done(function(){b().done(function(){nf.ClusterTable.resetTableSize();
$.ajax({type:"GET",url:a.urls.controllerAbout,dataType:"json"}).done(function(e){var d=e.about;
var f=d.title+" Cluster";
document.title=f;
$("#counters-header-text").text(f)
}).fail(nf.Common.handleAjaxError)
})
})
})
}}
}());
nf.ClusterTable=(function(){var b={filterText:"Filter",styles:{filterList:"cluster-filter-list"},urls:{cluster:"../nifi-api/cluster",nodes:"../nifi-api/cluster/nodes"}};
var h,f;
var c=function(l,n){var m=function(z,y){if(l.columnId==="heartbeat"||l.columnId==="uptime"){var s=nf.Common.parseDateTime(z[l.columnId]);
var p=nf.Common.parseDateTime(y[l.columnId]);
return s.getTime()-p.getTime()
}else{if(l.columnId==="queued"){var t=z[l.columnId].split(/ \/ /);
var w=y[l.columnId].split(/ \/ /);
var x=f%4;
if(x<2){$("#cluster-table span.queued-title").addClass("sorted");
var q=nf.Common.parseCount(t[0]);
var v=nf.Common.parseCount(w[0]);
return q-v
}else{$("#cluster-table span.queued-size-title").addClass("sorted");
var C=nf.Common.parseSize(t[1]);
var B=nf.Common.parseSize(w[1]);
return C-B
}}else{if(l.columnId==="status"){var u=nf.Common.isDefinedAndNotNull(z[l.columnId])?z[l.columnId]:"";
if(z.primary===true){u+=", PRIMARY"
}var A=nf.Common.isDefinedAndNotNull(y[l.columnId])?y[l.columnId]:"";
if(y.primary===true){A+=", PRIMARY"
}return u===A?0:u>A?1:-1
}else{if(l.columnId==="node"){var r=g(z);
var o=g(y);
return r===o?0:r>o?1:-1
}else{var u=nf.Common.isDefinedAndNotNull(z[l.columnId])?z[l.columnId]:"";
var A=nf.Common.isDefinedAndNotNull(y[l.columnId])?y[l.columnId]:"";
return u===A?0:u>A?1:-1
}}}}};
$("#cluster-table span.queued-title").removeClass("sorted");
$("#cluster-table span.queued-size-title").removeClass("sorted");
if(h!==l.columnId){f=0
}else{f++
}n.sort(m,l.sortAsc);
h=l.columnId
};
var g=function(l){return nf.Common.escapeHtml(l.address)+":"+nf.Common.escapeHtml(l.apiPort)
};
var k=function(l){$.ajax({type:"PUT",url:b.urls.nodes+"/"+encodeURIComponent(l),data:{status:"CONNECTING"},dataType:"json"}).done(function(n){var o=n.node;
var p=$("#cluster-table").data("gridInstance");
var m=p.getData();
m.updateItem(o.nodeId,o)
}).fail(nf.Common.handleAjaxError)
};
var j=function(l){$.ajax({type:"PUT",url:b.urls.nodes+"/"+encodeURIComponent(l),data:{status:"DISCONNECTING"},dataType:"json"}).done(function(n){var o=n.node;
var p=$("#cluster-table").data("gridInstance");
var m=p.getData();
m.updateItem(o.nodeId,o)
}).fail(nf.Common.handleAjaxError)
};
var d=function(l){$.ajax({type:"DELETE",url:b.urls.nodes+"/"+encodeURIComponent(l),dataType:"json"}).done(function(){var n=$("#cluster-table").data("gridInstance");
var m=n.getData();
m.deleteItem(l)
}).fail(nf.Common.handleAjaxError)
};
var i=function(){var m="";
var l=$("#cluster-filter");
if(!l.hasClass(b.styles.filterList)){m=l.val()
}return m
};
var e=function(){var m=$("#cluster-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(m)){var l=m.getData();
l.setFilterArgs({searchString:i(),property:$("#cluster-filter-type").combo("getSelectedOption").value});
l.refresh()
}};
var a=function(m,l){if(l.searchString===""){return true
}try{var o=new RegExp(l.searchString,"i")
}catch(n){return false
}return m[l.property].search(o)>=0
};
return{init:function(){$("#node-details-dialog").modal({headerText:"Node Details",overlayBackground:false,buttons:[{buttonText:"Ok",handler:{click:function(){$("#node-details-dialog").modal("hide")
}}}],handler:{close:function(){$("#node-address").text("");
$("#node-id").text("");
$("#node-events").empty()
}}});
$("#cluster-filter").keyup(function(){e()
}).focus(function(){if($(this).hasClass(b.styles.filterList)){$(this).removeClass(b.styles.filterList).val("")
}}).blur(function(){if($(this).val()===""){$(this).addClass(b.styles.filterList).val(b.filterText)
}}).addClass(b.styles.filterList).val(b.filterText);
$("#cluster-filter-type").combo({options:[{text:"by address",value:"address"},{text:"by status",value:"status"}],select:function(u){e()
}});
$(window).resize(function(){nf.ClusterTable.resetTableSize()
});
var t=function(y,v,x,w,u){return'<img src="images/iconDetails.png" title="View Details" class="pointer" style="margin-top: 4px;" onclick="javascript:nf.ClusterTable.showNodeDetails(\''+y+"');\"/>"
};
var o=function(y,v,x,w,u){return g(u)
};
var l=function(y,v,x,w,u){if(u.primary===true){return x+", PRIMARY"
}else{return x
}};
var r=function(y,v,x,w,u){return nf.Common.formatValue(x)
};
var p=[{id:"moreDetails",name:"&nbsp;",sortable:false,resizable:false,formatter:t,width:50,maxWidth:50},{id:"node",field:"node",name:"Node Address",formatter:o,resizable:true,sortable:true},{id:"activeThreadCount",field:"activeThreadCount",name:"Active Thread Count",resizable:true,sortable:true},{id:"queued",field:"queued",name:'<span class="queued-title">Queue</span>&nbsp;/&nbsp;<span class="queued-size-title">Size</span>',resizable:true,sortable:true},{id:"status",field:"status",name:"Status",formatter:l,resizable:true,sortable:true},{id:"uptime",field:"nodeStartTime",name:"Uptime",formatter:r,resizable:true,sortable:true},{id:"heartbeat",field:"heartbeat",name:"Last Heartbeat",formatter:r,resizable:true,sortable:true}];
if(nf.Common.isAdmin()){var q=function(D,C,B,y,v){var z=false;
var x=false;
var u=false;
var A=v.primary;
if(v.status==="CONNECTED"||v.status==="CONNECTING"){if(A===false&&v.status==="CONNECTED"){u=true
}z=true
}else{if(v.status==="DISCONNECTED"){x=true
}}if(x){return'<img src="images/iconConnect.png" title="Connect" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.ClusterTable.promptForConnect(\''+D+'\');"/>&nbsp;<img src="images/iconDelete.png" title="Remove" class="pointer" onclick="javascript:nf.ClusterTable.promptForRemoval(\''+D+"');\"/>"
}else{if(z){var w='<img src="images/iconDisconnect.png" title="Disconnect" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.ClusterTable.promptForDisconnect(\''+D+"');\"/>";
if(u){w+='&nbsp;<img src="images/iconPrimary.png" title="Make Primary" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.ClusterTable.makePrimary(\''+D+"');\"/>"
}return w
}else{return'<div style="width: 16px; height: 16px;">&nbsp;</div>'
}}};
p.push({id:"action",label:"&nbsp;",formatter:q,resizable:false,sortable:false,width:80,maxWidth:80})
}var m={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:false,enableColumnReorder:false,autoEdit:false};
var n=new Slick.Data.DataView({inlineFilters:false});
n.setItems([],"nodeId");
n.setFilterArgs({searchString:i(),property:$("#cluster-filter-type").combo("getSelectedOption").value});
n.setFilter(a);
c({columnId:"userName",sortAsc:true},n);
var s=new Slick.Grid("#cluster-table",n,p,m);
s.setSelectionModel(new Slick.RowSelectionModel());
s.setSortColumn("node",true);
s.onSort.subscribe(function(v,u){c({columnId:u.sortCol.field,sortAsc:u.sortAsc},n)
});
n.onRowCountChanged.subscribe(function(v,u){s.updateRowCount();
s.render();
$("#displayed-nodes").text(u.current)
});
n.onRowsChanged.subscribe(function(v,u){s.invalidateRows(u.rows);
s.render()
});
$("#cluster-table").data("gridInstance",s);
$("#displayed-nodes").text("0")
},promptForConnect:function(o){var l=$("#cluster-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(l)){var n=l.getData();
var m=n.getItem(o);
nf.Dialog.showYesNoDialog({dialogContent:"Connect '"+g(m)+"' to this cluster?",overlayBackground:false,yesHandler:function(){k(m.nodeId)
}})
}},promptForDisconnect:function(o){var l=$("#cluster-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(l)){var n=l.getData();
var m=n.getItem(o);
nf.Dialog.showYesNoDialog({dialogContent:"Disconnect '"+g(m)+"' from the cluster?",overlayBackground:false,yesHandler:function(){j(m.nodeId)
}})
}},makePrimary:function(o){var l=$("#cluster-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(l)){var n=l.getData();
var m=n.getItem(o);
$.ajax({type:"PUT",url:b.urls.nodes+"/"+encodeURIComponent(m.nodeId),data:{primary:true},dataType:"json"}).done(function(p){var q=p.node;
n.beginUpdate();
n.updateItem(q.nodeId,q);
var r=n.getItems();
$.each(r,function(t,s){if(q.nodeId!==s.nodeId&&s.primary===true){s.primary=false;
s.status="CONNECTED";
n.updateItem(s.nodeId,s);
return false
}});
n.endUpdate()
}).fail(nf.Common.handleAjaxError)
}},promptForRemoval:function(o){var l=$("#cluster-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(l)){var n=l.getData();
var m=n.getItem(o);
nf.Dialog.showYesNoDialog({dialogContent:"Remove '"+g(m)+"' from the cluster?",overlayBackground:false,yesHandler:function(){d(m.nodeId)
}})
}},resetTableSize:function(){var l=$("#cluster-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(l)){l.resizeCanvas()
}},loadClusterTable:function(){return $.ajax({type:"GET",url:b.urls.cluster,dataType:"json"}).done(function(n){var l=n.cluster;
if(nf.Common.isDefinedAndNotNull(l.nodes)){var o=$("#cluster-table").data("gridInstance");
var m=o.getData();
m.setItems(l.nodes);
m.reSort();
o.invalidate();
$("#cluster-last-refreshed").text(l.generated);
$("#total-nodes").text(l.nodes.length)
}else{$("#total-nodes").text("0")
}}).fail(nf.Common.handleAjaxError)
},showNodeDetails:function(o){var l=$("#cluster-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(l)){var n=l.getData();
var m=n.getItem(o);
$.ajax({type:"GET",url:b.urls.nodes+"/"+encodeURIComponent(m.nodeId),dataType:"json"}).done(function(q){var s=q.node;
$("#node-id").text(s.nodeId);
$("#node-address").text(g(s));
var r=$("#node-events");
if($.isArray(s.events)&&s.events.length>0){var p=[];
$.each(s.events,function(t,u){p.push(u.timestamp+": "+u.message)
});
$("<div></div>").append(nf.Common.formatUnorderedList(p)).appendTo(r)
}else{r.append('<div><span class="unset">None</span></div>')
}$("#node-details-dialog").modal("show")
}).fail(nf.Common.handleAjaxError)
}}}
}());
