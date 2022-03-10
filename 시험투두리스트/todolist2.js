//todo_submit Dom 가져옴
const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_input");


// 이벤트리스너를 통해 이벤트 발생
// submit 이벤트는 Form에서 발생하는 이벤트 
todoForm.addEventListener("submit", todoFormSubmit);
todoForm.addEventListener("submit", countTodo2);

//버튼이 눌렀을때 todoFormSubmit 함수
function todoFormSubmit(e){
    e.preventDefault();
    //console.log(todoInput.value);

    // li 생성
    const li = document.createElement("li");
    
    //체크박스생성
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    //텍스트노드생성
    const text = document.createTextNode(todoInput.value);
    //버튼 생성
    const button = document.createElement("button");
    button.textContent = "X";

    //board Dom 가져오기
    const todoBoard = document.querySelector("#todo_board ul");
    //board에 추가
    todoBoard.appendChild(li);

    //li에 추가
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(button);

    //input에 빈 문자열 할당
    todoInput.value="";


    //check박스 이벤트 추가
    checkbox.addEventListener("click", checkTodo);
    checkbox.addEventListener("click", countTodo2);

    //button 이벤트 추가
    button.addEventListener("click", deleteTodo);
    button.addEventListener("click", countTodo2);


}

//
function checkTodo(e) {
    if (e.target.checked) {//체크박스가 체크가 되었을때.
        // 체크박스의 부모(li)의 색바꿈
        e.target.parentNode.style.color ="lightgray";
    }
    else {
        e.target.parentNode.style.color ="black";
    }
}

function deleteTodo(e) {
    //e.target은 button 요소
    // li요소를 가져오기위해 parentNode(부모)를 찾음
    e.target.parentNode.remove();

    //checkbox를 찾기 위해 부모의 첫번째 요소노드를 찾음
    const check = e.target.parentNode.firstElementChild.checked;
    if(check) {
    }
    console.log(e.target);
}

//1. ul의 li의 checkbox들을 가져와서 checked된 값만 확인
//2. ul의 li의 checkbox의 checked된 것만 쿼리셀렉터로 들고오기.

function countTodo () {
    
    //갯수확인
    let count = 0;
    //const checkbox = document.querySelectorAll("#todo_board ul li input['type'='checkbox']");
    const checkboxul = document.querySelector("#todo_board ul"); // 노드의 접근을 통해서들고옮
    
    for (let i=0; i < checkboxul.childNodes.length ; i++) {
        // 0~ i-1 인덱스값을 갖는 li의 checkbox
        let check =  checkboxul.childNodes[i].firstElementChild 
        if ( !check.checked ) {
            count++;
        }
    }
    document.querySelector("#score").textContent = count;
}

function countTodo2 () {
    let count =0;
    const liAll = document.querySelectorAll("#todo_board ul li");
    const checked = document.querySelectorAll("#todo_board ul li input:checked");
    count = liAll.length - checked.length;
    document.querySelector("#score").textContent = count;
}