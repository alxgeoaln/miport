export const calculateFOV = (height, cameraPosition) => {
  return (2 * Math.atan(height / 2 / cameraPosition) * 180) / Math.PI
}

export const createSpan = (idNumber) => {
  const span = document.createElement('span')
  span.id = `id-${idNumber}`
  span.innerText = idNumber
  span.style = `
        position: absolute;
        top: -40px;
        opacity: 0;
        font-weight: bold;
      `

  return span
}

export function clamp(x, a, b) {
  return Math.min(Math.max(x, a), b)
}
