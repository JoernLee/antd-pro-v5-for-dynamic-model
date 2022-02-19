import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Pagination, Row, Table, Card, Space } from 'antd';
import styles from './index.less';
import { useRequest } from 'umi';
import { useEffect, useState } from 'react';

const BasicLayout = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const init = useRequest<{ data: BasicListAPI.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${perPage}`,
  );

  useEffect(() => {
    init.run();
  }, [page, perPage]);

  const onPaginationChange = (_page: number, _pageSize: number) => {
    setPage(_page);
    setPerPage(_pageSize);
  };

  const searchLayout = () => {};

  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Space>
            <Button type={'primary'}>Add</Button>
            <Button type={'primary'}>Add</Button>
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

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          dataSource={init?.data?.dataSource}
          columns={init?.data?.layout?.tableColumn.filter((item: any) => !item.hideInColumn)}
          pagination={false}
        />
        {afterTableLayout()}
      </Card>
      {batchToolBar()}
    </PageContainer>
  );
};

export default BasicLayout;
