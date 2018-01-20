<template name="signup">
  <div id="signup">
    <h1> Sign Up </h1>
    <div id="signupForm" class="container fluid">
      <b-form @submit="onSubmit">
        <b-form-group id="emailAddressInputGroup"
                      label="Email address:"
                      label-for="emailAddress"
                      description="We'll never share your email with anyone else.">
          <b-form-input id="emailAddress"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="usernameInputGroup"
                      label="Username:"
                      label-for="usernameInput"
                      description="This will be displayed on the leaderboard">
          <b-form-input id="usernameInput"
                        type="text"
                        v-model="form.username"
                        required
                        placeholder="Choose a username">
          </b-form-input>
        </b-form-group>

        <b-form-group id="passwordInputGroup"
                      label="Password:"
                      label-for="passwordInput">
          <b-form-input id="passwordInput"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Password">
          </b-form-input>
        </b-form-group>

        <b-form-group id="password2InputGroup"
                      label="Password Again:"
                      label-for="password2Input">
          <b-form-input id="password2Input"
                        type="password"
                        v-model="form.password2"
                        required
                        placeholder="Confirm password">
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>

        <p class="mt-3">
          Already have an account? <router-link to="/login">Log In</router-link>
        </p>

      </b-form>
    </div>
  </div>
</template>
<style>

</style>
<script>

  import firebase from 'firebase';

  export default {
    name: 'signup',
    data() {
      return {
        form: {
          email: '',
          password: '',
          password2: '',
          username: '',
          consented: false,
        },
        show: true,
      };
    },
    methods: {
      onSubmit() {
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(
          (user) => {
            console.log('user created', user);
          }, (err) => {
          console.log('error', err);
        });
      },
    },
  };
</script>
