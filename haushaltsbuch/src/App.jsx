import { useState, useMemo, useCallback, useEffect } from "react";

// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
  bg:"#F2F6F4", surface:"#FFFFFF", surfaceAlt:"#EBF1EE", border:"#D0DDD8",
  blue:"#4E8C73", blueDim:"#E8F2ED", blueLight:"#B7CDBF",
  text:"#111827", textMid:"#4B5563", textMuted:"#9CA3AF",
  green:"#16A34A", greenBg:"#DCFCE7",
  red:"#DC2626",   redBg:"#FEE2E2",
  amber:"#D97706", amberBg:"#FEF3C7",
  purple:"#7C3AED",purpleBg:"#EDE9FE",
  navBg:"#FFFFFF", navBorder:"#D0DDD8",
  calSat:"#2F7FD4", calSun:"#DC2626",
  need:"#4E8C73", want:"#D97706", future:"#7C3AED",
};

// ─── SVG icon set ────────────────────────────────────────────────────────────
const ICON_NAMES = ["home","chart","calendar","gear","plus","bank","transfer","edit","trash","chevronR","chevronL","chevronDown","chevronUp","refresh","repeat","piggy","grip","split","trendUp","heart","star","bolt","car","plane","music","book","coffee","utensils","shield","sun","moon","map","tag","box","zap","wifi","tv","phone","shopping","medal"];

const Icon = ({ name, size=20, color=C.textMid, strokeWidth=1.6 }) => {
  const sw = { width:size, height:size, display:"block", flexShrink:0 };
  const f = "none";
  const lc = "round";
  const lj = "round";
  let inner;
  switch(name){
    case "home":      inner = <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M9 21V12h6v9" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "chart":     inner = <><path d="M18 20V10" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M12 20V4" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M6 20v-6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "calendar":  inner = <><rect x="3" y="4" width="18" height="18" rx="2" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M16 2v4M8 2v4M3 10h18" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "gear":      inner = <><circle cx="12" cy="12" r="3" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "plus":      inner = <path d="M12 5v14M5 12h14" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "bank":      inner = <path d="M3 21h18M3 10h18M5 10V21M19 10V21M12 3L3 10h18L12 3z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "transfer":  inner = <path d="M5 12h14M15 6l6 6-6 6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "edit":      inner = <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "trash":     inner = <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "chevronR":  inner = <path d="M9 18l6-6-6-6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "chevronL":  inner = <path d="M15 18l-6-6 6-6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "chevronDown":inner= <path d="M6 9l6 6 6-6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "chevronUp": inner = <path d="M18 15l-6-6-6 6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "refresh":   inner = <><path d="M23 4v6h-6M1 20v-6h6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "repeat":    inner = <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "piggy":     inner = <><path d="M19 8a1 1 0 100-2 1 1 0 000 2z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M20 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M2 12a8 8 0 0116 0" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M22 12h-2M6 12H4M10 20v2M14 20v2" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "grip":      inner = <><circle cx="9" cy="6" r="1" fill={color}/><circle cx="15" cy="6" r="1" fill={color}/><circle cx="9" cy="12" r="1" fill={color}/><circle cx="15" cy="12" r="1" fill={color}/><circle cx="9" cy="18" r="1" fill={color}/><circle cx="15" cy="18" r="1" fill={color}/></>; break;
    case "split":     inner = <path d="M12 3v18M3 8h18M3 16h18" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "trendUp":   inner = <><path d="M23 6l-9.5 9.5-5-5L1 18" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M17 6h6v6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "heart":     inner = <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "star":      inner = <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "bolt":      inner = <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "car":       inner = <><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v5a2 2 0 01-2 2h-3" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><circle cx="7.5" cy="17.5" r="2.5" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><circle cx="17.5" cy="17.5" r="2.5" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "music":     inner = <><path d="M9 18V5l12-2v13" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><circle cx="6" cy="18" r="3" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><circle cx="18" cy="16" r="3" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "book":      inner = <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "coffee":    inner = <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "utensils":  inner = <path d="M3 2v7c0 1.1.9 2 2 2s2-.9 2-2V2M7 11v11M12 2a5 5 0 015 5 5 5 0 01-5 5v9" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "shield":    inner = <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "sun":       inner = <><circle cx="12" cy="12" r="5" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "moon":      inner = <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "map":       inner = <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><line x1="8" y1="2" x2="8" y2="18" stroke={color} strokeWidth={strokeWidth}/><line x1="16" y1="6" x2="16" y2="22" stroke={color} strokeWidth={strokeWidth}/></>; break;
    case "tag":       inner = <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><line x1="7" y1="7" x2="7.01" y2="7" stroke={color} strokeWidth={strokeWidth}/></>; break;
    case "box":       inner = <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><polyline points="3.27 6.96 12 12.01 20.73 6.96" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><line x1="12" y1="22.08" x2="12" y2="12" stroke={color} strokeWidth={strokeWidth}/></>; break;
    case "zap":       inner = <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "wifi":      inner = <><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><line x1="12" y1="20" x2="12.01" y2="20" stroke={color} strokeWidth={strokeWidth}/></>; break;
    case "tv":        inner = <><rect x="2" y="7" width="20" height="15" rx="2" ry="2" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><polyline points="17 2 12 7 7 2" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "phone":     inner = <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "shopping":  inner = <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    case "medal":     inner = <><circle cx="12" cy="8" r="6" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/></>; break;
    case "plane":     inner = <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill={f} stroke={color} strokeWidth={strokeWidth} strokeLinecap={lc} strokeLinejoin={lj}/>; break;
    default:          inner = <circle cx="12" cy="12" r="4" fill={f} stroke={color} strokeWidth={strokeWidth}/>; break;
  }
  return <svg viewBox="0 0 24 24" style={sw}>{inner}</svg>;
};

// ─── i18n (日本語固定) ───────────────────────────────────────────────────────
const T = {
  appName:"家計簿", nav:["ホーム","予算","","カレンダー","設定"],
  income:"収入", expenses:"支出", balance:"収支",
  thisWeek:"今週", today:"今日", availablePerDay:"1日残り",
  monthlyBudget:"月予算", consumed:"使用済", remaining:"残り", overdrawn:"超過",
  categories:"カテゴリー", weeklyExpenses:"今週支出",
  editCategories:"カテゴリー編集", addCategory:"カテゴリー追加",
  monthlyBudgetLbl:"月予算 (€)", dailyBudgetLbl:"日予算（任意）", noLimit:"空欄=上限なし",
  catName:"カテゴリー名", catIcon:"アイコン", catColor:"カラー",
  save:"保存", cancel:"キャンセル", appInfo:"アプリ情報", currency:"通貨",
  calendar:"カレンダー", version:"バージョン",
  numExpenses:"支出件数", numIncome:"収入件数",
  entries:"件", noEntries:"データなし",
  newEntry:"新規記帳", editEntry:"記帳を編集",
  expenseBtn:"支出", incomeBtn:"収入", descPlaceholder:"例：スーパー…",
  all:"すべて", mon:"月", day:"日", inputCurrency:"入力通貨",
  fetchingRate:"レート取得中…",
  conversionNote:"換算", rateInfo2:"現在レート",
  months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
  dowS:["月","火","水","木","金","土","日"],
  dowL:["月曜","火曜","水曜","木曜","金曜","土曜","日曜"],
  monSun:"月〜日", accounts:"銀行口座", totalAssets:"総資産",
  addAccount:"口座を追加", editAccount:"口座を編集", accountName:"口座名",
  accountBalance:"残高", accountBank:"銀行・金融機関", isSavings:"貯金口座",
  subscriptions:"サブスクリプション", subsTotal:"合計 / 月", addSub:"追加",
  editSub:"編集", subName:"名前", subAmount:"金額", subCycle:"サイクル",
  subCycleMonthly:"毎月", subCycleYearly:"毎年", subNote:"メモ（任意）",
  subPerMonth:"/ 月",
  savings:"貯金", addSavingsEntry:"記録を追加", savingsAmt:"金額", savingsNote:"メモ",
  budgetSplit:"予算配分（50/30/20）",
  splitNeeds:"Need（50%）", splitWants:"Want（30%）", splitFuture:"Future（20%）",
  splitInfo:"今月の収入をもとに算出",
  catSettings:"カテゴリー設定", reorderCats:"ドラッグで並び替え",
  addCategory2:"カテゴリーを追加",
  splitCategory:"カテゴリーに振り分け",
  needLabel:"Need", wantLabel:"Want", futureLabel:"Future", unassigned:"未分類",
};

// ─── Static data ─────────────────────────────────────────────────────────────
const DEFAULT_CATS = [
  {id:1,  name:"家賃・光熱費",icon:"home",   isIconName:true, color:"#3B82F6",monthBudget:950, dayBudget:null, split:"need"},
  {id:2,  name:"食料品",      icon:"shopping",isIconName:true, color:"#F59E0B",monthBudget:320, dayBudget:12,  split:"need"},
  {id:3,  name:"交通費",      icon:"car",     isIconName:true, color:"#8B5CF6",monthBudget:90,  dayBudget:null, split:"need"},
  {id:4,  name:"外食",        icon:"utensils",isIconName:true, color:"#EF4444",monthBudget:120, dayBudget:8,   split:"want"},
  {id:5,  name:"医療・健康",  icon:"shield",  isIconName:true, color:"#10B981",monthBudget:60,  dayBudget:null, split:"need"},
  {id:6,  name:"娯楽・文化",  icon:"music",   isIconName:true, color:"#6366F1",monthBudget:100, dayBudget:null, split:"want"},
  {id:7,  name:"衣類",        icon:"tag",     isIconName:true, color:"#F97316",monthBudget:80,  dayBudget:null, split:"want"},
  {id:8,  name:"その他",      icon:"box",     isIconName:true, color:"#6B7280",monthBudget:150, dayBudget:null, split:"want"},
];
const INC_BASE = [
  {id:"i1",name:"給与",   icon:"medal",   isIconName:true, color:"#10B981"},
  {id:"i2",name:"副業",   icon:"star",    isIconName:true, color:"#10B981"},
  {id:"i3",name:"投資",   icon:"trendUp", isIconName:true, color:"#10B981"},
  {id:"i4",name:"その他", icon:"box",     isIconName:true, color:"#10B981"},
];
const DEFAULT_ACCOUNTS = [
  {id:"a1",name:"普通口座",   bank:"三菱UFJ銀行",  balance:4250.80,  color:"#2F7FD4", isSavings:false},
  {id:"a2",name:"貯金口座",   bank:"ゆうちょ銀行", balance:12800.00, color:"#16A34A", isSavings:true},
  {id:"a3",name:"クレジット", bank:"楽天カード",   balance:320.50,   color:"#9333EA", isSavings:false},
];
const DEFAULT_SUBS = [
  {id:"s1",name:"Netflix",    amount:15.99,cycle:"monthly",note:"動画",   color:"#E50914"},
  {id:"s2",name:"Spotify",    amount:9.99, cycle:"monthly",note:"音楽",   color:"#1DB954"},
  {id:"s3",name:"iCloud+",    amount:2.99, cycle:"monthly",note:"50 GB",  color:"#3B82F6"},
  {id:"s4",name:"Adobe CC",   amount:54.99,cycle:"monthly",note:"制作",   color:"#FF0000"},
  {id:"s5",name:"NYT Digital",amount:17.00,cycle:"yearly", note:"ニュース",color:"#111827"},
];

const NOW=new Date(), TODAY_STR=NOW.toISOString().slice(0,10);
const daysInMonth=(y,m)=>new Date(y,m+1,0).getDate();
const dowMon=(d)=>(d.getDay()+6)%7;
const weekStart=(d)=>{const r=new Date(d);r.setDate(r.getDate()-dowMon(r));r.setHours(0,0,0,0);return r;};
const cy=NOW.getFullYear(),cm=String(NOW.getMonth()+1).padStart(2,"0"),td=NOW.getDate();
const sd=(n)=>{const d=new Date(NOW);d.setDate(d.getDate()-n);return d.toISOString().slice(0,10);};

const SEED=[
  {id:100,type:"expense",catId:1, desc:"家賃",     amount:950,  date:`${cy}-${cm}-01`},
  {id:102,type:"expense",catId:3, desc:"定期券",   amount:89,   date:`${cy}-${cm}-01`},
  {id:106,type:"income", catId:"i1",desc:"給与",   amount:3200, date:`${cy}-${cm}-01`},
  {id:107,type:"income", catId:"i2",desc:"副業",   amount:480,  date:`${cy}-${cm}-12`},
  {id:101,type:"expense",catId:2, desc:"スーパー", amount:74.5, date:sd(6)},
  {id:103,type:"expense",catId:4, desc:"カフェ",   amount:18.5, date:sd(5)},
  {id:104,type:"expense",catId:2, desc:"八百屋",   amount:42.3, date:sd(4)},
  {id:105,type:"expense",catId:6, desc:"映画館",   amount:24,   date:sd(3)},
  {id:108,type:"expense",catId:4, desc:"外食",     amount:32,   date:sd(2)},
  {id:109,type:"expense",catId:8, desc:"Amazon",   amount:29.99,date:sd(1)},
  {id:110,type:"expense",catId:2, desc:"コンビニ", amount:55.8, date:TODAY_STR},
  {id:111,type:"expense",catId:4, desc:"ランチ",   amount:14.5, date:TODAY_STR},
  {id:112,type:"expense",catId:5, desc:"薬局",     amount:22,   date:`${cy}-${cm}-${String(Math.max(td-10,1)).padStart(2,"0")}`},
];

const DEFAULT_SAVINGS=Array.from({length:6},(_,i)=>{
  const d=new Date(NOW);d.setMonth(d.getMonth()-5+i);
  return{id:`sv${i}`,year:d.getFullYear(),month:d.getMonth(),amount:800+i*150+(i%2)*80,note:""};
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmtEur=(n)=>new Intl.NumberFormat("ja-JP",{style:"currency",currency:"EUR"}).format(n??0);
const fmtShort=(n)=>{
  if(Math.abs(n)>=1000) return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"EUR",maximumFractionDigits:0,notation:"compact"}).format(n);
  return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);
};

async function fetchJpyEurRate(){
  try{
    const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:512,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Search for current EUR/JPY rate. Return ONLY JSON: {"rate":162.5} No other text.`}]})});
    const data=await res.json();
    const text=(data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("").replace(/```json|```/g,"").trim();
    const parsed=JSON.parse(text);
    if(parsed.rate&&typeof parsed.rate==="number") return parsed.rate;
  }catch{}
  return null;
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────
function BudgetBar({spent,budget,color,h=6}){
  if(!budget) return null;
  const pct=Math.min((spent/budget)*100,100), over=spent>budget;
  const bc=over?C.red:pct>80?C.amber:color||C.blue;
  return <div style={{height:h,background:C.surfaceAlt,borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:bc,borderRadius:99,transition:"width .4s ease"}}/></div>;
}
function CatIconDisplay({cat,size=38}){
  const col=cat?.color??C.blue;
  const isName=cat?.isIconName;
  return(
    <div style={{width:size,height:size,borderRadius:size*0.28,flexShrink:0,background:`${col}18`,border:`1.5px solid ${col}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.46}}>
      {isName?<Icon name={cat.icon} size={size*0.55} color={col} strokeWidth={1.8}/>:cat?.icon??"•"}
    </div>
  );
}
function Card({children,style={}}){
  return <div style={{background:C.surface,borderRadius:16,padding:"16px",boxShadow:"0 1px 4px rgba(30,60,120,0.07)",border:`1px solid ${C.border}`,...style}}>{children}</div>;
}
function SectionTitle({children}){
  return <div style={{fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",color:C.textMuted,marginBottom:10,marginTop:20}}>{children}</div>;
}
function Pill({children,active,color=C.blue,onClick}){
  return <button onClick={onClick} style={{padding:"5px 12px",borderRadius:99,fontSize:11,cursor:"pointer",fontFamily:"inherit",border:`1.5px solid ${active?color:C.border}`,background:active?`${color}18`:C.surface,color:active?color:C.textMid,fontWeight:active?700:400,whiteSpace:"nowrap"}}>{children}</button>;
}

// ─── JPY rate hook ────────────────────────────────────────────────────────────
function useJpyRate(){
  const [rate,setRate]=useState(null);
  const [status,setStatus]=useState("idle");
  const load=useCallback(async()=>{
    setStatus("loading");
    const r=await fetchJpyEurRate();
    if(r){setRate(r);setStatus("loaded");}
    else setStatus("failed");
  },[]);
  return{rate,status,load};
}

// ─── Amount input ─────────────────────────────────────────────────────────────
function AmountInput({value,onChange,autoFocus=false}){
  const {rate,status,load}=useJpyRate();
  const [cur,setCur]=useState("EUR");
  const parsed=parseFloat(value)||0;
  const eurVal=cur==="JPY"&&rate?+(parsed/rate).toFixed(2):parsed;
  useEffect(()=>{if(cur==="JPY"&&status==="idle")load();},[cur,status,load]);
  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {[["EUR","€ EUR"],["JPY","¥ JPY"]].map(([c,l])=>(
          <button key={c} onClick={()=>setCur(c)} style={{flex:1,padding:"8px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",border:`1.5px solid ${cur===c?C.blue:C.border}`,background:cur===c?C.blueDim:C.surfaceAlt,color:cur===c?C.blue:C.textMid,fontSize:13,fontWeight:600}}>{l}</button>
        ))}
      </div>
      <div style={{textAlign:"center",marginBottom:8}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:22,color:C.blueLight}}>{cur==="JPY"?"¥":"€"}</span>
          <input autoFocus={autoFocus} type="number" min="0" step={cur==="JPY"?"1":"0.01"} value={value}
            onChange={e=>onChange(e.target.value,cur==="JPY"&&rate?+(parseFloat(e.target.value||0)/rate).toFixed(2):parseFloat(e.target.value||0))}
            placeholder="0"
            style={{width:140,background:"transparent",border:"none",borderBottom:`2px solid ${C.blue}`,color:C.text,fontSize:30,fontWeight:700,fontFamily:"inherit",outline:"none",textAlign:"center",padding:"4px 0"}}/>
        </div>
      </div>
      {cur==="JPY"&&(
        <div style={{textAlign:"center",marginBottom:6}}>
          {status==="loading"&&<span style={{fontSize:11,color:C.amber}}>{T.fetchingRate}</span>}
          {status==="loaded"&&parsed>0&&(
            <div style={{background:C.blueDim,borderRadius:8,padding:"6px 12px",display:"inline-block",fontSize:12,color:C.blue,fontWeight:600}}>
              ¥{parsed.toLocaleString("ja-JP")} → {fmtEur(eurVal)}
              <span style={{fontSize:10,color:C.textMuted,marginLeft:6}}>1€=¥{rate?.toFixed(1)}</span>
            </div>
          )}
          {status==="failed"&&<button onClick={load} style={{background:"none",border:"none",color:C.blue,fontSize:11,cursor:"pointer"}}>↻ 再試行</button>}
        </div>
      )}
    </div>
  );
}

// ─── CollapsibleSection ───────────────────────────────────────────────────────
function CollapsibleSection({iconName,iconEmoji,title,subtitle,badge,badgeColor=C.blue,children,addButton,defaultOpen=false}){
  const [open,setOpen]=useState(defaultOpen);
  return(
    <div style={{marginBottom:4}}>
      <Card style={{borderRadius:open?"14px 14px 0 0":14,marginBottom:0}}>
        <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:12,padding:0,fontFamily:"inherit"}}>
          <div style={{width:40,height:40,borderRadius:10,background:C.blueDim,border:`1.5px solid ${C.blueLight}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {iconName?<Icon name={iconName} size={19} color={C.blue} strokeWidth={1.7}/>:<span style={{fontSize:20}}>{iconEmoji}</span>}
          </div>
          <div style={{flex:1,textAlign:"left"}}>
            <div style={{fontSize:14,fontWeight:700,color:C.text}}>{title}</div>
            {subtitle&&<div style={{fontSize:11,color:C.textMuted,marginTop:1}}>{subtitle}</div>}
          </div>
          {badge&&<div style={{fontSize:16,fontWeight:800,color:badgeColor,marginRight:6}}>{badge}</div>}
          <Icon name={open?"chevronUp":"chevronDown"} size={17} color={C.textMuted}/>
        </button>
      </Card>
      {open&&(
        <div style={{background:C.surface,borderRadius:"0 0 14px 14px",border:`1px solid ${C.border}`,borderTop:"none",overflow:"hidden"}}>
          {children}
          {addButton&&<div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`}}>{addButton}</div>}
        </div>
      )}
    </div>
  );
}

// ─── CatModal ────────────────────────────────────────────────────────────────
function CatModal({cat,onSave,onClose}){
  const COLORS=["#3B82F6","#10B981","#F59E0B","#EF4444","#8B5CF6","#F97316","#6366F1","#6B7280","#EC4899","#0EA5E9","#16A34A","#DC2626"];
  const [form,setForm]=useState(cat??{id:Date.now(),name:"",icon:"box",isIconName:true,color:C.blue,monthBudget:"",dayBudget:"",split:"want"});
  const inp={background:C.surfaceAlt,border:`1.5px solid ${C.border}`,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:10,padding:"10px 12px",width:"100%",boxSizing:"border-box",fontSize:14};
  const lbl={fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,display:"block",marginBottom:6};
  const save=()=>{if(!form.name)return;onSave({...form,monthBudget:parseFloat(form.monthBudget)||0,dayBudget:form.dayBudget?parseFloat(form.dayBudget)||null:null});};
  return(
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",backdropFilter:"blur(8px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",boxShadow:"0 -8px 32px rgba(30,60,120,0.12)",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:14}}>
          {cat?"カテゴリーを編集":"カテゴリーを追加"}
        </div>
        {/* SVG Icon picker */}
        <label style={lbl}>アイコン（SVG）</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14,maxHeight:160,overflowY:"auto"}}>
          {ICON_NAMES.map(nm=>(
            <button key={nm} onClick={()=>setForm(f=>({...f,icon:nm,isIconName:true}))} style={{
              width:38,height:38,borderRadius:8,cursor:"pointer",fontFamily:"inherit",
              border:`2px solid ${form.icon===nm&&form.isIconName?C.blue:"transparent"}`,
              background:form.icon===nm&&form.isIconName?C.blueDim:C.surfaceAlt,
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Icon name={nm} size={18} color={form.icon===nm&&form.isIconName?C.blue:C.textMid} strokeWidth={1.6}/>
            </button>
          ))}
        </div>
        {/* Color */}
        <label style={lbl}>カラー</label>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
          {COLORS.map(col=><button key={col} onClick={()=>setForm(f=>({...f,color:col}))} style={{width:28,height:28,borderRadius:"50%",background:col,cursor:"pointer",border:form.color===col?`3px solid ${C.blue}`:"3px solid transparent"}}/>)}
        </div>
        {/* Name */}
        <div style={{marginBottom:14}}><label style={lbl}>カテゴリー名</label><input value={form.name||form.nameJa||""} onChange={e=>setForm(f=>({...f,name:e.target.value,nameJa:e.target.value}))} placeholder="例：食料品" style={inp}/></div>
        {/* Budget */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          <div><label style={lbl}>月予算 (€)</label><input type="number" min="0" step="1" value={form.monthBudget||""} onChange={e=>setForm(f=>({...f,monthBudget:e.target.value}))} placeholder="0" style={inp}/></div>
          <div><label style={lbl}>日予算（任意）</label><input type="number" min="0" step="0.5" value={form.dayBudget||""} onChange={e=>setForm(f=>({...f,dayBudget:e.target.value||null}))} placeholder="なし" style={inp}/></div>
        </div>
        {/* Split assignment */}
        <div style={{marginBottom:20}}>
          <label style={lbl}>予算配分</label>
          <div style={{display:"flex",gap:6}}>
            {[["need","Need",C.need],["want","Want",C.want],["future","Future",C.future],["none","なし",C.textMuted]].map(([v,l,col])=>(
              <button key={v} onClick={()=>setForm(f=>({...f,split:v}))} style={{flex:1,padding:"8px 4px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                border:`1.5px solid ${form.split===v?col:C.border}`,background:form.split===v?`${col}18`:C.surfaceAlt,color:form.split===v?col:C.textMuted}}>{l}</button>
            ))}
          </div>
        </div>
        <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{T.save}</button>
      </div>
    </div>
  );
}

// ─── SubModal ────────────────────────────────────────────────────────────────
function SubModal({sub,onSave,onClose}){
  const COLORS=["#E50914","#1DB954","#3B82F6","#9333EA","#F59E0B","#0891B2","#111827","#EF4444","#F97316","#6366F1"];
  const [form,setForm]=useState(sub??{id:Date.now(),name:"",cycle:"monthly",note:"",color:C.blue,split:"want"});
  const [amount,setAmount]=useState(sub?String(sub.amount):"");
  const [eurAmount,setEurAmount]=useState(sub?.amount??0);
  const inp={background:C.surfaceAlt,border:`1.5px solid ${C.border}`,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:10,padding:"10px 12px",width:"100%",boxSizing:"border-box",fontSize:14};
  const lbl={fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,display:"block",marginBottom:6};
  const save=()=>{if(!form.name||!eurAmount)return;onSave({...form,amount:eurAmount,id:form.id??Date.now()});};
  return(
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",backdropFilter:"blur(8px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",boxShadow:"0 -8px 32px rgba(30,60,120,0.12)",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:14}}>{sub?T.editSub:T.addSub}</div>
        <div style={{marginBottom:12}}><label style={lbl}>{T.subName}</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Netflix…" style={inp}/></div>
        <div style={{marginBottom:12}}><label style={lbl}>{T.subAmount}</label><AmountInput value={amount} onChange={(raw,eur)=>{setAmount(raw);setEurAmount(eur||parseFloat(raw)||0);}}/></div>
        <div style={{marginBottom:12}}>
          <label style={lbl}>{T.subCycle}</label>
          <div style={{display:"flex",background:C.surfaceAlt,borderRadius:12,padding:4,gap:4}}>
            {[["monthly",T.subCycleMonthly],["yearly",T.subCycleYearly]].map(([v,l])=>(
              <button key={v} onClick={()=>setForm(f=>({...f,cycle:v}))} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:form.cycle===v?C.blue:"transparent",color:form.cycle===v?"#fff":C.textMuted,fontSize:13,fontWeight:600}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:12}}><label style={lbl}>{T.subNote}</label><input value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="…" style={inp}/></div>
        <div style={{marginBottom:12}}>
          <label style={lbl}>予算配分</label>
          <div style={{display:"flex",gap:6}}>
            {[["need","Need",C.need],["want","Want",C.want],["future","Future",C.future]].map(([v,l,col])=>(
              <button key={v} onClick={()=>setForm(f=>({...f,split:v}))} style={{flex:1,padding:"8px 4px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                border:`1.5px solid ${form.split===v?col:C.border}`,background:form.split===v?`${col}18`:C.surfaceAlt,color:form.split===v?col:C.textMuted}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:18}}><label style={lbl}>カラー</label>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {COLORS.map(col=><button key={col} onClick={()=>setForm(f=>({...f,color:col}))} style={{width:26,height:26,borderRadius:"50%",background:col,cursor:"pointer",border:form.color===col?`3px solid ${C.blue}`:"3px solid transparent"}}/>)}
          </div>
        </div>
        <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{T.save}</button>
      </div>
    </div>
  );
}

// ─── AccountModal ─────────────────────────────────────────────────────────────
function AccountModal({account,onSave,onClose}){
  const COLORS=["#2F7FD4","#16A34A","#9333EA","#D97706","#EF4444","#0891B2","#7C3AED","#F97316"];
  const [form,setForm]=useState(account??{id:Date.now(),name:"",bank:"",color:C.blue,isSavings:false});
  const [amount,setAmount]=useState(account?String(account.balance):"");
  const [eurAmount,setEurAmount]=useState(account?.balance??0);
  const inp={background:C.surfaceAlt,border:`1.5px solid ${C.border}`,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:10,padding:"10px 12px",width:"100%",boxSizing:"border-box",fontSize:14};
  const lbl={fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,display:"block",marginBottom:6};
  const save=()=>{if(!form.name)return;onSave({...form,balance:eurAmount||parseFloat(amount)||0});};
  return(
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",backdropFilter:"blur(8px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",boxShadow:"0 -8px 32px rgba(30,60,120,0.12)",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:14}}>{account?T.editAccount:T.addAccount}</div>
        <div style={{marginBottom:12}}><label style={lbl}>{T.accountName}</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="普通口座" style={inp}/></div>
        <div style={{marginBottom:12}}><label style={lbl}>{T.accountBank}</label><input value={form.bank} onChange={e=>setForm(f=>({...f,bank:e.target.value}))} placeholder="三菱UFJ銀行" style={inp}/></div>
        <div style={{marginBottom:12}}><label style={lbl}>{T.accountBalance}</label><AmountInput value={amount} onChange={(raw,eur)=>{setAmount(raw);setEurAmount(eur||parseFloat(raw)||0);}}/></div>
        <div style={{marginBottom:14}}>
          <label style={lbl}>カラー</label>
          <div style={{display:"flex",gap:8}}>{COLORS.map(col=><button key={col} onClick={()=>setForm(f=>({...f,color:col}))} style={{width:28,height:28,borderRadius:"50%",background:col,cursor:"pointer",border:form.color===col?`3px solid ${C.blue}`:"3px solid transparent"}}/>)}</div>
        </div>
        {/* Savings toggle */}
        <div style={{marginBottom:20,display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,border:`1.5px solid ${form.isSavings?C.green:C.border}`,background:form.isSavings?C.greenBg:C.surfaceAlt,cursor:"pointer"}} onClick={()=>setForm(f=>({...f,isSavings:!f.isSavings}))}>
          <Icon name="piggy" size={20} color={form.isSavings?C.green:C.textMuted}/>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:form.isSavings?C.green:C.text}}>{T.isSavings}</div>
            <div style={{fontSize:11,color:C.textMuted}}>この口座の残高を貯金に反映します</div>
          </div>
          <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${form.isSavings?C.green:C.border}`,background:form.isSavings?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {form.isSavings&&<div style={{width:8,height:8,borderRadius:"50%",background:"#fff"}}/>}
          </div>
        </div>
        <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{T.save}</button>
      </div>
    </div>
  );
}

// ─── AddTx Modal ──────────────────────────────────────────────────────────────
function AddModal({cats,prefillDate,editTx,onSave,onClose}){
  const [form,setForm]=useState(editTx?{type:editTx.type,catId:editTx.catId,desc:editTx.desc,date:editTx.date}:{type:"expense",catId:(cats[0]?.id??2),desc:"",date:prefillDate??TODAY_STR});
  const [amount,setAmount]=useState(editTx?String(editTx.amount):"");
  const [eurAmount,setEurAmount]=useState(editTx?.amount??0);
  const activeCats=form.type==="expense"?cats:INC_BASE;
  const catName=(cat)=>cat?.nameJa||cat?.name||"";
  const save=()=>{
    if(!amount||parseFloat(amount)<=0)return;
    const catId=isNaN(Number(form.catId))?form.catId:Number(form.catId);
    onSave({...(editTx||{}),type:form.type,catId,desc:form.desc,amount:eurAmount||parseFloat(amount)||0,date:form.date,id:editTx?.id??Date.now()});
  };
  const inp={background:C.surfaceAlt,border:`1.5px solid ${C.border}`,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:10,padding:"11px 13px",fontSize:14};
  return(
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",backdropFilter:"blur(8px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",boxShadow:"0 -8px 32px rgba(30,60,120,0.12)",maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:12}}>{editTx?T.editEntry:T.newEntry}</div>
        <div style={{display:"flex",background:C.surfaceAlt,borderRadius:12,padding:4,marginBottom:12,gap:4}}>
          {[["expense",T.expenseBtn],["income",T.incomeBtn]].map(([v,l])=>(
            <button key={v} onClick={()=>setForm(f=>({...f,type:v,catId:v==="expense"?(cats[0]?.id??2):"i1"}))} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:form.type===v?(v==="expense"?C.amberBg:C.greenBg):"transparent",color:form.type===v?(v==="expense"?C.amber:C.green):C.textMuted,fontSize:13,fontWeight:700}}>{l}</button>
          ))}
        </div>
        <AmountInput value={amount} onChange={(raw,eur)=>{setAmount(raw);setEurAmount(eur||parseFloat(raw)||0);}} autoFocus/>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:8,marginBottom:10}}>
          {activeCats.map(cat=>{
            const active=String(form.catId)===String(cat.id);
            return(
              <button key={cat.id} onClick={()=>setForm(f=>({...f,catId:cat.id}))} style={{padding:"6px 10px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:`1.5px solid ${active?cat.color:C.border}`,background:active?`${cat.color}18`:C.surfaceAlt,color:active?cat.color:C.textMid,fontSize:12,fontWeight:active?700:400,display:"flex",alignItems:"center",gap:5}}>
                {cat.isIconName?<Icon name={cat.icon} size={13} color={active?cat.color:C.textMid}/>:<span style={{fontSize:13}}>{cat.icon}</span>}
                {catName(cat).split(" ")[0]}
              </button>
            );
          })}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:9,marginBottom:14}}>
          <input value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder={T.descPlaceholder} style={{...inp,width:"100%"}}/>
          <input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} style={{...inp,fontSize:12,colorScheme:"light"}}/>
        </div>
        <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontSize:15,fontWeight:700,fontFamily:"inherit",cursor:"pointer",boxShadow:`0 4px 16px ${C.blue}44`}}>{editTx?T.save+" ✓":T.save}</button>
      </div>
    </div>
  );
}

// ─── SavingsModal ─────────────────────────────────────────────────────────────
function SavingsModal({entry,onSave,onClose}){
  const [year,setYear]=useState(entry?.year??NOW.getFullYear());
  const [month,setMonth]=useState(entry?.month??NOW.getMonth());
  const [amount,setAmount]=useState(entry?String(entry.amount):"");
  const [eurAmount,setEurAmount]=useState(entry?.amount??0);
  const [note,setNote]=useState(entry?.note??"");
  const inp={background:C.surfaceAlt,border:`1.5px solid ${C.border}`,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:10,padding:"10px 12px",fontSize:14};
  const lbl={fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,display:"block",marginBottom:6};
  const save=()=>{if(!eurAmount&&!parseFloat(amount))return;onSave({id:entry?.id??Date.now(),year,month,amount:eurAmount||parseFloat(amount)||0,note});};
  return(
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",backdropFilter:"blur(8px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",boxShadow:"0 -8px 32px rgba(30,60,120,0.12)",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:14}}>{T.addSavingsEntry}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <div><label style={lbl}>月</label><select value={month} onChange={e=>setMonth(Number(e.target.value))} style={{...inp,width:"100%",cursor:"pointer"}}>{T.months.map((m,i)=><option key={i} value={i}>{m}</option>)}</select></div>
          <div><label style={lbl}>年</label><select value={year} onChange={e=>setYear(Number(e.target.value))} style={{...inp,width:"100%",cursor:"pointer"}}>{[NOW.getFullYear()-1,NOW.getFullYear(),NOW.getFullYear()+1].map(y=><option key={y} value={y}>{y}</option>)}</select></div>
        </div>
        <div style={{marginBottom:12}}><label style={lbl}>{T.savingsAmt}</label><AmountInput value={amount} onChange={(raw,eur)=>{setAmount(raw);setEurAmount(eur||parseFloat(raw)||0);}}/></div>
        <div style={{marginBottom:18}}><label style={lbl}>{T.savingsNote}</label><input value={note} onChange={e=>setNote(e.target.value)} placeholder="…" style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
        <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{T.save}</button>
      </div>
    </div>
  );
}

// ─── SavingsChart ─────────────────────────────────────────────────────────────
function SavingsChart({data}){
  if(!data||data.length===0)return null;
  const sorted=[...data].sort((a,b)=>a.year!==b.year?a.year-b.year:a.month-b.month);
  const max=Math.max(...sorted.map(d=>d.amount),1);
  const W=320,H=120,PAD={l:10,r:10,t:16,b:28};
  const cw=W-PAD.l-PAD.r,ch=H-PAD.t-PAD.b;
  const pts=sorted.map((d,i)=>({x:PAD.l+i*(cw/(sorted.length-1||1)),y:PAD.t+ch-(d.amount/max)*ch,d}));
  const polyline=pts.map(p=>`${p.x},${p.y}`).join(" ");
  const fillPath=`M${pts[0].x},${PAD.t+ch} `+pts.map(p=>`L${p.x},${p.y}`).join(" ")+` L${pts[pts.length-1].x},${PAD.t+ch} Z`;
  return(
    <div style={{overflowX:"auto"}}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:H,display:"block"}}>
        <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.green} stopOpacity="0.25"/><stop offset="100%" stopColor={C.green} stopOpacity="0.02"/></linearGradient></defs>
        {[0,0.5,1].map(f=><line key={f} x1={PAD.l} x2={W-PAD.r} y1={PAD.t+ch*(1-f)} y2={PAD.t+ch*(1-f)} stroke={C.border} strokeWidth="1" strokeDasharray={f===0||f===1?"":"4 4"}/>)}
        <path d={fillPath} fill="url(#sg)"/>
        <polyline points={polyline} fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" fill={C.green} stroke={C.surface} strokeWidth="2"/>)}
        {pts.map((p,i)=><text key={i} x={p.x} y={H-6} textAnchor="middle" fontSize="9" fill={C.textMuted} fontFamily="inherit">{T.months[p.d.month]}</text>)}
        {[pts[0],pts[pts.length-1]].map((p,i)=><text key={i} x={p.x} y={p.y-8} textAnchor="middle" fontSize="9" fill={C.green} fontWeight="700" fontFamily="inherit">{p.d.amount>=1000?`${(p.d.amount/1000).toFixed(1)}k`:p.d.amount}</text>)}
      </svg>
    </div>
  );
}

// ─── WeeklyChart ──────────────────────────────────────────────────────────────
function WeeklyChart({txs,weekBudgetPerDay}){
  const mon=weekStart(NOW);
  const days=Array.from({length:7},(_,i)=>{
    const d=new Date(mon);d.setDate(d.getDate()+i);
    const ds=d.toISOString().slice(0,10);
    const spent=txs.filter(t=>t.type==="expense"&&t.date===ds).reduce((s,t)=>s+t.amount,0);
    return{ds,dow:T.dowS[i],spent,isToday:ds===TODAY_STR,isFuture:d>NOW};
  });
  const maxSpent=Math.max(...days.map(d=>d.spent),weekBudgetPerDay,1);
  return(
    <div>
      <div style={{display:"flex",alignItems:"flex-end",gap:5,height:88,marginBottom:6}}>
        {days.map(({ds,spent,isToday,isFuture})=>{
          const pct=spent/maxSpent,bPct=weekBudgetPerDay/maxSpent;
          const over=spent>weekBudgetPerDay&&weekBudgetPerDay>0;
          const bc=isFuture?C.surfaceAlt:over?C.red:spent>weekBudgetPerDay*0.8?C.amber:C.blue;
          return(
            <div key={ds} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              {spent>0&&<div style={{fontSize:9,color:over?C.red:C.textMid,fontWeight:700}}>{spent>=100?Math.round(spent):spent.toFixed(0)}</div>}
              <div style={{flex:1,width:"100%",display:"flex",alignItems:"flex-end",position:"relative"}}>
                {weekBudgetPerDay>0&&<div style={{position:"absolute",bottom:`${bPct*100}%`,left:0,right:0,height:1,background:C.border}}/>}
                <div style={{width:"100%",height:`${Math.max(pct*100,isFuture?10:spent>0?8:3)}%`,background:bc,borderRadius:"5px 5px 3px 3px",boxShadow:isToday?`0 0 10px ${bc}55`:"none",border:isToday?`2px solid ${bc}`:"none",transition:"height .4s ease",minHeight:3}}/>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",gap:5}}>
        {days.map(({ds,dow,isToday})=>(
          <div key={ds} style={{flex:1,textAlign:"center",fontSize:10,fontWeight:isToday?700:500,color:isToday?C.blue:C.textMuted}}>{dow}</div>
        ))}
      </div>
    </div>
  );
}

// ─── SimpleCalendar ───────────────────────────────────────────────────────────
function SimpleCalendar({txs, cats, year, month, selectedDay, onSelectDay}) {
  const totalDays = daysInMonth(year, month);
  const firstDate = new Date(year, month, 1);
  const startOffset = dowMon(firstDate);
  const isCurrentView = NOW.getMonth() === month && NOW.getFullYear() === year;
  const todayNum = isCurrentView ? NOW.getDate() : -1;

  const daySpend = {};
  if (txs) {
    txs.forEach(function(tx) {
      if (tx.type === "expense") {
        const parts = tx.date.split("-");
        const d = parseInt(parts[2], 10);
        if (d >= 1 && d <= 31) {
          daySpend[d] = (daySpend[d] || 0) + tx.amount;
        }
      }
    });
  }

  const amounts = Object.values(daySpend);
  const maxAmount = amounts.length > 0 ? Math.max.apply(null, amounts) : 1;

  const dowColors = ["#111827","#111827","#111827","#111827","#111827","#2F7FD4","#DC2626"];
  const dowLabels = ["月","火","水","木","金","土","日"];

  const allCats = cats ? cats.concat(INC_BASE) : INC_BASE;
  const selectedTxs = selectedDay
    ? (txs || []).filter(function(t){ return parseInt(t.date.split("-")[2],10) === selectedDay; }).sort(function(a,b){ return b.amount - a.amount; })
    : [];
  const dowLongLabels = ["月曜","火曜","水曜","木曜","金曜","土曜","日曜"];

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:6}}>
        {dowLabels.map(function(d, i){
          return <div key={d} style={{textAlign:"center",fontSize:10,fontWeight:600,color:dowColors[i],padding:"4px 0"}}>{d}</div>;
        })}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
        {Array.from({length:startOffset}).map(function(_,i){ return <div key={"e"+i}/>; })}
        {Array.from({length:totalDays}).map(function(_,i){
          const d = i + 1;
          const spent = daySpend[d] || 0;
          const cellDow = (startOffset + i) % 7;
          const isToday = d === todayNum;
          const isSel = d === selectedDay;
          const alpha = spent > 0 ? Math.min(0.12 + (spent / maxAmount) * 0.55, 1) : 0;
          const numColor = isSel ? "#fff" : isToday ? C.blue : cellDow === 5 ? C.calSat : cellDow === 6 ? C.calSun : C.text;
          const bgColor = isSel ? C.blue : spent > 0 ? ("rgba(78,140,115," + alpha + ")") : C.surfaceAlt;
          const borderColor = isToday ? C.blue : isSel ? C.blue : C.border;
          return (
            <div key={d} onClick={function(){ onSelectDay(isSel ? null : d); }}
              style={{borderRadius:10,minHeight:46,cursor:"pointer",background:bgColor,
                border:"1.5px solid "+borderColor,display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",gap:2,padding:"5px 2px"}}>
              <span style={{fontSize:12,lineHeight:1,fontWeight:isToday?700:400,color:numColor}}>{d}</span>
              {spent > 0 && (
                <span style={{fontSize:9,fontWeight:700,lineHeight:1,color:isSel?"rgba(255,255,255,0.9)":C.blue}}>
                  {spent >= 100 ? Math.round(spent) : spent.toFixed(0)}€
                </span>
              )}
            </div>
          );
        })}
      </div>
      {selectedDay && (
        <div style={{background:C.surface,borderRadius:14,padding:"14px",marginTop:14,border:"1px solid "+C.border,boxShadow:"0 1px 4px rgba(30,60,120,0.07)"}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:10}}>
            {dowLongLabels[dowMon(new Date(year,month,selectedDay))]}・{selectedDay}日 {["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"][month]}
            {daySpend[selectedDay] ? "  " + fmtEur(daySpend[selectedDay]) : "　支出なし"}
          </div>
          {selectedTxs.length === 0 && <div style={{fontSize:13,color:C.textMuted}}>データなし</div>}
          {selectedTxs.map(function(tx){
            var cat = allCats.find(function(c){ return c.id === tx.catId; }) || {icon:"box",isIconName:true,color:C.blue,name:"?"};
            var catName = cat.nameJa || cat.name || "?";
            return (
              <div key={tx.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid "+C.border}}>
                <CatIconDisplay cat={cat} size={32}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,color:C.text}}>{tx.desc || catName}</div>
                  <div style={{fontSize:10,color:C.textMuted}}>{catName}</div>
                </div>
                <div style={{fontSize:14,fontWeight:700,color:tx.type==="income"?C.green:C.text}}>
                  {tx.type==="income" ? "+" : "−"}{fmtEur(tx.amount)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


// ─── MonthNavInline ───────────────────────────────────────────────────────────
function MonthNavInline({vMonth,vYear,onPrev,onNext,navBtnSt}){
  const months=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
  return(
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <button style={navBtnSt} onClick={onPrev}><Icon name="chevronL" size={14} color={C.textMid}/></button>
      <div style={{textAlign:"center",minWidth:54}}>
        <div style={{fontSize:12,fontWeight:700,color:C.text}}>{months[vMonth]}</div>
        <div style={{fontSize:10,color:C.textMuted}}>{vYear}</div>
      </div>
      <button style={navBtnSt} onClick={onNext}><Icon name="chevronR" size={14} color={C.textMid}/></button>
    </div>
  );
}

// ─── SubRow (top-level component) ────────────────────────────────────────────
function SubRow({sub,onEdit,onDelete}){
  const pm=sub.cycle==="yearly"?sub.amount/12:sub.amount;
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"9px 16px",borderTop:`1px solid ${C.border}`}}>
      <div style={{width:32,height:32,borderRadius:8,background:`${sub.color}18`,border:`1.5px solid ${sub.color}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:sub.color}}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:C.text}}>{sub.name}</div>
        <div style={{fontSize:10,color:C.textMuted}}>{sub.note&&`${sub.note} · `}{sub.cycle==="yearly"?`${fmtEur(sub.amount)}/年`:`毎月`}</div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontSize:13,fontWeight:700,color:C.blue}}>{fmtEur(pm)}</div>
        <div style={{fontSize:9,color:C.textMuted}}>{T.subPerMonth}</div>
      </div>
      <div style={{display:"flex",gap:4}}>
        <button onClick={onEdit} style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:6,width:24,height:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="edit" size={11} color={C.textMid}/></button>
        <button onClick={onDelete} style={{background:C.redBg,border:`1px solid ${C.red}22`,borderRadius:6,width:24,height:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="trash" size={11} color={C.red}/></button>
      </div>
    </div>
  );
}

// ─── CatStatRow (top-level component) ────────────────────────────────────────
function CatStatRow({cat,idx,catStats}){
  const stats=(catStats||[]).find(s=>s.id===cat.id)??{monthSpent:0,daySpent:0};
  return(
    <div style={{padding:"10px 16px",borderTop:idx>0?`1px solid ${C.border}`:"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:3}}>
        <CatIconDisplay cat={cat} size={30}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:600,color:C.text}}>{cat.nameJa||cat.name}</span>
            <span style={{fontSize:11,fontWeight:600,color:stats.monthSpent>cat.monthBudget?C.red:stats.monthSpent>cat.monthBudget*0.8?C.amber:C.textMid}}>
              {fmtEur(stats.monthSpent)}{cat.monthBudget?` / ${fmtEur(cat.monthBudget)}`:""}
            </span>
          </div>
          <BudgetBar spent={stats.monthSpent} budget={cat.monthBudget} color={cat.color} h={4}/>
        </div>
      </div>
    </div>
  );
}

// ─── SettingsCatRow ───────────────────────────────────────────────────────────
function SettingsCatRow({cat,onEdit,onDelete,catStats,isCurrentMonth}){
  const [open,setOpen]=useState(false);
  const stats=catStats?.find(s=>s.id===cat.id)??{monthSpent:0,daySpent:0};
  const splitColors={need:C.need,want:C.want,future:C.future,none:C.textMuted};
  const splitLabels={need:"Need",want:"Want",future:"Future",none:"なし"};
  return(
    <div style={{marginBottom:4}}>
      <div style={{background:C.surface,borderRadius:open?"12px 12px 0 0":12,border:`1px solid ${C.border}`,boxShadow:"0 1px 4px rgba(30,60,120,0.05)",overflow:"hidden"}}>
        <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:12,padding:"11px 14px",fontFamily:"inherit"}}>
          <CatIconDisplay cat={cat} size={34}/>
          <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text,textAlign:"left"}}>{cat.nameJa||cat.name}</span>
          {cat.split&&cat.split!=="none"&&<span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:99,background:`${splitColors[cat.split]||C.textMuted}18`,color:splitColors[cat.split]||C.textMuted}}>{splitLabels[cat.split]||cat.split}</span>}
          <span style={{fontSize:12,color:C.textMuted,marginRight:4}}>{cat.monthBudget?fmtEur(cat.monthBudget):"—"}</span>
          <Icon name={open?"chevronUp":"chevronDown"} size={16} color={C.textMuted}/>
        </button>
      </div>
      {open&&(
        <div style={{background:C.surface,borderRadius:"0 0 12px 12px",border:`1px solid ${C.border}`,borderTop:"none",padding:"12px 14px",boxShadow:"0 2px 8px rgba(30,60,120,0.05)"}}>
          <div style={{display:"flex",gap:14,marginBottom:10,fontSize:12,color:C.textMid}}>
            <span>月予算: <b style={{color:C.text}}>{cat.monthBudget?fmtEur(cat.monthBudget):"未設定"}</b></span>
            <span>日予算: <b style={{color:C.text}}>{cat.dayBudget?fmtEur(cat.dayBudget):"なし"}</b></span>
          </div>
          {cat.monthBudget>0&&(
            <div style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.textMuted,marginBottom:3}}>
                <span>今月の支出</span>
                <span style={{color:stats.monthSpent>cat.monthBudget?C.red:C.textMid,fontWeight:600}}>{fmtEur(stats.monthSpent)} / {fmtEur(cat.monthBudget)}</span>
              </div>
              <div style={{height:6,background:C.surfaceAlt,borderRadius:99,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.min((stats.monthSpent/cat.monthBudget)*100,100)}%`,background:stats.monthSpent>cat.monthBudget?C.red:stats.monthSpent>cat.monthBudget*0.8?C.amber:cat.color,borderRadius:99,transition:"width .4s"}}/>
              </div>
            </div>
          )}
          <div style={{display:"flex",gap:8}}>
            <button onClick={onEdit} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"9px",borderRadius:10,border:`1px solid ${C.border}`,background:C.surfaceAlt,color:C.textMid,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}><Icon name="edit" size={13} color={C.textMid}/>編集</button>
            <button onClick={onDelete} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"9px",borderRadius:10,border:`1px solid ${C.red}22`,background:C.redBg,color:C.red,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}><Icon name="trash" size={13} color={C.red}/>削除</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function Haushaltsbuch(){
  const lang="ja";
  const [tab,setTab]=useState(0);
  const [showAdd,setShowAdd]=useState(false);
  const [addDate,setAddDate]=useState(null);
  const [editTxState,setEditTxState]=useState(null);
  const [txs,setTxs]=useState(SEED);
  const [cats,setCats]=useState(DEFAULT_CATS);
  const [accounts,setAccounts]=useState(DEFAULT_ACCOUNTS);
  const [subs,setSubs]=useState(DEFAULT_SUBS);
  const [savings,setSavings]=useState(DEFAULT_SAVINGS);
  const [showSubModal,setShowSubModal]=useState(false);
  const [editSub,setEditSub]=useState(null);
  const [showAccountModal,setShowAccountModal]=useState(false);
  const [editAccount,setEditAccount]=useState(null);
  const [showCatModal,setShowCatModal]=useState(false);
  const [editCat,setEditCat]=useState(null);
  const [showSavingsModal,setShowSavingsModal]=useState(false);
  const [editSavings,setEditSavings]=useState(null);
  const [vMonth,setVMonth]=useState(NOW.getMonth());
  const [vYear,setVYear]=useState(NOW.getFullYear());
  const [calDay,setCalDay]=useState(null);
  const [listMode,setListMode]=useState(false);
  const [filterCat,setFilterCat]=useState("all");
  const [settingsRate,setSettingsRate]=useState(null);
  const [rateLoading,setRateLoading]=useState(false);
  const [dragIdx,setDragIdx]=useState(null);
  const [dragOver,setDragOver]=useState(null);
  // Settings sub-tab
  const [settingsTab,setSettingsTab]=useState("general"); // "general" | "categories"

  // ── Derived ──────────────────────────────────────────────────────────────
  const subMonthlyTotal=useMemo(()=>subs.reduce((s,x)=>s+(x.cycle==="yearly"?x.amount/12:x.amount),0),[subs]);
  const monthTxs=useMemo(()=>txs.filter(t=>{const d=new Date(t.date);return d.getMonth()===vMonth&&d.getFullYear()===vYear;}),[txs,vMonth,vYear]);
  const todayTxs=useMemo(()=>txs.filter(t=>t.date===TODAY_STR),[txs]);
  const isCurrentMonth=vMonth===NOW.getMonth()&&vYear===NOW.getFullYear();
  const totalIncome=useMemo(()=>monthTxs.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0),[monthTxs]);
  const totalExpenseReal=useMemo(()=>monthTxs.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0),[monthTxs]);
  const totalExpense=totalExpenseReal+(isCurrentMonth?subMonthlyTotal:0);
  const balance=totalIncome-totalExpense;
  const totalMonthBudget=useMemo(()=>cats.reduce((s,c)=>s+(c.monthBudget||0),0),[cats]);
  const weekBudgetPerDay=totalMonthBudget>0?totalMonthBudget/daysInMonth(vYear,vMonth):0;
  const todayExp=useMemo(()=>todayTxs.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0),[todayTxs]);
  const daysLeft=isCurrentMonth?daysInMonth(vYear,vMonth)-NOW.getDate()+1:1;
  const dailyAvail=isCurrentMonth&&totalMonthBudget>0?(totalMonthBudget-totalExpense)/Math.max(daysLeft,1):null;
  const catStats=useMemo(()=>cats.map(cat=>({...cat,monthSpent:monthTxs.filter(t=>t.type==="expense"&&t.catId===cat.id).reduce((s,t)=>s+t.amount,0),daySpent:todayTxs.filter(t=>t.type==="expense"&&t.catId===cat.id).reduce((s,t)=>s+t.amount,0)})),[cats,monthTxs,todayTxs]);
  const mon=weekStart(NOW),sun=new Date(mon);sun.setDate(sun.getDate()+6);
  const weekTxs=useMemo(()=>txs.filter(t=>{const d=new Date(t.date);return d>=mon&&d<=sun;}),[txs]);
  const weekExp=useMemo(()=>weekTxs.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0),[weekTxs]);
  const weekBudget=weekBudgetPerDay*7;
  const totalAssets=useMemo(()=>accounts.reduce((s,a)=>s+a.balance,0),[accounts]);
  const savingsAccountBalance=useMemo(()=>accounts.filter(a=>a.isSavings).reduce((s,a)=>s+a.balance,0),[accounts]);
  const totalSavingsFromHistory=useMemo(()=>savings.reduce((s,e)=>s+e.amount,0),[savings]);
  const latestSaving=useMemo(()=>[...savings].sort((a,b)=>b.year!==a.year?b.year-a.year:b.month-a.month)[0],[savings]);
  const sortedTxs=useMemo(()=>[...monthTxs].sort((a,b)=>new Date(b.date)-new Date(a.date)),[monthTxs]);
  const filteredTxs=filterCat==="all"?sortedTxs:sortedTxs.filter(t=>t.catId==filterCat);
  const allCats=[...cats,...INC_BASE];
  const getCat=(id)=>allCats.find(c=>c.id===id)??{icon:"box",isIconName:true,name:"?",color:C.blue};

  // Split groupings
  const catsBySplit=useMemo(()=>({
    need: cats.filter(c=>c.split==="need"),
    want: cats.filter(c=>c.split==="want"),
    future: cats.filter(c=>c.split==="future"),
    none: cats.filter(c=>!c.split||c.split==="none"),
  }),[cats]);
  const subsBySplit=useMemo(()=>({
    need: subs.filter(s=>s.split==="need"),
    want: subs.filter(s=>s.split==="want"),
    future: subs.filter(s=>s.split==="future"),
    none: subs.filter(s=>!s.split||s.split==="none"),
  }),[subs]);

  const splitTotal=(splitKey)=>{
    const catSpend=catsBySplit[splitKey]?.reduce((s,c)=>{
      const stat=catStats.find(x=>x.id===c.id);
      return s+(stat?.monthSpent||0);
    },0)||0;
    const subSpend=subsBySplit[splitKey]?.reduce((s,sub)=>s+(sub.cycle==="yearly"?sub.amount/12:sub.amount),0)||0;
    return catSpend+subSpend;
  };
  const splitBudget=(splitKey,pct)=>totalIncome>0?totalIncome*pct/100:0;

  // ── Handlers ─────────────────────────────────────────────────────────────
  const prevMonth=()=>{if(vMonth===0){setVMonth(11);setVYear(y=>y-1);}else setVMonth(m=>m-1);};
  const nextMonth=()=>{if(vMonth===11){setVMonth(0);setVYear(y=>y+1);}else setVMonth(m=>m+1);};
  const saveTx=(tx)=>{setTxs(p=>p.find(t=>t.id===tx.id)?p.map(t=>t.id===tx.id?tx:t):[...p,tx]);setShowAdd(false);setEditTxState(null);};
  const deleteTx=(id)=>setTxs(p=>p.filter(t=>t.id!==id));
  const saveSub=(s)=>{setSubs(p=>p.find(x=>x.id===s.id)?p.map(x=>x.id===s.id?s:x):[...p,s]);setShowSubModal(false);setEditSub(null);};
  const deleteSub=(id)=>setSubs(p=>p.filter(s=>s.id!==id));
  const saveAccount=(a)=>{setAccounts(p=>p.find(x=>x.id===a.id)?p.map(x=>x.id===a.id?a:x):[...p,a]);setShowAccountModal(false);setEditAccount(null);};
  const deleteAccount=(id)=>setAccounts(p=>p.filter(a=>a.id!==id));
  const saveCat=(c)=>{if(cats.find(x=>x.id===c.id))setCats(p=>p.map(x=>x.id===c.id?c:x));else setCats(p=>[...p,{...c,id:Date.now()}]);setShowCatModal(false);setEditCat(null);};
  const deleteCat=(id)=>setCats(p=>p.filter(c=>c.id!==id));
  const saveSavingsEntry=(e)=>{setSavings(p=>p.find(x=>x.id===e.id)?p.map(x=>x.id===e.id?e:x):[...p,e]);setShowSavingsModal(false);setEditSavings(null);};
  const deleteSavingsEntry=(id)=>setSavings(p=>p.filter(e=>e.id!==id));
  const loadRate=async()=>{setRateLoading(true);const r=await fetchJpyEurRate();setSettingsRate(r);setRateLoading(false);};
  const handleDrop=(i)=>{if(dragIdx===null||dragIdx===i)return;const n=[...cats];const[m]=n.splice(dragIdx,1);n.splice(i,0,m);setCats(n);setDragIdx(null);setDragOver(null);};

  const navBtnSt={background:C.surfaceAlt,border:`1px solid ${C.border}`,width:28,height:28,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"};
  const rowSt={display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`1px solid ${C.border}`};

  // Sub-row inside budget expandable


  const NAV=[
    {icon:"home",    label:T.nav[0], t:0},
    {icon:"chart",   label:T.nav[1], t:1},
    {icon:"plus",    label:"",       t:-1},
    {icon:"calendar",label:T.nav[3], t:2},
    {icon:"gear",    label:T.nav[4], t:3},
  ];

  return(
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'DM Sans','Helvetica Neue','Hiragino Sans',sans-serif",paddingBottom:90}}>
      <style>{`*{box-sizing:border-box;}`}</style>

      {/* Modals */}
      {(showAdd||editTxState)&&<AddModal cats={cats} prefillDate={addDate} editTx={editTxState} onSave={saveTx} onClose={()=>{setShowAdd(false);setEditTxState(null);}}/>}
      {(showSubModal||editSub)&&<SubModal sub={editSub} onSave={saveSub} onClose={()=>{setShowSubModal(false);setEditSub(null);}}/>}
      {(showAccountModal||editAccount)&&<AccountModal account={editAccount} onSave={saveAccount} onClose={()=>{setShowAccountModal(false);setEditAccount(null);}}/>}
      {(showCatModal||editCat)&&<CatModal cat={editCat} onSave={saveCat} onClose={()=>{setShowCatModal(false);setEditCat(null);}}/>}
      {(showSavingsModal||editSavings)&&<SavingsModal entry={editSavings} onSave={saveSavingsEntry} onClose={()=>{setShowSavingsModal(false);setEditSavings(null);}}/>}

      {/* ════ HEIM ════ */}
      {tab===0&&(<>
        <div style={{padding:"28px 18px 14px",background:C.surface,borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:C.textMuted}}>{T.appName}</div>
              <div style={{fontSize:22,fontWeight:800,color:C.text,marginTop:2}}>{T.nav[0]}</div>
            </div>
            <MonthNavInline vMonth={vMonth} vYear={vYear} onPrev={prevMonth} onNext={nextMonth} navBtnSt={navBtnSt}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[[T.income,totalIncome,C.green,C.greenBg],[T.expenses,totalExpense,C.amber,C.amberBg],[T.balance,balance,balance>=0?C.blue:C.red,balance>=0?C.blueDim:C.redBg]].map(([l,v,col,bg])=>(
              <div key={l} style={{background:bg,borderRadius:12,padding:"11px 8px",textAlign:"center",border:`1px solid ${col}22`}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:col,marginBottom:4}}>{l}</div>
                <div style={{fontSize:14,fontWeight:800,color:col}}>{fmtShort(v)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{padding:"0 18px"}}>
          {/* ── This week ── */}
          <SectionTitle>{T.thisWeek} · {T.dowS[0]} {mon.getDate()}.–{T.dowS[6]} {sun.getDate()}.</SectionTitle>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            <Card style={{borderLeft:`3px solid ${C.amber}`}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.amber,marginBottom:5}}>{T.weeklyExpenses}</div>
              <div style={{fontSize:18,fontWeight:800,color:weekExp>weekBudget&&weekBudget>0?C.red:C.text}}>{fmtEur(weekExp)}</div>
              {weekBudget>0&&<div style={{fontSize:10,color:C.textMuted,marginTop:3}}>{fmtEur(weekBudget)}</div>}
            </Card>
            <Card style={{borderLeft:`3px solid ${C.blue}`}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.blue,marginBottom:5}}>{T.today}</div>
              <div style={{fontSize:18,fontWeight:800,color:C.text}}>{fmtEur(todayExp)}</div>
              {dailyAvail!==null&&<div style={{fontSize:10,color:C.textMuted,marginTop:3}}>{T.availablePerDay} {fmtEur(dailyAvail)}</div>}
            </Card>
          </div>
          <Card style={{marginBottom:4}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontSize:12,fontWeight:600,color:C.textMid}}>{T.expenses}</span>
              {weekBudgetPerDay>0&&<span style={{fontSize:10,color:C.textMuted}}>{fmtEur(weekBudgetPerDay)}/{T.day}</span>}
            </div>
            <WeeklyChart txs={txs} weekBudgetPerDay={weekBudgetPerDay}/>
          </Card>

          {/* ── Monthly budget w/ categories + subs ── */}
          <SectionTitle>{T.monthlyBudget} · {T.months[vMonth]}</SectionTitle>
          <CollapsibleSection iconName="chart" title={T.monthlyBudget}
            subtitle={`${T.expenses}: ${fmtEur(totalExpense)}`}
            badge={`${totalMonthBudget>0?Math.round(totalExpense/totalMonthBudget*100):0}%`}
            badgeColor={totalExpense>totalMonthBudget?C.red:C.blue}>
            {/* Overall bar */}
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12,fontWeight:600,color:C.text}}>
                <span>合計</span><span>{fmtEur(totalExpense)} / {fmtEur(totalMonthBudget)}</span>
              </div>
              <BudgetBar spent={totalExpense} budget={totalMonthBudget} color={C.blue} h={7}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:11,color:C.textMuted}}>
                <span>{totalMonthBudget>0?Math.round(totalExpense/totalMonthBudget*100):0}% {T.consumed}</span>
                <span style={{color:totalExpense>totalMonthBudget?C.red:C.green,fontWeight:600}}>{totalExpense>totalMonthBudget?T.overdrawn+" ":T.remaining+" "}{fmtEur(Math.abs(totalMonthBudget-totalExpense))}</span>
              </div>
            </div>
            {/* Categories */}
            {cats.map((cat,idx)=><CatStatRow key={cat.id} cat={cat} idx={idx} catStats={catStats}/>)}
            {/* Subscriptions integrated */}
            {subs.length>0&&(
              <div style={{padding:"10px 16px",borderTop:`1px solid ${C.border}`,background:C.surfaceAlt}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <Icon name="repeat" size={15} color={C.blue}/>
                  <span style={{fontSize:12,fontWeight:700,color:C.text}}>{T.subscriptions}</span>
                  <span style={{marginLeft:"auto",fontSize:12,fontWeight:700,color:C.blue}}>{fmtEur(subMonthlyTotal)}</span>
                </div>
                <div style={{fontSize:11,color:C.textMuted}}>{subs.map(s=>s.name).join("・")}</div>
              </div>
            )}
          </CollapsibleSection>

          {/* ── Subscriptions (standalone expandable) ── */}
          <SectionTitle>{T.subscriptions}</SectionTitle>
          <CollapsibleSection iconName="repeat" title={T.subscriptions} subtitle={`${subs.length}件 · ${T.subsTotal}`} badge={fmtEur(subMonthlyTotal)}
            addButton={<button onClick={()=>{setEditSub(null);setShowSubModal(true);}} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"10px",borderRadius:10,border:`1.5px dashed ${C.blueLight}`,background:C.blueDim,color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}><Icon name="plus" size={14} color={C.blue} strokeWidth={2}/>{T.addSub}</button>}>
            {subs.map((s,idx)=><SubRow key={s.id} sub={s} onEdit={()=>{setEditSub(s);setShowSubModal(true);}} onDelete={()=>deleteSub(s.id)}/>)}
          </CollapsibleSection>

          {/* ── Bank accounts ── */}
          <SectionTitle>{T.accounts}</SectionTitle>
          <CollapsibleSection iconName="bank" title={T.accounts} subtitle={`${accounts.length}口座 · ${T.totalAssets}`} badge={fmtEur(totalAssets)}
            addButton={<button onClick={()=>{setEditAccount(null);setShowAccountModal(true);}} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"10px",borderRadius:10,border:`1.5px dashed ${C.blueLight}`,background:C.blueDim,color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}><Icon name="plus" size={14} color={C.blue} strokeWidth={2}/>{T.addAccount}</button>}>
            {accounts.map((acc,idx)=>(
              <div key={acc.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderTop:idx>0?`1px solid ${C.border}`:"none"}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${acc.color}18`,border:`1.5px solid ${acc.color}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name={acc.isSavings?"piggy":"bank"} size={17} color={acc.color} strokeWidth={1.5}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:13,fontWeight:700,color:C.text}}>{acc.name}</span>
                    {acc.isSavings&&<span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:99,background:C.greenBg,color:C.green}}>貯金</span>}
                  </div>
                  <div style={{fontSize:11,color:C.textMuted}}>{acc.bank}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:15,fontWeight:800,color:acc.color}}>{fmtEur(acc.balance)}</div>
                  <div style={{fontSize:10,color:C.textMuted}}>{((acc.balance/totalAssets)*100).toFixed(1)}%</div>
                </div>
                <div style={{display:"flex",gap:4}}>
                  <button onClick={()=>{setEditAccount(acc);setShowAccountModal(true);}} style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:7,width:26,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="edit" size={12} color={C.textMid}/></button>
                  <button onClick={()=>deleteAccount(acc.id)} style={{background:C.redBg,border:`1px solid ${C.red}22`,borderRadius:7,width:26,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="trash" size={12} color={C.red}/></button>
                </div>
              </div>
            ))}
          </CollapsibleSection>

          {/* ── Savings ── */}
          <SectionTitle>{T.savings}</SectionTitle>
          <Card style={{marginBottom:4}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:42,height:42,borderRadius:12,background:C.greenBg,border:`1.5px solid ${C.green}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Icon name="piggy" size={22} color={C.green} strokeWidth={1.5}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:C.textMuted}}>{T.savings}</div>
                <div style={{fontSize:22,fontWeight:800,color:C.green}}>{fmtEur(savingsAccountBalance)}</div>
                {latestSaving&&<div style={{fontSize:10,color:C.textMuted}}>履歴最新: {T.months[latestSaving.month]} {latestSaving.year} +{fmtEur(latestSaving.amount)}</div>}
              </div>
              <button onClick={()=>{setEditSavings(null);setShowSavingsModal(true);}} style={{background:C.greenBg,border:`1.5px solid ${C.green}44`,borderRadius:10,padding:"8px 12px",cursor:"pointer",color:C.green,fontSize:12,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>
                <Icon name="plus" size={13} color={C.green} strokeWidth={2}/>{T.addSavingsEntry}
              </button>
            </div>
            {/* Savings from account + history chart */}
            {savingsAccountBalance>0&&(
              <div style={{background:C.greenBg,borderRadius:10,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}22`}}>
                <div style={{fontSize:11,color:C.green,fontWeight:600}}>貯金口座の残高: {fmtEur(savingsAccountBalance)}</div>
                {accounts.filter(a=>a.isSavings).map(a=><div key={a.id} style={{fontSize:11,color:C.textMid,marginTop:3}}>{a.name}（{a.bank}）: {fmtEur(a.balance)}</div>)}
              </div>
            )}
            <SavingsChart data={savings}/>
            {[...savings].sort((a,b)=>b.year!==a.year?b.year-a.year:b.month-a.month).slice(0,4).map((e)=>(
              <div key={e.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:`1px solid ${C.border}`}}>
                <div style={{fontSize:12,color:C.textMuted,minWidth:40}}>{T.months[e.month]}</div>
                <div style={{flex:1,fontSize:12,color:C.textMid}}>{e.note||"—"}</div>
                <div style={{fontSize:13,fontWeight:700,color:C.green}}>{fmtEur(e.amount)}</div>
                <button onClick={()=>deleteSavingsEntry(e.id)} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex"}}><Icon name="trash" size={13} color={C.red}/></button>
              </div>
            ))}
          </Card>
        </div>
      </>)}

      {/* ════ BUDGET ════ */}
      {tab===1&&(<>
        <div style={{padding:"28px 18px 14px",background:C.surface,borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:22,fontWeight:800,color:C.text}}>{T.nav[1]}</div>
            <MonthNavInline vMonth={vMonth} vYear={vYear} onPrev={prevMonth} onNext={nextMonth} navBtnSt={navBtnSt}/>
          </div>
        </div>
        <div style={{padding:"0 18px"}}>
          {/* ── Budget Split 50/30/20 ── */}
          {totalIncome>0&&(<>
            <SectionTitle>{T.budgetSplit}</SectionTitle>
            {[
              {key:"need", label:T.splitNeeds, pct:50, color:C.need},
              {key:"want", label:T.splitWants, pct:30, color:C.want},
              {key:"future",label:T.splitFuture,pct:20, color:C.future},
            ].map(({key,label,pct,color})=>{
              const budget=splitBudget(key,pct);
              const spent=splitTotal(key);
              const splitCats=catsBySplit[key]||[];
              const splitSubs=subsBySplit[key]||[];
              const hasSplit=splitCats.length>0||splitSubs.length>0;
              return(
                <CollapsibleSection key={key} iconName="split" title={label}
                  subtitle={`${T.splitInfo} · ${pct}%`}
                  badge={fmtEur(budget)} badgeColor={color}>
                  {/* Bar */}
                  <div style={{padding:"12px 16px",borderBottom:hasSplit?`1px solid ${C.border}`:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12,color:C.textMid}}>
                      <span>予算: {fmtEur(budget)}</span>
                      <span style={{fontWeight:600,color:spent>budget?C.red:color}}>使用: {fmtEur(spent)}</span>
                    </div>
                    <div style={{height:7,background:C.surfaceAlt,borderRadius:99,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${Math.min(budget>0?spent/budget*100:0,100)}%`,background:spent>budget?C.red:color,borderRadius:99,transition:"width .4s"}}/>
                    </div>
                    <div style={{fontSize:11,color:spent>budget?C.red:C.green,marginTop:5,fontWeight:600}}>
                      {spent>budget?`超過: ${fmtEur(spent-budget)}`:`残り: ${fmtEur(budget-spent)}`}
                    </div>
                  </div>
                  {/* Category list */}
                  {splitCats.map((cat,idx)=><CatStatRow key={cat.id} cat={cat} idx={idx} catStats={catStats}/>)}
                  {/* Subs in this split */}
                  {splitSubs.map(sub=><SubRow key={sub.id} sub={sub} onEdit={()=>{setEditSub(sub);setShowSubModal(true);}} onDelete={()=>deleteSub(sub.id)}/>)}
                  {!hasSplit&&(
                    <div style={{padding:"14px 16px",fontSize:12,color:C.textMuted}}>
                      カテゴリーやサブスクをこのグループに振り分けるには、カテゴリー設定で予算配分を変更してください。
                    </div>
                  )}
                </CollapsibleSection>
              );
            })}
          </>)}

        </div>
      </>)}

      {/* ════ CALENDAR ════ */}
      {tab===2 && (
        <div>
          <div style={{padding:"28px 18px 14px",background:C.surface,borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:22,fontWeight:800,color:C.text}}>カレンダー</div>
            <MonthNavInline vMonth={vMonth} vYear={vYear} onPrev={prevMonth} onNext={nextMonth} navBtnSt={navBtnSt}/>
          </div>
          <div style={{padding:"14px 18px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.surface,borderRadius:12,padding:"10px 14px",marginBottom:14,border:"1px solid "+C.border}}>
              <span style={{fontSize:12,fontWeight:600,color:C.textMid}}>支出 · {["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"][vMonth]}</span>
              <span style={{fontSize:16,fontWeight:800,color:C.amber}}>{fmtEur(totalExpense)}</span>
            </div>
            <SimpleCalendar txs={monthTxs} cats={cats} year={vYear} month={vMonth} selectedDay={calDay} onSelectDay={setCalDay}/>
          </div>
        </div>
      )}

      {/* ════ SETTINGS ════ */}
      {tab===3&&(<>
        <div style={{padding:"28px 18px 14px",background:C.surface,borderBottom:`1px solid ${C.border}`}}>
          <div style={{fontSize:22,fontWeight:800,color:C.text,marginBottom:14}}>{T.nav[4]}</div>
          {/* Sub-tabs */}
          <div style={{display:"flex",background:C.surfaceAlt,borderRadius:12,padding:4,gap:4}}>
            {[["general","一般"],["categories",T.catSettings]].map(([k,l])=>(
              <button key={k} onClick={()=>setSettingsTab(k)} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:settingsTab===k?C.surface:"transparent",color:settingsTab===k?C.text:C.textMuted,fontSize:13,fontWeight:settingsTab===k?700:500,boxShadow:settingsTab===k?"0 1px 4px rgba(0,0,0,0.08)":"none"}}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{padding:"0 18px"}}>
          {settingsTab==="general"&&(<>
            {/* Currency / rate */}
            <SectionTitle>{T.currency}</SectionTitle>
            <Card>
              <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontSize:13,color:C.textMid}}>{T.currency}</span>
                <span style={{fontSize:13,fontWeight:700}}>EUR + JPY</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0"}}>
                <div>
                  <div style={{fontSize:12,color:C.textMid,marginBottom:3}}>{T.rateInfo2} (JPY→EUR)</div>
                  {settingsRate&&<div style={{fontSize:16,fontWeight:800,color:C.blue}}>1 € = ¥{settingsRate.toFixed(2)}</div>}
                  {!settingsRate&&!rateLoading&&<div style={{fontSize:12,color:C.textMuted}}>—</div>}
                  {rateLoading&&<div style={{fontSize:12,color:C.amber}}>{T.fetchingRate}</div>}
                </div>
                <button onClick={loadRate} disabled={rateLoading} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:10,border:`1.5px solid ${C.blue}44`,background:C.blueDim,color:C.blue,fontSize:12,fontFamily:"inherit",cursor:"pointer",fontWeight:600}}>
                  <Icon name="refresh" size={13} color={C.blue} strokeWidth={2}/>更新
                </button>
              </div>
            </Card>
            <SectionTitle>{T.appInfo}</SectionTitle>
            <Card>
              {[["カレンダー","月〜日"],["バージョン","3.1.0"],["言語","日本語"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                  <span style={{fontSize:13,color:C.textMid}}>{k}</span>
                  <span style={{fontSize:13,fontWeight:600}}>{v}</span>
                </div>
              ))}
            </Card>
          </>)}

          {settingsTab==="categories"&&(<>
            <SectionTitle>{T.catSettings}</SectionTitle>
            {cats.map(cat=>(
              <SettingsCatRow key={cat.id} cat={cat}
                onEdit={()=>{setEditCat(cat);setShowCatModal(true);}}
                onDelete={()=>deleteCat(cat.id)}
                catStats={catStats}
                isCurrentMonth={isCurrentMonth}
              />
            ))}
            <button onClick={()=>{setEditCat(null);setShowCatModal(true);}} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px",borderRadius:14,border:`1.5px dashed ${C.blueLight}`,background:C.blueDim,color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer",marginTop:8,marginBottom:4}}>
              <Icon name="plus" size={14} color={C.blue} strokeWidth={2}/>{T.addCategory2}
            </button>
          </>)}
        </div>
      </>)}

      {/* ── BOTTOM NAV ── */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:C.navBg,borderTop:`1px solid ${C.navBorder}`,boxShadow:"0 -2px 16px rgba(30,60,120,0.07)",display:"flex",alignItems:"flex-end",justifyContent:"center",maxWidth:480,margin:"0 auto"}}>
        {NAV.map(({icon,label,t},i)=>{
          const isPlus=t===-1,active=tab===t;
          return(
            <button key={i} onClick={()=>isPlus?(setAddDate(TODAY_STR),setShowAdd(true)):setTab(t)}
              style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",padding:isPlus?"0 0 14px":"10px 0 11px",gap:4}}>
              {isPlus?(
                <div style={{width:50,height:50,borderRadius:"50%",background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 16px ${C.blue}55`,marginTop:-22}}>
                  <Icon name="plus" size={22} color="#fff" strokeWidth={2.2}/>
                </div>
              ):(
                <>
                  <Icon name={icon} size={20} color={active?C.blue:C.textMuted} strokeWidth={active?2:1.6}/>
                  <span style={{fontSize:9,fontWeight:active?700:500,letterSpacing:0.5,textTransform:"uppercase",color:active?C.blue:C.textMuted,lineHeight:1}}>{label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
