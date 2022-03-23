import { Form, Input, message, Modal as AntdModal, Spin, Tag } from 'antd';
import { useRequest } from 'umi';
import { useEffect } from 'react';
import FormBuilder from '@/pages/BasicList/builder/FormBuilder';
import ActionBuilder from '@/pages/BasicList/builder/ActionBuilder';
import moment from 'moment';
import { setFieldsValueAdapter, submitFieldsAdapter } from '@/pages/BasicList/helper';
import styles from './styles.less';

const Modal = ({
  visible,
  initUri,
  handleCancel,
}: {
  visible: boolean;
  initUri: string;
  handleCancel: (reload?: boolean) => void;
}) => {
  const [form] = Form.useForm();
  const init = useRequest<{ data: BasicListAPI.PageData }>(
    () => {
      return `https://public-api-v2.aspirantzhang.com${initUri}?X-API-KEY=antd`;
    },
    {
      // 必须手动.run触发，不会在执行时自动触发
      manual: true,
      onError: () => {
        handleCancel();
      },
    },
  );

  const request = useRequest(
    (values: any) => {
      message.loading({
        content: 'Processing...',
        key: 'process',
        // 虽然一直存在，但是会被相同key的message覆盖掉
        duration: 0,
      });
      const { uri, method, ...formValues } = values;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ...submitFieldsAdapter(formValues),
          'X-API-KEY': 'antd',
        },
      };
    },
    {
      manual: true,
      onSuccess: (data: any) => {
        message.success({
          content: data.message,
          key: 'process',
        });
        handleCancel(true);
      },
      formatResult: (res: any) => {
        // format上面onSuccess的入参
        return res;
      },
      throttleInterval: 1000,
    },
  );

  useEffect(() => {
    if (visible) {
      form.resetFields();
      init.run();
    }
  }, [visible]);

  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsValueAdapter(init.data));
    }
  }, [init.data]);

  const handleFinish = (values: any) => {
    // 拿到表单values发送请求提交表单数据
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
      case 'reset':
        form.resetFields();
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
        footer={ActionBuilder(init?.data?.layout?.actions[0].data, actionHandler, request.loading)}
        onCancel={() => handleCancel()}
        maskClosable={false}
        forceRender
      >
        <Spin spinning={init?.loading} tip="Loading...">
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
          <Tag className={styles.updateTimeTag}>
            {'UpdateTime:' +
              moment(form.getFieldValue('update_time')).format('YYYY-MM-DD hh:mm:ss')}
          </Tag>
        </Spin>
      </AntdModal>
    </div>
  );
};

export default Modal;
