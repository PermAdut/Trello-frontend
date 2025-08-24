type EmptyLayoutPropsType = React.PropsWithChildren<{
  exist: boolean
}>

const EmptyLayout = (props: EmptyLayoutPropsType) => {
  if (!props.exist) return <></>
  return props.children
}
export default EmptyLayout
