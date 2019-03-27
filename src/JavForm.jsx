import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';

import { formValuesShape } from './typeDef';
import CheckableTags from './CheckableTags';
import DynamicFieldSet from './DynamicFieldSet';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    isFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const javCodeError = isFieldTouched('javCode') && getFieldError('javCode');
    const javNameError = isFieldTouched('javName') && getFieldError('javName');
    const tagsError = isFieldTouched('tags') && getFieldError('tags');
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label="JAV Code"
          validateStatus={javCodeError ? 'error' : ''}
          help={javCodeError || ''}
        >
          {getFieldDecorator('javCode', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input JAV Code!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={'JAV Code, e.g. "KAWD-941"; "Movie Number" in www.dmm.co.jp'}
            />,
          )}
        </Form.Item>
        <Form.Item
          label="JAV Name"
          validateStatus={javNameError ? 'error' : ''}
          help={javNameError || ''}
        >
          {getFieldDecorator('javName', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input JAV Name!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={'JAV Name, e.g. "Temptation Pantyhose Slut OL Satomi Yuria"'}
            />,
          )}
        </Form.Item>
        <Form.Item
          label="JAV Tags"
          validateStatus={tagsError ? 'error' : ''}
          help={tagsError || ''}
        >
          {getFieldDecorator('tags', { initialValue: ['family'] })(<CheckableTags />)}
        </Form.Item>
        <Form.Item
          label="JAV Tags"
          validateStatus={tagsError ? 'error' : ''}
          help={tagsError || ''}
        >
          {getFieldDecorator('links', { initialValue: [] })(<DynamicFieldSet />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

CreateForm.propTypes = propTypes;

const WrappedForm = Form.create({
  name: 'jav-form',
  mapPropsToFields({ values }) {
    return {
      javCode: Form.createFormField({
        value: values.javCode,
      }),
      javName: Form.createFormField({
        value: values.javName,
      }),
      tags: Form.createFormField({
        value: values.tags,
      }),
    };
  },
})(CreateForm);
WrappedForm.propTypes = {
  values: formValuesShape.isRequired,
};
WrappedForm.defaultProps = {
  values: {
    /**
     * Use `initialValue` to set the default value to each field in the form
     * when calling `getFieldDecorator()`
     */
    // javCode: '',
    // javName: '',
    // tags: [],
  },
};

export default WrappedForm;
