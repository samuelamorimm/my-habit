import { View, Text,StyleSheet } from "react-native";

export default function Header(props){
  return(
    <View style={styles.header}>
      <Text style={styles.titulo}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,

  },
  titulo: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  }
})