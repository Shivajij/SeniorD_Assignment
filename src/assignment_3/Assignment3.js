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
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("medium");
  const [systemDate, setSystemDate] = useState(new Date());
  const [editingTodoId, setEditingTodoId] = useState(null); // State to track the ID of the TODO being edited

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

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const handleEditTodo = (todo) => {
    // Set the state to the details of the TODO being edited
    setEditingTodoId(todo.id);
    setDescription(todo.description);
    setDueDate(todo.dueDate);
    setPriority(todo.priority);
  };

  const handleSaveEdit = () => {
    // Find the TODO being edited in the todos array
    const editedTodoIndex = todos.findIndex((todo) => todo.id === editingTodoId);

    if (editedTodoIndex !== -1) {
      // Update the TODO with the edited details
      const updatedTodos = [...todos];
      updatedTodos[editedTodoIndex] = {
        ...updatedTodos[editedTodoIndex],
        description,
        dueDate,
        priority,
      };

      // Clear the editing state
      setEditingTodoId(null);
      setDescription("");
      setDueDate(null);
      setPriority("medium");

      // Update the todos state with the updated array
      setTodos(updatedTodos);
    }
  };

  const handleCancelEdit = () => {
    // Clear the editing state
    setEditingTodoId(null);
    setDescription("");
    setDueDate(null);
    setPriority("medium");
  };

  return (
    <div className="App">
      <h1>TODO App</h1>
      <div className="add-todo">
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
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <div
              className="todo-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className={`todo-item ${todo.completed ? 'completed' : ''}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {editingTodoId === todo.id ? (
                        // Render the edit form when editingTodoId matches the TODO's ID
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
                        // Render the regular TODO item view
                        <>
                          <input
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
                            Due Date: {new Date(todo.dueDate).toLocaleDateString()}
                          </span>
                          <button onClick={() => handleEditTodo(todo)}>Edit</button>
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
