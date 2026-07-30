"use client";

import { useEffect, useMemo, useState } from "react";

const dateIdeas = [
  {
    id: 1,
    title: "去吹晚风，看一场日落",
    subtitle: "带上喜欢的歌，沿着江边慢慢走",
    emoji: "🌅",
    mood: ["浪漫", "松弛"],
    costMin: 0,
    costMax: 40,
    time: "2–3 小时",
    place: "江边步道",
    gradient: "sunset",
    plan: ["买两杯冰饮", "散步等日落", "互拍一张喜欢的照片"],
  },
  {
    id: 2,
    title: "一起做顿不看教程的晚餐",
    subtitle: "冰箱里有什么，就把它变成今晚的惊喜",
    emoji: "🍝",
    mood: ["宅家", "好玩"],
    costMin: 60,
    costMax: 160,
    time: "1–2 小时",
    place: "我们的厨房",
    gradient: "pasta",
    plan: ["一起去买菜", "各自负责一道菜", "给成品起个名字"],
  },
  {
    id: 3,
    title: "交换一本最想分享的书",
    subtitle: "找个安静角落，读给对方听",
    emoji: "📖",
    mood: ["松弛", "宅家"],
    costMin: 30,
    costMax: 100,
    time: "2 小时",
    place: "街角书店",
    gradient: "book",
    plan: ["各挑一本书", "交换读十分钟", "写一句话夹在书里"],
  },
  {
    id: 4,
    title: "坐上没坐过的那班公交",
    subtitle: "不设目的地，在喜欢的站名下车",
    emoji: "🚌",
    mood: ["冒险", "好玩"],
    costMin: 10,
    costMax: 60,
    time: "半天",
    place: "未知目的地",
    gradient: "bus",
    plan: ["选一个陌生线路", "轮流决定下车站", "用照片记录小发现"],
  },
  {
    id: 5,
    title: "把客厅变成私人电影院",
    subtitle: "关掉消息，只留一盏小灯和彼此",
    emoji: "🎞️",
    mood: ["宅家", "浪漫"],
    costMin: 20,
    costMax: 100,
    time: "2–3 小时",
    place: "家里",
    gradient: "cinema",
    plan: ["石头剪刀布选片", "准备一份零食拼盘", "散场后交换短评"],
  },
  {
    id: 6,
    title: "去花市挑一束属于今天的花",
    subtitle: "每个人选一枝，合起来就是一束",
    emoji: "💐",
    mood: ["浪漫", "松弛"],
    costMin: 60,
    costMax: 200,
    time: "1–2 小时",
    place: "附近花市",
    gradient: "flower",
    plan: ["各自挑一枝花", "一起选包装纸", "回家找个瓶子插好"],
  },
  {
    id: 7,
    title: "带一块野餐布去公园发呆",
    subtitle: "水果、气泡水和一个没有安排的下午",
    emoji: "🧺",
    mood: ["松弛", "浪漫"],
    costMin: 50,
    costMax: 150,
    time: "3 小时",
    place: "城市公园",
    gradient: "picnic",
    plan: ["各选一种水果", "找一块有树荫的草地", "一起听完一张专辑"],
  },
  {
    id: 8,
    title: "看一场小展，再交换感受",
    subtitle: "不需要看懂，只要记住彼此停留最久的作品",
    emoji: "🖼️",
    mood: ["浪漫", "好玩"],
    costMin: 120,
    costMax: 300,
    time: "半天",
    place: "美术馆",
    gradient: "gallery",
    plan: ["挑一个感兴趣的展", "各自拍下最喜欢的作品", "找家小店聊聊感受"],
  },
  {
    id: 9,
    title: "来一次周边城市微旅行",
    subtitle: "当天出发当天回来，把熟悉的日子过得像假期",
    emoji: "🚄",
    mood: ["冒险", "浪漫"],
    costMin: 300,
    costMax: 800,
    time: "一整天",
    place: "邻近城市",
    gradient: "trip",
    plan: ["选一小时内能到的城市", "只安排一个必去地点", "带回一件小纪念品"],
  },
];

const moods = ["随心", "浪漫", "好玩", "松弛", "宅家", "冒险"];
const budgetPresets = [0, 100, 200, 500, 800];
const DAY = 86400000;
const storageKey = "today-date-idea-settings";

function toInputDate(date) {
  return date.toISOString().slice(0, 10);
}

function getDefaultDates() {
  const today = new Date();
  const started = new Date(today.getTime() - 128 * DAY);
  const anniversary = new Date(today.getTime() + 72 * DAY);
  return { started: toInputDate(started), anniversary: toInputDate(anniversary) };
}

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const paths = {
    sparkles: <><path d="M12 3l.9 2.6L15.5 7l-2.6 1.1L12 11l-.9-2.9L8.5 7l2.6-1.4L12 3Z"/><path d="M5.5 12l.8 2.1 2.2.9-2.2.9L5.5 18l-.8-2.1-2.2-.9 2.2-.9.8-2.1ZM18 10l.6 1.4 1.4.6-1.4.6L18 14l-.6-1.4L16 12l1.4-.6L18 10Z"/></>,
    heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.6 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z"/>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></>,
    rotate: <><path d="M20 7v5h-5"/><path d="M18.2 16A8 8 0 1 1 20 12"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    edit: <><path d="m4 20 4.2-1 10.7-10.7a2 2 0 0 0-2.8-2.8L5.4 16.2 4 20Z"/><path d="m14.5 6.9 2.8 2.8"/></>,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const defaults = useMemo(() => getDefaultDates(), []);
  const [mood, setMood] = useState("随心");
  const [budget, setBudget] = useState(200);
  const [currentId, setCurrentId] = useState(1);
  const [saved, setSaved] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [toast, setToast] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [personOne, setPersonOne] = useState("予");
  const [personTwo, setPersonTwo] = useState("安");
  const [startDate, setStartDate] = useState(defaults.started);
  const [anniversaryName, setAnniversaryName] = useState("我们的纪念日");
  const [anniversaryDate, setAnniversaryDate] = useState(defaults.anniversary);
  const [editingProfile, setEditingProfile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const now = new Date();
    setDateLabel(new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" }).format(now));
    try {
      const stored = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
      if (typeof stored.personOne === "string") setPersonOne(stored.personOne);
      if (typeof stored.personTwo === "string") setPersonTwo(stored.personTwo);
      if (typeof stored.startDate === "string") setStartDate(stored.startDate);
      if (typeof stored.anniversaryName === "string") setAnniversaryName(stored.anniversaryName);
      if (typeof stored.anniversaryDate === "string") setAnniversaryDate(stored.anniversaryDate);
      if (Number.isFinite(stored.budget)) setBudget(stored.budget);
    } catch {
      // Keep the friendly defaults when saved data is unavailable.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify({
      personOne, personTwo, startDate, anniversaryName, anniversaryDate, budget,
    }));
  }, [personOne, personTwo, startDate, anniversaryName, anniversaryDate, budget, hydrated]);

  const affordableIdeas = useMemo(
    () => dateIdeas.filter((idea) => idea.costMin <= budget),
    [budget],
  );

  const filtered = useMemo(() => {
    const pool = affordableIdeas.filter((idea) => mood === "随心" || idea.mood.includes(mood));
    return pool.length ? pool : affordableIdeas;
  }, [affordableIdeas, mood]);

  useEffect(() => {
    const available = filtered.length ? filtered : dateIdeas.filter((idea) => idea.costMin === 0);
    if (!available.some((idea) => idea.id === currentId)) setCurrentId(available[0].id);
  }, [filtered, currentId]);

  const current = dateIdeas.find((idea) => idea.id === currentId) || dateIdeas[0];
  const relationshipDays = useMemo(() => {
    if (!startDate) return 0;
    return Math.max(0, Math.floor((new Date().setHours(0, 0, 0, 0) - new Date(`${startDate}T00:00:00`).getTime()) / DAY));
  }, [startDate]);

  const anniversary = useMemo(() => {
    if (!anniversaryDate) return { days: 0, progress: 0, label: "还没有设置日期" };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(`${anniversaryDate}T00:00:00`);
    let next = new Date(today.getFullYear(), selected.getMonth(), selected.getDate());
    if (next < today) next = new Date(today.getFullYear() + 1, selected.getMonth(), selected.getDate());
    const days = Math.round((next - today) / DAY);
    const previous = new Date(next.getFullYear() - 1, next.getMonth(), next.getDate());
    const total = Math.max(1, Math.round((next - previous) / DAY));
    const progress = Math.max(0, Math.min(100, ((total - days) / total) * 100));
    return { days, progress, label: days === 0 ? "就是今天 ♥" : `还有 ${days} 天` };
  }, [anniversaryDate]);

  const pickIdea = () => {
    setRevealing(true);
    setSaved(false);
    const pool = filtered.length ? filtered : dateIdeas.filter((idea) => idea.costMin === 0);
    const candidates = pool.filter((idea) => idea.id !== currentId);
    const source = candidates.length ? candidates : pool;
    const choice = source[Math.floor(Math.random() * source.length)];
    window.setTimeout(() => {
      setCurrentId(choice.id);
      setRevealing(false);
    }, 420);
  };

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const toggleSave = () => {
    setSaved((value) => !value);
    showToast(saved ? "已从约会清单移除" : "已加入我们的约会清单");
  };

  const updateBudget = (value) => {
    const next = Math.max(0, Math.min(99999, Number(value) || 0));
    setBudget(next);
    setSaved(false);
  };

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <nav className="topbar">
        <a className="brand" href="#" aria-label="今天约什么首页">
          <span className="brand-mark"><Icon name="heart" size={17} strokeWidth={2.2} /></span>
          <span>今天约什么</span>
        </a>
        <button className="couple couple-button" onClick={() => setEditingProfile((value) => !value)}>
          <span className="avatar avatar-one">{(personOne || "我").slice(0, 1)}</span>
          <span className="avatar avatar-two">{(personTwo || "你").slice(0, 1)}</span>
          <span className="together"><span className="online-dot" /> 在一起 {relationshipDays} 天</span>
          <Icon name="edit" size={14} />
        </button>
      </nav>

      <section className="hero">
        <div className="eyebrow"><Icon name="sparkles" size={15} /> {dateLabel || "今天"} · 只属于你们</div>
        <h1>今天，<span>约什么？</span></h1>
        <p>{personOne || "我"}和{personTwo || "你"}，把平凡的今天约成特别的一天。</p>
      </section>

      <section className="control-panel" aria-label="约会偏好">
        <div className="control-group">
          <div className="control-title"><span>今天想要</span><small>选择一种心情</small></div>
          <div className="chips">
            {moods.map((item) => (
              <button key={item} className={`chip ${mood === item ? "active" : ""}`} onClick={() => setMood(item)}>
                {item === "随心" && <Icon name="sparkles" size={14} />}{item}
              </button>
            ))}
          </div>
        </div>
        <div className="divider" />
        <div className="control-group budget-row">
          <div className="control-title"><span>本次预算</span><small>两个人的总预算</small></div>
          <div className="budget-control">
            <label className="money-input"><span>¥</span><input type="number" min="0" max="99999" value={budget} onChange={(event) => updateBudget(event.target.value)} aria-label="输入约会预算" /></label>
            <div className="budget-presets">
              {budgetPresets.map((amount) => <button key={amount} className={budget === amount ? "active" : ""} onClick={() => updateBudget(amount)}>{amount === 0 ? "免费" : amount}</button>)}
            </div>
          </div>
        </div>
        <p className="budget-hint"><Icon name="check" size={14} /> 已找到 {affordableIdeas.length} 个预算内灵感，最高不超过 ¥{budget}</p>
      </section>

      <section className={`profile-panel ${editingProfile ? "open" : ""}`} aria-label="情侣与纪念日设置">
        <button className="profile-toggle" onClick={() => setEditingProfile((value) => !value)}>
          <span><Icon name="heart" size={16} /> 我们的资料与纪念日</span>
          <span>{editingProfile ? "收起" : "编辑"} <Icon name="chevron" size={14} /></span>
        </button>
        {editingProfile && (
          <div className="profile-fields">
            <label><span>你的名字</span><input value={personOne} maxLength={8} onChange={(event) => setPersonOne(event.target.value)} placeholder="输入名字" /></label>
            <label><span>TA 的名字</span><input value={personTwo} maxLength={8} onChange={(event) => setPersonTwo(event.target.value)} placeholder="输入名字" /></label>
            <label><span>在一起的日期</span><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
            <label><span>纪念日名称</span><input value={anniversaryName} maxLength={16} onChange={(event) => setAnniversaryName(event.target.value)} placeholder="例如：第一次见面" /></label>
            <label><span>纪念日日期</span><input type="date" value={anniversaryDate} onChange={(event) => setAnniversaryDate(event.target.value)} /></label>
            <div className="saved-note"><Icon name="check" size={15} /> 修改会自动保存在此设备</div>
          </div>
        )}
      </section>

      <section className="result-wrap">
        <div className={`idea-card ${revealing ? "is-revealing" : ""}`}>
          <div className={`idea-art ${current.gradient}`}>
            <div className="art-noise" />
            <div className="art-date"><span>预算内灵感</span><b>0{current.id}</b></div>
            <div className="art-emoji" aria-hidden="true">{current.emoji}</div>
            <div className="art-caption">LOVE IS IN<br/>THE LITTLE THINGS</div>
          </div>
          <div className="idea-content">
            <div className="idea-topline">
              <span className="recommend"><Icon name="sparkles" size={14} /> 为{personOne || "你"}和{personTwo || "TA"}挑选</span>
              <button className={`save-btn ${saved ? "saved" : ""}`} onClick={toggleSave} aria-label="收藏这个约会">
                <Icon name={saved ? "check" : "bookmark"} size={18} />
              </button>
            </div>
            <div>
              <h2>{current.title}</h2>
              <p className="subtitle">{current.subtitle}</p>
            </div>
            <div className="meta-row">
              <span><Icon name="clock" size={17} />{current.time}</span>
              <span><Icon name="pin" size={17} />{current.place}</span>
              <span className="cost">约 ¥{current.costMin}–{Math.min(current.costMax, budget)}</span>
            </div>
            <ol className="mini-plan">
              {current.plan.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
            </ol>
          </div>
        </div>
        <button className="primary-button" onClick={pickIdea} disabled={revealing}>
          <Icon name="rotate" size={19} />{revealing ? "正在寻找心动…" : `换一个 ¥${budget} 内的灵感`}
        </button>
        <button className="surprise-link" onClick={pickIdea}>
          完全交给缘分 <Icon name="chevron" size={15} />
        </button>
      </section>

      <section className="memory-strip">
        <div>
          <span className="memory-icon"><Icon name="calendar" size={20} /></span>
          <p><b>{anniversaryName || "我们的纪念日"}</b><small>{anniversary.label}</small></p>
        </div>
        <div className="progress"><i style={{ width: `${anniversary.progress}%` }} /></div>
        <button onClick={() => setEditingProfile(true)} aria-label="编辑纪念日"><Icon name="edit" size={17} /></button>
      </section>

      <footer>
        <span>Made with <Icon name="heart" size={13} /> for {personOne || "you"} & {personTwo || "me"}</span>
        <p>愿每一次约会，都比昨天更喜欢彼此。</p>
      </footer>

      <nav className="mobile-nav" aria-label="移动端导航">
        <button className="active"><Icon name="home" size={20} /><span>今天</span></button>
        <button onClick={() => showToast("约会清单还是空的，先收藏一个吧")}><Icon name="bookmark" size={20} /><span>清单</span></button>
        <button onClick={() => setEditingProfile(true)}><Icon name="user" size={20} /><span>我们</span></button>
      </nav>
      <div className={`toast ${toast ? "show" : ""}`}><Icon name="check" size={17} />{toast}</div>
    </main>
  );
}
