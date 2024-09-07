const API_KEY = 'your_airtable_api_key'; // Airtable API Key
const BASE_ID = 'your_airtable_base_id'; // Airtable Base ID
const TABLE_NAME = 'Tickets'; // Airtable 테이블 이름

let debounceTimer; // 디바운스 타이머를 저장할 변수

// 디바운싱 함수
function debounce(func, delay) {
    return function(...args) {
        const context = this;
        clearTimeout(debounceTimer); // 이전 타이머 제거
        debounceTimer = setTimeout(() => func.apply(context, args), delay); // 새로운 타이머 시작
    };
}

// 자동 완성 기능
function autocomplete(input, field, listId) {
    input.addEventListener("input", debounce(function () {
        const val = this.value;
        if (!val) return false;

        fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula=SEARCH("${val}", {${field}})`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            const autocompleteList = document.getElementById(listId);
            autocompleteList.innerHTML = ''; // 이전 자동 완성 목록 초기화

            data.records.forEach(record => {
                const suggestion = document.createElement("div");
                suggestion.innerHTML = `<strong>${record.fields[field].substr(0, val.length)}</strong>`;
                suggestion.innerHTML += record.fields[field].substr(val.length);
                suggestion.innerHTML += `<input type='hidden' value='${record.fields[field]}'>`;

                suggestion.addEventListener("click", function () {
                    input.value = this.getElementsByTagName("input")[0].value;
                    autocompleteList.innerHTML = '';
                });

                autocompleteList.appendChild(suggestion);
            });
        })
        .catch(error => console.error('에러 발생:', error));
    }, 300)); // 300ms 후에 API 호출 (디바운스 적용)
}

// 출발지와 도착지에 대해 자동 완성 적용
autocomplete(document.getElementById('departureInput'), 'pol', 'autocomplete-list-pol'); // 출발지 자동 완성
autocomplete(document.getElementById('destinationInput'), 'pod', 'autocomplete-list-pod'); // 도착지 자동 완성

// Type 값 변환 및 검색 처리
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

    // 검색 API 호출
    const formula = `AND({pol} = '${departure}', {pod} = '${destination}', {Type} = '${type}')`;

    fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula=${encodeURIComponent(formula)}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.records.length > 0) {
            const record = data.records[0].fields;
            const price = record.cost;
            const time = record["t/Time"];
            const route = record.route;

            // 검색 결과 표시
            document.getElementById('priceDisplay').innerText = `가격: ${price}원`;
            document.getElementById('typeDisplay').innerText = `유형: ${type}`;
            document.getElementById('timeDisplay').innerText = `시간: ${time}`;
            document.getElementById('routeDisplay').innerText = `경로: ${route}`;
        } else {
            document.getElementById('priceDisplay').innerText = '해당 경로에 대한 티켓 가격을 찾을 수 없습니다.';
        }
    })
    .catch(error => console.error('에러 발생:', error));
});
