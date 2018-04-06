/* @flow */

import { serverSideRender } from 'server/entry/serverSideRender.entry.development'

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

test('serverSideRender - snapshot test', () => {
  const clientStats = undefined

  const req = undefined

  const res = undefined

  const result = serverSideRender({ clientStats })(req, res)

  expect(result).toMatchSnapshot()
})
