# 📥 Google Drive Download Links - උපදෙස්

## Google Drive Link එකක් හදමු:

### Step 1: Movie File Upload කරන්න

1. **Google Drive එකට යන්න:** https://drive.google.com
2. **"+ New"** → **"File upload"**
3. ඔබේ movie file එක select කරන්න
4. Upload වෙනකම් wait කරන්න

### Step 2: Shareable Link එකක් හදන්න

1. Upload වුන file එකේ right-click කරන්න
2. **"Share"** select කරන්න (හෝ "Get link")
3. **"Restricted"** කියන එක click කරන්න
4. **"Anyone with the link"** select කරන්න
5. **"Viewer"** permission එක තෝරන්න (download කරන්න පුළුවන් වෙන්න)
6. **"Copy link"** click කරන්න

**Link එක පෙනෙන විදිහ:**
```
https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing
```

### Step 3: Admin Panel එකේ Add කරන්න

1. http://localhost:3000/admin login වෙන්න
2. **"Add New Movie"** form එකේ scroll down කරන්න
3. **"Download Links (Google Drive)"** section එකට යන්න
4. Fill කරන්න:
   - **Quality:** `720p` හෝ `1080p` හෝ `4K`
   - **Size:** `1.2GB` හෝ `2.5GB` (file size එක)
   - **Google Drive Link URL:** Paste කරන්න copy කරපු link එක
5. **"+ Add Link"** click කරන්න
6. තව links තියනවා නම් repeat කරන්න (multiple qualities)
7. **"Add Movie"** click කරන්න

---

## 🎬 Example:

### Avengers: Endgame Movie සඳහා:

**720p Version:**
- Quality: `720p HD`
- Size: `1.5GB`
- Link: `https://drive.google.com/file/d/ABC123.../view`

**1080p Version:**
- Quality: `1080p Full HD`
- Size: `3.2GB`
- Link: `https://drive.google.com/file/d/XYZ789.../view`

---

## 📱 Movie Page එකේ පෙනෙන විදිහ:

Users movie එක click කරලා details page එකට ගියාම:

```
📥 Download / බාගත කරන්න

[↓] 720p HD                    →
    1.5GB - Google Drive

[↓] 1080p Full HD              →
    3.2GB - Google Drive
```

Click කරාම Google Drive එකට redirect වෙලා download කරන්න පුළුවන්!

---

## 💡 Tips:

### ✅ Best Practices:

1. **Quality labels:** වැදගත්
   - 720p, 1080p, 4K වගේ clear labels use කරන්න
   - "HD", "Full HD", "4K Ultra HD" වගේ extra info add කරන්න

2. **File sizes:** accurate එකක් දෙන්න
   - Users download කරන කලින් දැනගන්න ඕන file size එක
   - 1.5GB, 2.3GB වගේ readable format එකකින්

3. **Multiple qualities:** හොඳයි
   - 720p - slow internet users සඳහා
   - 1080p - normal quality
   - 4K - high quality enthusiasts

4. **Testing:** Upload කරලා test කරන්න
   - Movie add කරලා public page එකේ බලන්න
   - Download buttons work කරනවද check කරන්න

### ⚠️ Important:

- **Copyright:** ඔබට rights තියන movies විතරක් share කරන්න
- **Storage:** Google Drive free account එකේ 15GB විතරයි
  - More storage ඕන නම් Google One subscription එකක් ගන්න
  - හෝ multiple Google accounts use කරන්න

---

## 🎨 Download Button Features:

Website එකේ තියන download buttons:

✅ **Beautiful Design:**
   - Google Drive colors (Blue & Green gradient)
   - Animated hover effects
   - Quality badges with size info

✅ **Mobile Responsive:**
   - Mobile එකේත් desktop එකේත් පෙන්නන්නේ ලස්සනට

✅ **User Friendly:**
   - Clear quality labels
   - File size දැක්කම users decide කරන්න පුළුවන්
   - Direct Google Drive links

---

## 🔧 Troubleshooting:

### "Access Denied" error එනවා:

**Fix:**
1. Google Drive එකේ file එක right-click
2. "Share" → "Anyone with the link"
3. Permission: "Viewer" තියනවද බලන්න

### Download button click කරාම වැඩ කරන්නේ නැහැ:

**Check:**
1. Link එක නිවැරදිද?
2. `https://drive.google.com/file/d/...` වගේ format එකේද?
3. Link එක browser එකේ paste කරලා test කරන්න

### Link එක ලස්සනට show වෙන්නේ නැහැ:

**Make sure:**
1. Quality field එක fill කරලා තියනවද
2. Size field එක fill කරලා තියනවද
3. URL valid එකක්ද

---

## 🌟 Advanced: Direct Download Links

Normal Google Drive links click කරාම preview page එකක් පෙන්නුවා.
Direct download link එකක් ඕන නම්:

**Original link:**
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

**Direct download link:**
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

Replace `FILE_ID` with your actual file ID!

---

## 🎉 Ready!

දැන් ඔබට:
- ✅ Google Drive links add කරන්න පුළුවන්
- ✅ Beautiful download buttons website එකේ show වෙනවා
- ✅ Multiple quality options දෙන්න පුළුවන්
- ✅ Users ට download කරන්න පුළුවන්!

**Happy uploading! 🚀**
