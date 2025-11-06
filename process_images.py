from PIL import Image
import os

# Define paths
ICON_SOURCE = "src/assets/logo-q.jpg"
OG_SOURCE = "src/assets/og-image-source.png"
ICON_DEST = "src/assets/logo-q-icon.png"
FAVICON_DEST = "public/favicon.ico"
OG_DEST = "src/app/opengraph-image.jpg" # Overwriting the existing opengraph-image.png

def process_icon(source_path, dest_path, size=(64, 64)):
    try:
        img = Image.open(source_path).convert("RGBA")
        img = img.resize(size, Image.Resampling.LANCZOS)
        img.save(dest_path, "PNG")
        print(f"Icon processed and saved to {dest_path}")
    except Exception as e:
        print(f"Error processing icon: {e}")

def create_favicon(source_path, dest_path):
    try:
        img = Image.open(source_path).convert("RGBA")
        # Favicon typically includes multiple sizes, but a single 64x64 or 32x32 is often sufficient
        # Let's create a 32x32 icon for the favicon
        img = img.resize((32, 32), Image.Resampling.LANCZOS)
        img.save(dest_path, format="ICO")
        print(f"Favicon created and saved to {dest_path}")
    except Exception as e:
        print(f"Error creating favicon: {e}")

def process_og_image(source_path, dest_path, size=(1200, 630)):
    try:
        img = Image.open(source_path).convert("RGB")
        img = img.resize(size, Image.Resampling.LANCZOS)
        # Save as JPEG for smaller file size, which is good for Open Graph images
        img.save(dest_path, "JPEG", quality=85)
        print(f"Open Graph image processed and saved to {dest_path}")
    except Exception as e:
        print(f"Error processing Open Graph image: {e}")

if __name__ == "__main__":
    # Ensure the source files exist
    if not os.path.exists(ICON_SOURCE):
        print(f"Icon source file not found: {ICON_SOURCE}")
    else:
        process_icon(ICON_SOURCE, ICON_DEST)
        create_favicon(ICON_SOURCE, FAVICON_DEST)

    if not os.path.exists(OG_SOURCE):
        print(f"Open Graph source file not found: {OG_SOURCE}")
    else:
        # The existing opengraph-image.png is in src/app, so I'll place the new one there as opengraph-image.jpg
        process_og_image(OG_SOURCE, OG_DEST)

    # Clean up the source files that are no longer needed
    os.remove(ICON_SOURCE)
    os.remove(OG_SOURCE)
    print("Source images cleaned up.")
