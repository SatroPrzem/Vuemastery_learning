var app = new Vue ({
    el: '#app',
    data: {
        product: 'Socks',
        inStock: true,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        image: './assets/vmSocks-green-onWhite.jpg',
        variants: [{
            variantId: "2234",
            variantColor: "green",
            variantImage: './assets/bartek_kciuk.jpg'
        }, {
            variantId: "2235",
            variantColor: "blue",
            variantImage: './assets/bartek_oczy.jpg'
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
        },
        updateProduct: function (variantImage) {
            this.image = variantImage;
        },
        
    },
})