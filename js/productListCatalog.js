const catalogListProductItem = {
    props: ['item', 'test', 'num', 'address'],
    methods: {
        outConsole(num) {
            console.log(num)
        }
    },
    template: `
    <div v-if="+num<+test" class="product__common bxbb" > {{ outConsole(num) }}
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

Vue.component('catalog-list-product', {
    props: ['test', 'address'],
    data(){
        return {
            items: [],
            numbers: 0
        }
    },
    components: {
        'cataloglog-list-product-item': catalogListProductItem,
    },
    methods: {
    },
    mounted(){
        this.$parent.getJson('https://raw.githubusercontent.com/tutukaka/final_project/first_try/catalog.json')
            .then((goods) => {
                this.items = goods;
            });
    },
    template: `
    <div  v-if="address" class="man__product_list flex bxbb">
        <cataloglog-list-product-item v-for="item in items"
            :key="item.id"
            :item="item"
            :addres="address"
            :num="numbers++"
            :test="test"
        ></cataloglog-list-product-item>
    </div>
    `
});



