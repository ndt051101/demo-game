import { run } from "./buy.js";

const checkToken = (token) => {
  $.ajax({
    url: `http://localhost:8000/api/checktoken`,
    type: "POST",
    dataType: "json",
    data: {
      token: token,
    },
  })
    .then((data) => {
      console.log(data);
      if (data.status) {
        $("#user").hide();
        $("#profile").show();
        $(".text-white").html(data.profile.name);
        $(".balance").html(
          "Số dư: " + data.profile.coin + ` <i class="fas fa-dollar-sign"></i>`
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};


const retrievedObject = localStorage.getItem("token");
if (retrievedObject != null) {
  checkToken(retrievedObject);
}

$(document).ready(function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log(params.id);
  $.ajax({
    url: `http://localhost:8000/api/productbycategory?category=${params.id}`,
    type: "GET",
    dataType: "json",
  })
    .then((data) => {
      if (data && data.data.length > 0) {
        let listItem = "";
        data.data.map((item, index) => {
          let price = item.price - (item.price * item.discount) / 100;
          listItem += `
            <div class="item-frames" >
                <div class="item-wrapper">
                  <a href="#">
                    <img
                      class="img-product"
                      src="http://127.0.0.1:8080/storage/products/${item.image}"
                      alt="product"
                    />
                  </a>
                  <div class="item-info">
                    <a href="#">
                      <div class="item-title">${item.name}</div>
                    </a>
                    <div class="item-price">
                      <span class="current-price"> ${price}đ </span>
                      <span class="price-block">
                        <span class="old-price">${
                          item.discount === 0 ? "" : item.price
                        }${item.discount === 0 ? "" : "đ"}</span>
                        <span class="discount-price">${
                          item.discount === 0 ? "" : "-"
                        }${item.discount === 0 ? "" : item.discount}${
            item.discount === 0 ? "" : "%"
          }</span>
                      </span>
                    </div>
                    <div class="item-cart">
                      <a href="#">
                        <i class="fas fa-shopping-cart"></i>
                      </a>
                    </div>
                    <div id="${item.id}" class="item-btn">Mua ngay</div>
                  </div>
                </div>
              </div>
        `;
        
          $('body').on('click','#'+ item.id +'', run(item.id));

        });
        $(".service").html(listItem);
        $(".view-more").html("Tải thêm sản phẩm");
      } else {
        $(".view-more").html("Không có sản phẩm nào cả!");
      }
      console.log(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
});


const clickPurchase = () => {
  $(".item-btn").click(function () {
    alert("Click me");
    // $.ajax({
    //   url: "cart.php",
    //   type: "POST",
    //   data: { itemID: id },
    //   success: function (data) {
    //     // Do stuff when the AJAX call returns
    //   },
    // });
  });
};