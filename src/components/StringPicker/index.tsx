import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Dialog,
  Portal,
  Searchbar,
  SearchbarProps,
} from "react-native-paper";
import styles from "./styles";

interface StringPickerProps extends SearchbarProps {
  options: string[];
}

export default function StringPicker({ options, ...props }: StringPickerProps) {
  const [open, setOpen] = useState<boolean>(false);

  const hide = () => setOpen(false);

  const handlePress = (option: string) => () => {
    props.onChangeText?.(option);
    hide();
  };

  return (
    <>
      <Searchbar
        {...props}
        onPressIn={(e) => {
          e.preventDefault();
          if (props.editable !== false) setOpen(true);
        }}
        showSoftInputOnFocus={false}
      />
      <Portal>
        <Dialog visible={open} onDismiss={hide}>
          <ScrollView style={styles.dialog}>
            {options.map((option) => (
              <Button
                key={option}
                style={styles.opcao}
                onPress={handlePress(option)}
              >
                {option}
              </Button>
            ))}
          </ScrollView>
        </Dialog>
      </Portal>
    </>
  );
}
