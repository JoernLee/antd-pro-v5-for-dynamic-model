import { Form, Input } from 'antd';

const FormBuilder = (data: FormAPI.Datum[] | undefined) => {
  return (data || []).map((field) => {
    return (
      <Form.Item key={field.key} label={field.title} name={field.key}>
        <Input />
      </Form.Item>
    );
  });
};

export default FormBuilder;
