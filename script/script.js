'use struct';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');


const toDoData = [];
const localStorageData = JSON.parse(localStorage.getItem('toDoData'));

for(let key in localStorageData) {
   toDoData.push(localStorageData[key]);
}

const render = function() {
   todoList.innerHTML = '';
   todoCompleted.innerHTML = '';

   toDoData.forEach(function(item) {
      const li = document.createElement('li');
      
      li.classList.add('todo-item');
      li.innerHTML = `
      <span class="text-todo">${item.text}</span>
      <div class="todo-buttons">
         <button class="todo-remove"></button>
         <button class="todo-complete"></button>
      </div>
      `;

      if(item.complited) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }

      li.querySelector('.todo-complete').addEventListener('click', function() {
         item.complited = !item.complited;
         localStorage.setItem('toDoData', JSON.stringify(toDoData));
         render();
      });

      li.querySelector('.todo-remove').addEventListener('click', function() {
         toDoData.splice(item, 1);
         localStorage.setItem('toDoData', JSON.stringify(toDoData));
         render();
      });
   });
};

todoControl.addEventListener('submit', function(event) {
   event.preventDefault();

   const newToDo = {
      text: headerInput.value,
      complited: false
   };

   if( headerInput.value.trim() !== '') {
      toDoData.push(newToDo);
      localStorage.setItem('toDoData', JSON.stringify(toDoData));
      render();
   }

   headerInput.value = '';
});

render();