import { useState, useMemo } from 'react'
import { prompts, platforms, categories, sortOptions } from './data/prompts'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('hot')
  const [selectedPrompt, setSelectedPrompt] = useState(null)

  const filteredPrompts = useMemo(() => {
    let result = prompts

    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Platform filter
    if (selectedPlatform !== 'all') {
      result = result.filter(p => p.platform === selectedPlatform)
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case 'hot':
        result = [...result].sort((a, b) => b.salesCount - a.salesCount)
        break
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price)
        break
    }

    return result
  }, [searchQuery, selectedPlatform, selectedCategory, sortBy])

  const stats = useMemo(() => ({
    total: prompts.length,
    free: prompts.filter(p => p.price === 0).length,
    hot: prompts.filter(p => p.isHot).length,
  }), [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💡</span>
              <h1 className="text-xl font-bold text-gray-900">PromptHub</h1>
              <span className="text-sm text-gray-500 hidden md:inline">AI提示词模板市场</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-80">
                <input
                  type="text"
                  placeholder="搜索提示词、创作者..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors">
                发布模板
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-gray-500 text-xs mb-1">收录模板</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-gray-500 text-xs mb-1">免费模板</div>
            <div className="text-2xl font-bold text-secondary">{stats.free}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-gray-500 text-xs mb-1">热门模板</div>
            <div className="text-2xl font-bold text-accent">{stats.hot}</div>
          </div>
        </div>

        {/* Platform Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {platforms.map(p => (
            <button
              key={p.key}
              onClick={() => setSelectedPlatform(p.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedPlatform === p.key
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {p.icon} {p.name}
            </button>
          ))}
        </div>

        {/* Category + Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  selectedCategory === c.key
                    ? 'bg-primary/10 text-primary border border-primary/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {sortOptions.map(o => (
              <option key={o.key} value={o.key}>{o.name}</option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-500 mb-4">
          共找到 {filteredPrompts.length} 个模板
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPrompts.map((prompt, index) => (
            <PromptCard 
              key={prompt.id} 
              prompt={prompt} 
              index={index}
              onClick={() => setSelectedPrompt(prompt)}
            />
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <div className="text-gray-500">没有找到匹配的模板</div>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedPrompt && (
        <PromptDetail prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>PromptHub - AI提示词模板市场</p>
          <p className="mt-2">© 2026 PromptHub. 仅供学习参考。</p>
        </div>
      </footer>
    </div>
  )
}

function PromptCard({ prompt, index, onClick }) {
  const platformColors = {
    'ChatGPT': 'bg-green-500/10 text-green-600',
    'Claude': 'bg-orange-500/10 text-orange-600',
    'Midjourney': 'bg-gray-900 text-white',
    'Stable Diffusion': 'bg-purple-500/10 text-purple-600',
    'DALL-E': 'bg-indigo-500/10 text-indigo-600',
  }

  return (
    <div 
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer card-hover animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
    >
      {/* Cover */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-5xl">
        {prompt.coverImage}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{prompt.title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{prompt.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${platformColors[prompt.platform] || 'bg-gray-100 text-gray-600'}`}>
            {prompt.platform}
          </span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
            {prompt.category}
          </span>
          {prompt.isHot && (
            <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs">
              🔥 热门
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{prompt.creator.avatar}</span>
            <span className="text-xs text-gray-500">{prompt.creator.name}</span>
          </div>
          <div className="text-right">
            {prompt.price === 0 ? (
              <span className="text-secondary font-bold">免费</span>
            ) : (
              <span className="text-red-500 font-bold">¥{prompt.price}</span>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
          <span className="text-yellow-400">★</span>
          <span>{prompt.rating} ({prompt.ratingCount}人评分)</span>
        </div>
      </div>
    </div>
  )
}

function PromptDetail({ prompt, onClose }) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('desc')

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{prompt.coverImage}</span>
            <div>
              <h2 className="font-bold text-lg text-gray-900">{prompt.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>★ {prompt.rating}</span>
                <span>·</span>
                <span>已售 {prompt.salesCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {['描述', '获取', '评论', '相关推荐'].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(['desc', 'get', 'comments', 'related'][i])}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === ['desc', 'get', 'comments', 'related'][i]
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'desc' && (
            <div>
              <h3 className="font-semibold mb-3">模板描述</h3>
              <p className="text-gray-600 mb-6">{prompt.description}</p>

              <h3 className="font-semibold mb-3">使用说明</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 whitespace-pre-line">
                {prompt.content}
              </div>
            </div>
          )}

          {activeTab === 'get' && (
            <div>
              <div className="text-center py-8">
                {prompt.price === 0 ? (
                  <div>
                    <div className="text-5xl mb-4">🆓</div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">免费模板</h3>
                    <p className="text-gray-500 mb-6">直接复制使用，无需付费</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-5xl mb-4">💰</div>
                    <h3 className="text-2xl font-bold text-red-500 mb-2">¥{prompt.price}</h3>
                    <p className="text-gray-500 mb-6">一次购买，永久使用</p>
                  </div>
                )}

                <button
                  onClick={handleCopy}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {copied ? '✓ 已复制到剪贴板' : '📋 复制提示词'}
                </button>

                {prompt.price > 0 && (
                  <button className="ml-4 px-8 py-3 rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                    🛒 立即购买
                  </button>
                )}
              </div>

              {/* Creator */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h4 className="font-semibold mb-3">创作者</h4>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{prompt.creator.avatar}</span>
                    <div>
                      <div className="font-medium">{prompt.creator.name}</div>
                      <div className="text-sm text-gray-500">已售 {prompt.creator.sales.toLocaleString()}</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    + 关注
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="text-center py-8 text-gray-500">
              评论功能开发中...
            </div>
          )}

          {activeTab === 'related' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {prompts
                .filter(p => p.platform === prompt.platform && p.id !== prompt.id)
                .slice(0, 4)
                .map(p => (
                  <div key={p.id} className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100">
                    <div className="text-3xl mb-2">{p.coverImage}</div>
                    <div className="font-medium text-sm line-clamp-2">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {p.price === 0 ? '免费' : `¥${p.price}`}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
