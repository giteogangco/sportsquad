import React, { useState } from "react";

const SPORTS = [
  "⚽ Football","🏀 Basketball","🎾 Tennis","🏊 Swimming","🏋️ Gym","🏏 Cricket",
  "🏐 Volleyball","🏃 Running","🚴 Cycling","🥊 Boxing","🏑 Hockey","⛳ Golf",
  "🏄 Surfing","🎱 Billiards","🏸 Badminton","🤸 Gymnastics","🏇 Horse Riding",
  "🎿 Skiing","🏂 Snowboarding","🛹 Skateboarding","🏊 Water Polo","🚣 Rowing",
  "🏹 Archery","🤼 Wrestling","🤺 Fencing","🏋️ Weightlifting","🤾 Handball",
  "🏌️ Disc Golf","🧗 Rock Climbing","🏓 Table Tennis","🥋 Martial Arts",
  "🤿 Scuba Diving","🏒 Ice Hockey","⛸️ Ice Skating","🎯 Darts","🎳 Bowling",
  "🏊 Triathlon","🚵 Mountain Biking","🏄 Wakeboarding","🛶 Kayaking",
  "🧘 Yoga","🤸 Cheerleading","🎽 Athletics","🏆 Esports","🎮 Gaming Sports",
  "🐎 Polo","🎣 Fishing","🏹 Shooting Sports","🚴 BMX","🤼 Sumo",
  "🥌 Curling","🏒 Lacrosse","🏈 American Football","🏉 Rugby","⚾ Baseball",
  "🥎 Softball","🏐 Beach Volleyball","🚤 Sailing","🪂 Skydiving","🏋️ Powerlifting",
  "🎾 Padel","🏓 Pickleball","🎾 Squash","🎾 Racquetball","🏸 Speed Badminton",
  "🎾 Real Tennis","🏓 Beach Tennis","🎾 Platform Tennis","🏸 Shuttlecock",
  "🎾 Pop Tennis","🎾 Basque Pelota",
];

const SAMPLE_USERS = [
  { id: 1, name: "Marco Reyes", handle: "@marcoreyes", avatar: "MR", sports: ["⚽ Football","🏀 Basketball"], bio: "Weekend warrior. Ballers only 🏀", followers: 248, following: 189, cover: "#1a472a" },
  { id: 2, name: "Aisha Tan", handle: "@aishatan", avatar: "AT", sports: ["🏊 Swimming","🏃 Running"], bio: "Swim at dawn, run at dusk 🌊", followers: 512, following: 301, cover: "#0c3547" },
  { id: 3, name: "Dev Patel", handle: "@devpatel", avatar: "DP", sports: ["🏋️ Gym","🥊 Boxing"], bio: "Iron doesn't lie 💪", followers: 189, following: 220, cover: "#3d1a1a" },
  { id: 4, name: "Lena Cruz", handle: "@lenacruz", avatar: "LC", sports: ["🎾 Tennis","🏸 Badminton"], bio: "Racket sports enthusiast 🎾", followers: 342, following: 155, cover: "#1a3a47" },
  { id: 5, name: "Carlos Wu", handle: "@carloswu", avatar: "CW", sports: ["⚽ Football","🏑 Hockey"], bio: "Team player always 🏑", followers: 421, following: 390, cover: "#2a1a47" },
];

const SAMPLE_SQUADS = [
  { id: 1, name: "Sunday Ballers", sport: "⚽ Football", members: 12, admin: "Marco Reyes", desc: "Weekly football sessions every Sunday 7am", nextGame: "Sun Apr 6, 7:00 AM", venue: "Rizal Park Field A" },
  { id: 2, name: "Morning Swim Crew", sport: "🏊 Swimming", members: 8, admin: "Aisha Tan", desc: "Early risers swim club, all levels welcome", nextGame: "Tue Apr 1, 5:30 AM", venue: "Olympic Pool BGC" },
  { id: 3, name: "Iron Wolves", sport: "🏋️ Gym", members: 15, admin: "Dev Patel", desc: "Strength training + boxing combo sessions", nextGame: "Mon Mar 31, 6:00 PM", venue: "Hardcore Gym Makati" },
];

const INITIAL_FEED = [
  { id: 1, userId: 1, type: "post", content: "Just finished a 5v5 at the park. What a game! Final score 4-3. Need more players for next Sunday 🔥", sport: "⚽ Football", likes: 34, comments: 12, time: "2h ago" },
  { id: 2, userId: 2, type: "queue", content: "Opening slots for Morning Swim this Saturday! Only 3 spots left. ₱150/head. Tap to join queue 👇", sport: "🏊 Swimming", likes: 18, comments: 5, time: "4h ago", slots: 3, cost: 150 },
  { id: 3, userId: 3, type: "post", content: "PR day! Hit 120kg on bench for the first time. Training consistency pays off 💪 #GymLife", sport: "🏋️ Gym", likes: 87, comments: 23, time: "6h ago" },
  { id: 4, userId: 4, type: "queue", content: "Tennis doubles session this weekend. Mixed skill levels okay! ₱300 court fee split 4 ways = ₱75 each. Join?", sport: "🎾 Tennis", likes: 12, comments: 8, time: "1d ago", slots: 2, cost: 75 },
  { id: 5, userId: 5, type: "post", content: "Looking for a goalkeeper for our Sunday squad! Must be available 7AM. Comment below 👇", sport: "⚽ Football", likes: 29, comments: 45, time: "1d ago" },
];

const colors = ["#e63946","#2a9d8f","#e9c46a","#f4a261","#457b9d","#8338ec","#06d6a0"];
const Avatar = ({ user, size = 40 }) => {
  const color = colors[user.id % colors.length];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:`linear-gradient(135deg, ${color}, ${color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:size*0.32, color:"#fff", flexShrink:0, border:"2px solid rgba(255,255,255,0.12)" }}>
      {user.avatar}
    </div>
  );
};


const INITIAL_COMMENTS = {
  1: [
    { id:1, userId:2, text:"Great game! Wish I was there 🔥", time:"1h ago" },
    { id:2, userId:3, text:"What was the final formation?", time:"1h ago" },
    { id:3, userId:4, text:"Count me in for next Sunday!", time:"30m ago" },
  ],
  2: [
    { id:1, userId:1, text:"I'll take a slot! 🏊", time:"3h ago" },
    { id:2, userId:5, text:"Is there parking nearby?", time:"2h ago" },
  ],
  3: [
    { id:1, userId:2, text:"Beast mode activated 💪", time:"5h ago" },
    { id:2, userId:4, text:"120kg! Absolute unit!", time:"4h ago" },
    { id:3, userId:5, text:"What program are you running?", time:"2h ago" },
  ],
  4: [
    { id:1, userId:1, text:"I'm in, mixed levels is perfect for me!", time:"22h ago" },
    { id:2, userId:3, text:"Same court as last time?", time:"20h ago" },
  ],
  5: [
    { id:1, userId:2, text:"I can play GK! What time exactly?", time:"20h ago" },
    { id:2, userId:3, text:"Need subs too? I'm available", time:"18h ago" },
    { id:3, userId:4, text:"Tagging @lenacruz she might know someone", time:"10h ago" },
  ],
};

const CommentsModal = ({ post, onClose, myProfile, allComments, onAddComment }) => {
  const postUser = SAMPLE_USERS.find(u => u.id === post.userId) || myProfile || SAMPLE_USERS[0];
  const comments = allComments[post.id] || [];
  const [text, setText] = React.useState("");
  const submit = () => {
    if (!text.trim()) return;
    onAddComment(post.id, { id: Date.now(), userId: 99, text: text.trim(), time: "Just now" });
    setText("");
  };
  const getUser = id => id === 99 ? myProfile : SAMPLE_USERS.find(u => u.id === id) || SAMPLE_USERS[0];
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:1000, display:"flex", alignItems:"flex-end" }} onClick={onClose}>
      <div style={{ background:"#1a1f2e", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:480, margin:"0 auto", maxHeight:"82vh", display:"flex", flexDirection:"column", border:"1px solid rgba(255,255,255,0.08)" }} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding:"16px 18px 12px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <div>
            <h3 style={{ color:"#fff", fontFamily:"'Syne',sans-serif", fontSize:16, margin:0 }}>💬 Comments</h3>
            <div style={{ color:"#555", fontSize:11, marginTop:2 }}>{postUser.name} · {post.sport}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.08)", border:"none", color:"#aaa", borderRadius:8, padding:"4px 10px", cursor:"pointer", fontSize:13 }}>✕</button>
        </div>
        {/* Original post preview */}
        <div style={{ padding:"10px 18px", borderBottom:"1px solid rgba(255,255,255,0.04)", background:"rgba(255,255,255,0.02)", flexShrink:0 }}>
          <div style={{ color:"#888", fontSize:12, lineHeight:1.4 }}>{post.content}</div>
        </div>
        {/* Comments list */}
        <div style={{ overflowY:"auto", flex:1, padding:"10px 18px" }}>
          {comments.length === 0 && (
            <div style={{ textAlign:"center", color:"#444", fontSize:13, padding:"24px 0" }}>No comments yet. Be the first! 👇</div>
          )}
          {comments.map((c, i) => {
            const u = getUser(c.userId);
            if (!u) return null;
            const col = colors[u.id % colors.length];
            return (
              <div key={c.id} style={{ display:"flex", gap:9, marginBottom:14 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${col},${col}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:10, color:"#fff", flexShrink:0, border:"2px solid rgba(255,255,255,0.1)" }}>
                  {u.avatar}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:7, marginBottom:3 }}>
                    <span style={{ color:"#fff", fontWeight:700, fontSize:12 }}>{u.name}</span>
                    <span style={{ color:"#444", fontSize:10 }}>{c.time}</span>
                  </div>
                  <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"4px 14px 14px 14px", padding:"8px 11px", color:"#ccc", fontSize:13, lineHeight:1.4 }}>
                    {c.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Input area */}
        <div style={{ padding:"10px 14px 16px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", gap:9, alignItems:"center", flexShrink:0 }}>
          {myProfile && (
            <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${colors[myProfile.id % colors.length]},${colors[myProfile.id % colors.length]}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:10, color:"#fff", flexShrink:0, border:"2px solid rgba(255,255,255,0.1)" }}>
              {myProfile.avatar}
            </div>
          )}
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="Write a comment..."
            style={{ flex:1, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:22, padding:"9px 14px", color:"#fff", fontSize:13, outline:"none" }}
          />
          <button onClick={submit} style={{ background:text.trim()?"linear-gradient(135deg,#7c3aed,#00d2ff)":"rgba(255,255,255,0.07)", border:"none", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:text.trim()?"pointer":"default", flexShrink:0, transition:"background 0.2s" }}>
            <span style={{ fontSize:15 }}>↑</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ShareModal = ({ post, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const shareUrl = `https://sportsquad.vercel.app/post/${post.id}`;
  const shareText = `${post.sport} · ${post.content.slice(0, 80)}${post.content.length > 80 ? "..." : ""}`;
  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    } else {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
  };
  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: "SportSquad", text: shareText, url: shareUrl }).catch(() => {});
    } else {
      copyLink();
    }
  };
  const shareOptions = [
    { icon:"🔗", label:"Copy Link", action: copyLink, highlight: copied },
    { icon:"📤", label: navigator && navigator.share ? "Share via..." : "Copy Text", action: nativeShare },
    { icon:"💬", label:"WhatsApp", action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank") },
    { icon:"🐦", label:"Twitter / X", action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank") },
  ];
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:1000, display:"flex", alignItems:"flex-end" }} onClick={onClose}>
      <div style={{ background:"#1a1f2e", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:480, margin:"0 auto", padding:"18px 18px 28px", border:"1px solid rgba(255,255,255,0.08)" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <h3 style={{ color:"#fff", fontFamily:"'Syne',sans-serif", fontSize:16, margin:0 }}>↗ Share Post</h3>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.08)", border:"none", color:"#aaa", borderRadius:8, padding:"4px 10px", cursor:"pointer", fontSize:13 }}>✕</button>
        </div>
        {/* Post preview */}
        <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"11px 13px", marginBottom:18, border:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ color:"#888", fontSize:11, marginBottom:4 }}>{post.sport}</div>
          <div style={{ color:"#ccc", fontSize:13, lineHeight:1.4 }}>{post.content.slice(0, 100)}{post.content.length > 100 ? "..." : ""}</div>
          <div style={{ color:"#444", fontSize:11, marginTop:6, fontFamily:"monospace" }}>{shareUrl}</div>
        </div>
        {/* Share options */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {shareOptions.map(opt => (
            <button key={opt.label} onClick={opt.action} style={{ background: opt.highlight ? "rgba(0,210,255,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${opt.highlight ? "#00d2ff" : "rgba(255,255,255,0.09)"}`, borderRadius:14, padding:"13px 10px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:6, transition:"all 0.2s" }}>
              <span style={{ fontSize:22 }}>{opt.icon}</span>
              <span style={{ color: opt.highlight ? "#00d2ff" : "#ccc", fontSize:12, fontWeight:600 }}>{opt.highlight && opt.label === "Copy Link" ? "✓ Copied!" : opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const QueueModal = ({ post, onClose }) => {
  const user = SAMPLE_USERS.find(u => u.id === post.userId) || SAMPLE_USERS[0];
  const [players, setPlayers] = useState([{ name:"You", paid:false },{ name:"Marco R.", paid:true },{ name:"Aisha T.", paid:false }]);
  const [newPlayer, setNewPlayer] = useState("");
  const [totalCost, setTotalCost] = useState(post.cost ? post.cost * (post.slots || 4) : 600);
  const [joined, setJoined] = useState(false);
  const perPerson = players.length > 0 ? (totalCost / players.length).toFixed(2) : 0;
  const paidCount = players.filter(p => p.paid).length;
  const collected = (paidCount * perPerson).toFixed(2);
  const addPlayer = () => { if (newPlayer.trim()) { setPlayers([...players, { name:newPlayer.trim(), paid:false }]); setNewPlayer(""); }};
  const togglePaid = i => { const u = [...players]; u[i].paid = !u[i].paid; setPlayers(u); };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }} onClick={onClose}>
      <div style={{ background:"#1a1f2e", borderRadius:20, width:"100%", maxWidth:460, maxHeight:"88vh", overflowY:"auto", padding:22, border:"1px solid rgba(255,255,255,0.08)" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <h3 style={{ color:"#fff", fontFamily:"'Syne',sans-serif", fontSize:18, margin:0 }}>🎫 Queue & Cost Split</h3>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.1)", border:"none", color:"#fff", borderRadius:8, padding:"4px 10px", cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:12, padding:12, marginBottom:16 }}>
          <div style={{ color:"#aaa", fontSize:12, marginBottom:3 }}>{post.sport} · {user.name}</div>
          <div style={{ color:"#ddd", fontSize:13 }}>{post.content}</div>
        </div>
        <label style={{ color:"#aaa", fontSize:12, display:"block", marginBottom:5 }}>Total Cost (₱)</label>
        <input type="number" value={totalCost} onChange={e=>setTotalCost(+e.target.value)}
          style={{ width:"100%", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"10px 12px", color:"#fff", fontSize:16, marginBottom:14, boxSizing:"border-box", outline:"none" }} />
        <div style={{ background:"linear-gradient(135deg,rgba(124,58,237,0.18),rgba(0,210,255,0.12))", border:"1px solid rgba(124,58,237,0.3)", borderRadius:14, padding:14, marginBottom:16, textAlign:"center" }}>
          <div style={{ color:"#aaa", fontSize:11, marginBottom:2 }}>Each person pays</div>
          <div style={{ color:"#00d2ff", fontSize:30, fontWeight:800, fontFamily:"'Syne',sans-serif" }}>₱{perPerson}</div>
          <div style={{ color:"#aaa", fontSize:11, marginTop:3 }}>{paidCount}/{players.length} paid · ₱{collected} of ₱{totalCost} collected</div>
          <div style={{ marginTop:8, background:"rgba(0,0,0,0.3)", borderRadius:6, overflow:"hidden", height:6 }}>
            <div style={{ width:`${players.length?(paidCount/players.length)*100:0}%`, height:"100%", background:"linear-gradient(90deg,#00d2ff,#7c3aed)", transition:"width 0.4s" }} />
          </div>
        </div>
        <div style={{ color:"#aaa", fontSize:12, marginBottom:8 }}>Players ({players.length})</div>
        {players.map((p,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", background:"rgba(255,255,255,0.04)", borderRadius:10, marginBottom:5, border:`1px solid ${p.paid?"rgba(0,210,255,0.25)":"rgba(255,255,255,0.05)"}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:p.paid?"#00d2ff":"#444" }} />
              <span style={{ color:p.paid?"#fff":"#aaa", fontSize:13 }}>{p.name}</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ color:p.paid?"#00d2ff":"#555", fontSize:11 }}>₱{perPerson}</span>
              <button onClick={()=>togglePaid(i)} style={{ background:p.paid?"rgba(0,210,255,0.12)":"rgba(255,255,255,0.07)", border:`1px solid ${p.paid?"#00d2ff":"rgba(255,255,255,0.12)"}`, borderRadius:7, padding:"3px 9px", color:p.paid?"#00d2ff":"#aaa", fontSize:10, cursor:"pointer" }}>
                {p.paid?"✓ Paid":"Mark Paid"}
              </button>
            </div>
          </div>
        ))}
        <div style={{ display:"flex", gap:8, margin:"12px 0" }}>
          <input value={newPlayer} onChange={e=>setNewPlayer(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addPlayer()} placeholder="Add player..."
            style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"9px 12px", color:"#fff", fontSize:13, outline:"none" }} />
          <button onClick={addPlayer} style={{ background:"#7c3aed", border:"none", borderRadius:10, padding:"9px 14px", color:"#fff", fontWeight:700, cursor:"pointer" }}>+ Add</button>
        </div>
        <button onClick={()=>setJoined(true)} style={{ width:"100%", background:joined?"#00d2ff":"linear-gradient(135deg,#7c3aed,#00d2ff)", border:"none", borderRadius:13, padding:"13px", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Syne',sans-serif" }}>
          {joined?"✓ You're In the Queue!":"Join Queue"}
        </button>
      </div>
    </div>
  );
};

export default function SportSquad() {
  const [tab, setTab] = useState("feed");
  const [loggedIn, setLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [myProfile, setMyProfile] = useState(null);
  const [queuePost, setQueuePost] = useState(null);
  const [followed, setFollowed] = useState([]);
  const [joinedSquads, setJoinedSquads] = useState([]);
  const [feedLikes, setFeedLikes] = useState({});
  const [showCreate, setShowCreate] = useState(false);
  const [newPost, setNewPost] = useState({ content:"", sport:"", type:"post", cost:"", slots:"" });
  const [feedPosts, setFeedPosts] = useState(INITIAL_FEED);
  const [searchQ, setSearchQ] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [profileEdit, setProfileEdit] = useState({});
  const [signupData, setSignupData] = useState({ name:"", email:"", password:"", sports:[] });
  const [loginEmail, setLoginEmail] = useState("");
  
  const [loginPass, setLoginPass] = useState("");
  const [commentPost, setCommentPost] = useState(null);
  const [sharePost, setSharePost] = useState(null);
  const [allComments, setAllComments] = useState(INITIAL_COMMENTS);
  const addComment = (postId, comment) => {
    setAllComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), comment] }));
    setFeedPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: p.comments + 1 } : p));
  };

  const handleSignup = () => {
    if (!signupData.name || !signupData.email) return;
    setMyProfile({ id:99, name:signupData.name, handle:"@"+signupData.name.toLowerCase().replace(/\s/g,""), avatar:signupData.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase(), sports:signupData.sports, bio:"Sports lover 🏆", followers:0, following:0, cover:"#1a3a47" });
    setLoggedIn(true);
  };
  const handleLogin = () => { setMyProfile({ ...SAMPLE_USERS[0], id:99 }); setLoggedIn(true); };
  const toggleSport = s => setSignupData(p=>({ ...p, sports:p.sports.includes(s)?p.sports.filter(x=>x!==s):[...p.sports,s] }));
  const toggleFollow = id => setFollowed(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const toggleLike = id => setFeedLikes(p=>({ ...p,[id]:!p[id] }));
  const toggleSquad = id => setJoinedSquads(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const handlePost = () => {
    if (!newPost.content||!newPost.sport) return;
    setFeedPosts([{ id:Date.now(), userId:99, type:newPost.type, content:newPost.content, sport:newPost.sport, likes:0, comments:0, time:"Just now", ...(newPost.type==="queue"?{slots:+newPost.slots||4,cost:+newPost.cost||0}:{}) }, ...feedPosts]);
    setNewPost({ content:"", sport:"", type:"post", cost:"", slots:"" });
    setShowCreate(false);
  };

  const filteredUsers = SAMPLE_USERS.filter(u => u.name.toLowerCase().includes(searchQ.toLowerCase()) || u.sports.some(s=>s.toLowerCase().includes(searchQ.toLowerCase())));

  const inp = (extra={}) => ({ outline:"none", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"11px 14px", color:"#fff", fontSize:14, width:"100%", boxSizing:"border-box", ...extra });
  const btn = (bg, extra={}) => ({ background:bg, border:"none", borderRadius:12, padding:"12px", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", width:"100%", fontFamily:"'Syne',sans-serif", ...extra });

  if (!loggedIn) return (
    <div style={{ minHeight:"100vh", background:"#0d1117", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap'); *{box-sizing:border-box} input::placeholder,textarea::placeholder{color:#555}`}</style>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ marginBottom:10 }}>
          <circle cx="26" cy="26" r="24" stroke="url(#alg)" strokeWidth="2.2"/>
          <line x1="26" y1="2" x2="26" y2="50" stroke="url(#alg)" strokeWidth="1.5"/>
          <line x1="2" y1="26" x2="50" y2="26" stroke="url(#alg)" strokeWidth="1.5"/>
          <ellipse cx="26" cy="26" rx="11" ry="24" stroke="url(#alg)" strokeWidth="1.5"/>
          <defs><linearGradient id="alg" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#00d2ff"/></linearGradient></defs>
        </svg>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:34, fontWeight:800, color:"#fff", margin:0, letterSpacing:-1 }}>Sport<span style={{ background:"linear-gradient(90deg,#7c3aed,#00d2ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Squad</span></h1>
        <p style={{ color:"#555", fontSize:13, margin:"6px 0 0" }}>Connect · Play · Squad Up</p>
      </div>
      <div style={{ width:"100%", maxWidth:400, background:"#161b27", borderRadius:20, padding:24, border:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", gap:6, marginBottom:22, background:"rgba(255,255,255,0.04)", borderRadius:12, padding:4 }}>
          {["login","signup"].map(m=>(
            <button key={m} onClick={()=>setAuthMode(m)} style={{ flex:1, background:authMode===m?"#7c3aed":"transparent", border:"none", borderRadius:9, padding:"9px", color:authMode===m?"#fff":"#555", fontWeight:700, cursor:"pointer", fontSize:13, transition:"all 0.2s", textTransform:"capitalize" }}>{m==="login"?"Log In":"Sign Up"}</button>
          ))}
        </div>
        {authMode==="login"?(
          <>
            <input value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="Email" style={{...inp(), marginBottom:10}} />
            <input type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} placeholder="Password" style={{...inp(), marginBottom:18}} />
            <button onClick={handleLogin} style={btn("linear-gradient(135deg,#7c3aed,#00d2ff)")}>Log In</button>
            <p style={{ color:"#444", fontSize:11, textAlign:"center", marginTop:10 }}>Demo: any email/password works</p>
          </>
        ):(
          <>
            <input value={signupData.name} onChange={e=>setSignupData(p=>({...p,name:e.target.value}))} placeholder="Full Name" style={{...inp(),marginBottom:10}} />
            <input value={signupData.email} onChange={e=>setSignupData(p=>({...p,email:e.target.value}))} placeholder="Email" style={{...inp(),marginBottom:10}} />
            <input type="password" value={signupData.password} onChange={e=>setSignupData(p=>({...p,password:e.target.value}))} placeholder="Password" style={{...inp(),marginBottom:14}} />
            <div style={{ marginBottom:16 }}>
              <div style={{ color:"#888", fontSize:12, marginBottom:8 }}>Pick your sports:</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, maxHeight:130, overflowY:"auto", paddingRight:2 }}>
                {SPORTS.map(s=>(
                  <button key={s} onClick={()=>toggleSport(s)} style={{ background:signupData.sports.includes(s)?"#7c3aed":"rgba(255,255,255,0.05)", border:`1px solid ${signupData.sports.includes(s)?"#7c3aed":"rgba(255,255,255,0.1)"}`, borderRadius:20, padding:"4px 10px", color:"#fff", fontSize:11, cursor:"pointer", flexShrink:0 }}>{s}</button>
                ))}
              </div>
            </div>
            <button onClick={handleSignup} style={btn("linear-gradient(135deg,#7c3aed,#00d2ff)")}>Create Account</button>
          </>
        )}
      </div>
    </div>
  );

  const tabs = [{ id:"feed",icon:"🏠",label:"Feed" },{ id:"squads",icon:"👥",label:"Squads" },{ id:"discover",icon:"🔍",label:"Discover" },{ id:"profile",icon:"👤",label:"Profile" }];

  return (
    <div style={{ minHeight:"100vh", background:"#0d1117", fontFamily:"'DM Sans',sans-serif", maxWidth:480, margin:"0 auto", position:"relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap'); *{box-sizing:border-box} input,textarea{outline:none} input::placeholder,textarea::placeholder{color:#555} ::-webkit-scrollbar{width:0}`}</style>
      {queuePost && <QueueModal post={queuePost} onClose={()=>setQueuePost(null)} />}
      {commentPost && <CommentsModal post={commentPost} onClose={()=>setCommentPost(null)} myProfile={myProfile} allComments={allComments} onAddComment={addComment} />}
      {sharePost && <ShareModal post={sharePost} onClose={()=>setSharePost(null)} />}

      {/* Header */}
      <div style={{ position:"sticky", top:0, zIndex:100, background:"rgba(13,17,23,0.94)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"11px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="url(#lg)" strokeWidth="1.8"/>
            <line x1="11" y1="1" x2="11" y2="21" stroke="url(#lg)" strokeWidth="1.2"/>
            <line x1="1" y1="11" x2="21" y2="11" stroke="url(#lg)" strokeWidth="1.2"/>
            <ellipse cx="11" cy="11" rx="4.5" ry="10" stroke="url(#lg)" strokeWidth="1.2"/>
            <defs><linearGradient id="lg" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#00d2ff"/></linearGradient></defs>
          </svg>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, color:"#fff", fontSize:17, letterSpacing:-0.5 }}>Sport<span style={{ background:"linear-gradient(90deg,#7c3aed,#00d2ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Squad</span></span>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <button onClick={()=>setShowCreate(true)} style={{ background:"linear-gradient(135deg,#7c3aed,#00d2ff)", border:"none", borderRadius:9, padding:"6px 13px", color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Post</button>
          {myProfile && <Avatar user={myProfile} size={34} />}
        </div>
      </div>

      {/* Create Post Sheet */}
      {showCreate && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:200, display:"flex", alignItems:"flex-end" }} onClick={()=>setShowCreate(false)}>
          <div style={{ background:"#1a1f2e", borderRadius:"18px 18px 0 0", width:"100%", maxWidth:480, margin:"0 auto", padding:22, border:"1px solid rgba(255,255,255,0.07)" }} onClick={e=>e.stopPropagation()}>
            <h3 style={{ color:"#fff", fontFamily:"'Syne',sans-serif", margin:"0 0 14px", fontSize:17 }}>Create Post</h3>
            <div style={{ display:"flex", gap:7, marginBottom:12, background:"rgba(255,255,255,0.04)", borderRadius:10, padding:3 }}>
              {["post","queue"].map(t=>(
                <button key={t} onClick={()=>setNewPost(p=>({...p,type:t}))} style={{ flex:1, background:newPost.type===t?"#7c3aed":"transparent", border:"none", borderRadius:8, padding:"8px", color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer" }}>
                  {t==="post"?"📢 Post":"🎫 Queue Event"}
                </button>
              ))}
            </div>
            <textarea value={newPost.content} onChange={e=>setNewPost(p=>({...p,content:e.target.value}))} placeholder="What's happening in your sport world?" rows={3}
              style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"11px", color:"#fff", fontSize:14, resize:"none", marginBottom:10 }} />
            <select value={newPost.sport} onChange={e=>setNewPost(p=>({...p,sport:e.target.value}))}
              style={{ width:"100%", background:"#1a1f2e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"11px 14px", color:newPost.sport?"#fff":"#555", fontSize:14, marginBottom:10, appearance:"none" }}>
              <option value="" disabled>Select sport...</option>
              {SPORTS.map(s=><option key={s} value={s} style={{ background:"#1a1f2e" }}>{s}</option>)}
            </select>
            {newPost.type==="queue" && (
              <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                <input type="number" value={newPost.cost} onChange={e=>setNewPost(p=>({...p,cost:e.target.value}))} placeholder="₱ cost/person"
                  style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#fff", fontSize:13 }} />
                <input type="number" value={newPost.slots} onChange={e=>setNewPost(p=>({...p,slots:e.target.value}))} placeholder="Slots"
                  style={{ width:85, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#fff", fontSize:13 }} />
              </div>
            )}
            <button onClick={handlePost} style={btn("linear-gradient(135deg,#7c3aed,#00d2ff)")}>Share</button>
          </div>
        </div>
      )}

      <div style={{ paddingBottom:80 }}>
        {/* ── FEED ── */}
        {tab==="feed" && (
          <div>
            <div style={{ display:"flex", gap:12, overflowX:"auto", padding:"14px 14px 6px", scrollbarWidth:"none" }}>
              {[myProfile, ...SAMPLE_USERS].filter(Boolean).map((u,i)=>(
                <div key={u.id+"-"+i} style={{ flexShrink:0, textAlign:"center" }}>
                  <div style={{ width:54, height:54, borderRadius:"50%", padding:2, background:"linear-gradient(135deg,#7c3aed,#00d2ff)", marginBottom:3 }}>
                    <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#1a1f2e", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Avatar user={u} size={50} />
                    </div>
                  </div>
                  <div style={{ color:"#666", fontSize:9, width:54, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{u.name.split(" ")[0]}</div>
                </div>
              ))}
            </div>
            {feedPosts.map(post=>{
              const user = post.userId===99 ? myProfile : SAMPLE_USERS.find(u=>u.id===post.userId);
              if (!user) return null;
              return (
                <div key={post.id} style={{ background:"#161b27", borderBottom:"1px solid rgba(255,255,255,0.04)", marginBottom:2 }}>
                  <div style={{ padding:"13px 14px 8px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div style={{ display:"flex", gap:9 }}>
                      <Avatar user={user} size={40} />
                      <div>
                        <div style={{ color:"#fff", fontWeight:700, fontSize:14 }}>{user.name}</div>
                        <div style={{ color:"#555", fontSize:11 }}>{user.handle} · {post.time}</div>
                      </div>
                    </div>
                    <span style={{ background:"rgba(255,255,255,0.05)", borderRadius:20, padding:"3px 9px", fontSize:10, color:"#888" }}>{post.sport}</span>
                  </div>
                  <div style={{ padding:"0 14px 10px", color:"#ccc", fontSize:14, lineHeight:1.5 }}>{post.content}</div>
                  {post.type==="queue" && (
                    <div style={{ margin:"0 14px 10px", background:"linear-gradient(135deg,rgba(124,58,237,0.14),rgba(0,210,255,0.08))", border:"1px solid rgba(124,58,237,0.28)", borderRadius:13, padding:"11px 13px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ color:"#a78bfa", fontWeight:700, fontSize:12 }}>🎫 Queue Event</div>
                        <div style={{ color:"#777", fontSize:11, marginTop:2 }}>₱{post.cost}/person · {post.slots} slots left</div>
                      </div>
                      <button onClick={()=>setQueuePost(post)} style={{ background:"linear-gradient(135deg,#7c3aed,#00d2ff)", border:"none", borderRadius:9, padding:"7px 13px", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer" }}>Join Queue</button>
                    </div>
                  )}
                  <div style={{ padding:"3px 14px 12px", display:"flex", gap:18 }}>
                    <button onClick={()=>toggleLike(post.id)} style={{ background:"none", border:"none", color:feedLikes[post.id]?"#e63946":"#555", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                      {feedLikes[post.id]?"❤️":"🤍"} {post.likes+(feedLikes[post.id]?1:0)}
                    </button>
                    <button onClick={()=>setCommentPost(post)} style={{ background:"none", border:"none", color:commentPost && commentPost.id===post.id?"#7c3aed":"#555", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>💬 {(allComments[post.id]||[]).length > 0 ? (allComments[post.id]||[]).length : post.comments}</button>
                    <button onClick={()=>setSharePost(post)} style={{ background:"none", border:"none", color:"#555", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>↗ Share</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── SQUADS ── */}
        {tab==="squads" && (
          <div style={{ padding:14 }}>
            <h2 style={{ fontFamily:"'Syne',sans-serif", color:"#fff", fontSize:19, margin:"0 0 3px" }}>Your Squads</h2>
            <p style={{ color:"#555", fontSize:12, margin:"0 0 18px" }}>Groups, clubs & your tribe</p>
            {SAMPLE_SQUADS.map(sq=>(
              <div key={sq.id} style={{ background:"#161b27", borderRadius:16, padding:15, marginBottom:10, border:"1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:7 }}>
                  <div>
                    <div style={{ color:"#fff", fontWeight:700, fontSize:15, fontFamily:"'Syne',sans-serif" }}>{sq.name}</div>
                    <div style={{ color:"#555", fontSize:11 }}>{sq.sport} · {sq.members} members</div>
                  </div>
                  <button onClick={()=>toggleSquad(sq.id)} style={{ background:joinedSquads.includes(sq.id)?"rgba(0,210,255,0.12)":"rgba(124,58,237,0.12)", border:`1px solid ${joinedSquads.includes(sq.id)?"#00d2ff":"#7c3aed"}`, borderRadius:9, padding:"6px 11px", color:joinedSquads.includes(sq.id)?"#00d2ff":"#a78bfa", fontSize:11, fontWeight:700, cursor:"pointer" }}>
                    {joinedSquads.includes(sq.id)?"✓ Joined":"Join"}
                  </button>
                </div>
                <p style={{ color:"#888", fontSize:12, margin:"0 0 9px", lineHeight:1.4 }}>{sq.desc}</p>
                <div style={{ display:"flex", gap:7 }}>
                  <div style={{ background:"rgba(0,210,255,0.07)", border:"1px solid rgba(0,210,255,0.18)", borderRadius:10, padding:"7px 11px", flex:1 }}>
                    <div style={{ color:"#00d2ff", fontSize:10, marginBottom:1 }}>📅 Next Game</div>
                    <div style={{ color:"#fff", fontSize:11, fontWeight:600 }}>{sq.nextGame}</div>
                  </div>
                  <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"7px 11px", flex:1 }}>
                    <div style={{ color:"#666", fontSize:10, marginBottom:1 }}>📍 Venue</div>
                    <div style={{ color:"#ccc", fontSize:11 }}>{sq.venue}</div>
                  </div>
                </div>
                <button onClick={()=>setQueuePost({ id:sq.id, userId:1, type:"queue", content:`${sq.name} — ${sq.nextGame} at ${sq.venue}`, sport:sq.sport, cost:150, slots:sq.members })}
                  style={{ marginTop:9, width:"100%", background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.25)", borderRadius:9, padding:"9px", color:"#a78bfa", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                  🎫 Queue & Split Costs
                </button>
              </div>
            ))}
            <button style={{ width:"100%", background:"rgba(255,255,255,0.03)", border:"2px dashed rgba(255,255,255,0.1)", borderRadius:14, padding:"14px", color:"#555", fontSize:13, cursor:"pointer" }}>
              + Create New Squad
            </button>
          </div>
        )}

        {/* ── DISCOVER ── */}
        {tab==="discover" && (
          <div style={{ padding:14 }}>
            <div style={{ position:"relative", marginBottom:14 }}>
              <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:15 }}>🔍</span>
              <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search players, sports..."
                style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:13, padding:"11px 14px 11px 38px", color:"#fff", fontSize:14 }} />
            </div>
            {!searchQ && (
              <div style={{ marginBottom:18 }}>
                <div style={{ color:"#666", fontSize:12, marginBottom:9 }}>Browse by Sport</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {SPORTS.map(s=>(
                    <button key={s} onClick={()=>setSearchQ(s.split(" ")[1])} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"5px 11px", color:"#888", fontSize:11, cursor:"pointer" }}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            <div style={{ color:"#666", fontSize:12, marginBottom:10 }}>{searchQ?`Results for "${searchQ}"`:"Players You May Know"}</div>
            {filteredUsers.map(u=>(
              <div key={u.id} style={{ background:"#161b27", borderRadius:14, padding:13, marginBottom:9, border:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", gap:11 }}>
                <Avatar user={u} size={48} />
                <div style={{ flex:1 }}>
                  <div style={{ color:"#fff", fontWeight:700, fontSize:14 }}>{u.name}</div>
                  <div style={{ color:"#555", fontSize:11, marginBottom:4 }}>{u.handle} · {u.followers} followers</div>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    {u.sports.map(s=><span key={s} style={{ background:"rgba(124,58,237,0.13)", borderRadius:20, padding:"2px 7px", fontSize:9, color:"#a78bfa" }}>{s}</span>)}
                  </div>
                </div>
                <button onClick={()=>toggleFollow(u.id)} style={{ background:followed.includes(u.id)?"rgba(0,210,255,0.1)":"linear-gradient(135deg,#7c3aed,#00d2ff)", border:followed.includes(u.id)?"1px solid #00d2ff":"none", borderRadius:10, padding:"7px 12px", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer", flexShrink:0 }}>
                  {followed.includes(u.id)?"✓ Following":"Follow"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── PROFILE ── */}
        {tab==="profile" && myProfile && (
          <div>
            <div style={{ height:110, background:`linear-gradient(135deg,${myProfile.cover},#7c3aed44)`, position:"relative" }}>
              <div style={{ position:"absolute", bottom:-22, left:14, border:"3px solid #0d1117", borderRadius:"50%" }}>
                <Avatar user={myProfile} size={60} />
              </div>
            </div>
            <div style={{ padding:"30px 14px 14px" }}>
              {!editProfile ? (
                <>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                    <div>
                      <div style={{ color:"#fff", fontWeight:800, fontSize:19, fontFamily:"'Syne',sans-serif" }}>{myProfile.name}</div>
                      <div style={{ color:"#555", fontSize:12 }}>{myProfile.handle}</div>
                    </div>
                    <button onClick={()=>{ setEditProfile(true); setProfileEdit({ name:myProfile.name, bio:myProfile.bio, sports:[...myProfile.sports] }); }} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"7px 12px", color:"#aaa", fontSize:12, cursor:"pointer" }}>Edit</button>
                  </div>
                  <p style={{ color:"#888", fontSize:13, margin:"0 0 14px", lineHeight:1.5 }}>{myProfile.bio}</p>
                  <div style={{ display:"flex", gap:18, marginBottom:16 }}>
                    {[["Followers", myProfile.followers+followed.length],["Following", myProfile.following],["Squads", joinedSquads.length]].map(([l,v])=>(
                      <div key={l} style={{ textAlign:"center" }}>
                        <div style={{ color:"#fff", fontWeight:700, fontSize:17, fontFamily:"'Syne',sans-serif" }}>{v}</div>
                        <div style={{ color:"#555", fontSize:10 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom:18 }}>
                    <div style={{ color:"#666", fontSize:12, marginBottom:7 }}>My Sports</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                      {(myProfile.sports.length?myProfile.sports:["⚽ Football"]).map(s=>(
                        <span key={s} style={{ background:"rgba(124,58,237,0.14)", border:"1px solid rgba(124,58,237,0.28)", borderRadius:20, padding:"4px 11px", fontSize:11, color:"#a78bfa" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:14, marginBottom:14 }}>
                    <div style={{ color:"#666", fontSize:12, marginBottom:10 }}>My Posts</div>
                    {feedPosts.filter(p=>p.userId===99).length===0
                      ? <div style={{ color:"#444", fontSize:13, textAlign:"center", padding:"16px 0" }}>No posts yet. Share your first! 🏆</div>
                      : feedPosts.filter(p=>p.userId===99).map(post=>(
                        <div key={post.id} style={{ background:"rgba(255,255,255,0.04)", borderRadius:11, padding:"11px 12px", marginBottom:7 }}>
                          <div style={{ color:"#555", fontSize:10, marginBottom:3 }}>{post.sport} · {post.time}</div>
                          <div style={{ color:"#ccc", fontSize:13 }}>{post.content}</div>
                        </div>
                      ))
                    }
                  </div>
                  <button onClick={()=>{ setLoggedIn(false); setMyProfile(null); }} style={{ width:"100%", background:"rgba(230,57,70,0.09)", border:"1px solid rgba(230,57,70,0.25)", borderRadius:13, padding:"12px", color:"#e63946", fontSize:14, fontWeight:700, cursor:"pointer" }}>Log Out</button>
                </>
              ) : (
                <div>
                  <h3 style={{ color:"#fff", fontFamily:"'Syne',sans-serif", margin:"0 0 16px", fontSize:17 }}>Edit Profile</h3>
                  <input value={profileEdit.name} onChange={e=>setProfileEdit(p=>({...p,name:e.target.value}))} placeholder="Name" style={{...inp(),marginBottom:9}} />
                  <textarea value={profileEdit.bio} onChange={e=>setProfileEdit(p=>({...p,bio:e.target.value}))} placeholder="Bio" rows={3}
                    style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"11px 14px", color:"#fff", fontSize:14, resize:"none", marginBottom:13, outline:"none" }} />
                  <div style={{ marginBottom:14 }}>
                    <div style={{ color:"#888", fontSize:12, marginBottom:8 }}>Sports</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {SPORTS.map(s=>{ const sel=profileEdit.sports?.includes(s); return (
                        <button key={s} onClick={()=>setProfileEdit(p=>({...p,sports:sel?p.sports.filter(x=>x!==s):[...(p.sports||[]),s]}))} style={{ background:sel?"#7c3aed":"rgba(255,255,255,0.05)", border:`1px solid ${sel?"#7c3aed":"rgba(255,255,255,0.09)"}`, borderRadius:20, padding:"4px 9px", color:"#fff", fontSize:10, cursor:"pointer" }}>{s}</button>
                      );})}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:7 }}>
                    <button onClick={()=>setEditProfile(false)} style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"none", borderRadius:11, padding:"11px", color:"#888", fontSize:13, cursor:"pointer" }}>Cancel</button>
                    <button onClick={()=>{ setMyProfile(p=>({...p,...profileEdit})); setEditProfile(false); }} style={{ flex:2, background:"linear-gradient(135deg,#7c3aed,#00d2ff)", border:"none", borderRadius:11, padding:"11px", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>Save</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"rgba(13,17,23,0.97)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", padding:"7px 0 11px" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"3px 0" }}>
            <span style={{ fontSize:20, filter:tab===t.id?"none":"grayscale(1) opacity(0.35)" }}>{t.icon}</span>
            <span style={{ fontSize:9, color:tab===t.id?"#7c3aed":"#444", fontWeight:tab===t.id?700:400 }}>{t.label}</span>
            {tab===t.id && <div style={{ width:3, height:3, borderRadius:"50%", background:"#7c3aed" }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
