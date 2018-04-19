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
$(document).ready(function(){nf.Provenance.init()
});
nf.Provenance=(function(){var b={urls:{cluster:"../nifi-api/cluster",banners:"../nifi-api/controller/banners",config:"../nifi-api/controller/config",controllerAbout:"../nifi-api/controller/about",authorities:"../nifi-api/controller/authorities"}};
var d=null;
var c=function(){return $.Deferred(function(g){$.ajax({type:"HEAD",url:b.urls.cluster}).done(function(){d=true;
g.resolve()
}).fail(function(j,h,i){if(j.status===404){d=false;
g.resolve()
}else{nf.Common.handleAjaxError(j,h,i);
g.reject()
}})
}).promise()
};
var a=function(){return $.ajax({type:"GET",url:b.urls.config,dataType:"json"}).done(function(g){var h=g.config;
$("#nifi-controller-uri").text(h.uri);
if(!nf.Common.isBlank(h.contentViewerUrl)){$("#nifi-content-viewer-url").text(h.contentViewerUrl)
}}).fail(nf.Common.handleAjaxError)
};
var f=function(){return $.Deferred(function(g){$.ajax({type:"GET",url:b.urls.authorities,dataType:"json"}).done(function(h){if(nf.Common.isDefinedAndNotNull(h.authorities)){nf.Common.setAuthorities(h.authorities);
g.resolve(h)
}else{g.reject()
}}).fail(function(j,h,i){nf.Common.handleAjaxError(j,h,i);
g.reject()
})
}).promise()
};
var e=function(){nf.Common.addHoverEffect("#refresh-button","button-refresh","button-refresh-hover").click(function(){nf.ProvenanceTable.loadProvenanceTable()
});
return $.Deferred(function(g){if(top===window){$.ajax({type:"GET",url:b.urls.banners,dataType:"json"}).done(function(l){if(nf.Common.isDefinedAndNotNull(l.banners)){if(nf.Common.isDefinedAndNotNull(l.banners.headerText)&&l.banners.headerText!==""){var i=$("#banner-header").text(l.banners.headerText).show();
var k=function(m){var n=$("#"+m);
n.css("top",(parseInt(i.css("height"),10)+parseInt(n.css("top"),10))+"px")
};
k("provenance")
}if(nf.Common.isDefinedAndNotNull(l.banners.footerText)&&l.banners.footerText!==""){var h=$("#banner-footer").text(l.banners.footerText).show();
var j=function(m){var n=$("#"+m);
n.css("bottom",parseInt(h.css("height"),10)+"px")
};
j("provenance")
}}g.resolve()
}).fail(function(j,h,i){nf.Common.handleAjaxError(j,h,i);
g.reject()
})
}else{g.resolve()
}}).promise()
};
return{init:function(){$.when(a(),f(),c()).done(function(){nf.ProvenanceTable.init(d).done(function(){nf.ProvenanceTable.loadProvenanceTable();
e().done(function(){nf.ProvenanceTable.resetTableSize();
$.ajax({type:"GET",url:b.urls.controllerAbout,dataType:"json"}).done(function(h){var g=h.about;
var i=g.title+" Data Provenance";
document.title=i;
$("#provenance-header-text").text(i)
}).fail(nf.Common.handleAjaxError)
})
})
})
}}
}());
nf.ProvenanceTable=(function(){var s={maxResults:1000,defaultStartTime:"00:00:00",defaultEndTime:"23:59:59",filterText:"Filter",styles:{filterList:"provenance-filter-list",hidden:"hidden"},urls:{searchOptions:"../nifi-api/controller/provenance/search-options",replays:"../nifi-api/controller/provenance/replays",provenance:"../nifi-api/controller/provenance",cluster:"../nifi-api/cluster",d3Script:"js/d3/d3.min.js",lineageScript:"js/nf/provenance/nf-provenance-lineage.js"}};
var a={};
var j=function(){return $.Deferred(function(u){if(nf.Common.SUPPORTS_SVG){nf.Common.cachedScript(s.urls.d3Script).done(function(){nf.Common.cachedScript(s.urls.lineageScript).done(function(){nf.ProvenanceLineage.init();
u.resolve()
}).fail(function(){u.reject()
})
}).fail(function(){u.reject()
})
}else{u.resolve()
}}).promise()
};
var e=function(){var u=$("#nifi-content-viewer-url").text();
return !nf.Common.isBlank(u)
};
var b=function(x){var w=$("#provenance-event-id").text();
var v=s.urls.provenance+"/events/"+encodeURIComponent(w)+"/content/"+encodeURIComponent(x);
var u=$("#provenance-event-cluster-node-id").text();
if(!nf.Common.isBlank(u)){window.open(v+"?"+$.param({clusterNodeId:u}))
}else{window.open(v)
}};
var g=function(A){var w=$("#nifi-controller-uri").text();
var x=$("#provenance-event-id").text();
var u=w+"/provenance/events/"+encodeURIComponent(x)+"/content/"+encodeURIComponent(A);
var v=$("#provenance-event-cluster-node-id").text();
if(!nf.Common.isBlank(v)){var y={clusterNodeId:v};
u=u+"?"+$.param(y)
}var z=$("#nifi-content-viewer-url").text();
if(z.indexOf("?")===-1){z+="?"
}else{z+="&"
}window.open(z+$.param({ref:u}))
};
var n=function(){$("#event-details-tabs").tabbs({tabStyle:"tab",selectedTabStyle:"selected-tab",tabs:[{name:"Details",tabContentId:"event-details-tab-content"},{name:"Attributes",tabContentId:"attributes-tab-content"},{name:"Content",tabContentId:"content-tab-content"}]});
$("#event-details-dialog").modal({headerText:"Provenance Event",overlayBackground:false,buttons:[{buttonText:"Ok",handler:{click:function(){$("#event-details-dialog").modal("hide")
}}}],handler:{close:function(){$("#additional-provenance-details").empty();
$("#attributes-container").empty();
$("#parent-flowfiles-container").empty();
$("#child-flowfiles-container").empty();
$("#provenance-event-cluster-node-id").text("");
$("#modified-attribute-toggle").removeClass("checkbox-checked").addClass("checkbox-unchecked")
}}});
$("#modified-attribute-toggle").on("click",function(){var u=$("#attributes-container div.attribute-unmodified");
if(u.is(":visible")){$("#attributes-container div.attribute-unmodified").hide()
}else{$("#attributes-container div.attribute-unmodified").show()
}});
$("#input-content-download").on("click",function(){b("input")
});
$("#output-content-download").on("click",function(){b("output")
});
if(e()){$("#input-content-view").on("click",function(){g("input")
});
$("#output-content-view").on("click",function(){g("output")
})
}if(nf.Common.isDFM()){$("#replay-content").on("click",function(){var v={eventId:$("#provenance-event-id").text()};
var u=$("#provenance-event-cluster-node-id").text();
if(!nf.Common.isBlank(u)){v.clusterNodeId=u
}$.ajax({type:"POST",url:s.urls.replays,data:v,dataType:"json"}).done(function(w){nf.Dialog.showOkDialog({dialogContent:"Successfully submitted replay request.",overlayBackground:false})
}).fail(nf.Common.handleAjaxError);
$("#event-details-dialog").modal("hide")
});
$("#replay-details").show()
}};
var l=function(u){$.ajax({type:"GET",url:s.urls.searchOptions,dataType:"json"}).done(function(v){var w=v.provenanceOptions;
$.each(w.searchableFields,function(x,y){r(y)
})
});
$("#provenance-search-start-date, #provenance-search-end-date").datepicker({showAnim:"",showOtherMonths:true,selectOtherMonths:true});
$("#provenance-search-start-date").datepicker("setDate","+0d");
$("#provenance-search-end-date").datepicker("setDate","+0d");
$("#provenance-search-start-time").val("00:00:00");
$("#provenance-search-end-time").val("23:59:59");
$("#provenance-search-minimum-file-size").val("");
$("#provenance-search-maximum-file-size").val("");
if(u){$("#provenance-search-dialog").height(575);
$.ajax({type:"GET",url:s.urls.cluster,dataType:"json"}).done(function(x){var v=x.cluster;
var w=v.nodes;
var y=[{text:"cluster",value:null}];
w.sort(function(A,z){var C=(A.address+":"+A.apiPort).toUpperCase();
var B=(z.address+":"+z.apiPort).toUpperCase();
return(C<B)?-1:(C>B)?1:0
});
$.each(w,function(z,A){y.push({text:A.address+":"+A.apiPort,value:A.nodeId})
});
$("#provenance-search-location").combo({options:y})
}).fail(nf.Common.handleAjaxError);
$("#provenance-search-location-container").show()
}$("#provenance-search-dialog").modal({headerText:"Search Events",overlayBackground:false,buttons:[{buttonText:"Search",handler:{click:function(){$("#provenance-search-dialog").modal("hide");
var y={};
var v=$.trim($("#provenance-search-start-date").val());
var z=$.trim($("#provenance-search-start-time").val());
if(v!==""){if(z===""){z=s.defaultStartTime;
$("#provenance-search-start-time").val(z)
}y.startDate=v+" "+z
}var B=$.trim($("#provenance-search-end-date").val());
var x=$.trim($("#provenance-search-end-time").val());
if(B!==""){if(x===""){x=s.defaultEndTime;
$("#provenance-search-end-time").val(x)
}y.endDate=B+" "+x
}var w=$.trim($("#provenance-search-minimum-file-size").val());
if(w!==""){y.minimumFileSize=w
}var C=$.trim($("#provenance-search-maximum-file-size").val());
if(C!==""){y.maximumFileSize=C
}if(u){var A=$("#provenance-search-location").combo("getSelectedOption");
if(A.value!==null){y.clusterNodeId=A.value
}}y=$.extend(k(),y);
nf.ProvenanceTable.loadProvenanceTable(y)
}}},{buttonText:"Cancel",handler:{click:function(){$("#provenance-search-dialog").modal("hide")
}}}]})
};
var q=function(){$("#provenance-percent-complete").progressbar();
$("#provenance-query-dialog").modal({headerText:"Searching provenance events...",overlayBackground:false,handler:{close:function(){$("#provenance-percent-complete").progressbar("value",0)
}}})
};
var r=function(v){var u=$('<div class="searchable-field"></div>').appendTo("#searchable-fields-container");
$('<span class="searchable-field-id hidden"></span>').text(v.id).appendTo(u);
$('<div class="searchable-field-name"></div>').text(v.label).appendTo(u);
$('<div class="searchable-field-value"><input type="text" class="searchable-field-input"/></div>').appendTo(u);
$('<div class="clear"></div>').appendTo(u);
$("#no-searchable-fields").hide()
};
var k=function(){var u={};
$("#searchable-fields-container").children("div.searchable-field").each(function(){var w=$(this);
var v=w.children("span.searchable-field-id").text();
var x=$.trim(w.find("input.searchable-field-input").val());
if(!nf.Common.isBlank(x)){u["search["+v+"]"]=x
}});
return u
};
var i=function(C){$("#provenance-filter").keyup(function(){t()
}).focus(function(){if($(this).hasClass(s.styles.filterList)){$(this).removeClass(s.styles.filterList).val("")
}}).blur(function(){if($(this).val()===""){$(this).addClass(s.styles.filterList).val(s.filterText)
}}).addClass(s.styles.filterList).val(s.filterText);
var w=[{text:"by component name",value:"componentName"},{text:"by component type",value:"componentType"},{text:"by type",value:"eventType"}];
if(C){w.push({text:"by node",value:"clusterNodeAddress"})
}$("#provenance-filter-type").combo({options:w,select:function(E){t()
}});
$(window).resize(function(){nf.ProvenanceTable.resetTableSize()
});
$("#clear-provenance-search").click(function(){$("#searchable-fields-container").find("input.searchable-field-input").each(function(){$(this).val("")
});
$("#provenance-search-start-date").datepicker("setDate","+0d");
$("#provenance-search-end-date").datepicker("setDate","+0d");
$("#provenance-search-start-time").val("00:00:00");
$("#provenance-search-end-time").val("23:59:59");
$("#provenance-search-minimum-file-size").val("");
$("#provenance-search-maximum-file-size").val("");
if(C){$("#provenance-search-location").combo("setSelectedOption",{text:"cluster"})
}query={};
nf.ProvenanceTable.loadProvenanceTable()
});
nf.Common.addHoverEffect("#provenance-search-button","button-normal","button-over").click(function(){$("#provenance-search-dialog").modal("show");
var E=$("#searchable-fields-container");
if(E.get(0).scrollHeight>E.innerHeight()){$("input.searchable-field-input").width(245)
}else{$("input.searchable-field-input").width(260)
}});
var D=function(I,F,H,G,E){return'<img src="images/iconDetails.png" title="View Details" class="pointer" style="margin-top: 4px;" onclick="javascript:nf.ProvenanceTable.showEventDetailsByIndex(\''+I+"');\"/>"
};
var z=function(I,F,H,G,E){return nf.Common.formatValue(H)
};
var x=(top!==window);
var B=function(J,F,I,H,E){var G="";
if(nf.Common.SUPPORTS_SVG){G+='<img src="images/iconLineage.png" title="Show Lineage" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.ProvenanceTable.showLineage(\''+J+"');\"/>"
}if(x&&nf.Common.isDefinedAndNotNull(E.groupId)){G+='&nbsp;<img src="images/iconGoTo.png" title="Go To" class="pointer" style="margin-top: 2px;" onclick="javascript:nf.ProvenanceTable.goTo(\''+J+"');\"/>"
}return G
};
var y=[{id:"moreDetails",name:"&nbsp;",sortable:false,resizable:false,formatter:D,width:50,maxWidth:50},{id:"eventTime",name:"Date/Time",field:"eventTime",sortable:true,resizable:true},{id:"eventType",name:"Type",field:"eventType",sortable:true,resizable:true},{id:"flowFileUuid",name:"FlowFile Uuid",field:"flowFileUuid",sortable:true,resizable:true},{id:"fileSize",name:"Size",field:"fileSize",sortable:true,resizable:true},{id:"componentName",name:"Component Name",field:"componentName",sortable:true,resizable:true,formatter:z},{id:"componentType",name:"Component Type",field:"componentType",sortable:true,resizable:true}];
if(C){y.push({id:"clusterNodeAddress",name:"Node",field:"clusterNodeAddress",sortable:true,resizable:true})
}if(nf.Common.SUPPORTS_SVG||x){y.push({id:"action",name:"&nbsp;",formatter:B,resizable:false,sortable:false,width:50,maxWidth:50})
}var v={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var u=new Slick.Data.DataView({inlineFilters:false});
u.setItems([]);
u.setFilterArgs({searchString:"",property:"name"});
u.setFilter(h);
p({columnId:"eventTime",sortAsc:false},u);
var A=new Slick.Grid("#provenance-table",u,y,v);
A.setSelectionModel(new Slick.RowSelectionModel());
A.registerPlugin(new Slick.AutoTooltips());
A.setSortColumn("eventTime",false);
A.onSort.subscribe(function(F,E){p({columnId:E.sortCol.field,sortAsc:E.sortAsc},u)
});
u.onRowCountChanged.subscribe(function(F,E){A.updateRowCount();
A.render();
$("#displayed-events").text(nf.Common.formatInteger(E.current))
});
u.onRowsChanged.subscribe(function(F,E){A.invalidateRows(E.rows);
A.render()
});
$("#provenance-table").data("gridInstance",A);
$("#displayed-events").text("0");
$("#total-events").text("0")
};
var t=function(){var u=$("#provenance-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(u)){var v=u.getData();
v.setFilterArgs({searchString:o(),property:$("#provenance-filter-type").combo("getSelectedOption").value});
v.refresh()
}};
var o=function(){var v="";
var u=$("#provenance-filter");
if(!u.hasClass(s.styles.filterList)){v=u.val()
}return v
};
var h=function(v,u){if(u.searchString===""){return true
}try{var x=new RegExp(u.searchString,"i")
}catch(w){return false
}return v[u.property].search(x)>=0
};
var p=function(u,w){var v=function(A,y){if(u.columnId==="eventTime"){var C=nf.Common.parseDateTime(A[u.columnId]).getTime();
var E=nf.Common.parseDateTime(y[u.columnId]).getTime();
if(C===E){return A.id-y.id
}else{return C-E
}}else{if(u.columnId==="fileSize"){var x=nf.Common.parseSize(A[u.columnId]);
var D=nf.Common.parseSize(y[u.columnId]);
if(x===D){return A.id-y.id
}else{return x-D
}}else{var z=nf.Common.isDefinedAndNotNull(A[u.columnId])?A[u.columnId]:"";
var B=nf.Common.isDefinedAndNotNull(y[u.columnId])?y[u.columnId]:"";
if(z===B){return A.id-y.id
}else{return z===B?0:z>B?1:-1
}}}};
w.sort(v,u.sortAsc)
};
var c=function(u){return $.ajax({type:"POST",url:s.urls.provenance,data:$.extend({maxResults:s.maxResults},u),dataType:"json"}).fail(nf.Common.handleAjaxError)
};
var f=function(u){var v=u.uri;
if(nf.Common.isDefinedAndNotNull(u.clusterNodeId)){v+="?"+$.param({clusterNodeId:u.clusterNodeId})
}return $.ajax({type:"GET",url:v,dataType:"json"}).fail(nf.Common.handleAjaxError)
};
var d=function(u){var v=u.uri;
if(nf.Common.isDefinedAndNotNull(u.clusterNodeId)){v+="?"+$.param({clusterNodeId:u.clusterNodeId})
}return $.ajax({type:"DELETE",url:v,dataType:"json"}).fail(nf.Common.handleAjaxError)
};
var m=function(v){var A=v.request;
var y=v.results;
if(nf.Common.isDefinedAndNotNull(y.provenanceEvents)){var u=$("#provenance-table").data("gridInstance");
var w=u.getData();
w.setItems(y.provenanceEvents);
w.reSort();
u.invalidate();
$("#provenance-last-refreshed").text(y.generated);
$("#oldest-event").html(nf.Common.formatValue(y.oldestEvent));
$("#oldest-event-message").show();
$(".timezone").text(nf.Common.substringAfterLast(y.generated," "));
nf.ProvenanceTable.serverTimeOffset=y.timeOffset;
var z=function(B){return nf.Common.isUndefinedOrNull(B.startDate)&&nf.Common.isUndefinedOrNull(B.endDate)&&$.isEmptyObject(B.searchTerms)
};
if(z(A)){var x="Showing the most recent ";
if(y.totalCount>s.maxResults){x+=(nf.Common.formatInteger(s.maxResults)+" of "+y.total+" events, please refine the search.")
}else{x+=("events.")
}$("#provenance-query-message").text(x);
$("#clear-provenance-search").hide()
}else{var x="Showing ";
if(y.totalCount>s.maxResults){x+=(nf.Common.formatInteger(s.maxResults)+" of "+y.total+" events that match the specified query, please refine the search.")
}else{x+=("the events that match the specified query.")
}$("#provenance-query-message").text(x);
$("#clear-provenance-search").show()
}$("#total-events").text(nf.Common.formatInteger(y.provenanceEvents.length))
}else{$("#total-events").text("0")
}};
return{MAX_DELAY:4,serverTimeOffset:null,init:function(u){return j().done(function(){n();
q();
l(u);
i(u)
}).fail(nf.Common.handleAjaxError)
},goTo:function(x){var u=$("#provenance-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(u)){var w=u.getData();
var v=w.getItem(x);
if(nf.Common.isDefinedAndNotNull(v.groupId)){if(top!==window){if(nf.Common.isDefinedAndNotNull(parent.nf)&&nf.Common.isDefinedAndNotNull(parent.nf.CanvasUtils)&&nf.Common.isDefinedAndNotNull(parent.nf.Shell)){parent.nf.CanvasUtils.showComponent(v.groupId,v.componentId);
parent.$("#shell-close-button").click()
}}}}},resetTableSize:function(){var u=$("#provenance-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(u)){u.resizeCanvas()
}},updateProgress:function(w,v){w.find("div.progress-label").remove();
var u=$('<div class="progress-label"></div>').text(v+"%");
w.progressbar("value",v).append(u)
},loadProvenanceTable:function(z){var w=$("#provenance-percent-complete");
var y=false;
var u=null;
var x=null;
nf.ProvenanceTable.updateProgress(w,0);
$("#provenance-query-dialog").modal("setButtonModel",[{buttonText:"Cancel",handler:{click:function(){y=true;
if(x!==null){clearTimeout(x);
v()
}}}}]).modal("show");
if(nf.Common.isDefinedAndNotNull(z)){a=z
}else{if(!$.isEmptyObject(a)){z=a
}else{z={}
}}var v=function(){if(nf.Common.isDefinedAndNotNull(u)){d(u)
}$("#provenance-query-dialog").modal("hide")
};
var B=function(C){f(u).done(function(D){u=D.provenance;
A(C)
}).fail(v)
};
var A=function(C){if(y===true){v();
return
}nf.ProvenanceTable.updateProgress(w,u.percentCompleted);
if(u.finished===true){if(!nf.Common.isEmpty(u.results.errors)){var D=u.results.errors;
nf.Dialog.showOkDialog({dialogContent:nf.Common.formatUnorderedList(D),overlayBackground:false})
}m(u);
v()
}else{x=setTimeout(function(){x=null;
var F=C*2;
var E=F>nf.ProvenanceTable.MAX_DELAY?nf.ProvenanceTable.MAX_DELAY:F;
B(E)
},C*1000)
}};
c(z).done(function(C){u=C.provenance;
A(1)
}).fail(v)
},showLineage:function(x){var u=$("#provenance-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(u)){var w=u.getData();
var v=w.getItem(x);
nf.ProvenanceLineage.showLineage(v.flowFileUuid,v.eventId.toString(),v.clusterNodeId)
}},showEventDetailsByIndex:function(v){var u=$("#provenance-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(u)){var x=u.getData();
var w=x.getItem(v);
nf.ProvenanceTable.showEventDetails(w)
}},showEventDetails:function(v){$("#provenance-event-id").text(v.eventId);
$("#provenance-event-time").html(nf.Common.formatValue(v.eventTime)).ellipsis();
$("#provenance-event-type").html(nf.Common.formatValue(v.eventType)).ellipsis();
$("#provenance-event-flowfile-uuid").html(nf.Common.formatValue(v.flowFileUuid)).ellipsis();
$("#provenance-event-component-id").html(nf.Common.formatValue(v.componentId)).ellipsis();
$("#provenance-event-component-name").html(nf.Common.formatValue(v.componentName)).ellipsis();
$("#provenance-event-component-type").html(nf.Common.formatValue(v.componentType)).ellipsis();
$("#provenance-event-details").html(nf.Common.formatValue(v.details)).ellipsis();
var z=$("#provenance-event-file-size").html(nf.Common.formatValue(v.fileSize)).ellipsis();
z.attr("title",nf.Common.formatInteger(v.fileSizeBytes)+" bytes");
var B=function(F,E){if(nf.Common.isDefinedAndNotNull(E)){if(E===0){F.text("< 1ms")
}else{F.text(nf.Common.formatDuration(E))
}}else{F.html('<span class="unset">No value set</span>')
}};
B($("#provenance-event-duration"),v.eventDuration);
B($("#provenance-lineage-duration"),v.lineageDuration);
var D=function(E,F){$('<div class="event-detail"></div>').append($('<div class="detail-name"></div>').text(E)).append($('<div class="detail-value">'+nf.Common.formatValue(F)+"</div>").ellipsis()).append($('<div class="clear"></div>')).appendTo("#additional-provenance-details")
};
if(v.eventType==="RECEIVE"){D("Source FlowFile Id",v.sourceSystemFlowFileId);
D("Transit Uri",v.transitUri)
}if(v.eventType==="SEND"){D("Transit Uri",v.transitUri)
}if(v.eventType==="ADDINFO"){D("Alternate Identifier Uri",v.alternateIdentifierUri)
}if(v.eventType==="ROUTE"){D("Relationship",v.relationship)
}if(nf.Common.isDefinedAndNotNull(v.clusterNodeId)){$("#provenance-event-cluster-node-id").text(v.clusterNodeId);
D("Node Address",v.clusterNodeAddress)
}var x=$("#parent-flowfiles-container");
var y=$("#child-flowfiles-container");
if(nf.Common.isEmpty(v.parentUuids)){$("#parent-flowfile-count").text(0);
x.append('<span class="unset">No parents</span>')
}else{$("#parent-flowfile-count").text(v.parentUuids.length);
$.each(v.parentUuids,function(E,F){$("<div></div>").text(F).appendTo(x)
})
}if(nf.Common.isEmpty(v.childUuids)){$("#child-flowfile-count").text(0);
y.append('<span class="unset">No children</span>')
}else{$("#child-flowfile-count").text(v.childUuids.length);
$.each(v.childUuids,function(E,F){$("<div></div>").text(F).appendTo(y)
})
}var u=$("#attributes-container");
$.each(v.attributes,function(E,F){var G=$('<div class="attribute-detail"></div>').append($('<div class="attribute-name">'+nf.Common.formatValue(F.name)+"</div>").ellipsis()).appendTo(u);
G.append($('<div class="attribute-value">'+nf.Common.formatValue(F.value)+"</div>").ellipsis()).append('<div class="clear"></div>');
if(F.value!==F.previousValue){G.append('<div class="modified-attribute-label">previous</div>').append($('<div class="modified-attribute-value">'+nf.Common.formatValue(F.previousValue)+"</div>").ellipsis()).append('<div class="clear"></div>')
}else{G.addClass("attribute-unmodified")
}});
var w=function(E,F){if(nf.Common.isDefinedAndNotNull(F)){E.removeClass("unset").text(F)
}else{E.addClass("unset").text("No value set")
}};
if(v.contentEqual===true){$("#output-content-details").hide();
$("#input-content-header").text("Claim");
w($("#input-content-container"),v.inputContentClaimContainer);
w($("#input-content-section"),v.inputContentClaimSection);
w($("#input-content-identifier"),v.inputContentClaimIdentifier);
w($("#input-content-offset"),v.inputContentClaimOffset);
w($("#input-content-bytes"),v.inputContentClaimFileSizeBytes);
var A=$("#input-content-size");
w(A,v.inputContentClaimFileSize);
if(nf.Common.isDefinedAndNotNull(v.inputContentClaimFileSize)){A.attr("title",nf.Common.formatInteger(v.inputContentClaimFileSizeBytes)+" bytes")
}$("#output-content-download").hide();
if(v.inputContentAvailable===true){$("#input-content-download").show();
if(e()){$("#input-content-view").show()
}else{$("#input-content-view").hide()
}}else{$("#input-content-download").hide();
$("#input-content-view").hide()
}}else{$("#output-content-details").show();
$("#input-content-header").text("Input Claim");
w($("#input-content-container"),v.inputContentClaimContainer);
w($("#input-content-section"),v.inputContentClaimSection);
w($("#input-content-identifier"),v.inputContentClaimIdentifier);
w($("#input-content-offset"),v.inputContentClaimOffset);
w($("#input-content-bytes"),v.inputContentClaimFileSizeBytes);
var A=$("#input-content-size");
w(A,v.inputContentClaimFileSize);
if(nf.Common.isDefinedAndNotNull(v.inputContentClaimFileSize)){A.attr("title",nf.Common.formatInteger(v.inputContentClaimFileSizeBytes)+" bytes")
}w($("#output-content-container"),v.outputContentClaimContainer);
w($("#output-content-section"),v.outputContentClaimSection);
w($("#output-content-identifier"),v.outputContentClaimIdentifier);
w($("#output-content-offset"),v.outputContentClaimOffset);
w($("#output-content-bytes"),v.outputContentClaimFileSizeBytes);
var C=$("#output-content-size");
w(C,v.outputContentClaimFileSize);
if(nf.Common.isDefinedAndNotNull(v.outputContentClaimFileSize)){C.attr("title",nf.Common.formatInteger(v.outputContentClaimFileSizeBytes)+" bytes")
}if(v.inputContentAvailable===true){$("#input-content-download").show();
if(e()){$("#input-content-view").show()
}else{$("#input-content-view").hide()
}}else{$("#input-content-download").hide();
$("#input-content-view").hide()
}if(v.outputContentAvailable===true){$("#output-content-download").show();
if(e()){$("#output-content-view").show()
}else{$("#output-content-view").hide()
}}else{$("#output-content-download").hide();
$("#output-content-view").hide()
}}if(nf.Common.isDFM()){if(v.replayAvailable===true){$("#replay-content, #replay-content-connection").show();
w($("#replay-connection-id"),v.sourceConnectionIdentifier);
$("#replay-content-message").hide()
}else{$("#replay-content, #replay-content-connection").hide();
$("#replay-content-message").text(v.replayExplanation).show()
}}$("#event-details-dialog").modal("show")
}}
}());
