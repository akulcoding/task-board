import React from 'react';
import { TaskStatus } from '../constants/constants';
import { TiTick } from 'react-icons/ti';
import "./ListComponent.css";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getListStyle, getItemStyle } from "../utils/dndUtils"; 

const ListComponent = ({ listDefinition, onTaskStatusChange, listIndex }) => (
  <div class="list-component-container">
    <Droppable key={`${listIndex}`} droppableId={`${listIndex}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          <div class="list-component-title">
            <p><strong>{listDefinition.title}</strong></p>
          </div>
          {listDefinition.tasks.map((task, taskIndex) => (
            <Draggable
              key={`${listDefinition.index}-${taskIndex}`}
              draggableId={`${listDefinition.index}-${taskIndex}`}
              index={taskIndex}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <div class="list-component-item">
                    <TaskStatusBox status={task.status} onTaskStatusChange={() => onTaskStatusChange(taskIndex)} />
                    <p style={{ paddingLeft: "5px" }}>{task.name}</p>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  </div>
);

const TaskStatusBox = ({ status, onTaskStatusChange }) => (
  <div class={'task-status-box'} onClick={onTaskStatusChange}>
    {status === TaskStatus.Completed ?
      <TiTick /> : <></>
    }
  </div>
)

export default ListComponent;