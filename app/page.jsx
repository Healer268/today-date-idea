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
  {
    id: 10,
    title: "来一场城市散步摄影赛",
    subtitle: "各自寻找五种颜色，最后交换今天的取景框",
    emoji: "📷",
    mood: ["好玩", "松弛"],
    costMin: 0,
    costMax: 30,
    time: "2 小时",
    place: "熟悉的街区",
    gradient: "citywalk",
    plan: ["抽签决定拍摄主题", "各自拍满九张照片", "选一张设成彼此壁纸"],
  },
  {
    id: 11,
    title: "便利店盲选晚餐",
    subtitle: "每个人为对方挑三样，拆开就是今晚的菜单",
    emoji: "🍙",
    mood: ["好玩", "宅家"],
    costMin: 30,
    costMax: 80,
    time: "1 小时",
    place: "附近便利店",
    gradient: "konbini",
    plan: ["规定每人一半预算", "不让对方看见选择", "给最好吃的组合打分"],
  },
  {
    id: 12,
    title: "早起去吃一顿晨光早餐",
    subtitle: "比城市早醒一点，把普通早餐吃成约会",
    emoji: "🥐",
    mood: ["浪漫", "松弛"],
    costMin: 40,
    costMax: 120,
    time: "1–2 小时",
    place: "早餐店",
    gradient: "breakfast",
    plan: ["前一晚约好起床时间", "各点一份对方喜欢的", "饭后散步二十分钟"],
  },
  {
    id: 13,
    title: "捏一对奇奇怪怪的小陶偶",
    subtitle: "不追求好看，只做世界上独一份的彼此",
    emoji: "🏺",
    mood: ["好玩", "浪漫"],
    costMin: 80,
    costMax: 220,
    time: "2–3 小时",
    place: "手作工作室",
    gradient: "pottery",
    plan: ["互相设计一个形象", "交换完成最后细节", "在底部刻下日期"],
  },
  {
    id: 14,
    title: "去桌游店当一次最佳搭档",
    subtitle: "不比输赢，看看你们能不能读懂彼此的暗号",
    emoji: "🎲",
    mood: ["好玩", "冒险"],
    costMin: 80,
    costMax: 200,
    time: "3 小时",
    place: "桌游店",
    gradient: "boardgame",
    plan: ["选一款合作型游戏", "输的人负责点饮料", "给今天的默契度打分"],
  },
  {
    id: 15,
    title: "一起烤一个不完美的蛋糕",
    subtitle: "奶油歪一点没关系，愿望认真就好",
    emoji: "🎂",
    mood: ["宅家", "浪漫"],
    costMin: 80,
    costMax: 240,
    time: "2–3 小时",
    place: "烘焙教室或家里",
    gradient: "cake",
    plan: ["选一个共同喜欢的口味", "轮流负责烘焙和装饰", "许一个近期的小愿望"],
  },
  {
    id: 16,
    title: "安排一顿有仪式感的晚餐",
    subtitle: "认真穿一次喜欢的衣服，也认真看着对方说话",
    emoji: "🥂",
    mood: ["浪漫", "松弛"],
    costMin: 200,
    costMax: 500,
    time: "2–3 小时",
    place: "景观餐厅",
    gradient: "dinner",
    plan: ["一起挑选餐厅", "手机静音放在一边", "交换最近最感谢对方的一件事"],
  },
  {
    id: 17,
    title: "泡一次温泉，把时间调慢",
    subtitle: "离开消息提醒，给身体和关系一起放个假",
    emoji: "♨️",
    mood: ["松弛", "浪漫"],
    costMin: 350,
    costMax: 900,
    time: "半天",
    place: "温泉馆",
    gradient: "onsen",
    plan: ["提前选好安静时段", "各带一本想看的书", "回程分享最放松的瞬间"],
  },
  {
    id: 18,
    title: "去游乐园交换一次童心",
    subtitle: "各自选一个最想玩的项目，再一起看夜晚亮灯",
    emoji: "🎡",
    mood: ["好玩", "冒险"],
    costMin: 500,
    costMax: 1200,
    time: "一整天",
    place: "主题乐园",
    gradient: "park",
    plan: ["提前买票避开高峰", "互相挑战一个新项目", "在摩天轮前拍合照"],
  },
  {
    id: 19,
    title: "住进城市里的周末小房间",
    subtitle: "不用走很远，换个窗户就能拥有一次短假",
    emoji: "🏨",
    mood: ["浪漫", "松弛"],
    costMin: 600,
    costMax: 1500,
    time: "一天一夜",
    place: "设计酒店",
    gradient: "hotel",
    plan: ["选一家风格喜欢的酒店", "带一瓶想一起喝的饮料", "第二天睡醒再决定行程"],
  },
  {
    id: 20,
    title: "一起去做一次温柔的志愿者",
    subtitle: "陪伴小动物或参加公益活动，把爱分一点出去",
    emoji: "🐕",
    mood: ["松弛", "冒险"],
    costMin: 0,
    costMax: 30,
    time: "半天",
    place: "公益机构",
    gradient: "volunteer",
    plan: ["提前联系正规机构", "一起完成一次志愿任务", "回家路上分享感受"],
  },
  {
    id: 21,
    title: "写一封现在不能打开的信",
    subtitle: "写给一年后的彼此，把今天认真封存起来",
    emoji: "💌",
    mood: ["浪漫", "宅家"],
    costMin: 0,
    costMax: 20,
    time: "1 小时",
    place: "家里",
    gradient: "letter",
    plan: ["各自安静写十五分钟", "约定未来的开启日期", "一起藏进不会忘记的地方"],
  },
  {
    id: 22,
    title: "包下一间小房间尽情唱歌",
    subtitle: "从对方最爱的歌开始，唱到忘记时间",
    emoji: "🎤",
    mood: ["好玩", "浪漫"],
    costMin: 100,
    costMax: 320,
    time: "3 小时",
    place: "KTV",
    gradient: "karaoke",
    plan: ["各点一首认识彼此时的歌", "合唱一首从没唱过的", "录下十秒钟纪念"],
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

function encodeShareData(data) {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeShareData(value) {
  const base = value.replace(/-/g, "+").replace(/_/g, "/");
  const normalized = base.padEnd(Math.ceil(base.length / 4) * 4, "=");
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric" }).format(date);
}

function compressAvatar(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const size = Math.min(image.width, image.height);
        const sourceX = (image.width - size) / 2;
        const sourceY = (image.height - size) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = 96;
        canvas.height = 96;
        const context = canvas.getContext("2d");
        context.drawImage(image, sourceX, sourceY, size, size, 0, 0, 96, 96);
        resolve(canvas.toDataURL("image/webp", 0.68));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
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
    upload: <><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 20h14"/></>,
    share: <><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/></>,
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
  const [avatarOne, setAvatarOne] = useState("");
  const [avatarTwo, setAvatarTwo] = useState("");
  const [sharedView, setSharedView] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const now = new Date();
    setDateLabel(new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" }).format(now));
    try {
      const shareValue = new URLSearchParams(window.location.hash.slice(1)).get("share");
      const stored = shareValue
        ? decodeShareData(shareValue)
        : JSON.parse(window.localStorage.getItem(storageKey) || "{}");
      if (shareValue) setSharedView(true);
      if (typeof stored.personOne === "string") setPersonOne(stored.personOne);
      if (typeof stored.personTwo === "string") setPersonTwo(stored.personTwo);
      if (typeof stored.startDate === "string") setStartDate(stored.startDate);
      if (typeof stored.anniversaryName === "string") setAnniversaryName(stored.anniversaryName);
      if (typeof stored.anniversaryDate === "string") setAnniversaryDate(stored.anniversaryDate);
      if (typeof stored.avatarOne === "string") setAvatarOne(stored.avatarOne);
      if (typeof stored.avatarTwo === "string") setAvatarTwo(stored.avatarTwo);
      if (Number.isFinite(stored.budget)) setBudget(stored.budget);
    } catch {
      // Keep the friendly defaults when saved data is unavailable.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify({
      personOne, personTwo, startDate, anniversaryName, anniversaryDate, avatarOne, avatarTwo, budget,
    }));
  }, [personOne, personTwo, startDate, anniversaryName, anniversaryDate, avatarOne, avatarTwo, budget, hydrated]);

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

  const automaticMilestones = useMemo(() => {
    if (!startDate) return [];
    const start = new Date(`${startDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const hundredNumber = Math.max(100, Math.ceil(relationshipDays / 100) * 100);
    const hundredDate = new Date(start.getTime() + hundredNumber * DAY);
    const hundredDaysLeft = Math.max(0, Math.round((hundredDate - today) / DAY));

    let anniversaryYears = Math.max(1, today.getFullYear() - start.getFullYear());
    let anniversaryTarget = new Date(
      start.getFullYear() + anniversaryYears,
      start.getMonth(),
      start.getDate(),
    );
    if (anniversaryTarget < today) {
      anniversaryYears += 1;
      anniversaryTarget = new Date(
        start.getFullYear() + anniversaryYears,
        start.getMonth(),
        start.getDate(),
      );
    }
    const anniversaryDaysLeft = Math.max(0, Math.round((anniversaryTarget - today) / DAY));

    return [
      {
        name: `在一起 ${hundredNumber} 天`,
        date: formatShortDate(hundredDate),
        days: hundredDaysLeft,
        progress: Math.min(100, ((relationshipDays % 100) / 100) * 100),
        emoji: "💯",
      },
      {
        name: `${anniversaryYears} 周年纪念日`,
        date: formatShortDate(anniversaryTarget),
        days: anniversaryDaysLeft,
        progress: Math.min(100, (relationshipDays / (anniversaryYears * 365)) * 100),
        emoji: "💍",
      },
    ];
  }, [startDate, relationshipDays]);

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

  const handleAvatar = async (event, setter) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("请选择图片文件");
      return;
    }
    try {
      const compressed = await compressAvatar(file);
      setter(compressed);
      showToast("头像已更新");
    } catch {
      showToast("图片读取失败，请换一张试试");
    }
  };

  const copyShareLink = async () => {
    const shareData = {
      personOne, personTwo, startDate, anniversaryName, anniversaryDate,
      avatarOne, avatarTwo, budget,
    };
    const url = `${window.location.origin}${window.location.pathname}#share=${encodeShareData(shareData)}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast("分享链接已复制");
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      showToast("分享链接已复制");
    }
  };

  const scrollToSettings = () => {
    document.getElementById("couple-settings")?.scrollIntoView({ behavior: "smooth", block: "center" });
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
        <button className="couple couple-button" onClick={scrollToSettings}>
          <span className="avatar avatar-one" style={avatarOne ? { backgroundImage: `url(${avatarOne})` } : undefined}>{!avatarOne && (personOne || "我").slice(0, 1)}</span>
          <span className="avatar avatar-two" style={avatarTwo ? { backgroundImage: `url(${avatarTwo})` } : undefined}>{!avatarTwo && (personTwo || "你").slice(0, 1)}</span>
          <span className="together"><span className="online-dot" /> 在一起 {relationshipDays} 天</span>
          <Icon name="edit" size={14} />
        </button>
      </nav>

      <section className="hero">
        {sharedView && <div className="shared-badge"><Icon name="heart" size={14} /> 你正在查看 {personOne} 和 {personTwo} 分享的情侣主页</div>}
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
            <label className="money-input"><span>¥</span><input type="number" min="0" max="99999" value={budget} onFocus={(event) => event.target.select()} onChange={(event) => updateBudget(event.target.value)} aria-label="输入约会预算" /></label>
            <div className="budget-presets">
              {budgetPresets.map((amount) => <button key={amount} className={budget === amount ? "active" : ""} onClick={() => updateBudget(amount)}>{amount === 0 ? "免费" : amount}</button>)}
            </div>
          </div>
        </div>
        <p className="budget-hint"><Icon name="check" size={14} /> 已找到 {affordableIdeas.length} 个预算内灵感，最高不超过 ¥{budget}</p>
      </section>

      <section id="couple-settings" className="profile-panel open" aria-label="情侣与纪念日设置">
        <div className="profile-toggle profile-heading">
          <span><Icon name="heart" size={16} /> 我们的资料与纪念日</span>
          <span>直接填写，自动保存</span>
        </div>
        <div className="profile-fields">
          <div className="avatar-editors">
            <label className="avatar-upload">
              <input type="file" accept="image/*" onChange={(event) => handleAvatar(event, setAvatarOne)} />
              <span className="avatar-preview avatar-one" style={avatarOne ? { backgroundImage: `url(${avatarOne})` } : undefined}>{!avatarOne && (personOne || "我").slice(0, 1)}</span>
              <span><Icon name="upload" size={14} /> 上传{personOne || "我的"}头像</span>
            </label>
            <label className="avatar-upload">
              <input type="file" accept="image/*" onChange={(event) => handleAvatar(event, setAvatarTwo)} />
              <span className="avatar-preview avatar-two" style={avatarTwo ? { backgroundImage: `url(${avatarTwo})` } : undefined}>{!avatarTwo && (personTwo || "TA").slice(0, 1)}</span>
              <span><Icon name="upload" size={14} /> 上传{personTwo || "TA"}头像</span>
            </label>
          </div>
          <label className="profile-field"><span>你的名字</span><input value={personOne} maxLength={8} onChange={(event) => setPersonOne(event.target.value)} placeholder="输入名字" /></label>
          <label className="profile-field"><span>TA 的名字</span><input value={personTwo} maxLength={8} onChange={(event) => setPersonTwo(event.target.value)} placeholder="输入名字" /></label>
          <label className="profile-field"><span>在一起的日期</span><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
          <label className="profile-field wide-field"><span>额外纪念日名称（可选）</span><input value={anniversaryName} maxLength={16} onChange={(event) => setAnniversaryName(event.target.value)} placeholder="例如：第一次见面" /></label>
          <label className="profile-field wide-field"><span>额外纪念日日期（可选）</span><input type="date" value={anniversaryDate} onChange={(event) => setAnniversaryDate(event.target.value)} /></label>
          <div className="settings-actions">
            <small>分享链接包含你填写的资料和压缩头像，请仅发给信任的人。</small>
            <button className="share-settings" onClick={copyShareLink}><Icon name="share" size={15} /> 复制分享链接</button>
            <button className="save-settings" onClick={() => showToast("设置已保存")}><Icon name="check" size={15} /> 保存设置</button>
          </div>
        </div>
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

      <section className="milestones-section">
        <div className="section-heading">
          <div><Icon name="calendar" size={18} /><span><b>我们的纪念日</b><small>根据在一起日期自动计算</small></span></div>
          <button onClick={scrollToSettings}><Icon name="edit" size={14} /> 修改起始日期</button>
        </div>
        <div className="milestone-grid">
          {automaticMilestones.map((item) => (
            <article className="milestone-card" key={item.name}>
              <span className="milestone-emoji">{item.emoji}</span>
              <div><b>{item.name}</b><small>{item.date} · {item.days === 0 ? "就是今天" : `还有 ${item.days} 天`}</small></div>
              <div className="progress"><i style={{ width: `${item.progress}%` }} /></div>
            </article>
          ))}
          {anniversaryDate && (
            <article className="milestone-card custom-milestone">
              <span className="milestone-emoji">✨</span>
              <div><b>{anniversaryName || "特别纪念日"}</b><small>{anniversary.label}</small></div>
              <div className="progress"><i style={{ width: `${anniversary.progress}%` }} /></div>
            </article>
          )}
        </div>
      </section>

      <footer>
        <span>Made with <Icon name="heart" size={13} /> for {personOne || "you"} & {personTwo || "me"}</span>
        <p>愿每一次约会，都比昨天更喜欢彼此。</p>
      </footer>

      <nav className="mobile-nav" aria-label="移动端导航">
        <button className="active"><Icon name="home" size={20} /><span>今天</span></button>
        <button onClick={() => showToast("约会清单还是空的，先收藏一个吧")}><Icon name="bookmark" size={20} /><span>清单</span></button>
        <button onClick={scrollToSettings}><Icon name="user" size={20} /><span>我们</span></button>
      </nav>
      <div className={`toast ${toast ? "show" : ""}`}><Icon name="check" size={17} />{toast}</div>
    </main>
  );
}
