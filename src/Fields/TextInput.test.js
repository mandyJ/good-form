import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import Enzyme, { shallow } from 'enzyme';
import { spy } from 'sinon';

import TextInput from './TextInput';

Enzyme.configure({ adapter: new Adapter() });

const fillInTextField = (field, value) => {
  field.simulate("change", { target: {value}});
};

describe('TextInput', () => {
  let textInput;

  it('displays input value', () => {
    textInput = shallow(<TextInput onChange={() => {}}/>);
    fillInTextField(textInput, 'bob');
    expect(textInput.find("input").props().value).toEqual('bob');
  });

  describe('when required', () => {
    let onChangeSpy;
    beforeEach(() => {
      onChangeSpy = spy();
      textInput = shallow(<TextInput onChange={onChangeSpy} required/>);
    });
    describe('valid input', () => {
      beforeEach(() => {
        fillInTextField(textInput, 'bob');
      });
      it('does not show error', () => {
        expect(textInput.find("input.error").exists()).toEqual(false);
      });
      it('calls callback with value and error false', () => {
        expect(onChangeSpy.calledWithExactly({value: 'bob', error: false})).toEqual(true);
      });
    });
    describe('invalid input', () => {
      describe('non-english-letter value', () => {
        beforeEach(() => {
          fillInTextField(textInput, 'b0b');
        });
        it('shows error', () => {
          expect(textInput.find("input.error").exists()).toEqual(true);
        });
        it('calls callback with value and error true', () => {
          expect(onChangeSpy.calledWithExactly({value: 'b0b', error: true})).toEqual(true);
        });
      });
      describe('empty value', () => {
        beforeEach(() => {
          fillInTextField(textInput, '');
        });
        it('shows error', () => {
          expect(textInput.find("input.error").exists()).toEqual(true);
        });
        it('calls callback with value and error true', () => {
          expect(onChangeSpy.calledWithExactly({value: '', error: true})).toEqual(true);
        });
      })
    });
  });

  describe('when not required', () => {
    beforeEach(() => {
      textInput = shallow(<TextInput onChange={() => {}}/>);
    });
    describe('valid input', () => {
      describe('empty value', () => {
        it('does not show error', () => {
          fillInTextField(textInput, '');
          expect(textInput.find("input.error").exists()).toEqual(false);
        });
      });
    });
    describe('invalid input', () => {
      describe('non-english-letter value', () => {
        it('shows error', () => {
          fillInTextField(textInput, 'b0b');
          expect(textInput.find("input.error").exists()).toEqual(true);
        });
      });
    });
  })
});