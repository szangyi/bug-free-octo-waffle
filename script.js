
//loop through products
function dataReceived(products) {
    products.forEach(showProduct);
    //    products.forEach(showInfo)
}

//executed once for each product
function showProduct(myProduct) {

    //finding template
    const temp = document.querySelector("#productTemplate").content;
    //clone the template
    const myCopy = temp.cloneNode(true);
    //fill out template
    myCopy.querySelector(".data_name").textContent = myProduct.name;
    myCopy.querySelector(".data_shortdescription").textContent = myProduct.shortdescription;
    myCopy.querySelector(".data_discount").textContent = `-${myProduct.discount}%`;
    myCopy.querySelector(".data_price").textContent = `${myProduct.price}kr`;
    //append
    const parentElem = document.querySelector("section#starter");


    if (!myProduct.discount) {
        //not discount
        console.log("nodiscount");
        myCopy.querySelector(".data_discount").classList.toggle("hidden")
    }
    if (myProduct.vegetarian) {
        myCopy.querySelector(".infoveg").classList.remove("hidden")
    };

    if (myProduct.soldout) {
        myCopy.querySelector(".product").classList.add("soldout")
    }

    //setup classes for filtering
    //1.find article
    const article = myCopy.querySelector("article")

    //2.add classes
    if (myProduct.vegetarian) {
        article.classList.add("vegetarian")
    }

    const veggiefilter = document.querySelector("#veggiefilter");
    veggiefilter.addEventListener("click", veggieFilterClicked);


    function veggieFilterClicked() {
        //select all non veggie
        const articles = document.querySelectorAll("article:not(.vegetarian)");
        console.log(articles);
        veggiefilter.classList.toggle("active");
    }






    parentElem.appendChild(myCopy);
}


function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(function (data) {
        categoriesReceived(data)
    })
}

init();

function categoriesReceived(cats) {
       createNavigation(cats);
    createSections(cats);
    //fetch data

fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //        console.log(data)
        dataReceived(data);
    })

}



function createSections(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h1 = document.createElement("h1");
        h1.textContent = category;
        section.appendChild(h1);
        document.querySelector(".productlist").appendChild(section);
    })
}

function createNavigation(categories) {
    categories.forEach(cat => {
        const a = document.createElement("a");
        a.textContent = cat;
        a.setAttribute("href", `#${cat}`);
        document.querySelector("#nav").appendChild(a);
    })
}
