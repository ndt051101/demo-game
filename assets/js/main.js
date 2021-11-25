let myIndex = 0;
carousel();

function carousel() {
  let i;
  const x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 2000);
}

function register() {
  var name = $("#input-name-register").val();
  var email = $("#input-email-register").val();
  var username = $("#input-username-register").val();
  var password = $("#input-password-register").val();
  if (name == "" || email == "" || username == "" || password == "") {
    alert("Vui lòng điền đủ thông tin!");
    return;
  }
  $.ajax({
    url: "http://localhost:8000/api/register",
    type: "POST",
    dataType: "json",
    data: {
      name: name,
      email: email,
      username: username,
      password: password,
    },
  })
    .then((data) => {
      console.log(data.status);
      if (data.status) {
        alert("Tạo tài khoản thành công");

        $("#exampleModal").modal("show");
        setTimeout(function () {
          $("#exampleModal").modal("hide");
        }, 500);
      } else {
        if (data.message == "Username or email already exists") {
          alert("Tài khoản hoặc email đã tồn tại!");
        } else {
          alert("Có lỗi!");
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

$(".recharge-container").hide();
$(".line-container").show();

$(window).on("load", function () {
  // your logic here`enter code here`
  $(".line-container").hide();
});

function login() {
  $.ajax({
    url: "http://localhost:8000/api/login",
    type: "POST",
    dataType: "json",
    data: {
      username: $("#input-username-login").val(),
      password: $("#input-password-login").val(),
    },
  })
    .then((data) => {
      console.log(data);
      if (data.status) {
        window.localStorage.setItem("token", data.token);
        $("#user").hide();
        $("#profile").show();
        $(".text-white").html(data.profile.name);
        $(".balance").html(
          "Số dư: " + data.profile.coin + ` <i class="fas fa-dollar-sign"></i>`
        );

        $("#exampleModal").modal("show");
        $(".line-container").hide();
        setTimeout(function () {
          $("#exampleModal").modal("hide");
        }, 500);
      } else {
        if (data.message == "Invalid Username or Password") {
          alert("Tài khoản hoặc mật khẩu không đúng!");
        } else {
          alert("Có lỗi!");
        }
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Có lỗi!");
    });
}

function logout() {
  const token = localStorage.getItem("token");
  $.ajax({
    url: `http://localhost:8000/api/logout?token=${token}`,
    type: "GET",
    dataType: "json",
  })
    .then((data) => {
      if (data.status) {
        window.localStorage.removeItem("token");
        $("#user").show();
        $("#profile").hide();
        $(".line-container").show();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

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

function rechargeClick() {
  $(".banner").hide();
  $("hr").hide();
  $(".product").hide();
  $(".line-container").hide();
  $(".recharge-container").show();
}

function recharge() {
  const token = localStorage.getItem("token");
  var coin = $("#amount").val();
  if (coin == 0) {
    alert("Vui lòng nhập số tiền cần nạp!");
    return;
  }
  $.ajax({
    url: "http://localhost:8000/api/recharge",
    type: "POST",
    dataType: "json",
    data: {
      token: token,
      coin: coin,
    },
  })
    .then((data) => {
      if (data.status) {
        $("#chuyenkhoan").html(
          `<p style="color: red;">Chuyển tiền đến tài khoản: BIDV - Nguyễn Duy Tiến - 45210000558354</p><p style="color: red;">Nội dung chuyển khoản: ${data.code}</p>`
        );
      } else {
        if (data.message === "Token is Invalid") {
          window.location.href = "http://localhost/demo-game/src/index.html";
        } else if (data.message === "Token is Expired") {
          window.location.href = "http://localhost/demo-game/src/index.html";
        } else {
          alert("Xảy ra lỗi!");
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// function productList() {
//   $.ajax({
//     url: "http://localhost:8000/api/recharge",
//     type: "GET",
//     dataType: "json",
//   })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

const fetchProducts = () => {
  // const res = await fetch(
  //   "https://food-order-3a125-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
  // );

  // const data = await res.json();
  // console.log(data);

  $.ajax({
    url: "",
    type: "GET",
    dataType: "json",
  })
    .then((data) => {
      if (data) {
        // $(".img-product").css("background-image", "url(" + data.image + ")");
        data.map((item, index) => {
          $(".img-product").attr("src", `${item.image}`);
          $(".item-title").html(item.name);
          $(".old-price").html(item.price);
          if (item.discount === 0) {
            $(".current-price").hide();
          } else {
            $(".current-price").html(
              item.price - (item.price * item.discount) / 100
            );
            $(".discount-price").html(item.discount);
          }

          if (item.count === 0) {
            $(".item-btn").html("Hết hàng");
            $(".item-btn").css("color", "red");
            $(".item-btn").css("border", "red");
          } else {
            $(".item-btn").html("Mua ngay");
          }
        });
      }
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8000/api/categories`,
    type: "GET",
    dataType: "json",
  })
    .then((data) => {
      if (data.message === "success") {
        let listItem = "";
        data.data.map((item, index) => {
          listItem += `
            <li>
              <a href="products.html?id=${item.id}">
                <span class="category">${item.name}</span>
              </a>
            </li>
          `;
        });
        $(".categories-list").html(listItem);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const searchProduct = () => {
  const input = $("#searchInput").val();
  $.ajax({
    url: `http://localhost:8000/api/search?product=${input}`,
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
                    <div class="item-btn" onClick="clickPurchase()">Mua ngay</div>
                  </div>
                </div>
              </div>
        `;
        });
        $(".service").html(listItem);
        $(".view-more").html("Tải thêm sản phẩm");
      } else {
        $(".view-more").html("Không có sản phẩm nào cả!");
      }
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const clickPurchase = () => {
  $(".item-btn").click(function () {
    alert("Click me")
    // $.ajax({
    //   url: "cart.php",
    //   type: "POST",
    //   data: { itemID: id },
    //   success: function (data) {
    //     // Do stuff when the AJAX call returns
    //   },
    // });
  });
}