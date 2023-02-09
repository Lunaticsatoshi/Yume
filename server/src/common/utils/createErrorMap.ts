export const createErrorMapArray = (errors: Record<string, any>[]) => {
  return errors.map((err: any) => ({
    fieldName: err.property,
    statusCode: "400",
    message: Object.entries(err.constraints)[0][1] as string
  }));
};
