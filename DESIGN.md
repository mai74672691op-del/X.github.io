# DESIGN.md - AI 训练师个人网站设计规范

## 1. Visual Theme & Atmosphere (视觉主题与氛围)
- **设计哲学**: 深邃、克制、神秘。通过极简的高对比度黑白调与细腻的线稿，传达“AI训练师在海量数据中寻找秩序（黑洞引力）”的哲学意味。
- **氛围关键词**: Cosmic (宇宙的), Cryptic (神秘的), Elegant (优雅的), Tech-Noir (暗黑科技).
- **一句话定调**: 一场向数据深渊的优雅坠落。

## 2. Color Palette & Roles (色板体系)
```css
:root {
  /* Backgrounds */
  --bg-primary: #050505; /* 纯黑略带微光 */
  --bg-secondary: #0A0A0A; /* 卡片/次级区域背景 */
  --bg-tertiary: #141414; /* 边框/悬停反馈 */

  /* Typography */
  --text-primary: #F2F2F2; /* 银白，主标题与核心内容 */
  --text-secondary: #A3A3A3; /* 浅灰，次要信息与正文 */
  --text-muted: #525252; /* 暗灰，辅助说明/标签 */

  /* Accents & Glows */
  --accent-glow: rgba(255, 255, 255, 0.08); /* 极弱的泛光点缀 */
  --accent-line: rgba(255, 255, 255, 0.12); /* 线稿与分割线 */
  
  /* Semantics */
  --color-success: #10B981;
  --color-error: #EF4444;
}
```

## 3. Typography Rules (排版与字体规则)
- **中文字体**: 大标题优先使用 `Noto Serif SC` (思源宋体)，配合衬线体传达高级人文感；正文阅读使用 `Noto Sans SC` (思源黑体)。
- **英文字体**: `Playfair Display` (衬线大标题) / `Inter` (无衬线UI文本)。
- **字号层级**:
  - `Hero Title`: 80px (Mobile 48px), 衬线体, letter-spacing: -0.02em, 粗细 400.
  - `H2 (Section)`: 40px, 衬线体, letter-spacing: -0.01em.
  - `H3 (Card)`: 24px, 无衬线体, font-weight: 500.
  - `Body`: 16px, 无衬线体, 行高 1.8, letter-spacing: 0.02em.
- **排版原则**: 采用大面积留白（White Space），文字模块间距拉开。中英混排时必须加空格。

## 4. Component Stylings (组件样式)
- **数字痕迹 (Cards)**: 极简边框 (`1px solid var(--accent-line)`), 纯黑背景。Hover时边框发光 (`box-shadow: 0 0 24px var(--accent-glow)`) 并伴随极轻微的 `scale(1.01)`。
- **按钮 (Buttons)**: 幽灵按钮 (Ghost Button)。透明背景，白色边框。Hover时反转为白底黑字。
- **导航 (Navigation)**: 顶部固定，玻璃态模糊 (`backdrop-filter: blur(12px)`), 背景色 `rgba(5,5,5,0.6)`，下滑时渐渐显现。

## 5. Layout Principles (布局原则)
- **网格系统 (Grid)**: 12列流式网格，最大容器宽度 `1200px`，两侧边距 `24px`。
- **间距梯度 (Spacing)**: 采用 8px 倍数梯度。Section 之间距至少保持 `128px` 留白（Mobile 保持 `80px`）。

## 6. Depth & Elevation (层级与景深)
摒弃传统的厚重投影，采用**发光 (Glow)** 和 **边框 (Border)** 定义层级。
- `Elevation 1` (默认): `0 0 0 1px var(--accent-line)`
- `Elevation 2` (Hover): `0 0 24px var(--accent-glow), 0 0 0 1px rgba(255,255,255,0.2)`

## 7. Animation & Interaction (动效与交互 - L3 沉浸体验)
- **序章 (Hero 3D)**: WebGL 3D 粒子黑洞或深空线稿漩涡。支持鼠标跟随微旋转（致敬V0的 3D Lanyard 交互质感）。标题采用缓动遮罩出现 (Mask Reveal)。
- **滚动叙事 (Scroll-story)**: 
  - **视差滚动 (Parallax)**: 背景星尘线稿与前景内容的差速滚动。
  - **文本浮现 (ScrollReveal)**: 各 Section (序章、数字痕迹、关于我、边角碎念) 滚动进入视口时，元素依次 `translateY` 渐现。
- **自定义光标 (Custom Cursor)**: 仅 Desktop 启用，光标跟随并在悬停交互元素时放大、反色或吸附。

## 8. Do's and Don'ts (设计护栏)
- **Do**: 保持极致的克制，多用留白，让内容呼吸。
- **Do**: 确保 3D 效果在移动端降级为静态线稿或轻量 CSS 动画，避免卡顿。
- **Do**: 严格控制文字的对比度，确保在深色模式下的阅读舒适度。
- **Don't**: 绝对不要使用高饱和度的大面积纯色。
- **Don't**: 不要使用默认的浏览器滚动条，需定制暗色极简滚动条或隐藏。
- **Don't**: 避免页面上同时存在超过一个 WebGL Canvas 导致主线程阻塞。
- **Don't**: 移动端不可强制保留 Hover 相关的复杂光标交互。

## 9. Responsive Behavior (响应式行为)
- **Desktop (≥1024px)**: 完整的 3D 交互、自定义光标与视差滚动。
- **Tablet (768px - 1023px)**: 简化网格布局为 2-4 列，适度缩小字号。
- **Mobile (≤767px)**: 3D 效果降级为性能友好的 2D 粒子或静态深空图片。全局间距缩小至 `16px`。采用汉堡菜单导航。