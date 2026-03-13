const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "data/users.json");

const getUsers = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

const findUserByGoogleId = (googleId) => {
  const users = getUsers();
  const searchUser = users.find((users) => {
    return users.id == googleId;
  });

  if (!searchUser) {
    return null;
  }

  return searchUser;
};

const createUser = (profile) => {
  let users = getUsers();
  const searchUser = findUserByGoogleId(profile.id);

  if (searchUser) {
    return searchUser;
  }

  const newUser = {
    id: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value,
    photo: profile.photos[0].value,
    createdAt: new Date().toISOString(),
    library: [],
  };

  users.push(newUser);

  saveUsers(users);
  return newUser;
};

const addToLibrary = (userId, item) => {
  let users = getUsers();

  const userIndex = users.findIndex((user) => user.id == userId);

  if (userIndex === -1) {
    return { message: `User not found` };
  }
  if (!item) {
    return { message: `Item not provided` };
  }
  const alreadyExists = users[userIndex].library.find((i) => i.id === item.id);

  if (alreadyExists) {
    return { message: "Item already in library" };
  }

  users[userIndex].library.push(item);
  saveUsers(users);
  return users[userIndex];
};

const removeFromLibrary = (userId, item) => {
  let users = getUsers();

  const userIndex = users.findIndex((user) => user.id == userId);

  if (userIndex === -1) {
    return { message: `User not found` };
  }
  if (!item) {
    return { message: `Item not provided` };
  }

  users[userIndex].library = users[userIndex].library.filter(
    (libraryItem) => libraryItem.id !== item.id,
  );
  saveUsers(users);
  return users[userIndex];
};

module.exports = {
  findUserByGoogleId,
  createUser,
  addToLibrary,
  removeFromLibrary,
};
