const bigBasketItem = {
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
<td class="shopping__column">$&nbsp;{{ cart.price }}</td>
<td class="shopping__column">{{ cart.quantity }}</td>
<td class="shopping__column shopping__column_shipping">free</td>
<td class="shopping__column">$&nbsp;{{ cart.price * cart.quantity }}</td>
<td class="shopping__column shopping__column_action">
<div @click="$emit('handle-delete-click', cart.id)"><i class="fas fa-times-circle"></i></div>
</td>
</tr>
    `
};
const minBasketItem = {
    props: ['cart'],
    template: `
<tr>
    <td class="cart_product_column cart_product_child_1">
        <a :href="cart.url">
        <img class="cart_product_img_product flex"
                         :src="cart.img" alt="photo"></a></td>
    <td class="cart_product_column cart_product_child_2">
        <a class="cart_product_child_2_a" href="#">
            <h3 class="cart_product_child_2_a_h3">Rebox Zane</h3>
            <img src="img/stars.jpg" alt="stars">
            <p class="cart_product_child_2_a_p" >{{ cart.quantity }}  x
                <span class="cart_product_child_2_a_p_span">$&nbsp;{{ cart.price }}
                </span></p></a></td>
    <td class="cart_product_column cart_product_child_3">
        <div class="cart_product_child_3_a" @click="$emit('handle-delete-click', cart.id)">
            <i class="cart_product_child_3_a_i fas fa-times-circle">
            </i></div></td>
</tr>
    `
};

Vue.component('basket', {
    props: ['basketSize'],
    data() {
        return {
            cart: [],
        }
    },
    components: {
        'big-basket-item': bigBasketItem,
        'min-basket-item': minBasketItem
    },
    methods:{
        outBasket(size){
            if (this.basketSize === size){
                return true
            } else {
                return false
            }

        },
        handleBuyClick(item) {
            // проверяет есть ли в корзине этот товар
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    //если есть добавляет количество товара
                    return this.addQuantityAdd(item.id, i);
                }
            }
            //если нет добавляет товар в корзину
            return this.addItemBasket(item);
        },
        addItemBasket(item){
            let prod = Object.assign({quantity: 1}, item);
            this.cart.push(prod);
            return fetch(`cart`, {
                method: 'POST',
                body: JSON.stringify(prod),
                headers: {
                    'Content-type': 'application/json',
                },
            })
        },
        addQuantityAdd(id, i){
            this.cart[i].quantity++;
            this.updateQuantityServer(id, i);
        },
        addQuantityDiminish(id){
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === id) {
                    if (this.cart[i].quantity > 1) {
                        this.cart[i].quantity--;
                        this.updateQuantityServer(id, i);
                        return false
                    } else if (confirm('Вы действительно хотите удалить товар из корзины?')) {
                        return this.handleDeleteClick(id);
                    } else {
                        return false;
                    }
                }
            }
        },
        //обновляет количество товара на сервере
        updateQuantityServer(id, i){
            return fetch(`/cart/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({quantity: this.cart[i].quantity}),
                headers: {
                    'Content-type': 'application/json',
                },
            })
        },
        //удаляет товар с сервера
        handleDeleteClick(id) {
            return fetch(`/cart/${id}`, {
                method: 'DELETE',}).then(() => {
                this.cart = this.cart.filter((item) => item.id !== id);
            });
        },
    },
    mounted() {
        this.$parent.getJson(`/cart`)
            .then((item) => {
                this.cart = item;
            });
    },
    computed: {
        grandTotal() {
            return this.cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
        },
        quantityItemCart(){
            return this.cart.length
        }
    },
    template:`
<div>
<div class="cart_product_length" v-if="quantityItemCart !== 0">{{ quantityItemCart }}</div>
    <div v-if="outBasket('min')" class="drop drop_cart">
        <div class="drop__flex">
            <div class="cart_product">
                <table  class="cart_product_table">
                    <min-basket-item v-for="item in cart"
                    @handle-buy-click="handleBuyClick"
                    @add-quantity-diminish="addQuantityDiminish"
                    @handle-delete-click="handleDeleteClick"
                    :key="item.id"
                    :cart="item"
                ></min-basket-item>
                </table>
                <p class="shopping__empty_mini" v-if="!cart.length">Корзина пуста</p>
                <div v-if="quantityItemCart !== 0" class="cart_product_text_price flex">
                    <h3 class="cart_product_text_price_h3">TOTAL</h3>
                    <h3 class="cart_product_text_price_h3">$&nbsp;{{ grandTotal }}</h3>
                </div>
            </div>
            <div class="cart_product_button cart_product_button_checkout flex">
                <a  class="cart_product_button_a cart_product_button_checkout_a flex"
                    href="checkout.html">Checkout</a></div>
            <div class="cart_product_button flex">
                <a class="cart_product_button_a flex"
                   href="Shopping_cart.html">Go to cart</a></div>
        </div>
    </div>
    <div v-if="outBasket('big')" class="shopping container">
        <p class="shopping__empty container" v-if="!cart.length">Корзина пуста</p>
        <div  v-if="cart.length">
            <table id="table_cart" class="shopping__table">
                <tr>
                    <td class="shopping__column_head shopping__column_head_col_2" colspan="2">Product Details</td>
                    <td class="shopping__column shopping__column_head">unite Price</td>
                    <td class="shopping__column shopping__column_head">Quantity</td>
                    <td class="shopping__column shopping__column_head">shipping</td>
                    <td class="shopping__column shopping__column_head">Subtotal</td>
                    <td class="shopping__column shopping__column_action shopping__column_head">ACTION</td>
                </tr>
                 <big-basket-item v-for="item in cart"
                    @handle-buy-click="handleBuyClick"
                    @add-quantity-diminish="addQuantityDiminish"
                    @handle-delete-click="handleDeleteClick"
                    :key="item.id"
                    :cart="item"
                ></big-basket-item>
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
                        <p class="shopping_proceed_p">sub total<span id="sub_total">$&nbsp;{{ grandTotal }}</span></p>
                        <h3 class="shopping_proceed_h3">grand total
                            <span  id="grand_total" class="shopping_proceed_h3_span">$&nbsp;{{ grandTotal }}</span></h3>
                    </div>
                    <div class="shopping_proceed_button"><a class="flex" href="checkout.html">proceed to checkout</a></div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
});
