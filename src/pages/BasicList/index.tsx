import { PageContainer } from '@ant-design/pro-layout';
import { Col, Pagination, Row, Table, Card, Space } from 'antd';
import styles from './index.less';
import { useRequest } from 'umi';
import { useEffect, useState } from 'react';
import ActionBuilder from '@/pages/BasicList/builder/ActionBuilder';
import ColumnBuilder from '@/pages/BasicList/builder/ColumnBuilder';
import Modal from '@/pages/BasicList/component/Modal';

const BasicLayout = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUri, setModalUri] = useState('');

  const init = useRequest<{ data: BasicListAPI.ListData }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${perPage}${
      sort && `&sort=${sort}`
    }${order && `&order=${order}`}`,
  );

  useEffect(() => {
    init.run();
  }, [page, perPage, sort, order]);

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

  const actionHandler = (action: BasicListAPI.Action) => {
    console.log(action);
    switch (action.action) {
      case 'modal':
        setModalUri(action.uri as string);
        setModalVisible(true);
        break;
    }
  };

  const searchLayout = () => {};

  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Space>{ActionBuilder(init?.data?.layout?.tableToolBar, actionHandler, false)}</Space>
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

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          dataSource={init?.data?.dataSource}
          columns={ColumnBuilder(init?.data?.layout?.tableColumn, actionHandler)}
          pagination={false}
          onChange={onTableChange}
        />
        {afterTableLayout()}
      </Card>
      {batchToolBar()}
      <Modal
        visible={modalVisible}
        initUri={modalUri}
        handleCancel={() => setModalVisible(false)}
      />
    </PageContainer>
  );
};

export default BasicLayout;
