import React, { useState } from "react";
import 'fontsource-roboto';
import { Box, Button, TextField, Typography } from "@material-ui/core";

export default function App() {
  //Need state for list of tasks
  const [taskList, setTaskList] = useState([]);
  //Need state for the current value of each text input
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  //Need a function to add a task to the task list
  const handleAdd = () => {
    setTaskList([...taskList, {title: titleInput, description: descriptionInput, date: dateInput}]);
    setTitleInput("")
    setDescriptionInput("")
    setDateInput("")
  };

  //This is a component that will be reused to represent each individual task.
  //What props does each task need?
  const TodoItem = ({ task }) => {
    //Need state to represent whether the task is checked off or not
    const [checkedOff, setCheckedOff] = useState(false);
    //Need a function to toggle whether the task is checked off or not
    const handleCheckOff = () => {
      setCheckedOff(!checkedOff);
    };

    //Need a function to delete the task from the todo list
    //Note that because we've placed this component inside of our main app,
    //it has direct access to the state of our main app
    const handleDelete = () => {
      setTaskList(taskList.filter((i) => i !== task));
    };

    return (
      <div>
        {checkedOff && (
          <div style={{ border: "1px solid black", width: "300px", textAlign: "center", 
          backgroundColor: "#cfe8fc", fontFamily: 'Roboto' }}>
            <h2>
              <s>{task.title}</s>
            </h2>
          </div>
        )}
        {!checkedOff && (
          <div style={{ border: "1px solid black", width: "300px", textAlign: "center", 
          backgroundColor: "#cfe8fc", fontFamily: 'Roboto' }}>
            <h1>{task.title}</h1>
            <Typography>{task.description}</Typography>
            <Typography>{task.date}</Typography>
          </div>
        )}
        <Button 
          variant="outlined"
          color="primary" 
          onClick={handleCheckOff}>
          Check off
          </Button>
        <Button 
          variant="outlined"
          color="primary" 
          onClick={handleDelete}>
          Delete
        </Button>   
       
      </div>
    );
  };

  return (
    <Box
      style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "10px"}}
    >
      <Typography >Task: </Typography>
      <TextField value = {titleInput} type="text" onChange={(e1) => setTitleInput(e1.target.value)} />
      <Typography >Descripton: </Typography >
      <TextField
        value = {descriptionInput}
        type="text"
        onChange={(e2) => setDescriptionInput(e2.target.value)}
      />
      <Typography >Due date: </Typography >
      <TextField  value = {dateInput} type="date" onChange={(e3) => setDateInput(e3.target.value)} />
      
        
      
      <Button
            variant="contained"
            color="primary"
      onClick={handleAdd}>Add Todo Item</Button>

      {taskList.map((task) => (
        <TodoItem task={task} />
      ))}
    </Box>
  );
}
