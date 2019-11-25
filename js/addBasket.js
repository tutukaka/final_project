const basketItem = {
    props: ['cart'],
    template: `
<tr>
<td class="shopping__column shopping__column_img">
<a :href="cart.url">
<img :src="cart.img" alt="photo"></a>
</td>
<td class="shopping__column shopping__column_description">
<a class="block aic" :href="cart.url">
<h3 class="shopping__column_description_h3">{{ cart.title }}</h3>
<br>
<p class=" shopping__column_description_p">Color:
<span class="shopping__column_description_p_span">{{ cart.color }}</span></p>
<p class=" shopping__column_description_p">Size:
<span class="shopping__column_description_p_span">{{ cart.size }}</span></p></a>
</td>
<td class="shopping__column">{{ cart.price }}</td>
<td class="shopping__column">{{ cart.quantity }}</td>
<td class="shopping__column shopping__column_shipping">free</td>
<td class="shopping__column">{{ cart.price * cart.quantity }}</td>
<td class="shopping__column shopping__column_action">
<i class="fas fa-times-circle"></i>
</td>
</tr>
    `
};

Vue.component('basket', {
    data() {
        return {
            cart: [],
        }
    },
    components: {
        'basket-item': basketItem,
    },
    mounted() {
        this.$parent.getJson(`https://raw.githubusercontent.com/tutukaka/final_project/first_try/basket.json`)
            .then((item) => {
                this.cart = item;
            });
    },
    methods:{
        subTotal(){
            console.log(this.cart)
        }
    },

    computed: {
        grandTotal() {
            return this.cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
        }
    },
    template:`
    <div class="shopping container">
        <p v-if="!cart.length">Корзина пуста</p>
        <table id="table_cart" class="shopping__table">
            <tr>
                <td class="shopping__column_head shopping__column_head_col_2" colspan="2">Product Details</td>
                <td class="shopping__column shopping__column_head">unite Price</td>
                <td class="shopping__column shopping__column_head">Quantity</td>
                <td class="shopping__column shopping__column_head">shipping</td>
                <td class="shopping__column shopping__column_head">Subtotal</td>
                <td class="shopping__column shopping__column_action shopping__column_head">ACTION</td>
            </tr>
             <basket-item v-for="item in cart"
                :key="item.id"
                :cart="item"
            ></basket-item>
        </table>
        <div class="shopping_button_position flex">
            <div class="shopping_button shopping_button_clear bxbb">cLEAR SHOPPING CART</div>
            <div class="shopping_button shopping_button_continue bxbb">cONTINUE sHOPPING</div>
        </div>
        <div class="flex">
            <div class="shopping_adress">
                <h3 class="shopping_adress_h3">Shipping Adress</h3>
                <form action="#">
                <label>
                    <select class="bxbb" name="filter">
                        <option value="filter" selected>Bangladesh</option>
                        <option value="filter">#</option>
                    </select>
                </label>
                <label>
                    <input class="shopping_adress_input bxbb" type="text" placeholder="State">
                </label>
                <label>
                    <input class="shopping_adress_input bxbb" type="text" placeholder="Postcode / Zip">
                </label>
                <div class="shopping_adress_button"><a class="flex" href="#">get a quote</a></div>
                </form>
            </div>
            <div class="shopping_discount">
                <h3 class="shopping_discount_h3">coupon  discount</h3>
                <p class="shopping_discount_p">Enter your coupon code if you have one</p>
                <form action="#">
                <label>
                    <input class="shopping_adress_input bxbb" type="text" placeholder="2">
                </label>
                <div class="shopping_discount_button"><a class="flex" href="#">Apply coupon</a></div>
                </form>
            </div>
            <div class="shopping_proceed bxbb">
                <div class="shopping_proceed_text bxbb">
                    <p class="shopping_proceed_p">sub total<span id="sub_total">$&nbsp;900</span></p>
                    <h3 class="shopping_proceed_h3">grand total
                        <span  id="grand_total" class="shopping_proceed_h3_span">$&nbsp;{{ grandTotal }}</span></h3>
                </div>
                <div class="shopping_proceed_button"><a class="flex" href="#">proceed to checkout</a></div>
            </div>
        </div>
    </div>
    `
});
