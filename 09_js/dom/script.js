//1

document.getElementById("changeTextButton").addEventListener('click', function(){
    let para = document.getElementById("myParagraph");
    para.innerText = "This paragraph text will be changed"
})

//2

document.getElementById("highlightFirstCity").addEventListener('click', function(){
    let list = document.getElementById("citiesList");
    list.firstElementChild.classList.add("highlight");
})

//3

document.getElementById("changeOrder").addEventListener('click', function(){
    let order = document.getElementById("coffeeType");
    order.textContent = "Espresso"
})

//4

document.getElementById("addNewItem").addEventListener('click', function(){
    let newElem = document.createElement('li')
    newElem.textContent = "Eggs"
    document.getElementById("shoppingList").appendChild(newElem);
})

//5

document.getElementById("removeLastTask").addEventListener('click', function(){
    let list = document.getElementById("taskList");
    list.lastElementChild.remove()
});

//7

document.getElementById("teaList").addEventListener('click', function(event){
    if(event.target && event.target.matches(".teaItem")){
        event.target.classList.add("highlight");
    }
});

