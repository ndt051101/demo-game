const checkToken = (token) => {
  $.ajax({
    url: `http://localhost:8000/api/bill?token=` + token,
    type: "GET",
    dataType: "json",
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

        $("#content-table").html(``);
        var item = ``;
        for (let i = 0; i < data.data.length; i++) {
          var utcDate = data.data[i].created_at;
          var localDate = new Date(utcDate);
          var date =
            localDate.getDate() +
            "/" +
            (localDate.getUTCMonth() + 1) +
            "/" +
            localDate.getFullYear() +
            " " +
            localDate.getHours() +
            ":" +
            localDate.getMinutes();

          item =
            item +
            `<tr>
                    <td style="background-color: #e3e1e1; padding: 0.5rem;">${
                      data.data[i].id
                    }</td>
                    <td style="background-color: #f2f0f0; padding: 0.5rem;">${
                      data.data[i].name
                    }</td>
                    <td style="background-color: #e3e1e1; padding: 0.5rem;">${
                      data.data[i].total_coin
                    }</td>
                    <td style="background-color: #f2f0f0; padding: 0.5rem;">${
                      data.data[i].code_card == null ? '_______' : data.data[i].code_card
                    }</td>
                    <td style="background-color: #e3e1e1; padding: 0.5rem;">${
                      data.data[i].account_game == null ? '_______' : data.data[i].account_game
                    }</td>
                    <td style="background-color: #f2f0f0; padding: 0.5rem;">${
                      data.data[i].password_game == null ? '_______' : data.data[i].password_game
                    }
                    </td>
                    <td style="background-color: #e3e1e1; padding: 0.5rem;">${date}</td>`;
        }

        $("#content-table").html(item);
      } else {
        window.location.href = "http://localhost/demo-game/src/index.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getToken = localStorage.getItem("token");
if (getToken != null) {
  checkToken(getToken);
} else {
  window.location.href = "http://localhost/demo-game/src/index.html";
}
