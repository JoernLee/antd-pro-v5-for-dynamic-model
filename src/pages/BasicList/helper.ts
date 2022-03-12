import moment from 'moment';

export const submitFieldsAdapter = (formValues: any) => {
  const result = formValues;
  Object.keys(formValues).forEach((key) => {
    if (moment.isMoment(formValues[key])) {
      result[key] = moment(formValues[key]).format();
    }
    moment.isMoment(formValues);
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
