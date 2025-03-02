// get user info
function getUserInfo() {
    let user = {};

    while (true) {
        user.name = prompt("Adınız nedir?").trim();
        if (!user.name || !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(user.name)) {
            alert("Lütfen sadece harflerden oluşan geçerli bir ad girin.");
            continue;
        }

        user.age = parseInt(prompt("Yaşınız nedir?"), 10);
        if (isNaN(user.age) || user.age <= 0) {
            alert("Lütfen geçerli bir yaş girin.");
            continue;
        }

        user.job = prompt("Mesleğiniz nedir?").trim();
        if (!user.job || !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(user.job)) {
            alert("Lütfen sadece harflerden oluşan geçerli bir meslek girin.");
            continue;
        }
        break;
    }

    alert(`Kullanıcı Bilgileri:\nAd: ${user.name}\nYaş: ${user.age}\nMeslek: ${user.job}`);
    console.log(user);
    return user;
}


let cart = [];
let process = true;
// add product to cart
function addProductToCart() {
    while (true) {
        let productName = prompt("Sepete eklemek istediğiniz ürünü yazınız:").trim();
        if (productName.toLowerCase() === "q") {
            displayCart();
            process = false;
            return;
        }
        if (!productName) {
            alert("Lütfen ürün adını girin.");
            continue;
        }

        let productPrice = parseFloat(prompt("Ürünün fiyatını yazınız:"));
        if (isNaN(productPrice) || productPrice <= 0) {
            alert("Lütfen geçerli bir fiyat giriniz.");
            continue;
        }

        cart.push({ name: productName, price: productPrice });
        alert(`${productName} ürünü sepete eklendi. Fiyatı: ${productPrice.toFixed(2)} TL`);
        console.log(cart);
        break;
    }
}

// remove product from cart
function removeProductFromCart() {
    if (!cart.length) {
        alert("Sepetiniz boş.");
        return;
    }

    let productName = prompt(`Sepetten kaldırmak istediğiniz ürünü yazınız:\n${cart.map(item => item.name).join(", ")}`);

    if (productName.toLowerCase() === "q") {
        displayCart();
        process = false;
        return;
    }

    let index = cart.findIndex(item => item.name.toLowerCase() === productName.toLowerCase());

    if (index !== -1) {
        cart.splice(index, 1);
        alert(`${productName} ürünü sepetten kaldırıldı.`);
    } else {
        alert("Ürün sepette bulunamadı.");
    }
}

// calculate total price
function calculateTotalPrice() {
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Toplam fiyat: ${totalPrice.toFixed(2)} TL`);
}

// display cart
function displayCart() {
    let cartDetails = cart.length ? cart.map(item => `${item.name}: ${item.price.toFixed(2)} TL`).join("\n") : "Sepetiniz boş.";
    alert(`Sepetiniz:\n${cartDetails}`);
    console.log(`Sepetiniz:\n${cartDetails}`);
    calculateTotalPrice();
}

// cart operations
function cartOperations() {
    while (process) {
        let choice = prompt("Ürün eklemek için E, çıkarmak için C, toplam fiyat için T, çıkmak için Q giriniz:").toLowerCase();
        switch (choice) {
            case "e":
                addProductToCart();
                break;
            case "c":
                removeProductFromCart();
                break;
            case "t":
                calculateTotalPrice();
                break;
            case "q":
                displayCart();
                return;
            default:
                alert("Geçersiz giriş, tekrar deneyin.");
        }
    }
}

// start the program 
getUserInfo();
cartOperations();
