document.getElementById('searchButton').addEventListener('click', () => {
    const departure = document.getElementById('departureInput').value;
    const destination = document.getElementById('destinationInput').value;
    let type = document.getElementById('typeInput').value;

    // Type 값 변환: 20 -> 20dv, 40 -> 40HQ
    if (type === '20') {
        type = '20dv';
    } else if (type === '40') {
        type = '40HQ';
    }

    // Fetch API로 서버에서 데이터를 가져옴
    fetch(`/api/tickets?pol=${departure}&pod=${destination}&type=${type}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const ticket = data[0];
                document.getElementById('priceDisplay').innerText = `Cost: ${ticket.cost}원`;
                document.getElementById('typeDisplay').innerText = `Type: ${ticket.type}`;
                document.getElementById('timeDisplay').innerText = `T/Time: ${ticket.t_time}`;
                document.getElementById('routeDisplay').innerText = `Route: ${ticket.route}`;
            } else {
                document.getElementById('priceDisplay').innerText = '요청하신 운임을 찾을 수 없습니다.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
