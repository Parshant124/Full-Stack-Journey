/* ---------- Data ---------- */
const ICONS = ['💧','🏃','🧘','🍎','📚','✍️','😴','🎯','💪','🧠','🎨','🎵','🧹','🚭','🥗','☀️','🌙','🔥','⭐','❤️','🚴','🧴','🌱','💊'];
const COLORS = [
  {n:'Teal', v:'#219E8E'}, {n:'Coral', v:'#E85A3B'}, {n:'Gold', v:'#D99A2B'},
  {n:'Indigo', v:'#5B6BC0'}, {n:'Sage', v:'#6E9A52'}, {n:'Pink', v:'#C85F97'},
  {n:'Sky', v:'#4FA8D8'}, {n:'Plum', v:'#8A63B8'}
];

let habits = [];
let theme = 'light';
let selectedIcon = ICONS[0];
let selectedColor = COLORS[0].v;
let calMode = 'month';
let calAnchor = new Date();
let selectedDay = null;
let activeView = 'home';

/* ---------- Storage ---------- */
async function loadHabits(){
  try{
    const r = await window.storage.get('habits-data');
    habits = r ? JSON.parse(r.value) : [];
  }catch(e){ habits = []; }
}
async function persistHabits(){
  try{ await window.storage.set('habits-data', JSON.stringify(habits)); }
  catch(e){ console.error('Could not save habits', e); }
}
async function loadTheme(){
  try{
    const r = await window.storage.get('theme-pref');
    theme = r ? r.value : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }catch(e){ theme = 'light'; }
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeBtn();
}
function toggleTheme(){
  theme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeBtn();
  window.storage.set('theme-pref', theme).catch(()=>{});
}
function updateThemeBtn(){
  document.getElementById('themeIcon').textContent = theme === 'light' ? '☀' : '☾';
  document.getElementById('themeLabel').textContent = theme === 'light' ? 'Light' : 'Dark';
}

/* ---------- Date helpers ---------- */
function fmt(d){
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
function todayStr(){ return fmt(new Date()); }
function parseDate(s){ return new Date(s+'T00:00:00'); }

function dayIndex(habit){
  const start = parseDate(habit.startDate);
  const today = parseDate(todayStr());
  return Math.round((today-start)/86400000) + 1;
}
function currentStreak(habit){
  let streak = 0;
  let d = parseDate(todayStr());
  if(habit.completions[fmt(d)] !== true) d.setDate(d.getDate()-1);
  while(habit.completions[fmt(d)] === true){
    streak++;
    d.setDate(d.getDate()-1);
  }
  return streak;
}
function bestStreak(habit){
  const dates = Object.keys(habit.completions).filter(k=>habit.completions[k]===true).sort();
  if(!dates.length) return 0;
  let best=1, run=1;
  for(let i=1;i<dates.length;i++){
    const prev = parseDate(dates[i-1]);
    const cur = parseDate(dates[i]);
    const diff = Math.round((cur-prev)/86400000);
    if(diff===1){ run++; best=Math.max(best,run); } else { run=1; }
  }
  return best;
}
function completionCount(habit){
  return Object.values(habit.completions).filter(v=>v===true).length;
}
function missedCount(habit){
  return Object.values(habit.completions).filter(v=>v===false).length;
}

function cutoffPassed(dateStr){
  return dateStr < todayStr();
}
function runAutoMissCheck(){
  const today = todayStr();
  let changed = false;
  habits.forEach(h=>{
    let d = parseDate(h.startDate);
    const limit = parseDate(today);
    let count = 0;
    while(d <= limit && count < 21){
      const ds = fmt(d);
      if(h.completions[ds] === undefined && cutoffPassed(ds)){
        h.completions[ds] = false;
        changed = true;
      }
      d.setDate(d.getDate()+1);
      count++;
    }
  });
  if(changed){
    persistHabits();
    if(activeView==='home') renderHome();
    if(activeView==='track') renderTrack();
    if(activeView==='calendar') renderCalendar();
    if(activeView==='insights') renderInsights();
  }
  return changed;
}

function showView(name){
  activeView = name;
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
  runAutoMissCheck();
  if(name==='home') renderHome();
  if(name==='add') renderAdd();
  if(name==='track') renderTrack();
  if(name==='calendar') renderCalendar();
  if(name==='insights') renderInsights();
  window.scrollTo({top:0, behavior:'instant'});
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2400);
}

/* ---------- HOME ---------- */
function renderHome(){
  const active = habits.filter(h=>dayIndex(h)>=1 && dayIndex(h)<=21).length;
  const todayDone = habits.filter(h=>h.completions[todayStr()]===true).length;
  const pct = habits.length ? Math.round((todayDone/habits.length)*100) : 0;
  const best = habits.reduce((m,h)=>Math.max(m,bestStreak(h)),0);
  document.getElementById('statActive').textContent = active;
  document.getElementById('statToday').textContent = pct+'%';
  document.getElementById('statStreak').textContent = best;
}

/* ---------- ADD ---------- */
function renderAdd(){
  selectedIcon = ICONS[0];
  selectedColor = COLORS[0].v;
  document.getElementById('habitNameInput').value = '';
  document.getElementById('habitStartInput').value = todayStr();

  const iconGrid = document.getElementById('iconGrid');
  iconGrid.innerHTML = ICONS.map((ic,i)=>`<button type="button" class="icon-btn${i===0?' selected':''}" data-icon="${ic}" onclick="pickIcon('${ic}')">${ic}</button>`).join('');

  const colorGrid = document.getElementById('colorGrid');
  colorGrid.innerHTML = COLORS.map((c,i)=>`<button type="button" class="color-btn${i===0?' selected':''}" data-color="${c.v}" style="background:${c.v}" title="${c.n}" onclick="pickColor('${c.v}')"></button>`).join('');

  updatePreview();
  renderExistingHabits();
}
function pickIcon(ic){
  selectedIcon = ic;
  document.querySelectorAll('.icon-btn').forEach(b=>b.classList.toggle('selected', b.dataset.icon===ic));
  updatePreview();
}
function pickColor(c){
  selectedColor = c;
  document.querySelectorAll('.color-btn').forEach(b=>b.classList.toggle('selected', b.dataset.color===c));
  updatePreview();
}
function updatePreview(){
  const name = document.getElementById('habitNameInput').value.trim();
  const badge = document.getElementById('previewBadge');
  badge.style.background = selectedColor + '26';
  badge.style.color = selectedColor;
  badge.textContent = selectedIcon;
  document.getElementById('previewText').textContent = name || 'This is how your habit will look';
}
document.addEventListener('input', (e)=>{ if(e.target.id==='habitNameInput') updatePreview(); });

async function saveHabit(){
  const name = document.getElementById('habitNameInput').value.trim();
  const start = document.getElementById('habitStartInput').value || todayStr();
  if(!name){ showToast('Give your habit a name first'); document.getElementById('habitNameInput').focus(); return; }
  const habit = {
    id: 'h_'+Date.now()+'_'+Math.floor(Math.random()*1000),
    name, icon: selectedIcon, color: selectedColor,
    startDate: start, completions: {}
  };
  habits.push(habit);
  await persistHabits();
  showToast('Habit added — day 1 of 21 starts now');
  renderExistingHabits();
  document.getElementById('habitNameInput').value = '';
  updatePreview();
}
function renderExistingHabits(){
  const wrap = document.getElementById('existingHabitsWrap');
  if(!habits.length){ wrap.innerHTML=''; return; }
  wrap.innerHTML = `<div class="section-label">Your habits (${habits.length})</div>` +
    habits.slice().reverse().map(h=>`
      <div class="habit-card" style="--habit-color:${h.color}">
        <div class="habit-top">
          <div class="habit-badge" style="background:${h.color}26; color:${h.color}">${h.icon}</div>
          <div>
            <div class="habit-name">${escapeHtml(h.name)}</div>
            <div class="habit-meta">Started ${h.startDate}</div>
          </div>
          <div class="habit-actions">
            <button class="icon-action-btn" title="Delete habit" onclick="deleteHabit('${h.id}')">🗑</button>
          </div>
        </div>
      </div>
    `).join('');
}
async function deleteHabit(id){
  habits = habits.filter(h=>h.id!==id);
  await persistHabits();
  showToast('Habit removed');
  renderExistingHabits();
}
function escapeHtml(s){
  return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ---------- TRACK ---------- */
function renderTrack(){
  const list = document.getElementById('trackList');
  if(!habits.length){
    list.innerHTML = `<div class="empty-state">
      <h3>No habits yet</h3>
      <p>Start your first 21-day streak — it only takes a name and a color.</p>
      <button class="primary-btn" onclick="showView('add')">Add your first habit</button>
    </div>`;
    return;
  }
  const today = todayStr();
  list.innerHTML = habits.slice().reverse().map(h=>{
    const di = dayIndex(h);
    const clampedDay = Math.min(Math.max(di,0),21);
    const state = h.completions[today];
    const streak = currentStreak(h);
    const finished = di > 21;
    let dots = '';
    for(let i=1;i<=21;i++){
      const d = new Date(parseDate(h.startDate));
      d.setDate(d.getDate() + (i-1));
      const ds = fmt(d);
      const s = h.completions[ds];
      const cls = s===true ? ' done' : (s===false ? ' missed' : '');
      const isToday = ds===today;
      dots += `<span class="chain-dot${cls}${isToday?' today':''}" style="--habit-color:${h.color}"></span>`;
    }
    let actionBtn;
    if(finished){
      actionBtn = `<button class="mark-btn" onclick="restartHabit('${h.id}')">Restart</button>`;
    } else if(state===true){
      actionBtn = `<button class="mark-btn done" onclick="toggleToday('${h.id}')">✓ Done</button>`;
    } else if(state===false){
      actionBtn = `<button class="mark-btn missed" onclick="toggleToday('${h.id}')">✕ Missed — fix</button>`;
    } else {
      actionBtn = `<button class="mark-btn" onclick="toggleToday('${h.id}')">Mark done</button>`;
    }
    return `
    <div class="habit-card" style="--habit-color:${h.color}">
      <div class="habit-top">
        <div class="habit-badge" style="background:${h.color}26; color:${h.color}">${h.icon}</div>
        <div>
          <div class="habit-name">${escapeHtml(h.name)}</div>
          <div class="habit-meta mono">${finished ? '21/21 complete' : (di<1 ? 'Starts '+h.startDate : 'Day '+clampedDay+' of 21')} · 🔥 ${streak} day streak</div>
        </div>
        <div class="habit-actions">${actionBtn}</div>
      </div>
      <div class="chain">${dots}</div>
    </div>`;
  }).join('');
}
async function toggleToday(id){
  const h = habits.find(x=>x.id===id);
  if(!h) return;
  const today = todayStr();
  const wasDone = h.completions[today] === true;
  if(wasDone) delete h.completions[today];
  else h.completions[today] = true;
  await persistHabits();
  if(!wasDone && dayIndex(h)===21){
    showToast('🎉 21-day streak complete: ' + h.name);
  }
  renderTrack();
}
async function restartHabit(id){
  const h = habits.find(x=>x.id===id);
  if(!h) return;
  h.startDate = todayStr();
  h.completions = {};
  await persistHabits();
  showToast('New 21-day run started for ' + h.name);
  renderTrack();
}

/* ---------- CALENDAR ---------- */
function setCalMode(mode){
  calMode = mode;
  document.getElementById('modeMonth').classList.toggle('active', mode==='month');
  document.getElementById('modeWeek').classList.toggle('active', mode==='week');
  renderCalendar();
}
function navCal(dir){
  if(calMode==='month'){
    calAnchor.setMonth(calAnchor.getMonth()+dir);
  } else {
    calAnchor.setDate(calAnchor.getDate()+dir*7);
  }
  renderCalendar();
}
function habitsOnDate(ds){
  return habits.filter(h=>h.completions[ds]===true);
}
function habitsMissedOnDate(ds){
  return habits.filter(h=>h.completions[ds]===false);
}
function renderCalendar(){
  const body = document.getElementById('calBody');
  const detail = document.getElementById('dayDetail');
  if(calMode==='month'){
    const y = calAnchor.getFullYear(), m = calAnchor.getMonth();
    document.getElementById('calTitle').textContent = calAnchor.toLocaleDateString('en-US',{month:'long', year:'numeric'});
    const firstDow = new Date(y,m,1).getDay();
    const daysInMonth = new Date(y,m+1,0).getDate();
    const dows = ['S','M','T','W','T','F','S'];
    let html = `<div class="cal-grid">` + dows.map(d=>`<div class="cal-dow">${d}</div>`).join('');
    for(let i=0;i<firstDow;i++) html += `<div class="cal-cell blank"></div>`;
    for(let day=1; day<=daysInMonth; day++){
      const ds = fmt(new Date(y,m,day));
      const isToday = ds===todayStr();
      const isSel = ds===selectedDay;
      const dh = habitsOnDate(ds).slice(0,3);
      const mh = habitsMissedOnDate(ds).slice(0, Math.max(0,4-dh.length));
      html += `<div class="cal-cell${isToday?' today':''}${isSel?' selected':''}" onclick="selectDay('${ds}')">
        <span class="cal-daynum">${day}</span>
        <span class="cal-dots">${dh.map(h=>`<span style="background:${h.color}"></span>`).join('')}${mh.map(()=>`<span class="miss" style="background:var(--accent-3)"></span>`).join('')}</span>
      </div>`;
    }
    html += `</div>`;
    body.innerHTML = html;
  } else {
    // week view
    const d = new Date(calAnchor);
    d.setDate(d.getDate() - d.getDay());
    const dows = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let html = `<div class="week-row">`;
    let rangeStart='', rangeEnd='';
    for(let i=0;i<7;i++){
      const cd = new Date(d); cd.setDate(d.getDate()+i);
      const ds = fmt(cd);
      if(i===0) rangeStart = cd.toLocaleDateString('en-US',{month:'short',day:'numeric'});
      if(i===6) rangeEnd = cd.toLocaleDateString('en-US',{month:'short',day:'numeric'});
      const isToday = ds===todayStr();
      const dh = habitsOnDate(ds);
      const mh = habitsMissedOnDate(ds);
      html += `<div class="week-cell${isToday?' today':''}" onclick="selectDay('${ds}')">
        <div class="wd">${dows[i]}</div>
        <div class="wn mono">${cd.getDate()}</div>
        <div class="week-icons">${dh.map(h=>`<span style="background:${h.color}26; color:${h.color}">${h.icon}</span>`).join('')}${mh.map(h=>`<span style="background:var(--accent-3)26; color:var(--accent-3); opacity:.7">${h.icon}</span>`).join('')}${(!dh.length && !mh.length) ? '<span style="background:transparent;color:var(--ink-faint);font-size:10px;">—</span>' : ''}</div>
      </div>`;
    }
    html += `</div>`;
    document.getElementById('calTitle').textContent = rangeStart + ' – ' + rangeEnd;
    body.innerHTML = html;
  }

  if(selectedDay){
    const dh = habitsOnDate(selectedDay);
    const mh = habitsMissedOnDate(selectedDay);
    const rows = [
      ...dh.map(h=>`<div class="day-detail-row"><span class="dot" style="background:${h.color}"></span> ${h.icon} ${escapeHtml(h.name)} <span class="tag done">Done</span></div>`),
      ...mh.map(h=>`<div class="day-detail-row"><span class="dot" style="background:var(--accent-3)"></span> ${h.icon} ${escapeHtml(h.name)} <span class="tag missed">Missed</span></div>`)
    ];
    detail.innerHTML = `<div class="day-detail">
      <h4>${new Date(selectedDay+'T00:00:00').toLocaleDateString('en-US',{weekday:'long', month:'long', day:'numeric'})}</h4>
      ${rows.length ? rows.join('') : `<div class="day-detail-row" style="color:var(--ink-faint); border:none;">Nothing tracked on this day.</div>`}
    </div>`;
  } else {
    detail.innerHTML = '';
  }
}
function selectDay(ds){
  selectedDay = (selectedDay===ds) ? null : ds;
  renderCalendar();
}

/* ---------- INSIGHTS ---------- */
function renderInsights(){
  const body = document.getElementById('insightsBody');
  if(!habits.length){
    body.innerHTML = `<div class="empty-state">
      <h3>Nothing to show yet</h3>
      <p>Add a habit and check in for a few days to see your insights here.</p>
      <button class="primary-btn" onclick="showView('add')">Add a habit</button>
    </div>`;
    return;
  }
  function rateOver(days){
    let possible=0, done=0;
    const d = new Date();
    for(let i=0;i<days;i++){
      const ds = fmt(d);
      habits.forEach(h=>{
        const started = parseDate(h.startDate) <= parseDate(ds);
        if(started){ possible++; if(h.completions[ds]===true) done++; }
      });
      d.setDate(d.getDate()-1);
    }
    return possible ? Math.round((done/possible)*100) : 0;
  }
  const rate7 = rateOver(7);
  const rate30 = rateOver(30);
  const best = habits.reduce((m,h)=>Math.max(m,bestStreak(h)),0);

  let html = `<div class="insight-grid">
    <div class="stat-pill"><div class="num mono">${rate7}%</div><div class="lbl">Last 7 days</div></div>
    <div class="stat-pill"><div class="num mono">${rate30}%</div><div class="lbl">Last 30 days</div></div>
    <div class="stat-pill"><div class="num mono">${best}</div><div class="lbl">Best streak ever</div></div>
  </div>`;

  const days14 = [];
  const d = new Date();
  for(let i=13;i>=0;i--){
    const cd = new Date(d); cd.setDate(d.getDate()-i);
    const ds = fmt(cd);
    const count = habits.filter(h=>h.completions[ds]===true).length;
    days14.push({ds, count, label: cd.getDate()});
  }
  const max = Math.max(1, ...days14.map(x=>x.count));
  html += `<div class="bars">
    <h3>Last 14 days</h3>
    <div class="bar-row">
      ${days14.map(x=>`<div class="bar-col">
        <div class="bar-fill" style="height:${(x.count/max)*100}%; background:${x.count? 'var(--accent)':'var(--border)'}"></div>
        <div class="bar-lbl">${x.label}</div>
      </div>`).join('')}
    </div>
  </div>`;

  html += `<div class="section-label">Per-habit performance</div>`;
  habits.forEach(h=>{
    const di = Math.min(Math.max(dayIndex(h),1),21);
    const total = completionCount(h);
    const missed = missedCount(h);
    const pct = Math.round((total/di)*100) || 0;
    html += `<div class="habit-insight-row">
      <div class="hi-badge" style="background:${h.color}26; color:${h.color}">${h.icon}</div>
      <div style="flex:1;">
        <div style="font-size:13px; font-weight:600; margin-bottom:6px;">${escapeHtml(h.name)}</div>
        <div class="hi-bar-bg"><div class="hi-bar-fill" style="width:${Math.min(pct,100)}%; background:${h.color}"></div></div>
      </div>
      <div style="text-align:right;">
        <div class="hi-pct mono">${pct}%</div>
        ${missed ? `<div class="hi-missed">${missed} missed</div>` : ''}
      </div>
    </div>`;
  });

  body.innerHTML = html;
}

/* ---------- Init ---------- */
async function init(){
  await loadTheme();
  await loadHabits();
  runAutoMissCheck();
  renderHome();
  // re-check every minute so a midnight rollover is caught live if the app stays open
  setInterval(runAutoMissCheck, 60000);
}
init();
