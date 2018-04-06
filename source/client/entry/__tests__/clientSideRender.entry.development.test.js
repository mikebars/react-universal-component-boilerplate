/* @flow */

import { clientSideRender } from 'client/entry/clientSideRender.entry.development'

/* Require raw component */
jest.mock(
  'universal/pages/IndexPage',
  () => require('universal/pages/IndexPage/IndexPage').IndexPage,
)

/* Require raw component */
jest.mock(
  'universal/pages/LoadingPage',
  () => require('universal/pages/LoadingPage/LoadingPage').LoadingPage,
)

/* Require raw component */
jest.mock(
  'universal/pages/NotFoundPage',
  () => require('universal/pages/NotFoundPage/NotFoundPage').NotFoundPage,
)

test('clientSideRender - snapshot test', () => {
  const result = clientSideRender()

  expect(result).toMatchSnapshot()
})
