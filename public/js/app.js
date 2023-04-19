const form = document.querySelector("form");
const formInput = document.querySelector("#formInput");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = formInput.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response
            .json()
            .then((data) => {
                message1.innerText = `A temperatura atual em ${location} é de ${data.temperature} graus.`;
            })
            .catch((error) => {
                message1.innerText = "";
            });
    });
});
