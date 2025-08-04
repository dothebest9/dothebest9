const congratulations = () => {
    // 모든 필수 입력 필드 요소를 가져옵니다.
    const idInput = document.getElementsByName('id')[0];
    const pw1Input = document.getElementsByName('pw1')[0];
    const pw2Input = document.getElementsByName('pw2')[0];
    const nameInput = document.getElementsByName('name')[0];
    const phoneInput = document.getElementsByName('phone')[0];
    const emailInput = document.getElementsByName('email')[0];

    // 입력된 값이 비어 있는지, 혹은 공백만 있는지 확인합니다.
    if (idInput.value.trim() === '' ||
        pw1Input.value.trim() === '' ||
        pw2Input.value.trim() === '' ||
        nameInput.value.trim() === '' ||
        phoneInput.value.trim() === '' ||
        emailInput.value.trim() === '') {

        // 사용자에게 모든 정보를 입력하라고 알려줍니다.
        alert("모든 정보를 입력해주세요.");

        // 함수 실행을 여기서 중단합니다.
        return;
    }
    //비밀번호가 일치하는지 확인
    if (pw1Input.value.trim() !== pw2Input.value.trim()){
        alert("비밀번호가 일치하지않습니다.");
        return;
    }
    alert(
            `id:${document.getElementsByName('id')[0].value}
             name:${document.getElementsByName('name')[0].value}
             phone:${document.getElementsByName('phone')[0].value}
             gender:${document.getElementsByName('gender')[0].value}
             email:${document.getElementsByName('email')[0].value}
            `)

    window.location.href = "./congratulations.html"
}

const gotoAdminpage= () => {
    window.location.href = "./adminpage.html"
}
//제출이벤트 받기(이벤트 핸들링)
const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();//기존 기능 차단

    let userId = event.target.id.value;
    let userPw1 = event.target.pw1.value;
    let userPw2 = event.target.pw2.value;
    let userName = event.target.name.value;
    let userPhone = event.target.phone.value;
    let userPosition = event.target.position.value;
    let userGender = event.target.gender.value;
    let userEmail = event.target.email.value;
    let userIntro = event.target.intro.value;

    console.log(userId, userPw1, userPw2, userName, userPhone,
        userPosition,userGender,userEmail,userIntro,userIntro);
    if(userId.length <6 ){
        alert("아이디가 너무 짧습니다. 6자 이상 입력해주세요.");
        return
    }
    if(userPw1 != userPw2) {
        alert("비밀번호가 일치하지 않습니다.");
        return
    }

    document.body.innerHTML = ""
    document.write(`<p>${userId}님 환영합니다</p>`);
    document.write(`<p>회원 가입 시 입력하신 내역은 다음과 같습니다.</p>`);
    document.write(`<p>아이디 : ${userId}</p>`);
    document.write(`<p>이름 : ${userName}</p>`);
    document.write(`<p>전화번호 : ${userPhone}</p>`);
    document.write(`<p>원하는 직무 : ${userPosition}</p>`);

})
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
