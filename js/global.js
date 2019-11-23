const app = new Vue({
    el: '.global',
    data: {
        message: 12
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    // this.$refs.error.setError(error);
                })
        },
    },
});