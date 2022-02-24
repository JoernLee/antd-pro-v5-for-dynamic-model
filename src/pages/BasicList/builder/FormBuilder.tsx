import { DatePicker, Form, Input, Switch, TreeSelect } from 'antd';

const FormBuilder = (data: FormAPI.Datum[] | undefined) => {
  return (data || []).map((field) => {
    switch (field.type) {
      case 'text': {
        return (
          <Form.Item key={field.key} label={field.title} name={field.key}>
            <Input disabled={field.disabled} />
          </Form.Item>
        );
      }
      case 'tree': {
        return (
          <Form.Item key={field.key} label={field.title} name={field.key}>
            <TreeSelect disabled={field.disabled} treeData={field.data} treeCheckable />
          </Form.Item>
        );
      }
      case 'datetime': {
        return (
          <Form.Item key={field.key} label={field.title} name={field.key}>
            <DatePicker showTime disabled={field.disabled} />
          </Form.Item>
        );
      }
      case 'switch': {
        return (
          <Form.Item key={field.key} label={field.title} name={field.key} valuePropName={'checked'}>
            <Switch disabled={field.disabled} />
          </Form.Item>
        );
      }
      default:
        return null;
    }
  });
};

export default FormBuilder;
