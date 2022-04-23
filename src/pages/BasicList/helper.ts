import moment from 'moment';

export const submitFieldsAdapter = (formValues: any) => {
  const result = formValues;
  Object.keys(formValues).forEach((key) => {
    if (Array.isArray(formValues[key])) {
      result[key] = formValues[key].map((value: any) => {
        if (moment.isMoment(value)) {
          return moment(value).format();
        }
        return value;
      });
    }
    if (moment.isMoment(formValues[key])) {
      result[key] = moment(formValues[key]).format();
    }
  });
  return result;
};

export const setFieldsValueAdapter = (data: BasicListAPI.PageData) => {
  if (data?.layout?.tabs && data.dataSource) {
    const newFieldValues = {};
    data.layout.tabs.forEach((tab) => {
      tab.data.forEach((field) => {
        switch (field.type) {
          case 'datetime':
            newFieldValues[field.key] = moment(data.dataSource[field.key]);
            break;
          case 'textarea':
            if (
              typeof data.dataSource[field.key] === 'object' &&
              data.dataSource[field.key] !== null
            ) {
              newFieldValues[field.key] = JSON.stringify(data.dataSource[field.key]);
            } else {
              newFieldValues[field.key] = data.dataSource[field.key];
            }
            break;
          default:
            newFieldValues[field.key] = data.dataSource[field.key];
            break;
        }
      });
    });
    return newFieldValues;
  }
  return {};
};
