const name =document.querySelector("#courseName");
const category =document.querySelector("#courseCategory");
const price =document.querySelector("#coursePrice");
const description =document.querySelector("#courseDescription");
const capacity =document.querySelector("#courseCapacity");
const addBtn=document.querySelector("#click");
const invalidName =document.querySelector(".invalid-name");
const invalidCategory =document.querySelector(".invalid-category");
const invalidPrice =document.querySelector(".invalid-price");
const invalidDescription =document.querySelector(".invalid-description");
const invalidCapacity =document.querySelector(".invalid-capacity");
const deleteBtn = document.querySelector("#deleteBtn");
const search = document.querySelector("#search")
const update=document.querySelector("#update");
let courses=[];


if(localStorage.getItem("courses") != null){
    
    courses = JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}
addBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    let isValid = true;

    const namePattern = /^[A-Z][a-z]{2,10}$/
   if(!namePattern.test(name.value)){
    invalidName.innerHTML = "The Name Must Begin with Capital and 2-10 small letters";
    name.classList.add("is-invalid");
    isValid = false;
   }else{
    invalidName.innerHTML="";
       name.classList.remove("is-invalid");
       name.classList.add("is-valid");
   }
   const nameCategory = /^[A-Z][a-z]{2,3}$/;
   if(!nameCategory.test(category.value)){
    invalidCategory.innerHTML = "The category Must Begin with Capital and 2-3 small letters";
    category.classList.add("is-invalid");
    isValid = false;
   }else{
    invalidCategory.innerHTML="";
       category.classList.remove("is-invalid");
       category.classList.add("is-valid");
   }
   
   const nameDescription = /^.{20,}$/;
   if(!nameDescription.test(description.value)){
    invalidDescription.innerHTML = "The Description must be at least 20 letters";
    description.classList.add("is-invalid");
    isValid = false;
   }else{
    invalidDescription.innerHTML="";
       description.classList.remove("is-invalid");
       description.classList.add("is-valid");
   }
   const namePrice = /^[1-9]\d{0,3}$/;
   if(!namePrice.test(price.value)){
    invalidPrice.innerHTML = "The Prive must Be only Number";
    price.classList.add("is-invalid");
    isValid = false;
   }else{
    invalidPrice.innerHTML="";
       price.classList.remove("is-invalid");
       price.classList.add("is-valid");
   }
   const nameCapacity =/^[1-9]\d{0,3}$/;
   if(!nameCapacity.test(capacity.value)){
    invalidCapacity.innerHTML = "The capacity must be Only Number";
    capacity.classList.add("is-invalid");
    isValid = false;
   }else{
    invalidCapacity.innerHTML="";
       capacity.classList.remove("is-invalid");
       capacity.classList.add("is-valid");
   }
   if(isValid){

       const course = {
           name: name.value,
           category: category.value,
           price: price.value,
           description: description.value,
           capacity: capacity.value
       }
       courses.push(course);
       localStorage.setItem("courses",JSON.stringify(courses));
       displayCourses();
       
   }
});


function displayCourses(){
    const result =courses.map( (course , index) => {
        return `
        <tr>
            <td>${index}</td>
            <td>${course.name}</td>
            <td>${course.category}</td>
            <td>${course.price}</td>
            <td>${course.description}</td>
            <td>${course.capacity}</td>
            <td>
             <button class="btn btn-primary" onclick='UpdateCourse(${index})'>Update</button>
            </td>
            <td>
             <button class="btn btn-danger" onclick='deleteCourse(${index})'>delete</button>
            </td>
        
        </tr>
        `;
    }).join('');
    document.querySelector("#data").innerHTML =result;
}
let i =0;
const UpdateCourse = (index) => {
  i=index
  const course = courses[index];
  name.value = course.name;
  category.value = course.category;
  price.value = course.price;
  description.value = course.description;
  capacity.value = course.capacity;
  update.classList.remove("d-none");
  addBtn.classList.add("d-none");
}
update.addEventListener("click" , (e) =>{
  e.preventDefault();
  const courseUpdate = courses[i];
  courseUpdate.name = name.value;
  courseUpdate.category = category.value;
  courseUpdate.price = price.value;
  courseUpdate.capacity = capacity.value;
  courseUpdate.description = description.value;
  localStorage.setItem("courses",JSON.stringify(courses));
  displayCourses();
  update.classList.add("d-none");
  addBtn.classList.remove("d-none");
  

  
})
function deleteCourse(index){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index , 1);
            localStorage.setItem("courses" , JSON.stringify(courses));
            displayCourses();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
    
}

deleteBtn.addEventListener("click" , () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem("courses" , JSON.stringify(courses));
            displayCourses();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
 });


 search.addEventListener("input" , () => {
    const keyword = search.value;
    const coursesResult = courses.filter((course) => {
        return course.name.toLowerCase().includes(keyword.toLowerCase());
    })
    const result =coursesResult.map( (course , index) => {
        return `
        <tr>
            <td>${index}</td>
            <td>${course.name}</td>
            <td>${course.category}</td>
            <td>${course.price}</td>
            <td>${course.description}</td>
            <td>${course.capacity}</td>
            <td>
             <button class="btn btn-danger" onclick='deleteCourse(${index})'>delete</button>
            </td>
        
        </tr>
        `;
    }).join('');
    document.querySelector("#data").innerHTML =result;
 });