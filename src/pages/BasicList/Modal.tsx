import { Form, Modal as AntdModal } from 'antd';
import { useRequest } from 'umi';
import { useEffect } from 'react';
import FormBuilder from '@/pages/BasicList/builder/FormBuilder';
import ActionBuilder from '@/pages/BasicList/builder/ActionBuilder';
import moment from 'moment';

const Modal = ({
  visible,
  uri,
  handleCancel,
}: {
  visible: boolean;
  uri: string;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const init = useRequest<{ data: FormAPI.Data }>(uri);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      init.run();
    }
  }, [visible]);

  const setFieldsValueAdapter = (data: FormAPI.Data) => {
    if (data?.layout?.tabs && data?.dataSource) {
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

  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsValueAdapter(init.data));
    }
  }, [init.data]);

  return (
    <div>
      <AntdModal
        title={init?.data?.page?.title}
        visible={visible}
        footer={ActionBuilder(init?.data?.layout?.actions[0].data)}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            create_time: moment(),
            update_time: moment(),
            status: true,
          }}
        >
          {FormBuilder(init?.data?.layout?.tabs[0].data)}
        </Form>
      </AntdModal>
    </div>
  );
};

export default Modal;
