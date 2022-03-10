//todo_submit Dom 가져옴
const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_input");

//갯수확인
let count = 0;

// 이벤트리스너를 통해 이벤트 발생
// submit 이벤트는 Form에서 발생하는 이벤트 
// todoForm.addEventListener("submit", todoFormSubmit);
//JQ수정
$("#todo_form").on("submit", function(e){
    e.preventDefault();
    const li = $("<li>")
    const checkbox = $("<input>").prop("type","checkbox");
    
    const button = $("<button>").text("X");

    $("#todo_board ul").append(li);
    li.append(checkbox).append($("#todo_input").prop("value")).append(button);

    count++;
    $("#score").text(count);

    // checkbox와 button 이벤트
    checkbox.on("click", function() {
        if( $(this).prop("checked") ) {
            $(this).parent().css("color","lightgray");
            count--;
        }
        else {
            $(this).parent().css("color","black");
            count++;
        }
        $("#score").text(count);
    });

    button.on("click",function(){
        //button객체들고옴 > 형제노드 
        $(this).parent().remove();

        console.log($(this).siblings("input[type='checkbox']").prop("checked"));
        console.log($(this).parent().children().filter(":first").prop("checked"));
        console.log($(this).parent().children());
        if( !$(this).parent().children().filter(":first").prop("checked") ) {
            count--;
            $("#score").text(count);
        }
    });
} );


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

    //button 이벤트 추가
    button.addEventListener("click", deleteTodo);
        
    //남은 할일 추가
    count++;
    document.querySelector("#score").textContent = count;
}

//
function checkTodo(e) {
    if (e.target.checked) {//체크박스가 체크가 되었을때.
        // 체크박스의 부모(li)의 색바꿈
        e.target.parentNode.style.color ="lightgray";
        count--;
    }
    else {
        e.target.parentNode.style.color ="black";
        count++;
    }
    document.querySelector("#score").textContent = count;
}

function deleteTodo(e) {
    //this $(this) > e.target을 들고오는 것과 동일
    //e.target은 button 요소
    // li요소를 가져오기위해 parentNode(부모)를 찾음
    e.target.parentNode.remove();

    //checkbox를 찾기 위해 부모의 첫번째 요소노드를 찾음
    const check = e.target.parentNode.firstElementChild.checked;
    if(!check) {
        count--;
    }
    console.log(e.target);
    document.querySelector("#score").textContent = count;
}