export const prompts = [
  // ChatGPT 职场办公
  {
    id: 'chatgpt-email-001',
    title: '专业邮件写作模板',
    description: '包含开场白、主体、结尾的专业邮件模板，适用于商务沟通、客户服务、内部协作等场景。',
    content: `你是一个专业的商务邮件写作助手。请根据以下信息帮我写一封专业的商务邮件：

邮件主题：{主题}
收件人：{收件人}
语气：{正式/友好/中性}
主要内容：{描述你想要传达的核心信息}

要求：
- 结构清晰：开场白 → 核心内容 → 行动号召 → 礼貌结尾
- 语言专业得体，避免口语化
- 适当使用商务礼貌用语
- 长度适中（150-300字）`,
    price: 0,
    platform: 'ChatGPT',
    category: '职场办公',
    tags: ['邮件', '商务', '写作'],
    rating: 4.8,
    ratingCount: 256,
    salesCount: 1280,
    creator: {
      name: '职场达人',
      avatar: '👨‍💼',
      sales: 5680,
    },
    coverImage: '📧',
    isHot: true,
    createdAt: '2026-03-01',
  },
  {
    id: 'chatgpt-meeting-001',
    title: '会议纪要AI整理模板',
    description: '自动整理会议要点，提取待办事项，生成结构清晰的会议纪要文档。',
    content: `你是一个专业的会议纪要助手。请根据以下会议记录，帮我生成一份结构清晰的会议纪要：

会议主题：{主题}
会议时间：{时间}
参会人员：{人员}

会议记录：
{粘贴会议录音或笔记}

请按以下格式输出：
1. 会议基本信息
2. 讨论要点（按话题分类）
3. 决议事项
4. 待办事项（包含负责人和截止时间）
5. 下次会议安排`,
    price: 0,
    platform: 'ChatGPT',
    category: '职场办公',
    tags: ['会议', '效率', '文档'],
    rating: 4.9,
    ratingCount: 512,
    salesCount: 3200,
    creator: {
      name: '效率达人',
      avatar: '⚡',
      sales: 8900,
    },
    coverImage: '📝',
    isHot: true,
    createdAt: '2026-03-05',
  },
  // Midjourney 图像生成
  {
    id: 'mj-landscape-001',
    title: '绝美风景摄影咒语',
    description: '生成震撼人心的自然风景摄影，包含日出日落、雪山大海、森林草原等场景。',
    content: `Create a breathtaking landscape photograph of {场景描述}, shot with a Canon EOS R5, 24-70mm f/2.8 lens. 

The image should feature:
- Golden hour lighting with warm, diffused sunlight
- Dramatic clouds and atmospheric depth
- Rich colors with natural saturation
- Professional grade sharpness and clarity
- --ar 16:9 --style raw --v 6 --q 2

场景关键词：中国山水、桂林、张家界、黄山等（可替换）`,
    price: 29,
    platform: 'Midjourney',
    category: 'AI绘画',
    tags: ['风景', '摄影', '自然'],
    rating: 4.7,
    ratingCount: 892,
    salesCount: 4560,
    creator: {
      name: 'AI摄影师',
      avatar: '📷',
      sales: 12000,
    },
    coverImage: '🏔️',
    isHot: true,
    createdAt: '2026-02-20',
  },
  {
    id: 'mj-portrait-001',
    title: '人像摄影高级咒语',
    description: '生成专业级别人像摄影作品，适合写真、模特拍摄参考。',
    content: `Create a stunning professional portrait photograph of {人物描述}, shot with Sony A7R IV, 85mm f/1.4 GM lens.

Style requirements:
- Soft, natural lighting with subtle rim light
- Shallow depth of field (f/1.8-2.8)
- Warm, skin-toned color grading
- Detailed textures in hair and skin
- Professional bokeh in background
- --ar 4:5 --style raw --v 6 --q 2`,
    price: 39,
    platform: 'Midjourney',
    category: 'AI绘画',
    tags: ['人像', '摄影', '专业'],
    rating: 4.6,
    ratingCount: 654,
    salesCount: 3200,
    creator: {
      name: 'AI摄影师',
      avatar: '📷',
      sales: 12000,
    },
    coverImage: '👤',
    createdAt: '2026-02-25',
  },
  // Claude 编程开发
  {
    id: 'claude-code-001',
    title: '代码审查专家提示词',
    description: '让Claude扮演资深代码审查员，找出Bug、性能问题、安全漏洞。',
    content: `你是一个有10年经验的高级软件工程师，擅长代码审查。请帮我审查以下代码：

编程语言：{语言}
代码类型：{Web后端/前端/移动端/嵌入式等}

代码：
\`\`\`
{粘贴代码}
\`\`\`

请从以下维度进行审查：
1. **代码质量**：命名规范、注释、结构清晰度
2. **性能问题**：时间/空间复杂度、可能的性能瓶颈
3. **安全漏洞**：注入、越权、敏感信息泄露等
4. **最佳实践**：是否符合该语言的编码规范
5. **可维护性**：扩展性、耦合度、测试覆盖

每个问题请给出严重程度（高/中/低）和具体的修改建议。`,
    price: 0,
    platform: 'Claude',
    category: '编程开发',
    tags: ['代码审查', 'Bug修复', '安全'],
    rating: 4.9,
    ratingCount: 1024,
    salesCount: 8900,
    creator: {
      name: 'CodeMaster',
      avatar: '💻',
      sales: 25000,
    },
    coverImage: '🔍',
    isHot: true,
    createdAt: '2026-03-10',
  },
  {
    id: 'claude-doc-001',
    title: '技术文档生成器',
    description: '根据代码自动生成专业的API文档和使用说明。',
    content: `你是一个专业的技术文档工程师。请根据以下代码生成完整的文档：

代码语言：{语言}
项目简介：{简介}

代码：
\`\`\`
{粘贴代码}
\`\`\`

请生成以下文档：
1. **概述**：功能介绍、使用场景
2. **安装指南**：依赖环境、安装步骤
3. **API文档**：每个函数/类的说明、参数、返回值、示例
4. **使用示例**：基础用法、高级用法、常见场景
5. **注意事项**：已知问题、限制条件、兼容性`,
    price: 19,
    platform: 'Claude',
    category: '编程开发',
    tags: ['文档', 'API', '自动化'],
    rating: 4.7,
    ratingCount: 432,
    salesCount: 2100,
    creator: {
      name: 'DocWriter',
      avatar: '📚',
      sales: 8900,
    },
    coverImage: '📄',
    createdAt: '2026-03-12',
  },
  // Stable Diffusion 艺术创作
  {
    id: 'sd-anime-001',
    title: '动漫角色设计咒语',
    description: '生成高质量动漫角色立绘，适合游戏原画、IP设计参考。',
    content: `Create an anime character illustration of {角色描述}, in the style of Studio Ghibli and Makoto Shinkai combined.

Style elements:
- Vibrant, saturated colors
- Soft cel-shading with clean linework
- Detailed background with atmospheric perspective
- Character should be centered, full body or half-body
- High quality, masterpiece level
- --ar 3:4 --style anime --v 6`,
    price: 25,
    platform: 'Stable Diffusion',
    category: 'AI绘画',
    tags: ['动漫', '角色', '游戏'],
    rating: 4.8,
    ratingCount: 723,
    salesCount: 5600,
    creator: {
      name: 'AnimeArtist',
      avatar: '🎨',
      sales: 18000,
    },
    coverImage: '🎭',
    isHot: true,
    createdAt: '2026-03-08',
  },
  // ChatGPT 文案写作
  {
    id: 'chatgpt-xiaohongshu-001',
    title: '小红书爆款笔记模板',
    description: '生成吸引人的小红书文案，包含emoji、话题标签、标题党技巧。',
    content: `你是一个资深的小红书内容创作者，擅长写爆款笔记。请帮我生成一篇小红书笔记：

产品/主题：{产品/主题}
目标人群：{人群}
笔记风格：{真实分享/好物推荐/教程/测评}

要求：
- 标题：使用【】或emoji开头，吸引眼球，字数15-20字
- 开头：黄金3秒，引发好奇，直接痛点切入
- 正文：分段清晰，每段不超过3行，使用emoji
- 结尾：引导评论/收藏/关注
- 标签：8-12个相关热门话题标签

示例输出：
【标题】
正文第一段...
正文第二段...
...
#话题1 #话题2 ...`,
    price: 0,
    platform: 'ChatGPT',
    category: '文案写作',
    tags: ['小红书', '社交媒体', '营销'],
    rating: 4.6,
    ratingCount: 1100,
    salesCount: 9800,
    creator: {
      name: 'SocialQueen',
      avatar: '👑',
      sales: 30000,
    },
    coverImage: '📕',
    isHot: true,
    createdAt: '2026-03-15',
  },
  // ChatGPT 学习教育
  {
    id: 'chatgpt-study-001',
    title: '个性化学习计划制定',
    description: '根据目标和时间，生成科学合理的学习计划。',
    content: `你是一个专业的学习规划师。请帮我制定一个学习计划：

学习目标：{目标，如：3个月学会Python}
当前水平：{零基础/初级/中级}
每天可用时间：{X小时}
学习资源偏好：{视频/书籍/实战项目}

请生成：
1. **阶段划分**：将大目标拆分为3-4个阶段
2. **每周计划**：具体每天学什么
3. **每日任务清单**：具体到小时的任务安排
4. **推荐资源**：每个阶段推荐的学习资料
5. **进度检验点**：如何验证学习效果
6. **注意事项**：可能遇到的困难和应对方法`,
    price: 0,
    platform: 'ChatGPT',
    category: '学习教育',
    tags: ['学习计划', '自律', '成长'],
    rating: 4.9,
    ratingCount: 2048,
    salesCount: 15000,
    creator: {
      name: '成长导师',
      avatar: '🌱',
      sales: 45000,
    },
    coverImage: '📚',
    isHot: true,
    createdAt: '2026-03-18',
  },
  // Claude 写作创作
  {
    id: 'claude-novel-001',
    title: '小说情节生成器',
    description: '输入世界观和大纲，自动生成扣人心弦的故事情节。',
    content: `你是一个资深的小说作者，擅长构建引人入胜的情节。请帮我设计故事情节：

小说类型：{言情/玄幻/悬疑/科幻/都市}
世界观：{设定描述}
主要人物：
- 主角：{性格/背景/目标}
- 配角：{关系/作用}

已有大纲：{简要描述主线剧情}

请设计：
1. **起承转合**：四幕结构完整呈现
2. **冲突设计**：每个章节的主要矛盾
3. **高潮点**：情绪最激烈的场景设计
4. **悬念铺设**：埋下的伏笔和悬念
5. **章节细纲**：10-15章的核心事件

输出格式要清晰，便于后续创作使用。`,
    price: 49,
    platform: 'Claude',
    category: '文案写作',
    tags: ['小说', '创作', '写作'],
    rating: 4.5,
    ratingCount: 320,
    salesCount: 1200,
    creator: {
      name: '故事大王',
      avatar: '✍️',
      sales: 8000,
    },
    coverImage: '📖',
    createdAt: '2026-03-20',
  },
  // 编程开发
  {
    id: 'chatgpt-bug-001',
    title: 'Bug修复助手',
    description: '描述Bug现象，自动分析可能原因并提供修复方案。',
    content: `你是一个经验丰富的调试专家。请帮我分析和修复Bug：

问题描述：
{详细描述Bug现象，包括错误信息、触发条件等}

相关代码：
\`\`\`
{粘贴相关代码}
\`\`\`

环境信息：
- 编程语言/框架：{描述}
- 运行环境：{Node版本/浏览器等}

请分析：
1. **可能原因**：列出3-5个最可能的原因
2. **验证方法**：如何确认是哪个原因
3. **修复方案**：针对每个原因的修复代码
4. **预防建议**：如何避免类似问题

请优先给出最可能的原因和解决方案。`,
    price: 0,
    platform: 'ChatGPT',
    category: '编程开发',
    tags: ['Bug修复', '调试', '效率'],
    rating: 4.8,
    ratingCount: 1890,
    salesCount: 12000,
    creator: {
      name: 'BugHunter',
      avatar: '🐛',
      sales: 35000,
    },
    coverImage: '🔧',
    isHot: true,
    createdAt: '2026-03-22',
  },
  // AI绘画
  {
    id: 'mj-product-001',
    title: '产品展示图咒语',
    description: '生成专业的电商产品展示图，适用于详情页和主图。',
    content: `Create a professional e-commerce product photography of {产品描述}, shot in a modern studio setting.

Style requirements:
- Clean white or light gray background
- Three-point lighting setup (key, fill, rim light)
- Slight angle to show product details
- High-end commercial photography quality
- Subtle reflections and shadows
- --ar 1:1 --style raw --v 6 --q 2

For different products:
- 3C电子产品：强调科技感，深色背景
- 服装：模特穿着或平铺，浅色纯色背景
- 食品：暖色调，自然光线`,
    price: 35,
    platform: 'Midjourney',
    category: 'AI绘画',
    tags: ['电商', '产品', '商业'],
    rating: 4.7,
    ratingCount: 445,
    salesCount: 2800,
    creator: {
      name: 'ProductPro',
      avatar: '📦',
      sales: 9500,
    },
    coverImage: '🛍️',
    createdAt: '2026-03-25',
  },
]

export const platforms = [
  { key: 'all', name: '全部', icon: '🌐' },
  { key: 'ChatGPT', name: 'ChatGPT', icon: '💬', color: '#10A37F' },
  { key: 'Claude', name: 'Claude', icon: '🧠', color: '#CC785C' },
  { key: 'Midjourney', name: 'Midjourney', icon: '🎨', color: '#000000' },
  { key: 'Stable Diffusion', name: 'Stable Diffusion', icon: '🎭', color: '#9150E9' },
  { key: 'DALL-E', name: 'DALL-E', icon: '🖼️', color: '#4F46E5' },
]

export const categories = [
  { key: 'all', name: '全部分类', icon: '📂' },
  { key: '职场办公', name: '💼 职场办公', icon: '💼' },
  { key: '编程开发', name: '💻 编程开发', icon: '💻' },
  { key: 'AI绘画', name: '🎨 AI绘画', icon: '🎨' },
  { key: '文案写作', name: '📝 文案写作', icon: '📝' },
  { key: '学习教育', name: '📚 学习教育', icon: '📚' },
]

export const sortOptions = [
  { key: 'hot', name: '🔥 热门' },
  { key: 'newest', name: '🕐 最新' },
  { key: 'rating', name: '⭐ 评分最高' },
  { key: 'price-low', name: '💰 价格从低到高' },
  { key: 'price-high', name: '💎 价格从高到低' },
]
