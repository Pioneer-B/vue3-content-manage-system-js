class Storage {
    getStorage(key) {
        const value = window.localStorage.getItem(key)
        if (value) return JSON.parse(value)
    }
    setStorage(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
    deleteStorage(key) {
        window.localStorage.removeItem(key)
    }
    clearStorage() {
        window.localStorage.clear()
    }
}

export default new Storage()
