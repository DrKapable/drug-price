# **Drug Price Lookup App - README**  

## **📌 Overview**  
This web application helps **Ruth Kaluluma Memorial Medical Centre** quickly search and dispense drugs while tracking stock levels.  

### **🔑 Key Features**  
✅ **Search Drugs** – Find drugs by name or category.  
✅ **Dispensing Cart** – Add multiple items before finalizing.  
✅ **Stock Management** – Automatically updates stock levels.  
✅ **Google Sheets Sync** – (Optional) Update prices without coding.  

---

## **🛠 Setup Instructions**  

### **1. Prerequisites**  
- A modern web browser (Chrome, Firefox, Edge).  
- (Optional) A **Google Sheets** account for cloud data.  

### **2. Installation (Local Use)**  
1. **Download the files**:  
   - `index.html`  
   - `script.js`  
   - `styles.css` (if separate)  
2. **Open `index.html`** in a web browser.  

### **3. Online Deployment (Recommended)**  
#### **Option 1: GitHub Pages (Free Hosting)**  
1. Upload files to a GitHub repository.  
2. Go to **Settings > Pages** → Select `main` branch.  
3. Your app will be live at:  
   ```
   https://[your-username].github.io/[repo-name]/
   ```  

#### **Option 2: Netlify (Drag & Drop)**  
1. Go to [Netlify Drop](https://app.netlify.com/drop).  
2. Drag and drop your project folder.  
3. Instantly deployed (e.g., `your-app.netlify.app`).  

---

## **💻 How to Use**  
1. **Search for Drugs**  
   - Type a drug name or category in the search bar.  
   - Results appear instantly.  

2. **Add to Dispensing Cart**  
   - Enter a quantity.  
   - Click **"Add to Cart"**.  

3. **Review & Confirm**  
   - Check the **Dispensing Summary** (total price, quantities).  
   - Click **"Confirm Dispense"** to finalize (stock updates automatically).  

4. **Update Drug Data**  
   - If using **Google Sheets**, edit the linked sheet.  
   - If using **CSV**, modify `drugs.csv` and re-upload.  

---

## **🔗 Optional: Connect to Google Sheets**  
1. **Create a Google Sheet** with columns:  
   ```
   DrugName | Price | Category | Stock
   ```  
2. **Enable Google Sheets API** ([Follow this guide](https://developers.google.com/sheets/api/quickstart/js)).  
3. **Update `script.js`** with your `SPREADSHEET_ID`.  

---

## **🚀 Future Improvements**  
- [ ] **Barcode scanning** for quick searches.  
- [ ] **Low stock alerts**.  
- [ ] **Print dispensing receipts**.  

---

## **❓ Troubleshooting**  
- **"Drugs not loading?"** → Check if `drugs.csv` is in the same folder.  
- **"Google Sheets not working?"** → Verify API access in Google Cloud Console.  
- **"Dispensing cart empty?"** → Ensure `script.js` is properly linked in `index.html`.  

---

## **📜 License**  
This project is **free to use**. Modify as needed for your clinic.  

---

## **📧 Contact**  
Need help? Email: **jumamustafaphiri@gmail.com**  

---  

**✨ Happy Dispensing!** 🏥💊  

---

