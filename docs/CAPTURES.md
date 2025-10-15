# Captures

A collection of multi-sensory experiences from trips - photos, sounds, and thoughts.

## Concept

Each "capture" represents a trip or experience, combining:

- **Photos** - Street photography, moments, scenes
- **Sounds** - Ambient recordings, street noise, atmosphere
- **Thoughts** - Journal entries, reflections, observations

## Structure

### File Organization

```
src/routes/captures/
  +page.svelte          # Landing page - grid of all captures
  +page.ts              # Auto-discover captures via import.meta.glob
  [slug]/
    +page.svx           # The capture content (markdown + media)
    cover.jpg           # Cover image for landing page
    photos/
      1.jpg
      2.jpg
      ...
    sounds/
      morning.mp3
      cafe.mp3
      ...
```

### Capture File Format

Each capture is a `.svx` file (mdsvex) with frontmatter:

```markdown
---
title: Lisbon, March 2024
location: Lisbon, Portugal
date: 2024-03
cover: ./cover.jpg
stats:
  photos: 12
  sounds: 2
---

# Morning

Walking through Alfama at dawn...

![Narrow street at sunrise](./photos/1.jpg)
*The light catches the tiled walls*

<audio src="./sounds/morning.mp3" controls />

The sound of footsteps echoing...

## Afternoon

[Continue the narrative...]
```

## Privacy & Metadata

**IMPORTANT: Strip all metadata from files before uploading**

### Why?

Photo and audio EXIF/metadata can contain:

- GPS coordinates (exact location)
- Device information
- Timestamps (exact date/time)
- Camera settings
- Personal identifiers

### Tools for Stripping Metadata

**Images (JPEG, PNG, etc.):**

```bash
# Using exiftool (recommended)
exiftool -all= photo.jpg

# Or ImageMagick
convert photo.jpg -strip photo-clean.jpg

# Batch process all photos in a folder
exiftool -all= -r photos/
```

**Audio (MP3, etc.):**

```bash
# Using exiftool
exiftool -all= audio.mp3

# Or ffmpeg
ffmpeg -i audio.mp3 -map 0:a -codec:a copy -map_metadata -1 audio-clean.mp3
```

**Before committing:**

```bash
# Verify metadata is removed
exiftool photo.jpg
# Should show minimal/no metadata
```

### Checklist Before Upload

- [ ] Strip EXIF data from all photos
- [ ] Strip metadata from audio files
- [ ] Verify with exiftool
- [ ] Review frontmatter dates (keep them general, e.g., "2024-03" not exact dates)
- [ ] Avoid specific addresses in text
- [ ] Use general location names (neighborhood, city)

## Landing Page Design

Grid of capture cards:

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ [Cover img] │  │ [Cover img] │  │ [Cover img] │
│ Lisbon 2024 │  │ Rome 2023   │  │ Paris 2023  │
│ 12 photos   │  │ 15 photos   │  │ 23 photos   │
│ 2 sounds    │  │ 3 sounds    │  │ 5 sounds    │
└─────────────┘  └─────────────┘  └─────────────┘
```

## Capture Detail Layout

Vertical scroll narrative mixing media types:

- Photos (full-width or varied sizes)
- Audio players (custom styled component)
- Text sections (narrative, thoughts, observations)
- Captions and context

### Audio Player Component

Create a custom Svelte component:

```svelte
<AudioPlayer src="./sounds/morning.mp3" title="Morning in Alfama" />
```

Styled consistently across all captures.

## Writing Style

- Mix of narrative and reflection
- First-person, present or past tense
- Sensory details
- Balance between showing (photos/sounds) and telling (text)
- Vary rhythm: dense sections, sparse sections, single images

## Example Capture Flow

```markdown
# Morning

[Full-width photo]

Walking through empty streets...

[Photo] [Photo]
*Two smaller images side by side*

<audio src="..." />

The city waking up...

## A Moment

[Single photo, full-width]

[Longer reflection/thought]

## Afternoon

[Continue...]
```

## Technical Notes

### Image Optimization

- Resize images before uploading (max width ~2000px for full-width)
- Use JPEG for photos (quality ~85%)
- Progressive JPEGs for better loading
- Consider lazy loading for performance

### Audio Optimization

- MP3 format (widely supported)
- Compress to reasonable bitrate (128-192kbps for ambient sounds)
- Keep clips short (30s - 2min typically)
- Mono for ambient sounds (smaller file size)

### Auto-discovery

The landing page uses `import.meta.glob()` to automatically discover all captures (similar to blog implementation).

## Future Enhancements

Potential additions:

- Video support
- Maps/locations (without exact coordinates)
- Weather/time of day indicators
- Links between related captures
- Search/filter by location or year
- RSS feed for new captures

## Example Capture Structure

See `src/routes/captures/lisbon-2024/` for a complete example (fictional prototype).
