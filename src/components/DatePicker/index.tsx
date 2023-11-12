import {
  View,
  Text,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import theme from "../../config/theme";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DatePicker({ ...textInputProps }: TextInputProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setOpen(false);
    if (selectedDate) {
      textInputProps?.onChangeText?.(
        selectedDate.toLocaleDateString?.("pt-BR")
      );
      setDate(selectedDate);
    }

    return (
      <View>
        <TextInput
          right={
            <TextInput.Icon icon="calendar" onPress={() => setOpen(!open)} />
          }
          mode="outlined"
          dense
          value={date?.toLocaleDateString("pt-BR")}
          showSoftInputOnFocus={false}
          placeholder="mm/dd/yyyy"
          outlineColor={theme.colors.primary}
          onPressIn={(evento: NativeSyntheticEvent<NativeTouchEvent>) => {
            evento.preventDefault();
            setOpen(true);
          }}
          {...textInputProps}
        />
        {open && (
          <DateTimePickerModal
            isVisible={open}
            mode="date"
            onConfirm={() => null}
            onCancel={() => null}
          />
        )}
      </View>
    );
  };
}
