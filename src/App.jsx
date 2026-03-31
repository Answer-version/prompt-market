import { useState, useMemo, useEffect } from 'react'
import { prompts, platforms, categories, sortOptions } from './data/prompts'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('hot')
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('prompthub-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  useEffect(() => {
    localStorage.setItem('prompthub-favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (e, promptId) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    )
  }

  const filteredPrompts = useMemo(() => {
    let result = showFavoritesOnly 
      ? prompts.filter(p => favorites.includes(p.id))
      : prompts

    if (!showFavoritesOnly && searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (!showFavoritesOnly && selectedPlatform !== 'all') {
      result = result.filter(p => p.platform === selectedPlatform)
    }

    if (!showFavoritesOnly && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

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
  }, [searchQuery, selectedPlatform, selectedCategory, sortBy, showFavoritesOnly, favorites])

  const stats = useMemo(() => ({
    total: prompts.length,
    free: prompts.filter(p => p.price === 0).length,
    hot: prompts.filter(p => p.isHot).length,
    favorites: favorites.length,
  }), [favorites])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  PromptHub
                </h1>
                <p className="text-xs text-gray-500 hidden md:block">AI提示词模板市场</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-1 md:max-w-xl">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  placeholder="搜索提示词、创作者..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100/80 rounded-full px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">🔍</span>
              </div>
              
              <button 
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="md:hidden p-2.5 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                ⚙️
              </button>
            </div>
            
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  showFavoritesOnly 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ❤️ {favorites.length}
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                + 发布模板
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <span>📚</span> 收录模板
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-green-100 text-xs mb-1">
              <span>🆓</span> 免费模板
            </div>
            <div className="text-2xl font-bold text-white">{stats.free}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-orange-100 text-xs mb-1">
              <span>🔥</span> 热门模板
            </div>
            <div className="text-2xl font-bold text-white">{stats.hot}</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-pink-100 text-xs mb-1">
              <span>❤️</span> 我的收藏
            </div>
            <div className="text-2xl font-bold text-white">{stats.favorites}</div>
          </div>
        </div>

        {/* Mobile Favorites Toggle */}
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`w-full py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              showFavoritesOnly 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            ❤️ 我的收藏 ({favorites.length})
          </button>
        </div>

        {/* Filters */}
        <div className={`mb-6 ${showMobileFilter ? 'block' : 'hidden md:block'}`}>
          {/* Platform Filter */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">平台</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {platforms.map(p => (
                <button
                  key={p.key}
                  onClick={() => setSelectedPlatform(p.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedPlatform === p.key
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {p.icon} {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">分类</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(c => (
                <button
                  key={c.key}
                  onClick={() => setSelectedCategory(c.key)}
                  className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                    selectedCategory === c.key
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {showFavoritesOnly ? '收藏的模板' : `共 ${filteredPrompts.length} 个模板`}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {sortOptions.map(o => (
                <option key={o.key} value={o.key}>{o.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPrompts.map((prompt, index) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                index={index}
                isFavorite={favorites.includes(prompt.id)}
                onToggleFavorite={(e) => toggleFavorite(e, prompt.id)}
                onClick={() => setSelectedPrompt(prompt)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{showFavoritesOnly ? '💔' : '🔍'}</div>
            <div className="text-gray-500 text-lg mb-2">
              {showFavoritesOnly ? '还没有收藏任何模板' : '没有找到匹配的模板'}
            </div>
            <div className="text-gray-400 text-sm">
              {showFavoritesOnly ? '去首页看看有什么喜欢的吧' : '试试其他关键词或筛选条件'}
            </div>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedPrompt && (
        <PromptDetail 
          prompt={selectedPrompt} 
          isFavorite={favorites.includes(selectedPrompt.id)}
          onToggleFavorite={(e) => toggleFavorite(e, selectedPrompt.id)}
          onClose={() => setSelectedPrompt(null)} 
        />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200/50 mt-16 py-8 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-sm">💡</span>
            </div>
            <span className="font-semibold text-gray-700">PromptHub</span>
          </div>
          <p className="text-gray-500 text-sm">AI提示词模板市场 · 发现优质Prompt</p>
          <p className="text-gray-400 text-xs mt-2">© 2026 PromptHub. 仅供学习参考。</p>
        </div>
      </footer>
    </div>
  )
}

function PromptCard({ prompt, index, isFavorite, onToggleFavorite, onClick }) {
  const platformStyles = {
    'ChatGPT': { bg: 'from green-400 to-emerald-500', text: 'text-white', shadow: 'shadow-green-500/20' },
    'Claude': { bg: 'from orange-400 to-amber-500', text: 'text-white', shadow: 'shadow-orange-500/20' },
    'Midjourney': { bg: 'from gray-700 to-gray-900', text: 'text-white', shadow: 'shadow-gray-500/20' },
    'Stable Diffusion': { bg: 'from purple-400 to-violet-500', text: 'text-white', shadow: 'shadow-purple-500/20' },
    'DALL-E': { bg: 'from indigo-400 to-blue-500', text: 'text-white', shadow: 'shadow-indigo-500/20' },
  }
  
  const style = platformStyles[prompt.platform] || { bg: 'from gray-400 to-gray-500', text: 'text-white', shadow: 'shadow-gray-500/20' }

  return (
    <div 
      className="bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group animate-fade-in-up hover:-translate-y-1"
      style={{ animationDelay: `${index * 30}ms` }}
      onClick={onClick}
    >
      {/* Cover with gradient overlay */}
      <div className={`relative aspect-video bg-gradient-to-br ${style.bg} flex items-center justify-center overflow-hidden`}>
        <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">{prompt.coverImage}</span>
        
        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isFavorite 
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/40' 
              : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          {prompt.price === 0 ? (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
              免费
            </span>
          ) : (
            <span className="px-3 py-1 bg-white text-red-500 text-xs font-bold rounded-full shadow-lg">
              ¥{prompt.price}
            </span>
          )}
        </div>

        {/* Hot Badge */}
        {prompt.isHot && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              🔥 热门
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Platform Tag */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${style.bg.includes('gray') ? 'bg-gray-100 text-gray-700' : 'bg-gradient-to-r ' + style.bg + ' ' + style.text}`}>
            {prompt.platform}
          </span>
          <span className="text-xs text-gray-400">{prompt.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {prompt.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{prompt.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-lg">{prompt.creator.avatar}</span>
            <span className="text-xs text-gray-500">{prompt.creator.name}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span className="text-yellow-400">★</span>
            <span className="font-medium text-gray-600">{prompt.rating}</span>
            <span className="hidden sm:inline">({prompt.ratingCount})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PromptDetail({ prompt, isFavorite, onToggleFavorite, onClose }) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('desc')
  const [showPayment, setShowPayment] = useState(false)
  const [paymentStep, setPaymentStep] = useState('select') // select -> qrcode -> success

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePayment = () => {
    setShowPayment(true)
    setPaymentStep('qrcode')
    // Simulate payment success after 2 seconds
    setTimeout(() => setPaymentStep('success'), 2000)
  }

  const platformStyles = {
    'ChatGPT': 'from green-400 to-emerald-500',
    'Claude': 'from orange-400 to-amber-500',
    'Midjourney': 'from gray-700 to-gray-900',
    'Stable Diffusion': 'from purple-400 to-violet-500',
    'DALL-E': 'from indigo-400 to-blue-500',
  }

  const gradient = platformStyles[prompt.platform] || 'from gray-400 to-gray-500'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {showPayment ? (
          <PaymentModal 
            prompt={prompt} 
            step={paymentStep} 
            onClose={() => { setShowPayment(false); setPaymentStep('select'); }}
            onCopy={handleCopy}
            copied={copied}
          />
        ) : (
          <>
            {/* Header with Cover */}
            <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-7xl">{prompt.coverImage}</span>
              
              {/* Close Button */}
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>

              {/* Favorite Button */}
              <button
                onClick={onToggleFavorite}
                className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isFavorite 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/40'
                }`}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>

              {/* Platform Badge */}
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-sm font-medium rounded-full">
                  {prompt.platform}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
              {/* Title & Meta */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{prompt.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span> {prompt.rating} ({prompt.ratingCount}人评分)
                  </span>
                  <span>·</span>
                  <span>已售 {prompt.salesCount.toLocaleString()}</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    {prompt.price === 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">🆓</span>
                        <div>
                          <div className="text-xl font-bold text-green-600">免费</div>
                          <div className="text-xs text-gray-500">直接获取，无需支付</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">💰</span>
                        <div>
                          <div className="text-2xl font-bold text-red-500">¥{prompt.price}</div>
                          <div className="text-xs text-gray-500">永久使用</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {prompt.price === 0 ? (
                      <button
                        onClick={handleCopy}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                          copied
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
                        }`}
                      >
                        {copied ? '✓ 已复制' : '📋 复制提示词'}
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleCopy}
                          className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
                        >
                          预览
                        </button>
                        <button
                          onClick={handlePayment}
                          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all"
                        >
                          🛒 立即购买
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">模板描述</h3>
                <p className="text-gray-600 leading-relaxed">{prompt.description}</p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Creator */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">创作者</h3>
                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{prompt.creator.avatar}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{prompt.creator.name}</div>
                      <div className="text-sm text-gray-500">已售 {prompt.creator.sales.toLocaleString()}</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all">
                    + 关注
                  </button>
                </div>
              </div>

              {/* Related */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">相关推荐</h3>
                <div className="grid grid-cols-3 gap-3">
                  {prompts
                    .filter(p => p.platform === prompt.platform && p.id !== prompt.id)
                    .slice(0, 3)
                    .map(p => (
                      <div key={p.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                        <div className="text-3xl mb-1">{p.coverImage}</div>
                        <div className="font-medium text-xs text-gray-700 line-clamp-2">{p.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {p.price === 0 ? '免费' : `¥${p.price}`}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function PaymentModal({ prompt, step, onClose, onCopy, copied }) {
  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    if (step === 'qrcode') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step])

  return (
    <div className="p-6">
      {step === 'qrcode' && (
        <>
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">完成支付</h3>
            <p className="text-gray-500">扫描下方二维码完成购买</p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-6 mb-6">
            <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center mb-4 shadow-inner">
              {/* Fake QR Code */}
              <div className="w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-8 gap-0.5">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500 mb-1">¥{prompt.price}</div>
              <div className="text-sm text-gray-500">剩余支付时间：{countdown}秒</div>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium">
              💬 客服
            </button>
            <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium">
              取消
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            请使用微信或支付宝扫描支付<br/>
            支付成功后模板将自动解锁
          </p>
        </>
      )}

      {step === 'success' && (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <span className="text-4xl">✓</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">支付成功！</h3>
          <p className="text-gray-500 mb-6">感谢您的购买，现在可以获取模板了</p>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 text-left">
            <div className="text-sm text-gray-600 mb-2">您的购买信息</div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{prompt.title}</span>
              <span className="font-bold text-green-600">¥{prompt.price}</span>
            </div>
          </div>

          <button
            onClick={onCopy}
            className={`w-full py-4 rounded-xl font-medium transition-all mb-3 ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
            }`}
          >
            {copied ? '✓ 已复制到剪贴板' : '📋 获取提示词'}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200"
          >
            返回首页
          </button>
        </div>
      )}
    </div>
  )
}

export default App
