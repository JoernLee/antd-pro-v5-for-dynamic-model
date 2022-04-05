import { PageContainer } from '@ant-design/pro-layout';
import 'antd/dist/antd.css';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { ArrayTable, Checkbox, Form, FormItem, Input, Select, Switch } from '@formily/antd';
import { Button, Card, Space } from 'antd';
import { useMemo } from 'react';
import * as enums from './enums';
import { schemaExample } from './initialValues';

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
  const onSubmitHandler = (values: any) => {
    console.log(values);
  };

  const form = useMemo(
    //这个createForm本来应该是写在组件上面的。如果想移动到组件内部，貌似用这个useMemo来搞，很神奇的写法
    () =>
      createForm({
        effects: () => {},
        initialValues: schemaExample,
      }),
    [],
  );

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
          <Button
            type={'primary'}
            onClick={() => {
              form.submit(onSubmitHandler); //很神奇的写法吧
            }}
          >
            Submit
          </Button>
        </Space>
      </Form>
    </PageContainer>
  );
};

export default Index;
