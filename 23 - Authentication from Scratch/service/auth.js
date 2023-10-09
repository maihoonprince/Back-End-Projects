const sessionIdToMap = new Map();

function setUser(id, user){
    sessionIdToMap.set(id, user)
}

function getUser(id) {
    return sessionIdToMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}