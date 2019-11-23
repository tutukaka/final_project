Vue.component('catalog', {
    props: [''],
    methods: {
        handleSearchClick(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredItems = this.items.filter((item) => {
                return regexp.test(item.title);
            });
        },

    },
    mounted(){
        this.$parent.getJson('/goods')
            .then((goods) => {
                this.items = goods;
                this.filteredItems = goods;
            });
    },
    template: `
    <div class="product__common bxbb">
                    <div class="product__common_img flex"><div class="product__common_img_style flex">
                        <img class="product__common_img_style" src="img/product_1.jpg" alt="photo"></div>
                    </div>
                    <div class="product__common_text">10 Mango People T-shirt <br>
                        <span class="product__common_color">$52.00</span>
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
});

