
/**
 * Moves an item from one list to another list.
 */
export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const onDragEnd = (result, state, setState) => {
    const { source, destination } = result;

    // // dropped outside the list
    if (!destination) {
        return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
        const items = reorder(state[sInd].tasks, source.index, destination.index);
        const newState = [...state];
        newState[sInd].tasks = items;
        setState(newState);
    } else {
        const result = move(state[sInd].tasks, state[dInd].tasks, source, destination);
        const newState = [...state];
        newState[sInd].tasks = result[sInd];
        newState[dInd].tasks = result[dInd];
        setState(newState.filter(state => state.tasks.length));
    }
    //TODO: API call to update state in backend
}

const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});