export const localStorageItems = {
    addTask: {
        fields: 'addTaskFields'
    },
    session_key: 'session_key'
};
export class RequestBody {
    constructor(collection, payload) {
        this.collection = collection;
        this.payload = payload;
    }
    toJson() {
        return JSON.stringify(this);
    }
}
