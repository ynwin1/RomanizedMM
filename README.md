# RomanizedMM
Official Website - www.romanizedmm.com (TBD - waiting for DNS propagation)

Current website - https://romanized-mm-frontend.onrender.com

Demo - https://www.youtube.com/watch?v=9P4RoPcO_RM
## About
RomanizedMM is a web application that provides romanized lyrics of Myanmar songs to 
music lovers out there who would like to sing Myanmar songs along. 

It provides three types of information -
* Romanized lyrics
* Burmese lyrics
* Meaning of each line in the lyrics

Not only these, users will be able to see some basic information like song names,
artist and album names. Also, I really want to make this product unique, so I added a moody summary, and a short description on when best to listen to each song. I really think
users will love this. For convenience, I added a YouTube player when user clicks YouTube button, so they can start the music right there, and sing along! There are also options available for Spotify
and Apple Music if the songs are available on each platform.

There are thousands of Myanmar songs. If a user wants to sing but can't find the song, they can submit a song under Song Request page. I absolutely will not know who submitted,
all I will have is the song information you provided, as stated in the form. 

This is the first proper full stack app I have created. This is going to be a continuous long-term project for me, as 
I add more songs for the users. 

## Behind the scenes

I am a Burmese, so I grew up listening to Burmese songs. But, in the past few years, I started listening to a few foreign countries' songs, especially Thai and Japan.
There are some great Thai songs out there, and I want to sing along, so I always google to look for lyrics. But, about a year ago, I checked the same for Burmese, 
but I couldn't find one. There are a few for some famous songs, but you can count how many there are with your fingers. Also, I see quite a lot of comments under MTVs of 
Myanmar songs, asking for romanized lyrics or what's the meaning of all these lyrics. That's when I realized I needed to start one.

I managed to get my hands on it this winter break, and here it is, the website. My goal here is simple; I want to fill this gap in the market to help Myanmar songs get popular 
because I really think some of them have very good potential to blow up. I want to help promote our songs, and make people talk about them.

## Technical

This is a full MERN stack web-application; React for frontend, NodeJS + Express for backend and MongoDB for database. 

This is my first proper full stack application. I have worked with Node+Express before during the hackathon, but it was more of a learning process.
I've been learning React for a while now, and thought it might be time to apply it to a real world application. I had no difficulties with Mongo
as I have worked with it at my co-op before.

My first plan was to only do this as a React website. But, with the thought of expanding this project in the future, I changed my decision,
thinking it might be wiser to store all the information I need in a database and retrieve with APIs as needed. I think this makes it more scalable,
and reusable. So, I went with this new approach.

My backend is quite simple. It consists of 
* A Mongoose schema for songs
* A MongoDB configuration logic, 
* GET API to fetch songs from database
* POST API that creates user submission and sends to my discord webhook where I receive the submissions

I import JSON documents that contain songs to MongoDB Atlas with the help of a script. 
The script checks whether the required information for a song is included before importing a file. 
The reason for doing this is that I translate songs on my own, and I also have all the information I need readily in my hands. There are no APIs that can do this as of now, it's pretty niche.

For frontend, I use React with MaterialUI. This is the very first time I implement a React project. 
The whole website contains only two pages, the home/landing page, and song request page. 

On the landing page, the user is able to search a song using intelligent autocomplete, which will then
render the song of their choice. There are three media streams available, with Youtube player popping up when chosen.

The user is also able to navigate to the Song Request page, where they can submit a song they want to sing. 


