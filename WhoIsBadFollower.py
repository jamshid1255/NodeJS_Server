import sys
import psycopg2

import numpy as np
import pandas as pd

import nltk
from nltk.corpus import stopwords
from nltk.corpus import stopwords
import string
from nltk.stem import PorterStemmer
import re
from sklearn.feature_extraction.text import CountVectorizer

connection = psycopg2.connect(
    user="postgres",
    host="localhost",
    database="snapp",
    password="admin",
    port=5432,
)
connection.autocommit = True


cursor = connection.cursor()

 

''''''''''''''''''''''''''''''''''''''''Teets Collection from Twitter'''''''''''''''''''''''''''''''''''''''
import tweepy

consumerKey = 'fvjRrg3P7a8aSVioOx1qjX2Yy'
consumerSecret = '3Jjx72kGIam0ALME3pB4zHtdSFuiHdybnIN94Omg3cCvRMG7fm'

authenticate = tweepy.OAuthHandler(consumerKey, consumerSecret)
api = tweepy.API(authenticate, wait_on_rate_limit= True)







account = sys.argv[1]
FollowersscreenName = []
for follower in api.followers(account):
    FollowersscreenName.append(follower.screen_name)
    #print(follower.screen_name)




num = 10 # total number of tweets
myFollowerTweets = []
j=1
for i in range(len(FollowersscreenName)):
    posts = api.user_timeline(screen_name = FollowersscreenName[i], count=num, lang= "en" 
                          ,tweet_mode = "extended")
    #print("Show the ",num," recent tweets for \n", FollowersscreenName[i])
    for tweet in posts[0:num]:
        #print(str(j) + ') '+ tweet.full_text + '\n')
        cursor.execute('INSERT into "myFollowersTweets"(username,"followerUsername", tweets, location) VALUES (%s,%s, %s,%s)',(account,FollowersscreenName[i],tweet.full_text,tweet.user.location) )
        j+=1
    #print('000000000000000000000000000000000000000000000000000')

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

''''''''''''''''''''''''''''''''''''''''Teets Reading from database'''''''''''''''''''''''''''''''''''''''

cursor.execute('''SELECT * from "myFollowersTweets"''')
result = cursor.fetchall()
#print(type(result))
#print(result)

products_list = ['username', 'followerUsername', 'tweets', 'location']

tweets = pd.DataFrame (result, columns = products_list)
#print(tweets['location'])

#print(type(tweets))



''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


stop_words = set(stopwords.words("english"))
punct = string.punctuation
stemmer = PorterStemmer()



# print(stop_words)
# print(tweets.head())
# print(tweets.shape)

X = tweets['tweets']
y = tweets['location']
cleaned_data = []

for i in range(len(X)):
    tweet = re.sub('[^a-zA-Z]',' ',X.iloc[i])
    tweet = tweet.lower().split()
    tweet = [stemmer.stem(word) for word in tweet if(word not in stop_words) and (word not in punct)]
    tweet = ' '.join(tweet)
    cleaned_data.append(tweet)

#print(cleaned_data)
tweets['tweets'] = cleaned_data
#print(tweets['tweet_text'][0])



def mytokenizer(text):
    return text.split()

FinalfrequencyForWords = []
zzz = 0 ;
def colsum(username, arr, n, m,nameofPerson,locationofPerson):
    frequencyForWords = []
    frequencyForWords.append(username)
    frequencyForWords.append(nameofPerson)
    for i in range(n):
        su = 0;
        for j in range(m):
            su += arr[j][i]
        frequencyForWords.append(su)
    # print(frequencyForWords)
    frequencyForWords.append(locationofPerson)
    FinalfrequencyForWords.append(frequencyForWords)
        
vocab = {'fuck':0, 'bitch':1,'bullshit':2,'rubbish':3,'kiss': 4}
unique_Followers = tweets['followerUsername'].unique()
unique_Followers_location = tweets['location']

followersTweetIndividual = []
vectorizer = CountVectorizer(vocabulary=vocab, tokenizer = mytokenizer)
# print(vectorizer.get_feature_names_out())
for i in range(len(unique_Followers)):

    for j in range(len(tweets['tweets'])):
        if(unique_Followers[i]==tweets['followerUsername'][j]):
            followersTweetIndividual.append(tweets['tweets'][j])
    
    
    X = vectorizer.fit_transform(followersTweetIndividual)
    
    frequencyForBadWords = X.toarray()
    colsum(sys.argv[1],frequencyForBadWords, len(frequencyForBadWords[0]), len(frequencyForBadWords),unique_Followers[i],tweets['location'][i])


#with open('bbbadbadWordsFrequency.csv','a') as csvfile:
#    np.savetxt(csvfile, FinalfrequencyForWords,delimiter=',',header='Name, fuck, bitch, bullshit, rubbish, kiss, location',fmt='%s', comments='')



#print(FinalfrequencyForWords)
#print(FinalfrequencyForWords[0][0])



for d in range(len(FinalfrequencyForWords)):
    record_to_insert = (FinalfrequencyForWords[d][0], FinalfrequencyForWords[d][1],np.asscalar(FinalfrequencyForWords[d][2]),
                        np.asscalar(FinalfrequencyForWords[d][3]),np.asscalar(FinalfrequencyForWords[d][4]),np.asscalar(FinalfrequencyForWords[d][5]),
                        np.asscalar(FinalfrequencyForWords[d][6]),FinalfrequencyForWords[d][7])
    #print(record_to_insert)
    cursor.execute('INSERT into "tableforBadWords"("user","followerUsername", fuck, bitch, bullshit, rubbish, kiss,location) VALUES (%s,%s, %s,%s, %s,%s, %s, %s)',record_to_insert )
  
  
print("List has been inserted to employee table successfully...")
  
# Commit your changes in the database
connection.commit()




