document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn').addEventListener('click', sendReq);
});

const requestUrl = '/read'

let sendReq = async () => {
    let payload = [];
    for(let i = 0; i < 5; i++) {
        payload.push({ id: i, message: `Payload Message: ${i}\n`});
    }
    const response = await fetch(requestUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    document.getElementById('msg').textContent = response.statusText;
    document.getElementById('body').textContent = `Response: ${await response.text()}`;
}