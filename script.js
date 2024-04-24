document.addEventListener("DOMContentLoaded", function () {
  let selectedPriority = "1"; 
  let selectedCategory = "None"; 

  const addTaskScreen = document.getElementById("addTaskScreen");
  const taskPriorityScreen = document.getElementById("taskPriorityScreen");
  const categoryScreen = document.getElementById("categoryScreen");

  

  function handleOptionSelection(options, selectedClass, isCategory) {
    options.forEach((option) => {
      option.addEventListener("click", function () {
        options.forEach((opt) => opt.classList.remove(selectedClass));
        this.classList.add(selectedClass);
        if (isCategory) {
          selectedCategory = this.textContent;
        } else {
          selectedPriority = this.textContent;
        }

        addTaskScreen.style.display = "flex";
        taskPriorityScreen.style.display = "none";
        categoryScreen.style.display = "none";
      });
    });
  }

  
  handleOptionSelection(
    document.querySelectorAll(".priority-option"),
    "selected",
    false
  );
  handleOptionSelection(
    document.querySelectorAll(".category-option"),
    "selected",
    true
  );




  // Lidar com a adição de tarefa
  document
    .getElementById("saveTaskButton")
    .addEventListener("click", function () {
      let taskName = document.getElementById("taskName").value;
      let taskDescription = document.getElementById("taskDescription").value;

      if (taskName && taskDescription) {
        addTask(taskName, taskDescription, selectedPriority, selectedCategory);
        document.getElementById("taskName").value = "";
        document.getElementById("taskDescription").value = "";
        addTaskScreen.style.display = "none";
      } else {
        alert("Por favor, preencha tanto o nome quanto a descrição da tarefa.");
      }
    });



  // Adicionar uma nova categoria
  document
  .getElementById("addCategoryButton")
  .addEventListener("click", function () {
    const categoryName = document.getElementById("newCategoryName").value;
    const categoryColor = this.getAttribute("data-color"); 
    if (categoryName && categoryColor) {
      const newCategory = document.createElement("button");
      newCategory.className = "category-option";
      newCategory.style.backgroundColor = categoryColor;
      newCategory.textContent = categoryName; 
      document.querySelector(".category-options").appendChild(newCategory);
      handleOptionSelection([newCategory], "selected", true);
    }
  });



  // Mostra e esconde modais para adicionar tarefas, configurar categorias ou prioridades
  document
    .getElementById("addTaskButton")
    .addEventListener("click", () => (addTaskScreen.style.display = "flex"));
  document
    .querySelector('.add-task-icon img[alt="flag"]')
    .addEventListener(
      "click",
      () => (taskPriorityScreen.style.display = "flex")
    );
  document
    .querySelector('.add-task-icon img[alt="tag"]')
    .addEventListener("click", () => (categoryScreen.style.display = "flex"));


  // Fecha modais para categorias e prioridades
  document
    .getElementById("closeCategoryScreen")
    .addEventListener("click", () => (categoryScreen.style.display = "none"));
  document
    .getElementById("cancelPriorityButton")
    .addEventListener(
      "click",
      () => (taskPriorityScreen.style.display = "none")
    );

  // Função para adicionar tarefas à lista
  function addTask(name, description, priority, category) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
    <span>${name} - ${description} <br>(PRIORIDADE: <img src="/img/flag.png" alt="Priority Flag" style="vertical-align: middle;"</br> ${priority}, CATEGORIA: ${category}) </span>
    <div class="task-actions">
      <button class="mark-today">Hoje
      <button class="mark-complete">
        <img src="/img/Ellipse 15.png" alt="Complete" height="20px", width="20px" class="complete-icon">
      </button>
    </div>
      `;
    taskList.appendChild(taskItem);



    
    // Adiciona eventos para marcar como hoje e completar
    taskItem
      .querySelector(".mark-today")
      .addEventListener("click", () => taskItem.classList.toggle("today"));
    taskItem
      .querySelector(".mark-complete")
      .addEventListener("click", function () {
        this.classList.toggle("completed");
        const icon = this.querySelector("img"); 
        if (this.classList.contains("completed")) {
          icon.src = "/img/simbolo-verificado.png"; 
        } else {
          icon.src = "/img/Ellipse 15.png"; 
        }
      });
    document.querySelector(".task-list-container").style.display = "block";
    document.getElementById("welcomeMessage").style.display = "none";
  }
});

document.querySelectorAll(".color-option").forEach((item) => {
  item.addEventListener("click", function () {
    document
      .querySelectorAll(".color-option")
      .forEach((circle) => circle.classList.remove("selected"));
    this.classList.add("selected"); 
    const color = this.getAttribute("data-color");

    // Encontra o botão de adicionar e anexa a cor selecionada como atributo
    const addButton = document.getElementById("addCategoryButton");
    addButton.setAttribute("data-color", color); // Armazena a cor no botão
  });
});
