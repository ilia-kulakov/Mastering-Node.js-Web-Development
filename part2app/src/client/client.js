document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn').addEventListener('click', sendRequest);
});

sendRequest = async () => {
    const response = await fetch('/test', {
        method: 'POST',
        body: JSON.stringify({ message: 'Hello World!' }),
        headers: { 'Content-Type': 'application/json' },
    });
    document.getElementById('msg').textContent = response.statusText;
    let text = await response.text();
    document.getElementById('body').innerHTML = text;
    return text;
};
