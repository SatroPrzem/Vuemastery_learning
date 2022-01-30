var eventBus = new Vue();

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

            <shiping-details-tabs :details="details" :shipping="shipping" :premium="premium"></shiping-details-tabs>

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
        <p>{{comutedOnSale}}</p>
        </div>


        <product-tabs :reviews="reviews"></product-tabs>
    </div>
    `,
    data() {
        return {
        brand: 'Vue Mastery',
        product: 'Socks',
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        selectedVariant: 0,
        variants: [{
            name: 'Vue socks: blue',
            variantId: "2234",
            backgroundColor: "blue",
            variantImage: '.\\assets\\vmSocks-blue-onWhite.jpg',
            variantQantity: 10,
        }, 
        {
            name: 'Vue socks: green',
            variantId: "2235",
            backgroundColor: "green",
            variantImage: '.\\assets\\vmSocks-green-onWhite.jpg',
            variantQantity: 0,
        },
        {
            name: 'White oldschool socks',
            variantId: "123",
            backgroundColor: '#DDDCC1',
            variantImage: '.\\assets\\whiteSocks.jpg',
            variantQantity: 3,
        }],
        sizes: ["35-38", "39-42",  "43-46"],
        reviews: [],
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        subFromCart: function () {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
            return;
        },
    },
    computed: {
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
            return this.onSale ? `${this.brand} ${this.product} now on Sale!`: 'Actually not on sale.'
        },
         shipping() {
             console.log(this);
            if (this.premium) {
                return 'Free';
            };
            return 2.99;
        }
    },
    mounted() {
        eventBus.$on('', )
        eventBus.$on('review-submitted', productReview => {
            console.log('addReview', productReview)
            this.reviews.push(productReview)
        })
    }
});
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
}); 
Vue.component('product-review', {
    template: `
    <div>
        <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s): </b>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name: </label>
            <input id="name" v-model="name">
        </p>
        <p>
            <label for="review">Review: </label>
            <textarea id="review" v-model="review"></textarea> 
        </p>
        <p>
            <label for="rating">Rating: </label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <div>
                <p>Would You like to recomend this product? </p>

                <label for="yes"> Yes 
                <input type="radio" id="yes"
                name="yesOrNo" value="yes" v-model="recomend" />
                </label>

                <label for="no"> no 
                <input type="radio" id="no"
                name="yesOrNo" value="no" v-model="recomend" />
                </label>

        </div>
        <p>
                <input type="submit" value="Submit">    
        </p>
        </form>
        </div>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            recomend: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating && this.recomend){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recomend: this.recomend,
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recomend = null;
            }
            else {
                if(!this.name) this.errors.push("Name required.");
                if(!this.review) this.errors.push("Review required.");
                if(!this.rating) this.errors.push("Rating required.");
                if(!this.recomend) this.errors.push("Recomendation required.");
            }
         },
    }
});
Vue.component('product-tabs', {
    props: {
        reviews: {
            required: true,
            type: Array,
        }
    },
        template: `
                <div>
                    <span class="tab"
                    :class="{ activeTab: selectedTab === tab}"
                    v-for="(tab, index) in tabs" :key="index"
                    @click="selectedTab = tab">
                    {{ tab }}
                    </span>
                    <div v-show="selectedTab === 'Reviews'">
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul v-else>
                        <li v-for="review in reviews">
                            <p>{{review.name}}</p>
                            <p>Rating: {{review.rating}}</p>
                            <p>{{review.review}}</p>
                            <p>Would I recomend: {{review.recomend}}</p>
                        </li>    
                    </ul>
                </div>
                <product-review v-show="selectedTab === 'Make a Review'"
                @review-submitted='addReview'></product-review>
                </div>
        `,
        
        data() {
        
            return {
                tabs: ['Reviews', 'Make a Review'],
                selectedTab: 'Reviews',
            }
        }
    });
    Vue.component('shiping-details-tabs', {
        props: {
            shipping: {
                required: true,
            },
            details: {
                type: Array,
                required: true,
            }
        },
        template: `
        <div>
            <span class="tab"
            :class="{ activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" :key="index"
            @click="selectedTab = tab">
            {{ tab }}
            </span>
            <div v-show="selectedTab === 'Shipping'">
                <p>Shipping:  {{ shipping }}</p>
            </div>
            <div v-show="selectedTab === 'Details'">
                <product-details :details="details"></product-details>
            </div>
        </div>
        `,
        data() {
            return {
                tabs: ['Shipping', 'Details'],
                selectedTab: 'Shipping',
            }
        }
    })
var app = new Vue ({
    el: '#app',
    data: {
        whatsFirst: 'data silniejszy!',
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            console.log('dodaje')
            this.cart.push(id);
        },
        removeFromCart(id) {
            const index = this.cart.findIndex(e => e === id);
            if(index === -1) return;
            this.cart.splice(index, 1);
        }
    },
    computed: {
    whatsFirst() {
            return 'Computed, proste'
        },
    }
});

