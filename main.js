#! /usr/bin/env node  
//                                          TODO LIST
//==========================================================================================================================
// Importing the 'inquirer' library for handling user input
import inquirer from "inquirer";
const todos = []; // Array to store todo items
let condition = true; // Boolean variable to control the loop
(async () => {
    while (condition) { // Loop until 'condition' becomes false
        const action = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add", "Read", "Update", "Delete", "Exit"]
        });
        if (action.action === "Add") { // Adding a todo item
            const todoQuestions = await inquirer.prompt([
                {
                    name: "todo",
                    type: "input",
                    message: "Enter the todo item:",
                    validate: function (input) {
                        if (input.trim() !== "") { // Checking if input is not empty
                            return true; // Return true if input is valid
                        }
                        return "Please enter a valid todo item (cannot be blank)."; // Error message
                    }
                }
            ]);
            todos.push(todoQuestions.todo); // Adding the todo item to the 'todos' array
            console.log("Todo added:", todoQuestions.todo); // Logging a message confirming the addition
        }
        if (action.action === "Read") { // Reading all todo items
            console.log("Your todos:"); // Logging all todo items with their indexes
            todos.forEach((todo, index) => console.log(`${index + 1}. ${todo}`));
        }
        if (action.action === "Update") { // Updating a todo item
            const updateIndex = await inquirer.prompt({
                name: "index",
                type: "input",
                message: "Enter the index of the todo you want to update:"
            });
            const updatedTodo = await inquirer.prompt({
                name: "todo",
                type: "input",
                message: "Enter the updated todo item:",
                validate: function (input) {
                    if (input.trim() !== "") { // Checking if input is not empty
                        return true; // Return true if input is valid
                    }
                    return "Please enter a valid todo item (cannot be blank)."; // Error message
                }
            });
            todos[parseInt(updateIndex.index) - 1] = updatedTodo.todo; // Updating the todo item in the 'todos' array
            console.log("Todo updated."); // Logging a message confirming the update
        }
        if (action.action === "Delete") { // Deleting a todo item
            const deleteIndex = await inquirer.prompt({
                name: "index",
                type: "input",
                message: "Enter the index of the todo you want to delete:"
            });
            const deletedTodo = todos.splice(parseInt(deleteIndex.index) - 1, 1); // Deleting the todo item from the 'todos' array and storing it
            console.log("Todo deleted:", deletedTodo); // Logging a message confirming the deletion
        }
        if (action.action === "Exit") { // Exiting the application
            condition = false; // Setting 'condition' to false to exit the loop
        }
    }
})();
