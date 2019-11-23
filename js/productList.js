const catalogItem = {
    props: ['item'],
    template: `
    <div class="product__common bxbb">
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
                         src="img/hover_product.svg" alt="ico">Add to Cart</a></div>
            </div>
        </div>
    </div>
    `
};

Vue.component('catalog', {
    data(){
        return {
            items: []
        }
    },
    components: {
        'catalog-item': catalogItem,
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
    <div class="product__list container flex">
        <catalog-item v-for="item in items"
            :key="item.id"
            :item="item"
        ></catalog-item>
    </div>
    `
});



