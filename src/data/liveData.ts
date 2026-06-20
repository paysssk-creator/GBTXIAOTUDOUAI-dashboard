export interface LiveProduct {
  id: string;
  name: string;
  desc: string;
  price: number;
  originalPrice: number;
  stock: number;
  totalStock: number;
  sales: number;
  tag?: string;
  highlight?: boolean;
}

export interface ChatMessage {
  id: string;
  username: string;
  text: string;
  color: string;
  type: 'normal' | 'gift' | 'purchase';
}

export const liveProducts: LiveProduct[] = [
  {
    id: 'p1',
    name: '情趣按摩棒 豪华版',
    desc: '10频振动 · 防水静音 · USB充电 · 医用硅胶',
    price: 199,
    originalPrice: 599,
    stock: 43,
    totalStock: 200,
    sales: 1847,
    tag: '主播推荐',
    highlight: true,
  },
  {
    id: 'p2',
    name: '情侣互动游戏套装',
    desc: '亲密关系升温 · 多种玩法 · 礼盒包装',
    price: 129,
    originalPrice: 299,
    stock: 88,
    totalStock: 300,
    sales: 3210,
    tag: '爆款',
  },
  {
    id: 'p3',
    name: '高端润滑剂 水溶性',
    desc: '日本进口 · 安全无味 · 长效保湿 100ml',
    price: 59,
    originalPrice: 158,
    stock: 156,
    totalStock: 500,
    sales: 9928,
    tag: '畅销',
  },
  {
    id: 'p4',
    name: '按摩精油礼盒套装',
    desc: '天然植物提取 · 助眠解压 · 情侣SPA首选',
    price: 89,
    originalPrice: 239,
    stock: 72,
    totalStock: 200,
    sales: 2345,
  },
  {
    id: 'p5',
    name: '私密保健胶囊 正品',
    desc: '天然草本配方 · 30粒/盒 · 厂家直营',
    price: 168,
    originalPrice: 380,
    stock: 201,
    totalStock: 600,
    sales: 5621,
    tag: '新品',
  },
  {
    id: 'p6',
    name: '舒缓眼罩 温热款',
    desc: '蒸汽热敷 · 10片装 · 助眠减压',
    price: 39,
    originalPrice: 99,
    stock: 320,
    totalStock: 500,
    sales: 12800,
  },
];

export const initialMessages: ChatMessage[] = [
  { id: '1', username: '用户4399', text: '主播讲得好！', color: '#f59e0b', type: 'normal' },
  { id: '2', username: '夜猫子007', text: '已下单！等收货', color: '#10b981', type: 'purchase' },
  { id: '3', username: '小白兔666', text: '这个价格绝了，直接拍！', color: '#a78bfa', type: 'normal' },
  { id: '4', username: '深夜狂欢', text: '送了一个玫瑰', color: '#f43f5e', type: 'gift' },
  { id: '5', username: '匿名用户', text: '比旗舰店便宜一半，冲！', color: '#38bdf8', type: 'normal' },
  { id: '6', username: '买买买888', text: '主播能再介绍一下吗', color: '#f59e0b', type: 'normal' },
];

export const mockMessages: Omit<ChatMessage, 'id'>[] = [
  { username: '幸福夫妻档', text: '已购！这款真的好用', color: '#10b981', type: 'purchase' },
  { username: '夜晚的秘密', text: '主播多讲讲使用方法', color: '#f59e0b', type: 'normal' },
  { username: '用户5566', text: '直播间专属价太香了', color: '#a78bfa', type: 'normal' },
  { username: '小花花777', text: '送了一个心心', color: '#f43f5e', type: 'gift' },
  { username: '午夜探险家', text: '包邮吗？', color: '#38bdf8', type: 'normal' },
  { username: '快乐星球人', text: '第二次复购！非常满意', color: '#10b981', type: 'purchase' },
  { username: '用户2024', text: '朋友推荐来的，下单了', color: '#f59e0b', type: 'normal' },
  { username: '路人甲乙丙', text: '主播声音好好听', color: '#a78bfa', type: 'normal' },
  { username: '购物达人99', text: '送了10个玫瑰', color: '#f43f5e', type: 'gift' },
  { username: '嗨购季', text: '套餐还有吗', color: '#38bdf8', type: 'normal' },
  { username: '买买买888', text: '已买！快递超快', color: '#10b981', type: 'purchase' },
  { username: '神秘买家x', text: '第三件了，回头客', color: '#f59e0b', type: 'normal' },
];

export const hostInfo = {
  name: '夜夕小姐姐',
  avatar: '夜',
  followers: '128.6万',
  badge: '认证主播',
  roomTitle: '【夜间专场】私密福利🔥超低价 · 直播间限量抢',
  onlineCount: 24368,
  likeCount: 89.2,
};
