!function (y, r, Z) {
    "use strict";

    function F() {
        var p = [], g = [];
        return function () {
            return 0 === arguments.length ? g.join("") + Q.apply(String, p) : (p.length + arguments.length > 1024 && (g.push(Q.apply(String, p)), p.length = 0), Array.prototype.push.apply(p, arguments), void 0)
        }
    }

    function o(s, L, C, q, B) {
        var g, P, F = 8 * B - q - 1, A = (1 << F) - 1, E = A >> 1, D = -7, n = C ? B - 1 : 0, j = C ? -1 : 1,
            J = s[L + n];
        for (n += j, g = J & (1 << -D) - 1, J >>= -D, D += F; D > 0; g = 256 * g + s[L + n], n += j, D -= 8) ;
        for (P = g & (1 << -D) - 1, g >>= -D, D += q; D > 0; P = 256 * P + s[L + n], n += j, D -= 8) ;
        if (0 === g) g = 1 - E; else {
            if (g === A) return P ? 0 / 0 : 1 / 0 * (J ? -1 : 1);
            P += Math.pow(2, q), g -= E
        }
        return (J ? -1 : 1) * P * Math.pow(2, g - q)
    }

    var s = "ht", l = y[s], S = null, G = Math, T = G.abs, a = G.max, p = Number.MAX_VALUE, f = l.Default,
        $ = f.getInternal(), V = f.clone, v = $.vec3TransformMat4, k = [0, 0], e = $.appendArray, P = function () {
            function c(N, $, o, l) {
                if (N) {
                    var j = N[l];
                    if (j) {
                        o.ignoreColor || ($.color = j.kd), !o.ignoreTransparent && j.d > 0 && j.d < 1 && ($.transparent = !0, $.opacity = j.d);
                        var V;
                        if (!o.ignoreImage && (V = j.map_kd)) {
                            V = V.split(" ");
                            for (var m = -1, v = 0; v < V.length; v++) "-o" === V[v] ? ($.uvOffset = [parseFloat(V[v + 1]), parseFloat(V[v + 2])], v += 3, m = v) : "-s" === V[v] && ($.uvScale = [parseFloat(V[v + 1]), parseFloat(V[v + 2])], v += 3, m = v);
                            $.image = (o.prefix || "") + V.splice(m + 1).join(" ")
                        }
                    }
                }
            }

            var q = /v( +[\d|\.|\+|\-|e|E]+| nan)( +[\d|\.|\+|\-|e|E]+| nan)( +[\d|\.|\+|\-|e|E]+| nan)/,
                J = /vt( +[\d|\.|\+|\-|e|E]+| nan)( +[\d|\.|\+|\-|e|E]+| nan)/,
                H = /vn( +[\d|\.|\+|\-|e|E]+| nan)( +[\d|\.|\+|\-|e|E]+| nan)( +[\d|\.|\+|\-|e|E]+| nan)/,
                g = /^[og]\s*(.+)?/, K = function (x, g) {
                    return g = parseInt(g), g >= 0 ? x[g - 1] : x[g + x.length]
                }, P = function (c, N, k, L, D) {
                    if (c.lvs) {
                        var r = K(N, L), t = K(N, D), y = k.matrix, W = c.lvs;
                        y ? (e(W, v(V(r), y)), e(W, v(V(t), y))) : (e(W, r), e(W, t))
                    }
                }, b = function (g, x, $, E, U, P) {
                    if (g.vs) {
                        var b = K(x, E), i = K(x, U), O = K(x, P), y = $.matrix, k = g.vs;
                        if ($.flipFace) {
                            var Y = i;
                            i = O, O = Y
                        }
                        y ? (e(k, v(V(b), y)), e(k, v(V(i), y)), e(k, v(V(O), y))) : (e(k, b), e(k, i), e(k, O))
                    }
                }, _ = function (L, G, S, X, d, c) {
                    if (L.vs) {
                        var I = S.flipY, n = X === Z ? k : K(G, X), x = d === Z ? k : K(G, d), s = c === Z ? k : K(G, c);
                        if (S.flipFace) {
                            var F = x;
                            x = s, s = F
                        }
                        L.uv.push(n[0], I ? 1 - n[1] : n[1], x[0], I ? 1 - x[1] : x[1], s[0], I ? 1 - s[1] : s[1])
                    }
                }, u = function (z, U, $, h, p, H) {
                    if (z.vs) {
                        var F = K(U, h), X = K(U, p), f = K(U, H), J = $.normalMatrix, d = z.ns;
                        if ($.flipFace) {
                            var N = X;
                            X = f, f = N
                        }
                        J ? (e(d, v(V(F), J)), e(d, v(V(X), J)), e(d, v(V(f), J))) : (e(d, F), e(d, X), e(d, f))
                    }
                }, w = function (K, J, _, p) {
                    for (var Q = p.length - 1, j = 0; Q > j; ++j) P(K, J, _, p[j], p[j + 1]);
                    P(K, J, _, p[Q], p[0])
                }, B = function (n, O, l, C, o, q, t, h) {
                    var A = C && C.length && h;
                    q[3] === Z ? (b(n, O, o, q[0], q[1], q[2]), t ? _(n, l, o, t[0], t[1], t[2]) : n.uv && n.uv.length && _(n, l, o), A && u(n, C, o, h[0], h[1], h[2])) : (b(n, O, o, q[0], q[1], q[3]), b(n, O, o, q[1], q[2], q[3]), t ? (_(n, l, o, t[0], t[1], t[3]), _(n, l, o, t[1], t[2], t[3])) : n.uv && n.uv.length && (_(n, l, o), _(n, l, o)), A && (u(n, C, o, h[0], h[1], h[3]), u(n, C, o, h[1], h[2], h[3])))
                }, x = function (H, x, j, Y) {
                    var d, P, V, N, J, G, K, _, w = p, y = p, e = p, X = -p, B = -p, A = -p;
                    for (d in H) for (G = H[d].vs, _ = G.length, P = 0; _ > P; P += 3) V = G[P + 0], N = G[P + 1], J = G[P + 2], w > V && (w = V), y > N && (y = N), e > J && (e = J), V > X && (X = V), N > B && (B = N), J > A && (A = J);
                    var r;
                    if (j) {
                        var U = w + (X - w) / 2, h = y + (B - y) / 2, t = e + (A - e) / 2;
                        for (d in H) {
                            for (G = H[d].vs, _ = G.length, P = 0; _ > P; P += 3) G[P + 0] -= U, G[P + 1] -= h, G[P + 2] -= t;
                            if (K = H[d].lvs) for (_ = K.length, P = 0; _ > P; P += 3) K[P + 0] -= U, K[P + 1] -= h, K[P + 2] -= t
                        }
                        r = [U, h, t]
                    }
                    var n, v, S;
                    j ? (n = X - w, v = B - y, S = A - e) : (n = 2 * a(T(w), T(X)), v = 2 * a(T(y), T(B)), S = 2 * a(T(e), T(A))), 0 === n && (n = Math.min(v, S) / 1e3 || .001), 0 === v && (v = Math.min(n, S) / 1e3 || .001), 0 === S && (S = Math.min(n, v) / 1e3 || .001), Y.rawS3 = [n, v, S];
                    for (d in H) {
                        if (G = H[d].vs, K = H[d].lvs, x) {
                            for (_ = G.length, P = 0; _ > P; P += 3) n && (G[P + 0] /= n), v && (G[P + 1] /= v), S && (G[P + 2] /= S);
                            if (K) for (_ = K.length, P = 0; _ > P; P += 3) n && (K[P + 0] /= n), v && (K[P + 1] /= v), S && (K[P + 2] /= S);
                            var D = H[d].ns;
                            if (D) {
                                _ = D.length;
                                var o = new l.Math.Vector3;
                                for (P = 0; _ > P; P += 3) o.set(D[P + 0] * n, D[P + 1] * v, D[P + 2] * S).normalize(), D[P + 0] = o.x, D[P + 1] = o.y, D[P + 2] = o.z
                            }
                        }
                        H[d].rawS3 = Y.rawS3, r && (H[d].center = r)
                    }
                };
            return function (s, n, y) {
                if (!s) return S;
                ($.isString(n) || n instanceof ArrayBuffer) && (n = C(n)), y || (y = {}), y.flipY == S && (y.flipY = !0), (y.s3 || y.r3 || y.t3 || y.mat) && (y.matrix = $.createWorldMatrix(y.mat, y.s3, y.r3, y.rotationMode, y.t3));
                var I, W, U, m, p = l.Style["wf.loadQuadWireframe"], j = [], L = [], P = y.ignoreNormal ? S : [],
                    T = y.reverseFlipMtls, b = {vs: [], uv: [], ns: P ? [] : S}, M = {htdefault: b}, A = new Y(s), K = "",
                    t = "";
                for (P && y.matrix && (y.normalMatrix = $.createNormalMatrix(y.matrix)); null != (W = A.stepNext());) if (W = W.trim(), 0 !== W.length && "#" !== W.charAt(0)) if (W.indexOf("\\") !== W.length - 1) {
                    if (K && (W = K + W, K = ""), W.indexOf("#QNAN0") >= 0 && (W = W.replace(/#QNAN0/gi, "0")), U = q.exec(W)) j.push([parseFloat(U[1]), parseFloat(U[2]), parseFloat(U[3])]); else if (U = J.exec(W)) L.push([parseFloat(U[1]), parseFloat(U[2])]); else if (P && (U = H.exec(W))) y.flipFace ? P.push([parseFloat(-U[1]), parseFloat(-U[2]), parseFloat(-U[3])]) : P.push([parseFloat(U[1]), parseFloat(U[2]), parseFloat(U[3])]); else if ("f" === W[0]) {
                        var k = W.split(/\s+/);
                        if (k.length < 4) continue;
                        var D, I, u, h = [], V = [], Z = [];
                        for (I = 1, u = k.length; u > I; I++) D = k[I].split("/"), h.push(parseInt(D[0], 10)), D.length > 1 && D[1].length > 0 && Z.push(parseInt(D[1], 10)), D.length > 2 && D[2].length > 0 && V.push(parseInt(D[2], 10));
                        for (I = 0, u = h.length - 2; u > I; I++) B(b, j, L, P, y, [h[0], h[I + 1], h[I + 2]], Z.length ? [Z[0], Z[I + 1], Z[I + 2]] : S, V.length ? [V[0], V[I + 1], V[I + 2]] : S);
                        p && w(b, j, y, h)
                    } else if (y.part && null !== (U = g.exec(W))) t = (" " + U[0].substr(1).trim()).substr(1); else if (/^usemtl /.test(W)) {
                        var O = W.substring(7).trim();
                        O.split(" ").forEach(function (J) {
                            var Q = y.part ? t + "_" + J : J;
                            (b = M[Q]) || (b = M[Q] = {
                                name: Q,
                                vs: [],
                                uv: [],
                                ns: P ? [] : S,
                                lvs: p ? [] : S
                            }, y.ignoreMtls && y.ignoreMtls.indexOf(J) >= 0 && delete b.vs, (y.reverseFlip || "*" === T || T && T.indexOf(J) >= 0) && (b.reverseFlip = !0), c(n, b, y, J))
                        })
                    }
                } else K += W.substring(0, W.length - 1);
                var a = [];
                for (var i in M) {
                    var E = M[i].vs;
                    if (E && 0 !== E.length) {
                        var d = M[i].uv;
                        if (d) for (var R = 2 * E.length / 3 - d.length; R-- > 0;) d.push(0)
                    } else a.push(i)
                }
                a.forEach(function (o) {
                    delete M[o]
                }), x(M, y.cube, y.center, y);
                var v = y.shape3d;
                if (v) {
                    var X = [];
                    for (var m in M) {
                        var b = M[m];
                        X.rawS3 = b.rawS3, b.center && (X.center = b.center), X.push(b)
                    }
                    f.setShape3dModel(v, X)
                }
                return M
            }
        }(), C = function (l) {
            var a = {};
            if (l) for (var V, h, Q, n, x, U, D = new Y(l), B = /\s+/; null != (h = D.stepNext());) h = h.trim(), 0 !== h.length && "#" !== h.charAt(0) && (Q = h.indexOf(" "), n = (Q ? h.substring(0, Q) : h).toLowerCase(), x = (Q ? h.substring(Q + 1) : "").trim(), "newmtl" === n ? a[x] = V = {name: x} : V && ("ka" === n || "kd" === n || "ks" === n ? (U = x.split(B, 3), V[n] = [parseFloat(U[0]), parseFloat(U[1]), parseFloat(U[2]), 1]) : V[n] = "ns" === n || "d" === n ? parseFloat(x) : x));
            return a
        }, Y = function (F) {
            var u = this;
            if (F instanceof ArrayBuffer) {
                u.isBuffer = !0;
                var s = 0, I = new Uint8Array(F), C = I.length, k = I.length;
                u.stepNext = function () {
                    for (var H, F, l = s; C > s;) if (H = I[s], F = H >> 4, 12 === F || 13 == F) s += 2; else if (14 === F) s += 3; else if (s++, 10 === H) return String.fromCharCode.apply(null, I.subarray(l, s));
                    return s > l ? String.fromCharCode.apply(null, I.subarray(l, s)) : null
                }
            } else {
                u.isBuffer = !1;
                var E = F.split("\n"), _ = 0, k = E.length;
                u.stepNext = function () {
                    return k > _ ? E[_++] : null
                }
            }
        };
    Y.prototype = {}, Y.prototype.constructor = Y, $.addMethod(f, {
        loadObj: function (q, N, x) {
            x = x || {};
            var Z = !1;
            /(MSIE |Trident\/|Edge\/)/.test(y.navigator.userAgent) && (Z = !0);
            var o = function (J) {
                var s, z = x.finishFunc, r = x.shape3d, m = J ? P(J[0], J[1], x) : null;
                if (m) {
                    if (r) s = f.getShape3dModel(r); else {
                        s = [];
                        for (var Y in m) {
                            var c = m[Y];
                            s.rawS3 = c.rawS3, s.push(c)
                        }
                    }
                    z && z(m, s, s.rawS3)
                } else z && z(null)
            };
            if (Z) {
                x.responseType = "arraybuffer";
                var t = function (P) {
                    f.xhrLoad(q, function (d) {
                        o([d, P])
                    }, x)
                };
                N ? f.xhrLoad(N, function (W) {
                    t(W)
                }, x) : t()
            } else f.xhrLoad(N ? [q, N] : [q], o, x)
        }, parseObj: function (M, V, t) {
            return P(M, V, t)
        }
    });
    var W = l.ByteBuffer = function (w, r, l) {
        if ("undefined" == typeof w && (w = W.DEFAULT_CAPACITY), "undefined" == typeof r && (r = W.DEFAULT_ENDIAN), "undefined" == typeof l && (l = W.DEFAULT_NOASSERT), !l) {
            if (w = 0 | w, 0 > w) throw RangeError("Illegal capacity");
            r = !!r, l = !!l
        }
        this.buffer = 0 === w ? x : new ArrayBuffer(w), this.view = 0 === w ? null : new Uint8Array(this.buffer), this.offset = 0, this.markedOffset = -1, this.limit = w, this.littleEndian = r, this.noAssert = l, this.bufferId = 0
    }, x = new ArrayBuffer(0);
    r.defineProperties(W.prototype, {
        offset: {
            get: function () {
                return this._offset
            }, set: function (X) {
                this._offset = X, X && X >= this.limit && this.trySwitchNextBuffer()
            }
        }
    }), W.LITTLE_ENDIAN = !0, W.BIG_ENDIAN = !1, W.DEFAULT_CAPACITY = 16, W.DEFAULT_ENDIAN = W.BIG_ENDIAN, W.DEFAULT_NOASSERT = !1, W.METRICS_BYTES = "b";
    var Q = String.fromCharCode, A = W.prototype;
    A.trySwitchNextBuffer = function () {
        var V = this.buffers[++this.bufferId];
        V && (this.buffer = V, this.limit = V.byteLength, this.offset = 0, this.view = V.byteLength > 0 ? new Uint8Array(V) : null)
    }, A.readUint8 = function (I) {
        var C = "undefined" == typeof I;
        if (C && (I = this.offset), !this.noAssert) {
            if ("number" != typeof I || 0 !== I % 1) throw TypeError("Illegal offset: " + I + " (not an integer)");
            if (I >>>= 0, 0 > I || I + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + I + " (+" + 1 + ") <= " + this.buffer.byteLength)
        }
        var d = this.view[I];
        return C && (this.offset += 1), d
    }, A.readUint16 = function (a) {
        var C = "undefined" == typeof a;
        if (C && (a = this.offset), !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0, 0 > a || a + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+" + 2 + ") <= " + this.buffer.byteLength)
        }
        var W = 0;
        return this.littleEndian ? (W = this.view[a], W |= this.view[a + 1] << 8) : (W = this.view[a] << 8, W |= this.view[a + 1]), C && (this.offset += 2), W
    }, A.readUint24 = function (T) {
        var y = "undefined" == typeof T;
        if (y && (T = this.offset), !this.noAssert) {
            if ("number" != typeof T || 0 !== T % 1) throw TypeError("Illegal offset: " + T + " (not an integer)");
            if (T >>>= 0, 0 > T || T + 3 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + T + " (+" + 4 + ") <= " + this.buffer.byteLength)
        }
        var Y = 0;
        return this.littleEndian ? (Y = this.view[T + 2] << 16, Y |= this.view[T + 1] << 8, Y |= this.view[T]) : (Y = this.view[T + 1] << 8, Y |= this.view[T + 2], Y += this.view[T] << 16 >>> 0), Y |= 0, y && (this.offset += 3), Y
    }, A.readUint32 = function (P) {
        var N = "undefined" == typeof P;
        if (N && (P = this.offset), !this.noAssert) {
            if ("number" != typeof P || 0 !== P % 1) throw TypeError("Illegal offset: " + P + " (not an integer)");
            if (P >>>= 0, 0 > P || P + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + P + " (+" + 4 + ") <= " + this.buffer.byteLength)
        }
        var $ = 0;
        return this.littleEndian ? ($ = this.view[P + 2] << 16, $ |= this.view[P + 1] << 8, $ |= this.view[P], $ += this.view[P + 3] << 24 >>> 0) : ($ = this.view[P + 1] << 16, $ |= this.view[P + 2] << 8, $ |= this.view[P + 3], $ += this.view[P] << 24 >>> 0), N && (this.offset += 4), $
    }, A.readFloat32 = function (C) {
        var N = "undefined" == typeof C;
        if (N && (C = this.offset), !this.noAssert) {
            if ("number" != typeof C || 0 !== C % 1) throw TypeError("Illegal offset: " + C + " (not an integer)");
            if (C >>>= 0, 0 > C || C + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + C + " (+" + 4 + ") <= " + this.buffer.byteLength)
        }
        var w = o(this.view, C, this.littleEndian, 23, 4);
        return N && (this.offset += 4), w
    };
    var m = function () {
        var R = {};
        return R.MAX_CODEPOINT = 1114111, R.decodeUTF8 = function (e, F) {
            for (var b, d, t, N, f = function (V) {
                V = V.slice(0, V.indexOf(null));
                var N = Error(V.toString());
                throw N.name = "TruncatedError", N.bytes = V, N
            }; null !== (b = e());) if (0 === (128 & b)) F(b); else if (192 === (224 & b)) null === (d = e()) && f([b, d]), F((31 & b) << 6 | 63 & d); else if (224 === (240 & b)) (null === (d = e()) || null === (t = e())) && f([b, d, t]), F((15 & b) << 12 | (63 & d) << 6 | 63 & t); else {
                if (240 !== (248 & b)) throw RangeError("Illegal starting byte: " + b);
                (null === (d = e()) || null === (t = e()) || null === (N = e())) && f([b, d, t, N]), F((7 & b) << 18 | (63 & d) << 12 | (63 & t) << 6 | 63 & N)
            }
        }, R.UTF16toUTF8 = function (c, e) {
            for (var E, f = null; ;) {
                if (null === (E = null !== f ? f : c())) break;
                E >= 55296 && 57343 >= E && null !== (f = c()) && f >= 56320 && 57343 >= f ? (e(1024 * (E - 55296) + f - 56320 + 65536), f = null) : e(E)
            }
            null !== f && e(f)
        }, R.UTF8toUTF16 = function (n, d) {
            var o = null;
            for ("number" == typeof n && (o = n, n = function () {
                return null
            }); null !== o || null !== (o = n());) 65535 >= o ? d(o) : (o -= 65536, d((o >> 10) + 55296), d(o % 1024 + 56320)), o = null
        }, R.decodeUTF8toUTF16 = function (Q, T) {
            R.decodeUTF8(Q, function (g) {
                R.UTF8toUTF16(g, T)
            })
        }, R.calculateCodePoint = function (O) {
            return 128 > O ? 1 : 2048 > O ? 2 : 65536 > O ? 3 : 4
        }, R.calculateUTF8 = function (w) {
            for (var o, p = 0; null !== (o = w());) p += 128 > o ? 1 : 2048 > o ? 2 : 65536 > o ? 3 : 4;
            return p
        }, R.calculateUTF16asUTF8 = function (s) {
            var H = 0, b = 0;
            return R.UTF16toUTF8(s, function (i) {
                ++H, b += 128 > i ? 1 : 2048 > i ? 2 : 65536 > i ? 3 : 4
            }), [H, b]
        }, R
    }();
    A.readString = function (s, c, K) {
        "number" == typeof c && (K = c, c = Z);
        var R = "undefined" == typeof K;
        if (R && (K = this.offset), "undefined" == typeof c && (c = W.METRICS_CHARS), !this.noAssert) {
            if ("number" != typeof s || 0 !== s % 1) throw TypeError("Illegal length: " + s + " (not an integer)");
            if (s |= 0, "number" != typeof K || 0 !== K % 1) throw TypeError("Illegal offset: " + K + " (not an integer)");
            if (K >>>= 0, 0 > K || K + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + K + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        var T, L = 0, y = K;
        if (c === W.METRICS_CHARS) {
            if (T = F(), m.decodeUTF8(function () {
                return s > L && K < this.limit ? this.view[K++] : null
            }.bind(this), function (C) {
                ++L, m.UTF8toUTF16(C, T)
            }), L !== s) throw RangeError("Illegal range: Truncated data, " + L + " == " + s);
            return R ? (this.offset = K, T()) : {string: T(), length: K - y}
        }
        if (c === W.METRICS_BYTES) {
            if (!this.noAssert) {
                if ("number" != typeof K || 0 !== K % 1) throw TypeError("Illegal offset: " + K + " (not an integer)");
                if (K >>>= 0, 0 > K || K + s > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + K + " (+" + s + ") <= " + this.buffer.byteLength)
            }
            var z = K + s;
            if (m.decodeUTF8toUTF16(function () {
                return z > K ? this.view[K++] : null
            }.bind(this), T = F(), this.noAssert), K !== z) throw RangeError("Illegal range: Truncated data, " + K + " == " + z);
            return R ? (this.offset = K, T()) : {string: T(), length: K - y}
        }
        throw TypeError("Unsupported metrics: " + c)
    };
    var u = function (S) {
        if (S.length) {
            for (var j = 0; j < S.length; j++) if (!S[j]) return;
            var l = S[0], E = new W(0);
            E.buffer = l, E.limit = l.byteLength, E.view = l.byteLength > 0 ? new Uint8Array(l) : null, E.buffers = S;
            var w = [], D = E.readUint8(10);
            return d(w, E), I(w, E), g(w, E, D), w
        }
    }, d = function (D, t) {
        t.offset += 19
    }, I = function (s, U) {
        var w = U.readUint8();
        1 & w && (s.center = J(U)), 2 & w && (s.rawS3 = J(U))
    }, t = function (y) {
        return [y.readFloat32(), y.readFloat32()]
    }, J = function (I) {
        return [I.readFloat32(), I.readFloat32(), I.readFloat32()]
    }, E = function (U) {
        var a = U.readUint32();
        return U.readString(a, W.METRICS_BYTES)
    }, g = function (R, O, M) {
        for (var W = ((M || 0) << 8) + O.readUint8(), D = 0; W > D; D++) R.push(z(O))
    }, z = function (x) {
        var $ = {}, b = x.readUint32(), H = 0, G = b & 1 << H++, Z = b & 1 << H++, T = b & 1 << H++, P = b & 1 << H++,
            U = b & 1 << H++, r = b & 1 << H++, L = b & 1 << H++, z = b & 1 << H++, v = b & 1 << H++, u = b & 1 << H++,
            F = b & 1 << H++, Y = b & 1 << H++;
        return (G || Z) && i($, x, 3, "vs", "lvs"), T && i($, x, 2, "uv"), P && i($, x, 3, "ns"), U && ($.name = E(x)), r && ($.color = J(x)), L && ($.transparent = !!x.readUint8()), z && ($.opacity = x.readFloat32()), v && ($.uvoffset = t(x)), u && ($.uvScale = J(x)), F && ($.image = E(x)), Y && ($.reverseFlip = !!x.readUint8()), $
    }, c = 16383, B = function (S) {
        var w = S.readUint16(), A = 16384 & w, a = 32768 & w, s = (w & c) / c, U = 0;
        return a && (U = S.readUint16()), (A ? 1 : -1) * (U + s)
    }, U = function (h) {
        var i = h.readUint32(), o = i & 1 << 30, k = i & 1 << 29, n = i & 1 << 28, B = 16383, S = (16383 & i >> 14) / B,
            D = (16383 & i) / B, E = Math.sqrt(1 - S * S - D * D) || 0;
        return [S * (o ? 1 : -1), D * (k ? 1 : -1), E * (n ? 1 : -1)]
    }, i = function (D, S, r, R, Z) {
        var x = S.readUint32();
        S.readUint8();
        var F, d, _, O = S.readUint32(), u = S.readUint32(), H = [];
        if ("uv" === R) for (F = 0; x > F; F++) d = B(S), _ = B(S), H.push([d, _]); else if ("ns" === R) for (F = 0; x > F; F++) H.push(U(S)); else for (var F = 0; x > F; F++) H.push(J(S));
        var M;
        M = 256 > x ? "readUint8" : 65536 > x ? "readUint16" : 16777216 > x ? "readUint24" : "readUint32";
        var f, p, V;
        if (O) for (f = D[R] = [], F = 0; O > F; F++) p = S[M](), V = H[p], "uv" === R ? f.push(V[0], V[1]) : f.push(V[0], V[1], V[2]);
        if (u) for (f = D[Z] = [], F = 0; u > F; F++) p = S[M](), V = H[p], f.push(V[0], V[1], V[2])
    };
    f.getInternal().addMethod(f, {
        loadBin: function (W, i) {
            i = i || {};
            var d = function (Y) {
                var E, H = i.finishFunc, e = i.shape3d, M = u(Y);
                if (M) {
                    if (e) E = f.getShape3dModel(e); else {
                        E = [];
                        for (var D in M) {
                            var c = M[D];
                            E.rawS3 = c.rawS3, E.push(c)
                        }
                    }
                    H && H(M, E, E.rawS3)
                } else H && H(null)
            }, M = function (N) {
                var L = i.finishFunc;
                if (!N) return L && L(null), void 0;
                if (N.byteLength < 50) {
                    var G = new Uint8Array(N), s = G[9];
                    if (s > 1) {
                        for (var X = [], Q = W.substr(0, W.length - 4), A = 1; s > A; A++) X.push(Q + A + ".bin");
                        return f.xhrLoad(X, function (K) {
                            K.splice(0, 0, N), d(K)
                        }, i), void 0
                    }
                }
                d([N])
            };
            i.responseType = "arraybuffer", f.xhrLoad(W, function (d) {
                M(d)
            }, i)
        }, parseBin: function (f) {
            return u([f])
        }
    })
}("undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : (0, eval)("this"), Object);
