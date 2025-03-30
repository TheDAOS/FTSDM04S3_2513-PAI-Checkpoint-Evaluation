const usernames = [" Alice ", "bob", " Charlie", "alice", "BOB "];

const cleanedUsernames = usernames
                                .map(username => username.trim().toLowerCase())
                                .filter((username , index, list) => list.indexOf(username) === index)
                                .sort();

console.log(cleanedUsernames);
