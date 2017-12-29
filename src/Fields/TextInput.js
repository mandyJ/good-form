import React, { Component } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = { value: "" }
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({value});
  }

  render() {
    const { value } = this.state;

    return (
      <input
        type="text"
        value={value}
        onChange={this.onChange}
      />
    )
  }
}

export default TextInput;