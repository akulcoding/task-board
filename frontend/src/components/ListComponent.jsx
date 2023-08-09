import React from 'react';
import { TaskStatus } from '../constants/constants';
import { TiTick } from 'react-icons/ti';
import "./ListComponent.css";


const ListComponent = ({ listDefinition, onTaskStatusChange }) => (
        <div class="list-component-container">
            <div class="list-component-title">
                <p><strong>{listDefinition.title}</strong></p>
            </div>
            {listDefinition.tasks.map((task, taskIndex) => (
                <div class="list-component-item">
                    <TaskStatusBox status={task.status} onTaskStatusChange={() => onTaskStatusChange(taskIndex)} />
                    <p style={{paddingLeft: "5px"}}>{task.name}</p>
                </div>
            ))}
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