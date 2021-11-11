


const checkToken = (token) => {
    $.ajax({
      url: `http://localhost:8000/api/getrechargebyid?token=` + token,
      type: "GET",
      dataType: "json"
    })
    .then((data) => {
        console.log(data);
        if (data.status) {
            $("#user").hide();
            $("#profile").show();
            $(".text-white").html(data.profile.name);
            $(".balance").html("Số dư: " + data.profile.coin + ` <i class="fas fa-dollar-sign"></i>`);

            $("#content-table").html(`<tr>
                <td style="background-color: #e3e1e1">2</td>
                <td style="background-color: #f2f0f0">1951561981322</td>
                <td style="background-color: #e3e1e1">50000</td>
                <td style="background-color: #f2f0f0">8:30:20 11/11/2021</td>
                <td style="background-color: #e3e1e1">Chờ xác nhận</td>
            </tr>`)
            var item = ``
            for(let i = 0; i < data.data.length; i++){
                var utcDate = data.data[i].created_at
                var localDate = new Date(utcDate)
                var date = localDate.getDate() + "/" + (localDate.getUTCMonth() + 1) + "/" + localDate.getFullYear() + " " + localDate.getHours() + ":" + localDate.getMinutes()

                item = item + `<tr>
                    <td style="background-color: #e3e1e1">${ i + 1 }</td>
                    <td style="background-color: #f2f0f0">${ data.data[i].recharge_code }</td>
                    <td style="background-color: #e3e1e1">${ data.data[i].coin }</td>
                    <td style="background-color: #f2f0f0">${ date }</td>`
                    
                if(data.data[i].status == 0){
                    item = item + `<td style="background-color: #e3e1e1">Chờ xác nhận</td></tr>`
                }
                else{
                    item = item + `<td style="background-color: #e3e1e1">Hoàn thành</td></tr>`
                }
            }

            $("#content-table").html(item)
        }
        else{
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
}
else{
    window.location.href = "http://localhost/demo-game/src/index.html";
}