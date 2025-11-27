from PIL import Image
import numpy as np
from collections import Counter
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
import colorsys

def analyze_image_colors(image_path):
    """تحلیل عمیق رنگبندی تصویر"""
    
    # بارگذاری تصویر
    img = Image.open(image_path)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # تبدیل به آرایه numpy
    img_array = np.array(img)
    pixels = img_array.reshape(-1, 3)
    
    # حذف پیکسل‌های تکراری برای بهبود عملکرد
    unique_pixels = np.unique(pixels, axis=0)
    
    print(f"📊 تحلیل رنگبندی تصویر: {image_path}")
    print(f"🖼️ ابعاد تصویر: {img.size}")
    print(f"🎨 تعداد رنگ‌های منحصربه‌فرد: {len(unique_pixels)}")
    print("=" * 60)
    
    # 1. استخراج رنگ‌های غالب با K-Means
    dominant_colors = extract_dominant_colors(pixels, n_colors=8)
    
    # 2. تحلیل طیف رنگی
    color_spectrum_analysis(pixels)
    
    # 3. تحلیل روشنایی و کنتراست
    brightness_contrast_analysis(pixels)
    
    # 4. تحلیل دمای رنگ
    color_temperature_analysis(pixels)
    
    # 5. تحلیل اشباع رنگ
    saturation_analysis(pixels)
    
    # 6. تحلیل هارمونی رنگی
    color_harmony_analysis(dominant_colors)
    
    return dominant_colors

def extract_dominant_colors(pixels, n_colors=8):
    """استخراج رنگ‌های غالب با الگوریتم K-Means"""
    
    kmeans = KMeans(n_clusters=n_colors, random_state=42, n_init=10)
    kmeans.fit(pixels)
    
    colors = kmeans.cluster_centers_.astype(int)
    labels = kmeans.labels_
    
    # محاسبه درصد هر رنگ
    label_counts = Counter(labels)
    total_pixels = len(pixels)
    
    print("🎨 رنگ‌های غالب:")
    print("-" * 40)
    
    color_info = []
    for i, color in enumerate(colors):
        percentage = (label_counts[i] / total_pixels) * 100
        hex_color = rgb_to_hex(color)
        color_name = get_color_name(color)
        
        color_info.append({
            'rgb': color,
            'hex': hex_color,
            'percentage': percentage,
            'name': color_name
        })
        
        print(f"رنگ {i+1}: RGB{tuple(color)} | {hex_color} | {percentage:.1f}% | {color_name}")
    
    print()
    return color_info

def color_spectrum_analysis(pixels):
    """تحلیل طیف رنگی"""
    
    # تقسیم‌بندی بر اساس کانال‌های RGB
    r_values = pixels[:, 0]
    g_values = pixels[:, 1]
    b_values = pixels[:, 2]
    
    print("🌈 تحلیل طیف رنگی:")
    print("-" * 40)
    print(f"میانگین قرمز (R): {np.mean(r_values):.1f}")
    print(f"میانگین سبز (G): {np.mean(g_values):.1f}")
    print(f"میانگین آبی (B): {np.mean(b_values):.1f}")
    
    # تعیین رنگ غالب کلی
    avg_r, avg_g, avg_b = np.mean(r_values), np.mean(g_values), np.mean(b_values)
    if avg_b > avg_r and avg_b > avg_g:
        dominant_spectrum = "آبی"
    elif avg_r > avg_g and avg_r > avg_b:
        dominant_spectrum = "قرمز"
    elif avg_g > avg_r and avg_g > avg_b:
        dominant_spectrum = "سبز"
    else:
        dominant_spectrum = "متعادل"
    
    print(f"طیف غالب: {dominant_spectrum}")
    print()

def brightness_contrast_analysis(pixels):
    """تحلیل روشنایی و کنتراست"""
    
    # محاسبه روشنایی (Luminance)
    luminance = 0.299 * pixels[:, 0] + 0.587 * pixels[:, 1] + 0.114 * pixels[:, 2]
    
    avg_brightness = np.mean(luminance)
    brightness_std = np.std(luminance)
    
    print("💡 تحلیل روشنایی و کنتراست:")
    print("-" * 40)
    print(f"میانگین روشنایی: {avg_brightness:.1f}/255")
    print(f"انحراف معیار روشنایی: {brightness_std:.1f}")
    
    # تعیین سطح روشنایی
    if avg_brightness < 85:
        brightness_level = "تیره"
    elif avg_brightness < 170:
        brightness_level = "متوسط"
    else:
        brightness_level = "روشن"
    
    # تعیین سطح کنتراست
    if brightness_std < 30:
        contrast_level = "کم"
    elif brightness_std < 60:
        contrast_level = "متوسط"
    else:
        contrast_level = "بالا"
    
    print(f"سطح روشنایی: {brightness_level}")
    print(f"سطح کنتراست: {contrast_level}")
    print()

def color_temperature_analysis(pixels):
    """تحلیل دمای رنگ"""
    
    # محاسبه دمای رنگ بر اساس نسبت آبی به قرمز
    r_avg = np.mean(pixels[:, 0])
    b_avg = np.mean(pixels[:, 2])
    
    color_temp_ratio = b_avg / (r_avg + 1)  # +1 برای جلوگیری از تقسیم بر صفر
    
    print("🌡️ تحلیل دمای رنگ:")
    print("-" * 40)
    print(f"نسبت آبی به قرمز: {color_temp_ratio:.2f}")
    
    if color_temp_ratio > 1.2:
        temp_description = "سرد (Cool)"
    elif color_temp_ratio < 0.8:
        temp_description = "گرم (Warm)"
    else:
        temp_description = "خنثی (Neutral)"
    
    print(f"دمای رنگ: {temp_description}")
    print()

def saturation_analysis(pixels):
    """تحلیل اشباع رنگ"""
    
    saturations = []
    for pixel in pixels[::100]:  # نمونه‌برداری برای بهبود عملکرد
        r, g, b = pixel / 255.0
        h, s, v = colorsys.rgb_to_hsv(r, g, b)
        saturations.append(s)
    
    avg_saturation = np.mean(saturations)
    
    print("🎨 تحلیل اشباع رنگ:")
    print("-" * 40)
    print(f"میانگین اشباع: {avg_saturation:.2f}")
    
    if avg_saturation < 0.3:
        saturation_level = "کم (رنگ‌های خاکستری/مات)"
    elif avg_saturation < 0.6:
        saturation_level = "متوسط"
    else:
        saturation_level = "بالا (رنگ‌های زنده)"
    
    print(f"سطح اشباع: {saturation_level}")
    print()

def color_harmony_analysis(dominant_colors):
    """تحلیل هارمونی رنگی"""
    
    print("🎼 تحلیل هارمونی رنگی:")
    print("-" * 40)
    
    # تبدیل به HSV برای تحلیل بهتر
    hsv_colors = []
    for color_info in dominant_colors:
        r, g, b = color_info['rgb'] / 255.0
        h, s, v = colorsys.rgb_to_hsv(r, g, b)
        hsv_colors.append((h * 360, s, v))  # تبدیل hue به درجه
    
    # بررسی انواع هارمونی
    hues = [hsv[0] for hsv in hsv_colors]
    
    # هارمونی مونوکروماتیک (تفاوت کم در hue)
    hue_range = max(hues) - min(hues)
    if hue_range < 30:
        harmony_type = "مونوکروماتیک (Monochromatic)"
    elif hue_range < 60:
        harmony_type = "آنالوگ (Analogous)"
    elif any(abs(h1 - h2) > 150 for h1 in hues for h2 in hues if h1 != h2):
        harmony_type = "مکمل (Complementary)"
    else:
        harmony_type = "ترکیبی (Mixed)"
    
    print(f"نوع هارمونی: {harmony_type}")
    print(f"دامنه رنگی: {hue_range:.1f} درجه")
    print()

def rgb_to_hex(rgb):
    """تبدیل RGB به HEX"""
    return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"

def get_color_name(rgb):
    """تخمین نام رنگ بر اساس RGB"""
    r, g, b = rgb
    
    # رنگ‌های اصلی
    if r > 200 and g < 100 and b < 100:
        return "قرمز"
    elif r < 100 and g > 200 and b < 100:
        return "سبز"
    elif r < 100 and g < 100 and b > 200:
        return "آبی"
    elif r > 200 and g > 200 and b < 100:
        return "زرد"
    elif r > 200 and g < 100 and b > 200:
        return "بنفش/صورتی"
    elif r < 100 and g > 200 and b > 200:
        return "فیروزه‌ای"
    elif r > 200 and g > 200 and b > 200:
        return "سفید"
    elif r < 50 and g < 50 and b < 50:
        return "سیاه"
    elif abs(r - g) < 30 and abs(g - b) < 30 and abs(r - b) < 30:
        if r > 150:
            return "خاکستری روشن"
        elif r > 100:
            return "خاکستری"
        else:
            return "خاکستری تیره"
    elif r > 100 and g > 50 and b < 50:
        return "نارنجی/قهوه‌ای"
    elif r < 100 and g < 150 and b > 150:
        return "آبی تیره"
    else:
        return "ترکیبی"

if __name__ == "__main__":
    image_path = "public/images/L.webp"
    
    try:
        dominant_colors = analyze_image_colors(image_path)
        
        print("✅ تحلیل کامل شد!")
        print("\n📋 خلاصه نتایج:")
        print("=" * 60)
        print("این تصویر دارای پالت رنگی غنی و متنوعی است که شامل:")
        for i, color in enumerate(dominant_colors[:5]):
            print(f"• {color['name']}: {color['percentage']:.1f}%")
        
    except FileNotFoundError:
        print("❌ فایل تصویر یافت نشد. لطفاً مسیر را بررسی کنید.")
    except Exception as e:
        print(f"❌ خطا در تحلیل: {str(e)}")