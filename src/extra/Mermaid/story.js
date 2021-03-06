import * as React from 'react'
import { storiesOf } from '@storybook/react'
import withReadme from 'storybook-readme/with-readme'
import { Box } from '../../'
import { Mermaid } from './'
import Readme from './README.md'

const source = `
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
`

storiesOf('Extra/Mermaid', module)
  .addDecorator(withReadme(Readme))
  .add('Standard', () => {
    return (
      <Box m={3}>
        <Mermaid value={source} />
      </Box>
    )
  })
