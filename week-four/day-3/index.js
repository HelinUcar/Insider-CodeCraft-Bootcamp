
const products = [
    { id: 1, name: 'Laptop', price: 15000, stock: 5 },
    { id: 2, name: 'Telefon', price: 8000, stock: 10 },
    { id: 3, name: 'Tablet', price: 5000, stock: 8 },
    { id: 4, name: 'Kulaklık', price: 1000, stock: 15 },
    { id: 5, name: 'Mouse', price: 500, stock: 20 }
];


class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.discountApplied = false;
    }

    addItem(productId, quantity = 1) {
        // İyileştirme 1: Geçersiz veya negatif miktar kontrolü
        if (isNaN(quantity) || quantity <= 0) {
            throw new Error('Geçersiz miktar!');
        }
        try {
            const product = products.find(p => p.id === productId);

            // İyileştirme 2: Ürün bulunamazsa hata mesajı göster
            if (!product) {
                throw new Error('Ürün bulunamadı!');
            }

            // Hata 1: Stok miktarı eşitse eklemeye izin verilmeli
            if (product.stock < quantity) { // < yerine <= kullanıldı
                // Kullanıcıya stok miktarını bildir
                throw new Error(`Yetersiz stok! Stokta sadece ${product.stock} adet var.`);
            }

            const existingItem = this.items.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({
                    productId,
                    name: product.name,
                    price: product.price,
                    quantity
                });
            }

            // İyileştirme 3: UI güncellenmeli
            this.calculateTotal();
            this.updateUI();

        } catch (error) {
            console.error('Ürün ekleme hatası:', error);
            this.showError(error.message);
        }
    }

    removeItem(productId) {
        try {
            const itemIndex = this.items.findIndex(item => item.productId === productId);

            if (itemIndex === -1) {
                throw new Error('Ürün sepette bulunamadı!');
            }

            const item = this.items[itemIndex];
            const product = products.find(p => p.id === productId);

            // İyileştirme 2: Ürün bulunamazsa hata mesajı göster
            if (!product) {
                console.error('Ürün bulunamadı!');
                return;
            }
            if (product) {
                // Hata 3: Ürün sepette kaç adet varsa stok o kadar artırılmalı
                product.stock += item.quantity; // item.quantity yerine sabit değer
            }

            this.items.splice(itemIndex, 1);
            // İyileştirme 3: UI güncellenmeli
            this.calculateTotal();
            this.updateUI();

        } catch (error) {
            console.error('Ürün silme hatası:', error);
            this.showError(error.message);
        }
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            // Hata 2: Miktar da hesaplamaya dahil edilmeli
            return sum + (item.price * item.quantity); // quantity çarpımı unutuldu
        }, 0);

        if (this.discountApplied && this.total > 0) {
            // Hata 4: Yanlış indirim düzeltildi, %10 yerine %90 uygulanıyor
            this.total *= 0.9;
        }
    }

    applyDiscount(code) {
        if (code === 'INDIRIM10' && !this.discountApplied) {
            this.discountApplied = true;
            // İyileştirme 3: UI güncellenmeli
            this.calculateTotal();
            this.updateUI();
            this.showMessage('İndirim uygulandı!');
        } else {
            this.showError('Geçersiz indirim kodu!');
        }
    }

    // UI Güncelleme
    updateUI() {
        const cartElement = document.getElementById('cart');
        const totalElement = document.getElementById('total');

        // İyileştirme 4: UI elemanları bulunamazsa hata gösterme
        if (!cartElement || !totalElement) {
            console.warn('UI elemanları bulunamadı!');
            return;
        }
        if (cartElement && totalElement) {
            cartElement.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.quantity} adet</span>
                    <span>${item.price} TL</span>
                    <button onclick="cart.removeItem(${item.productId})">Sil</button>
                </div>
            `).join('');

            totalElement.textContent = `Toplam: ${this.total} TL`;
        }
    }

    showError(message) {
        const errorElement = document.getElementById('error');
        if (errorElement) {
            errorElement.textContent += message + '\n';
        }
    }

    showMessage(message) {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = message;
            setTimeout(() => {
                messageElement.textContent = '';
            }, 3000);
        }
    }
}

class App {
    constructor() {
        window.cart = new ShoppingCart();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderProducts();
            this.setupEventHandlers();
        });
    }

    renderProducts() {
        const productsElement = document.getElementById('products');
        if (productsElement) {
            productsElement.innerHTML = products.map(product => `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>Fiyat: ${product.price}.00 TL</p>
                    <p>Stok: ${product.stock}</p>
                    <button onclick="app.addToCart(${product.id})"
                            ${product.stock === 0 ? 'disabled' : ''}>
                        Sepete Ekle
                    </button>
                </div>
            `).join('');
        }
    }

    setupEventHandlers() {
        const discountForm = document.getElementById('discount-form');
        if (discountForm) {
            discountForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const codeInput = document.getElementById('discount-code');
                if (codeInput) {
                    window.cart.applyDiscount(codeInput.value);
                }
            });
        }

        document.addEventListener('stockUpdate', () => {
            this.renderProducts();
        });
    }

    addToCart(productId) {
        window.cart.addItem(productId, undefined);
        document.dispatchEvent(new Event('stockUpdate'));
    }
}

const app = new App();
window.app = app; 