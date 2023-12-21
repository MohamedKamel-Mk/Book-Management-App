var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var booksList;

if (localStorage.getItem("booksList")==null){
    booksList= [];
}else{
    booksList = JSON.parse(localStorage.getItem("booksList"));
    displayBooks(booksList);
}

function submitBtn(){
    if(validateBooksName()==true){
    var submit = {
        name: siteName.value,
        site: siteUrl.value
    }
    booksList.push(submit);
    displayBooks(booksList);
    localStorage.setItem("booksList", JSON.stringify(booksList));
    clearForm();
}}

function submitBtn(){

    if(validateBooksUrl()==true){
    var submit = {
        name: siteName.value,
        site: siteUrl.value
    }
    booksList.push(submit);
    displayBooks(booksList);
    localStorage.setItem("booksList", JSON.stringify(booksList));
    clearForm();
}}

function clearForm(){
    siteName.value="";
    siteUrl.value="";
}

function displayBooks(books){
    var cartona = ``;
    for (var i=0; i<books.length; i++){
        cartona += `<tr>
        <td>${i+1}</td>
        <td>${books[i].newName? books[i].newName : books[i].name}</td>
        <td><button onclick="visitItem(${i})" class="btn btn-visit bg-warning"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="deleteBook(${i})" class="btn btn-delete bg-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`
    }
    document.getElementById("tBody").innerHTML = cartona;
}

function deleteBook(index){
    booksList.splice(index,1);
    localStorage.setItem("booksList", JSON.stringify(booksList));
    displayBooks(booksList);
}

function searchByName(term){
    var foundedItems = []
    for(var i=0; i<booksList.length; i++){
        if(booksList[i].name.toLowerCase().includes(term.toLowerCase())==true){
            booksList[i].newName = booksList[i].name.toLowerCase().replace(term.toLowerCase(),`<span class="bg-warning fs-5 ">${term}</span>`);
            foundedItems.push(booksList[i])
        }
    }
    displayBooks(foundedItems)
}

function visitItem(index){
    window.open(booksList[index].site);
}

function validateBooksName (){
    var regex = /^[A-Z][a-z]/
    if(regex.test(siteName.value)==true){
        siteName.style.border="";
        document.getElementById("wrongName").classList.add("d-none");
        return true
    }else{
        siteName.style.border="2px solid red";
        document.getElementById("wrongName").classList.remove("d-none");
        return false
    }
}

function validateBooksUrl (){
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    if(regex.test(siteUrl.value)==true){
        siteUrl.style.border="";
        document.getElementById("wrongUrl").classList.add("d-none");
        return true
    }else{
        siteUrl.style.border="2px solid red";
        document.getElementById("wrongUrl").classList.remove("d-none");
        return false
    }
}
