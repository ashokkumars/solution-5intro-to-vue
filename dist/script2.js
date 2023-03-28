
Vue.component('product-details', {

    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details"> {{ detail }}</li>
        </ul>
    `
})

Vue.component('product', {

    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: ` 
    <div class="product">
    <div class="product-image">
        <img :src="image" />
    </div>

    <div class="product-info">
        <h1> {{ product }}</h1>
        <p> {{ description }} </p>
        <p> {{ sale }} </p>
        <p> Shipping: {{ shipping }} </p>
        <a :href="link">Google</a>

        <p v-show="shouldShowDiv">This div is hidden based on the condition & v-show property</p>

        <p v-if="inStock > 10">In Stock</p>
        <p v-else-if="inStock <=10 && inStock>0">Almost Sold out</p>
        <p v-else class="outOfStock">Sold out</p>

        <product-details :details="details"></product-details>

        <ul>
            <li v-for="size in sizes"> {{ size }}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
                    :key="index"
                    class="color-box"
                    :style=" { backgroundColor:variant.variantColor } "
                    @mouseover="updateProductImage(index)">
        </div>

        <button @click="addToCart(true)" 
                :disabled="!inStock"
                :class="{disabledButton: !inStock}"> Add to Cart </button>
        <button @click="addToCart(false)"> Remove from Cart </button>

        
    </div>
    </div>`,

    data() {
        return {
            brand: 'Jockey',
            product: 'Socks',
            description: 'Vue getting started description',
            selectedVariant: 0,
            link: 'https://www.google.com',
            shouldEnableAddToCart: false,
            shouldShowDiv: true,

            details:['80% cotton', '20% polyester', 'Gender-neutral'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

            variants:[
                {
                    variantId: 123,
                    variantColor: 'Blue',
                    variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                    quantity: 10
                },
                {
                    variantId: 124,
                    variantColor: 'Green',
                    variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                    quantity: 0
                }
            ],
            onSale: true
        }
    },
    methods: {
        addToCart(shouldIncrement) {
            this.$emit('add-to-cart', shouldIncrement, this.variants[this.selectedVariant].variantId)
        },

        updateProductImage(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on Sale!'
            } else {
                return this.brand + ' ' + this.product + ' is not on Sale!'
            }
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            } else {
                return 2.99
            }
        }
    }
})

var app = new Vue( {
    el:'#app',
    
    data: {
        cart: [],
        premium: true
    },

    methods: {

        updateCart(shouldIncrement, id) {
            
            if (shouldIncrement) {
                this.cart.push(id)
            }   
            else if (this.cart.includes(id)) {
                for (let [index, cart_id] of this.cart.entries()) {
                    if (id == cart_id) {
                        this.cart.splice(index, 1)
                        break
                    }
                }
            }
        }
    }
    
})