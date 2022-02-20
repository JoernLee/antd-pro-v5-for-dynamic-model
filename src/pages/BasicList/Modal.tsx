import { Form, Modal as AntdModal } from 'antd';
import { useRequest } from 'umi';
import { useEffect } from 'react';
import FormBuilder from '@/pages/BasicList/builder/FormBuilder';
import ActionBuilder from '@/pages/BasicList/builder/ActionBuilder';

const Modal = ({
  visible,
  uri,
  handleCancel,
}: {
  visible: boolean;
  uri: string;
  handleCancel: () => void;
}) => {
  const init = useRequest<{ data: FormAPI.Data }>(uri);

  useEffect(() => {
    if (visible) {
      init.run();
    }
  }, [visible]);

  return (
    <div>
      <AntdModal
        title={init?.data?.page?.title}
        visible={visible}
        footer={ActionBuilder(init?.data?.layout?.actions[0].data)}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          {FormBuilder(init?.data?.layout?.tabs[0].data)}
        </Form>
      </AntdModal>
    </div>
  );
};

export default Modal;
