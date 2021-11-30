const buyProduct = (product_id) => {
    swal.fire({
        text: 'Bạn có muốn mua sản phẩm này!',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonColor: "#DD6B55",
    }).then((result) => {
        if (result.value) {
            const token = localStorage.getItem("token");
            if(token == null){
                Swal.fire({
                    type: 'info',
                    title: '',
                    text: 'Bạn phải đăng nhập để mua sản phẩm',
                    showConfirmButton: false,
                    timer: 1500
                });
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
                success: function (data) {
                    console.log(data)
                    if (data.status) {
                        Swal.fire({
                            type: 'success',
                            title: '',
                            text: 'Mua thành công vui lòng kiểm tra sản phẩm của bạn trong phần lịch sử mua hàng!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else{
                        if(data.message == "Token is Expired"){
                            localStorage.removeItem('token')
                            Swal.fire({
                                type: 'info',
                                title: '',
                                text: 'Bạn phải đăng nhập để mua sản phẩm',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            // window.location.href = "http://127.0.0.1:5500/src/index.html";
                        }
                        else{
                            Swal.fire({
                                type: 'error',
                                title: '',
                                text: data.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                },
                error: function(error){
                    Swal.fire({
                        type: 'error',
                        title: '',
                        text: 'Mua thất bại',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(error);
                }
            });
        }
    });
}





function run(product_id){
    return () => buyProduct(product_id);
}

export {run}