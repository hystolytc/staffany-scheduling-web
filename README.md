## This is a web app that demonstrate shift schedule picker
This app consists only one single pages

## Tech stack
- ReactJS generated with `create-react-app`
- Typescript
- Axios
- TailwindCSS

## How to run this on local machine
- Clone this repo
- Run ```yarn install``` or ```npm install```
- Run ```yarn dev```

## Rule
- User could pick shift schedule as long as the date is not on previous day
- User could pick shift schedule as long as the end time is more greather than start time
- User could set the time between 00am to 23:59pm

## What this app capable of
- Get all the schedule within 1 week
- Create shift schedule on any time and day
- Create shift time schedule within a day only
- Edit the schedule
- Delete the schedule
- Form validation when a user want to create schedule
- Vertical ruler

## What this app not capable of
- The app cannot be shift to next or previous week, only within current date week
