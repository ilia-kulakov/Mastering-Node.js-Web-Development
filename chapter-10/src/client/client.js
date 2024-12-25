document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn').addEventListener('click', sendRequest);
});

sendRequest = async () => {
    const response = await fetch('/test', {
        method: 'POST',
        body: JSON.stringify({ message: 'Hello World!' }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    document.getElementById('msg').textContent = response.statusText;
    document.getElementById('body').innerHTML = await response.text();
};
