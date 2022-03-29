import { Col, DatePicker, Form, Input, Select, TreeSelect } from 'antd';
import moment from 'moment';

const SearchBuilder = (data: BasicListAPI.Field[] | undefined) => {
  return (data || []).map((field) => {
    const basicAttr = {
      key: field.key,
      label: field.title,
      name: field.key,
    };
    switch (field.type) {
      case 'text': {
        return (
          <Col sm={6} key={field.key}>
            <Form.Item {...basicAttr}>
              <Input disabled={field.disabled} />
            </Form.Item>
          </Col>
        );
      }
      case 'tree': {
        return (
          <Col sm={6} key={field.key}>
            <Form.Item {...basicAttr}>
              <TreeSelect disabled={field.disabled} treeData={field.data} treeCheckable />
            </Form.Item>
          </Col>
        );
      }
      case 'datetime': {
        return (
          <Col sm={12} key={field.key}>
            <Form.Item {...basicAttr}>
              <DatePicker.RangePicker
                showTime
                style={{ width: '100%' }}
                disabled={field.disabled}
                ranges={{
                  Today: [moment().startOf('day'), moment().endOf('day')],
                  'Last 7 Days': [moment().subtract(7, 'd'), moment()],
                  'Last 30 Days': [moment().subtract(30, 'days'), moment()],
                  'Last Month': [
                    moment().subtract(1, 'months').startOf('month'),
                    moment().subtract(1, 'months').endOf('month'),
                  ],
                }}
              />
            </Form.Item>
          </Col>
        );
      }
      case 'select':
      case 'switch': {
        return (
          <Col sm={6} key={field.key}>
            <Form.Item
              key={field.key}
              label={field.title}
              name={field.key}
              valuePropName={'checked'}
            >
              <Select disabled={field.disabled}>
                {(field?.data || []).map((option: any) => {
                  return (
                    <Select.Option key={option.value} value={option.value}>
                      {option.title}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        );
      }
      default:
        return null;
    }
  });
};

export default SearchBuilder;
