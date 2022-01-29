Vue.component('product-details', {
    props: {
        details: {},
    },
    template:
    `
    <ul>
    <li v-for="detail in details"> {{detail}}</li>
    </ul>
    `,
    data() {
        return {
        }}
})  

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
    },
    template: ` 
    <div class="product">
    <div class="nav-bar"></div>
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" >
        </div>
    
        <div class="product-info">
            <h1>{{title}}</h1>
            <p  v-if="inStock"
            >In Stock
            </p>
            <p v-else-if></p>
            <p v-if="!inStock"
            class="outOfStockP"
            >Out of Stock

            </p>
            <span v-show="onSale">On Sale!</span>
            
            <product-details :details="details"></product-details>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.backgroundColor}"                    
                @mouseover="updateProduct(index)">
            </div>
            <div class="size">
                <h2>Sizes:</h2>
                <div v-for="size in sizes">
                    <p> {{size}}</p>
                </div>
            </div>
        </div>
        <div class="cartSummary">
        <button v-on:click="addToCart" 
                :disabled= "!inStock"
                :class="{ disabledButton: !inStock }"
        >Add to Cart
        </button>
        <button v-on:click="subFromCart" 
                :class="{ disabledButton: cart === 0 }"        
        >Remove from Cart
        </button>
            <div class="cart">
            <p>Cart {{cart}}</p>
            </div>
        </div>

    </div>
    <div class="testy">
        <p><span>Elo <b>{{whatsFirst}}</b></span></p>
        <p>{{comutedOnSale}}</p>
        <p>Shipping:  {{ shipping }}</p>
    </div>
    `,
    data() {
        return {
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
        }
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
        shipping() {
            if (this.premium) {
                return 'Free';
            };
            return 2.99;
        }
    }
})

var app = new Vue ({
    el: '#app',
    data: {
        premium: false,
    },
})

