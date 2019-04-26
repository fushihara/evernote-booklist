const Evernote = require("evernote");
import * as dateFormat from "dateformat";
export namespace EvernoteClient {
  export type UserData = {
    id: number,//123456
    name: string,//あいうえお
    shardId: string,//s123
    username: string//aiueo
  }
  export type NoteBook = {
    title: string,
    size: number,
    updateDate: Date,
    createdDate: Date,
    guid: string,
    notebookName: string
    notebookGuid: string
  };
  export async function getEvernoteAllNoteData(developerToken: string): Promise<{userData:UserData,noteBooks:NoteBook[]}> {
    const client = new Evernote.Client({ token: developerToken, sandbox: false });
    const userStore = client.getUserStore();
    const userData = await getUser(userStore);
    const noteStore = client.getNoteStore();
    const resultUserData :UserData= {
      id:Number(userData.id),
      name:String(userData.name),
      shardId:String(userData.shardId),
      username:String(userData.username),
    }

    const allNoteBooks = await getAllNotebooks(noteStore);
    for (let notebook of allNoteBooks) {
      //console.log(notebook.name + "/" + notebook.guid)
    }
    const allNote = await getAllNote(noteStore);
    const result: NoteBook[] = [];
    for (let note of allNote.notes) {
      const title = note.title;
      const noteGuid = note.guid;
      const size = note.contentLength;
      const updateDate = new Date(note.updated);
      const createdDate = new Date(note.created);
      const notebookGuid = String(note.notebookGuid);
      const notebookName = [...allNoteBooks].filter(a => a.guid == notebookGuid).map(a => a.name)[0] || notebookGuid;
      const updateDateStr = dateFormat(updateDate, "yyyy/mm/dd HH:MM:ss");
      const createdDateStr = dateFormat(createdDate, "yyyy/mm/dd HH:MM:ss");
      result.push({
        title,
        guid: noteGuid,
        createdDate: createdDate,
        updateDate,
        size,
        notebookName,
        notebookGuid
      });
      //console.log(`${String(allNote.notes.indexOf(note) + 1).padStart(3, " ")} ${createdDateStr} ${updateDateStr} ${title} (${size} byte)`);
      //console.log(`  ${notebookName}`);
    }
    return {
      noteBooks:result,
      userData:resultUserData
    };
  }
}
async function getUser(userStore: any) {
  return await userStore.getUser();
}
//@ts-ignore
async function getAllNotebooks(noteStore: Evernote.NoteStoreClient) {
  //@ts-ignore
  return await noteStore.listNotebooks();
}
//@ts-ignore
async function getAllNote(noteStore: Evernote.NoteStoreClient) {
  //@ts-ignore
  const filter = new Evernote.NoteStore.NoteFilter({
    words: "",
    ascending: false,
    order: 2, // 1:created 2:updated 3:RELEVANCE 4:UPDATE_SEQUENCE_NUMBER 5:title
  });
  //@ts-ignore
  var spec = new Evernote.NoteStore.NotesMetadataResultSpec({
    includeTitle: true,
    includeContentLength: true,
    includeCreated: true,
    includeUpdated: true,
    includeDeleted: true,
    includeNotebookGuid: true,
  });
  //@ts-ignore
  return await noteStore.findNotesMetadata(filter, 0, 500, spec)
}
