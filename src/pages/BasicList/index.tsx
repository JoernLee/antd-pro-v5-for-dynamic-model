import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Pagination, Row, Table, Card, Space } from 'antd';
import styles from './index.less';
import { useRequest } from 'umi';

const BasicLayout = () => {
  const init = useRequest<{ data: BasicListAPI.Data }>(
    'https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd',
  );

  function searchLayout() {}

  function beforeTableLayout() {
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
  }

  function afterTableLayout() {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Pagination />
        </Col>
      </Row>
    );
  }

  function batchToolBar() {
    // 悬浮操作区域
  }

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
