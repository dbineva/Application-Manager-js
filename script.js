const addBtn = document.querySelector('#new-student-btn');
const studentForm = document.querySelector('#add-student-form');
let addStudent = false;

let pName = "";
let pEmail = "";
let pAge = "";
let pPhone = "";
let pWayOfComunication = "";
let pEnglishLevel = "";
let pAvailableToStart = "";
let pSkills = "";
let pPersonalPresentation = "";
let pStudyFromHome = "";
let requiredField = ""

//hide and seek the add student form
addBtn.addEventListener('click', () => {
    addStudent = !addStudent
    if (addStudent) {
        studentForm.style.display = 'block'

    } else {
        studentForm.style.display = 'none'
    }
})

//getting the students from the data 
function fetchStudents() {
    fetch('http://localhost:3000/students/')
        .then(resp => {
            const students = resp.json()
            return students
        })
        .then(students => renderStudents(students))
}

const studentCollection = document.getElementById('student-collection')

function renderStudents(students) {
        studentCollection.innerHTML = ""
        students.forEach(function (student) {
            console.log(student)
            studentCollection.innerHTML += `
        <div class="bg-dark border border-success card mb-2">
        <div class="card-body">
        <p> Name: ${student.name} </p>
        <p> Email: ${student.email} </p>
        <p> Age: ${student.age} </p>
        <p> Phone: ${student.phone} </p>
        <p> Way of communication: ${student.wayOfComunication} </p>
        <p> English Level: ${student.englishLevel} </p>
        <p> Available to start on: ${student.availableToStart} </p>
        <p> Skills: ${student.skills} </p>
        <p> Personal presentation: ${student.personalPresentation} </p>
        <p> Study from home: ${student.studyFromHome} </p>
        <button class="col-5 text-white btn btn-warning edit-btn" id="${student.id}" onclick=editItem() ><i class="fas fa-edit"></i> Edit</button>
        <button class="col-5 text-white btn btn-danger delete-btn" id="${student.id}" onclick=deleteItem()><i class="fas fa-trash-alt"></i> Delete</button>
        </div>
        </div>
        `
        }) 
    
    
}
fetchStudents();


const addStudentForm = document.querySelector('.add-student-form')

addStudentForm.addEventListener('submit', function (event) {
    event.preventDefault();
});


$("#insert").click(function () {
     pName = $("#name").val();
     pEmail = $("#email").val();
     pAge = $("#age").val();
     pPhone = $("#phone").val();
     pWayOfComunication = $("input[name=way]").val();
     pEnglishLevel = $("#level").val();
     pAvailableToStart = $("#start-date").val();
     pSkills = $("#skills").val();
     pPersonalPresentation = $("#reasons").val();
     pStudyFromHome = $("#home-study:checked").val();

     if(required(pName,pEmail,pAge,pPhone,pEnglishLevel,pAvailableToStart)){
        fetch(`http://localhost:3000/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: pName,
                email: pEmail,
                age: pAge,
                phone: pPhone,
                wayOfComunication: pWayOfComunication,
                englishLevel: pEnglishLevel,
                availableToStart: pAvailableToStart,
                skills: pSkills,
                personalPresentation: pPersonalPresentation,
                studyFromHome: pStudyFromHome
            })
        })
        .then(resp => {
            const newStudent = resp.json()
            if(newStudent.name == "opit"){
                location.reload();
            }
            return newStudent;
        }).then((newStudent) => renderStudents(newStudent))
     }
    else{
        error(requiredField)
    }
})

//handle edit
function editItem() {
    const itemId = event.srcElement.id;
    console.log("edit" + itemId);
    addStudentForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });
    fetch(`http://localhost:3000/students/${itemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => {
            const student = resp.json()
            return student
        })
        .then(student => editDataForm(student))
}

function editDataForm(student) {
    studentCollection.innerHTML = ""
    studentCollection.innerHTML += `
    <div class="bg-dark border border-success card mb-2">
    <div class="card-body">
    <div> Name:<input type="text" class= "input-control mt-2" id="newName" value="${student.name}" required> </div>
    <div> Email:<input  type="email" class= "input-control mt-2" id="newEmail" value="${student.email}" required> </div>
    <div> Age:<input type="text" class= "input-control mt-2 " id="newAge" value="${student.age}" required> </div>
    <div> Phone: <input type="tel" class= "input-control mt-2" id="newPhone" value="${student.phone}" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></div>
    <div> Way of communication:
    <input type="radio" class="ml-5 mt-3" id="email-radio" name="way" value="email" required>Email
     <input type="radio" class="ml-5 mt-3" id="phone-radio" name="way" value="phone" required>Phone
     </div>
 <div class="mt-3"> English Level:  <select id="newLevel" class="form-control " name="englishLevel"  value= "${student.englishLevel}" required>
    <option value="-">-</option>
    <option value="beginner">Beginner</option>
    <option value="elementary">Elementary </option>
    <option value="intermediate">Intermediate</option>
    <option value="upper-intermediate">Upper-Intermediate</option>
    <option value="advanced">Advanced</option>
    <option value="proficiency">Proficiency</option>
</select>
    </div>
    <div> Available to start on:<input type="date" class= "input-control mt-3" id="newDate" value="${student.availableToStart}" required> </div>
    <div class="mt-3"> Skills:</div> <textarea class= "input-control " id="newSkills" value="${student.skills}" cols="30" rows="5" ></textarea> 
    <div class="mt-3"> Personal presentation: </div> <textarea class= "input-control " id="newPresentation" value="${student.personalPresentation}" cols="30" rows="5" ></textarea> 
    <div class="m-3"> Study from home:<input type="checkbox" id="newHome-study" name="homestudy" value="${student.studyFromHome}" > </div>
    <button class="col-5 text-white btn btn-warning edit-btn" id="${student.id}" onclick=updateData() ><i class="fas fa-edit"></i> Update</button>
    <button class="col-5 text-white btn btn-danger delete-btn" id="${student.id}" ><i class="fas fa-ban"></i> Delete</button>
    </div>
    </div>
    `

}

function updateData() {
    let nName = $("#newName").val();
    let nEmail = $("#newEmail").val();
    let nAge = $("#newAge").val();
    let nPhone = $("#newPhone").val();
    let nWayOfComunication = $("input[name=way]").val();
    let nEnglishLevel = $("#newLevel").val();
    let nAvailableToStart = $("#newDate").val();
    let nSkills = $("#newSkills").val();
    let nPersonalPresentation = $("#newPresentation").val();
    let nStudyFromHome = $("#home-study:checked").val();
    const itemId = event.srcElement.id;
    console.log("update" + itemId);
    addStudentForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });
    fetch(`http://localhost:3000/students/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nName,
                email: nEmail,
                age: nAge,
                phone: nPhone,
                wayOfComunication: nWayOfComunication,
                englishLevel: nEnglishLevel,
                availableToStart: nAvailableToStart,
                skills: nSkills,
                personalPresentation: nPersonalPresentation,
                studyFromHome: nStudyFromHome
            })
        })
        .then(resp => {
            const newStudent = resp.json()
            return newStudent;
        })
        .then(newStudent => console.log(newStudent))
}


//handle delete
function deleteItem() {
    const itemId = event.srcElement.id;
    console.log("delete")
    fetch(`http://localhost:3000/students/${itemId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response =>
        response.json().then(json => {
            return json;
        })
    );
}




function resetStyle() {
    $("#name").css('border-color', '#c5ecfd');
    $("#email").css('border-color', '#c5ecfd');
    $("#age").css('border-color', '#c5ecfd');
    $("#phone").css('border-color', '#c5ecfd');
    $("#level").css('border-color', '#c5ecfd');
    $("#start-date").css('border-color', '#c5ecfd');

}
function error(err){
    switch(err){
        case"name":
        $("#name").css('border-color', 'red');
        break;

        case"email":
        $("#email").css('border-color', 'red');
        break;

        case"age":
        $("#age").css('border-color', 'red');
        break;

        case"phone":
        $("#phone").css('border-color', 'red');
        break;

        case"level":
        $("#level").css('border-color', 'red');
        break;

        case"startDate":
        $("#start-date").css('border-color', 'red');
        break;
    }
}

//form validation
function required(name,email,age,phone,level,startDate) {
    resetStyle();
    //let letters = /^[A-Za-z]+$ && " "/ ;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let todaysDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    if(name.length < 3 || name == "" ){
       $("#form-error").html("*Invalid name! Pleace enter your name!").css("color","red");
        requiredField = 'name'
        return false
    }
    if(!email.match(regex)){
        $("#form-error").html("*Invalid Email!").css("color","red");
        requiredField = 'email'
        return false;
    }
    if(age === "" ){
        $("#form-error").html("*Invalid Age!").css("color","red");
        requiredField = 'age'
        return false
    }
    if(phone == ""){
        $("#form-error").html("*Invalid Phone!").css("color","red");
        requiredField = 'phone'
        return false
    }
    if(level == "-"){
        $("#form-error").html("*You have to choose level of English!").css("color","red");
        requiredField = 'level'
        return false
    }
    if(startDate == "" || startDate< todaysDate){
        $("#form-error").html("*You have to enter correct start date!").css("color","red");
        requiredField = 'startDate'
        return false
    }
    else{
        return true
    }
}