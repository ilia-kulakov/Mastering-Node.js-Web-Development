document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn').addEventListener('click', sendReq);
});

let sendReq = async () => {
    const response = await fetch('/read', {
        method: 'POST'
    })

    document.getElementById('msg').textContent = response.statusText;
    document.getElementById('body').textContent = await response.text();
}
