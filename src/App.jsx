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
  const [showFavorites, setShowFavorites] = useState(false)

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
    let result = showFavorites 
      ? prompts.filter(p => favorites.includes(p.id))
      : prompts

    if (!showFavorites && searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (!showFavorites && selectedPlatform !== 'all') {
      result = result.filter(p => p.platform === selectedPlatform)
    }

    if (!showFavorites && selectedCategory !== 'all') {
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
  }, [searchQuery, selectedPlatform, selectedCategory, sortBy, showFavorites, favorites])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: '#E4E4E7' }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold" style={{ color: '#18181B' }}>PromptHub</span>
              <span className="text-sm hidden md:inline" style={{ color: '#A1A1AA' }}>AI提示词模板</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索模板..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 md:w-64 h-11 rounded-full px-4 pl-10 text-sm"
                  style={{ backgroundColor: '#F4F4F5', color: '#18181B' }}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#A1A1AA' }}>🔍</span>
              </div>
              <button 
                onClick={() => setShowFavorites(!showFavorites)}
                className="h-11 px-4 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: showFavorites ? '#18181B' : '#F4F4F5',
                  color: showFavorites ? '#FFFFFF' : '#71717A'
                }}
              >
                ♥ 收藏 ({favorites.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Platform Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {platforms.map(p => (
            <button
              key={p.key}
              onClick={() => setSelectedPlatform(p.key)}
              className="px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all"
              style={{
                backgroundColor: selectedPlatform === p.key ? '#18181B' : '#FFFFFF',
                color: selectedPlatform === p.key ? '#FFFFFF' : '#71717A',
                border: selectedPlatform === p.key ? 'none' : '1px solid #E4E4E7'
              }}
            >
              {p.key !== 'all' && <span className="mr-1">{getPlatformEmoji(p.key)}</span>}
              {p.name}
            </button>
          ))}
        </div>

        {/* Category + Sort */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: selectedCategory === c.key ? '#18181B' : 'transparent',
                  color: selectedCategory === c.key ? '#FFFFFF' : '#71717A'
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-3 rounded-lg text-sm"
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E4E4E7',
              color: '#71717A'
            }}
          >
            {sortOptions.map(o => (
              <option key={o.key} value={o.key}>{o.name}</option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="text-sm mb-4" style={{ color: '#71717A' }}>
          {showFavorites ? '收藏' : '全部'} · {filteredPrompts.length} 个模板
        </div>

        {/* Grid */}
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredPrompts.map(prompt => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                isFavorite={favorites.includes(prompt.id)}
                onToggleFavorite={(e) => toggleFavorite(e, prompt.id)}
                onClick={() => setSelectedPrompt(prompt)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20" style={{ color: '#A1A1AA' }}>
            {showFavorites ? '暂无收藏' : '无匹配结果'}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedPrompt && (
        <PromptModal 
          prompt={selectedPrompt} 
          isFavorite={favorites.includes(selectedPrompt.id)}
          onToggleFavorite={(e) => toggleFavorite(e, selectedPrompt.id)}
          onClose={() => setSelectedPrompt(null)} 
        />
      )}

      {/* Footer */}
      <footer className="border-t mt-16 py-8 text-center" style={{ borderColor: '#E4E4E7' }}>
        <p className="text-sm" style={{ color: '#A1A1AA' }}>PromptHub · AI提示词模板市场</p>
      </footer>
    </div>
  )
}

function getPlatformEmoji(platform) {
  const emojis = {
    'ChatGPT': '💬',
    'Claude': '🤖',
    'Midjourney': '🎨',
    'Stable Diffusion': '🎭',
    'DALL-E': '🖼️',
    'Gemini': '✨',
  }
  return emojis[platform] || ''
}

function PromptCard({ prompt, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
      style={{ border: '1px solid #E4E4E7' }}
      onClick={onClick}
    >
      {/* Cover */}
      <div 
        className="aspect-video flex items-center justify-center text-4xl"
        style={{ backgroundColor: '#F4F4F5' }}
      >
        {prompt.coverImage}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium line-clamp-2" style={{ color: '#18181B', fontSize: '15px' }}>
            {prompt.title}
          </h3>
          <button
            onClick={onToggleFavorite}
            className="flex-shrink-0 text-lg transition-colors"
            style={{ color: isFavorite ? '#EF4444' : '#D4D4D8' }}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>

        <p className="text-sm line-clamp-2 mb-3" style={{ color: '#71717A' }}>{prompt.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}>
              {prompt.platform}
            </span>
            <span className="text-xs" style={{ color: '#A1A1AA' }}>{prompt.category}</span>
          </div>
          {prompt.price === 0 ? (
            <span className="text-sm font-medium" style={{ color: '#10B981' }}>免费</span>
          ) : (
            <span className="text-sm font-medium" style={{ color: '#6366F1' }}>¥{prompt.price}</span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: '#A1A1AA' }}>
          <span style={{ color: '#F59E0B' }}>★</span>
          <span>{prompt.rating}</span>
          <span>·</span>
          <span>已售 {prompt.salesCount}</span>
          {prompt.isHot && (
            <>
              <span>·</span>
              <span style={{ color: '#F59E0B' }}>热门</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function PromptModal({ prompt, isFavorite, onToggleFavorite, onClose }) {
  const [copied, setCopied] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {showPayment ? (
          <PaymentView 
            prompt={prompt} 
            onBack={() => setShowPayment(false)} 
            onCopy={handleCopy} 
            copied={copied} 
          />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#E4E4E7' }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{prompt.coverImage}</span>
                <div>
                  <h2 className="font-semibold" style={{ color: '#18181B' }}>{prompt.title}</h2>
                  <div className="text-sm" style={{ color: '#71717A' }}>
                    ★ {prompt.rating} · 已售 {prompt.salesCount}
                  </div>
                </div>
              </div>
              <button onClick={onClose} style={{ color: '#71717A' }}>✕</button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2" style={{ color: '#71717A' }}>描述</h3>
                <p style={{ color: '#3F3F46' }}>{prompt.description}</p>
              </div>

              {/* Prompt */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2" style={{ color: '#71717A' }}>提示词</h3>
                <div 
                  className="rounded-lg p-4 text-sm whitespace-pre-wrap overflow-y-auto"
                  style={{ 
                    backgroundColor: '#F4F4F5', 
                    color: '#3F3F46',
                    maxHeight: '200px',
                    fontFamily: 'monospace'
                  }}
                >
                  {prompt.content}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}>
                  {prompt.platform}
                </span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}>
                  {prompt.category}
                </span>
                {prompt.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#F4F4F5', color: '#A1A1AA' }}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Creator */}
              <div className="flex items-center justify-between py-4 border-t" style={{ borderColor: '#E4E4E7' }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{prompt.creator.avatar}</span>
                  <div>
                    <div className="font-medium" style={{ color: '#18181B' }}>{prompt.creator.name}</div>
                    <div className="text-xs" style={{ color: '#A1A1AA' }}>已售 {prompt.creator.sales}</div>
                  </div>
                </div>
                <button 
                  onClick={onToggleFavorite}
                  className="px-4 py-2 rounded-lg text-sm transition-colors"
                  style={{ 
                    backgroundColor: isFavorite ? '#FEF2F2' : '#F4F4F5', 
                    color: isFavorite ? '#EF4444' : '#71717A'
                  }}
                >
                  {isFavorite ? '♥ 已收藏' : '♡ 收藏'}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex gap-3" style={{ borderColor: '#E4E4E7' }}>
              {prompt.price === 0 ? (
                <button
                  onClick={handleCopy}
                  className="flex-1 py-3 rounded-xl font-medium transition-colors"
                  style={{ 
                    backgroundColor: copied ? '#10B981' : '#18181B',
                    color: '#FFFFFF'
                  }}
                >
                  {copied ? '已复制' : '复制提示词'}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 rounded-xl font-medium"
                    style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}
                  >
                    预览
                  </button>
                  <button
                    onClick={() => setShowPayment(true)}
                    className="flex-1 py-3 rounded-xl font-medium"
                    style={{ backgroundColor: '#18181B', color: '#FFFFFF' }}
                  >
                    ¥{prompt.price} 购买
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function PaymentView({ prompt, onBack, onCopy, copied }) {
  const [step, setStep] = useState('qrcode')

  const handlePay = () => {
    setStep('success')
  }

  return (
    <div className="p-6">
      {step === 'qrcode' ? (
        <>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} style={{ color: '#71717A' }}>←</button>
            <span className="font-medium" style={{ color: '#18181B' }}>完成支付</span>
          </div>

          <div className="text-center mb-6">
            <div 
              className="w-48 h-48 mx-auto rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#F4F4F5' }}
            >
              <span className="text-6xl" style={{ color: '#D4D4D8' }}>⊞</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: '#18181B' }}>¥{prompt.price}</div>
          </div>

          <div className="text-center text-sm mb-6" style={{ color: '#71717A' }}>
            请使用微信或支付宝扫描支付
          </div>

          <button
            onClick={handlePay}
            className="w-full py-3 rounded-xl font-medium"
            style={{ backgroundColor: '#18181B', color: '#FFFFFF' }}
          >
            已完成支付
          </button>
        </>
      ) : (
        <>
          <div className="text-center py-8">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#10B981' }}
            >
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#18181B' }}>支付成功</h3>
            <p className="mb-6" style={{ color: '#71717A' }}>现在可以获取提示词了</p>
          </div>

          <button
            onClick={onCopy}
            className="w-full py-3 rounded-xl font-medium mb-3 transition-colors"
            style={{ 
              backgroundColor: copied ? '#10B981' : '#18181B',
              color: '#FFFFFF'
            }}
          >
            {copied ? '已复制到剪贴板' : '复制提示词'}
          </button>
          
          <button 
            onClick={onBack}
            className="w-full py-3 rounded-xl font-medium"
            style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}
          >
            返回
          </button>
        </>
      )}
    </div>
  )
}

export default App
