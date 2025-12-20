export function findParentElement(
  element: HTMLElement,
  selector: (element: HTMLElement) => boolean
) {
  let parent: HTMLElement | null = element;
  while (parent && parent !== document.body) {
    if (selector(parent)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

export function getElementsDistance(element: HTMLElement, target: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  return {
    top: rect.top - targetRect.top,
    left: rect.left - targetRect.left,
  };
}
