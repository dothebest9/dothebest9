const gotoJoin = () => {
    window.location.href = "./join.html"
}
// --- 제품 데이터 로딩 함수 ---
const fetchProductData = async () => {
    try {
        const res = await fetch("data/data.json");
        if (!res.ok) throw new Error(`HTTP 오류: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("데이터 로딩 오류", error);
        return [];
    }
};

// --- DOM 요소 및 전역 변수 ---
const itemsPerPage = 5;
const productDataTable = document.getElementById('product_data_Table');
const pageNumbersDiv = document.getElementById('page-numbers');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const form = document.querySelector('form');
const categorySelect = document.getElementById('inlineFormSelectPref');
const genderSelect = document.getElementById('genderSelect');
const findNameInput = document.querySelector('input[name="findname"]');

let currentPage = 1;
let product_data = [];
let totalPages = 0;

// --- 필터링된 데이터를 반환하는 함수 (성별 필터 추가) ---
function getFilteredData() {
    let filteredData = product_data;

    // 1. 카테고리 필터링
    const selectedCategory = categorySelect.value;
    if (selectedCategory && selectedCategory !== 'category') {
        const categoryMap = {
            "top": "상의",
            "pants": "하의",
            "shoes": "신발",
            "etc": "패션잡화"
        };
        const jsonCategory = categoryMap[selectedCategory];
        if (jsonCategory) {
            filteredData = filteredData.filter(item => item.category === jsonCategory);
        }
    }

    // 2. 성별 필터링
    const selectedGender = genderSelect.value;
    if (selectedGender) {
        // HTML의 option value와 JSON의 gender 값이 일치하도록 수정
        // 예: HTML value="male" -> JSON gender="남성"
        const genderMap = {
            "male": "남성",
            "female": "여성"
        };
        const jsonGender = genderMap[selectedGender];
        if (jsonGender) {
            filteredData = filteredData.filter(item => item.gender === jsonGender);
        }
    }

    // 3. 제품명 필터링 (대소문자 구분 없이)
    const findName = findNameInput.value.toLowerCase();
    if (findName) {
        filteredData = filteredData.filter(item => item.product.toLowerCase().includes(findName));
    }

    return filteredData;
}

// --- 모든 페이지 렌더링 함수들 ---
function renderData(page) {
    productDataTable.innerHTML = '';
    const filteredData = getFilteredData();

    totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (currentPage > totalPages) {
        currentPage = totalPages > 0 ? totalPages : 1;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredData.slice(start, end);

    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.category}</td>
            <td>${item.gender}</td>
            <td>${item.brand}</td>
            <td>${item.product}</td>
            <td>${item.price}</td>
        `;
        productDataTable.appendChild(row);
    });

    renderPageNumbers();
    updatePaginationButtons();
    updateActiveButton();
}

function renderPageNumbers() {
    pageNumbersDiv.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('page-number-btn', 'pagination-btn');
        if (i === currentPage) { button.classList.add('active'); }
        button.addEventListener('click', () => {
            currentPage = i;
            renderData(currentPage);
        });
        pageNumbersDiv.appendChild(button);
    }
}

function updatePaginationButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
}

function updateActiveButton() {
    document.querySelectorAll('.page-number-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const currentBtn = document.querySelector(`.page-number-btn:nth-child(${currentPage})`);
    if (currentBtn) { currentBtn.classList.add('active'); }
}

// --- 이벤트 리스너 ---
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderData(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderData(currentPage);
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    currentPage = 1;
    renderData(currentPage);
});


// --- 초기화 및 로딩 로직 ---
const initialize = async () => {
    product_data = await fetchProductData();
    renderData(currentPage);
};

initialize();

// --- 날짜와 시간 표시 기능 ---
function updateDateTime() {
    const now = new Date();
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const formattedDate = now.toLocaleDateString('ko-KR', optionsDate);
    const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedTime = now.toLocaleTimeString('ko-KR', optionsTime);
    document.getElementById('current-date').textContent = formattedDate;
    document.getElementById('current-time').textContent = formattedTime;
}
updateDateTime();
setInterval(updateDateTime, 1000);

// --- 다크 모드 기능 ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});