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

const exampleModal = document.getElementById("exampleModal");
exampleModal.addEventListener("show.bs.modal", function (event) {
  const button = event.relatedTarget;
  const recipient = button.getAttribute("data-bs-whatever");
  const tab_login = document.querySelector('.tab-login');
  const tab_register = document.querySelector(".tab-register");
  const active = document.querySelector(".active");
  if(recipient === 'login') {
    tab_register.style.display = 'none';
    tab_login.style.display = "unset";
  }
  if(recipient === 'register') {
    tab_register.style.display = "unset";
    tab_login.style.display = "none";
  }
  
  // const login = document.getElementById('login');
  // const register = document.getElementById("register");
  // console.log(active);
  // login.addEventListener("click", (event) => {
  //   console.log(event);
  //   if (active) {
  //     active.classList.remove("active");
  //   }
  //   else {
  //     event.target.className = "active";
  //   }

  // });
  // register.addEventListener("click", (event) => {
  //   if (active) {
  //     active.classList.remove("active");
  //   } else {
  //     event.target.classList.add("active");
  //   }
  // });
});

