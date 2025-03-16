# 🛠️ Kullanıcı Yönetimi ve API Entegrasyonu Uygulaması

Bu proje, **API'den kullanıcı verisi alarak**, **localStorage ile önbelleğe kaydedip**, etkileşimli bir listeleme sunan basit bir JavaScript uygulamasıdır. Kod, **tarayıcı konsoluna yapıştırılarak** çalıştırılabilir.

## 📌 Özellikler
- **Kullanıcı Verisi Çekme**: API üzerinden kullanıcı bilgilerini alır.
- **Veri Önbellekleme**: Verileri **1 gün boyunca localStorage'da saklar**.
- **Gerçek Zamanlı Listeleme**: Kullanıcıları ekrana listeler.
- **Kullanıcı Silme**: Kullanıcıyı ekrandan ve localStorage'dan kaldırır.
- **Hata Yönetimi**: API'ye ulaşılamazsa hata mesajı gösterir.
- **MutationObserver Kullanımı**: Kullanıcı listesi boşaldığında otomatik olarak yeniden yükleme butonu gösterilir.
- **sessionStorage Entegrasyonu**: Yeniden yükleme butonu yalnızca bir kez kullanılabilir.

## 🎯 Kullanım

### 📥 1. Tarayıcı Konsolunda Çalıştırma
1. Web sayfasını açın.
2. **Geliştirici Araçları'nı (DevTools) açın**: `F12` veya `Ctrl + Shift + I` (Mac için `Cmd + Option + I`).
3. **Konsol (Console) sekmesine** geçin.
4. **script.js içeriğini kopyalayın ve konsola yapıştırın**.
5. **Enter tuşuna basarak kodu çalıştırın**.

### 📂 2. Kullanıcıları Listeleme
- Kullanıcılar **dinamik olarak ekrana eklenir**.
- Her kullanıcı **kart şeklinde** gösterilir.
- Kullanıcı bilgileri: **Ad, e-posta adresi**.

### ❌ 3. Kullanıcı Silme
- Kullanıcılar, **"Sil"** butonu ile kaldırılabilir.
- **Silinen kullanıcı localStorage'dan da kaldırılır**.
- **Tüm kullanıcılar silindiğinde, MutationObserver devreye girerek "Yeniden Yükle" butonunu gösterir.**

### 🔄 4. Yeniden Yükleme
- Kullanıcıların tamamı silindiğinde "Yeniden Yükle" butonu görünür.
- **sessionStorage** kullanılarak buton sadece bir kez kullanılabilir.

## 🔧 Proje Yapısı

### 📜 Dosyalar
- `index.html` → Sayfa yapısını içerir.
- `script.js` → Tüm fonksiyonları yöneten ana dosya.

### 🖥️ Çalıştırma
1. Web sayfasını açın.
2. **script.js içeriğini kopyalayın ve tarayıcı konsoluna yapıştırın**.
3. Kullanıcı verileri otomatik olarak yüklenecektir.
4. "Sil" butonuna basarak kullanıcıları silebilirsiniz.
5. Tüm kullanıcılar silindiğinde "Yeniden Yükle" butonu görünür.

## 🔗 Proje Linki
Projenin detaylarına aşağıdaki bağlantıdan ulaşabilirsiniz:  
[📌 Proje Sayfası](https://helinucar.github.io/Insider-CodeCraft-Bootcamp/week-four/final-project/)
[📌 Script Dosyası](https://github.com/HelinUcar/Insider-CodeCraft-Bootcamp/blob/main/week-four/final-project/script.js)


