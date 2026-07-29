"use client";

import { useEffect, useMemo, useState } from "react";

const dateIdeas = [
  {
    id: 1,
    title: "去吹晚风，看一场日落",
    subtitle: "带上喜欢的歌，沿着江边慢慢走",
    emoji: "🌅",
    mood: ["浪漫", "松弛"],
    budget: "免费",
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
    budget: "¥",
    time: "1–2 小时",
    place: "我们的厨房",
    gradient: "pasta",
    plan: ["一起买菜", "各自负责一道菜", "给成品起个名字"],
  },
  {
    id: 3,
    title: "交换一本最想分享的书",
    subtitle: "找个安静角落，读给对方听",
    emoji: "📖",
    mood: ["安静", "松弛"],
    budget: "¥",
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
    budget: "¥",
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
    budget: "¥",
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
    mood: ["浪漫", "出门"],
    budget: "¥¥",
    time: "1–2 小时",
    place: "附近花市",
    gradient: "flower",
    plan: ["各自挑一枝花", "一起选包装纸", "回家找个瓶子插好"],
  },
];

const moods = ["随心", "浪漫", "好玩", "松弛", "宅家", "冒险"];
const budgets = ["不限", "免费", "¥", "¥¥"];

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
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [mood, setMood] = useState("随心");
  const [budget, setBudget] = useState("不限");
  const [currentId, setCurrentId] = useState(1);
  const [saved, setSaved] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [toast, setToast] = useState("");
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    const now = new Date();
    setDateLabel(new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" }).format(now));
  }, []);

  const filtered = useMemo(() => dateIdeas.filter((idea) => {
    const moodMatch = mood === "随心" || idea.mood.includes(mood);
    const budgetMatch = budget === "不限" || idea.budget === budget;
    return moodMatch && budgetMatch;
  }), [mood, budget]);

  const current = dateIdeas.find((idea) => idea.id === currentId) || dateIdeas[0];

  const pickIdea = () => {
    setRevealing(true);
    setSaved(false);
    const pool = filtered.length ? filtered : dateIdeas;
    const candidates = pool.filter((idea) => idea.id !== currentId);
    const choice = (candidates.length ? candidates : pool)[Math.floor(Math.random() * (candidates.length || pool.length))];
    window.setTimeout(() => {
      setCurrentId(choice.id);
      setRevealing(false);
      if (!filtered.length) showToast("没有完全匹配，偷偷为你们加了点惊喜");
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

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <nav className="topbar">
        <a className="brand" href="#" aria-label="今天约什么首页">
          <span className="brand-mark"><Icon name="heart" size={17} strokeWidth={2.2} /></span>
          <span>今天约什么</span>
        </a>
        <div className="couple">
          <span className="avatar avatar-one">予</span>
          <span className="avatar avatar-two">安</span>
          <span className="together"><span className="online-dot" /> 在一起 128 天</span>
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow"><Icon name="sparkles" size={15} /> {dateLabel || "今天"} · 只属于你们</div>
        <h1>今天，<span>约什么？</span></h1>
        <p>不用纠结，把平凡的今天约成特别的一天。</p>
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
          <div className="control-title"><span>预算</span><small>为今天定个范围</small></div>
          <div className="segmented">
            {budgets.map((item) => <button key={item} className={budget === item ? "active" : ""} onClick={() => setBudget(item)}>{item}</button>)}
          </div>
        </div>
      </section>

      <section className="result-wrap">
        <div className={`idea-card ${revealing ? "is-revealing" : ""}`}>
          <div className={`idea-art ${current.gradient}`}>
            <div className="art-noise" />
            <div className="art-date"><span>今日灵感</span><b>0{current.id}</b></div>
            <div className="art-emoji" aria-hidden="true">{current.emoji}</div>
            <div className="art-caption">LOVE IS IN<br/>THE LITTLE THINGS</div>
          </div>
          <div className="idea-content">
            <div className="idea-topline">
              <span className="recommend"><Icon name="sparkles" size={14} /> 为你们挑选</span>
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
              <span className="cost">{current.budget}</span>
            </div>
            <ol className="mini-plan">
              {current.plan.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
            </ol>
          </div>
        </div>
        <button className="primary-button" onClick={pickIdea} disabled={revealing}>
          <Icon name="rotate" size={19} />{revealing ? "正在寻找心动…" : "换一个灵感"}
        </button>
        <button className="surprise-link" onClick={() => { setMood("随心"); setBudget("不限"); pickIdea(); }}>
          完全交给缘分 <Icon name="chevron" size={15} />
        </button>
      </section>

      <section className="memory-strip">
        <div>
          <span className="memory-icon"><Icon name="calendar" size={20} /></span>
          <p><b>下一个纪念日</b><small>距离 200 天，还有 72 天</small></p>
        </div>
        <div className="progress"><i style={{ width: "64%" }} /></div>
        <button onClick={() => showToast("纪念日提醒已开启")}><Icon name="chevron" size={18} /></button>
      </section>

      <footer>
        <span>Made with <Icon name="heart" size={13} /> for two</span>
        <p>愿每一次约会，都比昨天更喜欢彼此。</p>
      </footer>

      <nav className="mobile-nav" aria-label="移动端导航">
        <button className="active"><Icon name="home" size={20} /><span>今天</span></button>
        <button onClick={() => showToast("约会清单还是空的，先收藏一个吧")}><Icon name="bookmark" size={20} /><span>清单</span></button>
        <button onClick={() => showToast("你们已经在一起 128 天啦")}><Icon name="user" size={20} /><span>我们</span></button>
      </nav>
      <div className={`toast ${toast ? "show" : ""}`}><Icon name="check" size={17} />{toast}</div>
    </main>
  );
}
