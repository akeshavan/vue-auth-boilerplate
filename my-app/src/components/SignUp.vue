<template name="signup">
  <div id="signup">
    <h1> Sign Up </h1>
    <div id="signupForm" class="container fluid">
      <b-form @submit="onSubmit" validated>
        <b-alert :show="errors.show" variant="danger">{{errors.message}}</b-alert>
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

        <b-button type="submit" variant="primary" :disabled="!validated">Submit</b-button>

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
        errors: {
          show: false,
          message: null,
        },
      };
    },
    computed: {
      validated() {
        return this.form.password === this.form.password2;
      },
    },
    methods: {
      onSubmit() {
        // check for a unique username
        console.log('submitted form');
        firebase.database().ref('users').child(this.form.username).once('value')
        .then((snapshot) => {
          const val = snapshot.val();
          console.log('val is', val)
          if (!val){
            this.createAccount();
          } else {
            this.errors.show = true;
            this.errors.message = 'Username already exists! Please choose a unique username';
          }
        });
      },

      createAccount() {
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(
          (user) => {
            console.log('user created', user);
            this.updateProfile(user);
          }, (err) => {
          console.log('error', err);
          this.errors.show = true;
          this.errors.message = err.message;
        });
      },

      insertUser(user) {
        firebase.database().ref('users').child(user.displayName).set({
          score: 0,
          level: 0,
        });
      },
      updateProfile(user) {
        user.updateProfile({
          displayName: this.form.username,
        }).then(() => {
            // Profile updated successfully!
          this.$router.replace('play');
          this.insertUser(user);
        }, (err) => {
            // An error happened.
          this.errors.show = true;
          this.errors.message = err.message;
        });
      },
    },
  };
</script>
