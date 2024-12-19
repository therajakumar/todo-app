import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { AuthContext } from "@/Provider/AuthProvider";
const Todolist = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const { logout } = useContext(AuthContext);
  async function AddTodos() {
    try {
      const token = Cookies.get("authtoken");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_PUBIC_BACKEND_URL}/todos/add`,
        {
          task: task,
        },
        config
      );

      setTodos([...todos, response.data]); // Added to ensure we do not nedd to fetch again
      toast.success("Todo added successfully");
    } catch (error) {
      if (error.response) {
        console.error("Error adding todo:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  }
  async function deletTodo(id) {
    try {
      const token = Cookies.get("authtoken");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${import.meta.env.VITE_PUBIC_BACKEND_URL}/todos/delete/${id}`,
        config
      );
      setTodos(todos.filter((todo) => todo._id !== id)); // Added to ensure we do not nedd to fetch again
      setTask(""); // Added to ensure state turns empty
      toast.success("Successfully Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Error: Not authorized or other issue");
    }
  }
  async function editTodo(id) {
    try {
      const token = Cookies.get("authtoken");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${import.meta.env.VITE_PUBIC_BACKEND_URL}/todos/update`,
        {
          task,
          id,
        },
        config
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      toast.success("succesfuly updated");
    } catch (error) {
      console.log(error);
      toast.error("Error: Not authorized or other issue");
    }
  }
  async function fetchTodos() {
    try {
      const token = Cookies.get("authtoken");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${import.meta.env.VITE_PUBIC_BACKEND_URL}/todos/get`,
        config
      );
      console.log("fetched todos", response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <div className="flex justify-center items-center">
        <Input
          className="border-white"
          placeholder="Enter your Todo "
          onChange={(e) => setTask(e.target.value)}
        />
        <Button className="ml-3" value="add" onClick={AddTodos}>
          Add
        </Button>
        <Button className="ml-3" value="logout" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className="space-y-3 mt-10">
        {todos.map((todo, index) => (
          <div
            className="border-2 rounded-md flex justify-between items-center py-2 px-3"
            key={index}
          >
            <h1>{todo.task}</h1>
            <div className="flex">
              <Trash
                className="mt-3 ml-11 pr-2 "
                onClick={() => deletTodo(todo._id)}
              />
              <Edit
                className="mt-3 ml-1"
                onClick={() => editTodo(todo._id, task)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todolist;
