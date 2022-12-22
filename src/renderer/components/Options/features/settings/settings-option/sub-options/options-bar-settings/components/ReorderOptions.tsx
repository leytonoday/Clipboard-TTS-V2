import {
  Draggable,
  Droppable,
  DropResult,
  DraggingStyle,
  DragDropContext,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import OptionIcon               from "renderer/components/options/common/OptionIcon";
import { useStore }             from "renderer/store";
import { useState }             from "react"
import { Box, Button, useToast }          from "@chakra-ui/react"
import OptionSubHeader          from "renderer/components/options/common/OptionSubHeader"
import { optionsDefaultOrder }  from "renderer/misc/data"
import { sortByDisplayOrder }   from "renderer/utils"

const getItemStyle = (draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  color: "black",
  display: 'inline-block',
  margin: "0 0.5em",
  ...draggableStyle
})

const getListStyle = () => ({
  flexWrap: "nowrap",
  display: "flex",
  overflow: "auto",
  paddingBottom: "1.5em",
  paddingTop: "-1em",
});

const ReorderOptions = () => {
  const [options, setOptions] = useState(useStore(state => state.options))
  const store = useStore()
  const toast = useToast()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination)
      return;

    const items = Array.from(options);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    setOptions(items);
    store.setOptionsDisplayOrder(items.map((option, index) => { return {key: option.name, displayOrder: index} }));
  }

  const resetOptionsDisplayOrder = () => {
    setOptions(sortByDisplayOrder(options, optionsDefaultOrder))
    store.setOptionsDisplayOrder(optionsDefaultOrder)
    toast({
      title: "Reset Success",
      description: "The options display order has been reset to the default",
      status: "success",
      duration: 5000,
      isClosable: true
    })
  }

  return (
    <Box>
      <OptionSubHeader includePadding title="Re-order Options" info="If you think certain options are more important than others, you can move them to be
      closer to the top. This means that when the Options Bar is collapsed, you'll still see your favourite options"/>
      <br />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(droppableProvided) => (
            // @ts-ignore
            <Box margin="0 1em" ref={droppableProvided.innerRef} style={getListStyle()} {...droppableProvided.droppableProps}>
              {options.map((option, index) => (
                <Draggable key={`${option.name}${index}`} draggableId={option.name} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(provided.draggableProps.style)}
                    >
                      <OptionIcon icon={option.icon()} onClick={() => { }} active={false} grabbing={true} />
                    </Box>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Box display="flex" justifyContent="end" margin="1em">
        <Button onClick={resetOptionsDisplayOrder} size="sm">Reset</Button>
      </Box>
    </Box>
  )
}

export default ReorderOptions;
