import React, { useState } from "react";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const priorities = {
  high: "orange",
  medium: "yellow",
  low: "green",
};

function Assignment3() {
  // State variables
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("medium");
  const [systemDate, setSystemDate] = useState(new Date());
  const [editingTodoId, setEditingTodoId] = useState(null);

  // Function to add a new todo
  const handleAddTodo = () => {
    if (description && dueDate) {
      const newTodo = {
        id: new Date().getTime(),
        description,
        dueDate,
        priority,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setDescription("");
      setDueDate(null);
      setPriority("medium");
    }
  };

  // Function to toggle completion status of a todo
  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Function to handle the end of dragging an item
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  // Function to initiate editing a todo
  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.id);
    setDescription(todo.description);
    setDueDate(todo.dueDate);
    setPriority(todo.priority);
  };

  // Function to save edits made to a todo
  const handleSaveEdit = () => {
    const editedTodoIndex = todos.findIndex(
      (todo) => todo.id === editingTodoId
    );

    if (editedTodoIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[editedTodoIndex] = {
        ...updatedTodos[editedTodoIndex],
        description,
        dueDate,
        priority,
      };

      setEditingTodoId(null);
      setDescription("");
      setDueDate(null);
      setPriority("medium");

      setTodos(updatedTodos);
    }
  };

  // Function to cancel editing a todo
  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setDescription("");
    setDueDate(null);
    setPriority("medium");
  };

  // Function to remove all todos
  const handleRemoveAll = () => {
    setTodos([]);
  };

  // Rendering the component
  return (
    <div className="App">
      <h1>TODO App</h1>
      <div className="add-todo">
        {/* Input fields for adding new todos */}
        <label htmlFor="system-date">Mimic System Date:</label>
        <DatePicker
          id="system-date"
          selected={systemDate}
          onChange={(date) => setSystemDate(date)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          placeholderText="Due Date"
          dateFormat="yyyy-MM-dd"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleAddTodo}>Add TODO</button>
        <button onClick={handleRemoveAll}>Remove All</button>{" "}
        {/* Button to remove all todos */}
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <div
              className="todo-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {/* Mapping through todos and rendering them */}
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={`todo-item ${
                        todo.completed ? "completed" : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Conditionally rendering based on whether editing */}
                      {editingTodoId === todo.id ? (
                        <>
                          <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                          />
                          <DatePicker
                            selected={dueDate}
                            onChange={(date) => setDueDate(date)}
                            placeholderText="Due Date"
                            dateFormat="yyyy-MM-dd"
                          />
                          <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                          <button onClick={handleSaveEdit}>Save</button>
                          <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <input
                            style={{ cursor: "pointer" }}
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo.id)}
                          />
                          <span style={{ color: priorities[todo.priority] }}>
                            {todo.description}
                          </span>
                          {systemDate > new Date(todo.dueDate) && (
                            <span className="alert-icon">⚠</span>
                          )}
                          <span className="due-date">
                            Due Date:{" "}
                            {new Date(todo.dueDate).toLocaleDateString()}
                          </span>
                          <button onClick={() => handleEditTodo(todo)}>
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Assignment3;
