const buyProduct = (product_id) => {
    var result = confirm("Bạn có muốn mua sản phẩm này!");
    console.log(result);
    if(result){
        const token = localStorage.getItem("token");
        if(token == null){
            alert("Bạn phải đăng nhập để mua sản phẩm");
            return;
        }
        $.ajax({
            url: "http://localhost:8000/api/payment",
            type: "POST",
            data: {
                token: token,
                product_id: product_id,
            },
            dataType: "json",
        })
        .then((data) => {
            if (data.status) {
                alert('Mua thành công vui lòng kiểm tra sản phẩm của bạn trong phần lịch sử mua hàng!');
            }
            else{
                if(data.message.includes("Token")){
                    window.location.href = "http://localhost/demo-game/src/index.html";
                }
                else{
                    alert(data.message);
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

function run(product_id){
    return () => buyProduct(product_id);
}

export {run}