# 📌 Real-Time Task Management

Bu proje, **HTML, CSS ve JavaScript** kullanılarak geliştirilen **Gerçek Zamanlı Görev Yönetim Uygulaması**dır. Kullanıcılar görevlerini dinamik olarak yönetebilir, tamamlandı olarak işaretleyebilir, filtreleyebilir ve öncelik sırasına göre sıralayabilir.

## 📌 Proje İçeriği

### 📝 Görev Listesi Arayüzü
- Başlangıçta **boş bir görev listesi** görüntülenir.
- Kullanıcılar yeni görevler ekleyebilir.
- Her görev şu bilgileri içerir:
  - **Başlık** (Zorunlu)
  - **Açıklama** (Opsiyonel)
  - **Öncelik** (Düşük, Orta, Yüksek - Radyo Butonları)
  - **Tamamlandı mı?** (Varsayılan olarak tamamlanmamış)

### ➕ Görev Ekleme & DOM Manipülasyonu
- Kullanıcılar formu doldurarak görev ekleyebilir.
- Görevler **sayfa yenilenmeden** dinamik olarak **HTML listesine** eklenir.
- Form gönderildikten sonra **input alanları temizlenir**.

### 🎯 Olay Yönetimi & Event Delegation
- Kullanıcılar görev satırında bulunan butonları kullanarak:
  - **Tamamlandı olarak işaretleyebilir** (Yeşil arka plan eklenir).
  - **Görevi silebilir**.
- `event.target` kullanılarak etkinlikler dinamik olarak dinlenir.
- `stopPropagation()` ile istenmeyen event tetiklenmeleri engellenir.

### ✅ Form Doğrulama & Hata Yönetimi
- Kullanıcılar **boş görev ekleyemez**.
- Öncelik seçilmediğinde hata mesajı gösterilir.
- **try-catch** bloğu ile beklenmedik hatalar yakalanır.

### 🔎 Filtreleme & Sıralama (Opsiyonel)
- Kullanıcılar **"Sadece tamamlananları göster"** kutucuğunu işaretleyerek tamamlanan görevleri filtreleyebilir.
- **Öncelik sırasına göre sıralama** yapılabilir (Düşük → Yüksek).

## 🌍 Proje Linki
[Real-Time Task Management](https://helinucar.github.io/Insider-CodeCraft-Bootcamp/week-two/final-project/)



