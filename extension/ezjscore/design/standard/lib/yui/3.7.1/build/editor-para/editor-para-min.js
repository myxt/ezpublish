/*
YUI 3.7.1 (build 5627)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("editor-para",function(e,t){var n=function(){n.superclass.constructor.apply(this,arguments)},r="host",i="body",s="nodeChange",o="parentNode",u=i+" > p",a="p",f="<br>",l="firstChild",c="li";e.extend(n,e.Plugin.EditorParaBase,{_onNodeChange:function(t){var n=this.get(r),s=n.getInstance(),h,p,d,v,m,g=s.EditorSelection.DEFAULT_BLOCK_TAG,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D=":last-child";switch(t.changedType){case"enter-up":var H=this._lastPara?this._lastPara:t.changedNode,B=H.one("br.yui-cursor");this._lastPara&&delete this._lastPara,B&&(B.previous()||B.next())&&B.ancestor(a)&&B.remove();if(!H.test(g)){var j=H.ancestor(g);j&&(H=j,j=null)}if(H.test(g)){var F=H.previous(),I,q,R=!1;if(F){I=F.one(D);while(!R)I?(q=I.one(D),q?I=q:R=!0):R=!0;I&&n.copyStyles(I,H)}}break;case"enter":e.UA.webkit&&t.changedEvent.shiftKey&&(n.execCommand("insertbr"),t.changedEvent.preventDefault());if(t.changedNode.test("li")&&!e.UA.ie){h=s.EditorSelection.getText(t.changedNode);if(h===""){d=t.changedNode.ancestor("ol,ul");var U=d.getAttribute("dir");U!==""&&(U=' dir = "'+U+'"'),d=t.changedNode.ancestor(s.EditorSelection.BLOCKS),v=s.Node.create("<p"+U+">"+s.EditorSelection.CURSOR+"</p>"),d.insert(v,"after"),t.changedNode.remove(),t.changedEvent.halt(),m=new s.EditorSelection,m.selectNode(v,!0,!1)}}if(e.UA.gecko&&n.get("defaultblock")!=="p"){d=t.changedNode;if(!d.test(c)&&!d.ancestor(c)){d.test(g)||(d=d.ancestor(g)),v=s.Node.create("<"+g+"></"+g+">"),d.insert(v,"after"),m=new s.EditorSelection;if(m.anchorOffset){y=m.anchorNode.get("textContent"),p=s.one(s.config.doc.createTextNode(y.substr(0,m.anchorOffset))),b=s.one(s.config.doc.createTextNode(y.substr(m.anchorOffset))),E=m.anchorNode,E.setContent(""),x=E.cloneNode(),x.append(b),T=!1,C=E;while(!T){C=C.get(o);if(C&&!C.test(g)){N=C.cloneNode(),N.set("innerHTML",""),N.append(x),w=C.get("childNodes");var z=!1;w.each(function(e){z&&N.append(e),e===E&&(z=!0)}),E=C,x=N}else T=!0}b=x,m.anchorNode.append(p),b&&v.append(b)}v.get(l)&&(v=v.get(l)),v.prepend(s.EditorSelection.CURSOR),m.focusCursor(!0,!0),h=s.EditorSelection.getText(v),h!==""&&s.EditorSelection.cleanCursor(),t.changedEvent.preventDefault()}}break;case"keyup":e.UA.gecko&&s.config.doc&&s.config.doc.body&&s.config.doc.body.innerHTML.length<20&&(s.one(u)||this._fixFirstPara());break;case"backspace-up":case"backspace-down":case"delete-up":e.UA.ie||(k=s.all(u),A=s.one(i),k.item(0)&&(A=k.item(0)),L=A.one("br"),L&&(L.removeAttribute("id"),L.removeAttribute("class")),p=s.EditorSelection.getText(A),p=p.replace(/ /g,"").replace(/\n/g,""),M=A.all("img"),p.length===0&&!M.size()&&(A.test(a)||this._fixFirstPara(),O=null,t.changedNode&&t.changedNode.test(a)&&(O=t.changedNode),!O&&n._lastPara&&n._lastPara.inDoc()&&(O=n._lastPara),O&&!O.test(a)&&(O=O.ancestor(a)),O&&!O.previous()&&O.get(o)&&O.get(o).test(i)&&(t.changedEvent.frameEvent.halt(),t.preventDefault())),e.UA.webkit&&t.changedNode&&(t.preventDefault(),A=t.changedNode,A.test("li")&&!A.previous()&&!A.next()&&(h=A.get("innerHTML").replace(f,""),h===""&&A.get(o)&&(A.get(o).replace(s.Node.create(f)),t.changedEvent.frameEvent.halt(),s.EditorSelection.filterBlocks())))),e.UA.gecko&&(v=t.changedNode,_=s.config.doc.createTextNode(" "),v.appendChild(_),v.removeChild(_))}e.UA.gecko&&t.changedNode&&!t.changedNode.test(g)&&(O=t.changedNode.ancestor(g),O&&(this._lastPara=O))},initializer:function(){var t=this.get(r);if(t.editorBR){e.error("Can not plug EditorPara and EditorBR at the same time.");return}t.on(s,e.bind(this._onNodeChange,this))}},{NAME:"editorPara",NS:"editorPara",ATTRS:{host:{value:!1}}}),e.namespace("Plugin"),e.Plugin.EditorPara=n},"3.7.1",{requires:["editor-para-base"]});
