const catalogItem = {
    props: ['item', 'quantityItem', 'recount', 'address'],
    template: `
    <div  v-if="+recount < +quantityItem" class="product__common bxbb">
        <div class="product__common_img flex"><div class="product__common_img_style flex">
            <img :src="item.img" alt="photo"></div>
        </div>
        <div class="product__common_text">{{ item.title }}<br>
            <span class="product__common_color">$&nbsp;{{ item.price }}</span>
            <div class="product__common_hover bxbb">
                <a href="single_page.html" class="product__common_hover_a flex"></a>
                <div class="product__common_button flex">
                    <a class="product__common_button_a flex" href="#">
                    <img class="product__common_button_img"
                         src="img/hover_product.svg" alt="ico">Add to Cart</a>
            <div v-if="address" class="product__common_button_man flex">
                                    <a class="product__common_button_a
                                    product__common_button_a_man flex" href="#">
                                        <img src="img/hover_product2.svg" alt=""></a>
                                    <a class="product__common_button_a
                                    product__common_button_a_man flex" href="#">
                                        <img src="img/hover_product3.svg" alt=""></a></div>
                         </div></div></div></div>
    `
};

Vue.component('catalog', {
    props: ['quantityItem', 'address'],
    data(){
        return {
            items: [],
            recount: 0
        }
    },
    components: {
        'catalog-item': catalogItem,
    },
    methods: {
        classNameTag(address){
            if(address){
                return `man__product_list flex bxbb`
            } else {
                return `product__list container flex`
            }
        }
    },
    mounted(){
        this.$parent.getJson(`/goods`)
            .then((goods) => {
                this.items = goods;
            });
    },
    template: `
    <div  :class="classNameTag(address)">
        <catalog-item v-for="item in items"
            :key="item.id"
            :item="item"
            :address="address"
            :recount="recount++"
            :quantity-item="quantityItem"
        ></catalog-item>
    </div></div>
    `
});



