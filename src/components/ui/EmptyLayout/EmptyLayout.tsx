import type { ReactNode } from 'react'

type EmptyLayoutPropsType = React.PropsWithChildren<{
  exist: boolean
  notExistedComponent: ReactNode
}>

const EmptyLayout = (props: EmptyLayoutPropsType) => {
  if (!props.exist) return <>{props.notExistedComponent}</>
  return props.children
}
export default EmptyLayout
