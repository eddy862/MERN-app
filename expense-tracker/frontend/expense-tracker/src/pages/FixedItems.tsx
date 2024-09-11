import React from 'react'
import Main from '../layouts/Main'
import useFixedItems from '../hooks/useFixedItems';
import FixedItemsList from '../components/FixedItems/FixedItemsList';

type Props = {}

function FixedItems({}: Props) {
  const { fixedItems } = useFixedItems();

  return (
    <Main>
      <FixedItemsList fixedItems={fixedItems} />
    </Main>
  )
}

export default FixedItems