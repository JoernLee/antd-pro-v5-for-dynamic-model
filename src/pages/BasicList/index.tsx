import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal as AntdModal,
  Pagination,
  Row,
  Space,
  Table,
} from 'antd';
import styles from './index.less';
import { history, useIntl, useRequest } from 'umi';
import { useSessionStorageState, useToggle } from 'ahooks';
import { useEffect, useState } from 'react';
import { stringify } from 'query-string';
import ActionBuilder from '@/pages/BasicList/builder/ActionBuilder';
import ColumnBuilder from '@/pages/BasicList/builder/ColumnBuilder';
import Modal from '@/pages/BasicList/component/Modal';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import SearchBuilder from '@/pages/BasicList/builder/SearchBuilder';
import { submitFieldsAdapter } from '@/pages/BasicList/helper';
import RcQueueAnim from 'rc-queue-anim';

const { confirm } = AntdModal;

const BasicLayout = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUri, setModalUri] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchVisible, { toggle }] = useToggle(false);
  // batchOverview组件拿不到最新的TableColumns，所以只能如下改写
  const [tableColumns, setTableColumns] = useSessionStorageState<BasicListAPI.Field[]>(
    'basicListTableColumns',
    {
      defaultValue: [],
    },
  );

  const lang = useIntl();
  const [searchForm] = Form.useForm();

  const init = useRequest<{ data: BasicListAPI.ListData }>((values) => {
    return {
      url: `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${perPage}${
        sort && `&sort=${sort}`
      }${order && `&order=${order}`}`,
      params: values,
      paramsSerializer: (params: any) => {
        return stringify(params, { arrayFormat: 'comma', skipEmptyString: true, skipNull: true });
      },
    };
  }, {});

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
          ...formValues,
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
      },
      formatResult: (res: any) => {
        // format上面onSuccess的入参
        return res;
      },
    },
  );

  useEffect(() => {
    init.run();
  }, [page, perPage, sort, order]);

  useEffect(() => {
    if (init?.data?.layout?.tableColumn) {
      setTableColumns(ColumnBuilder(init?.data?.layout?.tableColumn, actionHandler));
    }
  }, [init?.data?.layout?.tableColumn]);

  const onPaginationChange = (_page: number, _pageSize: number) => {
    setPage(_page);
    setPerPage(_pageSize);
  };

  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    if (sorter && sorter.field && sorter.order) {
      setSort(sorter.field);
      setOrder(sorter.order.substring(0, sorter.order.length - 3));
    } else {
      setSort('');
      setOrder('');
    }
  };

  const onSearchFinish = (values: any) => {
    init.run(submitFieldsAdapter(values));
    console.log(submitFieldsAdapter(values));
  };

  function actionHandler(action: BasicListAPI.Action, record: BasicListAPI.Field) {
    console.log(action);
    switch (action.action) {
      case 'modal':
        const realUri = (action.uri || '').replace(/:\w+/g, (field) => {
          return record[field.replace(':', '')];
        });
        setModalUri(realUri as string);
        setModalVisible(true);
        break;
      case 'reload':
        init.run();
        break;
      case 'delete':
      case 'deletePermanently':
      case 'restore':
        const operationName = lang.formatMessage({
          id: `basic-list.list.actionHandler.operation.${action.action}`,
        });
        const dataSource = Object.keys(record).length > 0 ? [record] : selectedRows;
        confirm({
          title: lang.formatMessage(
            {
              id: 'basic-list.list.actionHandler.confirmTitle',
            },
            {
              operationName,
            },
          ),
          icon: <ExclamationCircleOutlined />,
          content: batchOverview(dataSource),
          okText: `Sure to ${action.action}`,
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            return request.run({
              uri: action.uri,
              method: action.method,
              type: action.action,
              ids: Object.keys(record).length > 0 ? [record.id] : selectedRowKeys,
            });
          },
        });
        break;
      case 'page':
        const pageUri = (action.uri || '').replace(/:\w+/g, (field) => {
          return record[field.replace(':', '')];
        });
        history.push(`/basic-list${pageUri}`);
        break;
    }
  }

  function batchOverview(dataSource: BasicListAPI.Field[]) {
    return (
      <Table
        size="small"
        rowKey="id"
        dataSource={dataSource}
        columns={[tableColumns[0] || {}, tableColumns[1] || {}]}
        pagination={false}
      />
    );
  }

  const searchLayout = () => {
    return (
      <RcQueueAnim type={'top'}>
        {searchVisible ? (
          <Card key="searchForm" className={styles.searchForm}>
            <Form form={searchForm} onFinish={onSearchFinish}>
              <Row gutter={24}>
                <Col sm={6}>
                  <Form.Item key="id" label="ID" name="id">
                    <Input />
                  </Form.Item>
                </Col>
                {SearchBuilder(init?.data?.layout?.tableColumn)}
              </Row>
              <Row>
                <Col className={styles.textAlignRight} sm={24}>
                  <Space>
                    <Button
                      onClick={() => {
                        init.run();
                        searchForm.resetFields();
                      }}
                    >
                      清空
                    </Button>
                    <Button type="primary" htmlType="submit">
                      提交
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          </Card>
        ) : null}
      </RcQueueAnim>
    );
  };

  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Space>
            <Button
              type={searchVisible ? 'primary' : 'default'}
              shape="circle"
              icon={<SearchOutlined />}
              onClick={toggle}
            />
            {ActionBuilder(init?.data?.layout?.tableToolBar, actionHandler, false)}
          </Space>
        </Col>
      </Row>
    );
  };

  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Pagination
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            total={init?.data?.meta?.total}
            onChange={onPaginationChange}
          />
        </Col>
      </Row>
    );
  };

  const batchToolBar = () => {
    // 悬浮操作区域
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: any, _selectedRows: any) => {
      setSelectedRowKeys(_selectedRowKeys);
      setSelectedRows(_selectedRows);
    },
  };

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          dataSource={init?.data?.dataSource}
          columns={tableColumns}
          pagination={false}
          onChange={onTableChange}
          rowSelection={rowSelection}
          loading={init?.loading}
        />
        {afterTableLayout()}
      </Card>
      {batchToolBar()}
      <Modal
        visible={modalVisible}
        initUri={modalUri}
        handleCancel={(reload = false) => {
          setModalVisible(false);
          setModalUri('');
          if (reload) {
            init.run();
          }
        }}
      />
      <FooterToolbar
        extra={<Space>{ActionBuilder(init.data?.layout.batchToolBar, actionHandler)}</Space>}
      />
    </PageContainer>
  );
};

export default BasicLayout;
