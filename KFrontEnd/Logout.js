function Logout() {
    let Token=sessionStorage.getItem("token");
    let saltUrl = "http://localhost:5000/" + Token;
    axios.post(saltUrl).then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        alert (error);
    });
}