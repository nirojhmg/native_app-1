import React, { PureComponent } from 'react';
import { TextInput, StyleSheet,View } from 'react-native';
import {Header} from 'react-native-elements';
class Input extends PureComponent {
  _onChangeText = text => {
    this.props.onChangeValue(this.props.name, text);
  };

  
  render() {
    const { onChangeValue, name, ...rest } = this.props;
    return (
      <TextInput
        style={styles.root}
        {...rest}
        onChangeText={this._onChangeText}
      />
    );
  }
}


const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f4f9f4',
    width: '90%',
    height: 45,
    paddingHorizontal: 16,
    borderRadius: 6
  },
});

export default Input;