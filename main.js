var app = new Vue ({
    el: '#app',
    data: {
        whatsFirst: 'data silniejszy!',
        brand: 'Vue Mastery',
        product: 'Socks',
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        selectedVariant: 0,
        variants: [{
            variantId: "2234",
            backgroundColor: "blue",
            variantImage: '.\\assets\\vmSocks-blue-onWhite.jpg',
            variantQantity: 10,
        }, {
            variantId: "2235",
            backgroundColor: "green",
            variantImage: '.\\assets\\vmSocks-green-onWhite.jpg',
            variantQantity: 0,
        }],
        sizes: ["35-38", "39-42",  "43-46"],
        cart: 0,
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        subFromCart: function () {
            if(this.cart === 0) return; 
            this.cart -= 1;
            return;
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
            return;
        },  
    },
    computed: {
        whatsFirst() {
            return 'Computed, proste'
        },
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQantity
        },
        comutedOnSale() {
            return this.onSale ? `${this.brand} ${this.product} ${this.onSale}`: 'Actually not on sale.'
        },

    }
})