function Regisztracio() {
    let salt = GenerateSalt(64);
    let body = {
        "id": parseInt(document.getElementById("id").value),
        "loginName": document.getElementById("felhasznaloNev").value,
        "hash": sha256(document.getElementById("jelszo").value + salt),
        "salt": salt,
        "name": document.getElementById("teljesNev").value,
        "permissionId": parseInt(document.getElementById("jogosultsag").value),
        "active":true,
        "email": document.getElementById("email").value,
        "profilePicturePath": document.getElementById("fenykepUtvonal").value
    }
    console.log(body);
    let url = "http://localhost:5000/api/Registry";
    axios.post(url, body).then((response) => {
        alert(response.data);
    })
        .catch((error) => {
            alert(error);
        });
}