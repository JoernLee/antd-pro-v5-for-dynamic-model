import { Modal as AntdModal } from 'antd';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { ArrayTable, Checkbox, Form, FormItem, Input, Select, Switch } from '@formily/antd';

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
  handleCancel,
  handleSubmit,
}: {
  visible: boolean;
  handleCancel: (reload?: boolean) => void;
  handleSubmit: (values: any) => void;
}) => {
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
            <SchemaField.Array x-component="ArrayTable" name="fields" x-decorator="FormItem">
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
