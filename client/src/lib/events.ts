export const eventCreator = (
  name: string,
  params: Record<string, any>,
): CustomEvent => {
  const event = new CustomEvent(name, {
    detail: params,
  });

  return event;
};

export const eventDispatcher = (
  name: string,
  params: Record<string, any>,
): CustomEvent => {
  const event: CustomEvent = eventCreator(name, params);

  document.dispatchEvent(event);

  return event;
};
