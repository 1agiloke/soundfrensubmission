import React,{Component, Fragment} from 'react';
import {View, ScrollView, Text, ImageBackground, TouchableOpacity, Alert, FlatList, Platform, KeyboardAvoidingView, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

export default class SubmissionScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            bgImg: null,
            pImg: null,
            title: '',
            dtpDate: new Date(),
            showDtp: false,
            startDate: null,
            endDate: null,
            location: '',
            dateToEdit: '',
            requirements: ['Memiliki lagu ciptaan sendiri'],
            benefits: ['Kontrak bermain selama satu tahun'],
            dataComplete: false
        }
    }

    setDate = (event, date)=>{
        let {dateToEdit} = this.state;
        if(dateToEdit=='start') this.setState({startDate: date, showDtp: false});
        else if(dateToEdit=='end') this.setState({endDate: date, showDtp: false});
        else {
            this.setState({showDtp: false})
        }
        this.checkCompletion();
    }

    addRequirement = () => {
        let requirements = [].concat(this.state.requirements);
        if(!requirements[requirements.length-1]){
            Alert.alert('Caution', 'Please complete previous requirement first')
            return;
        }
        requirements.push('');
        this.setState({requirements})
    }

    addBenefit = () => {
        let benefits = [].concat(this.state.benefits);
        if(!benefits[benefits.length-1]){
            Alert.alert('Caution', 'Please complete previous benefit first')
            return;
        }
        benefits.push('');
        this.setState({benefits})
    }

    checkCompletion = async() => {
        let {title, startDate, endDate, location, description, requirements, benefits} = this.state;
        if(title && startDate && endDate && location && description && requirements && requirements.length && requirements[0] && benefits && benefits.length && benefits[0]) this.setState({dataComplete: true});
    }

    submit = () => {
        let {title, startDate, endDate, location, description, requirements, benefits, dataComplete} = this.state;
        if(dataComplete){
            Alert.alert('Info', 'Submission Created');
        } else{
            // Alert.alert('Caution', 'Please complete your submission data!');
        }
    }

    pickBGImage = () => {
        ImagePicker.launchImageLibraryAsync().then(({cancelled, uri, width, height, type})=>{
            if(!cancelled && uri){
                this.setState({bgImg: {uri}});
            }
        })
    }

    pickProfileImage = () => {
        ImagePicker.launchImageLibraryAsync().then(({cancelled, uri, width, height, type})=>{
            if(!cancelled && uri){
                this.setState({pImg: {uri}});
            }
        })
    }

    render(){
        let {bgImg, pImg, title, dtpDate, showDtp, startDate, endDate, requirements, benefits, dataComplete} = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" enabled>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {
                        bgImg ? (
                            <ImageBackground source={bgImg} style={{width: wp(100), height: wp(50)}} >

                            </ImageBackground>
                        ) : (
                            <TouchableOpacity style={{width: wp(100), height: wp(50), backgroundColor: '#D8D8D8'}}
                                onPress={this.pickBGImage}
                            >
                                <View 
                                    style={{alignItems: 'center', justifyContent: 'center', marginLeft: 14, width: 40, height: 40, borderRadius: 20, position: 'absolute', bottom: 24, right: 18}}
                                >
                                    <MaterialIcons name='add-a-photo' style={{fontSize: 34, color: '#8F8F8F'}}/>
                                </View>   
                            </TouchableOpacity>
                        )
                    }
                    <View style={[]}>
                        <View style={{paddingHorizontal: 18, borderBottomWidth: 5, borderBottomColor: '#D8D8D8', paddingBottom: 18}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: -wp(10), top: -wp(15)}}>
                                {
                                    pImg ? (
                                        <Image style={{backgroundColor: '#8F8F8F', width: wp(30), height: wp(30), justifyContent: 'center', alignItems: 'center', borderRadius: wp(2)}} source={pImg}/>
                                    ) : (
                                        <TouchableOpacity style={{backgroundColor: '#8F8F8F', width: wp(30), height: wp(30), justifyContent: 'center', alignItems: 'center', borderRadius: wp(2)}}
                                            onPress={this.pickProfileImage}
                                        >
                                            <MaterialIcons name='add-a-photo' style={{fontSize: 24, color: '#FFF'}}/>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                            <View>
                                <Input
                                    maxLength={40}
                                    placeholder='Submission Title'
                                    placeholderTextColor='#D8D8D8'
                                    errorStyle={{ color: '#8F8F8F' }}
                                    errorMessage={title.length + ' / 40'}
                                    onChangeText={(title)=>{this.setState({title}); this.checkCompletion()}}
                                />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Input
                                    ref={(ref)=>this.startDateInput=ref}
                                    containerStyle={{flex: 1}}
                                    placeholder='Start Date'
                                    placeholderTextColor='#D8D8D8'
                                    errorStyle={{ color: '#8F8F8F' }}
                                    errorMessage={'Date of Submission'}
                                    onChangeText={(title)=>this.setState({title})}
                                    value={startDate && startDate.toLocaleDateString()}
                                    onFocus={()=>{
                                        this.startDateInput && this.startDateInput.blur();
                                        this.setState({showDtp: true, dateToEdit: 'start'})
                                        console.log('attempt to show picker', this.state.showDtp)
                                    }}
                                />
                                <Input
                                    ref={(ref)=>this.endDateInput=ref}
                                    containerStyle={{flex: 1}}
                                    placeholder='End Date'
                                    placeholderTextColor='#D8D8D8'
                                    errorStyle={{ color: '#8F8F8F' }}
                                    errorMessage={'Deadline'}
                                    value={endDate && endDate.toLocaleDateString()}
                                    onFocus={()=>{
                                        this.endDateInput && this.endDateInput.blur();
                                        this.setState({showDtp: true, dateToEdit: 'end'})
                                    }}
                                />
                            </View>
                            <View>
                                <Input
                                    placeholder='Studio, Cafe, or another cool place'
                                    placeholderTextColor='#D8D8D8'
                                    errorStyle={{ color: '#8F8F8F' }}
                                    errorMessage={'Locaiton of Event'}
                                    onChangeText={(location)=>{this.setState({location}); this.checkCompletion()}}
                                />
                            </View>
                        </View>
                        <View style={{paddingHorizontal: 18, borderBottomWidth: 5, borderBottomColor: '#D8D8D8', paddingBottom: 18}}>
                            <FlatList 
                                style={{paddingTop: 18}}
                                scrollEnabled={false}
                                data={requirements}
                                renderItem={({item, index})=>{
                                    return (
                                        <View>
                                            <Input
                                                maxLength={40}
                                                placeholder='Fill requirement here'
                                                placeholderTextColor='#D8D8D8'
                                                errorStyle={{ color: '#8F8F8F' }}
                                                errorMessage={'Requirement '+(index+1)}
                                                onChangeText={(text)=>{
                                                    let _requirements = [].concat(this.state.requirements);
                                                    _requirements[index] = text;
                                                    this.setState({requirements: _requirements});
                                                    this.checkCompletion();
                                                }}
                                                value={item}
                                            />
                                        </View>
                                    )
                                }}
                                keyExtractor={(item,index)=>index.toString()}
                            />
                            <View style={{paddingLeft: 18, alignItems: 'flex-start'}}>
                                <TouchableWithoutFeedback onPress={this.addRequirement} >
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Ionicons name={Platform.select({ios: 'ios-add-circle-outline', android: 'md-add-circle-outline'})} style={{ color: '#3B84E4', fontSize: 24}}/>
                                        <Text style={{fontWeight: 'bold', color: '#3B84E4', marginLeft: 12}}>Add More Requirement</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={{paddingHorizontal: 18, borderBottomWidth: 5, borderBottomColor: '#D8D8D8', paddingVertical: 18}}>
                            <View>
                                <Input
                                    placeholder='The Submission gives you the best opportunities'
                                    placeholderTextColor='#D8D8D8'
                                    errorStyle={{ color: '#8F8F8F' }}
                                    errorMessage={'Description of submission'}
                                    onChangeText={(description)=>{
                                        this.setState({description});
                                        this.checkCompletion();
                                    }}
                                    multiline={true}
                                    numberOfLines={4}
                                    inputContainerStyle={{borderWidth: 1, borderRadius: 5, padding: 4}}
                                    inputStyle={{textAlignVertical: 'top'}}
                                />
                            </View>
                        </View>
                        <View style={{paddingHorizontal: 18, paddingBottom: 18}}>
                            <FlatList 
                                style={{paddingTop: 18}}
                                scrollEnabled={false}
                                data={benefits}
                                renderItem={({item, index})=>{
                                    return (
                                        <View>
                                            <Input
                                                placeholder='Fill benefit here'
                                                placeholderTextColor='#D8D8D8'
                                                errorStyle={{ color: '#8F8F8F' }}
                                                errorMessage={'Benefit '+(index+1)}
                                                onChangeText={(text)=>{
                                                    let _benefits = [].concat(this.state.benefits);
                                                    _benefits[index] = text;
                                                    this.setState({benefits: _benefits});
                                                    this.checkCompletion();
                                                }}
                                                value={item}
                                            />
                                        </View>
                                    )
                                }}
                                keyExtractor={(item,index)=>index.toString()}
                            />
                            <View style={{paddingLeft: 18, alignItems: 'flex-start'}}>
                                <TouchableWithoutFeedback onPress={this.addBenefit} >
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Ionicons name={Platform.select({ios: 'ios-add-circle-outline', android: 'md-add-circle-outline'})} style={{ color: '#3B84E4', fontSize: 24}}/>
                                        <Text style={{fontWeight: 'bold', color: '#3B84E4', marginLeft: 12}}>Add More Benefit</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    showDtp && <DateTimePicker mode='date' 
                        value={dtpDate}
                        onChange={this.setDate}
                    />
                }
                <View style={{bottom: 0}}>
                    <Button
                        buttonStyle={[{height: 46}, dataComplete?{backgroundColor: '#3B84E4'}:{backgroundColor: '#D5D5D5'}]}
                        title={'Create'}
                        onPress={this.submit}
                    />
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}