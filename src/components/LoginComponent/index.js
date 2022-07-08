import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../common/Container';
import Input from '../common/Input';
import styles from './styles';
import Message from '../common/Message';

const LoginComponent = ({
  username,
  onChangePassword,
  onChangeUsername,
  password,
  canSave,
  navigation,
  onSubmit,
  fetchError,
  loading,
  justSignedUp,
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
        <Text style={styles.subtitle}>Please Login Here</Text>
        {justSignedUp && (
          <Message
            onDismiss={() => {}}
            success
            message="Account created successfully"
          />
        )}
        {fetchError && !fetchError.error && (
          <Message onDismiss danger message="invalid credentials" />
        )}

        <Input
          label="Username"
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Enter Username"
        />
        <Input
          label="Password"
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={visiblePassword}
          placeholder="Enter Password"
          icon={
            <TouchableOpacity onPress={passwordVisibility}>
              <Text>{visiblePassword ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity>
          }
          iconPosition="right"
        />
        <View>
          <Button
            title={loading ? 'Signing In' : 'Sign In'}
            disabled={!canSave}
            onPress={onSubmit}
          />
        </View>
        <View style={styles.createSection}>
          <Text style={styles.infoText}>Need a new account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkBtn}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default LoginComponent;
