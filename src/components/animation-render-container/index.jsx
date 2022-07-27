import React, { Children, cloneElement } from 'react'

const AnimationRenderContainer = ({
  children,
  navigate,
  planeNeedsUpdated,
}) => {
  const renderChildrens = () => {
    return Children.map(children, (child, index) =>
      cloneElement(child, {
        planeNeedsUpdated,
        navigate,
        animationOrder: Number(`0.${index + 1}`),
      })
    )
  }
  return <>{renderChildrens()}</>
}

export default AnimationRenderContainer
