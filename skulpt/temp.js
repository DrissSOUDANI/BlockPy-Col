JavaScript debugger enabled
/*     1 */ $compiledmod = function() {
/*     2 */     var $scope120 = (function($modname) {
/*     3 */         var $loadname130, $loadname132, $loadname133, $loadname132, $loadname133, $lattr134, $loadname136, $loadname137, $loadname136, $loadname137, $lattr138;
/*     4 */         var $wakeFromSuspension = function() {
/*     5 */             var susp = $scope120.$wakingSuspension;
/*     6 */             delete $scope120.$wakingSuspension;
/*     7 */             $blk = susp.$blk;
/*     8 */             $loc = susp.$loc;
/*     9 */             $gbl = susp.$gbl;
/*    10 */             $exc = susp.$exc;
/*    11 */             $err = susp.$err;
/*    12 */             $currLineNo = susp.$lineno;
/*    13 */             $currColNo = susp.$colno;
/*    14 */             Sk.lastYield = Date.now();
/*    15 */             $loadname130 = susp.$tmps.$loadname130;
/*    16 */             $loadname132 = susp.$tmps.$loadname132;
/*    17 */             $loadname133 = susp.$tmps.$loadname133;
/*    18 */             $lattr134 = susp.$tmps.$lattr134;
/*    19 */             $loadname136 = susp.$tmps.$loadname136;
/*    20 */             $loadname137 = susp.$tmps.$loadname137;
/*    21 */             $lattr138 = susp.$tmps.$lattr138;
/*    22 */             try {
/*    23 */                 $ret = susp.child.resume();
/*    24 */             } catch (err) {
/*    25 */                 if (!(err instanceof Sk.builtin.BaseException)) {
/*    26 */                     err = new Sk.builtin.ExternalError(err);
/*    27 */                 }
/*    28 */                 err.traceback.push({
/*    29 */                     lineno: $currLineNo,
/*    30 */                     colno: $currColNo,
/*    31 */                     filename: './my_test.py'
/*    32 */                 });
/*    33 */                 if ($exc.length > 0) {
/*    34 */                     $err = err;
/*    35 */                     $blk = $exc.pop();
/*    36 */                 } else {
/*    37 */                     throw err;
/*    38 */                 }
/*    39 */             }
/*    40 */         };
/*    41 */         var $saveSuspension = function($child, $filename, $lineno, $colno) {
/*    42 */             var susp = new Sk.misceval.Suspension();
/*    43 */             susp.child = $child;
/*    44 */             susp.resume = function() {
/*    45 */                 $scope120.$wakingSuspension = susp;
/*    46 */                 return $scope120();
/*    47 */             };
/*    48 */             susp.data = susp.child.data;
/*    49 */             susp.$blk = $blk;
/*    50 */             susp.$loc = $loc;
/*    51 */             susp.$gbl = $gbl;
/*    52 */             susp.$exc = $exc;
/*    53 */             susp.$err = $err;
/*    54 */             susp.$filename = $filename;
/*    55 */             susp.$lineno = $lineno;
/*    56 */             susp.$colno = $colno;
/*    57 */             susp.optional = susp.child.optional;
/*    58 */             susp.$tmps = {
/*    59 */                 "$loadname130": $loadname130,
/*    60 */                 "$loadname132": $loadname132,
/*    61 */                 "$loadname133": $loadname133,
/*    62 */                 "$lattr134": $lattr134,
/*    63 */                 "$loadname136": $loadname136,
/*    64 */                 "$loadname137": $loadname137,
/*    65 */                 "$lattr138": $lattr138
/*    66 */             };
/*    67 */             return susp;
/*    68 */         };
/*    69 */         var $gbl = {},
/*    70 */             $blk = 0,
/*    71 */             $exc = [],
/*    72 */             $loc = $gbl,
/*    73 */             $err = undefined;
/*    74 */         $gbl.__name__ = $modname;
/*    75 */         $loc.__file__ = new Sk.builtins.str('./my_test.py');
/*    76 */         var $ret = undefined,
/*    77 */             $currLineNo = undefined,
/*    78 */             $currColNo = undefined;
/*    79 */         if (typeof Sk.execStart === 'undefined') {
/*    80 */             Sk.execStart = Date.now()
/*    81 */         }
/*    82 */         if (typeof Sk.lastYield === 'undefined') {
/*    83 */             Sk.lastYield = Date.now()
/*    84 */         }
/*    85 */         if ($scope120.$wakingSuspension !== undefined) {
/*    86 */             $wakeFromSuspension();
/*    87 */         }
/*    88 */         if (Sk.retainGlobals) {
/*    89 */             if (Sk.globals) {
/*    90 */                 $gbl = Sk.globals;
/*    91 */                 Sk.globals = $gbl;
/*    92 */                 $loc = $gbl;
/*    93 */             } else {
/*    94 */                 Sk.globals = $gbl;
/*    95 */             }
/*    96 */         } else {
/*    97 */             Sk.globals = $gbl;
/*    98 */         }
/*    99 */         while (true) {
/*   100 */             try {
/*   101 */                 var $dateNow = Date.now();
/*   102 */                 if ($dateNow - Sk.execStart > Sk.execLimit) {
/*   103 */                     throw new Sk.builtin.TimeLimitError(Sk.timeoutMsg())
/*   104 */                 }
/*   105 */                 if ($dateNow - Sk.lastYield > Sk.yieldLimit) {
/*   106 */                     var $susp = $saveSuspension({
/*   107 */                         data: {
/*   108 */                             type: 'Sk.yield'
/*   109 */                         },
/*   110 */                         resume: function() {}
/*   111 */                     }, './my_test.py', $currLineNo, $currColNo);
/*   112 */                     $susp.$blk = $blk;
/*   113 */                     $susp.optional = true;
/*   114 */                     return $susp;
/*   115 */                 }
/*   116 */                 switch ($blk) {
/*   117 */                 case 0:
/*   118 */                     /* --- module entry --- */
/*   119 */                     //
/*   120 */                     // line 1:
/*   121 */                     // class TestClass():
/*   122 */                     // ^
/*   123 */                     //
/*   124 */                     Sk.currLineNo = 1;
/*   125 */                     Sk.currColNo = 0;
/*   126 */ 
/*   127 */ 
/*   128 */                     Sk.currFilename = './my_test.py';
/*   129 */ 
/*   130 */ 
/*   131 */                     if (typeof Sk.afterSingleExecution == 'function') {
/*   132 */                         Sk.afterSingleExecution($gbl, Sk.currLineNo, Sk.currColNo, Sk.currFilename, 'ClassDef', {
/*   133 */                             "name": {
/*   134 */                                 "v": "TestClass"
/*   135 */                             },
/*   136 */                             "bases": [],
/*   137 */                             "body": [{
/*   138 */                                 "name": {
/*   139 */                                     "v": "__getattr__"
/*   140 */                                 },
/*   141 */                                 "args": {
/*   142 */                                     "args": [{
/*   143 */                                         "id": {
/*   144 */                                             "v": "self"
/*   145 */                                         },
/*   146 */                                         "lineno": 2,
/*   147 */                                         "col_offset": 20,
/*   148 */                                         "endlineno": 2,
/*   149 */                                         "col_endoffset": 24},
/*   150 */                                     {
/*   151 */                                         "id": {
/*   152 */                                             "v": "key"
/*   153 */                                         },
/*   154 */                                         "lineno": 2,
/*   155 */                                         "col_offset": 26,
/*   156 */                                         "endlineno": 2,
/*   157 */                                         "col_endoffset": 24}],
/*   158 */                                     "vararg": null,
/*   159 */                                     "kwarg": null,
/*   160 */                                     "defaults": []
/*   161 */                                 },
/*   162 */                                 "body": [{
/*   163 */                                     "test": {
/*   164 */                                         "left": {
/*   165 */                                             "id": {
/*   166 */                                                 "v": "key"
/*   167 */                                             },
/*   168 */                                             "lineno": 3,
/*   169 */                                             "col_offset": 11,
/*   170 */                                             "endlineno": 3,
/*   171 */                                             "col_endoffset": 14
/*   172 */                                         },
/*   173 */                                         "ops": [null],
/*   174 */                                         "comparators": [{
/*   175 */                                             "s": {
/*   176 */                                                 "v": "t"
/*   177 */                                             },
/*   178 */                                             "lineno": 3,
/*   179 */                                             "col_offset": 18,
/*   180 */                                             "endlineno": 3,
/*   181 */                                             "col_endoffset": 21}],
/*   182 */                                         "lineno": 3,
/*   183 */                                         "col_offset": 11,
/*   184 */                                         "endlineno": 3,
/*   185 */                                         "col_endoffset": 14
/*   186 */                                     },
/*   187 */                                     "body": [{
/*   188 */                                         "value": {
/*   189 */                                             "n": {
/*   190 */                                                 "v": 5
/*   191 */                                             },
/*   192 */                                             "lineno": 4,
/*   193 */                                             "col_offset": 19,
/*   194 */                                             "endlineno": 4,
/*   195 */                                             "col_endoffset": 20
/*   196 */                                         },
/*   197 */                                         "lineno": 4,
/*   198 */                                         "col_offset": 12,
/*   199 */                                         "endlineno": 4,
/*   200 */                                         "col_endoffset": 18}],
/*   201 */                                     "orelse": [],
/*   202 */                                     "lineno": 3,
/*   203 */                                     "col_offset": 8,
/*   204 */                                     "endlineno": 3,
/*   205 */                                     "col_endoffset": 10}],
/*   206 */                                 "decorator_list": [],
/*   207 */                                 "lineno": 2,
/*   208 */                                 "col_offset": 4,
/*   209 */                                 "endlineno": 2,
/*   210 */                                 "col_endoffset": 7,
/*   211 */                                 "scopeId": 20}],
/*   212 */                             "decorator_list": [],
/*   213 */                             "lineno": 1,
/*   214 */                             "col_offset": 0,
/*   215 */                             "endlineno": 1,
/*   216 */                             "col_endoffset": 5,
/*   217 */                             "scopeId": 19
/*   218 */                         });
/*   219 */                     }
/*   220 */                     currLineNo = 1;
/*   221 */                     currColNo = 0;
/*   222 */ 
/*   223 */                     $scope121.co_name = new Sk.builtins['str']('TestClass');
/*   224 */                     var $built129 = Sk.misceval.buildClass($gbl, $scope121, 'TestClass', []);
/*   225 */                     $loc.TestClass = $built129;
/*   226 */                     //
/*   227 */                     // line 5:
/*   228 */                     // t = TestClass()
/*   229 */                     // ^
/*   230 */                     //
/*   231 */                     Sk.currLineNo = 5;
/*   232 */                     Sk.currColNo = 0;
/*   233 */ 
/*   234 */ 
/*   235 */                     Sk.currFilename = './my_test.py';
/*   236 */ 
/*   237 */ 
/*   238 */                     if (typeof Sk.afterSingleExecution == 'function') {
/*   239 */                         Sk.afterSingleExecution($gbl, Sk.currLineNo, Sk.currColNo, Sk.currFilename, 'Assign', {
/*   240 */                             "targets": [{
/*   241 */                                 "id": {
/*   242 */                                     "v": "t"
/*   243 */                                 },
/*   244 */                                 "lineno": 5,
/*   245 */                                 "col_offset": 0,
/*   246 */                                 "endlineno": 5,
/*   247 */                                 "col_endoffset": 1}],
/*   248 */                             "value": {
/*   249 */                                 "func": {
/*   250 */                                     "id": {
/*   251 */                                         "v": "TestClass"
/*   252 */                                     },
/*   253 */                                     "lineno": 5,
/*   254 */                                     "col_offset": 4,
/*   255 */                                     "endlineno": 5,
/*   256 */                                     "col_endoffset": 13
/*   257 */                                 },
/*   258 */                                 "args": [],
/*   259 */                                 "keywords": [],
/*   260 */                                 "starargs": null,
/*   261 */                                 "kwargs": null,
/*   262 */                                 "lineno": 5,
/*   263 */                                 "col_offset": 4,
/*   264 */                                 "endlineno": 5,
/*   265 */                                 "col_endoffset": 13
/*   266 */                             },
/*   267 */                             "lineno": 5,
/*   268 */                             "col_offset": 0,
/*   269 */                             "endlineno": 5,
/*   270 */                             "col_endoffset": 1
/*   271 */                         });
/*   272 */                     }
/*   273 */                     currLineNo = 5;
/*   274 */                     currColNo = 0;
/*   275 */ 
/*   276 */                     var $loadname130 = $loc.TestClass !== undefined ? $loc.TestClass : Sk.misceval.loadname('TestClass', $gbl);;
/*   277 */                     $ret;
/*   278 */                     $ret = Sk.misceval.callsimOrSuspend($loadname130);
/*   279 */                     $blk = 1; /* allowing case fallthrough */
/*   280 */                 case 1:
/*   281 */                     /* --- function return or resume suspension --- */
/*   282 */                     if ($ret && $ret.$isSuspension) {
/*   283 */                         return $saveSuspension($ret, './my_test.py', 5, 4);
/*   284 */                     }
/*   285 */                     var $call131 = $ret;
/*   286 */                     //
/*   287 */                     // line 5:
/*   288 */                     // t = TestClass()
/*   289 */                     //     ^
/*   290 */                     //
/*   291 */                     Sk.currLineNo = 5;
/*   292 */                     Sk.currColNo = 4;
/*   293 */ 
/*   294 */ 
/*   295 */                     Sk.currFilename = './my_test.py';
/*   296 */ 
/*   297 */                     currLineNo = 5;
/*   298 */                     currColNo = 4;
/*   299 */ 
/*   300 */                     $loc.t = $call131;
/*   301 */                     //
/*   302 */                     // line 6:
/*   303 */                     // print(t.t)
/*   304 */                     // ^
/*   305 */                     //
/*   306 */                     Sk.currLineNo = 6;
/*   307 */                     Sk.currColNo = 0;
/*   308 */ 
/*   309 */ 
/*   310 */                     Sk.currFilename = './my_test.py';
/*   311 */ 
/*   312 */ 
/*   313 */                     if (typeof Sk.afterSingleExecution == 'function') {
/*   314 */                         Sk.afterSingleExecution($gbl, Sk.currLineNo, Sk.currColNo, Sk.currFilename, 'Expr', {
/*   315 */                             "value": {
/*   316 */                                 "func": {
/*   317 */                                     "id": {
/*   318 */                                         "v": "print"
/*   319 */                                     },
/*   320 */                                     "lineno": 6,
/*   321 */                                     "col_offset": 0,
/*   322 */                                     "endlineno": 6,
/*   323 */                                     "col_endoffset": 5
/*   324 */                                 },
/*   325 */                                 "args": [{
/*   326 */                                     "value": {
/*   327 */                                         "id": {
/*   328 */                                             "v": "t"
/*   329 */                                         },
/*   330 */                                         "lineno": 6,
/*   331 */                                         "col_offset": 6,
/*   332 */                                         "endlineno": 6,
/*   333 */                                         "col_endoffset": 7
/*   334 */                                     },
/*   335 */                                     "attr": {
/*   336 */                                         "v": "t"
/*   337 */                                     },
/*   338 */                                     "lineno": 6,
/*   339 */                                     "col_offset": 6,
/*   340 */                                     "endlineno": 6,
/*   341 */                                     "col_endoffset": 7}],
/*   342 */                                 "keywords": [],
/*   343 */                                 "starargs": null,
/*   344 */                                 "kwargs": null,
/*   345 */                                 "lineno": 6,
/*   346 */                                 "col_offset": 0,
/*   347 */                                 "endlineno": 6,
/*   348 */                                 "col_endoffset": 5
/*   349 */                             },
/*   350 */                             "lineno": 6,
/*   351 */                             "col_offset": 0,
/*   352 */                             "endlineno": 6,
/*   353 */                             "col_endoffset": 5
/*   354 */                         });
/*   355 */                     }
/*   356 */                     currLineNo = 6;
/*   357 */                     currColNo = 0;
/*   358 */ 
/*   359 */                     var $loadname132 = $loc.print !== undefined ? $loc.print : Sk.misceval.loadname('print', $gbl);;
/*   360 */                     var $loadname133 = $loc.t !== undefined ? $loc.t : Sk.misceval.loadname('t', $gbl);;
/*   361 */                     $ret = Sk.abstr.gattr($loadname133, 't', true);
/*   362 */                     $blk = 2; /* allowing case fallthrough */
/*   363 */                 case 2:
/*   364 */                     /* --- function return or resume suspension --- */
/*   365 */                     if ($ret && $ret.$isSuspension) {
/*   366 */                         return $saveSuspension($ret, './my_test.py', 6, 6);
/*   367 */                     }
/*   368 */                     var $lattr134 = $ret;
/*   369 */                     $ret;
/*   370 */                     $ret = Sk.misceval.callsimOrSuspend($loadname132, $lattr134);
/*   371 */                     $blk = 3; /* allowing case fallthrough */
/*   372 */                 case 3:
/*   373 */                     /* --- function return or resume suspension --- */
/*   374 */                     if ($ret && $ret.$isSuspension) {
/*   375 */                         return $saveSuspension($ret, './my_test.py', 6, 0);
/*   376 */                     }
/*   377 */                     var $call135 = $ret;
/*   378 */                     //
/*   379 */                     // line 6:
/*   380 */                     // print(t.t)
/*   381 */                     // ^
/*   382 */                     //
/*   383 */                     Sk.currLineNo = 6;
/*   384 */                     Sk.currColNo = 0;
/*   385 */ 
/*   386 */ 
/*   387 */                     Sk.currFilename = './my_test.py';
/*   388 */ 
/*   389 */                     currLineNo = 6;
/*   390 */                     currColNo = 0;
/*   391 */ 
/*   392 */ 
/*   393 */                     //
/*   394 */                     // line 7:
/*   395 */                     // print(t.x)
/*   396 */                     // ^
/*   397 */                     //
/*   398 */                     Sk.currLineNo = 7;
/*   399 */                     Sk.currColNo = 0;
/*   400 */ 
/*   401 */ 
/*   402 */                     Sk.currFilename = './my_test.py';
/*   403 */ 
/*   404 */ 
/*   405 */                     if (typeof Sk.afterSingleExecution == 'function') {
/*   406 */                         Sk.afterSingleExecution($gbl, Sk.currLineNo, Sk.currColNo, Sk.currFilename, 'Expr', {
/*   407 */                             "value": {
/*   408 */                                 "func": {
/*   409 */                                     "id": {
/*   410 */                                         "v": "print"
/*   411 */                                     },
/*   412 */                                     "lineno": 7,
/*   413 */                                     "col_offset": 0,
/*   414 */                                     "endlineno": 7,
/*   415 */                                     "col_endoffset": 5
/*   416 */                                 },
/*   417 */                                 "args": [{
/*   418 */                                     "value": {
/*   419 */                                         "id": {
/*   420 */                                             "v": "t"
/*   421 */                                         },
/*   422 */                                         "lineno": 7,
/*   423 */                                         "col_offset": 6,
/*   424 */                                         "endlineno": 7,
/*   425 */                                         "col_endoffset": 7
/*   426 */                                     },
/*   427 */                                     "attr": {
/*   428 */                                         "v": "x"
/*   429 */                                     },
/*   430 */                                     "lineno": 7,
/*   431 */                                     "col_offset": 6,
/*   432 */                                     "endlineno": 7,
/*   433 */                                     "col_endoffset": 7}],
/*   434 */                                 "keywords": [],
/*   435 */                                 "starargs": null,
/*   436 */                                 "kwargs": null,
/*   437 */                                 "lineno": 7,
/*   438 */                                 "col_offset": 0,
/*   439 */                                 "endlineno": 7,
/*   440 */                                 "col_endoffset": 5
/*   441 */                             },
/*   442 */                             "lineno": 7,
/*   443 */                             "col_offset": 0,
/*   444 */                             "endlineno": 7,
/*   445 */                             "col_endoffset": 5
/*   446 */                         });
/*   447 */                     }
/*   448 */                     currLineNo = 7;
/*   449 */                     currColNo = 0;
/*   450 */ 
/*   451 */                     var $loadname136 = $loc.print !== undefined ? $loc.print : Sk.misceval.loadname('print', $gbl);;
/*   452 */                     var $loadname137 = $loc.t !== undefined ? $loc.t : Sk.misceval.loadname('t', $gbl);;
/*   453 */                     $ret = Sk.abstr.gattr($loadname137, 'x', true);
/*   454 */                     $blk = 4; /* allowing case fallthrough */
/*   455 */                 case 4:
/*   456 */                     /* --- function return or resume suspension --- */
/*   457 */                     if ($ret && $ret.$isSuspension) {
/*   458 */                         return $saveSuspension($ret, './my_test.py', 7, 6);
/*   459 */                     }
/*   460 */                     var $lattr138 = $ret;
/*   461 */                     $ret;
/*   462 */                     $ret = Sk.misceval.callsimOrSuspend($loadname136, $lattr138);
/*   463 */                     $blk = 5; /* allowing case fallthrough */
/*   464 */                 case 5:
/*   465 */                     /* --- function return or resume suspension --- */
/*   466 */                     if ($ret && $ret.$isSuspension) {
/*   467 */                         return $saveSuspension($ret, './my_test.py', 7, 0);
/*   468 */                     }
/*   469 */                     var $call139 = $ret;
/*   470 */                     //
/*   471 */                     // line 7:
/*   472 */                     // print(t.x)
/*   473 */                     // ^
/*   474 */                     //
/*   475 */                     Sk.currLineNo = 7;
/*   476 */                     Sk.currColNo = 0;
/*   477 */ 
/*   478 */ 
/*   479 */                     Sk.currFilename = './my_test.py';
/*   480 */ 
/*   481 */                     currLineNo = 7;
/*   482 */                     currColNo = 0;
/*   483 */ 
/*   484 */                     return $loc;
/*   485 */                     throw new Sk.builtin.SystemError('internal error: unterminated block');
/*   486 */                 }
/*   487 */             } catch (err) {
/*   488 */                 if (!(err instanceof Sk.builtin.BaseException)) {
/*   489 */                     err = new Sk.builtin.ExternalError(err);
/*   490 */                 }
/*   491 */                 err.traceback.push({
/*   492 */                     lineno: $currLineNo,
/*   493 */                     colno: $currColNo,
/*   494 */                     filename: './my_test.py'
/*   495 */                 });
/*   496 */                 if ($exc.length > 0) {
/*   497 */                     $err = err;
/*   498 */                     $blk = $exc.pop();
/*   499 */                     continue;
/*   500 */                 } else {
/*   501 */                     throw err;
/*   502 */                 }
/*   503 */             }
/*   504 */         }
/*   505 */     });
/*   506 */     var $scope121 = (function $TestClass$class_outer($globals, $locals, $rest) {
/*   507 */         var $gbl = $globals,
/*   508 */             $loc = $locals;
/*   509 */         (function $TestClass$_closure() {
/*   510 */             var $blk = 0,
/*   511 */                 $exc = [],
/*   512 */                 $ret = undefined,
/*   513 */                 $currLineNo = undefined,
/*   514 */                 $currColNo = undefined;
/*   515 */             if (typeof Sk.execStart === 'undefined') {
/*   516 */                 Sk.execStart = Date.now()
/*   517 */             }
/*   518 */             while (true) {
/*   519 */                 try {
/*   520 */                     var $dateNow = Date.now();
/*   521 */                     if ($dateNow - Sk.execStart > Sk.execLimit) {
/*   522 */                         throw new Sk.builtin.TimeLimitError(Sk.timeoutMsg())
/*   523 */                     }
/*   524 */                     switch ($blk) {
/*   525 */                     case 0:
/*   526 */                         /* --- class entry --- */
/*   527 */                         //
/*   528 */                         // line 2:
/*   529 */                         //     def __getattr__(self, key):
/*   530 */                         //     ^
/*   531 */                         //
/*   532 */                         Sk.currLineNo = 2;
/*   533 */                         Sk.currColNo = 4;
/*   534 */ 
/*   535 */ 
/*   536 */                         Sk.currFilename = './my_test.py';
/*   537 */ 
/*   538 */ 
/*   539 */                         if (typeof Sk.afterSingleExecution == 'function') {
/*   540 */                             Sk.afterSingleExecution($gbl, Sk.currLineNo, Sk.currColNo, Sk.currFilename, 'FunctionDef', {
/*   541 */                                 "name": {
/*   542 */                                     "v": "__getattr__"
/*   543 */                                 },
/*   544 */                                 "args": {
/*   545 */                                     "args": [{
/*   546 */                                         "id": {
/*   547 */                                             "v": "self"
/*   548 */                                         },
/*   549 */                                         "lineno": 2,
/*   550 */                                         "col_offset": 20,
/*   551 */                                         "endlineno": 2,
/*   552 */                                         "col_endoffset": 24},
/*   553 */                                     {
/*   554 */                                         "id": {
/*   555 */                                             "v": "key"
/*   556 */                                         },
/*   557 */                                         "lineno": 2,
/*   558 */                                         "col_offset": 26,
/*   559 */                                         "endlineno": 2,
/*   560 */                                         "col_endoffset": 24}],
/*   561 */                                     "vararg": null,
/*   562 */                                     "kwarg": null,
/*   563 */                                     "defaults": []
/*   564 */                                 },
/*   565 */                                 "body": [{
/*   566 */                                     "test": {
/*   567 */                                         "left": {
/*   568 */                                             "id": {
/*   569 */                                                 "v": "key"
/*   570 */                                             },
/*   571 */                                             "lineno": 3,
/*   572 */                                             "col_offset": 11,
/*   573 */                                             "endlineno": 3,
/*   574 */                                             "col_endoffset": 14
/*   575 */                                         },
/*   576 */                                         "ops": [null],
/*   577 */                                         "comparators": [{
/*   578 */                                             "s": {
/*   579 */                                                 "v": "t"
/*   580 */                                             },
/*   581 */                                             "lineno": 3,
/*   582 */                                             "col_offset": 18,
/*   583 */                                             "endlineno": 3,
/*   584 */                                             "col_endoffset": 21}],
/*   585 */                                         "lineno": 3,
/*   586 */                                         "col_offset": 11,
/*   587 */                                         "endlineno": 3,
/*   588 */                                         "col_endoffset": 14
/*   589 */                                     },
/*   590 */                                     "body": [{
/*   591 */                                         "value": {
/*   592 */                                             "n": {
/*   593 */                                                 "v": 5
/*   594 */                                             },
/*   595 */                                             "lineno": 4,
/*   596 */                                             "col_offset": 19,
/*   597 */                                             "endlineno": 4,
/*   598 */                                             "col_endoffset": 20
/*   599 */                                         },
/*   600 */                                         "lineno": 4,
/*   601 */                                         "col_offset": 12,
/*   602 */                                         "endlineno": 4,
/*   603 */                                         "col_endoffset": 18}],
/*   604 */                                     "orelse": [],
/*   605 */                                     "lineno": 3,
/*   606 */                                     "col_offset": 8,
/*   607 */                                     "endlineno": 3,
/*   608 */                                     "col_endoffset": 10}],
/*   609 */                                 "decorator_list": [],
/*   610 */                                 "lineno": 2,
/*   611 */                                 "col_offset": 4,
/*   612 */                                 "endlineno": 2,
/*   613 */                                 "col_endoffset": 7,
/*   614 */                                 "scopeId": 20
/*   615 */                             });
/*   616 */                         }
/*   617 */                         currLineNo = 2;
/*   618 */                         currColNo = 4;
/*   619 */ 
/*   620 */                         $scope122.co_name = new Sk.builtins['str']('__getattr__');
/*   621 */                         $scope122.co_varnames = ['self', 'key'];
/*   622 */                         var $funcobj128 = new Sk.builtins['function']($scope122, $gbl);
/*   623 */                         $loc.__getattr__ = $funcobj128;
/*   624 */                         return;
/*   625 */                         throw new Sk.builtin.SystemError('internal error: unterminated block');
/*   626 */                     }
/*   627 */                 } catch (err) {
/*   628 */                     if (!(err instanceof Sk.builtin.BaseException)) {
/*   629 */                         err = new Sk.builtin.ExternalError(err);
/*   630 */                     }
/*   631 */                     err.traceback.push({
/*   632 */                         lineno: $currLineNo,
/*   633 */                         colno: $currColNo,
/*   634 */                         filename: './my_test.py'
/*   635 */                     });
/*   636 */                     if ($exc.length > 0) {
/*   637 */                         $err = err;
/*   638 */                         $blk = $exc.pop();
/*   639 */                         continue;
/*   640 */                     } else {
/*   641 */                         throw err;
/*   642 */                     }
/*   643 */                 }
/*   644 */             }
/*   645 */         }).apply(null, $rest);
/*   646 */     });
/*   647 */     var $scope122 = (function $__getattr__123$(self, key) {
/*   648 */         var key, key, self, $compareres124, $str125;
/*   649 */         var $wakeFromSuspension = function() {
/*   650 */             var susp = $scope122.$wakingSuspension;
/*   651 */             delete $scope122.$wakingSuspension;
/*   652 */             $blk = susp.$blk;
/*   653 */             $loc = susp.$loc;
/*   654 */             $gbl = susp.$gbl;
/*   655 */             $exc = susp.$exc;
/*   656 */             $err = susp.$err;
/*   657 */             $currLineNo = susp.$lineno;
/*   658 */             $currColNo = susp.$colno;
/*   659 */             Sk.lastYield = Date.now();
/*   660 */             key = susp.$tmps.key;
/*   661 */             self = susp.$tmps.self;
/*   662 */             $compareres124 = susp.$tmps.$compareres124;
/*   663 */             $str125 = susp.$tmps.$str125;
/*   664 */             try {
/*   665 */                 $ret = susp.child.resume();
/*   666 */             } catch (err) {
/*   667 */                 if (!(err instanceof Sk.builtin.BaseException)) {
/*   668 */                     err = new Sk.builtin.ExternalError(err);
/*   669 */                 }
/*   670 */                 err.traceback.push({
/*   671 */                     lineno: $currLineNo,
/*   672 */                     colno: $currColNo,
/*   673 */                     filename: './my_test.py'
/*   674 */                 });
/*   675 */                 if ($exc.length > 0) {
/*   676 */                     $err = err;
/*   677 */                     $blk = $exc.pop();
/*   678 */                 } else {
/*   679 */                     throw err;
/*   680 */                 }
/*   681 */             }
/*   682 */         };
/*   683 */         var $saveSuspension = function($child, $filename, $lineno, $colno) {
/*   684 */             var susp = new Sk.misceval.Suspension();
/*   685 */             susp.child = $child;
/*   686 */             susp.resume = function() {
/*   687 */                 $scope122.$wakingSuspension = susp;
/*   688 */                 return $scope122();
/*   689 */             };
/*   690 */             susp.data = susp.child.data;
/*   691 */             susp.$blk = $blk;
/*   692 */             susp.$loc = $loc;
/*   693 */             susp.$gbl = $gbl;
/*   694 */             susp.$exc = $exc;
/*   695 */             susp.$err = $err;
/*   696 */             susp.$filename = $filename;
/*   697 */             susp.$lineno = $lineno;
/*   698 */             susp.$colno = $colno;
/*   699 */             susp.optional = susp.child.optional;
/*   700 */             susp.$tmps = {
/*   701 */                 "key": key,
/*   702 */                 "self": self,
/*   703 */                 "$compareres124": $compareres124,
/*   704 */                 "$str125": $str125
/*   705 */             };
/*   706 */             return susp;
/*   707 */         };
/*   708 */         var $blk = 0,
/*   709 */             $exc = [],
/*   710 */             $loc = {},
/*   711 */             $gbl = this,
/*   712 */             $err = undefined,
/*   713 */             $ret = undefined,
/*   714 */             $currLineNo = undefined,
/*   715 */             $currColNo = undefined;
/*   716 */         if (typeof Sk.execStart === 'undefined') {
/*   717 */             Sk.execStart = Date.now()
/*   718 */         }
/*   719 */         if (typeof Sk.lastYield === 'undefined') {
/*   720 */             Sk.lastYield = Date.now()
/*   721 */         }
/*   722 */         if ($scope122.$wakingSuspension !== undefined) {
/*   723 */             $wakeFromSuspension();
/*   724 */         } else {
/*   725 */             Sk.builtin.pyCheckArgs("__getattr__", arguments, 2, 2, false, false);
/*   726 */         }
/*   727 */         while (true) {
/*   728 */             try {
/*   729 */                 var $dateNow = Date.now();
/*   730 */                 if ($dateNow - Sk.execStart > Sk.execLimit) {
/*   731 */                     throw new Sk.builtin.TimeLimitError(Sk.timeoutMsg())
/*   732 */                 }
/*   733 */                 if ($dateNow - Sk.lastYield > Sk.yieldLimit) {
/*   734 */                     var $susp = $saveSuspension({
/*   735 */                         data: {
/*   736 */                             type: 'Sk.yield'
/*   737 */                         },
/*   738 */                         resume: function() {}
/*   739 */                     }, './my_test.py', $currLineNo, $currColNo);
/*   740 */                     $susp.$blk = $blk;
/*   741 */                     $susp.optional = true;
/*   742 */                     return $susp;
/*   743 */                 }
/*   744 */                 switch ($blk) {
/*   745 */                 case 0:
/*   746 */                     /* --- codeobj entry --- */
/*   747 */                     if (self === undefined) {
/*   748 */                         throw new Sk.builtin.UnboundLocalError('local variable \'self\' referenced before assignment');
/*   749 */                     }
/*   750 */                     if (key === undefined) {
/*   751 */                         throw new Sk.builtin.UnboundLocalError('local variable \'key\' referenced before assignment');
/*   752 */                     }
/*   753 */ 
/*   754 */                     //
/*   755 */                     // line 3:
/*   756 */                     //         if key == 't':
/*   757 */                     //         ^
/*   758 */                     //
/*   759 */                     Sk.currLineNo = 3;
/*   760 */                     Sk.currColNo = 8;
/*   761 */ 
/*   762 */ 
/*   763 */                     Sk.currFilename = './my_test.py';
/*   764 */ 
/*   765 */ 
/*   766 */                     if (typeof Sk.afterSingleExecution == 'function') {
/*   767 */                         Sk.afterSingleExecution($gbl, Sk.currLineNo, Sk.currColNo, Sk.currFilename, 'If_', {
/*   768 */                             "test": {
/*   769 */                                 "left": {
/*   770 */                                     "id": {
/*   771 */                                         "v": "key"
/*   772 */                                     },
/*   773 */                                     "lineno": 3,
/*   774 */                                     "col_offset": 11,
/*   775 */                                     "endlineno": 3,
/*   776 */                                     "col_endoffset": 14
/*   777 */                                 },
/*   778 */                                 "ops": [null],
/*   779 */                                 "comparators": [{
/*   780 */                                     "s": {
/*   781 */                                         "v": "t"
/*   782 */                                     },
/*   783 */                                     "lineno": 3,
/*   784 */                                     "col_offset": 18,
/*   785 */                                     "endlineno": 3,
/*   786 */                                     "col_endoffset": 21}],
/*   787 */                                 "lineno": 3,
/*   788 */                                 "col_offset": 11,
/*   789 */                                 "endlineno": 3,
/*   790 */                                 "col_endoffset": 14
/*   791 */                             },
/*   792 */                             "body": [{
/*   793 */                                 "value": {
/*   794 */                                     "n": {
/*   795 */                                         "v": 5
/*   796 */                                     },
/*   797 */                                     "lineno": 4,
/*   798 */                                     "col_offset": 19,
/*   799 */                                     "endlineno": 4,
/*   800 */                                     "col_endoffset": 20
/*   801 */                                 },
/*   802 */                                 "lineno": 4,
/*   803 */                                 "col_offset": 12,
/*   804 */                                 "endlineno": 4,
/*   805 */                                 "col_endoffset": 18}],
/*   806 */                             "orelse": [],
/*   807 */                             "lineno": 3,
/*   808 */                             "col_offset": 8,
/*   809 */                             "endlineno": 3,
/*   810 */                             "col_endoffset": 10
/*   811 */                         });
/*   812 */                     }
/*   813 */                     currLineNo = 3;
/*   814 */                     currColNo = 8;
/*   815 */ 
/*   816 */                     if (key === undefined) {
/*   817 */                         throw new Sk.builtin.UnboundLocalError('local variable \'key\' referenced before assignment');
/*   818 */                     }
/*   819 */                     var $compareres124 = null;
/*   820 */                     var $str125 = new Sk.builtins['str']('t');
/*   821 */                     $ret = Sk.builtin.bool(Sk.misceval.richCompareBool(key, $str125, 'Eq', true));
/*   822 */                     $blk = 3; /* allowing case fallthrough */
/*   823 */                 case 3:
/*   824 */                     /* --- function return or resume suspension --- */
/*   825 */                     if ($ret && $ret.$isSuspension) {
/*   826 */                         return $saveSuspension($ret, './my_test.py', 3, 11);
/*   827 */                     }
/*   828 */                     $compareres124 = $ret;
/*   829 */                     var $jfalse126 = ($ret === false || !Sk.misceval.isTrue($ret));
/*   830 */                     if ($jfalse126) { /*test failed */
/*   831 */                         $blk = 2;
/*   832 */                         continue;
/*   833 */                     }
/*   834 */                     $blk = 2; /* allowing case fallthrough */
/*   835 */                 case 2:
/*   836 */                     /* --- done --- */
/*   837 */                     var $jfalse127 = ($compareres124 === false || !Sk.misceval.isTrue($compareres124));
/*   838 */                     if ($jfalse127) { /*test failed */
/*   839 */                         $blk = 1;
/*   840 */                         continue;
/*   841 */                     }
/*   842 */                     //
/*   843 */                     // line 4:
/*   844 */                     //             return 5
/*   845 */                     //             ^
/*   846 */                     //
/*   847 */                     Sk.currLineNo = 4;
/*   848 */                     Sk.currColNo = 12;
/*   849 */ 
/*   850 */ 
/*   851 */                     Sk.currFilename = './my_test.py';
/*   852 */ 
/*   853 */ 
/*   854 */                     if (typeof Sk.afterSingleExecution == 'function') {
/*   855 */                         Sk.afterSingleExecution($gbl, Sk.currLineNo, Sk.currColNo, Sk.currFilename, 'Return_', {
/*   856 */                             "value": {
/*   857 */                                 "n": {
/*   858 */                                     "v": 5
/*   859 */                                 },
/*   860 */                                 "lineno": 4,
/*   861 */                                 "col_offset": 19,
/*   862 */                                 "endlineno": 4,
/*   863 */                                 "col_endoffset": 20
/*   864 */                             },
/*   865 */                             "lineno": 4,
/*   866 */                             "col_offset": 12,
/*   867 */                             "endlineno": 4,
/*   868 */                             "col_endoffset": 18
/*   869 */                         });
/*   870 */                     }
/*   871 */                     currLineNo = 4;
/*   872 */                     currColNo = 12;
/*   873 */ 
/*   874 */                     return new Sk.builtin.int_(5);
/*   875 */                     $blk = 1; /* allowing case fallthrough */
/*   876 */                 case 1:
/*   877 */                     /* --- end of if --- */
/*   878 */                     return Sk.builtin.none.none$;
/*   879 */                     throw new Sk.builtin.SystemError('internal error: unterminated block');
/*   880 */                 }
/*   881 */             } catch (err) {
/*   882 */                 if (!(err instanceof Sk.builtin.BaseException)) {
/*   883 */                     err = new Sk.builtin.ExternalError(err);
/*   884 */                 }
/*   885 */                 err.traceback.push({
/*   886 */                     lineno: $currLineNo,
/*   887 */                     colno: $currColNo,
/*   888 */                     filename: './my_test.py'
/*   889 */                 });
/*   890 */                 if ($exc.length > 0) {
/*   891 */                     $err = err;
/*   892 */                     $blk = $exc.pop();
/*   893 */                     continue;
/*   894 */                 } else {
/*   895 */                     throw err;
/*   896 */                 }
/*   897 */             }
/*   898 */         }
/*   899 */     });
/*   900 */     return $scope120;
/*   901 */ }();
5

None

