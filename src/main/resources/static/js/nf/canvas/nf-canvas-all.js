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
nf.CanvasUtils=(function(){var a={storage:{namePrefix:"nifi-view-"},urls:{controller:"../nifi-api/controller"}};
var b=2*Math.PI;
var c=function(h,f){var e=0;
var i=h-1;
var g;
var d=0;
while(e<=i){g=~~((e+i)/2);
d=f(g);
if(d<0){i=g-1
}else{if(d>0){e=g+1
}else{break
}}}return g
};
return{config:{systemTooltipConfig:{style:{classes:"nifi-tooltip"},show:{solo:true,effect:false},hide:{effect:false},position:{at:"bottom right",my:"top left",adjust:{method:"flipinvert flipinvert"}}}},getPerimeterPoint:function(d,m){var e=Math.atan2(m.height,m.width);
var j=m.width/2;
var i=m.height/2;
var h=m.x+j;
var f=m.y+i;
var n=d.x-h;
var l=d.y-f;
var g=Math.atan2(l,n);
g=g%b;
if(g<0){g+=b
}var k=(Math.PI/2)-g;
if((g>=0&&g<e)||(g>=(b-e)&&g<b)){return{x:m.x+m.width,y:f+Math.tan(g)*j}
}else{if(g>=e&&g<(Math.PI-e)){return{x:h+Math.tan(k)*i,y:m.y+m.height}
}else{if(g>=(Math.PI-e)&&g<(Math.PI+e)){return{x:m.x,y:f-Math.tan(g)*j}
}else{return{x:h-Math.tan(k)*i,y:m.y}
}}}},showComponent:function(e,d){if(nf.Common.isDefinedAndNotNull(e)){var f=$.Deferred(function(g){if(e!==nf.Canvas.getGroupId()){nf.Canvas.setGroupId(e);
nf.Canvas.reload().done(function(){g.resolve()
}).fail(function(){nf.Dialog.showOkDialog({dialogContent:"Unable to load the group for the specified component.",overlayBackground:false});
g.reject()
})
}else{g.resolve()
}}).promise();
f.done(function(){var g=d3.select("#id-"+d);
if(!g.empty()){nf.Actions.show(g)
}else{nf.Dialog.showOkDialog({dialogContent:"Unable to find the specified component.",overlayBackground:false})
}})
}},getSelection:function(){return d3.selectAll("g.component.selected, g.connection.selected")
},centerBoundingBox:function(e){var g=nf.Canvas.View.scale();
var i=$("#canvas-container");
var f=i.width()/g;
var h=i.height()/g;
var d=[(f/2)-(e.width/2),(h/2)-(e.height/2)];
nf.Canvas.View.translate([(d[0]-e.x)*g,(d[1]-e.y)*g])
},position:function(d){if(d.empty()){return
}d.attr("transform",function(e){return"translate("+e.component.position.x+", "+e.component.position.y+")"
})
},ellipsis:function(f,h){var e=parseInt(f.attr("width"),10);
var g=f.node();
f.text(h);
if(g.getSubStringLength(0,h.length-1)>e){e-=5;
var d=c(h.length,function(i){var j=g.getSubStringLength(0,i);
if(j>e){return -1
}else{if(j<e){return 1
}}return 0
});
f.text(h.substring(0,d)+String.fromCharCode(8230))
}},multilineEllipsis:function(l,o,n){var f=1;
var g=n.split(/\s+/).reverse();
var k=parseInt(l.attr("x"),10);
var j=parseInt(l.attr("y"),10);
var e=parseInt(l.attr("width"),10);
var p=[];
var h=l.append("tspan").attr({x:k,y:j,width:e});
var d=g.pop();
while(nf.Common.isDefinedAndNotNull(d)){p.push(d);
h.text(p.join(" "));
if(h.node().getComputedTextLength()>e){p.pop();
h.text(p.join(" "));
h=l.append("tspan").attr({x:k,dy:"1.2em",width:e});
if(++f>=o){var m=[d].concat(g);
nf.CanvasUtils.ellipsis(h,m.join(" "));
break
}else{h.text(d);
p=[d]
}}d=g.pop()
}},activeThreadCount:function(e,g,h){if(nf.Common.isDefinedAndNotNull(g.status)&&g.status.activeThreadCount>0){var f=e.select("text.active-thread-count").text(function(){return g.status.activeThreadCount
}).style("display","block").each(function(){var d=this.getBBox();
d3.select(this).attr("x",function(){return g.dimensions.width-d.width-2
})
});
e.select("rect.active-thread-count-background").attr("width",function(){var d=f.node().getBBox();
return d.width+4
}).attr("x",function(){var d=f.node().getBBox();
if(typeof h==="function"){h(d.width+6)
}return g.dimensions.width-d.width-4
}).style("display","block")
}else{e.selectAll("text.active-thread-count, rect.active-thread-count-background").style("display","none")
}},disableImageHref:function(d){d.on("click.disableImageHref",function(){if(d3.event.ctrlKey){d3.event.preventDefault()
}})
},bulletins:function(e,h,i,g){g=nf.Common.isDefinedAndNotNull(g)?g:0;
var f=d3.select("#bulletin-tip-"+h.component.id);
if(!f.empty()){f.remove()
}if(nf.Common.isDefinedAndNotNull(h.status)&&!nf.Common.isEmpty(h.status.bulletins)){e.select("image.bulletin-icon").style("display","block").each(function(){var d=this.getBBox();
var j=d3.select(this);
j.attr("x",function(){return h.dimensions.width-g-d.width-4
});
f=i().append("div").attr("id",function(){return"bulletin-tip-"+h.component.id
}).attr("class","tooltip nifi-tooltip").html(function(){var l=nf.Common.getFormattedBulletins(h.status.bulletins);
var k=nf.Common.formatUnorderedList(l);
if(k===null||k.length===0){return""
}else{return $("<div></div>").append(k).html()
}});
nf.CanvasUtils.canvasTooltip(f,j)
})
}else{e.selectAll("image.bulletin-icon").style("display","none")
}},canvasTooltip:function(d,e){e.on("mouseenter",function(){d.style("top",(d3.event.pageY+15)+"px").style("left",(d3.event.pageX+15)+"px").style("display","block")
}).on("mousemove",function(){d.style("top",(d3.event.pageY+15)+"px").style("left",(d3.event.pageX+15)+"px")
}).on("mouseleave",function(){d.style("display","none")
})
},isConnection:function(d){return d.classed("connection")
},isRemoteProcessGroup:function(d){return d.classed("remote-process-group")
},isProcessor:function(d){return d.classed("processor")
},isLabel:function(d){return d.classed("label")
},isInputPort:function(d){return d.classed("input-port")
},isOutputPort:function(d){return d.classed("output-port")
},isProcessGroup:function(d){return d.classed("process-group")
},isFunnel:function(d){return d.classed("funnel")
},areRunnable:function(d){if(d.empty()){return false
}var e=true;
d.each(function(){if(!nf.CanvasUtils.isRunnable(d3.select(this))){e=false;
return false
}});
return e
},isRunnable:function(d){var f=false;
var e=d.datum();
if(nf.CanvasUtils.isProcessor(d)){f=nf.CanvasUtils.supportsModification(d)&&nf.Common.isEmpty(e.component.validationErrors)
}else{if(nf.CanvasUtils.isInputPort(d)||nf.CanvasUtils.isOutputPort(d)){f=nf.CanvasUtils.supportsModification(d)
}else{if(nf.CanvasUtils.isProcessGroup(d)){f=true
}}}return f
},areStoppable:function(d){if(d.empty()){return false
}var e=true;
d.each(function(){if(!nf.CanvasUtils.isStoppable(d3.select(this))){e=false;
return false
}});
return e
},isStoppable:function(d){var f=false;
var e=d.datum();
if(nf.CanvasUtils.isProcessor(d)||nf.CanvasUtils.isInputPort(d)||nf.CanvasUtils.isOutputPort(d)){f=e.component.state==="RUNNING"
}else{if(nf.CanvasUtils.isProcessGroup(d)){f=true
}}return f
},canAllStartTransmitting:function(d){if(d.empty()){return false
}var e=true;
d.each(function(){if(!nf.CanvasUtils.canStartTransmitting(d3.select(this))){e=false;
return false
}});
return e
},canStartTransmitting:function(d){return nf.CanvasUtils.isRemoteProcessGroup(d)
},canAllStopTransmitting:function(d){if(d.empty()){return false
}var e=true;
d.each(function(){if(!nf.CanvasUtils.canStopTransmitting(d3.select(this))){e=false;
return false
}});
return e
},canStopTransmitting:function(d){return nf.CanvasUtils.isRemoteProcessGroup(d)
},isDeletable:function(d){if(d.empty()){return false
}return nf.CanvasUtils.supportsModification(d)
},supportsModification:function(k){var i=k.datum();
var g=false;
if(nf.CanvasUtils.isProcessor(k)||nf.CanvasUtils.isInputPort(k)||nf.CanvasUtils.isOutputPort(k)){if(nf.Common.isDefinedAndNotNull(i.status)){g=!(i.component.state==="RUNNING"||nf.Common.isDefinedAndNotNull(i.status.activeThreadCount)&&i.status.activeThreadCount>0)
}else{g=i.component.state!=="RUNNING"
}}else{if(nf.CanvasUtils.isRemoteProcessGroup(k)){if(nf.Common.isDefinedAndNotNull(i.status)){g=!(i.component.transmitting===true||nf.Common.isDefinedAndNotNull(i.status.activeThreadCount)&&i.status.activeThreadCount>0)
}else{g=i.component.transmitting!==true
}}else{if(nf.CanvasUtils.isProcessGroup(k)){g=true
}else{if(nf.CanvasUtils.isFunnel(k)){g=true
}else{if(nf.CanvasUtils.isLabel(k)){g=true
}else{if(nf.CanvasUtils.isConnection(k)){var j=false;
var e=false;
var l=nf.CanvasUtils.getConnectionSourceComponentId(i.component);
var d=d3.select("#id-"+l);
if(!d.empty()){if(nf.CanvasUtils.isRemoteProcessGroup(d)||nf.CanvasUtils.isProcessGroup(d)){j=true
}else{j=nf.CanvasUtils.supportsModification(d)
}}var f=nf.CanvasUtils.getConnectionDestinationComponentId(i.component);
var h=d3.select("#id-"+f);
if(!h.empty()){if(nf.CanvasUtils.isRemoteProcessGroup(h)||nf.CanvasUtils.isProcessGroup(h)){e=true
}else{e=nf.CanvasUtils.supportsModification(h)
}}g=j&&e
}}}}}}return g
},getConnectableTypeForSource:function(e){var d;
if(nf.CanvasUtils.isProcessor(e)){d="PROCESSOR"
}else{if(nf.CanvasUtils.isRemoteProcessGroup(e)){d="REMOTE_OUTPUT_PORT"
}else{if(nf.CanvasUtils.isProcessGroup(e)){d="OUTPUT_PORT"
}else{if(nf.CanvasUtils.isInputPort(e)){d="INPUT_PORT"
}else{if(nf.CanvasUtils.isFunnel(e)){d="FUNNEL"
}}}}}return d
},getConnectableTypeForDestination:function(e){var d;
if(nf.CanvasUtils.isProcessor(e)){d="PROCESSOR"
}else{if(nf.CanvasUtils.isRemoteProcessGroup(e)){d="REMOTE_INPUT_PORT"
}else{if(nf.CanvasUtils.isProcessGroup(e)){d="INPUT_PORT"
}else{if(nf.CanvasUtils.isOutputPort(e)){d="OUTPUT_PORT"
}else{if(nf.CanvasUtils.isFunnel(e)){d="FUNNEL"
}}}}}return d
},isCopyable:function(e){if(e.empty()){return false
}var d=e.filter(function(i){var g=d3.select(this);
if(nf.CanvasUtils.isConnection(g)){var f=!e.filter(function(j){var k=nf.CanvasUtils.getConnectionSourceComponentId(i.component);
return k===j.component.id
}).empty();
var h=!e.filter(function(j){var k=nf.CanvasUtils.getConnectionDestinationComponentId(i.component);
return k===j.component.id
}).empty();
return f&&h
}else{return nf.CanvasUtils.isProcessor(g)||nf.CanvasUtils.isFunnel(g)||nf.CanvasUtils.isLabel(g)||nf.CanvasUtils.isProcessGroup(g)||nf.CanvasUtils.isRemoteProcessGroup(g)||nf.CanvasUtils.isInputPort(g)||nf.CanvasUtils.isOutputPort(g)
}});
return e.size()===d.size()
},isPastable:function(){return nf.Clipboard.isCopied()
},persistUserView:function(){var d=a.storage.namePrefix+nf.Canvas.getGroupId();
var f=nf.Canvas.View.translate();
var e={scale:nf.Canvas.View.scale(),translateX:f[0],translateY:f[1]};
nf.Storage.setItem(d,e)
},formatConnectionName:function(d){if(!nf.Common.isBlank(d.name)){return d.name
}else{if(nf.Common.isDefinedAndNotNull(d.selectedRelationships)){return d.selectedRelationships.join(", ")
}}return""
},getConnectionSourceComponentId:function(d){var e=d.source.id;
if(d.source.groupId!==nf.Canvas.getGroupId()){e=d.source.groupId
}return e
},getConnectionDestinationComponentId:function(d){var e=d.destination.id;
if(d.destination.groupId!==nf.Canvas.getGroupId()){e=d.destination.groupId
}return e
},restoreUserView:function(){var g=false;
try{var d=a.storage.namePrefix+nf.Canvas.getGroupId();
var f=nf.Storage.getItem(d);
if(nf.Common.isDefinedAndNotNull(f)){if(isFinite(f.scale)&&isFinite(f.translateX)&&isFinite(f.translateY)){nf.Canvas.View.translate([f.translateX,f.translateY]);
nf.Canvas.View.scale(f.scale);
nf.Canvas.View.refresh({transition:true});
g=true
}}}catch(h){}return g
},enterGroup:function(d){nf.Canvas.setGroupId(d);
nf.Graph.removeAll();
return nf.Canvas.reload().done(function(){var e=nf.CanvasUtils.restoreUserView();
if(e===false){nf.Canvas.View.fit();
nf.Canvas.View.refresh({transition:true})
}}).fail(function(){nf.Dialog.showOkDialog({dialogContent:"Unable to enter the selected group.",overlayBackground:false})
})
},getOrigin:function(e){var d={};
e.each(function(g){var f=d3.select(this);
if(!nf.CanvasUtils.isConnection(f)){if(nf.Common.isUndefined(d.x)||g.component.position.x<d.x){d.x=g.component.position.x
}if(nf.Common.isUndefined(d.y)||g.component.position.y<d.y){d.y=g.component.position.y
}}});
return d
},moveComponents:function(e,f){var d=f.datum();
nf.CanvasUtils.eligibleForMove(e,f).done(function(){var g=nf.Snippet.marshal(e,true);
nf.Snippet.create(g).done(function(h){var i=h.snippet;
nf.Snippet.move(i.id,d.component.id).done(function(){var k=d3.map();
var j=function(l,m){if(!k.has(l)){k.set(l,[])
}k.get(l).push(m)
};
e.each(function(l){j(l.type,l.component.id)
});
k.forEach(function(m,l){nf[m].remove(l)
});
nf.ProcessGroup.reload(d.component)
}).fail(nf.Common.handleAjaxError).always(function(){nf.Snippet.unlink(i.id).done(function(){nf.Snippet.remove(i.id)
})
})
}).fail(nf.Common.handleAjaxError)
})
},trimDanglingEdges:function(d){var e=function(f){var j=nf.CanvasUtils.getConnectionSourceComponentId(f);
var i=nf.CanvasUtils.getConnectionDestinationComponentId(f);
var h=false;
var g=false;
d.each(function(k){if(k.component.id===j){h=true
}if(k.component.id===i){g=true
}});
return h&&g
};
return d.filter(function(f){if(f.type==="Connection"){return e(f.component)
}else{return true
}})
},isDisconnected:function(f){var e=d3.map();
var g=d3.map();
var d=true;
f.filter(function(h){return h.type==="Connection"
}).each(function(h){e.set(h.component.id,h.component)
});
f.filter(function(h){return h.type!=="Connection"
}).each(function(h){g.set(h.component.id,h.component);
$.each(nf.Connection.getComponentConnections(h.component.id),function(j,i){if(!e.has(i.id)){d=false;
return false
}})
});
if(d){e.forEach(function(i,h){if(d){d=g.has(nf.CanvasUtils.getConnectionSourceComponentId(h))&&g.has(nf.CanvasUtils.getConnectionDestinationComponentId(h))
}})
}return d
},eligibleForMove:function(f,g){var d=[];
var e=[];
f.each(function(i){var h=d3.select(this);
if(nf.CanvasUtils.isInputPort(h)){d.push(h.datum())
}else{if(nf.CanvasUtils.isOutputPort(h)){e.push(h.datum())
}}});
return $.Deferred(function(h){if(d.length>0||e.length>0){var j=function(){return $.Deferred(function(k){if(nf.Canvas.getParentGroupId()===null){nf.Dialog.showOkDialog({dialogContent:"Ports in the root group cannot be moved into another group.",overlayBackground:false});
k.reject()
}else{$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getParentGroupId())+"/connections",dataType:"json"}).done(function(l){var n=l.connections;
var m=[];
if(!nf.Common.isEmpty(n)){$.each(d,function(p,o){$.each(n,function(r,q){if(o.component.id===q.destination.id){m.push(nf.Common.escapeHtml(o.component.name))
}})
});
$.each(e,function(o,p){$.each(n,function(r,q){if(p.component.id===q.source.id){m.push(nf.Common.escapeHtml(p.component.name))
}})
})
}if(m.length>0){nf.Dialog.showOkDialog({dialogContent:"The following ports are currently connected outside of this group: <b>"+m.join("</b>, <b>")+"</b>",overlayBackground:false});
k.reject()
}else{k.resolve()
}}).fail(function(){k.reject()
})
}}).promise()
};
var i=function(){return $.Deferred(function(l){var k=g.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(k.component.id),data:{verbose:true},dataType:"json"}).done(function(n){var p=n.processGroup;
var q=p.contents;
var o=[];
var m=function(r,s){if(r.length>0&&!nf.Common.isEmpty(s)){$.each(r,function(u,t){$.each(s,function(w,v){if(t.component.name===v.name){o.push(nf.Common.escapeHtml(v.name))
}})
})
}};
m(d,q.inputPorts);
m(e,q.outputPorts);
if(o.length>0){nf.Dialog.showOkDialog({dialogContent:"The following ports already exist in the target process group: <b>"+o.join("</b>, <b>")+"</b>",overlayBackground:false});
l.reject()
}else{l.resolve()
}}).fail(function(){l.reject()
})
}).promise()
};
j().done(function(){if(nf.Common.isDefinedAndNotNull(g)){$.when(i()).done(function(){h.resolve()
}).fail(function(){h.reject()
})
}else{h.resolve()
}}).fail(function(){h.reject()
})
}else{h.resolve()
}}).promise()
},isValidConnectionSource:function(d){if(d.size()!==1){return false
}return nf.CanvasUtils.isProcessor(d)||nf.CanvasUtils.isProcessGroup(d)||nf.CanvasUtils.isRemoteProcessGroup(d)||nf.CanvasUtils.isInputPort(d)||nf.CanvasUtils.isFunnel(d)
},isValidConnectionDestination:function(d){if(d.size()!==1){return false
}return nf.CanvasUtils.isProcessor(d)||nf.CanvasUtils.isProcessGroup(d)||nf.CanvasUtils.isRemoteProcessGroup(d)||nf.CanvasUtils.isOutputPort(d)||nf.CanvasUtils.isFunnel(d)
}}
}());
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
$(document).ready(function(){$("#shell-dialog").modal({overlayBackground:true});
$("#shell-close-button").click(function(){$("#shell-dialog").modal("hide")
});
$("#shell-undock-button").click(function(){var a=$("#shell-iframe").attr("src");
if(!nf.Common.isBlank(a)){window.open(a);
$("#shell-dialog").modal("hide")
}});
nf.Common.addHoverEffect("#shell-undock-button","undock-normal","undock-hover");
nf.Common.addHoverEffect("#shell-close-button","close-normal","close-hover")
});
nf.Shell=(function(){return{showPage:function(a,b){if(nf.Common.isDefinedAndNotNull(nf.ContextMenu)){nf.ContextMenu.hide()
}return $.Deferred(function(c){var d=$("#shell");
if(nf.Common.isNull(b)||nf.Common.isUndefined(b)){b=true
}d.empty();
$("#shell-dialog").modal("setHandler",{close:function(){c.resolve()
}});
$("#shell-dialog").modal("show");
if(b){$("#shell-undock-button").show()
}else{$("#shell-undock-button").hide()
}var e=$("<iframe/>",{id:"shell-iframe",frameBorder:"0",src:a}).css({width:d.width(),height:d.height()}).appendTo(d);
$(window).resize(function(){e.css({width:d.width(),height:d.height()})
})
}).promise()
},showContent:function(a){if(nf.Common.isDefinedAndNotNull(nf.ContextMenu)){nf.ContextMenu.hide()
}return $.Deferred(function(b){var f=$(a);
if(f.length){var c=$("#shell");
c.empty();
var e=f.parent();
f.detach();
$("#shell-dialog").modal("setHandler",{close:function(){b.resolve();
f.hide().detach().appendTo(e)
}});
$("#shell-undock-button").hide();
var d=$("<div>").css({width:c.width(),height:c.height()}).append(f).appendTo(c);
$("#shell-dialog").modal("show");
f.show();
$(window).resize(function(){d.css({width:c.width(),height:c.height()})
})
}}).promise()
}}
}());
nf.Storage=(function(){var c=86400000*2;
var a;
var b=(function(){var f="test";
try{localStorage.setItem(f,f);
localStorage.removeItem(f);
return true
}catch(d){return false
}}());
return{init:function(){if(b){for(var h=0;
h<localStorage.length;
h++){try{var g=localStorage.key(h);
var j=JSON.parse(localStorage.getItem(g));
var d=new Date(j.expires);
var f=new Date();
if(d.valueOf()<f.valueOf()){localStorage.removeItem(g)
}}catch(k){}}}else{a=d3.map()
}},setItem:function(e,g){if(b){var d=new Date().valueOf()+c;
var f={expires:d,item:g};
localStorage.setItem(e,JSON.stringify(f))
}else{a.set(e,g)
}},getItem:function(d){if(b){try{var f=JSON.parse(localStorage.getItem(d));
if(nf.Common.isDefinedAndNotNull(f)&&nf.Common.isDefinedAndNotNull(f.item)){return f.item
}else{return null
}}catch(g){return null
}}else{return a.get(d)
}},removeItem:function(d){if(b){localStorage.removeItem(d)
}else{a.remove(d)
}}}
}());
nf.Snippet=(function(){var a={urls:{snippets:"../nifi-api/controller/snippets",processGroups:"../nifi-api/controller/process-groups"}};
return{marshal:function(b,d){var c={parentGroupId:nf.Canvas.getGroupId(),linked:nf.Common.isDefinedAndNotNull(d)?d:false,processorIds:[],funnelIds:[],inputPortIds:[],outputPortIds:[],remoteProcessGroupIds:[],processGroupIds:[],connectionIds:[],labelIds:[]};
b.each(function(f){var e=d3.select(this);
if(nf.CanvasUtils.isProcessor(e)){c.processorIds.push(f.component.id)
}else{if(nf.CanvasUtils.isFunnel(e)){c.funnelIds.push(f.component.id)
}else{if(nf.CanvasUtils.isLabel(e)){c.labelIds.push(f.component.id)
}else{if(nf.CanvasUtils.isInputPort(e)){c.inputPortIds.push(f.component.id)
}else{if(nf.CanvasUtils.isOutputPort(e)){c.outputPortIds.push(f.component.id)
}else{if(nf.CanvasUtils.isProcessGroup(e)){c.processGroupIds.push(f.component.id)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(e)){c.remoteProcessGroupIds.push(f.component.id)
}else{if(nf.CanvasUtils.isConnection(e)){c.connectionIds.push(f.component.id)
}}}}}}}}});
return c
},create:function(c){var b=nf.Client.getRevision();
return $.ajax({type:"POST",url:a.urls.snippets,data:$.extend({version:b.version,clientId:b.clientId},c),dataType:"json"}).done(function(d){nf.Client.setRevision(d.revision)
})
},copy:function(e,d,b){var c=nf.Client.getRevision();
return $.ajax({type:"POST",url:a.urls.processGroups+"/"+encodeURIComponent(d)+"/snippet-instance",data:{version:c.version,clientId:c.clientId,snippetId:e,originX:b.x,originY:b.y},dataType:"json"}).done(function(f){nf.Client.setRevision(f.revision)
})
},remove:function(c){var b=nf.Client.getRevision();
return $.ajax({type:"DELETE",url:a.urls.snippets+"/"+encodeURIComponent(c)+"?"+$.param({version:b.version,clientId:b.clientId})}).done(function(d){nf.Client.setRevision(d.revision)
})
},move:function(c,d){var b=nf.Client.getRevision();
return $.ajax({type:"PUT",url:a.urls.snippets+"/"+encodeURIComponent(c),data:{version:b.version,clientId:b.clientId,parentGroupId:d},dataType:"json"}).done(function(e){nf.Client.setRevision(e.revision)
})
},unlink:function(c){var b=nf.Client.getRevision();
return $.ajax({type:"PUT",url:a.urls.snippets+"/"+encodeURIComponent(c),data:{version:b.version,clientId:b.clientId,linked:false},dataType:"json"}).done(function(d){nf.Client.setRevision(d.revision)
})
},link:function(c){var b=nf.Client.getRevision();
return $.ajax({type:"PUT",url:a.urls.snippets+"/"+encodeURIComponent(c),data:{version:b.version,clientId:b.clientId,linked:true},dataType:"json"}).done(function(d){nf.Client.setRevision(d.revision)
})
}}
}());
nf.CanvasToolbox=(function(){var s={maxTags:25,maxTagFontSize:2,minTagFontSize:1,minWidth:20,filterText:"Filter",type:{processor:"Processor",inputPort:"Input Port",outputPort:"Output Port",processGroup:"Process Group",remoteProcessGroup:"Remote Process Group",connection:"Connection",funnel:"Funnel",template:"Template",label:"Label"},styles:{filterList:"filter-list"},urls:{controller:"../nifi-api/controller",processorTypes:"../nifi-api/controller/processor-types",templates:"../nifi-api/controller/templates"}};
var d=function(C,D,z,y,x,B){var A=C+"-icon";
$("<div/>").attr("id",A).attr("title",C).addClass(z).addClass("pointer").addClass("toolbox-icon").hover(function(){$(this).removeClass(z).addClass(y)
},function(){$(this).removeClass(y).addClass(z)
}).draggable({zIndex:1011,helper:function(){return $('<div class="toolbox-icon"></div>').addClass(x).appendTo("body")
},containment:"body",start:function(F,E){nf.ContextMenu.hide()
},stop:function(I,H){var K=nf.Canvas.View.translate();
var J=nf.Canvas.View.scale();
var G=I.originalEvent.pageX;
var F=I.originalEvent.pageY-nf.Canvas.CANVAS_OFFSET;
if(G>=0&&F>=0){var E=(G/J)-(K[0]/J);
var L=(F/J)-(K[1]/J);
B({x:E,y:L})
}}}).appendTo(D)
};
var w=function(x){var z=$("#tag-filter");
var C=false;
z.find("li div.selected-tag-text").each(function(){if(x===$(this).text()){C=true;
return false
}});
if(!C){var B=$('<div class="selected-tag-text"></div>').text(x);
var y=$('<img src="images/iconDelete.png" class="remove-selected-tag pointer"></img>').click(function(){$(this).closest("li").remove();
v()
});
var A=$("<div></div>").append(B).append(y);
$("<li></li>").append(A).appendTo(z);
v()
}};
var v=function(){var x=$("#processor-types-table").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(x)){var y=x.getData();
y.setFilterArgs({searchString:q(),property:$("#processor-type-filter-options").combo("getSelectedOption").value});
y.refresh()
}};
var u=function(y,x){if(x.searchString===""){return true
}try{var A=new RegExp(x.searchString,"i")
}catch(z){return false
}return y[x.property].search(A)>=0
};
var h=function(C,z){var y=u(C,z);
var x=true;
if(y){var A=$("#tag-filter li");
var B=A.length>0;
if(B){x=i(A,C.tags)
}}var D=y&&x;
if(D===false&&$("#selected-processor-type").text()===C.type){$("#processor-type-description").text("");
$("#processor-type-name").text("");
$("#selected-processor-name").text("");
$("#selected-processor-type").text("");
var E=$("#processor-types-table").data("gridInstance");
E.resetActiveCell()
}return D
};
var i=function(z,x){var y=[];
z.each(function(){y.push($(this).text())
});
var A=x.toLowerCase();
var B=true;
$.each(y,function(C,D){if(A.indexOf(D)===-1){B=false;
return false
}});
return B
};
var r=function(x,z){var y=function(C,A){var B=nf.Common.isDefinedAndNotNull(C[x.columnId])?C[x.columnId]:"";
var D=nf.Common.isDefinedAndNotNull(A[x.columnId])?A[x.columnId]:"";
return B===D?0:B>D?1:-1
};
z.sort(y,x.sortAsc)
};
var q=function(){var y="";
var x=$("#processor-type-filter");
if(!x.hasClass(s.styles.filterList)){y=x.val()
}return y
};
var f=function(){var x=$("#tag-filter");
x.empty();
$("#processor-type-filter").addClass(s.styles.filterList).val(s.filterText);
v();
$("#processor-type-description").text("");
$("#processor-type-name").text("");
$("#selected-processor-name").text("");
$("#selected-processor-type").text("");
var y=$("#processor-types-table").data("gridInstance");
y.setSelectedRows([]);
y.resetActiveCell()
};
var k=function(A){var z=function(){var B=$("#selected-processor-name").text();
var C=$("#selected-processor-type").text();
if(B===""||C===""){nf.Dialog.showOkDialog({dialogContent:"The type of processor to create must be selected.",overlayBackground:false})
}else{g(B,C,A)
}$("#new-processor-dialog").modal("hide")
};
var y=$("#processor-types-table").data("gridInstance");
var x=function(C,B){var D=y.getDataItem(B.row);
$("#selected-processor-name").text(D.label);
$("#selected-processor-type").text(D.type);
z()
};
y.onDblClick.subscribe(x);
$("#new-processor-dialog").modal("setButtonModel",[{buttonText:"Add",handler:{click:z}},{buttonText:"Cancel",handler:{click:function(){$("#new-processor-dialog").modal("hide")
}}}]);
$("#new-processor-dialog").modal("setHandler",{close:function(){y.onDblClick.unsubscribe(x);
f()
}});
$("#new-processor-dialog").modal("show");
y.resizeCanvas()
};
var g=function(y,A,z){var x=nf.Client.getRevision();
$.ajax({type:"POST",url:s.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId())+"/processors",data:{version:x.version,clientId:x.clientId,name:y,type:A,x:z.x,y:z.y},dataType:"json"}).done(function(B){if(nf.Common.isDefinedAndNotNull(B.processor)){nf.Client.setRevision(B.revision);
nf.Graph.add({processors:[B.processor]},true);
nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh()
}}).fail(nf.Common.handleAjaxError)
};
var b=function(y){var x=function(){$("#new-port-dialog").modal("hide");
var z=$("#new-port-name").val();
$("#new-port-name").val("");
m(z,y)
};
$("#new-port-dialog").modal("setButtonModel",[{buttonText:"Add",handler:{click:x}},{buttonText:"Cancel",handler:{click:function(){$("#new-port-dialog").modal("hide")
}}}]);
$("#new-port-type").text("Input");
$("#new-port-dialog").modal("show");
$("#new-port-name").focus().off("keyup").on("keyup",function(A){var z=A.keyCode?A.keyCode:A.which;
if(z===$.ui.keyCode.ENTER){x()
}})
};
var m=function(z,y){var x=nf.Client.getRevision();
$.ajax({type:"POST",url:s.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId())+"/input-ports",data:{version:x.version,clientId:x.clientId,name:z,x:y.x,y:y.y},dataType:"json"}).done(function(A){if(nf.Common.isDefinedAndNotNull(A.inputPort)){nf.Client.setRevision(A.revision);
nf.Graph.add({inputPorts:[A.inputPort]},true);
nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh()
}}).fail(nf.Common.handleAjaxError)
};
var a=function(y){var x=function(){$("#new-port-dialog").modal("hide");
var z=$("#new-port-name").val();
$("#new-port-name").val("");
j(z,y)
};
$("#new-port-dialog").modal("setButtonModel",[{buttonText:"Add",handler:{click:x}},{buttonText:"Cancel",handler:{click:function(){$("#new-port-dialog").modal("hide")
}}}]);
$("#new-port-type").text("Output");
$("#new-port-dialog").modal("show");
$("#new-port-name").focus().off("keyup").on("keyup",function(A){var z=A.keyCode?A.keyCode:A.which;
if(z===$.ui.keyCode.ENTER){x()
}})
};
var j=function(z,y){var x=nf.Client.getRevision();
$.ajax({type:"POST",url:s.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId())+"/output-ports",data:{version:x.version,clientId:x.clientId,name:z,x:y.x,y:y.y},dataType:"json"}).done(function(A){if(nf.Common.isDefinedAndNotNull(A.outputPort)){nf.Client.setRevision(A.revision);
nf.Graph.add({outputPorts:[A.outputPort]},true);
nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh()
}}).fail(nf.Common.handleAjaxError)
};
var p=function(z,y){var x=nf.Client.getRevision();
return $.ajax({type:"POST",url:s.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId())+"/process-group-references",data:{version:x.version,clientId:x.clientId,name:z,x:y.x,y:y.y},dataType:"json"}).done(function(A){if(nf.Common.isDefinedAndNotNull(A.processGroup)){nf.Client.setRevision(A.revision);
nf.Graph.add({processGroups:[A.processGroup]},true);
nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh()
}}).fail(nf.Common.handleAjaxError)
};
var c=function(y){var x=function(){$("#new-remote-process-group-dialog").modal("hide");
var z=$("#new-remote-process-group-uri").val();
$("#new-remote-process-group-uri").val("");
e(z,y)
};
$("#new-remote-process-group-dialog").modal("setButtonModel",[{buttonText:"Add",handler:{click:x}},{buttonText:"Cancel",handler:{click:function(){$("#new-remote-process-group-dialog").modal("hide")
}}}]);
$("#new-remote-process-group-dialog").modal("show");
$("#new-remote-process-group-uri").focus().off("keyup").on("keyup",function(A){var z=A.keyCode?A.keyCode:A.which;
if(z===$.ui.keyCode.ENTER){x()
}})
};
var e=function(z,y){var x=nf.Client.getRevision();
$.ajax({type:"POST",url:s.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId())+"/remote-process-groups",data:{version:x.version,clientId:x.clientId,uri:z,x:y.x,y:y.y},dataType:"json"}).done(function(A){if(nf.Common.isDefinedAndNotNull(A.remoteProcessGroup)){nf.Client.setRevision(A.revision);
nf.Graph.add({remoteProcessGroups:[A.remoteProcessGroup]},true);
nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh()
}}).fail(nf.Common.handleAjaxError)
};
var n=function(y){var x=nf.Client.getRevision();
$.ajax({type:"POST",url:s.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId())+"/funnels",data:{version:x.version,clientId:x.clientId,x:y.x,y:y.y},dataType:"json"}).done(function(z){if(nf.Common.isDefinedAndNotNull(z.funnel)){nf.Client.setRevision(z.revision);
nf.Graph.add({funnels:[z.funnel]},true);
nf.Birdseye.refresh()
}}).fail(nf.Common.handleAjaxError)
};
var t=function(x){$.ajax({type:"GET",url:s.urls.templates,dataType:"json"}).done(function(y){var A=y.templates;
if(nf.Common.isDefinedAndNotNull(A)&&A.length>0){var z=[];
$.each(A,function(B,C){z.push({text:C.name,value:C.id,description:nf.Common.escapeHtml(C.description)})
});
$("#available-templates").combo({maxHeight:300,options:z});
$("#instantiate-template-dialog").modal("setButtonModel",[{buttonText:"Add",handler:{click:function(){var C=$("#available-templates").combo("getSelectedOption");
var B=C.value;
$("#instantiate-template-dialog").modal("hide");
l(B,x)
}}},{buttonText:"Cancel",handler:{click:function(){$("#instantiate-template-dialog").modal("hide")
}}}]);
$("#instantiate-template-dialog").modal("show")
}else{nf.Dialog.showOkDialog({headerText:"Instantiate Template",dialogContent:"No templates have been loaded into this NiFi.",overlayBackground:false})
}}).fail(nf.Common.handleAjaxError)
};
var l=function(y,z){var x=nf.Client.getRevision();
$.ajax({type:"POST",url:s.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId())+"/template-instance",data:{version:x.version,clientId:x.clientId,templateId:y,originX:z.x,originY:z.y},dataType:"json"}).done(function(A){nf.Client.setRevision(A.revision);
nf.Graph.add(A.contents,true);
nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh()
}).fail(nf.Common.handleAjaxError)
};
var o=function(y){var x=nf.Client.getRevision();
$.ajax({type:"POST",url:s.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId())+"/labels",data:{version:x.version,clientId:x.clientId,x:y.x,y:y.y,width:nf.Label.config.width,height:nf.Label.config.height},dataType:"json"}).done(function(z){if(nf.Common.isDefinedAndNotNull(z.label)){nf.Client.setRevision(z.revision);
nf.Label.add(z.label,true);
nf.Birdseye.refresh()
}}).fail(nf.Common.handleAjaxError)
};
return{init:function(){var A=$("#toolbox");
if(nf.Common.isDFM()){d(s.type.processor,A,"processor-icon","processor-icon-hover","processor-icon-drag",k);
d(s.type.inputPort,A,"input-port-icon","input-port-icon-hover","input-port-icon-drag",b);
d(s.type.outputPort,A,"output-port-icon","output-port-icon-hover","output-port-icon-drag",a);
d(s.type.processGroup,A,"process-group-icon","process-group-icon-hover","process-group-icon-drag",nf.CanvasToolbox.promptForGroupName);
d(s.type.remoteProcessGroup,A,"remote-process-group-icon","remote-process-group-icon-hover","remote-process-group-icon-drag",c);
d(s.type.funnel,A,"funnel-icon","funnel-icon-hover","funnel-icon-drag",n);
d(s.type.template,A,"template-icon","template-icon-hover","template-icon-drag",t);
d(s.type.label,A,"label-icon","label-icon-hover","label-icon-drag",o);
$("#processor-type-filter-options").combo({options:[{text:"by type",value:"label"},{text:"by tag",value:"tags"}],select:function(C){v()
}});
var y=[{id:"type",name:"Type",field:"label",sortable:true,resizable:true},{id:"tags",name:"Tags",field:"tags",sortable:true,resizable:true}];
var B={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,autoEdit:false,multiSelect:false};
var z=new Slick.Data.DataView({inlineFilters:false});
z.setItems([]);
z.setFilterArgs({searchString:q(),property:$("#processor-type-filter-options").combo("getSelectedOption").value});
z.setFilter(h);
r({columnId:"type",sortAsc:true},z);
var x=new Slick.Grid("#processor-types-table",z,y,B);
x.setSelectionModel(new Slick.RowSelectionModel());
x.registerPlugin(new Slick.AutoTooltips());
x.setSortColumn("type",true);
x.onSort.subscribe(function(D,C){r({columnId:C.sortCol.field,sortAsc:C.sortAsc},z)
});
x.onSelectedRowsChanged.subscribe(function(E,D){if($.isArray(D.rows)&&D.rows.length===1){var C=D.rows[0];
var F=x.getDataItem(C);
if(nf.Common.isBlank(F.description)){$("#processor-type-description").attr("title","").html('<span class="unset">No description specified</span>')
}else{$("#processor-type-description").text(F.description).ellipsis()
}$("#processor-type-name").text(F.label).ellipsis();
$("#selected-processor-name").text(F.label);
$("#selected-processor-type").text(F.type)
}});
$("#processor-types-table").data("gridInstance",x);
$.ajax({type:"GET",url:s.urls.processorTypes,dataType:"json"}).done(function(C){var E={};
var D=[];
z.beginUpdate();
$.each(C.processorTypes,function(G,I){var H=I.type;
z.addItem({id:G,label:nf.Common.substringAfterLast(H,"."),type:H,description:nf.Common.escapeHtml(I.description),tags:I.tags.join(", ")});
$.each(I.tags,function(L,J){var M=J.toLowerCase();
if(nf.Common.isDefinedAndNotNull(E[M])){E[M].count=E[M].count+1
}else{var K={term:M,count:1};
D.push(K);
E[M]=K
}})
});
z.endUpdate();
$("#total-processor-types, #displayed-processor-types").text(C.processorTypes.length);
if(D.length>0){D.sort(function(H,G){return G.count-H.count
});
if(D.length>s.maxTags){D=D.slice(0,s.maxTags)
}var F=D[0].count;
D.sort(function(H,G){var J=H.term.toUpperCase();
var I=G.term.toUpperCase();
return(J<I)?-1:(J>I)?1:0
});
$.each(D,function(H,G){var J=Math.log(G.count)/Math.log(F)*(s.maxTagFontSize-s.minTagFontSize)+s.minTagFontSize;
var I=s.minWidth*J;
$("<li></li>").append($('<span class="link"></span>').text(G.term).css({"font-size":J+"em"})).css({"min-width":I+"px"}).click(function(){if($("#tag-filter").children("li").length<5){var K=$(this).children("span").text();
w(K)
}}).appendTo("#tag-cloud").ellipsis()
})
}else{$('<li><span class="unset">No tags specified</span></li>').appendTo("#tag-cloud")
}z.onRowCountChanged.subscribe(function(H,G){x.updateRowCount();
x.render();
$("#displayed-processor-types").text(G.current)
});
z.onRowsChanged.subscribe(function(H,G){x.invalidateRows(G.rows);
x.render()
});
z.syncGridSelection(x,false)
}).fail(nf.Common.handleAjaxError);
$("#processor-type-filter").keyup(function(){v()
}).focus(function(){if($(this).hasClass(s.styles.filterList)){$(this).removeClass(s.styles.filterList).val("")
}}).blur(function(){if($(this).val()===""){$(this).addClass(s.styles.filterList).val(s.filterText)
}}).addClass(s.styles.filterList).val(s.filterText);
$("#new-processor-dialog").modal({headerText:"Add Processor",overlayBackground:false});
$("#new-port-dialog").modal({headerText:"Add Port",overlayBackground:false});
$("#new-process-group-dialog").modal({headerText:"Add Process Group",overlayBackground:false});
$("#new-remote-process-group-dialog").modal({headerText:"Add Remote Process Group",overlayBackground:false});
$("#instantiate-template-dialog").modal({headerText:"Instantiate Template",overlayBackgroud:false})
}else{$("<div/>").attr("title",s.type.processor).addClass("processor-icon-disable").addClass("toolbox-icon").appendTo(A);
$("<div/>").attr("title",s.type.inputPort).addClass("input-port-icon-disable").addClass("toolbox-icon").appendTo(A);
$("<div/>").attr("title",s.type.outputPort).addClass("output-port-icon-disable").addClass("toolbox-icon").appendTo(A);
$("<div/>").attr("title",s.type.processGroup).addClass("process-group-icon-disable").addClass("toolbox-icon").appendTo(A);
$("<div/>").attr("title",s.type.remoteProcessGroup).addClass("remote-process-group-icon-disable").addClass("toolbox-icon").appendTo(A);
$("<div/>").attr("title",s.type.funnel).addClass("funnel-icon-disable").addClass("toolbox-icon").appendTo(A);
$("<div/>").attr("title",s.type.template).addClass("template-icon-disable").addClass("toolbox-icon").appendTo(A);
$("<div/>").attr("title",s.type.label).addClass("label-icon-disable").addClass("toolbox-icon").appendTo(A)
}},promptForGroupName:function(x){return $.Deferred(function(y){var z=function(){$("#new-process-group-dialog").modal("hide");
var A=$("#new-process-group-name").val();
$("#new-process-group-name").val("");
p(A,x).done(function(B){y.resolve(B.processGroup)
}).fail(function(){y.reject()
})
};
$("#new-process-group-dialog").modal("setButtonModel",[{buttonText:"Add",handler:{click:z}},{buttonText:"Cancel",handler:{click:function(){y.reject();
$("#new-process-group-dialog").modal("hide")
}}}]);
$("#new-process-group-dialog").modal("show");
$("#new-process-group-name").focus().off("keyup").on("keyup",function(B){var A=B.keyCode?B.keyCode:B.which;
if(A===$.ui.keyCode.ENTER){z()
}})
}).promise()
}}
}());
nf.CustomProcessorUi={showCustomUi:function(e,c,b){$("#shell-close-button");
var a=nf.Client.getRevision();
var d={processorId:e,revision:a.version,clientId:a.clientId,editable:b};
return nf.Shell.showPage(".."+c+"?"+$.param(d),false)
}};
nf.Registration=(function(){var a={urls:{users:"../nifi-api/controller/users"}};
return{init:function(){$("#registration-justification").count({charCountField:"#remaining-characters"});
$("#expand-registration-button, #expand-registration-text").click(function(){var b=$("#registration-form");
if(b.is(":visible")){$("#expand-registration-button").removeClass("registration-expanded").addClass("registration-collapsed")
}else{$("#expand-registration-button").removeClass("registration-collapsed").addClass("registration-expanded")
}b.toggle()
});
$("#registration-form-submit").one("click",function(){var b=$("#registration-justification").val();
$.ajax({type:"POST",url:a.urls.users,data:{justification:b}}).done(function(c){$("#registration-pane").hide();
$("#message-pane").show();
$("#message-title").text("Thanks");
$("#message-content").text("Your request will be processed shortly.")
}).fail(nf.Common.handleAjaxError)
})
}}
}());
nf.ProcessorPropertyTable=(function(){var c=function(){var e="nfel";
var d=e+"-editor";
nf.Common.addHoverEffect("#add-property-icon","add-icon-bg","add-icon-bg-hover");
var g=function(){var i=$.trim($("#new-property-name").val());
var h=$("#new-property-value").nfeditor("getValue");
if(i!==""){var j=$("#processor-properties").data("gridInstance");
var k=j.getData();
k.addItem({id:k.getLength(),hidden:false,property:i,displayName:i,previousValue:null,value:h,type:"userDefined"})
}else{nf.Dialog.showOkDialog({dialogContent:"Property name must be specified.",overlayBackground:false})
}$("#processor-property-dialog").hide()
};
var f=function(){$("#processor-property-dialog").hide()
};
$("#new-property-value").addClass(d).nfeditor({languageId:e,width:318,minWidth:318,height:106,minHeight:106,resizable:true,escape:f,enter:g});
$("#add-property-icon").on("click",function(){nf.ProcessorPropertyTable.saveRow();
$("#new-property-name").val("");
$("#new-property-value").nfeditor("setValue","");
$("#new-property-value").nfeditor("setSize",318,106);
$("#processor-property-dialog").center().show();
$("#new-property-value").nfeditor("refresh");
$("#new-property-name").focus()
});
$("#processor-property-dialog").draggable({cancel:"input, textarea, pre, .button, ."+d,containment:"parent"}).on("click","#new-property-ok",g).on("click","#new-property-cancel",f);
$("#new-property-name").on("keydown",function(h){if(h.which===$.ui.keyCode.ENTER&&!h.shiftKey){g()
}else{if(h.which===$.ui.keyCode.ESCAPE){h.preventDefault();
f()
}}})
};
var b=function(){var i=function(t,s,r,o,m){var q=10;
var l=$("<div></div>");
var n=$("<span/>").addClass("table-cell").text(r).appendTo(l);
if(m.type==="required"){n.addClass("required")
}var k=$("#processor-configuration").data("processorDetails");
var p=k.config.descriptors[m.property];
if(nf.Common.isDefinedAndNotNull(p)){if(!nf.Common.isBlank(p.description)||!nf.Common.isBlank(p.defaultValue)||!nf.Common.isBlank(p.supportsEl)){$('<img class="icon-info" src="images/iconInfo.png" alt="Info" title="" style="float: right; margin-right: 6px; margin-top: 4px;" />').appendTo(l);
$('<span class="hidden property-descriptor-name"></span>').text(m.property).appendTo(l);
q=26
}}n.width(o.width-q).ellipsis();
return l.html()
};
var d=function(t,s,r,n,l){var q;
if(nf.Common.isDefinedAndNotNull(r)){var k=$("#processor-configuration").data("processorDetails");
var p=k.config.descriptors[l.property];
if(nf.ProcessorPropertyTable.isSensitiveProperty(p)){q='<span class="table-cell sensitive">Sensitive value set</span>'
}else{var m=nf.ProcessorPropertyTable.getAllowableValues(p);
if($.isArray(m)){$.each(m,function(u,v){if(r===v.value){r=v.displayName;
return false
}})
}if(r===""){q='<span class="table-cell blank">Empty string set</span>'
}else{q='<div class="table-cell value"><pre class="ellipsis">'+nf.Common.escapeHtml(r)+"</pre></div>"
}}}else{q='<span class="unset">No value set</span>'
}var o=$(q);
if(l.type==="required"){o.addClass("required")
}o.find(".ellipsis").width(n.width-10).ellipsis();
return $("<div/>").append(o).html()
};
var h=function(p,l,o,n,k){var m="";
if(k.type==="userDefined"){m='<img src="images/iconDelete.png" title="Delete" class="pointer" style="margin-top: 2px" onclick="javascript:nf.ProcessorPropertyTable.deleteProperty(\''+p+"');\"/>"
}return m
};
var g=[{id:"property",field:"displayName",name:"Property",sortable:false,resizable:true,rerenderOnResize:true,formatter:i},{id:"value",field:"value",name:"Value",sortable:false,resizable:true,cssClass:"pointer",rerenderOnResize:true,formatter:d},{id:"actions",name:"&nbsp;",minWidth:20,width:20,formatter:h}];
var e={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,editable:true,enableAddRow:false,autoEdit:false};
var j=new Slick.Data.DataView({inlineFilters:false});
j.setItems([]);
j.setFilterArgs({searchString:"",property:"hidden"});
j.setFilter(a);
j.getItemMetadata=function(m){var n=j.getItem(m);
var k=$("#processor-configuration").data("processorDetails");
var l=k.config.descriptors[n.property];
if(nf.Common.isUndefinedOrNull(l)||nf.ProcessorPropertyTable.supportsEl(l)){return{columns:{value:{editor:nf.ProcessorPropertyNfelEditor}}}
}else{var o=nf.ProcessorPropertyTable.getAllowableValues(l);
if($.isArray(o)){return{columns:{value:{editor:nf.ProcessorPropertyComboEditor}}}
}else{return{columns:{value:{editor:nf.ProcessorPropertyTextEditor}}}
}}};
var f=new Slick.Grid("#processor-properties",j,g,e);
f.setSelectionModel(new Slick.RowSelectionModel());
f.onClick.subscribe(function(l,k){f.gotoCell(k.row,k.cell,true);
l.stopImmediatePropagation()
});
j.onRowCountChanged.subscribe(function(l,k){f.updateRowCount();
f.render()
});
j.onRowsChanged.subscribe(function(l,k){f.invalidateRows(k.rows);
f.render()
});
$("#processor-properties").data("gridInstance",f).on("mouseenter","div.slick-cell",function(r){var n=$(this).find("img.icon-info");
if(n.length&&!n.data("qtip")){var q=$(this).find("span.property-descriptor-name").text();
var m=$("#processor-configuration").data("processorDetails");
var k=m.config.descriptors[q];
var l=$("#processor-configuration").data("processorHistory");
var o=l.propertyHistory[q];
var p=nf.Common.formatPropertyTooltip(k,o);
if(nf.Common.isDefinedAndNotNull(p)){n.qtip($.extend({content:p},nf.Common.config.tooltipConfig))
}}})
};
var a=function(e,d){return e.hidden===false
};
return{config:{sensitiveText:"Sensitive value set"},init:function(){c();
b()
},isSensitiveProperty:function(d){if(nf.Common.isDefinedAndNotNull(d)){return d.sensitive===true
}else{return false
}},isRequiredProperty:function(d){if(nf.Common.isDefinedAndNotNull(d)){return d.required===true
}else{return false
}},isDynamicProperty:function(d){if(nf.Common.isDefinedAndNotNull(d)){return d.dynamic===true
}else{return false
}},getAllowableValues:function(d){if(nf.Common.isDefinedAndNotNull(d)){return d.allowableValues
}else{return null
}},supportsEl:function(d){if(nf.Common.isDefinedAndNotNull(d)){return d.supportsEl===true
}else{return false
}},saveRow:function(){var e=$("#processor-properties").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(e)){var d=e.getEditController();
d.commitCurrentEdit()
}},cancelEdit:function(){var e=$("#processor-properties").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(e)){var d=e.getEditController();
d.cancelCurrentEdit()
}},deleteProperty:function(g){var d=$("#processor-properties").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(d)){var e=d.getData();
var f=e.getItem(g);
f.hidden=true;
e.updateItem(f.id,f)
}},resetTableSize:function(){var d=$("#processor-properties").data("gridInstance");
if(nf.Common.isDefinedAndNotNull(d)){d.resizeCanvas()
}},loadProperties:function(f,g){var d=$("#processor-properties").data("gridInstance");
var h=d.getData();
if(nf.Common.isDefinedAndNotNull(f)){h.beginUpdate();
var e=0;
$.each(f,function(j,l){var m=g[j];
var k="userDefined";
var i=j;
if(nf.Common.isDefinedAndNotNull(m)){if(nf.ProcessorPropertyTable.isRequiredProperty(m)){k="required"
}else{if(nf.ProcessorPropertyTable.isDynamicProperty(m)){k="userDefined"
}else{k="optional"
}}i=m.displayName;
if(nf.Common.isNull(l)&&nf.Common.isDefinedAndNotNull(m.defaultValue)){l=m.defaultValue
}}h.addItem({id:e++,hidden:false,property:j,displayName:i,previousValue:l,value:l,type:k})
});
h.endUpdate()
}},isSaveRequired:function(){var d=$("#processor-properties").data("gridInstance");
var e=d.getData();
var f=false;
$.each(e.getItems(),function(){if(this.value!==this.previousValue){f=true;
return false
}});
return f
},marshalProperties:function(){var e={};
var d=$("#processor-properties").data("gridInstance");
var f=d.getData();
$.each(f.getItems(),function(){if(this.hidden===true){e[this.property]=null
}else{if(this.value!==this.previousValue){e[this.property]=this.value
}}});
return e
},clear:function(){var d=$("#processor-properties");
nf.Common.cleanUpTooltips(d,"img.icon-info");
var e=d.data("gridInstance");
var f=e.getData();
f.setItems([])
}}
}());
nf.ProcessorPropertyTextEditor=function(e){var f=this;
var a="";
var b;
var d;
var h;
var g;
var c;
this.init=function(){var j=$("body");
var l=$("#processor-configuration").data("processorDetails");
d=l.config.descriptors[e.item.property];
b=e.item[e.column.field];
h=$("<div></div>").css({"z-index":100000,position:"absolute",background:"white",padding:"5px",overflow:"hidden",border:"3px solid #365C6A","box-shadow":"4px 4px 6px rgba(0, 0, 0, 0.9)",cursor:"move"}).draggable({cancel:".button, textarea, .nf-checkbox",containment:"parent"}).appendTo(j);
c=$('<textarea hidefocus rows="5"/>').css({background:"white",width:e.position.width+"px","min-width":"150px",height:"80px","border-width":"0",outline:"0","overflow-y":"auto",resize:"both","margin-bottom":"28px"}).tab().on("keydown",f.handleKeyDown).appendTo(h);
var i=$('<div class="string-check-container">');
g=$('<div class="nf-checkbox string-check"/>').appendTo(i);
$('<span class="string-check-label">&nbsp;Empty</span>').appendTo(i);
var k=$('<div class="button button-normal">Ok</div>').on("click",f.save);
var m=$('<div class="button button-normal">Cancel</div>').on("click",f.cancel);
$("<div></div>").css({position:"absolute",bottom:"0",left:"0",right:"0",padding:"0 3px 5px"}).append(i).append(k).append(m).append('<div class="clear"></div>').appendTo(h);
f.position(e.position);
c.focus().select()
};
this.handleKeyDown=function(i){if(i.which===$.ui.keyCode.ENTER&&!i.shiftKey){f.save()
}else{if(i.which===$.ui.keyCode.ESCAPE){i.preventDefault();
f.cancel()
}}};
this.save=function(){e.commitChanges()
};
this.cancel=function(){c.val(a);
e.cancelChanges()
};
this.hide=function(){h.hide()
};
this.show=function(){h.show()
};
this.position=function(i){h.css({top:i.top-5,left:i.left-5})
};
this.destroy=function(){h.remove()
};
this.focus=function(){c.focus()
};
this.loadValue=function(k){var l=false;
var i=nf.ProcessorPropertyTable.isSensitiveProperty(d);
if(nf.Common.isDefinedAndNotNull(k[e.column.field])){if(i){a=nf.ProcessorPropertyTable.config.sensitiveText
}else{a=k[e.column.field];
l=a===""
}}var j=l?"checkbox-checked":"checkbox-unchecked";
g.addClass(j);
if(i){c.addClass("sensitive").keydown(function(){var m=$(this);
if(m.hasClass("sensitive")){m.removeClass("sensitive");
if(m.val()===nf.ProcessorPropertyTable.config.sensitiveText){m.val("")
}}})
}c.val(a);
c.select()
};
this.serializeValue=function(){if(c.val()===""){if(g.hasClass("checkbox-checked")){return""
}else{if(nf.ProcessorPropertyTable.isRequiredProperty(d)){if(nf.Common.isBlank(d.defaultValue)){return b
}else{return d.defaultValue
}}else{return null
}}}else{if(c.hasClass("sensitive")){return b
}else{return c.val()
}}};
this.applyValue=function(i,j){i[e.column.field]=j
};
this.isValueChanged=function(){return f.serializeValue()!==b
};
this.validate=function(){return{valid:true,msg:null}
};
this.init()
};
nf.ProcessorPropertyNfelEditor=function(d){var f=this;
var a="";
var b;
var c;
var g;
var h;
var e;
this.init=function(){var l=$("body");
var o=$("#processor-configuration").data("processorDetails");
c=o.config.descriptors[d.item.property];
var k=nf.ProcessorPropertyTable.isSensitiveProperty(c);
b=d.item[d.column.field];
var n="nfel";
var j=n+"-editor";
h=$("<div></div>").addClass("slickgrid-nfel-editor").css({"z-index":14000,position:"absolute",background:"white",padding:"5px",overflow:"hidden",border:"3px solid #365C6A","box-shadow":"4px 4px 6px rgba(0, 0, 0, 0.9)",cursor:"move"}).draggable({cancel:"input, textarea, pre, .nf-checkbox, .button, ."+j,containment:"parent"}).appendTo(l);
e=$("<div></div>").addClass(j).appendTo(h).nfeditor({languageId:n,width:d.position.width,minWidth:175,minHeight:100,resizable:true,sensitive:k,escape:function(){f.cancel()
},enter:function(){f.save()
}});
var i=$('<div class="string-check-container">');
g=$('<div class="nf-checkbox string-check"/>').appendTo(i);
$('<span class="string-check-label">&nbsp;Empty</span>').appendTo(i);
var m=$('<div class="button button-normal">Ok</div>').on("click",f.save);
var p=$('<div class="button button-normal">Cancel</div>').on("click",f.cancel);
$("<div></div>").css({position:"absolute",bottom:"0",left:"0",right:"0",padding:"0 3px 5px 1px"}).append(i).append(m).append(p).append('<div class="clear"></div>').appendTo(h);
f.position(d.position);
e.nfeditor("focus").nfeditor("selectAll")
};
this.save=function(){d.commitChanges()
};
this.cancel=function(){e.nfeditor("setValue",a);
d.cancelChanges()
};
this.hide=function(){h.hide()
};
this.show=function(){h.show();
e.nfeditor("setSize",d.position.width,null).nfeditor("refresh")
};
this.position=function(i){h.css({top:i.top-5,left:i.left-5})
};
this.destroy=function(){e.nfeditor("destroy");
h.remove()
};
this.focus=function(){e.nfeditor("focus")
};
this.loadValue=function(k){var l=false;
var i=nf.ProcessorPropertyTable.isSensitiveProperty(c);
if(nf.Common.isDefinedAndNotNull(k[d.column.field])){if(i){a=nf.ProcessorPropertyTable.config.sensitiveText
}else{a=k[d.column.field];
l=a===""
}}var j=l?"checkbox-checked":"checkbox-unchecked";
g.addClass(j);
e.nfeditor("setValue",a).nfeditor("selectAll")
};
this.serializeValue=function(){var i=e.nfeditor("getValue");
if(i===""){if(g.hasClass("checkbox-checked")){return""
}else{if(nf.ProcessorPropertyTable.isRequiredProperty(c)){if(nf.Common.isBlank(c.defaultValue)){return b
}else{return c.defaultValue
}}else{return null
}}}else{if(e.nfeditor("isModified")===false){return b
}else{return i
}}};
this.applyValue=function(i,j){i[d.column.field]=j
};
this.isValueChanged=function(){return f.serializeValue()!==b
};
this.validate=function(){return{valid:true,msg:null}
};
this.init()
};
nf.ProcessorPropertyComboEditor=function(b){var c=this;
var a=null;
var e;
var d;
this.init=function(){var h=$("body");
e=$("<div></div>").css({"z-index":1999,position:"absolute",background:"white",padding:"5px",overflow:"hidden",border:"3px solid #365C6A","box-shadow":"4px 4px 6px rgba(0, 0, 0, 0.9)",cursor:"move"}).draggable({cancel:".button, .combo",containment:"parent"}).appendTo(h);
var g=$("#processor-configuration").data("processorDetails");
var j=g.config.descriptors[b.item.property];
var l=nf.ProcessorPropertyTable.getAllowableValues(j);
var i=[];
if(j.required===false){i.push({text:"No value",optionClass:"unset"})
}if($.isArray(l)){$.each(l,function(o,n){i.push({text:n.displayName,value:n.value,description:nf.Common.escapeHtml(n.description)})
})
}if(i.length===0){i.push({text:"No value",optionClass:"unset",disabled:true})
}var f=b.position;
var m=$(window).height();
var k=m-f.bottom-16;
d=$('<div class="value-combo combo"></div>').combo({options:i,maxHeight:k}).width(f.width-16).appendTo(e);
$('<div class="button button-normal">Cancel</div>').css({margin:"0 0 0 5px","float":"left"}).on("click",c.cancel).appendTo(e);
$('<div class="button button-normal">Ok</div>').css({margin:"0 0 0 5px","float":"left"}).on("click",c.save).appendTo(e);
c.position(f)
};
this.save=function(){b.commitChanges()
};
this.cancel=function(){b.cancelChanges()
};
this.hide=function(){e.hide()
};
this.show=function(){e.show()
};
this.position=function(f){e.css({top:f.top-5,left:f.left-5})
};
this.destroy=function(){e.remove()
};
this.focus=function(){};
this.loadValue=function(h){var f=$("#processor-configuration").data("processorDetails");
var g=f.config.descriptors[h.property];
if(nf.Common.isDefinedAndNotNull(h.value)){a=h.value;
d.combo("setSelectedOption",{value:h.value})
}else{if(nf.Common.isDefinedAndNotNull(g.defaultValue)){a=g.defaultValue;
d.combo("setSelectedOption",{value:g.defaultValue})
}}};
this.serializeValue=function(){var f=d.combo("getSelectedOption");
return f.value
};
this.applyValue=function(f,g){f[b.column.field]=g
};
this.isValueChanged=function(){var f=d.combo("getSelectedOption");
return(!(f.value===""&&a===null))&&(f.value!==a)
};
this.validate=function(){return{valid:true,msg:null}
};
this.init()
};
nf.ProcessorConfiguration=(function(){var i=[0,25,50,100,250,500,1000,2000];
var h=function(j){var k=[{text:"Timer driven",value:"TIMER_DRIVEN",description:"Processor will be scheduled to run on an interval defined by the run schedule."}];
if(j.supportsEventDriven===true){k.push({text:"Event driven",value:"EVENT_DRIVEN",description:"Processor will be scheduled to run when triggered by an event (e.g. a FlowFile enters an incoming queue). This scheduling strategy is experimental."})
}else{if(j.config.schedulingStrategy==="EVENT_DRIVEN"){k.push({text:"Event driven",value:"EVENT_DRIVEN",description:"Processor will be scheduled to run when triggered by an event (e.g. a FlowFile enters an incoming queue). This scheduling strategy is experimental.",disabled:true})
}}if(nf.Canvas.isClustered()){k.push({text:"On primary node",value:"PRIMARY_NODE_ONLY",description:"Processor will be scheduled on the primary node on an interval defined by the run schedule."})
}else{if(j.config.schedulingStrategy==="PRIMARY_NODE_ONLY"){k.push({text:"On primary node",value:"PRIMARY_NODE_ONLY",description:"Processor will be scheduled on the primary node on an interval defined by the run schedule.",disabled:true})
}}k.push({text:"CRON driven",value:"CRON_DRIVEN",description:"Processor will be scheduled to run on at specific times based on the specified CRON string."});
return k
};
var b=function(m,j,k){if(m.status===400){var n=m.responseText.split("\n");
var l;
if(n.length===1){l=$("<span></span>").text(n[0])
}else{l=nf.Common.formatUnorderedList(n)
}nf.Dialog.showOkDialog({dialogContent:l,overlayBackground:false,headerText:"Configuration Error"})
}else{nf.Common.handleAjaxError(m,j,k)
}};
var g=function(o){var j=$('<div class="relationship-name ellipsis"></div>').text(o.name);
var l=$('<span class="relationship-name-value hidden"></span>').text(o.name);
var m=$('<div class="processor-relationship nf-checkbox"></div>');
if(o.autoTerminate===true){m.addClass("checkbox-checked")
}else{m.addClass("checkbox-unchecked")
}var n=$('<div class="processor-relationship-container"></div>').append(m).append(j).append(l).appendTo("#auto-terminate-relationship-names");
if(!nf.Common.isBlank(o.description)){var k=$('<div class="relationship-description"></div>').text(o.description);
n.append(k)
}return n
};
var d=function(){var l=$("#processor-configuration").data("processorDetails");
var m=false;
var n=f();
$.each(l.relationships,function(p,q){if(q.autoTerminate===true){if($.inArray(q.name,n)===-1){m=true;
return false
}}else{if(q.autoTerminate===false){if($.inArray(q.name,n)>=0){m=true;
return false
}}}});
if(m){return true
}var o=$("#scheduling-strategy-combo").combo("getSelectedOption").value;
if(o!==(l.config.schedulingStrategy+"")){return true
}if(l.supportsParallelProcessing===true){var j;
if(o==="EVENT_DRIVEN"){j=$("#event-driven-concurrently-schedulable-tasks")
}else{if(o==="CRON_DRIVEN"){j=$("#cron-driven-concurrently-schedulable-tasks")
}else{j=$("#timer-driven-concurrently-schedulable-tasks")
}}if(j.val()!==(l.config.concurrentlySchedulableTaskCount+"")){return true
}}var k;
if(o==="CRON_DRIVEN"){k=$("#cron-driven-scheduling-period")
}else{if(o!=="EVENT_DRIVEN"){k=$("#timer-driven-scheduling-period")
}}if(nf.Common.isDefinedAndNotNull(k)&&k.val()!==(l.config.schedulingPeriod+"")){return true
}if($("#processor-name").val()!==l.name){return true
}if($("#processor-enabled").hasClass("checkbox-checked")&&l.state==="DISABLED"){return true
}else{if($("#processor-enabled").hasClass("checkbox-unchecked")&&(l.state==="RUNNING"||l.state==="STOPPED")){return true
}}if($("#penalty-duration").val()!==(l.config.penaltyDuration+"")){return true
}if($("#yield-duration").val()!==(l.config.yieldDuration+"")){return true
}if($("#bulletin-level-combo").combo("getSelectedOption").value!==(l.config.bulletinLevel+"")){return true
}if($("#processor-comments").val()!==l.config.comments){return true
}return nf.ProcessorPropertyTable.isSaveRequired()
};
var c=function(){var l={};
var p=$("#scheduling-strategy-combo").combo("getSelectedOption").value;
var j;
if(p==="EVENT_DRIVEN"){j=$("#event-driven-concurrently-schedulable-tasks")
}else{if(p==="CRON_DRIVEN"){j=$("#cron-driven-concurrently-schedulable-tasks")
}else{j=$("#timer-driven-concurrently-schedulable-tasks")
}}if(!j.is(":disabled")){l.concurrentlySchedulableTaskCount=j.val()
}var k;
if(p==="CRON_DRIVEN"){k=$("#cron-driven-scheduling-period")
}else{if(p!=="EVENT_DRIVEN"){k=$("#timer-driven-scheduling-period")
}}if(nf.Common.isDefinedAndNotNull(k)){l.schedulingPeriod=k.val()
}l.penaltyDuration=$("#penalty-duration").val();
l.yieldDuration=$("#yield-duration").val();
l.bulletinLevel=$("#bulletin-level-combo").combo("getSelectedOption").value;
l.schedulingStrategy=p;
l.comments=$("#processor-comments").val();
var n=$("#run-duration-slider").slider("value");
l.runDurationMillis=i[n];
l.autoTerminatedRelationships=f();
var m=nf.ProcessorPropertyTable.marshalProperties();
if($.isEmptyObject(m)===false){l.properties=m
}var q={};
q.id=$("#processor-id").text();
q.name=$("#processor-name").val();
q.config=l;
if($("#processor-enabled").hasClass("checkbox-unchecked")){q.state="DISABLED"
}else{if($("#processor-enabled").hasClass("checkbox-checked")){q.state="STOPPED"
}}var o={};
o.revision=nf.Client.getRevision();
o.processor=q;
return o
};
var f=function(){var k=$("#auto-terminate-relationship-names");
var j=[];
$.each(k.children(),function(l,o){var n=$(o);
var m=n.children("div.processor-relationship");
if(m.hasClass("checkbox-checked")){j.push(n.children("span.relationship-name-value").text())
}});
return j
};
var a=function(k){var m=[];
var l=k.processor;
var j=l.config;
if(nf.Common.isDefinedAndNotNull(j.concurrentlySchedulableTaskCount)&&!$.isNumeric(j.concurrentlySchedulableTaskCount)){m.push("Concurrent tasks must be an integer value")
}if(nf.Common.isDefinedAndNotNull(j.schedulingPeriod)&&nf.Common.isBlank(j.schedulingPeriod)){m.push("Run schedule must be specified")
}if(nf.Common.isBlank(j.penaltyDuration)){m.push("Penalty duration must be specified")
}if(nf.Common.isBlank(j.yieldDuration)){m.push("Yield duration must be specified")
}if(m.length>0){nf.Dialog.showOkDialog({dialogContent:nf.Common.formatUnorderedList(m),overlayBackground:false,headerText:"Configuration Error"});
return false
}else{return true
}};
var e=function(k){var j=nf.Connection.getComponentConnections(k.id);
$.each(j,function(m,l){if(l.source.id===k.id){nf.Connection.reload(l)
}})
};
return{init:function(){$("#processor-configuration-tabs").tabbs({tabStyle:"tab",selectedTabStyle:"selected-tab",tabs:[{name:"Settings",tabContentId:"configuration-standard-settings-tab-content"},{name:"Scheduling",tabContentId:"configuration-scheduling-tab-content"},{name:"Properties",tabContentId:"configuration-processor-properties-tab-content"},{name:"Comments",tabContentId:"configuration-comments-tab-content"}],select:function(){if($(this).text()==="Properties"){nf.ProcessorPropertyTable.resetTableSize()
}nf.ProcessorPropertyTable.saveRow();
var j=$("#auto-terminate-relationship-names");
if(j.is(":visible")&&j.get(0).scrollHeight>j.innerHeight()){j.css("border-width","1px")
}}});
$("#processor-configuration").modal({headerText:"Configure Processor",overlayBackground:true,handler:{close:function(){$("#auto-terminate-relationship-names").css("border-width","0").empty();
$("#processor-property-dialog").hide();
nf.ProcessorPropertyTable.cancelEdit();
nf.ProcessorPropertyTable.clear();
$("#processor-configuration").removeData("processorDetails");
$("#processor-configuration").removeData("processorHistory")
}}}).draggable({containment:"parent",handle:".dialog-header"});
$("#bulletin-level-combo").combo({options:[{text:"DEBUG",value:"DEBUG"},{text:"INFO",value:"INFO"},{text:"WARN",value:"WARN"},{text:"ERROR",value:"ERROR"}]});
$("#run-duration-slider").slider({min:0,max:i.length-1});
nf.ProcessorPropertyTable.init()
},showConfiguration:function(p){if(nf.CanvasUtils.isProcessor(p)){var o=p.datum();
var j=o.component;
$("#processor-configuration").data("processorDetails",j);
var l="checkbox-checked";
if(j.state==="DISABLED"){l="checkbox-unchecked"
}$("#processor-id").text(j.id);
$("#processor-type").text(nf.Common.substringAfterLast(j.type,"."));
$("#processor-name").val(j.name);
$("#processor-enabled").removeClass("checkbox-unchecked checkbox-checked").addClass(l);
$("#penalty-duration").val(j.config.penaltyDuration);
$("#yield-duration").val(j.config.yieldDuration);
$("#processor-comments").val(j.config.comments);
var q=i.indexOf(j.config.runDurationMillis);
$("#run-duration-slider").slider("value",q);
$("#bulletin-level-combo").combo("setSelectedOption",{value:j.config.bulletinLevel});
$("#scheduling-strategy-combo").combo({options:h(j),selectedOption:{value:j.config.schedulingStrategy},select:function(s){if(s.value==="EVENT_DRIVEN"){$("#event-driven-warning").show();
$("#timer-driven-options").hide();
$("#event-driven-options").show();
$("#cron-driven-options").hide()
}else{$("#event-driven-warning").hide();
if(s.value==="CRON_DRIVEN"){$("#timer-driven-options").hide();
$("#event-driven-options").hide();
$("#cron-driven-options").show()
}else{$("#timer-driven-options").show();
$("#event-driven-options").hide();
$("#cron-driven-options").hide()
}}}});
var r=j.config.defaultConcurrentTasks;
$("#timer-driven-concurrently-schedulable-tasks").val(r.TIMER_DRIVEN);
$("#event-driven-concurrently-schedulable-tasks").val(r.EVENT_DRIVEN);
$("#cron-driven-concurrently-schedulable-tasks").val(r.CRON_DRIVEN);
var n;
if(j.config.schedulingStrategy==="EVENT_DRIVEN"){n=$("#event-driven-concurrently-schedulable-tasks").val(j.config.concurrentlySchedulableTaskCount)
}else{if(j.config.schedulingStrategy==="CRON_DRIVEN"){n=$("#cron-driven-concurrently-schedulable-tasks").val(j.config.concurrentlySchedulableTaskCount)
}else{n=$("#timer-driven-concurrently-schedulable-tasks").val(j.config.concurrentlySchedulableTaskCount)
}}if(nf.Common.isDefinedAndNotNull(n)){if(j.supportsParallelProcessing===true){n.prop("disabled",false)
}else{n.prop("disabled",true)
}}var k=j.config.defaultSchedulingPeriod;
$("#cron-driven-scheduling-period").val(k.CRON_DRIVEN);
$("#timer-driven-scheduling-period").val(k.TIMER_DRIVEN);
if(j.config.schedulingStrategy==="CRON_DRIVEN"){$("#cron-driven-scheduling-period").val(j.config.schedulingPeriod)
}else{if(j.config.schedulingStrategy!=="EVENT_DRIVEN"){$("#timer-driven-scheduling-period").val(j.config.schedulingPeriod)
}}nf.ProcessorPropertyTable.loadProperties(j.config.properties,j.config.descriptors);
if(!nf.Common.isEmpty(j.relationships)){$.each(j.relationships,function(s,t){g(t)
})
}else{$("#auto-terminate-relationship-names").append('<div class="unset">This processor has no relationships.</div>')
}var m=[{buttonText:"Apply",handler:{click:function(){nf.ProcessorPropertyTable.saveRow();
var s=c();
if(a(s)){$.ajax({type:"PUT",data:JSON.stringify(s),url:j.uri,dataType:"json",processData:false,contentType:"application/json"}).done(function(t){if(nf.Common.isDefinedAndNotNull(t.processor)){nf.Client.setRevision(t.revision);
nf.Processor.set(t.processor);
e(j);
$("#processor-configuration").modal("hide")
}}).fail(b)
}}}},{buttonText:"Cancel",handler:{click:function(){$("#processor-configuration").modal("hide")
}}}];
if(nf.Common.isDefinedAndNotNull(j.config.customUiUrl)&&j.config.customUiUrl!==""){m.push({buttonText:"Advanced",handler:{click:function(){var s=function(){$("#processor-configuration").modal("hide");
nf.CustomProcessorUi.showCustomUi($("#processor-id").text(),j.config.customUiUrl,true).done(function(){nf.Processor.reload(j);
e(j)
})
};
nf.ProcessorPropertyTable.saveRow();
if(d()){nf.Dialog.showYesNoDialog({dialogContent:"Save changes before opening the advanced configuration?",overlayBackground:false,noHandler:s,yesHandler:function(){var t=c();
if(a(t)){$.ajax({type:"PUT",data:JSON.stringify(t),url:j.uri,dataType:"json",processData:false,contentType:"application/json"}).done(function(u){if(nf.Common.isDefinedAndNotNull(u.processor)){nf.Client.setRevision(u.revision);
s()
}}).fail(b)
}}})
}else{s()
}}}})
}$("#processor-configuration").modal("setButtonModel",m);
$.ajax({type:"GET",url:"../nifi-api/controller/history/processors/"+encodeURIComponent(j.id),dataType:"json"}).done(function(s){var t=s.processorHistory;
$("#processor-configuration").data("processorHistory",t);
$("#processor-configuration").modal("show");
$("#processor-configuration div.relationship-name").ellipsis();
var u=$("#auto-terminate-relationship-names");
if(u.is(":visible")&&u.get(0).scrollHeight>u.innerHeight()){u.css("border-width","1px")
}}).fail(nf.Common.handleAjaxError)
}}}
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
nf.ProcessGroupConfiguration=(function(){return{init:function(){$("#process-group-configuration").modal({headerText:"Configure Process Group",overlayBackground:true,buttons:[{buttonText:"Apply",handler:{click:function(){var b=nf.Client.getRevision();
var a=$("#process-group-id").text();
var c=d3.select("#id-"+a).datum();
$.ajax({type:"PUT",data:{version:b.version,clientId:b.clientId,name:$("#process-group-name").val(),comments:$("#process-group-comments").val()},url:c.component.uri,dataType:"json"}).done(function(d){if(nf.Common.isDefinedAndNotNull(d.processGroup)){nf.Client.setRevision(d.revision);
nf.ProcessGroup.set(d.processGroup);
$("#process-group-configuration").modal("hide")
}}).fail(function(f,d,e){$("#process-group-configuration").modal("hide");
nf.Common.handleAjaxError(f,d,e)
})
}}},{buttonText:"Cancel",handler:{click:function(){$("#process-group-configuration").modal("hide")
}}}],handler:{close:function(){$("#process-group-id").text("");
$("#process-group-name").val("");
$("#process-group-comments").val("")
}}}).draggable({containment:"parent",handle:".dialog-header"})
},showConfiguration:function(a){if(nf.CanvasUtils.isProcessGroup(a)){var b=a.datum();
$("#process-group-id").text(b.component.id);
$("#process-group-name").val(b.component.name);
$("#process-group-comments").val(b.component.comments);
$("#process-group-configuration").modal("show")
}}}
}());
nf.ProcessGroupDetails=(function(){return{init:function(){$("#process-group-details").modal({headerText:"Process Group Details",overlayBackground:true,buttons:[{buttonText:"Ok",handler:{click:function(){$("#process-group-details").modal("hide")
}}}],handler:{close:function(){nf.Common.clearField("read-only-process-group-name");
nf.Common.clearField("read-only-process-group-comments")
}}}).draggable({containment:"parent",handle:".dialog-header"})
},showDetails:function(a){if(nf.CanvasUtils.isProcessGroup(a)){var b=a.datum();
nf.Common.populateField("read-only-process-group-name",b.component.name);
nf.Common.populateField("read-only-process-group-comments",b.component.comments);
$("#process-group-details").modal("show")
}}}
}());
nf.RemoteProcessGroupConfiguration=(function(){return{init:function(){$("#remote-process-group-configuration").modal({headerText:"Configure Remote Process Group",overlayBackground:true,buttons:[{buttonText:"Apply",handler:{click:function(){var a=$("#remote-process-group-id").text();
var b=d3.select("#id-"+a).datum();
var c={revision:nf.Client.getRevision(),remoteProcessGroup:{id:a,communicationsTimeout:$("#remote-process-group-timeout").val(),yieldDuration:$("#remote-process-group-yield-duration").val()}};
$.ajax({type:"PUT",data:JSON.stringify(c),url:b.component.uri,dataType:"json",processData:false,contentType:"application/json"}).done(function(d){nf.Client.setRevision(d.revision);
$("#remote-process-group-configuration").modal("hide")
}).fail(function(g,d,e){if(g.status===400){var h=g.responseText.split("\n");
var f;
if(h.length===1){f=$("<span></span>").text(h[0])
}else{f=nf.Common.formatUnorderedList(h)
}nf.Dialog.showOkDialog({dialogContent:f,overlayBackground:false,headerText:"Configuration Error"})
}else{nf.Common.handleAjaxError(g,d,e)
}})
}}},{buttonText:"Cancel",handler:{click:function(){$("#remote-process-group-configuration").modal("hide")
}}}],handler:{close:function(){$("#remote-process-group-id").text("");
$("#remote-process-group-name").text("");
$("#remote-process-group-url").text("");
$("#remote-process-group-timeout").val("");
$("#remote-process-group-yield-duration").val("")
}}}).draggable({containment:"parent",handle:".dialog-header"})
},showConfiguration:function(a){if(nf.CanvasUtils.isRemoteProcessGroup(a)){var b=a.datum();
$("#remote-process-group-id").text(b.component.id);
$("#remote-process-group-name").text(b.component.name);
$("#remote-process-group-url").text(b.component.targetUri);
$("#remote-process-group-timeout").val(b.component.communicationsTimeout);
$("#remote-process-group-yield-duration").val(b.component.yieldDuration);
$("#remote-process-group-configuration").modal("show")
}}}
}());
nf.RemoteProcessGroupDetails=(function(){return{init:function(){$("#remote-process-group-details").modal({headerText:"Remote Process Group Details",overlayBackground:true,buttons:[{buttonText:"Ok",handler:{click:function(){$("#remote-process-group-details").modal("hide")
}}}],handler:{close:function(){$("#read-only-remote-process-group-name").text("");
$("#read-only-remote-process-group-url").text("");
$("#read-only-remote-process-group-timeout").val("");
$("#read-only-remote-process-group-yield-duration").val("")
}}}).draggable({containment:"parent",handle:".dialog-header"})
},showDetails:function(a){if(nf.CanvasUtils.isRemoteProcessGroup(a)){var b=a.datum();
$("#read-only-remote-process-group-name").text(b.component.name);
$("#read-only-remote-process-group-url").text(b.component.targetUri);
$("#read-only-remote-process-group-timeout").text(b.component.communicationsTimeout);
$("#read-only-remote-process-group-yield-duration").text(b.component.yieldDuration);
$("#remote-process-group-details").modal("show")
}}}
}());
nf.RemoteProcessGroupPorts=(function(){var b=function(){$("#remote-port-configuration").modal({headerText:"Configure Remote Port",overlayBackground:false,buttons:[{buttonText:"Apply",handler:{click:function(){var f=$("#remote-port-concurrent-tasks").val();
if($.isNumeric(f)){var e=$("#remote-process-group-ports-id").text();
var j=d3.select("#id-"+e).datum();
var i=$("#remote-port-id").text();
var h={revision:nf.Client.getRevision(),remoteProcessGroupPort:{id:i,useCompression:$("#remote-port-use-compression").hasClass("checkbox-checked"),concurrentlySchedulableTaskCount:f}};
var g="/output-ports/";
if($("#remote-port-type").text()==="input"){g="/input-ports/"
}$.ajax({type:"PUT",data:JSON.stringify(h),url:j.component.uri+g+encodeURIComponent(i),dataType:"json",processData:false,contentType:"application/json"}).done(function(k){nf.Client.setRevision(k.revision);
var l=k.remoteProcessGroupPort;
var m="No";
if(l.useCompression===true){m="Yes"
}$("#"+i+"-concurrent-tasks").text(l.concurrentlySchedulableTaskCount);
$("#"+i+"-compression").text(m)
}).fail(function(n,k,l){if(n.status===400){var o=n.responseText.split("\n");
var m;
if(o.length===1){m=$("<span></span>").text(o[0])
}else{m=nf.Common.formatUnorderedList(o)
}nf.Dialog.showOkDialog({dialogContent:m,overlayBackground:false,headerText:"Configuration Error"})
}else{nf.Common.handleAjaxError(n,k,l)
}}).always(function(){$("#remote-port-configuration").modal("hide")
})
}else{nf.Dialog.showOkDialog({dialogContent:"Concurrent tasks must be an integer value.",overlayBackground:false});
$("#remote-port-configuration").modal("hide")
}}}},{buttonText:"Cancel",handler:{click:function(){$("#remote-port-configuration").modal("hide")
}}}],handler:{close:function(){$("#remote-port-id").text("");
$("#remote-port-name").text("");
$("#remote-port-concurrent-tasks").val("");
$("#remote-port-use-compression").removeClass("checkbox-checked checkbox-unchecked")
}}})
};
var a=function(){$("#remote-process-group-ports").modal({headerText:"Remote Process Group Ports",overlayBackground:true,buttons:[{buttonText:"Close",handler:{click:function(){if(nf.Common.isDFM()){var e=$("#remote-process-group-ports-id").text();
var f=d3.select("#id-"+e).datum();
nf.RemoteProcessGroup.reload(f.component)
}$("#remote-process-group-ports").modal("hide")
}}}],handler:{close:function(){$("#remote-process-group-ports-id").text("");
$("#remote-process-group-ports-name").text("");
$("#remote-process-group-ports-url").text("");
var e=$("#remote-process-group-ports");
nf.Common.cleanUpTooltips(e,"div.remote-port-removed");
nf.Common.cleanUpTooltips(e,"img.concurrent-tasks-info");
$("#remote-process-group-input-ports-container").empty();
$("#remote-process-group-output-ports-container").empty()
}}}).draggable({containment:"parent",handle:".dialog-header"})
};
var c=function(h,k,i){var l=nf.Common.escapeHtml(k.id);
var f=$('<div class="remote-port-container"></div>').appendTo(h);
var q=$('<div class="remote-port-edit-container"></div>').appendTo(f);
var g=$('<div class="remote-port-details-container"></div>').appendTo(f);
if(nf.Common.isDFM()){var e;
if(k.connected===true){if(k.transmitting===true){e=$('<div class="enabled-transmission-switch enabled-active-transmission"></div>').appendTo(q)
}else{if(k.exists===true){e=$('<div class="enabled-transmission-switch enabled-inactive-transmission"></div>').appendTo(q)
}else{$('<div class="disabled-transmission-switch disabled-inactive-transmission"></div>').appendTo(q)
}}}else{if(k.transmitting===true){$('<div class="disabled-transmission-switch disabled-active-transmission"></div>').appendTo(q)
}else{$('<div class="disabled-transmission-switch disabled-inactive-transmission"></div>').appendTo(q)
}}if(k.exists===true&&k.connected===true){var j=$('<div class="edit-button edit-remote-port"></div>').on("mouseenter",function(){$(this).removeClass("edit-remote-port").addClass("edit-remote-port-hover")
}).on("mouseleave",function(){$(this).removeClass("edit-remote-port-hover").addClass("edit-remote-port")
}).click(function(){var t=$("#"+l+"-name").text();
var s=$("#"+l+"-concurrent-tasks").text();
var r=$("#"+l+"-compression").text()==="Yes";
d(k.id,t,s,r,i)
}).appendTo(q);
if(k.transmitting===true){j.hide()
}else{j.show()
}}else{if(k.exists===false){$('<div class="remote-port-removed"/>').appendTo(q).qtip($.extend({content:"This port has been removed."},nf.Common.config.tooltipConfig))
}}if(nf.Common.isDefinedAndNotNull(e)){e.click(function(){var r=$("#remote-process-group-ports-id").text();
var u=d3.select("#id-"+r).datum();
var v=false;
if(e.hasClass("enabled-inactive-transmission")){v=true
}var t={revision:nf.Client.getRevision(),remoteProcessGroupPort:{id:k.id,transmitting:v}};
var s="/output-ports/";
if(i==="input"){s="/input-ports/"
}$.ajax({type:"PUT",data:JSON.stringify(t),url:u.component.uri+s+encodeURIComponent(k.id),dataType:"json",processData:false,contentType:"application/json"}).done(function(w){nf.Client.setRevision(w.revision);
var x=w.remoteProcessGroupPort;
if(x.exists===false){e.removeClass("enabled-active-transmission enabled-inactive-transmission enabled-transmission-switch").addClass("disabled-transmission-switch disabled-inactive-transmission").off("click");
if(nf.Common.isDefinedAndNotNull(j)){j.hide()
}}else{if(x.transmitting===true){e.removeClass("enabled-active-transmission enabled-inactive-transmission").addClass("enabled-active-transmission");
if(nf.Common.isDefinedAndNotNull(j)){j.hide()
}}else{e.removeClass("enabled-active-transmission enabled-inactive-transmission").addClass("enabled-inactive-transmission");
if(nf.Common.isDefinedAndNotNull(j)){j.show()
}}}}).fail(function(z,w,x){if(z.status===400){var A=z.responseText.split("\n");
var y;
if(A.length===1){y=$("<span></span>").text(A[0])
}else{y=nf.Common.formatUnorderedList(A)
}nf.Dialog.showOkDialog({dialogContent:y,overlayBackground:false,headerText:"Configuration Error"})
}else{nf.Common.handleAjaxError(z,w,x)
}})
})
}}else{if(k.transmitting===true){$('<div class="disabled-transmission-switch disabled-active-transmission"></div>').appendTo(q)
}else{$('<div class="disabled-transmission-switch disabled-inactive-transmission"></div>').appendTo(q)
}}$('<div id="'+l+'-id" class="remote-port-id hidden"></div>').text(k.id).appendTo(g);
$('<div id="'+l+'-name" class="remote-port-name ellipsis"></div>').text(k.name).appendTo(g);
$('<div class="clear"></div>').appendTo(g);
if(nf.Common.isBlank(k.comments)){$('<div class="remote-port-description unset">No description specified.</div>').appendTo(g)
}else{$('<div class="remote-port-description"></div>').text(k.comments).appendTo(g)
}$('<div class="clear"></div>').appendTo(g);
var m=$('<div class="concurrent-task-container"></div>').appendTo(g);
var n=$('<div class="setting-value"></div>').append($('<div id="'+l+'-concurrent-tasks"></div>').text(k.concurrentlySchedulableTaskCount));
$('<div><div class="setting-name">Concurrent tasks<img class="processor-setting concurrent-tasks-info" src="images/iconInfo.png" alt="Info"/></div></div>').append(n).appendTo(m).find("img.concurrent-tasks-info").qtip($.extend({content:"The number of tasks that should be concurrently scheduled for this port."},nf.Common.config.tooltipConfig));
var o=$('<div class="compression-container"></div>').appendTo(g);
var p="No";
if(k.useCompression===true){p="Yes"
}$('<div><div class="setting-name">Compressed</div><div class="setting-value"><div id="'+l+'-compression">'+p+"</div></div></div>").appendTo(o);
$('<div class="clear"></div>').appendTo(f);
f.find(".ellipsis").ellipsis()
};
var d=function(g,j,i,f,e){$("#remote-port-id").text(g);
$("#remote-port-type").text(e);
var h="checkbox-unchecked";
if(f===true){h="checkbox-checked"
}$("#remote-port-use-compression").addClass(h);
$("#remote-port-concurrent-tasks").val(i);
$("#remote-port-name").text(j).ellipsis();
$("#remote-port-configuration").modal("show")
};
return{init:function(){b();
a()
},showPorts:function(e){if(nf.CanvasUtils.isRemoteProcessGroup(e)){var f=e.datum();
$.ajax({type:"GET",url:f.component.uri,data:{verbose:true},dataType:"json"}).done(function(h){var k=h.remoteProcessGroup;
nf.RemoteProcessGroup.set(k);
$("#remote-process-group-ports-id").text(k.id);
$("#remote-process-group-ports-name").text(k.name);
$("#remote-process-group-ports-url").text(k.targetUri);
var g=k.contents;
if(nf.Common.isDefinedAndNotNull(g)){var n=[];
var i=[];
var m=$("#remote-process-group-input-ports-container");
$.each(g.inputPorts,function(q,p){if(p.connected===true){n.push(p)
}else{i.push(p)
}});
$.each(n,function(q,p){c(m,p,"input")
});
$.each(i,function(q,p){c(m,p,"input")
});
var j=[];
var o=[];
var l=$("#remote-process-group-output-ports-container");
$.each(g.outputPorts,function(p,q){if(q.connected===true){j.push(q)
}else{o.push(q)
}});
$.each(j,function(p,q){c(l,q,"output")
});
$.each(o,function(p,q){c(l,q,"output")
})
}$("#remote-process-group-ports").modal("show")
}).fail(nf.Common.handleAjaxError)
}}}
}());
nf.PortConfiguration=(function(){var a=function(){$("#port-configuration").modal({headerText:"Configure Port",overlayBackground:true,buttons:[{buttonText:"Apply",handler:{click:function(){var c=nf.Client.getRevision();
var d=$("#port-id").text();
var b=d3.select("#id-"+d).datum();
var e={version:c.version,clientId:c.clientId,name:$("#port-name").val(),comments:$("#port-comments").val()};
if($("#port-concurrent-task-container").is(":visible")){e.concurrentlySchedulableTaskCount=$("#port-concurrent-tasks").val()
}if($("#port-enabled").hasClass("checkbox-unchecked")){e.state="DISABLED"
}else{if($("#port-enabled").hasClass("checkbox-checked")){e.state="STOPPED"
}}$.ajax({type:"PUT",data:e,url:b.component.uri,dataType:"json"}).done(function(g){nf.Client.setRevision(g.revision);
var f;
if(nf.Common.isDefinedAndNotNull(g.inputPort)){f=g.inputPort
}else{f=g.outputPort
}nf.Port.set(f);
$("#port-configuration").modal("hide")
}).fail(function(i,f,g){if(i.status===400){var j=i.responseText.split("\n");
var h;
if(j.length===1){h=$("<span></span>").text(j[0])
}else{h=nf.Common.formatUnorderedList(j)
}nf.Dialog.showOkDialog({dialogContent:h,overlayBackground:false,headerText:"Configuration Error"})
}else{$("#port-configuration").modal("hide");
nf.Common.handleAjaxError(i,f,g)
}})
}}},{buttonText:"Cancel",handler:{click:function(){$("#port-configuration").modal("hide")
}}}],handler:{close:function(){$("#port-id").text("");
$("#port-name").val("");
$("#port-enabled").removeClass("checkbox-unchecked checkbox-checked");
$("#port-concurrent-tasks").val("");
$("#port-comments").val("")
}}}).draggable({containment:"parent",handle:".dialog-header"})
};
return{init:function(){a()
},showConfiguration:function(c){if(nf.CanvasUtils.isInputPort(c)||nf.CanvasUtils.isOutputPort(c)){var d=c.datum();
var b="checkbox-checked";
if(d.component.state==="DISABLED"){b="checkbox-unchecked"
}if(nf.Canvas.getParentGroupId()===null){$("#port-concurrent-task-container").show()
}else{$("#port-concurrent-task-container").hide()
}$("#port-id").text(d.component.id);
$("#port-name").val(d.component.name);
$("#port-enabled").removeClass("checkbox-unchecked checkbox-checked").addClass(b);
$("#port-concurrent-tasks").val(d.component.concurrentlySchedulableTaskCount);
$("#port-comments").val(d.component.comments);
$("#port-configuration").modal("show")
}}}
}());
nf.PortDetails=(function(){return{init:function(){$("#port-details").modal({headerText:"Port Details",overlayBackground:true,buttons:[{buttonText:"Ok",handler:{click:function(){$("#port-details").modal("hide")
}}}],handler:{close:function(){nf.Common.clearField("read-only-port-name");
nf.Common.clearField("read-only-port-id");
nf.Common.clearField("read-only-port-comments")
}}}).draggable({containment:"parent",handle:".dialog-header"})
},showDetails:function(a){if(nf.CanvasUtils.isInputPort(a)||nf.CanvasUtils.isOutputPort(a)){var b=a.datum();
nf.Common.populateField("read-only-port-name",b.component.name);
nf.Common.populateField("read-only-port-id",b.component.id);
nf.Common.populateField("read-only-port-comments",b.component.comments);
$("#port-details").modal("show")
}}}
}());
nf.SecurePortConfiguration=(function(){var f="";
var b={search:"User DNs, groups, etc"};
var g=function(){$("#secure-port-configuration-tabs").tabbs({tabStyle:"tab",selectedTabStyle:"selected-tab",tabs:[{name:"Settings",tabContentId:"secure-port-settings-tab-content"},{name:"Access Control",tabContentId:"secure-port-access-control-tab-content"}]});
$("#secure-port-configuration").modal({headerText:"Configure Secure Port",overlayBackground:true,buttons:[{buttonText:"Apply",handler:{click:function(){var j=$("#secure-port-id").text();
var h=$("#secure-port-type").text();
var k={};
k.id=j;
k.name=$("#secure-port-name").val();
k.comments=$("#secure-port-comments").val();
k.groupAccessControl=a();
k.userAccessControl=c();
if($("#secure-port-concurrent-task-container").is(":visible")){k.concurrentlySchedulableTaskCount=$("#secure-port-concurrent-tasks").val()
}if($("#secure-port-enabled").hasClass("checkbox-unchecked")){k.state="DISABLED"
}else{if($("#secure-port-enabled").hasClass("checkbox-checked")){k.state="STOPPED"
}}var i={};
i.revision=nf.Client.getRevision();
i[h]=k;
$.ajax({type:"PUT",data:JSON.stringify(i),contentType:"application/json",url:f,dataType:"json"}).done(function(m){nf.Client.setRevision(m.revision);
var l;
if(nf.Common.isDefinedAndNotNull(m.inputPort)){l=m.inputPort
}else{l=m.outputPort
}nf.Port.set(l);
$("#secure-port-configuration").modal("hide")
}).fail(function(n,l,m){$("#secure-port-configuration").modal("hide");
nf.Common.handleAjaxError(n,l,m)
})
}}},{buttonText:"Cancel",handler:{click:function(){$("#secure-port-configuration").modal("hide")
}}}],handler:{close:function(){f="";
$("#secure-port-id").text("");
$("#secure-port-type").text("");
$("#secure-port-name").val("");
$("#secure-port-enabled").removeClass("checkbox-unchecked checkbox-checked");
$("#secure-port-concurrent-tasks").val("");
$("#secure-port-comments").val("");
$("#allowed-users").empty();
$("#allowed-groups").empty()
}}}).draggable({containment:"parent",handle:".dialog-header"});
$(document).on("click","div.remove-allowed-entity",function(){$(this).closest("li").remove();
$(this).closest("ul").sortable("refresh")
});
$.widget("nf.userSearchAutocomplete",$.ui.autocomplete,{_normalize:function(i){var h=[];
h.push(i);
return h
},_resizeMenu:function(){var h=this.menu.element;
h.width(700)
},_renderMenu:function(m,i){var h=this;
var l=i[0];
if(!nf.Common.isEmpty(l.userGroupResults)){var k=a();
var j=false;
$.each(l.userGroupResults,function(p,q){if($.inArray(q.group,k)===-1){if(!j){m.append('<li class="search-users-header">Groups</li>');
j=true
}h._renderGroupItem(m,q)
}})
}if(!nf.Common.isEmpty(l.userResults)){var n=c();
var o=false;
$.each(l.userResults,function(p,q){if($.inArray(q.userDn,n)===-1){if(!o){m.append('<li class="search-users-header">Users</li>');
o=true
}h._renderUserItem(m,q)
}})
}if(m.children().length===0){m.append('<li class="unset search-users-no-matches">No users or groups match</li>')
}},_renderGroupItem:function(h,j){var i=$("<a></a>").append($('<div class="search-users-match-header"></div>').text(j.group));
return $("<li></li>").data("ui-autocomplete-item",j).append(i).appendTo(h)
},_renderUserItem:function(i,j){var h=$("<a></a>").append($('<div class="search-users-match-header"></div>').text(j.userDn));
return $("<li></li>").data("ui-autocomplete-item",j).append(h).appendTo(i)
}});
$("#secure-port-access-control").userSearchAutocomplete({minLength:0,appendTo:"#search-users-results",position:{my:"left top",at:"left bottom",offset:"0 1"},source:function(i,h){$.ajax({type:"GET",data:{q:i.term},dataType:"json",url:"../nifi-api/controller/users/search-results"}).done(function(j){h(j)
})
},select:function(i,j){var h=j.item;
if(nf.Common.isDefinedAndNotNull(h.group)){d(h.group)
}else{e(h.userDn)
}$(this).blur();
return false
}}).focus(function(){if($(this).val()===b.search){$(this).val("").removeClass("search-users")
}}).blur(function(){$(this).val(b.search).addClass("search-users")
}).val(b.search).addClass("search-users")
};
var e=function(k){var i=$("#allowed-users");
var h=$("<span></span>").addClass("allowed-entity ellipsis").text(k).ellipsis();
var j=$("<div></div>").addClass("remove-allowed-entity");
$("<li></li>").data("user",k).append(h).append(j).appendTo(i)
};
var d=function(j){var i=$("#allowed-groups");
var k=$("<span></span>").addClass("allowed-entity ellipsis").text(j).ellipsis();
var h=$("<div></div>").addClass("remove-allowed-entity");
$("<li></li>").data("group",j).append(k).append(h).appendTo(i)
};
var c=function(){var h=[];
$("#allowed-users").children("li").each(function(j,k){var i=$(k).data("user");
if(nf.Common.isDefinedAndNotNull(i)){h.push(i)
}});
return h
};
var a=function(){var h=[];
$("#allowed-groups").children("li").each(function(j,i){var k=$(i).data("group");
if(nf.Common.isDefinedAndNotNull(k)){h.push(k)
}});
return h
};
return{init:function(){g()
},showConfiguration:function(i){if(nf.CanvasUtils.isInputPort(i)||nf.CanvasUtils.isOutputPort(i)){var j=i.datum();
if(j.component.type==="INPUT_PORT"){$("#secure-port-type").text("inputPort")
}else{$("#secure-port-type").text("outputPort")
}f=j.component.uri;
if(nf.Canvas.getParentGroupId()===null){$("#secure-port-concurrent-task-container").show()
}else{$("#secure-port-concurrent-task-container").hide()
}var h="checkbox-checked";
if(j.component.state==="DISABLED"){h="checkbox-unchecked"
}$("#secure-port-id").text(j.component.id);
$("#secure-port-name").val(j.component.name);
$("#secure-port-enabled").removeClass("checkbox-unchecked checkbox-checked").addClass(h);
$("#secure-port-concurrent-tasks").val(j.component.concurrentlySchedulableTaskCount);
$("#secure-port-comments").val(j.component.comments);
$.each(j.component.userAccessControl,function(k,l){e(l)
});
$.each(j.component.groupAccessControl,function(l,k){d(k)
});
$("#secure-port-configuration").modal("show")
}}}
}());
nf.SecurePortDetails=(function(){var b=function(e){var d=$("#read-only-allowed-users");
var c=$("<span></span>").addClass("allowed-entity ellipsis").text(e).ellipsis();
$("<li></li>").data("user",e).append(c).appendTo(d)
};
var a=function(d){var c=$("#read-only-allowed-groups");
var e=$("<span></span>").addClass("allowed-entity ellipsis").text(d).ellipsis();
$("<li></li>").data("group",d).append(e).appendTo(c)
};
return{init:function(){$("#secure-port-details-tabs").tabbs({tabStyle:"tab",selectedTabStyle:"selected-tab",tabs:[{name:"Settings",tabContentId:"read-only-secure-port-settings-tab-content"},{name:"Access Control",tabContentId:"read-only-secure-port-access-control-tab-content"}]});
$("#secure-port-details").modal({headerText:"Secure Port Details",overlayBackground:true,buttons:[{buttonText:"Ok",handler:{click:function(){$("#secure-port-details").modal("hide")
}}}],handler:{close:function(){nf.Common.clearField("read-only-secure-port-name");
nf.Common.clearField("read-only-secure-port-id");
nf.Common.clearField("read-only-secure-port-comments");
nf.Common.clearField("read-only-secure-port-concurrent-tasks");
$("#read-only-allowed-users").empty();
$("#read-only-allowed-groups").empty()
}}}).draggable({containment:"parent",handle:".dialog-header"})
},showDetails:function(c){if(nf.CanvasUtils.isInputPort(c)||nf.CanvasUtils.isOutputPort(c)){var d=c.datum();
nf.Common.populateField("read-only-secure-port-name",d.component.name);
nf.Common.populateField("read-only-secure-port-id",d.component.id);
nf.Common.populateField("read-only-secure-port-concurrent-tasks",d.component.concurrentlySchedulableTaskCount);
nf.Common.populateField("read-only-secure-port-comments",d.component.comments);
$.each(d.component.userAccessControl,function(e,f){b(f)
});
$.each(d.component.groupAccessControl,function(f,e){a(e)
});
$("#secure-port-details").modal("show")
}}}
}());
nf.LabelConfiguration=(function(){var a="";
return{init:function(){var b=function(){var g=nf.Client.getRevision();
var f=$("#label-value").val();
var h=$("#label-font-size").combo("getSelectedOption");
$.ajax({type:"PUT",url:a,data:{version:g.version,clientId:g.clientId,label:f,"style[font-size]":h.value},dataType:"json"}).done(function(i){nf.Client.setRevision(i.revision);
nf.Label.set(i.label)
}).fail(nf.Common.handleAjaxError);
a="";
$("#label-configuration").hide()
};
var e=function(){a="";
$("#label-configuration").hide()
};
$("#label-configuration").draggable({containment:"parent",cancel:"textarea, .button, .combo"}).on("click","#label-configuration-apply",b).on("click","#label-configuration-cancel",e);
var d=[];
for(var c=12;
c<=24;
c+=2){d.push({text:c+"px",value:c+"px"})
}$("#label-font-size").combo({options:d,selectedOption:{value:"12px"},select:function(g){var f=$("#label-value");
f.css({"font-size":g.value,"line-height":g.value}).val(f.val())
}})
},showConfiguration:function(c){if(nf.CanvasUtils.isLabel(c)){var e=c.datum();
var b="";
if(nf.Common.isDefinedAndNotNull(e.component.label)){b=e.component.label
}var d="12px";
if(nf.Common.isDefinedAndNotNull(e.component.style["font-size"])){d=e.component.style["font-size"]
}a=e.component.uri;
$("#label-value").val(b);
$("#label-font-size").combo("setSelectedOption",{value:d});
$("#label-configuration").center().show()
}}}
}());
nf.ConnectionConfiguration=(function(){var u=75;
var f=200;
var w={urls:{controller:"../nifi-api/controller",prioritizers:"../nifi-api/controller/prioritizers"}};
var j=function(){d3.select("path.connector").remove()
};
var b=function(z){if(nf.CanvasUtils.isProcessor(z)){return $.Deferred(function(A){i(z).done(function(C){if(!nf.Common.isEmpty(C.relationships)){$.each(C.relationships,function(D,E){r(E.name)
});
var B=$("#relationship-names").children("div");
if(B.length===1){B.children("div.available-relationship").removeClass("checkbox-unchecked").addClass("checkbox-checked")
}$("#connection-configuration").modal("setButtonModel",[{buttonText:"Add",handler:{click:function(){var D=l();
if(D.length>0){o(D)
}else{nf.Dialog.showOkDialog({dialogContent:"The connection must have at least one relationship selected.",overlayBackground:false})
}$("#connection-configuration").modal("hide")
}}},{buttonText:"Cancel",handler:{click:function(){$("#connection-configuration").modal("hide")
}}}]);
A.resolve()
}else{nf.Dialog.showOkDialog({dialogContent:"'"+nf.Common.escapeHtml(C.name)+"' does not support any relationships."});
e();
A.reject()
}}).fail(function(){A.reject()
})
}).promise()
}else{return $.Deferred(function(B){var A;
if(nf.CanvasUtils.isInputPort(z)){A=c(z)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(z)){A=k(z)
}else{if(nf.CanvasUtils.isProcessGroup(z)){A=s(z)
}else{A=g(z)
}}}A.done(function(){$("#connection-configuration").modal("setButtonModel",[{buttonText:"Add",handler:{click:function(){o();
$("#connection-configuration").modal("hide")
}}},{buttonText:"Cancel",handler:{click:function(){$("#connection-configuration").modal("hide")
}}}]);
B.resolve()
}).fail(function(){B.reject()
})
}).promise()
}};
var c=function(z){return $.Deferred(function(B){var A=z.datum();
$("#input-port-source").show();
$("#input-port-source-name").text(A.component.name);
$("#connection-source-id").val(A.component.id);
$("#connection-source-component-id").val(A.component.id);
$("#connection-source-group-id").val(nf.Canvas.getGroupId());
$("#connection-source-group-name").text(nf.Canvas.getGroupName());
B.resolve()
}).promise()
};
var g=function(z){return $.Deferred(function(B){var A=z.datum();
$("#funnel-source").show();
$("#connection-source-id").val(A.component.id);
$("#connection-source-component-id").val(A.component.id);
$("#connection-source-group-id").val(nf.Canvas.getGroupId());
$("#connection-source-group-name").text(nf.Canvas.getGroupName());
B.resolve()
}).promise()
};
var i=function(z){return $.Deferred(function(B){var A=z.datum();
$("#processor-source").show();
$("#processor-source-name").text(A.component.name);
$("#processor-source-type").text(nf.Common.substringAfterLast(A.component.type,"."));
$("#connection-source-id").val(A.component.id);
$("#connection-source-component-id").val(A.component.id);
$("#connection-source-group-id").val(nf.Canvas.getGroupId());
$("#connection-source-group-name").text(nf.Canvas.getGroupName());
$("#relationship-names-container").show();
B.resolve(A.component)
})
};
var s=function(z){return $.Deferred(function(A){var B=z.datum();
$.ajax({type:"GET",url:w.urls.controller+"/process-groups/"+encodeURIComponent(B.component.id),data:{verbose:true},dataType:"json"}).done(function(C){var E=C.processGroup;
var F=E.contents;
if(!nf.Common.isEmpty(F.outputPorts)){$("#output-port-source").show();
var D=[];
$.each(F.outputPorts,function(G,H){D.push({text:H.name,value:H.id,description:nf.Common.escapeHtml(H.comments)})
});
D.sort(function(H,G){return H.text.localeCompare(G.text)
});
$("#output-port-options").combo({options:D,maxHeight:300,select:function(G){$("#connection-source-id").val(G.value)
}});
$("#connection-source-component-id").val(E.id);
$("#connection-source-group-id").val(E.id);
$("#connection-source-group-name").text(E.name);
A.resolve()
}else{nf.Dialog.showOkDialog({dialogContent:"'"+nf.Common.escapeHtml(E.name)+"' does not have any output ports."});
e();
A.reject()
}}).fail(function(E,C,D){nf.Common.handleAjaxError(E,C,D);
A.reject()
})
}).promise()
};
var k=function(z){return $.Deferred(function(A){var B=z.datum();
$.ajax({type:"GET",url:B.component.uri,data:{verbose:true},dataType:"json"}).done(function(C){var E=C.remoteProcessGroup;
var F=E.contents;
if(!nf.Common.isEmpty(F.outputPorts)){$("#output-port-source").show();
var D=[];
$.each(F.outputPorts,function(G,H){D.push({text:H.name,value:H.id,disabled:H.exists===false,description:nf.Common.escapeHtml(H.comments)})
});
D.sort(function(H,G){return H.text.localeCompare(G.text)
});
$("#output-port-options").combo({options:D,maxHeight:300,select:function(G){$("#connection-source-id").val(G.value)
}});
$("#connection-source-component-id").val(E.id);
$("#connection-source-group-id").val(E.id);
$("#connection-source-group-name").text(E.name);
A.resolve()
}else{nf.Dialog.showOkDialog({dialogContent:"'"+nf.Common.escapeHtml(E.name)+"' does not have any output ports."});
e();
A.reject()
}}).fail(function(E,C,D){nf.Common.handleAjaxError(E,C,D);
A.reject()
})
}).promise()
};
var q=function(z){if(nf.CanvasUtils.isOutputPort(z)){return n(z)
}else{if(nf.CanvasUtils.isProcessor(z)){return v(z)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(z)){return t(z)
}else{if(nf.CanvasUtils.isFunnel(z)){return d(z)
}else{return m(z)
}}}}};
var n=function(z){return $.Deferred(function(A){var B=z.datum();
$("#output-port-destination").show();
$("#output-port-destination-name").text(B.component.name);
$("#connection-destination-id").val(B.component.id);
$("#connection-destination-component-id").val(B.component.id);
$("#connection-destination-group-id").val(nf.Canvas.getGroupId());
$("#connection-destination-group-name").text(nf.Canvas.getGroupName());
A.resolve()
}).promise()
};
var d=function(z){return $.Deferred(function(B){var A=z.datum();
$("#funnel-destination").show();
$("#connection-destination-id").val(A.component.id);
$("#connection-destination-component-id").val(A.component.id);
$("#connection-destination-group-id").val(nf.Canvas.getGroupId());
$("#connection-destination-group-name").text(nf.Canvas.getGroupName());
B.resolve()
}).promise()
};
var v=function(z){return $.Deferred(function(B){var A=z.datum();
$("#processor-destination").show();
$("#processor-destination-name").text(A.component.name);
$("#processor-destination-type").text(nf.Common.substringAfterLast(A.component.type,"."));
$("#connection-destination-id").val(A.component.id);
$("#connection-destination-component-id").val(A.component.id);
$("#connection-destination-group-id").val(nf.Canvas.getGroupId());
$("#connection-destination-group-name").text(nf.Canvas.getGroupName());
B.resolve()
}).promise()
};
var m=function(z){return $.Deferred(function(A){var B=z.datum();
$.ajax({type:"GET",url:w.urls.controller+"/process-groups/"+encodeURIComponent(B.component.id),data:{verbose:true},dataType:"json"}).done(function(C){var E=C.processGroup;
var F=E.contents;
if(!nf.Common.isEmpty(F.inputPorts)){$("#input-port-destination").show();
var D=[];
$.each(F.inputPorts,function(H,G){D.push({text:G.name,value:G.id,description:nf.Common.escapeHtml(G.comments)})
});
D.sort(function(H,G){return H.text.localeCompare(G.text)
});
$("#input-port-options").combo({options:D,maxHeight:300,select:function(G){$("#connection-destination-id").val(G.value)
}});
$("#connection-destination-component-id").val(E.id);
$("#connection-destination-group-id").val(E.id);
$("#connection-destination-group-name").text(E.name);
A.resolve()
}else{nf.Dialog.showOkDialog({dialogContent:"'"+nf.Common.escapeHtml(E.name)+"' does not have any input ports."});
e();
A.reject()
}}).fail(function(E,C,D){nf.Common.handleAjaxError(E,C,D);
A.reject()
})
}).promise()
};
var t=function(z){return $.Deferred(function(A){var B=z.datum();
$.ajax({type:"GET",url:B.component.uri,data:{verbose:true},dataType:"json"}).done(function(C){var E=C.remoteProcessGroup;
var F=E.contents;
if(!nf.Common.isEmpty(F.inputPorts)){$("#input-port-destination").show();
var D=[];
$.each(F.inputPorts,function(H,G){D.push({text:G.name,value:G.id,disabled:G.exists===false,description:nf.Common.escapeHtml(G.comments)})
});
D.sort(function(H,G){return H.text.localeCompare(G.text)
});
$("#input-port-options").combo({options:D,maxHeight:300,select:function(G){$("#connection-destination-id").val(G.value)
}});
$("#connection-destination-component-id").val(E.id);
$("#connection-destination-group-id").val(E.id);
$("#connection-destination-group-name").text(E.name);
A.resolve()
}else{nf.Dialog.showOkDialog({dialogContent:"'"+nf.Common.escapeHtml(E.name)+"' does not have any input ports."});
e();
A.reject()
}}).fail(function(E,C,D){nf.Common.handleAjaxError(E,C,D);
A.reject()
})
}).promise()
};
var a=function(z){return $.Deferred(function(A){var B=z.datum();
$("#read-only-output-port-source").show();
$("#connection-source-component-id").val(B.component.id);
$("#connection-source-group-id").val(B.component.id);
$("#connection-source-group-name").text(B.component.name);
A.resolve()
}).promise()
};
var p=function(z){if(nf.CanvasUtils.isProcessor(z)){return i(z)
}else{if(nf.CanvasUtils.isInputPort(z)){return c(z)
}else{if(nf.CanvasUtils.isFunnel(z)){return g(z)
}else{return a(z)
}}}};
var h=function(z){if(nf.CanvasUtils.isProcessor(z)){return v(z)
}else{if(nf.CanvasUtils.isOutputPort(z)){return n(z)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(z)){return t(z)
}else{if(nf.CanvasUtils.isFunnel(z)){return d(z)
}else{return m(z)
}}}}};
var r=function(A){var z=$('<div class="relationship-name ellipsis"></div>').text(A);
var B=$('<span class="relationship-name-value hidden"></span>').text(A);
return $('<div class="available-relationship-container"><div class="available-relationship nf-checkbox checkbox-unchecked"></div></div>').append(z).append(B).appendTo("#relationship-names")
};
var o=function(B){var V=$("#connection-source-id").val();
var S=$("#connection-destination-id").val();
var Z=$("#connection-source-component-id").val();
var P=d3.select("#id-"+Z);
var T=$("#connection-destination-component-id").val();
var I=d3.select("#id-"+T);
var af=P.datum();
var J=I.datum();
var C=[];
if(Z===T){var O={x:af.component.position.x+(af.dimensions.width),y:af.component.position.y+(af.dimensions.height/2)};
var U=nf.Connection.config.selfLoopXOffset;
var W=nf.Connection.config.selfLoopYOffset;
C.push((O.x+U)+","+(O.y-W));
C.push((O.x+U)+","+(O.y+W))
}else{var ad=[];
var Y=nf.Connection.getComponentConnections(Z);
$.each(Y,function(aj,am){var ak=nf.CanvasUtils.getConnectionSourceComponentId(am);
var al=nf.CanvasUtils.getConnectionDestinationComponentId(am);
if((ak===Z&&al===T)||(al===Z&&ak===T)){ad.push(am)
}});
if(ad.length>0){var D=false;
$.each(ad,function(aj,ak){if(nf.Common.isEmpty(ak.bends)){D=true;
return false
}});
if(D===true){var Q=[af.component.position.x+(af.dimensions.width/2),af.component.position.y+(af.dimensions.height/2)];
var A=[J.component.position.x+(J.dimensions.width/2),J.component.position.y+(J.dimensions.height/2)];
var N=((Q[1]-A[1])/(Q[0]-A[0]));
var ab=N<=1&&N>=-1;
var X=function(aj,al){var ak=false;
$.each(ad,function(am,an){if(!nf.Common.isEmpty(an.bends)){if(ab){if(an.bends[0].y===al){ak=true;
return false
}}else{if(an.bends[0].x===aj){ak=true;
return false
}}}});
return ak
};
var G=(Q[0]+A[0])/2;
var K=(Q[1]+A[1])/2;
var aa=ab?0:f;
var M=ab?u:0;
var ac=false;
while(ac===false){if(X(G-aa,K-M)===false){C.push((G-aa)+","+(K-M));
ac=true
}else{if(X(G+aa,K+M)===false){C.push((G+aa)+","+(K+M));
ac=true
}}if(ab){M+=u
}else{aa+=f
}}}}}var F=$("#connection-source-group-id").val();
var z=$("#connection-destination-group-id").val();
var ag=nf.CanvasUtils.getConnectableTypeForSource(P);
var L=nf.CanvasUtils.getConnectableTypeForDestination(I);
var H=$("#connection-name").val();
var E=$("#flow-file-expiration").val();
var ae=$("#back-pressure-object-threshold").val();
var ai=$("#back-pressure-data-size-threshold").val();
var R=$("#prioritizer-selected").sortable("toArray");
if(x()){var ah=nf.Client.getRevision();
$.ajax({type:"POST",url:w.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId())+"/connections",data:{version:ah.version,clientId:ah.clientId,sourceId:V,sourceGroupId:F,sourceType:ag,relationships:B,bends:C,name:H,flowFileExpiration:E,backPressureObjectThreshold:ae,backPressureDataSizeThreshold:ai,prioritizers:R,destinationId:S,destinationGroupId:z,destinationType:L},dataType:"json"}).done(function(aj){nf.Client.setRevision(aj.revision);
nf.Graph.add({connections:[aj.connection]},true);
if(nf.CanvasUtils.isProcessor(P)){nf.Processor.reload(af.component)
}else{if(nf.CanvasUtils.isInputPort(P)){nf.Port.reload(af.component)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(P)){nf.RemoteProcessGroup.reload(af.component)
}}}if(nf.CanvasUtils.isRemoteProcessGroup(I)){nf.RemoteProcessGroup.reload(J.component)
}nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh()
}).fail(function(al,aj,ak){nf.Common.handleAjaxError(al,aj,ak)
})
}};
var y=function(H){var C=$("#connection-uri").val();
var P=$("#connection-source-component-id").val();
var z=d3.select("#id-"+P);
var G=z.datum();
var K=$("#connection-destination-component-id").val();
var M=d3.select("#id-"+K);
var B=M.datum();
var I=nf.CanvasUtils.getConnectableTypeForDestination(M);
var A=$("#connection-destination-id").val();
var J=$("#connection-destination-group-id").val();
var F=$("#connection-name").val();
var D=$("#flow-file-expiration").val();
var O=$("#back-pressure-object-threshold").val();
var E=$("#back-pressure-data-size-threshold").val();
var N=$("#prioritizer-selected").sortable("toArray");
if(x()){var L=nf.Client.getRevision();
return $.ajax({type:"PUT",url:C,data:{version:L.version,clientId:L.clientId,relationships:H,name:F,flowFileExpiration:D,backPressureObjectThreshold:O,backPressureDataSizeThreshold:E,prioritizers:N,destinationId:A,destinationType:I,destinationGroupId:J},dataType:"json"}).done(function(R){if(nf.Common.isDefinedAndNotNull(R.connection)){var Q=R.connection;
nf.Client.setRevision(R.revision);
nf.Connection.set(Q);
if(nf.CanvasUtils.isProcessor(z)){nf.Processor.reload(G.component)
}else{if(nf.CanvasUtils.isInputPort(z)){nf.Port.reload(G.component)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(z)){nf.RemoteProcessGroup.reload(G.component)
}}}if(nf.CanvasUtils.isRemoteProcessGroup(M)){nf.RemoteProcessGroup.reload(B.component)
}}}).fail(function(S,Q,R){if(S.status===400||S.status===404||S.status===409){nf.Dialog.showOkDialog({dialogContent:nf.Common.escapeHtml(S.responseText),overlayBackground:true})
}else{nf.Common.handleAjaxError(S,Q,R)
}})
}else{return $.Deferred(function(Q){Q.reject()
}).promise()
}};
var l=function(){var A=$("#relationship-names");
var z=[];
$.each(A.children(),function(B,E){var D=$(E);
var C=D.children("div.available-relationship");
if(C.hasClass("checkbox-checked")){z.push(D.children("span.relationship-name-value").text())
}});
return z
};
var x=function(){var z=[];
if(nf.Common.isBlank($("#flow-file-expiration").val())){z.push("File expiration must be specified")
}if(!$.isNumeric($("#back-pressure-object-threshold").val())){z.push("Back pressure object threshold must be an integer value")
}if(nf.Common.isBlank($("#back-pressure-data-size-threshold").val())){z.push("Back pressure data size threshold must be specified")
}if(z.length>0){nf.Dialog.showOkDialog({dialogContent:nf.Common.formatUnorderedList(z),overlayBackground:false,headerText:"Configuration Error"});
return false
}else{return true
}};
var e=function(){var B=$("#prioritizer-selected");
var z=$("#prioritizer-available");
B.children().detach().appendTo(z);
var A=z.children("li").get();
A.sort(function(D,C){var F=$(D).text().toUpperCase();
var E=$(C).text().toUpperCase();
return(F<E)?-1:(F>E)?1:0
});
$.each(A,function(){$(this).detach()
});
$.each(A,function(){$(this).appendTo(z)
});
$("#connection-name").val("");
$("#relationship-names").css("border-width","0").empty();
$("#relationship-names-container").hide();
nf.Common.clearField("connection-id");
$("#processor-source").hide();
$("#input-port-source").hide();
$("#output-port-source").hide();
$("#read-only-output-port-source").hide();
$("#funnel-source").hide();
$("#processor-destination").hide();
$("#input-port-destination").hide();
$("#output-port-destination").hide();
$("#funnel-destination").hide();
$("#connection-source-id").val("");
$("#connection-source-component-id").val("");
$("#connection-source-group-id").val("");
$("#connection-destination-id").val("");
$("#connection-destination-component-id").val("");
$("#connection-destination-group-id").val("");
$("#output-port-options").empty();
$("#input-port-options").empty();
j()
};
return{init:function(){$("#relationship-names-container").hide();
$("#connection-configuration").modal({headerText:"Configure Connection",overlayBackground:true,handler:{close:function(){e()
}}}).draggable({containment:"parent",handle:".dialog-header"});
$("#connection-configuration-tabs").tabbs({tabStyle:"tab",selectedTabStyle:"selected-tab",tabs:[{name:"Details",tabContentId:"connection-details-tab-content"},{name:"Settings",tabContentId:"connection-settings-tab-content"}]});
$.ajax({type:"GET",url:w.urls.prioritizers,dataType:"json"}).done(function(z){$.each(z.prioritizerTypes,function(A,B){nf.ConnectionConfiguration.addAvailablePrioritizer("#prioritizer-available",B)
});
$("#prioritizer-available, #prioritizer-selected").sortable({connectWith:"ul",placeholder:"ui-state-highlight",scroll:true,opacity:0.6});
$("#prioritizer-available, #prioritizer-selected").disableSelection()
}).fail(nf.Common.handleAjaxError)
},addAvailablePrioritizer:function(E,C){var B=C.type;
var A=nf.Common.substringAfterLast(B,".");
var D=$(E);
var z=$("<li></li>").append($('<span style="float: left;"></span>').text(A)).attr("id",B).addClass("ui-state-default").appendTo(D);
if(nf.Common.isDefinedAndNotNull(C.description)){$('<img class="icon-info" style="float: right; margin-right: 5px;" src="images/iconInfo.png"></img>').appendTo(z).qtip($.extend({content:nf.Common.escapeHtml(C.description)},nf.Common.config.tooltipConfig))
}},createConnection:function(B,C){var A=d3.select("#id-"+B);
var z=d3.select("#id-"+C);
if(A.empty()||z.empty()){return
}$.when(b(A),q(z)).done(function(){$("#flow-file-expiration").val("0 sec");
$("#back-pressure-object-threshold").val("0");
$("#back-pressure-data-size-threshold").val("0 MB");
$("#connection-configuration-tabs").find("li:first").click();
$("#connection-configuration").modal("setHeaderText","Create Connection").modal("show");
$("#connection-configuration div.relationship-name").ellipsis();
nf.Common.populateField("connection-id",null);
var D=$("#relationship-names");
if(D.is(":visible")&&D.get(0).scrollHeight>D.innerHeight()){D.css("border-width","1px")
}}).fail(function(){j()
})
},showConfiguration:function(A,z){return $.Deferred(function(C){var E=A.datum();
var B=E.component;
var G=nf.CanvasUtils.getConnectionSourceComponentId(B);
var D=d3.select("#id-"+G);
if(nf.Common.isUndefinedOrNull(z)){var F=nf.CanvasUtils.getConnectionDestinationComponentId(B);
z=d3.select("#id-"+F)
}$.when(p(D),h(z)).done(function(){var J=B.availableRelationships;
var I=B.selectedRelationships;
if(nf.Common.isDefinedAndNotNull(J)||nf.Common.isDefinedAndNotNull(I)){$.each(J,function(M,L){r(L)
});
$.each(I,function(N,L){if($.inArray(L,J)===-1){var O=r(L);
$(O).children("div.relationship-name").addClass("undefined")
}var M=$("#relationship-names").children("div");
$.each(M,function(P,R){var Q=$(R).children("span.relationship-name-value");
if(Q.text()===L){$(R).children("div.available-relationship").removeClass("checkbox-unchecked").addClass("checkbox-checked")
}})
})
}if(nf.CanvasUtils.isProcessGroup(D)||nf.CanvasUtils.isRemoteProcessGroup(D)){$("#connection-source-id").val(B.source.id);
$("#read-only-output-port-name").text(B.source.name)
}if(nf.CanvasUtils.isProcessGroup(z)||nf.CanvasUtils.isRemoteProcessGroup(z)){var H=z.datum();
if(B.destination.groupId===H.component.id){$("#input-port-options").combo("setSelectedOption",{value:B.destination.id})
}}$("#connection-name").val(B.name);
$("#flow-file-expiration").val(B.flowFileExpiration);
$("#back-pressure-object-threshold").val(B.backPressureObjectThreshold);
$("#back-pressure-data-size-threshold").val(B.backPressureDataSizeThreshold);
nf.Common.populateField("connection-id",B.id);
$.each(B.prioritizers,function(L,M){$("#prioritizer-available").children('li[id="'+M+'"]').detach().appendTo("#prioritizer-selected")
});
$("#connection-uri").val(B.uri);
$("#connection-configuration").modal("setButtonModel",[{buttonText:"Apply",handler:{click:function(){var L=l();
if(nf.CanvasUtils.isProcessor(D)){if(L.length>0){y(L).done(function(){C.resolve()
}).fail(function(){C.reject()
})
}else{nf.Dialog.showOkDialog({dialogContent:"The connection must have at least one relationship selected.",overlayBackground:false});
C.reject()
}}else{y(undefined).done(function(){C.resolve()
}).fail(function(){C.reject()
})
}$("#connection-configuration").modal("hide")
}}},{buttonText:"Cancel",handler:{click:function(){$("#connection-configuration").modal("hide");
C.reject()
}}}]);
$("#connection-configuration-tabs").find("li:first").click();
$("#connection-configuration").modal("setHeaderText","Configure Connection").modal("show");
$("#connection-configuration div.relationship-name").ellipsis();
var K=$("#relationship-names");
if(K.is(":visible")&&K.get(0).scrollHeight>K.innerHeight()){K.css("border-width","1px")
}}).fail(function(){C.reject()
})
}).promise()
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
nf.Graph=(function(){var b=function(c){if(nf.Common.isDefinedAndNotNull(c.inputPorts)&&nf.Common.isDefinedAndNotNull(c.outputPorts)){return c.inputPorts.concat(c.outputPorts)
}else{if(nf.Common.isDefinedAndNotNull(c.inputPorts)){return c.inputPorts
}else{if(nf.Common.isDefinedAndNotNull(c.outputPorts)){return c.outputPorts
}else{return[]
}}}};
var a=function(c){if(nf.Common.isDefinedAndNotNull(c.inputPortStatus)&&nf.Common.isDefinedAndNotNull(c.outputPortStatus)){return c.inputPortStatus.concat(c.outputPortStatus)
}else{if(nf.Common.isDefinedAndNotNull(c.inputPortStatus)){return c.inputPortStatus
}else{if(nf.Common.isDefinedAndNotNull(c.outputPortStatus)){return c.outputPortStatus
}else{return[]
}}}};
return{init:function(){nf.Label.init();
nf.Funnel.init();
nf.Port.init();
nf.RemoteProcessGroup.init();
nf.ProcessGroup.init();
nf.Processor.init();
nf.Connection.init();
return nf.CanvasUtils.enterGroup(nf.Canvas.getGroupId())
},add:function(d,c){c=nf.Common.isDefinedAndNotNull(c)?c:false;
if(c){nf.CanvasUtils.getSelection().classed("selected",false)
}var e=b(d);
if(!nf.Common.isEmpty(d.labels)){nf.Label.add(d.labels,c)
}if(!nf.Common.isEmpty(d.funnels)){nf.Funnel.add(d.funnels,c)
}if(!nf.Common.isEmpty(d.remoteProcessGroups)){nf.RemoteProcessGroup.add(d.remoteProcessGroups,c)
}if(!nf.Common.isEmpty(e)){nf.Port.add(e,c)
}if(!nf.Common.isEmpty(d.processGroups)){nf.ProcessGroup.add(d.processGroups,c)
}if(!nf.Common.isEmpty(d.processors)){nf.Processor.add(d.processors,c)
}if(!nf.Common.isEmpty(d.connections)){nf.Connection.add(d.connections,c)
}},get:function(){return{labels:nf.Label.get(),funnels:nf.Funnel.get(),ports:nf.Port.get(),remoteProcessGroups:nf.RemoteProcessGroup.get(),processGroups:nf.ProcessGroup.get(),processors:nf.Processor.get(),connections:nf.Connection.get()}
},set:function(c){var d=b(c);
if(!nf.Common.isEmpty(c.labels)){nf.Label.set(c.labels)
}if(!nf.Common.isEmpty(c.funnels)){nf.Funnel.set(c.funnels)
}if(!nf.Common.isEmpty(d)){nf.Port.set(d)
}if(!nf.Common.isEmpty(c.remoteProcessGroups)){nf.RemoteProcessGroup.set(c.remoteProcessGroups)
}if(!nf.Common.isEmpty(c.processGroups)){nf.ProcessGroup.set(c.processGroups)
}if(!nf.Common.isEmpty(c.processors)){nf.Processor.set(c.processors)
}if(!nf.Common.isEmpty(c.connections)){nf.Connection.set(c.connections)
}},setStatus:function(d){var c=a(d);
nf.Port.setStatus(c);
nf.RemoteProcessGroup.setStatus(d.remoteProcessGroupStatus);
nf.ProcessGroup.setStatus(d.processGroupStatus);
nf.Processor.setStatus(d.processorStatus);
nf.Connection.setStatus(d.connectionStatus)
},removeAll:function(){nf.Label.removeAll();
nf.Funnel.removeAll();
nf.Port.removeAll();
nf.RemoteProcessGroup.removeAll();
nf.ProcessGroup.removeAll();
nf.Processor.removeAll();
nf.Connection.removeAll()
},pan:function(){nf.Port.pan();
nf.RemoteProcessGroup.pan();
nf.ProcessGroup.pan();
nf.Processor.pan();
nf.Connection.pan()
}}
}());
nf.Processor=(function(){var h=25;
var a={width:310,height:100};
var i;
var b;
var f=function(){return b.selectAll("g.processor").data(i.values(),function(k){return k.component.id
})
};
var d=function(m,l){if(m.empty()){return
}var k=m.append("g").attr({id:function(n){return"id-"+n.component.id
},"class":"processor component"}).classed("selected",l).call(nf.CanvasUtils.position);
k.append("rect").attr({"class":"border",width:function(n){return n.dimensions.width
},height:function(n){return n.dimensions.height
},fill:"transparent","stroke-opacity":0.8,"stroke-width":1});
k.append("rect").attr({"class":"body",width:function(n){return n.dimensions.width
},height:function(n){return n.dimensions.height
},"fill-opacity":0.8,"stroke-opacity":0.8,"stroke-width":0});
k.append("text").attr({x:25,y:18,width:220,height:16,"font-size":"10pt","font-weight":"bold",fill:"black","class":"processor-name"});
k.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconProcessor.png",width:28,height:26,x:276,y:5});
k.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/bgProcessorStatArea.png",width:294,height:58,x:8,y:35,"class":"processor-stats-preview"});
k.call(nf.Selectable.activate).call(nf.ContextMenu.activate);
if(nf.Common.isDFM()){k.call(nf.Draggable.activate).call(nf.Connectable.activate)
}k.call(e)
};
var e=function(l){if(l.empty()){return
}l.each(function(){var p=d3.select(this);
var n=p.select("g.processor-details");
if(p.classed("visible")){if(n.empty()){n=p.append("g").attr("class","processor-details");
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"run-status-icon",width:16,height:16,x:5,y:5});
n.append("text").attr({x:25,y:30,width:246,height:16,"font-size":"8pt","font-weight":"normal",fill:"black"}).each(function(s){var r=d3.select(this);
r.text(null).selectAll("title").remove();
nf.CanvasUtils.ellipsis(r,nf.Common.substringAfterLast(s.component.type,"."))
}).append("title").text(function(r){return nf.Common.substringAfterLast(r.component.type,".")
});
n.append("rect").attr({width:294,height:59,x:8,y:35,fill:"#ffffff","stroke-width":1,stroke:"#6f97ac","stroke-opacity":0.8});
n.append("rect").attr({width:73,height:59,x:8,y:35,fill:"url(#processor-stats-background)","stroke-width":0});
var q=n.append("g").attr({transform:"translate(8, 45)"});
q.append("text").attr({width:73,height:10,x:4,y:4,"class":"processor-stats-label"}).text("In");
q.append("text").attr({width:73,height:10,x:4,y:17,"class":"processor-stats-label"}).text("Read/Write");
q.append("text").attr({width:73,height:10,x:4,y:30,"class":"processor-stats-label"}).text("Out");
q.append("text").attr({width:73,height:10,x:4,y:43,"class":"processor-stats-label"}).text("Tasks/Time");
var m=n.append("g").attr({transform:"translate(80, 45)"});
m.append("text").attr({width:180,height:10,x:4,y:4,"class":"processor-in processor-stats-value"});
m.append("text").attr({width:180,height:10,x:4,y:17,"class":"processor-read-write processor-stats-value"});
m.append("text").attr({width:180,height:10,x:4,y:30,"class":"processor-out processor-stats-value"});
m.append("text").attr({width:180,height:10,x:4,y:43,"class":"processor-tasks-time processor-stats-value"});
var o=n.append("g").attr("transform","translate(258, 45)");
o.append("text").attr({width:25,height:10,x:4,y:4,"class":"processor-stats-info"}).text("(5 min)");
o.append("text").attr({width:25,height:10,x:4,y:17,"class":"processor-stats-info"}).text("(5 min)");
o.append("text").attr({width:25,height:10,x:4,y:30,"class":"processor-stats-info"}).text("(5 min)");
o.append("text").attr({width:25,height:10,x:4,y:43,"class":"processor-stats-info"}).text("(5 min)");
n.append("rect").attr({"class":"active-thread-count-background",height:13,y:0,fill:"#fff","fill-opacity":"0.65",stroke:"#aaa","stroke-width":"1"});
n.append("text").attr({"class":"active-thread-count",height:13,y:10,fill:"#000"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"bulletin-icon","xlink:href":"images/iconBulletin.png",width:12,height:12,x:8,y:20})
}n.select("image.run-status-icon").attr("xlink:href",function(s){var r="";
if(s.component.state==="DISABLED"){r="images/iconDisable.png"
}else{if(!nf.Common.isEmpty(s.component.validationErrors)){r="images/iconAlert.png"
}else{if(s.component.state==="RUNNING"){r="images/iconRun.png"
}else{if(s.component.state==="STOPPED"){r="images/iconStop.png"
}}}}return r
}).each(function(s){var r=d3.select("#run-status-tip-"+s.component.id);
if(!r.empty()){r.remove()
}if(!nf.Common.isEmpty(s.component.validationErrors)){r=d3.select("#processor-tooltips").append("div").attr("id",function(){return"run-status-tip-"+s.component.id
}).attr("class","tooltip nifi-tooltip").html(function(){var t=nf.Common.formatUnorderedList(s.component.validationErrors);
if(t===null||t.length===0){return""
}else{return $("<div></div>").append(t).html()
}});
nf.CanvasUtils.canvasTooltip(r,d3.select(this))
}});
p.select("text.processor-name").each(function(s){var r=d3.select(this);
r.text(null).selectAll("title").remove();
nf.CanvasUtils.ellipsis(r,s.component.name)
}).append("title").text(function(r){return r.component.name
});
p.select("image.processor-stats-preview").style("display","none");
p.call(c)
}else{p.select("text.processor-name").text(function(s){var r=s.component.name;
if(r.length>h){return r.substring(0,h)+String.fromCharCode(8230)
}else{return r
}});
p.select("image.processor-stats-preview").style("display","block");
p.call(g);
if(!n.empty()){n.remove()
}}});
var k=d3.set();
k.add(nf.Common.substringAfterLast(nf.Processor.defaultColor(),"#"));
i.forEach(function(o,n){var m=n.component.style["background-color"];
if(nf.Common.isDefinedAndNotNull(m)){k.add(nf.Common.substringAfterLast(m,"#"))
}});
nf.Canvas.defineProcessorColors(k.values());
l.select("rect.border").attr("stroke",function(n){var m=nf.Processor.defaultColor();
if(nf.Common.isDefinedAndNotNull(n.component.style["background-color"])){m=n.component.style["background-color"]
}return m
});
l.select("rect.body").attr("fill",function(n){var m=nf.Processor.defaultColor();
if(nf.Common.isDefinedAndNotNull(n.component.style["background-color"])){m=n.component.style["background-color"]
}m=nf.Common.substringAfterLast(m,"#");
return"url(#processor-background-"+m+")"
})
};
var c=function(k){if(k.empty()){return
}k.select("text.processor-in").text(function(l){if(nf.Common.isDefinedAndNotNull(l.status)){return l.status.input
}else{return"- / -"
}});
k.select("text.processor-read-write").text(function(l){if(nf.Common.isDefinedAndNotNull(l.status)){return l.status.read+" / "+l.status.written
}else{return"- / -"
}});
k.select("text.processor-out").text(function(l){if(nf.Common.isDefinedAndNotNull(l.status)){return l.status.output
}else{return"- / -"
}});
k.select("text.processor-tasks-time").text(function(l){if(nf.Common.isDefinedAndNotNull(l.status)){return l.status.tasks+" / "+l.status.tasksDuration
}else{return"- / -"
}});
k.each(function(m){var l=d3.select(this);
nf.CanvasUtils.activeThreadCount(l,m);
nf.CanvasUtils.bulletins(l,m,function(){return d3.select("#processor-tooltips")
},286)
})
};
var j=function(k){if(k.empty()){return
}k.call(g).remove()
};
var g=function(k){k.each(function(l){$("#run-status-tip-"+l.component.id).remove();
$("#bulletin-tip-"+l.component.id).remove()
})
};
return{init:function(){i=d3.map();
b=d3.select("#canvas").append("g").attr({"pointer-events":"all","class":"processors"})
},add:function(k,l){l=nf.Common.isDefinedAndNotNull(l)?l:false;
var m=function(n){i.set(n.id,{type:"Processor",component:n,dimensions:a})
};
if($.isArray(k)){$.each(k,function(n,o){m(o)
})
}else{m(k)
}f().enter().call(d,l)
},get:function(k){if(nf.Common.isUndefined(k)){return i.values()
}else{return i.get(k)
}},refresh:function(k){if(nf.Common.isDefinedAndNotNull(k)){d3.select("#id-"+k).call(e)
}else{d3.selectAll("g.processor").call(e)
}},position:function(k){d3.select("#id-"+k).call(nf.CanvasUtils.position)
},pan:function(){d3.selectAll("g.processor.entering, g.processor.leaving").call(e)
},reload:function(k){if(i.has(k.id)){return $.ajax({type:"GET",url:k.uri,dataType:"json"}).done(function(l){nf.Processor.set(l.processor)
})
}},set:function(k){var l=function(n){if(i.has(n.id)){var m=i.get(n.id);
m.component=n;
d3.select("#id-"+n.id).call(e)
}};
if($.isArray(k)){$.each(k,function(m,n){l(n)
})
}else{l(k)
}},remove:function(k){if($.isArray(k)){$.each(k,function(l,m){i.remove(m)
})
}else{i.remove(k)
}f().exit().call(j)
},removeAll:function(){nf.Processor.remove(i.keys())
},setStatus:function(k){if(nf.Common.isEmpty(k)){return
}$.each(k,function(m,l){if(i.has(l.id)){var n=i.get(l.id);
n.status=l
}});
d3.selectAll("g.processor.visible").call(c)
},defaultColor:function(){return"#aaaaaa"
}}
}());
nf.Label=(function(){var a={width:150,height:150};
var g=20;
var b=64;
var f;
var j;
var h;
var i=function(){return j.selectAll("g.label").data(f.values(),function(l){return l.component.id
})
};
var c=function(n,m){if(n.empty()){return
}var l=n.append("g").attr({id:function(o){return"id-"+o.component.id
},"class":"label component"}).classed("selected",m).call(d);
l.append("rect").attr({"class":"border",fill:"transparent","stroke-opacity":0.8,"stroke-width":1});
l.append("rect").attr({"class":"body","fill-opacity":0.8,"stroke-opacity":0.8,"stroke-width":0});
l.append("text").attr({"xml:space":"preserve","font-weight":"bold",fill:"black","class":"label-value"});
l.call(nf.Selectable.activate).call(nf.ContextMenu.activate);
if(nf.Common.isDFM()){l.call(nf.Draggable.activate)
}l.call(k)
};
var d=function(l){if(l.empty()){return
}l.attr("transform",function(m){return"translate("+m.component.position.x+", "+m.component.position.y+")"
})
};
var k=function(m){if(m.empty()){return
}var l=d3.set();
l.add(nf.Common.substringAfterLast(nf.Label.defaultColor(),"#"));
f.forEach(function(p,o){var n=o.component.style["background-color"];
if(nf.Common.isDefinedAndNotNull(n)){l.add(nf.Common.substringAfterLast(n,"#"))
}});
nf.Canvas.defineLabelColors(l.values());
m.select("rect.border").attr({stroke:function(o){var n=nf.Label.defaultColor();
if(nf.Common.isDefinedAndNotNull(o.component.style["background-color"])){n=o.component.style["background-color"]
}return n
},width:function(n){return n.dimensions.width
},height:function(n){return n.dimensions.height
}});
m.select("rect.body").attr({fill:function(o){var n=nf.Label.defaultColor();
if(nf.Common.isDefinedAndNotNull(o.component.style["background-color"])){n=o.component.style["background-color"]
}n=nf.Common.substringAfterLast(n,"#");
return"url(#label-background-"+n+")"
},width:function(n){return n.dimensions.width
},height:function(n){return n.dimensions.height
}});
m.each(function(r){var s=d3.select(this);
var p=s.select("text.label-value");
p.attr("font-size",function(){var t="12px";
if(nf.Common.isDefinedAndNotNull(r.component.style["font-size"])){t=r.component.style["font-size"]
}return t
});
p.selectAll("tspan").remove();
var o=[];
if(nf.Common.isDefinedAndNotNull(r.component.label)){o=r.component.label.split("\n")
}else{o.push("")
}$.each(o,function(u,t){p.append("tspan").attr("x","0.4em").attr("dy","1.2em").text(function(){return t
})
});
if(nf.Common.isDFM()){var n=[{x:r.dimensions.width,y:r.dimensions.height}];
var q=s.selectAll("rect.labelpoint").data(n);
q.enter().append("rect").attr({"class":"labelpoint",width:10,height:10}).call(h);
q.attr("transform",function(t){return"translate("+(t.x-10)+", "+(t.y-10)+")"
});
q.exit().remove()
}})
};
var e=function(l){l.remove()
};
return{config:{width:a.width,height:a.height},init:function(){f=d3.map();
j=d3.select("#canvas").append("g").attr({"pointer-events":"all","class":"labels"});
h=d3.behavior.drag().on("dragstart",function(){d3.event.sourceEvent.stopPropagation()
}).on("drag",function(){var l=d3.select(this.parentNode);
var m=l.datum();
m.dimensions.width=Math.max(b,d3.event.x);
m.dimensions.height=Math.max(g,d3.event.y);
k(l)
}).on("dragend",function(){var m=d3.select(this.parentNode);
var n=m.datum();
var o=false;
if(nf.Common.isDefinedAndNotNull(n.component.width)||n.dimensions.width!==n.component.width){o=true
}if(!o&&nf.Common.isDefinedAndNotNull(n.component.height)||n.dimensions.height!==n.component.height){o=true
}if(o){var l=nf.Client.getRevision();
$.ajax({type:"PUT",url:n.component.uri,data:{version:l.version,clientId:l.clientId,width:n.dimensions.width,height:n.dimensions.height},dataType:"json"}).done(function(p){nf.Client.setRevision(p.revision);
nf.Label.set(p.label)
}).fail(function(){var q=a.width;
if(nf.Common.isDefinedAndNotNull(n.component.width)){q=n.component.width
}var p=a.height;
if(nf.Common.isDefinedAndNotNull(n.component.height)){p=n.component.height
}n.dimensions={width:q,height:p};
m.call(k)
})
}d3.event.sourceEvent.stopPropagation()
})
},add:function(n,l){l=nf.Common.isDefinedAndNotNull(l)?l:false;
var m=function(p){var q=a.width;
if(nf.Common.isDefinedAndNotNull(p.width)){q=p.width
}var o=a.height;
if(nf.Common.isDefinedAndNotNull(p.height)){o=p.height
}f.set(p.id,{type:"Label",component:p,dimensions:{width:q,height:o}})
};
if($.isArray(n)){$.each(n,function(p,o){m(o)
})
}else{m(n)
}i().enter().call(c,l)
},get:function(l){if(nf.Common.isUndefined(l)){return f.values()
}else{return f.get(l)
}},refresh:function(l){if(nf.Common.isDefinedAndNotNull(l)){d3.select("#id-"+l).call(k)
}else{d3.selectAll("g.label").call(k)
}},reload:function(l){if(f.has(l.id)){return $.ajax({type:"GET",url:l.uri,dataType:"json"}).done(function(m){nf.Label.set(m.label)
})
}},position:function(l){d3.select("#id-"+l).call(d)
},set:function(m){var l=function(p){if(f.has(p.id)){var q=a.width;
if(nf.Common.isDefinedAndNotNull(p.width)){q=p.width
}var n=a.height;
if(nf.Common.isDefinedAndNotNull(p.height)){n=p.height
}var o=f.get(p.id);
o.component=p;
o.dimensions={width:q,height:n};
d3.select("#id-"+p.id).call(k)
}};
if($.isArray(m)){$.each(m,function(o,n){l(n)
})
}else{l(m)
}},remove:function(l){if($.isArray(l)){$.each(l,function(n,m){f.remove(m)
})
}else{f.remove(l)
}i().exit().call(e)
},removeAll:function(){nf.Label.remove(f.keys())
},defaultColor:function(){return"#ffde93"
}}
}());
nf.Port=(function(){var k=15;
var l=12;
var d={width:160,height:40};
var h={width:160,height:56};
var g;
var a;
var i=function(){return a.selectAll("g.input-port, g.output-port").data(g.values(),function(m){return m.component.id
})
};
var f=function(o,n){if(o.empty()){return
}var m=o.append("g").attr({id:function(q){return"id-"+q.component.id
},"class":function(q){if(q.component.type==="INPUT_PORT"){return"input-port component"
}else{return"output-port component"
}}}).classed("selected",n).call(nf.CanvasUtils.position);
m.append("rect").attr({"class":"border",width:function(q){return q.dimensions.width
},height:function(q){return q.dimensions.height
},fill:"transparent","stroke-opacity":0.8,"stroke-width":1,stroke:"#aaaaaa"});
var p=0;
if(nf.Canvas.getParentGroupId()===null){p=l;
m.append("rect").attr({"class":"remote-banner",width:function(q){return q.dimensions.width
},height:p,fill:"#294c58","fill-opacity":0.95})
}m.append("rect").attr({x:0,y:p,"class":"port-body",width:function(q){return q.dimensions.width
},height:function(q){return q.dimensions.height-p
},fill:"url(#port-background)","fill-opacity":0.8,"stroke-opacity":0.8,"stroke-width":0,stroke:"#aaaaaa"});
m.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":function(q){if(q.component.type==="INPUT_PORT"){return"images/iconInputPort.png"
}else{return"images/iconOutputPort.png"
}},width:46,height:31,x:function(q){if(q.component.type==="INPUT_PORT"){return 0
}else{return 114
}},y:5+p});
m.append("text").attr({x:function(q){if(q.component.type==="INPUT_PORT"){return 52
}else{return 5
}},y:18+p,width:95,height:30,"font-size":"10px","font-weight":"bold",fill:"#294c58","class":"port-name"});
m.call(nf.Selectable.activate).call(nf.ContextMenu.activate);
if(nf.Common.isDFM()){m.call(nf.Draggable.activate).call(nf.Connectable.activate)
}m.call(e)
};
var e=function(m){if(m.empty()){return
}m.each(function(){var n=d3.select(this);
var o=n.select("g.port-details");
if(n.classed("visible")){if(o.empty()){o=n.append("g").attr("class","port-details");
var p=0;
if(nf.Canvas.getParentGroupId()===null){p=l;
o.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"port-transmission-icon",width:10,height:10,x:3,y:1});
o.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"bulletin-icon","xlink:href":"images/iconBulletin.png",width:12,height:12,x:147,y:0})
}o.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"port-run-status-icon",width:16,height:16,x:function(q){if(q.component.type==="INPUT_PORT"){return 33
}else{return 107
}},y:function(){return 24+p
}});
o.append("rect").attr({"class":"active-thread-count-background",height:11,y:0,fill:"#fff","fill-opacity":"0.65",stroke:"#aaa","stroke-width":"1"});
o.append("text").attr({"class":"active-thread-count",height:11,y:9,fill:"#000"})
}o.select("image.port-run-status-icon").attr("xlink:href",function(r){var q="";
if(r.component.state==="DISABLED"){q="images/iconDisable.png"
}else{if(!nf.Common.isEmpty(r.component.validationErrors)){q="images/iconAlert.png"
}else{if(r.component.state==="RUNNING"){q="images/iconRun.png"
}else{if(r.component.state==="STOPPED"){q="images/iconStop.png"
}}}}return q
}).each(function(r){var q=d3.select("#run-status-tip-"+r.component.id);
if(!q.empty()){q.remove()
}if(!nf.Common.isEmpty(r.component.validationErrors)){q=d3.select("#port-tooltips").append("div").attr("id",function(){return"run-status-tip-"+r.component.id
}).attr("class","tooltip nifi-tooltip").html(function(){var s=nf.Common.formatUnorderedList(r.component.validationErrors);
if(s===null||s.length===0){return""
}else{return $("<div></div>").append(s).html()
}});
nf.CanvasUtils.canvasTooltip(q,d3.select(this))
}});
n.select("text.port-name").each(function(t){var s=d3.select(this);
var q=t.component.name;
var r=q.split(/\s+/);
s.text(null).selectAll("tspan, title").remove();
if(r.length===1){nf.CanvasUtils.ellipsis(s,q)
}else{nf.CanvasUtils.multilineEllipsis(s,2,q)
}}).append("title").text(function(q){return q.component.name
});
n.call(b)
}else{n.select("text.port-name").text(function(r){var q=r.component.name;
if(q.length>k){return q.substring(0,k)+String.fromCharCode(8230)
}else{return q
}});
n.call(j);
if(!o.empty()){o.remove()
}}})
};
var b=function(m){if(m.empty()){return
}m.select("image.port-transmission-icon").attr("xlink:href",function(n){if(n.status.transmitting===true){return"images/iconPortTransmitting.png"
}else{return"images/iconPortNotTransmitting.png"
}});
m.each(function(p){var n=d3.select(this);
var o=0;
nf.CanvasUtils.activeThreadCount(n,p,function(q){o=q
});
nf.CanvasUtils.bulletins(n,p,function(){return d3.select("#port-tooltips")
},o)
})
};
var c=function(m){if(m.empty()){return
}m.call(j).remove()
};
var j=function(m){m.each(function(n){$("#run-status-tip-"+n.component.id).remove();
$("#bulletin-tip-"+n.component.id).remove()
})
};
return{init:function(){g=d3.map();
a=d3.select("#canvas").append("g").attr({"pointer-events":"all","class":"ports"})
},add:function(p,n){n=nf.Common.isDefinedAndNotNull(n)?n:false;
var m=d;
if(nf.Canvas.getParentGroupId()===null){m=h
}var o=function(q){g.set(q.id,{type:"Port",component:q,dimensions:m,status:{activeThreadCount:0}})
};
if($.isArray(p)){$.each(p,function(r,q){o(q)
})
}else{o(p)
}i().enter().call(f,n)
},get:function(m){if(nf.Common.isUndefined(m)){return g.values()
}else{return g.get(m)
}},refresh:function(m){if(nf.Common.isDefinedAndNotNull(m)){d3.select("#id-"+m).call(e)
}else{d3.selectAll("g.input-port, g.output-port").call(e)
}},pan:function(){d3.selectAll("g.input-port.entering, g.output-port.entering, g.input-port.leaving, g.output-port.leaving").call(e)
},reload:function(m){if(g.has(m.id)){return $.ajax({type:"GET",url:m.uri,dataType:"json"}).done(function(n){if(nf.Common.isDefinedAndNotNull(n.inputPort)){nf.Port.set(n.inputPort)
}else{nf.Port.set(n.outputPort)
}})
}},position:function(m){d3.select("#id-"+m).call(nf.CanvasUtils.position)
},set:function(n){var m=function(o){if(g.has(o.id)){var p=g.get(o.id);
p.component=o;
d3.select("#id-"+o.id).call(e)
}};
if($.isArray(n)){$.each(n,function(p,o){m(o)
})
}else{m(n)
}},setStatus:function(m){if(nf.Common.isEmpty(m)){return
}$.each(m,function(p,n){if(g.has(n.id)){var o=g.get(n.id);
o.status=n
}});
d3.selectAll("g.input-port.visible, g.output-port.visible").call(b)
},remove:function(m){if($.isArray(m)){$.each(m,function(o,n){g.remove(n)
})
}else{g.remove(m)
}i().exit().call(c)
},removeAll:function(){nf.Port.remove(g.keys())
}}
}());
nf.ProcessGroup=(function(){var l=30;
var a={width:365,height:142};
var g;
var f;
var i=function(m){if(nf.Common.isBlank(m.component.comments)){return"No comments specified"
}else{return m.component.comments
}};
var j=function(){return f.selectAll("g.process-group").data(g.values(),function(m){return m.component.id
})
};
var h=function(o,m){if(o.empty()){return
}var n=o.append("g").attr({id:function(p){return"id-"+p.component.id
},"class":"process-group component"}).classed("selected",m).call(nf.CanvasUtils.position);
n.append("rect").attr({rx:6,ry:6,"class":"border",width:function(p){return p.dimensions.width
},height:function(p){return p.dimensions.height
},fill:"transparent","stroke-opacity":0.8,"stroke-width":2,stroke:"#294c58"});
n.append("rect").attr({rx:6,ry:6,"class":"body",width:function(p){return p.dimensions.width
},height:function(p){return p.dimensions.height
},fill:"#294c58","fill-opacity":0.8,"stroke-width":0});
n.append("text").attr({x:10,y:15,width:316,height:16,"font-size":"10pt","font-weight":"bold",fill:"#ffffff","class":"process-group-name"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/bgProcessGroupDetailsArea.png",width:352,height:113,x:6,y:22,"class":"process-group-preview"});
n.on("dblclick",function(p){nf.CanvasUtils.enterGroup(p.component.id)
}).call(nf.Selectable.activate).call(nf.ContextMenu.activate);
if(nf.Common.isDFM()){n.on("mouseover.drop",function(t){var r=d3.select(this);
if(!r.classed("drop")){var s=r.datum();
var q=d3.select("rect.drag-selection");
if(!q.empty()){var p=nf.CanvasUtils.getSelection().filter(function(u){return s.component.id===u.component.id
});
if(p.empty()){r.classed("drop",function(){return nf.CanvasUtils.isDisconnected(nf.CanvasUtils.getSelection())
})
}}}}).on("mouseout.drop",function(p){d3.select(this).classed("drop",false)
}).call(nf.Draggable.activate).call(nf.Connectable.activate)
}n.call(c)
};
var e=5;
var c=function(m){if(m.empty()){return
}m.each(function(){var C=d3.select(this);
var z=C.select("g.process-group-details");
if(C.classed("visible")){if(z.empty()){z=C.append("g").attr("class","process-group-details");
z.append("rect").attr({x:6,y:22,width:352,height:113,"stroke-width":1,stroke:"#6f97ac",fill:"#ffffff"});
z.append("rect").attr({x:6,y:22,width:352,height:22,"stroke-width":1,stroke:"#6f97ac",fill:"url(#process-group-stats-background)","class":"process-group-contents-container"});
z.append("rect").attr({x:6,y:104,width:352,height:33,"stroke-width":1,stroke:"#6f97ac",fill:"url(#process-group-stats-background)"});
z.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconInputPortSmall.png",width:16,height:16,x:10,y:25});
z.append("text").attr({x:29,y:37,"class":"process-group-input-port-count process-group-contents-count"});
z.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconOutputPortSmall.png",width:16,height:16,y:25,"class":"process-group-output-port"});
z.append("text").attr({y:37,"class":"process-group-output-port-count process-group-contents-count"});
z.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconTransmissionActive.png",width:16,height:16,y:25,"class":"process-group-transmitting"});
z.append("text").attr({y:37,"class":"process-group-transmitting-count process-group-contents-count"});
z.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconTransmissionInactive.png",width:16,height:16,y:25,"class":"process-group-not-transmitting"});
z.append("text").attr({y:37,"class":"process-group-not-transmitting-count process-group-contents-count"});
z.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconRun.png",width:16,height:16,y:25,"class":"process-group-running"});
z.append("text").attr({y:37,"class":"process-group-running-count process-group-contents-count"});
z.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconStop.png",width:16,height:16,y:25,"class":"process-group-stopped"});
z.append("text").attr({y:37,"class":"process-group-stopped-count process-group-contents-count"});
z.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconAlert.png",width:16,height:16,y:25,"class":"process-group-invalid"});
z.append("text").attr({y:37,"class":"process-group-invalid-count process-group-contents-count"});
z.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconDisable.png",width:16,height:16,y:25,"class":"process-group-disabled"});
z.append("text").attr({y:37,"class":"process-group-disabled-count process-group-contents-count"});
var y=z.append("g").attr({transform:"translate(6, 54)"});
y.append("text").attr({width:73,height:10,x:4,y:4,"class":"process-group-stats-label"}).text("Queued");
y.append("text").attr({width:73,height:10,x:4,y:17,"class":"process-group-stats-label"}).text("In");
y.append("text").attr({width:73,height:10,x:4,y:30,"class":"process-group-stats-label"}).text("Read/Write");
y.append("text").attr({width:73,height:10,x:4,y:43,"class":"process-group-stats-label"}).text("Out");
var o=z.append("g").attr({transform:"translate(95, 54)"});
o.append("text").attr({width:180,height:10,x:4,y:4,"class":"process-group-queued process-group-stats-value"});
o.append("text").attr({width:180,height:10,x:4,y:17,"class":"process-group-in process-group-stats-value"});
o.append("text").attr({width:180,height:10,x:4,y:30,"class":"process-group-read-write process-group-stats-value"});
o.append("text").attr({width:180,height:10,x:4,y:43,"class":"process-group-out process-group-stats-value"});
var u=z.append("g").attr({transform:"translate(314, 54)"});
u.append("text").attr({width:25,height:10,x:4,y:17,"class":"process-group-stats-info"}).text("(5 min)");
u.append("text").attr({width:25,height:10,x:4,y:30,"class":"process-group-stats-info"}).text("(5 min)");
u.append("text").attr({width:25,height:10,x:4,y:43,"class":"process-group-stats-info"}).text("(5 min)");
z.append("text").attr({x:10,y:118,width:342,height:22,"class":"process-group-comments"});
z.append("rect").attr({"class":"active-thread-count-background",height:13,y:2,fill:"#fff","fill-opacity":"0.65",stroke:"#aaa","stroke-width":"1"});
z.append("text").attr({"class":"active-thread-count",height:13,y:12,fill:"#000"});
z.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"bulletin-icon","xlink:href":"images/iconBulletin.png",width:12,height:12,y:2})
}var q=z.select("text.process-group-input-port-count").text(function(G){return G.component.inputPortCount
});
var v=z.select("image.process-group-output-port").attr("x",function(){var G=parseInt(q.attr("x"),10);
return G+q.node().getComputedTextLength()+e
});
z.select("text.process-group-output-port-count").attr("x",function(){var H=parseInt(v.attr("x"),10);
var G=parseInt(v.attr("width"),10);
return H+G+e
}).text(function(G){return G.component.outputPortCount
});
var x=z.select("rect.process-group-contents-container");
var A=z.select("text.process-group-disabled-count").text(function(G){return G.component.disabledCount
}).attr("x",function(){var G=parseInt(x.attr("x"),10);
var H=parseInt(x.attr("width"),10);
return G+H-this.getComputedTextLength()-e
});
var s=z.select("image.process-group-disabled").attr("x",function(){var H=parseInt(A.attr("x"),10);
var G=parseInt(d3.select(this).attr("width"),10);
return H-G-e
});
var w=z.select("text.process-group-invalid-count").text(function(G){return G.component.invalidCount
}).attr("x",function(){var G=parseInt(s.attr("x"),10);
return G-this.getComputedTextLength()-e
});
var B=z.select("image.process-group-invalid").attr("x",function(){var G=parseInt(w.attr("x"),10);
var H=parseInt(d3.select(this).attr("width"),10);
return G-H-e
});
var E=z.select("text.process-group-stopped-count").text(function(G){return G.component.stoppedCount
}).attr("x",function(){var G=parseInt(B.attr("x"),10);
return G-this.getComputedTextLength()-e
});
var r=z.select("image.process-group-stopped").attr("x",function(){var H=parseInt(E.attr("x"),10);
var G=parseInt(d3.select(this).attr("width"),10);
return H-G-e
});
var t=z.select("text.process-group-running-count").text(function(G){return G.component.runningCount
}).attr("x",function(){var G=parseInt(r.attr("x"),10);
return G-this.getComputedTextLength()-e
});
var p=z.select("image.process-group-running").attr("x",function(){var H=parseInt(t.attr("x"),10);
var G=parseInt(d3.select(this).attr("width"),10);
return H-G-e
});
var D=z.select("text.process-group-not-transmitting-count").text(function(G){return G.component.inactiveRemotePortCount
}).attr("x",function(){var G=parseInt(p.attr("x"),10);
return G-this.getComputedTextLength()-e
});
var n=z.select("image.process-group-not-transmitting").attr("x",function(){var H=parseInt(D.attr("x"),10);
var G=parseInt(d3.select(this).attr("width"),10);
return H-G-e
});
var F=z.select("text.process-group-transmitting-count").text(function(G){return G.component.activeRemotePortCount
}).attr("x",function(){var G=parseInt(n.attr("x"),10);
return G-this.getComputedTextLength()-e
});
z.select("image.process-group-transmitting").attr("x",function(){var H=parseInt(F.attr("x"),10);
var G=parseInt(d3.select(this).attr("width"),10);
return H-G-e
});
z.select("text.process-group-comments").each(function(H){var G=d3.select(this);
G.text(null).selectAll("tspan, title").remove();
nf.CanvasUtils.multilineEllipsis(G,2,i(H))
}).classed("unset",function(G){return nf.Common.isBlank(G.component.comments)
}).append("title").text(function(G){return i(G)
});
C.select("text.process-group-name").each(function(H){var G=d3.select(this);
G.text(null).selectAll("title").remove();
nf.CanvasUtils.ellipsis(G,H.component.name)
}).append("title").text(function(G){return G.component.name
});
C.select("image.process-group-preview").style("display","none");
C.call(d)
}else{C.select("text.process-group-name").text(function(H){var G=H.component.name;
if(G.length>l){return G.substring(0,l)+String.fromCharCode(8230)
}else{return G
}});
C.select("image.process-group-preview").style("display","block");
C.call(k);
if(!z.empty()){z.remove()
}}})
};
var d=function(m){if(m.empty()){return
}m.select("text.process-group-queued").text(function(n){if(nf.Common.isDefinedAndNotNull(n.status)){return n.status.queued
}else{return"- / -"
}});
m.select("text.process-group-in").text(function(n){if(nf.Common.isDefinedAndNotNull(n.status)){return n.status.input
}else{return"- / -"
}});
m.select("text.process-group-read-write").text(function(n){if(nf.Common.isDefinedAndNotNull(n.status)){return n.status.read+" / "+n.status.written
}else{return"- / -"
}});
m.select("text.process-group-out").text(function(n){if(nf.Common.isDefinedAndNotNull(n.status)){return n.status.output
}else{return"- / -"
}});
m.each(function(p){var n=d3.select(this);
var o=0;
nf.CanvasUtils.activeThreadCount(n,p,function(q){o=q
});
nf.CanvasUtils.bulletins(n,p,function(){return d3.select("#process-group-tooltips")
},o)
})
};
var b=function(m){if(m.empty()){return
}m.call(k).remove()
};
var k=function(m){m.each(function(n){$("#bulletin-tip-"+n.component.id).remove()
})
};
return{init:function(){g=d3.map();
f=d3.select("#canvas").append("g").attr({"pointer-events":"all","class":"process-groups"})
},add:function(m,n){n=nf.Common.isDefinedAndNotNull(n)?n:false;
var o=function(p){g.set(p.id,{type:"ProcessGroup",component:p,dimensions:a})
};
if($.isArray(m)){$.each(m,function(p,q){o(q)
})
}else{o(m)
}j().enter().call(h,n)
},get:function(m){if(nf.Common.isUndefined(m)){return g.values()
}else{return g.get(m)
}},refresh:function(m){if(nf.Common.isDefinedAndNotNull(m)){d3.select("#id-"+m).call(c)
}else{d3.selectAll("g.process-group").call(c)
}},pan:function(){d3.selectAll("g.process-group.entering, g.process-group.leaving").call(c)
},reload:function(m){if(g.has(m.id)){return $.ajax({type:"GET",url:m.uri,dataType:"json"}).done(function(n){nf.ProcessGroup.set(n.processGroup)
})
}},position:function(m){d3.select("#id-"+m).call(nf.CanvasUtils.position)
},set:function(m){var n=function(o){if(g.has(o.id)){var p=g.get(o.id);
p.component=o;
d3.select("#id-"+o.id).call(c)
}};
if($.isArray(m)){$.each(m,function(o,p){n(p)
})
}else{n(m)
}},setStatus:function(m){if(nf.Common.isEmpty(m)){return
}$.each(m,function(o,n){if(g.has(n.id)){var p=g.get(n.id);
p.status=n
}});
d3.selectAll("g.process-group.visible").call(d)
},remove:function(m){if($.isArray(m)){$.each(m,function(n,o){g.remove(o)
})
}else{g.remove(m)
}j().exit().call(b)
},removeAll:function(){nf.ProcessGroup.remove(g.keys())
}}
}());
nf.RemoteProcessGroup=(function(){var l=30;
var a={width:365,height:140};
var j;
var b;
var g=function(m){if(nf.Common.isBlank(m.component.comments)){return"No comments specified"
}else{return m.component.comments
}};
var h=function(){return b.selectAll("g.remote-process-group").data(j.values(),function(m){return m.component.id
})
};
var k=function(o,m){if(o.empty()){return
}var n=o.append("g").attr({id:function(p){return"id-"+p.component.id
},"class":"remote-process-group component"}).classed("selected",m).call(nf.CanvasUtils.position);
n.append("rect").attr({rx:6,ry:6,"class":"border",width:function(p){return p.dimensions.width
},height:function(p){return p.dimensions.height
},fill:"transparent","stroke-opacity":0.8,"stroke-width":2,stroke:"#294c58"});
n.append("rect").attr({rx:6,ry:6,"class":"body",width:function(p){return p.dimensions.width
},height:function(p){return p.dimensions.height
},fill:"#294c58","fill-opacity":0.8,"stroke-width":0});
n.append("text").attr({x:25,y:17,width:305,height:16,"font-size":"10pt","font-weight":"bold",fill:"#ffffff","class":"remote-process-group-name"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/bgRemoteProcessGroupDetailsArea.png",width:352,height:89,x:6,y:38,"class":"remote-process-group-preview"});
n.call(nf.Selectable.activate).call(nf.ContextMenu.activate);
if(nf.Common.isDFM()){n.call(nf.Draggable.activate).call(nf.Connectable.activate)
}n.call(f)
};
var d=5;
var f=function(m){if(m.empty()){return
}m.each(function(){var t=d3.select(this);
var n=t.select("g.remote-process-group-details");
if(t.classed("visible")){if(n.empty()){n=t.append("g").attr("class","remote-process-group-details");
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"remote-process-group-transmission-status",width:16,height:16,x:5,y:5});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"remote-process-group-transmission-secure",width:14,height:12,x:7,y:23});
n.append("text").attr({x:25,y:32,width:305,height:12,"font-size":"8pt",fill:"#91b9ce","class":"remote-process-group-uri"}).each(function(B){var A=d3.select(this);
A.text(null).selectAll("title").remove();
nf.CanvasUtils.ellipsis(A,B.component.targetUri)
}).append("title").text(function(A){return A.component.name
});
n.append("rect").attr({x:6,y:38,width:352,height:89,"stroke-width":1,stroke:"#6f97ac",fill:"#ffffff"});
n.append("rect").attr({x:6,y:38,width:176,height:22,"stroke-width":1,stroke:"#6f97ac",fill:"url(#process-group-stats-background)","class":"remote-process-group-input-container"});
n.append("rect").attr({x:182,y:38,width:176,height:22,"stroke-width":1,stroke:"#6f97ac",fill:"url(#process-group-stats-background)","class":"remote-process-group-output-container"});
n.append("rect").attr({x:6,y:94,width:352,height:33,"stroke-width":1,stroke:"#6f97ac",fill:"url(#process-group-stats-background)"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconInputPortSmall.png",width:16,height:16,x:10,y:41});
n.append("text").attr({x:30,y:53,"class":"remote-process-group-input-port-count process-group-contents-count"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconTransmissionActive.png",width:16,height:16,y:41,"class":"remote-process-group-input-transmitting"});
n.append("text").attr({y:53,"class":"remote-process-group-input-transmitting-count process-group-contents-count"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconTransmissionInactive.png",width:16,height:16,y:41,"class":"remote-process-group-input-not-transmitting"});
n.append("text").attr({y:53,"class":"remote-process-group-input-not-transmitting-count process-group-contents-count"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconOutputPortSmall.png",width:16,height:16,x:186,y:41,"class":"remote-process-group-output-port"});
n.append("text").attr({x:206,y:53,"class":"remote-process-group-output-port-count process-group-contents-count"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconTransmissionActive.png",width:16,height:16,y:41,"class":"remote-process-group-output-transmitting"});
n.append("text").attr({y:53,"class":"remote-process-group-output-transmitting-count process-group-contents-count"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconTransmissionInactive.png",width:16,height:16,y:41,"class":"remote-process-group-output-not-transmitting"});
n.append("text").attr({y:53,"class":"remote-process-group-output-not-transmitting-count process-group-contents-count"});
var o=n.append("g").attr({transform:"translate(6, 70)"});
o.append("text").attr({width:73,height:10,x:4,y:4,"class":"process-group-stats-label"}).text("Sent");
o.append("text").attr({width:73,height:10,x:4,y:17,"class":"process-group-stats-label"}).text("Received");
var p=n.append("g").attr({transform:"translate(95, 70)"});
p.append("text").attr({width:180,height:10,x:4,y:4,"class":"remote-process-group-sent process-group-stats-value"});
p.append("text").attr({width:180,height:10,x:4,y:17,"class":"remote-process-group-received process-group-stats-value"});
var z=n.append("g").attr({transform:"translate(315, 70)"});
z.append("text").attr({width:25,height:10,x:4,y:4,"class":"process-group-stats-info"}).text("(5 min)");
z.append("text").attr({width:25,height:10,x:4,y:17,"class":"process-group-stats-info"}).text("(5 min)");
n.append("text").attr({x:10,y:108,width:342,height:22,"class":"remote-process-group-comments"});
n.append("text").attr({x:358,y:137,"class":"remote-process-group-last-refresh"});
n.append("rect").attr({"class":"active-thread-count-background",height:13,y:0,fill:"#fff","fill-opacity":"0.65",stroke:"#aaa","stroke-width":"1"});
n.append("text").attr({"class":"active-thread-count",height:13,y:10,fill:"#000"});
n.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"bulletin-icon","xlink:href":"images/iconBulletin.png",width:12,height:12,y:2})
}n.select("image.remote-process-group-transmission-status").attr("xlink:href",function(B){var A="";
if(nf.Common.isDefinedAndNotNull(B.status)&&!nf.Common.isEmpty(B.status.authorizationIssues)){A="images/iconAlert.png"
}else{if(B.component.transmitting===true){A="images/iconTransmissionActive.png"
}else{A="images/iconTransmissionInactive.png"
}}return A
}).each(function(B){var A=d3.select("#authorization-issues-"+B.component.id);
if(!A.empty()){A.remove()
}if(nf.Common.isDefinedAndNotNull(B.status)&&!nf.Common.isEmpty(B.status.authorizationIssues)){A=d3.select("#remote-process-group-tooltips").append("div").attr("id",function(){return"authorization-issues-"+B.component.id
}).attr("class","tooltip nifi-tooltip").html(function(){var C=nf.Common.formatUnorderedList(B.status.authorizationIssues);
if(C===null||C.length===0){return""
}else{return $("<div></div>").append(C).html()
}});
nf.CanvasUtils.canvasTooltip(A,d3.select(this))
}});
n.select("image.remote-process-group-transmission-secure").attr("xlink:href",function(B){var A="";
if(B.component.targetSecure===true){A="images/iconSecure.png"
}else{A="images/iconNotSecure.png"
}return A
}).each(function(B){var A=d3.select("#transmission-secure-"+B.component.id);
if(!A.empty()){A.remove()
}A=d3.select("#remote-process-group-tooltips").append("div").attr("id",function(){return"transmission-secure-"+B.component.id
}).attr("class","tooltip nifi-tooltip").text(function(){if(B.component.targetSecure===true){return"Site-to-Site is secure."
}else{return"Site-to-Site is NOT secure."
}});
nf.CanvasUtils.canvasTooltip(A,d3.select(this))
});
n.select("text.remote-process-group-input-port-count").text(function(A){return A.component.inputPortCount
});
var y=n.select("rect.remote-process-group-input-container");
var w=n.select("text.remote-process-group-input-not-transmitting-count").text(function(A){return A.component.inactiveRemoteInputPortCount
}).attr("x",function(){var A=parseInt(y.attr("x"),10);
var B=parseInt(y.attr("width"),10);
return A+B-this.getComputedTextLength()-d
});
var s=n.select("image.remote-process-group-input-not-transmitting").attr("x",function(){var B=parseInt(w.attr("x"),10);
var A=parseInt(d3.select(this).attr("width"),10);
return B-A-d
});
var u=n.select("text.remote-process-group-input-transmitting-count").text(function(A){return A.component.activeRemoteInputPortCount
}).attr("x",function(){var A=parseInt(s.attr("x"),10);
return A-this.getComputedTextLength()-d
});
n.select("image.remote-process-group-input-transmitting").attr("x",function(){var B=parseInt(u.attr("x"),10);
var A=parseInt(d3.select(this).attr("width"),10);
return B-A-d
});
n.select("text.remote-process-group-output-port-count").text(function(A){return A.component.outputPortCount
});
var v=n.select("rect.remote-process-group-output-container");
var q=n.select("text.remote-process-group-output-not-transmitting-count").text(function(A){return A.component.inactiveRemoteOutputPortCount
}).attr("x",function(){var A=parseInt(v.attr("x"),10);
var B=parseInt(v.attr("width"),10);
return A+B-this.getComputedTextLength()-d
});
var x=n.select("image.remote-process-group-output-not-transmitting").attr("x",function(){var A=parseInt(q.attr("x"),10);
var B=parseInt(d3.select(this).attr("width"),10);
return A-B-d
});
var r=n.select("text.remote-process-group-output-transmitting-count").text(function(A){return A.component.activeRemoteOutputPortCount
}).attr("x",function(){var A=parseInt(x.attr("x"),10);
return A-this.getComputedTextLength()-d
});
n.select("image.remote-process-group-output-transmitting").attr("x",function(){var B=parseInt(r.attr("x"),10);
var A=parseInt(d3.select(this).attr("width"),10);
return B-A-d
});
n.select("text.remote-process-group-comments").each(function(B){var A=d3.select(this);
A.text(null).selectAll("tspan, title").remove();
nf.CanvasUtils.multilineEllipsis(A,2,g(B))
}).classed("unset",function(A){return nf.Common.isBlank(A.component.comments)
}).append("title").text(function(A){return g(A)
});
n.select("text.remote-process-group-last-refresh").text(function(A){if(nf.Common.isDefinedAndNotNull(A.component.flowRefreshed)){return A.component.flowRefreshed
}else{return"Remote flow not current"
}});
t.select("text.remote-process-group-name").each(function(B){var A=d3.select(this);
A.text(null).selectAll("title").remove();
nf.CanvasUtils.ellipsis(A,B.component.name)
}).append("title").text(function(A){return A.component.name
});
t.select("image.remote-process-group-preview").style("display","none");
t.call(c)
}else{t.select("text.remote-process-group-name").text(function(B){var A=B.component.name;
if(A.length>l){return A.substring(0,l)+String.fromCharCode(8230)
}else{return A
}});
t.select("image.remote-process-group-preview").style("display","block");
t.call(i);
if(!n.empty()){n.remove()
}}})
};
var c=function(m){if(m.empty()){return
}m.select("text.remote-process-group-sent").text(function(n){if(nf.Common.isDefinedAndNotNull(n.status)){return n.status.sent
}else{return"- / -"
}});
m.select("text.remote-process-group-received").text(function(n){if(nf.Common.isDefinedAndNotNull(n.status)){return n.status.received
}else{return"- / -"
}});
m.each(function(p){var n=d3.select(this);
var o=0;
nf.CanvasUtils.activeThreadCount(n,p,function(q){o=q
});
nf.CanvasUtils.bulletins(n,p,function(){return d3.select("#remote-process-group-tooltips")
},o)
})
};
var e=function(m){if(m.empty()){return
}m.call(i).remove()
};
var i=function(m){m.each(function(n){$("#bulletin-tip-"+n.component.id).remove();
$("#authorization-issues-"+n.component.id).remove();
$("#transmission-secure-"+n.component.id).remove()
})
};
return{init:function(){j=d3.map();
b=d3.select("#canvas").append("g").attr({"pointer-events":"all","class":"remote-process-groups"})
},add:function(m,n){n=nf.Common.isDefinedAndNotNull(n)?n:false;
var o=function(p){j.set(p.id,{type:"RemoteProcessGroup",component:p,dimensions:a})
};
if($.isArray(m)){$.each(m,function(p,q){o(q)
})
}else{o(m)
}h().enter().call(k,n)
},get:function(m){if(nf.Common.isUndefined(m)){return j.values()
}else{return j.get(m)
}},refresh:function(m){if(nf.Common.isDefinedAndNotNull(m)){d3.select("#id-"+m).call(f)
}else{d3.selectAll("g.remote-process-group").call(f)
}},pan:function(){d3.selectAll("g.remote-process-group.entering, g.remote-process-group.leaving").call(f)
},reload:function(m){if(j.has(m.id)){return $.ajax({type:"GET",url:m.uri,dataType:"json"}).done(function(n){nf.RemoteProcessGroup.set(n.remoteProcessGroup);
var o=nf.Connection.getComponentConnections(m.id);
$.each(o,function(q,p){nf.Connection.reload(p)
})
})
}},position:function(m){d3.select("#id-"+m).call(nf.CanvasUtils.position)
},set:function(m){var n=function(o){if(j.has(o.id)){var p=j.get(o.id);
p.component=o;
d3.select("#id-"+o.id).call(f)
}};
if($.isArray(m)){$.each(m,function(o,p){n(p)
})
}else{n(m)
}},setStatus:function(m){if(nf.Common.isEmpty(m)){return
}$.each(m,function(o,n){if(j.has(n.id)){var p=j.get(n.id);
p.status=n
}});
d3.selectAll("g.remote-process-group.visible").call(c)
},remove:function(m){if($.isArray(m)){$.each(m,function(n,o){j.remove(o)
})
}else{j.remove(m)
}h().exit().call(e)
},removeAll:function(){nf.RemoteProcessGroup.remove(j.keys())
}}
}());
nf.Funnel=(function(){var e={width:61,height:61};
var c;
var f;
var b=function(){return f.selectAll("g.funnel").data(c.values(),function(h){return h.component.id
})
};
var a=function(j,i){if(j.empty()){return j
}var h=j.append("g").attr({id:function(k){return"id-"+k.component.id
},"class":"funnel component"}).classed("selected",i).call(nf.CanvasUtils.position);
h.append("rect").attr({"class":"border",width:function(k){return k.dimensions.width
},height:function(k){return k.dimensions.height
},fill:"transparent","stroke-opacity":0.8,"stroke-width":1});
h.append("image").call(nf.CanvasUtils.disableImageHref).attr({"xlink:href":"images/iconFunnel.png",width:41,height:41,x:10,y:10});
h.call(nf.Selectable.activate).call(nf.ContextMenu.activate);
if(nf.Common.isDFM()){h.call(nf.Draggable.activate).call(nf.Connectable.activate)
}return h
};
var d=function(h){};
var g=function(h){h.remove()
};
return{init:function(){c=d3.map();
f=d3.select("#canvas").append("g").attr({"pointer-events":"all","class":"funnels"})
},add:function(h,i){i=nf.Common.isDefinedAndNotNull(i)?i:false;
var j=function(k){c.set(k.id,{type:"Funnel",component:k,dimensions:e})
};
if($.isArray(h)){$.each(h,function(l,k){j(k)
})
}else{j(h)
}b().enter().call(a,i)
},get:function(h){if(nf.Common.isUndefined(h)){return c.values()
}else{return c.get(h)
}},refresh:function(h){if(nf.Common.isDefinedAndNotNull(h)){d3.select("#id-"+h).call(d)
}else{d3.selectAll("g.funnel").call(d)
}},reload:function(h){if(c.has(h.id)){return $.ajax({type:"GET",url:h.uri,dataType:"json"}).done(function(i){nf.Funnel.set(i.funnel)
})
}},position:function(h){d3.select("#id-"+h).call(nf.CanvasUtils.position)
},set:function(h){var i=function(j){if(c.has(j.id)){var k=c.get(j.id);
k.component=j;
d3.select("#id-"+j.id).call(d)
}};
if($.isArray(h)){$.each(h,function(k,j){i(j)
})
}else{i(h)
}},remove:function(h){if($.isArray(h)){$.each(h,function(j,i){c.remove(i)
})
}else{c.remove(h)
}b().exit().call(g)
},removeAll:function(){nf.Funnel.remove(c.keys())
}}
}());
nf.Connection=(function(){var e={width:188};
var j=function(A){var C=A.datum();
var z,D;
if(C.bends.length>0){var B=Math.min(Math.max(0,C.labelIndex),C.bends.length-1);
z=C.bends[B].x;
D=C.bends[B].y
}else{z=(C.start.x+C.end.x)/2;
D=(C.start.y+C.end.y)/2
}z-=(e.width/2);
D-=(A.attr("height")/2);
return{x:z,y:D}
};
var r;
var b;
var w;
var x;
var n;
var d;
var m=function(z,y){return Math.pow(z.x-y.x,2)+Math.pow(z.y-y.y,2)
};
var i=function(z,y){return Math.sqrt(m(z,y))
};
var c=function(C,B,z){var y=m(B,z);
if(y===0){return Math.sqrt(m(C,B))
}var A=((C.x-B.x)*(z.x-B.x)+(C.y-B.y)*(z.y-B.y))/y;
if(A<0){return Math.sqrt(m(C,B))
}if(A>1){return Math.sqrt(m(C,z))
}return Math.sqrt(m(C,{x:B.x+A*(z.x-B.x),y:B.y+A*(z.y-B.y)}))
};
var u=function(C,E){if(E.bends.length===0){return 0
}var A;
var z;
var y=[E.start].concat(E.bends,[E.end]);
for(var B=0;
B<y.length;
B++){if(B+1<y.length){var D=c(C,y[B],y[B+1]);
if(nf.Common.isUndefined(A)||D<A){A=D;
z=B
}}}return z
};
var o=function(y){return y.indexOf("INPUT_PORT")>=0
};
var a=function(y){return y.indexOf("OUTPUT_PORT")>=0
};
var l=function(y){return y.groupId!==nf.Canvas.getGroupId()&&(o(y.type)||a(y.type))
};
var g=function(y){if(nf.Common.isDefinedAndNotNull(y.flowFileExpiration)){var z=y.flowFileExpiration.match(/^(\d+).*/);
if(z!==null&&z.length>0){if(parseInt(z[0],10)>0){return true
}}}return false
};
var t=function(y){y.sort(function(A,z){return A.component.zIndex===z.component.zIndex?0:A.component.zIndex>z.component.zIndex?1:-1
})
};
var p=function(){return b.selectAll("g.connection").data(r.values(),function(y){return y.component.id
})
};
var v=function(B,A){if(B.empty()){return
}var z=B.append("g").attr({id:function(C){return"id-"+C.component.id
},"class":"connection"}).classed("selected",A);
z.append("path").attr({"class":"connection-path","pointer-events":"none"});
z.append("path").attr({"class":"connection-selection-path","pointer-events":"none"});
var y=z.append("path").attr({"class":"connection-path-selectable","pointer-events":"stroke"}).on("mousedown.selection",function(){nf.Selectable.select(d3.select(this.parentNode))
}).call(nf.ContextMenu.activate);
if(nf.Common.isDFM()){y.on("dblclick",function(H){var C=d3.mouse(this.parentNode);
var F=u({x:C[0],y:C[1]},H);
var E=H.component.bends.slice();
E.splice(F,0,{x:C[0],y:C[1]});
var D={id:H.component.id,bends:E};
var G=H.component.labelIndex;
if(E.length===1){D.labelIndex=0
}else{if(F<=G){D.labelIndex=G+1
}}s(H,D);
d3.event.stopPropagation()
})
}z.call(q,true,false)
};
var h=function(z){var y=false;
if(nf.Common.isDefinedAndNotNull(z.component.selectedRelationships)&&nf.Common.isDefinedAndNotNull(z.component.availableRelationships)){$.each(z.component.selectedRelationships,function(A,B){if($.inArray(B,z.component.availableRelationships)===-1){y=true;
return false
}})
}return y
};
var q=function(y,z,A){if(y.empty()){return
}if(z===true){y.classed("grouped",function(C){var B=false;
if(nf.Common.isDefinedAndNotNull(C.component.selectedRelationships)&&C.component.selectedRelationships.length>1){B=true
}return B
}).classed("ghost",function(C){var B=false;
if(h(C)){B=true
}return B
})
}y.each(function(V){var O=d3.select(this);
if(z===true){var U=nf.CanvasUtils.getConnectionSourceComponentId(V.component);
var F=d3.select("#id-"+U).datum();
var G;
var L;
if(V.bends.length>0){L=V.bends[V.bends.length-1]
}else{L={x:F.component.position.x+(F.dimensions.width/2),y:F.component.position.y+(F.dimensions.height/2)}
}if(nf.Common.isDefinedAndNotNull(V.end)&&V.end.dragging===true){G=V.end;
var W=d3.select("g.hover.connectable-destination");
if(!W.empty()){var S=W.datum();
var B=nf.CanvasUtils.getPerimeterPoint(L,{x:S.component.position.x,y:S.component.position.y,width:S.dimensions.width,height:S.dimensions.height});
G.x=B.x;
G.y=B.y
}}else{var D=nf.CanvasUtils.getConnectionDestinationComponentId(V.component);
var Y=d3.select("#id-"+D).datum();
G=nf.CanvasUtils.getPerimeterPoint(L,{x:Y.component.position.x,y:Y.component.position.y,width:Y.dimensions.width,height:Y.dimensions.height})
}var M;
if(V.bends.length>0){M=V.bends[0]
}else{M=G
}var I=nf.CanvasUtils.getPerimeterPoint(M,{x:F.component.position.x,y:F.component.position.y,width:F.dimensions.width,height:F.dimensions.height});
V.start=I;
V.end=G;
O.select("path.connection-path").attr({d:function(){var Z=[V.start].concat(V.bends,[V.end]);
return d(Z)
},"marker-end":function(){var Z="normal";
if(h(V)){Z="ghost"
}return"url(#"+Z+")"
}});
O.select("path.connection-selection-path").attr({d:function(){var Z=[V.start].concat(V.bends,[V.end]);
return d(Z)
}});
O.select("path.connection-path-selectable").attr({d:function(){var Z=[V.start].concat(V.bends,[V.end]);
return d(Z)
}});
if(nf.Common.isDFM()){var K=O.selectAll("rect.startpoint").data([V.start]);
K.enter().append("rect").attr({"class":"startpoint linepoint","pointer-events":"all",width:8,height:8}).on("mousedown.selection",function(){nf.Selectable.select(d3.select(this.parentNode))
}).call(nf.ContextMenu.activate);
K.attr("transform",function(Z){return"translate("+(Z.x-4)+", "+(Z.y-4)+")"
});
K.exit().remove();
var J=O.selectAll("rect.endpoint").data([V.end]);
J.enter().append("rect").call(x).attr({"class":"endpoint linepoint","pointer-events":"all",width:8,height:8}).on("mousedown.selection",function(){nf.Selectable.select(d3.select(this.parentNode))
}).call(nf.ContextMenu.activate);
J.attr("transform",function(Z){return"translate("+(Z.x-4)+", "+(Z.y-4)+")"
});
J.exit().remove();
var Q=O.selectAll("rect.midpoint").data(V.bends);
Q.enter().append("rect").attr({"class":"midpoint linepoint","pointer-events":"all",width:8,height:8}).call(w).on("dblclick",function(ac){d3.event.stopPropagation();
var af=nf.CanvasUtils.getConnectionSourceComponentId(V.component);
var ae=nf.CanvasUtils.getConnectionDestinationComponentId(V.component);
if(af===ae&&V.component.bends.length<=2){nf.Dialog.showOkDialog({dialogContent:"Looping connections must have at least two bend points.",overlayBackground:false});
return
}var ab=[];
var aa=-1;
$.each(V.component.bends,function(ah,ag){if(ac.x!==ag.x&&ac.y!==ag.y){ab.push(ag)
}else{aa=ah
}});
if(aa<0){return
}var Z={id:V.component.id,bends:ab};
var ad=V.component.labelIndex;
if(ab.length<=1){Z.labelIndex=0
}else{if(aa<=ad){Z.labelIndex=Math.max(0,ad-1)
}}s(V,Z)
}).on("mousedown.selection",function(){nf.Selectable.select(d3.select(this.parentNode))
}).call(nf.ContextMenu.activate);
Q.attr("transform",function(Z){return"translate("+(Z.x-4)+", "+(Z.y-4)+")"
});
Q.exit().remove()
}}if(A===true){var H=O.select("g.connection-label-container");
if(O.classed("visible")){if(H.empty()){H=O.insert("g","rect.startpoint").attr({"class":"connection-label-container","pointer-events":"all"}).on("mousedown.selection",function(){nf.Selectable.select(d3.select(this.parentNode))
}).call(nf.ContextMenu.activate);
H.append("rect").attr({"class":"connection-label",width:e.width,x:0,y:0})
}var P=0;
var N=H.select("g.connection-from-container");
if(l(V.component.source)){if(N.empty()){N=H.append("g").attr({"class":"connection-from-container"});
N.append("text").attr({"class":"connection-stats-label",x:0,y:10}).text("From");
N.append("text").attr({"class":"connection-stats-value connection-from",x:33,y:10,width:130});
N.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"connection-from-run-status",width:10,height:10,x:167,y:1})
}N.attr("transform",function(){var Z=5+(15*P++);
return"translate(5, "+Z+")"
});
N.select("text.connection-from").each(function(){var Z=d3.select(this);
Z.text(null).selectAll("title").remove();
nf.CanvasUtils.ellipsis(Z,V.component.source.name)
}).append("title").text(function(){return V.component.source.name
});
N.select("image.connection-from-run-status").attr("xlink:href",function(){if(V.component.source.exists===false){return"images/portRemoved.png"
}else{if(V.component.source.running===true){return"images/portRunning.png"
}else{return"images/portStopped.png"
}}})
}else{if(!N.empty()){N.remove()
}}var X=H.select("g.connection-to-container");
if(l(V.component.destination)){if(X.empty()){X=H.append("g").attr({"class":"connection-to-container"});
X.append("text").attr({"class":"connection-stats-label",x:0,y:10}).text("To");
X.append("text").attr({"class":"connection-stats-value connection-to",x:18,y:10,width:145});
X.append("image").call(nf.CanvasUtils.disableImageHref).attr({"class":"connection-to-run-status",width:10,height:10,x:167,y:1})
}X.attr("transform",function(){var Z=5+(15*P++);
return"translate(5, "+Z+")"
});
X.select("text.connection-to").each(function(aa){var Z=d3.select(this);
Z.text(null).selectAll("title").remove();
nf.CanvasUtils.ellipsis(Z,aa.component.destination.name)
}).append("title").text(function(Z){return Z.component.destination.name
});
X.select("image.connection-to-run-status").attr("xlink:href",function(){if(V.component.destination.exists===false){return"images/portRemoved.png"
}else{if(V.component.destination.running===true){return"images/portRunning.png"
}else{return"images/portStopped.png"
}}})
}else{if(!X.empty()){X.remove()
}}var E=nf.CanvasUtils.formatConnectionName(V.component);
var R=H.select("g.connection-name-container");
if(!nf.Common.isBlank(E)){if(R.empty()){R=H.append("g").attr({"class":"connection-name-container"});
R.append("text").attr({"class":"connection-stats-label",x:0,y:10}).text("Name");
R.append("text").attr({"class":"connection-stats-value connection-name",x:35,y:10,width:142})
}R.attr("transform",function(){var Z=5+(15*P++);
return"translate(5, "+Z+")"
});
R.select("text.connection-name").each(function(){var Z=d3.select(this);
Z.text(null).selectAll("title").remove();
nf.CanvasUtils.ellipsis(Z,E)
}).append("title").text(function(){return E
})
}else{if(!R.empty()){R.remove()
}}var C=H.select("g.queued-container");
if(C.empty()){C=H.append("g").attr({"class":"queued-container"});
C.append("text").attr({"class":"connection-stats-label",x:0,y:10}).text("Queued");
C.append("text").attr({"class":"connection-stats-value queued",x:46,y:10});
var T=C.append("g").attr({"class":"expiration-icon",transform:"translate(167, 2)"});
T.append("circle").attr({cx:5,cy:5,r:4.75,"stroke-width":0.5,stroke:"#87888a",fill:"url(#expiration)"});
T.append("line").attr({x1:6,y1:5,x2:3,y2:4,stroke:"#fff","stroke-width":1});
T.append("line").attr({x1:6,y1:5,x2:3,y2:7,stroke:"#fff","stroke-width":1});
T.append("title")
}C.attr("transform",function(){var Z=5+(15*P++);
return"translate(5, "+Z+")"
});
H.select("rect.connection-label").attr("height",function(){return 5+(15*P)+3
});
H.select("g.expiration-icon").classed("hidden",function(){return !g(V.component)
}).select("title").text(function(){return"Expires FlowFiles older than "+V.component.flowFileExpiration
});
if(nf.Common.isDFM()){H.call(n)
}O.call(k)
}else{if(!H.empty()){H.remove()
}}}O.select("g.connection-label-container").attr("transform",function(){var aa=d3.select(this).select("rect.connection-label");
var Z=j(aa);
return"translate("+Z.x+", "+Z.y+")"
})
})
};
var k=function(y){if(y.empty()){return
}y.select("text.queued").text(function(z){if(nf.Common.isDefinedAndNotNull(z.status)){return z.status.queued
}else{return"- / -"
}})
};
var s=function(B,z){var A=nf.Client.getRevision();
var y={revision:A,connection:z};
return $.ajax({type:"PUT",url:B.component.uri,data:JSON.stringify(y),dataType:"json",contentType:"application/json"}).done(function(C){nf.Client.setRevision(C.revision);
nf.Connection.set(C.connection)
}).fail(function(E,C,D){if(E.status===400||E.status===404||E.status===409){nf.Dialog.showOkDialog({dialogContent:nf.Common.escapeHtml(E.responseText),overlayBackground:true})
}else{nf.Common.handleAjaxError(E,C,D)
}})
};
var f=function(y){y.remove()
};
return{config:{selfLoopXOffset:(e.width/2)+5,selfLoopYOffset:25},init:function(){r=d3.map();
b=d3.select("#canvas").append("g").attr({"pointer-events":"stroke","class":"connections"});
d=d3.svg.line().x(function(y){return y.x
}).y(function(y){return y.y
}).interpolate("linear");
w=d3.behavior.drag().on("dragstart",function(){d3.event.sourceEvent.stopPropagation()
}).on("drag",function(y){y.x=d3.event.x;
y.y=d3.event.y;
d3.select(this.parentNode).call(q,true,false)
}).on("dragend",function(){var y=d3.select(this.parentNode);
var C=y.datum();
var A=y.selectAll("rect.midpoint").data();
if(A.length===C.component.bends.length){var B=false;
for(var z=0;
z<A.length&&!B;
z++){if(A[z].x!==C.component.bends[z].x||A[z].y!==C.component.bends[z].y){B=true
}}if(B){s(C,{id:C.component.id,bends:A}).fail(function(){C.bends=$.map(C.component.bends,function(D){return{x:D.x,y:D.y}
});
y.call(q,true,false)
})
}}d3.event.sourceEvent.stopPropagation()
});
x=d3.behavior.drag().on("dragstart",function(y){y.dragging=true;
d3.event.sourceEvent.stopPropagation()
}).on("drag",function(y){y.x=d3.event.x-8;
y.y=d3.event.y-8;
d3.select("g.hover").classed("connectable-destination",function(){return nf.CanvasUtils.isValidConnectionDestination(d3.select(this))
});
d3.select(this.parentNode).call(q,true,false)
}).on("dragend",function(F){F.dragging=false;
var y=d3.select(this.parentNode);
var I=y.datum();
var H=d3.select("g.connectable-destination");
if(H.empty()){y.call(q,true,false)
}else{if(nf.CanvasUtils.isProcessGroup(H)||nf.CanvasUtils.isRemoteProcessGroup(H)){nf.ConnectionConfiguration.showConfiguration(y,H).fail(function(){y.call(q,true,false)
})
}else{var G=nf.Client.getRevision();
var B=H.datum();
var D=nf.CanvasUtils.getConnectableTypeForDestination(H);
var C={version:G.version,clientId:G.clientId,destinationId:B.component.id,destinationType:D,destinationGroupId:nf.Canvas.getGroupId()};
if(I.bends.length<2&&I.component.source.id===B.component.id){var z={x:B.component.position.x+(B.dimensions.width),y:B.component.position.y+(B.dimensions.height/2)};
var E=nf.Connection.config.selfLoopXOffset;
var A=nf.Connection.config.selfLoopYOffset;
C.bends=[];
C.bends.push((z.x+E)+","+(z.y-A));
C.bends.push((z.x+E)+","+(z.y+A))
}$.ajax({type:"PUT",url:I.component.uri,data:C,dataType:"json"}).done(function(J){var K=J.connection;
nf.Client.setRevision(J.revision);
nf.Connection.set(K)
}).fail(function(L,J,K){if(L.status===400||L.status===404||L.status===409){nf.Dialog.showOkDialog({dialogContent:nf.Common.escapeHtml(L.responseText),overlayBackground:true});
y.call(q,true,false)
}else{nf.Common.handleAjaxError(L,J,K)
}})
}}d3.event.sourceEvent.stopPropagation()
});
n=d3.behavior.drag().on("dragstart",function(y){d3.event.sourceEvent.stopPropagation()
}).on("drag",function(D){if(D.bends.length>1){var A=d3.select("rect.label-drag");
if(A.empty()){var C=d3.select(this).select("rect.connection-label");
var B=j(C);
var y=e.width;
var H=C.attr("height");
A=d3.select("#canvas").append("rect").attr("rx",6).attr("ry",6).attr("x",B.x).attr("y",B.y).attr("class","label-drag").attr("width",y).attr("height",H).attr("stroke-width",function(){return 1/nf.Canvas.View.scale()
}).attr("stroke-dasharray",function(){return 4/nf.Canvas.View.scale()
}).datum({x:B.x,y:B.y,width:y,height:H})
}else{A.attr("x",function(I){I.x+=d3.event.dx;
return I.x
}).attr("y",function(I){I.y+=d3.event.dy;
return I.y
})
}var E=A.datum();
var G={x:E.x+(E.width/2),y:E.y+(E.height/2)};
var z=-1;
var F;
$.each(D.bends,function(K,J){var I={x:J.x,y:J.y};
var L=i(G,I);
if(z===-1||L<F){z=K;
F=L
}});
D.labelIndex=z;
d3.select(this.parentNode).call(q,true,false)
}}).on("dragend",function(A){if(A.bends.length>1){var z=d3.select("rect.label-drag");
if(!z.empty()){z.remove()
}if(A.labelIndex!==A.component.labelIndex){var y=d3.select(this.parentNode);
s(A,{id:A.component.id,labelIndex:A.labelIndex}).fail(function(){A.labelIndex=A.component.labelIndex;
y.call(q,true,false)
})
}}d3.event.sourceEvent.stopPropagation()
})
},add:function(y,z){z=nf.Common.isDefinedAndNotNull(z)?z:false;
var A=function(B){r.set(B.id,{type:"Connection",component:B,bends:$.map(B.bends,function(C){return{x:C.x,y:C.y}
}),labelIndex:B.labelIndex})
};
if($.isArray(y)){$.each(y,function(C,B){A(B)
})
}else{A(y)
}p().enter().call(v,z)
},reorder:function(){d3.selectAll("g.connection").call(t)
},set:function(y){var z=function(B){if(r.has(B.id)){var A=r.get(B.id);
A.component=B;
A.bends=$.map(B.bends,function(C){return{x:C.x,y:C.y}
});
A.labelIndex=B.labelIndex;
d3.select("#id-"+B.id).call(q,true,true)
}};
if($.isArray(y)){$.each(y,function(A,B){z(B)
})
}else{z(y)
}},setStatus:function(y){if(nf.Common.isEmpty(y)){return
}$.each(y,function(B,z){if(r.has(z.id)){var A=r.get(z.id);
A.status=z
}});
d3.selectAll("g.connection.visible").call(k)
},refresh:function(y){if(nf.Common.isDefinedAndNotNull(y)){d3.select("#id-"+y).call(q,true,true)
}else{d3.selectAll("g.connection").call(q,true,true)
}},pan:function(){d3.selectAll("g.connection.entering, g.connection.leaving").call(q,false,true)
},remove:function(y){if($.isArray(y)){$.each(y,function(A,z){r.remove(z)
})
}else{r.remove(y)
}p().exit().call(f)
},removeAll:function(){nf.Connection.remove(r.keys())
},reload:function(y){if(r.has(y.id)){return $.ajax({type:"GET",url:y.uri,dataType:"json"}).done(function(z){nf.Connection.set(z.connection)
})
}},getComponentConnections:function(z){var y=[];
r.forEach(function(B,C){var A=C.component;
if(nf.CanvasUtils.getConnectionSourceComponentId(A)===z||nf.CanvasUtils.getConnectionDestinationComponentId(A)===z){y.push(A)
}});
return y
},get:function(y){if(nf.Common.isUndefined(y)){return r.values()
}else{return r.get(y)
}}}
}());
nf.Draggable=(function(){var a;
var b=function(e){var f=nf.Client.getRevision();
var h=d3.map();
var g=e.datum();
var j={x:g.x-g.original.x,y:g.y-g.original.y};
if(j.x===0&&j.y===0){return
}var i=function(l){var k={x:l.component.position.x+j.x,y:l.component.position.y+j.y};
return $.Deferred(function(m){$.ajax({type:"PUT",url:l.component.uri,data:{version:f.version,clientId:f.clientId,x:k.x,y:k.y},dataType:"json"}).done(function(n){nf.Client.setRevision(n.revision);
l.component.position=k;
m.resolve({type:l.type,id:l.component.id})
}).fail(function(p,n,o){if(p.status===400||p.status===404||p.status===409){nf.Dialog.showOkDialog({dialogContent:nf.Common.escapeHtml(p.responseText),overlayBackground:true})
}else{nf.Common.handleAjaxError(p,n,o)
}m.reject()
})
}).promise()
};
var d=function(m){if(m.component.bends.length===0){return null
}var l=$.map(m.component.bends,function(n){return{x:n.x+j.x,y:n.y+j.y}
});
var k={revision:f,connection:{id:m.component.id,bends:l}};
return $.Deferred(function(n){$.ajax({type:"PUT",url:m.component.uri,data:JSON.stringify(k),dataType:"json",contentType:"application/json"}).done(function(o){nf.Client.setRevision(o.revision);
m.component.bends=o.connection.bends;
m.bends=$.map(m.component.bends,function(p){return{x:p.x,y:p.y}
});
n.resolve({type:m.type,id:m.component.id})
}).fail(function(q,o,p){if(q.status===400||q.status===404||q.status===409){nf.Dialog.showOkDialog({dialogContent:nf.Common.escapeHtml(q.responseText),overlayBackground:true})
}else{nf.Common.handleAjaxError(q,o,p)
}n.reject()
})
}).promise()
};
d3.selectAll("g.connection.selected").each(function(l){var k=d(l);
if(k!==null){h.set(l.component.id,k)
}});
d3.selectAll("g.component.selected").each(function(l){var k=nf.Connection.getComponentConnections(l.component.id);
$.each(k,function(o,n){if(!h.has(n.id)&&nf.CanvasUtils.getConnectionSourceComponentId(n)===nf.CanvasUtils.getConnectionDestinationComponentId(n)){var m=d(nf.Connection.get(n.id));
if(m!==null){h.set(n.id,m)
}}});
h.set(l.component.id,i(l))
});
$.when.apply(window,h.values()).done(function(){var k=$.makeArray(arguments);
var l=d3.set();
$.each(k,function(o,n){if(n.type==="Connection"){l.add(n.id)
}else{var m=nf.Connection.getComponentConnections(n.id);
$.each(m,function(q,p){l.add(p.id)
});
nf[n.type].position(n.id)
}});
l.forEach(function(m){nf.Connection.refresh(m)
})
})
};
var c=function(){var d=d3.selectAll("g.component.selected, g.connection.selected");
var e=d3.select("g.drop");
nf.CanvasUtils.moveComponents(d,e)
};
return{init:function(){a=d3.behavior.drag().on("dragstart",function(){d3.event.sourceEvent.stopPropagation()
}).on("drag",function(){var e=d3.select("rect.drag-selection");
if(e.empty()){var f=d3.selectAll("g.component.selected");
var d=null,h=null,i=null,g=null;
f.each(function(l){if(d===null||l.component.position.x<d){d=l.component.position.x
}if(i===null||l.component.position.y<i){i=l.component.position.y
}var k=l.component.position.x+l.dimensions.width;
var j=l.component.position.y+l.dimensions.height;
if(h===null||k>h){h=k
}if(g===null||j>g){g=j
}});
d3.select("#canvas").append("rect").attr("rx",6).attr("ry",6).attr("x",d).attr("y",i).attr("class","drag-selection").attr("pointer-events","none").attr("width",h-d).attr("height",g-i).attr("stroke-width",function(){return 1/nf.Canvas.View.scale()
}).attr("stroke-dasharray",function(){return 4/nf.Canvas.View.scale()
}).datum({original:{x:d,y:i},x:d,y:i})
}else{e.attr("x",function(j){j.x+=d3.event.dx;
return j.x
}).attr("y",function(j){j.y+=d3.event.dy;
return j.y
})
}}).on("dragend",function(){d3.event.sourceEvent.stopPropagation();
var d=d3.select("rect.drag-selection");
if(d.empty()){return
}if(d3.select("g.drop").empty()){b(d)
}else{c()
}d.remove()
})
},activate:function(d){d.classed("moveable",true).call(a)
}}
}());
nf.Selectable=(function(){return{init:function(){},select:function(a){nf.ContextMenu.hide();
if(!a.classed("selected")){if(!d3.event.shiftKey){d3.selectAll("g.selected").classed("selected",false)
}a.classed("selected",true)
}else{if(d3.event.shiftKey){a.classed("selected",false)
}}nf.CanvasToolbar.refresh();
d3.event.stopPropagation()
},activate:function(a){a.on("mousedown.selection",function(){nf.Selectable.select(d3.select(this))
})
}}
}());
nf.Connectable=(function(){var b;
var c;
var a;
return{init:function(){c=d3.select("#canvas");
b=d3.behavior.drag().origin(function(e){a=d3.mouse(c.node());
return{x:a[0],y:a[1]}
}).on("dragstart",function(h){d3.event.sourceEvent.stopPropagation();
nf.CanvasUtils.getSelection().classed("selected",false);
var g=d3.select(this.parentNode).classed("selected",true);
d3.select(this).classed("dragging",true);
var f=g.datum();
var e=d3.mouse(c.node());
c.insert("path",":first-child").datum({sourceId:f.component.id,sourceWidth:f.dimensions.width,x:e[0],y:e[1]}).attr({"class":"connector",d:function(d){return"M"+d.x+" "+d.y+"L"+d.x+" "+d.y
}});
d3.select(this).attr("transform",function(){return"translate("+e[0]+", "+(e[1]+20)+")"
});
c.node().appendChild(this)
}).on("drag",function(f){d3.select(this).attr("transform",function(){return"translate("+d3.event.x+", "+(d3.event.y+20)+")"
});
var e=d3.select("g.hover").classed("connectable-destination",function(){return(Math.abs(a[0]-d3.event.x)>10||Math.abs(a[1]-d3.event.y)>10)&&nf.CanvasUtils.isValidConnectionDestination(d3.select(this))
});
d3.select("path.connector").classed("connectable",function(){if(e.empty()){return false
}return e.classed("connectable-destination")
}).attr("d",function(h){if(!e.empty()&&e.classed("connectable-destination")){var g=e.datum();
var d=nf.CanvasUtils.getPerimeterPoint(h,{x:g.component.position.x,y:g.component.position.y,width:g.dimensions.width,height:g.dimensions.height});
return"M"+h.x+" "+h.y+"L"+d.x+" "+d.y
}else{return"M"+h.x+" "+h.y+"L"+d3.event.x+" "+d3.event.y
}})
}).on("dragend",function(i){d3.event.sourceEvent.stopPropagation();
var f=d3.select("path.connector");
var e=d3.select("g.connectable-destination");
if(e.empty()){f.remove()
}else{var h=f.datum();
var g=e.datum();
if(h.sourceId===g.component.id){f.attr("d",function(n){var d=n.x;
var m=n.y;
var k=n.sourceWidth/2;
var j=nf.Connection.config.selfLoopXOffset;
var l=nf.Connection.config.selfLoopYOffset;
return"M"+d+" "+m+"L"+(d+k+j)+" "+(m-l)+"L"+(d+k+j)+" "+(m+l)+"Z"
})
}nf.ConnectionConfiguration.createConnection(h.sourceId,g.component.id)
}d3.select(this).remove()
})
},activate:function(d){d.on("mouseenter.connectable",function(h){if(!d3.event.shiftKey&&d3.select("rect.drag-selection").empty()){var f=d3.select(this);
if(nf.CanvasUtils.isValidConnectionSource(f)){var g=d3.select("image.add-connect");
if(g.empty()){var e=(h.dimensions.width/2)-14;
var i=(h.dimensions.height/2)-14;
f.append("image").call(b).call(nf.CanvasUtils.disableImageHref).attr({"class":"add-connect","xlink:href":"images/addConnect.png",width:28,height:28,transform:"translate("+e+", "+i+")"})
}}}}).on("mouseleave.connectable",function(){var e=d3.select(this).select("image.add-connect");
if(!e.empty()&&!e.classed("dragging")){e.remove()
}}).on("mouseover.connectable",function(){var e=d3.select(this);
e.classed("hover",function(){return !d3.event.shiftKey&&!e.classed("hover")&&d3.select("rect.drag-selection").empty()
})
}).on("mouseout.connection",function(){d3.select(this).classed("hover connectable-destination",false)
})
}}
}());
nf.Birdseye=(function(){var d;
var b;
var a=function(x){var v=nf.Canvas.View.translate();
var M=nf.Canvas.View.scale();
v=[v[0]/M,v[1]/M];
var p=d3.select("#canvas").node().getBoundingClientRect();
var e=(p.left/M)-v[0];
var r=((p.top-nf.Canvas.CANVAS_OFFSET)/M)-v[1];
var w=(p.right/M)-v[0];
var k=(p.bottom/M)-v[1];
var z=$("#canvas-container");
var A=z.width()/M;
var K=z.height()/M;
var q=-v[0];
var E=-v[1];
var L=q+A;
var n=E+K;
var C=Math.min(e,q);
var F=Math.min(r,E);
var h=Math.max(w,L);
var I=Math.max(k,n);
var J=h-C;
var f=I-F;
var u=$("#birdseye");
var t=u.width();
var m=u.height();
var D=t/J;
var l=m/f;
var B=Math.min(D,l);
var j=[0,0];
var g=[0,0];
if(v[0]<0&&v[1]<0){j=[0,0];
g=[-v[0],-v[1]]
}else{if(v[0]>=0&&v[1]<0){j=[v[0],0];
g=[0,-v[1]]
}else{if(v[0]<0&&v[1]>=0){j=[0,v[1]];
g=[-v[0],0]
}else{j=[v[0],v[1]];
g=[0,0]
}}}var H=0;
var o=-e;
if(v[0]<0){if(v[0]<o){H=o
}else{H=o-(o-v[0])
}}else{if(v[0]<o){H=o-v[0]
}}var G=0;
var y=-r;
if(v[1]<0){if(v[1]<y){G=y
}else{G=y-(y-v[1])
}}else{if(v[1]<y){G=y-v[1]
}}j=[j[0]+H,j[1]+G];
g=[g[0]+H,g[1]+G];
d.attr("transform","scale("+B+")");
b.attr("transform","translate("+j+")");
d3.select("rect.birdseye-brush").attr({width:A,height:K,"stroke-width":(2/B),transform:function(N){N.x=g[0];
N.y=g[1];
return"translate("+g+")"
}});
var s=d3.select("#birdseye-canvas").node();
var i=s.getContext("2d");
i.save();
i.setTransform(1,0,0,1,0,0);
i.clearRect(0,0,s.width,s.height);
i.restore();
i.save();
i.translate(j[0]*B,j[1]*B);
i.scale(B,B);
$.each(x.labels,function(O,P){var N=nf.Label.defaultColor();
if(nf.Common.isDefinedAndNotNull(P.component.style["background-color"])){N=P.component.style["background-color"]
}i.fillStyle=N;
i.fillRect(P.component.position.x,P.component.position.y,P.dimensions.width,P.dimensions.height)
});
i.fillStyle="#9f6000";
$.each(x.funnels,function(N,O){i.fillRect(O.component.position.x,O.component.position.y,O.dimensions.width,O.dimensions.height)
});
i.fillStyle="#aaa";
$.each(x.ports,function(N,O){i.fillRect(O.component.position.x,O.component.position.y,O.dimensions.width,O.dimensions.height)
});
i.fillStyle="#294c58";
$.each(x.remoteProcessGroups,function(N,O){i.fillRect(O.component.position.x,O.component.position.y,O.dimensions.width,O.dimensions.height)
});
i.fillStyle="#294c58";
$.each(x.processGroups,function(N,O){i.fillRect(O.component.position.x,O.component.position.y,O.dimensions.width,O.dimensions.height)
});
$.each(x.processors,function(O,P){var N=nf.Processor.defaultColor();
if(nf.Common.isDefinedAndNotNull(P.component.style["background-color"])){N=P.component.style["background-color"]
}i.fillStyle=N;
i.fillRect(P.component.position.x,P.component.position.y,P.dimensions.width,P.dimensions.height)
});
i.restore()
};
var c=true;
return{init:function(){var h=$("#birdseye");
var g=$("#birdseye-container");
$("#birdseye-collapse").click(function(){if(h.is(":visible")){$(this).removeClass("birdseye-expanded-hover").addClass("birdseye-collapsed-hover");
h.hide();
g.hide();
c=false;
$("#controller-counts").css("margin-right","-13px")
}else{$(this).removeClass("birdseye-collapsed-hover").addClass("birdseye-expanded-hover");
$("#controller-counts").css("margin-right","195px");
h.show();
g.show();
c=true;
a(nf.Graph.get())
}}).mouseover(function(){if(h.is(":visible")){$(this).removeClass("birdseye-expanded").addClass("birdseye-expanded-hover")
}else{$(this).removeClass("birdseye-collapsed").addClass("birdseye-collapsed-hover")
}}).mouseout(function(){if(h.is(":visible")){$(this).removeClass("birdseye-expanded-hover").addClass("birdseye-expanded")
}else{$(this).removeClass("birdseye-collapsed-hover").addClass("birdseye-collapsed")
}});
d3.select("#birdseye").append("canvas").attr("id","birdseye-canvas").attr("width",h.width()).attr("height",h.height());
var f=d3.select("#birdseye").append("svg").attr("width",h.width()).attr("height",h.height());
d=f.append("g").attr("class","birdseye");
b=d.append("g").attr("pointer-events","none");
var e=d3.behavior.drag().origin(function(i){return{x:i.x,y:i.y}
}).on("dragstart",function(){nf.ContextMenu.hide()
}).on("drag",function(k){k.x+=d3.event.dx;
k.y+=d3.event.dy;
d3.select(this).attr("transform",function(){return"translate("+k.x+", "+k.y+")"
});
var j=nf.Canvas.View.scale();
var i=nf.Canvas.View.translate();
i=[(-d3.event.dx*j)+i[0],(-d3.event.dy*j)+i[1]];
nf.Canvas.View.translate(i);
nf.Canvas.View.refresh({persist:false,transition:false,refreshComponents:false,refreshBirdseye:false})
}).on("dragend",function(){nf.Canvas.View.updateVisibility();
nf.CanvasUtils.persistUserView();
nf.Birdseye.refresh()
});
d.append("g").attr({"pointer-events":"all","class":"birdseye-brush-container"}).append("rect").attr("class","birdseye-brush moveable").datum({x:0,y:0}).call(e)
},refresh:function(){if(c){a(nf.Graph.get())
}}}
}());
nf.ToolbarAction=function(c,e,g,b,a,d,f){this.container=c;
this.action=e;
this.id=g;
this.cls=b;
this.hoverCls=a;
this.disableCls=d;
this.title=f;
this.initAction()
};
nf.ToolbarAction.prototype.container=null;
nf.ToolbarAction.prototype.action=null;
nf.ToolbarAction.prototype.id=null;
nf.ToolbarAction.prototype.cls=null;
nf.ToolbarAction.prototype.hoverCls=null;
nf.ToolbarAction.prototype.disableCls=null;
nf.ToolbarAction.prototype.title=null;
nf.ToolbarAction.prototype.initAction=function(){var a=this;
$("<div/>").addClass("toolbar-icon").attr("id",this.id).attr("title",this.title).mouseover(function(){if(!$(this).hasClass(a.disableCls)){$(this).removeClass(a.cls).addClass(a.hoverCls)
}}).mouseout(function(){if(!$(this).hasClass(a.disableCls)){$(this).addClass(a.cls).removeClass(a.hoverCls)
}}).click(function(){if(!$(this).hasClass(a.disableCls)){nf.ContextMenu.hide();
nf.Actions[a.action](nf.CanvasUtils.getSelection())
}}).appendTo(this.container)
};
nf.ToolbarAction.prototype.enable=function(){$("#"+this.id).removeClass(this.disableCls).addClass(this.cls).addClass("pointer")
};
nf.ToolbarAction.prototype.disable=function(){$("#"+this.id).removeClass(this.cls).addClass(this.disableCls).removeClass("pointer")
};
nf.CanvasToolbar=(function(){var a;
return{init:function(){a={};
var d=$("<div/>").addClass("control-separator");
var b=$("<div/>").addClass("control-border");
var c=$("#global-controls")[0];
b.clone().appendTo(c);
a.enable=new nf.ToolbarAction(c,"enable","action-enable","enable-all","enable-all-hover","enable-all-disable","Enable");
b.clone().appendTo(c);
a.disable=new nf.ToolbarAction(c,"disable","action-disable","disable-all","disable-all-hover","disable-all-disable","Disable");
b.clone().appendTo(c);
d.clone().appendTo(c);
b.clone().appendTo(c);
a.start=new nf.ToolbarAction(c,"start","action-start","start-all","start-all-hover","start-all-disable","Start");
b.clone().appendTo(c);
a.stop=new nf.ToolbarAction(c,"stop","action-stop","stop-all","stop-all-hover","stop-all-disable","Stop");
b.clone().appendTo(c);
d.clone().appendTo(c);
b.clone().appendTo(c);
a.template=new nf.ToolbarAction(c,"template","action-template","template","template-hover","template-disable","Create Template");
b.clone().appendTo(c);
d.clone().appendTo(c);
b.clone().appendTo(c);
a.copy=new nf.ToolbarAction(c,"copy","action-copy","copy","copy-hover","copy-disable","Copy");
b.clone().appendTo(c);
a.paste=new nf.ToolbarAction(c,"paste","action-paste","paste","paste-hover","paste-disable","Paste");
b.clone().appendTo(c);
d.clone().appendTo(c);
b.clone().appendTo(c);
a.group=new nf.ToolbarAction(c,"group","action-group","group","group-hover","group-disable","Group");
b.appendTo(c);
d.clone().appendTo(c);
b.clone().appendTo(c);
a.fill=new nf.ToolbarAction(c,"fillColor","action-fill","fill","fill-hover","fill-disable","Change Color");
b.clone().appendTo(c);
d.clone().appendTo(c);
b.clone().appendTo(c);
a["delete"]=new nf.ToolbarAction(c,"delete","action-delete","delete","delete-hover","delete-disable","Delete");
b.appendTo(c);
d.appendTo(c);
if(nf.Common.isDFM()){a.start.enable();
a.stop.enable();
a.template.enable()
}else{a.start.disable();
a.stop.disable();
a.template.disable()
}a.enable.disable();
a.disable.disable();
a.copy.disable();
a.paste.disable();
a.fill.disable();
a["delete"].disable();
a.group.disable();
if(nf.Common.isDFM()){nf.Clipboard.addListener(this,function(f,e){if(nf.Clipboard.isCopied()){a.paste.enable()
}else{a.paste.disable()
}})
}},refresh:function(){if(nf.Common.isUndefined(a)){return
}if(nf.Common.isDFM()){var e=nf.CanvasUtils.getSelection();
if(!e.empty()){var b=true;
e.each(function(f){if(!nf.CanvasUtils.isDeletable(d3.select(this))){b=false;
return false
}});
if(b){a["delete"].enable()
}else{a["delete"].disable()
}}else{a["delete"].disable()
}if(nf.CanvasUtils.isCopyable(e)){a.copy.enable()
}else{a.copy.disable()
}if(!e.empty()&&nf.CanvasUtils.isDisconnected(e)){a.group.enable()
}else{a.group.disable()
}var d=e.filter(function(g){var f=d3.select(this);
return nf.CanvasUtils.isProcessor(f)||nf.CanvasUtils.isLabel(f)
});
if(d.size()===1&&d.size()===e.size()){a.fill.enable()
}else{a.fill.disable()
}var c=e.filter(function(g){var f=d3.select(this);
return nf.CanvasUtils.isProcessor(f)||nf.CanvasUtils.isInputPort(f)||nf.CanvasUtils.isOutputPort(f)
});
if(!c.empty()&&c.size()===e.size()){a.enable.enable();
a.disable.enable()
}else{a.enable.disable();
a.disable.disable()
}}}}
}());
nf.GraphControl=(function(){var a={translateIncrement:20};
return{init:function(){nf.Common.addHoverEffect("#pan-up-button","pan-up","pan-up-hover").on("click",function(){var b=nf.Canvas.View.translate();
nf.Canvas.View.translate([b[0],b[1]+a.translateIncrement]);
nf.ContextMenu.hide();
nf.Canvas.View.refresh({transition:true})
});
nf.Common.addHoverEffect("#pan-down-button","pan-down","pan-down-hover").on("click",function(){var b=nf.Canvas.View.translate();
nf.Canvas.View.translate([b[0],b[1]-a.translateIncrement]);
nf.ContextMenu.hide();
nf.Canvas.View.refresh({transition:true})
});
nf.Common.addHoverEffect("#pan-left-button","pan-left","pan-left-hover").on("click",function(){var b=nf.Canvas.View.translate();
nf.Canvas.View.translate([b[0]+a.translateIncrement,b[1]]);
nf.ContextMenu.hide();
nf.Canvas.View.refresh({transition:true})
});
nf.Common.addHoverEffect("#pan-right-button","pan-right","pan-right-hover").on("click",function(){var b=nf.Canvas.View.translate();
nf.Canvas.View.translate([b[0]-a.translateIncrement,b[1]]);
nf.ContextMenu.hide();
nf.Canvas.View.refresh({transition:true})
});
nf.Common.addHoverEffect("#zoom-in-button","zoom-in","zoom-in-hover").on("click",function(){nf.Canvas.View.zoomIn();
nf.ContextMenu.hide();
nf.Canvas.View.refresh({transition:true})
});
nf.Common.addHoverEffect("#zoom-out-button","zoom-out","zoom-out-hover").on("click",function(){nf.Canvas.View.zoomOut();
nf.ContextMenu.hide();
nf.Canvas.View.refresh({transition:true})
});
nf.Common.addHoverEffect("#zoom-fit-button","fit-image","fit-image-hover").on("click",function(){nf.Canvas.View.fit();
nf.ContextMenu.hide();
nf.Canvas.View.refresh({transition:true})
});
nf.Common.addHoverEffect("#zoom-actual-button","actual-size","actual-size-hover").on("click",function(){nf.Canvas.View.actualSize();
nf.ContextMenu.hide();
nf.Canvas.View.refresh({transition:true})
})
}}
}());
nf.CanvasHeader=(function(){var a={urls:{helpDocument:"../nifi-docs/documentation",controllerAbout:"../nifi-api/controller/about"}};
return{init:function(){nf.Common.addHoverEffect("#reporting-link","reporting-link","reporting-link-hover").click(function(){nf.Shell.showPage("summary")
});
nf.Common.addHoverEffect("#counters-link","counters-link","counters-link-hover").click(function(){nf.Shell.showPage("counters")
});
nf.Common.addHoverEffect("#history-link","history-link","history-link-hover").click(function(){nf.Shell.showPage("history")
});
if(nf.Common.canAccessProvenance()){nf.Common.addHoverEffect("#provenance-link","provenance-link","provenance-link-hover").click(function(){nf.Shell.showPage("provenance")
})
}else{$("#provenance-link").addClass("provenance-link-disabled")
}nf.Common.addHoverEffect("#templates-link","templates-link","templates-link-hover").click(function(){nf.Shell.showPage("templates")
});
if(nf.Common.isDFM()){nf.Common.addHoverEffect("#flow-settings-link","flow-settings-link","flow-settings-link-hover").click(function(){nf.Settings.showSettings()
})
}else{$("#flow-settings-link").addClass("flow-settings-link-disabled")
}if(nf.Common.isAdmin()){nf.Common.addHoverEffect("#users-link","users-link","users-link-hover").click(function(){nf.Shell.showPage("users")
})
}else{$("#users-link").addClass("users-link-disabled")
}if(nf.Canvas.isClustered()){nf.Common.addHoverEffect("#cluster-link","cluster-link","cluster-link-hover").click(function(){nf.Shell.showPage("cluster")
});
$("#connected-nodes-element").show();
$("#cluster-indicator").show();
$("#data-flow-title-viewport").css("left","113px")
}else{$("#cluster-link").hide()
}nf.Common.addHoverEffect("#bulletin-board-link","bulletin-board-link","bulletin-board-hover").click(function(){nf.Shell.showPage("bulletin-board")
});
$("#refresh-required-icon").qtip($.extend({content:"This flow has been modified by another user. Please refresh."},nf.CanvasUtils.config.systemTooltipConfig));
$("#refresh-required-link").click(function(){nf.Canvas.reload().done(function(){nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh();
$("#stats-last-refreshed").removeClass("alert");
$("#refresh-required-container").hide()
}).fail(function(){nf.Dialog.showOkDialog({dialogContent:"Unable to refresh the current group.",overlayBackground:true})
})
});
$.ajax({type:"GET",url:a.urls.controllerAbout,dataType:"json"}).done(function(c){var b=c.about;
document.title=b.title;
$("#nf-version").text(b.version)
}).fail(nf.Common.handleAjaxError);
$("#nf-about").modal({overlayBackground:true,buttons:[{buttonText:"Ok",handler:{click:function(){$("#nf-about").modal("hide")
}}}]});
$("#about-link").click(function(){$("#nf-about").modal("show")
});
$("#help-link").click(function(){nf.Shell.showPage(a.urls.helpDocument)
});
$("#new-template-dialog").modal({headerText:"Create Template",overlayBackground:false});
$("#fill-color-dialog").modal({headerText:"Fill",overlayBackground:false,buttons:[{buttonText:"Apply",handler:{click:function(){$("#fill-color-dialog").modal("hide");
var d=nf.CanvasUtils.getSelection();
if(d.size()===1&&(nf.CanvasUtils.isProcessor(d)||nf.CanvasUtils.isLabel(d))){var c=nf.Client.getRevision();
var e=d.datum();
var b=$("#fill-color-value").val();
$.ajax({type:"PUT",url:e.component.uri,data:{version:c.version,clientId:c.clientId,"style[background-color]":b},dataType:"json"}).done(function(f){nf.Client.setRevision(f.revision);
if(nf.CanvasUtils.isProcessor(d)){nf.Processor.set(f.processor)
}else{nf.Label.set(f.label)
}}).fail(function(h,f,g){if(h.status===400||h.status===404||h.status===409){nf.Dialog.showOkDialog({dialogContent:nf.Common.escapeHtml(h.responseText),overlayBackground:true})
}})
}}}},{buttonText:"Cancel",handler:{click:function(){$("#fill-color-dialog").modal("hide")
}}}]});
$("#fill-color-value").minicolors({inline:true,change:function(c,b){$("#fill-color-processor-preview, #fill-color-label-preview").css({"border-color":c,background:"linear-gradient(to bottom, #ffffff, "+c+")",filter:"progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr=#ffffff, endColorstr="+c+")"})
}});
$("#data-flow-title-viewport").on("DOMMouseScroll mousewheel",function(o,h){if(nf.Common.isUndefinedOrNull(o.originalEvent)){return
}var i=$("#data-flow-title-container");
var b=i.position();
var m=i.outerWidth();
var f=b.left+m;
var j=$("#breadcrumbs-right-border").width();
var g=$("#data-flow-title-viewport");
var e=g.width();
var c=e-j;
if(m>e){var l=false;
var n=0;
if(nf.Common.isDefinedAndNotNull(o.originalEvent.detail)){n=-o.originalEvent.detail
}else{if(nf.Common.isDefinedAndNotNull(evnt.originalEvent.wheelDelta)){n=o.originalEvent.wheelDelta
}}if(n>0&&f>c){var k=-25;
l=true
}else{if(n<0&&(b.left-j)<0){k=25;
if(b.left+k>j){k=j-b.left
}l=true
}}if(l){i.css("left",(b.left+k)+"px")
}}})
}}
}());
nf.Search=(function(){var a={search:"Search",urls:{search:"../nifi-api/controller/search-results"}};
return{init:function(){$.widget("nf.searchAutocomplete",$.ui.autocomplete,{reset:function(){this.term=null
},_resizeMenu:function(){var b=this.menu.element;
b.width(399)
},_normalize:function(c){var b=[];
b.push(c);
return b
},_renderMenu:function(d,c){var b=this;
var e=c[0];
if(!nf.Common.isEmpty(e.processorResults)){d.append('<li class="search-header"><div class="search-result-icon processor-small-icon"></div>Processors</li>');
$.each(e.processorResults,function(g,f){b._renderItem(d,f)
})
}if(!nf.Common.isEmpty(e.processGroupResults)){d.append('<li class="search-header"><div class="search-result-icon process-group-small-icon"></div>Process Groups</li>');
$.each(e.processGroupResults,function(g,f){b._renderItem(d,f)
})
}if(!nf.Common.isEmpty(e.remoteProcessGroupResults)){d.append('<li class="search-header"><div class="search-result-icon remote-process-group-small-icon"></div>Remote Process Groups</li>');
$.each(e.remoteProcessGroupResults,function(f,g){b._renderItem(d,g)
})
}if(!nf.Common.isEmpty(e.connectionResults)){d.append('<li class="search-header"><div class="search-result-icon connection-small-icon"></div>Connections</li>');
$.each(e.connectionResults,function(g,f){b._renderItem(d,f)
})
}if(!nf.Common.isEmpty(e.inputPortResults)){d.append('<li class="search-header"><div class="search-result-icon input-port-small-icon"></div>Input Ports</li>');
$.each(e.inputPortResults,function(f,g){b._renderItem(d,g)
})
}if(!nf.Common.isEmpty(e.outputPortResults)){d.append('<li class="search-header"><div class="search-result-icon output-port-small-icon"></div>Output Ports</li>');
$.each(e.outputPortResults,function(f,g){b._renderItem(d,g)
})
}if(!nf.Common.isEmpty(e.funnelResults)){d.append('<li class="search-header"><div class="search-result-icon funnel-small-icon"></div>Funnels</li>');
$.each(e.funnelResults,function(g,f){b._renderItem(d,f)
})
}if(d.children().length===0){d.append('<li class="unset search-no-matches">No results matched the search terms</li>')
}},_renderItem:function(c,b){var d=$("<a></a>").append($('<div class="search-match-header"></div>').text(b.name));
$.each(b.matches,function(f,e){d.append($('<div class="search-match"></div>').text(e))
});
return $("<li></li>").data("ui-autocomplete-item",b).append(d).appendTo(c)
}});
$("#search-field").zIndex(1250).searchAutocomplete({appendTo:"#search-flow-results",position:{my:"right top",at:"right bottom",offset:"1 1"},source:function(c,b){$.ajax({type:"GET",data:{q:c.term},dataType:"json",url:a.urls.search}).done(function(d){b(d.searchResultsDTO)
})
},select:function(c,d){var b=d.item;
nf.CanvasUtils.showComponent(b.groupId,b.id);
$(this).blur();
return false
},open:function(b,c){var d=$(this);
$('<div class="search-glass-pane"></div>').one("click",function(){d.blur()
}).appendTo("body")
},close:function(b,c){$(this).searchAutocomplete("reset");
$("div.search-glass-pane").remove()
}}).focus(function(){nf.ContextMenu.hide();
$(this).val("").removeClass("search-flow")
}).blur(function(){$(this).val(a.search).addClass("search-flow")
}).val(a.search).addClass("search-flow")
}}
}());
nf.Settings=(function(){var a={urls:{controllerConfig:"../nifi-api/controller/config",controllerArchive:"../nifi-api/controller/archive"}};
var b=function(){var c={};
c.name=$("#data-flow-title-field").val();
c.comments=$("#data-flow-comments-field").val();
c.maxTimerDrivenThreadCount=$("#maximum-timer-driven-thread-count-field").val();
c.maxEventDrivenThreadCount=$("#maximum-event-driven-thread-count-field").val();
return c
};
return{init:function(){$("#archive-flow-link").click(function(){var c=nf.Client.getRevision();
$.ajax({type:"POST",url:a.urls.controllerArchive,data:{version:c.version,clientId:c.clientId},dataType:"json"}).done(function(d){nf.Client.setRevision(d.revision);
nf.Dialog.showOkDialog({dialogContent:"A new flow archive was successfully created.",overlayBackground:false})
}).fail(function(f,d,e){$("#settings-cancel").click();
nf.Common.handleAjaxError(f,d,e)
})
});
$("#settings-save").click(function(){var c=nf.Client.getRevision();
var d=b();
d.version=c.version;
d.clientId=c.clientId;
$.ajax({type:"PUT",url:a.urls.controllerConfig,data:d,dataType:"json"}).done(function(e){nf.Client.setRevision(e.revision);
document.title=e.config.name;
$("#data-flow-title-container").children("span.link:first-child").text(e.config.name);
$("#shell-close-button").click()
}).fail(function(g,e,f){$("#settings-cancel").click();
nf.Common.handleAjaxError(g,e,f)
})
});
$("#settings-cancel").click(function(){$("#shell-close-button").click()
})
},showSettings:function(){$.ajax({type:"GET",url:a.urls.controllerConfig,dataType:"json"}).done(function(c){if(nf.Common.isDefinedAndNotNull(c.config)){$("#settings-header-text").text(c.config.name+" Settings");
$("#data-flow-title-field").val(c.config.name);
$("#data-flow-comments-field").val(c.config.comments);
$("#maximum-timer-driven-thread-count-field").val(c.config.maxTimerDrivenThreadCount);
$("#maximum-event-driven-thread-count-field").val(c.config.maxEventDrivenThreadCount)
}nf.Shell.showContent("#settings").done(function(){$("#settings-save, #settings-cancel").mouseout()
})
}).fail(nf.Common.handleAjaxError)
}}
}());
nf.GoTo=(function(){var a={urls:{controller:"../nifi-api/controller",processGroups:"../nifi-api/controller/process-groups/"}};
var f=function(k){return $.ajax({type:"GET",url:a.urls.processGroups+encodeURIComponent(k),dataType:"json"})
};
var j=function(k,l){return $.ajax({type:"GET",url:a.urls.processGroups+encodeURIComponent(k)+"/remote-process-groups/"+encodeURIComponent(l),dataType:"json"})
};
var b=function(l){var k=$('<div class="source-destination-connection"></div>').appendTo("#connections-container");
var m;
if(l.source.type==="OUTPUT_PORT"){m=c(k,l)
}else{if(l.source.type==="REMOTE_OUTPUT_PORT"){m=e(k,l)
}else{m=d(k,l)
}}m.done(function(){var p=$('<div class="connection-entry"></div>').appendTo(k);
var o="";
var q=nf.CanvasUtils.formatConnectionName(l);
if(q===""){o="unset";
q="Connection"
}$('<div class="search-result-icon connection-small-icon"></div>').appendTo(p);
$('<div class="connection-entry-name go-to-link"></div>').attr("title",q).addClass(o).text(q).on("click",function(){nf.CanvasUtils.showComponent(l.parentGroupId,l.id);
$("#connections-dialog").modal("hide")
}).appendTo(p);
$('<div class="clear"></div>').appendTo(p);
var n;
if(l.destination.type==="INPUT_PORT"){n=i(k,l)
}else{if(l.destination.type==="REMOTE_INPUT_PORT"){n=g(k,l)
}else{n=h(k,l)
}}n.done(function(){$('<div class="clear"></div>').appendTo(k)
})
})
};
var h=function(k,l){return $.Deferred(function(m){var n="";
if(l.destination.type==="PROCESSOR"){n="processor-small-icon"
}else{if(l.destination.type==="OUTPUT_PORT"){n="output-port-small-icon"
}}var o=$('<div class="destination-component"></div>').appendTo(k);
$('<div class="search-result-icon"></div>').addClass(n).appendTo(o);
$('<div class="destination-component-name go-to-link"></div>').attr("title",l.destination.name).text(l.destination.name).on("click",function(){nf.CanvasUtils.showComponent(l.destination.groupId,l.destination.id);
$("#connections-dialog").modal("hide")
}).appendTo(o);
$('<div class="clear"></div>').appendTo(o);
m.resolve()
}).promise()
};
var i=function(k,l){return f(l.destination.groupId).done(function(m){var n=m.processGroup;
var p=$('<div class="destination-component"></div>').appendTo(k);
$('<div class="search-result-icon process-group-small-icon"></div>').appendTo(p);
$('<div class="destination-component-name go-to-link"></div>').attr("title",n.name).text(n.name).on("click",function(){nf.CanvasUtils.showComponent(n.parentGroupId,n.id);
$("#connections-dialog").modal("hide")
}).appendTo(p);
$('<div class="clear"></div>').appendTo(p);
var o=$('<div class="destination-input-port"></div>').appendTo(p);
$('<div class="search-result-icon input-port-small-icon"></div>').appendTo(o);
$('<div class="destination-input-port-name go-to-link"></div>').attr("title",l.destination.name).text(l.destination.name).on("click",function(){nf.CanvasUtils.showComponent(l.destination.groupId,l.destination.id);
$("#connections-dialog").modal("hide")
}).appendTo(o);
$('<div class="clear"></div>').appendTo(p)
})
};
var g=function(k,l){return j(l.parentGroupId,l.destination.groupId).done(function(m){var n=m.remoteProcessGroup;
var p=$('<div class="destination-component"></div>').appendTo(k);
$('<div class="search-result-icon remote-process-group-small-icon"></div>').appendTo(p);
$('<div class="destination-component-name go-to-link"></div>').attr("title",n.name).text(n.name).on("click",function(){nf.CanvasUtils.showComponent(n.parentGroupId,n.id);
$("#connections-dialog").modal("hide")
}).appendTo(p);
$('<div class="clear"></div>').appendTo(p);
var o=$('<div class="destination-input-port"></div>').appendTo(p);
$('<div class="search-result-icon input-port-small-icon"></div>').appendTo(o);
$('<div class="destination-input-port-name"></div>').attr("title",l.destination.name).text(l.destination.name).appendTo(o);
$('<div class="clear"></div>').appendTo(p)
})
};
var d=function(k,l){return $.Deferred(function(m){var o="";
if(l.source.type==="PROCESSOR"){o="processor-small-icon"
}else{if(l.source.type==="INPUT_PORT"){o="input-port-small-icon"
}}var n=$('<div class="source-component"></div>').appendTo(k);
$('<div class="search-result-icon"></div>').addClass(o).appendTo(n);
$('<div class="source-component-name go-to-link"></div>').attr("title",l.source.name).text(l.source.name).on("click",function(){nf.CanvasUtils.showComponent(l.source.groupId,l.source.id);
$("#connections-dialog").modal("hide")
}).appendTo(n);
m.resolve()
}).promise()
};
var c=function(k,l){return f(l.source.groupId).done(function(m){var o=m.processGroup;
var n=$('<div class="source-component"></div>').appendTo(k);
$('<div class="search-result-icon process-group-small-icon"></div>').appendTo(n);
$('<div class="source-component-name go-to-link"></div>').attr("title",o.name).text(o.name).on("click",function(){nf.CanvasUtils.showComponent(o.parentGroupId,o.id);
$("#connections-dialog").modal("hide")
}).appendTo(n);
$('<div class="clear"></div>').appendTo(n);
var p=$('<div class="source-output-port"></div>').appendTo(n);
$('<div class="search-result-icon output-port-small-icon"></div>').appendTo(p);
$('<div class="source-output-port-name go-to-link"></div>').attr("title",l.source.name).text(l.source.name).on("click",function(){nf.CanvasUtils.showComponent(l.source.groupId,l.source.id);
$("#connections-dialog").modal("hide")
}).appendTo(p)
})
};
var e=function(k,l){return j(l.parentGroupId,l.source.groupId).done(function(m){var o=m.remoteProcessGroup;
var n=$('<div class="source-component"></div>').appendTo(k);
$('<div class="search-result-icon remote-process-group-small-icon"></div>').appendTo(n);
$('<div class="source-component-name go-to-link"></div>').attr("title",o.name).text(o.name).on("click",function(){nf.CanvasUtils.showComponent(o.parentGroupId,o.id);
$("#connections-dialog").modal("hide")
}).appendTo(n);
$('<div class="clear"></div>').appendTo(n);
var p=$('<div class="source-output-port"></div>').appendTo(n);
$('<div class="search-result-icon output-port-small-icon"></div>').appendTo(p);
$('<div class="source-output-port-name"></div>').attr("title",l.source.name).text(l.source.name).appendTo(p)
})
};
return{init:function(){$("#connections-dialog").modal({overlayBackground:false,buttons:[{buttonText:"Close",handler:{click:function(){$("#connections-dialog").modal("hide")
}}}],handler:{close:function(){$("#connections-context").empty();
$("#connections-container").empty()
}}})
},showDownstreamFromProcessor:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(l.component.parentGroupId)+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append('<div class="search-result-icon processor-small-icon"></div>').append($('<div class="connections-component-name"></div>').text(l.component.name)).append('<div class="clear"></div>');
$.each(n,function(p,o){if(o.source.id===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No downstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Downstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
},showUpstreamFromProcessor:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(l.component.parentGroupId)+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append('<div class="search-result-icon processor-small-icon"></div>').append($('<div class="connections-component-name"></div>').text(l.component.name)).append('<div class="clear"></div>');
$.each(n,function(p,o){if(o.destination.id===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No upstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Upstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
},showDownstreamFromGroup:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(l.component.parentGroupId)+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append('<div class="search-result-icon process-group-small-icon"></div>').append($('<div class="connections-component-name"></div>').text(l.component.name)).append('<div class="clear"></div>');
$.each(n,function(p,o){if(o.source.groupId===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No downstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Downstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
},showUpstreamFromGroup:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(l.component.parentGroupId)+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append('<div class="search-result-icon process-group-small-icon"></div>').append($('<div class="connections-component-name"></div>').text(l.component.name)).append('<div class="clear"></div>');
$.each(n,function(p,o){if(o.destination.groupId===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No upstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Upstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
},showDownstreamFromInputPort:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(l.component.parentGroupId)+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append('<div class="search-result-icon input-port-small-icon"></div>').append($('<div class="connections-component-name"></div>').text(l.component.name)).append('<div class="clear"></div>');
$.each(n,function(p,o){if(o.source.id===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No downstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Downstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
},showUpstreamFromInputPort:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getParentGroupId())+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append('<div class="search-result-icon process-group-small-icon"></div>').append($('<div class="connections-component-name"></div>').text(nf.Canvas.getGroupName())).append('<div class="clear"></div>').append('<div class="search-result-icon input-port-small-icon" style="margin-left: 20px;"></div>').append($('<div class="connections-component-name"></div>').text(l.component.name)).append('<div class="clear"></div>');
$.each(n,function(p,o){if(o.destination.id===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No upstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Upstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
},showDownstreamFromOutputPort:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getParentGroupId())+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append('<div class="search-result-icon process-group-small-icon"></div>').append($('<div class="connections-component-name"></div>').text(nf.Canvas.getGroupName())).append('<div class="clear"></div>').append('<div class="search-result-icon output-port-small-icon" style="margin-left: 20px;"></div>').append($('<div class="connections-component-name"></div>').text(l.component.name)).append('<div class="clear"></div>');
$.each(n,function(p,o){if(o.source.id===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No downstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Downstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
},showUpstreamFromOutputPort:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(l.component.parentGroupId)+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append('<div class="search-result-icon input-port-small-icon"></div>').append($('<div class="connections-component-name"></div>').text(l.component.name)).append('<div class="clear"></div>');
$.each(n,function(p,o){if(o.destination.id===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No upstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Upstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
},showDownstreamFromFunnel:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(l.component.parentGroupId)+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append($('<div class="connections-component-name"></div>').text("Funnel"));
$.each(n,function(p,o){if(o.source.id===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No downstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Downstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
},showUpstreamFromFunnel:function(k){var l=k.datum();
$.ajax({type:"GET",url:a.urls.controller+"/process-groups/"+encodeURIComponent(l.component.parentGroupId)+"/connections",dataType:"json"}).done(function(m){var n=m.connections;
$("#connections-context").append($('<div class="upstream-destination-name"></div>').text("Funnel"));
$.each(n,function(p,o){if(o.destination.id===l.component.id){b(o)
}});
if($("#connections-container").is(":empty")){$("#connections-container").html('<span class="unset">No upstream components</span>')
}$("#connections-dialog").modal("setHeaderText","Upstream Connections").modal("show")
}).fail(nf.Common.handleAjaxError)
}}
}());
nf.Actions=(function(){var b={urls:{controller:"../nifi-api/controller"}};
var c=function(e,f){var d=nf.Client.getRevision();
f.version=d.version;
f.clientId=d.clientId;
return $.ajax({type:"PUT",url:e,data:f,dataType:"json"}).done(function(g){nf.Client.setRevision(g.revision)
}).fail(function(i,g,h){if(i.status===400||i.status===404||i.status===409){nf.Dialog.showOkDialog({dialogContent:nf.Common.escapeHtml(i.responseText),overlayBackground:true})
}})
};
var a=function(d){if(nf.Common.isDefinedAndNotNull(d.processGroup)){if(nf.Common.isDefinedAndNotNull(d.processGroup.contents)){var e=d.processGroup.contents;
nf.Graph.set(e);
$.each(e.processGroups,function(f,h){var g=nf.Connection.getComponentConnections(h.id);
$.each(g,function(j,i){nf.Connection.reload(i)
})
})
}}};
return{enterGroup:function(d){if(d.size()===1&&nf.CanvasUtils.isProcessGroup(d)){var e=d.datum();
nf.CanvasUtils.enterGroup(e.component.id)
}},leaveGroup:function(){nf.CanvasUtils.enterGroup(nf.Canvas.getParentGroupId())
},refreshRemoteFlow:function(f){if(f.size()===1&&nf.CanvasUtils.isRemoteProcessGroup(f)){var i=f.datum();
var j=i.component.flowRefreshed;
var e=function(d){i.component.flowRefreshed=d;
if(f.classed("visible")){f.select("text.remote-process-group-last-refresh").text(function(){return d
})
}};
var h=function(d){$.ajax({type:"GET",url:i.component.uri,dataType:"json"}).done(function(k){var m=k.remoteProcessGroup;
if(j===m.flowRefreshed){g(d)
}else{nf.RemoteProcessGroup.set(k.remoteProcessGroup);
var l=nf.Connection.getComponentConnections(m.id);
$.each(l,function(o,n){nf.Connection.reload(n)
})
}})
};
var g=function(d){if(d<=32){setTimeout(function(){h(d*2)
},d*1000)
}else{e(j)
}};
e("Refreshing...");
h(1)
}},openUri:function(d){if(d.size()===1&&nf.CanvasUtils.isRemoteProcessGroup(d)){var f=d.datum();
var e=f.component.targetUri;
if(!nf.Common.isBlank(e)){window.open(encodeURI(e))
}else{nf.Dialog.showOkDialog({dialogContent:"No target URI defined."})
}}},showSource:function(d){if(d.size()===1&&nf.CanvasUtils.isConnection(d)){var f=d.datum();
if(f.component.source.groupId!==nf.Canvas.getGroupId()){nf.CanvasUtils.showComponent(f.component.source.groupId,f.component.source.id)
}else{var e=d3.select("#id-"+f.component.source.id);
nf.Actions.show(e)
}}},showDestination:function(e){if(e.size()===1&&nf.CanvasUtils.isConnection(e)){var f=e.datum();
if(f.component.destination.groupId!==nf.Canvas.getGroupId()){nf.CanvasUtils.showComponent(f.component.destination.groupId,f.component.destination.id)
}else{var d=d3.select("#id-"+f.component.destination.id);
nf.Actions.show(d)
}}},showDownstream:function(d){if(d.size()===1&&!nf.CanvasUtils.isConnection(d)){if(nf.CanvasUtils.isProcessor(d)){nf.GoTo.showDownstreamFromProcessor(d)
}else{if(nf.CanvasUtils.isFunnel(d)){nf.GoTo.showDownstreamFromFunnel(d)
}else{if(nf.CanvasUtils.isInputPort(d)){nf.GoTo.showDownstreamFromInputPort(d)
}else{if(nf.CanvasUtils.isOutputPort(d)){nf.GoTo.showDownstreamFromOutputPort(d)
}else{if(nf.CanvasUtils.isProcessGroup(d)||nf.CanvasUtils.isRemoteProcessGroup(d)){nf.GoTo.showDownstreamFromGroup(d)
}}}}}}},showUpstream:function(d){if(d.size()===1&&!nf.CanvasUtils.isConnection(d)){if(nf.CanvasUtils.isProcessor(d)){nf.GoTo.showUpstreamFromProcessor(d)
}else{if(nf.CanvasUtils.isFunnel(d)){nf.GoTo.showUpstreamFromFunnel(d)
}else{if(nf.CanvasUtils.isInputPort(d)){nf.GoTo.showUpstreamFromInputPort(d)
}else{if(nf.CanvasUtils.isOutputPort(d)){nf.GoTo.showUpstreamFromOutputPort(d)
}else{if(nf.CanvasUtils.isProcessGroup(d)||nf.CanvasUtils.isRemoteProcessGroup(d)){nf.GoTo.showUpstreamFromGroup(d)
}}}}}}},show:function(d){if(d.size()===1){var e=nf.CanvasUtils.getSelection();
e.classed("selected",false);
d.classed("selected",true);
nf.Actions.center(d)
}},select:function(d){d.classed("selected",true)
},selectAll:function(){nf.Actions.select(d3.selectAll("g.component, g.connection"))
},center:function(g){if(g.size()===1){var h;
if(nf.CanvasUtils.isConnection(g)){var e,m;
var l=g.datum();
if(l.bends.length>0){var f=Math.min(Math.max(0,l.labelIndex),l.bends.length-1);
e=l.bends[f].x;
m=l.bends[f].y
}else{e=(l.start.x+l.end.x)/2;
m=(l.start.y+l.end.y)/2
}h={x:e,y:m,width:1,height:1}
}else{var j=g.datum();
var k=j.component.position;
h={x:k.x,y:k.y,width:j.dimensions.width,height:j.dimensions.height}
}nf.CanvasUtils.centerBoundingBox(h);
nf.Canvas.View.refresh({transition:true})
}},enable:function(){var d=d3.selectAll("g.component.selected").filter(function(f){var e=d3.select(this);
return(nf.CanvasUtils.isProcessor(e)||nf.CanvasUtils.isInputPort(e)||nf.CanvasUtils.isOutputPort(e))&&nf.CanvasUtils.supportsModification(e)
});
if(d.empty()){nf.Dialog.showOkDialog({dialogContent:"No eligible components are selected. Please select the components to be enabled and ensure they are no longer running.",overlayBackground:true})
}else{d.each(function(f){var e=d3.select(this);
c(f.component.uri,{state:"STOPPED"}).done(function(g){if(nf.CanvasUtils.isProcessor(e)){nf.Processor.set(g.processor)
}else{if(nf.CanvasUtils.isInputPort(e)){nf.Port.set(g.inputPort)
}else{if(nf.CanvasUtils.isOutputPort(e)){nf.Port.set(g.outputPort)
}}}})
})
}},disable:function(){var d=d3.selectAll("g.component.selected").filter(function(f){var e=d3.select(this);
return(nf.CanvasUtils.isProcessor(e)||nf.CanvasUtils.isInputPort(e)||nf.CanvasUtils.isOutputPort(e))&&nf.CanvasUtils.supportsModification(e)
});
if(d.empty()){nf.Dialog.showOkDialog({dialogContent:"No eligible components are selected. Please select the components to be disabled and ensure they are no longer running.",overlayBackground:true})
}else{d.each(function(f){var e=d3.select(this);
c(f.component.uri,{state:"DISABLED"}).done(function(g){if(nf.CanvasUtils.isProcessor(e)){nf.Processor.set(g.processor)
}else{if(nf.CanvasUtils.isInputPort(e)){nf.Port.set(g.inputPort)
}else{if(nf.CanvasUtils.isOutputPort(e)){nf.Port.set(g.outputPort)
}}}})
})
}},start:function(d){if(d.empty()){c(b.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId()),{running:true}).done(a)
}else{var e=d.filter(function(f){return nf.CanvasUtils.isRunnable(d3.select(this))
});
if(e.empty()){nf.Dialog.showOkDialog({dialogContent:"No eligible components are selected. Please select the components to be started and ensure they are no longer running.",overlayBackground:true})
}else{e.each(function(h){var f=d3.select(this);
var g={};
if(nf.CanvasUtils.isProcessor(f)||nf.CanvasUtils.isInputPort(f)||nf.CanvasUtils.isOutputPort(f)){g.state="RUNNING"
}else{g.running=true
}c(h.component.uri,g).done(function(i){if(nf.CanvasUtils.isProcessor(f)){nf.Processor.set(i.processor)
}else{if(nf.CanvasUtils.isProcessGroup(f)){nf.ProcessGroup.set(i.processGroup);
var j=nf.Connection.getComponentConnections(i.processGroup.id);
$.each(j,function(l,k){nf.Connection.reload(k)
})
}else{if(nf.CanvasUtils.isInputPort(f)){nf.Port.set(i.inputPort)
}else{if(nf.CanvasUtils.isOutputPort(f)){nf.Port.set(i.outputPort)
}}}}})
})
}}},stop:function(d){if(d.empty()){c(b.urls.controller+"/process-groups/"+encodeURIComponent(nf.Canvas.getGroupId()),{running:false}).done(a)
}else{var e=d.filter(function(f){return nf.CanvasUtils.isStoppable(d3.select(this))
});
if(e.empty()){nf.Dialog.showOkDialog({dialogContent:"No eligible components are selected. Please select the components to be stopped.",overlayBackground:true})
}else{e.each(function(h){var f=d3.select(this);
var g={};
if(nf.CanvasUtils.isProcessor(f)||nf.CanvasUtils.isInputPort(f)||nf.CanvasUtils.isOutputPort(f)){g.state="STOPPED"
}else{g.running=false
}c(h.component.uri,g).done(function(i){if(nf.CanvasUtils.isProcessor(f)){nf.Processor.set(i.processor)
}else{if(nf.CanvasUtils.isProcessGroup(f)){nf.ProcessGroup.set(i.processGroup);
var j=nf.Connection.getComponentConnections(i.processGroup.id);
$.each(j,function(l,k){nf.Connection.reload(k)
})
}else{if(nf.CanvasUtils.isInputPort(f)){nf.Port.set(i.inputPort)
}else{if(nf.CanvasUtils.isOutputPort(f)){nf.Port.set(i.outputPort)
}}}}})
})
}}},enableTransmission:function(d){var e=d.filter(function(f){return nf.CanvasUtils.canStartTransmitting(d3.select(this))
});
e.each(function(f){c(f.component.uri,{transmitting:true}).done(function(g){nf.RemoteProcessGroup.set(g.remoteProcessGroup)
})
})
},disableTransmission:function(e){var d=e.filter(function(f){return nf.CanvasUtils.canStopTransmitting(d3.select(this))
});
d.each(function(f){c(f.component.uri,{transmitting:false}).done(function(g){nf.RemoteProcessGroup.set(g.remoteProcessGroup)
})
})
},showConfiguration:function(d){if(d.size()===1){if(nf.CanvasUtils.isProcessor(d)){nf.ProcessorConfiguration.showConfiguration(d)
}else{if(nf.CanvasUtils.isLabel(d)){nf.LabelConfiguration.showConfiguration(d)
}else{if(nf.CanvasUtils.isProcessGroup(d)){nf.ProcessGroupConfiguration.showConfiguration(d)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(d)){nf.RemoteProcessGroupConfiguration.showConfiguration(d)
}else{if(nf.CanvasUtils.isInputPort(d)||nf.CanvasUtils.isOutputPort(d)){if(nf.Canvas.getParentGroupId()===null&&nf.Canvas.isSecureSiteToSite()){nf.SecurePortConfiguration.showConfiguration(d)
}else{nf.PortConfiguration.showConfiguration(d)
}}else{if(nf.CanvasUtils.isConnection(d)){nf.ConnectionConfiguration.showConfiguration(d)
}}}}}}}},showDetails:function(d){if(d.size()===1){var e=d.datum();
if(nf.CanvasUtils.isProcessor(d)){nf.ProcessorDetails.showDetails(nf.Canvas.getGroupId(),e.component.id)
}else{if(nf.CanvasUtils.isProcessGroup(d)){nf.ProcessGroupDetails.showDetails(d)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(d)){nf.RemoteProcessGroupDetails.showDetails(d)
}else{if(nf.CanvasUtils.isInputPort(d)||nf.CanvasUtils.isOutputPort(d)){if(nf.Canvas.getParentGroupId()===null&&nf.Canvas.isSecureSiteToSite()){nf.SecurePortDetails.showDetails(d)
}else{nf.PortDetails.showDetails(d)
}}else{if(nf.CanvasUtils.isConnection(d)){nf.ConnectionDetails.showDetails(nf.Canvas.getGroupId(),e.component.id)
}}}}}}},showUsage:function(d){if(d.size()===1&&nf.CanvasUtils.isProcessor(d)){var e=d.datum();
nf.Shell.showPage("../nifi-docs/documentation?"+$.param({select:nf.Common.substringAfterLast(e.component.type,".")}))
}},showStats:function(d){if(d.size()===1){var e=d.datum();
if(nf.Canvas.isClustered()){if(nf.CanvasUtils.isProcessor(d)){nf.StatusHistory.showClusterProcessorChart(nf.Canvas.getGroupId(),e.component.id)
}else{if(nf.CanvasUtils.isProcessGroup(d)){nf.StatusHistory.showClusterProcessGroupChart(nf.Canvas.getGroupId(),e.component.id)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(d)){nf.StatusHistory.showClusterRemoteProcessGroupChart(nf.Canvas.getGroupId(),e.component.id)
}else{if(nf.CanvasUtils.isConnection(d)){nf.StatusHistory.showClusterConnectionChart(nf.Canvas.getGroupId(),e.component.id)
}}}}}else{if(nf.CanvasUtils.isProcessor(d)){nf.StatusHistory.showStandaloneProcessorChart(nf.Canvas.getGroupId(),e.component.id)
}else{if(nf.CanvasUtils.isProcessGroup(d)){nf.StatusHistory.showStandaloneProcessGroupChart(nf.Canvas.getGroupId(),e.component.id)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(d)){nf.StatusHistory.showStandaloneRemoteProcessGroupChart(nf.Canvas.getGroupId(),e.component.id)
}else{if(nf.CanvasUtils.isConnection(d)){nf.StatusHistory.showStandaloneConnectionChart(nf.Canvas.getGroupId(),e.component.id)
}}}}}}},remotePorts:function(d){if(d.size()===1&&nf.CanvasUtils.isRemoteProcessGroup(d)){nf.RemoteProcessGroupPorts.showPorts(d)
}},hideDialogs:function(){var d=$(".cancellable");
$.each(d,function(){if($(this).is(":visible")){$(this).modal("hide")
}})
},reloadStatus:function(){nf.Canvas.reloadStatus()
},"delete":function(e){if(nf.Common.isUndefined(e)||e.empty()){nf.Dialog.showOkDialog({dialogContent:"No eligible components are selected. Please select the components to be deleted.",overlayBackground:true})
}else{if(e.size()===1){var f=e.datum();
var d=nf.Client.getRevision();
$.ajax({type:"DELETE",url:f.component.uri+"?"+$.param({version:d.version,clientId:d.clientId}),dataType:"json"}).done(function(k){nf.Client.setRevision(k.revision);
nf[f.type].remove(f.component.id);
if(nf.CanvasUtils.isConnection(e)){var o=nf.CanvasUtils.getConnectionSourceComponentId(f.component);
var i=d3.select("#id-"+o);
var l=i.datum();
if(nf.CanvasUtils.isProcessor(i)){nf.Processor.reload(l.component)
}else{if(nf.CanvasUtils.isInputPort(i)){nf.Port.reload(l.component)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(i)){nf.RemoteProcessGroup.reload(l.component)
}}}var m=nf.CanvasUtils.getConnectionDestinationComponentId(f.component);
var n=d3.select("#id-"+m);
var j=n.datum();
if(nf.CanvasUtils.isRemoteProcessGroup(n)){nf.RemoteProcessGroup.reload(j.component)
}}else{var p=nf.Connection.getComponentConnections(f.component.id);
if(p.length>0){var h=[];
$.each(p,function(r,q){h.push(q.id)
});
nf.Connection.remove(h)
}}nf.Birdseye.refresh();
nf.CanvasToolbar.refresh()
}).fail(nf.Common.handleAjaxError)
}else{var g=nf.Snippet.marshal(e,true);
nf.Snippet.create(g).done(function(h){var i=h.snippet;
nf.Snippet.remove(i.id).done(function(){var k=d3.map();
var j=function(l,m){if(!k.has(l)){k.set(l,[])
}k.get(l).push(m)
};
e.each(function(m){j(m.type,m.component.id);
if(m.type!=="Connection"){var l=nf.Connection.getComponentConnections(m.component.id);
if(l.length>0){$.each(l,function(o,n){j("Connection",n.id)
})
}}});
k.forEach(function(m,l){nf[m].remove(l)
});
if(i.connections>0){e.filter(function(l){return l.type==="Connection"
}).each(function(r){var q=nf.CanvasUtils.getConnectionSourceComponentId(r.component);
var o=d3.select("#id-"+q);
var n=o.datum();
if(nf.CanvasUtils.isProcessor(o)){nf.Processor.reload(n.component)
}else{if(nf.CanvasUtils.isInputPort(o)){nf.Port.reload(n.component)
}else{if(nf.CanvasUtils.isRemoteProcessGroup(o)){nf.RemoteProcessGroup.reload(n.component)
}}}var p=nf.CanvasUtils.getConnectionDestinationComponentId(r.component);
var l=d3.select("#id-"+p);
var m=l.datum();
if(nf.CanvasUtils.isRemoteProcessGroup(l)){nf.RemoteProcessGroup.reload(m.component)
}})
}nf.Birdseye.refresh();
nf.CanvasToolbar.refresh()
}).fail(function(l,j,k){nf.Snippet.unlink(i.id).done(function(){nf.Snippet.remove(i.id)
});
nf.Common.handleAjaxError(l,j,k)
})
}).fail(nf.Common.handleAjaxError)
}}},fillColor:function(e){if(e.size()===1&&(nf.CanvasUtils.isProcessor(e)||nf.CanvasUtils.isLabel(e))){var f=e.datum();
var d=nf[f.type].defaultColor();
if(nf.Common.isDefinedAndNotNull(f.component.style["background-color"])){d=f.component.style["background-color"]
}$("#fill-color-value").minicolors("value",d);
if(nf.CanvasUtils.isProcessor(e)){$("#fill-color-processor-preview").show();
$("#fill-color-label-preview").hide()
}else{$("#fill-color-processor-preview").hide();
$("#fill-color-label-preview").show()
}$("#fill-color-dialog").modal("show")
}},group:function(){var d=nf.CanvasUtils.getSelection();
if(d.empty()){return
}$.when(nf.CanvasUtils.eligibleForMove(d)).done(function(){var e=nf.CanvasUtils.getOrigin(d);
var f={x:e.x,y:e.y};
$.when(nf.CanvasToolbox.promptForGroupName(f)).done(function(g){var h=d3.select("#id-"+g.id);
nf.CanvasUtils.moveComponents(d,h)
})
})
},template:function(){var d=nf.CanvasUtils.getSelection();
if(d.empty()){d=d3.selectAll("g.component, g.connection")
}if(d.empty()){nf.Dialog.showOkDialog({dialogContent:"The current selection is not valid to create a template.",overlayBackground:false});
return
}d=nf.CanvasUtils.trimDanglingEdges(d);
if(d.empty()){nf.Dialog.showOkDialog({dialogContent:"The current selection is not valid to create a template.",overlayBackground:false});
return
}$("#new-template-dialog").modal("setButtonModel",[{buttonText:"Create",handler:{click:function(){$("#new-template-dialog").modal("hide");
var e=$("#new-template-name").val();
var g=$("#new-template-description").val();
var f=nf.Snippet.marshal(d,false);
nf.Snippet.create(f).done(function(h){var i=h.snippet;
$.ajax({type:"POST",url:b.urls.controller+"/templates",data:{name:e,description:g,snippetId:i.id},dataType:"json"}).done(function(){nf.Dialog.showOkDialog({dialogContent:"Template '"+nf.Common.escapeHtml(e)+"' was successfully created.",overlayBackground:false})
}).always(function(){nf.Snippet.remove(i.id);
$("#new-template-name").val("");
$("#new-template-description").val("")
}).fail(nf.Common.handleAjaxError)
}).fail(nf.Common.handleAjaxError)
}}},{buttonText:"Cancel",handler:{click:function(){$("#new-template-dialog").modal("hide")
}}}]).modal("show");
$("#new-template-name").focus()
},copy:function(e){if(e.empty()){return
}var d=nf.CanvasUtils.getOrigin(e);
nf.Clipboard.copy({snippet:nf.Snippet.marshal(e,false),origin:d})
},paste:function(k,l){if(nf.Common.isDefinedAndNotNull(l)){var f=nf.Canvas.View.scale();
var d=nf.Canvas.View.translate();
var g=l.pageX;
var e=l.pageY-nf.Canvas.CANVAS_OFFSET;
var j=(g/f)-(d[0]/f);
var i=(e/f)-(d[1]/f);
var h={x:j,y:i}
}nf.Clipboard.paste().done(function(n){var m=$.Deferred(function(o){var p=function(){o.reject()
};
nf.Snippet.create(n.snippet).done(function(s){var t=s.snippet;
var r=h;
var q=n.origin;
if(!nf.Common.isDefinedAndNotNull(r)){q.x+=25;
q.y+=25;
r=q
}nf.Snippet.copy(t.id,nf.Canvas.getGroupId(),r).done(function(v){var u=v.contents;
nf.Graph.add(u,true);
nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh();
nf.CanvasToolbar.refresh();
nf.Snippet.remove(t.id).fail(p)
}).fail(function(){nf.Canvas.reload().done(function(){nf.Canvas.View.updateVisibility();
nf.Birdseye.refresh();
nf.CanvasToolbar.refresh()
});
p()
})
}).fail(p)
}).promise();
m.fail(function(){nf.Dialog.showOkDialog({dialogContent:"An error occurred while attempting to copy and paste.",overlayBackground:true})
})
})
},toFront:function(g){if(g.size()!==1||!nf.CanvasUtils.isConnection(g)){return
}var d=g.datum();
var f=-1;
$.each(nf.Connection.get(),function(i,j){if(d.component.id!==j.component.id&&j.component.zIndex>f){f=j.component.zIndex
}});
if(f>=0){var h=f+1;
var e=nf.Client.getRevision();
$.ajax({type:"PUT",url:d.component.uri,data:{version:e.version,clientId:e.clientId,zIndex:h},dataType:"json"}).done(function(i){nf.Connection.set(i.connection);
nf.Connection.reorder();
nf.Client.setRevision(i.revision)
})
}}}
}());
nf.ContextMenu=(function(){var j=function(z){return nf.Canvas.getParentGroupId()!==null&&z.empty()
};
var t=function(z){if(z.size()!==1){return false
}var A=nf.CanvasUtils.isLabel(z)||nf.CanvasUtils.isProcessGroup(z);
if(!A){if(nf.CanvasUtils.isProcessor(z)||nf.CanvasUtils.isInputPort(z)||nf.CanvasUtils.isOutputPort(z)||nf.CanvasUtils.isRemoteProcessGroup(z)||nf.CanvasUtils.isConnection(z)){A=nf.CanvasUtils.supportsModification(z)
}}return A&&nf.Common.isDFM()
};
var a=function(z){if(z.size()!==1){return false
}if(nf.Common.isDFM()){if(nf.CanvasUtils.isProcessor(z)||nf.CanvasUtils.isInputPort(z)||nf.CanvasUtils.isOutputPort(z)||nf.CanvasUtils.isRemoteProcessGroup(z)||nf.CanvasUtils.isConnection(z)){return !nf.CanvasUtils.supportsModification(z)
}}else{return nf.CanvasUtils.isProcessor(z)||nf.CanvasUtils.isConnection(z)||nf.CanvasUtils.isProcessGroup(z)||nf.CanvasUtils.isInputPort(z)||nf.CanvasUtils.isOutputPort(z)||nf.CanvasUtils.isRemoteProcessGroup(z)
}return false
};
var c=function(z){return nf.Common.isDFM()&&nf.CanvasUtils.isDeletable(z)
};
var f=function(z){return nf.Common.isDFM()&&nf.CanvasUtils.areRunnable(z)
};
var b=function(z){return nf.Common.isDFM()&&nf.CanvasUtils.areStoppable(z)
};
var u=function(z){if(z.size()!==1){return false
}return nf.CanvasUtils.isProcessor(z)||nf.CanvasUtils.isProcessGroup(z)||nf.CanvasUtils.isRemoteProcessGroup(z)||nf.CanvasUtils.isConnection(z)
};
var g=function(z){if(z.size()!==1){return false
}return nf.CanvasUtils.isProcessor(z)
};
var p=function(z){return z.size()===1&&!nf.CanvasUtils.isConnection(z)
};
var e=function(z){return nf.Common.isDFM()&&nf.CanvasUtils.isCopyable(z)
};
var s=function(z){return nf.Common.isDFM()&&nf.CanvasUtils.isPastable()
};
var l=function(z){return z.empty()
};
var d=function(z){if(z.size()!==1){return false
}return nf.Common.isDFM()&&nf.CanvasUtils.isConnection(z)
};
var n=function(z){if(z.size()!==1){return false
}return nf.Common.isDFM()&&(nf.CanvasUtils.isProcessor(z)||nf.CanvasUtils.isLabel(z))
};
var v=function(z){if(z.size()!==1){return false
}return nf.CanvasUtils.isConnection(z)
};
var x=function(z){if(z.size()!==1){return false
}return nf.CanvasUtils.isFunnel(z)||nf.CanvasUtils.isProcessor(z)||nf.CanvasUtils.isProcessGroup(z)||nf.CanvasUtils.isRemoteProcessGroup(z)||nf.CanvasUtils.isInputPort(z)||(nf.CanvasUtils.isOutputPort(z)&&nf.Canvas.getParentGroupId()!==null)
};
var w=function(z){if(z.size()!==1){return false
}return nf.CanvasUtils.isFunnel(z)||nf.CanvasUtils.isProcessor(z)||nf.CanvasUtils.isProcessGroup(z)||nf.CanvasUtils.isRemoteProcessGroup(z)||nf.CanvasUtils.isOutputPort(z)||(nf.CanvasUtils.isInputPort(z)&&nf.Canvas.getParentGroupId()!==null)
};
var m=function(z){if(z.size()!==1){return false
}return nf.CanvasUtils.isProcessGroup(z)
};
var y=function(z){if(z.size()!==1){return false
}return nf.CanvasUtils.isRemoteProcessGroup(z)
};
var q=function(z){return nf.Common.isDFM()&&nf.CanvasUtils.canAllStartTransmitting(z)
};
var k=function(z){return nf.Common.isDFM()&&nf.CanvasUtils.canAllStopTransmitting(z)
};
var i=function(z,B){if(typeof B.click==="function"){var A=$('<div class="context-menu-item"></div>').on("click",B.click).on("contextmenu",function(C){B.click(C);
C.preventDefault();
C.stopPropagation()
}).on("mouseenter",function(){$(this).addClass("hover")
}).on("mouseleave",function(){$(this).removeClass("hover")
}).appendTo(z);
$('<img class="context-menu-item-img"></img>').attr("src",B.img).appendTo(A);
$('<div class="context-menu-item-text"></div>').text(B.text).appendTo(A);
$('<div class="clear"></div>').appendTo(A)
}};
var r=function(A,z){A.css({left:z.x+"px",top:z.y+"px"}).show()
};
var o=function(B,A,z){nf.Actions[B](A,z);
nf.ContextMenu.hide()
};
var h=[{condition:l,menuItem:{img:"images/iconRefresh.png",text:"Refresh status",action:"reloadStatus"}},{condition:j,menuItem:{img:"images/iconGoTo.png",text:"Leave group",action:"leaveGroup"}},{condition:t,menuItem:{img:"images/iconConfigure.png",text:"Configure",action:"showConfiguration"}},{condition:a,menuItem:{img:"images/iconConfigure.png",text:"View configuration",action:"showDetails"}},{condition:m,menuItem:{img:"images/iconGoTo.png",text:"Enter group",action:"enterGroup"}},{condition:f,menuItem:{img:"images/iconRun.png",text:"Start",action:"start"}},{condition:b,menuItem:{img:"images/iconStop.png",text:"Stop",action:"stop"}},{condition:y,menuItem:{img:"images/iconRemotePorts.png",text:"Remote ports",action:"remotePorts"}},{condition:q,menuItem:{img:"images/iconTransmissionActive.png",text:"Enable transmission",action:"enableTransmission"}},{condition:k,menuItem:{img:"images/iconTransmissionInactive.png",text:"Disable transmission",action:"disableTransmission"}},{condition:u,menuItem:{img:"images/iconChart.png",text:"Stats",action:"showStats"}},{condition:d,menuItem:{img:"images/iconToFront.png",text:"Bring to front",action:"toFront"}},{condition:v,menuItem:{img:"images/iconGoTo.png",text:"Go to source",action:"showSource"}},{condition:v,menuItem:{img:"images/iconGoTo.png",text:"Go to destination",action:"showDestination"}},{condition:w,menuItem:{img:"images/iconSmallRelationship.png",text:"Upstream connections",action:"showUpstream"}},{condition:x,menuItem:{img:"images/iconSmallRelationship.png",text:"Downstream connections",action:"showDownstream"}},{condition:g,menuItem:{img:"images/iconUsage.png",text:"Usage",action:"showUsage"}},{condition:y,menuItem:{img:"images/iconRefresh.png",text:"Refresh flow",action:"refreshRemoteFlow"}},{condition:y,menuItem:{img:"images/iconGoTo.png",text:"Go to",action:"openUri"}},{condition:n,menuItem:{img:"images/iconColor.png",text:"Change color",action:"fillColor"}},{condition:p,menuItem:{img:"images/iconCenterView.png",text:"Center in view",action:"center"}},{condition:e,menuItem:{img:"images/iconCopy.png",text:"Copy",action:"copy"}},{condition:s,menuItem:{img:"images/iconPaste.png",text:"Paste",action:"paste"}},{condition:c,menuItem:{img:"images/iconDelete.png",text:"Delete",action:"delete"}}];
var r=function(A,z){A.css({left:z.x+"px",top:z.y+"px"}).show()
};
return{init:function(){$("#context-menu").on("contextmenu",function(z){z.preventDefault();
z.stopPropagation()
})
},show:function(){var C=$("#canvas-body").get(0);
var A=$("#context-menu").empty();
var B=nf.CanvasUtils.getSelection();
$.each(h,function(D,F){if(F.condition(B)){var E=F.menuItem;
i(A,{img:E.img,text:E.text,click:function(G){o(E.action,B,G)
}})
}});
var z=d3.mouse(C);
r(A,{x:z[0],y:z[1]})
},hide:function(){$("#context-menu").hide()
},activate:function(z){z.on("contextmenu.selection",function(){nf.ContextMenu.show();
d3.event.preventDefault();
d3.event.stopPropagation()
})
}}
}());
nf.StatusHistory=(function(){var r={clusterInstanceId:"cluster-instance-id",clusterInstanceLabel:"Cluster",type:{processor:"Processor",inputPort:"Input Port",outputPort:"Output Port",processGroup:"Process Group",remoteProcessGroup:"Remote Process Group",connection:"Connection",funnel:"Funnel",template:"Template",label:"Label"},urls:{processGroups:"../nifi-api/controller/process-groups/",clusterProcessor:"../nifi-api/cluster/processors/",clusterProcessGroup:"../nifi-api/cluster/process-groups/",clusterRemoteProcessGroup:"../nifi-api/cluster/remote-process-groups/",clusterConnection:"../nifi-api/cluster/connections/"}};
var p={DURATION:function(s){return nf.Common.formatDuration(s)
},COUNT:function(s){if(s%1===0){return nf.Common.formatInteger(s)
}else{return nf.Common.formatFloat(s)
}},DATA_SIZE:function(s){return nf.Common.formatDataSize(s)
}};
var h=null;
var i=null;
var l=null;
var a=null;
var c=function(u,z,y,t,x){$("#status-history-last-refreshed").text(y.generated);
var s={groupId:u,id:z,type:t,clustered:true,instances:[]};
var v=null;
var w=y.clusterStatusHistory;
if(w.statusSnapshots.length>1){if(v===null){v=w.fieldDescriptors;
s.details=w.details;
s.selectedDescriptor=nf.Common.isUndefined(x)?v[0]:x
}s.instances.push({id:r.clusterInstanceId,label:r.clusterInstanceLabel,snapshots:w.statusSnapshots})
}$.each(y.nodeStatusHistory,function(C,B){var D=B.node;
var A=B.statusHistory;
if(A.statusSnapshots.length>1){if(v===null){v=A.fieldDescriptors;
s.details=A.details;
s.selectedDescriptor=nf.Common.isUndefined(x)?v[0]:x
}s.instances.push({id:D.nodeId,label:D.address+":"+D.apiPort,snapshots:A.statusSnapshots})
}});
if(s.instances.length>0){$("#status-history-dialog").data("status-history",s);
m(s,v)
}else{e()
}};
var q=function(u,x,s,t,w){if(s.statusSnapshots.length>1){$("#status-history-last-refreshed").text(s.generated);
var v=s.fieldDescriptors;
var s={groupId:u,id:x,details:s.details,type:t,clustered:false,selectedDescriptor:nf.Common.isUndefined(w)?v[0]:w,instances:[{id:"",label:"",snapshots:s.statusSnapshots}]};
$("#status-history-dialog").data("status-history",s);
m(s,v);
return
}e()
};
var e=function(){nf.Dialog.showOkDialog({dialogContent:"Insufficient history, please try again later.",overlayBackground:false})
};
var m=function(s,t){if(a===null){a={}
}$.each(s.instances,function(v,u){u.snapshots.forEach(function(y){var x=new Date();
var w=x.getTimezoneOffset()*60*1000;
y.timestamp=new Date(y.timestamp+w+h)
})
});
f(t,s.selectedDescriptor)
};
var f=function(u,t){var s=[];
$.each(u,function(v,w){s.push({text:w.label,value:w.field,description:nf.Common.escapeHtml(w.description)})
});
$("#status-history-metric-combo").combo({selectedOption:{value:t.field},options:s,select:function(w){var x=null;
$.each(u,function(y,z){if(w.value===z.field){x=z;
return false
}});
if(x!==null){if(l===null||l.field!==x.field){i=null
}l=x;
var v=$("#status-history-dialog").data("status-history");
v.selectedDescriptor=x;
$("#status-history-dialog").data("status-history",v);
g(v)
}}})
};
var g=function(V){var ab=V.selectedDescriptor;
$("#status-history-details").empty();
var v=k("Status History");
d3.map(V.details).forEach(function(x,y){d(v,x,y)
});
var z={top:15,right:10,bottom:25,left:75};
var S=d3.scale.category10();
var u=[];
$.each(V.instances,function(y,x){u.push(x.label)
});
S.domain(u);
var al=[];
$.each(V.instances,function(y,x){if(nf.Common.isUndefinedOrNull(a[x.id])){a[x.id]=true
}al.push({id:x.id,label:x.label,values:$.map(x.snapshots,function(ao){return{timestamp:ao.timestamp,value:ao.statusMetrics[ab.field]}
}),visible:a[x.id]===true})
});
var J=d3.time.format.multi([[":%S.%L",function(x){return x.getMilliseconds()
}],[":%S",function(x){return x.getSeconds()
}],["%H:%M",function(x){return x.getMinutes()
}],["%H:%M",function(x){return x.getHours()
}],["%a %d",function(x){return x.getDay()&&x.getDate()!==1
}],["%b %d",function(x){return x.getDate()!==1
}],["%B",function(x){return x.getMonth()
}],["%Y",function(){return true
}]]);
var ac=$("#status-history-dialog");
if(!ac.is(":visible")){$("#glass-pane").show();
ac.center().show()
}var I=$("#status-history-chart-container").empty();
if(I.hasClass("ui-resizable")){I.resizable("destroy")
}var s=I.width()-z.left-z.right;
var t=I.height()-z.top-z.bottom;
var Z=d3.time.scale().range([0,s]);
var N=d3.svg.axis().scale(Z).ticks(5).tickFormat(J).orient("bottom");
var Y=d3.scale.linear().range([t,0]);
var A=d3.svg.axis().scale(Y).tickFormat(p[ab.formatter]).orient("left");
var B=d3.svg.line().interpolate("monotone").x(function(x){return Z(x.timestamp)
}).y(function(x){return Y(x.value)
});
var H=d3.select("#status-history-chart-container").append("svg").attr("style","pointer-events: none;").attr("width",s+z.left+z.right).attr("height",t+z.top+z.bottom);
var C=H.append("defs").append("clipPath").attr("id","clip").append("rect").attr("width",s).attr("height",t);
var an=H.append("g").attr("transform","translate("+z.left+", "+z.top+")");
var w=d3.min(al,function(x){return d3.min(x.values,function(y){return y.timestamp
})
});
var F=d3.max(al,function(x){return d3.max(x.values,function(y){return y.timestamp
})
});
d(v,"Start",nf.Common.formatDateTime(w));
d(v,"End",nf.Common.formatDateTime(F));
Z.domain([w,F]);
Y.domain([j(al),o(al)]);
an.append("g").attr("class","x axis").attr("transform","translate(0, "+t+")").call(N);
an.append("g").attr("class","y axis").call(A).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").attr("text-anchor","end").text(ab.label);
var W=an.selectAll(".status").data(al).enter().append("g").attr("clip-path","url(#clip)").attr("class","status");
W.append("path").attr("class",function(x){return"chart-line chart-line-"+x.id
}).attr("d",function(x){return B(x.values)
}).attr("stroke",function(x){return S(x.label)
}).classed("hidden",function(x){return x.visible===false
}).append("title").text(function(x){return x.label
});
W.each(function(x){var y=d3.select(this).append("g").attr("class",function(){return"mark-group mark-group-"+x.id
}).classed("hidden",function(ao){return ao.visible===false
});
y.selectAll("circle.mark").data(x.values).enter().append("circle").attr("style","pointer-events: all;").attr("class","mark").attr("cx",function(ao){return Z(ao.timestamp)
}).attr("cy",function(ao){return Y(ao.value)
}).attr("fill",function(){return S(x.label)
}).attr("r",1.5).append("title").text(function(ao){return x.label+" -- "+p[ab.formatter](ao.value)
})
});
var M=$("#status-history-chart-control-container").empty();
var L=M.height()-z.top-z.bottom;
var af=d3.time.scale().range([0,s]);
var E=d3.svg.axis().scale(af).ticks(5).tickFormat(J).orient("bottom");
var ai=d3.scale.linear().range([L,0]);
var ad=d3.svg.axis().scale(ai).tickValues(Y.domain()).tickFormat(p[ab.formatter]).orient("left");
var K=d3.svg.line().interpolate("monotone").x(function(x){return af(x.timestamp)
}).y(function(x){return ai(x.value)
});
var aa=d3.select("#status-history-chart-control-container").append("svg").attr("width",s+z.left+z.right).attr("height",L+z.top+z.bottom);
var Q=aa.append("g").attr("transform","translate("+z.left+", "+z.top+")");
var P=Y.domain();
P[1]*=1.04;
af.domain(Z.domain());
ai.domain(P);
Q.append("g").attr("class","x axis").attr("transform","translate(0, "+L+")").call(E);
Q.append("g").attr("class","y axis").call(ad);
var am=Q.selectAll(".status").data(al).enter().append("g").attr("class","status");
am.append("path").attr("class",function(x){return"chart-line chart-line-"+x.id
}).attr("d",function(x){return K(x.values)
}).attr("stroke",function(x){return S(x.label)
}).classed("hidden",function(x){return a[x.id]===false
}).append("title").text(function(x){return x.label
});
var ak=function(x,y){Z.domain(x);
Y.domain(y);
W.selectAll(".chart-line").attr("d",function(ao){return B(ao.values)
});
W.selectAll("circle.mark").attr("cx",function(ao){return Z(ao.timestamp)
}).attr("cy",function(ao){return Y(ao.value)
}).attr("r",function(){return ag.empty()?1.5:4
});
an.select(".x.axis").call(N);
an.select(".y.axis").call(A)
};
var D=function(){var y,x;
if(ag.empty()){var ap=$.grep(al,function(aq){return aq.visible
});
if(ap.length===0){x=ai.domain()
}else{x=[d3.min(ap,function(aq){return d3.min(aq.values,function(ar){return ar.value
})
}),d3.max(ap,function(aq){return d3.max(aq.values,function(ar){return ar.value
})
})]
}y=af.domain();
i=null
}else{var ao=ag.extent();
y=[ao[0][0],ao[1][0]];
x=[ao[0][1],ao[1][1]];
i=ao
}ak(y,x);
G()
};
var ag=d3.svg.brush().x(af).y(ai).on("brush",D);
if(nf.Common.isDefinedAndNotNull(i)){ag=ag.extent(i)
}Q.append("g").attr("class","brush").call(ag);
Q.select("rect.extent").attr("style","pointer-events: all;").on("dblclick",function(){if(!ag.empty()){var x=ag.extent();
var y=ai.domain();
ag.extent([[x[0][0],y[0]],[x[1][0],y[1]]]);
Q.select(".brush").call(ag);
D()
}});
var G=function(){var at=$.map(al,function(aC){var aA=Z.domain();
var aB=Y.domain();
var aD=$.extend({},aC);
return $.extend(aD,{values:$.grep(aC.values,function(aE){return aE.timestamp.getTime()>=aA[0].getTime()&&aE.timestamp.getTime()<=aA[1].getTime()&&aE.value>=aB[0]&&aE.value<=aB[1]
})})
});
if(V.clustered){var x=$.grep(at,function(aA){return aA.id!==r.clusterInstanceId&&aA.visible&&aA.values.length>0
});
var ar=x.length===0?"NA":p[ab.formatter](j(x));
var ap=x.length===0?"NA":p[ab.formatter](b(x));
var y=x.length===0?"NA":p[ab.formatter](o(x));
$("#node-aggregate-statistics").text(ar+" / "+y+" / "+ap);
var aw=$.grep(at,function(aA){return aA.id===r.clusterInstanceId&&aA.visible&&aA.values.length>0
});
var ay=aw.length===0?"NA":p[ab.formatter](j(aw));
var av=aw.length===0?"NA":p[ab.formatter](b(aw));
var ao=aw.length===0?"NA":p[ab.formatter](o(aw));
$("#cluster-aggregate-statistics").text(ay+" / "+ao+" / "+av)
}else{var ax=$.grep(at,function(aA){return aA.values.length>0
});
var au=ax.length===0?0:p[ab.formatter](j(ax));
var az=ax.length===0?0:p[ab.formatter](b(ax));
var aq=ax.length===0?0:p[ab.formatter](o(ax));
$("#instance-aggregate-statistics").text(au+" / "+aq+" / "+az)
}};
if(V.clustered){var X=$.grep(al,function(x){return x.id!==r.clusterInstanceId
}).sort(function(y,x){return y.label<x.label?-1:y.label>x.label?1:0
});
var aj=function(y,x){var ap=$("<div></div>").addClass("legend-label").css("color",S(x.label)).text(x.label).ellipsis();
var ao=$('<div class="nf-checkbox"></div>').on("click",function(){var aq=d3.selectAll("path.chart-line-"+x.id);
var at=d3.select("g.mark-group-"+x.id);
var ar=at.classed("hidden");
aq.classed("hidden",function(){return !ar
});
at.classed("hidden",function(){return !ar
});
x.visible=ar;
a[x.id]=x.visible;
D()
}).addClass(x.visible?"checkbox-checked":"checkbox-unchecked");
$('<div class="legend-entry"></div>').append(ao).append(ap).on("mouseenter",function(){d3.selectAll("path.chart-line-"+x.id).classed("over",true)
}).on("mouseleave",function(){d3.selectAll("path.chart-line-"+x.id).classed("over",false)
}).appendTo(y)
};
var U=$.grep(al,function(x){return x.id===r.clusterInstanceId
});
var ae=k("Cluster");
d(ae,"Min / Max / Mean","","cluster-aggregate-statistics");
aj(ae,U[0]);
if(X.length>0){var T=k("Nodes");
d(T,"Min / Max / Mean","","node-aggregate-statistics");
$.each(X,function(y,x){aj(T,x)
})
}}else{d(v,"Min / Max / Mean","","instance-aggregate-statistics")
}D();
var O,ah,R;
I.append('<div class="ui-resizable-handle ui-resizable-se"></div>').resizable({minWidth:425,minHeight:150,handles:{se:".ui-resizable-se"},start:function(ar,aq){var x=aq.helper.offset();
var ap=((ac.outerWidth()-ac.width())/2)+3;
var y=I.outerWidth()-I.width();
O=$(document).width()-x.left-ap-y;
var ao=$("#status-history-container").outerHeight(true)-$("#status-history-container").height();
ah=$(document).height()-x.top-ap-y-ao-M.outerHeight(true);
if(!ag.empty()){R=ag.extent()
}},resize:function(y,x){if(x.helper.width()>O){x.helper.width(O)
}if(x.helper.height()>ah){x.helper.height(ah)
}M.width(I.width());
n()
},stop:function(){n();
s=I.width()-z.left-z.right;
t=I.height()-z.top-z.bottom;
Z.range([0,s]);
Y.range([t,0]);
H.attr("width",s+z.left+z.right).attr("height",t+z.top+z.bottom);
C.attr("width",s).attr("height",t);
an.select(".x.axis").attr("transform","translate(0, "+t+")");
L=M.height()-z.top-z.bottom;
af.range([0,s]);
ai.range([L,0]);
aa.attr("width",s+z.left+z.right).attr("height",L+z.top+z.bottom);
am.selectAll(".chart-line").attr("d",function(x){return K(x.values)
});
Q.select(".x.axis").call(E);
Q.select(".y.axis").call(ad);
if(nf.Common.isDefinedAndNotNull(R)){ag.extent(R)
}Q.select(".brush").call(ag);
D();
R=null
}});
n()
};
var j=function(s){return d3.min(s,function(t){return d3.min(t.values,function(u){return u.value
})
})
};
var o=function(s){return d3.max(s,function(t){return d3.max(t.values,function(u){return u.value
})
})
};
var b=function(t){var u=0;
var s=d3.sum(t,function(v){u+=v.values.length;
return d3.sum(v.values,function(w){return w.value
})
});
return s/u
};
var n=function(){var s=$("#status-history-details");
var t=s.outerWidth()-s.width();
$("#status-history-details").height($("#status-history-container").height()-t)
};
var k=function(t){var s=$('<div class="status-history-detail"></div>').appendTo("#status-history-details");
$('<div class="detail-container-label"></div>').text(t).appendTo(s);
return $("<div></div>").appendTo(s)
};
var d=function(t,v,w,x){var u=$('<div class="detail-item"></div>').appendTo(t);
$('<div class="detail-item-label"></div>').text(v).appendTo(u);
var s=$('<div class="detail-item-value"></div>').text(w).appendTo(u);
if(nf.Common.isDefinedAndNotNull(x)){s.attr("id",x)
}};
return{init:function(s){h=s;
nf.Common.addHoverEffect("#status-history-refresh-button","button-refresh","button-refresh-hover").click(function(){var t=$("#status-history-dialog").data("status-history");
if(t!==null){if(t.type===r.type.processor){if(t.clustered===true){nf.StatusHistory.showClusterProcessorChart(t.groupId,t.id,t.selectedDescriptor)
}else{nf.StatusHistory.showStandaloneProcessorChart(t.groupId,t.id,t.selectedDescriptor)
}}else{if(t.type===r.type.processGroup){if(t.clustered===true){nf.StatusHistory.showClusterProcessGroupChart(t.groupId,t.id,t.selectedDescriptor)
}else{nf.StatusHistory.showStandaloneProcessGroupChart(t.groupId,t.id,t.selectedDescriptor)
}}else{if(t.type===r.type.remoteProcessGroup){if(t.clustered===true){nf.StatusHistory.showClusterRemoteProcessGroupChart(t.groupId,t.id,t.selectedDescriptor)
}else{nf.StatusHistory.showStandaloneRemoteProcessGroupChart(t.groupId,t.id,t.selectedDescriptor)
}}else{if(t.clustered===true){nf.StatusHistory.showClusterConnectionChart(t.groupId,t.id,t.selectedDescriptor)
}else{nf.StatusHistory.showStandaloneConnectionChart(t.groupId,t.id,t.selectedDescriptor)
}}}}}});
$("#status-history-dialog").draggable({cancel:"#status-history-chart-container, #status-history-chart-control-container, #status-history-details, div.detail-item-value",containment:"parent"}).on("click","#status-history-close",function(){$("#status-history-dialog").removeData("status-history").hide();
$("#glass-pane").hide();
$("#status-history-chart-container").empty();
$("#status-history-chart-control-container").empty();
$("#status-history-details").empty();
i=null;
l=null;
a=null
})
},showClusterConnectionChart:function(s,t,u){$.ajax({type:"GET",url:r.urls.clusterConnection+encodeURIComponent(t)+"/status/history",dataType:"json"}).done(function(v){c(s,t,v.clusterStatusHistory,r.type.connection,u)
}).fail(nf.Common.handleAjaxError)
},showClusterProcessorChart:function(s,u,t){$.ajax({type:"GET",url:r.urls.clusterProcessor+encodeURIComponent(u)+"/status/history",dataType:"json"}).done(function(v){c(s,u,v.clusterStatusHistory,r.type.processor,t)
}).fail(nf.Common.handleAjaxError)
},showClusterProcessGroupChart:function(t,s,u){$.ajax({type:"GET",url:r.urls.clusterProcessGroup+encodeURIComponent(s)+"/status/history",dataType:"json"}).done(function(v){c(t,s,v.clusterStatusHistory,r.type.processGroup,u)
}).fail(nf.Common.handleAjaxError)
},showClusterRemoteProcessGroupChart:function(t,s,u){$.ajax({type:"GET",url:r.urls.clusterRemoteProcessGroup+encodeURIComponent(s)+"/status/history",dataType:"json"}).done(function(v){c(t,s,v.clusterStatusHistory,r.type.remoteProcessGroup,u)
}).fail(nf.Common.handleAjaxError)
},showStandaloneConnectionChart:function(s,t,u){$.ajax({type:"GET",url:r.urls.processGroups+encodeURIComponent(s)+"/connections/"+encodeURIComponent(t)+"/status/history",dataType:"json"}).done(function(v){q(s,t,v.statusHistory,r.type.connection,u)
}).fail(nf.Common.handleAjaxError)
},showStandaloneProcessorChart:function(s,u,t){$.ajax({type:"GET",url:r.urls.processGroups+encodeURIComponent(s)+"/processors/"+encodeURIComponent(u)+"/status/history",dataType:"json"}).done(function(v){q(s,u,v.statusHistory,r.type.processor,t)
}).fail(nf.Common.handleAjaxError)
},showStandaloneProcessGroupChart:function(t,s,u){$.ajax({type:"GET",url:r.urls.processGroups+encodeURIComponent(s)+"/status/history",dataType:"json"}).done(function(v){q(t,s,v.statusHistory,r.type.processGroup,u)
}).fail(nf.Common.handleAjaxError)
},showStandaloneRemoteProcessGroupChart:function(t,s,u){$.ajax({type:"GET",url:r.urls.processGroups+encodeURIComponent(t)+"/remote-process-groups/"+encodeURIComponent(s)+"/status/history",dataType:"json"}).done(function(v){q(t,s,v.statusHistory,r.type.remoteProcessGroup,u)
}).fail(nf.Common.handleAjaxError)
}}
}());
$(document).ready(function(){if(nf.Canvas.SUPPORTS_SVG){nf.Canvas.init()
}else{$("#message-title").text("Unsupported Browser");
$("#message-content").text("Flow graphs are shown using SVG. Please use a browser that supports rendering SVG.");
$("#message-pane").show();
nf.Canvas.hideSplash()
}});
nf.Canvas=(function(){var p=1;
var h=[0,0];
var w=1.2;
var D=8;
var s=0.2;
var d=0.6;
var t=false;
var g=false;
var k="root";
var n=null;
var q=null;
var j=false;
var b=false;
var r=null;
var f=null;
var u=false;
var i=false;
var C={urls:{authorities:"../nifi-api/controller/authorities",revision:"../nifi-api/controller/revision",status:"../nifi-api/controller/status",bulletinBoard:"../nifi-api/controller/bulletin-board",banners:"../nifi-api/controller/banners",controller:"../nifi-api/controller",controllerConfig:"../nifi-api/controller/config",cluster:"../nifi-api/cluster",d3Script:"js/d3/d3.min.js"}};
var A=function(F){var E=$('<span class="link"></span>').text(F.name).click(function(){nf.CanvasUtils.enterGroup(F.id)
});
if(nf.Canvas.getGroupId()===F.id){E.css("font-weight","bold")
}if(nf.Common.isDefinedAndNotNull(F.parent)){var G=$("<span>&raquo;</span>").css({color:"#598599",margin:"0 10px"});
$("#data-flow-title-container").append(A(F.parent)).append(G)
}$("#data-flow-title-container").append(E);
return E
};
var o=function(){return nf.Common.cachedScript(C.urls.d3Script)
};
var m=function(E){t=true;
B(E)
};
var B=function(E){if(t){y().done(function(){setTimeout(function(){B(E)
},E*1000)
})
}};
var a=function(E){g=true;
z(E)
};
var z=function(E){if(g){nf.Canvas.reloadStatus().done(function(){setTimeout(function(){z(E)
},E*1000)
})
}};
var y=function(){return $.ajax({type:"GET",url:C.urls.revision,dataType:"json"}).done(function(E){if(nf.Common.isDefinedAndNotNull(E.revision)){var F=E.revision;
var H=nf.Client.getRevision();
if(F.version>H.version&&F.clientId!==H.clientId){var G=$("#refresh-required-container");
if(!G.is(":visible")){$("#stats-last-refreshed").addClass("alert");
G.show()
}}}}).fail(nf.Common.handleAjaxError)
};
var l=function(){var K=$("#canvas-container");
r=d3.select("#canvas-container").append("svg").on("contextmenu",function(){u=false;
nf.CanvasUtils.getSelection().classed("selected",false);
nf.ContextMenu.show();
d3.event.preventDefault()
});
var E=r.append("defs");
E.selectAll("marker").data(["normal","ghost"]).enter().append("marker").attr({id:function(L){return L
},viewBox:"0 0 6 6",refX:5,refY:3,markerWidth:6,markerHeight:6,orient:"auto",fill:function(L){if(L==="ghost"){return"#aaaaaa"
}else{return"#000000"
}}}).append("path").attr("d","M2,3 L0,6 L6,3 L0,0 z");
var H=E.append("linearGradient").attr({id:"process-group-stats-background",x1:"0%",y1:"100%",x2:"0%",y2:"0%"});
H.append("stop").attr({offset:"0%","stop-color":"#dedede"});
H.append("stop").attr({offset:"50%","stop-color":"#ffffff"});
H.append("stop").attr({offset:"100%","stop-color":"#dedede"});
var I=E.append("linearGradient").attr({id:"processor-stats-background",x1:"0%",y1:"100%",x2:"0%",y2:"0%"});
I.append("stop").attr({offset:"0%","stop-color":"#6f97ac"});
I.append("stop").attr({offset:"100%","stop-color":"#30505c"});
var J=E.append("linearGradient").attr({id:"port-background",x1:"0%",y1:"100%",x2:"0%",y2:"0%"});
J.append("stop").attr({offset:"0%","stop-color":"#aaaaaa"});
J.append("stop").attr({offset:"100%","stop-color":"#ffffff"});
var G=E.append("linearGradient").attr({id:"expiration",x1:"0%",y1:"0%",x2:"0%",y2:"100%"});
G.append("stop").attr({offset:"0%","stop-color":"#aeafb1"});
G.append("stop").attr({offset:"100%","stop-color":"#87888a"});
f=r.append("g").attr({transform:"translate("+h+") scale("+p+")","pointer-events":"all",id:"canvas"});
r.on("mousedown.selection",function(){u=true;
if(d3.event.button!==0){d3.event.stopImmediatePropagation();
return
}if(d3.event.shiftKey){var L=d3.mouse(f.node());
f.append("rect").attr("rx",6).attr("ry",6).attr("x",L[0]).attr("y",L[1]).attr("class","selection").attr("width",0).attr("height",0).attr("stroke-width",function(){return 1/nf.Canvas.View.scale()
}).attr("stroke-dasharray",function(){return 4/nf.Canvas.View.scale()
}).datum(L);
d3.event.stopImmediatePropagation();
d3.event.preventDefault()
}}).on("mousemove.selection",function(){if(d3.event.shiftKey){var M=d3.select("rect.selection");
if(!M.empty()){var N=M.datum();
var L=d3.mouse(f.node());
var O={};
if(N[0]<L[0]){O.x=N[0];
O.width=L[0]-N[0]
}else{O.x=L[0];
O.width=N[0]-L[0]
}if(N[1]<L[1]){O.y=N[1];
O.height=L[1]-N[1]
}else{O.y=L[1];
O.height=N[1]-L[1]
}M.attr(O)
}d3.event.stopPropagation()
}}).on("mouseup.selection",function(){if(u===false){return
}u=false;
var L=d3.select("rect.selection");
if(!L.empty()){var M={x:parseInt(L.attr("x"),10),y:parseInt(L.attr("y"),10),width:parseInt(L.attr("width"),10),height:parseInt(L.attr("height"),10)};
d3.selectAll("g.component").classed("selected",function(N){return d3.select(this).classed("selected")||N.component.position.x>=M.x&&(N.component.position.x+N.dimensions.width)<=(M.x+M.width)&&N.component.position.y>=M.y&&(N.component.position.y+N.dimensions.height)<=(M.y+M.height)
});
d3.selectAll("g.connection").classed("selected",function(P){var O=[P.start].concat(P.bends,[P.end]);
var N=d3.extent(O,function(R){return R.x
});
var Q=d3.extent(O,function(R){return R.y
});
return d3.select(this).classed("selected")||N[0]>=M.x&&N[1]<=(M.x+M.width)&&Q[0]>=M.y&&Q[1]<=(M.y+M.height)
});
L.remove()
}else{if(i===false){nf.CanvasUtils.getSelection().classed("selected",false)
}}nf.CanvasToolbar.refresh()
});
var F=function(){var P=$("#banner-footer");
var L=0;
if(P.is(":visible")){L=P.height()
}var N=parseInt(K.css("top"),10);
var O=$(window).height();
var M=(O-(L+N));
K.css({height:M+"px",bottom:L+"px"});
r.attr({height:K.height(),width:K.width()});
$("#canvas-body").css({height:O+"px",width:$(window).width()+"px"})
};
$(window).on("resize",function(){F()
}).on("keydown",function(L){if($(".dialog").is(":visible")){return
}if(L.ctrlKey||L.metaKey){if(L.keyCode===82){nf.Actions.reloadStatus();
L.preventDefault()
}else{if(L.keyCode===65){nf.Actions.selectAll();
nf.CanvasToolbar.refresh();
L.preventDefault()
}else{if(L.keyCode===67){nf.Actions.copy(nf.CanvasUtils.getSelection());
L.preventDefault()
}else{if(L.keyCode===86){nf.Actions.paste();
L.preventDefault()
}}}}}else{if(L.keyCode===46){nf.Actions["delete"](nf.CanvasUtils.getSelection());
L.preventDefault()
}else{if(L.keyCode===27){nf.Actions.hideDialogs();
L.preventDefault()
}}}});
$.ajax({type:"GET",url:C.urls.banners,dataType:"json"}).done(function(N){if(nf.Common.isDefinedAndNotNull(N.banners)){if(nf.Common.isDefinedAndNotNull(N.banners.headerText)&&N.banners.headerText!==""){$("#banner-header").addClass("banner-header-background").text(N.banners.headerText)
}if(nf.Common.isDefinedAndNotNull(N.banners.footerText)&&N.banners.footerText!==""){var L=$("#banner-footer").text(N.banners.footerText).show();
var M=function(O){var P=$("#"+O);
P.css("bottom",parseInt(L.css("height"),10)+"px")
};
M("graph")
}}F()
}).fail(nf.Common.handleAjaxError)
};
var c=function(F,H){var E=d3.select("defs");
var G=E.selectAll("linearGradient."+H+"-background").data(F,function(J){return J
});
var I=G.enter().append("linearGradient").attr({id:function(J){return H+"-background-"+J
},"class":H+"-background",x1:"0%",y1:"100%",x2:"0%",y2:"0%"});
I.append("stop").attr({offset:"0%","stop-color":function(J){return"#"+J
}});
I.append("stop").attr({offset:"100%","stop-color":"#ffffff"});
G.exit().remove()
};
var e=function(){return $.ajax({type:"GET",url:C.urls.status,dataType:"json"}).done(function(G){if(nf.Common.isDefinedAndNotNull(G.controllerStatus)){var E=G.controllerStatus;
$("#active-thread-count").text(E.activeThreadCount);
$("#total-queued").text(E.queued);
if(nf.Common.isDefinedAndNotNull(E.connectedNodes)){var F=E.connectedNodes.split(" / ");
if(F.length===2&&F[0]!==F[1]){$("#connected-nodes-count").addClass("alert")
}else{$("#connected-nodes-count").removeClass("alert")
}$("#connected-nodes-count").text(E.connectedNodes)
}if(nf.Common.isDefinedAndNotNull(E.activeRemotePortCount)){$("#controller-transmitting-count").text(E.activeRemotePortCount)
}else{$("#controller-transmitting-count").text("-")
}if(nf.Common.isDefinedAndNotNull(E.inactiveRemotePortCount)){$("#controller-not-transmitting-count").text(E.inactiveRemotePortCount)
}else{$("#controller-not-transmitting-count").text("-")
}if(nf.Common.isDefinedAndNotNull(E.runningCount)){$("#controller-running-count").text(E.runningCount)
}else{$("#controller-running-count").text("-")
}if(nf.Common.isDefinedAndNotNull(E.stoppedCount)){$("#controller-stopped-count").text(E.stoppedCount)
}else{$("#controller-stopped-count").text("-")
}if(nf.Common.isDefinedAndNotNull(E.invalidCount)){$("#controller-invalid-count").text(E.invalidCount)
}else{$("#controller-invalid-count").text("-")
}if(nf.Common.isDefinedAndNotNull(E.disabledCount)){$("#controller-disabled-count").text(E.disabledCount)
}else{$("#controller-disabled-count").text("-")
}var I=$("#controller-bulletins");
var K=I.data("bulletins");
if(nf.Common.doBulletinsDiffer(K,E.bulletins)){I.data("bulletins",E.bulletins);
var J=nf.Common.getFormattedBulletins(E.bulletins);
if(J.length===0){if(I.data("qtip")){I.removeClass("has-bulletins").qtip("destroy")
}I.hide()
}else{var H=nf.Common.formatUnorderedList(J);
if(I.data("qtip")){I.qtip("option","content.text",H)
}else{I.addClass("has-bulletins").qtip($.extend({content:H},nf.CanvasUtils.config.systemTooltipConfig))
}I.show()
}}if(E.hasPendingAccounts===true){$("#has-pending-accounts").show()
}else{$("#has-pending-accounts").hide()
}}}).fail(nf.Common.handleAjaxError)
};
var v=function(E){return $.ajax({type:"GET",url:C.urls.controller+"/process-groups/"+encodeURIComponent(E),data:{verbose:true},dataType:"json"}).done(function(F){nf.Client.setRevision(F.revision);
var G=F.processGroup;
nf.Canvas.setGroupId(G.id);
nf.Canvas.setGroupName(G.name);
$("#data-flow-title-container").empty();
A(G);
if(nf.Common.isDefinedAndNotNull(G.parent)){nf.Canvas.setParentGroupId(G.parent.id)
}else{nf.Canvas.setParentGroupId(null)
}nf.Graph.removeAll();
nf.Graph.add(G.contents,false);
nf.CanvasToolbar.refresh()
}).fail(nf.Common.handleAjaxError)
};
var x=function(E){return $.Deferred(function(F){$.ajax({type:"GET",url:C.urls.controller+"/process-groups/"+encodeURIComponent(E)+"/status",data:{recursive:false},dataType:"json"}).done(function(G){if(nf.Common.isDefinedAndNotNull(G.processGroupStatus)){var H=G.processGroupStatus;
nf.Graph.setStatus(H);
$("#stats-last-refreshed").text(H.statsLastRefreshed)
}F.resolve()
}).fail(function(I,G,H){if(!nf.Canvas.isClustered()||I.status!==404){nf.Common.handleAjaxError(I,G,H);
F.reject()
}else{F.resolve()
}})
}).promise()
};
return{CANVAS_OFFSET:0,SUPPORTS_SVG:!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,hideSplash:function(){$("#splash").fadeOut()
},stopRevisionPolling:function(){t=false
},stopStatusPolling:function(){g=false
},reload:function(){return $.Deferred(function(F){nf.ContextMenu.hide();
var E=v(nf.Canvas.getGroupId());
var G=e();
$.when(E,G).done(function(J){var N=$("#data-flow-title-container");
var H=N.position();
var P=N.outerWidth();
var K=H.left+P;
var O=$("#breadcrumbs-right-border").width();
var M=$("#data-flow-title-viewport");
var L=M.width();
var I=L-O;
if(K>I){N.css("left",(H.left-(K-I))+"px")
}else{N.css("left","10px")
}x(nf.Canvas.getGroupId()).done(function(){F.resolve(J)
}).fail(function(){F.reject()
})
})
}).promise()
},reloadStatus:function(){return $.Deferred(function(E){$.when(x(nf.Canvas.getGroupId()),e()).done(function(){E.resolve()
}).fail(function(){E.reject()
})
}).promise()
},init:function(){nf.Registration.init();
var G=$.ajax({type:"GET",url:C.urls.controllerConfig,dataType:"json"});
var E=$.Deferred(function(H){$.ajax({type:"HEAD",url:C.urls.cluster}).done(function(J,I,K){b=true;
H.resolve(J,I,K)
}).fail(function(K,I,J){if(K.status===404){b=false;
H.resolve("","success",K)
}else{H.reject(K,I,J)
}})
}).promise();
var F=$.ajax({type:"GET",url:C.urls.authorities,dataType:"json"});
$.when(F,G).done(function(M,I){var L=M[0];
var J=I[0];
nf.Common.setAuthorities(L.authorities);
var K=$("#canvas-container");
nf.Canvas.CANVAS_OFFSET=K.offset().top;
var H=J.config;
E.done(function(){var N=parseInt(H.autoRefreshIntervalSeconds,10);
j=H.siteToSiteSecure;
o().done(function(){nf.Storage.init();
l();
nf.Canvas.View.init();
nf.ContextMenu.init();
nf.CanvasHeader.init();
nf.CanvasToolbox.init();
nf.CanvasToolbar.init();
nf.GraphControl.init();
nf.Search.init();
nf.Settings.init();
nf.Draggable.init();
nf.Selectable.init();
nf.Connectable.init();
nf.StatusHistory.init(H.timeOffset);
nf.Birdseye.init();
nf.ConnectionConfiguration.init();
nf.ProcessorConfiguration.init();
nf.ProcessGroupConfiguration.init();
nf.RemoteProcessGroupConfiguration.init();
nf.RemoteProcessGroupPorts.init();
nf.PortConfiguration.init();
nf.SecurePortConfiguration.init();
nf.LabelConfiguration.init();
nf.ProcessorDetails.init();
nf.ProcessGroupDetails.init();
nf.PortDetails.init();
nf.SecurePortDetails.init();
nf.ConnectionDetails.init();
nf.RemoteProcessGroupDetails.init();
nf.GoTo.init();
nf.Graph.init().done(function(){var O=N/2;
m(N);
setTimeout(function(){a(N)
},O*1000);
nf.Canvas.hideSplash()
}).fail(nf.Common.handleAjaxError)
}).fail(nf.Common.handleAjaxError)
}).fail(nf.Common.handleAjaxError)
}).fail(nf.Common.handleAjaxError)
},defineProcessorColors:function(E){c(E,"processor")
},defineLabelColors:function(E){c(E,"label")
},isClustered:function(){return b===true
},isSecureSiteToSite:function(){return j
},setGroupId:function(E){k=E
},getGroupId:function(){return k
},setGroupName:function(E){n=E
},getGroupName:function(){return n
},setParentGroupId:function(E){q=E
},getParentGroupId:function(){return q
},View:(function(){var F=function(){var O=$("#canvas-container");
var J=nf.Canvas.View.translate();
var K=nf.Canvas.View.scale();
J=[J[0]/K,J[1]/K];
var G=O.width()/K;
var H=O.height()/K;
var L=-J[0]-G;
var I=-J[1]-H;
var Q=L+(G*3);
var S=I+(H*3);
var N=function(X){if(!nf.Canvas.View.shouldRenderPerScale()){return false
}var W=X.component.position.x;
var V=X.component.position.y;
var U=W+X.dimensions.width;
var T=V+X.dimensions.height;
return L<U&&Q>W&&I<T&&S>V
};
var P=function(V){if(!nf.Canvas.View.shouldRenderPerScale()){return false
}var T,W;
if(V.bends.length>0){var U=Math.min(Math.max(0,V.labelIndex),V.bends.length-1);
T=V.bends[U].x;
W=V.bends[U].y
}else{T=(V.start.x+V.end.x)/2;
W=(V.start.y+V.end.y)/2
}return L<T&&Q>T&&I<W&&S>W
};
var M=function(X,T){var V=d3.select("#id-"+X.component.id);
var W=T(X);
var U=V.classed("visible");
V.classed("visible",W).classed("entering",function(){return W&&!U
}).classed("leaving",function(){return !W&&U
})
};
var R=nf.Graph.get();
$.each(R.processors,function(T,U){M(U,N)
});
$.each(R.ports,function(T,U){M(U,N)
});
$.each(R.processGroups,function(T,U){M(U,N)
});
$.each(R.remoteProcessGroups,function(T,U){M(U,N)
});
$.each(R.connections,function(T,U){M(U,P)
})
};
var E;
return{init:function(){var G;
var H=false;
E=d3.behavior.zoom().scaleExtent([s,D]).translate(h).scale(p).on("zoomstart",function(){nf.ContextMenu.hide()
}).on("zoom",function(){if(H){i=true
}else{H=true
}var I=d3.event.sourceEvent.type==="wheel"||d3.event.sourceEvent.type==="mousewheel";
G=nf.Canvas.View.refresh({persist:false,transition:I,refreshComponents:false,refreshBirdseye:false})
}).on("zoomend",function(){if(nf.Common.isDefinedAndNotNull(G)){nf.Canvas.View.updateVisibility();
G.done(function(){nf.Birdseye.refresh()
});
nf.CanvasUtils.persistUserView();
G=null
}i=false;
H=false
});
r.call(E).on("dblclick.zoom",null)
},shouldRenderPerScale:function(){return nf.Canvas.View.scale()>=d
},updateVisibility:function(){F();
nf.Graph.pan()
},translate:function(G){if(nf.Common.isUndefined(G)){return E.translate()
}else{E.translate(G)
}},scale:function(G){if(nf.Common.isUndefined(G)){return E.scale()
}else{E.scale(G)
}},zoomIn:function(){var I=nf.Canvas.View.translate();
var H=nf.Canvas.View.scale();
var L=Math.min(H*w,D);
var K=$("#canvas-container");
var G=K.width()/H;
var J=K.height()/H;
nf.Canvas.View.scale(L);
nf.CanvasUtils.centerBoundingBox({x:(G/2)-(I[0]/H),y:(J/2)-(I[1]/H),width:1,height:1})
},zoomOut:function(){var I=nf.Canvas.View.translate();
var H=nf.Canvas.View.scale();
var L=Math.max(H/w,s);
var K=$("#canvas-container");
var G=K.width()/H;
var J=K.height()/H;
nf.Canvas.View.scale(L);
nf.CanvasUtils.centerBoundingBox({x:(G/2)-(I[0]/H),y:(J/2)-(I[1]/H),width:1,height:1})
},fit:function(){var I=nf.Canvas.View.translate();
var K=nf.Canvas.View.scale();
var N;
var M=$("#canvas-container");
var J=M.width();
var L=M.height();
var P=d3.select("#canvas").node().getBoundingClientRect();
var Q=P.width/K;
var H=P.height/K;
var O=P.left/K;
var G=(P.top-nf.Canvas.CANVAS_OFFSET)/K;
if(Q>J||H>L){N=Math.min(J/Q,L/H);
N=Math.min(Math.max(N,s),D)
}else{N=1;
O-=100;
G-=50
}nf.Canvas.View.scale(N);
nf.CanvasUtils.centerBoundingBox({x:O-(I[0]/K),y:G-(I[1]/K),width:J/N,height:L/N})
},actualSize:function(){var L=nf.Canvas.View.translate();
var K=nf.Canvas.View.scale();
var H=nf.CanvasUtils.getSelection();
nf.Canvas.View.scale(1);
var I;
if(!H.empty()){var G=H.node().getBoundingClientRect();
I={x:(G.left/K)-(L[0]/K),y:((G.top-nf.Canvas.CANVAS_OFFSET)/K)-(L[1]/K),width:G.width/K,height:G.height/K}
}else{var N=$("#canvas-container");
var J=N.width()/K;
var M=N.height()/K;
I={x:(J/2)-(L[0]/K),y:(M/2)-(L[1]/K),width:1,height:1}
}nf.CanvasUtils.centerBoundingBox(I)
},refresh:function(G){return $.Deferred(function(H){var I=true;
var K=false;
var J=true;
var L=true;
if(nf.Common.isDefinedAndNotNull(G)){I=nf.Common.isDefinedAndNotNull(G.persist)?G.persist:I;
K=nf.Common.isDefinedAndNotNull(G.transition)?G.transition:K;
J=nf.Common.isDefinedAndNotNull(G.refreshComponents)?G.refreshComponents:J;
L=nf.Common.isDefinedAndNotNull(G.refreshBirdseye)?G.refreshBirdseye:L
}if(J){nf.Canvas.View.updateVisibility()
}if(I===true){nf.CanvasUtils.persistUserView()
}if(K===true){f.transition().duration(500).attr("transform",function(){return"translate("+E.translate()+") scale("+E.scale()+")"
}).each("end",function(){if(L===true){nf.Birdseye.refresh()
}H.resolve()
})
}else{f.attr("transform",function(){return"translate("+E.translate()+") scale("+E.scale()+")"
});
if(L===true){nf.Birdseye.refresh()
}H.resolve()
}}).promise()
}}
}())}
}());
nf.Clipboard=(function(){var a="copy";
var d="paste";
var c=null;
var b={};
return{addListener:function(f,e){b[f]=e
},removeListener:function(e){if(nf.Common.isDefinedAndNotNull(b[e])){delete b[e]
}},copy:function(f){c=f;
for(var e in b){b[e].call(e,a,c)
}},isCopied:function(){return nf.Common.isDefinedAndNotNull(c)
},paste:function(){return $.Deferred(function(e){if(nf.Common.isDefinedAndNotNull(c)){var g=c;
e.resolve(g);
c=null;
for(var f in b){b[f].call(f,d,g)
}}else{e.reject()
}}).promise()
}}
}());
