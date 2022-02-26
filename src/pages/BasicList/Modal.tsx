import { Form, Input, Modal as AntdModal } from 'antd';
import { useRequest } from 'umi';
import { useEffect } from 'react';
import FormBuilder from '@/pages/BasicList/builder/FormBuilder';
import ActionBuilder from '@/pages/BasicList/builder/ActionBuilder';
import moment from 'moment';

const Modal = ({
  visible,
  initUri,
  handleCancel,
}: {
  visible: boolean;
  initUri: string;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const init = useRequest<{ data: FormAPI.Data }>(initUri, {
    // 必须手动.run触发，不会在执行时自动触发
    manual: true,
  });
  const request = useRequest(
    (values) => {
      const { uri, method, ...formValues } = values;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ...formValues,
          'X-API-KEY': 'antd',
          create_time: moment(formValues.create_time).format(),
          update_time: moment(formValues.update_time).format(),
        },
      };
    },
    {
      manual: true,
    },
  );

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

  const handleFinish = (values: any) => {
    // 拿到表单values发送请求提交表单数据
    console.log('submit values', values);
    request.run(values);
  };

  const actionHandler = (action: BasicListAPI.Action) => {
    // 处理Button业务逻辑
    switch (action.action) {
      case 'submit':
        // 触发submit -> 触发onFinish -> 拿到values -> 调用接口发送数据
        // 为了把setState的异步副作用移除，通过隐藏menu来记录值
        form.setFieldsValue({ uri: action.uri, method: action.method });
        form.submit();
        break;
      case 'cancel':
        handleCancel();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <AntdModal
        title={init?.data?.page?.title}
        visible={visible}
        footer={ActionBuilder(init?.data?.layout?.actions[0].data, actionHandler)}
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
          onFinish={handleFinish}
        >
          {FormBuilder(init?.data?.layout?.tabs[0].data)}
          {/*  隐藏的menu，用于记录submit需要的url和method字段，把setState的异步改为同步*/}
          <Form.Item hidden name={'uri'} key={'uri'}>
            <Input />
          </Form.Item>
          <Form.Item hidden name={'method'} key={'method'}>
            <Input />
          </Form.Item>
        </Form>
      </AntdModal>
    </div>
  );
};

export default Modal;
