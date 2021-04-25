import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campers: 1,
            hikeIn: false,
            showModal: false, 
            date: new Date()
        };
    }

    static navigationOptions = {
        title: 'Reserver Campsite'
    }

    // toggleModal() {
    //     this.setState({showModal: !this.state.showModal});
    // }

    handleReservation(){
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Begin Search?', 
            `Number of Campers:` + this.state.campers + `\n`+ `\n` + 
            `Hike-In? ${this.state.hikeIn ? 'Yes' : 'No'}` + `\n` + `\n` + 
            `Date:` + this.state.date.toLocaleDateString('en-Us'),
            
            [
                
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => this.resetForm()
                },
            ],
            { cancelable: false }
            
          

        )
        // this.toggleModal();
    }

        resetForm() {
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalender: false,
            showModal: false
        });
    }

    
    render() {
        return (
        <ScrollView>
                <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLable}>Number of Campers</Text>
                    <Picker
                        style={styles.formItem} 
                        selectedValue={this.state.campers}
                        onValueChange={itemValue => this.setState({campers: itemValue})}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLable}>Hike-In?</Text>
                    <Switch
                    style={styles.formItem} 
                    value={this.state.hikeIn}
                    trackColor={{true: '#5637DD', false: null}}
                    onValueChange={value => this.setState({hikeIn: value})}
                />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLable}>Date</Text>
                    <Button onPress={() => 
                        this.setState({showCalender: !this.state.showCalender})
                    } 
                        title={this.state.date.toLocaleDateString('en-Us')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                />
                </View>
                {this.state.showCalender && (
                    <DateTimePicker
                        style={styles.formItem} 
                        value={this.state.date} 
                        mode={'date'}
                        display='default'
                        onChange={(event, selectedDate) => {
                            selectedDate && this.setState({date: selectedDate, showCalender: false})
                        }}
                    />
                )}
                <View style={styles.formRow}>
                    <Button 
                        onPress={() => this.handleReservation()}
                        title='Search'
                        color='#5637DD'
                        // accessibilityLabel = 'Tap me to search for available campsites to reserve'
                    />
                </View>
                {/* <Modal 
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Search Campsite Reservations</Text>
                        <Text style={styles.modalText}>Number of Campers: {this.state.campers}</Text>
                        <Text style={styles.modalText}> Hike-In?: {this.state.hikeIn ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date: {this.state.date.toLocaleDateString('en-US')}</Text>
                        <Button 
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#5637DD'
                            title='Close'                
        
                        />
                    </View>
                // </Modal> */}
                </Animatable.View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLable: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 28,
        margin: 10
    }
});

export default Reservation;