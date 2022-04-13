import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import 'antd/dist/antd.css';
import { createForm, isField, onFieldChange, onFieldReact } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { ArrayTable, Checkbox, Form, FormItem, Input, Select, Switch } from '@formily/antd';
import { Button, Card, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import * as enums from './enums';
import { schemaExample } from './initialValues';
import Modal from '@/pages/ModalDesign/Modal';
import { useSetState } from 'ahooks';

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    ArrayTable,
    Switch,
    Select,
    Checkbox,
    Button,
  },
});

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useSetState({
    type: '',
    values: {},
  });
  const [currentFieldPath, setCurrentFieldPath] = useState('');

  const form = useMemo(
    //这个createForm本来应该是写在组件上面的。如果想移动到组件内部，貌似用这个useMemo来搞，很神奇的写法
    () =>
      createForm({
        effects: () => {
          onFieldReact('*.*.uri', (field) => {
            if (isField(field)) {
              //为啥要isField? 见https://github.com/alibaba/formily/discussions/1257
              field.value = field.value?.replace('admins', field.query('routeName').get('value'));
            }
          });
          onFieldReact('fields.*.data', (field) => {
            // 当同行type选择为switch或radio时enable Data按钮，弹窗配置字段
            if (isField(field)) {
              const typeValue = field.query('.type').get('value'); //这里query那个('.type')直接就是取本行的type，很神奇的写法
              const attrValue = typeValue === 'switch' || typeValue === 'radio';
              field.editable = attrValue;
              field.required = attrValue;
            }
          });
          onFieldChange('fields.*.data', ['active'], (field) => {
            if (isField(field) && field.active) {
              setCurrentFieldPath(field.path.toString()); //一定注意，field.path在v2里面不是字符串了，要toString()
              setModalState({
                values: field.value,
                type: field.query('.type').get('value'),
              });
              field.active = false;
            }
          });
        },
        initialValues: schemaExample,
      }),
    [],
  );

  useEffect(() => {
    if (modalState.type) {
      setModalVisible(true);
    }
  }, [modalState.type]);

  const onSubmitHandler = (values: any) => {
    form.setFieldState(currentFieldPath, (state) => {
      state.value = values.data;
    });
    setModalVisible(false);
    setModalState({ type: '', values: {} });
  };

  const onModalCancel = () => {
    setModalVisible(false);
    setModalState({
      type: '',
      values: {},
    });
  };

  return (
    <PageContainer>
      <Form form={form}>
        <Space direction={'vertical'} style={{ width: '100%' }}>
          <Card title={'Basic'} size={'small'}>
            <SchemaField>
              <SchemaField.String
                name="routeName"
                title="Route Name"
                x-component="Input"
                x-decorator="FormItem"
              />
            </SchemaField>
          </Card>
          <Card title="Fields" size="small">
            <SchemaField>
              <SchemaField.Array x-component="ArrayTable" name="fields" x-decorator="FormItem">
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Sort', width: 60, align: 'center' }}
                  >
                    <SchemaField.Void x-component="ArrayTable.SortHandle" x-decorator="FormItem" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Name' }}
                  >
                    <SchemaField.String name="name" x-component="Input" x-decorator="FormItem" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Title' }}
                  >
                    <SchemaField.String name="title" x-component="Input" x-decorator="FormItem" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Type' }}
                  >
                    <SchemaField.String
                      name="type"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.fieldType}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Data', width: 60, align: 'center' }}
                  >
                    <SchemaField.String
                      name="data"
                      x-component="Button"
                      x-decorator="FormItem"
                      x-content="Data"
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      title: 'List Sorter',
                      width: 90,
                      align: 'center',
                    }}
                  >
                    <SchemaField.Boolean
                      name="listSorter"
                      x-component="Checkbox"
                      x-decorator="FormItem"
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      title: 'Hide in Column',
                      dataIndex: 'hideInColumn',
                      width: 90,
                      align: 'center',
                    }}
                  >
                    <SchemaField.Boolean
                      name="hideInColumn"
                      x-component="Checkbox"
                      x-decorator="FormItem"
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      title: 'Edit Disabled',
                      dataIndex: 'editDisabled',
                      width: 90,
                      align: 'center',
                    }}
                  >
                    <SchemaField.Boolean
                      name="editDisabled"
                      x-component="Checkbox"
                      x-decorator="FormItem"
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Operations', width: 100, align: 'center' }}
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
          </Card>
          <Card title="List Action" size="small">
            <SchemaField>
              <SchemaField.Array x-component="ArrayTable" name="listAction" x-decorator="FormItem">
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Sort', width: 60, align: 'center' }}
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
                    x-component-props={{ title: 'Type' }}
                  >
                    <SchemaField.String
                      name="type"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonType}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Action', width: 200 }}
                  >
                    <SchemaField.String
                      name="action"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonAction}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Uri' }}
                  >
                    <SchemaField.String name="uri" x-component="Input" x-decorator="FormItem" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Method' }}
                  >
                    <SchemaField.String
                      name="method"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.httpMethod}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Operations', width: 100, align: 'center' }}
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
          </Card>

          <Card title="Add Action" size="small">
            <SchemaField>
              <SchemaField.Array x-component="ArrayTable" name="addAction" x-decorator="FormItem">
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Sort', width: 60, align: 'center' }}
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
                    x-component-props={{ title: 'Type' }}
                  >
                    <SchemaField.String
                      name="type"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonType}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Action', width: 200 }}
                  >
                    <SchemaField.String
                      name="action"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonAction}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Uri' }}
                  >
                    <SchemaField.String name="uri" x-component="Input" x-decorator="FormItem" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Method' }}
                  >
                    <SchemaField.String
                      name="method"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.httpMethod}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Operations', width: 100, align: 'center' }}
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
          </Card>

          <Card title="Edit Action" size="small">
            <SchemaField>
              <SchemaField.Array x-component="ArrayTable" name="editAction" x-decorator="FormItem">
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Sort', width: 60, align: 'center' }}
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
                    x-component-props={{ title: 'Type' }}
                  >
                    <SchemaField.String
                      name="type"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonType}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Action', width: 200 }}
                  >
                    <SchemaField.String
                      name="action"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonAction}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Uri' }}
                  >
                    <SchemaField.String name="uri" x-component="Input" x-decorator="FormItem" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Method' }}
                  >
                    <SchemaField.String
                      name="method"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.httpMethod}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Operations', width: 100, align: 'center' }}
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
          </Card>

          <Card title="Table Toolbar" size="small">
            <SchemaField>
              <SchemaField.Array
                x-component="ArrayTable"
                name="tableToolbar"
                x-decorator="FormItem"
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Sort', width: 60, align: 'center' }}
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
                    x-component-props={{ title: 'Type' }}
                  >
                    <SchemaField.String
                      name="type"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonType}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Action', width: 200 }}
                  >
                    <SchemaField.String
                      name="action"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonAction}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Uri' }}
                  >
                    <SchemaField.String name="uri" x-component="Input" x-decorator="FormItem" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Method' }}
                  >
                    <SchemaField.String
                      name="method"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.httpMethod}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Operations', width: 100, align: 'center' }}
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
          </Card>

          <Card title="Batch Toolbar" size="small">
            <SchemaField>
              <SchemaField.Array
                x-component="ArrayTable"
                name="batchToolbar"
                x-decorator="FormItem"
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Sort', width: 60, align: 'center' }}
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
                    x-component-props={{ title: 'Type' }}
                  >
                    <SchemaField.String
                      name="type"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonType}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Action', width: 200 }}
                  >
                    <SchemaField.String
                      name="action"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonAction}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Uri' }}
                  >
                    <SchemaField.String name="uri" x-component="Input" x-decorator="FormItem" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Method' }}
                  >
                    <SchemaField.String
                      name="method"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.httpMethod}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Operations', width: 100, align: 'center' }}
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
          </Card>

          <Card title="Batch Toolbar - Trashed" size="small">
            <SchemaField>
              <SchemaField.Array
                x-component="ArrayTable"
                name="batchToolbarTrashed"
                x-decorator="FormItem"
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Sort', width: 60, align: 'center' }}
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
                    x-component-props={{ title: 'Type' }}
                  >
                    <SchemaField.String
                      name="type"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonType}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Action', width: 200 }}
                  >
                    <SchemaField.String
                      name="action"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.buttonAction}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Uri' }}
                  >
                    <SchemaField.String name="uri" x-component="Input" x-decorator="FormItem" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Method' }}
                  >
                    <SchemaField.String
                      name="method"
                      x-component="Select"
                      x-decorator="FormItem"
                      enum={enums.httpMethod}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: 'Operations', width: 100, align: 'center' }}
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
          </Card>
        </Space>
      </Form>
      <FooterToolbar>
        <Button
          type={'primary'}
          onClick={() => {
            form.submit(onSubmitHandler); //很神奇的写法吧
          }}
        >
          Submit
        </Button>
      </FooterToolbar>
      <Modal
        visible={modalVisible}
        modalState={modalState}
        handleCancel={onModalCancel}
        handleSubmit={onSubmitHandler}
      />
    </PageContainer>
  );
};

export default Index;
