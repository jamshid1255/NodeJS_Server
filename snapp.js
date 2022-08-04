var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const mangoose = require("mongoose");
var app = express();

require('./bot')

var Twit = require('twit')
var config = require('./config')
const bot = new Twit(config)

var Twitter = require('twitter');

var TWITTER_CONSUMER_KEY = "xxxxxxxxxxxxxxxxxxx";
var TWITTER_CONSUMER_SECRET = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
var callbackURL = "http://localhost:8000/auth/twitter/callback";

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var sess = require('express-session');
var BetterMemoryStore = require('session-memory-store')(sess);



// Serialize and deserialize user information
passport.serializeUser(function(user, callback) {
    callback(null, user);
});
passport.deserializeUser(function(object, callback) {
    callback(null, object);
});
var getTwitterFollowers = require('get-twitter-followers');


app.use(express.json({ extended: false }));
var schema = new mangoose.Schema({ email: 'string', phone: 'string', password: 'string' });
var User = mangoose.model('User', schema);
var jwt = require('jsonwebtoken');


app.post("/login", async(req, res) => {
    const { email, password } = req.body;
    //console.log(email, password);
    var user = {
        email: "bacha1255",
        password: "123",
        id: "12345678",
    }
    if (!user) {
        return res.json({ msg: "No User found" });
    } else if (user.email !== email) {
        return res.json({ msg: "wrong email" });
    } else if (user.password !== password) {
        return res.json({ msg: "wrong password" });
    } else {
        var token = jwt.sign({ id: user.id }, 'password');
        return res.json({ token: token });
    }
});

var Twitschema = new mangoose.Schema({ userID: 'string', username: 'string' });
var TwitUser = mangoose.model('TwitUser', Twitschema);

////////////////////////////////Connection with database/////////////////////////
const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "snapp",
    password: "admin",
    port: 5432,
})
client.connect();

// client.query('Select * from twitterregistered', (err, res) => {
//     if (!err) {
//         console.log(res.rows)
//     } else {
//         console.log(err.message);
//     }
//     client.end;
// })

////////////////////////////////Connection with database/////////////////////////






var myFollowersData1 = [{
        "id_str": 1,
        "screen_name": "syedkumail95",
        "location": "Attock, Punjab, Pakistan",
        "followers_count": 14,
        "friends_count": 25,
        "created_at": "Wed May 27 12:41:17 +0000 2020",
        "favourites_count": 71,
        "statuses_count": 2,
        "profile_image_url_https": 'https://pbs.twimg.com/profile_images/1434143486320812033/muR7wlEk_normal.jpg',
        "verified": "FALSE",
        "protected": "FALSE",
        "listed_count": 0,
        "following": "FALSE",
        "retweeted_count": 124,
        "retweeted": "FALSE",
        "likes": 15,
        "mention": 12,
        "reply": 55
    },
    {
        "id_str": 2,
        "screen_name": "heart_attack207",
        "location": "from earth ",
        "followers_count": 41,
        "friends_count": 78,
        "created_at": "Sat Dec 22 12:01:06 +0000 2018",
        "favourites_count": 45,
        "statuses_count": 14,
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1490222581143810049/rShZ6wd3_normal.jpg",
        "verified": "FALSE",
        "protected": "FALSE",
        "listed_count": 4,
        "following": "FALSE",
        "retweeted_count": 34,
        "retweeted": "FALSE",
        "likes": 11,
        "mention": 98,
        "reply": 15
    },
    {
        "id_str": 3,
        "screen_name": "SwaziJwand",
        "location": "Pakistan",
        "followers_count": 24,
        "friends_count": 452,
        "created_at": "Fri Feb 08 05:12:34 +0000 2013",
        "favourites_count": 45,
        "statuses_count": 74,
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1517683825412915202/YuOzqy54_normal.jpg",
        "verified": "TRUE",
        "protected": "TRUE",
        "listed_count": 10,
        "following": "FALSE",
        "retweeted_count": 64,
        "retweeted": "FALSE",
        "likes": 55,
        "mention": 121,
        "reply": 157
    },
    {
        "id_str": 4,
        "screen_name": "UsmanAs73776722",
        "location": "Attock, Pakistan",
        "followers_count": 65,
        "friends_count": 78,
        "created_at": "Tue Jun 18 15:19:25 +0000 2019",
        "favourites_count": 32,
        "statuses_count": 77,
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1430997550279151618/OwDzeNmH_normal.jpg",
        "verified": "TRUE",
        "protected": "FALSE",
        "listed_count": 3,
        "following": "FALSE",
        "retweeted_count": 32,
        "retweeted": "TRUE",
        "likes": 120,
        "mention": 11,
        "reply": 250
    },
    {
        "id_str": 5,
        "screen_name": "hello_worldss",
        "location": "Pakistan",
        "followers_count": 154,
        "friends_count": 222,
        "created_at": "Thu May 04 13:20:39 +0000 2017",
        "favourites_count": 11,
        "statuses_count": 23,
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1295271146653462529/OI7YBuDu_normal.jpg",
        "verified": "FALSE",
        "protected": "FALSE",
        "listed_count": 7,
        "following": "FALSE",
        "retweeted_count": 74,
        "retweeted": "FALSE",
        "likes": 121,
        "mention": 178,
        "reply": 12
    },
    {
        "id_str": 6,
        "screen_name": "HASSAM38068007",
        "location": "",
        "followers_count": 539,
        "friends_count": 654,
        "created_at": "Thu May 04 13:20:39 +0000 2017",
        "favourites_count": 27649,
        "statuses_count": 7959,
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1188437192189845505/knLhdtGa_normal.jpg",
        "verified": "TRUE",
        "protected": "FALSE",
        "listed_count": 9,
        "following": "FALSE",
        "retweeted_count": 177,
        "retweeted": "TRUE",
        "likes": 45,
        "mention": 200,
        "reply": 784
    },
    {
        "id_str": 7,
        "screen_name": "call_me_ikra",
        "location": "",
        "followers_count": 1104,
        "friends_count": 1004,
        "created_at": "Tue Sep 04 08:08:28 +0000 2018",
        "favourites_count": 8319,
        "statuses_count": 5279,
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1490364252359729155/Tcvvs-IH_normal.jpg",
        "verified": "TRUE",
        "protected": "FALSE",
        "listed_count": 1,
        "following": "FALSE",
        "retweeted_count": 6,
        "retweeted": "FALSE",
        "likes": 60,
        "mention": 65,
        "reply": 66
    },
    {
        "id_str": 8,
        "screen_name": "ehtasham3233",
        "location": "Wah Cantt, Pakistan",
        "followers_count": 10,
        "friends_count": 241,
        "created_at": "Mon Sep 01 04:32:19 +0000 2014",
        "favourites_count": 18,
        "statuses_count": 30,
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1483234189206069255/31eBInOR_normal.jpg",
        "verified": "FALSE",
        "protected": "FALSE",
        "listed_count": 0,
        "following": "FALSE",
        "retweeted_count": 0,
        "retweeted": "FALSE",
        "likes": 80,
        "mention": 17,
        "reply": 265
    },
    {
        "id_str": 9,
        "screen_name": "_Muhd_Irfan_",
        "location": "Chilas, Pakistan",
        "followers_count": 3514,
        "friends_count": 3853,
        "created_at": "Wed May 27 12:41:17 +0000 2020",
        "favourites_count": 8319,
        "statuses_count": 5279,
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1474764729017155587/WM5adNqs_normal.jpg",
        "verified": "FALSE",
        "protected": "FALSE",
        "listed_count": 1,
        "following": "FALSE",
        "retweeted_count": 15,
        "retweeted": "FALSE",
        "likes": 75,
        "mention": 75,
        "reply": 456
    },
    {
        "id_str": 10,
        "screen_name": "JanSherKhan_",
        "location": "Islamabad, Pakistan",
        "followers_count": 1323,
        "friends_count": 3710,
        "created_at": "Wed Oct 12 11:03:26 +0000 2016",
        "favourites_count": 18085,
        "statuses_count": 4476,
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1517246636963082240/fGp10TPT_normal.jpg",
        "verified": "TRUE",
        "protected": "FALSE",
        "listed_count": 0,
        "following": "FALSE",
        "retweeted_count": 5,
        "retweeted": "FALSE",
        "likes": 17,
        "mention": 136,
        "reply": 312
    }
];
var UserInfo1 = [{
    "id_str": 1255,
    "screen_name": "WasaySardar",
    "location": "Attock, Punjab, Pakistan",
    "followers_count": 10,
    "friends_count": 25,
    "created_at": "Wed May 27 12:41:17 +0000 2020",
    "favourites_count": 44,
    "statuses_count": 77,
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1434143486320812033/muR7wlEk_normal.jpg",
    "verified": "FALSE",
    "protected": "FALSE",
    "listed_count": 0,
    "following": "FALSE",
    "retweeted_count": 150,
    "retweeted": "FALSE",
    "likes": 2,
    "posts": 200
}]
var Ranking1 = {
    likes: 'Likes',
    share: 'Share',
    reply: 'Reply',
    mention: 'Mention',
    retweet: 'Retweet'
};
var FeatureWeight1 = {
    likes: 0.12,
    share: 0.41,
    reply: 0.22,
    mention: 0.30,
    retweet: 0.45
};
var rankingbyRetweetListToApp = {
    'nodes': [
        { 'id': 'Bacha', 'label': 'circle' },
    ],
    'edges': [{
        'from': 'Bacha',
        'to': 'Junaid',
        'color': 0xff051e3e,
        'strokeWidth': 2,
        'imageURl': 'url'
    }]
}
var tokens = {
    consumer_key: 'xxxxxxxxxxx',
    consumer_secret: 'xxxxxxxxxxxxxxxxxxxxxxx',
    access_token: 'xxxxxxxxxxxxxxxxxx-x',
    access_token_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
};

const TwitterAPis = async(getthis) => {
    try {
        var SizefoFollowers;
        await getTwitterFollowers(tokens, getthis).then(followers => {
            SizefoFollowers = followers;
        });
        return SizefoFollowers;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        // await client.end(); // closes connection
    }
};



app.post("/twitterlogUserInfo", async(req, res) => {
    const { userID, username } = req.body;
    console.log(userID, username);
    const CountFollowers = async() => {
        try {
            const { rows } = await client.query(`Select * from "userFollowertable"`);
            var totalFollowers = 0;
            //console.log(rows);
            for (var i = 0; i < rows.length; i++) {
                totalFollowers = totalFollowers + 1
            }
            return totalFollowers;
        } catch (error) {
            // console.error(error.stack);
            return 0;
        } finally {
            // await client.end(); // closes connection
        }
    };
    const insertUser = async() => {
        try {
            await client.query(
                `INSERT INTO twitterregistered("Twitterid", "Twitterusername") VALUES(
                    '${userID}', '${username}'
                    )`); // sends queries
            return true;
        } catch (error) {
            // console.error(error.stack);
            return false;
        } finally {
            // await client.end(); // closes connection
        }
    };
    const InsertFollowers = async(followers, userID, getthis) => {
        try {
            console.log("Store all infromation of followers in database")
            for (var i = 0; i < followers.length; i++) {
                console.log(followers[i]['screen_name']);
                await client.query(
                    `INSERT INTO "userFollowertable"("userTwitterid", "Twitterusername","followername","followerid",
                    "followers_count","friends_count","retweeted_count","created_at","favourites_count",
                    "statuses_count","verified_account","profile_image_url_https") 
                    VALUES('${userID}', '${getthis}','${followers[i]['screen_name']}','${followers[i]['id_str']}',
                    '${followers[i]['followers_count']}','${followers[i]['friends_count']}',
                    '${followers[i]['status']['retweet_count']}','${followers[i]['created_at']}',
                    '${followers[i]['favourites_count']}','${followers[i]['statuses_count']}',
                    '${followers[i]['verified']}','${followers[i]['profile_image_url_https']}')`); // sends queries
            }
            return true;
        } catch (error) {
            // console.error(error.stack);
            return false;
        } finally {
            // await client.end(); // closes connection
        }
    };
    insertUser().then(result => {
        if (result) {
            console.log('User singup first time crawl followers...');
            TwitterAPis(username).then(UserFollowerss => {
                console.log('All Followers List Return ');
                // console.log(UserFollowerss);
                InsertFollowers(UserFollowerss, userID, username).then(finish => {
                    if (finish) {
                        CountFollowers().then(totalFollowers => {
                            console.log("User have registred and followers stored in database show welcome page on smartphone");
                            return res.json({ msg: "Welcome to Twitter Ranking", totalFollowr: totalFollowers });
                        })
                    }
                })

            });
        } else {
            CountFollowers().then(totalFollowers => {
                console.log("User have already account redirect to welcome page on smartphone");
                return res.json({ msg: "Welcome to Twitter Ranking", totalFollowr: totalFollowers });
            })
        }
    });
});


async function RankingByRetweetsServer() {
    rankingbyRetweetListToApp['nodes'].push({ 'id': UserInfo1[0].screen_name, 'label': 'circle' }, );
    for (let i = 0; i < myFollowersData1.length; i++) {
        rankingbyRetweetListToApp['nodes'].push({ 'id': myFollowersData1[i].screen_name, 'label': 'circle' }, );
        Wup = 1 - (myFollowersData1[i].retweeted_count / UserInfo1[0].posts);
        if (Ranking1.retweet == 'Retweet') {
            Wp_u = (Wup + FeatureWeight1.retweet) / 2
        }
        rankingbyRetweetListToApp['edges'].push({
            'from': UserInfo1[0].screen_name,
            'to': myFollowersData1[i].screen_name,
            'color': 0xff051e3e,
            'strokeWidth': Wp_u.toFixed(2),
            'imageURl': myFollowersData1[i].profile_image_url_https
        }, );
    }
    rankingbyRetweetListToApp.edges.sort(function(a, b) {
        var keyA = a.strokeWidth,
            keyB = b.strokeWidth;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    return rankingbyRetweetListToApp;
}

app.get("/rankbyretweets", async(req, res) => {
    console.log('Retweet');
    var mynewdata = await RankingByRetweetsServer();
    mynewdata['nodes'].shift();
    mynewdata['edges'].shift();
    console.log(mynewdata);
    return res.json({ msg: mynewdata });
});

var rankingbyLikesListToApp = {
    'nodes': [
        { 'id': 'Bacha', 'label': 'circle' },
    ],
    'edges': [{
        'from': 'Bacha',
        'to': 'Junaid',
        'color': 0xff051e3e,
        'strokeWidth': 2,
        'imageURl': 'url'
    }]
}
async function RankingByLikesServer() {
    rankingbyLikesListToApp['nodes'].push({ 'id': UserInfo1[0].screen_name, 'label': 'circle' }, );
    for (let i = 0; i < myFollowersData1.length; i++) {
        rankingbyLikesListToApp['nodes'].push({ 'id': myFollowersData1[i].screen_name, 'label': 'circle' }, );
        Wup = 1 - (myFollowersData1[i].likes / UserInfo1[0].posts);
        if (Ranking1.likes == 'Likes') {
            Wp_u = (Wup + FeatureWeight1.likes) / 2
        }
        rankingbyLikesListToApp['edges'].push({
            'from': UserInfo1[0].screen_name,
            'to': myFollowersData1[i].screen_name,
            'color': 0xff051e3e,
            'strokeWidth': Wp_u.toFixed(2),
            'imageURl': myFollowersData1[i].profile_image_url_https
        }, );
    }
    rankingbyLikesListToApp.edges.sort(function(a, b) {
        var keyA = a.strokeWidth,
            keyB = b.strokeWidth;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    return rankingbyLikesListToApp;
}
app.get("/RankingByLikesServer", async(req, res) => {
    console.log('Likes');
    var mynewdata = await RankingByLikesServer();
    mynewdata['nodes'].shift();
    mynewdata['edges'].shift();
    //console.log(mynewdata);
    return res.json({ msg: mynewdata });
});

var rankingbyReplyListToApp = {
    'nodes': [
        { 'id': 'Bacha', 'label': 'circle' },
    ],
    'edges': [{
        'from': 'Bacha',
        'to': 'Junaid',
        'color': 0xff051e3e,
        'strokeWidth': 2,
        'imageURl': 'url'
    }]
}
async function RankingByReplyServer() {
    rankingbyReplyListToApp['nodes'].push({ 'id': UserInfo1[0].screen_name, 'label': 'circle' }, );
    for (let i = 0; i < myFollowersData1.length; i++) {
        rankingbyReplyListToApp['nodes'].push({ 'id': myFollowersData1[i].screen_name, 'label': 'circle' }, );
        Wup = 1 - (myFollowersData1[i].reply / UserInfo1[0].posts);
        if (Ranking1.reply == 'Reply') {
            Wp_u = (Wup + FeatureWeight1.reply) / 2
        }
        rankingbyReplyListToApp['edges'].push({
            'from': UserInfo1[0].screen_name,
            'to': myFollowersData1[i].screen_name,
            'color': 0xff051e3e,
            'strokeWidth': Wp_u.toFixed(2),
            'imageURl': myFollowersData1[i].profile_image_url_https
        }, );
    }
    rankingbyReplyListToApp.edges.sort(function(a, b) {
        var keyA = a.strokeWidth,
            keyB = b.strokeWidth;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    return rankingbyReplyListToApp;
}
app.get("/RankingByReplyServer", async(req, res) => {
    console.log('Reply');
    var mynewdata = await RankingByReplyServer();
    mynewdata['nodes'].shift();
    mynewdata['edges'].shift();
    //console.log(mynewdata);
    return res.json({ msg: mynewdata });
});



var rankingbyMentionListToApp = {
    'nodes': [
        { 'id': 'Bacha', 'label': 'circle' },
    ],
    'edges': [{
        'from': 'Bacha',
        'to': 'Junaid',
        'color': 0xff051e3e,
        'strokeWidth': 2,
        'imageURl': 'url'
    }]
}
async function RankingBymentionServer() {
    rankingbyMentionListToApp['nodes'].push({ 'id': UserInfo1[0].screen_name, 'label': 'circle' }, );
    for (let i = 0; i < myFollowersData1.length; i++) {
        rankingbyMentionListToApp['nodes'].push({ 'id': myFollowersData1[i].screen_name, 'label': 'circle' }, );
        Wup = 1 - (myFollowersData1[i].mention / UserInfo1[0].posts);
        if (Ranking1.mention == 'Mention') {
            Wp_u = (Wup + FeatureWeight1.mention) / 2
        }
        rankingbyMentionListToApp['edges'].push({
            'from': UserInfo1[0].screen_name,
            'to': myFollowersData1[i].screen_name,
            'color': 0xff051e3e,
            'strokeWidth': Wp_u.toFixed(2),
            'imageURl': myFollowersData1[i].profile_image_url_https
        }, );
    }

    rankingbyMentionListToApp.edges.sort(function(a, b) {
        var keyA = a.strokeWidth,
            keyB = b.strokeWidth;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    return rankingbyMentionListToApp;
}
app.get("/RankingBymentionServer", async(req, res) => {
    console.log('Mention');
    var mynewdata = await RankingBymentionServer();
    mynewdata['nodes'].shift();
    mynewdata['edges'].shift();
    //console.log(mynewdata);
    return res.json({ msg: mynewdata });
});
///////////////////////////////////// Cyberbullying /////////////////////////////
const { spawn } = require('child_process');




// app.get("/CyberbullyFollowersRanking", async(req, res) => {
//     const getFile = fileName => {
//         return new Promise((resolve, reject) => {
//             var out = [];
//             const pyProg = spawn('python', ['WhoIsBadFollower.py']);
//             pyProg.stdout.on('data', function(data) {
//                 // console.log(data.toString());
//                 out.push(data.toString());
//             });
//             setTimeout(resolve, 3000, out);
//         });
//     };
//     getFile()
//         .then(data => {
//             console.log(data);
//         })
//         .catch(err => console.error(err));
// });

app.post("/CyberbullyFollowersRanking", async(req, res) => {
    const { username } = req.body;
    console.log(username);
    const getFile = fileName => {
        return new Promise((resolve, reject) => {
            var out = [];
            const pyProg = spawn('python', ['WhoIsBadFollower.py', username]);
            pyProg.stdout.on('data', function(data) {
                console.log(data.toString());
                out.push(data.toString());
            });
            pyProg.stderr.on('data', (data) => {
                console.error('err: ', data.toString());
            });
            setTimeout(resolve, 6000, out);
        });
    };
    getFile()
        .then(data => {
            // console.log(data);
            return res.json({ msg: "You can access you report now  ready" });
        })
        .catch(err => console.error(err));
});





app.post("/AppRegistereScreen", async(req, res) => {
    const { email, phoneNumber, password } = req.body;
    console.log(email, phoneNumber, password);
    const insertUser = async() => {
        try {
            await client.query(
                `INSERT INTO "appRegisteredUsers"("email", "phoneNumber","password") VALUES(
                    '${email}', '${phoneNumber}','${password}'
                    )`); // sends queries
            return true;
        } catch (error) {
            // console.error(error.stack);
            return false;
        } finally {
            // await client.end(); // closes connection
        }
    };

    insertUser().then(result => {
        if (result) {
            console.log('User Registered Succesfully...');
            return res.json({ msg: "Welcome to H-SNApp" });
        } else {
            console.log("User have already account redirect to welcome page on ");
            return res.json({ msg: "Welcome to H-SNApp" });

        }
    });
});


app.post("/AppLoginScreen", async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const UserInLoginValidation = async(email, password) => {
        try {
            await client.query(`SELECT * FROM "appRegisteredUsers" WHERE password = ?`, [password]);
            return true;
        } catch (error) {
            // console.error(error.stack);
            console.log("Query Error", error);
            return false;
        } finally {
            // await client.end(); // closes connection
        }
    };

    UserInLoginValidation(email, password).then(result => {
        if (result) {
            console.log('User exist...');
            return res.json({ msg: "Welcome to H-SNApp", emailvalid: true });
        } else {
            console.log("This email is not registered first registered ");
            return res.json({ msg: "Sorry! emial or passwor is wrong", emailvalid: true });

        }
    });
});




const { Console } = require('console');








app.listen(8000, () => {
    console.log("Application started and Listening on port 8000");
});
