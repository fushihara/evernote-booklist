export declare namespace EvernoteClient {
    type NoteBook = {
        title: string;
        size: number;
        updateDate: Date;
        createdDate: Date;
        guid: string;
        notebookName: string;
    };
    function getEvernoteAllNoteData(developerToken: string): Promise<NoteBook[]>;
}
