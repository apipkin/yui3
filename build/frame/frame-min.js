YUI.add("frame",function(e,t){var n=e.Lang,r="contentready",i="host",s=function(){s.superclass.constructor.apply(this,arguments)};e.extend(s,e.Plugin.Base,{_ready:null,_rendered:null,_iframe:null,_instance:null,_create:function(t){var n,r="",i,o=this.get("src")===s.ATTRS.src.value,u=this.get("extracss")?'<style id="extra_css">'+this.get("extracss")+"</style>":"";this._iframe=e.one(e.config.doc.createElement("iframe")),this._iframe.setAttrs(s.IFRAME_ATTRS),this._iframe.setStyle("visibility","hidden"),this._iframe.set("src",this.get("src")),this.get("container").append(this._iframe),this._iframe.set("height","99%"),o&&(r=e.Lang.sub(s.PAGE_HTML,{DIR:this.get("dir"),LANG:this.get("lang"),TITLE:this.get("title"),META:s.META,LINKED_CSS:this.get("linkedcss"),CONTENT:this.get("content"),BASE_HREF:this.get("basehref"),DEFAULT_CSS:s.DEFAULT_CSS,EXTRA_CSS:u}),e.config.doc.compatMode!=="BackCompat"&&(r=s.getDocType()+"\n"+r)),n=this._resolveWinDoc(),r&&(n.doc.open(),n.doc.write(r),n.doc.close()),n.doc.documentElement?t(n):i=e.later(1,this,function(){n.doc&&n.doc.documentElement&&(t(n),i.cancel())},null,!0)},_resolveWinDoc:function(t){var n=t?t:{};return n.win=e.Node.getDOMNode(this._iframe.get("contentWindow")),n.doc=e.Node.getDOMNode(this._iframe.get("contentWindow.document")),n.doc||(n.doc=e.config.doc),n.win||(n.win=e.config.win),n},_onDomEvent:function(t){var n,r;if(!e.Node.getDOMNode(this._iframe))return;t.frameX=t.frameY=0,(t.pageX>0||t.pageY>0)&&t.type.substring(0,3)!=="key"&&(r=this._instance.one("win"),n=this._iframe.getXY(),t.frameX=n[0]+t.pageX-r.get("scrollLeft"),t.frameY=n[1]+t.pageY-r.get("scrollTop")),t.frameTarget=t.target,t.frameCurrentTarget=t.currentTarget,t.frameEvent=t,this.fire("dom:"+t.type,t)},initializer:function(){var e=this.get(i);e&&(e.frame=this),this.publish("ready",{emitFacade:!0,defaultFn:this._defReadyFn})},destructor:function(){var e=this.getInstance();e.one("doc").detachAll(),e=null,this._iframe.remove()},_DOMPaste:function(e){var t=this.getInstance(),n="",r=t.config.win;e._event.originalTarget&&(n=e._event.originalTarget),e._event.clipboardData&&(n=e._event.clipboardData.getData("Text")),r.clipboardData&&(n=r.clipboardData.getData("Text"),n===""&&(r.clipboardData.setData("Text",n)||(n=null))),e.frameTarget=e.target,e.frameCurrentTarget=e.currentTarget,e.frameEvent=e,n?e.clipboardData={data:n,getData:function(){return n}}:e.clipboardData=null,this.fire("dom:paste",e)},_defReadyFn:function(){var t=this.getInstance();e.each(s.DOM_EVENTS,function(n,r){var i=e.bind(this._onDomEvent,this),o=e.UA.ie&&s.THROTTLE_TIME>0?e.throttle(i,s.THROTTLE_TIME):i;t.Node.DOM_EVENTS[r]||(t.Node.DOM_EVENTS[r]=1),n===1&&r!=="focus"&&r!=="blur"&&r!=="paste"&&(r.substring(0,3)==="key"?t.on(r,o,t.config.doc):t.on(r,i,t.config.doc))},this),t.Node.DOM_EVENTS.paste=1,t.on("paste",e.bind(this._DOMPaste,this),t.one("body")),t.on("focus",e.bind(this._onDomEvent,this),t.config.win),t.on("blur",e.bind(this._onDomEvent,this),t.config.win),t.__use=t.use,t.use=e.bind(this.use,this),this._iframe.setStyles({visibility:"inherit"}),t.one("body").setStyle("display","block")},_fixIECursors:function(){var e=this.getInstance(),t=e.all("table"),n=e.all("br"),r;t.size()&&n.size()&&(r=t.item(0).get("sourceIndex"),n.each(function(t){var n=t.get("parentNode"),i=n.get("children"),s=n.all(">br");n.test("div")&&(i.size()>2?t.replace(e.Node.create("<wbr>")):t.get("sourceIndex")>r?s.size()&&t.replace(e.Node.create("<wbr>")):s.size()>1&&t.replace(e.Node.create("<wbr>")))}))},_onContentReady:function(t){if(!this._ready){this._ready=!0;var n=this.getInstance(),r=e.clone(this.get("use"));this.fire("contentready"),t&&(n.config.doc=e.Node.getDOMNode(t.target)),r.push(e.bind(function(){n.EditorSelection&&(n.EditorSelection.DEFAULT_BLOCK_TAG=this.get("defaultblock")),this.get("designMode")&&(e.UA.ie?(n.config.doc.body.contentEditable="true",this._ieSetBodyHeight(),n.on("keyup",e.bind(this._ieSetBodyHeight,this),n.config.doc)):n.config.doc.designMode="on"),this.fire("ready")},this)),n.use.apply(n,r),n.one("doc").get("documentElement").addClass("yui-js-enabled")}},_ieHeightCounter:null,_ieSetBodyHeight:function(t){this._ieHeightCounter||(this._ieHeightCounter=0),this._ieHeightCounter++;var n=!1,r,i,s;t||(n=!0);if(t){switch(t.keyCode){case 8:case 13:n=!0}if(t.ctrlKey||t.shiftKey)n=!0}if(n)try{r=this.getInstance(),i=this._iframe.get("offsetHeight"),s=r.config.doc.body.scrollHeight,i>s?(i=i-15+"px",r.config.doc.body.style.height=i):r.config.doc.body.style.height="auto"}catch(t){this._ieHeightCounter<100&&e.later(200,this,this._ieSetBodyHeight)}},_resolveBaseHref:function(t){if(!t||t==="")t=e.config.doc.location.href,t.indexOf("?")!==-1&&(t=t.substring(0,t.indexOf("?"))),t=t.substring(0,t.lastIndexOf("/"))+"/";return t},_getHTML:function(e){if(this._ready){var t=this.getInstance();e=t.one("body").get("innerHTML")}return e},_setHTML:function(t){if(this._ready){var n=this.getInstance();n.one("body").set("innerHTML",t)}else this.once(r,e.bind(this._setHTML,this,t));return t},_getLinkedCSS:function(t){e.Lang.isArray(t)||(t=[t]);var n="";return this._ready?n=t:e.each(t,function(e){e!==""&&(n+='<link rel="stylesheet" href="'+e+'" type="text/css">')}),n},_setLinkedCSS:function(e){if(this._ready){var t=this.getInstance();t.Get.css(e)}return e},_setExtraCSS:function(t){if(this._ready){var n=this.getInstance(),i=n.one("#extra_css");i.remove(),n.one("head").append('<style id="extra_css">'+t+"</style>")}else this.once(r,e.bind(this._setExtraCSS,this,t));return t},_instanceLoaded:function(t){this._instance=t,this._onContentReady();var n=this._instance.config.doc;if(this.get("designMode")&&!e.UA.ie)try{n.execCommand("styleWithCSS",!1,!1),n.execCommand("insertbronreturn",!1,!1)}catch(r){}},use:function(){var t=this.getInstance(),n=e.Array(arguments),r=!1;e.Lang.isFunction(n[n.length-1])&&(r=n.pop()),r&&n.push(function(){r.apply(t,arguments)}),t.__use.apply(t,n)},delegate:function(e,t,n,r){var i=this.getInstance();return i?(r||(r=n,n="body"),i.delegate
(e,t,n,r)):!1},getInstance:function(){return this._instance},render:function(t){return this._rendered?this:(this._rendered=!0,t&&this.set("container",t),this._create(e.bind(function(t){var n,r,s=e.bind(function(e){this._instanceLoaded(e)},this),o=e.clone(this.get("use")),u={debug:!1,win:t.win,doc:t.doc},a=e.bind(function(){u=this._resolveWinDoc(u),n=YUI(u),n.host=this.get(i);try{n.use("node-base",s),r&&clearInterval(r)}catch(e){r=setInterval(function(){a()},350)}},this);o.push(a),e.use.apply(e,o)},this)),this)},_handleFocus:function(){var e=this.getInstance(),t=new e.EditorSelection,n,r,i,s;t.anchorNode&&(n=t.anchorNode,n.test("p")&&n.get("innerHTML")===""&&(n=n.get("parentNode")),r=n.get("childNodes"),r.size()&&(r.item(0).test("br")?t.selectNode(n,!0,!1):r.item(0).test("p")?(n=r.item(0).one("br.yui-cursor"),n&&(n=n.get("parentNode")),n||(n=r.item(0).get("firstChild")),n||(n=r.item(0)),n&&t.selectNode(n,!0,!1)):(i=e.one("br.yui-cursor"),i&&(s=i.get("parentNode"),s&&t.selectNode(s,!0,!1)))))},_validateLinkedCSS:function(e){return n.isString(e)||n.isArray(e)},focus:function(t){if(e.UA.ie&&e.UA.ie<9){try{e.one("win").focus(),this.getInstance()&&this.getInstance().one("win")&&this.getInstance().one("win").focus()}catch(n){}t===!0&&this._handleFocus(),e.Lang.isFunction(t)&&t()}else try{e.one("win").focus(),e.later(100,this,function(){this.getInstance()&&this.getInstance().one("win")&&this.getInstance().one("win").focus(),t===!0&&this._handleFocus(),e.Lang.isFunction(t)&&t()})}catch(r){}return this},show:function(){this._iframe.setStyles({position:"static",left:""});if(e.UA.gecko){try{this.getInstance()&&(this.getInstance().config.doc.designMode="on")}catch(t){}this.focus()}return this},hide:function(){return this._iframe.setStyles({position:"absolute",left:"-999999px"}),this}},{THROTTLE_TIME:100,DOM_EVENTS:{dblclick:1,click:1,paste:1,mouseup:1,mousedown:1,keyup:1,keydown:1,keypress:1,activate:1,deactivate:1,beforedeactivate:1,focusin:1,focusout:1},DEFAULT_CSS:"body { background-color: #fff; font: 13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } img { cursor: pointer !important; border: none; }",IFRAME_ATTRS:{border:"0",frameBorder:"0",marginWidth:"0",marginHeight:"0",leftMargin:"0",topMargin:"0",allowTransparency:"true",width:"100%",height:"99%"},PAGE_HTML:'<html dir="{DIR}" lang="{LANG}"><head><title>{TITLE}</title>{META}<base href="{BASE_HREF}"/>{LINKED_CSS}<style id="editor_css">{DEFAULT_CSS}</style>{EXTRA_CSS}</head><body>{CONTENT}</body></html>',getDocType:function(){var t=e.config.doc.doctype,n=s.DOC_TYPE;return t?n="<!DOCTYPE "+t.name+(t.publicId?" "+t.publicId:"")+(t.systemId?" "+t.systemId:"")+">":e.config.doc.all&&(t=e.config.doc.all[0],t.nodeType&&t.nodeType===8&&t.nodeValue&&t.nodeValue.toLowerCase().indexOf("doctype")!==-1&&(n="<!"+t.nodeValue+">")),n},DOC_TYPE:'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',META:'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><meta http-equiv="X-UA-Compatible" content="IE=7">',NAME:"frame",NS:"frame",ATTRS:{title:{value:"Blank Page"},dir:{value:"ltr"},lang:{value:"en-US"},src:{value:"javascript"+(e.UA.ie?":false":":")+";"},designMode:{writeOnce:!0,value:!1},content:{validator:n.isString,value:"<br>",setter:"_setHTML",getter:"_getHTML"},basehref:{value:!1,getter:"_resolveBaseHref"},use:{writeOnce:!0,value:["node","node-style","selector-css3"]},container:{value:"body",setter:function(t){return e.one(t)}},node:{readOnly:!0,value:null,getter:function(){return this._iframe}},id:{writeOnce:!0,getter:function(t){return t||(t="iframe-"+e.guid()),t}},linkedcss:{validator:"_validateLinkedCSS",getter:"_getLinkedCSS",setter:"_setLinkedCSS",value:""},extracss:{validator:n.isString,setter:"_setExtraCSS"},defaultblock:{value:"p"}}}),e.namespace("Plugin"),e.Plugin.Frame=s,e.Frame=s},"@VERSION@",{requires:["base","node","plugin","selector-css3","yui-throttle"]});
