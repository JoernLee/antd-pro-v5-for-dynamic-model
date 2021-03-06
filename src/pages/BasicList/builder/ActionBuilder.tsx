import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';

const ActionBuilder = (
  actions: BasicListAPI.Action[] | undefined,
  actionHandler: BasicListAPI.ActionHandler,
  loading = false,
  record = {},
) => {
  return (actions || []).map((action: any) => {
    if (action.component === 'button') {
      // 避免类型错误且负责
      return (
        <Button
          key={action.text}
          type={action.type as ButtonType}
          onClick={() => actionHandler && actionHandler(action, record)}
          loading={loading}
          className={`btn-${action.text.toLowerCase().replace(' ', '-')}`}
        >
          {action.text}
        </Button>
      );
    }
    return null;
  });
};

export default ActionBuilder;
