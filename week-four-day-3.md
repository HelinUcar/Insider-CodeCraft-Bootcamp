# Debugging ve Hata Ayıklama Raporu

## Proje: Alışveriş Sepeti (Shopping Cart)
Bu proje, HTML, CSS ve JavaScript kullanılarak oluşturulmuş bir alışveriş sepeti uygulamasıdır. Uygulamada ürün ekleme, silme ve indirim uygulama gibi temel özellikler bulunmaktadır. Ancak geliştirme sürecinde bazı hatalar tespit edilmiş ve düzeltilmiştir.

---
## 1. **Hata Analizi için Okuma (Static Code Analysis)**

Öncelikle kodu okuyarak mantıksal hataları belirledim:

- **Fonksiyonları taradım:** `addItem()`, `removeItem()`, `calculateTotal()`, `applyDiscount()`, `updateUI()`
- **İş akışını inceledim:** Ürün ekleme, silme, stok kontrolü ve UI güncellemelerinin nasıl çalıştığını düşündüm.
- **Hatalı hesaplamalara odaklandım:**
  ```js
  this.total = this.items.reduce((sum, item) => {
      return sum + item.price; // Hata: quantity çarpılmamış!
  }, 0);
  ```
  **Çözüm:** `return sum + (item.price * item.quantity);`

## 2. **Console.log() ile Debugging**

Kodun belirli noktalarına `console.log()` ekleyerek hangi değerlerin geldiğini kontrol ettim.

### **2.1 Sepete Ürün Ekleme Testi**

```js
addItem(productId, quantity = 1) {
    console.log('Ürün eklenmeye çalışılıyor:', productId, 'Miktar:', quantity);
}
```

### **2.2 Toplam Tutarı Kontrol Etme**

```js
calculateTotal() {
    console.log('Önceki toplam:', this.total);
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('Yeni toplam:', this.total);
}
```

## 3. **Debugger Kullanımı (Adım Adım Çalıştırma)**

Kodun belirli bir noktada durmasını sağlayarak değişkenleri incelemek için `debugger;` kullandım.

Örnek:

```js
addItem(productId, quantity = 1) {
    debugger; // Kodu burada durdurup değişkenleri kontrol ettim.
}
```

**Nasıl Kullanılır?**

- Sayfayı açıp işlemi gerçekleştirirken **tarayıcı durur**.
- Developer Tools → Console veya Scope sekmesinden değişkenleri görebilirim.

## 4. **Breakpoint Kullanımı (Chrome DevTools)**

### **Nasıl Kullanılır?**

- **F12 → Sources sekmesi** açılır.
- `index.js` dosyası açılır.
- `addItem()`, `calculateTotal()` gibi fonksiyonlara **breakpoint** koyulur.
- Sepete bir ürün ekleyip kodun **adım adım çalışması** izlenir.

**Kontrol Edilenler:**

- `product.stock` değişiyor mu?
- `items` dizisine ürün ekleniyor mu?
- `total` doğru hesaplanıyor mu?

## 5. **UI Güncelleme Hatalarını Kontrol Etme**

- **Elements sekmesi** ile `#cart`, `#total` gibi elementlerin içeriğinin değişip değişmediğini kontrol ettim.
- **Console'da **``** çalıştırarak UI güncellenmiş mi baktım.**

Örnek:

```js
console.log('Sepet HTML:', document.getElementById('cart').innerHTML);
```

## 6. **Event Listener'ları Kontrol Etme**

Sepete ekleme butonlarının çalışıp çalışmadığını anlamak için:

```js
document.getElementById('products').addEventListener('click', (event) => {
    console.log('Tıklanan element:', event.target);
});
```

**Kontrol Edilenler:**

- **Tıklanan buton çalışıyor mu?**
- **Ürün ID'si doğru alınıyor mu?**

## 7. **Tarayıcı Konsolundaki Hataları Kontrol Etme**

Chrome veya Firefox konsolunu açıp (`F12 → Console`):

- **Hata mesajlarını** gördüm.
- `Uncaught TypeError` gibi hatalar varsa satır numarasına bakarak hataları düzelttim.

## 8. **Bulunan Hatalar ve Düzeltmeler**
## Hata 1: Yetersiz Stok Kontrolü
**Hata Açıklaması:**
Eğer stok miktarı, satın alınacak ürün miktarına **eşit** ise, ürün sepete eklenmiyor. Ancak stok miktarı ile satın alınacak ürün miktarı eşitse satın alınmaya izin verilmelidir.

### **Hatalı Kod:**
```js
if (product.stock <= quantity) {
    throw new Error('Yetersiz stok!');
}
```

### **Düzeltilmiş Kod:**
```js
if (product.stock < quantity) {
    throw new Error('Yetersiz stok! Stokta sadece ${product.stock} adet var.');
}
```

### **Debugging İşlemi:**
- `console.log(product.stock, quantity);` ile değerler kontrol edildi.
- `<=` operatörünün yanlış kullanımı belirlendi ve `<` ile değiştirildi.

---

## Hata 2: Toplam Tutar Hesaplama Hatası
**Hata Açıklaması:**
`calculateTotal` metodunda toplam tutar hesaplanırken ürün miktarı (`quantity`) dikkate alınmıyordu. Yani, 2 adet ürün eklenirse bile sadece 1 adet üzerinden hesaplama yapılıyordu.

### **Hatalı Kod:**
```js
this.total = this.items.reduce((sum, item) => {
    return sum + item.price;
}, 0);
```

### **Düzeltilmiş Kod:**
```js
this.total = this.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
}, 0);
```

### **Debugging İşlemi:**
- `console.log(this.items);` ile `quantity` değerleri kontrol edildi.
- `item.price` değişkeninin `quantity` ile çarpılması gerektiği tespit edildi.

---

## Hata 3: Ürün Silme İşleminde Stok Güncellemesi
**Hata Açıklaması:**
`removeItem` metodunda bir ürün silindiğinde stok miktarı yalnızca **1** artırılıyordu. Ancak sepette bulunan ürün miktarı kadar stok artırılmalıydı.

### **Hatalı Kod:**
```js
if (product) {
    product.stock += 1;
}
```

### **Düzeltilmiş Kod:**
```js
if (product) {
    product.stock += item.quantity;
}
```

### **Debugging İşlemi:**
- `console.log(item.quantity);` ile ürün miktarı doğrulandı.
- Stok artırımı yanlış hesaplandığı için `item.quantity` eklenerek düzeltildi.

---

## Hata 4: Yanlış İndirim Uygulaması
**Hata Açıklaması:**
`applyDiscount` metodunda toplam tutar %90 yerine %10 olarak düşürülmeliydi. Yanlış çarpma işlemi nedeniyle indirim yanlış hesaplanıyordu.

### **Hatalı Kod:**
```js
this.total *= 0.1;
```

### **Düzeltilmiş Kod:**
```js
this.total *= 0.9;
```

### **Debugging İşlemi:**
- `console.log(this.total);` ile indirim sonrası değerler kontrol edildi.
- %10 yerine %90 indirildiği tespit edildi ve düzeltildi.

---

## İyileştirmeler

### 1. `addItem` Metodunda `quantity` Varsayılan Değer Kontrolü
**Problem:**
`addItem` metodunda `quantity` parametresi **tanımlanmadan** geçilebiliyor. Bu durumda `quantity`, `NaN` oluyordu ve hesaplamalarda hata veriyordu.

**Düzeltilmiş Kod:**
```js
addItem(productId, quantity = 1) {
    if (isNaN(quantity) || quantity <= 0) {
        throw new Error('Geçersiz miktar!');
    }
}
```

### 2. `removeItem` Metodunda Stok Güncellemesi İçin Hata Kontrolü
**Problem:**
Ürün sepette bulunamazsa `product.stock` değişkenine erişim hatası oluşuyordu.

**Düzeltilmiş Kod:**
```js
if (!product) {
    console.error('Ürün bulunamadı!');
    return;
}
```

### 3. `calculateTotal` Metodunda UI Güncellemesi
**Problem:**
İndirim uygulandıktan sonra `this.total` güncelleniyor, ancak `updateUI` metoduna yansıtılmıyordu.

**Düzeltilmiş Kod:**
```js
this.calculateTotal();
this.updateUI();
```

### 4. `updateUI` Metodunda Hata Kontrolü
**Problem:**
Eğer `cartElement` veya `totalElement` HTML içinde tanımlı değilse, `innerHTML` erişim hatası oluşuyordu.

**Düzeltilmiş Kod:**
```js
if (!cartElement || !totalElement) {
    console.warn('UI elemanları bulunamadı!');
    return;
}
```

---

## Sonuç
Bu doküman, alışveriş sepeti projesinde yapılan debugging işlemlerini ve kod iyileştirmelerini içermektedir. Hata ayıklama sürecinde **console.log, debugger, try-catch blokları ve hata mesajları** kullanılarak sorunlar tespit edilmiştir. Uygulama, artık daha sağlam ve hatasız çalışmaktadır.

---


