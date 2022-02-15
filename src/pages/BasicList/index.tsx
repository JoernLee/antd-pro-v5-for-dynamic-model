import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Pagination, Row, Table, Card, Space } from 'antd';
import styles from './index.less';

const BasicLayout = () => {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

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
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        {afterTableLayout()}
      </Card>
      {batchToolBar()}
    </PageContainer>
  );
};

export default BasicLayout;
