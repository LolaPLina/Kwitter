
const firebaseConfig = {
  apiKey: "AIzaSyDjBOKtIpa8gT8SkdXvuYT9XfqNvHgJltE",
  authDomain: "kwitter-be5b2.firebaseapp.com",
  databaseURL: "https://kwitter-be5b2-default-rtdb.firebaseio.com",
  projectId: "kwitter-be5b2",
  storageBucket: "kwitter-be5b2.appspot.com",
  messagingSenderId: "1052977056551",
  appId: "1:1052977056551:web:3fa1d4630ed7993ae93702"
};

firebase.initializeApp(firebaseConfig);

  userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "Nova sala adicionada"
  });

    localStorage.setItem("roomName", roomName);
    
    window.location = "kwitterPage.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
