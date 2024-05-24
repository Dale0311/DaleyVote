### legacy todos before i use md

##### to be solve today!

- after finalized user can edit the position - done

##### to be solve bukas.

- find a way to remove position when the index is > 0

##### first draft: simply -1 on positionCount

first try: there's bug when i remove the position component it doesn't render the position components in order using numbe

##### 05/16/2024:

- done, i used string[] of unique id.

- <b>future refactor:</b> i can use useFormContext so that i can clean some mess up code

- create the rest of the inputs: title, date
  title done
  need to learn date inputs and value
  done
- 05/19/2024: second draft of upload img: upload from backend, each finalize will trigger upload.
  things to do:
  - need to learn uploading from backend
  - rafactors: delete generate_signature. @api, @current, @controller, @route
  - tags to remove/modify: just highlight each one and press ctrl + d
  - @current: processPos , getSignature , uploadImg
  - @CreatePosition: onHandleSubmit - each click will trigger upload img from backend

### TODO 05/20/2024 - and continue yesterday todos. - starts 7:00pm

1. Remove: upload images from client.
   The reason is that it is slow.

- done, 7:28pm

- <b>DINNER BREAK: 7:30pm</b>

- <b>Continuation 8:10pm</b>

2. Refactor: implement backend upload of images.

upload image of candidates of each position every click on finalized button.
The current implementation of uploading images as of (05/20/2024). Is that it uploads all the images all at once on every position when the user click the "create room" button.

- <b>Steps:</b>
- create a fn(uploadCandidatesPicture) to our backend.

- i can use the finalized button in the current implentation to upload the candidates image. when i refactor to using useFormContext + useFieldArray im gonna refactor on how to upload the images.

- create route, controller, and implementation on how my backend performs crud @cloudinary.

- <b>done @12:20pm</b>
  remove the upload api from client. and replaced it with backend upload api. it's easier said than done because i troubleshoot on how to pass file pictures from my client to my backend. took me about 3-4hrs. :'/ feels bad man. to be continue tommorow

### TODO 05/21/2024 - continuation of todos 05/20/2024 6:30pm

i need a way for me to store my uploaded img properties in img. which are: {public_id, secure_url}
its workin, but i need to create a way for user to delete the img whenever the user click the "edit" button

- <b>Dinner Break: 7:20pm</b>
  done refactoring the "finalized" button. next thing todo is storing the data to my backend and creating a socket io.

- <b>Continuation: 8:20pm</b>
  so at this point configuring the room is done, the next challenge that i need to fix are:

1. send configData to create-room endpoint
   it will save the data to my server and it will return a accessCode.

2. configure socket
   it will get all rooms from my server and it will create room for every room object that is coming from my server

3. create a component for room that accept accessCode and will find that using emit. if find the server will add the client to the array of user.

- <b>Break: 9:40pm</b>
- <b>continuation: 10:10pm</b>
- <b>done @12:00pm</b>
  I refactor createRoom controller. now it accepts all the required properties that it needed. and from my server im generating the code that is needed aswell for creating room. Lastly, i enable my token authRequired so that i get the currentUserId when submitting the form data. i struggle a lot destructuring the currentUser because i don't know how to typesafe the currentUser. i debug it first and luckily i found a way. i need to get better writing in typescript.
  <br/>
  <br/>
  now i can submit the form data(room config) to my server and my server will process that request and save the form data to my database and will return the code that the client needs to access room component @client

### TODO 05/22/2024

1. typesafe destructure the currentUser data.

```js
export const typeSafeDestructureOfCurrentUser = (
  currentUser: object | CurrentUser<string>
) => {
  if (currentUser && typeof currentUser === 'object' && '_id' in currentUser) {
    return { ...currentUser };
  }
};
```

##### Continuation of TODO 05/21/2024 #2, 3

2. extending #2
   create a utility or service file. where we can subscribe to an event, and emit an event

```js
const socket = io('url', { options });

// now we can just call this whenever we need to emit an event.
export const emitEvent = (event, data) => {
  socket.emit(event, data);
};

//same
export const subscribeToEvent = (event, callback) => {
  socket.on(event, callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};
//
```

- after submitting the form to the server. the code that will use socket.emit("joinRoom", accessCode);
- the server will have a socket.on("joinRoom", cb) // subscribe to an event
- with acknowledge if success nav("/room/:code") else throw error

### TODO 05/23/2024

3. defining room

- <b>Power Interuption :/ </b>

### TODO 05/24/2024

1. refactor the socket @client. make it a context and custom hook
2. Continuation of TODO 05/23/2024 #2,3

update: feels like i don't have what it takes to finish this + laziness took over.

### TODO 05/25/2024

1. diffirentiate how the client create a user and how the client join a user

- creates room: client needs to config the room.
- join room: client will need to provide a code to join a room

2. "room" component will recieve a room code from urlParams using useParams() by react-router-dom.

```txt
@room component
- create custom hook. useRoom
   it will use useEffect and useState and it needs the urlParameter as parameter.
   return {roomConfig}

- room ui.
   the ui will consume the roomConfig data.
```
