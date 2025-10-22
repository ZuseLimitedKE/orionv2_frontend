# 🎨 Admin Panel - Visual Design Guide

## Page Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  [☰] ORION                                    👤 User              │
├────────┬───────────────────────────────────────────────────────────┤
│        │  Admin Panel                                               │
│ Menu   │  Manage stock tokens, mint, burn, and view statistics     │
│        ├───────────────────────────────────────────────────────────┤
│ • Home │  [Dashboard] [Create] [Mint] [Burn] [Transactions]       │
│ • Market│                                                           │
│ • Admin│  ┌──────────────────────────────────────────────────┐   │
│        │  │ 📊 DASHBOARD TAB                                  │   │
│        │  │                                                    │   │
│        │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐│   │
│        │  │  │ Activity │ │  Users   │ │ Trending │ │ Coins││   │
│        │  │  │    5     │ │   123    │ │ $15.2K   │ │$8.5K ││   │
│        │  │  └──────────┘ └──────────┘ └──────────┘ └──────┘│   │
│        │  │                                                    │   │
│        │  │  Stock Tokens                                     │   │
│        │  │  ┌────────────────┐ ┌────────────────┐          │   │
│        │  │  │ AAPL           │ │ TSLA           │          │   │
│        │  │  │ Apple Inc.     │ │ Tesla Inc.     │          │   │
│        │  │  │ [ACTIVE]       │ │ [ACTIVE]       │          │   │
│        │  │  │ ──────────────│ │ ──────────────│          │   │
│        │  │  │ Price: $150.50 │ │ Price: $245.30 │          │   │
│        │  │  │ Supply: 1,000  │ │ Supply: 500    │          │   │
│        │  │  └────────────────┘ └────────────────┘          │   │
│        │  └──────────────────────────────────────────────────┘   │
└────────┴───────────────────────────────────────────────────────────┘
```

## Color Scheme

### Primary Colors
```
🟦 Primary Blue   - #3b82f6 - Buttons, links, active states
🟩 Success Green  - #10b981 - Mint operations, positive values
🟥 Danger Red     - #ef4444 - Burn operations, errors
🟨 Warning Yellow - #f59e0b - Suspended stocks, warnings
🟪 Info Purple    - #8b5cf6 - Transfer operations
```

### Neutral Colors
```
⬜ Background     - #ffffff - Page background
⬛ Foreground     - #0f172a - Primary text
🔳 Muted         - #64748b - Secondary text
🔲 Border        - #e2e8f0 - Borders and dividers
```

## Components Visual Guide

### 1. Stats Cards
```
┌────────────────────────┐
│ 📊 Metric Label    [i] │
│                         │
│    1,234                │  ← Large bold number
│    ↑ Description        │  ← Small muted text
└────────────────────────┘
```

### 2. Stock Cards
```
┌─────────────────────────────┐
│ AAPL              [ACTIVE]  │  ← Header with badge
│ Apple Inc.                  │
├─────────────────────────────┤
│ Price          💲 150.50    │
│ Total Supply      1,000     │
│ Circulating    ↗️ 300       │  ← Green with arrow
│ Pool Balance   ↘️ 700       │  ← Blue with arrow
│ ┌─────────────────────────┐│
│ │ Total Value  $45,150.00 ││  ← Highlighted box
│ └─────────────────────────┘│
└─────────────────────────────┘
```

### 3. Forms Layout
```
┌───────────────────────────────────┐
│ 🎯 Form Title                     │
│ Description text here             │
├───────────────────────────────────┤
│ Label *                           │
│ ┌───────────────────────────────┐│
│ │ Input field                   ││
│ └───────────────────────────────┘│
│ Error text (if any)              │
│                                   │
│ ┌─────────────────────────────┐ │
│ │  Submit Button              │ │  ← Full width
│ └─────────────────────────────┘ │
└───────────────────────────────────┘
```

### 4. Transactions Table
```
┌─────────────────────────────────────────────────────────┐
│ 🔍 Filters                                              │
│ [Symbol ▼] [Type ▼] [Status ▼]                        │
├─────────┬──────────┬────────┬──────────┬──────────────┤
│ Symbol  │ Type     │ Amount │ Status   │ Date         │
├─────────┼──────────┼────────┼──────────┼──────────────┤
│ AAPL    │ [MINT]   │  1,000 │ ✅ Done  │ Oct 23, 2PM  │
│ TSLA    │ [BURN]   │    500 │ ⏳ Pend  │ Oct 23, 3PM  │
└─────────┴──────────┴────────┴──────────┴──────────────┘
```

## Interactive States

### Buttons
```
Default:   [─────── Button ───────]
Hover:     [═══════ Button ═══════]  ← Slightly darker
Active:    [▓▓▓▓▓▓▓ Button ▓▓▓▓▓▓▓]  ← Pressed look
Disabled:  [       Button       ]  ← Grayed out
Loading:   [⟳ Loading...        ]  ← Spinner
```

### Input Fields
```
Empty:     ┌──────────────────┐
           │                  │
           └──────────────────┘

Focused:   ┌══════════════════┐  ← Blue ring
           ║                  ║
           └══════════════════┘

Error:     ┌──────────────────┐  ← Red border
           │                  │
           └──────────────────┘
           ⚠️ Error message
```

### Badges
```
Active:    [  ACTIVE  ]   ← Green background
Suspended: [SUSPENDED ]   ← Yellow background
Failed:    [  FAILED  ]   ← Red background
Pending:   [ PENDING  ]   ← Gray background
```

## Spacing System

```
xs:  4px   - Tight spacing (icon gaps)
sm:  8px   - Small spacing (within components)
md:  16px  - Medium spacing (between elements)
lg:  24px  - Large spacing (section gaps)
xl:  32px  - Extra large (page sections)
2xl: 48px  - Huge spacing (major divisions)
```

## Typography Scale

```
3xl: 30px  - Page titles
2xl: 24px  - Section titles
xl:  20px  - Card titles
lg:  18px  - Large text
base: 16px - Body text
sm:  14px  - Small text
xs:  12px  - Tiny text (captions)
```

## Responsive Breakpoints

```
Mobile:  < 640px   - 1 column, stacked layout
Tablet:  640-1024  - 2 columns, full sidebar
Desktop: > 1024    - 3-4 columns, all features
```

## Animation Guidelines

### Transitions
- Duration: 150-300ms
- Easing: ease-in-out
- Properties: colors, transforms, opacity

### Loading Spinners
- Size: 16px (buttons), 24px (cards)
- Color: Current text color
- Animation: Continuous spin

### Skeleton Loaders
- Background: Muted gray
- Animation: Shimmer effect
- Duration: 1.5s loop

## Icon Usage

```
📊 - Dashboard/Stats
➕ - Create/Add
🪙 - Mint/Coins
🔥 - Burn/Delete
👤 - User
💲 - Price/Money
📈 - Trending Up
📉 - Trending Down
🔍 - Search/Filter
⚙️ - Settings
✅ - Success
❌ - Error
⏳ - Pending
🔗 - External Link
```

## Best Practices

### Do's ✅
- Use consistent spacing
- Maintain color hierarchy
- Add loading states
- Show clear errors
- Use icons for actions
- Group related content
- Provide feedback (toasts)

### Don'ts ❌
- Don't mix color meanings
- Don't hide critical info
- Don't skip loading states
- Don't use vague labels
- Don't overcrowd layouts
- Don't ignore mobile users

## Accessibility

```
Keyboard:     Tab navigation works
Screen Readers: ARIA labels present
Contrast:      WCAG AA compliant
Focus:         Visible focus rings
Touch:         48px+ target size
```

## Dark Mode (Future)

```
Background: #0f172a → #1e293b
Foreground: #ffffff → #f1f5f9
Cards:      #ffffff → #334155
Borders:    #e2e8f0 → #475569
```

---

This design system ensures consistency and beauty across the admin panel!
