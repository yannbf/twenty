import { RecordIndexActionMenuBarEntry } from '@/action-menu/components/RecordIndexActionMenuBarEntry';
import { expect } from '@storybook/test';
import * as test from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { ComponentDecorator, IconCheckbox, IconTrash } from 'twenty-ui';

const meta: Meta<typeof RecordIndexActionMenuBarEntry> = {
  title: 'Modules/ActionMenu/RecordIndexActionMenuBarEntry',
  component: RecordIndexActionMenuBarEntry,
  decorators: [ComponentDecorator],
};

export default meta;

type Story = StoryObj<typeof RecordIndexActionMenuBarEntry>;

const deleteMock = test.fn();
const markAsDoneMock = test.fn();

export const Default: Story = {
  args: {
    entry: {
      key: 'delete',
      label: 'Delete',
      position: 0,
      Icon: IconTrash,
      onClick: deleteMock,
    },
  },
};

export const WithDangerAccent: Story = {
  args: {
    entry: {
      key: 'delete',
      label: 'Delete',
      position: 0,
      Icon: IconTrash,
      onClick: deleteMock,
      accent: 'danger',
    },
  },
};

export const WithInteraction: Story = {
  args: {
    entry: {
      key: 'markAsDone',
      label: 'Mark as done',
      position: 0,
      Icon: IconCheckbox,
      onClick: markAsDoneMock,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByText('Mark as done');
    await userEvent.click(button);
    expect(markAsDoneMock).toHaveBeenCalled();
  },
};
