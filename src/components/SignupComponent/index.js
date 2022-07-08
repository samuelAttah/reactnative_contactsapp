import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../common/Container';
import Input from '../common/Input';
import styles from './styles';
import Message from '../common/Message';
import Toast from '../common/Toast';

const SignupComponent = ({
  form,
  onChange,
  navigation,
  onSubmit,
  errors,
  canSave,
  loading,
  fetchError,
  visibleToast,
  passwordVisibility,
  visiblePassword,
}) => {
  return (
    <Container>
      <Image
        height={70}
        width={70}
        source={require('../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to ContactsApp</Text>
        <Text style={styles.subtitle}>Create a free account</Text>

        {fetchError?.error && (
          <Message
            retry
            danger
            retryFn={onSubmit}
            message={fetchError?.error}
          />
        )}

        <Input
          label="Username"
          onChangeText={value => onChange({name: 'userName', value})}
          placeholder="Enter Username"
          error={errors.userName || fetchError?.username?.[0]}
        />
        <Input
          label="Firstname"
          onChangeText={value => onChange({name: 'firstName', value})}
          placeholder="Enter Firstname"
          error={errors.firstName || fetchError?.first_name?.[0]}
        />
        <Input
          label="Lastname"
          onChangeText={value => onChange({name: 'lastName', value})}
          placeholder="Enter Lastname"
          error={errors.lastName || fetchError?.last_name?.[0]}
        />
        <Input
          label="Email"
          onChangeText={value => onChange({name: 'email', value})}
          placeholder="Enter Email"
          error={errors.email || fetchError?.email?.[0]}
        />
        <Input
          label="Password"
          onChangeText={value => onChange({name: 'password', value})}
          secureTextEntry={visiblePassword}
          placeholder="Enter Password"
          icon={
            <TouchableOpacity onPress={passwordVisibility}>
              <Text>{visiblePassword ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity>
          }
          iconPosition="right"
          error={errors.password}
        />
        <View>
          <Toast visible={visibleToast} message="Successful Registration" />
          <Button
            title={loading ? 'Signing Up' : 'Sign Up'}
            disabled={!canSave}
            onPress={onSubmit}
          />
        </View>
        <View style={styles.createSection}>
          <Text style={styles.infoText}>Already Have an new account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkBtn}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default SignupComponent;
