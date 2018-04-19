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
nf.ProcessorDetails=(function(){var a=function(s,q){e();
var l=$("#read-only-processor-properties").data("gridInstance");
var r=l.getData();
var p=r.getItem(s);
if(nf.Common.isDefinedAndNotNull(p.value)){var f=$("#processor-details").data("processorDetails");
var n=f.config.descriptors[p.property];
if(!c(n)){var i=$(l.getCellNode(s,q));
var j=i.offset();
var g=$('<div class="processor-property-detail"></div>').css({"z-index":100000,position:"absolute",background:"white",padding:"5px",overflow:"hidden",border:"3px solid #365C6A","box-shadow":"4px 4px 6px rgba(0, 0, 0, 0.9)",cursor:"move",top:j.top-5,left:j.left-5}).appendTo("body");
var m=null;
if(d(n)){var h="nfel";
var k=h+"-editor";
g.draggable({cancel:"input, textarea, pre, .button, ."+k,containment:"parent"});
m=$("<div></div>").addClass(k).appendTo(g).nfeditor({languageId:h,width:i.width(),content:p.value,minWidth:175,minHeight:100,readOnly:true,resizable:true})
}else{g.draggable({containment:"parent"});
$('<textarea hidefocus rows="5" readonly="readonly"/>').css({background:"white",width:i.width()+"px",height:"80px","border-width":"0",outline:"0","overflow-y":"auto",resize:"both","margin-bottom":"28px"}).text(p.value).appendTo(g)
}var o=$('<div class="button button-normal">Ok</div>').on("click",function(){if(m!==null){m.nfeditor("destroy")
}g.hide().remove()
});
$("<div></div>").css({position:"absolute",bottom:"0",left:"0",right:"0",padding:"0 3px 5px"}).append(o).append('<div class="clear"></div>').appendTo(g)
}}};
var e=function(){$("body").children("div.processor-property-detail").hide().remove()
};
var c=function(f){if(nf.Common.isDefinedAndNotNull(f)){return f.sensitive===true
}else{return false
}};
var d=function(f){if(nf.Common.isDefinedAndNotNull(f)){return f.supportsEl===true
}else{return false
}};
var b=function(i){var f=$('<div class="relationship-name ellipsis"></div>').text(i.name);
if(i.autoTerminate===true){f.css("font-weight","bold")
}var h=$('<div class="processor-relationship-container"></div>').append(f).appendTo("#read-only-auto-terminate-relationship-names");
if(!nf.Common.isBlank(i.description)){var g=$('<div class="relationship-description"></div>').text(i.description);
h.append(g)
}return h
};
return{init:function(k){k=nf.Common.isDefinedAndNotNull(k)?k:true;
$("#processor-details-tabs").tabbs({tabStyle:"tab",selectedTabStyle:"selected-tab",tabs:[{name:"Settings",tabContentId:"details-standard-settings-tab-content"},{name:"Scheduling",tabContentId:"details-scheduling-tab-content"},{name:"Properties",tabContentId:"details-processor-properties-tab-content"},{name:"Comments",tabContentId:"details-processor-comments-tab-content"}],select:function(){if($(this).text()==="Properties"){var m=$("#read-only-processor-properties").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(m)){m.resizeCanvas()
}}var n=$("#read-only-auto-terminate-relationship-names");
if(n.is(":visible")&&n.get(0).scrollHeight>n.innerHeight()){n.css("border-width","1px")
}}});
$("#processor-details").modal({headerText:"Processor Details",overlayBackground:k,handler:{close:function(){$("#read-only-auto-terminate-relationship-names").css("border-width","0").empty();
var m=$("#read-only-processor-properties");
nf.Common.cleanUpTooltips(m,"img.icon-info");
var n=m.data("gridInstance");
var o=n.getData();
o.setItems([]);
nf.Common.clearField("read-only-processor-id");
nf.Common.clearField("read-only-processor-type");
nf.Common.clearField("read-only-processor-name");
nf.Common.clearField("read-only-concurrently-schedulable-tasks");
nf.Common.clearField("read-only-scheduling-period");
nf.Common.clearField("read-only-penalty-duration");
nf.Common.clearField("read-only-yield-duration");
nf.Common.clearField("read-only-run-duration");
nf.Common.clearField("read-only-bulletin-level");
nf.Common.clearField("read-only-execution-status");
nf.Common.clearField("read-only-processor-comments");
$("#processor-details").removeData("processorDetails");
$("#processor-details").removeData("processorHistory");
e()
}}});
if(k){$("#processor-details").draggable({containment:"parent",handle:".dialog-header"})
}var j=function(v,u,t,q,o){var s=10;
var n=$("<div></div>");
var p=$("<span/>").addClass("table-cell").text(t).appendTo(n);
if(o.type==="required"){p.addClass("required")
}var m=$("#processor-details").data("processorDetails");
var r=m.config.descriptors[o.property];
if(nf.Common.isDefinedAndNotNull(r)){if(!nf.Common.isBlank(r.description)||!nf.Common.isBlank(r.defaultValue)||!nf.Common.isBlank(r.supportsEl)){$('<img class="icon-info" src="images/iconInfo.png" alt="Info" title="" style="float: right; margin-right: 6px; margin-top: 4px;" />').appendTo(n);
s=26
}}p.width(q.width-s).ellipsis();
return n.html()
};
var h=function(u,t,s,o,n){var r;
if(nf.Common.isDefinedAndNotNull(s)){var m=$("#processor-details").data("processorDetails");
var q=m.config.descriptors[n.property];
if(c(q)){r='<span class="table-cell sensitive">Sensitive value set</span>'
}else{if(s===""){r='<span class="table-cell blank">Empty string set</span>'
}else{r='<div class="table-cell value"><pre class="ellipsis">'+nf.Common.escapeHtml(s)+"</pre></div>"
}}}else{r='<span class="unset">No value set</span>'
}var p=$(r);
if(n.type==="required"){p.addClass("required")
}p.find(".ellipsis").width(o.width-10).ellipsis();
return $("<div/>").append(p).html()
};
var g=[{id:"property",field:"property",name:"Property",sortable:false,resizable:true,rerenderOnResize:true,formatter:j},{id:"value",field:"value",name:"Value",sortable:false,resizable:true,cssClass:"pointer",rerenderOnResize:true,formatter:h}];
var f={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:false,enableColumnReorder:false,autoEdit:false};
var i=new Slick.Data.DataView({inlineFilters:false});
i.setItems([]);
var l=new Slick.Grid("#read-only-processor-properties",i,g,f);
l.setSelectionModel(new Slick.RowSelectionModel());
l.onClick.subscribe(function(n,m){if(m.cell===1){a(m.row,m.cell);
n.stopImmediatePropagation()
}});
i.onRowCountChanged.subscribe(function(n,m){l.updateRowCount();
l.render()
});
i.onRowsChanged.subscribe(function(n,m){l.invalidateRows(m.rows);
l.render()
});
$("#read-only-processor-properties").data("gridInstance",l).on("mouseenter","div.slick-cell",function(t){var p=$(this).find("img.icon-info");
if(p.length&&!p.data("qtip")){var s=$(this).find("span.table-cell").text();
var o=$("#processor-details").data("processorDetails");
var m=o.config.descriptors[s];
var n=$("#processor-details").data("processorHistory");
var q=n.propertyHistory[s];
var r=nf.Common.formatPropertyTooltip(m,q);
if(nf.Common.isDefinedAndNotNull(r)){p.qtip($.extend({content:r},nf.Common.config.tooltipConfig))
}}})
},showDetails:function(h,i){var g=$.ajax({type:"GET",url:"../nifi-api/controller/process-groups/"+encodeURIComponent(h)+"/processors/"+encodeURIComponent(i),dataType:"json"}).done(function(m){if(nf.Common.isDefinedAndNotNull(m.processor)){var j=m.processor;
$("#processor-details").data("processorDetails",j);
nf.Common.populateField("read-only-processor-id",j.id);
nf.Common.populateField("read-only-processor-type",nf.Common.substringAfterLast(j.type,"."));
nf.Common.populateField("read-only-processor-name",j.name);
nf.Common.populateField("read-only-concurrently-schedulable-tasks",j.config.concurrentlySchedulableTaskCount);
nf.Common.populateField("read-only-scheduling-period",j.config.schedulingPeriod);
nf.Common.populateField("read-only-penalty-duration",j.config.penaltyDuration);
nf.Common.populateField("read-only-yield-duration",j.config.yieldDuration);
nf.Common.populateField("read-only-run-duration",nf.Common.formatDuration(j.config.runDurationMillis));
nf.Common.populateField("read-only-bulletin-level",j.config.bulletinLevel);
nf.Common.populateField("read-only-processor-comments",j.config.comments);
var k=true;
var l=j.config.schedulingStrategy;
if(l==="EVENT_DRIVEN"){k=false;
l="Event driven"
}else{if(l==="CRON_DRIVEN"){l="CRON driven"
}else{if(l==="TIMER_DRIVEN"){l="Timer driven"
}else{l="On primary node"
}}}nf.Common.populateField("read-only-scheduling-strategy",l);
if(k===true){$("#read-only-run-schedule").show()
}else{$("#read-only-run-schedule").hide()
}if(!nf.Common.isEmpty(j.relationships)){$.each(j.relationships,function(s,t){b(t)
})
}else{$("#read-only-auto-terminate-relationship-names").append('<div class="unset">This processor has no relationships.</div>')
}var o=$("#read-only-processor-properties").data("gridInstance");
var q=o.getData();
var p=j.config.properties;
var r=j.config.descriptors;
if(nf.Common.isDefinedAndNotNull(p)){q.beginUpdate();
var n=0;
$.each(p,function(t,v){var w=r[t];
var u="userDefined";
var s=t;
if(nf.Common.isDefinedAndNotNull(w)){if(w.required===true){u="required"
}else{if(w.dynamic===true){u="userDefined"
}else{u="optional"
}}s=w.displayName;
if(nf.Common.isNull(v)&&nf.Common.isDefinedAndNotNull(w.defaultValue)){v=w.defaultValue
}}q.addItem({id:n++,property:s,value:v,type:u})
});
q.endUpdate()
}}});
var f=$.ajax({type:"GET",url:"../nifi-api/controller/history/processors/"+encodeURIComponent(i),dataType:"json"}).done(function(j){var k=j.processorHistory;
$("#processor-details").data("processorHistory",k)
});
$.when(g,f).done(function(j){var m=j[0];
var k=m.processor;
var l=[{buttonText:"Ok",handler:{click:function(){$("#processor-details").modal("hide")
}}}];
if(nf.Common.isDefinedAndNotNull(nf.CustomProcessorUi)&&nf.Common.isDefinedAndNotNull(k.config.customUiUrl)&&k.config.customUiUrl!==""){l.push({buttonText:"Advanced",handler:{click:function(){$("#processor-details").modal("hide");
nf.CustomProcessorUi.showCustomUi(k.id,k.config.customUiUrl,false)
}}})
}$("#processor-details").modal("setButtonModel",l).modal("show");
$("#processor-details div.relationship-name").ellipsis();
var n=$("#read-only-auto-terminate-relationship-names");
if(n.is(":visible")&&n.get(0).scrollHeight>n.innerHeight()){n.css("border-width","1px")
}}).fail(function(l,j,k){if(l.status===400||l.status===404||l.status===409){nf.Dialog.showOkDialog({dialogContent:nf.Common.escapeHtml(l.responseText),overlayBackground:false})
}else{nf.Common.handleAjaxError(l,j,k)
}})
}}
}());
nf.ConnectionDetails=(function(){var g=function(l,n,m){if(m.type==="PROCESSOR"){return h(l,n,m)
}else{if(m.type==="FUNNEL"){return i(l,n,m)
}else{if(m.type==="REMOTE_OUTPUT_PORT"){return d(l,n,m)
}else{return k(l,n,m)
}}}};
var h=function(l,n,m){return $.ajax({type:"GET",url:"../nifi-api/controller/process-groups/"+encodeURIComponent(l)+"/processors/"+encodeURIComponent(m.id),dataType:"json"}).done(function(o){var p=o.processor;
var q=$('<div class="label"></div>').text(p.name);
var r=$("<div></div>").text(nf.Common.substringAfterLast(p.type,"."));
$("#read-only-connection-source-label").text("From processor");
$("#read-only-connection-source").append(q).append(r);
$("#read-only-connection-source-group-name").text(n)
})
};
var i=function(l,n,m){return $.Deferred(function(o){$("#read-only-connection-source-label").text("From funnel");
$("#read-only-connection-source").append("funnel");
$("#read-only-connection-source-group-name").text(n);
o.resolve()
}).promise()
};
var d=function(l,n,m){return $.ajax({type:"GET",url:"../nifi-api/controller/process-groups/"+encodeURIComponent(l)+"/remote-process-groups/"+encodeURIComponent(m.groupId),data:{verbose:true},dataType:"json"}).done(function(o){var p=o.remoteProcessGroup;
$("#read-only-connection-source-label").text("From output");
$("#read-only-connection-source").text(m.name);
$("#read-only-connection-source-group-name").text(p.name)
})
};
var k=function(l,n,m){return $.Deferred(function(o){if(l===m.groupId){$("#read-only-connection-source-label").text("From input");
$("#read-only-connection-source").text(m.name);
$("#read-only-connection-source-group-name").text(n);
o.resolve()
}else{$.ajax({type:"GET",url:"../nifi-api/controller/process-groups/"+encodeURIComponent(m.groupId),data:{verbose:true},dataType:"json"}).done(function(p){var q=p.processGroup;
$("#read-only-connection-source-label").text("From output");
$("#read-only-connection-source").text(m.name);
$("#read-only-connection-source-group-name").text(q.name);
o.resolve()
}).fail(function(){o.reject()
})
}}).promise()
};
var c=function(m,n,l){if(l.type==="PROCESSOR"){return a(m,n,l)
}else{if(l.type==="FUNNEL"){return j(m,n,l)
}else{if(l.type==="REMOTE_INPUT_PORT"){return f(m,n,l)
}else{return b(m,n,l)
}}}};
var a=function(m,n,l){return $.Deferred(function(o){$.ajax({type:"GET",url:"../nifi-api/controller/process-groups/"+encodeURIComponent(m)+"/processors/"+encodeURIComponent(l.id),dataType:"json"}).done(function(p){var q=p.processor;
var r=$('<div class="label"></div>').text(q.name);
var s=$("<div></div>").text(nf.Common.substringAfterLast(q.type,"."));
$("#read-only-connection-target-label").text("To processor");
$("#read-only-connection-target").append(r).append(s);
$("#read-only-connection-target-group-name").text(n);
o.resolve()
}).fail(function(){o.reject()
})
}).promise()
};
var j=function(m,n,l){return $.Deferred(function(o){$("#read-only-connection-target-label").text("To funnel");
$("#read-only-connection-target").append("funnel");
$("#read-only-connection-target-group-name").text(n);
o.resolve()
}).promise()
};
var f=function(m,n,l){return $.ajax({type:"GET",url:"../nifi-api/controller/process-groups/"+encodeURIComponent(m)+"/remote-process-groups/"+encodeURIComponent(l.groupId),data:{verbose:true},dataType:"json"}).done(function(o){var p=o.remoteProcessGroup;
$("#read-only-connection-target-label").text("To input");
$("#read-only-connection-target").text(l.name);
$("#read-only-connection-target-group-name").text(p.name)
})
};
var b=function(m,n,l){return $.Deferred(function(o){if(m===l.groupId){$("#read-only-connection-target-label").text("To output");
$("#read-only-connection-target").text(l.name);
$("#read-only-connection-target-group-name").text(n);
o.resolve()
}else{$.ajax({type:"GET",url:"../nifi-api/controller/process-groups/"+encodeURIComponent(l.groupId),data:{verbose:true},dataType:"json"}).done(function(p){var q=p.processGroup;
$("#read-only-connection-target-label").text("To input");
$("#read-only-connection-target").text(l.name);
$("#read-only-connection-target-group-name").text(q.name);
o.resolve()
}).fail(function(){o.reject()
})
}}).promise()
};
var e=function(l){$('<div class="available-relationship-container"></div>').append($('<div class="relationship-name"></div>').text(l)).appendTo("#read-only-relationship-names")
};
return{init:function(l){l=nf.Common.isDefinedAndNotNull(l)?l:true;
$("#connection-details-tabs").tabbs({tabStyle:"tab",selectedTabStyle:"selected-tab",tabs:[{name:"Details",tabContentId:"read-only-connection-details-tab-content"},{name:"Settings",tabContentId:"read-only-connection-settings-tab-content"}]});
$("#connection-details").modal({headerText:"Connection Details",overlayBackground:l,buttons:[{buttonText:"Ok",handler:{click:function(){$("#connection-details").modal("hide")
}}}],handler:{close:function(){$("#read-only-relationship-names").empty();
nf.Common.clearField("read-only-connection-name");
nf.Common.clearField("read-only-connection-id");
$("#read-only-connection-source-label").text("");
$("#read-only-connection-source").empty();
$("#read-only-connection-source-group-name").text("");
$("#read-only-connection-target-label").text("");
$("#read-only-connection-target").empty();
$("#read-only-connection-target-group-name").text("");
$("#read-only-relationship-names").css("border-width","0").empty();
$("#read-only-flow-file-expiration").text("");
$("#read-only-back-pressure-object-threshold").text("");
$("#read-only-back-pressure-data-size-threshold").text("");
$("#read-only-prioritizers").empty()
}}});
if(l){$("#connection-details").draggable({containment:"parent",handle:".dialog-header"})
}},showDetails:function(m,o){var n=$.ajax({type:"GET",url:"../nifi-api/controller/process-groups/"+encodeURIComponent(m),dataType:"json"});
var l=$.ajax({type:"GET",url:"../nifi-api/controller/process-groups/"+encodeURIComponent(m)+"/connections/"+encodeURIComponent(o),dataType:"json"});
$.when(n,l).done(function(t,r){var s=t[0];
var u=r[0];
if(nf.Common.isDefinedAndNotNull(s.processGroup)&&nf.Common.isDefinedAndNotNull(u.connection)){var v=s.processGroup;
var q=u.connection;
var w=g(v.id,v.name,q.source);
var p=c(v.id,v.name,q.destination);
$.when(w,p).done(function(){var y=q.availableRelationships;
var x=q.selectedRelationships;
if(nf.Common.isDefinedAndNotNull(y)||nf.Common.isDefinedAndNotNull(x)){$.each(y,function(D,C){e(C)
});
$.each(x,function(E,C){if($.inArray(C,y)===-1){var F=e(C);
$(F).children("div.relationship-name").addClass("undefined")
}var D=$("#read-only-relationship-names").children("div");
$.each(D.children("div.relationship-name"),function(H,G){var I=$(G);
if(I.text()===C){I.css("font-weight","bold")
}})
});
$("#selected-relationship-text").show();
$("#read-only-relationship-names-container").show()
}else{$("#selected-relationship-text").hide();
$("#read-only-relationship-names-container").hide()
}nf.Common.populateField("read-only-connection-name",q.name);
nf.Common.populateField("read-only-connection-id",q.id);
nf.Common.populateField("read-only-flow-file-expiration",q.flowFileExpiration);
nf.Common.populateField("read-only-back-pressure-object-threshold",q.backPressureObjectThreshold);
nf.Common.populateField("read-only-back-pressure-data-size-threshold",q.backPressureDataSizeThreshold);
if(nf.Common.isDefinedAndNotNull(q.prioritizers)&&q.prioritizers.length>0){var B=$("<ol></ol>").css("list-style","decimal inside none");
$.each(q.prioritizers,function(C,D){B.append($("<li></li>").text(nf.Common.substringAfterLast(D,".")))
});
$("#read-only-prioritizers").append(B)
}else{var z=$('<span class="unset">No value set</span>');
$("#read-only-prioritizers").append(z)
}$("#connection-details-tabs").find("li:first").click();
$("#connection-details").modal("show");
var A=$("#read-only-relationship-names");
if(A.is(":visible")&&A.get(0).scrollHeight>A.innerHeight()){A.css("border-width","1px")
}})
}}).fail(nf.Common.handleAjaxError)
}}
}());
$(document).ready(function(){nf.Summary.init()
});
nf.Summary=(function(){var a={urls:{banners:"../nifi-api/controller/banners",controllerAbout:"../nifi-api/controller/about",cluster:"../nifi-api/cluster"}};
var c=function(){return $.Deferred(function(d){$.ajax({type:"HEAD",url:a.urls.cluster}).done(function(){nf.SummaryTable.init(true).done(function(){d.resolve()
}).fail(function(){d.reject()
})
}).fail(function(g,e,f){if(g.status===404){nf.SummaryTable.init(false).done(function(){d.resolve()
}).fail(function(){d.reject()
})
}else{nf.Common.handleAjaxError(g,e,f);
d.reject()
}})
}).promise()
};
var b=function(){nf.Common.addHoverEffect("#refresh-button","button-refresh","button-refresh-hover").click(function(){nf.SummaryTable.loadProcessorSummaryTable()
});
nf.Common.addHoverEffect("#cluster-processor-refresh-button","button-refresh","button-refresh-hover").click(function(){nf.SummaryTable.loadClusterProcessorSummary($("#cluster-processor-id").text())
});
nf.Common.addHoverEffect("#cluster-connection-refresh-button","button-refresh","button-refresh-hover").click(function(){nf.SummaryTable.loadClusterConnectionSummary($("#cluster-connection-id").text())
});
return $.Deferred(function(d){if(top===window){$.ajax({type:"GET",url:a.urls.banners,dataType:"json"}).done(function(i){if(nf.Common.isDefinedAndNotNull(i.banners)){if(nf.Common.isDefinedAndNotNull(i.banners.headerText)&&i.banners.headerText!==""){var f=$("#banner-header").text(i.banners.headerText).show();
var h=function(j){var k=$("#"+j);
k.css("top",(parseInt(f.css("height"),10)+parseInt(k.css("top"),10))+"px")
};
h("summary")
}if(nf.Common.isDefinedAndNotNull(i.banners.footerText)&&i.banners.footerText!==""){var e=$("#banner-footer").text(i.banners.footerText).show();
var g=function(j){var k=$("#"+j);
k.css("bottom",parseInt(e.css("height"),10)+"px")
};
g("summary")
}}d.resolve()
}).fail(function(g,e,f){nf.Common.handleAjaxError(g,e,f);
d.reject()
})
}else{d.resolve()
}}).promise()
};
return{init:function(){c().done(function(){nf.SummaryTable.loadProcessorSummaryTable().done(function(){b().done(function(){nf.SummaryTable.resetTableSize();
$.ajax({type:"GET",url:a.urls.controllerAbout,dataType:"json"}).done(function(f){var e=f.about;
var g=e.title+" Summary";
document.title=g;
$("#status-header-text").text(g)
}).fail(nf.Common.handleAjaxError);
var d=function(){$("body").css({height:$(window).height()+"px",width:$(window).width()+"px"})
};
$(window).resize(d);
d()
})
})
})
}}
}());
nf.SummaryTable=(function(){var p={filterText:"Filter",styles:{filterList:"summary-filter-list"},urls:{status:"../nifi-api/controller/process-groups/root/status",processGroups:"../nifi-api/controller/process-groups/",clusterProcessor:"../nifi-api/cluster/processors/",clusterConnection:"../nifi-api/cluster/connections/",clusterInputPort:"../nifi-api/cluster/input-ports/",clusterOutputPort:"../nifi-api/cluster/output-ports/",clusterRemoteProcessGroup:"../nifi-api/cluster/remote-process-groups/",systemDiagnostics:"../nifi-api/system-diagnostics",controllerConfig:"../nifi-api/controller/config",d3Script:"js/d3/d3.min.js",statusHistory:"js/nf/nf-status-history.js"}};
var d=function(){return $.Deferred(function(s){if(nf.Common.SUPPORTS_SVG){nf.Common.cachedScript(p.urls.d3Script).done(function(){var t=$.ajax({type:"GET",url:p.urls.controllerConfig,dataType:"json"});
$.when(t,nf.Common.cachedScript(p.urls.statusHistory)).done(function(v){var w=v[0];
var u=w.config;
nf.StatusHistory.init(u.timeOffset);
s.resolve()
}).fail(function(){s.reject()
})
}).fail(function(){s.reject()
})
}else{s.resolve()
}}).promise()
};
var r=function(t,s){if(top!==window){if(nf.Common.isDefinedAndNotNull(parent.nf)&&nf.Common.isDefinedAndNotNull(parent.nf.CanvasUtils)&&nf.Common.isDefinedAndNotNull(parent.nf.Shell)){parent.nf.CanvasUtils.showComponent(t,s);
parent.$("#shell-close-button").click()
}}};
var i=function(av){$("#summary-filter").keyup(function(){q()
}).focus(function(){if($(this).hasClass(p.styles.filterList)){$(this).removeClass(p.styles.filterList).val("")
}}).blur(function(){if($(this).val()===""){$(this).addClass(p.styles.filterList).val(p.filterText)
}}).addClass(p.styles.filterList).val(p.filterText);
$("#summary-tabs").tabbs({tabStyle:"summary-tab",selectedTabStyle:"summary-selected-tab",tabs:[{name:"Processors",tabContentId:"processor-summary-tab-content"},{name:"Input Ports",tabContentId:"input-port-summary-tab-content"},{name:"Output Ports",tabContentId:"output-port-summary-tab-content"},{name:"Remote Process Groups",tabContentId:"remote-process-group-summary-tab-content"},{name:"Connections",tabContentId:"connection-summary-tab-content"}],select:function(){var aJ=$(this).text();
if(aJ==="Processors"){var aI=$("#processor-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(aI)){aI.resizeCanvas();
$("#displayed-items").text(nf.Common.formatInteger(aI.getData().getLength()));
$("#total-items").text(nf.Common.formatInteger(aI.getData().getLength()))
}$("#summary-filter-type").combo({options:[{text:"by name",value:"name"},{text:"by type",value:"type"}],select:function(aN){q()
}})
}else{if(aJ==="Connections"){var aH=$("#connection-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(aH)){aH.resizeCanvas();
$("#displayed-items").text(nf.Common.formatInteger(aH.getData().getLength()));
$("#total-items").text(nf.Common.formatInteger(aH.getData().getLength()))
}$("#summary-filter-type").combo({options:[{text:"by source",value:"sourceName"},{text:"by name",value:"name"},{text:"by destination",value:"destinationName"}],select:function(aN){q()
}})
}else{if(aJ==="Input Ports"){var aM=$("#input-port-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(aM)){aM.resizeCanvas();
$("#displayed-items").text(nf.Common.formatInteger(aM.getData().getLength()));
$("#total-items").text(nf.Common.formatInteger(aM.getData().getLength()))
}$("#summary-filter-type").combo({options:[{text:"by name",value:"name"}],select:function(aN){q()
}})
}else{if(aJ==="Output Ports"){var aL=$("#output-port-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(aL)){aL.resizeCanvas();
$("#displayed-items").text(nf.Common.formatInteger(aL.getData().getLength()));
$("#total-items").text(nf.Common.formatInteger(aL.getData().getLength()))
}$("#summary-filter-type").combo({options:[{text:"by name",value:"name"}],select:function(aN){q()
}})
}else{var aK=$("#remote-process-group-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(aK)){aK.resizeCanvas();
$("#displayed-items").text(nf.Common.formatInteger(aK.getData().getLength()));
$("#total-items").text(nf.Common.formatInteger(aK.getData().getLength()))
}$("#summary-filter-type").combo({options:[{text:"by name",value:"name"},{text:"by uri",value:"targetUri"}],select:function(aN){q()
}})
}}}}$("#summary-filter").addClass(p.styles.filterList).val(p.filterText);
q()
}});
$(window).resize(function(){nf.SummaryTable.resetTableSize()
});
var aB=function(aM,aI,aL,aK,aH){var aJ='<img src="images/iconDetails.png" title="View Details" class="pointer" style="margin-top: 5px; float: left;" onclick="javascript:nf.SummaryTable.showProcessorDetails(\''+aM+"');\"/>";
if(!nf.Common.isEmpty(aH.bulletins)){aJ+='<img src="images/iconBulletin.png" class="has-bulletins" style="margin-top: 5px; margin-left: 5px; float: left;"/><span class="hidden row-id">'+nf.Common.escapeHtml(aH.id)+"</span>"
}return aJ
};
var V=function(aL,aI,aK,aJ,aH){return aH.read+" / "+aH.written
};
var ac=function(aL,aI,aK,aJ,aH){return nf.Common.formatInteger(aH.tasks)+" / "+aH.tasksDuration
};
var au=function(aL,aI,aK,aJ,aH){return nf.Common.formatValue(aK)
};
var F=function(aN,aI,aM,aJ,aH){var aL="";
if(nf.Common.isDefinedAndNotNull(aH.activeThreadCount)&&aH.activeThreadCount>0){aL="("+aH.activeThreadCount+")"
}var aK='<div class="'+nf.Common.escapeHtml(aM.toLowerCase())+'" style="margin-top: 3px;"></div>';
return aK+'<div class="status-text" style="margin-top: 4px;">'+nf.Common.escapeHtml(aM)+'</div><div style="float: left; margin-left: 4px;">'+nf.Common.escapeHtml(aL)+"</div>"
};
var E={id:"name",field:"name",name:"Name",sortable:true,resizable:true};
var ar={id:"runStatus",field:"runStatus",name:"Run Status",formatter:F,sortable:true};
var w={id:"input",field:"input",name:'<span class="input-title">In</span>&nbsp;/&nbsp;<span class="input-size-title">Size</span>&nbsp;<span style="font-weight: normal; overflow: hidden;">5 min</span>',toolTip:"Count / data size in the last 5 min",sortable:true,resizable:true};
var am={id:"io",field:"io",name:'<span class="read-title">Read</span>&nbsp;/&nbsp;<span class="written-title">Write</span>&nbsp;<span style="font-weight: normal; overflow: hidden;">5 min</span>',toolTip:"Data size in the last 5 min",formatter:V,sortable:true,resizable:true};
var R={id:"output",field:"output",name:'<span class="output-title">Out</span>&nbsp;/&nbsp;<span class="output-size-title">Size</span>&nbsp;<span style="font-weight: normal; overflow: hidden;">5 min</span>',toolTip:"Count / data size in the last 5 min",sortable:true,resizable:true};
var U={id:"tasks",field:"tasks",name:'<span class="tasks-title">Tasks</span>&nbsp;/&nbsp;<span class="time-title">Time</span>&nbsp;<span style="font-weight: normal; overflow: hidden;">5 min</span>',toolTip:"Count / duration in the last 5 min",formatter:ac,sortable:true,resizable:true};
var s=[{id:"moreDetails",field:"moreDetails",name:"&nbsp;",resizable:false,formatter:aB,sortable:true,width:50,maxWidth:50},E,{id:"type",field:"type",name:"Type",sortable:true,resizable:true},ar,w,am,R,U];
if(av){nf.ClusterSearch.init()
}var ad=(top!==window);
if(av||ad||nf.Common.SUPPORTS_SVG){var ap=function(aM,aI,aL,aK,aH){var aJ="";
if(ad){aJ+='<img src="images/iconGoTo.png" title="Go To" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.goToProcessor(\''+aM+"');\"/>&nbsp;"
}if(nf.Common.SUPPORTS_SVG){if(av){aJ+='<img src="images/iconChart.png" title="Show History" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showClusterProcessorStatusHistory(\''+aM+"');\"/>&nbsp;"
}else{aJ+='<img src="images/iconChart.png" title="Show History" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showProcessorStatusHistory(\''+aM+"');\"/>&nbsp;"
}}if(av){aJ+='<img src="images/iconClusterSmall.png" title="Show Details" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showClusterProcessorSummary(\''+aM+"');\"/>&nbsp;"
}return aJ
};
s.push({id:"action",name:"&nbsp;",formatter:ap,resizable:false,sortable:false,width:75,maxWidth:75})
}var aD={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var t=new Slick.Data.DataView({inlineFilters:false});
t.setItems([]);
t.setFilterArgs({searchString:"",property:"name"});
t.setFilter(g);
o("processor-summary-table",{columnId:"name",sortAsc:true},t);
var aw=new Slick.Grid("#processor-summary-table",t,s,aD);
aw.setSelectionModel(new Slick.RowSelectionModel());
aw.registerPlugin(new Slick.AutoTooltips());
aw.setSortColumn("name",true);
aw.onSort.subscribe(function(aI,aH){o("processor-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},t)
});
t.onRowCountChanged.subscribe(function(aI,aH){aw.updateRowCount();
aw.render();
if($("#processor-summary-table").is(":visible")){$("#displayed-items").text(nf.Common.formatInteger(aH.current))
}});
t.onRowsChanged.subscribe(function(aI,aH){aw.invalidateRows(aH.rows);
aw.render()
});
$("#processor-summary-table").data("gridInstance",aw).on("mouseenter","div.slick-cell",function(aL){var aI=$(this).find("img.has-bulletins");
if(aI.length&&!aI.data("qtip")){var aM=$(this).find("span.row-id").text();
var aH=t.getItemById(aM);
var aK=nf.Common.getFormattedBulletins(aH.bulletins);
var aJ=nf.Common.formatUnorderedList(aK);
if(nf.Common.isDefinedAndNotNull(aJ)){aI.qtip($.extend({content:aJ,position:{target:"mouse",viewport:$(window),adjust:{x:8,y:8,method:"flipinvert flipinvert"}}},nf.Common.config.tooltipConfig))
}}});
$("#cluster-processor-summary-dialog").modal({headerText:"Cluster Processor Summary",overlayBackground:false,buttons:[{buttonText:"Close",handler:{click:function(){$("#cluster-processor-id").text("");
$("#cluster-processor-name").text("");
this.modal("hide")
}}}],handler:{close:function(){$("#summary-loading-container").show()
}}});
var ao=[{id:"node",field:"node",name:"Node",sortable:true,resizable:true},ar,w,am,R,U];
var ae={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var K=new Slick.Data.DataView({inlineFilters:false});
K.setItems([]);
o("cluster-processor-summary-table",{columnId:"node",sortAsc:true},K);
var x=new Slick.Grid("#cluster-processor-summary-table",K,ao,ae);
x.setSelectionModel(new Slick.RowSelectionModel());
x.registerPlugin(new Slick.AutoTooltips());
x.setSortColumn("node",true);
x.onSort.subscribe(function(aI,aH){o("cluster-processor-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},K)
});
K.onRowCountChanged.subscribe(function(aI,aH){x.updateRowCount();
x.render()
});
K.onRowsChanged.subscribe(function(aI,aH){x.invalidateRows(aH.rows);
x.render()
});
$("#cluster-processor-summary-table").data("gridInstance",x);
var aA=function(aL,aI,aK,aJ,aH){return'<img src="images/iconDetails.png" title="View Details" class="pointer" style="margin-top: 5px;" onclick="javascript:nf.SummaryTable.showConnectionDetails(\''+aL+"');\"/>"
};
var M={id:"queued",field:"queued",name:'<span class="queued-title">Queue</span>&nbsp;/&nbsp;<span class="queued-size-title">Size</span>',sortable:true,resize:true};
var v=[{id:"moreDetails",name:"&nbsp;",sortable:false,resizable:false,formatter:aA,width:50,maxWidth:50},{id:"sourceName",field:"sourceName",name:"Source Name",sortable:true,resizable:true},{id:"name",field:"name",name:"Name",sortable:true,resizable:true,formatter:au},{id:"destinationName",field:"destinationName",name:"Destination Name",sortable:true,resizable:true},w,M,R];
if(av||ad||nf.Common.SUPPORTS_SVG){var z=function(aM,aI,aL,aK,aH){var aJ="";
if(ad){aJ+='<img src="images/iconGoTo.png" title="Go To" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.goToConnection(\''+aM+"');\"/>&nbsp;"
}if(nf.Common.SUPPORTS_SVG){if(av){aJ+='<img src="images/iconChart.png" title="Show History" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showClusterConnectionStatusHistory(\''+aM+"');\"/>&nbsp;"
}else{aJ+='<img src="images/iconChart.png" title="Show History" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showConnectionStatusHistory(\''+aM+"');\"/>&nbsp;"
}}if(av){aJ+='<img src="images/iconClusterSmall.png" title="Show Details" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showClusterConnectionSummary(\''+aM+"');\"/>&nbsp;"
}return aJ
};
v.push({id:"action",name:"&nbsp;",formatter:z,resizable:false,sortable:false,width:75,maxWidth:75})
}var aa={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var ab=new Slick.Data.DataView({inlineFilters:false});
ab.setItems([]);
ab.setFilterArgs({searchString:"",property:"sourceName"});
ab.setFilter(g);
o("connection-summary-table",{columnId:"sourceName",sortAsc:true},ab);
var S=new Slick.Grid("#connection-summary-table",ab,v,aa);
S.setSelectionModel(new Slick.RowSelectionModel());
S.registerPlugin(new Slick.AutoTooltips());
S.setSortColumn("sourceName",true);
S.onSort.subscribe(function(aI,aH){o("connection-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},ab)
});
ab.onRowCountChanged.subscribe(function(aI,aH){S.updateRowCount();
S.render();
if($("#connection-summary-table").is(":visible")){$("#displayed-items").text(nf.Common.formatInteger(aH.current))
}});
ab.onRowsChanged.subscribe(function(aI,aH){S.invalidateRows(aH.rows);
S.render()
});
$("#connection-summary-table").data("gridInstance",S);
$("#cluster-connection-summary-dialog").modal({headerText:"Cluster Connection Summary",overlayBackground:false,buttons:[{buttonText:"Close",handler:{click:function(){$("#cluster-connection-id").text("");
$("#cluster-connection-name").text("");
this.modal("hide")
}}}],handler:{close:function(){$("#summary-loading-container").show()
}}});
var at=[{id:"node",field:"node",name:"Node",sortable:true,resizable:true},w,M,R];
var N={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var A=new Slick.Data.DataView({inlineFilters:false});
A.setItems([]);
o("cluster-connection-summary-table",{columnId:"node",sortAsc:true},A);
var aF=new Slick.Grid("#cluster-connection-summary-table",A,at,N);
aF.setSelectionModel(new Slick.RowSelectionModel());
aF.registerPlugin(new Slick.AutoTooltips());
aF.setSortColumn("node",true);
aF.onSort.subscribe(function(aI,aH){o("cluster-connection-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},A)
});
A.onRowCountChanged.subscribe(function(aI,aH){aF.updateRowCount();
aF.render()
});
A.onRowsChanged.subscribe(function(aI,aH){aF.invalidateRows(aH.rows);
aF.render()
});
$("#cluster-connection-summary-table").data("gridInstance",aF);
var az=function(aM,aI,aL,aK,aH){var aJ="";
if(!nf.Common.isEmpty(aH.bulletins)){aJ+='<img src="images/iconBulletin.png" class="has-bulletins" style="margin-top: 5px; margin-left: 5px; float: left;"/><span class="hidden row-id">'+nf.Common.escapeHtml(aH.id)+"</span>"
}return aJ
};
var T=[{id:"moreDetails",field:"moreDetails",name:"&nbsp;",resizable:false,formatter:az,sortable:true,width:50,maxWidth:50},E,ar,R];
if(av||ad){var aj=function(aM,aI,aL,aK,aH){var aJ="";
if(ad){aJ+='<img src="images/iconGoTo.png" title="Go To" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.goToInputPort(\''+aM+"');\"/>&nbsp;"
}if(av){aJ+='<img src="images/iconClusterSmall.png" title="Show Details" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showClusterInputPortSummary(\''+aM+"');\"/>&nbsp;"
}return aJ
};
T.push({id:"action",name:"&nbsp;",formatter:aj,resizable:false,sortable:false,width:75,maxWidth:75})
}var ag={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var W=new Slick.Data.DataView({inlineFilters:false});
W.setItems([]);
W.setFilterArgs({searchString:"",property:"name"});
W.setFilter(g);
o("input-port-summary-table",{columnId:"name",sortAsc:true},W);
var G=new Slick.Grid("#input-port-summary-table",W,T,ag);
G.setSelectionModel(new Slick.RowSelectionModel());
G.registerPlugin(new Slick.AutoTooltips());
G.setSortColumn("name",true);
G.onSort.subscribe(function(aI,aH){o("input-port-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},W)
});
W.onRowCountChanged.subscribe(function(aI,aH){G.updateRowCount();
G.render();
if($("#input-port-summary-table").is(":visible")){$("#display-items").text(nf.Common.formatInteger(aH.current))
}});
W.onRowsChanged.subscribe(function(aI,aH){G.invalidateRows(aH.rows);
G.render()
});
$("#input-port-summary-table").data("gridInstance",G).on("mouseenter","div.slick-cell",function(aM){var aJ=$(this).find("img.has-bulletins");
if(aJ.length&&!aJ.data("qtip")){var aH=$(this).find("span.row-id").text();
var aI=W.getItemById(aH);
var aL=nf.Common.getFormattedBulletins(aI.bulletins);
var aK=nf.Common.formatUnorderedList(aL);
if(nf.Common.isDefinedAndNotNull(aK)){aJ.qtip($.extend({content:aK,position:{target:"mouse",viewport:$(window),adjust:{x:8,y:8,method:"flipinvert flipinvert"}}},nf.Common.config.tooltipConfig))
}}});
$("#cluster-input-port-summary-dialog").modal({headerText:"Cluster Input Port Summary",overlayBackground:false,buttons:[{buttonText:"Close",handler:{click:function(){$("#cluster-input-port-id").text("");
$("#cluster-input-port-name").text("");
this.modal("hide")
}}}],handler:{close:function(){$("#summary-loading-container").show()
}}});
var D=[{id:"node",field:"node",name:"Node",sortable:true,resizable:true},ar,R];
var P={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var ai=new Slick.Data.DataView({inlineFilters:false});
ai.setItems([]);
o("cluster-input-port-summary-table",{columnId:"node",sortAsc:true},ai);
var Z=new Slick.Grid("#cluster-input-port-summary-table",ai,D,P);
Z.setSelectionModel(new Slick.RowSelectionModel());
Z.registerPlugin(new Slick.AutoTooltips());
Z.setSortColumn("node",true);
Z.onSort.subscribe(function(aI,aH){o("cluster-input-port-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},ai)
});
ai.onRowCountChanged.subscribe(function(aI,aH){Z.updateRowCount();
Z.render()
});
ai.onRowsChanged.subscribe(function(aI,aH){Z.invalidateRows(aH.rows);
Z.render()
});
$("#cluster-input-port-summary-table").data("gridInstance",Z);
var X=[{id:"moreDetails",field:"moreDetails",name:"&nbsp;",resizable:false,formatter:az,sortable:true,width:50,maxWidth:50},E,ar,w];
if(av||ad){var Q=function(aM,aI,aL,aK,aH){var aJ="";
if(ad){aJ+='<img src="images/iconGoTo.png" title="Go To" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.goToOutputPort(\''+aM+"');\"/>&nbsp;"
}if(av){aJ+='<img src="images/iconClusterSmall.png" title="Show Details" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showClusterOutputPortSummary(\''+aM+"');\"/>&nbsp;"
}return aJ
};
X.push({id:"action",name:"&nbsp;",formatter:Q,resizable:false,sortable:false,width:75,maxWidth:75})
}var Y={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var L=new Slick.Data.DataView({inlineFilters:false});
L.setItems([]);
L.setFilterArgs({searchString:"",property:"name"});
L.setFilter(g);
o("output-port-summary-table",{columnId:"name",sortAsc:true},L);
var y=new Slick.Grid("#output-port-summary-table",L,X,Y);
y.setSelectionModel(new Slick.RowSelectionModel());
y.registerPlugin(new Slick.AutoTooltips());
y.setSortColumn("name",true);
y.onSort.subscribe(function(aI,aH){o("output-port-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},L)
});
L.onRowCountChanged.subscribe(function(aI,aH){y.updateRowCount();
y.render();
if($("#output-port-summary-table").is(":visible")){$("#display-items").text(nf.Common.formatInteger(aH.current))
}});
L.onRowsChanged.subscribe(function(aI,aH){y.invalidateRows(aH.rows);
y.render()
});
$("#output-port-summary-table").data("gridInstance",y).on("mouseenter","div.slick-cell",function(aM){var aJ=$(this).find("img.has-bulletins");
if(aJ.length&&!aJ.data("qtip")){var aH=$(this).find("span.row-id").text();
var aI=L.getItemById(aH);
var aL=nf.Common.getFormattedBulletins(aI.bulletins);
var aK=nf.Common.formatUnorderedList(aL);
if(nf.Common.isDefinedAndNotNull(aK)){aJ.qtip($.extend({content:aK,position:{target:"mouse",viewport:$(window),adjust:{x:8,y:8,method:"flipinvert flipinvert"}}},nf.Common.config.tooltipConfig))
}}});
$("#cluster-output-port-summary-dialog").modal({headerText:"Cluster Output Port Summary",overlayBackground:false,buttons:[{buttonText:"Close",handler:{click:function(){$("#cluster-output-port-id").text("");
$("#cluster-output-port-name").text("");
this.modal("hide")
}}}],handler:{close:function(){$("#summary-loading-container").show()
}}});
var J=[{id:"node",field:"node",name:"Node",sortable:true,resizable:true},ar,w];
var H={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var aC=new Slick.Data.DataView({inlineFilters:false});
aC.setItems([]);
o("cluster-output-port-summary-table",{columnId:"node",sortAsc:true},aC);
var ak=new Slick.Grid("#cluster-output-port-summary-table",aC,J,H);
ak.setSelectionModel(new Slick.RowSelectionModel());
ak.registerPlugin(new Slick.AutoTooltips());
ak.setSortColumn("node",true);
ak.onSort.subscribe(function(aI,aH){o("cluster-output-port-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},aC)
});
aC.onRowCountChanged.subscribe(function(aI,aH){ak.updateRowCount();
ak.render()
});
aC.onRowsChanged.subscribe(function(aI,aH){ak.invalidateRows(aH.rows);
ak.render()
});
$("#cluster-output-port-summary-table").data("gridInstance",ak);
var ah=function(aP,aN,aM,aK,aH){var aL="";
if(nf.Common.isDefinedAndNotNull(aH.activeThreadCount)&&aH.activeThreadCount>0){aL="("+aH.activeThreadCount+")"
}var aO="invalid";
var aI="Invalid";
if(nf.Common.isEmpty(aH.authorizationIssues)){if(aM==="Transmitting"){aO="transmitting";
aI=aM
}else{aO="not-transmitting";
aI="Not Transmitting"
}}var aJ='<div class="'+aO+'" style="margin-top: 3px;"></div>';
return aJ+'<div class="status-text" style="margin-top: 4px;">'+aI+'</div><div style="float: left; margin-left: 4px;">'+nf.Common.escapeHtml(aL)+"</div>"
};
var ax={id:"transmissionStatus",field:"transmissionStatus",name:"Transmitting",formatter:ah,sortable:true,resizable:true};
var aE={id:"targetUri",field:"targetUri",name:"Target URI",sortable:true,resizable:true};
var u={id:"sent",field:"sent",name:'<span class="sent-title">Sent</span>&nbsp;/&nbsp;<span class="sent-size-title">Size</span>&nbsp;<span style="font-weight: normal; overflow: hidden;">5 min</span>',toolTip:"Count / data size in the last 5 min",sortable:true,resizable:true};
var ay={id:"received",field:"received",name:'<span class="received-title">Received</span>&nbsp;/&nbsp;<span class="received-size-title">Size</span>&nbsp;<span style="font-weight: normal; overflow: hidden;">5 min</span>',toolTip:"Count / data size in the last 5 min",sortable:true,resizable:true};
var C=[{id:"moreDetails",field:"moreDetails",name:"&nbsp;",resizable:false,formatter:az,sortable:true,width:50,maxWidth:50},E,aE,ax,u,ay];
if(av||ad||nf.Common.SUPPORTS_SVG){var aG=function(aM,aI,aL,aK,aH){var aJ="";
if(ad){aJ+='<img src="images/iconGoTo.png" title="Go To" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.goToRemoteProcessGroup(\''+aM+"');\"/>&nbsp;"
}if(nf.Common.SUPPORTS_SVG){if(av){aJ+='<img src="images/iconChart.png" title="Show History" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showClusterRemoteProcessGroupStatusHistory(\''+aM+"');\"/>&nbsp;"
}else{aJ+='<img src="images/iconChart.png" title="Show History" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showRemoteProcessGroupStatusHistory(\''+aM+"');\"/>&nbsp;"
}}if(av){aJ+='<img src="images/iconClusterSmall.png" title="Show Details" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.SummaryTable.showClusterRemoteProcessGroupSummary(\''+aM+"');\"/>&nbsp;"
}return aJ
};
C.push({id:"action",name:"&nbsp;",formatter:aG,resizable:false,sortable:false,width:75,maxWidth:75})
}var al={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var O=new Slick.Data.DataView({inlineFilters:false});
O.setItems([]);
O.setFilterArgs({searchString:"",property:"name"});
O.setFilter(g);
o("remote-process-group-summary-table",{columnId:"name",sortAsc:true},O);
var B=new Slick.Grid("#remote-process-group-summary-table",O,C,al);
B.setSelectionModel(new Slick.RowSelectionModel());
B.registerPlugin(new Slick.AutoTooltips());
B.setSortColumn("name",true);
B.onSort.subscribe(function(aI,aH){o("remote-process-group-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},O)
});
O.onRowCountChanged.subscribe(function(aI,aH){B.updateRowCount();
B.render();
if($("#remote-process-group-summary-table").is(":visible")){$("#displayed-items").text(nf.Common.formatInteger(aH.current))
}});
O.onRowsChanged.subscribe(function(aI,aH){B.invalidateRows(aH.rows);
B.render()
});
$("#remote-process-group-summary-table").data("gridInstance",B).on("mouseenter","div.slick-cell",function(aM){var aJ=$(this).find("img.has-bulletins");
if(aJ.length&&!aJ.data("qtip")){var aH=$(this).find("span.row-id").text();
var aI=O.getItemById(aH);
var aL=nf.Common.getFormattedBulletins(aI.bulletins);
var aK=nf.Common.formatUnorderedList(aL);
if(nf.Common.isDefinedAndNotNull(aK)){aJ.qtip($.extend({content:aK,position:{target:"mouse",viewport:$(window),adjust:{x:8,y:8,method:"flipinvert flipinvert"}}},nf.Common.config.tooltipConfig))
}}});
$("#cluster-remote-process-group-summary-dialog").modal({headerText:"Cluster Remote Process Group Summary",overlayBackground:false,buttons:[{buttonText:"Close",handler:{click:function(){$("#cluster-remote-process-group-id").text("");
$("#cluster-remote-process-group-name").text("");
this.modal("hide")
}}}],handler:{close:function(){$("#summary-loading-container").show()
}}});
var aq=[{id:"node",field:"node",name:"Node",sortable:true,resizable:true},aE,ax,u,ay];
var I={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:false,enableColumnReorder:false,autoEdit:false};
var an=new Slick.Data.DataView({inlineFilters:false});
an.setItems([]);
o("cluster-remote-process-group-summary-table",{columnId:"node",sortAsc:true},an);
var af=new Slick.Grid("#cluster-remote-process-group-summary-table",an,aq,I);
af.setSelectionModel(new Slick.RowSelectionModel());
af.registerPlugin(new Slick.AutoTooltips());
af.setSortColumn("node",true);
af.onSort.subscribe(function(aI,aH){o("cluster-remote-process-group-summary-table",{columnId:aH.sortCol.field,sortAsc:aH.sortAsc},an)
});
an.onRowCountChanged.subscribe(function(aI,aH){af.updateRowCount();
af.render()
});
an.onRowsChanged.subscribe(function(aI,aH){af.invalidateRows(aH.rows);
af.render()
});
$("#cluster-remote-process-group-summary-table").data("gridInstance",af);
$("#system-diagnostics-link").click(function(){j().done(function(){$("#summary-loading-container").hide();
$("#system-diagnostics-dialog").modal("show")
})
});
$("#system-diagnostics-tabs").tabbs({tabStyle:"summary-tab",selectedTabStyle:"summary-selected-tab",tabs:[{name:"JVM",tabContentId:"jvm-tab-content"},{name:"System",tabContentId:"system-tab-content"}]});
$("#system-diagnostics-dialog").modal({headerText:"System Diagnostics",overlayBackground:false,buttons:[{buttonText:"Close",handler:{click:function(){this.modal("hide")
}}}],handler:{close:function(){$("#summary-loading-container").show()
}}});
nf.Common.addHoverEffect("#system-diagnostics-refresh-button","button-refresh","button-refresh-hover").click(function(){j()
});
$("#total-items").text("0")
};
var a={};
var o=function(u,s,v){if(nf.Common.isUndefined(a[u])){a[u]={}
}var t=function(Q,P){if(s.columnId==="moreDetails"){var L=0;
if(!nf.Common.isEmpty(Q.bulletins)){L=Q.bulletins.length
}var z=0;
if(!nf.Common.isEmpty(P.bulletins)){z=P.bulletins.length
}return L-z
}else{if(s.columnId==="runStatus"||s.columnId==="transmissionStatus"){var H=nf.Common.isDefinedAndNotNull(Q[s.columnId])?Q[s.columnId]:"";
var F=nf.Common.isDefinedAndNotNull(P[s.columnId])?P[s.columnId]:"";
if(H===F){return Q.activeThreadCount-P.activeThreadCount
}else{return H===F?0:H>F?1:-1
}}else{if(s.columnId==="queued"){var R=a[u].count%4;
if(R<2){$("#"+u+" span.queued-title").addClass("sorted");
var S=nf.Common.parseCount(Q.queuedCount);
var x=nf.Common.parseCount(P.queuedCount);
return S-x
}else{$("#"+u+" span.queued-size-title").addClass("sorted");
var w=nf.Common.parseSize(Q.queuedSize);
var C=nf.Common.parseSize(P.queuedSize);
return w-C
}}else{if(s.columnId==="sent"||s.columnId==="received"||s.columnId==="input"||s.columnId==="output"){var K=Q[s.columnId].split(/ \/ /);
var N=P[s.columnId].split(/ \/ /);
var R=a[u].count%4;
if(R<2){$("#"+u+" span."+s.columnId+"-title").addClass("sorted");
var B=nf.Common.parseCount(K[0]);
var D=nf.Common.parseCount(N[0]);
return B-D
}else{$("#"+u+" span."+s.columnId+"-size-title").addClass("sorted");
var G=nf.Common.parseSize(K[1]);
var A=nf.Common.parseSize(N[1]);
return G-A
}}else{if(s.columnId==="io"){var R=a[u].count%4;
if(R<2){$("#"+u+" span.read-title").addClass("sorted");
var U=nf.Common.parseSize(Q.read);
var O=nf.Common.parseSize(P.read);
return U-O
}else{$("#"+u+" span.written-title").addClass("sorted");
var E=nf.Common.parseSize(Q.written);
var T=nf.Common.parseSize(P.written);
return E-T
}}else{if(s.columnId==="tasks"){var R=a[u].count%4;
if(R<2){$("#"+u+" span.tasks-title").addClass("sorted");
var J=nf.Common.parseCount(Q.tasks);
var M=nf.Common.parseCount(P.tasks);
return J-M
}else{$("#"+u+" span.time-title").addClass("sorted");
var y=nf.Common.parseDuration(Q.tasksDuration);
var I=nf.Common.parseDuration(P.tasksDuration);
return y-I
}}else{var H=nf.Common.isDefinedAndNotNull(Q[s.columnId])?Q[s.columnId]:"";
var F=nf.Common.isDefinedAndNotNull(P[s.columnId])?P[s.columnId]:"";
return H===F?0:H>F?1:-1
}}}}}}};
$("#"+u+" span.queued-title").removeClass("sorted");
$("#"+u+" span.queued-size-title").removeClass("sorted");
$("#"+u+" span.input-title").removeClass("sorted");
$("#"+u+" span.input-size-title").removeClass("sorted");
$("#"+u+" span.output-title").removeClass("sorted");
$("#"+u+" span.output-size-title").removeClass("sorted");
$("#"+u+" span.read-title").removeClass("sorted");
$("#"+u+" span.written-title").removeClass("sorted");
$("#"+u+" span.time-title").removeClass("sorted");
$("#"+u+" span.tasks-title").removeClass("sorted");
$("#"+u+" span.sent-title").removeClass("sorted");
$("#"+u+" span.sent-size-title").removeClass("sorted");
$("#"+u+" span.received-title").removeClass("sorted");
$("#"+u+" span.received-size-title").removeClass("sorted");
if(a[u].prevColumn!==s.columnId){a[u].count=0
}else{a[u].count++
}v.sort(t,s.sortAsc);
a[u].prevColumn=s.columnId
};
var g=function(t,s){if(s.searchString===""){return true
}try{var v=new RegExp(s.searchString,"i")
}catch(u){return false
}return t[s.property].search(v)>=0
};
var j=function(){return $.ajax({type:"GET",url:nf.SummaryTable.systemDiagnosticsUrl,dataType:"json"}).done(function(v){var u=v.systemDiagnostics;
$("#max-heap").text(u.maxHeap);
$("#total-heap").text(u.totalHeap);
$("#used-heap").text(u.usedHeap);
$("#free-heap").text(u.freeHeap);
$("#utilization-heap").text(u.heapUtilization);
$("#max-non-heap").text(u.maxNonHeap);
$("#total-non-heap").text(u.totalNonHeap);
$("#used-non-heap").text(u.usedNonHeap);
$("#free-non-heap").text(u.freeNonHeap);
$("#utilization-non-heap").text(u.nonHeapUtilization);
var w=$("#garbage-collection-table tbody").empty();
$.each(u.garbageCollection,function(y,x){k(w,x)
});
$("#available-processors").text(u.availableProcessors);
$("#processor-load-average").html(nf.Common.formatValue(u.processorLoadAverage));
var t=$("#flow-file-repository-storage-usage-container").empty();
c(t,u.flowFileRepositoryStorageUsage);
var s=$("#content-repository-storage-usage-container").empty();
$.each(u.contentRepositoryStorageUsage,function(x,y){c(s,y)
});
$("#system-diagnostics-last-refreshed").text(u.statsLastRefreshed)
}).fail(nf.Common.handleAjaxError)
};
var k=function(t,s){var u=$("<tr></tr>").appendTo(t);
$("<td></td>").append($("<b></b>").text(s.name)).appendTo(u);
$("<td></td>").text(s.collectionCount+" times").appendTo(u);
$("<td></td>").text(s.collectionTime).appendTo(u)
};
var c=function(t,w){var v=parseInt(w.totalSpaceBytes,10);
var u=parseInt(w.usedSpaceBytes,10);
var y=$('<div class="storage-usage"></div>').appendTo(t);
$('<div class="storage-usage-progressbar"></div>').progressbar({max:v,value:u}).appendTo(y).children(".ui-progressbar-value").text(w.utilization);
var x=$('<span class="storage-identifier"></span>').text(w.identifier);
var s=$('<span class="storage-usage-details"></span>').text(w.usedSpace+" of "+w.totalSpace);
$('<div class="storage-usage-header"></div>').append(x).append(s).append('<div class="clear"></div>').appendTo(y)
};
var n=function(){var t="";
var s=$("#summary-filter");
if(!s.hasClass(p.styles.filterList)){t=s.val()
}return t
};
var m=function(x,w,v,u,t,s){$.each(s.processorStatus,function(y,z){x.push(z)
});
$.each(s.connectionStatus,function(y,z){w.push(z)
});
$.each(s.inputPortStatus,function(z,y){v.push(y)
});
$.each(s.outputPortStatus,function(z,y){u.push(y)
});
$.each(s.remoteProcessGroupStatus,function(y,z){t.push(z)
});
$.each(s.processGroupStatus,function(z,y){m(x,w,v,u,t,y)
})
};
var q=function(){var s;
if($("#processor-summary-table").is(":visible")){s=$("#processor-summary-table").data("gridInstance")
}else{s=$("#connection-summary-table").data("gridInstance")
}if(nf.Common.isDefinedAndNotNull(s)){var t=s.getData();
t.setFilterArgs({searchString:n(),property:$("#summary-filter-type").combo("getSelectedOption").value});
t.refresh()
}};
var h=function(s){$.ajax({type:"GET",url:p.urls.clusterProcessor+encodeURIComponent(s)+"/status",data:{verbose:true},dataType:"json"}).done(function(t){if(nf.Common.isDefinedAndNotNull(t.clusterProcessorStatus)){var w=t.clusterProcessorStatus;
var v=$("#cluster-processor-summary-table").data("gridInstance");
var x=v.getData();
var u=[];
$.each(w.nodeProcessorStatus,function(y,z){u.push({id:z.node.nodeId,node:z.node.address+":"+z.node.apiPort,runStatus:z.processorStatus.runStatus,activeThreadCount:z.processorStatus.activeThreadCount,input:z.processorStatus.input,read:z.processorStatus.read,written:z.processorStatus.written,output:z.processorStatus.output,tasks:z.processorStatus.tasks,tasksDuration:z.processorStatus.tasksDuration})
});
x.setItems(u);
x.reSort();
v.invalidate();
$("#cluster-processor-name").text(w.processorName).ellipsis();
$("#cluster-processor-id").text(w.processorId);
$("#cluster-processor-summary-last-refreshed").text(w.statsLastRefreshed)
}}).fail(nf.Common.handleAjaxError)
};
var b=function(s){$.ajax({type:"GET",url:p.urls.clusterConnection+encodeURIComponent(s)+"/status",data:{verbose:true},dataType:"json"}).done(function(u){if(nf.Common.isDefinedAndNotNull(u.clusterConnectionStatus)){var t=u.clusterConnectionStatus;
var w=$("#cluster-connection-summary-table").data("gridInstance");
var x=w.getData();
var v=[];
$.each(t.nodeConnectionStatus,function(y,z){v.push({id:z.node.nodeId,node:z.node.address+":"+z.node.apiPort,input:z.connectionStatus.input,queued:z.connectionStatus.queued,queuedCount:z.connectionStatus.queuedCount,queuedSize:z.connectionStatus.queuedSize,output:z.connectionStatus.output})
});
x.setItems(v);
x.reSort();
w.invalidate();
$("#cluster-connection-name").text(t.connectionName).ellipsis();
$("#cluster-connection-id").text(t.connectionId);
$("#cluster-connection-summary-last-refreshed").text(t.statsLastRefreshed)
}}).fail(nf.Common.handleAjaxError)
};
var l=function(s){$.ajax({type:"GET",url:p.urls.clusterInputPort+encodeURIComponent(s)+"/status",data:{verbose:true},dataType:"json"}).done(function(u){if(nf.Common.isDefinedAndNotNull(u.clusterPortStatus)){var x=u.clusterPortStatus;
var t=$("#cluster-input-port-summary-table").data("gridInstance");
var v=t.getData();
var w=[];
$.each(x.nodePortStatus,function(z,y){w.push({id:y.node.nodeId,node:y.node.address+":"+y.node.apiPort,runStatus:y.portStatus.runStatus,activeThreadCount:y.portStatus.activeThreadCount,output:y.portStatus.output})
});
v.setItems(w);
v.reSort();
t.invalidate();
$("#cluster-input-port-name").text(x.portName).ellipsis();
$("#cluster-input-port-id").text(x.portId);
$("#cluster-input-port-summary-last-refreshed").text(x.statsLastRefreshed)
}}).fail(nf.Common.handleAjaxError)
};
var f=function(s){$.ajax({type:"GET",url:p.urls.clusterOutputPort+encodeURIComponent(s)+"/status",data:{verbose:true},dataType:"json"}).done(function(u){if(nf.Common.isDefinedAndNotNull(u.clusterPortStatus)){var t=u.clusterPortStatus;
var v=$("#cluster-output-port-summary-table").data("gridInstance");
var x=v.getData();
var w=[];
$.each(t.nodePortStatus,function(y,z){w.push({id:z.node.nodeId,node:z.node.address+":"+z.node.apiPort,runStatus:z.portStatus.runStatus,activeThreadCount:z.portStatus.activeThreadCount,input:z.portStatus.input})
});
x.setItems(w);
x.reSort();
v.invalidate();
$("#cluster-output-port-name").text(t.portName).ellipsis();
$("#cluster-output-port-id").text(t.portId);
$("#cluster-output-port-summary-last-refreshed").text(t.statsLastRefreshed)
}}).fail(nf.Common.handleAjaxError)
};
var e=function(s){$.ajax({type:"GET",url:p.urls.clusterRemoteProcessGroup+encodeURIComponent(s)+"/status",data:{verbose:true},dataType:"json"}).done(function(u){if(nf.Common.isDefinedAndNotNull(u.clusterRemoteProcessGroupStatus)){var x=u.clusterRemoteProcessGroupStatus;
var v=$("#cluster-remote-process-group-summary-table").data("gridInstance");
var w=v.getData();
var t=[];
$.each(x.nodeRemoteProcessGroupStatus,function(y,z){t.push({id:z.node.nodeId,node:z.node.address+":"+z.node.apiPort,targetUri:z.remoteProcessGroupStatus.targetUri,transmissionStatus:z.remoteProcessGroupStatus.transmissionStatus,sent:z.remoteProcessGroupStatus.sent,received:z.remoteProcessGroupStatus.received,activeThreadCount:z.remoteProcessGroupStatus.activeThreadCount,authorizationIssues:z.remoteProcessGroupStatus.authorizationIssues})
});
w.setItems(t);
w.reSort();
v.invalidate();
$("#cluster-remote-process-group-name").text(x.remoteProcessGroupName).ellipsis();
$("#cluster-remote-process-group-id").text(x.remoteProcessGroupId);
$("#cluster-remote-process-group-summary-last-refreshed").text(x.statsLastRefreshed)
}}).fail(nf.Common.handleAjaxError)
};
return{systemDiagnosticsUrl:null,url:null,init:function(s){nf.SummaryTable.url=p.urls.status;
nf.SummaryTable.systemDiagnosticsUrl=p.urls.systemDiagnostics;
return $.Deferred(function(t){d().done(function(){nf.ProcessorDetails.init(false);
nf.ConnectionDetails.init(false);
i(s);
t.resolve()
}).fail(function(){t.reject()
})
}).promise()
},resetTableSize:function(){var t=$("#processor-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(t)){t.resizeCanvas()
}var s=$("#connection-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){s.resizeCanvas()
}var w=$("#input-port-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){w.resizeCanvas()
}var v=$("#output-port-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){v.resizeCanvas()
}var u=$("#remote-process-group-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){u.resizeCanvas()
}},loadProcessorSummaryTable:function(){return $.ajax({type:"GET",url:nf.SummaryTable.url,data:{recursive:true},dataType:"json"}).done(function(s){var C=s.processGroupStatus;
if(nf.Common.isDefinedAndNotNull(C)){var y=$("#processor-summary-table");
nf.Common.cleanUpTooltips(y,"img.has-bulletins");
var x=y.data("gridInstance");
var w=x.getData();
var u=$("#connection-summary-table").data("gridInstance");
var t=u.getData();
var K=$("#input-port-summary-table");
nf.Common.cleanUpTooltips(K,"img.has-bulletins");
var I=K.data("gridInstance");
var H=I.getData();
var L=$("#output-port-summary-table");
nf.Common.cleanUpTooltips(L,"img.has-bulletins");
var A=L.data("gridInstance");
var z=A.getData();
var B=$("#remote-process-group-summary-table");
nf.Common.cleanUpTooltips(B,"img.has-bulletins");
var F=B.data("gridInstance");
var E=F.getData();
var J=[];
var G=[];
var D=[];
var M=[];
var v=[];
m(J,G,D,M,v,C);
w.setItems(J);
w.reSort();
x.invalidate();
t.setItems(G);
t.reSort();
u.invalidate();
H.setItems(D);
H.reSort();
I.invalidate();
z.setItems(M);
z.reSort();
A.invalidate();
E.setItems(v);
E.reSort();
F.invalidate();
$("#summary-last-refreshed").text(C.statsLastRefreshed);
if($("#processor-summary-table").is(":visible")){$("#total-items").text(nf.Common.formatInteger(J.length))
}else{if($("#connection-summary-table").is(":visible")){$("#total-items").text(nf.Common.formatInteger(G.length))
}else{if($("#input-port-summary-table").is(":visible")){$("#total-items").text(nf.Common.formatInteger(D.length))
}else{if($("#output-port-summary-table").is(":visible")){$("#total-items").text(nf.Common.formatInteger(M.length))
}else{$("#total-items").text(nf.Common.formatInteger(v.length))
}}}}}else{$("#total-items").text("0")
}}).fail(nf.Common.handleAjaxError)
},showProcessorDetails:function(v){var s=$("#processor-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
nf.ProcessorDetails.showDetails(t.groupId,t.id)
}},goToProcessor:function(v){var s=$("#processor-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
r(t.groupId,t.id)
}},showClusterProcessorStatusHistory:function(v){var s=$("#processor-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
nf.StatusHistory.showClusterProcessorChart(t.groupId,t.id)
}},showProcessorStatusHistory:function(v){var s=$("#processor-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
nf.StatusHistory.showStandaloneProcessorChart(t.groupId,t.id)
}},showClusterProcessorSummary:function(v){var s=$("#processor-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
h(t.id);
$("#summary-loading-container").hide();
$("#cluster-processor-summary-dialog").modal("show")
}},showConnectionDetails:function(v){var s=$("#connection-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
nf.ConnectionDetails.showDetails(t.groupId,t.id)
}},goToConnection:function(v){var s=$("#connection-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
r(t.groupId,t.id)
}},showClusterConnectionStatusHistory:function(v){var s=$("#connection-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
nf.StatusHistory.showClusterConnectionChart(t.groupId,t.id)
}},showConnectionStatusHistory:function(v){var s=$("#connection-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
nf.StatusHistory.showStandaloneConnectionChart(t.groupId,t.id)
}},showClusterConnectionSummary:function(v){var s=$("#connection-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
b(t.id);
$("#summary-loading-container").hide();
$("#cluster-connection-summary-dialog").modal("show")
}},goToInputPort:function(v){var s=$("#input-port-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
r(t.groupId,t.id)
}},showClusterInputPortSummary:function(v){var s=$("#input-port-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
l(t.id);
$("#summary-loading-container").hide();
$("#cluster-input-port-summary-dialog").modal("show")
}},goToOutputPort:function(v){var s=$("#output-port-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
r(t.groupId,t.id)
}},showClusterOutputPortSummary:function(v){var s=$("#output-port-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
f(t.id);
$("#summary-loading-container").hide();
$("#cluster-output-port-summary-dialog").modal("show")
}},goToRemoteProcessGroup:function(v){var s=$("#remote-process-group-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
r(t.groupId,t.id)
}},showClusterRemoteProcessGroupStatusHistory:function(v){var s=$("#remote-process-group-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
nf.StatusHistory.showClusterRemoteProcessGroupChart(t.groupId,t.id)
}},showRemoteProcessGroupStatusHistory:function(v){var s=$("#remote-process-group-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
nf.StatusHistory.showStandaloneRemoteProcessGroupChart(t.groupId,t.id)
}},showClusterRemoteProcessGroupSummary:function(v){var s=$("#remote-process-group-summary-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(s)){var u=s.getData();
var t=u.getItem(v);
e(t.id);
$("#summary-loading-container").hide();
$("#cluster-remote-process-group-summary-dialog").modal("show")
}}}
}());
nf.ClusterSearch=(function(){var a={search:"Search nodes",urls:{clusterSearch:"../nifi-api/cluster/search-results",status:"../nifi-api/controller/process-groups/root/status",systemDiagnostics:"../nifi-api/system-diagnostics"}};
return{init:function(){$("#view-single-node-dialog").modal({headerText:"Select node",overlayBackground:false,buttons:[{buttonText:"Ok",handler:{click:function(){var b=$("#cluster-search-field").val();
$.ajax({type:"GET",data:{q:b},dataType:"json",url:a.urls.clusterSearch}).done(function(c){var d=c.nodeResults;
if(!$.isArray(d)||d.length===0){nf.Dialog.showOkDialog({dialogContent:"No nodes match '"+nf.Common.escapeHtml(b)+"'.",overlayBackground:false})
}else{if(d.length>1){nf.Dialog.showOkDialog({dialogContent:"More than one node matches '"+nf.Common.escapeHtml(b)+"'.",overlayBackground:false})
}else{if(d.length===1){var e=d[0];
nf.SummaryTable.url="../nifi-api/cluster/nodes/"+encodeURIComponent(e.id)+"/status";
nf.SummaryTable.systemDiagnosticsUrl="../nifi-api/cluster/nodes/"+encodeURIComponent(e.id)+"/system-diagnostics";
nf.SummaryTable.loadProcessorSummaryTable();
$("#summary-header-text").text(e.address+" Summary");
$("#view-single-node-dialog").modal("hide")
}}}})
}}},{buttonText:"Cancel",handler:{click:function(){this.modal("hide")
}}}],handler:{close:function(){$("#cluster-search-field").val(a.search).addClass("search-nodes")
}}});
$.widget("nf.clusterSearchAutocomplete",$.ui.autocomplete,{_normalize:function(c){var b=[];
b.push(c);
return b
},_renderMenu:function(d,c){var e=c[0];
var b=this;
$.each(e.nodeResults,function(f,g){b._renderItemData(d,{label:g.address,value:g.address})
});
if(d.children().length===0){d.append('<li class="unset search-no-matches">No nodes matched the search terms</li>')
}},_resizeMenu:function(){var b=this.menu.element;
b.width(299)
}});
$("#cluster-search-field").clusterSearchAutocomplete({minLength:0,appendTo:"#search-cluster-results",position:{my:"left top",at:"left bottom",offset:"0 1"},source:function(c,b){$.ajax({type:"GET",data:{q:c.term},dataType:"json",url:a.urls.clusterSearch}).done(function(d){b(d)
})
}}).focus(function(){if($(this).val()===a.search){$(this).val("").removeClass("search-nodes")
}}).val(a.search).addClass("search-nodes");
$("#view-single-node-link").click(function(){$("#view-single-node-dialog").modal("show")
});
$("#view-cluster-link").click(function(){nf.SummaryTable.url=a.urls.status;
nf.SummaryTable.systemDiagnosticsUrl=a.urls.systemDiagnostics;
nf.SummaryTable.loadProcessorSummaryTable();
$("#summary-header-text").text("NiFi Summary")
});
$("#view-options-container").show()
}}
}());
