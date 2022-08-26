!function(y){"use strict";var T="ht",F=y[T],x=Math,r=x.max,d=x.min,p=x.abs,n=x.atan2,K=(x.cos,x.sin,x.ceil),e=F.Default,M=e.getInternal(),I=F.List,$=M.Mat,G=M.getNodeRect,w=M.intersectionLineRect,L=e.getDistance,o=e.setEdgeType,W="left",l="right",O="top",N="bottom",q="edge.type",i="edge.gap",U="edge.center",H="edge.extend",S=function(T,Z){return G(T,Z).width},h=function(V,S){return G(V,S).height},a=function(k,o){return M.getEdgeHostPosition(k,o,"source")},Y=function(e,w){return M.getEdgeHostPosition(e,w,"target")},t=function(O,a){var h=O.s(q),r=O.getEdgeGroup();if(r){var f=0;if(r.eachSiblingEdge(function(J){a.isVisible(J)&&J.s(q)==h&&f++}),f>1)return O.s(i)*(f-1)/2}return 0},D=function(b,C){var s=b.s(q),B=b.isLooped();if(!b.getEdgeGroup())return B?b.s(i):0;var M,P=0,n=0,U=0;return b.getEdgeGroup().getSiblings().each(function(w){w.each(function(c){if(c._40I===b._40I&&c.s(q)==s&&C.isVisible(c)){var A=c.s(i);M?(n+=U/2+A/2,U=A):(M=c,U=A),c===b&&(P=n)}})}),B?n-P+U:P-n/2},m=function(F,c){var J=c.s("edge.corner.radius");return e.toRoundedCorner(F,J)};M.addMethod(F.Style,{"edge.ripple.elevation":-20,"edge.ripple.size":1,"edge.ripple.both":!1,"edge.ripple.straight":!1,"edge.ripple.length":-1,"edge.corner.radius":-1,"edge.ortho":.5,"edge.flex":20,"edge.extend":20},!0),o("boundary",function(k,N,M,b){b||(N=-N);var u,H=a(M,k),r=Y(M,k),Q=G(M,k._40I),S=G(M,k._41I),R=new $(n(r.y-H.y,r.x-H.x)),Z=L(H,r),s=H.x,z=H.y;return u=R.tf(0,N),H={x:u.x+s,y:u.y+z},u=R.tf(Z,N),r={x:u.x+s,y:u.y+z},u=w(H,r,Q),u&&(H={x:u[0],y:u[1]}),u=w(H,r,S),u&&(r={x:u[0],y:u[1]}),{points:new I([H,r])}}),o("ripple",function(v,Q,j,N){N||(Q=-Q);var u=a(j,v),R=Y(j,v),S=L(u,R),b=d(v.s("edge.offset"),S/2),J=v.s("edge.ripple.size"),h=v.s("edge.ripple.length"),F=v.s("edge.ripple.both"),c=v.s(U),i=v.s("edge.ripple.elevation"),V=new I,z=v.s("edge.ripple.straight")?null:new I,f=new $(n(R.y-u.y,R.x-u.x));N||(i=-i),S-=2*b,h>0&&(J=K(S/h));var w=S/J;z&&z.add(1);for(var T=0;J>T;T++)z&&z.add(3),0===T?V.add({x:b+w*T,y:c?0:Q}):V.add({x:b+w*T,y:Q}),V.add({x:b+w*T+w/2,y:i+Q}),F&&(i=-i);for(V.add({x:b+S,y:c?0:Q}),T=0;T<V.size();T++){var P=f.tf(V.get(T));P.x+=u.x,P.y+=u.y,V.set(T,P)}return{points:V,segments:z}}),o("h.v",function(Z,A,H){A=D(Z,H);var G=new I,P=Z.s(U),j=a(H,Z),O=j.x,V=j.y,X=Y(H,Z),R=X.x,c=X.y,Q=Z._40I instanceof F.Edge,v=Z._41I instanceof F.Edge,w=0,e=0,r=R-O,M=c-V;return P||(w=Q?0:S(H,Z._40I)/2,e=v?0:h(H,Z._41I)/2),r>=0&&0>=M?(G.add({x:O+w,y:V+A}),G.add({x:R+A,y:V+A}),G.add({x:R+A,y:c+e})):0>=r&&M>=0?(G.add({x:O-w,y:V+A}),G.add({x:R+A,y:V+A}),G.add({x:R+A,y:c-e})):r>=0&&M>=0?(G.add({x:O+w,y:V+A}),G.add({x:R-A,y:V+A}),G.add({x:R-A,y:c-e})):(G.add({x:O-w,y:V+A}),G.add({x:R-A,y:V+A}),G.add({x:R-A,y:c+e})),m(G,Z)}),o("v.h",function(O,P,M){P=D(O,M);var b=new I,v=O.s(U),A=a(M,O),B=A.x,w=A.y,L=Y(M,O),G=L.x,c=L.y,Q=O._40I instanceof F.Edge,o=O._41I instanceof F.Edge,$=0,l=0,j=G-B,f=c-w;return v||($=o?0:S(M,O._41I)/2,l=Q?0:h(M,O._40I)/2),j>=0&&0>=f?(b.add({x:B+P,y:w-l}),b.add({x:B+P,y:c+P}),b.add({x:G-$,y:c+P})):0>=j&&f>=0?(b.add({x:B+P,y:w+l}),b.add({x:B+P,y:c+P}),b.add({x:G+$,y:c+P})):j>=0&&f>=0?(b.add({x:B-P,y:w+l}),b.add({x:B-P,y:c+P}),b.add({x:G-$,y:c+P})):(b.add({x:B-P,y:w-l}),b.add({x:B-P,y:c+P}),b.add({x:G+$,y:c+P})),m(b,O)}),o("ortho",function(C,N,A){var B=new I,K=C.s(U),l=C.s("edge.ortho"),G=C._40I,v=C._41I,X=a(A,C),J=X.x,D=X.y,P=Y(A,C),Z=P.x,k=P.y,r=Z-J,y=k-D,d=G instanceof F.Edge,L=v instanceof F.Edge,z=K||d?0:S(A,G)/2,s=K||d?0:h(A,G)/2,c=K||L?0:S(A,v)/2,T=K||L?0:h(A,v)/2,n=(r-(z+c)*(r>0?1:-1))*l,$=(y-(s+T)*(y>0?1:-1))*l;return p(r)<p(y)?r>=0&&0>=y?(B.add({x:J+N,y:D-s}),B.add({x:J+N,y:D+$+N-s}),B.add({x:Z+N,y:D+$+N-s}),B.add({x:Z+N,y:k+T})):0>=r&&y>=0?(B.add({x:J+N,y:D+s}),B.add({x:J+N,y:D+$+N+s}),B.add({x:Z+N,y:D+$+N+s}),B.add({x:Z+N,y:k-T})):r>=0&&y>=0?(B.add({x:J+N,y:D+s}),B.add({x:J+N,y:D+$-N+s}),B.add({x:Z+N,y:D+$-N+s}),B.add({x:Z+N,y:k-T})):(B.add({x:J+N,y:D-s}),B.add({x:J+N,y:D+$-N-s}),B.add({x:Z+N,y:D+$-N-s}),B.add({x:Z+N,y:k+T})):r>=0&&0>=y?(B.add({x:J+z,y:D+N}),B.add({x:J+n+N+z,y:D+N}),B.add({x:J+n+N+z,y:k+N}),B.add({x:Z-c,y:k+N})):0>=r&&y>=0?(B.add({x:J-z,y:D+N}),B.add({x:J+n+N-z,y:D+N}),B.add({x:J+n+N-z,y:k+N}),B.add({x:Z+c,y:k+N})):r>=0&&y>=0?(B.add({x:J+z,y:D+N}),B.add({x:J+n-N+z,y:D+N}),B.add({x:J+n-N+z,y:k+N}),B.add({x:Z-c,y:k+N})):(B.add({x:J-z,y:D+N}),B.add({x:J+n-N-z,y:D+N}),B.add({x:J+n-N-z,y:k+N}),B.add({x:Z+c,y:k+N})),m(B,C)}),o("flex",function(k,W,K){var w=new I,f=k.s("edge.flex")+t(k,K),O=k.s(U),x=k._40I,X=k._41I,q=a(K,k),H=q.x,P=q.y,T=Y(K,k),i=T.x,E=T.y,l=x instanceof F.Edge,C=X instanceof F.Edge,o=i-H,_=E-P,V=O||l?0:S(K,x)/2,Z=O||l?0:h(K,x)/2,g=O||C?0:S(K,X)/2,A=O||C?0:h(K,X)/2,z=o>0?f:-f,s=_>0?f:-f;return p(o)<p(_)?o>=0&&0>=_?(w.add({x:H+W,y:P-Z}),w.add({x:H+W,y:P+s+W-Z}),w.add({x:i+W,y:E-s+W+A}),w.add({x:i+W,y:E+A})):0>=o&&_>=0?(w.add({x:H+W,y:P+Z}),w.add({x:H+W,y:P+s+W+Z}),w.add({x:i+W,y:E-s+W-A}),w.add({x:i+W,y:E-A})):o>=0&&_>=0?(w.add({x:H+W,y:P+Z}),w.add({x:H+W,y:P+s-W+Z}),w.add({x:i+W,y:E-s-W-A}),w.add({x:i+W,y:E-A})):(w.add({x:H+W,y:P-Z}),w.add({x:H+W,y:P+s-W-Z}),w.add({x:i+W,y:E-s-W+A}),w.add({x:i+W,y:E+A})):o>=0&&0>=_?(w.add({x:H+V,y:P+W}),w.add({x:H+z+W+V,y:P+W}),w.add({x:i-z+W-g,y:E+W}),w.add({x:i-g,y:E+W})):0>=o&&_>=0?(w.add({x:H-V,y:P+W}),w.add({x:H+z+W-V,y:P+W}),w.add({x:i-z+W+g,y:E+W}),w.add({x:i+g,y:E+W})):o>=0&&_>=0?(w.add({x:H+V,y:P+W}),w.add({x:H+z-W+V,y:P+W}),w.add({x:i-z-W-g,y:E+W}),w.add({x:i-g,y:E+W})):(w.add({x:H-V,y:P+W}),w.add({x:H+z-W-V,y:P+W}),w.add({x:i-z-W+g,y:E+W}),w.add({x:i+g,y:E+W})),m(w,k)}),o("extend.east",function(C,Q,W){var B=new I,z=C.s(H)+t(C,W),n=C.s(U),l=a(W,C),i=C._40I instanceof F.Edge,A=C._41I instanceof F.Edge,c=l.x+(n||i?0:S(W,C._40I)/2),R=l.y,j=Y(W,C),e=j.x+(n||A?0:S(W,C._41I)/2),d=j.y,x=r(c,e)+z;return R>d?(B.add({x:c,y:R+Q}),B.add({x:x+Q,y:R+Q}),B.add({x:x+Q,y:d-Q}),B.add({x:e,y:d-Q})):(B.add({x:c,y:R-Q}),B.add({x:x+Q,y:R-Q}),B.add({x:x+Q,y:d+Q}),B.add({x:e,y:d+Q})),m(B,C)}),o("extend.west",function(g,V,y){var b=new I,j=g.s(H)+t(g,y),q=g.s(U),w=g._40I instanceof F.Edge,P=g._41I instanceof F.Edge,e=a(y,g),_=e.x-(q||w?0:S(y,g._40I)/2),f=e.y,n=Y(y,g),x=n.x-(q||P?0:S(y,g._41I)/2),B=n.y,o=d(_,x)-j;return f>B?(b.add({x:_,y:f+V}),b.add({x:o-V,y:f+V}),b.add({x:o-V,y:B-V}),b.add({x:x,y:B-V})):(b.add({x:_,y:f-V}),b.add({x:o-V,y:f-V}),b.add({x:o-V,y:B+V}),b.add({x:x,y:B+V})),m(b,g)}),o("extend.north",function(o,W,v){var K=new I,z=o.s(H)+t(o,v),J=o.s(U),j=o._40I instanceof F.Edge,k=o._41I instanceof F.Edge,u=a(v,o),e=u.x,_=u.y-(J||j?0:h(v,o._40I)/2),Q=Y(v,o),D=Q.x,E=Q.y-(J||k?0:h(v,o._41I)/2),Z=d(_,E)-z;return e>D?(K.add({y:_,x:e+W}),K.add({y:Z-W,x:e+W}),K.add({y:Z-W,x:D-W}),K.add({y:E,x:D-W})):(K.add({y:_,x:e-W}),K.add({y:Z-W,x:e-W}),K.add({y:Z-W,x:D+W}),K.add({y:E,x:D+W})),m(K,o)}),o("extend.south",function(G,T,B){var l=new I,f=G.s(H)+t(G,B),W=G.s(U),J=G._40I instanceof F.Edge,S=G._41I instanceof F.Edge,d=a(B,G),$=d.x,e=d.y+(W||J?0:h(B,G._40I)/2),j=Y(B,G),R=j.x,N=j.y+(W||S?0:h(B,G._41I)/2),z=r(e,N)+f;return $>R?(l.add({y:e,x:$+T}),l.add({y:z+T,x:$+T}),l.add({y:z+T,x:R-T}),l.add({y:N,x:R-T})):(l.add({y:e,x:$-T}),l.add({y:z+T,x:$-T}),l.add({y:z+T,x:R+T}),l.add({y:N,x:R+T})),m(l,G)});var P=function(O,R,h,z,Y){if(z.sort(function(B,b){var t=B.getSourceAgent()===R?B.getTargetAgent():B.getSourceAgent(),U=b.getSourceAgent()===R?b.getTargetAgent():b.getSourceAgent(),s=t.p(),g=U.p();if(h===W||h===l){if(s.y>g.y)return 1;if(s.y<g.y)return-1}else{if(s.x>g.x)return 1;if(s.x<g.x)return-1}return e.sortFunc(B.getId(),b.getId())}),Y){for(var P,s,g,D=O.getSourceAgent(),a=O.getTargetAgent(),T=0;T<z.size();T++){var v=z.get(T);v.getSourceAgent()===D&&v.getTargetAgent()===a||v.getTargetAgent()===D&&v.getSourceAgent()===a?(s||(s=new I),s.add(v,0)):s?(g||(g=new I),g.add(v)):(P||(P=new I),P.add(v))}z.clear(),P&&z.addAll(P),s&&z.addAll(s),g&&z.addAll(g)}var _=z.indexOf(O),w=z.size(),q=O.s(i);return{side:h,index:_,size:w,offset:-q*(w-1)/2+q*_}},k=function(Q,J,g,K,S){var l=J.s(q);return P(J,g,K,g.getAgentEdges().toList(function(C){return Q.isVisible(C)&&C.s(q)===l}),S)},X=function(G,k){var z=G.getSourceAgent()===k?G.getTargetAgent():G.getSourceAgent(),Q=k.p(),P=z.p(),r=P.x-Q.x,$=P.y-Q.y;return r>0&&p($)<=r?l:0>r&&p($)<=-r?W:$>0&&p(r)<=$?N:O},J=function(C,M,z){var F=M.s(q),n=X(M,z);return P(M,z,n,z.getAgentEdges().toList(function(P){return C.isVisible(P)&&P.s(q)===F&&X(P,z)===n}))},Q=function($,G){var u=$.getSourceAgent()===G,F=u?$.getTargetAgent():$.getSourceAgent(),b=G.p(),A=F.p();return u?b.y>A.y?O:N:b.x<A.x?l:W},s=function(S,J,F){var T=J.s(q),y=Q(J,F);return P(J,F,y,F.getAgentEdges().toList(function(Y){return S.isVisible(Y)&&Y.s(q)===T&&Q(Y,F)===y}),y===l||y===N)},B=function(k,n){var j=k.getSourceAgent()===n,$=j?k.getTargetAgent():k.getSourceAgent(),b=n.p(),F=$.p();return j?b.x<F.x?l:W:b.y>F.y?O:N},A=function(y,K,O){var p=K.s(q),C=B(K,O);return P(K,O,C,O.getAgentEdges().toList(function(E){return y.isVisible(E)&&E.s(q)===p&&B(E,O)===C}),C===l||C===N)},R=function(B,R,w){var r=B.getSourceAgent(),g=B.getTargetAgent(),Z=r.getId()>g.getId(),P=Z?g:r,M=Z?r:g,i=P.p(),j=M.p(),$=w(R,B,P),p=w(R,B,M),J=B.s(U),T=J?0:S(R,P)/2,E=J?0:S(R,M)/2,X=J?0:h(R,P)/2,C=J?0:h(R,M)/2,e=$.offset,L=p.offset,s=$.side,q=p.side,z=new I;return s===O?(z.add({x:i.x+e,y:i.y-X}),z.add({x:i.x+e,y:j.y+L}),q===W?z.add({x:j.x-E,y:j.y+L}):z.add({x:j.x+E,y:j.y+L})):s===N?(z.add({x:i.x+e,y:i.y+X}),z.add({x:i.x+e,y:j.y+L}),q===W?z.add({x:j.x-E,y:j.y+L}):z.add({x:j.x+E,y:j.y+L})):s===W?(z.add({x:i.x-T,y:i.y+e}),z.add({x:j.x+L,y:i.y+e}),q===N?z.add({x:j.x+L,y:j.y+C}):z.add({x:j.x+L,y:j.y-C})):s===l&&(z.add({x:i.x+T,y:i.y+e}),z.add({x:j.x+L,y:i.y+e}),q===N?z.add({x:j.x+L,y:j.y+C}):z.add({x:j.x+L,y:j.y-C})),Z&&z.reverse(),m(z,B)};o("ortho2",function(r,Y,T){var y,k,L=r.s(U),$=r.s("edge.ortho"),c=r.getSourceAgent(),Z=r.getTargetAgent(),H=c.getId()>Z.getId(),a=H?Z:c,b=H?c:Z,f=a.p(),n=b.p(),G=J(T,r,a),i=J(T,r,b),K=L?0:S(T,a)/2,x=L?0:h(T,a)/2,t=L?0:S(T,b)/2,e=L?0:h(T,b)/2,j=new I,A=G.offset,R=i.offset,B=G.side;return B===l?(y=n.y>f.y?-A:A,k=f.x+K+(n.x-t-f.x-K)*$,j.add({x:f.x+K,y:f.y+A}),j.add({x:k+y,y:f.y+A}),j.add({x:k+y,y:n.y+R}),j.add({x:n.x-t,y:n.y+R})):B===W?(y=n.y>f.y?-A:A,k=f.x-K-(f.x-K-n.x-t)*$,j.add({x:f.x-K,y:f.y+A}),j.add({x:k-y,y:f.y+A}),j.add({x:k-y,y:n.y+R}),j.add({x:n.x+t,y:n.y+R})):B===N?(y=n.x>f.x?-A:A,k=f.y+x+(n.y-e-f.y-x)*$,j.add({x:f.x+A,y:f.y+x}),j.add({x:f.x+A,y:k+y}),j.add({x:n.x+R,y:k+y}),j.add({x:n.x+R,y:n.y-e})):B===O&&(y=n.x>f.x?-A:A,k=f.y-x-(f.y-x-n.y-e)*$,j.add({x:f.x+A,y:f.y-x}),j.add({x:f.x+A,y:k-y}),j.add({x:n.x+R,y:k-y}),j.add({x:n.x+R,y:n.y+e})),H&&j.reverse(),m(j,r)},!0),o("flex2",function(H,P,f){var E,K=H.getSourceAgent(),u=H.getTargetAgent(),b=K.getId()>u.getId(),L=b?u:K,w=b?K:u,g=L.p(),C=w.p(),v=J(f,H,L),y=J(f,H,w),Z=H.s(U),o=H.s("edge.flex")+(v.size-1)/2*H.s(i),M=Z?0:S(f,L)/2,Q=Z?0:h(f,L)/2,c=Z?0:S(f,w)/2,$=Z?0:h(f,w)/2,x=new I,z=v.offset,T=y.offset,p=v.side;return p===l?(E=C.y>g.y?-z:z,x.add({x:g.x+M,y:g.y+z}),x.add({x:g.x+M+o+E,y:g.y+z}),x.add({x:C.x-c-o+E,y:C.y+T}),x.add({x:C.x-c,y:C.y+T})):p===W?(E=C.y>g.y?-z:z,x.add({x:g.x-M,y:g.y+z}),x.add({x:g.x-M-o-E,y:g.y+z}),x.add({x:C.x+c+o-E,y:C.y+T}),x.add({x:C.x+c,y:C.y+T})):p===N?(E=C.x>g.x?-z:z,x.add({x:g.x+z,y:g.y+Q}),x.add({x:g.x+z,y:g.y+Q+o+E}),x.add({x:C.x+T,y:C.y-$-o+E}),x.add({x:C.x+T,y:C.y-$})):p===O&&(E=C.x>g.x?-z:z,x.add({x:g.x+z,y:g.y-Q}),x.add({x:g.x+z,y:g.y-Q-o-E}),x.add({x:C.x+T,y:C.y+$+o-E}),x.add({x:C.x+T,y:C.y+$})),b&&x.reverse(),m(x,H)},!0),o("extend.north2",function(f,y,L){var z=f.getSourceAgent(),c=f.getTargetAgent(),S=z.getId()>c.getId(),P=S?c:z,N=S?z:c,s=P.p(),o=N.p(),x=k(L,f,P,O),r=k(L,f,N,O,!0),F=f.s(U),M=F?0:h(L,P)/2,A=F?0:h(L,N)/2,u=x.offset,C=r.offset,v=f.s(H)+(x.size-1)/2*f.s(i),b=d(s.y-M,o.y-A)-v+(s.x<o.x?u:-u),W=new I;return W.add({x:s.x+u,y:s.y-M}),W.add({x:s.x+u,y:b}),W.add({x:o.x+C,y:b}),W.add({x:o.x+C,y:o.y-A}),S&&W.reverse(),m(W,f)},!0),o("extend.south2",function(G,Y,V){var C=G.getSourceAgent(),q=G.getTargetAgent(),J=C.getId()>q.getId(),n=J?q:C,A=J?C:q,S=n.p(),M=A.p(),D=k(V,G,n,N),X=k(V,G,A,N,!0),d=G.s(U),f=d?0:h(V,n)/2,$=d?0:h(V,A)/2,a=D.offset,B=X.offset,o=G.s(H)+(D.size-1)/2*G.s(i),T=r(S.y+f,M.y+$)+o+(S.x>M.x?a:-a),E=new I;return E.add({x:S.x+a,y:S.y+f}),E.add({x:S.x+a,y:T}),E.add({x:M.x+B,y:T}),E.add({x:M.x+B,y:M.y+$}),J&&E.reverse(),m(E,G)},!0),o("extend.west2",function(f,Y,K){var e=f.getSourceAgent(),s=f.getTargetAgent(),P=e.getId()>s.getId(),L=P?s:e,l=P?e:s,g=L.p(),c=l.p(),G=k(K,f,L,O),F=k(K,f,l,O,!0),D=f.s(U),C=D?0:S(K,L)/2,u=D?0:S(K,l)/2,y=G.offset,N=F.offset,$=f.s(H)+(G.size-1)/2*f.s(i),E=d(g.x-C,c.x-u)-$+(g.y<c.y?y:-y),R=new I;return R.add({x:g.x-C,y:g.y+y}),R.add({x:E,y:g.y+y}),R.add({x:E,y:c.y+N}),R.add({x:c.x-u,y:c.y+N}),P&&R.reverse(),m(R,f)},!0),o("extend.east2",function(g,E,z){var N=g.getSourceAgent(),P=g.getTargetAgent(),Y=N.getId()>P.getId(),V=Y?P:N,R=Y?N:P,Q=V.p(),W=R.p(),s=k(z,g,V,O),o=k(z,g,R,O,!0),d=g.s(U),T=d?0:S(z,V)/2,F=d?0:S(z,R)/2,y=s.offset,$=o.offset,c=g.s(H)+(s.size-1)/2*g.s(i),X=r(Q.x+T,W.x+F)+c+(Q.y>W.y?y:-y),D=new I;return D.add({x:Q.x+T,y:Q.y+y}),D.add({x:X,y:Q.y+y}),D.add({x:X,y:W.y+$}),D.add({x:W.x+F,y:W.y+$}),Y&&D.reverse(),m(D,g)},!0),o("v.h2",function(q,k,d){return R(q,d,s)},!0),o("h.v2",function(K,X,E){return R(K,E,A)},!0)}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);