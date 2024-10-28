import { expect } from '@storybook/test';
import * as test from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { RecoilRoot } from 'recoil';

import { RecordIndexActionMenuDropdown } from '@/action-menu/components/RecordIndexActionMenuDropdown';
import { actionMenuEntriesComponentState } from '@/action-menu/states/actionMenuEntriesComponentState';
import { ActionMenuComponentInstanceContext } from '@/action-menu/states/contexts/ActionMenuComponentInstanceContext';
import { recordIndexActionMenuDropdownPositionComponentState } from '@/action-menu/states/recordIndexActionMenuDropdownPositionComponentState';
import { isDropdownOpenComponentState } from '@/ui/layout/dropdown/states/isDropdownOpenComponentState';
import { extractComponentState } from '@/ui/utilities/state/component-state/utils/extractComponentState';
import { IconCheckbox, IconHeart, IconTrash } from 'twenty-ui';

const deleteMock = test.fn();
const markAsDoneMock = test.fn();
const addToFavoritesMock = test.fn();

const meta: Meta<typeof RecordIndexActionMenuDropdown> = {
  title: 'Modules/ActionMenu/RecordIndexActionMenuDropdown',
  component: RecordIndexActionMenuDropdown,
  decorators: [
    (Story) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(
            extractComponentState(
              recordIndexActionMenuDropdownPositionComponentState,
              'action-menu-dropdown-story',
            ),
            { x: 10, y: 10 },
          );
          set(
            actionMenuEntriesComponentState.atomFamily({
              instanceId: 'story-action-menu',
            }),
            new Map([
              [
                'delete',
                {
                  key: 'delete',
                  label: 'Delete',
                  position: 0,
                  Icon: IconTrash,
                  onClick: deleteMock,
                },
              ],
              [
                'markAsDone',
                {
                  key: 'markAsDone',
                  label: 'Mark as done',
                  position: 1,
                  Icon: IconCheckbox,
                  onClick: markAsDoneMock,
                },
              ],
              [
                'addToFavorites',
                {
                  key: 'addToFavorites',
                  label: 'Add to favorites',
                  position: 2,
                  Icon: IconHeart,
                  onClick: addToFavoritesMock,
                },
              ],
            ]),
          );
          set(
            extractComponentState(
              isDropdownOpenComponentState,
              'action-menu-dropdown-story-action-menu',
            ),
            true,
          );
        }}
      >
        <ActionMenuComponentInstanceContext.Provider
          value={{ instanceId: 'story-action-menu' }}
        >
          <Story />
        </ActionMenuComponentInstanceContext.Provider>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RecordIndexActionMenuDropdown>;

export const Default: Story = {
  args: {
    actionMenuId: 'story',
  },
};

export const WithInteractions: Story = {
  args: {
    actionMenuId: 'story',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const deleteButton = await canvas.findByText('Delete');
    await userEvent.click(deleteButton);
    expect(deleteMock).toHaveBeenCalled();

    const markAsDoneButton = await canvas.findByText('Mark as done');
    await userEvent.click(markAsDoneButton);
    expect(markAsDoneMock).toHaveBeenCalled();

    const addToFavoritesButton = await canvas.findByText('Add to favorites');
    await userEvent.click(addToFavoritesButton);
    expect(addToFavoritesMock).toHaveBeenCalled();
  },
};
