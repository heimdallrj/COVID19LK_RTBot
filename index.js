import Twit from "twit";
import config, { interval, searchQuery } from "./config";

const retweet = (query) => {
    const twitClient = new Twit(config);

    twitClient.get("search/tweets", query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        if (data && data.statuses.length > 0) {
            let tweet = data.statuses[0]; // Take first tweet only

            twitClient.post("statuses/retweet/" + tweet.id_str, (e, res) => {
                if (e) {
                    console.log(e);
                    return;
                }
                if (res) {
                    console.log(res);
                }
            });
        } else {
            console.log(query);
        }
    }
}

const start = () => setInterval(() => {
    retweet(searchQuery);
}, interval);

start();
