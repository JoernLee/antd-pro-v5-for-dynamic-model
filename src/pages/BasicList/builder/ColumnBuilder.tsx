import moment from 'moment';
import { Space, Tag } from 'antd';
import ActionBuilder from '@/pages/BasicList/builder/ActionBuilder';

const ColumnBuilder = (columns: BasicListAPI.TableColumn[] | undefined) => {
  const idCol: BasicListAPI.TableColumn[] = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
  ];
  const result: BasicListAPI.TableColumn[] = [];
  (columns || []).forEach((column: BasicListAPI.TableColumn) => {
    if (!column.hideInColumn) {
      switch (column?.type) {
        case 'datetime':
          column.render = (value: any) => moment(value).format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'switch':
          column.render = (value: any) => {
            // 根据当前项数据value找到对应option内容
            const option = column.data?.find((item) => item.value === value);
            return <Tag color={value ? 'blue' : 'red'}>{option?.title}</Tag>;
          };
          break;
        case 'actions':
          column.render = () => {
            return <Space>{ActionBuilder(column.actions)}</Space>;
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
