"use strict";

const groceryList = [
    {
        img:'img/man_product(1).jpg',
        descriptionCart:
            {
                text: 'Mango  People  T-shirt',
                color: 'Red',
                size: 'Xll',
            },
        unitePrice: 150,
        quantity: 1,
        shipping: 'free',
        subtotal: null,
        circleCart: '<i class="fas fa-times-circle"></i>',
    },
    {
        img:'img/man_product%20(2).jpg',
        descriptionCart:
            {
                text: 'Mango  People  T-shirt',
                color: 'Red',
                size: 'Xll',
            },
        unitePrice: 150,
        quantity: 1,
        shipping: 'free',
        subtotal: null,
        circleCart: '<i class="fas fa-times-circle"></i>',
    },
    {
        img:'img/man_product%20(8).jpg',
        descriptionCart:
            {
                text: 'Mango  People  T-shirt',
                color: 'Red',
                size: 'Xll',
            },
        unitePrice: 150,
        quantity: 1,
        shipping: 'free',
        subtotal: null,
        circleCart: '<i class="fas fa-times-circle"></i>',
    },
];

const cart = [];

let goodsContainer = document.getElementById('table_cart');

const renderItem = (item) => {
    let box = '';
    box += '<td class="shopping__column shopping__column_description">';
    box += `<a class="block aic" href="#"><h3 class="shopping__column_description_h3">
        ${item.descriptionCart.text}</h3><br>`;
    box += `<p class=" shopping__column_description_p">Color:
        <span class="shopping__column_description_p_span">${item.descriptionCart.color}</span> </p>`;
    box += `<p class=" shopping__column_description_p">Size:
        <span class=" shopping__column_description_p_span">${item.descriptionCart.size}</span></p></a></td>`;
    return box;
};

function renderGoods(arr) {
        arr.forEach(generate);
}

const generate = (arr) => {
    goodsContainer.innerHTML += `
    <tr><td class="shopping__column shopping__column_img"><a href="#">
    <img src="${arr.img}" alt="photo"></a></td>
    ${renderItem(arr)}
    <td class="shopping__column">$ ${arr.unitePrice}</td><td class="shopping__column"> ${arr.quantity}</td>
    <td class="shopping__column shopping__column_shipping"> ${arr.shipping}</td>
    <td class="shopping__column">$ ${arr.unitePrice * arr.quantity}</td>
    <td class="shopping__column shopping__column_action">${arr.circleCart}</td></tr>`
};

renderGoods(groceryList);
