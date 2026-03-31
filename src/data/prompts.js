export const prompts = [
  // ChatGPT 职场办公
  {
    id: 'chatgpt-email-reply',
    title: '专业邮件回复生成器',
    description: '根据原始邮件内容，生成礼貌、专业且有针对性的回复邮件',
    content: `你是一位专业商务沟通专家。请根据以下原始邮件内容，生成一封得体、专业的回复邮件。

原始邮件：
{original_email}

回复要求：
- 语气：{tone}（正式/友好/委婉）
- 长度：{length}（简短/中等/详细）
- 是否需要包含附件说明：是/否
- 关键信息需回复：{key_points}

请直接输出邮件内容，不需要额外解释。`,
    platform: 'ChatGPT',
    category: '职场办公',
    tags: ['邮件', '商务沟通', '职业化'],
    rating: 4.8,
    ratingCount: 892,
    salesCount: 15600,
    creator: { name: '职场达人', avatar: '💼', sales: 12500 },
    coverImage: '📧',
    isHot: true,
  },
  {
    id: 'chatgpt-meeting-summary',
    title: '会议纪要整理助手',
    description: '将会议录音或文字记录整理成结构清晰的会议纪要',
    content: `你是一位高效行政助理。请将以下会议记录整理成专业的会议纪要。

会议类型：{meeting_type}
会议主题：{topic}
参会人员：{participants}

原始记录：
{meeting_notes}

请按以下结构输出：
1. 会议基本信息
2. 讨论要点
3. 决策事项
4. 行动计划（负责人+截止时间）
5. 下次会议安排`,
    platform: 'ChatGPT',
    category: '职场办公',
    tags: ['会议', '效率工具', '文档整理'],
    rating: 4.9,
    ratingCount: 1456,
    salesCount: 23000,
    creator: { name: '效率大师', avatar: '⚡', sales: 18900 },
    coverImage: '📝',
    isHot: true,
  },
  {
    id: 'chatgpt-linkedin-post',
    title: 'LinkedIn爆款文案',
    description: '生成吸引眼球的LinkedIn帖子，提升个人品牌影响力',
    content: `你是一位LinkedIn内容运营专家。请根据以下主题创作一篇病毒式传播的LinkedIn帖子。

主题：{topic}
目标：{goal}（建立权威/获取询盘/品牌曝光）
行业：{industry}
风格：{style}（专业严肃/轻松幽默/故事驱动）

要求：
- 开头前3行必须抓住注意力
- 使用合适的emoji增加可读性
- 包含3-5个相关hashtag
- 字数控制在150-300字
- 添加一个引发讨论的问题`,
    platform: 'ChatGPT',
    category: '职场办公',
    tags: ['LinkedIn', '内容营销', '个人品牌'],
    rating: 4.7,
    ratingCount: 567,
    salesCount: 8900,
    creator: { name: '增长黑客', avatar: '🚀', sales: 7200 },
    coverImage: '💼',
    isHot: false,
  },
  {
    id: 'chatgpt-prd-generator',
    title: 'PRD产品需求文档',
    description: '根据产品想法快速生成结构完整的PRD文档',
    content: `你是一位资深产品经理。请根据以下信息撰写一份专业的PRD（产品需求文档）。

产品名称：{product_name}
目标用户：{target_users}
核心问题：{problem_statement}
解决方案概述：{solution_overview}

请包含以下章节：
1. 产品概述与目标
2. 用户故事与使用场景
3. 功能需求详述
4. 非功能需求（性能、安全、兼容性）
5. 用户界面交互说明
6. 验收标准
7. 排期建议`,
    platform: 'ChatGPT',
    category: '职场办公',
    tags: ['PRD', '产品经理', '文档生成'],
    rating: 4.6,
    ratingCount: 324,
    salesCount: 5600,
    creator: { name: '产品老王', avatar: '📱', sales: 4800 },
    coverImage: '📋',
    isHot: false,
  },
  {
    id: 'chatgpt-presentation',
    title: 'PPT大纲生成器',
    description: '根据主题快速生成专业的PPT大纲和内容要点',
    content: `你是一位专业演讲稿撰写专家。请为以下主题生成PPT大纲。

主题：{topic}
目标受众：{audience}
演示时长：{duration}分钟
风格：{style}（商务/学术/轻松）

请输出：
1. PPT结构（封面+目录+章节+结尾）
2. 每页标题和副标题
3. 每页关键内容要点（3-5点）
4. 适合的配图建议
5. 演讲过渡语示例`,
    platform: 'ChatGPT',
    category: '职场办公',
    tags: ['PPT', '演讲', '汇报'],
    rating: 4.7,
    ratingCount: 456,
    salesCount: 7800,
    creator: { name: '演示专家', avatar: '📊', sales: 6200 },
    coverImage: '📊',
    isHot: true,
  },
  // ChatGPT 编程开发
  {
    id: 'chatgpt-code-review',
    title: '代码审查与优化建议',
    description: '对代码进行全面的审查，提出性能优化和安全建议',
    content: `你是一位资深软件架构师。请对以下代码进行全面的Code Review。

编程语言：{language}
代码片段：
\`\`\`{language}
{code}
\`\`\`

请从以下维度进行审查：
1. 代码可读性与可维护性
2. 潜在Bug和安全漏洞
3. 性能优化建议
4. 最佳实践符合度
5. 架构设计评估

输出格式：
- 问题严重程度：高/中/低
- 具体问题描述
- 修改建议代码（如果适用）`,
    platform: 'ChatGPT',
    category: '编程开发',
    tags: ['代码审查', '质量保证', '最佳实践'],
    rating: 4.8,
    ratingCount: 1876,
    salesCount: 28000,
    creator: { name: '架构师小李', avatar: '🎨', sales: 22000 },
    coverImage: '🔍',
    isHot: true,
  },
  {
    id: 'chatgpt-bug-debug',
    title: 'Bug定位与修复助手',
    description: '分析Bug描述和代码，快速定位问题并提供修复方案',
    content: `你是一位经验丰富的全栈工程师。请帮助定位并修复以下Bug。

问题描述：
{bug_description}

复现步骤：
{steps_to_reproduce}

预期行为：
{expected_behavior}

实际行为：
{actual_behavior}

相关代码：
\`\`\`{language}
{code}
\`\`\`

错误日志：
{error_logs}

请提供：
1. 可能的原因分析
2. 修复方案（包含修改的代码）
3. 预防类似问题的建议`,
    platform: 'ChatGPT',
    category: '编程开发',
    tags: ['Bug修复', '调试', '问题解决'],
    rating: 4.9,
    ratingCount: 2156,
    salesCount: 35000,
    creator: { name: 'Bug终结者', avatar: '🐛', sales: 29000 },
    coverImage: '🔧',
    isHot: true,
  },
  {
    id: 'chatgpt-api-design',
    title: 'RESTful API设计',
    description: '根据业务需求设计规范的RESTful API接口文档',
    content: `你是一位API架构专家。请为以下业务场景设计RESTful API。

业务模块：{module_name}
核心功能：{core_features}
认证方式：{auth_method}

请输出：
1. API Endpoint设计
2. 请求/响应格式（JSON Schema）
3. 状态码定义
4. 错误码说明
5. 请求示例

遵循REST最佳实践。`,
    platform: 'ChatGPT',
    category: '编程开发',
    tags: ['API设计', 'REST', '后端开发'],
    rating: 4.7,
    ratingCount: 678,
    salesCount: 11200,
    creator: { name: 'API大师', avatar: '🔗', sales: 9800 },
    coverImage: '📡',
    isHot: false,
  },
  {
    id: 'chatgpt-sql-generator',
    title: 'SQL查询生成器',
    description: '根据自然语言描述生成复杂SQL查询语句',
    content: `你是一位数据库专家。请根据以下需求生成SQL查询。

数据库类型：{db_type}（MySQL/PostgreSQL/SQL Server等）
业务需求：
{natural_language_query}

表结构：
{tables_schema}

请生成：
1. 优化后的SQL语句
2. 查询说明
3. 性能注意事项
4. 索引建议（如适用）`,
    platform: 'ChatGPT',
    category: '编程开发',
    tags: ['SQL', '数据库', '查询优化'],
    rating: 4.8,
    ratingCount: 1234,
    salesCount: 19500,
    creator: { name: '数据极客', avatar: '🗄️', sales: 15600 },
    coverImage: '💾',
    isHot: false,
  },
  {
    id: 'chatgpt-git-commit',
    title: 'Git提交信息生成器',
    description: '根据代码变更生成规范化的Git提交信息',
    content: `你是一位代码质量管理专家。请根据以下变更生成规范的Git提交信息。

变更类型：{type}（feat/fix/docs/style/refactor/test/chore）
变更内容：
{changes}

请生成：
1. 符合Conventional Commits规范的提交信息
2. 详细的body描述（WHAT和WHY）
3. Breaking Changes说明（如有）
4. 关联的Issue编号（如有）

格式示例：
feat: add user login functionality

implement OAuth2 login with Google provider
- add google OAuth2 configuration
- create login API endpoint
- add token refresh mechanism

Closes #123`,
    platform: 'ChatGPT',
    category: '编程开发',
    tags: ['Git', '版本控制', '团队协作'],
    rating: 4.6,
    ratingCount: 567,
    salesCount: 8900,
    creator: { name: '代码规范师', avatar: '📦', sales: 7200 },
    coverImage: '📦',
    isHot: false,
  },
  // ChatGPT 文案写作
  {
    id: 'chatgpt-video-script',
    title: '短视频脚本创作',
    description: '为抖音/B站等平台创作吸引人的短视频脚本',
    content: `你是一位短视频内容策划专家。请为以下主题创作短视频脚本。

平台：{platform}（抖音/小红书/B站）
主题：{topic}
目标受众：{audience}
时长：{duration}秒
风格：{style}（搞笑/干货/情感/测评）

请输出完整脚本：
1. 封面标题和字幕设计
2. 开场钩子（前3秒）
3. 正文结构（分镜+字幕+配音）
4. 互动引导
5. 背景音乐建议`,
    platform: 'ChatGPT',
    category: '文案写作',
    tags: ['短视频', '脚本', '内容创作'],
    rating: 4.8,
    ratingCount: 1567,
    salesCount: 24500,
    creator: { name: '短视频达人', avatar: '🎬', sales: 19800 },
    coverImage: '📹',
    isHot: true,
  },
  {
    id: 'chatgpt-product-desc',
    title: '电商品台产品描述',
    description: '生成淘宝/京东/亚马逊等平台的商品详情页文案',
    content: `你是一位电商文案专家。请为以下产品撰写吸引买家的商品描述。

平台：{platform}（淘宝/京东/亚马逊）
产品名称：{product_name}
核心卖点：{key_features}
目标人群：{target_audience}
价格带：{price_range}

要求：
- 主图视频脚本
- 标题（含关键词，SEO优化）
- 五点描述（USP形式）
- 详情页文案
- 买家秀引导语`,
    platform: 'ChatGPT',
    category: '文案写作',
    tags: ['电商', '产品文案', '转化率优化'],
    rating: 4.7,
    ratingCount: 987,
    salesCount: 15600,
    creator: { name: '转化率专家', avatar: '🛒', sales: 12800 },
    coverImage: '🛍️',
    isHot: false,
  },
  {
    id: 'chatgpt-seo-article',
    title: 'SEO友好文章',
    description: '生成既符合搜索引擎又吸引读者的优质内容',
    content: `你是一位SEO内容专家。请为以下主题撰写一篇SEO友好的文章。

主题：{topic}
目标关键词：{keywords}
文章长度：{length}字
目标读者：{audience}
发布平台：{platform}

要求：
- 标题包含主关键词（25-30字）
- SEO元描述（150-160字）
- H1主标题 + H2/H3副标题
- 关键词密度2-3%
- 包含内部链接占位符
- 图alt标签建议
- 结尾CTA设计`,
    platform: 'ChatGPT',
    category: '文案写作',
    tags: ['SEO', '内容营销', '文章写作'],
    rating: 4.7,
    ratingCount: 1567,
    salesCount: 24000,
    creator: { name: 'SEO专家', avatar: '🔍', sales: 19200 },
    coverImage: '📝',
    isHot: true,
  },
  {
    id: 'chatgpt-xiaohongshu',
    title: '小红书爆款笔记',
    description: '生成吸引人的小红书文案，包含emoji和热门标签',
    content: `你是一位资深小红书内容创作者，擅长写爆款笔记。请帮我生成一篇小红书笔记：

产品/主题：{产品/主题}
目标人群：{人群}
笔记风格：{真实分享/好物推荐/教程/测评}

要求：
- 标题：使用【】或emoji开头，吸引眼球
- 开头：黄金3秒，引发好奇
- 正文：分段清晰，每段不超过3行，使用emoji
- 结尾：引导评论/收藏/关注
- 标签：8-12个相关热门话题标签`,
    platform: 'ChatGPT',
    category: '文案写作',
    tags: ['小红书', '社交媒体', '种草'],
    rating: 4.9,
    ratingCount: 2345,
    salesCount: 38000,
    creator: { name: '种草达人', avatar: '🌱', sales: 31000 },
    coverImage: '📕',
    isHot: true,
  },
  // Claude 编程开发
  {
    id: 'claude-code-review-pro',
    title: '深度代码审查',
    description: 'Claude擅长的深度分析，提供重构方案和架构建议',
    content: `你是一位顶级软件架构师，擅长多语言编程和系统设计。请对以下代码进行深度审查。

代码语言：{languages}
项目类型：{project_type}
代码：
\`\`\`{primary_language}
{code_snippets}
\`\`\`

请提供：
1. 代码质量评分（1-10）及理由
2. 重构优先级列表
3. 推荐的设计模式
4. 技术债务分析
5. CI/CD集成建议
6. 测试覆盖率建议`,
    platform: 'Claude',
    category: '编程开发',
    tags: ['代码审查', '架构设计', '重构'],
    rating: 4.9,
    ratingCount: 2341,
    salesCount: 36000,
    creator: { name: '架构师老张', avatar: '🏗️', sales: 29000 },
    coverImage: '🎯',
    isHot: true,
  },
  {
    id: 'claude-tech-docs',
    title: '技术文档专家',
    description: '撰写清晰、专业的产品技术文档和API文档',
    content: `你是一位技术文档工程师。请为以下项目创建完整技术文档。

项目类型：{project_type}（SDK/框架/API/工具）
项目名称：{project_name}
目标读者：{target_audience}
技术栈：{tech_stack}

请生成：
1. README.md（项目概述、快速开始）
2. 概念介绍
3. 完整API参考
4. 教程和最佳实践
5. 故障排除指南
6. 贡献指南`,
    platform: 'Claude',
    category: '编程开发',
    tags: ['技术文档', 'API文档', 'DevDocs'],
    rating: 4.8,
    ratingCount: 1234,
    salesCount: 19800,
    creator: { name: '文档狂人', avatar: '📚', sales: 16000 },
    coverImage: '📖',
    isHot: false,
  },
  {
    id: 'claude-data-analysis',
    title: '数据分析报告',
    description: '对数据集进行深入分析，生成可操作的数据报告',
    content: `你是一位数据分析专家。请对以下数据进行分析并生成报告。

数据类型：{data_type}
数据量级：{data_scale}
分析目标：{objectives}
关键指标：{kpis}

请提供：
1. 数据概览和质量评估
2. 描述性统计
3. 趋势分析
4. 关键发现（3-5点）
5. 可视化建议
6. 行动建议
7. 技术附录（如SQL/Python代码）`,
    platform: 'Claude',
    category: '编程开发',
    tags: ['数据分析', '报告', 'BI'],
    rating: 4.8,
    ratingCount: 1876,
    salesCount: 28500,
    creator: { name: '数据分析师', avatar: '📈', sales: 22800 },
    coverImage: '📊',
    isHot: true,
  },
  // Claude 学习教育
  {
    id: 'claude-learning-plan',
    title: '个性化学习计划',
    description: '根据目标和时间制定科学的学习路径和计划',
    content: `你是一位教育规划专家。请为以下学习目标制定详细计划。

学习主题：{subject}
当前水平：{current_level}
目标水平：{target_level}
每日学习时间：{daily_hours}小时
总周期：{duration}周/月
学习方式：{style}

请输出：
1. 阶段划分和里程碑
2. 每周学习内容详细计划
3. 优质资源推荐
4. 实践练习建议
5. 进度评估方式
6. 常见瓶颈和突破方法`,
    platform: 'Claude',
    category: '学习教育',
    tags: ['学习计划', '自我提升', '技能成长'],
    rating: 4.9,
    ratingCount: 2567,
    salesCount: 41000,
    creator: { name: '学习教练', avatar: '🎓', sales: 33000 },
    coverImage: '📚',
    isHot: true,
  },
  {
    id: 'claude-novel-outline',
    title: '小说大纲规划师',
    description: '帮助规划长篇小说结构，设计人物弧线和情节发展',
    content: `你是一位资深小说家和创意写作导师。请为以下小说概念创建详细大纲。

类型：{genre}（都市/玄幻/悬疑/科幻等）
核心概念：{core_concept}
主角：{protagonist}
核心冲突：{central_conflict}
目标字数：{target_word_count}

请输出：
1. 世界观/背景设定
2. 主要人物卡（3-5个）
3. 三幕结构大纲
4. 章节目录（分章概要）
5. 伏笔和悬念设计
6. 结局设计`,
    platform: 'Claude',
    category: '学习教育',
    tags: ['小说创作', '故事结构', '写作技巧'],
    rating: 4.7,
    ratingCount: 876,
    salesCount: 13500,
    creator: { name: '故事匠人', avatar: '✍️', sales: 11200 },
    coverImage: '📜',
    isHot: false,
  },
  // Midjourney AI绘画
  {
    id: 'mj-landscape-v2',
    title: '电影感风景摄影',
    description: '生成具有电影质感的震撼风景照片',
    content: `/imagine prompt: {scene_description}, cinematic landscape photography, dramatic lighting, golden hour, ultra-detailed, 8K resolution, National Geographic style, shot on Canon EOS R5, 24mm lens, f/8 aperture, shallow depth of field, rich colors, --ar 16:9 --style raw --v 6.1`,
    platform: 'Midjourney',
    category: 'AI绘画',
    tags: ['风景', '摄影', '电影感'],
    rating: 4.8,
    ratingCount: 4567,
    salesCount: 68000,
    creator: { name: '光影大师', avatar: '🌅', sales: 54000 },
    coverImage: '🏔️',
    isHot: true,
  },
  {
    id: 'mj-portrait-pro',
    title: '商业人像摄影',
    description: '专业级商业人像，适用广告和品牌视觉',
    content: `/imagine prompt: {subject} portrait, professional commercial photography, studio lighting setup, beauty dish, softbox, 85mm lens, fashion magazine cover style, retouched skin, detailed eyes, 4K --ar 3:4 --style raw --v 6.1`,
    platform: 'Midjourney',
    category: 'AI绘画',
    tags: ['人像', '商业摄影', '时尚'],
    rating: 4.7,
    ratingCount: 3456,
    salesCount: 52000,
    creator: { name: '摄影大师', avatar: '📷', sales: 42000 },
    coverImage: '👤',
    isHot: true,
  },
  {
    id: 'mj-product-shot',
    title: '高端产品展示',
    description: '电商级产品主图，呈现高端质感',
    content: `/imagine prompt: {product_name} on minimalist {surface_type} surface, professional product photography, soft neutral background, studio lighting, high-end brand aesthetic, clean composition, 45-degree angle, 8K detail, white background option --ar 1:1 --style raw --v 6.1`,
    platform: 'Midjourney',
    category: 'AI绘画',
    tags: ['产品摄影', '电商', '商业'],
    rating: 4.9,
    ratingCount: 5234,
    salesCount: 79000,
    creator: { name: '产品摄影师', avatar: '✨', sales: 63000 },
    coverImage: '💎',
    isHot: true,
  },
  {
    id: 'mj-food-photography',
    title: '美食摄影',
    description: '让人垂涎欲滴的美食照片，适用于菜单和社交媒体',
    content: `/imagine prompt: {food_description}, professional food photography, top-down angle, natural lighting, shallow depth of field, 50mm lens, food styling, steam rising, vibrant colors, clean background, 8K resolution, --ar 1:1 --style raw --v 6.1`,
    platform: 'Midjourney',
    category: 'AI绘画',
    tags: ['美食', '摄影', '餐饮'],
    rating: 4.6,
    ratingCount: 1876,
    salesCount: 28000,
    creator: { name: '美食摄影师', avatar: '🍜', sales: 22500 },
    coverImage: '🍽️',
    isHot: false,
  },
  {
    id: 'mj-architecture',
    title: '建筑设计',
    description: '生成具有创意和功能性的建筑设计方案',
    content: `/imagine prompt: {building_type} architecture, {style} style, {material} exterior, sustainable design, natural lighting, interior view, architectural magazine spread, clean lines, 8K, photorealistic, --ar 16:9 --style raw --v 6.1`,
    platform: 'Midjourney',
    category: 'AI绘画',
    tags: ['建筑', '设计', '室内'],
    rating: 4.7,
    ratingCount: 1876,
    salesCount: 28500,
    creator: { name: '建筑设计师', avatar: '🏛️', sales: 23000 },
    coverImage: '🏛️',
    isHot: false,
  },
  // Stable Diffusion AI绘画
  {
    id: 'sd-anime-character',
    title: '动漫角色设计',
    description: '生成高质量动漫角色立绘，适合游戏原画和IP设计',
    content: `masterpiece, best quality, {character_description}, anime style, detailed face, beautiful eyes, shiny hair, dynamic pose, white background, full body, official art, sharp focus, intricate details, {style} --w 512 --h 768 --steps 30 --cfg 7.5 --seed -1`,
    platform: 'Stable Diffusion',
    category: 'AI绘画',
    tags: ['动漫', '角色设计', '游戏'],
    rating: 4.7,
    ratingCount: 3456,
    salesCount: 52000,
    creator: { name: '动漫艺术家', avatar: '🎨', sales: 42000 },
    coverImage: '🎭',
    isHot: true,
  },
  {
    id: 'sd-game-asset',
    title: '游戏资产设计',
    description: '生成游戏道具、装备、场景等资产概念图',
    content: `game asset design, {asset_type}, isometric view, clean lines, {style} style, transparent PNG, white background, high contrast, detailed texture, 4K resolution, game engine ready, {additional_details} --w 512 --h 512 --steps 25 --cfg 8 --seed -1`,
    platform: 'Stable Diffusion',
    category: 'AI绘画',
    tags: ['游戏', '资产设计', '概念图'],
    rating: 4.5,
    ratingCount: 876,
    salesCount: 13500,
    creator: { name: '游戏美术师', avatar: '🎮', sales: 11200 },
    coverImage: '🕹️',
    isHot: false,
  },
  // DALL-E AI绘画
  {
    id: 'dalle-concept-art',
    title: '概念艺术创作',
    description: '将文字描述转化为精美的概念艺术图',
    content: `Create a stunning concept art illustration of {scene_description}. The image should feature:
- Rich atmospheric depth
- Cinematic composition
- Highly detailed elements
- Evocative lighting and color grading
- Professional concept art quality suitable for film or game pre-visualization`,
    platform: 'DALL-E',
    category: 'AI绘画',
    tags: ['概念艺术', '插画', '设计'],
    rating: 4.8,
    ratingCount: 1234,
    salesCount: 19200,
    creator: { name: '概念艺术家', avatar: '🖼️', sales: 15600 },
    coverImage: '🎨',
    isHot: false,
  },
  {
    id: 'dalle-infographic',
    title: '信息图表设计',
    description: '将复杂信息转化为直观美观的信息图表',
    content: `Create a clean, professional infographic about {topic}. Requirements:
- Modern flat design style
- Clear data visualization
- Limited color palette (3-4 colors max)
- Readable typography
- Hierarchical information architecture
- Suitable for presentations and reports`,
    platform: 'DALL-E',
    category: 'AI绘画',
    tags: ['信息图', '数据可视化', '设计'],
    rating: 4.6,
    ratingCount: 678,
    salesCount: 10500,
    creator: { name: '数据设计师', avatar: '📊', sales: 8800 },
    coverImage: '📊',
    isHot: false,
  },
  // Gemini 编程开发
  {
    id: 'gemini-code-explain',
    title: '代码解释与教学',
    description: '深入解释代码逻辑，生成教学级别的代码解析',
    content: `你是一位编程教育专家。请详细解释以下代码的工作原理。

编程语言：{language}
代码：
\`\`\`
{code}
\`\`\`

请提供：
1. 代码整体概述
2. 逐行/逐函数解释
3. 关键概念讲解
4. 常见混淆点提示
5. 类似的实际应用场景
6. 扩展学习建议

适合教学风格，循序渐进。`,
    platform: 'Gemini',
    category: '编程开发',
    tags: ['代码解释', '教学', '学习'],
    rating: 4.9,
    ratingCount: 3456,
    salesCount: 52000,
    creator: { name: '编程导师', avatar: '💻', sales: 42000 },
    coverImage: '📘',
    isHot: true,
  },
  {
    id: 'gemini-interview-prep',
    title: '面试题库与模拟',
    description: '生成针对性的面试题目和答案解析',
    content: `你是一位技术面试官。请为以下岗位生成面试准备材料。

岗位：{position}
经验要求：{experience}
技术栈：{tech_stack}
公司类型：{company_type}（大厂/创业/外企）

请提供：
1. 高频面试知识点清单
2. 模拟面试题（5-10道）
3. 参考答案要点
4. 加分回答示例
5. 面试技巧提示
6. 该岗位薪资范围参考`,
    platform: 'Gemini',
    category: '学习教育',
    tags: ['面试', '求职', '职业发展'],
    rating: 4.9,
    ratingCount: 4567,
    salesCount: 68000,
    creator: { name: '求职顾问', avatar: '🎯', sales: 54000 },
    coverImage: '💼',
    isHot: true,
  },
  // ChatGPT 生活
  {
    id: 'chatgpt-travel-plan',
    title: '智能旅行规划',
    description: '根据预算和偏好生成完整的旅行计划',
    content: `你是一位旅行规划师。请为以下行程制定详细计划。

目的地：{destination}
出发地：{departure}
天数：{days}天{ nights}晚
人数：{travelers}人
预算：{budget}（经济/舒适/豪华）
旅行风格：{style}（打卡/度假/探险/文化）
特殊需求：{special_needs}

请输出：
1. 每日行程安排（景点+餐厅）
2. 交通建议（机酒+当地交通）
3. 必带物品清单
4. 预算分配表
5. 注意事项和省钱技巧`,
    platform: 'ChatGPT',
    category: '生活百科',
    tags: ['旅行', '规划', '生活'],
    rating: 4.7,
    ratingCount: 2134,
    salesCount: 32000,
    creator: { name: '旅行达人', avatar: '✈️', sales: 25800 },
    coverImage: '🗺️',
    isHot: false,
  },
  {
    id: 'chatgpt-fitness-plan',
    title: '个性化健身计划',
    description: '根据身体状况和目标制定科学的健身方案',
    content: `你是一位专业健身教练。请为以下情况制定健身计划。

目标：{goal}（减脂/增肌/塑形/健康）
当前体重：{current_weight}
目标体重：{target_weight}
每周训练时间：{hours}小时
可用器械：{equipment}（健身房/居家/徒手）
身体限制：{limitations}
饮食偏好：{diet}

请提供：
1. 训练计划（周计划+动作详解）
2. 饮食建议（营养配比+食谱）
3. 进度追踪表
4. 常见问题解答
5. 注意事项`,
    platform: 'ChatGPT',
    category: '生活百科',
    tags: ['健身', '健康', '塑性'],
    rating: 4.8,
    ratingCount: 2567,
    salesCount: 38500,
    creator: { name: '健身教练', avatar: '🏋️', sales: 31000 },
    coverImage: '💪',
    isHot: false,
  },
  {
    id: 'chatgpt-recipe',
    title: '食谱生成器',
    description: '根据食材和口味偏好生成美味菜谱',
    content: `你是一位专业厨师。请根据以下信息生成食谱。

食材：{ingredients}
口味偏好：{taste}（清淡/重口/甜/辣）
烹饪难度：{difficulty}（简单/中等/困难）
用餐人数：{servings}人
烹饪时间：{time}分钟

请提供：
1. 菜品名称
2. 所需调味料清单
3. 详细烹饪步骤
4. 烹饪技巧和注意事项
5. 营养信息（热量/蛋白质/碳水）
6. 搭配建议`,
    platform: 'ChatGPT',
    category: '生活百科',
    tags: ['食谱', '烹饪', '美食'],
    rating: 4.6,
    ratingCount: 1234,
    salesCount: 18500,
    creator: { name: '美食达人', avatar: '🍳', sales: 14800 },
    coverImage: '🍳',
    isHot: false,
  },
]

export const platforms = [
  { key: 'all', name: '全部' },
  { key: 'ChatGPT', name: 'ChatGPT' },
  { key: 'Claude', name: 'Claude' },
  { key: 'Midjourney', name: 'Midjourney' },
  { key: 'Stable Diffusion', name: 'Stable Diffusion' },
  { key: 'DALL-E', name: 'DALL-E' },
  { key: 'Gemini', name: 'Gemini' },
]

export const categories = [
  { key: 'all', name: '全部分类' },
  { key: '职场办公', name: '职场办公' },
  { key: '编程开发', name: '编程开发' },
  { key: 'AI绘画', name: 'AI绘画' },
  { key: '文案写作', name: '文案写作' },
  { key: '学习教育', name: '学习教育' },
  { key: '生活百科', name: '生活百科' },
]
