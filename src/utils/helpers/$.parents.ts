export function getParentsByClass(target: HTMLElement, className: string): HTMLElement | null {
  let current = target;
  while (current && !current.classList.contains(className)) {
    current = current.parentElement!;
  }
  return current || null;
}
