import "./style.css";

//declaration de constante
const ul = document.querySelector("ul");
//creationd de tableau
const TableauTodo = [{
        text: "Faire du teste1",
        done: false,
        editTodo: false,
    },
    {
        text: "Faire du teste2",
        done: false,
        editTodo: false,
    },
];

//creation de fonction qui afich notre tableau

function AficheTableauTodo() {
    const todoNode = TableauTodo.map((todo, index) => {
        if (todo.editTodo) {
            return createTodoEdidtElement(todo, index);
        } else {
            return createElemntAficheTableauTodo(todo, index);
        }
    });
    ul.innerHTML = "";
    ul.append(...todoNode);
}

//fonction qui  cree l'element de notre de notre AficheTableauTodo
//pour la suppression on modifie le quelque ligne

function createTodoEdidtElement(todo, index) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;
    const SaveButon = document.createElement("button");
    SaveButon.classList.add("success");
    SaveButon.innerHTML = "Enregidtrer";
    const retourBouton = document.createElement("button");
    retourBouton.innerHTML = "Retour";
    retourBouton.addEventListener("click", (event) => {
        event.stopPropagation();
        EditerBoutonTodo(index);
    });
    SaveButon.addEventListener("click", (event) => {
        EditTodoSave(index, input);
    });

    li.append(input, retourBouton, SaveButon);
    return li;
}

function createElemntAficheTableauTodo(todo, index) {
    const li = document.createElement("li");
    const supprimBoutton = document.createElement("button");
    supprimBoutton.innerHTML = "supprimer";
    supprimBoutton.classList.add("danger");
    const EditerBouton = document.createElement("button");
    EditerBouton.innerHTML = "Editer";
    supprimBoutton.addEventListener("click", (event) => {
        event.stopPropagation();
        SupprimeTodo(index);
    });
    EditerBouton.addEventListener("click", (event) => {
        event.stopPropagation();
        EditerBoutonTodo(index);
    });

    li.innerHTML = `
     <span class="todo ${todo.done ? "done" : ""}"></span>
       <p class="${todo.done ? "done" : ""}">${todo.text}</p>
       `;
    li.addEventListener("click", (event) => {
        toggleTodo(index);
    });
    let timer;

    li.append(EditerBouton, supprimBoutton);
    return li;
}

//fonction qui va ajouter une nouvelle valeur todo a la liste

//declaration de constante
const form = document.querySelector("form");
const input = document.querySelector("form>input");

//  création d'un ecouteur et le gestionnaire d'evenement
form.addEventListener("submit", (event) => {
    event.preventDefault(); // pas de rafrechissement de la page par defaut
    const value = input.value; //permet de recuperé une valeur de formulaire
    input.value = ""; //ecrase la valeur dans l'input apres une soumission
    AjoutTodo(value); //declanchement ajout d'un objet
});

//fontion qui permet d'jouter Todo.
function AjoutTodo(text) {
    text = text.trim(); //ampechement d'un ajout vide
    if (text) {
        TableauTodo.push({
            text: `${text[0].toUpperCase()}${text.slice(1)}`, //permet au premier lettredu text sera en majuscule
            done: false,
        });
        AficheTableauTodo();
    } //ampechement d'un ajout vide
}

//fountion permet de supprimer Todo
function SupprimeTodo(index) {
    TableauTodo.splice(index, 1);
    AficheTableauTodo();
}

//creer une fuontion toggle

function toggleTodo(index) {
    TableauTodo[index].done = !TableauTodo[index].done;
    AficheTableauTodo();
}

//Fonction comme clui de la certification
function EditerBoutonTodo(index) {
    TableauTodo[index].editTodo = !TableauTodo[index].editTodo;

    AficheTableauTodo();
}

function EditTodoSave(index, input) {
    const value = input.value;
    TableauTodo[index].text = value;
    TableauTodo[index].editTodo = false;

    AficheTableauTodo();
}

AficheTableauTodo();

//  //creation de lite non ordonnée en utilisant la methode querySelector
//  const ul = document.querySelector("ul");

//  //Ajout d'un tableau de todos de depart
//  const todos = [{
//          text: "juste essaye1", //affiche du text
//          done: true //juste de valeur booléen
//      },
//      {
//          text: "juste essaye2",
//          done: false
//      }
//  ];

//  //creation de fonction qui permet d'afficher notre todos de depart

//  function AfficheTodo() {
//      const todosNode = todos.map((todo, index) => {
//          return createTodoElement(todo, index);
//      });

//      ul.innerHTML = "";
//      ul.append(...todosNode);
//  };

//  // fonction qui creé un element html pour chaque objet Todo de notre tableau de todos

//  const createTodoElement = (todo, index) => {
//      const li = document.createElement("li");
//      li.innerHTML = `
//        <span class="todo ${todo.done ? "done" : ""}"></span>
//        <p>${todo.text}</p>
//        <button>Supprimer</button>
//        <button>Editer</button>

//        `;
//      return li;
//  };
//  AfficheTodo();