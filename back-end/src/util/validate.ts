const checkValidate = (validate: any) => {
  let err = validate;

  if (err && err.error) {
    let errors =
      err.error &&
      err.error?.details?.reduce((result: any, item: any) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});

    return errors;
  }
};

export { checkValidate };
