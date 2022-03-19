import { Card, Col, Form, Input, message, Row, Space, Spin, Tabs, Tag } from 'antd';
import { history, useLocation, useRequest } from 'umi';
import { useEffect } from 'react';
import { setFieldsValueAdapter, submitFieldsAdapter } from '@/pages/BasicList/helper';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ActionBuilder from '@/pages/BasicList/builder/ActionBuilder';
import FormBuilder from '@/pages/BasicList/builder/FormBuilder';
import moment from 'moment';
import styles from './styles.less';

const { TabPane } = Tabs;

const Page = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const init = useRequest<{ data: BasicListAPI.PageData }>(
    () => {
      return `https://public-api-v2.aspirantzhang.com${location.pathname.replace(
        '/basic-list',
        '',
      )}?X-API-KEY=antd`;
    },
    {
      onError: () => {
        history.goBack();
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
        history.goBack();
      },
      formatResult: (res: any) => {
        // format上面onSuccess的入参
        return res;
      },
    },
  );

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
        history.goBack();
        break;
      case 'reset':
        form.resetFields();
        break;
      default:
        break;
    }
  };

  return (
    <PageContainer>
      <Spin spinning={init?.loading} tip="Loading...">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{
            create_time: moment(),
            update_time: moment(),
            status: true,
          }}
          onFinish={handleFinish}
        >
          <Row gutter={24}>
            <Col span={16}>
              <Tabs type="card" className={styles.pageTabs}>
                {(init?.data?.layout?.tabs || []).map((tab) => {
                  return (
                    <TabPane tab={tab.title} key={tab.title}>
                      <Card>{FormBuilder(tab.data)}</Card>
                    </TabPane>
                  );
                })}
              </Tabs>
            </Col>
            <Col span={8}>
              {(init?.data?.layout?.actions || []).map((action) => {
                return (
                  <Card key={action.name}>
                    <Space>{ActionBuilder(action.data, actionHandler)}</Space>
                  </Card>
                );
              })}
            </Col>
          </Row>
          <FooterToolbar
            extra={
              <Tag>
                {'UpdateTime:' +
                  moment(form.getFieldValue('update_time')).format('YYYY-MM-DD hh:mm:ss')}
              </Tag>
            }
          >
            {ActionBuilder(init?.data?.layout?.actions[0].data, actionHandler)}
          </FooterToolbar>
          <Form.Item hidden name={'uri'} key={'uri'}>
            <Input />
          </Form.Item>
          <Form.Item hidden name={'method'} key={'method'}>
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </PageContainer>
  );
};

export default Page;
