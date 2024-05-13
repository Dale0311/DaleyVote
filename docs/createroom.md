## Component hierarchy

Position and Candidate components are both dynamically type. It means that CreateRoom controll the states of both.

```js
<CreateRoom>
  <Position>
    <Candidate />
    <Candidate />
    <Candidate />
  </Position>
</CreateRoom>;

// values that are required:
title - @frontend
expiration - @frontend
votingDetails - @frontend

createdById - @backend
code - @backend
participants - added when the room is live!


//votingDetails schema
votingDetails = [
  // position object
  {name: "Ceo", candidates: [{}]}
]
```
