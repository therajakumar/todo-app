import { todosmodel } from "../model/todolist.js";

export async function addTodo(req, res) {
  const { task } = req.body;
  const userId = req.user._id; // Get the user ID from req.user

  try {
    if (!task) {
      return res.status(400).send("Task not provided");
    }

    const todo = await todosmodel.create({
      task: task,
      user: userId, // Add the user ID to the todo
    });

    return res.status(201).send(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
}

export async function alltodos(req, res) {
  const userId = req.user._id; // Get the user ID from req.user

  try {
    const todos = await todosmodel.find({ user: userId }); // Find todos by user ID
    return res.status(200).send(todos);
  } catch (error) {
    return res.status(500).send("Server error");
  }
}

export async function update(req, res) {
  const { id, task } = req.body;
  const userId = req.user._id; // Get the user ID from req.user

  if (!id || !task) {
    return res.status(404).send("Todo or task not provided");
  }

  try {
    const newtodo = await todosmodel.findOneAndUpdate(
      { _id: id, user: userId }, // Ensure the todo belongs to the user
      { task: task },
      { new: true }
    );

    if (!newtodo) {
      return res.status(404).send("Todo not found");
    }

    return res.status(200).send("Successfully updated");
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
}

export async function deleteTodo(req, res) {
  const { id } = req.params;
  const userId = req.user._id; // Get the user ID from req.user

  try {
    const deleteTodo = await todosmodel.findOneAndDelete({
      _id: id,
      user: userId,
    }); // Ensure the todo belongs to the user

    if (!deleteTodo) {
      return res.status(404).send("Todo not found");
    }

    return res.status(200).send("Successfully deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
}
