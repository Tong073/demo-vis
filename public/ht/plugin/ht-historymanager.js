!function(K,J,U){"use strict";var D="ht",L=K[D],N=L.Default,F=N.def,d=N.getInternal();L.HistoryManager=function(n){this._histories=[],this.setDataModel(n)},F(L.HistoryManager,J,{ms_ac:["dataModel","histories","historyIndex","maxHistoryCount","disabled"],ms_fire:1,_historyIndex:-1,_betweenTransaction:0,_maxHistoryCount:200,_disabled:!1,ignoredPropertyMap:{imageLoaded:!0,children:!0,attaches:!0,shape:!0,childChange:!0,agentChange:!0,sourceAgent:!0,targetAgent:!0,edgeGroup:!0,"*":!0},ignoreDataModelPropertyMap:{},beginInteraction:function(){this.beginTransaction()},endInteraction:function(){this.endTransaction()},beginTransaction:function(){if(!this._disabled){var T=this;T._betweenTransaction++,1===T._betweenTransaction&&(T._transactionHistories={})}},endTransaction:function(){if(0!==this._betweenTransaction){var i=this,U=i._histories;if(i._betweenTransaction>0&&i._betweenTransaction--,0===i._betweenTransaction){if(i._transactionHistories){var M=[];for(var Q in i._transactionHistories)M.push(i._transactionHistories[Q]);M.length&&(U=U.slice(0,i._historyIndex+1),U.push(M),U.length>i._maxHistoryCount&&(U=U.slice(U.length-i._maxHistoryCount)),i.setHistories(U),i.setHistoryIndex(U.length-1,!0))}delete i._transactionHistories}}},setDataModel:function(h){var i=this,g=i._dataModel;g!==h&&(g&&(delete g._historyManager,g.ump(i.handleDataModelPropertyChange,i),g.umm(i.$5p,i),g.umd(i.$6p,i),g.removeHierarchyChangeListener(i.handleHierarchyChange,i),g.removeIndexChangeListener(i.handleIndexChange,i)),i._dataModel=h,h&&(h._historyManager=i,h.mp(i.handleDataModelPropertyChange,i),h.mm(i.$5p,i),h.md(i.$6p,i),h.addHierarchyChangeListener(i.handleHierarchyChange,i),h.addIndexChangeListener(i.handleIndexChange,i)),i.fp("dataModel",g,h),i.clear())},setHistoryIndex:function(o,S){var d=this,e=d._historyIndex,N=d._histories.length;if(-1>o?o=-1:o>=N&&(o=N-1),e!==o){if(!S){var u=o-e;u>0?d.$2p(u):0>u&&d.$1p(-u)}d._historyIndex=o,d.fp("historyIndex",e,o),d.dataModel&&d.dataModel.onHistoryManagerChanged()}},setMaxHistoryCount:function(o){var D=this,Y=D._histories,w=D._maxHistoryCount;(!o||0>=o)&&(o=10),w!==o&&(D._maxHistoryCount=o,D.fp("maxHistoryCount",w,o),Y.length>o&&D.clear())},cloneValue:function(Y){return L.Default.clone(Y)},isPropertyUndoable:function(h){return h&&!this.ignoredPropertyMap[h]},isIndexUndoable:function(){return!1},isDataModelPropertyUndoable:function(y){return y&&!this.ignoreDataModelPropertyMap[y]},$5p:function(a){this.handleChange(a,a.kind)},$6p:function(i){this.handleChange(i,"property")},handleHierarchyChange:function(Z){this.handleChange(Z,"hierarchy")},handleIndexChange:function(r){this.handleChange(r,"index")},handleDataModelPropertyChange:function(f){this.handleChange(f,"dataModelProperty")},toChildrenInfo:function(T){var s={};return s.data=T,s.children=[],T.eachChild(function(X){s.children.push(this.toChildrenInfo(X))},this),s},restoreChildren:function(N){var i=N.data;N.children.forEach(function(x){var q=x.data;q.getParent()!==i&&i.addChild(q),this._dataModel.contains(q)||this._dataModel.add(q),this.restoreChildren(x)},this)},handleChange:function(a,X){var h=this;if(!(h._disabled||h._isUndoRedoing||N.loadingRefGraph)){var s,b=(h._histories,a.data),w=a.property;if(!b||!(b._refGraph||b instanceof L.RefGraph)){if("property"===X)h.isPropertyUndoable(w,b)&&(s={kind:X,data:b,property:w,oldValue:h.cloneValue(a.oldValue,b,w),newValue:h.cloneValue(a.newValue,b,w),event:a});else if("hierarchy"===X||"index"===X&&h.isIndexUndoable(a))s={kind:X,data:b,oldIndex:a.oldIndex,newIndex:a.newIndex,event:a};else if("clear"===X)s={kind:X,json:a.json,event:a};else if("add"===X){if(s={kind:X,data:b,event:a,childrenInfo:this.toChildrenInfo(b),parent:b.getParent()},s.parent){var p=h._dataModel.getSiblings(b);s.siblingsIndex=p.indexOf(b)}b instanceof L.Node&&(s.host=b.getHost(),s.attaches=b.getAttaches()?b.getAttaches().toArray():U),b instanceof L.Edge&&(s.source=b.getSource(),s.target=b.getTarget())}else"remove"===X?s={kind:X,data:b,event:a}:"dataModelProperty"===X&&h.isDataModelPropertyUndoable(w,b)&&(s={kind:X,property:w,oldValue:h.cloneValue(a.oldValue,b,w),newValue:h.cloneValue(a.newValue,b,w),event:a});h.addHistory(s)}}},addHistory:function(S){var b=this;if(S)if(b._betweenTransaction){var c=(S.data?S.data._id:0)+"_"+S.kind+"_"+S.property;if("property"===S.kind||"dataModelProperty"===S.kind){var A=b._transactionHistories[c];A&&(S.oldValue=A.oldValue)}b._transactionHistories[c]=S}else{var Q=b._histories;Q=Q.slice(0,b._historyIndex+1),Q.push([S]),Q.length>b._maxHistoryCount&&(Q=Q.slice(Q.length-b._maxHistoryCount)),b.setHistories(Q),b.setHistoryIndex(Q.length-1,!0)}},canUndo:function(){return!this._disabled&&this._historyIndex>=0&&this._historyIndex<this._histories.length},canRedo:function(){return!this._disabled&&this._historyIndex>=-1&&this._historyIndex<this._histories.length-1},undo:function(k){(!k||0>=k)&&(k=1),this.setHistoryIndex(this._historyIndex-k)},$1p:function(e){if(this.canUndo()){var l,B=this,$=B._dataModel,k=B._histories,p=B._historyIndex,J=0;for(B._isUndoRedoing=!0,N.setIsolating(!0);e>0;){if(p>=0&&p<k.length){J++,l=k[p],p--;for(var u=l.length-1;u>=0;u--){var W=l[u],U=W.kind,X=W.data,v=W.property,x=W.event,i=this.cloneValue(W.oldValue,X,v);if(W.undo)W.undo();else if("add"===U)$.remove(X,{keepChildren:!0});else if("remove"===U)$.contains(X)||$.add(X,x.rootsIndex,x.datasIndex);else if("clear"===U)$.deserialize(N.clone(W.json));else if("property"===U)if("parent"===v)i?i.addChild(X,x.oldIndex):(X.setParent(i),x.oldIndex>=0&&$.moveTo(X,x.oldIndex));else{var Q=null;0===v.indexOf("a:")?(Q="attr",v=v.replace("a:","")):0===v.indexOf("s:")?(Q="style",v=v.replace("s:","")):0===v.indexOf("f:")&&(Q="field",v=v.replace("f:","")),d.setPropertyValue(X,Q,v,i)}else if("dataModelProperty"===U){var Q=null;0===v.indexOf("a:")?(Q="attr",v=v.replace("a:","")):0===v.indexOf("s:")?(Q="style",v=v.replace("s:","")):0===v.indexOf("f:")&&(Q="field",v=v.replace("f:","")),d.setPropertyValue($,Q,v,i)}else"hierarchy"===U?$.moveTo(X,W.oldIndex):"index"===U?$.moveToIndex(X,W.oldIndex):"selection"===U&&$.sm().ss(W.oldValue)}}e--}N.setIsolating(!1),delete B._isUndoRedoing,B.afterUndo(J)}},afterUndo:function(){},redo:function(h){(!h||0>=h)&&(h=1),this.setHistoryIndex(this._historyIndex+h)},$2p:function(O){if(this.canRedo()){var w,l=this,G=l._dataModel,M=l._histories,A=l._historyIndex,F=0;for(l._isUndoRedoing=!0,N.setIsolating(!0);O>0;){if(A>=-1&&A<M.length-1){F++,A++,w=M[A];for(var K=0;K<w.length;K++){var t=w[K],Q=t.kind,y=t.data,J=t.property,h=t.event,v=this.cloneValue(t.newValue,y,J);if(t.redo)t.redo();else if("add"===Q)t.parent&&!y.getParent()&&t.parent.addChild(y,t.siblingsIndex),G.contains(y)||G.add(y,h.rootsIndex,h.datasIndex),this.restoreChildren(t.childrenInfo),y instanceof L.Node&&(y.setHost(t.host),t.attaches&&t.attaches.forEach(function(J){J.setHost(y)})),y instanceof L.Edge&&(y.setSource(t.source),y.setTarget(t.target));else if("remove"===Q)G.remove(y);else if("clear"===Q)G.clear();else if("property"===Q)if("parent"===J)v?v.addChild(y,h.newIndex):(y.setParent(v),h.newIndex>=0&&G.moveTo(y,h.newIndex));else{var B=null;0===J.indexOf("a:")?(B="attr",J=J.replace("a:","")):0===J.indexOf("s:")?(B="style",J=J.replace("s:","")):0===J.indexOf("f:")&&(B="field",J=J.replace("f:","")),d.setPropertyValue(y,B,J,v)}else if("dataModelProperty"===Q){var B=null;0===J.indexOf("a:")?(B="attr",J=J.replace("a:","")):0===J.indexOf("s:")?(B="style",J=J.replace("s:","")):0===J.indexOf("f:")&&(B="field",J=J.replace("f:","")),d.setPropertyValue(G,B,J,v)}else"hierarchy"===Q?G.moveTo(y,t.newIndex):"index"===Q?G.moveToIndex(y,t.newIndex):"selection"===Q&&G.sm().ss(t.newValue)}}O--}N.setIsolating(!1),delete l._isUndoRedoing,this.afterRedo(F)}},afterRedo:function(){},clear:function(){this.setHistories([]),this.setHistoryIndex(-1,!0),this._betweenTransaction=0,delete this._transactionHistories}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);