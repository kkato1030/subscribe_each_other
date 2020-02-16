<template>
  <div id="app">
    <p>My Location: {{ myLocation }}</p>
    <div id="mutation">
      <span>UserID:</span>
      <input type="radio" id="A" value="A" v-model="userId" />
      <label for="A">A</label>
      <input type="radio" id="B" value="B" v-model="userId" />
      <label for="B">B</label>
    </div>
    <button v-on:click="start">Start Mutation</button>
    <button v-on:click="stop">Stop Mutation</button>
    <div id="subscription">
      <p>Oppnent Location: {{ opponentLocation }}</p>
      <button v-on:click="subscribeLocation">Start Subscription</button>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { updateSession } from "./graphql/mutations";
import { onUpdateSessionByUserId } from "./graphql/subscriptions";

const SESSION_ID = "saehaRo2cie4u";

export default {
  name: "App",
  data: () => {
    return {
      myLocation: "No Data",
      opponentLocation: "No Data",
      interval: undefined,
      subscription: undefined,
      userId: ""
    };
  },
  methods: {
    updateLocation: async function() {
      await API.graphql(
        graphqlOperation(updateSession, {
          input: {
            id: SESSION_ID,
            userId: this.userId,
            location: this.myLocation.toString()
          }
        })
      );
    },
    subscribeLocation: function() {
      if (!this.subscription) {
        console.log("start subscription");
        const opponentId = this.userId === "A" ? "B" : "A";
        this.subscription = API.graphql(
          graphqlOperation(onUpdateSessionByUserId, {
            id: SESSION_ID,
            userId: opponentId
          })
        ).subscribe({
          next: function(data) {
            this.opponentLocation =
              data.value.data.onUpdateSessionByUserId.location;
            console.log(this.opponentLocation);
          }.bind(this)
        });
      } else {
        console.info("already subscription is set");
      }
    },
    setMyLocation: function() {
      this.myLocation = Math.random() * 100000;
    },
    start: function() {
      if (!this.userId) {
        alert("ユーザーIDを選択してください");
        return;
      }
      if (!this.interval) {
        console.info("set interval");
        this.interval = setInterval(() => {
          this.setMyLocation();
          this.updateLocation();
        }, 1000);
      } else {
        console.info("already interval is set");
      }
    },
    stop: function() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = undefined;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
