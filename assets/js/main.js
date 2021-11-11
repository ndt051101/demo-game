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
  var email =  $("#input-email-register").val();
  var username = $("#input-username-register").val();
  var password = $("#input-password-register").val();
  if(name == "" || email == "" || username == "" || password == ""){
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
    }
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
      if(data.message == "Username or email already exists"){
        alert("Tài khoản hoặc email đã tồn tại!");
      }
      else{
        alert("Có lỗi!");
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

$(".recharge-container").hide();

function login() {
  $.ajax({
    url: "http://localhost:8000/api/login",
    type: "POST",
    dataType: "json",
    data: {
      username: $("#input-username-login").val(),
      password: $("#input-password-login").val(),
    }
  })
  .then((data) => {
    console.log(data);
    if (data.status) {
      window.localStorage.setItem("token", data.token);
      $("#user").hide();
      $("#profile").show();
      $(".text-white").html(data.profile.name);
      $(".balance").html("Số dư: " + data.profile.coin + ` <i class="fas fa-dollar-sign"></i>`);

      $("#exampleModal").modal("show");
      setTimeout(function () {
        $("#exampleModal").modal("hide");
      }, 500);
    }
    else{
      if(data.message == "Invalid Username or Password"){
        alert("Tài khoản hoặc mật khẩu không đúng!");
      }
      else{
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
        $(".balance").html("Số dư: " + data.profile.coin + ` <i class="fas fa-dollar-sign"></i>`);
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

function rechargeClick(){
    $(".banner").hide();
    $("hr").hide();
    $(".product").hide();
    $(".line-container").hide();
    $(".recharge-container").show();
}


function recharge() {
  const token = localStorage.getItem("token");
  var coin = $("#amount").val()
  if(coin == 0){
    alert("Vui lòng nhập số tiền cần nạp!")
    return
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
      if(data.status){
        $("#chuyenkhoan").html(`<p style="color: red;">Chuyển tiền đến tài khoản: BIDV - Nguyễn Duy Tiến - 45210000558354</p><p style="color: red;">Nội dung chuyển khoản: ${ data.code }</p>`)
      }
      else{
        if(data.message === 'Token is Invalid'){
            window.location.href = "http://localhost/demo-game/src/index.html";
        }
        else if(data.message === 'Token is Expired'){
            window.location.href = "http://localhost/demo-game/src/index.html";
        }
        else{
            alert('Xảy ra lỗi!')
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function productList() {
  $.ajax({
    url: "http://localhost:8000/api/recharge",
    type: "GET",
    dataType: "json",
  })
    .then((data) => {
      
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}


