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
 roomName = localStorage.getItem("roomName");

 function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            name:userName,
            message:msg,
            like:0
      });
      document.getElementById("msg").value="";
    }

     function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
         console.log("firebaseMessageId", firebaseMessageId);
         console.log("messageData", messageData);
         name = messageData['name'];
         message = messageData['message'];
         like = messageData['like'];

         nameWithTag = "<h4> "+name+ "</h4>"; 
         messageWithTag = "<h4 class = 'message_h4'>" +message+" <img class='user_tick'.png src='tick.png'></h4>";
         likeButton ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
         spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'> Like: "+like+"</span></button><hr>";

         row = nameWithTag+messageWithTag+likeButton+spanWithTag;
         document.getElementById("output").innerHTML+= row;
     } });  }); }
 getData();

function updateLike(messageId) {
     buttonId = messageId;
     likes = document.getElementById(buttonId).value
     updateLikes = Number(likes)+1;

     firebase.database().ref(roomName).child(messageId).update({
          like:updateLikes
     });
}

function logout() {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location.replace("index.html");
}
