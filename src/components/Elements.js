import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../styles';

export const Card = ({
  children,
  shadow = false,
  fill = false,
  noMargin = false,
  color = '',
}) => {
  let cardStyle = { ...styles.card };
  if (shadow)
    cardStyle = { ...cardStyle, ...styles.cardShadow };
  if (fill)
    cardStyle = { ...cardStyle, flex: 1 };
  if (noMargin)
    cardStyle = { ...cardStyle, marginHorizontal: 0 };
  if (color)
    cardStyle = { ...cardStyle, backgroundColor: color }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
}

export const TextField = ({
  adjacent,
  password = false,
  label,
  labelText = label,
  placeholder = '',
  annotation,
  values,
  handleChange
}) => {
  let fieldStyle = { ...styles.field, marginBottom: 12 };
  if (adjacent == 'first')
    fieldStyle = { ...fieldStyle, flex: 1, marginRight: 12 };
  else if (adjacent == 'last')
    fieldStyle = { ...fieldStyle, flex: 1 };

  return (
    <View style={fieldStyle}>
      <Text style={styles.label}>{labelText}</Text>
      <View style={styles.inputbox}>
        <TextInput
          styles={styles.input}
          placeholder={placeholder}
          defaultValue={values[label]}
          onChangeText={handleChange(label)}
          secureTextEntry={password} />
      </View>
      {annotation &&
        (<Text style={styles.fieldAnnotation}>{annotation}</Text>)
      }
    </View>
  );
}

export const DateField = ({
  adjacent,
  label,
  labelText = label,
  annotation,
  values,
  handleChange
}) => {
  const [show, setShow] = useState(false);
  const date = values.birthday ? new Date(values.birthday) : null;

  useEffect(() => { setShow(false) })

  const onChange = (event, selectDate) => {
    if (selectDate) {
      const handle = handleChange(label);

      handle(selectDate.toLocaleDateString());
    }
  }

  let fieldStyle = { ...styles.field, marginBottom: 12 };
  if (adjacent == 'first')
    fieldStyle = { ...fieldStyle, flex: 1, marginRight: 12 };
  else if (adjacent == 'last')
    fieldStyle = { ...fieldStyle, flex: 1 };

  return (
    <View style={fieldStyle}>
      <Text style={styles.label}>{labelText}</Text>
      <TouchableOpacity onPress={() => { setShow(true) }}>
        <View style={{ ...styles.inputbox, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 }}>
          <Text style={{ ...styles.input, flex: 2 }}>{date ? date.toLocaleDateString() : ''}</Text>
          <Icon name='calendar' type='material-community' color='#B5B9DB' />
        </View>
      </TouchableOpacity>
      {annotation &&
        (<Text style={styles.fieldAnnotation}>{annotation}</Text>)}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date : new Date()}
          mode={'date'}
          display="default"
          onChange={onChange}

        />
      )}
    </View>
  );
}

export const CustomButton = ({
  text = 'Submit',
  size = 'normal',
  color = size == 'normal' ? '#00BD6F' : '#B5B9DB',
  handlePress,
  submitting = false,
}) => {
  let buttonStyle = { backgroundColor: color };
  let textStyle = {};
  if (size == 'normal') {
    buttonStyle = { ...buttonStyle, ...styles.bigButton }
    textStyle = styles.bigButtonText;
  }
  else if (size == 'small') {
    buttonStyle = { ...buttonStyle, ...styles.smallButton }
    textStyle = styles.smallButtonText;
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={submitting}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}