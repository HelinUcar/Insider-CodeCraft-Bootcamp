# Longest Collatz Sequence Calculator

Bu proje, belirli bir limitin altındaki en uzun Collatz zincirini başlatan sayıyı hesaplayan bir web uygulamasıdır. Kullanıcı belirli bir giriş değeri girerek, bu değerin altındaki en uzun zinciri başlatan sayıyı bulabilir.

## 📜 Collatz Problemi Nedir?

Collatz dizisi, her sayının belirli bir kurala göre dönüşerek **1'e ulaşacağı** hipotezi üzerine kuruludur:

- Eğer **n çiftse**, yeni değer: `n / 2`
- Eğer **n tekse**, yeni değer: `3n + 1`

Örneğin, **13 için diziyi oluşturalım**:

```
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
```

Bu zincir **10 adımda 1’e ulaşır**.

## 🔹 Kod Açıklaması

### **1️⃣ `collatzSequenceLength(n, cache)`**
Bu fonksiyon **verilen `n` sayısının Collatz zincir uzunluğunu hesaplar ve önbelleğe kaydeder**.

#### **Çalışma Mantığı:**

- `count = 1` ile başlangıç uzunluğunu tutar.
- `original = n` değişkeni, **önbellekleme (cache) için başlangıç değerini saklar**.
- Döngü çalışırken `n = 1` olana kadar kurallar uygulanır:
  - Eğer **önbellekte bu sayı varsa**, daha önce hesaplandığı için **sonucu hızlıca döndürür**.
  - Eğer **önbellekte yoksa**, **Collatz kuralına göre** yeni değer hesaplanır:
    - Çiftse → `n = n / 2`
    - Tekse → `n = 3n + 1`
- Her adımda **count artırılır**.
- Sonuç **önbelleğe kaydedilir** ve döndürülür.

### **2️⃣ `longestCollatzSequence(limit)`**
Bu fonksiyon **1’den `limit` değerine kadar tüm sayılar için Collatz zincir uzunluklarını hesaplar ve en uzun zinciri oluşturan sayıyı bulur**.

#### **Çalışma Mantığı:**

- `maxCount = 0` ve `maxStartingNumber = 0` olarak atanır.
- **1'den `limit` değerine kadar bir `for` döngüsü çalıştırılır**:
  - `collatzSequenceLength(i, cache)` fonksiyonu çağrılarak **zincir uzunluğu hesaplanır**.
  - Eğer **bu zincir, önceki en uzun zincirden uzunsa**, `maxCount` ve `maxStartingNumber` güncellenir.
- **Döngü bittiğinde**, en uzun zinciri başlatan sayı `return` edilir.

### **3️⃣ `findLongestCollatzSequence()`**
Bu fonksiyon **kullanıcının girişini alır, hesaplamayı başlatır ve sonucu ekrana yazdırır**.

#### **Çalışma Mantığı:**

- Kullanıcının girdiği sayı, `inputNumber` ID’li giriş kutusundan alınır.
- `parseInt` kullanılarak tamsayıya çevrilir.
- `longestCollatzSequence(inputNumber)` fonksiyonu çağrılarak **sonuç hesaplanır**.
- **Sonuç, `result` ID’li HTML öğesine yazdırılır**.

## 🔥 En Uzun Collatz Zinciri Örneği

Bu proje, **kullanıcının belirlediği sınıra kadar olan tüm sayıları hesaplayarak en uzun Collatz zincirini başlatan sayıyı bulur**.

Örneğin **limit = 1.000.000** için sonuç:

```
837799
```

Bu, **837799 sayısının en uzun Collatz zincirine sahip olduğunu gösterir**.

## 🔗 Proje Linki: [Buraya Tıklayın](https://helinucar.github.io/Insider-CodeCraft-Bootcamp/week-two/day-2/)

