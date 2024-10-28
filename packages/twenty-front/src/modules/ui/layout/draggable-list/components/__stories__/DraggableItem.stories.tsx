import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentDecorator, IconBell } from 'twenty-ui';

import { DraggableItem } from '@/ui/layout/draggable-list/components/DraggableItem';
import { MenuItemDraggable } from '@/ui/navigation/menu-item/components/MenuItemDraggable';

const meta: Meta<typeof DraggableItem> = {
  title: 'UI/Layout/DraggableList/DraggableItem',
  component: DraggableItem,
  decorators: [
    (Story) => (
      <DragDropContext onDragEnd={() => test.fn()}>
        <Droppable droppableId="droppable-id">
          {(_provided) => <Story />}
        </Droppable>
      </DragDropContext>
    ),
    ComponentDecorator,
  ],
  parameters: {
    container: { width: 100 },
  },
  argTypes: {
    itemComponent: { control: { disable: true } },
  },
  args: {
    draggableId: 'draggable-1',
    index: 0,
    isDragDisabled: false,
    itemComponent: (
      <MenuItemDraggable LeftIcon={IconBell} text="Draggable item 1" />
    ),
  },
};

export default meta;

type Story = StoryObj<typeof DraggableItem>;

export const Default: Story = {};
