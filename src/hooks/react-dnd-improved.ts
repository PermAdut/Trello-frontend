/* eslint-disable @typescript-eslint/no-explicit-any */
import { type LegacyRef, useState } from 'react'
import {
  type ConnectDragPreview,
  type DragSourceHookSpec,
  type DropTargetHookSpec,
  type FactoryOrInstance,
  useDrag,
  useDrop,
} from 'react-dnd'

/**
 * Wrapper for react-dnd's `useDrag()` that contains several improvements / bugfixes.
 */
export function useImprovedDrag<DragObject = unknown, DropResult = unknown, CollectedProps = unknown>(
  specArg: FactoryOrInstance<DragSourceHookSpec<DragObject, DropResult, CollectedProps>>,
  deps?: unknown[],
): [CollectedProps, LegacyRef<any>, ConnectDragPreview] {
  const [state, DragSourceRef, preview] = useDrag(specArg, deps)

  // Construct a ref function that actually conforms to type definition for `ref={}` property
  // For some reason the default exported one does not compile.
  const improvedRef: LegacyRef<any> = (e) => {
    DragSourceRef(e)
  }

  return [state, improvedRef, preview]
}

/**
 * Wrapper for react-dnd's `useDrop()` that contains several improvements / bugfixes.
 * Specifically cater for the scenario where `isDragging` is a collected property, ensuring the drag interaction gets to start before `isDragging` is updated.
 */
export function useImprovedDrop<DragObject = unknown, DropResult = unknown, CollectedProps extends object = object>(
  specArg: FactoryOrInstance<DropTargetHookSpec<DragObject, DropResult, CollectedProps>>,
  dependencies?: unknown[],
): [CollectedProps, LegacyRef<any>] {
  // Call original `useDrop()` implementation
  const [state, DropTargetRef] = useDrop<DragObject, DropResult, CollectedProps>(specArg, dependencies)

  // Collection of properties that will override `state` in the return value
  const overrideProperties: Record<string, any> = {}

  // If `state` has collected a property called `isDragging`, override it with a state hook
  if ('isDragging' in state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDragging, setIsDragging] = useState<boolean>(false)

    // Mirror the value of `state.isDragging` into `isDragging` but delayed by 1 frame
    // This is to allow the drag to start BEFORE conditionally updating the DOM based on `isDragging`
    // which might cause the drag to be invalidated.
    // See: https://github.com/react-dnd/react-dnd/issues/3649
    if (state.isDragging !== isDragging) {
      setTimeout(() => setIsDragging(state.isDragging as boolean), 0)
    }

    // "export" property `isDragging` through `overrideProperties` object
    overrideProperties.isDragging = isDragging
  }

  // Construct a ref function that actually conforms to type definition for `ref={}` property
  // For some reason the default exported one does not compile.
  const improvedRef: LegacyRef<any> = (e) => {
    DropTargetRef(e)
  }

  return [
    // Override properties from `state` with `overrideProperties`
    {
      ...state,
      ...overrideProperties,
    } satisfies CollectedProps,
    // Use new ref function
    improvedRef,
  ]
}
