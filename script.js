//fetch data

fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        dataReceived(data);
    })

//loop through products
function dataReceived(products) {
    products.forEach(showProduct)
}

//executed once for each product
function showProduct(myProduct) {

    //finding template
    const temp = document.querySelector("#productTemplate").content;
    //clone the template
    const myCopy = temp.cloneNode(true);
    //fill out template
    myCopy.querySelector(".dishname").textContent = myProduct.name;
    myCopy.querySelector(".shortdescription").textContent = myProduct.shortdescription;
    myCopy.querySelector(".price").textContent = myProduct.price;
    //append
    const parentElem = document.querySelector("section#starters");
    parentElem.appendChild(myCopy);

}

