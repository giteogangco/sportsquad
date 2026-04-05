import React, { useState, useEffect, useRef, useCallback } from 'react';

// âââ GLOBAL STYLES âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const STYLES = `
:root{--bg:#0d0f1a;--card:#151829;--card2:#1c1f35;--border:#252842;--purple:#7c3aed;--cyan:#06b6d4;--purple2:#9333ea;--text:#e2e8f0;--muted:#64748b;--muted2:#94a3b8;--red:#dc2626;--green:#16a34a;--radius:14px;--grad:linear-gradient(135deg,#7c3aed,#06b6d4);--grad2:linear-gradient(135deg,#9333ea,#3b82f6)}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);font-family:'Segoe UI',system-ui,sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center}
input,textarea,select{background:var(--card2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:10px 14px;font-size:14px;width:100%;outline:none;font-family:inherit}
input:focus,textarea:focus,select:focus{border-color:var(--purple)}
button{cursor:pointer;border:none;font-family:inherit;font-size:14px;border-radius:10px;padding:10px 18px;transition:opacity .15s,transform .1s}
button:hover{opacity:.88}button:active{transform:scale(.97)}
.btn-grad{background:var(--grad);color:#fff;font-weight:700}
.btn-outline{background:transparent;border:1px solid var(--border);color:var(--muted2)}
.btn-red{background:var(--red);color:#fff;font-weight:600}
#app{width:100%;max-width:620px;min-height:100vh;display:flex;flex-direction:column;position:relative}
.top-nav{position:sticky;top:0;z-index:50;background:rgba(13,15,26,.92);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-bottom:1px solid var(--border)}
.logo{display:flex;align-items:center;gap:8px;text-decoration:none;cursor:pointer}
.logo-text{font-size:22px;font-weight:800;letter-spacing:-.5px}
.logo-text .w{color:#fff}.logo-text .g{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.nav-right{display:flex;align-items:center;gap:10px}
.btn-post{background:var(--grad);color:#fff;font-weight:700;font-size:13px;padding:7px 14px;border-radius:20px;border:none;cursor:pointer}
.avatar-btn{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#fff;border:none;cursor:pointer}
.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:620px;background:rgba(13,15,26,.95);backdrop-filter:blur(12px);border-top:1px solid var(--border);display:flex;z-index:50}
.nav-tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 4px 14px;cursor:pointer;color:var(--muted);font-size:10px;border:none;background:none;transition:color .2s}
.nav-tab svg{width:22px;height:22px}
.nav-tab.active{color:var(--cyan)}
.nav-tab.active svg{filter:drop-shadow(0 0 6px var(--cyan))}
.page-wrap{flex:1;padding:12px 0 80px}
.stories{display:flex;gap:12px;padding:8px 16px 12px;overflow-x:auto;scrollbar-width:none}
.stories::-webkit-scrollbar{display:none}
.story{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;flex-shrink:0}
.story-ring{width:58px;height:58px;border-radius:50%;padding:2px;background:var(--grad)}
.story-inner{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:#fff;border:2px solid var(--bg)}
.story span{font-size:10px;color:var(--muted2);max-width:58px;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.post-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);margin:6px 12px;padding:14px}
.post-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.post-user{display:flex;align-items:center;gap:10px}
.post-avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#fff;flex-shrink:0}
.post-name{font-weight:700;font-size:14px}
.post-time{font-size:11px;color:var(--muted)}
.sport-tag{background:var(--card2);border:1px solid var(--border);border-radius:20px;padding:3px 10px;font-size:11px;color:var(--muted2);white-space:nowrap}
.post-text{font-size:14px;line-height:1.5;margin-bottom:10px}
.post-media{border-radius:10px;overflow:hidden;margin-bottom:10px;max-height:340px;background:#000;display:flex;align-items:center;justify-content:center}
.post-media img{width:100%;object-fit:cover;max-height:340px}
.post-media video{width:100%;max-height:340px}
.live-badge{background:#ef4444;color:#fff;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;display:inline-flex;align-items:center;gap:4px;margin-bottom:8px}
.live-dot{width:6px;height:6px;border-radius:50%;background:#fff;animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.queue-card{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:12px;display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.queue-info{font-size:12px;color:var(--muted2)}
.queue-info strong{color:var(--text);display:block;margin-bottom:2px}
.btn-queue{background:var(--grad);color:#fff;font-weight:700;font-size:12px;padding:7px 14px;border-radius:20px;border:none;cursor:pointer}
.post-actions{display:flex;align-items:center;gap:16px;padding-top:8px;border-top:1px solid var(--border)}
.action-btn{display:flex;align-items:center;gap:5px;color:var(--muted2);font-size:13px;background:none;border:none;padding:4px 0;cursor:pointer;transition:color .2s}
.action-btn:hover{color:var(--cyan)}
.action-btn.liked{color:#ef4444}
.action-btn svg{width:17px;height:17px}
.section-header{padding:16px 16px 8px}
.section-header h2{font-size:20px;font-weight:800}
.section-header p{font-size:13px;color:var(--muted2);margin-top:2px}
.squad-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);margin:6px 12px;padding:16px}
.squad-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px}
.squad-name{font-size:16px;font-weight:700}
.squad-sport{font-size:12px;color:var(--muted2);margin-top:2px}
.squad-desc{font-size:13px;color:var(--muted2);margin-bottom:12px}
.squad-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px}
.squad-meta-item{background:var(--card2);border-radius:8px;padding:10px 12px}
.squad-meta-item label{font-size:10px;color:var(--muted);display:block;margin-bottom:2px;text-transform:uppercase;letter-spacing:.5px}
.squad-meta-item span{font-size:13px;font-weight:600}
.btn-squad-action{width:100%;padding:10px;background:var(--card2);border:1px dashed var(--border);border-radius:10px;color:var(--muted2);font-size:14px;margin-top:6px;cursor:pointer}
.btn-join{background:var(--grad2);color:#fff;font-weight:700;padding:7px 16px;border-radius:20px;font-size:13px;border:none;cursor:pointer}
.search-bar{margin:12px 16px 16px;position:relative}
.search-bar input{padding-left:38px}
.search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--muted);pointer-events:none}
.sport-chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 16px}
.chip{background:var(--card2);border:1px solid var(--border);border-radius:20px;padding:5px 12px;font-size:12px;cursor:pointer;transition:all .2s;color:var(--text)}
.chip:hover,.chip.active{background:var(--purple);border-color:var(--purple);color:#fff}
.discover-section{padding:0 16px}
.discover-section h3{font-size:14px;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px}
.player-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px;display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.player-info{display:flex;align-items:center;gap:10px}
.player-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;flex-shrink:0}
.player-name{font-weight:700;font-size:14px}
.player-meta{font-size:12px;color:var(--muted2)}
.player-sports{display:flex;gap:5px;margin-top:4px;flex-wrap:wrap}
.sport-mini{background:var(--card2);border-radius:20px;padding:2px 8px;font-size:11px;color:var(--muted2)}
.btn-follow{background:var(--grad);color:#fff;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;border:none;cursor:pointer;white-space:nowrap}
.btn-following{background:var(--card2);color:var(--muted2);font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;border:1px solid var(--border);cursor:pointer;white-space:nowrap}
.profile-banner{height:110px;background:linear-gradient(135deg,#1a1040,#0f2744,#0d1f3c)}
.profile-info{padding:0 16px 16px}
.profile-avatar-wrap{margin-top:-30px;margin-bottom:10px;position:relative;display:inline-block}
.profile-avatar{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:24px;color:#fff;border:3px solid var(--bg)}
.profile-avatar-add{position:absolute;bottom:0;right:0;width:22px;height:22px;background:var(--cyan);border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid var(--bg);font-size:14px;cursor:pointer}
.profile-name{font-size:20px;font-weight:800}
.profile-handle{font-size:13px;color:var(--muted2);margin-top:2px}
.profile-bio{font-size:13px;color:var(--muted2);margin:8px 0}
.profile-stats{display:flex;gap:24px;margin:12px 0}
.stat-item{text-align:center}
.stat-item strong{display:block;font-size:18px;font-weight:800}
.stat-item span{font-size:11px;color:var(--muted2)}
.my-sports{margin:12px 0}
.my-sports h4{font-size:13px;color:var(--muted2);margin-bottom:8px;font-weight:600}
.sports-chips{display:flex;flex-wrap:wrap;gap:6px}
.health-section{margin:0 0 16px}
.health-header{padding:12px 16px 8px;display:flex;align-items:center;justify-content:space-between}
.health-header h3{font-size:16px;font-weight:700}
.device-status{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted2)}
.device-dot{width:8px;height:8px;border-radius:50%;background:var(--muted)}
.device-dot.connected{background:#22c55e;box-shadow:0 0 6px #22c55e}
.health-cards{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 16px}
.health-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px}
.health-card-icon{font-size:22px;margin-bottom:6px}
.health-card-value{font-size:26px;font-weight:800;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.health-card-unit{font-size:12px;color:var(--muted2);margin-top:2px}
.health-card-label{font-size:12px;color:var(--muted);margin-top:4px}
.connect-bar{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);margin:8px 16px;padding:14px;display:flex;align-items:center;justify-content:space-between}
.connect-bar-info h4{font-size:14px;font-weight:600}
.connect-bar-info p{font-size:12px;color:var(--muted2);margin-top:2px}
.btn-connect{background:var(--grad);color:#fff;font-weight:700;font-size:12px;padding:7px 14px;border-radius:20px;border:none;cursor:pointer}
.weekly-chart{padding:0 16px;margin-top:14px}
.weekly-chart h4{font-size:14px;font-weight:700;margin-bottom:10px}
.chart-wrap{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px}
.log-activity{margin:14px 16px 0}
.log-activity h4{font-size:14px;font-weight:700;margin-bottom:10px}
.log-form{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px;display:flex;flex-direction:column;gap:10px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.activity-records{margin:14px 16px 0}
.activity-records h4{font-size:14px;font-weight:700;margin-bottom:10px}
.record-item{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.record-date{font-size:12px;color:var(--muted2)}
.record-steps{font-size:16px;font-weight:700;color:var(--cyan)}
.record-cals{font-size:12px;color:var(--muted2)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100;display:flex;align-items:flex-end;justify-content:center}
.modal{width:100%;max-width:620px;background:var(--card);border-radius:var(--radius) var(--radius) 0 0;padding:20px;max-height:90vh;overflow-y:auto}
.modal h3{font-size:16px;font-weight:700;margin-bottom:14px}
.modal-tabs{display:flex;background:var(--card2);border-radius:10px;padding:4px;gap:4px;margin-bottom:14px}
.modal-tab{flex:1;text-align:center;padding:8px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;color:var(--muted2);background:none;border:none;transition:all .2s}
.modal-tab.active{background:var(--purple);color:#fff}
.media-row{display:flex;gap:8px;margin-bottom:10px}
.media-btn{flex:1;background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:12px 6px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;font-size:11px;color:var(--muted2);transition:all .2s}
.media-btn:hover,.media-btn.active{border-color:var(--purple);color:var(--purple)}
.media-btn.live-active{border-color:#ef4444;color:#ef4444}
.media-btn svg{width:22px;height:22px}
.media-preview-wrap{border-radius:10px;overflow:hidden;background:#000;margin-bottom:10px;position:relative}
.media-preview-wrap img,.media-preview-wrap video{width:100%;max-height:250px;object-fit:cover}
.remove-media-btn{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.7);border:none;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px}
.live-preview-wrap{background:#000;border-radius:10px;overflow:hidden;margin-bottom:10px}
.live-preview-wrap video{width:100%;max-height:220px;object-fit:cover}
.live-preview-header{padding:8px 10px;display:flex;align-items:center;gap:8px}
.device-list{display:flex;flex-direction:column;gap:8px;margin-bottom:14px}
.device-item{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:border-color .2s}
.device-item:hover{border-color:var(--purple)}
.device-name{font-weight:600;font-size:14px}
.device-type{font-size:12px;color:var(--muted2);margin-top:2px}
.connecting-spinner{width:20px;height:20px;border:2px solid var(--border);border-top-color:var(--cyan);border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0}
@keyframes spin{to{transform:rotate(360deg)}}
.toast{position:fixed;top:70px;left:50%;transform:translateX(-50%);background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:10px 18px;font-size:13px;z-index:200;opacity:0;transition:opacity .3s;pointer-events:none;white-space:nowrap}
.toast.show{opacity:1}
.divider{height:1px;background:var(--border);margin:12px 0}
.empty-state{text-align:center;padding:32px 20px;color:var(--muted2)}
.empty-state .icon{font-size:36px;margin-bottom:8px}
.empty-state p{font-size:14px}
#login-page{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;background:var(--bg);width:100%;max-width:620px}
.login-logo{text-align:center;margin-bottom:32px}
.login-logo h1{font-size:32px;font-weight:900}
.login-logo p{color:var(--muted2);font-size:14px;margin-top:4px}
.login-box{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;width:100%;max-width:380px}
.login-tabs{display:flex;background:var(--card2);border-radius:10px;padding:4px;gap:4px;margin-bottom:20px}
.login-tab{flex:1;text-align:center;padding:8px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;color:var(--muted2);background:none;border:none;transition:all .2s}
.login-tab.active{background:var(--purple);color:#fff}
.login-form{display:flex;flex-direction:column;gap:12px}
.demo-note{font-size:12px;color:var(--muted);text-align:center;margin-top:4px}
`;

// âââ CONSTANTS ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const SPORTS = [
  'â½ Football','ð Basketball','ð¾ Tennis','ð Swimming','âï¸ Gym',
  'ð Cricket','ð Volleyball','ð Running','ð´ Cycling','ð¥ Boxing',
  'ð Hockey','â³ Golf','ð Surfing','ð¸ Badminton','ð§ Yoga',
  'ð¥ Martial Arts','ð® Esports','ð Rugby','â¾ Baseball','ðï¸ Powerlifting',
  'ð¿ Skiing','ð Ice Hockey','ð³ Bowling','ð£ Rowing','ð¹ Archery',
  'â·ï¸ Snowboarding','ð¹ Skateboarding','ð¤¸ Gymnastics','ð Water Polo','ð± Billiards',
];

const AVATAR_COLORS = [
  'linear-gradient(135deg,#0d9488,#0891b2)',
  'linear-gradient(135deg,#7c3aed,#9333ea)',
  'linear-gradient(135deg,#ea580c,#dc2626)',
  'linear-gradient(135deg,#16a34a,#0d9488)',
  'linear-gradient(135deg,#0284c7,#7c3aed)',
  'linear-gradient(135deg,#d97706,#ea580c)',
];

const INITIAL_POSTS = [
  { id: 1, userId: 'marcoreyes', name: 'Marco Reyes', initials: 'MR', avatarColor: AVATAR_COLORS[0], sport: 'â½ Football', text: 'Just finished a 5v5 at the park. What a game! Final score 4â3. Need more players for next Sunday ð¥', time: '2h ago', likes: 34, comments: 3, liked: false, mediaType: null, mediaUrl: null, isLive: false, isQueue: false },
  { id: 2, userId: 'aishatan', name: 'Aisha Tan', initials: 'AT', avatarColor: AVATAR_COLORS[3], sport: 'ð Swimming', text: 'Opening slots for Morning Swim this Saturday! Only 3 spots left. â±150/head. Tap to join queue ð', time: '4h ago', likes: 18, comments: 2, liked: false, mediaType: null, mediaUrl: null, isLive: false, isQueue: true, queuePrice: 150, queueSlots: 3, queueVenue: 'Olympic Pool BGC' },
  { id: 3, userId: 'devpatel', name: 'Dev Patel', initials: 'DP', avatarColor: AVATAR_COLORS[4], sport: 'âï¸ Gym', text: 'PR day! Hit 120kg on bench for the first time. Training consistency pays off ðª #GymLife', time: '5h ago', likes: 87, comments: 3, liked: false, mediaType: null, mediaUrl: null, isLive: false, isQueue: false },
  { id: 4, userId: 'lenacruz', name: 'Lena Cruz', initials: 'LC', avatarColor: AVATAR_COLORS[5], sport: 'ð¾ Tennis', text: 'Tennis doubles session this weekend. Mixed skill levels okay! â±300 court fee split 4 ways = â±75 each. Join?', time: '1d ago', likes: 12, comments: 2, liked: false, mediaType: null, mediaUrl: null, isLive: false, isQueue: true, queuePrice: 75, queueSlots: 2, queueVenue: 'BGC Tennis Courts' },
];

const SQUADS_DATA = [
  { name: 'Sunday Ballers', sport: 'â½ Football', members: 12, desc: 'Weekly football sessions every Sunday 7am', nextGame: 'Sun Apr 6, 7:00 AM', venue: 'Rizal Park Field A' },
  { name: 'Morning Swim Crew', sport: 'ð Swimming', members: 8, desc: 'Early risers swim club, all levels welcome', nextGame: 'Tue Apr 1, 5:30 AM', venue: 'Olympic Pool BGC' },
  { name: 'Iron Wolves', sport: 'âï¸ Gym', members: 15, desc: 'Strength training + boxing combo sessions', nextGame: 'Mon Mar 31, 6:00 PM', venue: 'Hardcore Gym Makati' },
];

const PLAYERS_DATA = [
  { name: 'Marco Reyes', handle: '@marcoreyes', followers: 248, sports: ['â½ Football', 'ð Basketball'], initials: 'MR', color: AVATAR_COLORS[0] },
  { name: 'Aisha Tan', handle: '@aishatan', followers: 314, sports: ['ð Swimming', 'ð§ Yoga'], initials: 'AT', color: AVATAR_COLORS[3] },
  { name: 'Dev Patel', handle: '@devpatel', followers: 502, sports: ['âï¸ Gym', 'ð¥ Boxing'], initials: 'DP', color: AVATAR_COLORS[4] },
  { name: 'Lena Cruz', handle: '@lenacruz', followers: 189, sports: ['ð¾ Tennis', 'ð Running'], initials: 'LC', color: AVATAR_COLORS[5] },
  { name: 'Carlos Wu', handle: '@carloswu', followers: 97, sports: ['ð Basketball', 'ð® Esports'], initials: 'CW', color: AVATAR_COLORS[1] },
];

const DEVICES_DATA = [
  { name: 'Fitbit Charge 6', type: 'Fitness Tracker', icon: 'â' },
  { name: 'Apple Watch', type: 'Smartwatch', icon: 'ð' },
  { name: 'Garmin Venu', type: 'GPS Smartwatch', icon: 'ð¢' },
  { name: 'Samsung Galaxy Watch', type: 'Smartwatch', icon: 'ðµ' },
  { name: 'Xiaomi Mi Band 8', type: 'Fitness Band', icon: 'ð¿' },
];

// âââ HELPERS ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function getLS(key, def) {
  try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; }
}
function setLS(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function formatDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// âââ LOGO SVG âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function LogoSVG({ size = 28 }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" width={size} height={size}>
      <circle cx="20" cy="20" r="18" stroke="url(#lg)" strokeWidth="2.5"/>
      <path d="M2 20 Q10 12 20 20 Q30 28 38 20" stroke="url(#lg)" strokeWidth="2" fill="none"/>
      <path d="M20 2 Q28 10 20 20 Q12 30 20 38" stroke="url(#lg)" strokeWidth="2" fill="none"/>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#7c3aed"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// âââ ICONS ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const Icon = {
  Feed: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Squads: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Discover: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Profile: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Heart: ({ filled }) => <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Comment: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Share: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  Photo: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Video: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  Live: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M5.636 5.636a9 9 0 1 0 12.728 12.728"/><path d="M16.243 7.757a6 6 0 0 1 0 8.486"/><path d="M7.757 16.243a6 6 0 0 1 0-8.486"/></svg>,
};

// âââ POST CARD ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function PostCard({ post, onLike, onJoinQueue, onShare }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <div className="post-avatar" style={{ background: post.avatarColor }}>{post.initials}</div>
          <div>
            <div className="post-name">{post.name}</div>
            <div className="post-time">@{post.userId} Â· {post.time}</div>
          </div>
        </div>
        <span className="sport-tag">{post.sport}</span>
      </div>

      {post.isLive && <div className="live-badge" style={{ marginBottom: 8 }}><span className="live-dot"/>WAS LIVE</div>}
      <div className="post-text">{post.text}</div>

      {post.isLive && (
        <div style={{ background: '#111', borderRadius: 10, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted2)', fontSize: 13, marginBottom: 10 }}>
          ð¡ Live stream ended
        </div>
      )}
      {post.mediaType === 'image' && (
        <div className="post-media"><img src={post.mediaUrl} alt="post"/></div>
      )}
      {post.mediaType === 'video' && (
        <div className="post-media"><video src={post.mediaUrl} controls/></div>
      )}

      {post.isQueue && (
        <div className="queue-card">
          <div className="queue-info">
            <strong>ðï¸ Queue Event</strong>
            â±{post.queuePrice}/person Â· {post.queueSlots} slots left
          </div>
          <button className="btn-queue" onClick={() => onJoinQueue(post.id)}>Join Queue</button>
        </div>
      )}

      <div className="post-actions">
        <button className={`action-btn${post.liked ? ' liked' : ''}`} onClick={() => onLike(post.id)}>
          <Icon.Heart filled={post.liked}/> {post.likes}
        </button>
        <button className="action-btn"><Icon.Comment/> {post.comments}</button>
        <button className="action-btn" onClick={() => onShare(post.id)}><Icon.Share/> Share</button>
      </div>
    </div>
  );
}

// âââ MAIN APP âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
export default function App() {
  // ââ Auth ââ
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authTab, setAuthTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupHandle, setSignupHandle] = useState('');
  const [signupEmail, setSignupEmail] = useState('');

  // ââ Navigation ââ
  const [page, setPage] = useState('feed');

  // ââ Posts ââ
  const [posts, setPosts] = useState(() => getLS('ss_posts', INITIAL_POSTS));

  // ââ Post modal ââ
  const [showPostModal, setShowPostModal] = useState(false);
  const [postTab, setPostTab] = useState('post');
  const [postText, setPostText] = useState('');
  const [postSport, setPostSport] = useState('');
  const [queueText, setQueueText] = useState('');
  const [queuePrice, setQueuePrice] = useState('');
  const [queueSlots, setQueueSlots] = useState('');
  const [queueVenue, setQueueVenue] = useState('');
  const [queueSport, setQueueSport] = useState('');
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' | 'video'
  const [isLive, setIsLive] = useState(false);
  const [liveStream, setLiveStream] = useState(null);
  const [liveConnecting, setLiveConnecting] = useState(false);

  // ââ Players follow state ââ
  const [following, setFollowing] = useState({});

  // ââ Discover search ââ
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSport, setActiveSport] = useState('');

  // ââ Health ââ
  const [activityRecords, setActivityRecords] = useState(() => getLS('ss_activity', []));
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState('');
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [connectingIdx, setConnectingIdx] = useState(null);
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [logSteps, setLogSteps] = useState('');
  const [logCalories, setLogCalories] = useState('');
  const [logActive, setLogActive] = useState('');
  const [logNote, setLogNote] = useState('');

  // ââ Toast ââ
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef(null);

  // ââ Refs ââ
  const liveVideoRef = useRef(null);
  const chartRef = useRef(null);
  const fileInputRef = useRef(null);

  // ââ Inject CSS ââ
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  // ââ Load user from storage ââ
  useEffect(() => {
    const saved = getLS('ss_user', null);
    if (saved) { setCurrentUser(saved); setIsLoggedIn(true); }
  }, []);

  // ââ Persist posts ââ
  useEffect(() => { setLS('ss_posts', posts); }, [posts]);
  useEffect(() => { setLS('ss_activity', activityRecords); }, [activityRecords]);

  // ââ Draw chart when profile page is active ââ
  useEffect(() => {
    if (page === 'profile' && chartRef.current) {
      drawChart();
    }
  }, [page, activityRecords]);

  // ââ Live video preview ââ
  useEffect(() => {
    if (liveVideoRef.current && liveStream) {
      liveVideoRef.current.srcObject = liveStream;
    }
  }, [liveStream]);

  // ââ Toast helper ââ
  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2500);
  }, []);

  // âââ AUTH âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  function doLogin() {
    if (!loginEmail || !loginPassword) { showToast('Enter email and password'); return; }
    const saved = getLS('ss_user', null);
    const user = saved || {
      name: 'Marco Reyes', handle: '@marcoreyes', initials: 'MR',
      email: loginEmail, bio: 'Weekend warrior. Ballers only ð',
      sports: ['â½ Football', 'ð Basketball'], followers: 248, following: 189, squads: 0
    };
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  function doSignup() {
    if (!signupName || !signupHandle || !signupEmail) { showToast('Fill all fields'); return; }
    const user = {
      name: signupName,
      handle: signupHandle.startsWith('@') ? signupHandle : '@' + signupHandle,
      initials: getInitials(signupName),
      email: signupEmail,
      bio: 'ð New to SportSquad!',
      sports: [], followers: 0, following: 0, squads: 0
    };
    setLS('ss_user', user);
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  function doLogout() {
    stopLive();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setPage('feed');
  }

  // âââ POSTS ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  function toggleLike(id) {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p
    ));
  }

  function joinQueue(id) {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      if (p.queueSlots <= 0) { showToast('No slots left!'); return p; }
      showToast('â Joined the queue!');
      return { ...p, queueSlots: p.queueSlots - 1 };
    }));
  }

  function sharePost() {
    if (navigator.share) navigator.share({ title: 'SportSquad', url: window.location.href });
    else showToast('ð Link copied!');
  }

  // âââ POST MODAL âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  function openPostModal() { setShowPostModal(true); }

  function closePostModal() {
    setShowPostModal(false);
    stopLive();
    setPostText(''); setPostSport(''); setPostTab('post');
    setQueueText(''); setQueuePrice(''); setQueueSlots(''); setQueueVenue(''); setQueueSport('');
    setMediaPreviewUrl(null); setMediaFile(null); setMediaType(null);
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    stopLive();
    const url = URL.createObjectURL(file);
    setMediaFile(file);
    setMediaPreviewUrl(url);
    setMediaType(file.type.startsWith('image/') ? 'image' : 'video');
  }

  function removeMedia() {
    setMediaPreviewUrl(null); setMediaFile(null); setMediaType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function toggleLive() {
    if (isLive) { stopLive(); return; }
    setLiveConnecting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLiveStream(stream);
      setIsLive(true);
      removeMedia();
    } catch {
      showToast('Camera access denied');
    } finally {
      setLiveConnecting(false);
    }
  }

  function stopLive() {
    if (liveStream) { liveStream.getTracks().forEach(t => t.stop()); }
    setLiveStream(null);
    setIsLive(false);
  }

  function submitPost() {
    const text = postTab === 'post' ? postText : queueText;
    const sport = postTab === 'post' ? postSport : queueSport;
    if (!text.trim()) { showToast('Write something first!'); return; }
    if (!sport) { showToast('Select a sport!'); return; }

    const newPost = {
      id: Date.now(),
      userId: (currentUser?.handle || '').replace('@', '') || 'user',
      name: currentUser?.name || 'You',
      initials: currentUser?.initials || 'ME',
      avatarColor: AVATAR_COLORS[0],
      sport, text: text.trim(),
      time: 'Just now', likes: 0, comments: 0, liked: false,
      isLive,
      isQueue: postTab === 'queue',
      queuePrice: postTab === 'queue' ? parseInt(queuePrice) || 0 : 0,
      queueSlots: postTab === 'queue' ? parseInt(queueSlots) || 0 : 0,
      queueVenue: postTab === 'queue' ? queueVenue : '',
      mediaType: null, mediaUrl: null,
    };

    if (mediaFile) {
      const reader = new FileReader();
      reader.onload = e2 => {
        newPost.mediaType = mediaType;
        newPost.mediaUrl = e2.target.result;
        setPosts(prev => [newPost, ...prev]);
        closePostModal();
        setPage('feed');
        showToast('â Posted!');
      };
      reader.readAsDataURL(mediaFile);
    } else {
      setPosts(prev => [newPost, ...prev]);
      closePostModal();
      setPage('feed');
      showToast(bsLive ? 'ð¡ You went live!' : 'â Posted!');
    }
  }

  // âââ HEALTH âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  function connectDevice(idx) {
    setConnectingIdx(idx);
    setTimeout(() => {
      setDeviceConnected(true);
      setConnectedDevice(DEVICES_DATA[idx].name);
      setConnectingIdx(null);
      setShowDeviceModal(false);
      // Simulate sync
      const today = new Date().toISOString().split('T')[0];
      if (!activityRecords.find(r => r.date === today)) {
        const steps = Math.floor(Math.random() * 5000) + 4000;
        const newRec = { date: today, steps, calories: Math.floor(steps * 0.04), active: Math.floor(steps / 100), note: 'Synced from ' + DEVICES_DATA[idx].name };
        setActivityRecords(prev => [newRec, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
      }
      showToast('â ' + DEVICES_DATA[idx].name + ' connected!');
    }, 1800);
  }

  function logActivity() {
    if (!logDate) { showToast('Pick a date'); return; }
    const steps = parseInt(logSteps);
    if (!steps) { showToast('Enter step count'); return; }
    const newRec = { date: logDate, steps, calories: parseInt(logCalories) || 0, active: parseInt(logActive) || 0, note: logNote };
    setActivityRecords(prev => {
      const filtered = prev.filter(r => r.date !== logDate);
      return [newRec, ...filtered].sort((a, b) => b.date.localeCompare(a.date));
    });
    setLogSteps(''); setLogCalories(''); setLogActive(''); setLogNote('');
    showToast('â Activity saved!');
  }

  function getToday() {
    return activityRecords.find(r => r.date === new Date().toISOString().split('T')[0]);
  }

  function getWeeklyAvg() {
    const week = activityRecords.slice(0, 7);
    if (!week.length) return 0;
    return Math.round(week.reduce((s, r) => s + r.steps, 0) / week.length);
  }

  function drawChart() {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.parentElement.clientWidth - 28;
    canvas.width = W; canvas.height = 120;

    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const rec = activityRecords.find(r => r.date === key);
      days.push({ label: d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1), steps: rec ? rec.steps : 0 });
    }

    const max = Math.max(...days.map(d => d.steps), 10000);
    const barW = (W - 40) / 7 - 6;
    const chartH = 80; const offsetX = 20; const offsetY = 8;
    ctx.clearRect(0, 0, W, 120);

    days.forEach((d, i) => {
      const x = offsetX + i * ((W - 40) / 7);
      const barH = (d.steps / max) * chartH;
      const y = offsetY + chartH - barH;

      if (d.steps > 0) {
        const g = ctx.createLinearGradient(x, y, x, offsetY + chartH);
        g.addColorStop(0, '#7c3aed'); g.addColorStop(1, '#06b6d4');
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = 'rgba(255,255,255,.07)';
      }
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, barW, Math.max(barH, 2), 4);
      else ctx.rect(x, y, barW, Math.max(barH, 2));
      ctx.fill();

      if (i === 0) {
        const goalY = offsetY + chartH - (10000 / max) * chartH;
        ctx.strokeStyle = 'rgba(234,88,12,.4)';
        ctx.setLineDash([3, 4]); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(offsetX, goalY); ctx.lineTo(W - 20, goalY); ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(d.label, x + barW / 2, 108);
      if (d.steps > 0) {
        ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
        ctx.fillText(d.steps >= 1000 ? (d.steps / 1000).toFixed(1) + 'k' : d.steps, x + barW / 2, y - 3);
      }
    });
  }

  // âââ LOGIN PAGE ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  if (!isLoggedIn) {
    return (
      <div id="login-page">
        <div className="login-logo">
          <LogoSVG size={48}/>
          <h1><span className="w">Sport</span><span className="g">Squad</span></h1>
          <p>Connect Â· Play Â· Squad Up</p>
        </div>
        <div className="login-box">
          <div className="login-tabs">
            <button className={`login-tab${authTab === 'login' ? ' active' : ''}`} onClick={() => setAuthTab('login')}>Log In</button>
            <button className={`login-tab${authTab === 'signup' ? ' active' : ''}`} onClick={() => setAuthTab('signup')}>Sign Up</button>
          </div>
          {authTab === 'login' ? (
            <div className="login-form">
              <input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}/>
              <input type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}/>
              <button className="btn-grad" style={{ width: '100%', padding: 12 }} onClick={doLogin}>Log In</button>
              <p className="demo-note">Demo: any email/password works</p>
            </div>
          ) : (
            <div className="login-form">
              <input type="text" placeholder="Full Name" value={signupName} onChange={e => setSignupName(e.target.value)}/>
              <input type="text" placeholder="Username (e.g. @johndoe)" value={signupHandle} onChange={e => setSignupHandle(e.target.value)}/>
              <input type="email" placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)}/>
              <button className="btn-grad" style={{ width: '100%', padding: 12 }} onClick={doSignup}>Create Account</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const todayRec = getToday();
  const storyUsers = [
    { name: 'Marco', initials: 'MR', color: AVATAR_COLORS[0] },
    { name: 'Aisha', initials: 'AT', color: AVATAR_COLORS[3] },
    { name: 'Dev', initials: 'DP', color: AVATAR_COLORS[4] },
    { name: 'Lena', initials: 'LC', color: AVATAR_COLORS[5] },
    { name: 'Carlos', initials: 'CW', color: AVATAR_COLORS[1] },
  ];
  const filteredPlayers = PLAYERS_DATA.filter(p =>
    (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.handle.includes(searchQuery.toLowerCase())) &&
    (!activeSport || p.sports.some(s => s.includes(activeSport.replace(/^\S+\s/, ''))))
  );

  return (
    <>
      <div id="app">
        {/* TOP NAV */}
        <nav className="top-nav">
          <div className="logo" onClick={() => setPage('feed')}>
            <LogoSVG/>
            <span className="logo-text"><span className="w">Sport</span><span className="g">Squad</span></span>
          </div>
          <div className="nav-right">
            <button className="btn-post" onClick={openPostModal}>+ Post</button>
            <button className="avatar-btn" style={{ background: 'linear-gradient(135deg,#0d9488,#0891b2)' }} onClick={() => setPage('profile')}>
              {currentUser?.initials || 'ME'}
            </button>
          </div>
        </nav>

        {/* ââ FEED PAGE ââ */}
        {page === 'feed' && (
          <div className="page-wrap">
            <div className="stories">
              <div className="story" onClick={() => showToast('Your story')}>
                <div className="story-ring">
                  <div className="story-inner" style={{ background: 'linear-gradient(135deg,#0d9488,#0891b2)' }}>{currentUser?.initials}</div>
                </div>
                <span>You</span>
              </div>
              {storyUsers.map(u => (
                <div key={u.name} className="story" onClick={() => showToast(`${u.name}'s story`)}>
                  <div className="story-ring"><div className="story-inner" style={{ background: u.color }}>{u.initials}</div></div>
                  <span>{u.name}</span>
                </div>
              ))}
            </div>
            {posts.length === 0
              ? <div className="empty-state"><div className="icon">ð­</div><p>No posts yet. Be the first!</p></div>
              : posts.map(p => <PostCard key={p.id} post={p} onLike={toggleLike} onJoinQueue={joinQueue} onShare={sharePost}/>)
            }
          </div>
        )}

        {/* ââ SQUADS PAGE ââ */}
        {page === 'squads' && (
          <div className="page-wrap">
            <div className="section-header">
              <h2>Your Squads</h2>
              <p>Groups, clubs &amp; your tribe</p>
            </div>
            {SQUADS_DATA.map(s => (
              <div key={s.name} className="squad-card">
                <div className="squad-header">
                  <div>
                    <div className="squad-name">{s.sport} {s.name}</div>
                    <div className="squad-sport">{s.members} members</div>
                  </div>
                  <button className="btn-join">Join</button>
                </div>
                <div className="squad-desc">{s.desc}</div>
                <div className="squad-meta">
                  <div className="squad-meta-item"><label>Next Game</label><span>{s.nextGame}</span></div>
                  <div className="squad-meta-item"><label>ð Venue</label><span>{s.venue}</span></div>
                </div>
                <button className="btn-squad-action" onClick={() => showToast('Queue & split costs coming soon!')}>ðï¸ Queue &amp; Split Costs</button>
              </div>
            ))}
            <div style={{ padding: '0 12px 12px' }}>
              <button className="btn-squad-action" onClick={() => showToast('Create squad coming soon!')}>+ Create New Squad</button>
            </div>
          </div>
        )}

        {/* ââ DISCOVER PAGE ââ */}
        {page === 'discover' && (
          <div className="page-wrap">
            <div className="search-bar">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="Search players, sports..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
            </div>
            <div style={{ padding: '0 16px 8px', fontSize: 13, fontWeight: 600, color: 'var(--muted2)' }}>Browse by Sport</div>
            <div className="sport-chips">
              {SPORTS.map(s => (
                <div key={s} className={`chip${activeSport === s ? ' active' : ''}`} onClick={() => setActiveSport(activeSport === s ? '' : s)}>{s}</div>
              ))}
            </div>
            <div className="discover-section">
              <h3>Players You May Know</h3>
              {filteredPlayers.map(p => (
                <div key={p.handle} className="player-card">
                  <div className="player-info">
                    <div className="player-avatar" style={{ background: p.color }}>{p.initials}</div>
                    <div>
                      <div className="player-name">{p.name}</div>
                      <div className="player-meta">{p.handle} Â· {p.followers} followers</div>
                      <div className="player-sports">{p.sports.map(s => <span key={s} className="sport-mini">{s}</span>)}</div>
                    </div>
                  </div>
                  <button
                    className={following[p.handle] ? 'btn-following' : 'btn-follow'}
                    onClick={() => setFollowing(prev => ({ ...prev, [p.handle]: !prev[p.handle] }))}>
                    {following[p.handle] ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
              {filteredPlayers.length === 0 && <div className="empty-state"><div className="icon">ð</div><p>No players found</p></div>}
            </div>
          </div>
        )}

        {/* ââ PROFILE PAGE ââ */}
        {page === 'profile' && (
          <div className="page-wrap" style={{ paddingTop: 0 }}>
            <div className="profile-banner"/>
            <div className="profile-info">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar" style={{ background: 'linear-gradient(135deg,#0d9488,#0891b2)' }}>{currentUser?.initials}</div>
                <div className="profile-avatar-add">+</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div className="profile-name">{currentUser?.name}</div>
                  <div className="profile-handle">{currentUser?.handle}</div>
                  <div className="profile-bio">{currentUser?.bio}</div>
                </div>
                <button className="btn-outline" style={{ fontSize: 12, padding: '6px 14px' }} onClick={() => showToast('Edit coming soon!')}>Edit</button>
              </div>
              <div className="profile-stats">
                <div className="stat-item"><strong>{currentUser?.followers}</strong><span>Followers</span></div>
                <div className="stat-item"><strong>{currentUser?.following}</strong><span>Following</span></div>
                <div className="stat-item"><strong>{currentUser?.squads}</strong><span>Squads</span></div>
              </div>
              <div className="my-sports">
                <h4>My Sports</h4>
                <div className="sports-chips">
                  {(currentUser?.sports || []).length > 0
                    ? (currentUser.sports).map(s => <span key={s} className="chip active" style={{ padding: '4px 12px', fontSize: 12 }}>{s}</span>)
                    : <span style={{ color: 'var(--muted2)', fontSize: 13 }}>No sports added yet</span>
                  }
                </div>
              </div>
            </div>

            {/* ââ HEALTH SECTION ââ */}
            <div className="divider" style={{ margin: '0 16px' }}/>
            <div className="health-section">
              <div className="health-header">
                <h3>â¡ Steps &amp; Activity</h3>
                <div className="device-status">
                  <div className={`device-dot${deviceConnected ? ' connected' : ''}`}/>
                  <span>{deviceConnected ? connectedDevice : 'No device'}</span>
                </div>
              </div>

              {!deviceConnected && (
                <div className="connect-bar">
                  <div className="connect-bar-info">
                    <h4>Connect Health Device</h4>
                    <p>Sync data from your wearable</p>
                  </div>
                  <button className="btn-connect" onClick={() => setShowDeviceModal(true)}>Connect</button>
                </div>
              )}

              <div className="health-cards">
                <div className="health-card">
                  <div className="health-card-icon">ð</div>
                  <div className="health-card-value">{todayRec ? todayRec.steps.toLocaleString() : '0'}</div>
                  <div className="health-card-unit">steps today</div>
                  <div className="health-card-label">Goal: 10,000</div>
                </div>
                <div className="health-card">
                  <div className="health-card-icon">ð¥</div>
                  <div className="health-card-value">{todayRec ? todayRec.calories.toLocaleString() : '0'}</div>
                  <div className="health-card-unit">kcal burned</div>
                  <div className="health-card-label">Active burn</div>
                </div>
                <div className="health-card">
                  <div className="health-card-icon">â±ï¸</div>
                  <div className="health-card-value">{todayRec ? todayRec.active : '0'}</div>
                  <div className="health-card-unit">active mins</div>
                  <div className="health-card-label">Today</div>
                </div>
                <div className="health-card">
                  <div className="health-card-icon">ð</div>
                  <div className="health-card-value">{getWeeklyAvg().toLocaleString()}</div>
                  <div className="health-card-unit">avg steps</div>
                  <div className="health-card-label">This week</div>
                </div>
              </div>

              <div className="weekly-chart">
                <h4>Weekly Steps</h4>
                <div className="chart-wrap">
                  <canvas ref={chartRef} height="120" style={{ width: '100%' }}/>
                </div>
              </div>

              <div className="log-activity">
                <h4>Log Activity</h4>
                <div className="log-form">
                  <div className="form-row">
                    <input type="date" value={logDate} onChange={e => setLogDate(e.target.value)}/>
                    <input type="number" placeholder="Steps" value={logSteps} onChange={e => setLogSteps(e.target.value)}/>
                  </div>
                  <div className="form-row">
                    <input type="number" placeholder="Calories" value={logCalories} onChange={e => setLogCalories(e.target.value)}/>
                    <input type="number" placeholder="Active mins" value={logActive} onChange={e => setLogActive(e.target.value)}/>
                  </div>
                  <input type="text" placeholder="Note (e.g. Morning run)" value={logNote} onChange={e => setLogNote(e.target.value)}/>
                  <button className="btn-grad" onClick={logActivity}>Save Activity</button>
                </div>
              </div>

              <div className="activity-records">
                <h4>Activity Records</h4>
                {activityRecords.length === 0
                  ? <div className="empty-state" style={{ padding: 20 }}><div className="icon">ð</div><p>No activity logged yet</p></div>
                  : activityRecords.slice(0, 10).map((r, i) => (
                    <div key={i} className="record-item">
                      <div>
                        <div className="record-steps">{r.steps.toLocaleString()} steps</div>
                        <div className="record-date">{formatDate(r.date)}{r.note ? ' Â· ' + r.note : ''}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="record-cals">ð¥ {r.calories} kcal</div>
                        <div className="record-cals">â± {r.active} mins</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div style={{ padding: '0 16px' }}>
              <div className="divider"/>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>My Posts</h4>
              {posts.filter(p => p.userId === (currentUser?.handle || '').replace('@', '')).length === 0
                ? <div className="empty-state"><div className="icon">ð</div><p>No posts yet. Share your first!</p></div>
                : posts.filter(p => p.userId === (currentUser?.handle || '').replace('@', '')).map(p =>
                    <PostCard key={p.id} post={p} onLike={toggleLike} onJoinQueue={joinQueue} onShare={sharePost}/>
                  )
              }
              <div className="divider"/>
              <button className="btn-red" style={{ width: '100%', padding: 12, marginBottom: 12 }} onClick={doLogout}>Log Out</button>
            </div>
          </div>
        )}

        {/* BOTTOM NAV */}
        <nav className="bottom-nav">
          {[
            { id: 'feed', label: 'Feed', Icon: Icon.Feed },
            { id: 'squads', label: 'Squads', Icon: Icon.Squads },
            { id: 'discover', label: 'Discover', Icon: Icon.Discover },
            { id: 'profile', label: 'Profile', Icon: Icon.Profile },
          ].map(({ id, label, Icon: I }) => (
            <button key={id} className={`nav-tab${page === id ? ' active' : ''}`} onClick={() => setPage(id)}>
              <I/>{label}
            </button>
          ))}
        </nav>
      </div>

      {/* ââ CREATE POST MODAL ââ */}
      {showPostModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) closePostModal(); }}>
          <div className="modal">
            <h3>Create Post</h3>
            <div className="modal-tabs">
              <button className={`modal-tab${postTab === 'post' ? ' active' : ''}`} onClick={() => setPostTab('post')}>ð£ Post</button>
              <button className={`modal-tab${postTab === 'queue' ? ' active' : ''}`} onClick={() => setPostTab('queue')}>ðï¸ Queue Event</button>
            </div>

            {postTab === 'post' && (
              <>
                <div className="media-row">
                  <label className="media-btn" onClick={() => { if (fileInputRef.current) { fileInputRef.current.accept = 'image/*'; fileInputRef.current.click(); } }}>
                    <Icon.Photo/> Photo
                  </label>
                  <label className="media-btn" onClick={() => { if (fileInputRef.current) { fileInputRef.current.accept = 'video/*'; fileInputRef.current.click(); } }}>
                    <Icon.Video/> Video
                  </label>
                  <div className={`media-btn${isLive ? ' live-active' : ''}`} onClick={toggleLive}>
                    <Icon.Live/> {liveConnecting ? '...' : isLive ? 'â¹ Stop' : 'Go Live'}
                  </div>
                </div>
                <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileSelect}/>

                {mediaPreviewUrl && (
                  <div className="media-preview-wrap">
                    {mediaType === 'image' ? <img src={mediaPreviewUrl} alt="preview"/> : <video src={mediaPreviewUrl} controls/>}
                    <button className="remove-media-btn" onClick={removeMedia}>â</button>
                  </div>
                )}

                {isLive && (
                  <div className="live-preview-wrap">
                    <div className="live-preview-header">
                      <span className="live-badge"><span className="live-dot"/>LIVE</span>
                      <span style={{ fontSize: 12, color: 'var(--muted2)' }}>Camera preview</span>
                    </div>
                    <video ref={liveVideoRef} autoPlay muted playsInline style={{ width: '100%', maxHeight: 220, objectFit: 'cover' }}/>
                  </div>
                )}

                <textarea rows="3" placeholder="What's happening in your sport world?" style={{ marginBottom: 10, resize: 'none' }} value={postText} onChange={e => setPostText(e.target.value)}/>
                <select style={{ marginBottom: 0 }} value={postSport} onChange={e => setPostSport(e.target.value)}>
                  <option value="">Select sport...</option>
                  {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </>
            )}

            {postTab === 'queue' && (
              <>
                <textarea rows="2" placeholder="Describe your event..." style={{ marginBottom: 10, resize: 'none' }} value={queueText} onChange={e => setQueueText(e.target.value)}/>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                  <input type="number" placeholder="Price per person (â±)" value={queuePrice} onChange={e => setQueuePrice(e.target.value)}/>
                  <input type="number" placeholder="Slots available" value={queueSlots} onChange={e => setQueueSlots(e.target.value)}/>
                </div>
                <input type="text" placeholder="Venue" style={{ marginBottom: 10 }} value={queueVenue} onChange={e => setQueueVenue(e.target.value)}/>
                <select value={queueSport} onChange={e => setQueueSport(e.target.value)}>
                  <option value="">Select sport...</option>
                  {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={closePostModal}>Cancel</button>
              <button className="btn-grad" style={{ flex: 2 }} onClick={submitPost}>Share</button>
            </div>
          </div>
        </div>
      )}

      {/* ââ CONNECT DEVICE MODAL ââ */}
      {showDeviceModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowDeviceModal(false); }}>
          <div className="modal">
            <h3>Connect Health Device</h3>
            <p style={{ fontSize: 13, color: 'var(--muted2)', marginBottom: 14 }}>Select your wearable to sync activity data</p>
            <div className="device-list">
              {DEVICES_DATA.map((d, i) => (
                <div key={d.name} className="device-item" onClick={() => connectingIdx === null && connectDevice(i)}>
                  <div>
                    <div className="device-name">{connectingIdx === i ? `Connecting to ${d.name}...` : d.name}</div>
                    <div className="device-type">{connectingIdx === i ? 'Please wait' : d.type}</div>
                  </div>
                  {connectingIdx === i
                    ? <div className="connecting-spinner"/>
                    : <span style={{ fontSize: 26 }}>{d.icon}</span>
                  }
                </div>
              ))}
            </div>
            <button className="btn-outline" style={{ width: '100%' }} onClick={() => setShowDeviceModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* ââ TOAST ââ */}
      <div className={`toast${toastVisible ? ' show' : ''}`}>{toastMsg}</div>
    </>
  );
}
