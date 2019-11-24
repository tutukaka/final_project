const basketItem = {
    props: ['cart'],
    template: `
<tr>
<td class="shopping__column shopping__column_img">
<a :href="cart.url">
<img :src="cart.img" alt="photo">
</a>
</td>
<td class="shopping__column shopping__column_description">
<a class="block aic" :href="cart.url">
<h3 class="shopping__column_description_h3">
{{ cart.title }}
</h3>
<br>
<p class=" shopping__column_description_p">Color:
<span class="shopping__column_description_p_span">{{ cart.color }}</span>
</p>
<p class=" shopping__column_description_p">Size:
<span class="shopping__column_description_p_span">{{ cart.size }}</span>
</p>
</a>
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
        },
        grandTotal(){

        }
    },
    template:`
        <table id="table_cart" class="shopping__table">
        <tr>
            <td class="shopping__column_head shopping__column_head_col_2" colspan="2">Product Details {{ subTotal() }}</td>
            <td class="shopping__column shopping__column_head">unite Price</td>
            <td class="shopping__column shopping__column_head">Quantity</td>
            <td class="shopping__column shopping__column_head">shipping</td>
            <td class="shopping__column shopping__column_head">Subtotal</td>
            <td class="shopping__column shopping__column_action shopping__column_head">ACTION</td>
        </tr>
         <basket-item v-for="item in cart"
            :key="item.id"
            :item="item"
        ></basket-item>
    </table>
    `
});
