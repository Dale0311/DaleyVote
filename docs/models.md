# Models for mongodb

### User model

allows the user to participate and create a room. it is also needed when signing in to their respective account.

#### properties

- id: unique identifier
- name: display name
- imageUrl: display image
- password: for signing in
- email: for signing in

### Room model

allows the user to create a voting system in a room.

#### properties

- id
- participants

```js
//where participant is:
{
  id, { position, votedFor }, { position, votedFor };
}
```

- createdById
- createdAt
- expiration
- duration
- voting details
  voting details is an array of position

```js
//where position is an object that is:
{
  name, cadidates, id, totalVotes;
}
```

- candidates
  candidates are the persons who are aspiring to be the [positionName]

```js
//each candidate is
{
  id, name, imageUrl, roomId, position;
}
```
