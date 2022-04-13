import { Modal as AntdModal } from 'antd';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { ArrayTable, Checkbox, Form, FormItem, Input, Select, Switch } from '@formily/antd';
import { useEffect } from 'react';

const form = createForm();
const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    ArrayTable,
    Switch,
    Select,
    Checkbox,
  },
});

const Modal = ({
  visible,
  modalState,
  handleCancel,
  handleSubmit,
}: {
  visible: boolean;
  modalState: Record<string, any>;
  handleCancel: (reload?: boolean) => void;
  handleSubmit: (values: any) => void;
}) => {
  useEffect(() => {
    form.reset('*', {
      forceClear: true,
    });
    // switch类型的表单需要隐藏按钮并设置初始值 - 只可以有两个配置项
    if (modalState.type === 'switch') {
      form.setFieldState('data.sortColumn', (state) => {
        state.visible = false;
      });
      form.setFieldState('data.operationColumn', (state) => {
        state.visible = false;
      });
      form.setFieldState('data.addition', (state) => {
        state.visible = false;
      });
      form.setFormState((state) => {
        state.initialValues = {
          data: [
            {
              title: 'Enabled',
              value: 1,
            },
            {
              title: 'Disabled',
              value: 0,
            },
          ],
        };
      });
    } else {
      form.setFieldState('data.sortColumn', (state) => {
        state.visible = true;
      });
      form.setFieldState('data.operationColumn', (state) => {
        state.visible = true;
      });
      form.setFieldState('data.addition', (state) => {
        state.visible = true;
      });
    }

    if (modalState.values && Object.keys(modalState.values).length > 0) {
      form.setFormState((state) => {
        state.values = {
          data: modalState.values,
        };
      });
    }
  }, [modalState]);

  return (
    <div>
      <AntdModal
        visible={visible}
        onCancel={() => handleCancel()}
        onOk={() => {
          form.submit(handleSubmit);
        }}
        maskClosable={false}
        forceRender
        focusTriggerAfterClose={false}
      >
        <Form form={form}>
          <SchemaField>
            <SchemaField.Array x-component="ArrayTable" name="data" x-decorator="FormItem">
              <SchemaField.Object>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: 'Sort', width: 60, align: 'center' }}
                  name="sortColumn"
                >
                  <SchemaField.Void x-component="ArrayTable.SortHandle" x-decorator="FormItem" />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: 'Title' }}
                >
                  <SchemaField.String name="title" x-component="Input" x-decorator="FormItem" />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: 'Value' }}
                >
                  <SchemaField.String name="value" x-component="Input" x-decorator="FormItem" />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: 'Operations', width: 100, align: 'center' }}
                  name="operationColumn"
                >
                  <SchemaField.Void x-component="ArrayTable.Remove" />
                  <SchemaField.Void x-component="ArrayTable.MoveUp" />
                  <SchemaField.Void x-component="ArrayTable.MoveDown" />
                </SchemaField.Void>
              </SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Addition"
                x-component-props={{ title: 'Add' }}
              />
            </SchemaField.Array>
          </SchemaField>
        </Form>
      </AntdModal>
    </div>
  );
};

export default Modal;
