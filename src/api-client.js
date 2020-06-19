import AsyncStorage from '@react-native-community/async-storage';

const appendToken = (headers, token) => ({ ...headers, Authorization: `Bearer ${token}` });
const deatachToken = (response) => response.headers.map.authorization.split(' ')[1];

export default class WegoApiClient {
  #token;

  constructor(endpointUrl, applicationType) {

    this.#token = ''
    this.endpointUrl = endpointUrl;
    this.headers = {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Application: applicationType
    }
  }

  set applicationType(type) { this.headers.Application = type; }
  get applicationType() { return this.headers.Application; }

  get url() {
    const myUrl = this.endpointUrl.split('');
    myUrl.pop();
    return myUrl.join('');
  }

  get tokenLoaded() { return this.#token ? true : false }

  async testConnection() {
    const response = await fetch(`${this.endpointUrl}app`, {
      method: 'GET',
      headers: this.headers,
    });
    const json = await response.json();
    const result = { body: json, status: response.status };

    return new Promise(resolve => resolve(result));
  }

  async refreshToken() {
    // Check if a token is in memory, otherwise search in storage
    if (!this.#token)
      this.#token = await AsyncStorage.getItem('JWT');

    // If a token was found refresh it
    if (this.#token) {
      const response = await fetch(`${this.endpointUrl}auth`, {
        method: 'POST',
        headers: appendToken(this.headers, this.#token),
      });
      // If the token is refreshed successfully save it in storage
      // Otherwise the server would repond 401 if the token is no longer valid
      if (response.status < 300) {
        this.#token = deatachToken(response);
        await AsyncStorage.setItem('JWT', this.#token);
      }
      const json = await response.json();
      const result = { body: json, status: response.status };

      return new Promise(resolve => resolve(result));
    }

    return new Promise(resolve => resolve({ status: 401, body: {} }));
  }

  // user params: email, password
  async signIn(user) {
    const response = await fetch(`${this.endpointUrl}auth`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(user)
    });
    // If the users signs in successfully save token in storage
    // Otherwise the server would repond 401 if the token is no longer valid
    if (response.status < 300) {
      this.#token = deatachToken(response);
      await AsyncStorage.setItem('JWT', this.#token);
    }
    const json = await response.json();
    const result = { body: json, status: response.status };

    return new Promise(resolve => resolve(result));
  }

  // user params: email, password, passwordConfirmation, name, lastname, secondLastname, birthday, phoneNumber
  async signUp(user) {
    const response = await fetch(`${this.endpointUrl}auth/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(user)
    });
    // If the users signs up successfully save token in storage
    // Otherwise the server would repond 500 if the user already exists
    if (response.status < 300) {
      this.#token = deatachToken(response);
      await AsyncStorage.setItem('JWT', this.#token);
    }
    const json = await response.json();
    const result = { body: json, status: response.status };

    return new Promise(resolve => resolve(result));
  }

  async signOut() {
    const response = await fetch(`${this.endpointUrl}auth`, {
      method: 'DELETE',
      headers: appendToken(this.headers, this.#token),
    });
    // Remove token from storage and memory on successful sign out
    let json = {}
    if (response.body)
      json = await response.json();
    const result = { body: json, status: response.status };
    if (response.status < 300) {
      this.#token = '';
      await AsyncStorage.removeItem('JWT');
    }

    return new Promise(resolve => resolve(result));
  }

  async getProfile() {
    const response = await fetch(`${this.endpointUrl}app/profile`, {
      method: 'GET',
      headers: appendToken(this.headers, this.#token),
    });
    const json = await response.json();
    const result = { body: json, status: response.status };

    return new Promise(resolve => resolve(result));
  }

  // profile params: name, lastName, secondLastname, birthday, phoneNumber, profilePicture
  async updateProfile(profile) {
    return await fetch(`${this.endpointUrl}app/profile`, {
      method: 'PUT',
      headers: appendToken(this.headers, this.#token),
      body: {}
    });
  }
}