import React, { Component } from 'react'
import { View, AsyncStorage, Text, StyleSheet, TouchableOpacity } from 'react-native';

class App extends Component {
  state = {
    item: 'loading'
  }

  async componentDidMount() {
    this.setState({
      item: await AsyncStorage.getItem('mykey')
    })
  }

  //STORING THE DATA IN ASYNC STORAGE
  storeData = async () => {
    try {
      await AsyncStorage.setItem('mykey', 'Coders never quit');
      this.setState({
        item: await AsyncStorage.getItem('mykey')
      })
    }
    catch (error) {
      console.log(error)
    }
    console.log(this.state)
  }

  //DELETING THE DATA PRESENT IN THE ASYNC STORAGE
  deleteData = async () => {
    try {
      await AsyncStorage.removeItem('mykey', async => {
        console.log('Deleted')
        this.setState({
          item: AsyncStorage.getItem('mykey')
        })
      });
    }
    catch (error) {
      console.log(error)
    }
    console.log(this.state)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.storeData}>
          <Text style={styles.buttonText}>GET DATA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.deleteData}>
          <Text style={styles.buttonText}>DELETE DATA</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#0984e3',
    paddingVertical: 10,
    paddingLeft:20,
    height: 40,
    alignSelf:'auto'
  },
  buttonText: {
    textAlign: 'center',
    color: 'snow',
    fontWeight: '700'
  },
})

export default App