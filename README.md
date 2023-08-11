
# Adaptavist Fun Facts Slack App

- [Adaptavist Fun Facts Slack App](#adaptavist-fun-facts-slack-app)
  - [About](#about)
  - [Video Run Through](#video-run-through)
  - [Dev Details](#dev-details)
    - [Architecture](#architecture)
    - [Setup](#setup)
    - [Testing](#testing)
  - [Functional Specification](#functional-specification)
    - [Overview](#overview)
    - [Scenarios](#scenarios)
      - [Scenario 1: Alice needs a fun fact for a presentation!](#scenario-1-alice-needs-a-fun-fact-for-a-presentation)
    - [Non Goals](#non-goals)

## About
I was confused at first since after looking at the docs, I came to the conclusion that the only code I needed to write to get a slash command working was in the lambda function that the slash command would hit. 

There was the exception of the Next Gen Slack Platform, but that is only available in the paid version of the app so I skipped it as I assumed the goal was to use the free parts of the eco system as specified in the requirements doc. 

Since I realized I had to write so little code, I decided to create a short video showing the full walk through of the application I built which is linked in the next section.

## Video Run Through

I've attached a [video](https://drive.google.com/file/d/1xJsgM3w9YemKvNefQCP5kEB357_5XvMR/view?usp=sharing) of me going through the whole application and running through how it works. It's very basic, but hits the requirements of the POC. 

*NOTE: Please download the [video](https://drive.google.com/file/d/1xJsgM3w9YemKvNefQCP5kEB357_5XvMR/view?usp=sharing) if you have trouble playing it online*.
## Dev Details

### Architecture

The architecture is very simple. All that exists is the slack app, AWS Gateway, and AWS Lambda. When the slash command is executed, the details are sent to the API Gateway endpoint which proxies them over to the Lambda function which in turn calls the fun facts API, gets the fact, creates the required Block Kit Message, then returns that which is then displayed in the channel to the user. 

### Setup

This app is hosted in AWS Lambda. In order to setup your own app using this as the template, create an API Gateway with the endpoint `/fun-fact` and attach a lambda function to it. Once connected, copy the ARN of the lambda function to the [.env](/.env) file with the key `FUNCTION_NAME`. 

Then make sure you're AWS CLI is hooked up to the same account and that the Default region name is set correctly. Once that's all set, you can run the command 

```
npm run deploy
```

and that will take all the code from the [`index.js`](index.js) file and deploy it to the lambda function and you can right away go hit the lambda endpoint with the newest updates. 

### Testing

Testing wasn't done for this project as this project is in essence a single function project so adding in tests to it would be more cumbersome and wouldn't add much value. 

## Functional Specification

This section constitutes the functional specification for this app, based off of Joel Spolsky's [Functional Spec Doc series](https://www.joelonsoftware.com/2000/10/02/painless-functional-specifications-part-1-why-bother/). 


### Overview

Fun Facts Slack App is your best friend when you need to know something completely random! Joey comes over and asks for a quick fun fact, you blank out, then realize you can type in `/funfact` and give Joey a killer fact like *"10,000 Dutch cows pass through the Amsterdam airport each year"* or *"A dragonfly has a lifespan of 24 hours"*. You never know what you're gonna get!

### Scenarios

#### Scenario 1: Alice needs a fun fact for a presentation!

Albert is sitting at his desk on a Wednesday afternoon working away and Alice comes running up, "Albert! I need a fun fact for my presentation, what do you have??" Albert blanks out but then remembers he can type in `/funfact` and get just what Alice needs. So he goes and does just that and gives her the fun fact: *"A goldfish has a memory span of three seconds"*. She loves it and says she'll use it to tell the audience she hopes they don't have such a memory or she'll be repeating herself a lot! 

### Non Goals
- This app doesn't send fun facts to people
- This app doesn't send fun facts to you privately
- This app doesn't generate lists of fun facts, only one at a time

