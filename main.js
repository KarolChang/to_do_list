// 初始變數
let list = document.querySelector('#my-todo')
let addBtn = document.querySelector('#addBtn')
let input = document.querySelector('#newTodo')
let done = document.querySelector('#done')
let clearBtn = document.querySelector('#clearBtn')

// 資料
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}


// 函式
function addItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}

function addDoneItem(text) {
  let doneItem = document.createElement('li')
  doneItem.innerHTML = `
    <label for="todo" class="checked">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  done.appendChild(doneItem)
}


// write your code here

// 1. 新增todo
addBtn.addEventListener('click', function () {
  if (input.value.length > 0) {
    addItem(input.value)
    input.value = ''
  }
  // 如果有ALL DONE!!!，則刪除字樣
  if (list.children[0].innerText === 'ALL DONE!!!') {
    list.children[0].remove()
  }
})

// 2. 刪除todo
list.addEventListener('click', function (click) {
  if (click.target.matches('.delete')) {
    click.target.parentElement.remove()
  }
  // 3. 當你完成一項 to-do 時，完成的 to-do 會被送進Done清單
  if (click.target.tagName === 'LABEL') {
    click.target.parentElement.remove()
    let doneName = click.target.innerHTML
    addDoneItem(doneName)
  }
  // 4. my todo沒有項目時，跑出"ALL DONE"字樣
  if (click.target.tagName === 'LABEL' && list.children[0] === undefined) {
    let h3 = document.createElement('h3')
    h3.innerText = 'ALL DONE!!!'
    list.appendChild(h3)
  }
})


// 5. 點選done清單裡的項目會移回mytodo清單
done.addEventListener('click', function (event) {
  event.target.parentElement.remove()
  addItem(event.target.parentElement.innerText)
  // 如果有ALL DONE!!!，則刪除字樣
  if (list.children[0].innerText === 'ALL DONE!!!') {
    list.children[0].remove()
  }
})

// 6. 當使用者在 input#newTodo 裡按下 Enter 鍵時，一樣可以新增 to-do
document.addEventListener('keypress', function () {
  if (event.keyCode === 13 && input.value.length > 0) {
    addItem(input.value)
    input.value = ''
  }
  // 如果有ALL DONE!!!，則刪除字樣
  if (event.keyCode === 13 && list.children[0].innerText === 'ALL DONE!!!') {
    list.children[0].remove()
  }
})

// 7. 一鍵清除
clearBtn.addEventListener('click', function () {
  if (done.hasChildNodes()) {
    while (done.hasChildNodes()) {
      done.removeChild(done.lastChild)
    }
  } else {
    alert('nothing to clear!')
  }
})