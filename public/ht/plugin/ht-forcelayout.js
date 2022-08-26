!function(I,V){"use strict";var L="ht",S=L+".layout.",E=I[L]||module.parent.exports.ht,x=E.List,K=E.DataModel,r=E.Node,m=E.Edge,h=E.Group,j=Math,G=j.sqrt,b=j.random,R=j.max,z=j.min,X=function(g){return g*g};E.Default.getInternal().addMSMap({ms_force:function(O){O._interval=50,O._stepCount=10,O._motionLimit=.01,O._edgeRepulsion=.65,O._nodeRepulsion=.65,O._damper=1,O._maxMotion=0,O._motionRatio=0,O.init=function(U){var f=this;U instanceof K?f.dm=U:f.gv=U,f._nodeMap={},f._nodes=new x,f._edges=new x},O.start=function(){var N=this,m=N.gv;if(!N._timer){var T=N.cdm=m?m.dm():N.dm;T.mm(N.handleDataModelChange,N),T.md(N.handleDataPropertyChange,N),m&&m.mp(N.handleGV,N),T.each(function(L){if(N.isVisible(L)&&N.isLayoutable(L)&&L instanceof r)if(N instanceof D){var U=L.p3();L.p3([U[0]+b(),U[1]+b(),U[2]+b()])}else U=L.p(),L.p(U.x+b(),U.y+b())}),N._timer=setInterval(function(){N.relax()},N._interval),N._damper=1}},O.stop=function(){var X=this;X._timer&&(X.cdm.umm(X.handleDataModelChange,X),X.cdm.umd(X.handleDataPropertyChange,X),X.gv&&X.gv.ump(X.handleGV,X),clearInterval(X._timer),delete X._timer,delete X.cdm)},O.handleGV=function(l){var X=this;if("dataModel"===l.property){var d=l.oldValue,F=l.newValue;d&&(d.umm(X.handleDataModelChange,X),d.umd(X.handleDataPropertyChange,X)),this.cdm=F,F.mm(X.handleDataModelChange,X),F.md(X.handleDataPropertyChange,X)}},O.relax=function(){var v=this;if(!(v._damper<.1&&v._maxMotion<v._motionLimit)){this.cdm.each(function(z){v.isVisible(z)&&(z instanceof m?v.addEdge(z):z instanceof r&&v.addNode(z))});for(var h,z,Z=0,g=v._edges,C=v._nodes,E=C.size();Z<v._stepCount;Z++){for(g.each(v.relaxEdge,v),h=0;E>h;h++)for(z=0;E>z;z++)v.relaxNode(C.get(h),C.get(z));v.moveNode()}v._isAdjusting=1,C.each(function(h){h.fix||(h.p?h.v.p3(h.p):h.v.p(h.x,h.y))}),delete v._isAdjusting,v._nodeMap={},C.clear(),g.clear(),v.onRelaxed()}},O.onRelaxed=function(){},O.isRunning=function(){return!!this._timer},O.isVisible=function(n){return n.s("layoutable")===!1?!1:this.gv?this.gv.isVisible(n):!0},O.isLayoutable=function(_){if(_.s("layoutable")===!1)return!1;if(_ instanceof h)return!1;var O=this;return O.gv?O.gv.isMovable(_)&&!O.gv.isSelected(_):!(O.cdm||O.dm).sm().co(_)},O.getNodeRepulsion=function(){return this._nodeRepulsion},O.setNodeRepulsion=function(K){this._nodeRepulsion=K,this._damper=1},O.getEdgeRepulsion=function(){return this._edgeRepulsion},O.setEdgeRepulsion=function(P){this._edgeRepulsion=P,this._damper=1},O.getStepCount=function(){return this._stepCount},O.setStepCount=function(D){this._stepCount=D,this._damper=1},O.getInterval=function(){return this._interval},O.setInterval=function(K){var s=this;s._interval!==K&&(s._interval=K,s._timer&&(clearInterval(s._timer),s._timer=setInterval(function(){s.relax()},K)))},O.handleDataPropertyChange=function(T){!this._isAdjusting&&this.isVisible(T.data)&&(this._damper=1)},O.handleDataModelChange=function(){this._damper=1},O.damp=function(){var n=this._maxMotion,z=this._damper;this._motionRatio<=.001&&((.2>n||n>1&&.9>z)&&z>.01?this._damper-=.01:.4>n&&z>.003?this._damper-=.003:z>1e-4&&(this._damper-=1e-4)),n<this._motionLimit&&(this._damper=0)}}}),E.layout.ForceLayout=function($){this.init($)},E.Default.def(S+"ForceLayout",V,{ms_force:1,getLimitBounds:function(){return this._limitBounds},setLimitBounds:function(R){this._limitBounds=R,this._damper=1},getNodeSize:function(m){var n=this.gv;return n&&n.getDataUIBounds?n.getDataUIBounds(m):m.getRect()},addNode:function(l){var K=this,n=K._nodeMap[l._id];if(n)return n;var D=l.p();n={v:l,x:D.x,y:D.y,dx:0,dy:0,fix:!K.isLayoutable(l),s:K.getNodeSize(l)};var R=n.s,F=G(X(R.width)+X(R.height))*K._nodeRepulsion;return n.r=1>F?100:F,K._nodeMap[l._id]=n,K._nodes.add(n),n},addEdge:function(P){if(P._40I&&P._41I){var R=this,s=R.addNode(P._40I),T=R.addNode(P._41I),f={s:s,t:T};T=T.s,s=s.s;var e=T.width+s.width,k=T.height+s.height;f.length=G(e*e+k*k)*R._edgeRepulsion,f.length<=0&&(f.length=100),R._edges.add(f)}},relaxEdge:function(s){var V=s.t,D=s.s,o=V.x-D.x,w=V.y-D.y,I=G(o*o+w*w),j=100*s.length,t=.25*o/j*I,J=.25*w/j*I;V.dx=V.dx-t,V.dy=V.dy-J,D.dx=D.dx+t,D.dy=D.dy+J},relaxNode:function(O,x){if(O!==x){var w=0,T=0,z=O.x-x.x,u=O.y-x.y,U=z*z+u*u;0===U?(w=b(),T=b()):36e4>U&&(w=z/U,T=u/U);var Y=O.r*x.r/400;w*=Y,T*=Y,O.dx+=w,O.dy+=T,x.dx-=w,x.dy-=T}},moveNode:function(){var o=this,y=o._limitBounds,g=o._maxMotion,m=0,f=o._damper;o._nodes.each(function(j){if(!j.fix){var k=j.dx*f,w=j.dy*f;if(j.dx=k/2,j.dy=w/2,m=R(G(k*k+w*w),m),j.x+=R(-40,z(40,k)),j.y+=R(-40,z(40,w)),y){j.x<y.x&&(j.x=y.x,o.adjust(1,0)),j.y<y.y&&(j.y=y.y,o.adjust(0,1));var v=j.s;j.x+v.width>y.x+y.width&&(j.x=y.x+y.width-v.width,o.adjust(-1,0)),j.y+v.height>y.y+y.height&&(j.y=y.y+y.height-v.height,o.adjust(0,-1))}}}),o._maxMotion=m,o._motionRatio=m>0?g/m-1:0,o.damp()},adjust:function(L,e){var R=this._limitBounds;this._nodes.each(function(G){L>0?(!R||G.x+G.s.width+L<R.x+R.width)&&(G.x+=L):(!R||G.x+L>R.x)&&(G.x+=L),e>0?(!R||G.y+G.s.height+e<R.y+R.height)&&(G.y+=e):(!R||G.y+e>R.y)&&(G.y+=e)})}});var D=E.layout.Force3dLayout=function(r){this.init(r)};E.Default.def(S+"Force3dLayout",V,{ms_force:1,getNodeSize3d:function(p){return p.s3()},addNode:function(A){var l=this,B=l._nodeMap[A._id];if(B)return B;B={v:A,p:A.p3(),d:[0,0,0],fix:!l.isLayoutable(A),s:l.getNodeSize3d(A)};var F=B.s,j=E.Default.getDistance(F)*l._nodeRepulsion;return B.r=1>j?100:j,l._nodeMap[A._id]=B,l._nodes.add(B),B},addEdge:function(U){if(U._40I&&U._41I){var E=this,B=E.addNode(U._40I),L=E.addNode(U._41I),j={s:B,t:L};L=L.s,B=B.s,j.length=G(X(L[0]+B[0])+X(L[1]+B[1])+X(L[2]+B[2]))*E._edgeRepulsion,j.length<=0&&(j.length=100),E._edges.add(j)}},relaxEdge:function(z){var o=z.t.p,I=z.s.p,s=z.t.d,B=z.s.d,V=o[0]-I[0],H=o[1]-I[1],X=o[2]-I[2],q=G(V*V+H*H+X*X),R=100*z.length,y=.25*V/R*q,h=.25*H/R*q,$=.25*X/R*q;s[0]-=y,s[1]-=h,s[2]-=$,B[0]+=y,B[1]+=h,B[2]+=$},relaxNode:function(P,B){if(P!==B){var d=P.p,t=B.p,L=0,K=0,a=0,k=d[0]-t[0],l=d[1]-t[1],z=d[2]-t[2],e=k*k+l*l+z*z;0===e?(L=b(),K=b(),a=b()):216e6>e&&(L=k/e,K=l/e,a=z/e);var V=P.r*B.r/400,w=P.d,$=B.d;L*=V,K*=V,a*=V,w[0]+=L,w[1]+=K,w[2]+=a,$[0]-=L,$[1]-=K,$[2]-=a}},moveNode:function(){var i=this,Q=i._maxMotion,b=0,B=i._damper;i._nodes.each(function(i){if(!i.fix){var t=i.p,H=i.d,M=H[0]*B,D=H[1]*B,A=H[2]*B;H[0]=M/2,H[1]=D/2,H[2]=A/2,b=R(G(M*M+D*D+A*A),b),t[0]+=R(-40,z(40,M)),t[1]+=R(-40,z(40,D)),t[2]+=R(-40,z(40,A))}}),i._maxMotion=b,i._motionRatio=b>0?Q/b-1:0,i.damp()}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);