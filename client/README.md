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
