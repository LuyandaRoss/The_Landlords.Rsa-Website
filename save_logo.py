#!/usr/bin/env python3
"""
Generate THE LANDLORDS.RSA logo
"""
import os
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("PIL not found. Run: pip install pillow")
    exit(1)

os.makedirs('images', exist_ok=True)

# Create image with dark background
width, height = 600, 160
bg_color = (30, 30, 30)  # Dark gray/black
img = Image.new('RGB', (width, height), bg_color)
draw = ImageDraw.Draw(img, 'RGBA')

# Draw outer oval border (white)
border_color = (255, 255, 255)
border_width = 3
draw.ellipse(
    [60, 40, 540, 120],
    outline=border_color,
    width=border_width
)
# Inner oval
draw.ellipse(
    [75, 50, 525, 110],
    outline=border_color,
    width=border_width
)

# Draw star at top
star_x, star_y = 300, 35
star_size = 12
points = []
for i in range(10):
    angle = i * 36
    if i % 2 == 0:
        r = star_size
    else:
        r = star_size * 0.4
    import math
    x = star_x + r * math.cos(math.radians(angle - 90))
    y = star_y + r * math.sin(math.radians(angle - 90))
    points.append((x, y))
draw.polygon(points, fill=border_color)

# Draw ribbons (simple rectangles)
draw.polygon([(60, 65), (40, 55), (40, 95), (60, 85)], fill=(255, 255, 255, 76))
draw.polygon([(540, 65), (560, 55), (560, 95), (540, 85)], fill=(255, 255, 255, 76))

# Try to use a system font, fallback to default
try:
    # Try to find a bold font
    title_font = ImageFont.truetype("arial.ttf", 42)
    subtitle_font = ImageFont.truetype("arial.ttf", 12)
except:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()

# Draw main text
text = "THE_LANDLORDS.RSA"
draw.text((300, 75), text, fill=border_color, font=title_font, anchor="mm")

# Draw subtitle
subtext = "• EST. 2R2Z •"
draw.text((300, 105), subtext, fill=border_color, font=subtitle_font, anchor="mm")

# Save logo
logo_path = 'images/logo.png'
img.save(logo_path)
print(f"✓ Logo saved to: {logo_path}")
print(f"  Full path: {os.path.abspath(logo_path)}")

