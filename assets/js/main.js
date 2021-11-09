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
  $.ajax({
    url: "http://localhost:8000/api/register",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#input-name-register").val(),
      email: $("#input-email-register").val(),
      username: $("#input-username-register").val(),
      password: $("#input-password-register").val(),
    },
    success: function () {
      $("#exampleModal").modal("show");
      setTimeout(function () {
        $("#exampleModal").modal("hide");
      }, 2000);
    },
  })
    .then((data) => {
      console.log(data.status);
      if (data.status) {
        alert(data.message);
      } else {
        alert(data.message);
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
    },
    success: function () {
      $("#exampleModal").modal("show");
      setTimeout(function () {
        $("#exampleModal").modal("hide");
      }, 2000);
    },
  })
    .then((data) => {
      if (data.status) {
        window.localStorage.setItem("token", data.token);
        $("#user").hide();
        $("#profile").show();
        $(".text-white").html(data.profile.username);
      }
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
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
      if (data.status) {
        $("#user").hide();
        $("#profile").show();
        $(".text-white").html(data.profile.username);
      }
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const retrievedObject = localStorage.getItem("token");
if (retrievedObject != null) {
  checkToken(retrievedObject);
}

const rechargeClick = () => {
  $(".btn-recharge").click(function () {
    $(".recharge-container").show();
    $(".banner").hide();
    $("hr").hide();
    $(".product").hide();
    $(".line-container").hide();
  });
}

function roleUser() {
  const token = localStorage.getItem("token");
  $.ajax({
    url: "http://localhost:8000/api/recharge",
    type: "POST",
    dataType: "json",
    data: {
      token: token,
      coin: $("#amount").val(),
    },
  })
    .then((data) => {
      console.log(data);
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


