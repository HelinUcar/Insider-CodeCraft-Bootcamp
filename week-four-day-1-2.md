# 🛠️ Kullanıcı Yönetimi ve API Entegrasyonu Uygulaması

Bu proje, **API'den kullanıcı verisi alarak**, **localStorage ile önbelleğe kaydedip**, etkileşimli bir listeleme sunan basit bir JavaScript uygulamasıdır.

## 📌 Özellikler
- **Kullanıcı Verisi Çekme**: API üzerinden kullanıcı bilgilerini alır.
- **Veri Önbellekleme**: Verileri **1 gün boyunca localStorage'da saklar**.
- **Gerçek Zamanlı Listeleme**: Kullanıcıları ekrana listeler.
- **Kullanıcı Silme**: Kullanıcıyı ekrandan ve localStorage'dan kaldırır.
- **Hata Yönetimi**: API'ye ulaşılamazsa hata mesajı gösterir.

## 🎯 Kullanım

### 📥 1. API'den Kullanıcı Bilgilerini Çekme
- **Fetch API** kullanılarak `https://jsonplaceholder.typicode.com/users` adresinden veri alınır.
- Veri alındığında **localStorage'da önbelleğe kaydedilir**.
- **Daha önce alınmış veri varsa** API yerine localStorage'dan yüklenir.

### 📂 2. Kullanıcıları Listeleme
- Kullanıcılar **dinamik olarak ekrana eklenir**.
- Her kullanıcı **kart şeklinde** gösterilir.
- Kullanıcı bilgileri: **Ad, e-posta adresi**.

### ❌ 3. Kullanıcı Silme
- Kullanıcılar, **"Remove"** butonu ile kaldırılabilir.
- **Silinen kullanıcı localStorage'dan da kaldırılır**.

## 🔧 Proje Yapısı

### 📜 Dosyalar
- `index.html` → Sayfa yapısını içerir.
- `style.css` → Arayüz tasarımı ve stilleri içerir.
- `fetch.js` → API'den veri çekme ve hata yönetimi işlevlerini içerir.
- `cache.js` → Verileri **localStorage'a kaydetme, okuma ve silme** işlemlerini içerir.
- `script.js` → Kullanıcıları listeleme ve silme işlemlerini içerir.

### 🖥️ Çalıştırma
1. Proje dosyalarını tarayıcıda açın.
2. Kullanıcı verileri otomatik olarak yüklenecektir.
3. "Remove" butonuna basarak kullanıcıları silebilirsiniz.

## 🔗 Proje Linki
Projenin detaylarına aşağıdaki bağlantıdan ulaşabilirsiniz:  
[📌 Proje Sayfası](https://helinucar.github.io/Insider-CodeCraft-Bootcamp/week-four/day-1-2/)
