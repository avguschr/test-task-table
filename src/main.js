import { createApp } from "vue";
import App from "./App.vue";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCyRYz60tBwP8_uqjo2BbXzHbraGXVjsUQ",
  authDomain: "test-task-3b0d7.firebaseapp.com",
  databaseURL: "https://test-task-3b0d7-default-rtdb.firebaseio.com",
  projectId: "test-task-3b0d7",
  storageBucket: "test-task-3b0d7.appspot.com",
  messagingSenderId: "248308804998",
  appId: "1:248308804998:web:f883486149b5293aa91007",
  measurementId: "G-EP6K82WPB3",
};

initializeApp(firebaseConfig);

createApp(App).mount("#app");
