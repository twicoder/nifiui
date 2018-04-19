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
$(document).ready(function(){nf.History.init()
});
nf.History=(function(){var a={urls:{banners:"../nifi-api/controller/banners",controllerAbout:"../nifi-api/controller/about",authorities:"../nifi-api/controller/authorities"}};
var c=function(){return $.Deferred(function(d){$.ajax({type:"GET",url:a.urls.authorities,dataType:"json"}).done(function(e){if(nf.Common.isDefinedAndNotNull(e.authorities)){nf.Common.setAuthorities(e.authorities);
d.resolve()
}else{d.reject()
}}).fail(function(g,e,f){nf.Common.handleAjaxError(g,e,f);
d.reject()
})
}).promise()
};
var b=function(){nf.Common.addHoverEffect("#refresh-button","button-refresh","button-refresh-hover").click(function(){nf.HistoryTable.loadHistoryTable()
});
return $.Deferred(function(d){if(top===window){$.ajax({type:"GET",url:a.urls.banners,dataType:"json"}).done(function(i){if(nf.Common.isDefinedAndNotNull(i.banners)){if(nf.Common.isDefinedAndNotNull(i.banners.headerText)&&i.banners.headerText!==""){var f=$("#banner-header").text(i.banners.headerText).show();
var h=function(j){var k=$("#"+j);
k.css("top",(parseInt(f.css("height"),10)+parseInt(k.css("top"),10))+"px")
};
h("history")
}if(nf.Common.isDefinedAndNotNull(i.banners.footerText)&&i.banners.footerText!==""){var e=$("#banner-footer").text(i.banners.footerText).show();
var g=function(j){var k=$("#"+j);
k.css("bottom",parseInt(e.css("height"),10)+"px")
};
g("history")
}}d.resolve()
}).fail(function(g,e,f){nf.Common.handleAjaxError(g,e,f);
d.reject()
})
}else{d.resolve()
}}).promise()
};
return{init:function(){c().done(function(){nf.HistoryTable.init();
nf.HistoryTable.loadHistoryTable();
b().done(function(){nf.HistoryTable.resetTableSize();
$.ajax({type:"GET",url:a.urls.controllerAbout,dataType:"json"}).done(function(f){var d=f.about;
var e=d.title+" History";
document.title=e;
$("#history-header-text").text(e)
}).fail(nf.Common.handleAjaxError)
})
})
}}
}());
nf.HistoryTable=(function(){var d={defaultStartTime:"00:00:00",defaultEndTime:"23:59:59",filterText:"Filter",styles:{filterList:"filter-list",hidden:"hidden"},urls:{history:"../nifi-api/controller/history"}};
var f=function(){$("#action-details-dialog").modal({headerText:"Action Details",overlayBackground:false,buttons:[{buttonText:"Ok",handler:{click:function(){$("#action-details-dialog").modal("hide")
}}}],handler:{close:function(){$("#action-details").empty()
}}})
};
var c=function(){$("#history-filter").val("");
$("#history-filter-type").combo({options:[{text:"by source id",value:"by source id"},{text:"by user",value:"by user"}]});
$("#history-filter-start-date, #history-filter-end-date").datepicker({showAnim:"",showOtherMonths:true,selectOtherMonths:true});
$("#history-filter-start-date").datepicker("setDate","-14d");
$("#history-filter-end-date").datepicker("setDate","+0d");
$("#history-filter-start-time").val(d.defaultStartTime);
$("#history-filter-end-time").val(d.defaultEndTime);
$("#history-filter-dialog").modal({headerText:"Filter History",overlayBackground:false,buttons:[{buttonText:"Filter",handler:{click:function(){$("#history-filter-dialog").modal("hide");
var h={};
var k=$("#history-filter").val();
if(k!==""){var g=$("#history-filter-type").combo("getSelectedOption").text;
if(g==="by source id"){h.sourceId=k
}else{if(g==="by user"){h.userName=k
}}}var j=$.trim($("#history-filter-start-date").val());
var i=$.trim($("#history-filter-start-time").val());
if(j!==""){if(i===""){i=d.defaultStartTime;
$("#history-filter-start-time").val(i)
}h.startDate=j+" "+i
}var m=$.trim($("#history-filter-end-date").val());
var n=$.trim($("#history-filter-end-time").val());
if(m!==""){if(n===""){n=d.defaultEndTime;
$("#history-filter-end-time").val(n)
}h.endDate=m+" "+n
}var o=$("#history-table").data("gridInstance");
var l=o.getData();
l.setFilterArgs(h);
nf.HistoryTable.loadHistoryTable()
}}},{buttonText:"Cancel",handler:{click:function(){$("#history-filter-dialog").modal("hide")
}}}]})
};
var a=function(){$("#history-purge-end-date").datepicker({showAnim:"",showOtherMonths:true,selectOtherMonths:true});
$("#history-purge-end-date").datepicker("setDate","-1m");
$("#history-purge-end-time").val(d.defaultStartTime);
$("#history-purge-dialog").modal({headerText:"Purge History",overlayBackground:false,buttons:[{buttonText:"Purge",handler:{click:function(){$("#history-purge-dialog").modal("hide");
var j=$.trim($("#history-purge-end-date").val());
var g=$.trim($("#history-purge-end-time").val());
if(j!==""){if(g===""){g=d.defaultStartTime;
$("#history-purge-end-time").val(g)
}var h=j+" "+g;
var i=$(".timezone:first").text();
nf.Dialog.showYesNoDialog({dialogContent:"Are you sure you want to delete all history before '"+nf.Common.escapeHtml(h)+" "+nf.Common.escapeHtml(i)+"'?",overlayBackground:false,yesHandler:function(){e(h)
}})
}else{nf.Dialog.showOkDialog({dialogContent:"The end date must be specified.",overlayBackground:false})
}}}},{buttonText:"Cancel",handler:{click:function(){$("#history-purge-dialog").modal("hide")
}}}]})
};
var b=function(){$(window).resize(function(){nf.HistoryTable.resetTableSize()
});
$("#clear-history-filter").click(function(){$("#history-filter-overview").hide();
var m=$("#history-table").data("gridInstance");
var l=m.getData();
l.setFilterArgs({});
nf.HistoryTable.loadHistoryTable()
});
nf.Common.addHoverEffect("#history-filter-button","button-normal","button-over").click(function(){$("#history-filter-dialog").modal("show")
});
var h=function(p,m,o,n,l){return'<img src="images/iconDetails.png" title="View Details" class="pointer" style="margin-top: 4px;" onclick="javascript:nf.HistoryTable.showActionDetails(\''+p+"');\"/>"
};
var i=[{id:"moreDetails",name:"&nbsp;",sortable:false,resizable:false,formatter:h,width:50,maxWidth:50},{id:"timestamp",name:"Date/Time",field:"timestamp",sortable:true,resizable:true},{id:"sourceName",name:"Name",field:"sourceName",sortable:true,resizable:true},{id:"sourceType",name:"Type",field:"sourceType",sortable:true,resizable:true},{id:"operation",name:"Operation",field:"operation",sortable:true,resizable:true},{id:"userName",name:"User",field:"userName",sortable:true,resizable:true}];
var g={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:false,enableColumnReorder:false,autoEdit:false};
var k=new nf.HistoryModel();
var j=new Slick.Grid("#history-table",k,i,g);
j.setSelectionModel(new Slick.RowSelectionModel());
j.registerPlugin(new Slick.AutoTooltips());
j.onSort.subscribe(function(n,m){k.setSort(m.sortCol.field,m.sortAsc?1:-1);
var l=j.getViewport();
k.ensureData(l.top,l.bottom)
});
j.setSortColumn("timestamp",false);
j.onViewportChanged.subscribe(function(n,m){var l=j.getViewport();
k.ensureData(l.top,l.bottom)
});
k.onDataLoaded.subscribe(function(n,l){for(var m=l.from;
m<=l.to;
m++){j.invalidateRow(m)
}j.updateRowCount();
j.render()
});
$("#history-table").data("gridInstance",j);
if(nf.Common.isAdmin()){$("#history-purge-button").on("click",function(){$("#history-purge-dialog").modal("show")
}).show()
}};
var e=function(g){$.ajax({type:"DELETE",url:d.urls.history+"?"+$.param({endDate:g}),dataType:"json"}).done(function(){nf.HistoryTable.loadHistoryTable()
}).fail(nf.Common.handleAjaxError)
};
return{init:function(){f();
c();
a();
b()
},resetTableSize:function(){var g=$("#history-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(g)){g.resizeCanvas()
}},loadHistoryTable:function(){var h=$("#history-table").data("gridInstance");
var g=h.getData();
g.clear();
h.onViewportChanged.notify()
},showActionDetails:function(g){var k=$("#history-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(k)){var j=k.getData();
var i=j.getItem(g);
var h=$("<div></div>").append($('<div class="action-detail"><div class="history-details-name">Id</div>'+nf.Common.escapeHtml(i.sourceId)+"</div>"));
var m=i.componentDetails;
if(nf.Common.isDefinedAndNotNull(m)){if(i.sourceType==="Processor"){h.append($('<div class="action-detail"><div class="history-details-name">Type</div>'+nf.Common.escapeHtml(m.type)+"</div>"))
}else{if(i.sourceType==="RemoteProcessGroup"){h.append($('<div class="action-detail"><div class="history-details-name">Uri</div>'+nf.Common.formatValue(m.uri)+"</div>"))
}}}var l=i.actionDetails;
if(nf.Common.isDefinedAndNotNull(l)){if(i.operation==="Configure"){h.append($('<div class="action-detail"><div class="history-details-name">Name</div>'+nf.Common.formatValue(l.name)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Value</div>'+nf.Common.formatValue(l.value)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Previous Value</div>'+nf.Common.formatValue(l.previousValue)+"</div>"))
}else{if(i.operation==="Connect"||i.operation==="Disconnect"){h.append($('<div class="action-detail"><div class="history-details-name">Source Id</div>'+nf.Common.escapeHtml(l.sourceId)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Source Name</div>'+nf.Common.formatValue(l.sourceName)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Source Type</div>'+nf.Common.escapeHtml(l.sourceType)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Relationship(s)</div>'+nf.Common.formatValue(l.relationship)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Destination Id</div>'+nf.Common.escapeHtml(l.destinationId)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Destination Name</div>'+nf.Common.formatValue(l.destinationName)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Destination Type</div>'+nf.Common.escapeHtml(l.destinationType)+"</div>"))
}else{if(i.operation==="Move"){h.append($('<div class="action-detail"><div class="history-details-name">Group</div>'+nf.Common.formatValue(l.group)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Group Id</div>'+nf.Common.escapeHtml(l.groupId)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Previous Group</div>'+nf.Common.formatValue(l.previousGroup)+"</div>")).append($('<div class="action-detail"><div class="history-details-name">Previous Group Id</div>'+nf.Common.escapeHtml(l.previousGroupId)+"</div>"))
}else{if(i.operation==="Purge"){h.append($('<div class="action-detail"><div class="history-details-name">End Date</div>'+nf.Common.escapeHtml(l.endDate)+"</div>"))
}}}}}$("#action-details").append(h);
$("#action-details-dialog").modal("show")
}}}
}());
(function(b){function a(){var i=50;
var t={length:0};
var o={};
var c=null;
var m=1;
var g=null;
var j=null;
var r=new Slick.Event();
var n=new Slick.Event();
var s=function(){};
var k=function(w,v){for(var u=w;
u<=v;
u++){if(t[u]===undefined||t[u]===null){return false
}}return true
};
var q=function(){for(var u in t){delete t[u]
}t.length=0
};
var f=function(z,y){if(j){j.abort();
for(var u=j.fromPage;
u<=j.toPage;
u++){t[u*i]=undefined
}}if(z<0){z=0
}var x=Math.floor(z/i);
var v=Math.floor(y/i);
while(t[x*i]!==undefined&&x<v){x++
}while(t[v*i]!==undefined&&x<v){v--
}if(x>v||((x===v)&&t[x*i]!==undefined)){return
}var w={};
w=b.extend({count:((v-x)*i)+i,offset:x*i},w);
if(c!==null){w.sortColumn=c;
w.sortOrder=(m>0)?"asc":"desc"
}w=b.extend(w,o);
if(g!==null){clearTimeout(g)
}g=setTimeout(function(){for(var A=x;
A<=v;
A++){t[A*i]=null
}r.notify({from:z,to:y});
var B=b.ajax({type:"GET",url:"../nifi-api/controller/history",data:w,dataType:"json"}).done(function(C){var E=C.history;
var G=x*i;
var F=G+E.actions.length;
t.length=E.total;
for(var D=0;
D<E.actions.length;
D++){t[G+D]=E.actions[D];
t[G+D].index=G+D
}b("#history-last-refreshed").text(E.lastRefreshed);
b(".timezone").text(nf.Common.substringAfterLast(E.lastRefreshed," "));
if(w.sourceId||w.userName||w.startDate||w.endDate){b("#history-filter-overview").show()
}else{b("#history-filter-overview").hide()
}B=null;
n.notify({from:G,to:F})
}).fail(nf.Common.handleAjaxError);
B.fromPage=x;
B.toPage=v
},50)
};
var h=function(w,v){for(var u=w;
u<=v;
u++){delete t[u]
}f(w,v)
};
var e=function(v,u){c=v;
m=u;
q()
};
var p=function(u){o=u;
q()
};
var l=function(u){return t[u]
};
var d=function(){return t.length
};
s();
return{data:t,clear:q,isDataLoaded:k,ensureData:f,reloadData:h,setSort:e,setFilterArgs:p,getItem:l,getLength:d,onDataLoading:r,onDataLoaded:n}
}b.extend(true,window,{nf:{HistoryModel:a}})
})(jQuery);
