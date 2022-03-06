import moment from 'moment';
import { Space, Tag } from 'antd';
import ActionBuilder from '@/pages/BasicList/builder/ActionBuilder';

const ColumnBuilder = (
  columns: BasicListAPI.Field[] | undefined,
  actionHandler: BasicListAPI.ActionHandler,
) => {
  const idCol: BasicListAPI.Field[] = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      sorter: true,
    },
  ];
  const result: BasicListAPI.Field[] = [];
  (columns || []).forEach((column: BasicListAPI.Field) => {
    if (!column.hideInColumn) {
      switch (column?.type) {
        case 'datetime':
          column.render = (value: any) => moment(value).format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'switch':
          column.render = (value: any) => {
            // 根据当前项数据value找到对应option内容
            const option = column.data?.find((item: any) => item.value === value);
            return <Tag color={value ? 'blue' : 'red'}>{option?.title}</Tag>;
          };
          break;
        case 'actions':
          column.render = (value: any, record: any) => {
            return <Space>{ActionBuilder(column.actions, actionHandler, false, record)}</Space>;
          };
          break;
        default: {
        }
      }
      result.push(column);
    }
  });
  return idCol.concat(result);
};

export default ColumnBuilder;
