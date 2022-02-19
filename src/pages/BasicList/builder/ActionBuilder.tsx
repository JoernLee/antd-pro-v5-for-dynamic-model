import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';

const ActionBuilder = (actions: BasicListAPI.Action[] | undefined) => {
  return (actions || []).map((action: any) => {
    if (action.component === 'button') {
      // 避免类型错误且负责
      return <Button type={action.type as ButtonType}>{action.text}</Button>;
    }
    return null;
  });
};

export default ActionBuilder;
