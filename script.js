/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

console.log("running");

let carts = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "Celery Drink",
    tag: "celerydrink",
    price: 6,
    inCart: 0,
  },
  {
    name: "Beets Drink",
    tag: "beetsdrink",
    price: 6,
    inCart: 0,
  },

  {
    name: "Cucumber Drink",
    tag: "cucumberdrink",
    price: 6,
    inCart: 0,
  },
  {
    name: "Kale Drink",
    tag: "kaledrink",
    price: 6,
    inCart: 0,
  },
  {
    name: "Carrots Drink",
    tag: "carrotsdrink",
    price: 6,
    inCart: 0,
  },

  {
    name: "Grapefruit Drink",
    tag: "grapefruitdrink",
    price: 6,
    inCart: 0,
  },
  {
    name: "Orange Juice Drink",
    tag: "orangejuicedrink",
    price: 6,
    inCart: 0,
  },
  {
    name: "Apple Juice Drink",
    tag: "applejuicedrink",
    price: 6,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  console.log("how many products");
  carts[i].addEventListener("click", () => {
    console.log("added to cart");
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
  console.log("cart loaded successfully!");
}

function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  // console.log(productNumbers);
  // console.log(typeof productNumbers);
  productNumbers = parseInt(productNumbers);
  // console.log(typeof productNumbers);

  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (action == "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cart span").textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  // if (productNumbers) {
  //   localStorage.setItem("cartNumbers", productNumbers + 1);
  //   document.querySelector(".cart span").textContent = productNumbers + 1;
  // } else {
  //   localStorage.setItem("cartNumbers", 1);
  //   document.querySelector(".cart span").textContent = 1;

  setItems(product);
}
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  console.log("My cart items are", cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
  // console.log("The product choise is ", product.price);
  let cartCost = localStorage.getItem("totalCost");
  console.log("My cart cost is ", cartCost);

  if (action == "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - product.price);
  } else if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
  console.log(cartItems);
  if (cartItems && productContainer) {
    console.log("productContainer is running");
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
      <ion-icon name="close-circle-outline"></ion-icon>
       <img src="spsmoothie1.jpg">
        <span>${item.name}</span>
      </div>
      <div class="price"> ${item.price}</div>
      <div class="quantity">
        <ion-icon class="decrease" name="remove-circle-outline"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class="increase" name="add-circle-outline"></ion-icon>
      </div>
      <div class="total">${item.inCart * item.price}</div>
      `;
    });
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">
        Basket Total
      </h4>
      <h4 class="basketTotal">
      $${cartCost}.00
      </h4>
    </div>
    `;
  }

  deleteButtons();
  manageQuantity();
}

function deleteButtons() {
  let deleteButtons = document.querySelectorAll(".product ion-icon");
  let productName;
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      productName = deleteButtons[i].parentElement.textContent
        .trim()
        .toLocaleLowerCase()
        .replace(/ /g, "");
      // console.log(productName);
      // console.log(
      //   cartItems[productName].name + " " + cartItems[productName].inCart
      // );
      // console.log("we have " + productNumbers + " in cart.");

      localStorage.setItem(
        "cartNumbers",
        productNumbers - cartItems[productName].inCart
      );

      localStorage.setItem(
        "totalCost",
        cartCost - cartItems[productName].price * cartItems[productName].inCart
      );

      delete cartItems[productName];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
      onLoadCartNumbers();
    });
  }
}

function manageQuantity() {
  let decraseButtons = document.querySelectorAll(".decrease");
  let increaseButtons = document.querySelectorAll(".increase");
  let cartItems = localStorage.getItem("productsInCart");
  let currentQuantity = 0;
  let currentProduct = "";
  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < decraseButtons.length; i++) {
    decraseButtons[i].addEventListener("click", () => {
      currentQuantity =
        decraseButtons[i].parentElement.querySelector("span").textContent;
      currentProduct = decraseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumbers(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });
  }
  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener("click", () => {
      currentQuantity =
        increaseButtons[i].parentElement.querySelector("span").textContent;

      currentProduct = increaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();

      cartItems[currentProduct].inCart += 1;
      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}

onLoadCartNumbers();
displayCart();
