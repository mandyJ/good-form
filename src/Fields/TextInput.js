import React, { Component } from 'react';
import "./TextInput.css";

const englishLettersOnly = /^[A-Za-z]+$/;

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = { value: '', error: false }
  }

  onChange(e) {
    const { value } = e.target;
    const { onChange, required } = this.props;

    let error;
    if(required || value.length > 0) {
      error = !englishLettersOnly.test(value);
    }

    this.setState({value, error});
    onChange({value, error});
  }

  render() {
    const { value, error } = this.state;

    return (
      <input
        type='text'
        value={value}
        onChange={this.onChange}
        className={error ? 'error' : null}
      />
    )
  }
}

export default TextInput;