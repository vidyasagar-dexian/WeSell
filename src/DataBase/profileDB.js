const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


const request = indexedDB.open("profileDB", 1);
let db;

request.onerror = (event) => {
    console.error("Failed to open indexedDB:", event.target.errorCode);
}

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const store = db.createObjectStore("profilePics", { keyPath: "userId" });
    store.createIndex("profilePic", "profilePic", { unique: false });
}

request.onsuccess = (event) => {
    db = event.target.result;
}

export function setProfilePic(userId, profilePicUrl) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["profilePics"], "readwrite");
        const store = transaction.objectStore("profilePics");
        const request = store.put({ userId: userId, profilePic: profilePicUrl });

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            console.error("Error adding profile pic:", event.target.error);
            reject(event.target.error);
        };
    });
}

export function getProfilePic(userId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["profilePics"], "readonly");
        const store = transaction.objectStore("profilePics");
        const request = store.get(userId);

        request.onsuccess = (event) => {
            const profilePic = event.target.result;
            if (profilePic) {
                resolve(profilePic.profilePic);
            } else {
                resolve(null); // Return null if profile picture not found
            }
        };

        request.onerror = (event) => {
            console.error("Error fetching profile pic:", event.target.error);
            reject(event.target.error);
        };
    });
}
