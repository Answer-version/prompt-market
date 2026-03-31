import { useState, useMemo, useEffect, useRef } from 'react'
import { prompts, categories, platforms, sortOptions } from './data/prompts'

// Format large numbers to K format
function formatCount(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K'
  }
  return num.toString()
}

// Pages
const PAGE_PROMPTS = 'prompts'
const PAGE_COMMUNITY = 'community'
const PAGE_DOCS = 'docs'
const PAGE_FEEDBACK = 'feedback'

function App() {
  const [currentPage, setCurrentPage] = useState(PAGE_PROMPTS)
  const [showToolsDropdown, setShowToolsDropdown] = useState(false)
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        showToolsDropdown={showToolsDropdown}
        onToggleTools={() => setShowToolsDropdown(!showToolsDropdown)}
      />
      
      {/* Main Content */}
      <main className="flex-1 pt-14">
        {currentPage === PAGE_PROMPTS && <PromptsPage />}
        {currentPage === PAGE_COMMUNITY && <CommunityPage />}
        {currentPage === PAGE_DOCS && <DocsPage />}
        {currentPage === PAGE_FEEDBACK && <FeedbackPage />}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

function Header({ currentPage, onNavigate, showToolsDropdown, onToggleTools }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  return (
    <header className="h-14 bg-white border-b flex items-center px-4 fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center gap-6 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); onNavigate(PAGE_PROMPTS); }}>
          <span className="text-lg">💡</span>
          <span className="font-semibold text-gray-900">PromptHub</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink active={currentPage === PAGE_PROMPTS} onClick={() => onNavigate(PAGE_PROMPTS)}>
            提示词
          </NavLink>
          <NavLink active={currentPage === PAGE_COMMUNITY} onClick={() => onNavigate(PAGE_COMMUNITY)}>
            社区提示词
          </NavLink>
          <NavLink active={currentPage === PAGE_DOCS} onClick={() => onNavigate(PAGE_DOCS)}>
            使用说明
          </NavLink>
          
          {/* Tools Dropdown */}
          <div className="relative">
            <button 
              className={`px-3 py-2 text-sm rounded-lg flex items-center gap-1 ${
                showToolsDropdown ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={onToggleTools}
            >
              应用工具
              <span className="text-xs">▾</span>
            </button>
            {showToolsDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg py-1">
                <div className="px-4 py-2 text-xs text-gray-400 border-b">应用工具</div>
                <a href="https://imgprompt.top" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  📷 IMGPrompt - 图片提示词生成
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-400">
                  🎬 AI视频 (即将上线)
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-400">
                  💬 ChatGPT中文调教 (即将上线)
                </a>
              </div>
            )}
          </div>
          
          <NavLink active={currentPage === PAGE_FEEDBACK} onClick={() => onNavigate(PAGE_FEEDBACK)}>
            反馈建议
          </NavLink>
        </nav>

        <div className="flex-1" />
        
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com/Answer-version/prompt-market" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            <span>⭐</span>
            <span className="hidden lg:inline">Star</span>
          </a>
          
          <a 
            href="https://github.com/Answer-version/prompt-market" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            <span>🐙</span>
            <span className="hidden lg:inline">GitHub</span>
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100"
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden">
          <nav className="flex flex-col p-4 gap-1">
            <MobileNavLink active={currentPage === PAGE_PROMPTS} onClick={() => { onNavigate(PAGE_PROMPTS); setShowMobileMenu(false); }}>
              提示词
            </MobileNavLink>
            <MobileNavLink active={currentPage === PAGE_COMMUNITY} onClick={() => { onNavigate(PAGE_COMMUNITY); setShowMobileMenu(false); }}>
              社区提示词
            </MobileNavLink>
            <MobileNavLink active={currentPage === PAGE_DOCS} onClick={() => { onNavigate(PAGE_DOCS); setShowMobileMenu(false); }}>
              使用说明
            </MobileNavLink>
            <MobileNavLink active={currentPage === PAGE_FEEDBACK} onClick={() => { onNavigate(PAGE_FEEDBACK); setShowMobileMenu(false); }}>
              反馈建议
            </MobileNavLink>
            <div className="border-t pt-2 mt-2 flex gap-4">
              <a href="https://github.com/Answer-version/prompt-market" className="text-sm text-gray-600">⭐ GitHub</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm rounded-lg ${
        active 
          ? 'bg-gray-100 text-gray-900 font-medium' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )
}

function MobileNavLink({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm rounded-lg text-left ${
        active 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-lg">💡</span>
            <span>PromptHub</span>
            <span className="text-gray-300">|</span>
            <span>AI提示词模板市场</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="https://github.com/Answer-version/prompt-market" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
              GitHub
            </a>
            <a href="#" onClick={(e) => { e.preventDefault() }} className="hover:text-gray-600">
              使用说明
            </a>
            <a href="#" onClick={(e) => { e.preventDefault() }} className="hover:text-gray-600">
              反馈建议
            </a>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-400 mt-4">
          © 2026 PromptHub. 仅供学习参考。
        </div>
      </div>
    </footer>
  )
}

// ==================== PROMPTS PAGE ====================
function PromptsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('prompthub-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [showFavorites, setShowFavorites] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState('list')
  const [filterMode, setFilterMode] = useState('OR')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem('prompthub-favorites', JSON.stringify(favorites))
  }, [favorites])

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  const toggleFavorite = (e, promptId) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    )
  }

  const handleCopy = (e, content, id) => {
    e.stopPropagation()
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    showToast('已复制到剪贴板')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredPrompts = useMemo(() => {
    let result = showFavorites 
      ? prompts.filter(p => favorites.includes(p.id))
      : prompts

    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (selectedSubCategory !== 'all') {
      result = result.filter(p => p.subCategory === selectedSubCategory)
    }

    if (selectedPlatform !== 'all') {
      result = result.filter(p => p.platform === selectedPlatform)
    }

    switch (sortBy) {
      case 'popular':
        result = [...result].sort((a, b) => b.useCount - a.useCount)
        break
      case 'newest':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'useCount':
        result = [...result].sort((a, b) => b.useCount - a.useCount)
        break
    }

    return result
  }, [searchQuery, selectedPlatform, selectedCategory, selectedSubCategory, sortBy, showFavorites, favorites])

  const getCategoryCount = (categoryKey) => {
    if (categoryKey === 'all') return prompts.length
    return prompts.filter(p => p.category === categoryKey).length
  }

  const getSubCategories = (categoryKey) => {
    if (categoryKey === 'all') return []
    const cat = categories.find(c => c.key === categoryKey)
    return cat ? cat.subCategories : []
  }

  const currentSubCategories = getSubCategories(selectedCategory)

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="p-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1 min-w-48 max-w-md">
            <input
              type="text"
              placeholder="搜索提示词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg text-sm bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* Favorites Toggle */}
          <button 
            onClick={() => setShowFavorites(!showFavorites)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
              showFavorites 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 bg-gray-100'
            }`}
          >
            ❤️ {favorites.length}
          </button>

          {/* Mobile Filter */}
          <button 
            onClick={() => setShowMobileFilter(true)}
            className="md:hidden h-9 px-3 rounded-lg bg-gray-100 text-gray-600"
          >
            ☰ 筛选
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-3 rounded-lg text-sm bg-white border"
          >
            {sortOptions.map(o => (
              <option key={o.key} value={o.key}>{o.name}</option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex rounded-lg border overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 h-9 text-sm ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
            >
              ☰
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 h-9 text-sm ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
            >
              ⊞
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-48 flex-shrink-0">
            <div className="bg-white border rounded-lg p-4 sticky top-20">
              <DesktopSidebar
                categories={categories}
                platforms={platforms}
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                selectedPlatform={selectedPlatform}
                onCategoryChange={(c) => { setSelectedCategory(c); setSelectedSubCategory('all'); }}
                onSubCategoryChange={setSelectedSubCategory}
                onPlatformChange={setSelectedPlatform}
                getCategoryCount={getCategoryCount}
                getSubCategories={getSubCategories}
              />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Active Filters */}
            {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || selectedPlatform !== 'all') && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-gray-500">筛选:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="ml-1">×</button>
                  </span>
                )}
                {selectedSubCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                    {selectedSubCategory}
                    <button onClick={() => setSelectedSubCategory('all')} className="ml-1">×</button>
                  </span>
                )}
                {selectedPlatform !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 text-xs rounded">
                    {selectedPlatform}
                    <button onClick={() => setSelectedPlatform('all')} className="ml-1">×</button>
                  </span>
                )}
                <button 
                  onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); setSelectedPlatform('all'); }}
                  className="text-xs text-blue-500 hover:underline"
                >
                  清除全部
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="text-sm text-gray-500 mb-4">
              {showFavorites ? '我的收藏' : '全部'} · {filteredPrompts.length} 个提示词
            </div>

            {/* List/Grid */}
            {filteredPrompts.length > 0 ? (
              viewMode === 'list' ? (
                <div className="space-y-3">
                  {filteredPrompts.map(prompt => (
                    <PromptListItem 
                      key={prompt.id} 
                      prompt={prompt} 
                      isFavorite={favorites.includes(prompt.id)}
                      onToggleFavorite={(e) => toggleFavorite(e, prompt.id)}
                      onCopy={(e) => handleCopy(e, prompt.content, prompt.id)}
                      onClick={() => setSelectedPrompt(prompt)}
                      copied={copiedId === prompt.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredPrompts.map(prompt => (
                    <PromptGridItem 
                      key={prompt.id} 
                      prompt={prompt} 
                      isFavorite={favorites.includes(prompt.id)}
                      onToggleFavorite={(e) => toggleFavorite(e, prompt.id)}
                      onCopy={(e) => handleCopy(e, prompt.content, prompt.id)}
                      onClick={() => setSelectedPrompt(prompt)}
                      copied={copiedId === prompt.id}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 text-gray-400">
                {showFavorites ? '暂无收藏' : '无匹配结果'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">筛选</span>
                <button onClick={() => setShowMobileFilter(false)} className="text-gray-400">✕</button>
              </div>
              <MobileSidebar
                categories={categories}
                platforms={platforms}
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                selectedPlatform={selectedPlatform}
                onCategoryChange={(c) => { setSelectedCategory(c); setSelectedSubCategory('all'); }}
                onSubCategoryChange={setSelectedSubCategory}
                onPlatformChange={setSelectedPlatform}
                getCategoryCount={getCategoryCount}
                getSubCategories={getSubCategories}
                onClose={() => setShowMobileFilter(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedPrompt && (
        <PromptModal 
          prompt={selectedPrompt} 
          isFavorite={favorites.includes(selectedPrompt.id)}
          onToggleFavorite={(e) => toggleFavorite(e, selectedPrompt.id)}
          onCopy={(e) => handleCopy(e, selectedPrompt.content, selectedPrompt.id)}
          copied={copiedId === selectedPrompt.id}
          onClose={() => setSelectedPrompt(null)} 
        />
      )}
    </>
  )
}

function DesktopSidebar({ categories, platforms, selectedCategory, selectedSubCategory, selectedPlatform, onCategoryChange, onSubCategoryChange, onPlatformChange, getCategoryCount, getSubCategories }) {
  return (
    <div>
      {/* Category */}
      <div className="mb-6">
        <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">分类</h3>
        <div className="space-y-0.5">
          {categories.map(cat => (
            <div key={cat.key}>
              <button
                onClick={() => onCategoryChange(cat.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                  selectedCategory === cat.key
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs opacity-60">{getCategoryCount(cat.key)}</span>
              </button>
              {selectedCategory === cat.key && cat.subCategories?.length > 0 && (
                <div className="ml-4 mt-1 space-y-0.5">
                  <button
                    onClick={() => onSubCategoryChange('all')}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                      selectedSubCategory === 'all'
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    全部
                  </button>
                  {cat.subCategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => onSubCategoryChange(sub)}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                        selectedSubCategory === sub
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Platform */}
      <div>
        <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">平台</h3>
        <div className="space-y-0.5">
          <button
            onClick={() => onPlatformChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
              selectedPlatform === 'all'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>全部</span>
            <span className="text-xs opacity-60">{platforms[0].count}</span>
          </button>
          {platforms.filter(p => p.key !== 'all').map(p => (
            <button
              key={p.key}
              onClick={() => onPlatformChange(p.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                selectedPlatform === p.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{p.name}</span>
              <span className="text-xs opacity-60">{p.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileSidebar({ categories, platforms, selectedCategory, selectedSubCategory, selectedPlatform, onCategoryChange, onSubCategoryChange, onPlatformChange, getCategoryCount, getSubCategories, onClose }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">分类</h3>
        <div className="space-y-0.5">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => { onCategoryChange(cat.key); onClose(); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                selectedCategory === cat.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs opacity-60">{getCategoryCount(cat.key)}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">平台</h3>
        <div className="space-y-0.5">
          {platforms.map(p => (
            <button
              key={p.key}
              onClick={() => { onPlatformChange(p.key); onClose(); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                selectedPlatform === p.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600'
              }`}
            >
              <span>{p.name}</span>
              <span className="text-xs opacity-60">{p.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function PromptListItem({ prompt, isFavorite, onToggleFavorite, onCopy, onClick, copied }) {
  return (
    <div 
      className="bg-white border rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900">{prompt.title}</h3>
            {prompt.isHot && <span className="text-orange-500">🔥</span>}
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{prompt.platform}</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{prompt.category}</span>
            {prompt.subCategory && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{prompt.subCategory}</span>
            )}
            {prompt.isUserShared && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-orange-50 text-orange-600">用户分享</span>
            )}
            <span className="text-xs text-gray-400">🔥 {formatCount(prompt.useCount)}</span>
          </div>

          <p className="text-sm text-gray-500 line-clamp-1 mb-2">{prompt.description}</p>
          
          <div className="text-xs text-gray-400 font-mono line-clamp-2 bg-gray-50 rounded p-2">
            {prompt.content.slice(0, 150)}...
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            onClick={onToggleFavorite}
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
          >
            {isFavorite ? '❤️' : '♡'}
          </button>
          <button
            onClick={onCopy}
            className={`h-8 px-3 rounded-lg flex items-center justify-center text-xs font-medium ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white'}`}
          >
            {copied ? '已复制' : '复制'}
          </button>
          {prompt.sourceUrl && (
            <a href={prompt.sourceUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100" title="查看来源">
              🔗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function PromptGridItem({ prompt, isFavorite, onToggleFavorite, onCopy, onClick, copied }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer" onClick={onClick}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{prompt.title}</h3>
          <button onClick={onToggleFavorite} className={`flex-shrink-0 w-7 h-7 rounded flex items-center justify-center ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
            {isFavorite ? '❤️' : '♡'}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-1 mb-2">
          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{prompt.platform}</span>
          {prompt.isHot && <span className="text-orange-500 text-sm">🔥</span>}
          {prompt.isUserShared && <span className="text-xs px-1.5 py-0.5 rounded bg-orange-50 text-orange-600">用户分享</span>}
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{prompt.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">🔥 {formatCount(prompt.useCount)}</span>
          <button onClick={onCopy} className={`h-7 px-2 rounded text-xs font-medium ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white'}`}>
            {copied ? '已复制' : '复制'}
          </button>
        </div>
      </div>
    </div>
  )
}

function PromptModal({ prompt, isFavorite, onToggleFavorite, onCopy, copied, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-xl w-full sm:max-w-xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{prompt.coverImage}</span>
            <div className="min-w-0">
              <h2 className="font-semibold text-gray-900 text-sm truncate">{prompt.title}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>🔥 {formatCount(prompt.useCount)}</span>
                {prompt.isHot && <span className="text-orange-500">🔥 热门</span>}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{prompt.platform}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{prompt.category}</span>
            {prompt.subCategory && <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">{prompt.subCategory}</span>}
            {prompt.isUserShared && <span className="text-xs px-2 py-0.5 rounded bg-orange-50 text-orange-600">用户分享</span>}
            {prompt.tags.map(tag => (<span key={tag} className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600">#{tag}</span>))}
          </div>

          <div className="mb-4">
            <h3 className="text-xs font-medium text-gray-400 mb-1">描述</h3>
            <p className="text-gray-700 text-sm">{prompt.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">提示词</h3>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-wrap font-mono overflow-x-auto max-h-48">
              {prompt.content}
            </div>
          </div>

          {prompt.sourceUrl && (
            <div className="mt-4 pt-3 border-t">
              <a href={prompt.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                🔗 查看来源
              </a>
            </div>
          )}

          <div className="flex items-center gap-3 mt-4 pt-3 border-t">
            <span className="text-lg">{prompt.creator.avatar}</span>
            <div>
              <div className="font-medium text-gray-900 text-sm">{prompt.creator.name}</div>
              <div className="text-xs text-gray-400">已使用 {formatCount(prompt.useCount)} 次</div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex gap-2">
          <button onClick={onToggleFavorite} className={`px-3 py-2 rounded-lg text-xs ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600'}`}>
            {isFavorite ? '❤️ 已收藏' : '♡ 收藏'}
          </button>
          <button onClick={onCopy} className={`flex-1 py-2 rounded-lg text-xs font-medium text-white ${copied ? 'bg-green-500' : 'bg-blue-600'}`}>
            {copied ? '已复制到剪贴板' : '复制提示词'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ==================== COMMUNITY PAGE ====================
function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">🤝 分享你的提示词</h1>
        <p className="text-gray-600 mb-4">
          你有优质的提示词想和大家分享吗？提交到我们的社区，让更多人受益！
        </p>
        <a 
          href="https://github.com/Answer-version/prompt-market" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          🔗 在 GitHub 上提交
        </a>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🔥 更多内容</h2>
        <p className="text-gray-600 mb-4">
          想要更多优质的 ChatGPT 提示词？去看看这些优秀项目：
        </p>
        <div className="space-y-3">
          <a 
            href="https://github.com/f/awesome-chatgpt-prompts" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <span className="text-2xl">📝</span>
            <div>
              <div className="font-medium text-gray-900">awesome-chatgpt-prompts</div>
              <div className="text-sm text-gray-500">ChatGPT 官方提示词合集</div>
            </div>
          </a>
          <a 
            href="https://github.com/rockbenben/ChatGPT-Shortcut" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <span className="text-2xl">⚡</span>
            <div>
              <div className="font-medium text-gray-900">ChatGPT-Shortcut</div>
              <div className="text-sm text-gray-500">AI Short 官方项目</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

// ==================== DOCS PAGE ====================
function DocsPage() {
  const [activeSection, setActiveSection] = useState('intro')
  
  const sections = [
    { key: 'intro', name: '入门指南', icon: '📖' },
    { key: 'faq', name: '常见问题', icon: '❓' },
    { key: 'changelog', name: '更新日志', icon: '📝' },
    { key: 'related', name: '相关项目', icon: '🔗' },
  ]
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="hidden md:block w-56 border-r bg-white fixed left-0 top-14 bottom-0 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-xs font-medium text-gray-400 uppercase mb-3">目录</h3>
          <div className="space-y-1">
            {sections.map(s => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                  activeSection === s.key ? 'bg-gray-100 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
      
      {/* Content */}
      <main className="flex-1 md:ml-56 p-6">
        <div className="max-w-3xl">
          {activeSection === 'intro' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">📖 入门指南</h1>
              
              <div className="prose prose-gray">
                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">什么是 PromptHub？</h2>
                <p className="text-gray-600 mb-4">
                  PromptHub 是一个免费的 AI 提示词模板市场，收录了来自 ChatGPT、Claude、Midjourney 等主流 AI 平台的优质提示词。用户可以快速找到需要的提示词，一键复制即可使用。
                </p>
                
                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">如何使用？</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
                  <li>浏览或搜索你需要的提示词</li>
                  <li>点击卡片查看详情</li>
                  <li>点击「复制」按钮复制提示词</li>
                  <li>将提示词粘贴到对应的 AI 平台使用</li>
                </ol>
                
                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">支持的平台</h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">💬 ChatGPT</div>
                    <div className="text-sm text-gray-500">OpenAI 的对话AI</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">🤖 Claude</div>
                    <div className="text-sm text-gray-500">Anthropic 的AI助手</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">🎨 Midjourney</div>
                    <div className="text-sm text-gray-500">AI 图像生成工具</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">🎭 Stable Diffusion</div>
                    <div className="text-sm text-gray-500">开源图像生成模型</div>
                  </div>
                </div>
                
                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">提示词中的 {'{}'} 是什么意思？</h2>
                <p className="text-gray-600 mb-4">
                  {'{}'} 中的内容是需要你替换的变量。例如：
                  <code className="mx-1 px-1 py-0.5 bg-gray-100 rounded text-sm">{"Hi {name}, welcome to {place}!"}</code>
                  <br />
                 你应该替换为：Hi 小明, welcome to 北京!
                </p>
              </div>
            </div>
          )}
          
          {activeSection === 'faq' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">❓ 常见问题</h1>
              
              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer">Q: 这些提示词免费吗？</summary>
                  <p className="text-gray-600 mt-2">A: 是的，PromptHub 上所有提示词模板都是免费的。</p>
                </details>
                
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer">Q: 可以商用吗？</summary>
                  <p className="text-gray-600 mt-2">A: 仅供个人学习参考使用。商业使用请注意各 AI 平台的使用条款。</p>
                </details>
                
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer">Q: 如何提交新的提示词？</summary>
                  <p className="text-gray-600 mt-2">A: 欢迎提交！请在 GitHub 上提交 Pull Request，或者在反馈建议页面告诉我们。</p>
                </details>
                
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer">Q: 收藏的提示词会丢失吗？</summary>
                  <p className="text-gray-600 mt-2">A: 收藏数据保存在浏览器本地，清除浏览器缓存会导致收藏丢失。建议定期导出。</p>
                </details>
              </div>
            </div>
          )}
          
          {activeSection === 'changelog' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">📝 更新日志</h1>
              
              <div className="space-y-6">
                <div className="border-l-2 border-gray-200 pl-4">
                  <div className="text-sm text-gray-500 mb-1">2026-03-31</div>
                  <div className="font-medium text-gray-900 mb-2">v1.0.0 发布</div>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>✨ 首次发布</li>
                    <li>💡 支持 30+ 提示词模板</li>
                    <li>🎨 支持 6 个主流 AI 平台</li>
                    <li>📱 响应式设计，手机电脑都能用</li>
                    <li>❤️ 收藏功能</li>
                    <li>📋 一键复制</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'related' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">🔗 相关项目</h1>
              
              <div className="space-y-4">
                <a href="https://github.com/f/awesome-chatgpt-prompts" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="font-medium text-gray-900">awesome-chatgpt-prompts</div>
                  <div className="text-sm text-gray-500 mt-1">ChatGPT 官方提示词收集项目</div>
                </a>
                <a href="https://github.com/rockbenben/ChatGPT-Shortcut" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="font-medium text-gray-900">ChatGPT-Shortcut</div>
                  <div className="text-sm text-gray-500 mt-1">AI Short 官方项目</div>
                </a>
                <a href="https://github.com/samber/awesome-prompts-for-chatgpt" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="font-medium text-gray-900">awesome-prompts-for-chatgpt</div>
                  <div className="text-sm text-gray-500 mt-1">更多 ChatGPT 提示词精选</div>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// ==================== FEEDBACK PAGE ====================
function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('bug')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In real app, this would send to a backend
    setSubmitted(true)
  }
  
  if (submitted) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="bg-white rounded-xl border p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">反馈已提交</h2>
          <p className="text-gray-600 mb-6">感谢你的反馈！我们会尽快处理。</p>
          <button 
            onClick={() => { setSubmitted(false); setDescription(''); setEmail(''); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
          >
            继续反馈
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-xl border p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">💬 反馈建议</h1>
        <p className="text-gray-600 mb-6">
          遇到问题或有新功能建议？告诉我们！
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">反馈类型</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFeedbackType('bug')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  feedbackType === 'bug' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                🐛 Bug 报告
              </button>
              <button
                type="button"
                onClick={() => setFeedbackType('feature')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  feedbackType === 'feature' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                ✨ 功能建议
              </button>
              <button
                type="button"
                onClick={() => setFeedbackType('other')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  feedbackType === 'other' ? 'bg-gray-200 text-gray-700 border border-gray-300' : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                其他
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">问题描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请详细描述你的问题或建议..."
              rows={5}
              required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">联系方式（选填）</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="邮箱或微信..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">上传图片（选填）</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="text-gray-400 mb-2">📷</div>
              <div className="text-sm text-gray-500">拖拽图片到这里 或 点击上传</div>
              <div className="text-xs text-gray-400 mt-1">支持 JPG, PNG 格式</div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            提交反馈
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-gray-500">
            也欢迎在 GitHub 上提交 Issue：
          </p>
          <a 
            href="https://github.com/Answer-version/prompt-market/issues" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm mt-1"
          >
            🔗 GitHub Issues
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
