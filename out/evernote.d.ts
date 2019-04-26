﻿export declare namespace EvernoteClient {
    type UserData = {
        id: number;
        name: string;
        shardId: string;
        username: string;
    };
    type NoteBook = {
        title: string;
        size: number;
        updateDate: Date;
        createdDate: Date;
        guid: string;
        notebookName: string;
        notebookGuid: string;
    };
    function getEvernoteAllNoteData(developerToken: string): Promise<{
        userData: UserData;
        noteBooks: NoteBook[];
    }>;
}
