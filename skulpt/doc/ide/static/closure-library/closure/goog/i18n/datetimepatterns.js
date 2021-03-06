// Copyright 2010 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Extended date/time patterns.
 *
 * This file is generated using ICU's implementation of
 * DateTimePatternGenerator. The whole set has two files:
 * datetimepatterns.js and datetimepatternsext.js. The former covers
 * frequently used locales, the latter covers the rest. There won't be any
 * difference in compiled code, but some developing environments have
 * difficulty in dealing large js files. So we do the separation.

 * Only locales that can be enumerated in ICU are supported. For the rest
 * of the locales, it will fallback to 'en'.
 * The code is designed to work with Closure compiler using
 * ADVANCED_OPTIMIZATIONS. We will continue to add popular date/time
 * patterns over time. There is no intention cover all possible
 * usages. If simple pattern works fine, it won't be covered here either.
 * For example, pattern 'MMM' will work well to get short month name for
 * almost all locales thus won't be included here.
 */

goog.provide('goog.i18n.DateTimePatterns');

goog.provide('goog.i18n.DateTimePatterns_am');
goog.provide('goog.i18n.DateTimePatterns_ar');
goog.provide('goog.i18n.DateTimePatterns_bg');
goog.provide('goog.i18n.DateTimePatterns_bn');
goog.provide('goog.i18n.DateTimePatterns_ca');
goog.provide('goog.i18n.DateTimePatterns_cs');
goog.provide('goog.i18n.DateTimePatterns_da');
goog.provide('goog.i18n.DateTimePatterns_de');
goog.provide('goog.i18n.DateTimePatterns_de_AT');
goog.provide('goog.i18n.DateTimePatterns_de_CH');
goog.provide('goog.i18n.DateTimePatterns_el');
goog.provide('goog.i18n.DateTimePatterns_en');
goog.provide('goog.i18n.DateTimePatterns_en_AU');
goog.provide('goog.i18n.DateTimePatterns_en_GB');
goog.provide('goog.i18n.DateTimePatterns_en_IE');
goog.provide('goog.i18n.DateTimePatterns_en_IN');
goog.provide('goog.i18n.DateTimePatterns_en_SG');
goog.provide('goog.i18n.DateTimePatterns_en_US');
goog.provide('goog.i18n.DateTimePatterns_en_ZA');
goog.provide('goog.i18n.DateTimePatterns_es');
goog.provide('goog.i18n.DateTimePatterns_et');
goog.provide('goog.i18n.DateTimePatterns_eu');
goog.provide('goog.i18n.DateTimePatterns_fa');
goog.provide('goog.i18n.DateTimePatterns_fi');
goog.provide('goog.i18n.DateTimePatterns_fil');
goog.provide('goog.i18n.DateTimePatterns_fr');
goog.provide('goog.i18n.DateTimePatterns_fr_CA');
goog.provide('goog.i18n.DateTimePatterns_gl');
goog.provide('goog.i18n.DateTimePatterns_gsw');
goog.provide('goog.i18n.DateTimePatterns_gu');
goog.provide('goog.i18n.DateTimePatterns_he');
goog.provide('goog.i18n.DateTimePatterns_hi');
goog.provide('goog.i18n.DateTimePatterns_hr');
goog.provide('goog.i18n.DateTimePatterns_hu');
goog.provide('goog.i18n.DateTimePatterns_id');
goog.provide('goog.i18n.DateTimePatterns_is');
goog.provide('goog.i18n.DateTimePatterns_it');
goog.provide('goog.i18n.DateTimePatterns_ja');
goog.provide('goog.i18n.DateTimePatterns_kn');
goog.provide('goog.i18n.DateTimePatterns_ko');
goog.provide('goog.i18n.DateTimePatterns_lt');
goog.provide('goog.i18n.DateTimePatterns_lv');
goog.provide('goog.i18n.DateTimePatterns_ml');
goog.provide('goog.i18n.DateTimePatterns_mr');
goog.provide('goog.i18n.DateTimePatterns_ms');
goog.provide('goog.i18n.DateTimePatterns_mt');
goog.provide('goog.i18n.DateTimePatterns_nl');
goog.provide('goog.i18n.DateTimePatterns_or');
goog.provide('goog.i18n.DateTimePatterns_pl');
goog.provide('goog.i18n.DateTimePatterns_pt');
goog.provide('goog.i18n.DateTimePatterns_pt_BR');
goog.provide('goog.i18n.DateTimePatterns_pt_PT');
goog.provide('goog.i18n.DateTimePatterns_ro');
goog.provide('goog.i18n.DateTimePatterns_ru');
goog.provide('goog.i18n.DateTimePatterns_sk');
goog.provide('goog.i18n.DateTimePatterns_sl');
goog.provide('goog.i18n.DateTimePatterns_sq');
goog.provide('goog.i18n.DateTimePatterns_sr');
goog.provide('goog.i18n.DateTimePatterns_sv');
goog.provide('goog.i18n.DateTimePatterns_sw');
goog.provide('goog.i18n.DateTimePatterns_ta');
goog.provide('goog.i18n.DateTimePatterns_te');
goog.provide('goog.i18n.DateTimePatterns_th');
goog.provide('goog.i18n.DateTimePatterns_tr');
goog.provide('goog.i18n.DateTimePatterns_uk');
goog.provide('goog.i18n.DateTimePatterns_ur');
goog.provide('goog.i18n.DateTimePatterns_vi');
goog.provide('goog.i18n.DateTimePatterns_zh');


/**
 * Extended set of localized date/time patterns for locale am.
 */
goog.i18n.DateTimePatterns_am = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ar.
 */
goog.i18n.DateTimePatterns_ar = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale bg.
 */
goog.i18n.DateTimePatterns_bg = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale bn.
 */
goog.i18n.DateTimePatterns_bn = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ca.
 */
goog.i18n.DateTimePatterns_ca = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'LLL y',
  YEAR_MONTH_FULL: 'LLLL yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale cs.
 */
goog.i18n.DateTimePatterns_cs = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'yyyy MMMM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale da.
 */
goog.i18n.DateTimePatterns_da = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd.'
};


/**
 * Extended set of localized date/time patterns for locale de.
 */
goog.i18n.DateTimePatterns_de = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale de_AT.
 */
goog.i18n.DateTimePatterns_de_AT = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale de_CH.
 */
goog.i18n.DateTimePatterns_de_CH = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale el.
 */
goog.i18n.DateTimePatterns_el = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale en.
 */
goog.i18n.DateTimePatterns_en = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale en_AU.
 */
goog.i18n.DateTimePatterns_en_AU = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale en_GB.
 */
goog.i18n.DateTimePatterns_en_GB = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale en_IE.
 */
goog.i18n.DateTimePatterns_en_IE = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale en_IN.
 */
goog.i18n.DateTimePatterns_en_IN = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale en_SG.
 */
goog.i18n.DateTimePatterns_en_SG = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale en_US.
 */
goog.i18n.DateTimePatterns_en_US = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale en_ZA.
 */
goog.i18n.DateTimePatterns_en_ZA = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale es.
 */
goog.i18n.DateTimePatterns_es = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd \'de\' MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale et.
 */
goog.i18n.DateTimePatterns_et = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale eu.
 */
goog.i18n.DateTimePatterns_eu = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'yyyy MMMM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale fa.
 */
goog.i18n.DateTimePatterns_fa = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd LLL',
  MONTH_DAY_FULL: 'dd LLLL',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale fi.
 */
goog.i18n.DateTimePatterns_fi = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'LLL y',
  YEAR_MONTH_FULL: 'LLLL yyyy',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale fil.
 */
goog.i18n.DateTimePatterns_fil = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'yyyy MMMM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale fr.
 */
goog.i18n.DateTimePatterns_fr = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale fr_CA.
 */
goog.i18n.DateTimePatterns_fr_CA = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale gl.
 */
goog.i18n.DateTimePatterns_gl = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale gsw.
 */
goog.i18n.DateTimePatterns_gsw = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale gu.
 */
goog.i18n.DateTimePatterns_gu = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale he.
 */
goog.i18n.DateTimePatterns_he = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd ??MMM',
  MONTH_DAY_FULL: 'dd ??MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale hi.
 */
goog.i18n.DateTimePatterns_hi = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale hr.
 */
goog.i18n.DateTimePatterns_hr = {
  YEAR_FULL: 'yyyy.',
  YEAR_MONTH_ABBR: 'MMM.y.',
  YEAR_MONTH_FULL: 'MMMM.yyyy.',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd.'
};


/**
 * Extended set of localized date/time patterns for locale hu.
 */
goog.i18n.DateTimePatterns_hu = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y. MMM',
  YEAR_MONTH_FULL: 'y. MMMM',
  MONTH_DAY_ABBR: 'MMM d.',
  MONTH_DAY_FULL: 'MMMM dd.',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale id.
 */
goog.i18n.DateTimePatterns_id = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale is.
 */
goog.i18n.DateTimePatterns_is = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale it.
 */
goog.i18n.DateTimePatterns_it = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ja.
 */
goog.i18n.DateTimePatterns_ja = {
  YEAR_FULL: 'y???',
  YEAR_MONTH_ABBR: 'y???M???',
  YEAR_MONTH_FULL: 'yyyy???M???',
  MONTH_DAY_ABBR: 'M???d???',
  MONTH_DAY_FULL: 'M???dd???',
  DAY_ABBR: 'd???'
};


/**
 * Extended set of localized date/time patterns for locale kn.
 */
goog.i18n.DateTimePatterns_kn = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ko.
 */
goog.i18n.DateTimePatterns_ko = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y??? MMM',
  YEAR_MONTH_FULL: 'yyyy??? MMMM',
  MONTH_DAY_ABBR: 'MMM d???',
  MONTH_DAY_FULL: 'MMMM dd???',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale lt.
 */
goog.i18n.DateTimePatterns_lt = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'yyyy MMMM',
  MONTH_DAY_ABBR: 'MMM-d',
  MONTH_DAY_FULL: 'MMMM-dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale lv.
 */
goog.i18n.DateTimePatterns_lv = {
  YEAR_FULL: 'y. \'g\'.',
  YEAR_MONTH_ABBR: 'yyyy. \'g\'. MMM',
  YEAR_MONTH_FULL: 'yyyy. \'g\'. MMMM',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ml.
 */
goog.i18n.DateTimePatterns_ml = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'yyyy MMMM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale mr.
 */
goog.i18n.DateTimePatterns_mr = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ms.
 */
goog.i18n.DateTimePatterns_ms = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale mt.
 */
goog.i18n.DateTimePatterns_mt = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'yyyy MMMM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale nl.
 */
goog.i18n.DateTimePatterns_nl = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale or.
 */
goog.i18n.DateTimePatterns_or = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale pl.
 */
goog.i18n.DateTimePatterns_pl = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'LLL y',
  YEAR_MONTH_FULL: 'LLLL yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale pt.
 */
goog.i18n.DateTimePatterns_pt = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM \'de\' y',
  YEAR_MONTH_FULL: 'MMMM \'de\' yyyy',
  MONTH_DAY_ABBR: 'd \'de\' MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale pt_BR.
 */
goog.i18n.DateTimePatterns_pt_BR = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM \'de\' y',
  YEAR_MONTH_FULL: 'MMMM \'de\' yyyy',
  MONTH_DAY_ABBR: 'd \'de\' MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale pt_PT.
 */
goog.i18n.DateTimePatterns_pt_PT = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM \'de\' y',
  YEAR_MONTH_FULL: 'MMMM \'de\' yyyy',
  MONTH_DAY_ABBR: 'd \'de\' MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ro.
 */
goog.i18n.DateTimePatterns_ro = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ru.
 */
goog.i18n.DateTimePatterns_ru = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'LLL y',
  YEAR_MONTH_FULL: 'LLLL yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale sk.
 */
goog.i18n.DateTimePatterns_sk = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'LLL y',
  YEAR_MONTH_FULL: 'LLLL yyyy',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd.'
};


/**
 * Extended set of localized date/time patterns for locale sl.
 */
goog.i18n.DateTimePatterns_sl = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale sq.
 */
goog.i18n.DateTimePatterns_sq = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale sr.
 */
goog.i18n.DateTimePatterns_sr = {
  YEAR_FULL: 'y.',
  YEAR_MONTH_ABBR: 'MMM. y',
  YEAR_MONTH_FULL: 'MMMM. yyyy',
  MONTH_DAY_ABBR: 'MMM d.',
  MONTH_DAY_FULL: 'MMMM dd.',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale sv.
 */
goog.i18n.DateTimePatterns_sv = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'yyyy MMMM',
  MONTH_DAY_ABBR: 'd:\'e\' MMM',
  MONTH_DAY_FULL: 'dd:\'e\' MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale sw.
 */
goog.i18n.DateTimePatterns_sw = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ta.
 */
goog.i18n.DateTimePatterns_ta = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale te.
 */
goog.i18n.DateTimePatterns_te = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale th.
 */
goog.i18n.DateTimePatterns_th = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale tr.
 */
goog.i18n.DateTimePatterns_tr = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'dd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale uk.
 */
goog.i18n.DateTimePatterns_uk = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'LLL y',
  YEAR_MONTH_FULL: 'LLLL yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale ur.
 */
goog.i18n.DateTimePatterns_ur = {
  YEAR_FULL: 'yyyy',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'yyyy MMMM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale vi.
 */
goog.i18n.DateTimePatterns_vi = {
  YEAR_FULL: 'y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM yyyy',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  DAY_ABBR: 'd'
};


/**
 * Extended set of localized date/time patterns for locale zh.
 */
goog.i18n.DateTimePatterns_zh = {
  YEAR_FULL: 'y???',
  YEAR_MONTH_ABBR: 'y???MMM',
  YEAR_MONTH_FULL: 'yyyy???MMMM',
  MONTH_DAY_ABBR: 'MMMd???',
  MONTH_DAY_FULL: 'MMMMdd???',
  DAY_ABBR: 'd???'
};


/**
/* Select date/time pattern by locale.
 */
goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en;

if (goog.LOCALE == 'am') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_am;
}

if (goog.LOCALE == 'ar') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ar;
}

if (goog.LOCALE == 'bg') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bg;
}

if (goog.LOCALE == 'bn') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_bn;
}

if (goog.LOCALE == 'ca') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ca;
}

if (goog.LOCALE == 'cs') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_cs;
}

if (goog.LOCALE == 'da') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_da;
}

if (goog.LOCALE == 'de') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de;
}

if (goog.LOCALE == 'de_AT' || goog.LOCALE == 'de-AT') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de_AT;
}

if (goog.LOCALE == 'de_CH' || goog.LOCALE == 'de-CH') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_de_CH;
}

if (goog.LOCALE == 'el') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_el;
}

if (goog.LOCALE == 'en') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en;
}

if (goog.LOCALE == 'en_AU' || goog.LOCALE == 'en-AU') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_AU;
}

if (goog.LOCALE == 'en_GB' || goog.LOCALE == 'en-GB') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_GB;
}

if (goog.LOCALE == 'en_IE' || goog.LOCALE == 'en-IE') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_IE;
}

if (goog.LOCALE == 'en_IN' || goog.LOCALE == 'en-IN') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_IN;
}

if (goog.LOCALE == 'en_SG' || goog.LOCALE == 'en-SG') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_SG;
}

if (goog.LOCALE == 'en_US' || goog.LOCALE == 'en-US') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_US;
}

if (goog.LOCALE == 'en_ZA' || goog.LOCALE == 'en-ZA') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_en_ZA;
}

if (goog.LOCALE == 'es') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_es;
}

if (goog.LOCALE == 'et') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_et;
}

if (goog.LOCALE == 'eu') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_eu;
}

if (goog.LOCALE == 'fa') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fa;
}

if (goog.LOCALE == 'fi') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fi;
}

if (goog.LOCALE == 'fil') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fil;
}

if (goog.LOCALE == 'fr') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr;
}

if (goog.LOCALE == 'fr_CA' || goog.LOCALE == 'fr-CA') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_fr_CA;
}

if (goog.LOCALE == 'gl') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gl;
}

if (goog.LOCALE == 'gsw') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gsw;
}

if (goog.LOCALE == 'gu') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_gu;
}

if (goog.LOCALE == 'he') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_he;
}

if (goog.LOCALE == 'hi') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hi;
}

if (goog.LOCALE == 'hr') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hr;
}

if (goog.LOCALE == 'hu') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_hu;
}

if (goog.LOCALE == 'id') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_id;
}

if (goog.LOCALE == 'is') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_is;
}

if (goog.LOCALE == 'it') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_it;
}

if (goog.LOCALE == 'ja') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ja;
}

if (goog.LOCALE == 'kn') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_kn;
}

if (goog.LOCALE == 'ko') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ko;
}

if (goog.LOCALE == 'lt') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lt;
}

if (goog.LOCALE == 'lv') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_lv;
}

if (goog.LOCALE == 'ml') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ml;
}

if (goog.LOCALE == 'mr') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mr;
}

if (goog.LOCALE == 'ms') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ms;
}

if (goog.LOCALE == 'mt') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_mt;
}

if (goog.LOCALE == 'nl') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_nl;
}

if (goog.LOCALE == 'or') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_or;
}

if (goog.LOCALE == 'pl') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pl;
}

if (goog.LOCALE == 'pt') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt;
}

if (goog.LOCALE == 'pt_BR' || goog.LOCALE == 'pt-BR') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_BR;
}

if (goog.LOCALE == 'pt_PT' || goog.LOCALE == 'pt-PT') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_pt_PT;
}

if (goog.LOCALE == 'ro') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ro;
}

if (goog.LOCALE == 'ru') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ru;
}

if (goog.LOCALE == 'sk') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sk;
}

if (goog.LOCALE == 'sl') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sl;
}

if (goog.LOCALE == 'sq') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sq;
}

if (goog.LOCALE == 'sr') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sr;
}

if (goog.LOCALE == 'sv') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sv;
}

if (goog.LOCALE == 'sw') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_sw;
}

if (goog.LOCALE == 'ta') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ta;
}

if (goog.LOCALE == 'te') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_te;
}

if (goog.LOCALE == 'th') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_th;
}

if (goog.LOCALE == 'tr') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_tr;
}

if (goog.LOCALE == 'uk') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_uk;
}

if (goog.LOCALE == 'ur') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_ur;
}

if (goog.LOCALE == 'vi') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_vi;
}

if (goog.LOCALE == 'zh') {
  goog.i18n.DateTimePatterns = goog.i18n.DateTimePatterns_zh;
}

