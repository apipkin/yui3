YUI.add("editor-selection",function(e,t){var n="textContent",r="innerHTML",i="fontFamily";e.UA.ie&&(n="nodeValue"),e.EditorSelection=function(t){var n,r,i,s,o,u,a,f=0,l,c,h=e.EditorSelection.ROOT;e.config.win.getSelection&&(!e.UA.ie||e.UA.ie<9)?n=e.config.win.getSelection():e.config.doc.selection&&(n=e.config.doc.selection.createRange()),this._selection=n;if(!n)return!1;if(n.pasteHTML){this.isCollapsed=n.compareEndPoints("StartToEnd",n)?!1:!0;if(this.isCollapsed){this.anchorNode=this.focusNode=e.one(n.parentElement()),t&&(i=e.config.doc.elementFromPoint(t.clientX,t.clientY)),o=n.duplicate();if(!i){r=n.parentElement(),s=r.childNodes;for(u=0;u<s.length;u++)o.inRange(n)&&(i||(i=s[u]))}this.ieNode=i,i&&(i.nodeType!==3&&(i.firstChild&&(i=i.firstChild),h.compareTo(i)&&i.firstChild&&(i=i.firstChild)),this.anchorNode=this.focusNode=e.EditorSelection.resolve(i),o.moveToElementText(n.parentElement()),a=n.compareEndPoints("StartToStart",o),a&&(f=Math.abs(n.move("character",-9999))),this.anchorOffset=this.focusOffset=f,this.anchorTextNode=this.focusTextNode=e.one(i))}else n.htmlText&&n.htmlText!==""&&(l=e.Node.create(n.htmlText),l&&l.get("id")?(c=l.get("id"),this.anchorNode=this.focusNode=e.one("#"+c)):l&&(l=l.get("childNodes"),this.anchorNode=this.focusNode=l.item(0)))}else this.isCollapsed=n.isCollapsed,this.anchorNode=e.EditorSelection.resolve(n.anchorNode),this.focusNode=e.EditorSelection.resolve(n.focusNode),this.anchorOffset=n.anchorOffset,this.focusOffset=n.focusOffset,this.anchorTextNode=e.one(n.anchorNode),this.focusTextNode=e.one(n.focusNode);e.Lang.isString(n.text)?this.text=n.text:n.toString?this.text=n.toString():this.text=""},e.EditorSelection.removeFontFamily=function(t){t.removeAttribute("face");var n=t.getAttribute("style").toLowerCase();(n===""||n==="font-family: ")&&t.removeAttribute("style"),n.match(e.EditorSelection.REG_FONTFAMILY)&&(n=n.replace(e.EditorSelection.REG_FONTFAMILY,""),t.setAttribute("style",n))},e.EditorSelection.filter=function(t){var n=(new Date).getTime(),r=e.EditorSelection,s=r.ROOT,o,u=s.all(r.ALL),a=s.all("strong,em"),f=e.config.doc,l,c={},h="",p,d=(new Date).getTime(),v;u.each(function(t){var n=e.Node.getDOMNode(t);n.style[i]&&(c["."+t._yuid]=n.style[i],t.addClass(t._yuid),r.removeFontFamily(n))}),v=(new Date).getTime(),s.all(".hr").addClass("yui-skip").addClass("yui-non"),e.UA.ie&&(l=e.Node.getDOMNode(s).getElementsByTagName("hr"),e.each(l,function(e){var t=f.createElement("div"),n=t.style;t.className="hr yui-non yui-skip",t.setAttribute("readonly",!0),t.setAttribute("contenteditable",!1),e.parentNode&&e.parentNode.replaceChild(t,e),n.border="1px solid #ccc",n.lineHeight="0",n.height="0",n.fontSize="0",n.marginTop="5px",n.marginBottom="5px",n.marginLeft="0px",n.marginRight="0px",n.padding="0"})),e.each(c,function(e,t){h+=t+" { font-family: "+e.replace(/"/gi,"")+"; }"}),e.StyleSheet(h,"editor"),a.each(function(e,t){var n=e.get("tagName").toLowerCase(),i="i";n==="strong"&&(i="b"),r.prototype._swap(a.item(t),i)}),p=s.all("ol,ul"),p.each(function(e){var t=e.all("li");t.size()||e.remove()}),t&&r.filterBlocks(),o=(new Date).getTime()},e.EditorSelection.filterBlocks=function(){var t=(new Date).getTime(),r,i=e.Node.getDOMNode(e.EditorSelection.ROOT).childNodes,s,o,u=!1,a=!0,f,l,c,h,p,d;if(i){for(s=0;s<i.length;s++)o=e.one(i[s]),o.test(e.EditorSelection.BLOCKS)?u=e.EditorSelection._wrapBlock(u):(a=!0,i[s].nodeType===3&&(h=i[s][n].match(e.EditorSelection.REG_CHAR),p=i[s][n].match(e.EditorSelection.REG_NON),h===null&&p&&(a=!1)),a&&(u||(u=[]),u.push(i[s])));u=e.EditorSelection._wrapBlock(u)}l=e.all(e.EditorSelection.DEFAULT_BLOCK_TAG);if(l.size()===1){c=l.item(0).all("br");if(c.size()===1){c.item(0).test(".yui-cursor")||c.item(0).remove(),d=l.item(0).get("innerHTML");if(d===""||d===" ")l.set("innerHTML",e.EditorSelection.CURSOR),f=new e.EditorSelection,f.focusCursor(!0,!0);c.item(0).test(".yui-cursor")&&e.UA.ie&&c.item(0).remove()}}else l.each(function(e){var t=e.get("innerHTML");t===""&&e.remove()});r=(new Date).getTime()},e.EditorSelection.REG_FONTFAMILY=/font-family:\s*;/,e.EditorSelection.REG_CHAR=/[a-zA-Z-0-9_!@#\$%\^&*\(\)-=_+\[\]\\{}|;':",.\/<>\?]/gi,e.EditorSelection.REG_NON=/[\s|\n|\t]/gi,e.EditorSelection.REG_NOHTML=/<\S[^><]*>/g,e.EditorSelection._wrapBlock=function(t){if(t){var n=e.Node.create("<"+e.EditorSelection.DEFAULT_BLOCK_TAG+"></"+e.EditorSelection.DEFAULT_BLOCK_TAG+">"),r=e.one(t[0]),i;for(i=1;i<t.length;i++)n.append(t[i]);r.replace(n),n.prepend(r)}return!1},e.EditorSelection.unfilter=function(){var t=e.EditorSelection.ROOT,n=t.all("[class]"),r="",s,o,u=t;return n.each(function(e){e.hasClass(e._yuid)&&(e.setStyle(i,e.getStyle(i)),e.removeClass(e._yuid),e.getAttribute("class")===""&&e.removeAttribute("class"))}),s=t.all(".yui-non"),s.each(function(e){!e.hasClass("yui-skip")&&e.get("innerHTML")===""?e.remove():e.removeClass("yui-non").removeClass("yui-skip")}),o=t.all("[id]"),o.each(function(e){e.get("id").indexOf("yui_3_")===0&&(e.removeAttribute("id"),e.removeAttribute("_yuid"))}),u&&(r=u.get("innerHTML")),t.all(".hr").addClass("yui-skip").addClass("yui-non"),r},e.EditorSelection.resolve=function(t){if(!t)return e.EditorSelection.ROOT;if(t&&t.nodeType===3)try{t=t.parentNode}catch(n){t=e.EditorSelection.ROOT}return e.one(t)},e.EditorSelection.getText=function(t){var n=t.get("innerHTML").replace(e.EditorSelection.REG_NOHTML,"");return n=n.replace("<span><br></span>","").replace("<br>",""),n},e.EditorSelection.DEFAULT_BLOCK_TAG="p",e.EditorSelection.ALL="[style],font[face]",e.EditorSelection.BLOCKS="p,div,ul,ol,table,style",e.EditorSelection.TMP="yui-tmp",e.EditorSelection.DEFAULT_TAG="span",e.EditorSelection.CURID="yui-cursor",e.EditorSelection.CUR_WRAPID="yui-cursor-wrapper",e.EditorSelection.CURSOR='<span><br class="yui-cursor"></span>',e.EditorSelection.ROOT=e.one("body"),e.EditorSelection.hasCursor=function(){var t=e.all("#"+e.EditorSelection.CUR_WRAPID);return t.size()},e.EditorSelection.cleanCursor=function(){var t,n="br.yui-cursor";t=e.all(n),t
.size()&&t.each(function(t){var n=t.get("parentNode.parentNode.childNodes"),r;n.size()?t.remove():(r=e.EditorSelection.getText(n.item(0)),r!==""&&t.remove())})},e.EditorSelection.prototype={text:null,isCollapsed:null,anchorNode:null,anchorOffset:null,anchorTextNode:null,focusNode:null,focusOffset:null,focusTextNode:null,_selection:null,_wrap:function(t,n){var i=e.Node.create("<"+n+"></"+n+">");return i.set(r,t.get(r)),t.set(r,""),t.append(i),e.Node.getDOMNode(i)},_swap:function(t,n){var i=e.Node.create("<"+n+"></"+n+">");return i.set(r,t.get(r)),t.replace(i,t),e.Node.getDOMNode(i)},getSelected:function(){var t=e.EditorSelection,n=t.ROOT,r,s=[];return t.filter(),e.config.doc.execCommand("fontname",null,t.TMP),r=n.all(t.ALL),r.each(function(o,u){o.getStyle(i)===t.TMP&&(o.setStyle(i,""),t.removeFontFamily(o),o.compareTo(n)||s.push(e.Node.getDOMNode(r.item(u))))}),e.all(s)},insertContent:function(e){return this.insertAtCursor(e,this.anchorTextNode,this.anchorOffset,!0)},insertAtCursor:function(t,r,i,s){var o=e.Node.create("<"+e.EditorSelection.DEFAULT_TAG+' class="yui-non"></'+e.EditorSelection.DEFAULT_TAG+">"),u,a,f,l,c=this.createRange(),h,p=e.EditorSelection.ROOT;p.compareTo(r)&&(h=e.Node.create("<span></span>"),r.append(h),r=h);if(c.pasteHTML){if(i===0&&r&&!r.previous()&&r.get("nodeType")===3)return r.insert(t,"before"),c.moveToElementText&&c.moveToElementText(e.Node.getDOMNode(r.previous())),c.collapse(!1),c.select(),r.previous();l=e.Node.create(t);try{c.pasteHTML('<span id="rte-insert"></span>')}catch(d){}u=p.one("#rte-insert");if(u)return u.set("id",""),u.replace(l),c.moveToElementText&&c.moveToElementText(e.Node.getDOMNode(l)),c.collapse(!1),c.select(),l;e.on("available",function(){u.set("id",""),u.replace(l),c.moveToElementText&&c.moveToElementText(e.Node.getDOMNode(l)),c.collapse(!1),c.select()},"#rte-insert")}else i>0?(u=r.get(n),a=e.one(e.config.doc.createTextNode(u.substr(0,i))),f=e.one(e.config.doc.createTextNode(u.substr(i))),r.replace(a,r),l=e.Node.create(t),l.get("nodeType")===11&&(h=e.Node.create("<span></span>"),h.append(l),l=h),a.insert(l,"after"),f&&(l.insert(o,"after"),o.insert(f,"after"),this.selectNode(o,s))):(r.get("nodeType")===3&&(r=r.get("parentNode")||p),l=e.Node.create(t),t=r.get("innerHTML").replace(/\n/gi,""),t===""||t==="<br>"?r.append(l):l.get("parentNode")?r.insert(l,"before"):p.prepend(l),r.get("firstChild").test("br")&&r.get("firstChild").remove());return l},wrapContent:function(t){t=t?t:e.EditorSelection.DEFAULT_TAG;if(!this.isCollapsed){var n=this.getSelected(),r=[],i,s,o,u;return n.each(function(e,i){var s=e.get("tagName").toLowerCase();s==="font"?r.push(this._swap(n.item(i),t)):r.push(this._wrap(n.item(i),t))},this),i=this.createRange(),o=r[0],s=r[r.length-1],this._selection.removeAllRanges?(i.setStart(r[0],0),i.setEnd(s,s.childNodes.length),this._selection.removeAllRanges(),this._selection.addRange(i)):(i.moveToElementText&&(i.moveToElementText(e.Node.getDOMNode(o)),u=this.createRange(),u.moveToElementText(e.Node.getDOMNode(s)),i.setEndPoint("EndToEnd",u)),i.select()),r=e.all(r),r}return e.all([])},replace:function(t,r){var i=this.createRange(),s,o,u,a;return i.getBookmark?(u=i.getBookmark(),o=this.anchorNode.get("innerHTML").replace(t,r),this.anchorNode.set("innerHTML",o),i.moveToBookmark(u),a=e.one(i.parentElement())):(s=this.anchorTextNode,o=s.get(n),u=o.indexOf(t),o=o.replace(t,""),s.set(n,o),a=this.insertAtCursor(r,s,u,!0)),a},remove:function(){return this._selection&&this._selection.removeAllRanges&&this._selection.removeAllRanges(),this},createRange:function(){return e.config.doc.selection?e.config.doc.selection.createRange():e.config.doc.createRange()},selectNode:function(t,n,r){if(!t)return;r=r||0,t=e.Node.getDOMNode(t);var i=this.createRange();if(i.selectNode){i.selectNode(t),this._selection.removeAllRanges(),this._selection.addRange(i);if(n)try{this._selection.collapse(t,r)}catch(s){this._selection.collapse(t,0)}}else{t.nodeType===3&&(t=t.parentNode);try{i.moveToElementText(t)}catch(o){}n&&i.collapse(r?!1:!0),i.select()}return this},setCursor:function(){return this.removeCursor(!1),this.insertContent(e.EditorSelection.CURSOR)},getCursor:function(){return e.EditorSelection.ROOT.all("#"+e.EditorSelection.CURID)},removeCursor:function(e){var t=this.getCursor();return t&&(e?(t.removeAttribute("id"),t.set("innerHTML",'<br class="yui-cursor">')):t.remove()),t},focusCursor:function(e,t){e!==!1&&(e=!0),t!==!1&&(t=!0);var n=this.removeCursor(!0);n&&n.each(function(n){this.selectNode(n,e,t)},this)},toString:function(){return"EditorSelection Object"}},e.Selection=e.EditorSelection},"@VERSION@",{requires:["node"]});
