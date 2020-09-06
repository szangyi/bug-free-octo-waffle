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

    const img = myCopy.querySelector(".product_image");
    img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/medium/${myProduct.image}-md.jpg`)

    //fill out template
    myCopy.querySelector(".data_name").textContent = myProduct.name;
    myCopy.querySelector(".data_shortdescription").textContent = myProduct.shortdescription;
    myCopy.querySelector(".data_discount").textContent = ` -${myProduct.discount}%`;
    myCopy.querySelector(".data_price").textContent = `${myProduct.price}kr`;


    const parentElem = document.querySelector("section#" + myProduct.category);




    if (!myProduct.discount) {
        //not discount
        myCopy.querySelector(".data_discount").classList.toggle("hidden")
    }

    //------calculating------
    if (myProduct.discount) {
        //        const productBody = myCopy.querySelector(".product_body");
        myCopy.querySelector(".data_price").style.textDecoration = "line-through";
        const discountedPrice = document.createElement("h5");

        const price = myProduct.price;
        const discount = myProduct.discount;
        const reduction = price * (discount / 100);

        discountedPrice.textContent = `${Math.round(price - reduction)}kr`;

        const parentElem = myCopy.querySelector(".product_body");
        parentElem.appendChild(discountedPrice);
        //        parentElem.appendChild(myCopy);


    }


    if (myProduct.vegetarian) {
        myCopy.querySelector(".veg").classList.remove("hidden")
    };



    //    if (myProduct.allergens)

    if (myProduct.soldout) {
        myCopy.querySelector(".product").classList.add("soldout");
    }

    //FILTERING
    //VEGGIE
    const article = myCopy.querySelector("article")
    if (myProduct.vegetarian) {
        article.classList.add("vegetarian")
    }

    const veggiefilter = document.querySelector("#veggiefilter");
    veggiefilter.addEventListener("click", veggieFilterClicked);

    function veggieFilterClicked() {
        //select all non veggie
        veggiefilter.classList.toggle("active");
        const articles = document.querySelectorAll("article:not(.vegetarian)");
        articles.forEach(elem => {
            elem.classList.toggle("hidden")
        })
    }


    //ALCOHOL
    if (myProduct.alcohol) {
        article.classList.add("alcoholic")
    }
    const alcoholfilter = document.querySelector("#alcoholfilter");
    alcoholfilter.addEventListener("click", alcoholFilterClicked);

    function alcoholFilterClicked() {
        alcoholfilter.classList.toggle("active")
        const articles = document.querySelectorAll("article.alcoholic");
        articles.forEach(elem => {
            elem.classList.toggle("hidden")
        })
    }

    if (myProduct.alcohol) {
        myCopy.querySelector(".alcoholic").classList.remove("hidden")
    };

    //DISCOUNT
    if (!myProduct.discount) {
        article.classList.add("nondiscount")
    }
    const discountfilter = document.querySelector("#discountfilter");
    discountfilter.addEventListener("click", discountFilterClicked);

    function discountFilterClicked() {
        discountfilter.classList.toggle("active")
        const articles = document.querySelectorAll("article.nondiscount");
        articles.forEach(elem => {
            elem.classList.toggle("hidden")
        })
    }

    //SOLDOUT - AVAILABLE
    if (myProduct.soldout) {
        article.classList.add("soldout")
    }
    const soldoutfilter = document.querySelector("#soldoutfilter");
    soldoutfilter.addEventListener("click", soldoutFilterClicked);

    function soldoutFilterClicked() {
        soldoutfilter.classList.toggle("active")
        const articles = document.querySelectorAll("article.soldout");
        articles.forEach(elem => {
            elem.classList.toggle("hidden")
        })
    }

    //FILTERING end



    myCopy.querySelector("article").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=` + myProduct.id)
            .then(res => res.json())
            .then(showDetails);
    });



    //------------------ide tehetek cuccokat amiket a DOM-hoz akarok kotni-------------

    parentElem.appendChild(myCopy);
}

function showDetails(data) {
    console.log(data);
    const img = modal.querySelector(".modal-image");
    img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/small/${data.image}-sm.jpg`)

    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    //    modal.querySelector(".modal-price").textContent = `${data.price}kr`;
    modal.querySelector(".vegmodal").classList.remove("hidden");
    //    modal.querySelector(".alc").classList.remove("hidden");


    if (data.alcohol) {
        modal.querySelector(".alcmodal").classList.remove("hidden")
    };

    if (data.vegetarian) {
        modal.querySelector(".vegmodal").classList.remove("hidden")
    };

    if (data.soldout) {
        modal.querySelector(".modal-content").style.filter = "grayscale(100)";
        modal.querySelector(".soldouttext").classList.remove("hidden");
    }


    modal.querySelector(".allergens").textContent = `Allergens: ${data.allergens}`;

    modal.classList.remove("hidden");
    //    modal.classList.remove("relaxout");
    //    modal.classList.add("relaxin");


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


//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.querySelector(".vegmodal").classList.add("hidden");
    modal.querySelector(".alcmodal").classList.add("hidden");
    modal.querySelector(".soldouttext").classList.add("hidden");
     modal.querySelector(".modal-content").style.filter = "grayscale(0)";
    //    modal.classList.remove("relaxin");
    //    modal.classList.add("relaxout");
    //    modal.addEventListener("animationend", hideBackground);

});
//
//function hideBackground() {
//    modal.classList.remove("relaxout");
//
//}
