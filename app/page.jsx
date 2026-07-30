"use client";

import { useEffect, useMemo, useState } from "react";

const featuredIdeas = [
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

const cityProfiles = [
  { name: "北京", lat: 39.90, lng: 116.40, tags: ["都市", "历史", "艺术", "北方"], spots: ["什刹海", "亮马河", "798 艺术区"] },
  { name: "上海", lat: 31.23, lng: 121.47, tags: ["都市", "滨水", "艺术"], spots: ["苏州河", "西岸", "武康路"] },
  { name: "广州", lat: 23.13, lng: 113.26, tags: ["都市", "美食", "南方"], spots: ["珠江边", "东山口", "永庆坊"] },
  { name: "深圳", lat: 22.54, lng: 114.06, tags: ["都市", "滨海", "艺术"], spots: ["深圳湾", "华侨城", "大鹏半岛"] },
  { name: "成都", lat: 30.57, lng: 104.07, tags: ["休闲", "美食", "历史"], spots: ["望平街", "浣花溪", "玉林路"] },
  { name: "重庆", lat: 29.56, lng: 106.55, tags: ["山城", "夜景", "美食"], spots: ["南滨路", "鹅岭", "山城步道"] },
  { name: "杭州", lat: 30.27, lng: 120.15, tags: ["滨水", "历史", "自然"], spots: ["西湖边", "运河畔", "九溪"] },
  { name: "南京", lat: 32.06, lng: 118.80, tags: ["历史", "滨水", "艺术"], spots: ["玄武湖", "颐和路", "秦淮河"] },
  { name: "武汉", lat: 30.59, lng: 114.30, tags: ["滨水", "校园", "美食"], spots: ["东湖", "汉口江滩", "黎黄陂路"] },
  { name: "西安", lat: 34.34, lng: 108.94, tags: ["历史", "北方", "美食"], spots: ["城墙边", "大明宫", "曲江池"] },
  { name: "苏州", lat: 31.30, lng: 120.58, tags: ["历史", "滨水", "园林"], spots: ["平江路", "金鸡湖", "山塘街"] },
  { name: "长沙", lat: 28.23, lng: 112.94, tags: ["美食", "夜景", "都市"], spots: ["湘江边", "潮宗街", "梅溪湖"] },
  { name: "青岛", lat: 36.07, lng: 120.38, tags: ["滨海", "北方", "艺术"], spots: ["小麦岛", "八大关", "栈桥"] },
  { name: "厦门", lat: 24.48, lng: 118.09, tags: ["滨海", "艺术", "休闲"], spots: ["环岛路", "沙坡尾", "鼓浪屿"] },
  { name: "大连", lat: 38.91, lng: 121.61, tags: ["滨海", "北方", "自然"], spots: ["星海湾", "东港", "滨海路"] },
  { name: "昆明", lat: 25.04, lng: 102.71, tags: ["自然", "休闲", "南方"], spots: ["翠湖", "滇池", "斗南花市"] },
  { name: "三亚", lat: 18.25, lng: 109.51, tags: ["滨海", "南方", "自然"], spots: ["椰梦长廊", "后海村", "鹿回头"] },
  { name: "哈尔滨", lat: 45.80, lng: 126.53, tags: ["北方", "冰雪", "历史"], spots: ["松花江畔", "中央大街", "太阳岛"] },
  { name: "天津", lat: 39.09, lng: 117.20, tags: ["北方", "历史", "滨水"], spots: ["海河边", "五大道", "意式风情区"] },
  { name: "郑州", lat: 34.75, lng: 113.62, tags: ["北方", "历史", "都市"], spots: ["如意湖", "商都遗址", "二砂文创园"] },
  { name: "济南", lat: 36.67, lng: 116.98, tags: ["北方", "滨水", "历史"], spots: ["大明湖", "曲水亭街", "百花洲"] },
  { name: "合肥", lat: 31.82, lng: 117.23, tags: ["都市", "自然", "滨水"], spots: ["天鹅湖", "环城公园", "逍遥津"] },
  { name: "福州", lat: 26.08, lng: 119.30, tags: ["滨海", "历史", "南方"], spots: ["烟台山", "三坊七巷", "西湖公园"] },
  { name: "宁波", lat: 29.87, lng: 121.55, tags: ["滨海", "滨水", "历史"], spots: ["老外滩", "月湖", "东钱湖"] },
  { name: "无锡", lat: 31.49, lng: 120.31, tags: ["滨水", "园林", "历史"], spots: ["蠡湖", "南长街", "惠山古镇"] },
  {
    name: "常州",
    lat: 31.81,
    lng: 119.97,
    tags: ["历史", "滨水", "艺术", "自然"],
    spots: ["天宁区 · 青果巷", "钟楼区 · 运河五号", "武进区 · 西太湖"],
    spotGroups: {
      free: ["天宁区 · 红梅公园", "天宁区 · 青果巷", "钟楼区 · 青枫公园", "武进区 · 西太湖揽月湾"],
      culture: ["天宁区 · 青果巷", "钟楼区 · 运河五号创意街区", "新北区 · 常州文化广场与博物馆", "武进区 · 淹城遗址公园"],
      nature: ["武进区 · 西太湖湖岸线", "钟楼区 · 青枫公园", "天宁区 · 红梅公园", "溧阳市 · 天目湖"],
      premium: ["新北区 · 中华恐龙园与迪诺水镇", "武进区 · 淹城春秋乐园", "金坛区 · 东方盐湖城", "溧阳市 · 天目湖与南山竹海"],
    },
  },
  { name: "珠海", lat: 22.27, lng: 113.58, tags: ["滨海", "休闲", "南方"], spots: ["情侣路", "香山云道", "唐家湾"] },
  { name: "佛山", lat: 23.02, lng: 113.12, tags: ["美食", "历史", "南方"], spots: ["岭南天地", "千灯湖", "顺峰山"] },
  { name: "南宁", lat: 22.82, lng: 108.37, tags: ["南方", "自然", "美食"], spots: ["邕江边", "青秀山", "三街两巷"] },
  { name: "贵阳", lat: 26.65, lng: 106.63, tags: ["山城", "自然", "美食"], spots: ["观山湖", "青云市集", "黔灵山"] },
  { name: "兰州", lat: 36.06, lng: 103.83, tags: ["北方", "美食", "滨水"], spots: ["黄河边", "白塔山", "中山桥"] },
  { name: "乌鲁木齐", lat: 43.83, lng: 87.62, tags: ["北方", "自然", "美食"], spots: ["红山公园", "南湖广场", "水磨沟"] },
  { name: "沈阳", lat: 41.80, lng: 123.43, tags: ["北方", "历史", "艺术"], spots: ["青年公园", "中街", "红梅文创园"] },
  { name: "长春", lat: 43.82, lng: 125.32, tags: ["北方", "自然", "电影"], spots: ["南湖公园", "新民大街", "净月潭"] },
  { name: "太原", lat: 37.87, lng: 112.55, tags: ["北方", "历史", "自然"], spots: ["汾河公园", "晋阳湖", "钟楼街"] },
  { name: "南昌", lat: 28.68, lng: 115.86, tags: ["滨水", "历史", "美食"], spots: ["赣江边", "八一公园", "万寿宫"] },
  { name: "海口", lat: 20.04, lng: 110.20, tags: ["滨海", "南方", "休闲"], spots: ["云洞图书馆", "骑楼老街", "西秀海滩"] },
];

const regionGroups = [
  ["北京市", ["北京"]],
  ["天津市", ["天津"]],
  ["河北省", ["石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水"]],
  ["山西省", ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"]],
  ["内蒙古自治区", ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安盟", "锡林郭勒盟", "阿拉善盟"]],
  ["辽宁省", ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"]],
  ["吉林省", ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边州"]],
  ["黑龙江省", ["哈尔滨", "齐齐哈尔", "鸡西", "鹤岗", "双鸭山", "大庆", "伊春", "佳木斯", "七台河", "牡丹江", "黑河", "绥化", "大兴安岭"]],
  ["上海市", ["上海"]],
  ["江苏省", ["南京", "无锡", "徐州", "常州", "苏州", "南通", "连云港", "淮安", "盐城", "扬州", "镇江", "泰州", "宿迁"]],
  ["浙江省", ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"]],
  ["安徽省", ["合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "滁州", "阜阳", "宿州", "六安", "亳州", "池州", "宣城"]],
  ["福建省", ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"]],
  ["江西省", ["南昌", "景德镇", "萍乡", "九江", "新余", "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶"]],
  ["山东省", ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "临沂", "德州", "聊城", "滨州", "菏泽"]],
  ["河南省", ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "南阳", "商丘", "信阳", "周口", "驻马店", "济源"]],
  ["湖北省", ["武汉", "黄石", "十堰", "宜昌", "襄阳", "鄂州", "荆门", "孝感", "荆州", "黄冈", "咸宁", "随州", "恩施州", "仙桃", "潜江", "天门", "神农架"]],
  ["湖南省", ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西州"]],
  ["广东省", ["广州", "深圳", "珠海", "汕头", "佛山", "韶关", "湛江", "肇庆", "江门", "茂名", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳", "云浮"]],
  ["广西壮族自治区", ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "来宾", "崇左"]],
  ["海南省", ["海口", "三亚", "三沙", "儋州", "五指山", "琼海", "文昌", "万宁", "东方"]],
  ["重庆市", ["重庆"]],
  ["四川省", ["成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "南充", "眉山", "宜宾", "广安", "达州", "雅安", "巴中", "资阳", "阿坝州", "甘孜州", "凉山州"]],
  ["贵州省", ["贵阳", "六盘水", "遵义", "安顺", "毕节", "铜仁", "黔西南州", "黔东南州", "黔南州"]],
  ["云南省", ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "楚雄州", "红河州", "文山州", "西双版纳州", "大理州", "德宏州", "怒江州", "迪庆州"]],
  ["西藏自治区", ["拉萨", "日喀则", "昌都", "林芝", "山南", "那曲", "阿里地区"]],
  ["陕西省", ["西安", "铜川", "宝鸡", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛"]],
  ["甘肃省", ["兰州", "嘉峪关", "金昌", "白银", "天水", "武威", "张掖", "平凉", "酒泉", "庆阳", "定西", "陇南", "临夏州", "甘南州"]],
  ["青海省", ["西宁", "海东", "海北州", "黄南州", "海南州", "果洛州", "玉树州", "海西州"]],
  ["宁夏回族自治区", ["银川", "石嘴山", "吴忠", "固原", "中卫"]],
  ["新疆维吾尔自治区", ["乌鲁木齐", "克拉玛依", "吐鲁番", "哈密", "昌吉州", "博尔塔拉州", "巴音郭楞州", "阿克苏地区", "克孜勒苏州", "喀什地区", "和田地区", "伊犁州", "塔城地区", "阿勒泰地区", "石河子"]],
  ["香港特别行政区", ["香港"]],
  ["澳门特别行政区", ["澳门"]],
  ["台湾省", ["台北", "新北", "桃园", "台中", "台南", "高雄", "基隆", "新竹", "嘉义", "宜兰", "花莲", "台东"]],
];

const provinceTags = {
  "北京市": ["都市", "历史", "艺术"], "天津市": ["北方", "滨水", "历史"],
  "河北省": ["北方", "历史", "自然"], "山西省": ["北方", "历史", "自然"],
  "内蒙古自治区": ["北方", "自然", "休闲"], "辽宁省": ["北方", "滨海", "历史"],
  "吉林省": ["北方", "冰雪", "自然"], "黑龙江省": ["北方", "冰雪", "自然"],
  "上海市": ["都市", "滨水", "艺术"], "江苏省": ["滨水", "历史", "园林"],
  "浙江省": ["滨水", "历史", "自然"], "安徽省": ["历史", "自然", "滨水"],
  "福建省": ["滨海", "历史", "南方"], "江西省": ["滨水", "历史", "自然"],
  "山东省": ["北方", "滨海", "历史"], "河南省": ["北方", "历史", "美食"],
  "湖北省": ["滨水", "历史", "美食"], "湖南省": ["美食", "自然", "夜景"],
  "广东省": ["都市", "美食", "南方"], "广西壮族自治区": ["南方", "自然", "美食"],
  "海南省": ["滨海", "南方", "休闲"], "重庆市": ["山城", "夜景", "美食"],
  "四川省": ["自然", "美食", "休闲"], "贵州省": ["山城", "自然", "美食"],
  "云南省": ["自然", "休闲", "南方"], "西藏自治区": ["自然", "北方", "冒险"],
  "陕西省": ["北方", "历史", "美食"], "甘肃省": ["北方", "历史", "自然"],
  "青海省": ["北方", "自然", "冒险"], "宁夏回族自治区": ["北方", "自然", "历史"],
  "新疆维吾尔自治区": ["北方", "自然", "美食"], "香港特别行政区": ["都市", "滨海", "美食"],
  "澳门特别行政区": ["都市", "历史", "美食"], "台湾省": ["滨海", "美食", "自然"],
};

function findProvinceByCity(cityName) {
  return regionGroups.find(([, cities]) => cities.includes(cityName))?.[0] || "上海市";
}

function chooseCitySpot(idea, profile) {
  if (!profile.spotGroups) return profile.spots[idea.id % profile.spots.length];
  let group = "culture";
  if (idea.costMin >= 300) group = "premium";
  else if (idea.costMax <= 120) group = "free";
  else if (idea.cityTags?.some((tag) => ["自然", "滨水", "滨海", "山城"].includes(tag))) group = "nature";
  const choices = profile.spotGroups[group];
  return choices[idea.id % choices.length];
}

const ideaSeeds = [
  ["咖啡风味盲测", "☕", 40, 140, ["松弛", "好玩"], ["都市", "艺术"], "独立咖啡店"],
  ["夜晚骑行追风", "🚲", 0, 60, ["冒险", "松弛"], ["滨水", "滨海", "都市"], "城市骑行道"],
  ["唱片店交换一首歌", "💿", 30, 180, ["浪漫", "松弛"], ["艺术", "都市", "电影"], "唱片店"],
  ["逛早市做早餐", "🥬", 30, 120, ["好玩", "宅家"], ["美食", "历史"], "本地早市"],
  ["水族馆看蓝色世界", "🐠", 180, 500, ["浪漫", "松弛"], ["滨海", "都市"], "海洋馆"],
  ["天文馆寻找同一颗星", "🪐", 80, 300, ["浪漫", "好玩"], ["都市", "北方"], "天文馆"],
  ["拍一组复古大头贴", "📸", 30, 100, ["好玩", "浪漫"], ["都市", "艺术"], "拍照馆"],
  ["挑战双人密室", "🔐", 160, 420, ["冒险", "好玩"], ["都市", "历史"], "主题密室"],
  ["攀岩馆互相保护", "🧗", 180, 480, ["冒险", "好玩"], ["都市", "山城"], "攀岩馆"],
  ["轮滑场牵手练习", "🛼", 100, 300, ["好玩", "浪漫"], ["都市", "北方"], "轮滑场"],
  ["打一场双人羽毛球", "🏸", 40, 160, ["好玩", "松弛"], ["都市", "校园"], "运动中心"],
  ["参加一节料理课", "🥘", 240, 700, ["宅家", "好玩"], ["美食", "都市"], "料理教室"],
  ["去郊外露营看云", "⛺", 200, 900, ["冒险", "松弛"], ["自然", "山城"], "近郊营地"],
  ["一起准备一顿烧烤", "🍢", 120, 400, ["好玩", "松弛"], ["自然", "滨水"], "户外营地"],
  ["听一场爵士现场", "🎷", 160, 600, ["浪漫", "松弛"], ["艺术", "都市"], "爵士酒馆"],
  ["去 Livehouse 听歌", "🎸", 180, 680, ["好玩", "冒险"], ["艺术", "都市"], "音乐现场"],
  ["看一场脱口秀", "🎙️", 120, 420, ["好玩", "松弛"], ["都市", "艺术"], "小剧场"],
  ["博物馆寻宝游戏", "🏛️", 0, 160, ["好玩", "松弛"], ["历史", "艺术"], "博物馆"],
  ["去海边捡一枚贝壳", "🐚", 20, 180, ["浪漫", "松弛"], ["滨海"], "海岸线"],
  ["爬到城市高处看落日", "🌄", 0, 120, ["冒险", "浪漫"], ["山城", "自然"], "观景步道"],
  ["植物园寻找心形叶子", "🌿", 20, 160, ["松弛", "浪漫"], ["自然", "南方"], "植物园"],
  ["动物园认领今日最爱", "🦒", 80, 300, ["好玩", "松弛"], ["自然", "都市"], "动物园"],
  ["做一件双人手作", "🧶", 120, 480, ["好玩", "浪漫"], ["艺术", "历史"], "手作工坊"],
  ["调一瓶彼此的香气", "🧴", 260, 900, ["浪漫", "好玩"], ["都市", "艺术"], "香氛工作室"],
  ["做一对情侣银戒", "💍", 400, 1600, ["浪漫", "好玩"], ["都市", "艺术"], "金工工作室"],
  ["安排一次双人 SPA", "🧖", 500, 1800, ["松弛", "浪漫"], ["都市", "休闲"], "水疗中心"],
  ["互拍一组城市写真", "📷", 0, 600, ["浪漫", "好玩"], ["艺术", "历史", "滨水"], "城市街区"],
  ["体验一场茶席", "🍵", 100, 500, ["松弛", "浪漫"], ["历史", "园林"], "茶空间"],
  ["尝一轮特色甜品", "🍰", 60, 260, ["好玩", "松弛"], ["美食", "都市"], "甜品街区"],
  ["夜市限定美食挑战", "🌮", 60, 240, ["好玩", "冒险"], ["美食", "夜景"], "夜市"],
  ["一起去湖边钓鱼", "🎣", 80, 320, ["松弛", "冒险"], ["滨水", "自然"], "湖边"],
  ["划一艘双人皮划艇", "🛶", 180, 600, ["冒险", "好玩"], ["滨水", "滨海"], "水上运动中心"],
  ["去滑雪场摔进雪里", "🎿", 500, 1800, ["冒险", "好玩"], ["冰雪", "北方"], "滑雪场"],
  ["体验一次冲浪课程", "🏄", 400, 1400, ["冒险", "好玩"], ["滨海", "南方"], "冲浪海滩"],
  ["看一场演唱会", "🎫", 600, 2600, ["浪漫", "好玩"], ["都市", "艺术"], "演出场馆"],
  ["看一部音乐剧", "🎭", 300, 1600, ["浪漫", "松弛"], ["都市", "艺术"], "剧院"],
  ["坐轮渡看两岸夜色", "⛴️", 20, 180, ["浪漫", "松弛"], ["滨水", "滨海"], "轮渡码头"],
  ["去郊外认真看星星", "🌌", 60, 500, ["浪漫", "冒险"], ["自然", "北方"], "近郊观星点"],
  ["为一场日出早起", "🌞", 0, 160, ["浪漫", "冒险"], ["滨海", "自然", "山城"], "日出观景点"],
  ["跳蚤市场交换礼物", "🎁", 20, 200, ["好玩", "松弛"], ["历史", "艺术"], "周末市集"],
  ["古着店为彼此搭配", "🧥", 80, 500, ["好玩", "浪漫"], ["都市", "艺术"], "古着街区"],
  ["在家安排双人护理", "🫧", 40, 220, ["宅家", "松弛"], ["都市", "休闲"], "家里"],
  ["合作通关一款游戏", "🎮", 0, 300, ["宅家", "好玩"], ["都市", "校园"], "家里或电竞馆"],
  ["拼完一幅属于你们的拼图", "🧩", 30, 180, ["宅家", "松弛"], ["都市", "休闲"], "家里"],
  ["沿老街寻找城市故事", "🗺️", 0, 100, ["冒险", "松弛"], ["历史", "艺术"], "历史街区"],
];

const ideaModes = [
  { name: "轻量版", factor: 0.72, subtitle: "少一点安排，多一点随心" },
  { name: "经典版", factor: 1, subtitle: "刚刚好的仪式感和松弛感" },
  { name: "升级版", factor: 1.35, subtitle: "把体验做得更完整一点" },
  { name: "纪念日版", factor: 1.7, subtitle: "适合值得认真庆祝的日子" },
];

const ideaGradients = ["sunset", "pasta", "book", "bus", "cinema", "flower", "picnic", "gallery", "trip", "citywalk", "breakfast", "pottery", "boardgame", "cake", "dinner", "onsen", "park", "hotel", "letter", "karaoke"];

const generatedIdeas = ideaSeeds.flatMap((seed, seedIndex) => ideaModes.map((mode, modeIndex) => {
  const [title, emoji, baseMin, baseMax, mood, cityTags, place] = seed;
  const costMin = Math.round((baseMin * mode.factor) / 10) * 10;
  const costMax = Math.max(costMin, Math.round((baseMax * mode.factor) / 10) * 10);
  return {
    id: 23 + seedIndex * ideaModes.length + modeIndex,
    title: `${title} · ${mode.name}`,
    subtitle: mode.subtitle,
    emoji,
    mood,
    cityTags,
    costMin,
    costMax,
    time: modeIndex < 2 ? "1–3 小时" : "半天",
    place,
    gradient: ideaGradients[(seedIndex + modeIndex) % ideaGradients.length],
    plan: [`一起选定最期待的环节`, `把花费控制在 ¥${costMin}–${costMax}`, "为今天留下一张照片或一句话"],
  };
})).slice(0, 200 - featuredIdeas.length);

const dateIdeas = [...featuredIdeas, ...generatedIdeas];
const moods = ["随心", "浪漫", "好玩", "松弛", "宅家", "冒险"];
const budgetRanges = [[0, 100], [100, 300], [300, 800], [800, 3000]];
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
  const [budgetMin, setBudgetMin] = useState(0);
  const [budgetMax, setBudgetMax] = useState(300);
  const [selectedProvince, setSelectedProvince] = useState("上海市");
  const [selectedCity, setSelectedCity] = useState("上海");
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
      if (Number.isFinite(stored.budgetMin)) setBudgetMin(stored.budgetMin);
      if (Number.isFinite(stored.budgetMax)) setBudgetMax(stored.budgetMax);
      if (!Number.isFinite(stored.budgetMax) && Number.isFinite(stored.budget)) setBudgetMax(stored.budget);
      if (regionGroups.some(([province]) => province === stored.selectedProvince)) setSelectedProvince(stored.selectedProvince);
      if (regionGroups.some(([, cities]) => cities.includes(stored.selectedCity))) {
        setSelectedCity(stored.selectedCity);
        if (!stored.selectedProvince) setSelectedProvince(findProvinceByCity(stored.selectedCity));
      }
    } catch {
      // Keep the friendly defaults when saved data is unavailable.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify({
      personOne, personTwo, startDate, anniversaryName, anniversaryDate,
      avatarOne, avatarTwo, budgetMin, budgetMax, selectedProvince, selectedCity,
    }));
  }, [personOne, personTwo, startDate, anniversaryName, anniversaryDate, avatarOne, avatarTwo, budgetMin, budgetMax, selectedProvince, selectedCity, hydrated]);

  const provinceCities = useMemo(
    () => regionGroups.find(([province]) => province === selectedProvince)?.[1] || ["上海"],
    [selectedProvince],
  );

  const cityProfile = useMemo(
    () => cityProfiles.find((city) => city.name === selectedCity) || {
      name: selectedCity,
      tags: provinceTags[selectedProvince] || ["都市", "自然", "历史"],
      spots: ["城市公园", "老街", "滨水步道"],
    },
    [selectedProvince, selectedCity],
  );

  const cityIdeas = useMemo(() => dateIdeas.filter((idea) => {
    if (!idea.cityTags?.length) return true;
    return idea.cityTags.some((tag) => cityProfile.tags.includes(tag));
  }), [cityProfile]);

  const affordableIdeas = useMemo(() => cityIdeas.filter(
    (idea) => idea.costMax >= budgetMin && idea.costMin <= budgetMax,
  ), [cityIdeas, budgetMin, budgetMax]);

  const filtered = useMemo(() => {
    const pool = affordableIdeas.filter((idea) => mood === "随心" || idea.mood.includes(mood));
    return pool.length ? pool : affordableIdeas;
  }, [affordableIdeas, mood]);

  useEffect(() => {
    const available = filtered.length ? filtered : cityIdeas.slice(0, 1);
    if (!available.some((idea) => idea.id === currentId)) setCurrentId(available[0].id);
  }, [filtered, cityIdeas, currentId]);

  const current = dateIdeas.find((idea) => idea.id === currentId) || dateIdeas[0];
  const currentPlace = `${selectedCity} · ${current.cityTags?.length || cityProfile.spotGroups
    ? chooseCitySpot(current, cityProfile)
    : current.place}`;
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
    const pool = filtered.length ? filtered : cityIdeas.slice(0, 1);
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

  const updateBudgetRange = (minimum, maximum) => {
    const nextMin = Math.max(0, Math.min(99999, Number(minimum) || 0));
    const nextMax = Math.max(nextMin, Math.min(99999, Number(maximum) || 0));
    setBudgetMin(nextMin);
    setBudgetMax(nextMax);
    setSaved(false);
  };

  const changeProvince = (province) => {
    const cities = regionGroups.find(([name]) => name === province)?.[1] || ["上海"];
    setSelectedProvince(province);
    setSelectedCity(cities[0]);
  };

  const updateMinimum = (value) => {
    const next = Math.max(0, Math.min(99999, Number(value) || 0));
    setBudgetMin(Math.min(next, budgetMax));
  };

  const updateMaximum = (value) => {
    const next = Math.max(0, Math.min(99999, Number(value) || 0));
    setBudgetMax(Math.max(next, budgetMin));
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
      avatarOne, avatarTwo, budgetMin, budgetMax, selectedProvince, selectedCity,
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

  const locateCity = () => {
    if (!navigator.geolocation) {
      showToast("当前浏览器不支持定位");
      return;
    }
    showToast("正在匹配最近的城市…");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nearest = cityProfiles.reduce((best, city) => {
          const latScale = Math.cos((coords.latitude * Math.PI) / 180);
          const distance = ((city.lat - coords.latitude) ** 2)
            + (((city.lng - coords.longitude) * latScale) ** 2);
          return !best || distance < best.distance ? { city, distance } : best;
        }, null);
        setSelectedCity(nearest.city.name);
        setSelectedProvince(findProvinceByCity(nearest.city.name));
        showToast(`已定位到 ${nearest.city.name}`);
      },
      () => showToast("定位失败，请手动选择城市"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 },
    );
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
        <div className="control-group location-row">
          <div className="control-title"><span>所在城市</span><small>灵感会随城市变化</small></div>
          <div className="location-control">
            <label className="city-select province-select"><select value={selectedProvince} onChange={(event) => changeProvince(event.target.value)} aria-label="选择省级地区">
              {regionGroups.map(([province]) => <option key={province} value={province}>{province}</option>)}
            </select></label>
            <label className="city-select"><Icon name="pin" size={16} /><select value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)} aria-label="选择城市">
              {provinceCities.map((city) => <option key={city} value={city}>{city}</option>)}
            </select></label>
            <button onClick={locateCity}><Icon name="pin" size={14} /> 自动定位</button>
            <span>{cityProfile.tags.slice(0, 3).join(" · ")}</span>
          </div>
        </div>
        <div className="divider" />
        <div className="control-group budget-row">
          <div className="control-title"><span>价格区间</span><small>两个人的总预算</small></div>
          <div className="budget-control">
            <div className="range-inputs">
              <label className="money-input"><span>¥</span><input type="number" min="0" max="99999" value={budgetMin} onFocus={(event) => event.target.select()} onChange={(event) => updateMinimum(event.target.value)} aria-label="最低预算" /></label>
              <i>至</i>
              <label className="money-input"><span>¥</span><input type="number" min="0" max="99999" value={budgetMax} onFocus={(event) => event.target.select()} onChange={(event) => updateMaximum(event.target.value)} aria-label="最高预算" /></label>
            </div>
            <div className="budget-presets">
              {budgetRanges.map(([minimum, maximum]) => <button key={`${minimum}-${maximum}`} className={budgetMin === minimum && budgetMax === maximum ? "active" : ""} onClick={() => updateBudgetRange(minimum, maximum)}>¥{minimum}–{maximum === 3000 ? "3000+" : maximum}</button>)}
            </div>
          </div>
        </div>
        <p className="budget-hint"><Icon name="check" size={14} /> {selectedCity}已找到 {affordableIdeas.length} 个 ¥{budgetMin}–{budgetMax} 区间灵感 · 灵感库共 {dateIdeas.length} 个</p>
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
              <span><Icon name="pin" size={17} />{currentPlace}</span>
              <span className="cost">约 ¥{current.costMin}–{current.costMax}</span>
            </div>
            <ol className="mini-plan">
              {current.plan.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
            </ol>
          </div>
        </div>
        <button className="primary-button" onClick={pickIdea} disabled={revealing}>
          <Icon name="rotate" size={19} />{revealing ? "正在寻找心动…" : `换一个${selectedCity}灵感`}
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
