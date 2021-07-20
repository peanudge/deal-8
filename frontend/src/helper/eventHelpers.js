import { qsAll } from './selectHelpers';

export function on(target, eventName, handler) {
  target.addEventListener(eventName, handler);
}

export function emit(target, eventName, detail) {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
}

export function delegate(target, eventName, selector, handler) {
  const emitEvent = (event) => {
    const potentialElements = qsAll(selector, target);

    for (const potentialElement of potentialElements) {
      if (potentialElement === event.target) {
        return handler.call(event.target, event);
      }
    }
  };
  on(target, eventName, emitEvent);
}
