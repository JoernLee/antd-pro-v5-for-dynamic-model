import { DatePicker, Form, Input, InputNumber, Switch, TreeSelect, Radio } from 'antd';

const FormBuilder = (data: BasicListAPI.Field[] | undefined) => {
  return (data || []).map((field) => {
    const basicAttr = {
      key: field.key,
      label: field.title,
      name: field.key,
    };
    switch (field.type) {
      case 'text': {
        return (
          <Form.Item {...basicAttr}>
            <Input disabled={field.disabled} />
          </Form.Item>
        );
      }
      case 'tree': {
        return (
          <Form.Item {...basicAttr}>
            <TreeSelect disabled={field.disabled} treeData={field.data} treeCheckable />
          </Form.Item>
        );
      }
      case 'datetime': {
        return (
          <Form.Item {...basicAttr}>
            <DatePicker showTime disabled={field.disabled} />
          </Form.Item>
        );
      }
      case 'switch': {
        return (
          <Form.Item {...basicAttr} valuePropName={'checked'}>
            <Switch disabled={field.disabled} defaultChecked />
          </Form.Item>
        );
      }
      case 'number':
        return (
          <Form.Item {...basicAttr}>
            <InputNumber disabled={field.disabled} />
          </Form.Item>
        );
      case 'textarea':
        return (
          <Form.Item {...basicAttr}>
            <Input.TextArea disabled={field.disabled} />
          </Form.Item>
        );
      case 'radio':
        return (
          <Form.Item {...basicAttr}>
            <Radio.Group buttonStyle="solid" defaultValue={field.data[0]?.value}>
              {(field.data || []).map((item: any) => {
                return (
                  <Radio.Button key={item.name} value={item.value}>
                    {item.title}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </Form.Item>
        );
      case 'parent':
        return (
          <Form.Item {...basicAttr}>
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
              treeData={field.data}
              placeholder="Please select"
              treeDefaultExpandAll
              allowClear
            />
          </Form.Item>
        );
      default:
        return null;
    }
  });
};

export default FormBuilder;
