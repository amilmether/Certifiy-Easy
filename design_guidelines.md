# Certificate Generator - Design Guidelines

## Design Approach
**Liquid Glass Morphism** - A modern glassmorphism aesthetic with frosted glass effects, subtle gradients, and depth through layering. This approach creates a premium, contemporary feel while maintaining clarity for productivity-focused features. Primary inspiration: KTUHUB reference image with translucent panels, soft shadows, and layered depth.

## Typography System

**Font Stack**: 
- Primary: Inter (via Google Fonts) - Clean, modern sans-serif for UI elements
- Accent: Poppins (via Google Fonts) - Bold, confident headers

**Hierarchy**:
- Hero/Page Titles: Poppins Bold, 3xl-4xl (desktop), 2xl-3xl (mobile)
- Section Headers: Poppins SemiBold, 2xl-3xl (desktop), xl-2xl (mobile)
- Card Titles: Inter SemiBold, lg-xl
- Body Text: Inter Regular, base (16px)
- Labels/Meta: Inter Medium, sm-base
- Buttons: Inter SemiBold, sm-base

## Layout System

**Spacing Primitives**: Tailwind units 2, 4, 6, 8, 12, 16
- Component padding: p-6 to p-8
- Card spacing: gap-6 to gap-8
- Section margins: mb-12 to mb-16
- Container max-width: max-w-7xl

**Grid Structure**:
- Dashboard: 12-column grid with sidebar (3 cols) + main content (9 cols)
- Certificate cards: 3-column grid (lg), 2-column (md), 1-column (mobile)
- Event hierarchy: Nested card layouts with left indent (ml-8) for sub-events

## Component Library

### Glassmorphic Cards
- Frosted background with backdrop-blur-lg
- Subtle border with border opacity
- Soft shadow: shadow-xl with custom blur
- Rounded corners: rounded-2xl
- Hover: slight scale transform and increased shadow

### Navigation & Sidebar
- Fixed sidebar (desktop) with frosted glass effect
- Collapsible menu icon (mobile)
- Active state: stronger glass effect with accent indicator
- Navigation items with icon + label layout
- User profile card at top with avatar, name, Google account info

### Dashboard Cards
- Metric cards: Icon + Large number + Label with glass background
- Event cards: Thumbnail + Title + Meta (date, certificate count) + Actions
- Certificate preview cards: Template preview + Event name + Download/Share actions
- Hierarchical tree view for large events with expand/collapse

### Forms & Inputs
- Floating label design
- Glass-effect input fields with subtle borders
- File upload zones: Dashed border with icon + text, glass background on hover
- Excel upload: Drag-and-drop zone with preview table
- Template editor: Canvas area with overlay controls

### Buttons
- Primary: Solid background with text, medium shadow
- Secondary: Glass effect with border, lighter shadow
- Icon buttons: Circular with glass background
- Action buttons on images: Blurred background (backdrop-blur-md)
- No hover/active states specified (handled by component)

### Modals & Overlays
- Full-screen overlay with dark backdrop
- Centered modal with strong glass effect (backdrop-blur-2xl)
- Close button (top-right corner)
- Action buttons at bottom

### Certificate Template Designer
- Canvas preview area (center, glass card)
- Sidebar controls (right) for text fields, images, variables
- Variable mapping interface with Excel column dropdown
- Live preview with sample data

### Email Distribution Interface
- Recipient list with checkboxes (from Excel data)
- Email template preview with glass card
- Subject line + body composer
- Send progress indicator

## Icons
**Library**: Heroicons (via CDN)
- Dashboard metrics: Chart, Users, Document icons
- Actions: Download, Share, Mail, Upload
- Navigation: Home, Settings, Archive
- Status indicators: Check, X, Clock

## Images

### Hero Section (Dashboard Landing)
**Background**: Abstract gradient illustration showing certificates flowing into organized folders
- Full-width, 60vh height
- Overlay: dark gradient (bottom) for text readability
- Positioned behind frosted glass hero card

### Empty States
- Event dashboard: Illustration of calendar with certificate icon (centered, glass card)
- Certificate list: Document stack illustration (centered)

### Thumbnails
- Certificate template previews in cards (aspect-ratio 4:3)
- Event cover images (aspect-ratio 16:9, rounded-xl)
- User avatars (circular, border with glass effect)

## Animation Principles
**Minimal & Purposeful**:
- Card hover: Subtle scale (1.02) with shadow increase (duration-200)
- Page transitions: Fade-in for dashboard sections (duration-300)
- Loading states: Gentle pulse on skeleton loaders
- No complex scroll animations or parallax effects