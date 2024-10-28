import { expect } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { HttpResponse, graphql } from 'msw';

import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { getPeopleMock, peopleQueryResult } from '~/testing/mock-data/people';
import { mockedWorkspaceMemberData } from '~/testing/mock-data/users';

import { RecordShowPage } from '../RecordShowPage';

const peopleMock = getPeopleMock();

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/ObjectRecord/RecordShowPage',
  component: RecordShowPage,
  args: {
    routePath: '/object/:objectNameSingular/:objectRecordId',
    routeParams: {
      ':objectNameSingular': 'person',
      ':objectRecordId': peopleMock[0].id,
    },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query('FindManyPeople', () => {
          return HttpResponse.json({
            data: peopleQueryResult,
          });
        }),
        graphql.query('FindOnePerson', () => {
          return HttpResponse.json({
            data: {
              person: peopleMock[0],
            },
          });
        }),
        graphql.query('FindManyActivityTargets', () => {
          return HttpResponse.json({
            data: {
              activityTargets: {
                edges: [],
                pageInfo: {
                  hasNextPage: false,
                  startCursor: '',
                  endCursor: '',
                },
                totalCount: 0,
              },
            },
          });
        }),
        graphql.query('FindOneworkspaceMember', () => {
          return HttpResponse.json({
            data: {
              workspaceMember: mockedWorkspaceMemberData,
            },
          });
        }),
        graphqlMocks.handlers,
      ],
    },
  },
};

export default meta;

export type Story = StoryObj<typeof RecordShowPage>;

export const Default: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  decorators: [PageDecorator],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // await canvas.findAllByText(peopleMock[0].name.firstName);
    expect(
      await canvas.findByText('Twenty', undefined, {
        timeout: 5000,
      }),
    ).toBeInTheDocument();
    expect(
      await canvas.findByText('Add your first Activity', undefined, {
        timeout: 3000,
      }),
    ).toBeInTheDocument();
  },
};
