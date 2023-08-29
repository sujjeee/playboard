import fs from 'fs'

const activeRoomsFilePath = 'src/data/activeRooms.json';

interface ActiveRoom {
    roomId: string;
    expiry: number;
}

let activeRooms: ActiveRoom[] = [];

// Load active rooms data from the JSON file
function loadActiveRooms() {
    try {
        const data = fs.readFileSync(activeRoomsFilePath, 'utf-8');
        if (data) {
            activeRooms = JSON.parse(data);
        }
    } catch (error) {
        // Handle error
        console.error('Error loading active rooms data:', error);
    }
}

// Save active rooms data to the JSON file
function saveActiveRooms() {
    try {
        const data = JSON.stringify(activeRooms, null, 2);
        fs.writeFileSync(activeRoomsFilePath, data, 'utf-8');
    } catch (error) {
        // Handle error
        console.error('Error saving active rooms data:', error);
    }
}

// Add a new active room
function addActiveRoom(roomId: string, expiry: number) {
    activeRooms.push({ roomId, expiry });
    saveActiveRooms();
}

// Remove expired rooms
function removeExpiredRooms() {
    const currentTime = Date.now();
    activeRooms = activeRooms.filter(room => room.expiry > currentTime);
    saveActiveRooms();
}

loadActiveRooms();
// todo fix time 
setInterval(removeExpiredRooms, 360000);

export { activeRooms, addActiveRoom, removeExpiredRooms };